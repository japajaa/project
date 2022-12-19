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
import RogainingPage from './components/RogainingPage';

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
        <Route path="/rogaining">
          <RogainingPage />
        </Route>
      </Switch>
    </Router>
  </ThemeWrapper>
);

export default App;
