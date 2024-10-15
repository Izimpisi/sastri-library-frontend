'use client';

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
import { Stack, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockIcon from '@mui/icons-material/Lock';

import axiosInstance from '../lib/axiosInstance';
import Link from 'next/link';

// Define UserProfile type
interface UserProfile {
  firstName?: string;
  lastName?: string;
  role?: string;
}

export default function DrawerAppBar() {
  const router = useRouter();
  const [state, setState] = React.useState<{ left: boolean }>({ left: false });

  const [userProfile, setUserProfile] = React.useState<UserProfile>({});

  React.useEffect(() => {
    async function execute() {
      async function fetchMe() {
        try {
          const response = await axiosInstance.get<UserProfile>('/Account/profile');
          return response.data;
        } catch (error: any) {
          if (error.response?.status === 401) {
            router.push('/auth/login');
          }
          throw error;
        }
      }

      try {
        const response = await fetchMe();
        setUserProfile(response);
        sessionStorage.setItem('userInfo', JSON.stringify(response));
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    }

    execute();
  }, [router]);

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
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
      {userProfile.role === 'Student' ? (
        <>
          <List>
            {[
              { text: 'New Books', url: '/home/new-books' },
              { text: 'Categories', url: '/home/categories' },
            ].map((page, index) => (
              <Link href={page.url} key={page.text}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? (
                        <InboxIcon />
                      ) : (
                        <Badge badgeContent={4} color="primary">
                          <MailIcon />
                        </Badge>
                      )}
                    </ListItemIcon>
                    <ListItemText primary={page.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {[
              { text: 'Overdue', url: '/home/overdue' },
              { text: 'Book Loans', url: '/home/loans' },
              { text: 'Book Reservations', url: '/home/reservations' },
              { text: 'History', url: '/home/history' },
            ].map((page, index) => (
              <Link href={page.url} key={page.text}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={page.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </>
      ) : (
        <>
          <List>
            {[
              { text: 'Manage Books', url: '/home/manage-books' },
              { text: 'Categories', url: '/home/categories' },
            ].map((page, index) => (
              <Link href={page.url} key={page.text}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? (
                        <InboxIcon />
                      ) : (
                        <Badge badgeContent={4} color="primary">
                          <MailIcon />
                        </Badge>
                      )}
                    </ListItemIcon>
                    <ListItemText primary={page.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {[
              { text: 'Overdue Loans', url: '/home/overdue-loans' },
              { text: 'Pending Loans', url: '/home/pending-loans' },
              { text: 'Pending Reservations', url: '/home/pending-reservations' },
              { text: 'Payment', url: '/home/payments' },
              { text: 'Students', url: '/home/students' },
            ].map((page, index) => (
              <Link href={page.url} key={page.text}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={page.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </>
      )}
    </Box>
  );

  return (
    <div>
      <AppBar component="nav" sx={{ backgroundColor: '#a6e6e2d4', color: 'rgb(126 132 203)' }}>
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)} color="inherit" aria-label="open drawer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit={10}
                strokeWidth={48}
                d="M88 152h336M88 256h336M88 360h336"
              />
            </svg>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Sastri Library Management System
          </Typography>

          <Stack direction="row" spacing={1}>
            {userProfile.role === 'Student' ? (
              <Chip
                icon={<AccountCircleOutlinedIcon />}
                label={userProfile.role}
              />
            ) : (
              <Chip
                icon={<LockIcon fontSize="small" />}
                label={`${userProfile.role}strator`}
              />
            )}
          </Stack>

          <IconButton>
            <NotificationsActiveOutlinedIcon sx={{ color: 'white' }} />
          </IconButton>
          <IconButton>
            <MailOutlinedIcon sx={{ color: 'white' }} />
          </IconButton>
          <IconButton>
            <AccountCircleOutlinedIcon sx={{ color: 'white' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={state.left} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
