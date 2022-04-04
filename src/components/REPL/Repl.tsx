import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { parseExpression } from '../../lib/CAOS/Parser';
import { LogWindow } from './LogWindow';

const RELEASE_VERSION = '0.0.1-alpha';

interface ConsoleOpts {
  error?: boolean;
}

export function Repl() {
  const [logMessages, setLog] = useState<string[]>(
    JSON.parse(
      localStorage.getItem('repl_messages') ?? '[]'
    ) ?? []
  );

  const consoleLog = (msg: string, options?: ConsoleOpts) => {
    
    setLog(prevLog => {
      const result = [...prevLog, ...[`${options?.error ? 'e:' : ''}${msg}`]];
      localStorage.setItem('repl_messages', JSON.stringify(result));
      return result;
    });
  };

  const checkReturn = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      try {
        const cmd = (e.target as HTMLInputElement).value;

        if (cmd.startsWith('?')) {
          switch(cmd) {
            case "?clear":
              setLog(() => ([]));
              localStorage.removeItem('repl_messages');
              break;
            case "?version":
              consoleLog(`| Creatures 2 in Typescript Version ${RELEASE_VERSION}`)
              break;
            case "?about":
            case "?":
            default:
              consoleLog(`| Creatures 2 in Typescript Version ${RELEASE_VERSION}`)
              consoleLog(`| A labour of love, by Robin Duckett`);
              break;
          }

          (e.target as HTMLInputElement).value = '';
          return;
        }

        consoleLog(`> ${cmd}`);

        const result = parseExpression(cmd);

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
    if (logMessages.length === 0) {
      consoleLog('> Welcome to the house of fun');
      consoleLog('# ' + (new Date()).toISOString());
    }
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
