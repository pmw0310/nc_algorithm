import React, { useMemo, useContext, useCallback } from 'react';
import { toPairs } from 'lodash';
import {
   Doll,
   dolls,
   DOLL_CLASSES,
   DollClasses,
   DollClass,
} from '../data/dolls';
import DollCheckbox from '../components/dollCheckbox';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Image from 'react-image-webp';
import { SelectDollContext } from '../context/selectDoll';

const StyledDollClassList = styled(Grid)(() => ({
   padding: '2px 0',
   '.class-info': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   },
}));

const StyledClassIcon = styled('div')(() => ({
   background: '#323338',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '24px',
   height: '24px',
   borderRadius: 4,
   margin: '4px',
   img: {
      objectFit: 'contain',
      width: 18,
      height: 18,
   },
   '.class-title': {
      fontWeight: 'bold',
   },
}));

interface DollData extends Doll {
   key: string;
}

interface ClassIconProps {
   iconPng: string;
   iconWebp: string;
   name: string;
}

const ClassIcon: React.FC<ClassIconProps> = React.memo(
   ({ iconPng, iconWebp, name }) => (
      <>
         <StyledClassIcon>
            <Image src={iconPng} webp={iconWebp} />
         </StyledClassIcon>
         <div className="class-title">{name}</div>
      </>
   )
);

const DollClassList: React.FC = () => {
   const { selectDoll, setSelect } = useContext(SelectDollContext);

   const data = useMemo<Array<DollData>>(
      () => toPairs(dolls).map(([key, doll]) => ({ ...doll, key })),
      []
   );

   const classDollList = useMemo<Array<[DollClass, typeof data]>>(
      () =>
         DOLL_CLASSES.map(className => [
            className,
            data
               .filter(({ dollClass }) => className === dollClass)
               .sort(
                  (
                     { name: aName, rarity: aRarity },
                     { name: bName, rarity: bRarity }
                  ) => {
                     let sortIndex = 0;

                     if (aName < bName) {
                        sortIndex = -1;
                     } else if (aName > bName) {
                        sortIndex = 1;
                     }
                     if (aRarity < bRarity) {
                        sortIndex = -1;
                     } else if (aRarity > bRarity) {
                        sortIndex = 1;
                     }

                     return sortIndex;
                  }
               ),
         ]),
      [data]
   );

   const handleChange = useCallback(
      (doll: string, checked: boolean) => {
         setSelect(doll, checked);
      },
      [setSelect]
   );

   return (
      <>
         {classDollList.map(([className, classDollList]) => {
            const dollData = DollClasses[className];

            return (
               <StyledDollClassList container key={className}>
                  <Grid className="class-info" xs={2} sm={1}>
                     <ClassIcon
                        iconPng={dollData.iconPng}
                        iconWebp={dollData.iconWebp}
                        name={dollData.name}
                     />
                  </Grid>
                  <Grid xs={10} sm={11}>
                     {classDollList.map(({ key }) => (
                        <DollCheckbox
                           key={key}
                           doll={key}
                           size={64}
                           checked={selectDoll[key]}
                           onChange={handleChange}
                        />
                     ))}
                  </Grid>
               </StyledDollClassList>
            );
         })}
      </>
   );
};

export default React.memo(DollClassList);
