import React from 'react';
import { Box, Button } from '@mui/material';

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
];

export default function Keyboard({ onKeyPress }) {
  return (
    <Box mt={4}>
      {rows.map((row, i) => (
        <Box key={i} display="flex" justifyContent="center" mb={1}>
          {row.map(key => (
            <Button
              key={key}
              onClick={() => onKeyPress(key)}
              sx={{
                m: 0.5,
                minWidth: key.length > 1 ? 60 : 40,
                backgroundColor: '#818384',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                '&:hover': {
                  backgroundColor: '#565758'
                },
              }}
              variant="contained"
            >
              {key}
            </Button>
          ))}
        </Box>
      ))}
    </Box>
  );
}