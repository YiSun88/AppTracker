import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Borders from './components/Borders.jsx';
import Dashboard from './components/Dashboard.jsx';
import Applications from './components/Applications.jsx';
import { AppsProvider } from './components/appsFeature/AppsContext.jsx';
import AddApplicationForm from './components/appsFeature/AddApplicationForm.jsx';
import EditApplicationForm from './components/appsFeature/EditApplicationForm.jsx';
import BarChart from './components/Chart.jsx';
import Signin from './components/signinFeature/Signin.jsx';
import {
  AuthProvider,
  RequireAuth,
} from './components/signinFeature/AuthContext.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route
              // Adding '/*' so the children routes can be matched as a suffix
              path="/user/*"
              element={
                <RequireAuth>
                  <AppsProvider>
                    {/* LocalizationProvider supports the date picker component */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Borders>
                        <Routes>
                          {/* Dashboard */}
                          <Route path="/" element={<Dashboard />} />

                          {/* All Application Table */}
                          <Route
                            path="/applications"
                            element={<Applications />}
                          />

                          {/* Add Application Form */}
                          <Route
                            path="/applications/add"
                            element={<AddApplicationForm />}
                          />

                          {/* Edit an Application */}
                          <Route
                            path="/applications/edit/:id"
                            element={<EditApplicationForm />}
                          />

                          {/* Submittal by Week Bar Chart */}
                          <Route
                            path="/submittalbyweek"
                            element={<BarChart />}
                          />
                        </Routes>
                      </Borders>
                    </LocalizationProvider>
                  </AppsProvider>
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
