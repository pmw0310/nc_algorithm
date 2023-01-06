import React, { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Checkbox from '@mui/material/Checkbox';
import colorMix from '../utils/blendColors';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

interface ImageButtonProps {
   size: number;
   color?: string;
}

const ImageButton = styled(ButtonBase)<ImageButtonProps>(
   ({ theme, size, color }) => {
      const mainColor = color || theme.palette.info.main;

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
            img: {
               filter: 'grayscale(75%)',
               opacity: 0.75,
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
         },
         '.MuiCheckbox-root.Mui-checked': {
            img: {
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
   imgUrl: string;
   size?: number;
   color?: string;
}

const ImageCheckbox: React.FC<ImageCheckboxProps> = ({
   size = 48,
   imgUrl,
   webpUrl,
   color,
}) => {
   const image = useMemo(() => {
      const img = (
         <img src={imgUrl} alt="checkbox" width={size} height={size} />
      );

      return (
         <>
            <div className="rarity-background" />
            {webpUrl ? (
               <picture>
                  <source srcSet={webpUrl} type="image/webp" />
                  {img}
               </picture>
            ) : (
               img
            )}
            <div className="rarity-border" />
         </>
      );
   }, [size, imgUrl, webpUrl]);

   return (
      <ImageButton focusRipple size={size} color={color}>
         {/* <div className="rarity-background" /> */}
         <Checkbox disableRipple icon={image} checkedIcon={image} />
         {/* <div className="rarity-border" /> */}
      </ImageButton>
   );
};

export default ImageCheckbox;
