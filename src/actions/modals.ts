import { ThunkAction } from "@reduxjs/toolkit";
import shortid from "shortid";
import { SEND_MODAL_OPEN, SEND_MODAL_CLOSE } from "../constants/modal";
import { ApplicationAction, ApplicationState } from "../types/app";
import { ModalInfo, SendModalOpen, SendModalClose, ModalOptions, isModalInfo } from "../types/modals";

/*****************
 * Plain actions *
 *****************/
export function sendModalOpen(modalInfo: ModalInfo): SendModalOpen {
    return {
        type: SEND_MODAL_OPEN,
        payload: {
            modalInfo: modalInfo
        }
    }
}

export function sendModalClose(id: string): SendModalClose {
    return {
        type: SEND_MODAL_CLOSE,
        payload: {
            id: id
        }
    }
}

/***********
 * Actions *
 ***********/
export function openModal(payload: ModalInfo | ModalOptions): ThunkAction<void, ApplicationState, {}, ApplicationAction> {
    return async (dispatch, getState) => {
        if (isModalInfo(payload)) {
            dispatch(sendModalOpen(payload));
            return;
        }
        dispatch(sendModalOpen(Object.assign({ id: shortid.generate() }, payload)));
    };
}

export function closeModal(id: string): ThunkAction<void, ApplicationState, {}, ApplicationAction> {
    return async (dispatch, getState) => {
        dispatch(sendModalClose(id));
    };
}