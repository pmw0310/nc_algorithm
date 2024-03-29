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
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

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
   flexWrap: 'wrap',
   '.MuiButtonBase-root': {
      margin: 3,
   },
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
            </div>
            <div className="algorithm-background">
               {(() => {
                  if (!dollData) {
                     return '** error **';
                  }

                  const data = mergeAlgorithmSet(dollData.algorithms);

                  if (data.length === 0) {
                     return (
                        <div style={{ color: '#fff' }}>
                           알고리즘이 없습니다.
                        </div>
                     );
                  }

                  return data.map(algorithm => (
                     <AlgorithmSetView
                        key={`dialog_${showDoll?.[1] ?? '?'}_${algorithm[0]}`}
                        algorithmSet={algorithm}
                        showDay
                     />
                  ));
               })()}
            </div>
         </DialogContentStyled>
         <DialogActionsStyled>
            <Button
               variant="contained"
               startIcon={<CloseIcon />}
               color="info"
               onClick={() => {
                  setShowDoll(null);
               }}
            >
               확인
            </Button>
            <Button
               variant="contained"
               startIcon={<SettingsIcon />}
               onClick={() => {
                  if (!showDoll) {
                     return;
                  }
                  setShowDoll(['edit', showDoll[1]]);
               }}
            >
               알고리즘 수정
            </Button>
            <Button
               variant="contained"
               startIcon={<ManageAccountsIcon />}
               onClick={() => {
                  if (!showDoll) {
                     return;
                  }
                  setShowDoll(['add', showDoll[1]]);
               }}
            >
               인형 수정
            </Button>
            <Button
               variant="contained"
               color="error"
               startIcon={<DeleteIcon />}
               onClick={() => {
                  if (!showDoll) {
                     return;
                  }
                  setShowDoll(['remove', showDoll[1]]);
               }}
            >
               인형 삭제
            </Button>
         </DialogActionsStyled>
      </DialogStyled>
   );
};

export default React.memo(DollAlgorithmView);
