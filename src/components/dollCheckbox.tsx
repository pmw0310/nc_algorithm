import React, { useCallback, useEffect, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Checkbox from '@mui/material/Checkbox';
// import colorMix from '../utils/blendColors';
import Image from 'react-image-webp';
import { Doll, dolls } from '../data/dolls';
import Tooltip from '@mui/material/Tooltip';
import DollIcon from './dollIcon';

// interface DollButtonProps {
//    size: number;
//    color?: string;
// }

// const DollButton = styled(ButtonBase)<DollButtonProps>(
//    ({ theme, size, color }) => {
//       // const mainColor: string = color || theme.palette.info.main;

//       return {
//          position: 'relative',
//          width: size,
//          height: size,
//          margin: 4,
//          // '.MuiTouchRipple-child': {
//          //    backgroundColor: `${mainColor} !important`,
//          // },
//          // '&:hover, &.Mui-focusVisible': {
//          //    zIndex: 1,
//          //    '& .MuiImageBackdrop-root': {
//          //       opacity: 0.15,
//          //    },
//          //    '& .MuiImageMarked-root': {
//          //       opacity: 0,
//          //    },
//          //    '& .MuiTypography-root': {
//          //       border: `4px solid ${mainColor}`,
//          //    },
//          // },
//       };
//    }
// );

interface DollCheckboxProps {
   size?: number;
   checked?: boolean;
   doll: string;
   onChange?: (doll: string, checked: boolean) => void;
}

const ImageCheckbox: React.FC<DollCheckboxProps> = ({
   size = 48,
   doll,
   checked = false,
   onChange,
}) => {
   const dollData = useMemo(() => dolls[doll], [doll]);

   const handleClick = useCallback(
      () => onChange?.(doll, !checked),
      [doll, onChange]
   );

   return (
      <Tooltip arrow title={dollData.name}>
         <ButtonBase
            focusRipple
            style={{
               position: 'relative',
               width: size,
               height: size,
               margin: 4,
            }}
            onClick={handleClick}
         >
            <DollIcon size={size} doll={dollData} disabled={!checked} />
         </ButtonBase>
      </Tooltip>
   );
};

export default React.memo(ImageCheckbox);
