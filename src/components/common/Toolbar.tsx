import React, { PropsWithChildren } from "react";
import { FormattedMessage } from 'react-intl';
import { Link } from "react-router-dom";

export default class Toolbar extends React.PureComponent {
    render() {
        return <div className="common-toolbar">
            <ToolbarItem href="/">
                <FormattedMessage
                    id="APP_LINK_HOME"
                    defaultMessage="Home"
                    description="Home link label"
                />
            </ToolbarItem>
            <ToolbarItem href="/catalog">
                <FormattedMessage
                    id="APP_LINK_CATALOG"
                    defaultMessage="Catalog"
                    description="Catalog link label"
                />
            </ToolbarItem>
            <ToolbarItem href="/news">
                <FormattedMessage
                    id="APP_LINK_NEWS"
                    defaultMessage="News"
                    description="News link label"
                />
            </ToolbarItem>
            <ToolbarItem href="/info">
                <FormattedMessage
                    id="APP_LINK_INFO"
                    defaultMessage="Info"
                    description="Info link label"
                />
            </ToolbarItem>
        </div>
    }
}

interface ToolbarItemProps {
    href: string
}
const ToolbarItem = React.memo((props: PropsWithChildren<ToolbarItemProps>) => {
    return <div className="common-toolbar-item">
        <Link to={props.href} >
            {props.children}
        </Link>
    </div>
});