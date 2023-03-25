import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';

import Title from './Title.jsx';
import { Chart, StatusChart } from './Chart.jsx';

// function preventDefault(event) {
//   event.preventDefault();
// }

export default function Dashboard() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    const fetchAnApp = async () => {
      try {
        const fetchedCounts = await (
          await fetch(`/apps/counts`, { method: 'GET' })
        ).json();
        setCounts(fetchedCounts);
      } catch (err) {
        console.log('Error when fetching counts from Backend.');
      }
    };
    fetchAnApp();
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      {/* <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid> */}

      {/* Submitted So Far */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Title>Applications Submitted</Title>
          <Typography color="text.secondary" marginBottom="10px">
            {`till today ${format(new Date(), 'MM/dd/yyyy')}`}
          </Typography>
          <Typography component="p" variant="h4">
            {counts ? counts.submittedCount : ' '}
          </Typography>
        </Paper>
      </Grid>

      {/* Offers Received */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Title>Offers Received</Title>
          <Typography color="text.secondary" marginBottom="10px">
            till today
          </Typography>
          <Typography color="green" component="p" variant="h4">
            {counts ? counts.submittedCount : ' '}
          </Typography>
        </Paper>
      </Grid>

      {/* Bar Chart for Application Status */}
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <StatusChart />
        </Paper>
      </Grid>
    </Grid>
  );
}
