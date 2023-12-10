import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './page/Homepage';
import React, { useState } from 'react';
import RegisterPage from './page/RegisterPage';
import LoginPage from './page/LoginPage';
import CreatePostPage from './page/CreatePostPage';
import FeedPage from './page/FeedPage';
import PostPage from './page/PostPage';
import AppBarComponent from './component/AppBarComponent';
import ProfilePage from './page/ProfilePage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <React.Fragment>
    <BrowserRouter>
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
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
