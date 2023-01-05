import React, { cloneElement, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Checkbox from '@mui/material/Checkbox';
import colorMix from '../utils/blendColors';

interface ImageButtonProps {
   size: number;
}

const ImageButton = styled(ButtonBase)<ImageButtonProps>(({ theme, size }) => ({
   position: 'relative',
   width: size,
   height: size,
   margin: 4,
   '.MuiTouchRipple-child': {
      backgroundColor: `${theme.palette.info.main} !important`,
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
         border: `4px solid ${theme.palette.info.main}`,
      },
   },
   '.MuiCheckbox-root': {
      padding: 0,
   },
   '.image-checkbox-not-checked': {
      filter: 'grayscale(100%)',
      opacity: 0.75,
   },
   picture: {
      width: size,
      height: size,
   },
   '.rarity-box': {
      position: 'absolute',
      width: size,
      height: size,
      boxSizing: 'border-box',
      border: `${theme.palette.info.main} solid 3px`,
      borderRadius: 6,
   },
   '.rarity-background': {
      position: 'absolute',
      width: size,
      height: size,
      backgroundColor: colorMix(theme.palette.info.main, '#333', 0.75),
      borderRadius: 6,
   },
}));

interface ImageCheckboxProps {
   webpUrl?: string;
   imgUrl: string;
   size?: number;
}

const ImageCheckbox: React.FC<ImageCheckboxProps> = ({
   size = 48,
   imgUrl,
   webpUrl,
}) => {
   const image = useMemo(() => {
      const img = (
         <img src={imgUrl} alt="checkbox" width={size} height={size} />
      );

      return webpUrl ? (
         <picture>
            <source srcSet={webpUrl} type="image/webp" />
            {img}
         </picture>
      ) : (
         img
      );
   }, [size, imgUrl, webpUrl]);

   return (
      <ImageButton focusRipple size={size}>
         <div className="rarity-background" />
         <Checkbox
            disableRipple
            icon={cloneElement(image, {
               className: 'image-checkbox-not-checked',
            })}
            checkedIcon={cloneElement(image, {
               className: 'image-checkbox-checked',
            })}
         />
         <div className="rarity-box" />
      </ImageButton>
   );
};

export default ImageCheckbox;
