import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

import Title from './Title.jsx';

export default function DashboardCard({ icon, title, date, count }) {
  return (
    <Grid item xs={12} md={4} lg={4}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 200,
        }}
      >
        <Grid container spacing={1} sx={{ marginTop: 1 }}>
          <Grid item xs={3}>
            {icon}
          </Grid>
          <Grid item xs={9}>
            <Title>{title}</Title>
            <Typography color="text.secondary" marginBottom="10px">
              {date}
            </Typography>
            <Typography
              component="p"
              variant="h3"
              sx={{ fontWeight: 'bold', paddingLeft: '16px' }}
            >
              {count}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
