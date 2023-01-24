import React from 'react';
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   // CartesianGrid,
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
import { styled } from '@mui/material/styles';
import ClassPieChart from './classPieChart';
import { isWebpSupported } from 'react-image-webp/dist/utils';
import { DollAvatarGroup } from './dollAvatar';

const BarChartStyled = styled(BarChart)(() => ({
   '.custom-tooltip': {
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 8,
      '.label': {
         color: '#fff',
         fontSize: 14,
      },
      '.title': {
         fontWeight: 'bold',
      },
      '.doll-avatar-group': {
         paddingBottom: 6,
      },
   },
}));

const statistics = algorithmUsageStatistics();
const data = toPairs(statistics).map(([key, data]) => ({
   name: key,
   value: data.usage.length,
}));

const max = Object.keys(dolls).length;

const AlgorithmStatisticsChart: React.FC = () => {
   const renderCustomAxisTick = ({
      x,
      y,
      payload,
   }: {
      x: number;
      y: number;
      payload: { value: string };
   }) => {
      const { iconWebp, iconPng, name } =
         algorithms[payload.value as AlgorithmType];

      return (
         <>
            <image
               xlinkHref={isWebpSupported() ? iconWebp : iconPng}
               x={x - 100 - 5}
               y={y - 10}
               height="20px"
               width="20px"
            />
            <text
               x={x - 100 + 20 + 5}
               y={y + 4.5}
               fontSize={14}
               height={14}
               width={70}
               fontWeight={800}
               fill="#ffffff"
               stroke="#000000"
               strokeWidth={0.3}
               strokeLinecap="butt"
               strokeLinejoin="miter"
            >
               {name}
            </text>
         </>
      );
   };

   const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
         const algorithmData = algorithms[label as AlgorithmType];
         const statisticsData = statistics[label as AlgorithmType];
         const rate = statisticsData.rate * 100;
         const value = payload[0].value;

         return (
            <div className="custom-tooltip">
               <div className="label title">{algorithmData.name}</div>
               <div className="label">
                  {value > 0
                     ? `${value}명 사용 (${rate.toFixed(1)}%)`
                     : '사용되지 않음'}
               </div>
               {rate > 0 && (
                  <>
                     <DollAvatarGroup
                        doll={statisticsData.usage}
                        max={10}
                        className="doll-avatar-group"
                     />
                     <ClassPieChart
                        size={150}
                        doll={statistics[label as AlgorithmType].usage}
                     />
                  </>
               )}
            </div>
         );
      }

      return null;
   };

   return (
      <ResponsiveContainer width="100%" height={data.length * 36}>
         <BarChartStyled
            width={300}
            height={800}
            data={data}
            margin={{
               top: 5,
               right: 10,
               left: 20,
               bottom: 5,
            }}
            barSize={20}
            barCategoryGap={30}
            barGap={5}
            layout="vertical"
         >
            <XAxis type="number" domain={[0, max]} hide />
            <YAxis
               type="category"
               dataKey="name"
               width={100}
               tick={renderCustomAxisTick}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Bar dataKey="value" fill="#ed752f" />
         </BarChartStyled>
      </ResponsiveContainer>
   );
};

export default AlgorithmStatisticsChart;
