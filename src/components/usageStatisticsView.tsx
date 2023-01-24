import React from 'react';
import { dolls } from '../data/dolls';
import {
   OFFENSE_ALGORITHM_TYPE,
   STABILITY_ALGORITHM_TYPE,
   SPECIAL_ALGORITHM_TYPE,
   algorithmSetTypes,
   algorithmUsageStatistics,
   algorithms,
   AlgorithmType,
   AlgorithmSetTypeData,
} from '../data/algorithms';
import { toPairs } from 'lodash';
import AlgorithmStatisticsChart from './algorithmStatisticsChart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import LazyImage from './lazyImage';
import { styled } from '@mui/material/styles';
import StatStatisticsChart from './statStatisticsChart';

const UsageStatisticsStyled = styled('div')(() => ({
   margin: '12px 8px 4px 8px',
   '.MuiInputLabel-root': {
      fontFamily: ['IBM Plex Sans KR', 'sans-serif'].join(','),
      color: '#fff',
      '&.Mui-focused': {
         color: '#ed752f',
      },
   },
   '.MuiInputBase-root': {
      '& fieldset': {
         borderColor: '#fff',
      },
      '&:hover fieldset': {
         borderColor: '#aaa',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#ed752f',
      },
   },
   '.MuiSelect-select': {
      fontFamily: ['IBM Plex Sans KR', 'sans-serif'].join(','),
      display: 'flex',
      alignItems: 'center',
      color: '#fff',
      img: {
         objectFit: 'contain',
         marginRight: 8,
      },
   },
   '.MuiSelect-icon': {
      color: '#fff',
   },
}));

const MenuItemStyled = styled(MenuItem)(() => ({
   display: 'flex',
   alignItems: 'center',
   marginLeft: 12,
   img: {
      filter:
         'invert(97%) sepia(4%) saturate(200%) hue-rotate(12deg) brightness(88%) contrast(84%)',
      objectFit: 'contain',
      marginRight: 6,
   },
}));

const ListSubheaderStyled = styled(ListSubheader)(() => ({
   display: 'flex',
   alignItems: 'center',
   img: {
      filter:
         'invert(97%) sepia(4%) saturate(200%) hue-rotate(12deg) brightness(88%) contrast(84%)',
      objectFit: 'contain',
      marginRight: 6,
   },
}));

const UsageStatisticsView: React.FC = () => {
   const [type, setType] = React.useState<string>('all');

   const handleChange = (event: SelectChangeEvent) => {
      setType(event.target.value as string);
   };

   return (
      <>
         <UsageStatisticsStyled>
            <FormControl fullWidth>
               <InputLabel>알고리즘 선택</InputLabel>
               <Select
                  value={type}
                  label="알고리즘 선택"
                  onChange={handleChange}
               >
                  <MenuItemStyled value={'all'} style={{ marginLeft: 0 }}>
                     <LazyImage
                        width={16}
                        height={16}
                        src="https://i.ibb.co/dbSqs60/function-mark-icon-corner-12.png"
                        webp="https://i.ibb.co/S3zd8K1/function-mark-icon-corner-12.webp"
                     />
                     알고리즘
                  </MenuItemStyled>
                  {[
                     OFFENSE_ALGORITHM_TYPE,
                     STABILITY_ALGORITHM_TYPE,
                     SPECIAL_ALGORITHM_TYPE,
                  ].map((types, index) => {
                     let data: AlgorithmSetTypeData;

                     switch (index) {
                        case 0:
                           data = algorithmSetTypes.offense;
                           break;
                        case 1:
                           data = algorithmSetTypes.stability;
                           break;
                        case 2:
                           data = algorithmSetTypes.special;
                           break;
                        default:
                           return null;
                     }

                     return [
                        <ListSubheaderStyled key={`list_subheader_${index}`}>
                           <LazyImage
                              width={16}
                              height={16}
                              src={data.iconPng}
                              webp={data.iconWebp}
                           />
                           {data.name}
                        </ListSubheaderStyled>,
                        ...types.map(type => {
                           const { iconPng, iconWebp, name } = algorithms[type];

                           return (
                              <MenuItemStyled
                                 value={type}
                                 key={`menu_item_${type}`}
                              >
                                 <LazyImage
                                    width={16}
                                    height={16}
                                    src={iconPng}
                                    webp={iconWebp}
                                 />
                                 {name}
                              </MenuItemStyled>
                           );
                        }),
                     ];
                  })}
               </Select>
            </FormControl>
         </UsageStatisticsStyled>
         {type === 'all' && <AlgorithmStatisticsChart />}
         {type !== 'all' && (
            <StatStatisticsChart algorithmType={type as AlgorithmType} />
         )}
      </>
   );
};

export default UsageStatisticsView;
