import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as BlackOlfIcon } from './blackolf.svg';
import { DayProvider } from './context/day';
import { SelectDollProvider } from './context/selectDoll';
import { DollsProvider } from './context/dolls';
import Container from '@mui/material/Container';
import buildTime from './buildTime.json';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const fontFamily = ['IBM Plex Sans KR', 'sans-serif'].join(',');

const theme = createTheme({
   palette: {
      primary: {
         main: '#ee7a30',
         contrastText: '#faf5f5',
      },
      error: {
         main: '#8d3734',
         contrastText: '#faf5f5',
      },
      secondary: {
         main: '#d1d1d3',
         contrastText: '#0a0a0a',
      },
      success: {
         main: '#536a2d',
         contrastText: '#a9ca40',
      },
   },
   typography: {
      fontFamily,
   },
});

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);
root.render(
   <React.StrictMode>
      <CssBaseline />
      <GlobalStyles
         styles={{
            body: {
               backgroundColor: '#eaeaea',
               fontFamily,
            },
            html: {
               WebkitTouchCallout: 'none',
               userSelect: 'none',
            },
         }}
      />
      <ThemeProvider theme={theme}>
         <Container
            style={{
               minHeight: '100vh',
            }}
            fixed
         >
            <DayProvider>
               <DollsProvider>
                  <SelectDollProvider>
                     <App />
                  </SelectDollProvider>
               </DollsProvider>
            </DayProvider>
         </Container>
      </ThemeProvider>
      <footer
         style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 12px',
         }}
      >
         <div style={{ fontSize: 8 }}>{`빌드 시간 : ${new Date(
            buildTime.buildTime * 1000
         ).toLocaleString('ko-KR', {
            hour12: false,
            dateStyle: 'medium',
            timeStyle: 'short',
         })}`}</div>
         <div
            style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <span>제작 : </span>
            <SvgIcon style={{ margin: '0 2px' }}>
               <BlackOlfIcon />
            </SvgIcon>
            <span>
               <div style={{ fontWeight: 500, fontSize: 12 }}>BlackOlf</div>
               <div style={{ fontSize: 8, lineHeight: 0.3 }}>
                  (UID : 1188093)
               </div>
            </span>
         </div>
      </footer>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
