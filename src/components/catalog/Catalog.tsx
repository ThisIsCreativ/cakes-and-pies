import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { PropsWithChildren } from "react";
import { connect } from "react-redux";
import { CATALOG } from "../../constants/catalog";
import { ApplicationState } from "../../types/app";
import { AcceptableFilterType, CatalogCategory, CatalogFilterInfo, CatalogItem } from "../../types/catalog";
import { getCatalogData, sendFilterItem } from "../../actions/catalog";
import Container from "../common/Container";
import Toolbar from "../common/Toolbar";
import Body from "../common/Body";
import LeftSidebar from "../common/LeftSidebar";
import RightSidebar from "../common/RightSidebar";
import ViewWindow from "../common/ViewWindow";
import CatalogList from "./List";
import CatalogFilter from "./Filter";

interface CatalogProps {
    fetched: boolean
    loading: boolean
    items: string[]
    itemById: { [k: string]: CatalogItem }
    filter: CatalogFilterInfo
    getCatalogData: () => void
    changeFilter: (type: AcceptableFilterType, item: string) => void
}

const Catalog: React.FunctionComponent<CatalogProps> = React.memo((props:PropsWithChildren<CatalogProps>) => {
    const [categories, setCategories] = React.useState<CatalogCategory[]>([]);

    React.useEffect(() => {
        if (!props.fetched) {
            props.getCatalogData();
        }
    }, []);

    React.useEffect(() => {
        const categories: CatalogCategory[] = [];
        const categoryIdxByName: { [k: string]: number } = {};
        for (let itemId of props.items) {
            const item = props.itemById[itemId];
            const categoryEnName = item.category.en;
            if (typeof categoryIdxByName[categoryEnName] === "undefined") {
                categories.push({
                    label: item.category,
                    items: []
                });
                categoryIdxByName[categoryEnName] = categories.length - 1;
            }
            const category = categories[categoryIdxByName[categoryEnName]];
            category.items.push(item);
        }
        setCategories(categories);
    }, [props.items, props.itemById]);

    return <Container>
        <Toolbar activeTab="catalog" />
        <Body>
            <LeftSidebar>
                <CatalogFilter
                    loading={props.loading}
                    items={props.items}
                    itemById={props.itemById}
                    categories={categories}
                    filter={props.filter}
                    changeFilter={props.changeFilter}
                />
            </LeftSidebar>
            <ViewWindow>
                <CatalogList
                    loading={props.loading}
                    items={props.items}
                    itemById={props.itemById}
                    categories={categories}
                    filter={props.filter}
                />
            </ViewWindow>
            <RightSidebar></RightSidebar>
        </Body>
    </Container>
});

export default connect((globalState: ApplicationState) => {
    const catalogState = globalState[CATALOG];
    return {
        fetched: catalogState.fetched,
        loading: catalogState.loading,
        items: catalogState.items,
        itemById: catalogState.itemById,
        activeItem: catalogState.activeItem,
        filter: catalogState.filter
    };
}, (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        getCatalogData: () => {
            dispatch(getCatalogData());
        },
        changeFilter: (type: AcceptableFilterType, item: string) => {
            dispatch(sendFilterItem(type, item));
        }
    };
})(Catalog);