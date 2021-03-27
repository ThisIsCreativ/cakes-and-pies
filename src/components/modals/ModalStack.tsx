import { ThunkDispatch } from "@reduxjs/toolkit";
import React from "react";
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { MODALS } from "../../constants/modal";
import { ApplicationState } from "../../types/app";

interface ModalStackProps {
}

class ModalStack extends React.PureComponent<ModalStackProps> {

    render() {
        return null;
    }
}

export default connect((globalState: ApplicationState) => {
    const modalsState = globalState[MODALS];
    return {
    };
}, (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
    };
})(ModalStack);