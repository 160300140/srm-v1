import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './Config/routes';
import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <RouteWithSubRoutes key={index} {...route} />
        ))}
      </Switch>
    </Router>
  )
}

function RouteWithSubRoutes(route) {
  console.log(route);
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  )
}

export default App;



/* import Home from "./Pages/Home";
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App__header" > HOME FOR FUTURE LANDING PAGE </header>
        <Home />
      </div>
    </BrowserRouter>
  );
}

 */
