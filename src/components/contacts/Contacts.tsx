import React from "react";
import Body from "../common/Body";
import Container from "../common/Container";
import LeftSidebar from "../common/LeftSidebar";
import RightSidebar from "../common/RightSidebar";
import Toolbar from "../common/Toolbar";
import ViewWindow from "../common/ViewWindow";

const Contacts = React.memo((props) => <Container>
    <Toolbar activeTab="contacts" />
    <Body>
        <LeftSidebar></LeftSidebar>
        <ViewWindow>
            Контакты
        </ViewWindow>
        <RightSidebar></RightSidebar>
    </Body>
</Container>);

export default Contacts;