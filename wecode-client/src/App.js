import React from 'react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import CreateProfile from './components/CreateProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
          <Home />
          </Route>

          <Route path="/createprofile">
            <CreateProfile />s
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
