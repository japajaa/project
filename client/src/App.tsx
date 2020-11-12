import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Recipes from './components/Recipes';
import Home from './components/Home';
import PublicTransport from './components/PublicTransport';
import ThemeWrapper from './components/Theme';

// tälle sivulle linkit joukkoliikenne-sivulle ja reseptisivuille ja vanhaan reseptiwikiin
// single-page application? mitenkäs se pitikään mennä? :D
// js vai typescript?
// prettieriin linttaus save

const App = () => (
  <ThemeWrapper>
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/reseptit">Reseptit</Link>
          </li>
          <li>
            <Link to="/joukkoliikenne">Joukkoliikenne</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
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
      </div>
    </Router>
  </ThemeWrapper>
);

// You can think of these components as "pages"
// in your app.

export default App;
