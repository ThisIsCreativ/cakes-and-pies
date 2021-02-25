import React from "react";
import { FormattedMessage } from 'react-intl';

export default class Root extends React.PureComponent {
    render() {
        return <div>
            <FormattedMessage
                id="APP_GREETING"
                description="Greeting to welcome the user to the app"
                defaultMessage="Here you will be able to get yourself handmade cake"
            />
        </div>
    }
}