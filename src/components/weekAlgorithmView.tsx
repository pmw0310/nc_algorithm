import React, {
   useMemo,
   useContext,
   useEffect,
   useCallback,
   useState,
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled } from '@mui/material/styles';
import { Pagination, Virtual } from 'swiper';
import { DayContext } from '../context/day';
import 'swiper/css';
import 'swiper/css/virtual';
import { SelectDollContext } from '../context/selectDoll';
import { DAY_OBTAINED as days, mergeAlgorithmSet } from '../data/algorithms';
import { dolls } from '../data/dolls';
import AlgorithmSetView from './algorithmSetView';
import dayToString from '../utils/dayToString';
import { debounce } from 'lodash';

export const StyledSwiper = styled(Swiper)(() => ({
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
      display: 'flex !important',
      alignItems: 'center !important',
      flexDirection: 'column',
      padding: '8px 0',
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
         // border: `#585858 solid 2px`,
         // background:
         //    'linear-gradient(135deg, #4f4f50 25%, #252525 0, #252525 50%, #4f4f50 0, #4f4f50 75%, #252525 0)',
         // backgroundSize: '6px 6px',
      },
      '.algorithm-outline': {
         display: 'inherit',
         margin: 2,
         // padding: 2,
         border: 'rgba(255,255,255,0.35) solid 2px',
         // backgroundColor: 'rgba(255,255,255,0.35)',
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

const WeekAlgorithmView: React.FC = () => {
   const { day: nowDay } = useContext(DayContext);
   const { selectDolls: dollKeys } = useContext(SelectDollContext);
   const [slidesPerView, setSlidesPerView] = useState(1);

   const algorithms = useMemo(() => {
      const algorithms = dollKeys
         .map(key => {
            return dolls[key]?.algorithms;
         })
         .flat();

      return days.map(day => mergeAlgorithmSet(algorithms, day));
   }, [dollKeys]);

   const initialSlide = useMemo(() => {
      const index = days.findIndex(d => d === nowDay);
      return index === -1 ? 0 : index;
   }, [nowDay]);

   const handleResize = useCallback(
      debounce(() => {
         if (window.innerWidth > 900) {
            setSlidesPerView(2);
         } else {
            setSlidesPerView(1);
         }
      }, 500),
      []
   );

   useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return (
      <StyledSwiper
         slidesPerView={slidesPerView}
         centeredSlides
         spaceBetween={30}
         initialSlide={initialSlide}
         pagination={{
            clickable: true,
            renderBullet: (_index, className) => {
               return `<span class="${className}"></span>`;
            },
         }}
         modules={[Pagination, Virtual]}
         virtual
      >
         {days.map((day, index) => (
            <SwiperSlide
               virtualIndex={index}
               className={`algorithm-view${nowDay === day ? ' now-day' : ''}`}
               key={`day_${day}`}
            >
               <div className="day-title">{`${dayToString(day)}요일`}</div>
               <div className="algorithm-view-main">
                  {(() => {
                     const data = algorithms[index];
                     if (data.length === 0) {
                        return (
                           <div style={{ width: 100, height: 100 }}>
                              <div className="algorithm-outline none-algorithm">
                                 <div className="none-algorithm-icon" />
                              </div>
                           </div>
                        );
                     }
                     return data.map(set => (
                        <div
                           key={`day_${day}_${set[0]}`}
                           className="algorithm-outline"
                        >
                           <AlgorithmSetView algorithmSet={set} showDoll />
                        </div>
                     ));
                  })()}
               </div>
            </SwiperSlide>
         ))}
      </StyledSwiper>
   );
};

export default WeekAlgorithmView;
