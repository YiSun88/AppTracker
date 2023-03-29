import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

import { Link } from 'react-router-dom';

export const mainListItems = (
  <>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/applications">
      <ListItemIcon>
        <FolderCopyIcon />
      </ListItemIcon>
      <ListItemText primary="All Applications" />
    </ListItemButton>
    <ListItemButton component={Link} to="/applications/add">
      <ListItemIcon>
        <AddToPhotosIcon />
      </ListItemIcon>
      <ListItemText primary="New Application" />
    </ListItemButton>
    <ListItemButton component={Link} to="/submittalbyweek">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Summary
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year to date" />
    </ListItemButton>
  </>
);
