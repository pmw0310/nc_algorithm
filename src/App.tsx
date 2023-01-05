import React, { useMemo } from 'react';
import './App.css';
import _ from 'lodash';
import { dolls, DOLL_CLASS, rarityColors } from './data/dolls';
import ImageCheckbox from './components/imageCheckbox';

function App() {
   const data = useMemo(
      () => _.toPairs(dolls).map(([key, doll]) => ({ ...doll, key })),
      []
   );

   return (
      <div>
         {DOLL_CLASS.map(className => {
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
               <React.Fragment key={className}>
                  <div>{className}</div>
                  <div
                     style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '100%',
                     }}
                  >
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
                  </div>
               </React.Fragment>
            );
         })}
      </div>
   );
}

export default App;
