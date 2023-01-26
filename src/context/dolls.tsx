import React, {
   createContext,
   useState,
   useCallback,
   useMemo,
   useEffect,
} from 'react';
import { dolls as dollData, Doll } from '../data/dolls';
import randomstring from 'randomstring';
import { isNil, pick, fromPairs, forOwn, mapValues, merge } from 'lodash';
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
} from '../data/algorithms';

interface DollsContextProps {
   dolls: Record<string, Doll>;
   addDoll: (doll: Doll) => void;
   removeDoll: (doll: string) => void;
   algorithmUsageStatistics: (
      doll?: Array<string>
   ) => AlgorithmSetStatisticalData;
}

const DollsContext = createContext<DollsContextProps>({
   dolls: {},
   addDoll: () => {},
   removeDoll: () => {},
   algorithmUsageStatistics: () => ({} as any),
});

interface Props {
   children: React.ReactNode;
}

const DollsProvider: React.FC<Props> = ({ children }) => {
   const [customDolls, setCustomDolls] = useState<Record<string, Doll>>(
      (() => {
         const data = localStorage.getItem('dolls');
         if (isNil(data)) {
            return {};
         }
         return JSON.parse(data);
      })()
   );

   const dolls = useMemo<Record<string, Doll>>(() => {
      return merge(dollData, customDolls);

      // const nullKeys = toPairs(customDolls)
      //    .filter(([, value]) => isNil(value))
      //    .map(([key]) => key);

      // return omit(
      //    {
      //       ...dollData,
      //       ...customDolls,
      //    },
      //    nullKeys
      // ) as Record<string, Doll>;
   }, [customDolls]);

   const addDoll = useCallback(
      (doll: Doll) => {
         const key = randomstring.generate(12);

         if (customDolls[key]) {
            addDoll(doll);
            return;
         }

         setCustomDolls(dolls => ({ ...dolls, [key]: doll }));
      },
      [customDolls, setCustomDolls]
   );

   const removeDoll = useCallback(
      (doll: string) => {
         setCustomDolls(dolls => {
            const data = { ...dolls };
            delete data[doll];
            return data;
         });
      },
      [setCustomDolls]
   );

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
                                 rate: 0,
                              },
                           ])
                        ),
                        secondary: fromPairs(
                           OFFENSE_SECONDARY_STATS_TYPE.map(type => [
                              type,
                              {
                                 usage: [],
                                 rate: 0,
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
                                 rate: 0,
                              },
                           ])
                        ),
                        secondary: fromPairs(
                           STABILITY_SECONDARY_STATS_TYPE.map(type => [
                              type,
                              {
                                 usage: [],
                                 rate: 0,
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
                                 rate: 0,
                              },
                           ])
                        ),
                        secondary: fromPairs(
                           SPECIAL_SECONDARY_STATS_TYPE.map(type => [
                              type,
                              {
                                 usage: [],
                                 rate: 0,
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
                     rate: 0,
                     ...initStatus,
                  },
               ];
            })
         ) as AlgorithmSetStatisticalData;

         forOwn(dollData, ({ algorithms }, doll) => {
            algorithms.forEach(([algorithm, primary, secondary]) => {
               data[algorithm].usage.push(doll);

               primary.forEach(primaryKey => {
                  data[algorithm].primary[primaryKey].usage.push(doll);
               });

               secondary.forEach(secondaryKey => {
                  data[algorithm].secondary[secondaryKey].usage.push(doll);
               });
            });
         });

         const dollsLength = Object.keys(dollData).length;

         return mapValues(data, ({ usage, primary, secondary }) => {
            const usageLength = usage.length;
            const rate = usageLength / dollsLength;

            return {
               usage,
               rate,
               primary: mapValues(
                  primary,
                  ({ usage }) =>
                     ({
                        usage,
                        rate: usage.length / usageLength,
                     } as StatisticalData)
               ),
               secondary: mapValues(
                  secondary,
                  ({ usage }) =>
                     ({
                        usage,
                        rate: usage.length / usageLength,
                     } as StatisticalData)
               ),
            };
         }) as AlgorithmSetStatisticalData;
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
            removeDoll,
            algorithmUsageStatistics,
         }}
      >
         {children}
      </DollsContext.Provider>
   );
};

export { DollsContext, DollsProvider };
