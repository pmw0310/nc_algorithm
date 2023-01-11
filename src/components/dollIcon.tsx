import React, { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import colorMix from '../utils/blendColors';
import Image from 'react-image-webp';
import { Doll, rarityColors } from '../data/dolls';

interface StyledIconProps {
   size: number;
   color?: string;
   disabled?: boolean;
}

const StyledIcon = styled('div')<StyledIconProps>(
   ({ theme, size, color, disabled = false }) => {
      const mainColor: string = color || theme.palette.info.main;
      const sideSize = Math.round(size / 4);
      const sideIconSize = Math.round(size / 4.5);

      return {
         position: 'relative',
         width: size,
         height: size,
         margin: 4,
         padding: 0,
         '.doll-icon': disabled
            ? {
                 filter: 'grayscale(100%)',
                 opacity: 0.5,
                 borderRadius: 6,
              }
            : {
                 filter: 'grayscale(0%)',
                 opacity: 1,
                 borderRadius: 6,
              },
         '.rarity-border': {
            position: 'absolute',
            left: 0,
            top: 0,
            width: size,
            height: size,
            boxSizing: 'border-box',
            border: `${mainColor} solid 3px`,
            borderRadius: 6,
            filter: `grayscale(${disabled ? '75%' : '0%'})`,
         },
         '.rarity-background': {
            position: 'absolute',
            left: 0,
            top: 0,
            width: size,
            height: size,
            backgroundColor: colorMix(mainColor, '#333', 0.6),
            borderRadius: 6,
            filter: `grayscale(${disabled ? '75%' : '0%'})`,
         },
         '.side-background': {
            position: 'absolute',
            left: 0,
            top: 0,
            WebkitBorderTopLeftRadius: 6,
            borderBottom: `${sideSize}px solid transparent`,
            borderTop: `${sideSize}px solid #1c1b20`,
            borderLeft: `${sideSize}px solid #1c1b20`,
            borderRight: `${sideSize}px solid transparent`,
         },
         '.side-icons': {
            position: 'absolute',
            left: 2,
            top: 2,
            width: sideIconSize,
            height: sideIconSize,
            objectFit: 'contain',
         },
      };
   }
);

interface DollIconProps {
   size?: number;
   doll: Doll;
   disabled?: boolean;
}

const ImageIcon: React.FC<DollIconProps> = ({
   size = 48,
   doll,
   disabled = false,
}) => (
   <StyledIcon
      size={size}
      color={rarityColors[doll.rarity]}
      disabled={disabled}
   >
      <div className="rarity-background" />
      <Image
         className="doll-icon"
         src={doll.iconPng}
         webp={doll.iconWebp}
         width={size}
         height={size}
      />
      <div className="rarity-border" />
      {doll.sideIcon && (
         <>
            <div className="side-background" />
            <Image
               className="side-icons"
               src={doll.sideIcon.iconPng}
               webp={doll.sideIcon.iconWebp}
            />
         </>
      )}
   </StyledIcon>
);

export default React.memo(ImageIcon);
