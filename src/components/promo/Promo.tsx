import React from "react";
import Body from "../common/Body";
import Container from "../common/Container";
import LeftSidebar from "../common/LeftSidebar";
import RightSidebar from "../common/RightSidebar";
import Toolbar from "../common/Toolbar";
import ViewWindow from "../common/ViewWindow";

const Promo = React.memo((props) => <Container>
    <Toolbar activeTab="promo" />
    <Body>
        <LeftSidebar></LeftSidebar>
        <ViewWindow>
            Акции
        </ViewWindow>
        <RightSidebar></RightSidebar>
    </Body>
</Container>);

export default Promo;