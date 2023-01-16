import React, { useRef } from 'react';
import { isWebpSupported } from 'react-image-webp/dist/utils';
import useIntersectionObsever from '../hooks/useIntersectionObsever';

interface LazyImageProps
   extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'ref' | 'loading'> {
   webp?: string;
   loading?: string;
}

const EMPTY_PNG =
   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const LazyImage: React.FC<LazyImageProps> = ({
   children,
   src,
   webp,
   loading = EMPTY_PNG,
   ...props
}) => {
   const ref = useRef<HTMLImageElement>(null);
   const isInViewport = useIntersectionObsever(ref);
   const webpSupport = isWebpSupported();

   return (
      <img
         {...props}
         ref={ref}
         loading="lazy"
         src={(() => {
            if (!isInViewport) {
               return loading;
            }
            return (webpSupport ? webp : src) ?? src;
         })()}
      >
         {children}
      </img>
   );
};

export default LazyImage;
