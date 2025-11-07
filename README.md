<img width="2559" height="1599" alt="image" src="https://github.com/user-attachments/assets/f88dbda2-548e-4d10-92b3-f87d20ee9d5d" />
<img width="2559" height="1599" alt="Screenshot 2025-11-07 124807" src="https://github.com/user-attachments/assets/07b7b3af-33d4-4a32-baaf-e1811430f931" />
CineWise 🎬

Discover the wisdom of the crowd with AI-powered movie review analysis.

CineWise is a full-stack web application that solves a common problem: "Should I watch this movie?" Instead of scrolling through hundreds of user reviews, CineWise scrapes them all, performs sentiment analysis, and uses Google's Gemini AI to generate a "Pros vs. Cons" summary, giving you a 30-second verdict.

(Replace this with a link to your own screenshot or GIF!)

Key Features

AI-Powered Summaries: Paste any IMDb movie URL and get a unique, generative AI summary of all user reviews.

Real-Time Sentiment Analysis: Instantly see the overall positive/negative sentiment of the reviews, calculated with a 0-100% score.

Advanced Web Scraper: Uses a Selenium-powered Python backend to control a headless browser, bypassing JavaScript-loaded content that simple scrapers can't read.

Dynamic Content: Features the IMDb Top 50 list to showcase a content-rich, responsive frontend.

Modern, Responsive UI: A sleek, dark-mode frontend built in React, designed to be fully responsive for both desktop and mobile.

Tech Stack

This project is built with a modern, full-stack architecture.

Frontend (The "CineWise" App)

React (with Vite)

ReactMarkdown (for rendering AI-generated Markdown)

CSS3 (for custom styling, dark mode, and responsive media queries)

Backend (The "Analyzer" API)

Python 3

Flask (as the lightweight API server)

Selenium (for browser automation and robust scraping)

webdriver-manager (for automatic driver management)

BeautifulSoup4 (for parsing HTML)

Google Gemini (via google-generativeai for AI summaries)

VADER (for fast, accurate sentiment analysis)

How to Run This Project Locally

You will need two separate terminals to run both the backend and frontend servers.

Prerequisites

Python 3.9+

Node.js (which includes npm)

Google Chrome (for the Selenium scraper)

A Google AI API Key (from aistudio.google.com)

1. Backend Server (The "Kitchen")

Navigate to the backend:

cd backend


Activate your virtual environment:

# On Windows
.\venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate


Install all Python dependencies:
(If you haven't created a requirements.txt, run pip freeze > requirements.txt first)

pip install -r requirements.txt


Add your API Key:
Open backend/app.py and paste your Google AI API key into the YOUR_API_KEY variable.

Run the Flask server:

python app.py


Your backend is now running on http://localhost:5000. Leave this terminal open.

2. Frontend Server (The "Dining Room")

Open a new, second terminal.

Navigate to the frontend:

cd frontend


Install all Node.js dependencies:
(Only need to run this the first time)

npm install


Run the React app:

npm run dev


Your frontend is now running on http://localhost:5173.

Open the App!
You can now open http://localhost:5173 in your browser to use CineWise!

Challenges & What I Learned

This project was a fantastic lesson in real-world web scraping and debugging.

The Amazon Block: My initial plan was to scrape Amazon product reviews. I was quickly defeated by their advanced anti-bot measures, which detected my simple requests scraper and served a CAPTCHA page.

Pivoting to Selenium: I escalated to using Selenium to simulate a real browser. Amazon's detection still caught the Selenium instance (even in headless mode) and served a "Sign In" page, which I verified by saving the HTML to a file.

The IMDb Pivot: I made a strategic pivot to scrape IMDb, which has simpler, more predictable bot detection.

Solving JavaScript-Loaded Content: My requests scraper still failed on IMDb because the reviews are loaded with JavaScript after the page. This confirmed that Selenium was the correct tool, as it can wait for this content to load.

Debugging Selectors: IMDb's HTML is dynamic. I had to debug multiple "selector failed" errors by saving the HTML from Selenium and using the browser's "Inspect Element" tool to find the correct, modern class and data-testid tags for the reviews and titles.

AI Model Versioning: The AI integration failed until I used a check_models.py script to query the Google API, which revealed that my account had access to gemini-2.5-flash instead of the older models I was attempting to use.
