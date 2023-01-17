import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as BlackOlfIcon } from './blackolf.svg';
import { DayProvider } from './context/day';
import { SelectDollProvider } from './context/selectDoll';
import Container from '@mui/material/Container';

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
               fontFamily: ['IBM Plex Sans KR', 'sans-serif'].join(','),
            },
            html: {
               WebkitTouchCallout: 'none',
               userSelect: 'none',
            },
         }}
      />
      <Container
         style={{
            minHeight: '100vh',
         }}
         fixed
      >
         <DayProvider>
            <SelectDollProvider>
               <App />
            </SelectDollProvider>
         </DayProvider>
      </Container>
      <footer
         style={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'flex-end',
         }}
      >
         <span>제작 : </span>
         <SvgIcon style={{ margin: '0 2px' }}>
            <BlackOlfIcon />
         </SvgIcon>
         <span>
            <div style={{ fontWeight: 500 }}>BlackOlf</div>
            <div style={{ fontSize: 8, lineHeight: 0.3 }}>(UID : 1188093)</div>
         </span>
      </footer>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
