import React, {
   useCallback,
   useEffect,
   useMemo,
   useState,
   useContext,
} from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { debounce } from 'lodash';
import Backdrop from '@mui/material/Backdrop';
import { SelectDollContext } from '../context/selectDoll';
import DataObjectIcon from '@mui/icons-material/DataObject';

const SideMenu: React.FC = () => {
   const { showDoll, setShowDoll } = useContext(SelectDollContext);

   const [open, setOpen] = React.useState<boolean>(false);
   const [scrollY, setScrollY] = useState(0);

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   useEffect(() => {
      if (showDoll != null) {
         return;
      }
      window.setTimeout(() => {
         handleClose();
      }, 10);
   }, [showDoll]);

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

   const hidden = useMemo<boolean>(() => Boolean(showDoll), [showDoll]);

   return (
      <>
         <Backdrop open={open} sx={{ zIndex: 10 }} />
         <SpeedDial
            ariaLabel="side-menu"
            sx={{
               position: 'absolute',
               bottom: 20 - scrollY,
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
                  setShowDoll(['add', '']);
               }}
            />
            <SpeedDialAction
               icon={<DataObjectIcon />}
               tooltipTitle="데이터"
               tooltipOpen
               onClick={() => {
                  setShowDoll(['data', '']);
               }}
            />
         </SpeedDial>
      </>
   );
};

export default React.memo(SideMenu);
