import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './page/Homepage';
import React, { useState, useMemo, createContext } from 'react';
import RegisterPage from './page/RegisterPage';
import LoginPage from './page/LoginPage';
import CreatePostPage from './page/CreatePostPage';
import FeedPage from './page/FeedPage';
import PostPage from './page/PostPage';
import AppBarComponent from './component/AppBarComponent';
import ProfilePage from './page/ProfilePage';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';
import ConfigService from './services/configService';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState(ConfigService.getCurrentTheme());
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          if (prevMode === 'light') {
            localStorage.setItem("theme", 'dark');
          } else {
            localStorage.setItem("theme", 'light');
          }
          return prevMode === 'light' ? 'dark' : 'light'});
      },
    }),
    [],
  );
  const theme = useMemo(
    () =>
    {
      if (mode === "dark") {
        return createTheme({
          palette: {
            mode,
          },
        })
      } else {
        let whiteTheme = createTheme({
          palette: {
            mode,
          },
        })
        whiteTheme.palette.background.default = "#F0F2F5";
        return whiteTheme;
      }
    }
      ,
    [mode],
  );

  const [currentUser, setCurrentUser] = useState(null);
  return (
    <React.Fragment>
    <ColorModeContext.Provider value={colorMode}>
    <BrowserRouter>
    <ThemeProvider theme={theme} >
    <CssBaseline />
    <AppBarComponent setCurrentUser={setCurrentUser} currentUser={currentUser} />
      <div className="global-border">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/feeds" element={<FeedPage />} />
          <Route path="/feeds/:postID" element={<PostPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
        </Routes>
    </div>
    </ThemeProvider>
    
    </BrowserRouter>
    </ColorModeContext.Provider>
    </React.Fragment>
  );
}

export default App;
