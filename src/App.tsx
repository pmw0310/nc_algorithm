import React from 'react';
import logo from './logo.svg';
import './App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Checkbox from '@mui/material/Checkbox';
import _ from 'lodash';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
   position: 'relative',
   width: 48,
   height: 48,
   [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
   },
   '.MuiTouchRipple-child': {
      backgroundColor: theme.palette.info.main,
   },
   '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
         opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
         opacity: 0,
      },
      '& .MuiTypography-root': {
         border: '4px solid currentColor',
      },
   },
   '.MuiCheckbox-root': {
      padding: 0,
   },
}));

function App() {
   const imgUrl = `${process.env.PUBLIC_URL}/persicaria.webp`;

   return (
      <div className="App">
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
               Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
               className="App-link"
               href="https://reactjs.org"
               target="_blank"
               rel="noopener noreferrer"
            >
               Learn React
            </a>
            <p />
            <Box
               sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  minWidth: 300,
                  width: '100%',
               }}
            >
               {_.fill(
                  Array(20),
                  <ImageButton focusRipple>
                     <Checkbox
                        disableRipple
                        icon={
                           <img
                              src={imgUrl}
                              alt="checkbox"
                              style={{ opacity: 0.2 }}
                              width={48}
                              height={48}
                           />
                        }
                        checkedIcon={
                           <img
                              src={imgUrl}
                              alt="checkbox"
                              width={48}
                              height={48}
                           />
                        }
                     />
                  </ImageButton>
               )}
            </Box>
         </header>
      </div>
   );
}

export default App;
