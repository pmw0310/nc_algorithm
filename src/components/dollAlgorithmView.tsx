// import React, { useContext } from 'react';
// import { SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper';
// import 'swiper/css';
// import { SelectDollContext } from '../context/selectDoll';
// import { dolls, rarityColors } from '../data/dolls';
// import { StyledSwiper } from './weekAlgorithmView';
// import DollIcon from './dollIcon';
// import 'swiper/css';
// import AlgorithmSetView from './algorithmSetView';

// const DollAlgorithmView: React.FC = () => {
//    const { selectDolls: doll } = useContext(SelectDollContext);

//    return (
//       <StyledSwiper
//          slidesPerView={'auto'}
//          centeredSlides
//          spaceBetween={30}
//          pagination={{
//             clickable: true,
//          }}
//          modules={[Pagination]}
//       >
//          {doll.map(doll => {
//             const dollData = dolls[doll];
//             return (
//                <SwiperSlide className="algorithm-view" key={`doll_${doll}`}>
//                   {<DollIcon doll={dollData} />}
//                   <div
//                      style={{
//                         color: rarityColors[dollData.rarity],
//                         fontWeight: 'bold',
//                      }}
//                   >
//                      {dollData.name}
//                   </div>
//                   <div className="algorithm-view-main">
//                      {(() => {
//                         const { algorithms } = dollData;
//                         // const a = Algorithm.pathsToAlgorithms(algorithms);
//                         if (algorithms.length === 0) {
//                            return (
//                               <div style={{ width: 100, height: 100 }}>
//                                  <div className="algorithm-outline none-algorithm">
//                                     <div className="none-algorithm-icon" />
//                                  </div>
//                               </div>
//                            );
//                         }
//                         return algorithms.map(algorithm => (
//                            <div
//                               key={`doll_${doll}_${algorithm[0]}`}
//                               className="algorithm-outline"
//                            >
//                               <AlgorithmSetView
//                                  algorithmSet={algorithm}
//                                  showDay
//                               />
//                            </div>
//                         ));
//                      })()}
//                   </div>
//                </SwiperSlide>
//             );
//          })}
//       </StyledSwiper>
//    );
// };

// export default React.memo(DollAlgorithmView);
export default null;
