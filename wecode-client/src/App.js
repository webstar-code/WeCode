import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route, useHistory } from 'react-router-dom';
import SignIn from './components/SignIn'
import ProtectedRoute from './components/ProtectedRoute';

import AppBar from './components/AppBar';
import BottomNav from './components/BottomNav';

import CreateProfile from './components/CreateProfile';
import Search from './components/Search'
import CreatePost from './components/CreatePost'
import CreateQuestion from './components/CreateQuestion';
import Profile from './components/Profile';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({
  uri: 'http://localhost:4000/graphql'
})

const client = new ApolloClient({
  link,
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">

        <Router>
          <Switch>
            <Route exact path="/signin">
              <SignIn />
            </Route>

            <Route path="/createprofile">
              <CreateProfile />
            </Route>

            <Route path="/search">
              {/* <ProtectedRoute  component={Search} /> */}
              <AppBar />
              <Search />
              <BottomNav />

            </Route>

            <Route path="/createpost">
              <CreatePost />
            </Route>

            <Route path="/createquestion">
              <CreateQuestion />
            </Route>
            <Route path="/profile/:name" component={Profile}>
              {/* <Profile /> */}
            </Route>
          </Switch>
        </Router>

      </div>
    </ApolloProvider>

  );
}

export default App;
