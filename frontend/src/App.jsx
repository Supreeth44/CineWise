import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

// --- NEW: Full Top 50 Movie Data ---
const topMoviesData = [
  { rank: 1, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, votes: '3.1M', url: 'https://www.imdb.com/title/tt0111161/' },
  { rank: 2, title: 'The Godfather', year: 1972, rating: 9.2, votes: '2.2M', url: 'https://www.imdb.com/title/tt0068646/' },
  { rank: 3, title: 'The Dark Knight', year: 2008, rating: 9.1, votes: '3.1M', url: 'https://www.imdb.com/title/tt0468569/' },
  { rank: 4, title: 'The Godfather Part II', year: 1974, rating: 9.0, votes: '1.5M', url: 'https://www.imdb.com/title/tt0071562/' },
  { rank: 5, title: '12 Angry Men', year: 1957, rating: 9.0, votes: '955K', url: 'https://www.imdb.com/title/tt0050083/' },
  { rank: 6, title: 'The Lord of the Rings: The Return of the King', year: 2003, rating: 9.0, votes: '2.1M', url: 'https://www.imdb.com/title/tt0167260/' },
  { rank: 7, title: 'Schindler\'s List', year: 1993, rating: 9.0, votes: '1.6M', url: 'https://www.imdb.com/title/tt0108052/' },
  { rank: 8, title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, rating: 8.9, votes: '2.2M', url: 'https://www.imdb.com/title/tt0120737/' },
  { rank: 9, title: 'Pulp Fiction', year: 1994, rating: 8.8, votes: '2.4M', url: 'https://www.imdb.com/title/tt0110912/' },
  { rank: 10, title: 'The Good, the Bad and the Ugly', year: 1966, rating: 8.8, votes: '872K', url: 'https://www.imdb.com/title/tt0060196/' },
  { rank: 11, title: 'The Lord of the Rings: The Two Towers', year: 2002, rating: 8.8, votes: '1.9M', url: 'https://www.imdb.com/title/tt0167261/' },
  { rank: 12, title: 'Forrest Gump', year: 1994, rating: 8.8, votes: '2.4M', url: 'https://www.imdb.com/title/tt0109830/' },
  { rank: 13, title: 'Fight Club', year: 1999, rating: 8.8, votes: '2.5M', url: 'https://www.imdb.com/title/tt0137523/' },
  { rank: 14, title: 'Inception', year: 2010, rating: 8.8, votes: '2.7M', url: 'https://www.imdb.com/title/tt1375666/' },
  { rank: 15, title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980, rating: 8.7, votes: '1.5M', url: 'https://www.imdb.com/title/tt0080684/' },
  { rank: 16, title: 'The Matrix', year: 1999, rating: 8.7, votes: '2.2M', url: 'https://www.imdb.com/title/tt0133093/' },
  { rank: 17, title: 'Goodfellas', year: 1990, rating: 8.7, votes: '1.4M', url: 'https://www.imdb.com/title/tt0099685/' },
  { rank: 18, title: 'Interstellar', year: 2014, rating: 8.7, votes: '2.4M', url: 'https://www.imdb.com/title/tt0816692/' },
  { rank: 19, title: 'One Flew Over the Cuckoo\'s Nest', year: 1975, rating: 8.6, votes: '1.1M', url: 'https://www.imdb.com/title/tt0073486/' },
  { rank: 20, title: 'Se7en', year: 1995, rating: 8.6, votes: '2M', url: 'https://www.imdb.com/title/tt0114369/' },
  { rank: 21, title: 'It\'s a Wonderful Life', year: 1946, rating: 8.6, votes: '537K', url: 'https://www.imdb.com/title/tt0038650/' },
  { rank: 22, title: 'The Silence of the Lambs', year: 1991, rating: 8.6, votes: '1.7M', url: 'https://www.imdb.com/title/tt0102926/' },
  { rank: 23, title: 'Seven Samurai', year: 1954, rating: 8.6, votes: '392K', url: 'https://www.imdb.com/title/tt0047478/' },
  { rank: 24, title: 'Saving Private Ryan', year: 1998, rating: 8.6, votes: '1.6M', url: 'https://www.imdb.com/title/tt0120815/' },
  { rank: 25, title: 'The Green Mile', year: 1999, rating: 8.6, votes: '1.5M', url: 'https://www.imdb.com/title/tt0120689/' },
  { rank: 26, title: 'City of God', year: 2002, rating: 8.6, votes: '853K', url: 'https://www.imdb.com/title/tt0317248/' },
  { rank: 27, title: 'Life Is Beautiful', year: 1997, rating: 8.6, votes: '794K', url: 'https://www.imdb.com/title/tt0118799/' },
  { rank: 28, title: 'Terminator 2: Judgment Day', year: 1991, rating: 8.6, votes: '1.3M', url: 'https://www.imdb.com/title/tt0103064/' },
  { rank: 29, title: 'Star Wars: Episode IV - A New Hope', year: 1977, rating: 8.6, votes: '1.5M', url: 'https://www.imdb.com/title/tt0076759/' },
  { rank: 30, title: 'Back to the Future', year: 1985, rating: 8.5, votes: '1.4M', url: 'https://www.imdb.com/title/tt0088763/' },
  { rank: 31, title: 'Spirited Away', year: 2001, rating: 8.6, votes: '938K', url: 'https://www.imdb.com/title/tt0245429/' },
  { rank: 32, title: 'The Pianist', year: 2002, rating: 8.5, votes: '989K', url: 'https://www.imdb.com/title/tt0253474/' },
  { rank: 33, title: 'Gladiator', year: 2000, rating: 8.5, votes: '1.8M', url: 'https://www.imdb.com/title/tt0172495/' },
  { rank: 34, title: 'Parasite', year: 2019, rating: 8.5, votes: '1.1M', url: 'https://www.imdb.com/title/tt6751668/' },
  { rank: 35, title: 'Psycho', year: 1960, rating: 8.5, votes: '769K', url: 'https://www.imdb.com/title/tt0054215/' },
  { rank: 36, title: 'The Lion King', year: 1994, rating: 8.5, votes: '1.2M', url: 'https://www.imdb.com/title/tt0110357/' },
  { rank: 37, title: 'Grave of the Fireflies', year: 1988, rating: 8.5, votes: '366K', url: 'https://www.imdb.com/title/tt0095327/' },
  { rank: 38, title: 'The Departed', year: 2006, rating: 8.5, votes: '1.5M', url: 'https://www.imdb.com/title/tt0407887/' },
  { rank: 39, title: 'Whiplash', year: 2014, rating: 8.5, votes: '1.1M', url: 'https://www.imdb.com/title/tt2582802/' },
  { rank: 40, title: 'Harakiri', year: 1962, rating: 8.6, votes: '84K', url: 'https://www.imdb.com/title/tt0056058/' },
  { rank: 41, title: 'The Prestige', year: 2006, rating: 8.5, votes: '1.5M', url: 'https://www.imdb.com/title/tt0482571/' },
  { rank: 42, title: 'American History X', year: 1998, rating: 8.5, votes: '1.3M', url: 'https://www.imdb.com/title/tt0120586/' },
  { rank: 43, title: 'Léon: The Professional', year: 1994, rating: 8.5, votes: '1.3M', url: 'https://www.imdb.com/title/tt0110413/' },
  { rank: 44, title: 'Spider-Man: Across the Spider-Verse', year: 2023, rating: 8.5, votes: '488K', url: 'https://www.imdb.com/title/tt9362722/' },
  { rank: 45, title: 'Casablanca', year: 1942, rating: 8.5, votes: '643K', url: 'https://www.imdb.com/title/tt0034583/' },
  { rank: 46, title: 'Cinema Paradiso', year: 1988, rating: 8.5, votes: '308K', url: 'https://www.imdb.com/title/tt0095765/' },
  { rank: 47, title: 'The Intouchables', year: 2011, rating: 8.5, votes: '1M', url: 'https://www.imdb.com/title/tt1675434/' },
  { rank: 48, title: 'The Usual Suspects', year: 1995, rating: 8.5, votes: '1.2M', url: 'https://www.imdb.com/title/tt0114814/' },
  { rank: 49, title: 'Alien', year: 1979, rating: 8.5, votes: '1M', url: 'https://www.imdb.com/title/tt0078748/' },
  { rank: 50, title: 'Modern Times', year: 1936, rating: 8.5, votes: '278K', url: 'https://www.imdb.com/title/tt0027977/' },
];

// --- NEW: Random Emoji Picker ---
const movieEmojis = ['🎬', '🍿', '🎥', '🎞️', '🎟️', '🏆', '🌟', '👽', '🤖', '👻', '🕵️', '🧙', '🦸', '🧟', '🚀'];
const getRandomEmoji = () => movieEmojis[Math.floor(Math.random() * movieEmojis.length)];


// --- UPDATED: Top Movie List Component ---
function TopMoviesList() {
  return (
    <div className="top-movies-container">
      <h2 className="top-movies-title">IMDb Top 50</h2>
      <p className="top-movies-subtitle">
        As rated by regular IMDb voters. 
        Click any movie to visit its page, or paste a link above for an AI summary!
      </p>
      
      {/* This is the new list layout */}
      <div className="movie-list">
        {topMoviesData.map(movie => (
          <a 
            key={movie.rank} 
            href={movie.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="movie-list-item"
          >
            <span className="movie-emoji">{getRandomEmoji()}</span>
            <span className="movie-title">{movie.rank}. {movie.title}</span>
            <span className="movie-rating">⭐ {movie.rating}</span>
          </a>
        ))}
      </div>
    </div>
  );
}


// --- Your Main App Component ---
function App() {
  // --- State (No changes) ---
  const [productUrl, setProductUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // --- Handler Function (No changes) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: productUrl }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Network response was not ok');
      }
      setResult(data);

    } catch (err) {
      setError(err.message || 'Failed to analyze. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- JSX (The HTML) ---
  return (
    <div className="App">
      <header className="App-header">
        <h1>CineWise</h1>
        <p>Discover the wisdom of the crowd.</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            placeholder="Paste an IMDb movie URL..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </form>

        {error && (
          <div className="result-box error">
            <p>{error}</p>
          </div>
        )}
        
        {result && (
          <div className="result-box">
            <h2>Analysis Results</h2>
            <p><strong>Movie Title:</strong> {result.product_title}</p>
            <p><strong>Reviews Found:</strong> {result.reviews_found}</p>
            <hr />
            <p><strong>Sentiment Score:</strong> {result.sentiment_score}</p>
            <p><strong>AI Summary:</strong></p>
            
            <div className="ai-summary">
              <ReactMarkdown>
                {result.ai_summary}
              </ReactMarkdown>
            </div>
            
          </div>
        )}
      </main>

      {/* --- This component is now updated --- */}
      <TopMoviesList />

    </div>
  );
}

export default App;