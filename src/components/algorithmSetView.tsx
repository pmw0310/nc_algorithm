import React, { Fragment, useMemo } from 'react';
import { compact, indexOf, head, pick, toPairs, isNil } from 'lodash';
import { styled } from '@mui/material/styles';
import Image from 'react-image-webp';
import { Doll, dolls, rarityColors } from '../data/dolls';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

import {
   AlgorithmSet,
   algorithms,
   AlgorithmType,
   AlgorithmData,
   algorithmSetTypes,
   stats,
   freeStats,
   StatsType,
} from '../data/algorithms';

const AlgorithmView = styled('span')(() => ({
   position: 'relative',
   backgroundColor: '#f5f7f7',
   padding: 6,
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
      left: 2.5,
      top: -0.5,
      fontSize: 11,
      fontWeight: 'bold',
      color: '#f5f7f7',
   },
}));

interface AlgorithmProps {
   dollList?: Array<string>;
   showDay?: boolean;
   algorithmSet: AlgorithmSet;
}

interface StateIconProps {
   iconPng: string;
   iconWebp: string;
   name: string;
}

const StateIcon: React.FC<StateIconProps> = React.memo(
   ({ iconPng, iconWebp, name }) => (
      <div className="state-view">
         <Image className="state-icon" src={iconPng} webp={iconWebp} />
         <span className="state-title">{name}</span>
      </div>
   )
);

const AlgorithmSetView: React.FC<AlgorithmProps> = ({
   dollList,
   showDay = false,
   algorithmSet: [algorithmKey, primaryKeys, secondaryKey],
}) => {
   // const pathsIsEqualAlgorithm = (paths: Array<string>, algorithm: AlgorithmMap) => {
   //    const set = new Set(paths.map(path => head(/^[a-z|A-Z]+/.exec(path))));
   //    return set.has(algorithm.key);
   // }

   // const setType = algorithmSetTypes[algorithm.setType];
   // let usingDoll: Array<Doll> | null = null;

   // if (dollList) {
   //    const dollDatas = toPairs(pick(dolls, dollList)).map(([, data]) => data);
   //    usingDoll = dollDatas.filter(({ algorithms }) =>
   //       pathsIsEqualAlgorithm(algorithms, algorithm)
   //    );
   // }

   const { setType, iconPng, iconWebp, name, dayObtained } =
      useMemo<AlgorithmData>(() => algorithms[algorithmKey], [algorithmKey]);

   const primary = useMemo(
      () => compact(primaryKeys.map(key => stats[key])),
      [primaryKeys]
   );

   const secondary = useMemo(
      () => compact(secondaryKey.map(key => stats[key])),
      [secondaryKey]
   );

   const setTypeData = algorithmSetTypes[setType];

   return (
      <AlgorithmView>
         {showDay && (
            <>
               <div className="algorithm-day"></div>
               <div className="algorithm-day-title">
                  {(() => {
                     switch (dayObtained) {
                        case 1:
                           return '월';
                        case 2:
                           return '화';
                        case 3:
                           return '수';
                        case 4:
                           return '목';
                        case 5:
                           return '금';
                     }
                  })()}
               </div>
            </>
         )}
         <div className="algorithm-main">
            <Image className="algorithm-icon" src={iconPng} webp={iconWebp} />
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
         <div className="state-main">
            <div className="state-box state-primary">
               {(primary.length > 0 ? primary : [freeStats])?.map(
                  ({ iconPng, iconWebp, name, key }, index, array) => (
                     <Fragment key={`${algorithmKey}_${key}_primary`}>
                        <StateIcon
                           iconPng={iconPng}
                           iconWebp={iconWebp}
                           name={name}
                        />
                        {array.length - 1 > index && <Divider />}
                     </Fragment>
                  )
               )}
            </div>
            <div className="state-box state-secondary">
               {(secondary.length > 0 ? secondary : [freeStats])?.map(
                  ({ iconPng, iconWebp, name, key }, index, array) => (
                     <Fragment key={`${algorithmKey}_${key}_secondary`}>
                        <StateIcon
                           iconPng={iconPng}
                           iconWebp={iconWebp}
                           name={name}
                        />
                        {array.length - 1 > index && <Divider />}
                     </Fragment>
                  )
               )}
            </div>
            {/* {usingDoll && (
               <AvatarGroup max={5}>
                  {usingDoll.map(({ iconPng, iconWebp, rarity }, index) => (
                     <Avatar
                        key={`${this.algorithm.key}_${index}_avatar`}
                        sx={{
                           bgcolor: rarityColors[rarity],
                        }}
                     >
                        <Image src={iconPng} webp={iconWebp} />
                     </Avatar>
                  ))}
               </AvatarGroup>
            )} */}
         </div>
      </AlgorithmView>
   );
};

export default AlgorithmSetView;
