import React from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Checkbox from '@mui/material/Checkbox';

interface ImageButtonProps {
   size: number;
}

const ImageButton = styled(ButtonBase)<ImageButtonProps>(({ theme, size }) => ({
   position: 'relative',
   width: size,
   height: size,
   [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
   },
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
   return (
      <ImageButton focusRipple size={size}>
         <Checkbox
            disableRipple
            icon={
               <picture>
                  {webpUrl && <source srcSet={webpUrl} type="image/webp" />}
                  <img
                     src={imgUrl}
                     alt="checkbox"
                     className="image-checkbox-not-checked"
                     width={48}
                     height={48}
                  />
               </picture>
            }
            checkedIcon={
               <picture>
                  {webpUrl && <source srcSet={webpUrl} type="image/webp" />}
                  <img
                     src={imgUrl}
                     alt="checkbox"
                     className="image-checkbox-checked"
                     width={48}
                     height={48}
                  />
               </picture>
            }
         />
      </ImageButton>
   );
};

export default ImageCheckbox;
