import React, { useCallback, useEffect, useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {
   DialogStyled,
   DialogTitleStyled,
   DialogContentStyled,
   DialogActionsStyled,
} from './dollAlgorithmDialog';
import Button from '@mui/material/Button';
import { debounce } from 'lodash';
import { Select } from './select';

const SideMenu: React.FC = () => {
   const [open, setOpen] = React.useState<boolean>(false);
   const [hidden, setHidden] = React.useState<boolean>(false);
   const [showAddDollDialog, setShowAddDollDialog] = useState<boolean>(false);
   const [ScrollY, setScrollY] = useState(0);

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const handleFollow = useCallback(
      debounce(() => {
         setScrollY(window.pageYOffset);
      }, 250),
      []
   );

   useEffect(() => {
      window.addEventListener('scroll', handleFollow);
      return () => {
         window.removeEventListener('scroll', handleFollow);
      };
   });

   return (
      <>
         <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{
               position: 'absolute',
               bottom: 20 - ScrollY,
               right: 16,
               transition: '0.25s',
            }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            hidden={hidden}
         >
            <SpeedDialAction
               icon={<PersonAddAlt1Icon />}
               tooltipTitle="인형 추가"
               tooltipOpen
               onClick={() => {
                  setHidden(true);
                  setShowAddDollDialog(true);
               }}
            />
         </SpeedDial>

         <DialogStyled
            open={showAddDollDialog}
            onClose={() => {
               setShowAddDollDialog(false);
            }}
            maxWidth={false}
         >
            <DialogTitleStyled id="alert-dialog-title">
               인형 추가
            </DialogTitleStyled>
            <DialogContentStyled>
               <div className="algorithm-doll-background">test</div>
               <div className="algorithm-background">test</div>
            </DialogContentStyled>
            <DialogActionsStyled>
               <Button
                  variant="contained"
                  onClick={() => {
                     setShowAddDollDialog(false);
                     setHidden(false);
                     window.setTimeout(() => {
                        handleClose();
                     }, 10);
                  }}
               >
                  확인
               </Button>
            </DialogActionsStyled>
         </DialogStyled>
      </>
   );
};

export default React.memo(SideMenu);
