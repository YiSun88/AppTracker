import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useFutureEvents } from '../appsFeature/AppsContext.jsx';

export default function UpcomingEvents() {
  const futureEvents = useFutureEvents();

  return (
    <>
      <ListSubheader component="div" inset>
        Upcoming Events
      </ListSubheader>
      {futureEvents.map((app) => (
        <ListItemButton
          component={Link}
          to={`/user/applications/edit/${app._id}`}
          key={app._id}
          sx={{ pt: 0, pb: 0 }}
        >
          <ListItemIcon />
          <ListItemText
            primary={app.company}
            // To allow multiline of ListItemText
            primaryTypographyProps={{ style: { whiteSpace: 'normal' } }}
            // The value passed to secondary needs to be a DOM node, therefore wrap it with <></> and use <br /> for line break. ('\n' is not recognized by HTML)
            secondary={
              <>
                {app.nextEvent.activity}
                <br />
                {format(app.nextEvent.date, 'MMM-dd')}
              </>
            }
            secondaryTypographyProps={{ style: { whiteSpace: 'pre-line' } }}
          />
        </ListItemButton>
      ))}
    </>
  );
}
