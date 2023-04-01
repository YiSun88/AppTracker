import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LabelTwoToneIcon from '@mui/icons-material/LabelTwoTone';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { format, differenceInCalendarDays } from 'date-fns';

import { useFutureEvents } from '../appsFeature/AppsContext.jsx';

const TODAY = new Date();

export default function Notification() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const withinAWeek = useFutureEvents().filter(
    (app) => differenceInCalendarDays(app.nextEvent.date, TODAY) <= 7
  );

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="In 7 Days">
        <IconButton color="inherit" onClick={handleClick}>
          <Badge badgeContent={withinAWeek.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {withinAWeek.map((app) => (
          <MenuItem
            key={app._id}
            component={Link}
            to={`/user/applications/edit/${app._id}`}
            sx={{ fontSize: 14 }}
          >
            <ListItemIcon>
              <LabelTwoToneIcon fontSize="small" />
            </ListItemIcon>
            {`${app.company} - ${app.nextEvent.activity} - ${format(
              app.nextEvent.date,
              'MMM-dd'
            )}`}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
