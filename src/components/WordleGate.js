import React, { useState, useEffect } from 'react';
import '../App.css';

function WordleGate({ onUnlock }) {
  const [fading, setFading] = useState(false);
  const [welcomeText, setWelcomeText] = useState('');

  useEffect(() => {
    const text = 'Welcome...';
    let idx = 0;
    const interval = setInterval(() => {
      setWelcomeText(text.slice(0, idx + 1));
      idx += 1;
      if (idx === text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => onUnlock(), 2000);
        }, 500);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onUnlock]);

  return (
    <div className={`wordle-gate-overlay${fading ? ' fade-out' : ''}`}>
      <p className="welcome-message">{welcomeText}</p>
    </div>
  );
}

export default WordleGate;
