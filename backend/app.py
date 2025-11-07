from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
import lxml
import re
import time

# --- NEW: AI & NLP IMPORTS ---
import google.generativeai as genai
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# --- SELENIUM IMPORTS ---
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

# --- !! YOUR API KEY !! ---
YOUR_API_KEY = "AIzaSyB5i1L4zpA2j46MUvu0dJPHwi65Z0golK4"

# --- NEW: Configure the AI ---
try:
    genai.configure(api_key=YOUR_API_KEY)
    # --- !! THIS IS THE FINAL, CORRECT MODEL NAME FROM YOUR LIST !! ---
    model = genai.GenerativeModel('gemini-2.5-flash')
except Exception as e:
    print(f"Error configuring AI: {e}. Did you paste your API key?")
    model = None

# --- NEW: Initialize Sentiment Analyzer ---
analyzer = SentimentIntensityAnalyzer()

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# --- NEW: AI Summary Function ---
def get_ai_summary(all_review_text):
    if not model:
        return "AI model not configured. Check API key."

    # Limit text to avoid exceeding AI token limits
    text_to_summarize = all_review_text[:20000] 

    prompt = f"""
    You are a movie review expert. Based on the following raw review text,
    generate a 3-bullet-point summary of the main pros and a
    3-bullet-point summary of the main cons.

    REVIEWS:
    {text_to_summarize}
    """

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"AI generation failed: {e}")
        return "AI summary generation failed."

# --- NEW: Sentiment Score Function ---
def get_sentiment_score(all_review_text):
    score = analyzer.polarity_scores(all_review_text)
    compound_score = score['compound']
    positive_percentage = round((compound_score + 1) / 2 * 100)
    return f"{positive_percentage}% Positive"


# --- IMDb Scraper Function (WORKING) ---
def scrape_imdb(url):
    match = re.search(r'/title/(tt[0-9]{7,9})', url)
    if not match:
        return {'error': 'Could not find a valid IMDb Movie ID'}

    movie_id = match.group(1)
    reviews_url = f"https://www.imdb.com/title/{movie_id}/reviews"

    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36")
    options.add_argument("accept-language=en-US,en;q=0.9")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    print(f"--- Selenium launching to scrape {reviews_url} ---")

    try:
        driver.get(reviews_url)
        time.sleep(2)
        html_content = driver.page_source
        soup = BeautifulSoup(html_content, 'lxml')

        # Title selector (working)
        title = 'Title not found'
        title_element = soup.find('h2', {'data-testid': 'subtitle'})
        if title_element:
            title = title_element.get_text(strip=True)

        # Review selector (working)
        review_elements = soup.find_all('div', class_='ipc-html-content-inner-div')
        reviews = []
        for review in review_elements:
            reviews.append(review.get_text(strip=True))

        if not reviews:
            return {'error': 'Selenium worked, but the final selector failed.'}

        all_reviews_text = ' '.join(reviews)

        print(f"--- Scrape successful! Found {len(reviews)} reviews. ---")

        print("--- Getting sentiment score... ---")
        real_sentiment = get_sentiment_score(all_reviews_text)

        print("--- Getting AI summary... ---")
        real_summary = get_ai_summary(all_reviews_text)
        print("--- AI summary received. ---")

        return {
            'product_title': title,
            'reviews_found': len(reviews),
            'all_review_text': all_reviews_text, 
            'sentiment_score': real_sentiment,
            'ai_summary': real_summary
        }

    except Exception as e:
        return {'error': f'An error occurred during Selenium scraping: {str(e)}'}
    finally:
        driver.quit()

# --- API Endpoint (No changes) ---
@app.route('/api/analyze', methods=['POST'])
def analyze_product():
    try:
        data = request.get_json()
        product_url = data.get('url')
        if not product_url:
            return jsonify({'error': 'No URL provided'}), 400
        if 'imdb.com' not in product_url.lower():
             return jsonify({'error': 'Sorry, this app only supports IMDb URLs right now.'}), 400

        scrape_data = scrape_imdb(product_url)

        if 'error' in scrape_data:
             print(f"!!! THE SCRAPER FAILED! REASON: {scrape_data['error']}")
             return jsonify(scrape_data), 500

        return jsonify(scrape_data)

    except Exception as e:
        print(f"!!! A-HA! THE REAL ERROR IS: {e}")
        return jsonify({'error': str(e)}), 500

# Run the server
if __name__ == '__main__':
    app.run(debug=True, port=5000)