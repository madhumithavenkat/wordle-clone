import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Keyboard from './Keyboard';
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
  const [error, setError] = useState(false);

  useEffect(() => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setAnswer(word);
  }, []);

  const handleKeyPress = (key) => {
    if (gameOver) return;

    if (key === 'DEL') {
      setCurrent(prev => prev.slice(0, -1));
    } else if (key === 'ENTER') {
      if (current.length !== WORD_LENGTH) {
        setError(true);
        setTimeout(() => setError(false), 600);
        return;
      }
      const newGuesses = [...guesses, current];
      setGuesses(newGuesses);
      setCurrent('');
      if (current === answer || newGuesses.length === MAX_ATTEMPTS) {
        setGameOver(true);
      }
    } else if (current.length < WORD_LENGTH && /^[A-Z]$/.test(key)) {
      setCurrent(prev => prev + key.toLowerCase());
    }
  };

  const renderCell = (char, feedback, i) => {
    const backgroundColors = {
      correct: '#538d4e',
      present: '#b59f3b',
      absent: '#3a3a3c'
    };

    const delay = i * 0.3;

    return (
      <Box
        key={i}
        width={50}
        height={50}
        mx={0.5}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          border: '2px solid #3a3a3c',
          borderRadius: '6px',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          color: feedback ? '#fff' : '#d7dadc',
          backgroundColor: feedback ? backgroundColors[feedback] : '#121213',
          animation: feedback ? `flip 0.6s ease ${delay}s both` : 'none',
          transformOrigin: 'center',
          '@keyframes flip': {
            '0%': { transform: 'rotateX(0)' },
            '50%': {
              transform: 'rotateX(90deg)',
              backgroundColor: '#121213',
              color: 'transparent'
            },
            '100%': {
              transform: 'rotateX(0)',
              backgroundColor: backgroundColors[feedback],
              color: '#fff'
            }
          }
        }}
      >
        {char?.toUpperCase()}
      </Box>
    );
  };

  return (
    <Box textAlign="center" mt={4}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#fff',
          mb: 4,
          fontFamily: 'monospace',
        }}
      >
        Wordle Clone
      </Typography>

      <Paper elevation={4} sx={{ p: 2, backgroundColor: '#1e1f23' }}>
        {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => {
          const guess = guesses[rowIndex] || (rowIndex === guesses.length ? current : '');
          const feedback = rowIndex < guesses.length ? getFeedback(guess, answer) : '';

          // Bounce on win on the winning row
          const isWinningRow = gameOver && guesses[guesses.length - 1] === answer && rowIndex === guesses.length - 1;

          // Shake on error on the current row if error triggered
          const isErrorRow = error && rowIndex === guesses.length;

          return (
            <Box
              key={rowIndex}
              display="flex"
              justifyContent="center"
              mb={1}
              sx={{
                animation: isWinningRow
                  ? 'bounce 0.6s ease'
                  : isErrorRow
                  ? 'shake 0.6s ease'
                  : 'none',
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-15px)' },
                },
                '@keyframes shake': {
                  '0%, 100%': { transform: 'translateX(0)' },
                  '20%, 60%': { transform: 'translateX(-10px)' },
                  '40%, 80%': { transform: 'translateX(10px)' },
                },
              }}
            >
              {Array.from({ length: WORD_LENGTH }).map((_, i) => {
                const char = guess[i] || '';
                const fb = feedback ? feedback[i] : '';
                return renderCell(char, fb, i);
              })}
            </Box>
          );
        })}
      </Paper>

      <Keyboard onKeyPress={handleKeyPress} />

      {gameOver && (
        <Typography mt={3} variant="h6" color="secondary">
          {guesses[guesses.length - 1] === answer ? '🎉 You Won!' : `💥 Game Over! Answer was: ${answer.toUpperCase()}`}
        </Typography>
      )}
    </Box>
  );
}