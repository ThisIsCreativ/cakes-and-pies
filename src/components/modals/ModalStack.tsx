import { ThunkDispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import { MODALS } from "../../constants/modal";
import { ApplicationState } from "../../types/app";
import { isDetailsModal, ModalInfo } from "../../types/modals";
import DetailsModal from "./templates/DetailsModal";

interface ModalStackProps {
    stack: ModalInfo[]
}
class ModalStack extends React.PureComponent<ModalStackProps> {

    render() {
        return this.props.stack.map((modalInfo, idx) => <Modal key={idx} info={modalInfo} />);
    }
}

interface ModalProps {
    info: ModalInfo
}
const Modal:React.FunctionComponent<ModalProps> = React.memo((props: ModalProps)=>{
    if(isDetailsModal(props.info)){
        return <DetailsModal info={props.info} />
    }
    return null;
});

export default connect((globalState: ApplicationState) => {
    const modalsState = globalState[MODALS];
    return {
        stack: modalsState.stack
    };
}, (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
    };
})(ModalStack);