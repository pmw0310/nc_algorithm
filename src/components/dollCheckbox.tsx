import React, { useCallback, useMemo } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import { dolls, rarityColors } from '../data/dolls';
import Tooltip from '@mui/material/Tooltip';
import DollIcon from './dollIcon';
import { styled } from '@mui/material/styles';
import { toPairs, fromPairs } from 'lodash';

interface DollButtonProps {
   size: number;
}

const DollButton = styled(ButtonBase)<DollButtonProps>(({ size }) => ({
   position: 'relative',
   margin: 4,
   width: size,
   height: size,
   ...fromPairs(
      toPairs(rarityColors).map(([rarity, color]) => [
         `&.rarity-${rarity} .MuiTouchRipple-child`,
         {
            backgroundColor: `${color} !important`,
         },
      ])
   ),
}));

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
      [doll, onChange, checked]
   );

   return (
      <Tooltip title={dollData.name}>
         <DollButton
            focusRipple
            size={size}
            className={`rarity-${dollData.rarity}`}
            onClick={handleClick}
         >
            <DollIcon size={size} doll={dollData} disabled={!checked} />
         </DollButton>
      </Tooltip>
   );
};

export default React.memo(ImageCheckbox);
