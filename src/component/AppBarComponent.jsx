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
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext } from '../App';
import { useTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const pages = ['Home', 'Feeds', 'Create Post'];
const noUserPages = ['Home'];
const noUserSettingPage = ['Register', 'Login']
const settings = ['Profile', 'Logout'];

function AppBarComponent({ currentUser, setCurrentUser }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
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
    switch(input) {
      case "Home":  
        navigate("/");
        break;
      case "Create Post":
        navigate("/create-post");
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
      case "Profile":
        navigate("/profile");
        break;
      case "Logout":
        setCurrentUser(null);
        ConfigService.removeSession();
        navigate("/")
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
    <CssBaseline />
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
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
              {!currentUser && noUserPages.map((page) => (
                <Button
                  key={page}
                  onClick={(e) => handleNavMenu(page)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            

            <Box sx={{ flexGrow: 0 }}>
              { currentUser && <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={ currentUser && currentUser.username } src={ (currentUser && currentUser.profileImage) || "/empty.jpg"} />
                </IconButton>
              </Tooltip> }
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              { !currentUser && 
              noUserSettingPage.map((page) => (
                <Button
                  key={page}
                  onClick={(e) => handleNavMenu(page)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={(e) => handleNavMenu(setting)}>{setting}</Typography>
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