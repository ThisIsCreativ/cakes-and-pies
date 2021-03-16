import React from "react";
import { FormattedMessage } from 'react-intl';
import Toolbar from "./Toolbar";

export default class Index extends React.PureComponent {
    render() {
        return <div className="index-page common-container">
            <Toolbar />
            <FormattedMessage
                id="APP_GREETING"
                defaultMessage="Here you will be able to get yourself handmade cake"
                description="Greeting to welcome the user to the app"
            />
            [Популярное]
        </div>
    }
}