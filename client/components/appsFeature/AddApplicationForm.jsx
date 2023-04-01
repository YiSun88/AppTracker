/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Paper,
  TextField,
  Button,
  Box,
  Snackbar,
  Grid,
  Divider,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';

import { useAppsDispatch } from './AppsContext.jsx';
import Timeline from './Timeline.jsx';
import createHistoryArray, {
  createTimelineArray,
} from '../../constant/createHistoryArray';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function AddApplicationForm() {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [dateSubmitted, setDateSubmitted] = useState(null);
  const [onlineAssessment, setOnlineAssessment] = useState(null);
  const [firstInterview, setFirstInterview] = useState(null);
  const [secondInterview, setSecondInterview] = useState(null);
  const [thirdInterview, setThirdInterview] = useState(null);
  const [offerDate, setOfferDate] = useState(null);
  const [rejectedDate, setRejectedDate] = useState(null);
  const [notes, setNotes] = useState('');

  const onCompanyChange = (e) => setCompany(e.target.value);
  const onPositionChange = (e) => setPosition(e.target.value);
  const onLocationChange = (e) => setLocation(e.target.value);
  const onStatusChange = (e) => setStatus(e.target.value);
  const onNotesChange = (e) => setNotes(e.target.value);

  const dispatch = useAppsDispatch();
  const navigate = useNavigate();

  /*
   * Alert control for the snackbar at bottom right corner.
   */
  const [alert, setAlert] = useState({
    isOpen: false,
    severity: 'success',
    message: '',
  });

  const closeAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlert({ ...alert, isOpen: false });
  };

  /*
   * TO-DO: use a form instead of separated controlled components. The 'name' for each part in the form can be a real descriptive name (e.g. 1st Interview). Refer to Signin.jsx component to see how to prevent form default submit and get eac field's value for fetch.
   */

  // Sumbit Button OnClick Handler
  const submit = async () => {
    try {
      const history = createHistoryArray([
        dateSubmitted,
        onlineAssessment,
        firstInterview,
        secondInterview,
        thirdInterview,
        offerDate,
        rejectedDate,
      ]);
      const res = await fetch('/apps/add', {
        method: 'POST',
        body: JSON.stringify({
          company,
          position,
          location,
          status,
          dateSubmitted,
          history,
          notes,
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
        // dispatch (need to get the _id of added application, so get the Backend response and dispatch that to context)
        dispatch({
          type: 'add',
          payload: data,
        });

        // Redirect
        navigate('/user/applications');
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            label="Company (required)"
            value={company}
            variant="outlined"
            onChange={onCompanyChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Job Position (required)"
            value={position}
            variant="outlined"
            onChange={onPositionChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Location (required)"
            value={location}
            variant="outlined"
            onChange={onLocationChange}
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Status Options Selecter */}
      <Divider
        textAlign="right"
        sx={{ marginTop: 3, color: 'primary.main', fontSize: '1.2rem' }}
      >
        Status
      </Divider>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={status} label="Status" onChange={onStatusChange}>
              <MenuItem value="Not Submitted">Not Submitted</MenuItem>
              <MenuItem value="Application Submitted">
                Application Submitted
              </MenuItem>
              <MenuItem value="Interview Scheduled">
                Interview Scheduled
              </MenuItem>
              <MenuItem value="Offer Received">Offer Received</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Milestone Date Pickers */}
      <Divider
        textAlign="right"
        sx={{ marginTop: 3, color: 'primary.main', fontSize: '1.2rem' }}
      >
        Milestones
      </Divider>

      <Grid container>
        <Grid item xs={12} md={9}>
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
                    value={onlineAssessment}
                    onChange={(newValue) => setOnlineAssessment(newValue)}
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DatePicker
                label="1st Interview"
                value={firstInterview}
                onChange={(newValue) => setFirstInterview(newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DatePicker
                label="2nd Interview"
                value={secondInterview}
                onChange={(newValue) => setSecondInterview(newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DatePicker
                label="3nd Interview"
                value={thirdInterview}
                onChange={(newValue) => setThirdInterview(newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DatePicker
                label="Offer Received"
                value={offerDate}
                onChange={(newValue) => setOfferDate(newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DatePicker
                label="Rejected"
                value={rejectedDate}
                onChange={(newValue) => setRejectedDate(newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>

          {/* Notes */}
          <Divider
            textAlign="right"
            sx={{ marginTop: 3, color: 'primary.main', fontSize: '1.2rem' }}
          >
            Notes
          </Divider>

          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                label="Notes"
                value={notes}
                variant="outlined"
                onChange={onNotesChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid container spacing={2} marginTop="1rem">
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
        </Grid>

        {/* Timeline */}
        <Grid item xs={12} md={3}>
          <Timeline
            timeline={createTimelineArray([
              dateSubmitted,
              onlineAssessment,
              firstInterview,
              secondInterview,
              thirdInterview,
              offerDate,
              rejectedDate,
            ])}
          />
        </Grid>
      </Grid>

      {/* Slide-in alert at bottom right corner. */}
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
