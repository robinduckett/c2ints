import * as React from 'react';

import useEffect = React.useEffect;
import useRef = React.useRef;

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { App } from '../lib/App/Main';
import { UI } from './UI';
import theme from './theme';

export default function SmallFurryCreatures() {
  const appRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (appRef) {
      new App(appRef.current as HTMLCanvasElement);
    }
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UI />
        <canvas ref={appRef}></canvas>
      </ThemeProvider>
    </React.Fragment>
  );
}
