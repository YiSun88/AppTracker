import React, { useState } from 'react';
import { useTheme, Grid, Paper } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  BarChart,
  Tooltip,
  Bar,
  CartesianGrid,
} from 'recharts';
import { format, subDays, differenceInCalendarDays } from 'date-fns';

import Title from './Title.jsx';
import { useApps } from './appsFeature/AppsContext.jsx';

export default function BarChartByWeek() {
  const theme = useTheme();
  const apps = useApps();
  const today = new Date();

  const calcWeekBoundary = (index) =>
    `${format(subDays(today, 7 * index), 'M/d')}`;
  const xAxisRange = 12;

  const data = Array.from({ length: xAxisRange }, (el, i) => ({
    week: `${calcWeekBoundary(xAxisRange - i)} 
          - ${calcWeekBoundary(xAxisRange - i - 1)}`,
    amount: 0,
  }));

  apps.forEach((app) => {
    if (app.dateSubmitted) {
      const index = Math.floor(
        differenceInCalendarDays(today, new Date(app.dateSubmitted)) / 7
      );

      if (index < data.length && index >= 0) {
        data[data.length - 1 - index].amount += 1;
      }
    }
  });

  // Fetch count from Backend in useEffect hook, not finished, used useContext hook instead
  // useEffect(() => {
  //   const fetchCountByMonth = async () => {
  //     try {
  //       const fetchedGroup = await (
  //         await fetch('/apps/counts/months', { method: 'GET' })
  //       ).json();

  //       const count = Array.from({ length: 6 });

  //       fetchedGroup.forEach((group) => {});
  //     } catch (err) {
  //       console.log('Error when fetching the count by month from Backend.');
  //     }
  //   };
  //   fetchCountByMonth();
  // }, []);

  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '60vh',
        }}
      >
        <Title>Applications Submitted per Week</Title>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 2,
              left: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
            <XAxis dataKey="week" interval="preserveStartEnd" />
            <YAxis
              type="number"
              domain={[0, 'dataMax + 1']}
              allowDecimals={false}
            />
            <Tooltip />
            <Bar dataKey="amount" fill={theme.palette.primary.main} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  );
}

/*
 * Line Chart Example
 */

// export function LinesChart() {
//   const theme = useTheme();

//   // Generate Example Data
//   function createData(time, amount) {
//     return { time, amount };
//   }

//   const data = [
//     createData('00:00', 0),
//     createData('03:00', 300),
//     createData('06:00', 600),
//     createData('09:00', 800),
//     createData('12:00', 1500),
//     createData('15:00', 2000),
//     createData('18:00', 2400),
//     createData('21:00', 2400),
//     createData('24:00', undefined),
//   ];

//   return (
//     <>
//       <Title>Today</Title>
//       <ResponsiveContainer>
//         <LineChart
//           data={data}
//           margin={{
//             top: 16,
//             right: 16,
//             bottom: 0,
//             left: 24,
//           }}
//         >
//           <XAxis
//             dataKey="week"
//             stroke={theme.palette.text.secondary}
//             style={theme.typography.body2}
//           />
//           <YAxis
//             stroke={theme.palette.text.secondary}
//             style={theme.typography.body2}
//           >
//             <Label
//               angle={270}
//               position="left"
//               style={{
//                 textAnchor: 'middle',
//                 fill: theme.palette.text.primary,
//                 ...theme.typography.body1,
//               }}
//             >
//               Sales ($)
//             </Label>
//           </YAxis>
//           <Line
//             isAnimationActive={false}
//             type="monotone"
//             dataKey="amount"
//             stroke={theme.palette.primary.main}
//             dot={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </>
//   );
// }
