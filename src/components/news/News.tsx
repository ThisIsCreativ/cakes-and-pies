import React from "react";
import { FormattedMessage } from 'react-intl';
import Container from "../common/Container";
import Toolbar from "../common/Toolbar";
import Body from "../common/Body";
import LeftSidebar from "../common/LeftSidebar";
import RightSidebar from "../common/RightSidebar";
import ViewWindow from "../common/ViewWindow";

export default class News extends React.PureComponent {
    render() {
        return <Container>
            <Toolbar activeTab="news" />
            <Body>
                <LeftSidebar></LeftSidebar>
                <ViewWindow>
                    Здесь будут новости
                </ViewWindow>
                <RightSidebar></RightSidebar>
            </Body>
        </Container>
    }
}