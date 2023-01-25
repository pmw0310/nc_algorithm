import React, { useMemo, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { rarityColors } from '../data/dolls';
import Avatar from '@mui/material/Avatar';
import AvatarGroup, { AvatarGroupProps } from '@mui/material/AvatarGroup';
import LazyImage from './lazyImage';
import colorMix from '../utils/blendColors';
import Badge from '@mui/material/Badge';
import { fromPairs, toPairs } from 'lodash';
import { DollsContext } from '../context/dolls';

const AvatarStyled = styled(Avatar)(() => ({
   '&.doll-avatar': {
      ...fromPairs(
         toPairs(rarityColors)
            .map(([rarity, color]) => [
               [
                  `&.rarity-${rarity}`,
                  {
                     border: `${color} solid 1px`,
                     backgroundColor: colorMix(color, '#333', 0.6),
                  },
               ],
            ])
            .flat()
      ),
   },
   '&.small-avatar': {
      backgroundColor: '#1c1b20',
      border: 'none !important',
   },
}));

interface DollAvatarGroupStyledProps {
   size?: number;
}

const DollAvatarGroupStyled = styled(AvatarGroup)<DollAvatarGroupStyledProps>(
   ({ size = 20 }) => ({
      marginTop: 4,
      justifyContent: 'center',
      '.MuiAvatarGroup-avatar': {
         width: size,
         height: size,
         border: '1px solid #fff',
         fontSize: Math.floor(size * 0.4),
      },
   })
);

interface AlgorithmProps {
   doll: string;
   size?: number;
}

const DollAvatar: React.FC<AlgorithmProps> = ({ doll, size = 20 }) => {
   const { dolls } = useContext(DollsContext);

   const { iconPng, iconWebp, rarity, sideIcon } = useMemo(
      () => dolls[doll],
      [doll]
   );

   const avatar = (
      <AvatarStyled
         className={`doll-avatar rarity-${rarity}`}
         sx={{
            width: size,
            height: size,
         }}
      >
         <LazyImage src={iconPng} webp={iconWebp} width={size} height={size} />
      </AvatarStyled>
   );

   if (!sideIcon) {
      return avatar;
   }

   const smallSize = size / 2;

   return (
      <Badge
         overlap="circular"
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         badgeContent={
            <AvatarStyled
               className="small-avatar"
               sx={{
                  width: smallSize,
                  height: smallSize,
               }}
            >
               <LazyImage
                  src={sideIcon.iconPng}
                  webp={sideIcon.iconWebp}
                  width={smallSize - 2}
                  height={smallSize - 2}
               />
            </AvatarStyled>
         }
      >
         {avatar}
      </Badge>
   );
};

interface DollAvatarGroupProps
   extends AvatarGroupProps,
      DollAvatarGroupStyledProps {
   doll: Array<string>;
}

export const DollAvatarGroup: React.FC<DollAvatarGroupProps> = React.memo(
   ({ doll, size, ...props }) => {
      return (
         <DollAvatarGroupStyled size={size} {...props}>
            {doll.map(doll => (
               <DollAvatar doll={doll} size={size} key={`${doll}_avatar`} />
            ))}
         </DollAvatarGroupStyled>
      );
   }
);

export default React.memo(DollAvatar);
