import React from 'react';
import './scss/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Root from './components/root/Root';
import Info from './components/info/Info';

interface AppProps {

}
export default class App extends React.PureComponent<AppProps>{
  render() {
    return <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/info">Info</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/info">
          <Info />
        </Route>
        <Route path="/">
          <Root />
        </Route>
      </Switch>
    </div>
  </Router>;
  }
};
