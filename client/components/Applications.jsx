// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, Paper, styled, useTheme } from '@mui/material';
import Title from './Title.jsx';

import { useApps } from './appsFeature/AppsContext.jsx';

/*
 *  Using tenary to show loading or fetched data:
 */

/*
return (
  <div>
    {data ? (
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    ) : (
      <p>Loading data...</p>
    )}
  </div>
);
*/

const TableHeadCell = styled(TableCell)(({ theme }) => ({
  fontSize: '1.1rem',
  color: theme.palette.primary.main,
}));

export default function Applications() {
  const preventDefault = useCallback((event) => {
    event.preventDefault();
  }, []);

  const theme = useTheme();
  const apps = useApps().slice(0).reverse();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Applications</Title>
          <Table size="medium" stickyHeader>
            <TableHead>
              <TableRow>
                <TableHeadCell theme={theme}>Company</TableHeadCell>
                <TableHeadCell theme={theme}>Position</TableHeadCell>
                <TableHeadCell theme={theme}>Location</TableHeadCell>
                <TableHeadCell theme={theme}>Status</TableHeadCell>
                <TableHeadCell align="center" theme={theme}>
                  Note
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apps.map((app) => (
                // eslint-disable-next-line no-underscore-dangle
                <TableRow key={app._id}>
                  <TableCell>{app.company}</TableCell>
                  <TableCell>{app.position}</TableCell>
                  <TableCell>{app.location}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell align="center">{app.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link
            color="primary"
            href="#"
            onClick={preventDefault}
            sx={{ mt: 3 }}
          >
            See more applications
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}
