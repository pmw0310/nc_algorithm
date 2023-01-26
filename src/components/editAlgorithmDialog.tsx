import React, { useContext, useState, useEffect } from 'react';
import 'swiper/css';
import { SelectDollContext } from '../context/selectDoll';
import { Doll } from '../data/dolls';
import { mergeAlgorithmSet } from '../data/algorithms';
import DollIcon from './dollIcon';
import AlgorithmSetView from './algorithmSetView';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { DollsContext } from '../context/dolls';

const EditAlgorithmDialog: React.FC = () => {
   const { showDoll, setShowDoll } = useContext(SelectDollContext);
   const { dolls } = useContext(DollsContext);

   const handleClose = () => {
      setShowDoll(null);
   };

   return (
      <Dialog open={showDoll?.[0] === 'edit'} onClose={handleClose} fullScreen>
         <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
               <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
               >
                  <CloseIcon />
               </IconButton>
               <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Sound
               </Typography>
               <Button autoFocus color="inherit" onClick={handleClose}>
                  save
               </Button>
            </Toolbar>
         </AppBar>
         <List>
            <ListItem>
               <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem>
               <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
               />
            </ListItem>
         </List>

         {/* <DialogTitleStyled id="alert-dialog-title">
            {dollData?.name ?? ''}
         </DialogTitleStyled>
         <DialogContentStyled>
            <div className="algorithm-doll-background">
               {dollData && <DollIcon doll={dollData} />}
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
         </DialogActionsStyled> */}
      </Dialog>
   );
};

export default React.memo(EditAlgorithmDialog);
