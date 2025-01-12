import React, {useEffect, useState,useRef } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';


import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton' ;
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Menu from  '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ArticleIcon from '@mui/icons-material/Article';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Divider from '@mui/material/Divider';

import {setUser} from '../redux/userSlice';
import {auth} from '../utils/firebase';
import {signOut} from 'firebase/auth';
//import { DataGrid } from '@mui/x-data-grid';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandLess';
import TocIcon from '@mui/icons-material/Toc';



const MyAppBar = () => {

    const drawWidth = 250;

    const navigate = useNavigate();
let dispatch = useDispatch();

const [open,setOpen] = useState(false);
const [mopen, setMopen] = useState(false);

const handleClick = () => {
    setMopen(!mopen);
  };

//const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

 const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

 const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
 const handleClose = () => {
    setAnchorEl(null);
  };


const handleLogout = () => {
 
dispatch(setUser({}));

signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/signin");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });


 //auth().signOut();
navigate('/');

}


const  user  = useSelector((state) => state.user);

  
const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        
          <ListItem key={1} disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <ArticleIcon sx={{color:'green'}} />
              </ListItemIcon>
              <ListItemText primary='Blogs' />
                      {mopen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>     
          </ListItem>
           <Collapse in={mopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/blogs/admin')} >
            <ListItemIcon sx={{color:'green'}} >
              <TocIcon />
            </ListItemIcon>
            <ListItemText primary="Blog Admin" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/blogs/new')} >
            <ListItemIcon sx={{color:'green'}} >
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="New Blog" />
          </ListItemButton>
        </List>
      </Collapse>
        
        
      





<ListItem key={2} disablePadding>
            <ListItemButton >
              <ListItemIcon>
                <SmartToyIcon sx={{color:'green'}} />
              </ListItemIcon>
              <ListItemText primary='AI query' />
            </ListItemButton>
          </ListItem>

      </List>
      <Divider />
    
    </Box>
  );







return (
    <>
<AppBar
                        position="absolute"
                        sx={{
                            width: '100%',
                            margin: 0,
                            marginLeft:-2,
                            backgroundColor: "green",
                        }}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                edge="start"
                                onClick={toggleDrawer(true)}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Welcome to Ai-Tools CRUD Portal
                            </Typography>
                              
{ user?                
 <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>: <Button onClick={() => navigate('/signin')} color="inherit">Login</Button> }




                        </Toolbar>
                    </AppBar>

 <Box
                        component="nav"
                        sx={{ width: { sm: drawWidth },mt:15, 
                            flexShrink: { sm: 0 },overflowY: 'hidden' }}
                    >                        
                        <Drawer
                            BackdropProps={{ invisible: true }}
                            PaperProps={{
                                sx: { mt: 8 },
                            }}
                            variant="permanent"
                            open={open}
                            onClose={toggleDrawer(false)}                           
                        >
                            {DrawerList}
                        </Drawer>
                       
                    </Box>
                    </>

)

}
export default MyAppBar;
