/* eslint-disable no-unused-vars */
import { Stack, Paper, TextField, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';

export default function AddApplicationForm() {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [dateSubmitted, setDateSubmitted] = useState(new Date());

  const onCompanyChange = (e) => setCompany(e.target.value);
  const onPositionChange = (e) => setPosition(e.target.value);
  const onLocationChange = (e) => setLocation(e.target.value);

  const submit = async () => {
    try {
      const res = await fetch('/apps/add', { method: 'POST' });
      if (!res.ok) {
        const data = await res.json();
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
          label="Company"
          value={company}
          variant="outlined"
          onChange={onCompanyChange}
        />
        <TextField
          id="outlined-basic"
          label="Job Position"
          value={position}
          variant="outlined"
          onChange={onPositionChange}
        />
        <TextField
          id="outlined-basic"
          label="Location"
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
    </Paper>
  );
}
