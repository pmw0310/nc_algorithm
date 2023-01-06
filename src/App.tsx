import React, { useMemo } from 'react';
import './App.css';
import _ from 'lodash';
import { dolls, DOLL_CLASSES, rarityColors, DollClasses } from './data/dolls';
import ImageCheckbox from './components/imageCheckbox';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

function App() {
   const data = useMemo(
      () => _.toPairs(dolls).map(([key, doll]) => ({ ...doll, key })),
      []
   );

   return (
      <Container fixed>
         {DOLL_CLASSES.map(className => {
            const classDollList = data
               .filter(({ dollClass }) => className === dollClass)
               .sort(
                  (
                     { name: aName, rarity: aRarity },
                     { name: bName, rarity: bRarity }
                  ) => {
                     let sortIndex = 0;

                     if (aName < bName) {
                        sortIndex = -1;
                     } else if (aName > bName) {
                        sortIndex = 1;
                     }
                     if (aRarity < bRarity) {
                        sortIndex = -1;
                     } else if (aRarity > bRarity) {
                        sortIndex = 1;
                     }

                     return sortIndex;
                  }
               );

            return (
               <Grid container key={className} style={{ padding: '8px 0' }}>
                  <Grid
                     xs={1}
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}
                  >
                     <div
                        style={{
                           background: '#333',
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                           width: '24px',
                           height: '24px',
                           borderRadius: 8,
                           margin: '4px',
                        }}
                     >
                        <img
                           src={DollClasses[className].iconPng}
                           style={{
                              objectFit: 'cover',
                              height: '18px',
                           }}
                        />
                     </div>
                     <div>{DollClasses[className].name}</div>
                  </Grid>
                  <Grid xs={11}>
                     {classDollList.map(
                        ({ key, iconPng, iconWebp, rarity }) => (
                           <ImageCheckbox
                              key={key}
                              imgUrl={iconPng}
                              webpUrl={iconWebp}
                              size={64}
                              color={rarityColors[rarity]}
                           />
                        )
                     )}
                  </Grid>
               </Grid>
            );
         })}
      </Container>
   );
}

export default App;
