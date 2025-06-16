import React, { useState, useEffect } from 'react';
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

function WordleGate({ onUnlock, onFail }) {
  const [guesses, setGuesses] = useState([]); // array of { word, result }
  const [current, setCurrent] = useState('');
  const [message, setMessage] = useState('');
  const [usedLetters, setUsedLetters] = useState([]);
  const [fading, setFading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hideStep, setHideStep] = useState(-1);

  useEffect(() => {
    if (failed && hideStep < 4) {
      const id = setTimeout(() => setHideStep(hideStep + 1), 500);
      return () => clearTimeout(id);
    }
  }, [failed, hideStep]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (current.length !== 5) return;
    const word = current.toUpperCase();
    const result = evaluateGuess(word);
    const nextGuesses = [...guesses, { word, result }];
    setGuesses(nextGuesses);
    setCurrent('');
    setUsedLetters(Array.from(new Set([...usedLetters, ...word.split('')])));
    if (word === SECRET) {
      setFading(true);
      setTimeout(() => onUnlock(), 2000);
    } else if (nextGuesses.length >= 6) {
      setMessage('Incorrect. Deleting everything...');
      setFailed(true);
      setHideStep(0);
    }
  };

  useEffect(() => {
    if (failed && hideStep >= 4 && onFail) {
      onFail();
    }
  }, [failed, hideStep, onFail]);

  return (
    <div
      className={`wordle-gate-overlay${fading ? ' fade-out' : ''} ${
        hideStep >= 4 ? 'hidden' : ''
      }`}
    >
      <h2 className={hideStep >= 1 ? 'hidden' : ''}>Guess the secret 5-letter word</h2>
      <div className={`wordle-grid ${hideStep >= 0 ? 'hidden' : ''}`}>
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
      {usedLetters.length > 0 && (
        <p className={`used-letters ${hideStep >= 2 ? 'hidden' : ''}`}>
          Used letters: {usedLetters.join(' ')}
        </p>
      )}
      {message && <p className={hideStep >= 3 ? 'hidden' : ''}>{message}</p>}
    </div>
  );
}

export default WordleGate;
