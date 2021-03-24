import React from 'react';
import './scss/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css';
import './css/catalog.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Index from './components/common/Index';
import NotFound from './components/common/NotFound';
import Info from './components/info/Info';
import Catalog from './components/catalog/Catalog';
import News from './components/news/News';

interface AppProps {

}
export default class App extends React.PureComponent<AppProps>{
  render() {
    return <Router>
      <Switch>
        <Route path="/" exact={true}>
          <Index />
        </Route>
        <Route path="/info" exact={true}>
          <Info />
        </Route>
        <Route path="/catalog" exact={true}>
          <Catalog />
        </Route>
        <Route path="/news" exact={true}>
          <News />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </Router>;
  }
};
