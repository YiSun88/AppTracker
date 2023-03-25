/* eslint-disable react/jsx-props-no-spreading */
import {
  Stack,
  Paper,
  TextField,
  Button,
  Box,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppsDispatch } from './AppsContext.jsx';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function EditApplicationForm() {
  const { id } = useParams();

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [dateSubmitted, setDateSubmitted] = useState(new Date());

  const navigate = useNavigate();

  /*
   Always fetch data from backend on mounting/useEffect hook, to ensure get data from the single source of truth. In addition, this help to ensue proper rendering after refresh. (parent contextProvider will be remounted on refresh as well, fetch there is async so the context will not be available immediately for the useEffect hook.)
   */
  useEffect(() => {
    const fetchAnApp = async () => {
      try {
        const app = await (
          await fetch(`/apps/${id}`, { method: 'GET' })
        ).json();
        setCompany(app.company);
        setPosition(app.position);
        setLocation(app.location);
        setDateSubmitted(new Date(app.dateSubmitted));
      } catch (err) {
        console.log('Error when fetching this application from Backend.');
      }
    };
    fetchAnApp();
  }, []);

  const onCompanyChange = (e) => setCompany(e.target.value);
  const onPositionChange = (e) => setPosition(e.target.value);
  const onLocationChange = (e) => setLocation(e.target.value);

  const dispatch = useAppsDispatch();

  const [alert, setAlert] = useState({
    isOpen: false,
    severity: 'success',
    message: '',
  });

  const [openDelete, setOpenDelete] = useState(false);

  const closeAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlert({ ...alert, isOpen: false });
  };

  const editApp = async () => {
    try {
      const res = await fetch(`/apps/edit/${id}`, {
        method: 'PUT',
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
          message: 'Application edited successfully',
        });
        // dispatch (need to get the _id of added application), therefore add what is returned from Backend, not simply the states in Frontend
        dispatch({
          type: 'edit',
          payload: data,
        });

        // setCompany('');
        // setPosition('');
        // setLocation('');
      }
    } catch (err) {
      setAlert({
        isOpen: true,
        severity: 'error',
        message: `${err}`,
      });
    }
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleClickCloseDelete = () => {
    setOpenDelete(false);
  };

  const deleteApp = async () => {
    try {
      const res = await fetch(`/apps/delete/${id}`, {
        method: 'DELETE',
      });
      const deletedId = await res.json();

      if (!res.ok) {
        setAlert({
          isOpen: true,
          severity: 'error',
          message: `${deletedId.err}`,
        });
      } else {
        // dispatch (need to get the _id of added application), therefore add what is returned from Backend, not simply the states in Frontend
        dispatch({
          type: 'delete',
          payload: { _id: deletedId },
        });

        navigate('/');
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
        <Stack direction="row" justifyContent="flex-end">
          <Box textAlign="center">
            <Button
              onClick={editApp}
              variant="contained"
              color="success"
              sx={{ width: '30%' }}
            >
              Edit
            </Button>
          </Box>
          <Box textAlign="center">
            <Button
              onClick={handleClickOpenDelete}
              variant="contained"
              color="error"
              sx={{ width: '10%' }}
            >
              Delete
            </Button>
          </Box>
        </Stack>
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
      <Dialog open={openDelete} onClose={handleClickCloseDelete}>
        <DialogTitle>Delete this job application?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`${company}, ${position}, ${location}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseDelete}>Keep</Button>
          <Button onClick={deleteApp} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
