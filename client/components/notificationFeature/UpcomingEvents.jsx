import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useFutureEvents } from '../appsFeature/AppsContext.jsx';

export default function UpcomingEvents() {
  const futureEvents = useFutureEvents();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListSubheader component="div">
        <ListItemButton onClick={handleClick} sx={{ pl: 0 }}>
          <ListItemIcon>
            <FormatListNumberedIcon />
          </ListItemIcon>
          Upcoming Events
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListSubheader>
      <Collapse in={open} timeout="auto" unmountOnExit>
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
              primaryTypographyProps={{
                style: {
                  whiteSpace: 'normal',
                  fontSize: '14px',
                  fontWeight: 'bold',
                },
              }}
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
      </Collapse>
    </>
  );
}
