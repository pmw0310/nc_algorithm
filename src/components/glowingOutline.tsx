import React from 'react';
import { styled } from '@mui/material/styles';

interface GlowingOutlineStyledProps {
   color?: string;
   duration?: number;
   borderWidth?: number;
}

const GlowingOutlineStyled = styled('div')<GlowingOutlineStyledProps>(
   ({ color = '#ff00ff', duration = 1, borderWidth = 2 }) => {
      const animationDuration = duration / 4;

      return {
         position: 'relative',
         display: 'inline-block',
         overflow: 'hidden',
         '.glowing-outline': {
            position: 'absolute',
            display: 'block',
            '&.outline-1': {
               top: 0,
               left: 0,
               width: '100%',
               height: borderWidth,
               background: `linear-gradient(90deg,transparent,${color})`,
               animation: `animate1 ${duration}s linear infinite`,
            },
            '@keyframes animate1': {
               '0%': {
                  left: '-100%',
               },
               '50%,100%': {
                  left: '100%',
               },
            },
            '&.outline-2': {
               top: '-100%',
               right: 0,
               width: borderWidth,
               height: '100%',
               background: `linear-gradient(180deg,transparent,${color})`,
               animation: `animate2 ${duration}s linear infinite`,
               animationDelay: `${animationDuration}s`,
            },
            '@keyframes animate2': {
               '0%': {
                  top: '-100%',
               },
               '50%,100%': {
                  top: '100%',
               },
            },
            '&.outline-3': {
               bottom: 0,
               right: 0,
               width: '100%',
               height: borderWidth,
               background: `linear-gradient(270deg,transparent,${color})`,
               animation: `animate3 ${duration}s linear infinite`,
               animationDelay: `${animationDuration * 2}s`,
            },
            '@keyframes animate3': {
               '0%': {
                  right: '-100%',
               },
               '50%,100%': {
                  right: '100%',
               },
            },
            '&.outline-4': {
               bottom: '-100%',
               left: 0,
               width: borderWidth,
               height: '100%',
               background: `linear-gradient(360deg,transparent,${color})`,
               animation: `animate4 ${duration}s linear infinite`,
               animationDelay: `${animationDuration * 3}s`,
            },
            '@keyframes animate4': {
               '0%': {
                  bottom: '-100%',
               },
               '50%,100%': {
                  bottom: '100%',
               },
            },
         },
      };
   }
);

interface GlowingOutlineProps extends GlowingOutlineStyledProps {
   children: React.ReactNode;
   className?: string;
   style?: React.CSSProperties;
}

const GlowingOutline: React.FC<GlowingOutlineProps> = ({
   children,
   color,
   duration,
   style,
   className,
   borderWidth,
}) => {
   return (
      <GlowingOutlineStyled
         color={color}
         duration={duration}
         style={style}
         className={className}
         borderWidth={borderWidth}
      >
         <span className="glowing-outline outline-1" />
         <span className="glowing-outline outline-2" />
         <span className="glowing-outline outline-3" />
         <span className="glowing-outline outline-4" />
         {children}
      </GlowingOutlineStyled>
   );
};

export default React.memo(GlowingOutline);
