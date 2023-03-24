/* eslint-disable no-use-before-define */
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppsContext = createContext(null);
const AppsDispatchContext = createContext(null);

export function AppsProvider({ children }) {
  const [apps, dispatch] = useReducer(appsReducer, []);

  /*
   * useState hook here for loading status is not working, since setStatus may
   * be processed by React by batches and not right away.
   */
  // const [status, setStatus] = useState('idle');

  useEffect(() => {
    fetch('/apps', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'initialize',
          payload: data,
        });
      })
      .catch(() => {
        console.log(
          'Error encountered when trying to fetch all applications from backend.',
        );
      });
  }, []);

  return (
    <AppsContext.Provider value={apps}>
      <AppsDispatchContext.Provider value={dispatch}>
        {children}
      </AppsDispatchContext.Provider>
    </AppsContext.Provider>
  );
}

export function useApps() {
  return useContext(AppsContext);
}

export function useAppsDispatch() {
  return useContext(AppsDispatchContext);
}

function appsReducer(apps, action) {
  switch (action.type) {
    case 'initialize': {
      return [...action.payload];
    }
    case 'add': {
      if (apps.findIndex((app) => app._id === action.payload._id) === -1) {
        return [...apps, action.payload];
      }
      return apps;
    }
    /*
     * Add an initialize action type?
     */
    default: {
      return apps;
    }
  }
}
