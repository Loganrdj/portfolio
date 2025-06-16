import React, { useState } from 'react';
import '../App.css';

const SECRET = 'LOGAN';

function evaluateGuess(guess) {
  const secret = SECRET.split('');
  const result = Array(5).fill('absent');
  const remaining = secret.slice();

  // First pass for correct letters
  for (let i = 0; i < 5; i++) {
    if (guess[i] === secret[i]) {
      result[i] = 'correct';
      remaining[i] = null;
    }
  }

  // Second pass for present letters
  for (let i = 0; i < 5; i++) {
    if (result[i] === 'correct') continue;
    const idx = remaining.indexOf(guess[i]);
    if (idx !== -1) {
      result[i] = 'present';
      remaining[idx] = null;
    }
  }
  return result;
}

function WordleGate({ onUnlock }) {
  const [guesses, setGuesses] = useState([]); // array of { word, result }
  const [current, setCurrent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (current.length !== 5) return;
    const word = current.toUpperCase();
    const result = evaluateGuess(word);
    const nextGuesses = [...guesses, { word, result }];
    setGuesses(nextGuesses);
    setCurrent('');
    if (word === SECRET) {
      onUnlock();
    } else if (nextGuesses.length >= 6) {
      setMessage(`The word was ${SECRET}. Reload to try again.`);
    }
  };

  return (
    <div className="wordle-gate-overlay">
      <h2>Guess the secret 5-letter word</h2>
      <div className="wordle-grid">
        {guesses.map((g, i) => (
          <div className="wordle-row" key={i}>
            {g.word.split('').map((ch, idx) => (
              <span key={idx} className={`wordle-cell ${g.result[idx]}`}>{ch}</span>
            ))}
          </div>
        ))}
        {guesses.length < 6 && (
          <form onSubmit={handleSubmit} className="wordle-form">
            <input
              type="text"
              value={current}
              maxLength={5}
              autoFocus
              onChange={(e) => setCurrent(e.target.value.toUpperCase())}
            />
          </form>
        )}
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default WordleGate;
