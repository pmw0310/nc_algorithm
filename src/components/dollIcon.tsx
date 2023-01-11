import React from 'react';
import colorMix from '../utils/blendColors';
import Image from 'react-image-webp';
import { Doll, rarityColors } from '../data/dolls';
import './dollIcon.css';

interface DollIconProps {
   size?: number;
   doll: Doll;
   disabled?: boolean;
}

const ImageIcon: React.FC<DollIconProps> = ({
   size = 48,
   doll,
   disabled = false,
}) => {
   const mainColor = rarityColors[doll.rarity];
   const sideSize = Math.round(size / 4);
   const sideIconSize = Math.round(size / 4.5);

   return (
      <div
         style={{
            width: size,
            height: size,
         }}
         className={`doll-icon-main${disabled ? ' doll-icon-disabled' : ''}`}
      >
         <div
            style={{
               width: size,
               height: size,
               backgroundColor: colorMix(mainColor, '#333', 0.6),
            }}
            className="doll-icon-rarity-background"
         />
         <Image
            className="doll-icon-image"
            src={doll.iconPng}
            webp={doll.iconWebp}
            width={size}
            height={size}
         />
         <div
            style={{
               width: size,
               height: size,
               border: `${mainColor} solid 3px`,
            }}
            className="doll-icon-rarity-border"
         />
         {doll.sideIcon && (
            <>
               <div
                  style={{
                     borderBottom: `${sideSize}px solid transparent`,
                     borderTop: `${sideSize}px solid #1c1b20`,
                     borderLeft: `${sideSize}px solid #1c1b20`,
                     borderRight: `${sideSize}px solid transparent`,
                  }}
                  className="doll-icon-side-background"
               />
               <Image
                  className="doll-icon-side-icon"
                  src={doll.sideIcon.iconPng}
                  webp={doll.sideIcon.iconWebp}
                  width={sideIconSize}
                  height={sideIconSize}
               />
            </>
         )}
      </div>
   );
};

export default React.memo(ImageIcon);
