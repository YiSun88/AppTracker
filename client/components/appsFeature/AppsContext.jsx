/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { differenceInCalendarDays } from 'date-fns';

const AppsContext = createContext(null);
const AppsDispatchContext = createContext(null);

const MAXDATE = 10 ** 15;
const TODAY = new Date();

/*
 * Convert the json object strings back to Date objects;
 * Also add a new property for each app in the global context, to record all future activities within next 7 days;
 * TO-DO: make this function pure/ not mutating the input object
 */
const convertStrToDateObj = (data) => {
  data.dateSubmitted = data.dateSubmitted
    ? new Date(data.dateSubmitted)
    : data.dateSubmitted;
  data.history.forEach((el) => {
    if (el.date) {
      el.date = new Date(el.date);
      if (
        (!data.nextEvent ||
          differenceInCalendarDays(data.nextEvent, el.date) > 0) &&
        differenceInCalendarDays(el.date, TODAY) <= 7 &&
        differenceInCalendarDays(el.date, TODAY) >= 0
      ) {
        data.nextEvent = { ...el };
      }
    }
  });
};

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
        /*
         * Not True --> (Keep the dates in frontend context as string, to avoid large amount converting after the first fetch request. Instead, only do converting when certain dates are requried to be rendered.)
         */
        data.forEach((element) => {
          convertStrToDateObj(element);
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
  }, []);

  return (
    // Provide apps and dispatch in separated Provider components, per React offical examples. This will avoid nested object as context value and associated complexity of keeping that nested object immutable
    <AppsContext.Provider value={apps}>
      <AppsDispatchContext.Provider value={dispatch}>
        {children}
      </AppsDispatchContext.Provider>
    </AppsContext.Provider>
  );
}

// Best practice, providing more descriptive hook name, and also keep the useContext import within this Provider component
export function useApps() {
  return useContext(AppsContext);
}
export function useAppsDispatch() {
  return useContext(AppsDispatchContext);
}

// Similar to Redux, should be pure
function appsReducer(apps, action) {
  switch (action.type) {
    case 'initialize': {
      return [...action.payload];
    }
    case 'add': {
      if (apps.findIndex((app) => app._id === action.payload._id) === -1) {
        convertStrToDateObj(action.payload);
        const newApps = [...apps, action.payload];

        // Sort the newly added applicaiton in the previously sorted array.

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
      return apps
        .map((app) => {
          if (app._id === action.payload._id) {
            convertStrToDateObj(action.payload);
            return action.payload;
          }
          return app;
        })
        .sort(
          (a, b) =>
            (b.dateSubmitted ? b.dateSubmitted : MAXDATE) -
            (a.dateSubmitted ? a.dateSubmitted : MAXDATE)
        );
    }
    case 'delete': {
      return apps.filter((app) => app._id !== action.payload._id);
    }
    default: {
      return apps;
    }
  }
}
