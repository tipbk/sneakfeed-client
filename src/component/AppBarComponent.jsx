import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
import CommonService from '../services/commonService';
import ConfigService from '../services/configService';
import { ColorModeContext } from '../App';
import { useTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const pages = ['Home', 'Feeds'];
const noUserPages = ['Home'];
const noUserSettingPage = ['Register', 'Login']
const settings = ['Logout'];

function AppBarComponent({ currentUser, setCurrentUser }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    if (ConfigService.getAccessToken() === "" || ConfigService.getAccessToken() === null) {
      return
    }
    CommonService.getCurrentUser()
      .then(response => {
        setCurrentUser(response.data.data);
      })
      .catch(error => {
        setCurrentUser(null);
      })
  }, [])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavMenu = (input) => {
    handleCloseUserMenu();
    switch(input) {
      case "Home":  
        navigate("/");
        break;
      case "Feeds":
        navigate("/feeds");
        break;
      case "Login":
        navigate("/login");
        break;
      case "Register":
        navigate("/register");
        break;
      case "Logout":
        setCurrentUser(null);
        ConfigService.removeSession();
        navigate("/")
        break;
      case "username":
        navigate(`/users/${currentUser.username}`);
        break;
      default:
        navigate("/")
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <React.Fragment>
      <AppBar style={{ background: 'black' }} position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              onClick={handleNavMenu}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SNEAKFEED
            </Typography>
            <Box>
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {currentUser && pages.map((page) => (
                <Button
                  key={page}
                  onClick={(e) => handleNavMenu(page)}
                  sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold' }}
                >
                  {page}
                </Button>
              ))}
              {!currentUser && noUserPages.map((page) => (
                <Button
                  key={page}
                  onClick={(e) => handleNavMenu(page)}
                  sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            

            <Box sx={{ flexGrow: 0 }}>
              { currentUser && <Box display='flex' flexDirection='row'>
                <Button
                  key={currentUser.username}
                  onClick={(e) => handleNavMenu("username")}
                  sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold', mr: 2 }}
                >
                {currentUser.username}
              </Button>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={ currentUser && currentUser.username } src={ (currentUser && currentUser.profileImage) || "/empty.jpg"} />
                </IconButton>
              </Tooltip>
              </Box> }
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              { !currentUser && 
              noUserSettingPage.map((page) => (
                <Button
                  key={page}
                  onClick={(e) => handleNavMenu(page)}
                  sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold' }}
                >
                  {page}
                </Button>
              ))}
              </Box>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={(e) => handleNavMenu(setting)}>
                    <Typography textAlign="center" sx={{fontWeight: 'bold'}}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
}
export default AppBarComponent;