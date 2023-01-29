import React, { useContext, useState, useEffect } from 'react';
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
import Collapse from '@mui/material/Collapse';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { MenuItem } from './select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

export const DialogStyled = styled(Dialog)(() => ({
   '@media (min-width: 0px)': {
      paddingTop: 48,
   },
   '@media (min-width: 600px)': {
      paddingTop: 64,
   },
   backgroundColor: '#e7e9e7',
   img: {
      filter:
         'invert(97%) sepia(4%) saturate(200%) hue-rotate(12deg) brightness(88%) contrast(84%)',
      objectFit: 'contain',
   },
   '.MuiListSubheader-root': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: 22,
      zIndex: 2,
      img: {
         marginRight: 14,
      },
   },
   '.algorithm-list-item': {
      margin: '6px 0',
      padding: 6,
      backgroundColor: '#dddddb',
      '.MuiTypography-root': {
         fontWeight: 'bold',
      },
   },
}));

const SelectStyled = styled(Select<Array<StatsType>>)(() => ({}));

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
   onChange: (event: SelectChangeEvent<Array<StatsType>>) => void;
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
         <SelectStyled
            multiple
            value={value}
            renderValue={selected => (
               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(key => {
                     const { iconPng, iconWebp, name } = stats[key];
                     return (
                        <Chip
                           key={key}
                           icon={
                              <LazyImage
                                 src={iconPng}
                                 webp={iconWebp}
                                 width={18}
                                 height={18}
                              />
                           }
                           label={name}
                        />
                     );
                  })}
               </Box>
            )}
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
         </SelectStyled>
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
      <DialogStyled
         open={showDoll?.[0] === 'edit'}
         onClose={handleClose}
         fullScreen
      >
         <AppBar sx={{ position: 'fixed' }}>
            <Toolbar>
               <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  알고리즘 수정
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
            {ALGORITHM_DATA.map(({ set, types, primary, secondary }, index) => (
               <List
                  key={index}
                  subheader={
                     <ListSubheader component="div">
                        <LazyImage
                           src={set.iconPng}
                           webp={set.iconWebp}
                           width={22}
                           height={22}
                        />
                        {set.name}
                     </ListSubheader>
                  }
               >
                  {types.map(type => {
                     const { name, iconPng, iconWebp } = algorithms[type];

                     return (
                        <div className="algorithm-list-item" key={type}>
                           <ListItem
                              secondaryAction={
                                 <Switch
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
                              <ListItemText primary={name} />
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
                        </div>
                     );
                  })}
               </List>
            ))}
         </Container>
      </DialogStyled>
   );
};

export default React.memo(EditAlgorithmDialog);
