import React, { useContext, useState, useEffect, useMemo } from 'react';
import { SelectDollContext } from '../context/selectDoll';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { DollsContext } from '../context/dolls';
import LazyImage from './lazyImage';
import { isEmpty, omit } from 'lodash';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { DialogStyled } from './editAlgorithmDialog';
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { MenuItem } from './select';
import {
   DollClass,
   DollClasses,
   DOLL_CLASSES,
   Doll,
   dolls as originalDolls,
} from '../data/dolls';

const SelectStyled = styled(Select<DollClass>)(() => ({
   '.MuiSelect-select': {
      display: 'flex',
      alignItems: 'center',
      img: {
         objectFit: 'contain',
         marginRight: 8,
      },
   },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
   'label + &': {
      marginTop: theme.spacing(3),
   },
   '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create([
         'border-color',
         'background-color',
         'box-shadow',
      ]),
      '&:focus': {
         boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
         borderColor: theme.palette.primary.main,
      },
   },
}));

const initDollData: Omit<Doll, 'algorithms'> = {
   name: '',
   rarity: 2,
   iconPng: '',
   dollClass: DOLL_CLASSES[0],
   sideIcon: undefined,
};

const AddDollDialog: React.FC = () => {
   const { showDoll, setShowDoll } = useContext(SelectDollContext);
   const { dolls, addDoll, editDoll } = useContext(DollsContext);
   const [dollData, setDollData] = useState<Omit<Doll, 'algorithms'>>({
      ...initDollData,
   });

   useEffect(() => {
      if (showDoll?.[0] !== 'add') {
         return;
      }

      if (isEmpty(showDoll[1])) {
         setDollData({ ...initDollData });
      } else {
         setDollData(dolls[showDoll[1]]);
      }
   }, [dolls, showDoll]);

   const hiddenUrl = useMemo<boolean>(() => {
      if (showDoll?.[0] !== 'add') {
         return true;
      }
      return Boolean(originalDolls[showDoll[1]]);
   }, [showDoll]);

   const handleClose = () => {
      setShowDoll(null);
   };

   const handleSave = () => {
      if (showDoll?.[0] !== 'add') {
         return;
      }

      if (isEmpty(showDoll[1])) {
         const key = addDoll({ ...dollData, algorithms: [] });
         setShowDoll(['edit', key]);
         return;
      }
      editDoll(
         showDoll[1],
         hiddenUrl ? omit(dollData, ['iconPng', 'sideIcon']) : dollData
      );
      handleClose();
   };

   return (
      <DialogStyled
         open={showDoll?.[0] === 'add'}
         onClose={handleClose}
         fullScreen
      >
         <AppBar sx={{ position: 'fixed' }}>
            <Toolbar>
               <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  인형 추가
               </Typography>
               <Stack direction="row" spacing={2}>
                  <Button
                     autoFocus
                     color="error"
                     variant="contained"
                     onClick={handleClose}
                     startIcon={<CloseIcon />}
                  >
                     닫기
                  </Button>
                  <Button
                     autoFocus
                     color="primary"
                     variant="contained"
                     onClick={handleSave}
                     startIcon={<SaveIcon />}
                  >
                     저장
                  </Button>
               </Stack>
            </Toolbar>
         </AppBar>
         <Container fixed>
            <List>
               <div className="algorithm-list-item">
                  <ListItem>
                     <FormControl variant="standard" fullWidth>
                        <InputLabel shrink htmlFor="doll-name">
                           이름
                        </InputLabel>
                        <BootstrapInput
                           id="doll-name"
                           inputProps={{
                              maxLength: 16,
                           }}
                           value={dollData.name}
                           onChange={({ target: { value } }) => {
                              setDollData(doll => ({
                                 ...doll,
                                 name: value,
                              }));
                           }}
                           fullWidth
                        />
                     </FormControl>
                  </ListItem>
               </div>
               <div className="algorithm-list-item">
                  <ListItem
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyItems: 'start',
                        alignItems: 'start',
                     }}
                  >
                     <InputLabel shrink>성급</InputLabel>
                     <Rating
                        size="large"
                        defaultValue={2}
                        value={dollData.rarity}
                        max={3}
                        onChange={(_event, value) => {
                           setDollData(doll => ({
                              ...doll,
                              rarity: (value as 1 | 2 | 3) ?? 0,
                           }));
                        }}
                     />
                  </ListItem>
               </div>
               <div className="algorithm-list-item">
                  <ListItem
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyItems: 'start',
                        alignItems: 'start',
                     }}
                  >
                     <InputLabel shrink>클래스</InputLabel>
                     <SelectStyled
                        sx={{
                           minWidth: 200,
                        }}
                        defaultValue={DOLL_CLASSES[0]}
                        value={dollData.dollClass}
                        onChange={({ target: { value } }) => {
                           setDollData(doll => ({
                              ...doll,
                              dollClass: value as DollClass,
                           }));
                        }}
                     >
                        {DOLL_CLASSES.map(key => {
                           const { iconPng, iconWebp, name } = DollClasses[key];
                           return (
                              <MenuItem value={key} key={key}>
                                 <LazyImage
                                    src={iconPng}
                                    webp={iconWebp}
                                    width={18}
                                    height={18}
                                 />
                                 {name}
                              </MenuItem>
                           );
                        })}
                     </SelectStyled>
                  </ListItem>
               </div>
               {!hiddenUrl && (
                  <>
                     <div className="algorithm-list-item">
                        <ListItem>
                           <FormControl variant="standard" fullWidth>
                              <InputLabel shrink htmlFor="doll-icon">
                                 아이콘 URL
                              </InputLabel>
                              <BootstrapInput
                                 id="doll-icon"
                                 type="url"
                                 value={dollData.iconPng}
                                 fullWidth
                                 onChange={({ target: { value } }) => {
                                    setDollData(doll => ({
                                       ...doll,
                                       iconPng: value,
                                    }));
                                 }}
                              />
                           </FormControl>
                        </ListItem>
                     </div>
                     <div className="algorithm-list-item">
                        <ListItem>
                           <FormControl variant="standard" fullWidth>
                              <InputLabel shrink htmlFor="doll-side-icon">
                                 사이드 아이콘 URL
                              </InputLabel>
                              <BootstrapInput
                                 id="doll-side-icon"
                                 type="url"
                                 value={dollData.sideIcon?.iconPng ?? ''}
                                 fullWidth
                                 onChange={({ target: { value } }) => {
                                    setDollData(doll => ({
                                       ...doll,
                                       sideIcon: isEmpty(value)
                                          ? undefined
                                          : { iconPng: value },
                                    }));
                                 }}
                              />
                           </FormControl>
                        </ListItem>
                     </div>
                  </>
               )}
            </List>
         </Container>
      </DialogStyled>
   );
};

export default React.memo(AddDollDialog);
