import React, { useContext, useState, useEffect } from 'react';
import 'swiper/css';
import { SelectDollContext } from '../context/selectDoll';
import { Doll } from '../data/dolls';
import { mergeAlgorithmSet } from '../data/algorithms';
import DollIcon from './dollIcon';
import AlgorithmSetView from './algorithmSetView';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { DollsContext } from '../context/dolls';

export const DialogStyled = styled(Dialog)(() => ({
   WebkitTouchCallout: 'none',
   userSelect: 'none',
   '.MuiDialog-paper': {
      backgroundColor: 'transparent',
      borderRadius: 0,
   },
}));

export const DialogTitleStyled = styled(DialogTitle)(() => ({
   height: 44,
   backgroundColor: 'rgba(42,42,42,0.8)',
   color: 'white',
   width: '100%',
   textAlign: 'center',
   padding: 8,
}));

export const DialogContentStyled = styled(DialogContent)(() => ({
   backgroundColor: 'rgba(234,234,234,0.85)',
   padding: '20px 20px 0 20px !important',
   '.algorithm-doll-background': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#a9abab',
      padding: 4,
      marginBottom: 6,
   },
   '.algorithm-background': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#424242',
      padding: 12,
      borderRadius: 4,
      boxSizing: 'content-box',
      flexFlow: 'wrap',
   },
}));

export const DialogActionsStyled = styled(DialogActions)(() => ({
   backgroundColor: 'rgba(234,234,234,0.85)',
   justifyContent: 'center',
   // '.MuiButtonBase-root': {
   //    backgroundColor: '#ee7a30 !important',
   // },
}));

const DollAlgorithmView: React.FC = () => {
   const { showDoll, setShowDoll } = useContext(SelectDollContext);
   const { dolls } = useContext(DollsContext);
   const [dollData, setDollData] = useState<Doll>();

   useEffect(() => {
      if (showDoll === null || showDoll[0] !== 'info') {
         return;
      }
      setDollData(dolls[showDoll[1]]);
   }, [dolls, showDoll]);

   return (
      <DialogStyled
         open={showDoll?.[0] === 'info'}
         onClose={() => {
            setShowDoll(null);
         }}
         maxWidth={false}
      >
         <DialogTitleStyled id="alert-dialog-title">
            {dollData?.name ?? ''}
         </DialogTitleStyled>
         <DialogContentStyled>
            <div className="algorithm-doll-background">
               {dollData && <DollIcon doll={dollData} />}
               <Button
                  variant="contained"
                  onClick={() => {
                     if (!showDoll) {
                        return;
                     }
                     setShowDoll(['edit', showDoll[1]]);
                  }}
               >
                  알고리즘 수정
               </Button>
            </div>
            <div className="algorithm-background">
               {(() => {
                  if (!dollData) {
                     return null;
                  }

                  return mergeAlgorithmSet(dollData.algorithms).map(
                     algorithm => (
                        <AlgorithmSetView
                           key={`dialog_${showDoll?.[1] ?? '?'}_${
                              algorithm[0]
                           }`}
                           algorithmSet={algorithm}
                           showDay
                        />
                     )
                  );
               })()}
            </div>
         </DialogContentStyled>
         <DialogActionsStyled>
            <Button
               variant="contained"
               onClick={() => {
                  setShowDoll(null);
               }}
            >
               확인
            </Button>
         </DialogActionsStyled>
      </DialogStyled>
   );
};

export default React.memo(DollAlgorithmView);
