/* eslint-disable react/jsx-props-no-spreading */
import { Stack, Paper, TextField, Button, Box, Snackbar } from '@mui/material';
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
  const [dateSubmitted, setDateSubmitted] = useState(new Date());

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
      if (!res.ok) {
        const data = await res.json();
        setAlert({
          isOpen: true,
          severity: 'error',
          message: 'Error. Please fill all required fields',
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
          payload: { company, position, location, dateSubmitted },
        });

        setCompany('');
        setPosition('');
        setLocation('');
      }
    } catch {
      console.log();
    }
  };

  return (
    <Paper sx={{ p: 2, pl: 6, display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="Company (required)"
          value={company}
          variant="outlined"
          onChange={onCompanyChange}
        />
        <TextField
          id="outlined-basic"
          label="Job Position (required)"
          value={position}
          variant="outlined"
          onChange={onPositionChange}
        />
        <TextField
          id="outlined-basic"
          label="Location (required)"
          value={location}
          variant="outlined"
          onChange={onLocationChange}
        />
        <DatePicker
          label="Date Submitted"
          value={dateSubmitted}
          onChange={(newValue) => setDateSubmitted(newValue)}
        />
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
      </Stack>
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
