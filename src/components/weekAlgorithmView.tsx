import React, { useMemo, useContext } from 'react';
import { toPairs, range } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled } from '@mui/material/styles';
import { Pagination } from 'swiper';
import { DayContext } from '../context/day';
import 'swiper/css';
import { SelectDollContext } from '../context/selectDoll';
import { Algorithm } from '../data/algorithm';
import { dolls } from '../data/dolls';

export const StyledSwiper = styled(Swiper)(({ theme }) => ({
   userSelect: 'none',

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

const days = range(1, 6);

const WeekAlgorithmView: React.FC = () => {
   const { day: nowDay } = useContext(DayContext);
   const { selectDoll: dollCheck } = useContext(SelectDollContext);

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
            .filter(([, value]) => value)
            .map(([key]) => key),
      [dollCheck]
   );

   return (
      <StyledSwiper
         slidesPerView={'auto'}
         centeredSlides
         spaceBetween={30}
         initialSlide={days.findIndex(d => d === nowDay)}
         pagination={{
            clickable: true,
            renderBullet: (_index, className) => {
               return `<span class="${className}"></span>`;
            },
         }}
         modules={[Pagination]}
      >
         {days.map(day => (
            <SwiperSlide
               className={`algorithm-view${nowDay === day ? ' now-day' : ''}`}
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
   );
};

export default React.memo(WeekAlgorithmView);
