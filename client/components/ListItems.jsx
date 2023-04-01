/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

import { Link } from 'react-router-dom';

export default (
  <>
    <ListItemButton component={Link} to="/user/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/user/applications">
      <ListItemIcon>
        <FolderCopyIcon />
      </ListItemIcon>
      <ListItemText primary="All Applications" />
    </ListItemButton>
    <ListItemButton component={Link} to="/user/applications/add">
      <ListItemIcon>
        <AddToPhotosIcon />
      </ListItemIcon>
      <ListItemText primary="New Application" />
    </ListItemButton>
    <ListItemButton component={Link} to="/user/submittalbyweek">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
  </>
);
