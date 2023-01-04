export interface Algorithm {
   name: string;
   iconPng: string;
   iconWebp: string;
   dayObtained: 1 | 2 | 3 | 4 | 5;
   setType: AlgorithmSetType;
}
export const ALGORITHM_SET_TYPE = ['offense', 'stability', 'special'] as const;

export type AlgorithmSetType = typeof ALGORITHM_SET_TYPE[number];

export const ALGORITHM_LIST = [
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

export type AlgorithmList = typeof ALGORITHM_LIST[number];

export const algorithms: Readonly<Record<AlgorithmList, Algorithm>> = {
   dataRepair: {
      name: '데이터 복원',
      iconPng: 'https://i.ibb.co/NmBPCLx/algorithm-set-icon-suit-06.png',
      iconWebp: 'https://i.ibb.co/9Wmf9mZ/algorithm-set-icon-suit-06.webp',
      dayObtained: 5,
      setType: 'offense',
   },
   lowerLimit: {
      name: '최소 역치',
      iconPng: 'https://i.ibb.co/Wchf5Z2/algorithm-set-icon-suit-04.png',
      iconWebp: 'https://i.ibb.co/5KCnY41/algorithm-set-icon-suit-04.webp',
      dayObtained: 2,
      setType: 'offense',
   },
   mlrMatrix: {
      name: '이질 회귀',
      iconPng: 'https://i.ibb.co/fYZGmss/algorithm-set-icon-suit-10.png',
      iconWebp: 'https://i.ibb.co/rwm0Cxz/algorithm-set-icon-suit-10.webp',
      dayObtained: 5,
      setType: 'offense',
   },
   deduction: {
      name: '추론',
      iconPng: 'https://i.ibb.co/RHjS2sp/algorithm-set-icon-suit-19.png',
      iconWebp: 'https://i.ibb.co/p1Vb3gg/algorithm-set-icon-suit-19.webp',
      dayObtained: 4,
      setType: 'offense',
   },
   feedforward: {
      name: '예측',
      iconPng: 'https://i.ibb.co/NZ8gPy1/algorithm-set-icon-suit-12.png',
      iconWebp: 'https://i.ibb.co/82kMRs0/algorithm-set-icon-suit-12.webp',
      dayObtained: 2,
      setType: 'offense',
   },
   progression: {
      name: '점진',
      iconPng: 'https://i.ibb.co/CP9vLF2/algorithm-set-icon-suit-15.png',
      iconWebp: 'https://i.ibb.co/0F3CyS7/algorithm-set-icon-suit-15.webp',
      dayObtained: 3,
      setType: 'offense',
   },
   encapsulate: {
      name: '코드 캡슐화',
      iconPng: 'https://i.ibb.co/9NHqx6S/algorithm-set-icon-suit-07.png',
      iconWebp: 'https://i.ibb.co/qMRgBsQ/algorithm-set-icon-suit-07.webp',
      dayObtained: 1,
      setType: 'stability',
   },
   iteration: {
      name: '머신러닝',
      iconPng: 'https://i.ibb.co/CQ69f2s/algorithm-set-icon-suit-08.png',
      iconWebp: 'https://i.ibb.co/1s238sR/algorithm-set-icon-suit-08.webp',
      dayObtained: 1,
      setType: 'stability',
   },
   overflow: {
      name: '오버플로우',
      iconPng: 'https://i.ibb.co/64GccqB/algorithm-set-icon-suit-09.png',
      iconWebp: 'https://i.ibb.co/16PntRc/algorithm-set-icon-suit-09.webp',
      dayObtained: 2,
      setType: 'stability',
   },
   connection: {
      name: '연결',
      iconPng: 'https://i.ibb.co/1srNgdp/algorithm-set-icon-suit-18.png',
      iconWebp: 'https://i.ibb.co/wKgL2N0/algorithm-set-icon-suit-18.webp',
      dayObtained: 3,
      setType: 'stability',
   },
   perception: {
      name: '감지',
      iconPng: 'https://i.ibb.co/qn31r4W/algorithm-set-icon-suit-11.png',
      iconWebp: 'https://i.ibb.co/4pRRdz0/algorithm-set-icon-suit-11.webp',
      dayObtained: 1,
      setType: 'stability',
   },
   rationality: {
      name: '이성',
      iconPng: 'https://i.ibb.co/8sfJm7B/algorithm-set-icon-suit-17.png',
      iconWebp: 'https://i.ibb.co/R72Q1dh/algorithm-set-icon-suit-17.webp',
      dayObtained: 2,
      setType: 'stability',
   },
   deltaV: {
      name: '벡터 가속',
      iconPng: 'https://i.ibb.co/qyLDp8R/algorithm-set-icon-suit-03.png',
      iconWebp: 'https://i.ibb.co/QC0wx5m/algorithm-set-icon-suit-03.webp',
      dayObtained: 4,
      setType: 'special',
   },
   loopGain: {
      name: '양성 피드백',
      iconPng: 'https://i.ibb.co/D9pYVxC/algorithm-set-icon-suit-01.png',
      iconWebp: 'https://i.ibb.co/M2G57x8/algorithm-set-icon-suit-01.webp',
      dayObtained: 3,
      setType: 'special',
   },
   paradigm: {
      name: '행렬 구조',
      iconPng: 'https://i.ibb.co/4R81sDy/algorithm-set-icon-suit-05.png',
      iconWebp: 'https://i.ibb.co/M6pR1C9/algorithm-set-icon-suit-05.webp',
      dayObtained: 4,
      setType: 'special',
   },
   svm: {
      name: '서포트 벡터',
      iconPng: 'https://i.ibb.co/JspkDKf/algorithm-set-icon-suit-02.png',
      iconWebp: 'https://i.ibb.co/p19Vgbk/algorithm-set-icon-suit-02.webp',
      dayObtained: 3,
      setType: 'special',
   },
   cluster: {
      name: '집속',
      iconPng: 'https://i.ibb.co/VTJXHpB/algorithm-set-icon-suit-13.png',
      iconWebp: 'https://i.ibb.co/8jPwKBh/algorithm-set-icon-suit-13.webp',
      dayObtained: 5,
      setType: 'special',
   },
   inspiration: {
      name: '계몽',
      iconPng: 'https://i.ibb.co/2M8Rg1r/algorithm-set-icon-suit-14.png',
      iconWebp: 'https://i.ibb.co/VVb5MKh/algorithm-set-icon-suit-14.webp',
      dayObtained: 1,
      setType: 'special',
   },
   convolution: {
      name: '합성곱',
      iconPng: 'https://i.ibb.co/nCxRvqG/algorithm-set-icon-suit-16.png',
      iconWebp: 'https://i.ibb.co/S3smz9S/algorithm-set-icon-suit-16.webp',
      dayObtained: 4,
      setType: 'special',
   },
   stratagem: {
      name: '게임론',
      iconPng: 'https://i.ibb.co/8xHqKYk/algorithm-set-icon-suit-20.png',
      iconWebp: 'https://i.ibb.co/HPssyLt/algorithm-set-icon-suit-20.webp',
      dayObtained: 5,
      setType: 'special',
   },
};
