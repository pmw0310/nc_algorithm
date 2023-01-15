import React, { useMemo, useContext } from 'react';
import { compact } from 'lodash';
import { styled } from '@mui/material/styles';
import Image from 'react-image-webp';
import { dolls, rarityColors } from '../data/dolls';
import Divider from '@mui/material/Divider';
import { SelectDollContext } from '../context/selectDoll';
import { DayContext } from '../context/day';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

import {
   AlgorithmSet,
   algorithms,
   algorithmSetTypes,
   stats,
   freeStats,
   AlgorithmType,
} from '../data/algorithms';
import dayToString from '../utils/dayToString';

const AlgorithmView = styled('span')(({}) => ({
   position: 'relative',
   backgroundColor: '#f5f7f7',
   padding: 6,
   width: 100,
   '.algorithm-main': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      '.algorithm-icon': {
         width: 48,
         height: 48,
         objectFit: 'contain',
         filter:
            'invert(97%) sepia(4%) saturate(200%) hue-rotate(12deg) brightness(88%) contrast(84%)',
      },
      '.algorithm-text': {
         fontWeight: 'bold',
      },
   },
   '.state-box:last-child': {
      marginTop: 4,
   },
   '.state-view': {
      display: 'flex',
      alignItems: 'center',
   },
   '.state-box': {
      borderRadius: 4,
      padding: '2px 6px',
      '.state-icon': {
         width: 14,
         height: 14,
         objectFit: 'contain',
         verticalAlign: 'middle',
      },
      '.state-title': {
         paddingLeft: 4,
         fontSize: 12,
      },
   },
   '.state-primary': {
      backgroundColor: rarityColors[3],
      '.state-title': {
         color: 'white',
         fontWeight: 'bold',
      },
      '.MuiDivider-root': {
         borderColor: 'white',
      },
   },
   '.state-secondary': {
      marginTop: 4,
      backgroundColor: '#343434',
      '.state-title': {
         color: rarityColors[3],
         fontWeight: 500,
      },
      '.state-icon': {
         filter:
            'invert(48%) sepia(96%) saturate(1271%) hue-rotate(5deg) brightness(103%) contrast(104%)',
      },
      '.MuiDivider-root': {
         borderColor: '#414141',
      },
   },
   '.set-type-main': {
      backgroundColor: '#2f2f2f',
      padding: '2px 4px',
      marginBottom: 4,
      display: 'inline-flex',
      alignItems: 'center',
      '.set-type-icon': {
         width: 10,
         height: 10,
         verticalAlign: 'middle',
         marginRight: 4,
      },
      '.set-type-title': {
         fontSize: 10,
         color: 'white',
      },
   },
   '.MuiAvatarGroup-root': {
      marginTop: 4,
      justifyContent: 'center',
      '.MuiAvatar-root': {
         width: 20,
         height: 20,
         border: '1px solid #fff',
         fontSize: 8,
         img: {
            width: 20,
            height: 20,
         },
      },
   },
   '.algorithm-day': {
      position: 'absolute',
      left: 0,
      top: 0,
      backgroundColor: '#1c1b20',
      width: 16,
      height: 16,
   },
   '.algorithm-day-title': {
      position: 'absolute',
      left: 3,
      top: 0,
      fontSize: 10,
      fontWeight: 'bold',
      color: '#f5f7f7',
      '.&.now-day': {
         color: '#FC8A00',
      },
   },
}));

interface DollAvatarGroupProps {
   type: AlgorithmType;
}
const DollAvatarGroup: React.FC<DollAvatarGroupProps> = React.memo(
   ({ type }) => {
      const { selectDolls } = useContext(SelectDollContext);

      const usingDoll = selectDolls
         .map(doll => dolls[doll])
         .filter(({ algorithms }) =>
            algorithms.some(([algo]) => algo === type)
         );

      return (
         <AvatarGroup max={5}>
            {usingDoll.map(({ iconPng, iconWebp, rarity, name }, index) => (
               <Avatar
                  key={`${type}_${name}_avatar`}
                  sx={{
                     bgcolor: rarityColors[rarity],
                  }}
               >
                  <Image src={iconPng} webp={iconWebp} />
               </Avatar>
            ))}
         </AvatarGroup>
      );
   }
);

interface AlgorithmTypeViewProps {
   type: AlgorithmType;
   showDay?: boolean;
}

const AlgorithmTypeView: React.FC<AlgorithmTypeViewProps> = React.memo(
   ({ type, showDay = false }) => {
      const { day: nowDay } = useContext(DayContext);
      const { setType, iconPng, iconWebp, name, dayObtained } =
         algorithms[type];
      const setTypeData = algorithmSetTypes[setType];

      return (
         <>
            {showDay && (
               <>
                  <div className="algorithm-day" />
                  <div
                     className={`algorithm-day-title${
                        nowDay === dayObtained ? 'now-day' : ''
                     }`}
                  >
                     {dayToString(dayObtained)}
                  </div>
               </>
            )}
            <div className="algorithm-main">
               <Image
                  className="algorithm-icon"
                  src={iconPng}
                  webp={iconWebp}
               />
               <div className="algorithm-text">{name}</div>
               <div className="set-type-main">
                  <Image
                     className="set-type-icon"
                     src={setTypeData.iconPng}
                     webp={setTypeData.iconWebp}
                  />
                  <span className="set-type-title">{setTypeData.name}</span>
               </div>
            </div>
         </>
      );
   }
);

interface StateViewProps {
   iconPng: string;
   iconWebp: string;
   name: string;
   last: boolean;
}

const StateView: React.FC<StateViewProps> = React.memo(
   ({ iconPng, iconWebp, name, last }) => (
      <>
         <div className="state-view">
            <Image className="state-icon" src={iconPng} webp={iconWebp} />
            <span className="state-title">{name}</span>
         </div>
         {!last && <Divider />}
      </>
   )
);

interface AlgorithmProps {
   showDoll?: boolean;
   showDay?: boolean;
   algorithmSet: AlgorithmSet;
}

const AlgorithmSetView: React.FC<AlgorithmProps> = ({
   showDoll = false,
   showDay = false,
   algorithmSet: [algorithmKey, primaryKeys, secondaryKey],
}) => {
   const primary = useMemo(
      () => compact(primaryKeys.map(key => stats[key])),
      [primaryKeys]
   );

   const secondary = useMemo(
      () => compact(secondaryKey.map(key => stats[key])),
      [secondaryKey]
   );

   return (
      <AlgorithmView>
         <AlgorithmTypeView type={algorithmKey} showDay={showDay} />
         <div className="state-main">
            <div className="state-box state-primary">
               {(primary.length > 0 ? primary : [freeStats])?.map(
                  ({ iconPng, iconWebp, name, key }, index, array) => (
                     <StateView
                        key={`${algorithmKey}_${key}_primary`}
                        iconPng={iconPng}
                        iconWebp={iconWebp}
                        name={name}
                        last={array.length - 1 <= index}
                     />
                  )
               )}
            </div>
            <div className="state-box state-secondary">
               {(secondary.length > 0 ? secondary : [freeStats])?.map(
                  ({ iconPng, iconWebp, name, key }, index, array) => (
                     <StateView
                        key={`${algorithmKey}_${key}_secondary`}
                        iconPng={iconPng}
                        iconWebp={iconWebp}
                        name={name}
                        last={array.length - 1 <= index}
                     />
                  )
               )}
            </div>
            {showDoll && <DollAvatarGroup type={algorithmKey} />}
         </div>
      </AlgorithmView>
   );
};

export default React.memo(AlgorithmSetView);
