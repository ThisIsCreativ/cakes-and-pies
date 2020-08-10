import React from 'react';
import './scss/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css';
import { FormattedMessage } from 'react-intl';

interface AppProps {

}
export default class App extends React.PureComponent<AppProps>{
  render() {
    return (
      <div>
        <FormattedMessage
          id="APP_GREETING"
          description="Greeting to welcome the user to the app"
          defaultMessage="Here you will be able to get yourself handmade cake"
        />
      </div>
    );
  }
};
