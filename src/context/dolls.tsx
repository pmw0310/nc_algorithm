import React, {
   createContext,
   useState,
   useCallback,
   useMemo,
   useEffect,
} from 'react';
import { dolls as dollData, Doll, DollClasses } from '../data/dolls';
import randomstring from 'randomstring';
import {
   isNil,
   pick,
   fromPairs,
   forOwn,
   merge,
   cloneDeep,
   toPairs,
   omit,
   isObject,
   isNull,
   isString,
   has,
   isArray,
} from 'lodash';
import {
   algorithms,
   AlgorithmSetStatisticalData,
   AlgorithmType,
   ALGORITHM_TYPE,
   OFFENSE_PRIMARY_STATS_TYPE,
   OFFENSE_SECONDARY_STATS_TYPE,
   SPECIAL_PRIMARY_STATS_TYPE,
   SPECIAL_SECONDARY_STATS_TYPE,
   STABILITY_PRIMARY_STATS_TYPE,
   STABILITY_SECONDARY_STATS_TYPE,
   StatisticalData,
   stats,
   StatsType,
   AlgorithmSet,
} from '../data/algorithms';

interface DollsContextProps {
   dolls: Record<string, Doll>;
   addDoll: (doll: Doll) => string;
   editDoll: (doll: string, data: Partial<Doll>) => void;
   removeDoll: (doll: string) => void;
   setCustom: (data: Record<string, Partial<Doll> | undefined | null>) => void;
   algorithmUsageStatistics: (
      doll?: Array<string>
   ) => AlgorithmSetStatisticalData;
}

const DollsContext = createContext<DollsContextProps>({
   dolls: {},
   addDoll: () => '',
   editDoll: () => {},
   removeDoll: () => {},
   setCustom: () => {},
   algorithmUsageStatistics: () => ({} as any),
});

export const initDollData = (json: string | null | undefined) => {
   if (!json) {
      return {};
   }

   try {
      const data = JSON.parse(json);

      if (!isObject(data)) {
         throw new TypeError('not data');
      }

      const dollData: Record<string, Partial<Doll> | null> = {};

      forOwn(data, (value, key) => {
         if (isObject(value)) {
            const doll = value as Record<string, any>;
            const data: Partial<Doll> = {};

            if (isString(doll.name)) {
               data.name = doll.name;
            }
            if (
               doll.rarity === 0 ||
               doll.rarity === 1 ||
               doll.rarity === 2 ||
               doll.rarity === 3
            ) {
               data.rarity = doll.rarity;
            }
            if (isString(doll.iconPng)) {
               data.iconPng = doll.iconPng;
            }
            if (isString(doll.iconWebp)) {
               data.iconWebp = doll.iconWebp;
            }
            if (has(DollClasses, doll.dollClass)) {
               data.dollClass = doll.dollClass;
            }
            if (isArray(doll.algorithms)) {
               const algo = doll.algorithms.filter(
                  set =>
                     isArray(set) &&
                     set.length === 3 &&
                     isArray(set[1]) &&
                     isArray(set[2]) &&
                     has(algorithms, set[0])
               );

               const algoData = algo.map(([algorithm, p, s]) => {
                  const primary = p.filter((st: Array<string>) =>
                     has(stats, st)
                  ) as Array<StatsType>;
                  const secondary = s.filter((st: Array<string>) =>
                     has(stats, st)
                  ) as Array<StatsType>;

                  return [algorithm, primary, secondary] as AlgorithmSet;
               });

               data.algorithms = algoData;
            }
            if (isObject(doll.sideIcon)) {
               const side: any = {};
               if (isString(doll.iconPng)) {
                  side.iconPng = doll.iconPng;
               }
               if (isString(doll.iconWebp)) {
                  side.iconWebp = doll.iconWebp;
               }
               data.sideIcon = side;
            }
            dollData[key] = data;
         } else if (isNull(value)) {
            dollData[key] = null;
         }
      });

      return dollData;
   } catch (e) {
      console.error(e);
      return {};
   }
};

interface Props {
   children: React.ReactNode;
}

const DollsProvider: React.FC<Props> = ({ children }) => {
   const [customDolls, setCustomDolls] = useState<
      Record<string, Partial<Doll> | undefined | null>
   >(
      (() => {
         const json = localStorage.getItem('customDolls');
         return initDollData(json);
      })()
   );

   const dolls = useMemo<Record<string, Doll>>(() => {
      const nullKeys = toPairs(customDolls)
         .filter(([, value]) => isNil(value))
         .map(([key]) => key);

      const data = omit(cloneDeep(dollData), nullKeys) as Record<string, Doll>;
      const custom = omit(cloneDeep(customDolls), nullKeys) as Record<
         string,
         Doll
      >;

      return merge(data, custom);
   }, [customDolls]);

   const addDoll = useCallback(
      (doll: Doll): string => {
         const key = randomstring.generate(12);

         if (customDolls[key]) {
            return addDoll(doll);
         }

         setCustomDolls(dolls => ({ ...dolls, [key]: doll }));
         return key;
      },
      [customDolls]
   );

   const editDoll = useCallback((doll: string, data: Partial<Doll>) => {
      setCustomDolls(dolls => ({
         ...dolls,
         [doll]: {
            ...(dolls?.[doll] ?? {}),
            ...data,
         },
      }));
   }, []);

   const removeDoll = useCallback((doll: string) => {
      setCustomDolls(dolls => {
         return { ...dolls, [doll]: dollData[doll] ? null : undefined };
      });
   }, []);

   const algorithmUsageStatistics = useCallback(
      (doll?: Array<string>) => {
         const dollData = doll ? pick(dolls, doll) : dolls;
         const data = fromPairs(
            ALGORITHM_TYPE.map((type: AlgorithmType) => {
               const setType = algorithms[type].setType;
               let initStatus: {
                  primary: Record<string, StatisticalData>;
                  secondary: Record<string, StatisticalData>;
               };

               switch (setType) {
                  case 'offense':
                     initStatus = {
                        primary: fromPairs(
                           OFFENSE_PRIMARY_STATS_TYPE.map(type => [
                              type,
                              {
                                 usage: [],
                                 // rate: 0,
                              },
                           ])
                        ),
                        secondary: fromPairs(
                           OFFENSE_SECONDARY_STATS_TYPE.map(type => [
                              type,
                              {
                                 usage: [],
                                 // rate: 0,
                              },
                           ])
                        ),
                     };
                     break;
                  case 'stability':
                     initStatus = {
                        primary: fromPairs(
                           STABILITY_PRIMARY_STATS_TYPE.map(type => [
                              type,
                              {
                                 usage: [],
                                 // rate: 0,
                              },
                           ])
                        ),
                        secondary: fromPairs(
                           STABILITY_SECONDARY_STATS_TYPE.map(type => [
                              type,
                              {
                                 usage: [],
                                 // rate: 0,
                              },
                           ])
                        ),
                     };
                     break;
                  case 'special':
                     initStatus = {
                        primary: fromPairs(
                           SPECIAL_PRIMARY_STATS_TYPE.map(type => [
                              type,
                              {
                                 usage: [],
                                 // rate: 0,
                              },
                           ])
                        ),
                        secondary: fromPairs(
                           SPECIAL_SECONDARY_STATS_TYPE.map(type => [
                              type,
                              {
                                 usage: [],
                                 // rate: 0,
                              },
                           ])
                        ),
                     };
                     break;
                  default:
                     throw new TypeError();
               }

               return [
                  type,
                  {
                     usage: [] as Array<string>,
                     // rate: 0,
                     ...initStatus,
                  },
               ];
            })
         ) as AlgorithmSetStatisticalData;

         forOwn(dollData, ({ algorithms }, doll) => {
            algorithms.forEach(([algorithm, primary, secondary]) => {
               try {
                  data[algorithm].usage.push(doll);
               } catch (e) {
                  console.error(algorithm, e);
               }

               primary.forEach(primaryKey => {
                  try {
                     data[algorithm].primary[primaryKey].usage.push(doll);
                  } catch (e) {
                     console.error(primaryKey, e);
                  }
               });

               secondary.forEach(secondaryKey => {
                  try {
                     data[algorithm].secondary[secondaryKey].usage.push(doll);
                  } catch (e) {
                     console.error(secondaryKey, e);
                  }
               });
            });
         });

         return data;

         // const dollsLength = Object.keys(dollData).length;

         // return mapValues(data, ({ usage, primary, secondary }) => {
         //    const usageLength = usage.length;
         //    const rate = usageLength / dollsLength;

         //    return {
         //       usage,
         //       rate,
         //       primary: mapValues(
         //          primary,
         //          ({ usage }) =>
         //             ({
         //                usage,
         //                rate: usage.length / usageLength,
         //             } as StatisticalData)
         //       ),
         //       secondary: mapValues(
         //          secondary,
         //          ({ usage }) =>
         //             ({
         //                usage,
         //                rate: usage.length / usageLength,
         //             } as StatisticalData)
         //       ),
         //    };
         // }) as AlgorithmSetStatisticalData;
      },
      [dolls]
   );

   useEffect(() => {
      localStorage.setItem('customDolls', JSON.stringify(customDolls));
   }, [customDolls]);

   return (
      <DollsContext.Provider
         value={{
            dolls,
            addDoll,
            editDoll,
            removeDoll,
            algorithmUsageStatistics,
            setCustom: setCustomDolls,
         }}
      >
         {children}
      </DollsContext.Provider>
   );
};

export { DollsContext, DollsProvider };
