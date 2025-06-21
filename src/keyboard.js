import React from 'react';
import { Box, Button } from '@mui/material';

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
];

export default function Keyboard({ onKeyPress }) {
  return (
    <Box mt={2}>
      {rows.map((row, i) => (
        <Box key={i} display="flex" justifyContent="center" mb={1}>
          {row.map(key => (
            <Button
              key={key}
              variant="contained"
              onClick={() => onKeyPress(key)}
              sx={{ m: 0.5, minWidth: 40 }}
            >
              {key}
            </Button>
          ))}
        </Box>
      ))}
    </Box>
  );
}