import React, { useCallback, useMemo, useContext } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import { rarityColors } from '../data/dolls';
import DollIcon from './dollIcon';
import { styled } from '@mui/material/styles';
import { toPairs, fromPairs } from 'lodash';
import { useLongPress } from 'use-long-press';
import { SelectDollContext } from '../context/selectDoll';
import { DollsContext } from '../context/dolls';

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
   const { setShowDoll } = useContext(SelectDollContext);
   const { dolls } = useContext(DollsContext);

   const dollData = useMemo(() => dolls[doll], [doll]);

   const handleClick = useCallback(
      () => onChange?.(doll, !checked),
      [doll, onChange, checked]
   );

   const handleLongPress = useCallback(
      () => setShowDoll(['info', doll]),
      [doll, setShowDoll]
   );

   const bind = useLongPress(handleLongPress, {
      threshold: 600,
      cancelOnMovement: 6,
   });

   return (
      <DollButton
         focusRipple
         size={size}
         className={`rarity-${dollData.rarity}`}
         onClick={handleClick}
         {...bind()}
      >
         <DollIcon size={size} doll={dollData} disabled={!checked} />
      </DollButton>
   );
};

export default React.memo(ImageCheckbox);
