import React from "react";
import { FormattedMessage } from 'react-intl';
import Toolbar from "../common/Toolbar";

export default class Catalog extends React.PureComponent {
    render() {
        return <div>
            <Toolbar activeTab="catalog" />
            Здесь будет каталог
        </div>
    }
}