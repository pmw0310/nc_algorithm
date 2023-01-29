import React, { useContext, useState, useEffect } from 'react';
import { SelectDollContext } from '../context/selectDoll';
import { Doll } from '../data/dolls';
import DollIcon from './dollIcon';
import Button from '@mui/material/Button';
import { DollsContext } from '../context/dolls';
import DeleteIcon from '@mui/icons-material/Delete';
import {
   DialogStyled,
   DialogTitleStyled,
   DialogContentStyled,
   DialogActionsStyled,
} from './dollAlgorithmDialog';
import CloseIcon from '@mui/icons-material/Close';

const RemoveDollDialog: React.FC = () => {
   const { showDoll, setShowDoll, setSelect } = useContext(SelectDollContext);
   const { dolls, removeDoll } = useContext(DollsContext);
   const [dollData, setDollData] = useState<Doll>();

   useEffect(() => {
      if (showDoll === null || showDoll[0] !== 'remove') {
         return;
      }
      setDollData(dolls[showDoll[1]]);
   }, [dolls, showDoll]);

   return (
      <DialogStyled
         open={showDoll?.[0] === 'remove'}
         onClose={() => {
            setShowDoll(null);
         }}
         maxWidth={false}
      >
         <DialogTitleStyled id="alert-dialog-title">
            인형 삭제
         </DialogTitleStyled>
         <DialogContentStyled>
            <div className="algorithm-doll-background">
               {dollData && <DollIcon doll={dollData} />}
            </div>
            <div
               className="algorithm-background"
               style={{ color: '#fff', fontSize: 20 }}
            >
               {dollData?.name ?? 'unknown'}을(를) 삭제하시겠습니까?
            </div>
         </DialogContentStyled>
         <DialogActionsStyled>
            <Button
               variant="contained"
               startIcon={<CloseIcon />}
               color="warning"
               onClick={() => {
                  setShowDoll(null);
               }}
            >
               취소
            </Button>
            <Button
               variant="contained"
               color="error"
               startIcon={<DeleteIcon />}
               onClick={() => {
                  if (!showDoll) {
                     return;
                  }

                  setSelect(showDoll[1], false);
                  removeDoll(showDoll[1]);
                  setShowDoll(null);
               }}
            >
               삭제
            </Button>
         </DialogActionsStyled>
      </DialogStyled>
   );
};

export default React.memo(RemoveDollDialog);
