// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import MUILink from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Paper,
  styled,
  useTheme,
  Button,
  Grid,
  TextField,
} from '@mui/material';
import { format } from 'date-fns';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Link } from 'react-router-dom';

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
  // const preventDefault = useCallback((event) => {
  //   event.preventDefault();
  // }, []);

  /*
   * To-Do: implement the real-time search with useState and useEffect(both searchQueries and apps should be dependencies).
   * May optimize the algo with skipping searchQueries === ''.
   */

  const theme = useTheme();
  const apps = useApps();

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [filteredApps, setFilteredApps] = useState([]);

  const onCompanyChange = (e) => setCompany(e.target.value);
  const onPositionChange = (e) => setPosition(e.target.value);
  const onLocationChange = (e) => setLocation(e.target.value);
  const onStatusChange = (e) => setStatus(e.target.value);

  useEffect(() => {
    setFilteredApps(
      apps.filter(
        (app) =>
          app.company.toLowerCase().includes(company.toLowerCase()) &&
          app.position.toLowerCase().includes(position.toLowerCase()) &&
          app.location.toLowerCase().includes(location.toLowerCase()) &&
          app.status.toLowerCase().includes(status.toLowerCase())
      )
    );
  }, [apps, company, position, location, status]);

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80vh',
      }}
    >
      <Title>Applications Search</Title>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            label="Company"
            value={company}
            variant="outlined"
            onChange={onCompanyChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            label="Job Position"
            value={position}
            variant="outlined"
            onChange={onPositionChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            label="Location"
            value={location}
            variant="outlined"
            onChange={onLocationChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            label="Status"
            value={status}
            variant="outlined"
            onChange={onStatusChange}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
      <TableContainer>
        <Table size="medium" stickyHeader>
          <TableHead>
            <TableRow>
              <TableHeadCell theme={theme}>Company</TableHeadCell>
              <TableHeadCell theme={theme}>Position</TableHeadCell>
              <TableHeadCell theme={theme}>Location</TableHeadCell>
              <TableHeadCell theme={theme}>Status</TableHeadCell>
              <TableHeadCell theme={theme}>Submitted On</TableHeadCell>
              <TableHeadCell align="center" theme={theme}>
                Actions
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApps.map((app) => (
              <TableRow key={app._id}>
                <TableCell>{app.company}</TableCell>
                <TableCell>{app.position}</TableCell>
                <TableCell>{app.location}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>
                  {app.dateSubmitted
                    ? format(app.dateSubmitted, 'MM/dd/yyyy')
                    : ''}
                </TableCell>
                <TableCell align="center">
                  <Button
                    sx={{ minWidth: '24px', p: 0, m: 0 }}
                    color="warning"
                    component={Link}
                    to={`/user/applications/edit/${app._id}`}
                  >
                    <ModeEditOutlineOutlinedIcon />
                  </Button>
                  <Button
                    sx={{ minWidth: '24px', p: 0, m: 0 }}
                    color="error"
                    component={Link}
                    to={`/user/applications/edit/${app._id}`}
                  >
                    <DeleteForeverOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <MUILink color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more applications
      </MUILink> */}
    </Paper>
  );
}
