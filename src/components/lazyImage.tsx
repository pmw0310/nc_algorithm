import React, { useMemo } from 'react';
import { isWebpSupported } from 'react-image-webp/dist/utils';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps
   extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'ref' | 'loading'> {
   webp?: string;
   loadingSrc?: string;
}

const EMPTY_PNG =
   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const LazyImage: React.FC<LazyImageProps> = ({
   children,
   src,
   webp,
   loadingSrc = EMPTY_PNG,
   ...props
}) => {
   const { ref, inView } = useInView({
      threshold: 0,
      triggerOnce: true,
   });

   const imgSrc = useMemo(() => {
      if (!inView) {
         return loadingSrc;
      }
      return (isWebpSupported() ? webp : src) ?? src;
   }, [inView, loadingSrc, src, webp]);

   return (
      <img {...props} ref={ref} src={imgSrc}>
         {children}
      </img>
   );
};

export default React.memo(LazyImage);
