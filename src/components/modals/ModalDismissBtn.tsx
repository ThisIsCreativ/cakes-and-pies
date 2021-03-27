import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../actions/modals";

interface ModalDismissBtnProps {
    modalId: string
}
const ModalDismissBtn: React.FunctionComponent<ModalDismissBtnProps> = React.memo((props) => {
    const dispatch: any = useDispatch();
    const dismissModal = ()=>{
        dispatch(closeModal(props.modalId));
    }
    return <div className="modal-dismiss-btn" onClick={dismissModal}></div>
});

export default ModalDismissBtn;