/* eslint-disable no-param-reassign */
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
           * Not True --> (Keep the dates in frontend context as string, to avoid large amount converting after the first fetch request. Instead, only do converting when certain dates are requried to be rendered.)
           */
          data.forEach((element) => {
            if (element.dateSubmitted) {
              element.dateSubmitted = new Date(element.dateSubmitted);
            }
            element.history.forEach((el) => {
              if (el.date) {
                el.date = new Date(el.date);
              }
            });
          });
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
        const newApps = [...apps, action.payload];

        // Sort the newly added applicaiton in the previously sorted array.
        const MAXDATE = 10 ** 15;
        for (let i = newApps.length - 1; i >= 1; i -= 1) {
          if (
            (newApps[i].dateSubmitted ? newApps[i].dateSubmitted : MAXDATE) -
              (newApps[i - 1].dateSubmitted
                ? newApps[i - 1].dateSubmitted
                : MAXDATE) >
            0
          ) {
            [newApps[i], newApps[i - 1]] = [newApps[i - 1], newApps[i]];
          } else break;
        }

        return newApps;
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
