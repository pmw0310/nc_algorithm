import React from 'react';
import {
   algorithmUsageStatistics,
   algorithms,
   AlgorithmType,
} from '../data/algorithms';
import { dolls } from '../data/dolls';
import { toPairs } from 'lodash';
import AlgorithmStatisticsChart from './algorithmStatisticsChart';

const UsageStatisticsView: React.FC = () => {
   // const [tabIndex, setTabIndex] = React.useState(0);

   // const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
   //    setTabIndex(newIndex);
   // };

   return (
      <>
         <AlgorithmStatisticsChart />
      </>
   );
};

export default UsageStatisticsView;
