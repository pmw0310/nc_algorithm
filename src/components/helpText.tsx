import React, { useRef } from 'react';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { Glitch } from 'react-teffex';
import useIntersectionObsever from '../hooks/useIntersectionObsever';

const HelpText: React.FC = () => {
   const ref = useRef<HTMLDivElement>(null);
   const isInViewport = useIntersectionObsever(ref);

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
         <TouchAppIcon
            style={{
               marginRight: 8,
            }}
         />
         {isInViewport && (
            <Glitch
               speed={10}
               alphabet
               dontGlitch
               buffer={0}
               glitchSpeed={10}
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
