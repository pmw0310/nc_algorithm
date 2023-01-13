// import { Fragment } from 'react';
// import { compact, indexOf, head, pick, toPairs } from 'lodash';
// import { styled } from '@mui/material/styles';
// import Image from 'react-image-webp';
// import { Doll, dolls, rarityColors } from './dolls';
// import { algorithmSetTypes, STATS_TYPE } from './algorithms';
// import Divider from '@mui/material/Divider';
// import Avatar from '@mui/material/Avatar';
// import AvatarGroup from '@mui/material/AvatarGroup';

// import {
//    AlgorithmData,
//    algorithms,
//    AlgorithmType,
//    stats,
//    StatsData,
//    StatsType,
// } from './algorithms';

// const AlgorithmView = styled('span')(() => ({
//    position: 'relative',
//    backgroundColor: '#f5f7f7',
//    padding: 6,
//    '.algorithm-main': {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       flexDirection: 'column',
//       '.algorithm-icon': {
//          width: 48,
//          height: 48,
//          objectFit: 'contain',
//          filter:
//             'invert(97%) sepia(4%) saturate(200%) hue-rotate(12deg) brightness(88%) contrast(84%)',
//       },
//       '.algorithm-text': {
//          fontWeight: 'bold',
//       },
//    },
//    '.state-box:last-child': {
//       marginTop: 4,
//    },
//    '.state-view': {
//       display: 'flex',
//       alignItems: 'center',
//    },
//    '.state-box': {
//       borderRadius: 4,
//       padding: '2px 6px',
//       '.state-icon': {
//          width: 14,
//          height: 14,
//          objectFit: 'contain',
//          verticalAlign: 'middle',
//       },
//       '.state-title': {
//          paddingLeft: 4,
//          fontSize: 12,
//       },
//    },
//    '.state-primary': {
//       backgroundColor: rarityColors[3],
//       '.state-title': {
//          color: 'white',
//          fontWeight: 'bold',
//       },
//       '.MuiDivider-root': {
//          borderColor: 'white',
//       },
//    },
//    '.state-secondary': {
//       marginTop: 4,
//       backgroundColor: '#343434',
//       '.state-title': {
//          color: rarityColors[3],
//          fontWeight: 500,
//       },
//       '.state-icon': {
//          filter:
//             'invert(48%) sepia(96%) saturate(1271%) hue-rotate(5deg) brightness(103%) contrast(104%)',
//       },
//       '.MuiDivider-root': {
//          borderColor: '#414141',
//       },
//    },
//    '.set-type-main': {
//       backgroundColor: '#2f2f2f',
//       padding: '2px 4px',
//       marginBottom: 4,
//       display: 'inline-flex',
//       alignItems: 'center',
//       '.set-type-icon': {
//          width: 10,
//          height: 10,
//          verticalAlign: 'middle',
//          marginRight: 4,
//       },
//       '.set-type-title': {
//          fontSize: 10,
//          color: 'white',
//       },
//    },
//    '.MuiAvatarGroup-root': {
//       marginTop: 4,
//       justifyContent: 'center',
//       '.MuiAvatar-root': {
//          width: 20,
//          height: 20,
//          border: '1px solid #fff',
//          fontSize: 8,
//          img: {
//             width: 20,
//             height: 20,
//          },
//       },
//    },
//    '.algorithm-day': {
//       position: 'absolute',
//       left: 0,
//       top: 0,
//       backgroundColor: '#1c1b20',
//       width: 16,
//       height: 16,
//    },
//    '.algorithm-day-title': {
//       position: 'absolute',
//       left: 2.5,
//       top: -0.5,
//       fontSize: 11,
//       fontWeight: 'bold',
//       color: '#f5f7f7',
//    },
// }));

// export interface AlgorithmMap extends AlgorithmData {
//    key: string;
// }

// export interface StatsMap extends StatsData {
//    key: string;
// }

// export const FREE_STATS = 'free';
// export const freeStats: Readonly<StatsMap> = {
//    key: FREE_STATS,
//    name: '자유',
//    iconPng: 'https://i.ibb.co/wCZgD4J/reload-icon.png',
//    iconWebp: 'https://i.ibb.co/whp5Kf5/reload-icon.webp',
// } as const;

// export type statsTypes = StatsType | typeof FREE_STATS;

// export class Algorithm {
//    private algorithm: AlgorithmMap;
//    private primary?: Array<StatsMap>;
//    private secondary?: Array<StatsMap>;

//    private setStats(
//       statsArray: Array<StatsType | typeof FREE_STATS>
//    ): Array<StatsMap> | undefined {
//       const data = compact(
//          Array.from(new Set(compact(statsArray))).map(key => {
//             if (key === FREE_STATS) {
//                return null;
//             }

//             try {
//                return {
//                   ...stats[key],
//                   key,
//                };
//             } catch {
//                return null;
//             }
//          })
//       ).sort(({ key: keyA }, { key: keyB }) => {
//          const indexA = indexOf(STATS_TYPE, keyA);
//          const indexB = indexOf(STATS_TYPE, keyB);

//          if (indexA > indexB) {
//             return 1;
//          } else if (indexA < indexB) {
//             return -1;
//          }
//          return 0;
//       });

//       if (data.length === 0) {
//          return;
//       }

//       return data;
//    }

//    constructor(
//       algorithm: AlgorithmType,
//       primary?: Array<statsTypes>,
//       secondary?: Array<statsTypes>
//    ) {
//       this.algorithm = { ...algorithms[algorithm], key: algorithm };

//       if (primary) {
//          this.primary = this.setStats(primary);
//       }

//       if (secondary) {
//          this.secondary = this.setStats(secondary);
//       }
//    }

//    setPaths(): Array<string> {
//       const { key: algorithmKey } = this.algorithm;
//       const primary = this.primary ?? [freeStats];
//       const secondary = this.secondary ?? [freeStats];

//       return primary
//          .map(({ key: primaryKey }) =>
//             secondary.map(
//                ({ key: secondaryKey }) =>
//                   `${algorithmKey}.${primaryKey}.${secondaryKey}`
//             )
//          )
//          .flat();
//    }

//    private toStateElement({ iconPng, iconWebp, name }: StatsMap) {
//       return (
//          <div className="state-view">
//             <Image className="state-icon" src={iconPng} webp={iconWebp} />
//             <span className="state-title">{name}</span>
//          </div>
//       );
//    }

//    pathsIsEqualAlgorithm(paths: Array<string>) {
//       const set = new Set(paths.map(path => head(/^[a-z|A-Z]+/.exec(path))));
//       return set.has(this.algorithm.key);
//    }

//    getKey() {
//       return this.algorithm.key;
//    }

//    toElement(dollList?: Array<string>, showDay: boolean = false) {
//       const setType = algorithmSetTypes[this.algorithm.setType];
//       let usingDoll: Array<Doll> | null = null;

//       if (dollList) {
//          const dollDatas = toPairs(pick(dolls, dollList)).map(
//             ([, data]) => data
//          );
//          usingDoll = dollDatas.filter(({ algorithms }) =>
//             this.pathsIsEqualAlgorithm(algorithms)
//          );
//       }

//       return (
//          <AlgorithmView>
//             {showDay && (
//                <>
//                   <div className="algorithm-day"></div>
//                   <div className="algorithm-day-title">
//                      {(() => {
//                         switch (this.algorithm.dayObtained) {
//                            case 1:
//                               return '월';
//                            case 2:
//                               return '화';
//                            case 3:
//                               return '수';
//                            case 4:
//                               return '목';
//                            case 5:
//                               return '금';
//                         }
//                      })()}
//                   </div>
//                </>
//             )}
//             <div className="algorithm-main">
//                <Image
//                   className="algorithm-icon"
//                   src={this.algorithm.iconPng}
//                   webp={this.algorithm.iconWebp}
//                />
//                <div className="algorithm-text">{this.algorithm.name}</div>
//                <div className="set-type-main">
//                   <Image
//                      className="set-type-icon"
//                      src={setType.iconPng}
//                      webp={setType.iconWebp}
//                   />
//                   <span className="set-type-title">{setType.name}</span>
//                </div>
//             </div>
//             <div className="state-main">
//                <div className="state-box state-primary">
//                   {(this.primary ?? [freeStats])?.map(
//                      (primary, index, array) => (
//                         <Fragment
//                            key={`${this.algorithm.key}_${index}_primary`}
//                         >
//                            {this.toStateElement(primary)}
//                            {array.length - 1 > index && <Divider />}
//                         </Fragment>
//                      )
//                   )}
//                </div>
//                <div className="state-box state-secondary">
//                   {(this.secondary ?? [freeStats])?.map(
//                      (secondary, index, array) => (
//                         <Fragment
//                            key={`${this.algorithm.key}_${index}_secondary`}
//                         >
//                            {this.toStateElement(secondary)}
//                            {array.length - 1 > index && <Divider />}
//                         </Fragment>
//                      )
//                   )}
//                </div>
//                {usingDoll && (
//                   <AvatarGroup max={5}>
//                      {usingDoll.map(({ iconPng, iconWebp, rarity }, index) => (
//                         <Avatar
//                            key={`${this.algorithm.key}_${index}_avatar`}
//                            sx={{
//                               bgcolor: rarityColors[rarity],
//                            }}
//                         >
//                            <Image src={iconPng} webp={iconWebp} />
//                         </Avatar>
//                      ))}
//                   </AvatarGroup>
//                )}
//             </div>
//          </AlgorithmView>
//       );
//    }

//    getDayObtained(): number {
//       return this.algorithm.dayObtained;
//    }

//    static pathsToAlgorithms(paths: Array<string>): Array<Algorithm> {
//       const splitPaths = paths.map(path => path.split('.'));
//       const algorithms = Array.from(
//          new Set(splitPaths.map(([a]) => a as AlgorithmType))
//       );

//       return compact(
//          algorithms.map(algorithm => {
//             const data = splitPaths.filter(([a]) => a === algorithm);

//             const primary = data.map<statsTypes>(
//                ([, p = FREE_STATS]) => p as statsTypes
//             );
//             const secondary = data.map<statsTypes>(
//                ([, , s = FREE_STATS]) => s as statsTypes
//             );

//             try {
//                return new Algorithm(algorithm, primary, secondary);
//             } catch {
//                return null;
//             }
//          })
//       );
//    }
// }

export const a = '';
