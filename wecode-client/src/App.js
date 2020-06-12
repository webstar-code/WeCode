import React from 'react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import SignIn from './components/SignIn'
import ProtectedRoute from './components/ProtectedRoute';
import CreateProfile from './components/CreateProfile';
import Search from './components/Search'
import Post from './components/Post'
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/signin">
          <SignIn />
          </Route>

          <Route path="/createprofile">
            <CreateProfile />
          </Route>

          <Route path="/search">
            {/* <ProtectedRoute  component={Search} /> */}
            <Search />
          </Route>

          <Route path="/post">
            <Post />
          </Route>

          <Route path="/profile/:name" component={Profile}>
            {/* <Profile /> */}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
