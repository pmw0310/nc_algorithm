import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { DollClass, dolls, DollClasses } from '../data/dolls';
import { toPairs } from 'lodash';
import { isWebpSupported } from 'react-image-webp/dist/utils';

const COLORS = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
   cx,
   cy,
   midAngle,
   innerRadius,
   outerRadius,
   percent,
   name,
}: any) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.625;
   const x = cx + radius * Math.cos(-midAngle * RADIAN);
   const y = cy + radius * Math.sin(-midAngle * RADIAN);
   const { iconPng, iconWebp } = DollClasses[name as DollClass];

   return (
      <>
         <image
            xlinkHref={isWebpSupported() ? iconWebp : iconPng}
            x={x - 8}
            y={y - 16}
            height={16}
            width={16}
         />
         <text
            x={x}
            y={y + 10}
            fontSize={14}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
         >
            {`${(percent * 100).toFixed(0)}%`}
         </text>
      </>
   );
};

interface ClassPieChartProps {
   size: number;
   doll: Array<string>;
}

const ClassPieChart: React.FC<ClassPieChartProps> = ({ size, doll }) => {
   const data = toPairs(
      doll.reduce((acc, cur) => {
         const data = dolls[cur];
         if (!data) {
            return acc;
         }

         acc[data.dollClass] = (acc[data.dollClass] ?? 0) + 1;
         return acc;
      }, {} as Record<DollClass, number>)
   )
      .map(([name, value]) => ({ name, value }))
      .sort(function ({ value: valueA }, { value: valueB }) {
         if (valueA < valueB) {
            return -1;
         }
         if (valueA > valueB) {
            return 1;
         }
         return 0;
      });

   return (
      <PieChart width={size} height={size}>
         <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={size * 0.485}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={false}
            startAngle={90}
            endAngle={450}
         >
            {data.map((entry, index) => (
               <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[data.length - 1 - index]}
               />
            ))}
         </Pie>
      </PieChart>
   );
};

export default ClassPieChart;
