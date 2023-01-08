import React, { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Checkbox from '@mui/material/Checkbox';
import colorMix from '../utils/blendColors';
import Image from 'react-image-webp';
import { Doll } from '../data/dolls';

interface ImageButtonProps {
   size: number;
   color?: string;
}

const ImageButton = styled(ButtonBase)<ImageButtonProps>(
   ({ theme, size, color }) => {
      const mainColor: string = color || theme.palette.info.main;
      const sideSize = Math.round(size / 4);
      const sideIconSize = Math.round(size / 4.5);

      return {
         position: 'relative',
         width: size,
         height: size,
         margin: 4,
         '.MuiTouchRipple-child': {
            backgroundColor: `${mainColor} !important`,
         },
         '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
               opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
               opacity: 0,
            },
            '& .MuiTypography-root': {
               border: `4px solid ${mainColor}`,
            },
         },
         picture: {
            width: size,
            height: size,
         },
         '.MuiCheckbox-root': {
            padding: 0,
            '.doll-icon': {
               filter: 'grayscale(100%)',
               opacity: 0.5,
            },
            '.rarity-border': {
               position: 'absolute',
               width: size,
               height: size,
               boxSizing: 'border-box',
               border: `${mainColor} solid 3px`,
               borderRadius: 6,
               filter: 'grayscale(75%)',
            },
            '.rarity-background': {
               position: 'absolute',
               width: size,
               height: size,
               backgroundColor: colorMix(mainColor, '#333', 0.6),
               borderRadius: 6,
               filter: 'grayscale(75%)',
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
         },
         '.MuiCheckbox-root.Mui-checked': {
            '.doll-icon': {
               filter: 'grayscale(0%)',
               opacity: 1,
            },
            '.rarity-border,.rarity-background': {
               filter: 'grayscale(0%)',
            },
         },
      };
   }
);

interface ImageCheckboxProps {
   webpUrl?: string;
   size?: number;
   color?: string;
   checked?: boolean;
   doll: Doll;
   onChange?: (
      event: React.ChangeEvent<HTMLInputElement>,
      checked: boolean
   ) => void;
}

const ImageCheckbox: React.FC<ImageCheckboxProps> = ({
   size = 48,
   doll,
   color,
   checked = false,
   onChange,
}) => {
   const image = useMemo(
      () => (
         <>
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
         </>
      ),
      [size, doll]
   );

   return (
      <ImageButton focusRipple size={size} color={color}>
         <Checkbox
            disableRipple
            icon={image}
            checkedIcon={image}
            checked={checked}
            onChange={onChange}
         />
      </ImageButton>
   );
};

export default ImageCheckbox;
