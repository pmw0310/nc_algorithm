import { compact } from 'lodash';

import {
   AlgorithmData,
   algorithms,
   AlgorithmType,
   stats,
   StatsData,
   statsType,
} from './algorithms';

interface AlgorithmMap extends AlgorithmData {
   key: string;
}

interface StatsMap extends StatsData {
   key: string;
}

const FREE_STATS = 'free';
const freeStats: Readonly<StatsMap> = {
   key: FREE_STATS,
   name: '자유',
   iconPng: '',
   iconWebp: '',
} as const;

type statsTypes = statsType | typeof FREE_STATS;

export class Algorithm {
   private algorithm: AlgorithmMap;
   private primary?: Array<StatsMap>;
   private secondary?: Array<StatsMap>;

   private setStats(
      statsArray: Array<statsType | typeof FREE_STATS>
   ): Array<StatsMap> | undefined {
      const data = compact(
         Array.from(new Set(compact(statsArray))).map(key => {
            if (key === FREE_STATS) {
               return null;
            }

            try {
               return {
                  ...stats[key],
                  key,
               };
            } catch {
               return null;
            }
         })
      );

      if (data.length === 0) {
         return;
      }

      return data;
   }

   constructor(
      algorithm: AlgorithmType,
      primary?: Array<statsTypes>,
      secondary?: Array<statsTypes>
   ) {
      this.algorithm = { ...algorithms[algorithm], key: algorithm };

      if (primary) {
         this.primary = this.setStats(primary);
      }

      if (secondary) {
         this.secondary = this.setStats(secondary);
      }
   }

   setPaths(): Array<string> {
      const { key: algorithmKey } = this.algorithm;
      const primary = this.primary ?? [freeStats];
      const secondary = this.secondary ?? [freeStats];

      return primary
         .map(primaryKey =>
            secondary.map(
               secondaryKey => `${algorithmKey}.${primaryKey}.${secondaryKey}`
            )
         )
         .flat();
   }

   static pathsToAlgorithms(paths: Array<string>): Array<Algorithm> {
      const splitPaths = paths.map(path => path.split('.'));
      const algorithms = Array.from(
         new Set(splitPaths.map(([a]) => a as AlgorithmType))
      );

      return compact(
         algorithms.map(algorithm => {
            const data = splitPaths.filter(([a]) => a === algorithm);

            const primary = data.map<statsTypes>(
               ([, p = FREE_STATS]) => p as statsTypes
            );
            const secondary = data.map<statsTypes>(
               ([, , s = FREE_STATS]) => s as statsTypes
            );

            try {
               return new Algorithm(algorithm, primary, secondary);
            } catch {
               return null;
            }
         })
      );
   }
}
