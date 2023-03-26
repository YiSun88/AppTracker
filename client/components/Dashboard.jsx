import React, { useEffect, useState } from 'react';
import { Grid, Paper, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';

import Title from './Title.jsx';

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
    <>
      {/* To-Do: Abstract the Grid item below to one template. Make the code DRY. */}

      {/* Status Dashboard Row */}
      <Divider
        textAlign="left"
        sx={{
          marginTop: 3,
          marginBottom: 1,
          color: 'primary.main',
          fontSize: '1.2rem',
        }}
      >
        Status
      </Divider>

      <Grid container spacing={3}>
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

        {/* Interviews Received */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Title>Interviews Scheduled</Title>
            <Typography color="text.secondary" marginBottom="10px">
              To attend
            </Typography>
            <Typography color="orange" component="p" variant="h4">
              {counts ? counts.interviewCount : ' '}
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
              {counts ? counts.offerCount : ' '}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Locations Dashboard Row */}
      <Divider
        textAlign="left"
        sx={{
          marginTop: 3,
          marginBottom: 1,
          color: 'primary.main',
          fontSize: '1.2rem',
        }}
      >
        Locations
      </Divider>

      <Grid container spacing={3}>
        {/* 100% Remote Jobs */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Title>100% Remote Jobs</Title>
            <Typography component="p" variant="h4">
              {counts ? counts.remoteCount : ' '}
            </Typography>
          </Paper>
        </Grid>

        {/* Houston Jobs */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Title>Houston Jobs</Title>
            <Typography component="p" variant="h4">
              {counts ? counts.houstonCount : ' '}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Bar Chart Insert Example */}
      {/* <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <BarChart />
        </Paper>
      </Grid> */}
    </>
  );
}
