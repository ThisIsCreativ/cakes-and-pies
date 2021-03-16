import React from "react";
import { FormattedMessage } from 'react-intl';
import Toolbar from "./Toolbar";

export default class NotFound extends React.PureComponent {
    render() {
        return <div className="common-container">
            <Toolbar />
            <FormattedMessage
                id="APP_PAGE_NOT_FOUND"
                defaultMessage="Sorry, page you are looking for is not exists"
                description="Sorry, page you are looking for is not exists"
            />
        </div>
    }
}