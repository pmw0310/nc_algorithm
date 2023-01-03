export const DOLL_CLASS = [
   'medic',
   'specialist',
   'warrior',
   'sniper',
   'guard',
] as const;
export type DollClass = typeof DOLL_CLASS[number];

export interface Doll {
   name: string;
   iconPng: string;
   iconWebp: string;
   doolClass: DollClass;
}

export const dolls: Record<string, Doll> = {
   persicaria: {
      name: 'persicaria',
      iconPng: 'https://i.ibb.co/Kwc7hHn/char-head-spic-persicaria.png',
      iconWebp: 'https://i.ibb.co/Fs40kDX/char-head-spic-persicaria.webp',
      doolClass: 'medic',
   },
};
