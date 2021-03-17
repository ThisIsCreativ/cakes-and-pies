import React from "react";
import { FormattedMessage } from 'react-intl';
import Toolbar from "../common/Toolbar";

export default class Info extends React.PureComponent {
    render() {
        return <div>
            <Toolbar activeTab="info" />
            Здесь будет инфо
        </div>
    }
}