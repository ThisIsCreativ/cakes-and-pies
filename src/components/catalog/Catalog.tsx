import { ThunkDispatch } from "@reduxjs/toolkit";
import React from "react";
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { getCatalogData } from "../../actions/catalog";
import { CATALOG } from "../../constants/catalog";
import { ApplicationState } from "../../types/app";
import Toolbar from "../common/Toolbar";

interface CatalogProps {
    fetched: boolean
    getCatalogData: () => void
}

class Catalog extends React.PureComponent<CatalogProps> {

    constructor(props: CatalogProps) {
        super(props);

        if(!props.fetched) {
            props.getCatalogData();
        }
    }

    render() {
        return <div>
            <Toolbar activeTab="catalog" />
            Здесь будет каталог
        </div>
    }
}

export default connect((globalState:ApplicationState) => {
    const catalogState = globalState[CATALOG];
    return {
        fetched: catalogState.fetched
    };
}, (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        getCatalogData: ()=>{
            dispatch(getCatalogData());
        }
    };
})(Catalog);