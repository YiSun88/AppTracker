import React, { useEffect, useState } from 'react';
import { Grid, Divider } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { format } from 'date-fns';
import CabinIcon from '@mui/icons-material/Cabin';

import DashboardCard from './DashboardCard.jsx';
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

        <DashboardCard
          icon={<BeenhereIcon color="secondary" sx={{ fontSize: 60 }} />}
          title="Applications Submitted"
          date={`till today ${format(new Date(), 'MM/dd/yyyy')}`}
          count={counts ? counts.submittedCount : ' '}
        />

        {/* Interviews Received */}
        <DashboardCard
          icon={<DateRangeIcon color="warning" sx={{ fontSize: 60 }} />}
          title="Interviews Scheduled"
          date="To attend"
          count={counts ? counts.interviewCount : ' '}
        />

        {/* Offers Received */}
        <DashboardCard
          icon={<ThumbUpAltIcon color="success" sx={{ fontSize: 60 }} />}
          title="Offers Received"
          date="till today"
          count={counts ? counts.offerCount : ' '}
        />
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
        <DashboardCard
          icon={
            <ConnectWithoutContactIcon color="action" sx={{ fontSize: 60 }} />
          }
          title="100% Remote Jobs"
          date=""
          count={counts ? counts.remoteCount : ' '}
        />

        {/* Houston Jobs */}
        <DashboardCard
          icon={<CabinIcon color="info" sx={{ fontSize: 60 }} />}
          title="Houston Jobs"
          date=""
          count={counts ? counts.houstonCount : ' '}
        />
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
