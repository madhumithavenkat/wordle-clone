import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Keyboard from './keyboard';
import { WORDS } from './words';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const getFeedback = (guess, answer) => {
  return guess.split('').map((letter, idx) => {
    if (letter === answer[idx]) return 'correct';
    if (answer.includes(letter)) return 'present';
    return 'absent';
  });
};

export default function Wordle() {
  const [answer, setAnswer] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [current, setCurrent] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setAnswer(word);
  }, []);

  const handleKeyPress = (key) => {
    if (gameOver) return;
    if (key === 'DEL') {
      setCurrent(prev => prev.slice(0, -1));
    } else if (key === 'ENTER') {
      if (current.length === WORD_LENGTH) {
        const newGuesses = [...guesses, current];
        setGuesses(newGuesses);
        setCurrent('');
        if (current === answer || newGuesses.length === MAX_ATTEMPTS) {
          setGameOver(true);
        }
      }
    } else if (current.length < WORD_LENGTH && /^[A-Z]$/.test(key)) {
      setCurrent(prev => prev + key.toLowerCase());
    }
  };

  const renderCell = (char, feedback, i) => (
    <Box
      key={i}
      width={40}
      height={40}
      mx={0.5}
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        border: '2px solid #999',
        backgroundColor:
          feedback === 'correct' ? '#6aaa64' :
          feedback === 'present' ? '#c9b458' :
          feedback === 'absent' ? '#787c7e' : '#fff',
        color: feedback ? '#fff' : '#000',
        fontWeight: 'bold',
        fontSize: '1.2rem',
      }}
    >
      {char.toUpperCase()}
    </Box>
  );

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" gutterBottom>Wordle Clone</Typography>

      {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => {
        const guess = guesses[rowIndex] || (rowIndex === guesses.length ? current : '');
        const feedback = rowIndex < guesses.length ? getFeedback(guess, answer) : [];

        return (
          <Box key={rowIndex} display="flex" justifyContent="center" mb={1}>
            {Array.from({ length: WORD_LENGTH }).map((_, i) => {
              const char = guess[i] || '';
              const fb = feedback[i];
              return renderCell(char, fb, i);
            })}
          </Box>
        );
      })}

      <Keyboard onKeyPress={handleKeyPress} />

      {gameOver && (
        <Typography mt={2} variant="h6" color="secondary">
          {guesses[guesses.length - 1] === answer ? '🎉 You Won!' : `💥 Game Over! Answer was: ${answer.toUpperCase()}`}
        </Typography>
      )}
    </Box>
  );
}
