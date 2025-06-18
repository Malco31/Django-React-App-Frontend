import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import {Link, useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { flexRender } from 'material-react-table';


export default function Navbar(props) {
  const {drawerWidth, content} = props
  const location = useLocation() //This shows which page we are at 
  const path = location.pathname

  const [open, setOpen] = React.useState(false);

  const changeOpenStatus = () => {
    setOpen(!open)
  }

  const handleLogout = async () => {
    try {
      // IN PRODUCTION ADD "api/" TO GET
      await fetch("api/logout", {
        method: 'POST',
        credentials: 'include',
      });
      
      window.location.href = '/login'; // Redirect to login page
    } catch (err) {
      console.error("Logout failed:", err)
    }
  };

  const myDrawer = (
    <div>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/" selected={"/" === path}>
                  <ListItemIcon>
                    <HomeIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/about" selected={"/about" === path}>
                  <ListItemIcon>
                    <AnalyticsIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Analytics"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/create" selected={"/create" === path}>
                  <ListItemIcon>
                    <AddCircleOutlineIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Create"} />
                </ListItemButton>
              </ListItem>
            
          </List>
          
        </Box>
    </div>
  )
    

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <IconButton 
                color = "inherit"
                onClick={changeOpenStatus}
                sx={{mr:2,display:{sm:"none"}}}
                >
                <MenuIcon/>
            </IconButton>

            <Typography variant="h6" noWrap component="div">
              Income Manager Application
            </Typography>
          </Box>
          <button onClick={handleLogout} style={{
              background: 'transparent',
              color: 'white',
              border: '1px solid white',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Logout
          </button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          display: {xs:"none", sm:"block"},
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {myDrawer}
        
      </Drawer>

      <Drawer
        variant="temporary"
        open = {open}
        onClose={changeOpenStatus}
        sx={{
          display: {xs:"block", sm:"none"},
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {myDrawer}
        
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
            {content}
      </Box>
    </Box>
  );
}