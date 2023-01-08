import React, { useEffect, useMemo, useRef, useState } from 'react';
import { toPairs, range, isNil } from 'lodash';
import { dolls, DOLL_CLASSES, rarityColors, DollClasses } from './data/dolls';
import { Algorithm } from './data/algorithm';
import ImageCheckbox from './components/imageCheckbox';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Image from 'react-image-webp';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DollClassList = styled(Grid)(() => ({
   padding: '2px 0',
   '.class-info': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   },
   '.class-box-main': {
      background: '#323338',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '24px',
      height: '24px',
      borderRadius: 8,
      margin: '4px',
      img: {
         objectFit: 'contain',
         width: 18,
         height: 18,
      },
   },
   '.class-title': {
      fontWeight: 'bold',
   },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
   '.slick-dots': {
      height: 14,
      bottom: -14,
      '.slick-dot': {
         height: 7,
         backgroundColor: '#252525',
         opacity: 0.5,
      },
      '.slick-active .slick-dot': {
         backgroundColor: '#FC8A00',
         opacity: 1,
      },
   },
   '.algorithm-view': {
      minWidth: Math.round(theme.breakpoints.values.sm / 3),
      display: 'flex !important',
      alignItems: 'center !important',
      flexDirection: 'column',
      padding: 8,
      '.day-title': {
         color: '#929292',
         fontWeight: 'bold',
         paddingBottom: 6,
      },
      '&.now-day .day-title': {
         color: '#FC8A00',
      },
      '.algorithm-view-main': {
         display: 'flex',
         border: `#585858 solid 2px`,
         background:
            'linear-gradient(135deg, #4f4f50 25%, #252525 0, #252525 50%, #4f4f50 0, #4f4f50 75%, #252525 0)',
         backgroundSize: '6px 6px',
      },
      '.algorithm-outline': {
         display: 'inherit',
         margin: 2,
         padding: 2,
         backgroundColor: 'rgba(255,255,255,0.35)',
      },
      '.none-algorithm': {
         backgroundColor: 'rgba(0,0,0,0.5)',
         width: 'calc(100% - 4px)',
         height: 'calc(100% - 4px)',
         '.none-algorithm-icon': {
            width: '100%',
            height: '100%',
            position: 'relative',
         },
         '.none-algorithm-icon:before, .none-algorithm-icon:after': {
            position: 'absolute',
            bottom: '27.5%',
            left: '50%',
            content: '""',
            height: 40,
            width: 2,
            backgroundColor: '#464646',
         },
         '.none-algorithm-icon:before': {
            transform: 'rotate(45deg)',
         },
         '.none-algorithm-icon:after': {
            transform: 'rotate(-45deg)',
         },
      },
   },
}));

const App: React.FC = () => {
   const [dollCheck, setDollCheck] = useState<Record<string, boolean>>(
      (() => {
         const data = localStorage.getItem('dollCheck');
         if (isNil(data)) {
            return {};
         }
         return JSON.parse(data);
      })()
   );
   const sliderRef = useRef<Slider | null>(null);

   const data = useMemo(
      () => toPairs(dolls).map(([key, doll]) => ({ ...doll, key })),
      []
   );

   const nowDay = useMemo(() => {
      const now = new Date();
      const utc4 = new Date(
         now.getTime() + now.getTimezoneOffset() * 60000 + 14400000
      );
      return utc4.getDay();
   }, []);

   const algorithms = useMemo(() => {
      const algorithmPaths = toPairs(dollCheck)
         .filter(([, check]) => check)
         .map(([doll]) => dolls[doll]?.algorithms ?? [])
         .flat();

      return Algorithm.pathsToAlgorithms(algorithmPaths);
   }, [dollCheck]);

   const doll = useMemo(
      () =>
         toPairs(dollCheck)
            .filter(([_key, value]) => value)
            .map(([key]) => key),
      [dollCheck]
   );

   useEffect(() => {
      localStorage.setItem('dollCheck', JSON.stringify(dollCheck));
   }, [dollCheck]);

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
               <DollClassList container key={className}>
                  <Grid className="class-info" xs={1}>
                     <div className="class-box-main">
                        <Image
                           src={DollClasses[className].iconPng}
                           webp={DollClasses[className].iconWebp}
                        />
                     </div>
                     <div className="class-title">
                        {DollClasses[className].name}
                     </div>
                  </Grid>
                  <Grid xs={11}>
                     {classDollList.map(({ key, ...doll }) => (
                        <ImageCheckbox
                           key={key}
                           doll={doll}
                           size={64}
                           color={rarityColors[doll.rarity]}
                           checked={dollCheck[key]}
                           onChange={(
                              _event: React.ChangeEvent<HTMLInputElement>,
                              checked: boolean
                           ) => {
                              setDollCheck(dollCheck => ({
                                 ...dollCheck,
                                 [key]: checked,
                              }));
                           }}
                        />
                     ))}
                  </Grid>
               </DollClassList>
            );
         })}
         <StyledSlider
            dots
            centerMode
            slidesToShow={1}
            slidesToScroll={1}
            variableWidth
            infinite={false}
            swipeToSlide
            ref={slider => {
               sliderRef.current = slider;
            }}
            onInit={() => {
               if (nowDay >= 1 && nowDay <= 5) {
                  sliderRef.current?.slickGoTo(nowDay - 1);
               }
            }}
            customPaging={() => <div className="slick-dot" />}
         >
            {range(1, 6).map(day => (
               <div
                  className={`algorithm-view${
                     nowDay === day ? ' now-day' : ''
                  }`}
                  key={`day_${day}`}
               >
                  <div className="day-title">{`${(() => {
                     switch (day) {
                        case 1:
                           return '월';
                        case 2:
                           return '화';
                        case 3:
                           return '수';
                        case 4:
                           return '목';
                        case 5:
                           return '금';
                     }
                  })()}요일`}</div>
                  <div className="algorithm-view-main">
                     {(() => {
                        const a = algorithms.filter(
                           algorithm => algorithm.getDayObtained() === day
                        );
                        if (a.length === 0) {
                           return (
                              <div style={{ width: 100, height: 100 }}>
                                 <div className="algorithm-outline none-algorithm">
                                    <div className="none-algorithm-icon" />
                                 </div>
                              </div>
                           );
                        }
                        return a.map(algorithm => (
                           <div
                              key={`day_${day}_${algorithm.getKey()}`}
                              className="algorithm-outline"
                           >
                              {algorithm.toElement(doll)}
                           </div>
                        ));
                     })()}
                  </div>
               </div>
            ))}
         </StyledSlider>
      </Container>
   );
};

export default App;
