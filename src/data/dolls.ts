export const DOLL_CLASSES = [
   'guard',
   'warrior',
   'specialist',
   'medic',
   'sniper',
] as const;
export type DollClass = typeof DOLL_CLASSES[number];

export interface DollClassData {
   name: string;
   iconPng: string;
   iconWebp: string;
}

export const DollClasses: Readonly<Record<DollClass, DollClassData>> = {
   guard: {
      name: '수위',
      iconPng: 'https://i.ibb.co/jzWvGsW/class-icon-career-1.png',
      iconWebp: 'https://i.ibb.co/N6GCCj7/class-icon-career-1.webp',
   },
   warrior: {
      name: '전사',
      iconPng: 'https://i.ibb.co/QPv5SnV/class-icon-career-3.png',
      iconWebp: 'https://i.ibb.co/r3m2qjD/class-icon-career-3.webp',
   },
   specialist: {
      name: '해결사',
      iconPng: 'https://i.ibb.co/LggVpXQ/class-icon-career-4.png',
      iconWebp: 'https://i.ibb.co/0qmRWHF/class-icon-career-4.webp',
   },
   medic: {
      name: '치료사',
      iconPng: 'https://i.ibb.co/kQgDgjL/class-icon-career-5.png',
      iconWebp: 'https://i.ibb.co/n3DKsMv/class-icon-career-5.webp',
   },
   sniper: {
      name: '사수',
      iconPng: 'https://i.ibb.co/DpC15y5/class-icon-career-2.png',
      iconWebp: 'https://i.ibb.co/6DkLgnR/class-icon-career-2.webp',
   },
};

export interface Doll {
   name: string;
   rarity: 1 | 2 | 3;
   iconPng: string;
   iconWebp: string;
   dollClass: DollClass;
}

export const rarityColors: Readonly<Record<0 | 1 | 2 | 3, string>> = {
   0: '#7F7F7F',
   1: '#51BAF5',
   2: '#BD74F9',
   3: '#FC8A00',
} as const;

export const dolls: Readonly<Record<string, Doll>> = {
   persicaria: {
      name: '페르시카',
      rarity: 2,
      iconPng: 'https://i.ibb.co/Kwc7hHn/char-head-spic-persicaria.png',
      iconWebp: 'https://i.ibb.co/Fs40kDX/char-head-spic-persicaria.webp',
      dollClass: 'medic',
   },
   antonina: {
      name: '안토니나',
      rarity: 2,
      iconPng: 'https://i.ibb.co/XStBsK3/char-head-spic-anna.png',
      iconWebp: 'https://i.ibb.co/sWV89G7/char-head-spic-anna.webp',
      dollClass: 'specialist',
   },
   sol: {
      name: '솔',
      rarity: 2,
      iconPng: 'https://i.ibb.co/SnggVrR/char-head-spic-sol.png',
      iconWebp: 'https://i.ibb.co/LZyRN2L/char-head-spic-sol.webp',
      dollClass: 'warrior',
   },
   simo: {
      name: '시모',
      rarity: 1,
      iconPng: 'https://i.ibb.co/2WKxfrn/char-head-spic-simo.png',
      iconWebp: 'https://i.ibb.co/CHXkQxM/char-head-spic-simo.webp',
      dollClass: 'sniper',
   },
   croque: {
      name: '크로크',
      rarity: 3,
      iconPng: 'https://i.ibb.co/ZM8NCtF/char-head-spic-croque.png',
      iconWebp: 'https://i.ibb.co/kBTSpVj/char-head-spic-croque.webp',
      dollClass: 'guard',
   },
   fresnel: {
      name: '프레넬',
      rarity: 2,
      iconPng: 'https://i.ibb.co/wzKygHX/char-head-spic-fresnel.png',
      iconWebp: 'https://i.ibb.co/k4vyzTB/char-head-spic-fresnel.webp',
      dollClass: 'sniper',
   },
   chelsea: {
      name: '첼시',
      rarity: 1,
      iconPng: 'https://i.ibb.co/mFpVwMk/char-head-spic-chelsea.png',
      iconWebp: 'https://i.ibb.co/0X7yxr3/char-head-spic-chelsea.webp',
      dollClass: 'warrior',
   },
   gin: {
      name: '진',
      rarity: 3,
      iconPng: 'https://i.ibb.co/TkVcXxG/char-head-spic-gin.png',
      iconWebp: 'https://i.ibb.co/gFn7DL9/char-head-spic-gin.webp',
      dollClass: 'medic',
   },
   mai: {
      name: '마이',
      rarity: 1,
      iconPng: 'https://i.ibb.co/kXy9fWz/char-head-spic-mai.png',
      iconWebp: 'https://i.ibb.co/5rtZ98t/char-head-spic-mai.webp',
      dollClass: 'specialist',
   },
   evelyn: {
      name: '이블린',
      rarity: 3,
      iconPng: 'https://i.ibb.co/2dCZXG7/char-head-spic-evelyn.png',
      iconWebp: 'https://i.ibb.co/nnzR2dv/char-head-spic-evelyn.webp',
      dollClass: 'guard',
   },
   souchun: {
      name: '수춘',
      rarity: 2,
      iconPng: 'https://i.ibb.co/hcKjSKf/char-head-spic-camellia.png',
      iconWebp: 'https://i.ibb.co/j3G1fwd/char-head-spic-camellia.webp',
      dollClass: 'guard',
   },
   max: {
      name: '멕스',
      rarity: 1,
      iconPng: 'https://i.ibb.co/wZqtqJ7/char-head-spic-max.png',
      iconWebp: 'https://i.ibb.co/dDyc2bW/char-head-spic-max.webp',
      dollClass: 'sniper',
   },
   betty: {
      name: '베티',
      rarity: 2,
      iconPng: 'https://i.ibb.co/yqP3r2H/char-head-spic-betty.png',
      iconWebp: 'https://i.ibb.co/yqjMrF5/char-head-spic-betty.webp',
      dollClass: 'warrior',
   },
   choco: {
      name: '초코',
      rarity: 1,
      iconPng: 'https://i.ibb.co/RvJsVmF/char-head-spic-choco.png',
      iconWebp: 'https://i.ibb.co/0qGHPTt/char-head-spic-choco.webp',
      dollClass: 'medic',
   },
   panakeia: {
      name: '파나케이아',
      rarity: 2,
      iconPng: 'https://i.ibb.co/QkFKgYb/char-head-spic-panakeia.png',
      iconWebp: 'https://i.ibb.co/mbM04M9/char-head-spic-panakeia.webp',
      dollClass: 'medic',
   },
   banxsy: {
      name: '뱅크시',
      rarity: 3,
      iconPng: 'https://i.ibb.co/DL9RdYM/char-head-spic-banxsy.png',
      iconWebp: 'https://i.ibb.co/7NNF8p1/char-head-spic-banxsy.webp',
      dollClass: 'specialist',
   },
   angela: {
      name: '안젤라',
      rarity: 2,
      iconPng: 'https://i.ibb.co/sFzrHvS/char-head-spic-angela.png',
      iconWebp: 'https://i.ibb.co/SsjqLZz/char-head-spic-angela.webp',
      dollClass: 'specialist',
   },
   florence: {
      name: '플로렌스',
      rarity: 3,
      iconPng: 'https://i.ibb.co/GtJt3XH/char-head-spic-florence.png',
      iconWebp: 'https://i.ibb.co/J2dVQrV/char-head-spic-florence.webp',
      dollClass: 'medic',
   },
   fern: {
      name: '펜',
      rarity: 2,
      iconPng: 'https://i.ibb.co/Pjf14FB/char-head-spic-fern.png',
      iconWebp: 'https://i.ibb.co/TL72RQC/char-head-spic-fern.webp',
      dollClass: 'warrior',
   },
   yanny: {
      name: '야니',
      rarity: 1,
      iconPng: 'https://i.ibb.co/zhFpfQJ/char-head-spic-yanny.png',
      iconWebp: 'https://i.ibb.co/ckrWH3Q/char-head-spic-yanny.webp',
      dollClass: 'guard',
   },
   groove: {
      name: '그루브',
      rarity: 1,
      iconPng: 'https://i.ibb.co/QFrz6jR/char-head-spic-groove.png',
      iconWebp: 'https://i.ibb.co/1rWk9SJ/char-head-spic-groove.webp',
      dollClass: 'specialist',
   },
   aki: {
      name: '아키',
      rarity: 3,
      iconPng: 'https://i.ibb.co/VNsp4kM/char-head-spic-aki.png',
      iconWebp: 'https://i.ibb.co/jMFCtNz/char-head-spic-aki.webp',
      dollClass: 'warrior',
   },
   bonee: {
      name: '보니',
      rarity: 1,
      iconPng: 'https://i.ibb.co/DV2RDBq/char-head-spic-bonee.png',
      iconWebp: 'https://i.ibb.co/6sNqnYf/char-head-spic-bonee.webp',
      dollClass: 'guard',
   },
   earhart: {
      name: '에어하트',
      rarity: 2,
      iconPng: 'https://i.ibb.co/7SVSLJX/char-head-spic-earhart.png',
      iconWebp: 'https://i.ibb.co/wgFHJfT/char-head-spic-earhart.webp',
      dollClass: 'sniper',
   },
   chanzhi: {
      name: '전지',
      rarity: 3,
      iconPng: 'https://i.ibb.co/41sy60N/char-head-spic-twigs.png',
      iconWebp: 'https://i.ibb.co/wdcdsTB/char-head-spic-twigs.webp',
      dollClass: 'sniper',
   },
   nanaka: {
      name: '나나카',
      rarity: 3,
      iconPng: 'https://i.ibb.co/SdQfky4/char-head-spic-nanaka.png',
      iconWebp: 'https://i.ibb.co/RQf2nj1/char-head-spic-nanaka.webp',
      dollClass: 'medic',
   },
   zion: {
      name: '시온',
      rarity: 1,
      iconPng: 'https://i.ibb.co/SwRX7vx/char-head-spic-zion.png',
      iconWebp: 'https://i.ibb.co/5Lb7vKc/char-head-spic-zion.webp',
      dollClass: 'guard',
   },
   vee: {
      name: '브이',
      rarity: 3,
      iconPng: 'https://i.ibb.co/9HKst4S/char-head-spic-vee.png',
      iconWebp: 'https://i.ibb.co/61xrvcm/char-head-spic-vee.webp',
      dollClass: 'warrior',
   },
   willow: {
      name: '윌로우',
      rarity: 3,
      iconPng: 'https://i.ibb.co/9Wy1SHM/char-head-spic-willow.png',
      iconWebp: 'https://i.ibb.co/RjLdd9d/char-head-spic-willow.webp',
      dollClass: 'specialist',
   },
   ksenia: {
      name: '크세니아',
      rarity: 2,
      iconPng: 'https://i.ibb.co/Ydj8NqC/char-head-spic-ksenia.png',
      iconWebp: 'https://i.ibb.co/LpH9QD9/char-head-spic-ksenia.webp',
      dollClass: 'specialist',
   },
   imhotep: {
      name: '임호텝',
      rarity: 2,
      iconPng: 'https://i.ibb.co/SBHfhBT/char-head-spic-imhotep.png',
      iconWebp: 'https://i.ibb.co/rKBK3bW/char-head-spic-imhotep.webp',
      dollClass: 'medic',
   },
   octogen: {
      name: '옥토겐',
      rarity: 2,
      iconPng: 'https://i.ibb.co/8MkwwvT/char-head-spic-octogen.png',
      iconWebp: 'https://i.ibb.co/PNFXXKh/char-head-spic-octogen.webp',
      dollClass: 'sniper',
   },
   rise: {
      name: '리세',
      rarity: 2,
      iconPng: 'https://i.ibb.co/vjzp3HT/char-head-spic-rise.png',
      iconWebp: 'https://i.ibb.co/ThDS436/char-head-spic-rise.webp',
      dollClass: 'specialist',
   },
   abigail: {
      name: '아비게일',
      rarity: 1,
      iconPng: 'https://i.ibb.co/GQtYthg/char-head-spic-abigail.png',
      iconWebp: 'https://i.ibb.co/gmWmNN2/char-head-spic-abigail.webp',
      dollClass: 'specialist',
   },
   jessie: {
      name: '제시',
      rarity: 1,
      iconPng: 'https://i.ibb.co/5Tt4T7W/char-head-spic-jessie.png',
      iconWebp: 'https://i.ibb.co/bWky2SN/char-head-spic-jessie.webp',
      dollClass: 'medic',
   },
   lam: {
      name: '람',
      rarity: 1,
      iconPng: 'https://i.ibb.co/wLHKxQR/char-head-spic-lam.png',
      iconWebp: 'https://i.ibb.co/Sckhqhh/char-head-spic-lam.webp',
      dollClass: 'sniper',
   },
   hubble: {
      name: '허블',
      rarity: 3,
      iconPng: 'https://i.ibb.co/K2DyVFR/char-head-spic-hubble.png',
      iconWebp: 'https://i.ibb.co/QPKPGJY/char-head-spic-hubble.webp',
      dollClass: 'sniper',
   },
   sakuya: {
      name: '사쿠야',
      rarity: 2,
      iconPng: 'https://i.ibb.co/YXCJ3zD/char-head-spic-sakuya.png',
      iconWebp: 'https://i.ibb.co/vQmTFr8/char-head-spic-sakuya.webp',
      dollClass: 'specialist',
   },
   centaureissi: {
      name: '센타우레이시',
      rarity: 3,
      iconPng: 'https://i.ibb.co/kJFkkmF/char-head-spic-centaureissi.png',
      iconWebp: 'https://i.ibb.co/z4GMtDC/char-head-spic-centaureissi.webp',
      dollClass: 'warrior',
   },
   dushevnaya: {
      name: '드셰브니',
      rarity: 2,
      iconPng: 'https://i.ibb.co/vv5qhVZ/char-head-spic-dusevnyj.png',
      iconWebp: 'https://i.ibb.co/XxgQpng/char-head-spic-dusevnyj.webp',
      dollClass: 'specialist',
   },
   deLacey: {
      name: '드 레이시',
      rarity: 3,
      iconPng: 'https://i.ibb.co/Qk4r3w8/char-head-spic-delacey.png',
      iconWebp: 'https://i.ibb.co/rc83wyG/char-head-spic-delacey.webp',
      dollClass: 'medic',
   },
   hatsuchiri: {
      name: '하츠치리',
      rarity: 3,
      iconPng: 'https://i.ibb.co/mXqWG8P/char-head-spic-hatsuchiri.png',
      iconWebp: 'https://i.ibb.co/JpX2WDS/char-head-spic-hatsuchiri.webp',
      dollClass: 'warrior',
   },
   kuro: {
      name: '쿠로',
      rarity: 3,
      iconPng: 'https://i.ibb.co/3sNZqtq/char-head-spic-kuro.png',
      iconWebp: 'https://i.ibb.co/9sSYXZQ/char-head-spic-kuro.webp',
      dollClass: 'sniper',
   },
} as const;
