import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import { Home } from './Pages/Home';
import { History } from './Pages/History';
import { Categories } from './Pages/CategoriesPage';
import { CreatePost } from './Pages/CreatePostPage';
import { Profile } from './Pages/ProfilePage';
import { AuthPage } from './Pages/AuthPage';
import { Header } from './Components/Header'
import { RegisterPage } from './Pages/RegisterPage';
import { Planning } from './Pages/Planning';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <div>
        <Header />
          <Switch>
              <Route path="/" exact >
                <Home />
              </Route>
                  <Route path="/history">
                    <History />
                  </Route>
                    <Route path="/categories">
                      <Categories />
                    </Route>
                    <Route path="/planning">
                       <Planning /> 
                    </Route>
                  <Route path="/createPost">
                    <CreatePost />
                  </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
              <Redirect to="/" />
          </Switch>
      </div>   
    )
  }

  return(
    <Switch>
      <Route path="/auth">
        <AuthPage />    
      </Route> 
      <Route path="/register">
        <RegisterPage />    
      </Route> 
      <Redirect to="/auth" />
    </Switch>
  )
}