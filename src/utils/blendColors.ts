const colorMix = (
   color1: string = '#000000',
   color2: string = '#ffffff',
   percentage: number = 0.5
): string => {
   if (color1.length !== 4 && color1.length !== 7)
      throw new Error('colors must be provided as hexes');

   if (color2.length !== 4 && color2.length !== 7)
      throw new Error('colors must be provided as hexes');

   if (percentage > 1 || percentage < 0)
      throw new Error('percentage must be between 0 and 1');

   if (color1.length === 4)
      color1 =
         color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3];
   else color1 = color1.substring(1);
   if (color2.length === 4)
      color2 =
         color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3];
   else color2 = color2.substring(1);

   const [r1, g1, b1] = [
      parseInt(color1[0] + color1[1], 16),
      parseInt(color1[2] + color1[3], 16),
      parseInt(color1[4] + color1[5], 16),
   ];
   const [r2, g2, b2] = [
      parseInt(color2[0] + color2[1], 16),
      parseInt(color2[2] + color2[3], 16),
      parseInt(color2[4] + color2[5], 16),
   ];

   const mix = [
      intToHex((1 - percentage) * r1 + percentage * r2),
      intToHex((1 - percentage) * g1 + percentage * g2),
      intToHex((1 - percentage) * b1 + percentage * b2),
   ];

   return `#${mix.join('')}`;
};

const intToHex = (num: number): string => {
   const hex = Math.round(num).toString(16);
   if (hex.length === 1) return `0${hex}`;
   return hex;
};

export default colorMix;
