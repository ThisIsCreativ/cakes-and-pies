import React from 'react';
import './scss/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css';
import './css/scrollbar.css';
import './css/modals.css';
import './css/catalog.css';
import './css/responsive.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ModalStack from './components/modals/ModalStack';
import Index from './components/common/Index';
import Catalog from './components/catalog/Catalog';
import News from './components/news/News';
import Promo from './components/promo/Promo';
import Info from './components/info/Info';
import Contacts from './components/contacts/Contacts';
import NotFound from './components/common/NotFound';

interface AppProps {

}
export default class App extends React.PureComponent<AppProps>{
  render() {
    return <>
      <ModalStack />
      <Router>
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
          <Route path="/promo" exact={true}>
            <Promo />
          </Route>
          <Route path="/news" exact={true}>
            <News />
          </Route>
          <Route path="/contacts" exact={true}>
            <Contacts />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>;
  }
};
