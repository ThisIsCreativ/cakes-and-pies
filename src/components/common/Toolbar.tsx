import React, { PropsWithChildren } from "react";
import { FormattedMessage } from 'react-intl';
import { Link } from "react-router-dom";

interface ToolbarProps {
    activeTab?: "main" | "catalog" | "news" | "info"
}

export default class Toolbar extends React.PureComponent<ToolbarProps> {
    render() {
        return <div className="common-toolbar">
            <div className="common-logo">
                <div className="common-logo-image">
                    <img src="resources/images/logo_small.jpg" alt="logo" />
                </div>
                <div className="common-logo-text">
                    <img src="resources/images/logo_text.svg" alt="text" />
                </div>
            </div>
            <ToolbarItem href="/" active={this.props.activeTab === "main"}>
                <FormattedMessage
                    id="APP_LINK_HOME"
                    defaultMessage="Home"
                    description="Home link label"
                />
            </ToolbarItem>
            <ToolbarItem href="/catalog" active={this.props.activeTab === "catalog"}>
                <FormattedMessage
                    id="APP_LINK_CATALOG"
                    defaultMessage="Catalog"
                    description="Catalog link label"
                />
            </ToolbarItem>
            <ToolbarItem href="/news" active={this.props.activeTab === "news"}>
                <FormattedMessage
                    id="APP_LINK_NEWS"
                    defaultMessage="News"
                    description="News link label"
                />
            </ToolbarItem>
            <ToolbarItem href="/info" active={this.props.activeTab === "info"}>
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
    active: boolean
}
const ToolbarItem = React.memo((props: PropsWithChildren<ToolbarItemProps>) => {
    let className = "common-toolbar-item";
    if (props.active) {
        className += " active";
    }
    return <div className={className}>
        <Link to={props.href} >
            {props.children}
        </Link>
    </div>
});