import { ThunkAction } from "@reduxjs/toolkit";
import shortid from "shortid";
import { SEND_MODAL_OPEN, SEND_MODAL_CLOSE, SEND_MODAL_SHOW, SEND_MODAL_DISMISS, ANIMATION_DURATION } from "../constants/modal";
import { ApplicationAction, ApplicationState } from "../types/app";
import { ModalInfo, SendModalOpen, SendModalClose, ModalOptions, isModalInfo, SendModalShow, SendModalDismiss } from "../types/modals";

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

export function sendModalShow(modalId: string): SendModalShow {
    return {
        type: SEND_MODAL_SHOW,
        payload: {
            id: modalId
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

export function sendModalDismiss(modalId: string): SendModalDismiss {
    return {
        type: SEND_MODAL_DISMISS,
        payload: {
            id: modalId
        }
    }
}

/***********
 * Actions *
 ***********/
export function openModal(payload: ModalInfo | ModalOptions): ThunkAction<void, ApplicationState, {}, ApplicationAction> {
    return async (dispatch, getState) => {
        let modalInfo:ModalInfo;
        if (isModalInfo(payload)) {
            modalInfo = payload;
        } else {
            modalInfo = Object.assign({ id: shortid.generate() }, payload);
        }
        dispatch(sendModalOpen(modalInfo));
        /**TODO: fix to work without timeout */
        window.setTimeout(()=>{
            dispatch(sendModalShow(modalInfo.id));
        }, 1);
    };
}

export function closeModal(id: string): ThunkAction<void, ApplicationState, {}, ApplicationAction> {
    return async (dispatch, getState) => {
        dispatch(sendModalDismiss(id));
        window.setTimeout(()=>{
            dispatch(sendModalClose(id));
        }, ANIMATION_DURATION);
    };
}