import React, { useEffect, useMemo, useState } from 'react';
import { toPairs, range, isNil } from 'lodash';
import { dolls, DOLL_CLASSES, rarityColors, DollClasses } from './data/dolls';
import { Algorithm } from './data/algorithm';
import DollCheckbox from './components/dollCheckbox';
import DollIcon from './components/dollIcon';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Image from 'react-image-webp';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';

interface TabPanelProps {
   children?: React.ReactNode;
   index: number;
   value: number;
}

function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && children}
      </div>
   );
}

function a11yProps(index: number) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}

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

const StyledSwiper = styled(Swiper)(({ theme }) => ({
   '.swiper-pagination': {
      height: 14,
      display: 'flex',
      justifyContent: 'center',
      '.swiper-pagination-bullet': {
         width: 18,
         height: 7,
         backgroundColor: '#252525',
         opacity: 0.5,
         margin: '0 4px',
      },
      '.swiper-pagination-bullet.swiper-pagination-bullet-active': {
         backgroundColor: '#FC8A00',
         opacity: 1,
      },
   },
   '.swiper-slide': {
      height: 'auto',
   },
   '.algorithm-view': {
      minWidth: Math.round(theme.breakpoints.values.sm / 3),
      maxWidth: 'calc(100vw - 32px)',
      width: 'auto',
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
         flexFlow: 'wrap',
         justifyContent: 'center',
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
         width: 'calc(100% - 8px)',
         height: 'calc(100% - 8px)',
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

const StyledTabs = styled(Tabs)(() => ({
   backgroundColor: '#1d1d1e',
   '.MuiButtonBase-root': {
      color: '#888888',
      img: {
         filter:
            'invert(45%) sepia(3%) saturate(0%) hue-rotate(61deg) brightness(99%) contrast(92%)',
      },
   },
   '.Mui-selected': {
      backgroundColor: '#4d4e4e !important',
      color: '#FC8A00 !important',
      fontWeight: 'bold',
      img: {
         filter:
            'invert(48%) sepia(96%) saturate(1271%) hue-rotate(5deg) brightness(103%) contrast(104%)',
      },
   },
   '.MuiTabs-indicator': {
      display: 'none',
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
   const [value, setValue] = React.useState(0);

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

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
      <Container style={{ minHeight: '100vh' }} fixed>
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
                        <DollCheckbox
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
         <Box
            sx={{
               width: '100%',
               height: 'calc(100% + 28px)',
               border: '#1d1d1e solid 2px',
               backgroundColor: '#4d4e4e',
            }}
         >
            <Box>
               <StyledTabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
               >
                  <Tab
                     label="요일별 알고리즘"
                     icon={
                        <Image
                           src="https://i.ibb.co/zRtS7BD/calendar-icon.png"
                           webp="https://i.ibb.co/XbZvdK1/calendar-icon.webp"
                           width={24}
                           height={24}
                        />
                     }
                     iconPosition="start"
                     {...a11yProps(0)}
                  />
                  <Tab
                     label="개별 알고리즘"
                     icon={
                        <Image
                           src="https://i.ibb.co/WFZwNzh/people-icon.png"
                           webp="https://i.ibb.co/3pzq46K/people-icon.webp"
                           width={24}
                           height={24}
                        />
                     }
                     iconPosition="start"
                     {...a11yProps(1)}
                  />
               </StyledTabs>
            </Box>
            <TabPanel value={value} index={0}>
               <StyledSwiper
                  slidesPerView={'auto'}
                  centeredSlides
                  spaceBetween={30}
                  pagination={{
                     clickable: true,
                     renderBullet: (index, className) => {
                        return '<span class="' + className + '"></span>';
                     },
                  }}
                  modules={[Pagination]}
               >
                  {range(1, 6).map(day => (
                     <SwiperSlide
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
                     </SwiperSlide>
                  ))}
               </StyledSwiper>
            </TabPanel>
            <TabPanel value={value} index={1}>
               <StyledSwiper
                  slidesPerView={'auto'}
                  centeredSlides
                  spaceBetween={30}
                  pagination={{
                     clickable: true,
                  }}
                  modules={[Pagination]}
               >
                  {doll.map(doll => {
                     const dollData = dolls[doll];
                     return (
                        <SwiperSlide
                           className="algorithm-view"
                           key={`doll_${doll}`}
                        >
                           {<DollIcon doll={dollData} />}
                           <div
                              style={{
                                 color: rarityColors[dollData.rarity],
                                 fontWeight: 'bold',
                              }}
                           >
                              {dollData.name}
                           </div>
                           <div className="algorithm-view-main">
                              {(() => {
                                 const { algorithms } = dollData;
                                 const a =
                                    Algorithm.pathsToAlgorithms(algorithms);
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
                                       key={`doll_${doll}_${algorithm.getKey()}`}
                                       className="algorithm-outline"
                                    >
                                       {algorithm.toElement(undefined, true)}
                                    </div>
                                 ));
                              })()}
                           </div>
                        </SwiperSlide>
                     );
                  })}
               </StyledSwiper>
            </TabPanel>
         </Box>
      </Container>
   );
};

export default App;
