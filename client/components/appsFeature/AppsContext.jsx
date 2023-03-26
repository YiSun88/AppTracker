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
    if (!apps.length) {
      fetch('/apps', { method: 'GET' })
        .then((res) => res.json())
        .then((data) => {
          /*
           * Keep the dates in frontend context as string, to avoid large amount converting after the first fetch request. Instead, only do converting when certain dates are requried to be rendered.
           */
          // data.forEach((element) => {
          //   if (element.dateSubmitted) {
          //     // eslint-disable-next-line no-param-reassign
          //     element.dateSubmitted = new Date(element.dateSubmitted);
          //   }
          // });
          dispatch({
            type: 'initialize',
            payload: data,
          });
        })
        .catch(() => {
          console.log(
            'Error encountered when trying to fetch all applications from backend.'
          );
        });
    }
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
    case 'edit': {
      return apps.map((app) => {
        if (app._id === action.payload._id) {
          return action.payload;
        }
        return app;
      });
    }
    case 'delete': {
      return apps.filter((app) => app._id !== action.payload._id);
    }
    default: {
      return apps;
    }
  }
}
