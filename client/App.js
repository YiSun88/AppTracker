import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Borders from './components/Borders';
import Dashboard from './components/Dashboard';
import Applications from './components/Applications';
import { AppsProvider } from './components/appsFeature/AppsContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppsProvider>
          <Borders>
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />

              {/* Recent Orders */}
              <Route path="/applications" element={<Applications />} />
            </Routes>
          </Borders>
        </AppsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
