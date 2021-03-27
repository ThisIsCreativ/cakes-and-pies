import { Action } from "@reduxjs/toolkit";
import { MODAL_DETAILS, SEND_MODAL_OPEN, SEND_MODAL_CLOSE } from "../constants/modal";

export interface ModalsState {
    stack: ModalInfo[]
}

export interface CommonModalInfo {
    id: string
}

export interface DetailsModalOptions {
    type: typeof MODAL_DETAILS
    itemId: string
}
export interface DetailsModalInfo extends CommonModalInfo, DetailsModalOptions {
}

export function isDetailsModal(modal: ModalInfo): modal is DetailsModalInfo {
    return modal.type === MODAL_DETAILS;
}

export type ModalType = typeof MODAL_DETAILS;

export type ModalOptions = DetailsModalOptions;
export type ModalInfo = DetailsModalInfo;

export function isModalInfo(modal: ModalInfo | ModalOptions): modal is ModalInfo {
    return typeof (modal as ModalInfo).id === "string";
}

/***********
 * Actions *
 ***********/
export interface SendModalOpen extends Action {
    type: SEND_MODAL_OPEN,
    payload: {
        modalInfo: ModalInfo
    }
}

export interface SendModalClose extends Action {
    type: SEND_MODAL_CLOSE,
    payload: {
        id: string
    }
}

export type ModalsAction = SendModalOpen | SendModalClose;