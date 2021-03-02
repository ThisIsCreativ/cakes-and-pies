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
import Index from './components/common/Index';
import NotFound from './components/common/NotFound';

interface AppProps {

}
export default class App extends React.PureComponent<AppProps>{
  render() {
    return <Router>
      <Switch>
        <Route path="/" exact={true}>
          <Index />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </Router>;
  }
};
