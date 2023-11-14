import {
   union,
   intersection,
   indexOf,
   toPairs,
   fromPairs,
   compact,
   // pick,
   // forOwn,
   // mapValues,
} from 'lodash';

export const DAY_OBTAINED = [1, 2, 3, 4, 5] as const;
export type DayObtained = typeof DAY_OBTAINED[number];

export interface AlgorithmData {
   name: string;
   iconPng: string;
   iconWebp: string;
   dayObtained: DayObtained;
   setType: AlgorithmSetType;
   setBonus: Array<{
      pcsSet: number;
      bonus: string;
   }>;
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

export const OFFENSE_ALGORITHM_TYPE = [
   'dataRepair',
   'lowerLimit',
   'mlrMatrix',
   'deduction',
   'feedforward',
   'progression',
   'limitValue',
   'stack',
] as const;

export const STABILITY_ALGORITHM_TYPE = [
   'encapsulate',
   'iteration',
   'overflow',
   'connection',
   'perception',
   'rationality',
   'reflection',
   'resolve',
] as const;

export const SPECIAL_ALGORITHM_TYPE = [
   'deltaV',
   'loopGain',
   'paradigm',
   'svm',
   'cluster',
   'inspiration',
   'convolution',
   'stratagem',
   'exploit',
] as const;

export const ALGORITHM_TYPE = [
   ...OFFENSE_ALGORITHM_TYPE,
   ...STABILITY_ALGORITHM_TYPE,
   ...SPECIAL_ALGORITHM_TYPE,
] as const;

export type AlgorithmType = typeof ALGORITHM_TYPE[number];
export type OffenseAlgorithmType = typeof OFFENSE_ALGORITHM_TYPE[number];
export type StabilityAlgorithmType = typeof STABILITY_ALGORITHM_TYPE[number];
export type SpecialAlgorithmType = typeof SPECIAL_ALGORITHM_TYPE[number];

export const algorithms: Readonly<Record<AlgorithmType, AlgorithmData>> = {
   dataRepair: {
      name: '데이터 복원',
      iconPng: 'https://i.ibb.co/2g3hXWL/algorithm-set-icon-suit-06.png',
      iconWebp: 'https://i.ibb.co/9Wmf9mZ/algorithm-set-icon-suit-06.webp',
      dayObtained: 5,
      setType: 'offense',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '효과저항 +50',
         },
         {
            pcsSet: 3,
            bonus: '적에게 입힌 피해량의 10% 만큼 체력으로 전환',
         },
      ],
   },
   lowerLimit: {
      name: '최소 역치',
      iconPng: 'https://i.ibb.co/YtK7GT3/algorithm-set-icon-suit-04.png',
      iconWebp: 'https://i.ibb.co/5KCnY41/algorithm-set-icon-suit-04.webp',
      dayObtained: 2,
      setType: 'offense',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '체력흡수 +10%',
         },
         {
            pcsSet: 3,
            bonus: '체력이 15% 미만일 때 10초간 공격속도 +50, 공격력 10%, 피해차감 +30%. 전투마다 1회 발동가능.',
         },
      ],
   },
   mlrMatrix: {
      name: '이질 회귀',
      iconPng: 'https://i.ibb.co/WHTtC6c/algorithm-set-icon-suit-10.png',
      iconWebp: 'https://i.ibb.co/rwm0Cxz/algorithm-set-icon-suit-10.webp',
      dayObtained: 5,
      setType: 'offense',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '주는 피해량 +5%',
         },
         {
            pcsSet: 3,
            bonus: '적 유닛을 쓰러뜨리면 해당 전투 동안 상대의 공격력, 연산력, 체력 상한의 12%를 탈취하고 그만큼 회복한다. (중복 시 최고치로 갱신)',
         },
      ],
   },
   deduction: {
      name: '추론',
      iconPng: 'https://i.ibb.co/Z6WVJhQ/algorithm-set-icon-suit-19.png',
      iconWebp: 'https://i.ibb.co/p1Vb3gg/algorithm-set-icon-suit-19.webp',
      dayObtained: 4,
      setType: 'offense',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '공격속도 +30',
         },
      ],
   },
   feedforward: {
      name: '예측',
      iconPng: 'https://i.ibb.co/MSpqkds/algorithm-set-icon-suit-12.png',
      iconWebp: 'https://i.ibb.co/82kMRs0/algorithm-set-icon-suit-12.webp',
      dayObtained: 2,
      setType: 'offense',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '기초 공격력 +15%',
         },
      ],
   },
   progression: {
      name: '점진',
      iconPng: 'https://i.ibb.co/gJKpCF9/algorithm-set-icon-suit-15.png',
      iconWebp: 'https://i.ibb.co/0F3CyS7/algorithm-set-icon-suit-15.webp',
      dayObtained: 3,
      setType: 'offense',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '기초 연산력 +15%',
         },
      ],
   },
   encapsulate: {
      name: '코드 캡슐화',
      iconPng: 'https://i.ibb.co/CW02hpJ/algorithm-set-icon-suit-07.png',
      iconWebp: 'https://i.ibb.co/qMRgBsQ/algorithm-set-icon-suit-07.webp',
      dayObtained: 1,
      setType: 'stability',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '피해차감 +5%',
         },
         {
            pcsSet: 3,
            bonus: '지원 능력을 얻어 현재 체력이 가장 낮은 아군이 받는 피해량의 30%를 대신 받는다.',
         },
      ],
   },
   iteration: {
      name: '머신러닝',
      iconPng: 'https://i.ibb.co/p3dgbBs/algorithm-set-icon-suit-08.png',
      iconWebp: 'https://i.ibb.co/1s238sR/algorithm-set-icon-suit-08.webp',
      dayObtained: 1,
      setType: 'stability',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '피해반사 +5%',
         },
         {
            pcsSet: 3,
            bonus: '전투 종료 시 쓰러지지 않았을 경우 최대 체력의 15%만큼 체력을 회복한다.',
         },
      ],
   },
   overflow: {
      name: '오버플로우',
      iconPng: 'https://i.ibb.co/M8Yxzr4/algorithm-set-icon-suit-09.png',
      iconWebp: 'https://i.ibb.co/16PntRc/algorithm-set-icon-suit-09.webp',
      dayObtained: 2,
      setType: 'stability',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '5초당 회복 +2%',
         },
         {
            pcsSet: 3,
            bonus: '전투 시작 시 자신에게 물리 방어력 500%만큼의 보호막을 생성한다.',
         },
      ],
   },
   connection: {
      name: '연결',
      iconPng: 'https://i.ibb.co/9g1jJsp/algorithm-set-icon-suit-18.png',
      iconWebp: 'https://i.ibb.co/wKgL2N0/algorithm-set-icon-suit-18.webp',
      dayObtained: 3,
      setType: 'stability',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '효과저항 +50',
         },
      ],
   },
   perception: {
      name: '감지',
      iconPng: 'https://i.ibb.co/YPJxCbV/algorithm-set-icon-suit-11.png',
      iconWebp: 'https://i.ibb.co/4pRRdz0/algorithm-set-icon-suit-11.webp',
      dayObtained: 1,
      setType: 'stability',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '기초 체력 +15%',
         },
      ],
   },
   rationality: {
      name: '이성',
      iconPng: 'https://i.ibb.co/FKg0sTY/algorithm-set-icon-suit-17.png',
      iconWebp: 'https://i.ibb.co/R72Q1dh/algorithm-set-icon-suit-17.webp',
      dayObtained: 2,
      setType: 'stability',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '기초 방어력 +15%',
         },
      ],
   },
   deltaV: {
      name: '벡터 가속',
      iconPng: 'https://i.ibb.co/3dpY0qC/algorithm-set-icon-suit-03.png',
      iconWebp: 'https://i.ibb.co/QC0wx5m/algorithm-set-icon-suit-03.webp',
      dayObtained: 4,
      setType: 'special',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '충전속도 +10%',
         },
         {
            pcsSet: 3,
            bonus: '일반공격 3회마다 스킬 충전량 +1초',
         },
      ],
   },
   loopGain: {
      name: '양성 피드백',
      iconPng: 'https://i.ibb.co/hXMgmnQ/algorithm-set-icon-suit-01.png',
      iconWebp: 'https://i.ibb.co/M2G57x8/algorithm-set-icon-suit-01.webp',
      dayObtained: 3,
      setType: 'special',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '치료효과 +7.5%',
         },
         {
            pcsSet: 3,
            bonus: '아군을 치료할 때 4초간 대상이 받는 치료량을 20% 상승시킨다.',
         },
      ],
   },
   paradigm: {
      name: '행렬 구조',
      iconPng: 'https://i.ibb.co/C0KnpB6/algorithm-set-icon-suit-05.png',
      iconWebp: 'https://i.ibb.co/M6pR1C9/algorithm-set-icon-suit-05.webp',
      dayObtained: 4,
      setType: 'special',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '공격속도 +30',
         },
         {
            pcsSet: 3,
            bonus: '치명타 4회마다 적에게 현재 체력 9%만큼의 고정피해를 준다. 단 연산력의 2배를 넘지 않음.',
         },
      ],
   },
   svm: {
      name: '서포트 벡터',
      iconPng: 'https://i.ibb.co/Xt9HYsq/algorithm-set-icon-suit-02.png',
      iconWebp: 'https://i.ibb.co/p19Vgbk/algorithm-set-icon-suit-02.webp',
      dayObtained: 3,
      setType: 'special',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '치료효과 +7.5%',
         },
         {
            pcsSet: 3,
            bonus: '치료효과 +10%, 치료 대상의 체력이 45% 미만일 경우 치료효과 +30%.',
         },
      ],
   },
   cluster: {
      name: '집속',
      iconPng: 'https://i.ibb.co/JkVZtZP/algorithm-set-icon-suit-13.png',
      iconWebp: 'https://i.ibb.co/8jPwKBh/algorithm-set-icon-suit-13.webp',
      dayObtained: 5,
      setType: 'special',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '치명률 +10%',
         },
      ],
   },
   inspiration: {
      name: '계몽',
      iconPng: 'https://i.ibb.co/ZV85t9L/algorithm-set-icon-suit-14.png',
      iconWebp: 'https://i.ibb.co/VVb5MKh/algorithm-set-icon-suit-14.webp',
      dayObtained: 1,
      setType: 'special',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '5초당 회복 +2%',
         },
      ],
   },
   convolution: {
      name: '합성곱',
      iconPng: 'https://i.ibb.co/ynTk7m8/algorithm-set-icon-suit-16.png',
      iconWebp: 'https://i.ibb.co/S3smz9S/algorithm-set-icon-suit-16.webp',
      dayObtained: 4,
      setType: 'special',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '치명타 피해 +20%',
         },
      ],
   },
   stratagem: {
      name: '게임론',
      iconPng: 'https://i.ibb.co/jzQvGQx/algorithm-set-icon-suit-20.png',
      iconWebp: 'https://i.ibb.co/HPssyLt/algorithm-set-icon-suit-20.webp',
      dayObtained: 5,
      setType: 'special',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '회피 +8%',
         },
      ],
   },
   limitValue: {
      name: '역치초과 반응',
      iconPng: 'https://i.ibb.co/4SK6G6v/limit-Value.png',
      iconWebp: 'https://i.ibb.co/BTncFgW/limit-Value.webp',
      dayObtained: 2,
      setType: 'offense',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '피해량 +5%',
         },
         {
            pcsSet: 3,
            bonus: '자신보다 체력이 높은 적에게 피해를 주면 (6%+ 적 최대 체력/자신 최대 체력)의 추가 데미지',
         },
      ],
   },
   stack: {
      name: '연산자 중첩',
      iconPng: 'https://i.ibb.co/0VPWXVz/stack.png',
      iconWebp: 'https://i.ibb.co/ccc0Qy6/stack.webp',
      dayObtained: 1,
      setType: 'offense',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '기본 연산력 +15%',
         },
         {
            pcsSet: 3,
            bonus: '3회 일반 공격을 한 이후부터 일반 공격 시 자신의 연산력 10%만큼의 추가 데미지',
         },
      ],
   },
   resolve: {
      name: '낮은값 저항',
      iconPng: 'https://i.ibb.co/gwNpCG1/resolve.png',
      iconWebp: 'https://i.ibb.co/4Yrnzjs/resolve.webp',
      dayObtained: 5,
      setType: 'stability',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '피해차감 +5%',
         },
         {
            pcsSet: 3,
            bonus: '체력이 50% 이하로 감소했을 때 받는 데미지 10% 감소, 체력 50% 미만에서는 체력이 10% 감소할 때마다 받는 데미지 5%씩 추가 감소',
         },
      ],
   },
   reflection: {
      name: '열축적 반사',
      iconPng: 'https://i.ibb.co/WFg2NGz/reflection.png',
      iconWebp: 'https://i.ibb.co/GQX637G/reflection.webp',
      dayObtained: 3,
      setType: 'stability',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '피해반사 +5%',
         },
         {
            pcsSet: 3,
            bonus: '반사 데미지를 입힐 때, 자신의 최대 체력 1.2%만큼의 고정 피해 데미지를 추가, 스킬이 해제될 때 자신 주위 2칸 이내의 적을 3초간 도발하며 반사 데미지를 증가',
         },
      ],
   },
   exploit: {
      name: '취약점 확장',
      iconPng: 'https://i.ibb.co/71QQ5rX/exploit.png',
      iconWebp: 'https://i.ibb.co/hs9n7TH/exploit.webp',
      dayObtained: 4,
      setType: 'special',
      setBonus: [
         {
            pcsSet: 2,
            bonus: '충전속도 +10%',
         },
         {
            pcsSet: 3,
            bonus: '디버프를 받고 있는 적에게 주는 데미지 +10%, 적이 받고 있는 디버프 종류당 데미지 2% 증가(최대 6%)',
         },
      ],
   },
};

const dayObtainedAlgorithmTypes = (() => {
   const pairs = toPairs(algorithms);

   const types = DAY_OBTAINED.map(day => {
      const keys = pairs
         .filter(([, { dayObtained }]) => dayObtained === day)
         .map(([key]) => key);
      Object.freeze(keys);
      return [day, keys];
   });

   return fromPairs(types) as Record<DayObtained, Array<AlgorithmType>>;
})();

Object.freeze(dayObtainedAlgorithmTypes);

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
   'physicalPenPlus',
   'physicalPenPercent',
   'operandPenPlus',
   'operandPenPercent',
   'bodgeRate',
   'postBattleHpRegen',
   'skillHaste',
   'debuffResistance',
   'backlash',
   'damageBoost',
   'injuryMitigation',
   'healingEffect',
] as const;

export type StatsType = typeof STATS_TYPE[number];

export const SPECIAL_PRIMARY_STATS_TYPE = [
   'physicalDefPlus',
   'physicalDefPercent',
   'operandDefPlus',
   'operandDefPercent',
   'critRate',
   'critDamage',
   'skillHaste',
   'healingEffect',
] as const;

export type SpecialPrimaryStatsType = Extract<
   StatsType,
   typeof SPECIAL_PRIMARY_STATS_TYPE[number]
>;

export const SPECIAL_SECONDARY_STATS_TYPE = [
   'maxHpPlus',
   'atkPlus',
   'hashratePlus',
   'physicalDefPlus',
   'physicalDefPercent',
   'operandDefPlus',
   'operandDefPercent',
   'physicalPenPlus',
   'operandPenPlus',
   'critRate',
   'critDamage',
   'bodgeRate',
   'postBattleHpRegen',
   'debuffResistance',
   'skillHaste',
   'healingEffect',
] as const;
export type SpecialSecondaryStatsType = Extract<
   StatsType,
   typeof SPECIAL_SECONDARY_STATS_TYPE[number]
>;

export const STABILITY_PRIMARY_STATS_TYPE = [
   'maxHpPlus',
   'maxHpPercent',
   'physicalDefPlus',
   'physicalDefPercent',
   'operandDefPlus',
   'operandDefPercent',
   'postBattleHpRegen',
] as const;
export type StabilityPrimaryStatsType = Extract<
   StatsType,
   typeof STABILITY_PRIMARY_STATS_TYPE[number]
>;

export const STABILITY_SECONDARY_STATS_TYPE = [
   'maxHpPlus',
   'maxHpPercent',
   'atkPlus',
   'hashratePlus',
   'physicalDefPlus',
   'physicalDefPercent',
   'operandDefPlus',
   'operandDefPercent',
   'physicalPenPlus',
   'operandPenPlus',
   'critRate',
   'critDamage',
   'postBattleHpRegen',
   'debuffResistance',
   'injuryMitigation',
] as const;
export type StabilitySecondaryStatsType = Extract<
   StatsType,
   typeof STABILITY_SECONDARY_STATS_TYPE[number]
>;

export const OFFENSE_PRIMARY_STATS_TYPE = [
   'atkPlus',
   'atkPercent',
   'hashratePlus',
   'hashratePercent',
   'physicalPenPlus',
   'physicalPenPercent',
   'operandPenPlus',
   'operandPenPercent',
] as const;
export type OffensePrimaryStatsType = Extract<
   StatsType,
   typeof OFFENSE_PRIMARY_STATS_TYPE[number]
>;

export const OFFENSE_SECONDARY_STATS_TYPE = [
   'maxHpPlus',
   'atkPlus',
   'atkPercent',
   'hashratePlus',
   'hashratePercent',
   'physicalDefPlus',
   'operandDefPlus',
   'physicalPenPlus',
   'operandPenPlus',
   'critRate',
   'critDamage',
   'postBattleHpRegen',
   'debuffResistance',
   'damageBoost',
] as const;
export type OffenseSecondaryStatsType = Extract<
   StatsType,
   typeof OFFENSE_SECONDARY_STATS_TYPE[number]
>;

export interface StatsData {
   name: string;
   iconPng: string;
   iconWebp: string;
   key: string;
}

export const stats: Readonly<Record<StatsType, StatsData>> = {
   maxHpPlus: {
      key: 'maxHpPlus',
      name: '최대체력 +',
      iconPng: 'https://i.ibb.co/GTf2V7f/attr-icon-attri-hp.png',
      iconWebp: 'https://i.ibb.co/1fjdzj9/attr-icon-attri-hp.webp',
   },
   maxHpPercent: {
      key: 'maxHpPercent',
      name: '최대체력 %',
      iconPng: 'https://i.ibb.co/GTf2V7f/attr-icon-attri-hp.png',
      iconWebp: 'https://i.ibb.co/1fjdzj9/attr-icon-attri-hp.webp',
   },
   atkPlus: {
      key: 'atkPlus',
      name: '공격력 +',
      iconPng: 'https://i.ibb.co/C29NC0f/attr-icon-attri-pow.png',
      iconWebp: 'https://i.ibb.co/cL5PR92/attr-icon-attri-pow.webp',
   },
   atkPercent: {
      key: 'atkPercent',
      name: '공격력 %',
      iconPng: 'https://i.ibb.co/C29NC0f/attr-icon-attri-pow.png',
      iconWebp: 'https://i.ibb.co/cL5PR92/attr-icon-attri-pow.webp',
   },
   hashratePlus: {
      key: 'hashratePlus',
      name: '연산력 +',
      iconPng: 'https://i.ibb.co/rpGr1LB/attr-icon-attri-skill-intensity.png',
      iconWebp: 'https://i.ibb.co/5nyTJwt/attr-icon-attri-skill-intensity.webp',
   },
   hashratePercent: {
      key: 'hashratePercent',
      name: '연산력 %',
      iconPng: 'https://i.ibb.co/rpGr1LB/attr-icon-attri-skill-intensity.png',
      iconWebp: 'https://i.ibb.co/5nyTJwt/attr-icon-attri-skill-intensity.webp',
   },
   physicalDefPlus: {
      key: 'physicalDefPlus',
      name: '물리방어 +',
      iconPng: 'https://i.ibb.co/RbpfH97/attr-icon-attri-def.png',
      iconWebp: 'https://i.ibb.co/vZKG0QQ/attr-icon-attri-def.webp',
   },
   physicalDefPercent: {
      key: 'physicalDefPercent',
      name: '물리방어 %',
      iconPng: 'https://i.ibb.co/RbpfH97/attr-icon-attri-def.png',
      iconWebp: 'https://i.ibb.co/vZKG0QQ/attr-icon-attri-def.webp',
   },
   operandDefPlus: {
      key: 'operandDefPlus',
      name: '연산방어 +',
      iconPng: 'https://i.ibb.co/gwDMNR7/attr-icon-attri-magic-res.png',
      iconWebp: 'https://i.ibb.co/4M1BWdW/attr-icon-attri-magic-res.webp',
   },
   operandDefPercent: {
      key: 'operandDefPercent',
      name: '연산방어 %',
      iconPng: 'https://i.ibb.co/gwDMNR7/attr-icon-attri-magic-res.png',
      iconWebp: 'https://i.ibb.co/4M1BWdW/attr-icon-attri-magic-res.webp',
   },
   attackSpeed: {
      key: 'attackSpeed',
      name: '공격속도',
      iconPng: 'https://i.ibb.co/njbLJrL/attr-icon-attri-speed.png',
      iconWebp: 'https://i.ibb.co/jH4VVPy/attr-icon-attri-speed.webp',
   },
   critRate: {
      key: 'critRate',
      name: '치명율',
      iconPng: 'https://i.ibb.co/9Gg3cQC/attr-icon-attri.png',
      iconWebp: 'https://i.ibb.co/b28c7Px/attr-icon-attri.webp',
   },
   critDamage: {
      key: 'critDamage',
      name: '치명타 피해',
      iconPng: 'https://i.ibb.co/68CCmMh/attr-icon-attri-crit-damage.png',
      iconWebp: 'https://i.ibb.co/M22hp66/attr-icon-attri-crit-damage.webp',
   },
   physicalPenPlus: {
      key: 'physicalPenPlus',
      name: '물리관통 +',
      iconPng: 'https://i.ibb.co/kM4S125/attr-icon-attri-sunder.png',
      iconWebp: 'https://i.ibb.co/ZGt67cL/attr-icon-attri-sunder.webp',
   },
   physicalPenPercent: {
      key: 'physicalPenPercent',
      name: '물리관통 %',
      iconPng: 'https://i.ibb.co/kM4S125/attr-icon-attri-sunder.png',
      iconWebp: 'https://i.ibb.co/ZGt67cL/attr-icon-attri-sunder.webp',
   },
   operandPenPlus: {
      key: 'operandPenPlus',
      name: '연산관통 +',
      iconPng: 'https://i.ibb.co/j8MYZfz/attr-icon-attri-magic-pen.png',
      iconWebp: 'https://i.ibb.co/2k013Qz/attr-icon-attri-magic-pen.webp',
   },
   operandPenPercent: {
      key: 'operandPenPercent',
      name: '연산관통 %',
      iconPng: 'https://i.ibb.co/j8MYZfz/attr-icon-attri-magic-pen.png',
      iconWebp: 'https://i.ibb.co/2k013Qz/attr-icon-attri-magic-pen.webp',
   },
   bodgeRate: {
      key: 'bodgeRate',
      name: '회피율',
      iconPng: 'https://i.ibb.co/p6TmYXd/attr-icon-attri-dodge.png',
      iconWebp: 'https://i.ibb.co/xLmsh3k/attr-icon-attri-dodge.webp',
   },
   postBattleHpRegen: {
      key: 'postBattleHpRegen',
      name: '전투 후 회복',
      iconPng: 'https://i.ibb.co/vcMRgYG/attr-icon-attri-battle-hp-regen.png',
      iconWebp: 'https://i.ibb.co/xYP4MLd/attr-icon-attri-battle-hp-regen.webp',
   },
   skillHaste: {
      key: 'skillHaste',
      name: '충전속도',
      iconPng: 'https://i.ibb.co/WHhz5VD/attr-icon-attri-cd-reduce.png',
      iconWebp: 'https://i.ibb.co/sHfB4QD/attr-icon-attri-cd-reduce.webp',
   },
   debuffResistance: {
      key: 'debuffResistance',
      name: '효과저항',
      iconPng: 'https://i.ibb.co/r5cL25c/attr-icon-attri-resistance.png',
      iconWebp: 'https://i.ibb.co/QpVc7n9/attr-icon-attri-resistance.webp',
   },
   backlash: {
      key: 'backlash',
      name: '피해반사',
      iconPng: 'https://i.ibb.co/1XNxkz9/attr-icon-attri-return-damage.png',
      iconWebp: 'https://i.ibb.co/RvV2hHM/attr-icon-attri-return-damage.webp',
   },
   damageBoost: {
      key: 'damageBoost',
      name: '주는 피해량 증폭',
      iconPng: 'https://i.ibb.co/5rGqPY2/attr-icon-attri-damage-increase.png',
      iconWebp: 'https://i.ibb.co/6tStrzV/attr-icon-attri-damage-increase.webp',
   },
   injuryMitigation: {
      key: 'injuryMitigation',
      name: '피해차감',
      iconPng: 'https://i.ibb.co/kBjy0dx/attr-icon-attri-injury-reduce.png',
      iconWebp: 'https://i.ibb.co/Lp186QQ/attr-icon-attri-injury-reduce.webp',
   },
   healingEffect: {
      key: 'healingEffect',
      name: '치료효과',
      iconPng: 'https://i.ibb.co/60t3YrS/attr-icon-attri-heal.png',
      iconWebp: 'https://i.ibb.co/sFzqw6J/attr-icon-attri-heal.webp',
   },
} as const;

export const freeStats: Readonly<StatsData> = {
   key: 'free',
   name: '자유',
   iconPng: 'https://i.ibb.co/dbSqs60/function-mark-icon-corner-12.png',
   iconWebp: 'https://i.ibb.co/S3zd8K1/function-mark-icon-corner-12.webp',
} as const;

export type AlgorithmSet =
   | [
        OffenseAlgorithmType,
        Array<OffensePrimaryStatsType>,
        Array<OffenseSecondaryStatsType>
     ]
   | [
        StabilityAlgorithmType,
        Array<StabilityPrimaryStatsType>,
        Array<StabilitySecondaryStatsType>
     ]
   | [
        SpecialAlgorithmType,
        Array<SpecialPrimaryStatsType>,
        Array<SpecialSecondaryStatsType>
     ];

export type AllAlgorithmSet = Readonly<
   [AlgorithmType, ReadonlyArray<StatsType>, ReadonlyArray<StatsType>]
>;

export type StatisticalData = {
   usage: Array<string>;
   // rate: number;
};
export type AlgorithmSetStatisticalData = Record<
   AlgorithmType,
   StatisticalData & {
      primary: Record<StatsType, StatisticalData>;
      secondary: Record<StatsType, StatisticalData>;
   }
>;

export const allAlgorithmSets: ReadonlyArray<AllAlgorithmSet> =
   ALGORITHM_TYPE.map(algorithmType => {
      const setType = algorithms[algorithmType].setType;

      switch (setType) {
         case 'offense':
            return [
               algorithmType,
               OFFENSE_PRIMARY_STATS_TYPE,
               OFFENSE_SECONDARY_STATS_TYPE,
            ] as const;
         case 'stability':
            return [
               algorithmType,
               STABILITY_PRIMARY_STATS_TYPE,
               STABILITY_SECONDARY_STATS_TYPE,
            ] as const;
         case 'special':
            return [
               algorithmType,
               SPECIAL_PRIMARY_STATS_TYPE,
               SPECIAL_SECONDARY_STATS_TYPE,
            ] as const;
         default:
            throw new TypeError();
      }
   });

const stateSort = (keyA: string, keyB: string) => {
   const indexA = indexOf(STATS_TYPE, keyA);
   const indexB = indexOf(STATS_TYPE, keyB);

   if (indexA > indexB) {
      return 1;
   } else if (indexA < indexB) {
      return -1;
   }
   return 0;
};

export const mergeAlgorithmSet = (
   sets: Array<AlgorithmSet>,
   dayObtained?: DayObtained
): Array<AlgorithmSet> => {
   sets = compact(sets);
   let types = union(sets.map(([type]) => type));

   if (dayObtained) {
      types = intersection(dayObtainedAlgorithmTypes[dayObtained], types);
   }

   return types.map(type => {
      const states = sets
         .filter(([setType]) => setType === type)
         .map(([, primary, secondary]) => [
            primary as Array<StatsType>,
            secondary as Array<StatsType>,
         ]);

      const [primary, secondary] = states.reduce(
         (acc, cur) => {
            acc[0] = union(acc[0], cur[0]);
            acc[1] = union(acc[1], cur[1]);
            return acc;
         },
         [[], []]
      );

      return [type, primary.sort(stateSort), secondary.sort(stateSort)];
   }) as Array<AlgorithmSet>;
};
