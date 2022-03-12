import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

export function Repl() {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'black',
        color: '#daffda',
        fontFamily: 'monospace',
        fontSize: 'smaller',
      }}
    >
      <Box
        sx={{
          height: '400px',
          overflowY: 'scroll',
          padding: 1,
        }}
      >
        Welcome to the house of fun
      </Box>
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        placeholder="Enter some CAOS"
        variant="filled"
        size="small"
        sx={{
          '& .MuiFilledInput-input': {
            backgroundColor: 'black',
            color: '#daffda',
            fontFamily: 'monospace',
            fontSize: 'smaller',
          },
        }}
      />
    </Box>
  );
}
