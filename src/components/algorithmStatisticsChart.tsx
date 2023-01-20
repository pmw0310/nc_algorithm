import React from 'react';
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
} from 'recharts';
import {
   algorithmUsageStatistics,
   algorithms,
   AlgorithmType,
} from '../data/algorithms';
import { dolls } from '../data/dolls';
import { toPairs } from 'lodash';

const data = toPairs(algorithmUsageStatistics()).map(([key, data]) => ({
   name: algorithms[key as AlgorithmType].name,
   pv: data.usage.length,
}));

const max = Object.keys(dolls).length;

const AlgorithmStatisticsChart: React.FC = () => {
   // const [tabIndex, setTabIndex] = React.useState(0);

   // const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
   //    setTabIndex(newIndex);
   // };

   return (
      <ResponsiveContainer width="100%" height={data.length * 36}>
         <BarChart
            width={300}
            height={800}
            data={data}
            margin={{
               top: 5,
               right: 30,
               left: 20,
               bottom: 5,
            }}
            barSize={20}
            barCategoryGap={30}
            barGap={5}
            layout="vertical"
         >
            <XAxis type="number" domain={[0, max]} hide />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Bar dataKey="pv" fill="#8884d8" />
         </BarChart>
      </ResponsiveContainer>
   );
};

export default AlgorithmStatisticsChart;
