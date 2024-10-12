'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';


import axiosInstance from '@/lib/axiosInstance';


export default function DrawerAppBar() {
  const router = useRouter()
  const [state, setState] = React.useState({
    left: false,
  });
  const [userProfile, setUserProfile] = React.useState({});

  React.useEffect(() => {
    async function execute() {

      async function fetchMe() {
        try {
          const response = await axiosInstance.get("/Account/profile");
          return response.data;
        } catch (error) {
          if (error.status == 401) {
            router.push("/auth/login")
          }
          return error;
        }
      }

      const response = await fetchMe();
      setUserProfile(response)
      sessionStorage.setItem('userInfo', JSON.stringify(response));
    }
    execute()

  }, [])

  const toggleDrawer =
    (open) =>
      (event) => {
        if (
          event.type === 'keydown' &&
          ((event).key === 'Tab' ||
            (event).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, left: open });
      };


  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >

      <List>
        {['New Books', 'Categories',].map((text, index) => (
          <ListItem disablePadding key={text}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <Badge badgeContent={4} color="primary"><MailIcon /></Badge>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Overdue', 'Book Loans', 'Book Reservations', 'History'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <AppBar component="nav">
          <Toolbar>
            <IconButton onClick={toggleDrawer(true)} color="inherit"
              aria-label="open drawer">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={48} d="M88 152h336M88 256h336M88 360h336"></path></svg>
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <span>Sastri Library Management System</span>
            </Typography>

            <Typography component="span" sx={{ paddingTop: 1, display: { xs: 'block', sm: 'none' } }} gutterBottom>
              {userProfile.firstName + " " + userProfile.lastName}
            </Typography>

            <div className='flex items-center py-2' style={{ marginLeft: 'auto' }}>
              <IconButton>
                <NotificationsActiveOutlinedIcon sx={{ color: 'white' }} />
              </IconButton>
              <IconButton>
                <MailOutlinedIcon sx={{ color: 'white' }} />
              </IconButton>
              <IconButton>
                <AccountCircleOutlinedIcon sx={{ color: 'white' }} />
              </IconButton>
              <Typography component="span" sx={{ paddingTop: 1.3, display: { xs: 'none', md: 'block' } }} gutterBottom>
                {userProfile.firstName + " " + userProfile.lastName}
              </Typography>
            </div>

          </Toolbar>
        </AppBar>
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>

      </React.Fragment>
    </div>
  );
}