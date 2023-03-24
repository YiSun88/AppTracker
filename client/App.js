import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Borders from './components/Borders';
import Dashboard from './components/Dashboard';
import Applications from './components/Applications';
import { AppsProvider } from './components/appsFeature/AppsContext';
import AddApplicationForm from './components/appsFeature/AddApplicationForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppsProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Borders>
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Dashboard />} />

                {/* Add Application Form */}
                <Route
                  path="/applications/add"
                  element={<AddApplicationForm />}
                />

                {/* Recent Orders */}
                <Route path="/applications" element={<Applications />} />
              </Routes>
            </Borders>
          </LocalizationProvider>
        </AppsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
