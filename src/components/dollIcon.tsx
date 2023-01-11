import React from 'react';
import { styled } from '@mui/material/styles';
import colorMix from '../utils/blendColors';
import Image from 'react-image-webp';
import { Doll, rarityColors } from '../data/dolls';
import './dollIcon.css';

interface StyledIconProps {
   size: number;
   color?: string;
}

const StyledIcon = styled('div')<StyledIconProps>(({ theme, size, color }) => {
   const mainColor: string = color || theme.palette.info.main;
   const sideSize = Math.round(size / 4);
   const sideIconSize = Math.round(size / 4.5);

   return {
      // position: 'relative',
      // width: size,
      // height: size,
      // margin: 4,
      // padding: 0,

      // '.doll-icon': {
      //    filter: 'grayscale(0%)',
      //    opacity: 1,
      //    borderRadius: 6,
      // },
      // '.rarity-border': {
      //    position: 'absolute',
      //    left: 0,
      //    top: 0,
      //    width: size,
      //    height: size,
      //    boxSizing: 'border-box',
      //    border: `${mainColor} solid 3px`,
      //    borderRadius: 6,
      //    filter: 'grayscale(0%)',
      // },
      // '.rarity-background': {
      //    position: 'absolute',
      //    left: 0,
      //    top: 0,
      //    width: size,
      //    height: size,
      //    backgroundColor: colorMix(mainColor, '#333', 0.6),
      //    borderRadius: 6,
      //    filter: 'grayscale(0%)',
      // },
      // '.side-background': {
      //    position: 'absolute',
      //    left: 0,
      //    top: 0,
      //    BorderTopLeftRadius: 6,
      // },
      // '.side-icons': {
      //    position: 'absolute',
      //    left: 2,
      //    top: 2,
      //    width: sideIconSize,
      //    height: sideIconSize,
      //    objectFit: 'contain',
      // },

      '&.image-disabled .doll-icon': {
         filter: 'grayscale(100%)',
         opacity: 0.5,
      },
      '&.image-disabled .rarity-border, &.image-disabled .rarity-background': {
         filter: 'grayscale(75%)',
      },
   };
});

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
