import React from "react";
import { FormattedMessage } from 'react-intl';

export default class NotFound extends React.PureComponent {
    render() {
        return <div>
            <FormattedMessage
                id="APP_PAGE_NOT_FOUND"
                defaultMessage="Sorry, page you are looking for is not exists"
                description="Sorry, page you are looking for is not exists"
            />
        </div>
    }
}