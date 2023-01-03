import React from 'react';
import logo from './logo.svg';
import './App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Checkbox from '@mui/material/Checkbox';
import _ from 'lodash';
import { dolls } from './data/dolls';
import ImageCheckbox from './components/imageCheckbox';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
   position: 'relative',
   width: 48,
   height: 48,
   [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
   },
   '.MuiTouchRipple-child': {
      backgroundColor: `${theme.palette.info.main} !important`,
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
         border: `4px solid ${theme.palette.info.main}`,
      },
   },
   '.MuiCheckbox-root': {
      padding: 0,
   },
}));

function App() {
   const imgUrl = `${process.env.PUBLIC_URL}/persicaria.webp`;

   const data = _.toPairs(dolls).map(([, doll]) => doll);

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
               {data.map(({ iconPng, iconWebp }) => (
                  <ImageCheckbox imgUrl={iconPng} webpUrl={iconWebp} />

                  // <ImageButton focusRipple>
                  //    <Checkbox
                  //       disableRipple
                  //       icon={
                  //          <picture>
                  //             <source srcSet={iconWebp} type="image/webp" />
                  //             <img
                  //                src={iconPng}
                  //                alt="checkbox"
                  //                style={{ filter: 'grayscale(100%)' }}
                  //                width={48}
                  //                height={48}
                  //             />
                  //          </picture>
                  //       }
                  //       checkedIcon={
                  //          <picture>
                  //             <source srcSet={iconWebp} type="image/webp" />
                  //             <img
                  //                src={iconPng}
                  //                alt="checkbox"
                  //                width={48}
                  //                height={48}
                  //             />
                  //          </picture>
                  //       }
                  //    />
                  // </ImageButton>
               ))}
            </Box>
         </header>
      </div>
   );
}

export default App;
