import React from "react";
import { FormattedMessage } from 'react-intl';
import Container from "./Container";
import Toolbar from "./Toolbar";
import Body from "./Body";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import ViewWindow from "./ViewWindow";

export default class Index extends React.PureComponent {
    render() {
        return <Container>
            <Toolbar activeTab="main" />
            <Body>
                <LeftSidebar></LeftSidebar>
                <ViewWindow>
                    <FormattedMessage
                        id="APP_GREETING"
                        defaultMessage="Here you will be able to get yourself handmade cake"
                        description="Greeting to welcome the user to the app"
                    />
                    [Популярное]
                </ViewWindow>
                <RightSidebar></RightSidebar>
            </Body>
        </Container>
    }
}