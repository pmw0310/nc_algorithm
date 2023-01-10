export interface AlgorithmData {
   name: string;
   iconPng: string;
   iconWebp: string;
   dayObtained: 1 | 2 | 3 | 4 | 5;
   setType: AlgorithmSetType;
}

export interface AlgorithmSetTypeData {
   name: string;
   iconPng: string;
   iconWebp: string;
}

export const ALGORITHM_SET_TYPE = ['offense', 'stability', 'special'] as const;

export type AlgorithmSetType = typeof ALGORITHM_SET_TYPE[number];

export const algorithmSetTypes: Readonly<
   Record<AlgorithmSetType, AlgorithmSetTypeData>
> = {
   offense: {
      name: '공격성',
      iconPng: 'https://i.ibb.co/P6T3pFZ/algorithm-slot-01-offense.png',
      iconWebp: 'https://i.ibb.co/fxHNJFb/algorithm-slot-01-offense.webp',
   },
   stability: {
      name: '안정성',
      iconPng: 'https://i.ibb.co/wctx61w/algorithm-slot-02-stability.png',
      iconWebp: 'https://i.ibb.co/G7XNBKt/algorithm-slot-02-stability.webp',
   },
   special: {
      name: '특이성',
      iconPng: 'https://i.ibb.co/n6R32Yv/algorithm-slot-03-special.png',
      iconWebp: 'https://i.ibb.co/WxGPCM3/algorithm-slot-03-special.webp',
   },
};

export const ALGORITHM_TYPE = [
   'dataRepair',
   'lowerLimit',
   'mlrMatrix',
   'deduction',
   'feedforward',
   'progression',
   'encapsulate',
   'iteration',
   'overflow',
   'connection',
   'perception',
   'rationality',
   'deltaV',
   'loopGain',
   'paradigm',
   'svm',
   'cluster',
   'inspiration',
   'convolution',
   'stratagem',
] as const;

export type AlgorithmType = typeof ALGORITHM_TYPE[number];

export const algorithms: Readonly<Record<AlgorithmType, AlgorithmData>> = {
   dataRepair: {
      name: '데이터 복원',
      iconPng: 'https://i.ibb.co/2g3hXWL/algorithm-set-icon-suit-06.png',
      iconWebp: 'https://i.ibb.co/9Wmf9mZ/algorithm-set-icon-suit-06.webp',
      dayObtained: 5,
      setType: 'offense',
   },
   lowerLimit: {
      name: '최소 역치',
      iconPng: 'https://i.ibb.co/YtK7GT3/algorithm-set-icon-suit-04.png',
      iconWebp: 'https://i.ibb.co/5KCnY41/algorithm-set-icon-suit-04.webp',
      dayObtained: 2,
      setType: 'offense',
   },
   mlrMatrix: {
      name: '이질 회귀',
      iconPng: 'https://i.ibb.co/WHTtC6c/algorithm-set-icon-suit-10.png',
      iconWebp: 'https://i.ibb.co/rwm0Cxz/algorithm-set-icon-suit-10.webp',
      dayObtained: 5,
      setType: 'offense',
   },
   deduction: {
      name: '추론',
      iconPng: 'https://i.ibb.co/Z6WVJhQ/algorithm-set-icon-suit-19.png',
      iconWebp: 'https://i.ibb.co/p1Vb3gg/algorithm-set-icon-suit-19.webp',
      dayObtained: 4,
      setType: 'offense',
   },
   feedforward: {
      name: '예측',
      iconPng: 'https://i.ibb.co/MSpqkds/algorithm-set-icon-suit-12.png',
      iconWebp: 'https://i.ibb.co/82kMRs0/algorithm-set-icon-suit-12.webp',
      dayObtained: 2,
      setType: 'offense',
   },
   progression: {
      name: '점진',
      iconPng: 'https://i.ibb.co/gJKpCF9/algorithm-set-icon-suit-15.png',
      iconWebp: 'https://i.ibb.co/0F3CyS7/algorithm-set-icon-suit-15.webp',
      dayObtained: 3,
      setType: 'offense',
   },
   encapsulate: {
      name: '코드 캡슐화',
      iconPng: 'https://i.ibb.co/CW02hpJ/algorithm-set-icon-suit-07.png',
      iconWebp: 'https://i.ibb.co/qMRgBsQ/algorithm-set-icon-suit-07.webp',
      dayObtained: 1,
      setType: 'stability',
   },
   iteration: {
      name: '머신러닝',
      iconPng: 'https://i.ibb.co/p3dgbBs/algorithm-set-icon-suit-08.png',
      iconWebp: 'https://i.ibb.co/1s238sR/algorithm-set-icon-suit-08.webp',
      dayObtained: 1,
      setType: 'stability',
   },
   overflow: {
      name: '오버플로우',
      iconPng: 'https://i.ibb.co/M8Yxzr4/algorithm-set-icon-suit-09.png',
      iconWebp: 'https://i.ibb.co/16PntRc/algorithm-set-icon-suit-09.webp',
      dayObtained: 2,
      setType: 'stability',
   },
   connection: {
      name: '연결',
      iconPng: 'https://i.ibb.co/9g1jJsp/algorithm-set-icon-suit-18.png',
      iconWebp: 'https://i.ibb.co/wKgL2N0/algorithm-set-icon-suit-18.webp',
      dayObtained: 3,
      setType: 'stability',
   },
   perception: {
      name: '감지',
      iconPng: 'https://i.ibb.co/YPJxCbV/algorithm-set-icon-suit-11.png',
      iconWebp: 'https://i.ibb.co/4pRRdz0/algorithm-set-icon-suit-11.webp',
      dayObtained: 1,
      setType: 'stability',
   },
   rationality: {
      name: '이성',
      iconPng: 'https://i.ibb.co/FKg0sTY/algorithm-set-icon-suit-17.png',
      iconWebp: 'https://i.ibb.co/R72Q1dh/algorithm-set-icon-suit-17.webp',
      dayObtained: 2,
      setType: 'stability',
   },
   deltaV: {
      name: '벡터 가속',
      iconPng: 'https://i.ibb.co/3dpY0qC/algorithm-set-icon-suit-03.png',
      iconWebp: 'https://i.ibb.co/QC0wx5m/algorithm-set-icon-suit-03.webp',
      dayObtained: 4,
      setType: 'special',
   },
   loopGain: {
      name: '양성 피드백',
      iconPng: 'https://i.ibb.co/hXMgmnQ/algorithm-set-icon-suit-01.png',
      iconWebp: 'https://i.ibb.co/M2G57x8/algorithm-set-icon-suit-01.webp',
      dayObtained: 3,
      setType: 'special',
   },
   paradigm: {
      name: '행렬 구조',
      iconPng: 'https://i.ibb.co/C0KnpB6/algorithm-set-icon-suit-05.png',
      iconWebp: 'https://i.ibb.co/M6pR1C9/algorithm-set-icon-suit-05.webp',
      dayObtained: 4,
      setType: 'special',
   },
   svm: {
      name: '서포트 벡터',
      iconPng: 'https://i.ibb.co/Xt9HYsq/algorithm-set-icon-suit-02.png',
      iconWebp: 'https://i.ibb.co/p19Vgbk/algorithm-set-icon-suit-02.webp',
      dayObtained: 3,
      setType: 'special',
   },
   cluster: {
      name: '집속',
      iconPng: 'https://i.ibb.co/JkVZtZP/algorithm-set-icon-suit-13.png',
      iconWebp: 'https://i.ibb.co/8jPwKBh/algorithm-set-icon-suit-13.webp',
      dayObtained: 5,
      setType: 'special',
   },
   inspiration: {
      name: '계몽',
      iconPng: 'https://i.ibb.co/ZV85t9L/algorithm-set-icon-suit-14.png',
      iconWebp: 'https://i.ibb.co/VVb5MKh/algorithm-set-icon-suit-14.webp',
      dayObtained: 1,
      setType: 'special',
   },
   convolution: {
      name: '합성곱',
      iconPng: 'https://i.ibb.co/ynTk7m8/algorithm-set-icon-suit-16.png',
      iconWebp: 'https://i.ibb.co/S3smz9S/algorithm-set-icon-suit-16.webp',
      dayObtained: 4,
      setType: 'special',
   },
   stratagem: {
      name: '게임론',
      iconPng: 'https://i.ibb.co/jzQvGQx/algorithm-set-icon-suit-20.png',
      iconWebp: 'https://i.ibb.co/HPssyLt/algorithm-set-icon-suit-20.webp',
      dayObtained: 5,
      setType: 'special',
   },
};

export const STATS_TYPE = [
   'maxHpPlus',
   'maxHpPercent',
   'atkPlus',
   'atkPercent',
   'hashratePlus',
   'hashratePercent',
   'physicalDefPlus',
   'physicalDefPercent',
   'operandDefPlus',
   'operandDefPercent',
   'attackSpeed',
   'critRate',
   'critDamage',
   'physicalPen',
   'operandPen',
   'bodgeRate',
   'postBattleHpRegen',
   'skillHaste',
   'debuffResistance',
   'backlash',
   'damageBoost',
   'injuryMitigation',
   'healingEffect',
] as const;

export type statsType = typeof STATS_TYPE[number];

export interface StatsData {
   name: string;
   iconPng: string;
   iconWebp: string;
}

export const stats: Readonly<Record<statsType, StatsData>> = {
   maxHpPlus: {
      name: '최대체력 +',
      iconPng: 'https://i.ibb.co/GTf2V7f/attr-icon-attri-hp.png',
      iconWebp: 'https://i.ibb.co/1fjdzj9/attr-icon-attri-hp.webp',
   },
   maxHpPercent: {
      name: '최대체력 %',
      iconPng: 'https://i.ibb.co/GTf2V7f/attr-icon-attri-hp.png',
      iconWebp: 'https://i.ibb.co/1fjdzj9/attr-icon-attri-hp.webp',
   },
   atkPlus: {
      name: '공격력 +',
      iconPng: 'https://i.ibb.co/C29NC0f/attr-icon-attri-pow.png',
      iconWebp: 'https://i.ibb.co/cL5PR92/attr-icon-attri-pow.webp',
   },
   atkPercent: {
      name: '공격력 %',
      iconPng: 'https://i.ibb.co/C29NC0f/attr-icon-attri-pow.png',
      iconWebp: 'https://i.ibb.co/cL5PR92/attr-icon-attri-pow.webp',
   },
   hashratePlus: {
      name: '연산력 +',
      iconPng: 'https://i.ibb.co/rpGr1LB/attr-icon-attri-skill-intensity.png',
      iconWebp: 'https://i.ibb.co/5nyTJwt/attr-icon-attri-skill-intensity.webp',
   },
   hashratePercent: {
      name: '연산력 %',
      iconPng: 'https://i.ibb.co/rpGr1LB/attr-icon-attri-skill-intensity.png',
      iconWebp: 'https://i.ibb.co/5nyTJwt/attr-icon-attri-skill-intensity.webp',
   },
   physicalDefPlus: {
      name: '물리방어 +',
      iconPng: 'https://i.ibb.co/RbpfH97/attr-icon-attri-def.png',
      iconWebp: 'https://i.ibb.co/vZKG0QQ/attr-icon-attri-def.webp',
   },
   physicalDefPercent: {
      name: '물리방어 %',
      iconPng: 'https://i.ibb.co/RbpfH97/attr-icon-attri-def.png',
      iconWebp: 'https://i.ibb.co/vZKG0QQ/attr-icon-attri-def.webp',
   },
   operandDefPlus: {
      name: '연산방어 +',
      iconPng: 'https://i.ibb.co/gwDMNR7/attr-icon-attri-magic-res.png',
      iconWebp: 'https://i.ibb.co/4M1BWdW/attr-icon-attri-magic-res.webp',
   },
   operandDefPercent: {
      name: '연산방어 %',
      iconPng: 'https://i.ibb.co/gwDMNR7/attr-icon-attri-magic-res.png',
      iconWebp: 'https://i.ibb.co/4M1BWdW/attr-icon-attri-magic-res.webp',
   },
   attackSpeed: {
      name: '공격속도',
      iconPng: 'https://i.ibb.co/njbLJrL/attr-icon-attri-speed.png',
      iconWebp: 'https://i.ibb.co/jH4VVPy/attr-icon-attri-speed.webp',
   },
   critRate: {
      name: '치명율',
      iconPng: 'https://i.ibb.co/9Gg3cQC/attr-icon-attri.png',
      iconWebp: 'https://i.ibb.co/b28c7Px/attr-icon-attri.webp',
   },
   critDamage: {
      name: '치명타 피해',
      iconPng: 'https://i.ibb.co/68CCmMh/attr-icon-attri-crit-damage.png',
      iconWebp: 'https://i.ibb.co/M22hp66/attr-icon-attri-crit-damage.webp',
   },
   physicalPen: {
      name: '물리관통',
      iconPng: 'https://i.ibb.co/kM4S125/attr-icon-attri-sunder.png',
      iconWebp: 'https://i.ibb.co/ZGt67cL/attr-icon-attri-sunder.webp',
   },
   operandPen: {
      name: '연산관통',
      iconPng: 'https://i.ibb.co/j8MYZfz/attr-icon-attri-magic-pen.png',
      iconWebp: 'https://i.ibb.co/2k013Qz/attr-icon-attri-magic-pen.webp',
   },
   bodgeRate: {
      name: '회피율',
      iconPng: 'https://i.ibb.co/p6TmYXd/attr-icon-attri-dodge.png',
      iconWebp: 'https://i.ibb.co/xLmsh3k/attr-icon-attri-dodge.webp',
   },
   postBattleHpRegen: {
      name: '전투 후 회복',
      iconPng: 'https://i.ibb.co/vcMRgYG/attr-icon-attri-battle-hp-regen.png',
      iconWebp: 'https://i.ibb.co/xYP4MLd/attr-icon-attri-battle-hp-regen.webp',
   },
   skillHaste: {
      name: '충전속도',
      iconPng: 'https://i.ibb.co/WHhz5VD/attr-icon-attri-cd-reduce.png',
      iconWebp: 'https://i.ibb.co/sHfB4QD/attr-icon-attri-cd-reduce.webp',
   },
   debuffResistance: {
      name: '효과저항',
      iconPng: 'https://i.ibb.co/r5cL25c/attr-icon-attri-resistance.png',
      iconWebp: 'https://i.ibb.co/QpVc7n9/attr-icon-attri-resistance.webp',
   },
   backlash: {
      name: '피해반사',
      iconPng: 'https://i.ibb.co/1XNxkz9/attr-icon-attri-return-damage.png',
      iconWebp: 'https://i.ibb.co/RvV2hHM/attr-icon-attri-return-damage.webp',
   },
   damageBoost: {
      name: '주는 피해량 증폭',
      iconPng: 'https://i.ibb.co/5rGqPY2/attr-icon-attri-damage-increase.png',
      iconWebp: 'https://i.ibb.co/6tStrzV/attr-icon-attri-damage-increase.webp',
   },
   injuryMitigation: {
      name: '피해차감',
      iconPng: 'https://i.ibb.co/kBjy0dx/attr-icon-attri-injury-reduce.png',
      iconWebp: 'https://i.ibb.co/Lp186QQ/attr-icon-attri-injury-reduce.webp',
   },
   healingEffect: {
      name: '치료효과',
      iconPng: 'https://i.ibb.co/60t3YrS/attr-icon-attri-heal.png',
      iconWebp: 'https://i.ibb.co/sFzqw6J/attr-icon-attri-heal.webp',
   },
} as const;
