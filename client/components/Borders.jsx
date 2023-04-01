/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import ListSubheader from '@mui/material/ListSubheader';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Tooltip from '@mui/material/Tooltip';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';

import { indigo } from '@mui/material/colors';
import mainListItems from './ListItems.jsx';
import UpcomingEvents from './notificationFeature/UpcomingEvents.jsx';
import { useAuth } from './signinFeature/AuthContext.jsx';
import Notification from './notificationFeature/Notification.jsx';

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {'Copyright © '}
//       <Link
//         color="inherit"
//         href="https://www.linkedin.com/in/yi-sun-p-e-abb0a239/"
//       >
//         Job Applications Tracker
//       </Link>{' '}
//       {new Date().getFullYear()}.
//     </Typography>
//   );
// }

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Borders({ children }) {
  const [open, setOpen] = React.useState(true);
  const [dark, setDark] = React.useState(false);

  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const changeDarkMode = (event) => {
    setDark(event.target.checked);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const mdTheme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
      // primary: blueGrey,
      primary: {
        main: indigo[300],
      },
    },
  });

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* Top Bar */}
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            {/* {...true} --> { } */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Header: App Title */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Job Applications Tracker
            </Typography>

            {/* Switch for Light/Dark Modes */}
            <Brightness4Icon />
            <Tooltip title="Light/Dark Mode">
              <Switch
                checked={dark}
                onChange={changeDarkMode}
                sx={{ marginRight: '6px' }}
              />
            </Tooltip>

            {/* Notification for events within a week */}
            <Notification />

            {/* Logout button */}
            <Tooltip title="Logout">
              <IconButton
                color="inherit"
                onClick={() => {
                  signout();
                  navigate('/');
                }}
                sx={{
                  marginLeft: '10px',
                }}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListSubheader
              component="div"
              inset
              color="inherit"
              sx={{ fontSize: 18, lineHeight: '1.2' }}
            >
              Welcome back,
              <br />
              {user || ''}
            </ListSubheader>
            <Divider sx={{ my: 1 }} />
            {mainListItems}
            <Divider sx={{ my: 1 }} />

            {/* The upcoming events list */}
            <UpcomingEvents />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
