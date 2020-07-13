import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route, useLocation } from 'react-router-dom';
import SignIn from './components/SignIn'
import ProtectedRoute from './components/ProtectedRoute';

import AppBar from './components/AppBar';
import BottomNav from './components/BottomNav';

import CreateProfile from './components/CreateProfile';


import Search from './components/Search'
import CreatePost from './components/CreatePost'
import CreateQuestion from './components/CreateQuestion';
import Profile from './components/Profile';
import Discussion from './components/Discussion';
import CreateComment from './components/CreateComment';
import EditProfile from './components/EditProfile';


import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { createUploadLink } from 'apollo-upload-client';
import Home from './components/Home';
import { AnimatePresence } from 'framer-motion'
import Followers from './components/Followers'
import People from './components/People';
import PostComment from './components/PostComments';

const link = createUploadLink({
  uri: 'http://localhost:4000/graphql'
})

const client = new ApolloClient({
  link,
  uri: 'http://localhost:4000/graphql'
})

function App() {
  const location = useLocation();
  return (
    <ApolloProvider client={client}>
      <div className="App">

        {/* <AnimatePresence> */}
          <Switch>
            <Route exact path="/signin">
              <SignIn />
            </Route>

            <Route path="/createprofile">
              <CreateProfile User={'webstar'} />
            </Route>

            <Route path="/editprofile">
              <EditProfile />
            </Route>


            <Route path="/createpost">
              <CreatePost />
            </Route>

            <Route path="/createquestion">
              <CreateQuestion />
            </Route>
            <Route path="/people">
              <People />
            </Route>
            
            <Route path="/createcomment">
                <CreateComment />

              </Route>

            <Route path="/discussion/:questionid" >
              <Discussion />
              </Route>
            <Route path="/comments/:postid" >
              <PostComment />
            </Route>

            <div>

              <AppBar />

              <Route exact path="/" >
                <Home />
              </Route>

              <Route path="/search">
                {/* <ProtectedRoute  component={Search} /> */}
                <Search />
              </Route>

              <Route path="/profile/:name" component={Profile}>
              </Route>

              <BottomNav />
            </div>


          </Switch>
        {/* </AnimatePresence> */}

      </div>
    </ApolloProvider>

  );
}

export default App;
