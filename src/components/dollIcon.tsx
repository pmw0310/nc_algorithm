import React from 'react';
import colorMix from '../utils/blendColors';
import { Doll, rarityColors } from '../data/dolls';
import { styled } from '@mui/material/styles';
import { toPairs, fromPairs } from 'lodash';
import LazyImage, { EMPTY_PNG } from './lazyImage';

interface StyledDollIconProps {
   size: number;
}

const StyledDollIcon = styled('div')<StyledDollIconProps>(({ size }) => {
   const sideSize = Math.round(size / 4);
   const sideIconSize = Math.round(size / 4.5);

   return {
      position: 'relative',
      padding: 0,
      width: size,
      height: size,
      '.doll-icon-image': {
         position: 'absolute',
         left: 1,
         top: 1,
         borderRadius: 5,
         width: size - 2,
         height: size - 2,
      },
      '.doll-icon-rarity-border': {
         position: 'absolute',
         left: 0,
         top: 0,
         boxSizing: 'border-box',
         borderRadius: 6,
         width: size,
         height: size,
      },
      '.doll-icon-rarity-background': {
         position: 'absolute',
         left: 0,
         top: 0,
         borderRadius: 6,
         width: size,
         height: size,
      },
      '.doll-icon-side-background': {
         position: 'absolute',
         left: 0,
         top: 0,
         borderTopLeftRadius: 6,
         borderBottom: `${sideSize}px solid transparent`,
         borderTop: `${sideSize}px solid #1c1b20`,
         borderLeft: `${sideSize}px solid #1c1b20`,
         borderRight: `${sideSize}px solid transparent`,
      },
      '.doll-icon-side-icon': {
         position: 'absolute',
         left: 2,
         top: 2,
         objectFit: 'contain',
         width: sideIconSize,
         height: sideIconSize,
      },
      ...fromPairs(
         toPairs(rarityColors)
            .map(([rarity, color]) => [
               [
                  `&.rarity-${rarity} .doll-icon-rarity-border`,
                  {
                     border: `${color} solid 3px`,
                  },
               ],
               [
                  `&.rarity-${rarity} .doll-icon-rarity-background`,
                  {
                     backgroundColor: colorMix(color, '#333', 0.6),
                  },
               ],
            ])
            .flat()
      ),
      '&.doll-icon-disabled': {
         '.doll-icon-image': {
            filter: 'grayscale(100%) opacity(0.5)',
         },
         '.doll-icon-rarity-border, &.doll-icon-disabled .doll-icon-rarity-background':
            {
               filter: 'grayscale(75%)',
            },
         '.doll-icon-side-background': {
            opacity: 0.85,
         },
         '.doll-icon-side-icon': {
            opacity: 0.65,
         },
      },
   };
});

interface DollIconProps {
   size?: number;
   doll: Doll;
   disabled?: boolean;
}

const onError: React.ReactEventHandler<HTMLImageElement> = ({ target }) => {
   const element = target as HTMLImageElement;
   element.src =
      element.className === 'doll-icon-image'
         ? 'https://i.ibb.co/MGK1Fg0/Item-Icon-Item.jpg'
         : EMPTY_PNG;
};

const ImageIcon: React.FC<DollIconProps> = ({
   size = 48,
   doll,
   disabled = false,
}) => {
   return (
      <StyledDollIcon
         size={size}
         className={`rarity-${doll.rarity} ${
            disabled ? ' doll-icon-disabled' : ''
         }`}
      >
         <div className="doll-icon-rarity-background" />
         <LazyImage
            className="doll-icon-image"
            alt={doll.name}
            src={doll.iconPng}
            webp={doll.iconWebp}
            onError={onError}
         />
         <div className="doll-icon-rarity-border" />
         {doll.sideIcon && (
            <>
               <div className="doll-icon-side-background" />
               <LazyImage
                  className="doll-icon-side-icon"
                  src={doll.sideIcon.iconPng}
                  webp={doll.sideIcon.iconWebp}
                  onError={onError}
               />
            </>
         )}
      </StyledDollIcon>
   );
};

export default React.memo(ImageIcon);
