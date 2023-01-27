import React, { useMemo, useContext } from 'react';
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
} from 'recharts';
import { AlgorithmType, stats, StatsType } from '../data/algorithms';
import { toPairs } from 'lodash';
import { styled } from '@mui/material/styles';
import ClassPieChart from './classPieChart';
import { isWebpSupported } from 'react-image-webp/dist/utils';
import { DollAvatarGroup } from './dollAvatar';
import { DollsContext } from '../context/dolls';

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

interface StatStatisticsChartProps {
   algorithmType: AlgorithmType;
}

const StatStatisticsChart: React.FC<StatStatisticsChartProps> = ({
   algorithmType,
}) => {
   const { algorithmUsageStatistics } = useContext(DollsContext);

   const statistics = useMemo(
      () => algorithmUsageStatistics(),
      [algorithmUsageStatistics]
   );

   const primaryData = toPairs(statistics[algorithmType].primary).map(
      ([key, data]) => ({
         name: key,
         value: data.usage.length,
      })
   );
   const secondaryData = toPairs(statistics[algorithmType].secondary).map(
      ([key, data]) => ({
         name: key,
         value: data.usage.length,
      })
   );

   const max = statistics[algorithmType].usage.length;

   const renderCustomAxisTick = ({
      x,
      y,
      payload,
   }: {
      x: number;
      y: number;
      payload: { value: string };
   }) => {
      const { iconWebp, iconPng, name } = stats[payload.value as StatsType];

      return (
         <>
            <image
               xlinkHref={isWebpSupported() ? iconWebp : iconPng}
               x={x - 100 - 5 - 20}
               y={y - 10}
               height="20px"
               width="20px"
            />
            <text
               x={x - 100 + 5}
               y={y + 4.5}
               fontSize={14}
               height={14}
               width={90}
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

   const CustomTooltip = ({ active, payload, label, type }: any) => {
      if (active && payload && payload.length) {
         const statsData = stats[label as StatsType];
         const statisticsData =
            statistics[algorithmType][type as 'primary' | 'secondary'][
               label as StatsType
            ];
         const rate = (statisticsData.usage.length / max) * 100;
         const value = payload[0].value;

         return (
            <div className="custom-tooltip">
               <div className="label title">{statsData.name}</div>
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
                     <ClassPieChart size={150} doll={statisticsData.usage} />
                  </>
               )}
            </div>
         );
      }

      return null;
   };

   return (
      <>
         <div
            style={{
               fontWeight: 'bold',
               fontSize: 20,
               color: '#ed752f',
               padding: '2px 16px',
            }}
         >
            주옵션
         </div>
         <ResponsiveContainer width="100%" height={primaryData.length * 36}>
            <BarChartStyled
               width={300}
               height={800}
               data={primaryData}
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
                  width={120}
                  tick={renderCustomAxisTick}
               />
               <Tooltip content={<CustomTooltip type="primary" />} />
               <Bar dataKey="value" fill="#ed752f" />
            </BarChartStyled>
         </ResponsiveContainer>
         <div
            style={{
               fontWeight: 'bold',
               fontSize: 20,
               color: '#ed752f',
               padding: '2px 16px',
            }}
         >
            부옵션
         </div>
         <ResponsiveContainer width="100%" height={secondaryData.length * 36}>
            <BarChartStyled
               width={300}
               height={800}
               data={secondaryData}
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
                  width={120}
                  tick={renderCustomAxisTick}
               />
               <Tooltip content={<CustomTooltip type="secondary" />} />
               <Bar dataKey="value" fill="#ed752f" />
            </BarChartStyled>
         </ResponsiveContainer>
      </>
   );
};

export default React.memo(StatStatisticsChart);
