import React from 'react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import SignIn from './components/SignIn'
import CreateProfile from './components/CreateProfile';
import Search from './components/Search'
import Post from './components/Post'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/signin">
          <SignIn />
          </Route>

          <Route path="/createprofile">
            <CreateProfile />
          </Route>

          <Route path="/search">
            <Search />
          </Route>

          <Route path="/post">
            <Post />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
