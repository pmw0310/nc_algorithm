import React from 'react';
import {
   OFFENSE_ALGORITHM_TYPE,
   STABILITY_ALGORITHM_TYPE,
   SPECIAL_ALGORITHM_TYPE,
   algorithmSetTypes,
   algorithms,
   AlgorithmType,
   AlgorithmSetTypeData,
} from '../data/algorithms';
import AlgorithmStatisticsChart from './algorithmStatisticsChart';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import LazyImage from './lazyImage';
import StatStatisticsChart from './statStatisticsChart';
import { Select, MenuItem, ListSubheader, InputLabel } from './select';

// const UsageStatisticsStyled = styled('div')(() => ({

// }));

const UsageStatisticsView: React.FC = () => {
   const [type, setType] = React.useState<string>('all');

   const handleChange = (event: SelectChangeEvent<any>) => {
      setType(event.target.value as string);
   };

   return (
      <>
         <div style={{ margin: '12px 8px 4px 8px' }}>
            <FormControl fullWidth>
               <InputLabel>알고리즘 선택</InputLabel>
               <Select
                  value={type}
                  label="알고리즘 선택"
                  onChange={handleChange}
               >
                  <MenuItem value={'all'} style={{ marginLeft: 0 }}>
                     <LazyImage
                        width={16}
                        height={16}
                        src="https://i.ibb.co/dbSqs60/function-mark-icon-corner-12.png"
                        webp="https://i.ibb.co/S3zd8K1/function-mark-icon-corner-12.webp"
                     />
                     알고리즘
                  </MenuItem>
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
                        <ListSubheader key={`list_subheader_${index}`}>
                           <LazyImage
                              width={16}
                              height={16}
                              src={data.iconPng}
                              webp={data.iconWebp}
                           />
                           {data.name}
                        </ListSubheader>,
                        ...types.map(type => {
                           const { iconPng, iconWebp, name } = algorithms[type];

                           return (
                              <MenuItem value={type} key={`menu_item_${type}`}>
                                 <LazyImage
                                    width={16}
                                    height={16}
                                    src={iconPng}
                                    webp={iconWebp}
                                 />
                                 {name}
                              </MenuItem>
                           );
                        }),
                     ];
                  })}
               </Select>
            </FormControl>
         </div>
         {type === 'all' ? (
            <AlgorithmStatisticsChart />
         ) : (
            <StatStatisticsChart algorithmType={type as AlgorithmType} />
         )}
      </>
   );
};

export default UsageStatisticsView;
