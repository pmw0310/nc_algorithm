import React, { useContext, useState, useEffect } from 'react';
import 'swiper/css';
import { SelectDollContext } from '../context/selectDoll';
import {
   OFFENSE_ALGORITHM_TYPE,
   STABILITY_ALGORITHM_TYPE,
   SPECIAL_ALGORITHM_TYPE,
   OFFENSE_PRIMARY_STATS_TYPE,
   OFFENSE_SECONDARY_STATS_TYPE,
   STABILITY_PRIMARY_STATS_TYPE,
   STABILITY_SECONDARY_STATS_TYPE,
   SPECIAL_PRIMARY_STATS_TYPE,
   SPECIAL_SECONDARY_STATS_TYPE,
   algorithmSetTypes,
   algorithms,
   AlgorithmType,
   AlgorithmSetTypeData,
   AlgorithmSet,
   StatsType,
   stats,
} from '../data/algorithms';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { DollsContext } from '../context/dolls';
import LazyImage from './lazyImage';
import { fromPairs, toPairs, compact } from 'lodash';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Container from '@mui/material/Container';

const DialogStyled = styled(Dialog)(() => ({}));

const ALGORITHM_DATA: Array<{
   set: AlgorithmSetTypeData;
   types: ReadonlyArray<AlgorithmType>;
   primary: ReadonlyArray<StatsType>;
   secondary: ReadonlyArray<StatsType>;
}> = [
   {
      set: algorithmSetTypes.offense,
      types: OFFENSE_ALGORITHM_TYPE,
      primary: OFFENSE_PRIMARY_STATS_TYPE,
      secondary: OFFENSE_SECONDARY_STATS_TYPE,
   },
   {
      set: algorithmSetTypes.stability,
      types: STABILITY_ALGORITHM_TYPE,
      primary: STABILITY_PRIMARY_STATS_TYPE,
      secondary: STABILITY_SECONDARY_STATS_TYPE,
   },
   {
      set: algorithmSetTypes.special,
      types: SPECIAL_ALGORITHM_TYPE,
      primary: SPECIAL_PRIMARY_STATS_TYPE,
      secondary: SPECIAL_SECONDARY_STATS_TYPE,
   },
];

type AlgorithmDialogData = Record<
   AlgorithmType,
   | {
        primary: Array<StatsType>;
        secondary: Array<StatsType>;
     }
   | undefined
   | null
>;

type AlgorithmDialogCheckedData = Record<AlgorithmType, boolean>;

interface StatsSelectProps {
   label: string;
   value: Array<StatsType>;
   onChange: (event: SelectChangeEvent<Array<string>>) => void;
   statsTypes: ReadonlyArray<StatsType>;
}

const StatsSelect: React.FC<StatsSelectProps> = ({
   label,
   value,
   onChange,
   statsTypes,
}) => {
   return (
      <FormControl fullWidth>
         <InputLabel>{label}</InputLabel>
         <Select
            multiple
            value={value}
            renderValue={selected =>
               selected.map(key => stats[key].name).join(', ')
            }
            onChange={onChange}
            input={<OutlinedInput label={label} />}
         >
            {statsTypes.map(stateType => {
               const { iconPng, iconWebp, name } = stats[stateType];

               return (
                  <MenuItem key={stateType} value={stateType}>
                     <ListItemIcon>
                        <LazyImage
                           src={iconPng}
                           webp={iconWebp}
                           width={20}
                           height={20}
                        />
                     </ListItemIcon>
                     <ListItemText primary={name} />
                  </MenuItem>
               );
            })}
         </Select>
      </FormControl>
   );
};

const EditAlgorithmDialog: React.FC = () => {
   const { showDoll, setShowDoll } = useContext(SelectDollContext);
   const { dolls, editDoll } = useContext(DollsContext);
   const [sets, setSets] = useState<AlgorithmDialogData>(
      {} as AlgorithmDialogData
   );
   const [setsChecked, setSetsChecked] = useState<AlgorithmDialogCheckedData>(
      {} as AlgorithmDialogCheckedData
   );

   const handleClose = () => {
      setShowDoll(null);
   };

   const handleSave = () => {
      if (showDoll?.[0] !== 'edit') {
         return;
      }

      const algorithms = compact(
         toPairs(sets).map(
            ([algorithm, data]) =>
               setsChecked?.[algorithm as AlgorithmType] &&
               ([
                  algorithm,
                  data?.primary ?? [],
                  data?.secondary ?? [],
               ] as AlgorithmSet)
         )
      );
      editDoll(showDoll[1], { algorithms });
      handleClose();
   };

   const handleToggle = (type: AlgorithmType) => () => {
      setSetsChecked(data => ({
         ...data,
         [type]: !data[type],
      }));
      setSets(data => ({
         ...data,
         [type]: data[type] && {},
      }));
   };

   useEffect(() => {
      if (showDoll?.[0] !== 'edit') {
         return;
      }

      const { algorithms } = dolls[showDoll[1]];

      setSets(
         fromPairs(
            algorithms.map(([key, primary, secondary]) => [
               key,
               {
                  primary,
                  secondary,
               },
            ])
         ) as AlgorithmDialogData
      );

      setSetsChecked(
         fromPairs(
            algorithms.map(([key]) => [key, true])
         ) as AlgorithmDialogCheckedData
      );
   }, [dolls, showDoll]);

   return (
      <Dialog
         open={showDoll?.[0] === 'edit'}
         onClose={handleClose}
         fullScreen
         style={{
            paddingTop: 64,
         }}
      >
         <AppBar sx={{ position: 'fixed' }}>
            <Toolbar>
               <Typography
                  sx={{ ml: 2, flex: 1, fontFamily: 'inherit' }}
                  variant="h6"
                  component="div"
               >
                  알고리즘 수정
               </Typography>
               <Button
                  autoFocus
                  color="inherit"
                  onClick={handleSave}
                  startIcon={<SaveIcon />}
               >
                  저장
               </Button>
               <Button
                  autoFocus
                  color="secondary"
                  onClick={handleClose}
                  startIcon={<CloseIcon />}
               >
                  닫기
               </Button>
            </Toolbar>
         </AppBar>
         <Container fixed>
            {ALGORITHM_DATA.map(({ set, types, primary, secondary }, index) => (
               <List
                  key={index}
                  subheader={
                     <ListSubheader
                        component="div"
                        style={{ fontFamily: 'inherit' }}
                     >
                        <LazyImage
                           src={set.iconPng}
                           webp={set.iconWebp}
                           width={32}
                           height={32}
                        />
                        {set.name}
                     </ListSubheader>
                  }
               >
                  {types.map(type => {
                     const { name, iconPng, iconWebp } = algorithms[type];

                     return (
                        <React.Fragment key={type}>
                           <ListItem
                              secondaryAction={
                                 <Checkbox
                                    edge="end"
                                    checked={Boolean(setsChecked[type])}
                                    onChange={handleToggle(type)}
                                 />
                              }
                           >
                              <ListItemIcon>
                                 <LazyImage
                                    src={iconPng}
                                    webp={iconWebp}
                                    width={32}
                                    height={32}
                                 />
                              </ListItemIcon>
                              <ListItemText
                                 primary={name}
                                 style={{ fontFamily: 'inherit' }}
                              />
                           </ListItem>
                           <Collapse
                              in={setsChecked[type]}
                              timeout="auto"
                              unmountOnExit
                           >
                              <List component="div" disablePadding>
                                 <div style={{ margin: '12px 8px 4px 8px' }}>
                                    <StatsSelect
                                       label="주옵션"
                                       value={sets[type]?.primary ?? []}
                                       onChange={({ target: { value } }) => {
                                          setSets(sets => ({
                                             ...sets,
                                             [type]: {
                                                ...sets[type],
                                                primary: value,
                                             },
                                          }));
                                       }}
                                       statsTypes={primary}
                                    />
                                 </div>
                                 <div style={{ margin: '12px 8px 4px 8px' }}>
                                    <StatsSelect
                                       label="부옵션"
                                       value={sets[type]?.secondary ?? []}
                                       onChange={({ target: { value } }) => {
                                          setSets(sets => ({
                                             ...sets,
                                             [type]: {
                                                ...sets[type],
                                                secondary: value,
                                             },
                                          }));
                                       }}
                                       statsTypes={secondary}
                                    />
                                 </div>
                              </List>
                           </Collapse>
                        </React.Fragment>
                     );
                  })}
               </List>
            ))}
         </Container>
      </Dialog>
   );
};

export default React.memo(EditAlgorithmDialog);
