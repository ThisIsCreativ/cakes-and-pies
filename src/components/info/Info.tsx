import React from "react";
import { FormattedMessage } from 'react-intl';
import Container from "../common/Container";
import Toolbar from "../common/Toolbar";
import Body from "../common/Body";
import LeftSidebar from "../common/LeftSidebar";
import RightSidebar from "../common/RightSidebar";
import ViewWindow from "../common/ViewWindow";

export default class Info extends React.PureComponent {
    render() {
        return <Container>
            <Toolbar activeTab="info" />
            <Body>
                <LeftSidebar></LeftSidebar>
                <ViewWindow>
                    Здесь будет инфо
                </ViewWindow>
                <RightSidebar></RightSidebar>
            </Body>
        </Container>
    }
}