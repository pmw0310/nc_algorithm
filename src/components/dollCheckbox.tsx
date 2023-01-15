import React, { useCallback, useMemo, useContext } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import { dolls, rarityColors } from '../data/dolls';
import DollIcon from './dollIcon';
import { styled } from '@mui/material/styles';
import { toPairs, fromPairs, debounce } from 'lodash';
import { useLongPress, LongPressDetectEvents } from 'use-long-press';
import { SelectDollContext } from '../context/selectDoll';

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

   const dollData = useMemo(() => dolls[doll], [doll]);

   const handleClick = useCallback(
      debounce(() => onChange?.(doll, !checked), 100),
      [doll, onChange, checked]
   );

   const handleLongPress = useCallback(
      () => setShowDoll(doll),
      [doll, setShowDoll]
   );

   const bind = useLongPress(handleLongPress, {
      onCancel: handleClick,
      filterEvents: () => true,
      threshold: 500,
      captureEvent: true,
      cancelOnMovement: true,
      detect: LongPressDetectEvents.BOTH,
   });

   return (
      <DollButton
         focusRipple
         size={size}
         className={`rarity-${dollData.rarity}`}
         {...bind()}
      >
         <DollIcon size={size} doll={dollData} disabled={!checked} />
      </DollButton>
   );
};

export default React.memo(ImageCheckbox);
