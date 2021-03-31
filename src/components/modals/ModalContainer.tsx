import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../actions/modals";
import { MODALS } from "../../constants/modal";
import { ApplicationState } from "../../types/app";
import { ModalState } from "../../types/modals";


interface ModalContainerProps {
    modalId: string
    className?: string
}
const ModalContainer: React.FunctionComponent<ModalContainerProps> = React.memo((props) => {
    const modalState: ModalState = useSelector<ApplicationState, ModalState>(state => state[MODALS].stateById[props.modalId]);
    const dispatch: any = useDispatch();
    const dismissModal = () => {
        dispatch(closeModal(props.modalId));
    }
    return <div className="modal-container">
        <div className="modal-background"></div>
        <div className="modal-scroller" onClick={dismissModal}>
            <div className="d-flex flex-fill"></div>
            <div className={`modal-card ${modalState} ${props.className}`} onClick={event => event.stopPropagation()}>
                {props.children}
            </div>
            <div className="d-flex flex-fill"></div>
        </div>
    </div>
});

export default ModalContainer;