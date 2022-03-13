import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { tryParse } from '../../lib/CAOS/Parser';
import { LogWindow } from './LogWindow';

interface ConsoleOpts {
  error?: boolean;
}

export function Repl() {
  const [logMessages, setLog] = useState<string[]>([]);

  const consoleLog = (msg: string, options?: ConsoleOpts) => {
    setLog(prevLog => ([...prevLog, ...[`${options?.error ? 'e:' : ''}${msg}`]]));
  };

  const checkReturn = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      try {
        const cmd = (e.target as HTMLInputElement).value;

        consoleLog(`> ${cmd}`);

        const result = tryParse(cmd);

        (e.target as HTMLInputElement).value = '';

        const lines = `${JSON.stringify(result, null, 2)}`.split(/\n/g);

        lines.forEach((line) => {
          consoleLog(`< ${line}`);
        });
      } catch (err) {
        const e: Error = err as Error;
        const lines = e.message.split(/\n/g);

        lines.forEach((line) => {
          consoleLog(`< ${line}`, {
            error: true
          });
        });
      }
    }
  }, []);

  useEffect(() => {
    consoleLog('> Welcome to the house of fun');
    consoleLog('# ' + (new Date()).toISOString());
  }, []);

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
      <LogWindow logMessages={logMessages} />
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        placeholder="Enter some CAOS"
        variant="filled"
        size="small"
        onKeyUp={checkReturn}
        fullWidth
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
