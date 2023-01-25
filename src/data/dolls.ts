import { AlgorithmSet } from './algorithms';

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

export const dollData: Readonly<Record<string, Doll>> = {
   persicaria: {
      name: '페르시카',
      rarity: 2,
      iconPng: 'https://i.ibb.co/2hcxCQ4/char-head-spic-persicaria.png',
      iconWebp: 'https://i.ibb.co/Fs40kDX/char-head-spic-persicaria.webp',
      dollClass: 'medic',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus'],
         ],
         ['perception', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         [
            'svm',
            ['healingEffect', 'skillHaste'],
            ['hashratePlus', 'skillHaste', 'healingEffect'],
         ],
      ],
   },
   antonina: {
      name: '안토니나',
      rarity: 2,
      iconPng: 'https://i.ibb.co/dWDPmNK/char-head-spic-anna.png',
      iconWebp: 'https://i.ibb.co/sWV89G7/char-head-spic-anna.webp',
      dollClass: 'specialist',
      algorithms: [
         ['mlrMatrix', ['hashratePercent'], ['hashratePercent', 'damageBoost']],
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'damageBoost'],
         ],
         ['encapsulate', ['maxHpPercent'], ['hashratePlus']],
         ['deltaV', ['skillHaste'], ['hashratePlus', 'skillHaste']],
      ],
   },
   sol: {
      name: '솔',
      rarity: 2,
      iconPng: 'https://i.ibb.co/8NwCg0J/char-head-spic-sol.png',
      iconWebp: 'https://i.ibb.co/LZyRN2L/char-head-spic-sol.webp',
      dollClass: 'warrior',
      algorithms: [
         ['mlrMatrix', ['hashratePercent'], ['damageBoost', 'hashratePercent']],
         ['perception', ['maxHpPercent'], ['hashratePlus', 'critRate']],
         ['encapsulate', ['maxHpPercent'], ['hashratePlus', 'critRate']],
         ['deltaV', ['skillHaste'], ['hashratePlus', 'skillHaste']],
      ],
   },
   simo: {
      name: '시모',
      rarity: 1,
      iconPng: 'https://i.ibb.co/WskcCFn/char-head-spic-simo.png',
      iconWebp: 'https://i.ibb.co/CHXkQxM/char-head-spic-simo.webp',
      dollClass: 'sniper',
      algorithms: [
         [
            'mlrMatrix',
            ['atkPercent'],
            ['damageBoost', 'atkPercent', 'critRate'],
         ],
         ['encapsulate', ['maxHpPlus'], ['critDamage', 'critRate']],
         ['cluster', ['critRate', 'critDamage'], ['critRate', 'critDamage']],
      ],
   },
   croque: {
      name: '크로크',
      rarity: 3,
      iconPng: 'https://i.ibb.co/ZNkTmyD/char-head-spic-croque.png',
      iconWebp: 'https://i.ibb.co/kBTSpVj/char-head-spic-croque.webp',
      dollClass: 'guard',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus', 'maxHpPlus'],
         ],
         [
            'overflow',
            ['maxHpPercent', 'physicalDefPlus'],
            ['hashratePlus', 'injuryMitigation', 'maxHpPercent'],
         ],
         [
            'encapsulate',
            ['maxHpPercent', 'physicalDefPlus'],
            ['hashratePlus', 'injuryMitigation', 'maxHpPercent'],
         ],
         [
            'stratagem',
            ['physicalDefPlus', 'skillHaste'],
            ['bodgeRate', 'skillHaste', 'hashratePlus'],
         ],
      ],
   },
   fresnel: {
      name: '프레넬',
      rarity: 2,
      iconPng: 'https://i.ibb.co/LJtWKr6/char-head-spic-fresnel.png',
      iconWebp: 'https://i.ibb.co/k4vyzTB/char-head-spic-fresnel.webp',
      dollClass: 'sniper',
      algorithms: [
         [
            'mlrMatrix',
            ['hashratePercent'],
            ['damageBoost', 'hashratePercent', 'critRate'],
         ],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'critRate']],
         ['deltaV', ['skillHaste'], ['hashratePlus', 'skillHaste', 'critRate']],
      ],
   },
   chelsea: {
      name: '첼시',
      rarity: 1,
      iconPng: 'https://i.ibb.co/5hcfFL6/char-head-spic-chelsea.png',
      iconWebp: 'https://i.ibb.co/0X7yxr3/char-head-spic-chelsea.webp',
      dollClass: 'warrior',
      algorithms: [
         ['mlrMatrix', ['atkPercent'], ['damageBoost', 'atkPercent']],
         ['perception', ['maxHpPercent'], ['critDamage', 'atkPlus']],
         ['encapsulate', ['maxHpPercent'], ['critDamage', 'atkPlus']],
         ['convolution', ['skillHaste'], ['skillHaste', 'atkPlus']],
      ],
   },
   gin: {
      name: '진',
      rarity: 3,
      iconPng: 'https://i.ibb.co/F0ZNRyM/char-head-spic-gin.png',
      iconWebp: 'https://i.ibb.co/gFn7DL9/char-head-spic-gin.webp',
      dollClass: 'medic',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'critRate', 'critDamage'],
         ],
         [
            'deduction',
            ['hashratePercent'],
            ['hashratePercent', 'critRate', 'critDamage'],
         ],
         [
            'perception',
            ['maxHpPlus'],
            ['hashratePlus', 'critRate', 'critDamage'],
         ],
         [
            'encapsulate',
            ['maxHpPlus'],
            ['hashratePlus', 'critRate', 'critDamage'],
         ],
         [
            'loopGain',
            ['critRate', 'critDamage'],
            ['hashratePlus', 'critRate', 'critDamage'],
         ],
      ],
   },
   mai: {
      name: '마이',
      rarity: 1,
      iconPng: 'https://i.ibb.co/gb0VCQX/char-head-spic-mai.png',
      iconWebp: 'https://i.ibb.co/5rtZ98t/char-head-spic-mai.webp',
      dollClass: 'specialist',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'damageBoost'],
         ],
         ['encapsulate', ['maxHpPercent'], ['hashratePlus']],
         ['deltaV', ['skillHaste'], ['hashratePlus', 'skillHaste']],
      ],
   },
   evelyn: {
      name: '이블린',
      rarity: 3,
      iconPng: 'https://i.ibb.co/Jmn4nhm/char-head-spic-evelyn.png',
      iconWebp: 'https://i.ibb.co/nnzR2dv/char-head-spic-evelyn.webp',
      dollClass: 'guard',
      algorithms: [
         ['progression', ['hashratePercent'], ['hashratePercent', 'maxHpPlus']],
         [
            'overflow',
            ['maxHpPercent', 'physicalDefPlus'],
            ['injuryMitigation', 'maxHpPercent'],
         ],
         [
            'encapsulate',
            ['maxHpPercent', 'physicalDefPlus'],
            ['injuryMitigation', 'maxHpPercent'],
         ],
         [
            'stratagem',
            ['physicalDefPlus', 'skillHaste'],
            ['bodgeRate', 'skillHaste'],
         ],
      ],
   },
   souchun: {
      name: '수춘',
      rarity: 2,
      iconPng: 'https://i.ibb.co/yBTXwBn/char-head-spic-camellia.png',
      iconWebp: 'https://i.ibb.co/j3G1fwd/char-head-spic-camellia.webp',
      dollClass: 'guard',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus', 'maxHpPlus'],
         ],
         [
            'overflow',
            ['maxHpPercent', 'physicalDefPlus'],
            ['hashratePlus', 'injuryMitigation', 'maxHpPercent'],
         ],
         [
            'encapsulate',
            ['maxHpPercent', 'physicalDefPlus'],
            ['hashratePlus', 'injuryMitigation', 'maxHpPercent'],
         ],
         [
            'stratagem',
            ['physicalDefPlus', 'skillHaste'],
            ['bodgeRate', 'skillHaste', 'hashratePlus'],
         ],
      ],
   },
   max: {
      name: '멕스',
      rarity: 1,
      iconPng: 'https://i.ibb.co/X5rx5hQ/char-head-spic-max.png',
      iconWebp: 'https://i.ibb.co/dDyc2bW/char-head-spic-max.webp',
      dollClass: 'sniper',
      algorithms: [
         [
            'mlrMatrix',
            ['hashratePercent'],
            ['damageBoost', 'hashratePercent', 'critRate'],
         ],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'critRate']],
         [
            'paradigm',
            ['skillHaste'],
            ['hashratePlus', 'skillHaste', 'critRate'],
         ],
      ],
   },
   betty: {
      name: '베티',
      rarity: 2,
      iconPng: 'https://i.ibb.co/thQR9fM/char-head-spic-betty.png',
      iconWebp: 'https://i.ibb.co/yqjMrF5/char-head-spic-betty.webp',
      dollClass: 'warrior',
      algorithms: [
         [
            'mlrMatrix',
            ['atkPercent'],
            ['damageBoost', 'atkPercent', 'critRate'],
         ],
         [
            'lowerLimit',
            ['atkPercent'],
            ['damageBoost', 'atkPercent', 'critRate'],
         ],
         [
            'perception',
            ['maxHpPercent'],
            ['atkPlus', 'critRate', 'critDamage'],
         ],
         [
            'encapsulate',
            ['maxHpPercent'],
            ['atkPlus', 'critRate', 'critDamage'],
         ],
         [
            'paradigm',
            ['critRate', 'critDamage'],
            ['critRate', 'critDamage', 'atkPlus'],
         ],
      ],
   },
   choco: {
      name: '초코',
      rarity: 1,
      iconPng: 'https://i.ibb.co/FmqWt6G/char-head-spic-choco.png',
      iconWebp: 'https://i.ibb.co/0qGHPTt/char-head-spic-choco.webp',
      dollClass: 'medic',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus'],
         ],
         [
            'deduction',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus'],
         ],
         ['perception', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         [
            'deltaV',
            ['healingEffect', 'skillHaste'],
            ['hashratePlus', 'skillHaste', 'healingEffect'],
         ],
         [
            'loopGain',
            ['healingEffect', 'skillHaste'],
            ['hashratePlus', 'skillHaste', 'healingEffect'],
         ],
      ],
   },
   panakeia: {
      name: '파나케이아',
      rarity: 2,
      iconPng: 'https://i.ibb.co/bB5MnYL/char-head-spic-panakeia.png',
      iconWebp: 'https://i.ibb.co/mbM04M9/char-head-spic-panakeia.webp',
      dollClass: 'medic',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus'],
         ],
         ['perception', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         [
            'svm',
            ['healingEffect', 'skillHaste'],
            ['hashratePlus', 'skillHaste', 'healingEffect'],
         ],
      ],
   },
   banxsy: {
      name: '뱅크시',
      rarity: 3,
      iconPng: 'https://i.ibb.co/7S96XhS/char-head-spic-banxsy.png',
      iconWebp: 'https://i.ibb.co/7NNF8p1/char-head-spic-banxsy.webp',
      dollClass: 'specialist',
      algorithms: [
         ['feedforward', ['atkPercent'], ['damageBoost', 'atkPercent']],
         ['encapsulate', ['maxHpPlus'], ['critRate', 'critDamage', 'atkPlus']],
         [
            'paradigm',
            ['critRate', 'critDamage'],
            ['atkPlus', 'critRate', 'critDamage'],
         ],
      ],
   },
   angela: {
      name: '안젤라',
      rarity: 2,
      iconPng: 'https://i.ibb.co/QXb45GL/char-head-spic-angela.png',
      iconWebp: 'https://i.ibb.co/SsjqLZz/char-head-spic-angela.webp',
      dollClass: 'specialist',
      algorithms: [
         ['deduction', [], []],
         ['encapsulate', ['maxHpPercent'], []],
         ['deltaV', ['skillHaste'], ['skillHaste']],
      ],
   },
   florence: {
      name: '플로렌스',
      rarity: 3,
      iconPng: 'https://i.ibb.co/F31SX73/char-head-spic-florence.png',
      iconWebp: 'https://i.ibb.co/J2dVQrV/char-head-spic-florence.webp',
      dollClass: 'medic',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus'],
         ],
         ['perception', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         [
            'deltaV',
            ['healingEffect', 'skillHaste'],
            ['hashratePlus', 'skillHaste', 'healingEffect'],
         ],
      ],
   },
   fern: {
      name: '펜',
      rarity: 2,
      iconPng: 'https://i.ibb.co/Z8TT8Fw/char-head-spic-fern.png',
      iconWebp: 'https://i.ibb.co/TL72RQC/char-head-spic-fern.webp',
      dollClass: 'warrior',
      algorithms: [
         [
            'mlrMatrix',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus'],
         ],
         ['perception', ['maxHpPercent'], ['hashratePlus', 'critRate']],
         ['encapsulate', ['maxHpPercent'], ['hashratePlus', 'critRate']],
         ['deltaV', ['skillHaste'], ['hashratePlus', 'skillHaste']],
      ],
   },
   yanny: {
      name: '야니',
      rarity: 1,
      iconPng: 'https://i.ibb.co/Q6cm2x2/char-head-spic-yanny.png',
      iconWebp: 'https://i.ibb.co/ckrWH3Q/char-head-spic-yanny.webp',
      dollClass: 'guard',
      algorithms: [
         ['progression', ['hashratePercent'], ['hashratePercent', 'maxHpPlus']],
         [
            'overflow',
            ['maxHpPercent', 'physicalDefPlus'],
            ['injuryMitigation', 'maxHpPercent'],
         ],
         [
            'encapsulate',
            ['maxHpPercent', 'physicalDefPlus'],
            ['injuryMitigation', 'maxHpPercent'],
         ],
         ['stratagem', ['physicalDefPlus'], ['bodgeRate', 'hashratePlus']],
      ],
   },
   groove: {
      name: '그루브',
      rarity: 1,
      iconPng: 'https://i.ibb.co/YbdmdtZ/char-head-spic-groove.png',
      iconWebp: 'https://i.ibb.co/1rWk9SJ/char-head-spic-groove.webp',
      dollClass: 'specialist',
      algorithms: [
         ['deduction', [], []],
         ['encapsulate', ['maxHpPercent'], []],
         ['deltaV', ['skillHaste'], ['skillHaste']],
      ],
   },
   aki: {
      name: '아키',
      rarity: 3,
      iconPng: 'https://i.ibb.co/2KzzgX0/char-head-spic-aki.png',
      iconWebp: 'https://i.ibb.co/jMFCtNz/char-head-spic-aki.webp',
      dollClass: 'warrior',
      algorithms: [
         [
            'mlrMatrix',
            ['atkPercent'],
            ['damageBoost', 'atkPercent', 'critDamage'],
         ],
         [
            'perception',
            ['maxHpPercent'],
            ['critRate', 'critDamage', 'atkPlus'],
         ],
         [
            'encapsulate',
            ['maxHpPercent'],
            ['critRate', 'critDamage', 'atkPlus'],
         ],
         [
            'convolution',
            ['critRate', 'critDamage'],
            ['critRate', 'critDamage', 'atkPlus'],
         ],
      ],
   },
   bonee: {
      name: '보니',
      rarity: 1,
      iconPng: 'https://i.ibb.co/YZ6dB9H/char-head-spic-bonee.png',
      iconWebp: 'https://i.ibb.co/6sNqnYf/char-head-spic-bonee.webp',
      dollClass: 'guard',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus', 'maxHpPlus'],
         ],
         [
            'overflow',
            ['maxHpPercent'],
            ['hashratePlus', 'injuryMitigation', 'maxHpPercent'],
         ],
         [
            'encapsulate',
            ['maxHpPercent'],
            ['hashratePlus', 'injuryMitigation', 'maxHpPercent'],
         ],
         [
            'stratagem',
            ['skillHaste'],
            ['bodgeRate', 'skillHaste', 'hashratePlus'],
         ],
      ],
   },
   earhart: {
      name: '에어하트',
      rarity: 2,
      iconPng: 'https://i.ibb.co/yRnWt7M/char-head-spic-earhart.png',
      iconWebp: 'https://i.ibb.co/wgFHJfT/char-head-spic-earhart.webp',
      dollClass: 'sniper',
      algorithms: [
         [
            'mlrMatrix',
            ['hashratePercent'],
            ['damageBoost', 'hashratePercent', 'critRate'],
         ],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'critRate']],
         ['paradigm', ['critRate', 'critDamage'], ['critRate', 'critDamage']],
      ],
   },
   chanzhi: {
      name: '전지',
      rarity: 3,
      iconPng: 'https://i.ibb.co/2nfRvyS/char-head-spic-twigs.png',
      iconWebp: 'https://i.ibb.co/wdcdsTB/char-head-spic-twigs.webp',
      dollClass: 'sniper',
      algorithms: [
         [
            'mlrMatrix',
            ['atkPercent'],
            ['damageBoost', 'atkPercent', 'critRate'],
         ],
         ['encapsulate', ['maxHpPlus'], ['critDamage', 'critRate']],
         ['paradigm', ['critDamage', 'critRate'], ['critDamage', 'critRate']],
      ],
   },
   nanaka: {
      name: '나나카',
      rarity: 3,
      iconPng: 'https://i.ibb.co/KFkMWwt/char-head-spic-nanaka.png',
      iconWebp: 'https://i.ibb.co/RQf2nj1/char-head-spic-nanaka.webp',
      dollClass: 'medic',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus'],
         ],
         ['perception', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         [
            'loopGain',
            ['healingEffect', 'skillHaste'],
            ['hashratePlus', 'skillHaste', 'healingEffect'],
         ],
      ],
   },
   zion: {
      name: '시온',
      rarity: 1,
      iconPng: 'https://i.ibb.co/GMjf81y/char-head-spic-zion.png',
      iconWebp: 'https://i.ibb.co/5Lb7vKc/char-head-spic-zion.webp',
      dollClass: 'guard',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus', 'maxHpPlus'],
         ],
         [
            'overflow',
            ['maxHpPercent', 'physicalDefPlus'],
            ['hashratePlus', 'injuryMitigation', 'maxHpPercent'],
         ],
         [
            'encapsulate',
            ['maxHpPercent', 'physicalDefPlus'],
            ['hashratePlus', 'injuryMitigation', 'maxHpPercent'],
         ],
         [
            'stratagem',
            ['physicalDefPlus', 'skillHaste'],
            ['bodgeRate', 'skillHaste', 'hashratePlus'],
         ],
      ],
   },
   vee: {
      name: '브이',
      rarity: 3,
      iconPng: 'https://i.ibb.co/G9sW6wS/char-head-spic-vee.png',
      iconWebp: 'https://i.ibb.co/61xrvcm/char-head-spic-vee.webp',
      dollClass: 'warrior',
      algorithms: [
         [
            'mlrMatrix',
            ['atkPercent'],
            ['damageBoost', 'atkPercent', 'critDamage'],
         ],
         ['perception', ['maxHpPlus'], ['atkPlus', 'critDamage']],
         ['encapsulate', ['maxHpPlus'], ['atkPlus', 'critDamage']],
         ['paradigm', ['critDamage'], ['atkPlus', 'critDamage']],
      ],
   },
   willow: {
      name: '윌로우',
      rarity: 3,
      iconPng: 'https://i.ibb.co/qkWYxXL/char-head-spic-willow.png',
      iconWebp: 'https://i.ibb.co/RjLdd9d/char-head-spic-willow.webp',
      dollClass: 'specialist',
      algorithms: [
         [
            'deduction',
            ['atkPercent'],
            ['damageBoost', 'critRate', 'critDamage'],
         ],
         [
            'encapsulate',
            ['maxHpPercent'],
            ['critRate', 'critDamage', 'atkPlus'],
         ],
         ['paradigm', ['critDamage'], ['atkPlus', 'critDamage']],
      ],
   },
   ksenia: {
      name: '크세니아',
      rarity: 2,
      iconPng: 'https://i.ibb.co/pdR6QZ8/char-head-spic-ksenia.png',
      iconWebp: 'https://i.ibb.co/LpH9QD9/char-head-spic-ksenia.webp',
      dollClass: 'specialist',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'damageBoost'],
         ],
         ['encapsulate', ['maxHpPercent'], ['hashratePlus']],
         ['deltaV', ['skillHaste'], ['hashratePlus', 'skillHaste']],
      ],
   },
   imhotep: {
      name: '임호텝',
      rarity: 2,
      iconPng: 'https://i.ibb.co/bb2qnBg/char-head-spic-imhotep.png',
      iconWebp: 'https://i.ibb.co/rKBK3bW/char-head-spic-imhotep.webp',
      dollClass: 'medic',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus'],
         ],
         ['perception', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         [
            'svm',
            ['healingEffect', 'skillHaste'],
            ['hashratePlus', 'skillHaste', 'healingEffect'],
         ],
      ],
   },
   octogen: {
      name: '옥토겐',
      rarity: 2,
      iconPng: 'https://i.ibb.co/dg1z4yN/char-head-spic-octogen.png',
      iconWebp: 'https://i.ibb.co/PNFXXKh/char-head-spic-octogen.webp',
      dollClass: 'sniper',
      algorithms: [
         [
            'mlrMatrix',
            ['hashratePercent'],
            ['damageBoost', 'hashratePercent', 'critRate'],
         ],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'critRate']],
         ['deltaV', ['skillHaste'], ['hashratePlus', 'skillHaste', 'critRate']],
      ],
   },
   rise: {
      name: '리세',
      rarity: 2,
      iconPng: 'https://i.ibb.co/pj31mS6/char-head-spic-rise.png',
      iconWebp: 'https://i.ibb.co/ThDS436/char-head-spic-rise.webp',
      dollClass: 'specialist',
      algorithms: [
         ['deduction', [], []],
         ['encapsulate', ['maxHpPercent'], []],
         ['deltaV', ['skillHaste'], ['skillHaste']],
      ],
   },
   abigail: {
      name: '아비게일',
      rarity: 1,
      iconPng: 'https://i.ibb.co/Brckrj0/char-head-spic-abigail.png',
      iconWebp: 'https://i.ibb.co/gmWmNN2/char-head-spic-abigail.webp',
      dollClass: 'specialist',
      algorithms: [
         ['deduction', [], []],
         ['encapsulate', ['maxHpPercent'], []],
         ['deltaV', ['skillHaste'], ['skillHaste']],
      ],
   },
   jessie: {
      name: '제시',
      rarity: 1,
      iconPng: 'https://i.ibb.co/2d3pcRW/char-head-spic-jessie.png',
      iconWebp: 'https://i.ibb.co/bWky2SN/char-head-spic-jessie.webp',
      dollClass: 'medic',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus'],
         ],
         ['perception', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         [
            'deltaV',
            ['healingEffect', 'skillHaste'],
            ['hashratePlus', 'skillHaste', 'healingEffect'],
         ],
      ],
   },
   lam: {
      name: '람',
      rarity: 1,
      iconPng: 'https://i.ibb.co/QrnYj3D/char-head-spic-lam.png',
      iconWebp: 'https://i.ibb.co/Sckhqhh/char-head-spic-lam.webp',
      dollClass: 'sniper',
      algorithms: [
         [
            'mlrMatrix',
            ['atkPercent'],
            ['damageBoost', 'atkPercent', 'critDamage'],
         ],
         ['perception', ['maxHpPlus'], ['critDamage', 'atkPlus']],
         ['encapsulate', ['maxHpPlus'], ['critDamage', 'atkPlus']],
         ['paradigm', ['critDamage'], ['atkPlus', 'critDamage']],
      ],
   },
   hubble: {
      name: '허블',
      rarity: 3,
      iconPng: 'https://i.ibb.co/1qHk46X/char-head-spic-hubble.png',
      iconWebp: 'https://i.ibb.co/QPKPGJY/char-head-spic-hubble.webp',
      dollClass: 'sniper',
      algorithms: [
         [
            'mlrMatrix',
            ['hashratePercent'],
            ['damageBoost', 'hashratePercent', 'critRate'],
         ],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'critRate']],
         [
            'paradigm',
            ['skillHaste'],
            ['hashratePlus', 'skillHaste', 'critRate'],
         ],
      ],
   },
   sakuya: {
      name: '사쿠야',
      rarity: 2,
      iconPng: 'https://i.ibb.co/wh1h86Q/char-head-spic-sakuya.png',
      iconWebp: 'https://i.ibb.co/vQmTFr8/char-head-spic-sakuya.webp',
      dollClass: 'specialist',
      algorithms: [
         ['mlrMatrix', ['atkPercent'], ['damageBoost', 'atkPercent']],
         ['encapsulate', ['maxHpPlus'], ['atkPlus']],
         ['deltaV', ['skillHaste'], ['atkPlus', 'skillHaste']],
      ],
   },
   centaureissi: {
      name: '센타우레이시',
      rarity: 3,
      iconPng: 'https://i.ibb.co/5Y5Hgxb/char-head-spic-centaureissi.png',
      iconWebp: 'https://i.ibb.co/z4GMtDC/char-head-spic-centaureissi.webp',
      dollClass: 'warrior',
      algorithms: [
         ['mlrMatrix', ['atkPercent'], ['damageBoost', 'atkPercent']],
         ['dataRepair', ['atkPercent'], ['damageBoost', 'atkPercent']],
         ['perception', ['maxHpPercent'], ['injuryMitigation', 'atkPlus']],
         ['encapsulate', ['maxHpPercent'], ['injuryMitigation', 'atkPlus']],
         ['stratagem', ['skillHaste'], ['skillHaste', 'bodgeRate', 'atkPlus']],
         ['deltaV', ['skillHaste'], ['skillHaste', 'bodgeRate', 'atkPlus']],
      ],
   },
   dushevnaya: {
      name: '드셰브니',
      rarity: 2,
      iconPng: 'https://i.ibb.co/NZ1nYXz/char-head-spic-dusevnyj.png',
      iconWebp: 'https://i.ibb.co/XxgQpng/char-head-spic-dusevnyj.webp',
      dollClass: 'specialist',
      algorithms: [
         ['deduction', ['hashratePercent'], ['hashratePlus', 'damageBoost']],
         [
            'encapsulate',
            ['maxHpPercent'],
            ['hashratePlus', 'injuryMitigation'],
         ],
         ['paradigm', ['physicalDefPlus'], ['hashratePlus', 'bodgeRate']],
      ],
   },
   deLacey: {
      name: '드 레이시',
      rarity: 3,
      iconPng: 'https://i.ibb.co/Ydfq179/char-head-spic-delacey.png',
      iconWebp: 'https://i.ibb.co/rc83wyG/char-head-spic-delacey.webp',
      dollClass: 'medic',
      algorithms: [
         [
            'progression',
            ['hashratePercent'],
            ['hashratePercent', 'hashratePlus'],
         ],
         ['perception', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'injuryMitigation']],
         [
            'loopGain',
            ['skillHaste', 'healingEffect'],
            ['hashratePlus', 'skillHaste', 'healingEffect'],
         ],
         [
            'svm',
            ['skillHaste', 'healingEffect'],
            ['hashratePlus', 'skillHaste', 'healingEffect'],
         ],
      ],
   },
   hatsuchiri: {
      name: '하츠치리',
      rarity: 3,
      iconPng: 'https://i.ibb.co/jf950bs/char-head-spic-hatsuchiri.png',
      iconWebp: 'https://i.ibb.co/JpX2WDS/char-head-spic-hatsuchiri.webp',
      dollClass: 'warrior',
      algorithms: [
         ['mlrMatrix', ['atkPercent'], ['damageBoost', 'atkPercent']],
         ['perception', ['maxHpPercent'], ['atkPlus', 'injuryMitigation']],
         ['encapsulate', ['maxHpPercent'], ['atkPlus', 'injuryMitigation']],
         ['deltaV', ['skillHaste'], ['skillHaste', 'atkPlus']],
      ],
   },
   kuro: {
      name: '쿠로',
      rarity: 3,
      iconPng: 'https://i.ibb.co/SwwwLMr/char-head-spic-kuro.png',
      iconWebp: 'https://i.ibb.co/9sSYXZQ/char-head-spic-kuro.webp',
      dollClass: 'sniper',
      algorithms: [
         [
            'mlrMatrix',
            ['hashratePercent'],
            ['damageBoost', 'hashratePercent', 'critDamage'],
         ],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'critRate']],
         [
            'paradigm',
            ['skillHaste'],
            ['hashratePlus', 'skillHaste', 'critRate'],
         ],
      ],
   },
   daiyan: {
      name: '대연',
      rarity: 3,
      iconPng: 'https://i.ibb.co/fXqRtc0/char-head-spic-daiyan.png',
      iconWebp: 'https://i.ibb.co/qNvxxmh/char-head-spic-daiyan.webp',
      dollClass: 'sniper',
      algorithms: [
         ['mlrMatrix', ['atkPercent'], ['damageBoost', 'atkPercent']],
         ['encapsulate', ['maxHpPlus'], ['critDamage', 'critRate']],
         ['perception', ['maxHpPlus'], ['critDamage', 'critRate']],
         ['deltaV', ['skillHaste'], ['skillHaste', 'critRate']],
         ['cluster', ['critDamage', 'critRate'], ['skillHaste', 'critRate']],
      ],
   },
};

export const DollClasses: Readonly<Record<DollClass, DollClassData>> = {
   guard: {
      name: '수위',
      iconPng: 'https://i.ibb.co/TL2WrTs/class-icon-career-1.png',
      iconWebp: 'https://i.ibb.co/N6GCCj7/class-icon-career-1.webp',
   },
   warrior: {
      name: '전사',
      iconPng: 'https://i.ibb.co/PrPWmCZ/class-icon-career-3.png',
      iconWebp: 'https://i.ibb.co/r3m2qjD/class-icon-career-3.webp',
   },
   specialist: {
      name: '해결사',
      iconPng: 'https://i.ibb.co/hd2P883/class-icon-career-4.png',
      iconWebp: 'https://i.ibb.co/0qmRWHF/class-icon-career-4.webp',
   },
   medic: {
      name: '치료사',
      iconPng: 'https://i.ibb.co/jJkvBFc/class-icon-career-5.png',
      iconWebp: 'https://i.ibb.co/n3DKsMv/class-icon-career-5.webp',
   },
   sniper: {
      name: '사수',
      iconPng: 'https://i.ibb.co/YQNHnHN/class-icon-career-2.png',
      iconWebp: 'https://i.ibb.co/6DkLgnR/class-icon-career-2.webp',
   },
};

export interface Doll {
   name: string;
   rarity: 0 | 1 | 2 | 3;
   iconPng: string;
   iconWebp?: string;
   dollClass: DollClass;
   algorithms: Array<AlgorithmSet>;
   sideIcon?: {
      iconPng: string;
      iconWebp?: string;
   };
}

export const rarityColors: Readonly<Record<0 | 1 | 2 | 3, string>> = {
   0: '#7F7F7F',
   1: '#51BAF5',
   2: '#BD74F9',
   3: '#FC8A00',
} as const;

export const dolls: Readonly<Record<string, Doll>> = {
   ...dollData,
   vee: {
      ...dollData.vee,
      name: '브이 (물리)',
      sideIcon: {
         iconPng: 'https://i.ibb.co/C29NC0f/attr-icon-attri-pow.png',
         iconWebp: 'https://i.ibb.co/cL5PR92/attr-icon-attri-pow.webp',
      },
   },
   veeHashrate: {
      ...dollData.vee,
      name: '브이 (연산)',
      algorithms: [
         ['mlrMatrix', ['hashratePercent'], ['damageBoost', 'hashratePercent']],
         ['perception', ['maxHpPlus'], ['hashratePlus', 'critDamage']],
         ['encapsulate', ['maxHpPlus'], ['hashratePlus', 'critDamage']],
         ['deltaV', ['skillHaste'], ['hashratePlus', 'skillHaste']],
      ],
      sideIcon: {
         iconPng:
            'https://i.ibb.co/rpGr1LB/attr-icon-attri-skill-intensity.png',
         iconWebp:
            'https://i.ibb.co/5nyTJwt/attr-icon-attri-skill-intensity.webp',
      },
   },
};
