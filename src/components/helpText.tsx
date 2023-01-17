import React from 'react';
import { Glitch } from 'react-teffex';
import { useInView } from 'react-intersection-observer';
import LazyImage from './lazyImage';

const HelpText: React.FC = () => {
   const { ref, inView } = useInView({
      threshold: 0,
      triggerOnce: true,
      delay: 100,
   });

   return (
      <div
         ref={ref}
         style={{
            display: 'flex',
            margin: 8,
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
         }}
      >
         <LazyImage
            src="https://i.ibb.co/PYg3Wg9/skill-icon-betty-skill.png"
            webp="https://i.ibb.co/tXHQ37F/skill-icon-betty-skill.webp"
            style={{
               marginRight: 4,
            }}
            width={32}
            height={32}
         />
         {inView && (
            <Glitch
               speed={20}
               alphabet
               dontGlitch
               buffer={0}
               glitchSpeed={20}
               style={{
                  maxWidth: 300,
                  width: 300,
               }}
               text={'인형 아이콘을 길게 눌러서 인형 알고리즘 확인'}
            />
         )}
      </div>
   );
};

export default React.memo(HelpText);
