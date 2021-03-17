import React from "react";
import { FormattedMessage } from 'react-intl';
import Toolbar from "../common/Toolbar";

export default class News extends React.PureComponent {
    render() {
        return <div>
            <Toolbar activeTab="news" />
            Здесь будут новости
        </div>
    }
}