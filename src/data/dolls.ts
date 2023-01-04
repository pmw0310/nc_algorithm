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
   rarity: 1 | 2 | 3;
   iconPng: string;
   iconWebp: string;
   doolClass: DollClass;
}

export const dolls: Readonly<Record<string, Doll>> = {
   persicaria: {
      name: '페르시카',
      rarity: 2,
      iconPng: 'https://i.ibb.co/Kwc7hHn/char-head-spic-persicaria.png',
      iconWebp: 'https://i.ibb.co/Fs40kDX/char-head-spic-persicaria.webp',
      doolClass: 'medic',
   },
   antonina: {
      name: '안토니나',
      rarity: 2,
      iconPng: 'https://i.ibb.co/XStBsK3/char-head-spic-anna.png',
      iconWebp: 'https://i.ibb.co/sWV89G7/char-head-spic-anna.webp',
      doolClass: 'specialist',
   },
   sol: {
      name: '솔',
      rarity: 2,
      iconPng: 'https://i.ibb.co/SnggVrR/char-head-spic-sol.png',
      iconWebp: 'https://i.ibb.co/LZyRN2L/char-head-spic-sol.webp',
      doolClass: 'warrior',
   },
   simo: {
      name: '시모',
      rarity: 1,
      iconPng: 'https://i.ibb.co/2WKxfrn/char-head-spic-simo.png',
      iconWebp: 'https://i.ibb.co/CHXkQxM/char-head-spic-simo.webp',
      doolClass: 'sniper',
   },
   croque: {
      name: '크로크',
      rarity: 3,
      iconPng: 'https://i.ibb.co/ZM8NCtF/char-head-spic-croque.png',
      iconWebp: 'https://i.ibb.co/kBTSpVj/char-head-spic-croque.webp',
      doolClass: 'sniper',
   },
   fresnel: {
      name: '프레넬',
      rarity: 2,
      iconPng: 'https://i.ibb.co/wzKygHX/char-head-spic-fresnel.png',
      iconWebp: 'https://i.ibb.co/k4vyzTB/char-head-spic-fresnel.webp',
      doolClass: 'sniper',
   },
   chelsea: {
      name: '첼시',
      rarity: 1,
      iconPng: 'https://i.ibb.co/mFpVwMk/char-head-spic-chelsea.png',
      iconWebp: 'https://i.ibb.co/0X7yxr3/char-head-spic-chelsea.webp',
      doolClass: 'warrior',
   },
   gin: {
      name: '진',
      rarity: 3,
      iconPng: 'https://i.ibb.co/TkVcXxG/char-head-spic-gin.png',
      iconWebp: 'https://i.ibb.co/gFn7DL9/char-head-spic-gin.webp',
      doolClass: 'medic',
   },
   mai: {
      name: '마이',
      rarity: 1,
      iconPng: 'https://i.ibb.co/kXy9fWz/char-head-spic-mai.png',
      iconWebp: 'https://i.ibb.co/5rtZ98t/char-head-spic-mai.webp',
      doolClass: 'specialist',
   },
   evelyn: {
      name: '이블린',
      rarity: 3,
      iconPng: 'https://i.ibb.co/2dCZXG7/char-head-spic-evelyn.png',
      iconWebp: 'https://i.ibb.co/nnzR2dv/char-head-spic-evelyn.webp',
      doolClass: 'guard',
   },
   souchun: {
      name: '수춘',
      rarity: 2,
      iconPng: 'https://i.ibb.co/hcKjSKf/char-head-spic-camellia.png',
      iconWebp: 'https://i.ibb.co/j3G1fwd/char-head-spic-camellia.webp',
      doolClass: 'guard',
   },
   max: {
      name: '멕스',
      rarity: 1,
      iconPng: 'https://i.ibb.co/wZqtqJ7/char-head-spic-max.png',
      iconWebp: 'https://i.ibb.co/dDyc2bW/char-head-spic-max.webp',
      doolClass: 'sniper',
   },
   betty: {
      name: '베티',
      rarity: 2,
      iconPng: 'https://i.ibb.co/yqP3r2H/char-head-spic-betty.png',
      iconWebp: 'https://i.ibb.co/yqjMrF5/char-head-spic-betty.webp',
      doolClass: 'warrior',
   },
   choco: {
      name: '초코',
      rarity: 1,
      iconPng: 'https://i.ibb.co/RvJsVmF/char-head-spic-choco.png',
      iconWebp: 'https://i.ibb.co/0qGHPTt/char-head-spic-choco.webp',
      doolClass: 'medic',
   },
   panakeia: {
      name: 'panakeia',
      rarity: 2,
      iconPng: 'https://i.ibb.co/QkFKgYb/char-head-spic-panakeia.png',
      iconWebp: 'https://i.ibb.co/mbM04M9/char-head-spic-panakeia.webp',
      doolClass: 'medic',
   },
   banxsy: {
      name: 'banxsy',
      rarity: 3,
      iconPng: 'https://i.ibb.co/DL9RdYM/char-head-spic-banxsy.png',
      iconWebp: 'https://i.ibb.co/7NNF8p1/char-head-spic-banxsy.webp',
      doolClass: 'specialist',
   },
   angela: {
      name: 'angela',
      rarity: 2,
      iconPng: 'https://i.ibb.co/sFzrHvS/char-head-spic-angela.png',
      iconWebp: 'https://i.ibb.co/SsjqLZz/char-head-spic-angela.webp',
      doolClass: 'specialist',
   },
   florence: {
      name: 'florence',
      rarity: 3,
      iconPng: 'https://i.ibb.co/GtJt3XH/char-head-spic-florence.png',
      iconWebp: 'https://i.ibb.co/J2dVQrV/char-head-spic-florence.webp',
      doolClass: 'medic',
   },
   fern: {
      name: 'fern',
      rarity: 2,
      iconPng: 'https://i.ibb.co/Pjf14FB/char-head-spic-fern.png',
      iconWebp: 'https://i.ibb.co/TL72RQC/char-head-spic-fern.webp',
      doolClass: 'warrior',
   },
   yanny: {
      name: 'yanny',
      rarity: 1,
      iconPng: 'https://i.ibb.co/zhFpfQJ/char-head-spic-yanny.png',
      iconWebp: 'https://i.ibb.co/ckrWH3Q/char-head-spic-yanny.webp',
      doolClass: 'guard',
   },
   groove: {
      name: 'groove',
      rarity: 1,
      iconPng: 'https://i.ibb.co/QFrz6jR/char-head-spic-groove.png',
      iconWebp: 'https://i.ibb.co/1rWk9SJ/char-head-spic-groove.webp',
      doolClass: 'specialist',
   },
   aki: {
      name: 'aki',
      rarity: 3,
      iconPng: 'https://i.ibb.co/VNsp4kM/char-head-spic-aki.png',
      iconWebp: 'https://i.ibb.co/jMFCtNz/char-head-spic-aki.webp',
      doolClass: 'warrior',
   },
   bonee: {
      name: 'bonee',
      rarity: 1,
      iconPng: 'https://i.ibb.co/DV2RDBq/char-head-spic-bonee.png',
      iconWebp: 'https://i.ibb.co/6sNqnYf/char-head-spic-bonee.webp',
      doolClass: 'guard',
   },
   earhart: {
      name: 'earhart',
      rarity: 2,
      iconPng: 'https://i.ibb.co/7SVSLJX/char-head-spic-earhart.png',
      iconWebp: 'https://i.ibb.co/wgFHJfT/char-head-spic-earhart.webp',
      doolClass: 'sniper',
   },
   chanzhi: {
      name: 'chanzhi',
      rarity: 3,
      iconPng: 'https://i.ibb.co/41sy60N/char-head-spic-twigs.png',
      iconWebp: 'https://i.ibb.co/wdcdsTB/char-head-spic-twigs.webp',
      doolClass: 'sniper',
   },
   nanaka: {
      name: 'nanaka',
      rarity: 3,
      iconPng: 'https://i.ibb.co/SdQfky4/char-head-spic-nanaka.png',
      iconWebp: 'https://i.ibb.co/RQf2nj1/char-head-spic-nanaka.webp',
      doolClass: 'medic',
   },
} as const;
