import { ThunkDispatch } from "@reduxjs/toolkit";
import React from "react";
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { getCatalogData } from "../../actions/catalog";
import { CATALOG } from "../../constants/catalog";
import { ApplicationState } from "../../types/app";
import Container from "../common/Container";
import Toolbar from "../common/Toolbar";
import Body from "../common/Body";
import LeftSidebar from "../common/LeftSidebar";
import RightSidebar from "../common/RightSidebar";
import ViewWindow from "../common/ViewWindow";
import { CatalogItem } from "../../types/catalog";
import CatalogList from "./List";

interface CatalogProps {
    fetched: boolean
    loading: boolean
    items: string[]
    itemById: { [k: string]: CatalogItem }
    getCatalogData: () => void
}

class Catalog extends React.PureComponent<CatalogProps> {

    constructor(props: CatalogProps) {
        super(props);

        if (!props.fetched) {
            props.getCatalogData();
        }
    }

    render() {
        return <Container>
            <Toolbar activeTab="catalog" />
            <Body>
                <LeftSidebar></LeftSidebar>
                <ViewWindow>
                    <CatalogList
                        loading={this.props.loading}
                        items={this.props.items}
                        itemById={this.props.itemById}
                    />
                </ViewWindow>
                <RightSidebar></RightSidebar>
            </Body>
        </Container>
    }
}

export default connect((globalState: ApplicationState) => {
    const catalogState = globalState[CATALOG];
    return {
        fetched: catalogState.fetched,
        loading: catalogState.loading,
        items: catalogState.items,
        itemById: catalogState.itemById,
        activeItem: catalogState.activeItem
    };
}, (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        getCatalogData: () => {
            dispatch(getCatalogData());
        }
    };
})(Catalog);