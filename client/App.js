import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Borders from './components/Borders';
import Dashboard from './components/Dashboard';
import Applications from './components/Applications';

const TestContext = createContext('Default!');

export function useTestContext() {
  return useContext(TestContext);
}

function App() {
  const [testText, setTestText] = useState('test text');

  return (
    <div className="App">
      <BrowserRouter>
        <TestContext.Provider value={{ testText, setTestText }}>
          <Borders>
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />

              {/* Recent Orders */}
              <Route path="/applications" element={<Applications />} />
            </Routes>
          </Borders>
        </TestContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
