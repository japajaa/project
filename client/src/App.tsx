import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Recipes from './components/Recipes';
import Home from './components/Home';
import PublicTransport from './components/PublicTransport';
import ThemeWrapper from './components/Theme';
import MenuBar from './components/MenuBar';

const App = () => (
  <ThemeWrapper>
    <Router basename="/project">
      <MenuBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/reseptit">
          <Recipes />
        </Route>
        <Route path="/joukkoliikenne">
          <PublicTransport />
        </Route>
      </Switch>
    </Router>
  </ThemeWrapper>
);

// You can think of these components as "pages"
// in your app.

export default App;
