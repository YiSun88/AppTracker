/* eslint-disable react/jsx-props-no-spreading */
import {
  Paper,
  TextField,
  Button,
  Box,
  Snackbar,
  Grid,
  Divider,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';

import { useAppsDispatch } from './AppsContext.jsx';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function AddApplicationForm() {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [dateSubmitted, setDateSubmitted] = useState(null);

  const onCompanyChange = (e) => setCompany(e.target.value);
  const onPositionChange = (e) => setPosition(e.target.value);
  const onLocationChange = (e) => setLocation(e.target.value);

  const dispatch = useAppsDispatch();

  const [alert, setAlert] = useState({
    isOpen: false,
    severity: 'success',
    message: '',
  });

  const closeAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlert({ ...alert, isOpen: false });
  };

  const submit = async () => {
    try {
      const res = await fetch('/apps/add', {
        method: 'POST',
        body: JSON.stringify({
          company,
          position,
          location,
          dateSubmitted,
        }),
        /*
         * Always set the content-type header to let server recognize and parse JSON!
         */
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setAlert({
          isOpen: true,
          severity: 'error',
          message: `${data.err}`,
        });
      } else {
        setAlert({
          isOpen: true,
          severity: 'success',
          message: 'Application added successfully',
        });
        // dispatch (need to get the _id of added application)
        dispatch({
          type: 'add',
          payload: data,
        });

        setCompany('');
        setPosition('');
        setLocation('');
      }
    } catch (err) {
      setAlert({
        isOpen: true,
        severity: 'error',
        message: `${err}`,
      });
    }
  };

  return (
    <Paper sx={{ p: 2, pl: 6, display: 'flex', flexDirection: 'column' }}>
      {/* <Stack spacing={2}> */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            id="outlined-basic"
            label="Company (required)"
            value={company}
            variant="outlined"
            onChange={onCompanyChange}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Job Position (required)"
            value={position}
            variant="outlined"
            onChange={onPositionChange}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Location (required)"
            value={location}
            variant="outlined"
            onChange={onLocationChange}
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>

      <Divider textAlign="left" sx={{ marginTop: 3 }}>
        Status
      </Divider>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <DatePicker
                label="Status"
                value={dateSubmitted}
                onChange={(newValue) => setDateSubmitted(newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider textAlign="left" sx={{ marginTop: 3 }}>
        Milestones
      </Divider>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <DatePicker
                label="Date Submitted"
                value={dateSubmitted}
                onChange={(newValue) => setDateSubmitted(newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DatePicker
                label="Online Assessment"
                value={dateSubmitted}
                onChange={(newValue) => setDateSubmitted(newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DatePicker
            label="1st Interview"
            value={dateSubmitted}
            onChange={(newValue) => setDateSubmitted(newValue)}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DatePicker
            label="2nd Interview"
            value={dateSubmitted}
            onChange={(newValue) => setDateSubmitted(newValue)}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DatePicker
            label="3nd Interview"
            value={dateSubmitted}
            onChange={(newValue) => setDateSubmitted(newValue)}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DatePicker
            label="Offer Received"
            value={dateSubmitted}
            onChange={(newValue) => setDateSubmitted(newValue)}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DatePicker
            label="Rejected"
            value={dateSubmitted}
            onChange={(newValue) => setDateSubmitted(newValue)}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="center">
            <Button
              onClick={submit}
              variant="contained"
              color="success"
              sx={{ width: '30%' }}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
      {/* </Stack> */}
      <Snackbar
        open={alert.isOpen}
        autoHideDuration={5000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={closeAlert}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
