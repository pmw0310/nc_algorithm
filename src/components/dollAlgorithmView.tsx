import React, { useMemo, useContext } from 'react';
import { toPairs } from 'lodash';
import { SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import { SelectDollContext } from '../context/selectDoll';
import { Algorithm } from '../data/algorithm';
import { dolls, rarityColors } from '../data/dolls';
import { StyledSwiper } from './weekAlgorithmView';
import DollIcon from './dollIcon';
import 'swiper/css';

const DollAlgorithmView: React.FC = () => {
   const { selectDoll: dollCheck } = useContext(SelectDollContext);

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
         pagination={{
            clickable: true,
         }}
         modules={[Pagination]}
      >
         {doll.map(doll => {
            const dollData = dolls[doll];
            return (
               <SwiperSlide className="algorithm-view" key={`doll_${doll}`}>
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
                        const a = Algorithm.pathsToAlgorithms(algorithms);
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
   );
};

export default React.memo(DollAlgorithmView);
