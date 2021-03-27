import { createReducer } from "@reduxjs/toolkit";
import {
    SEND_MODAL_OPEN,
    SEND_MODAL_CLOSE,
    SEND_MODAL_SHOW,
    SEND_MODAL_DISMISS,
    MODAL_STATE_OPEN,
    MODAL_STATE_SHOW,
    MODAL_STATE_DISMISS
} from "../constants/modal";
import {
    ModalInfo,
    ModalsState,
    SendModalOpen,
    SendModalClose,
    SendModalShow,
    SendModalDismiss
} from "../types/modals";

const initialState: ModalsState = {
    stack: [],
    stateById: {}
}

function receiveModalOpen(state: ModalsState, payload: { modalInfo: ModalInfo }) {
    state.stack.push(payload.modalInfo);
    state.stateById[payload.modalInfo.id] = MODAL_STATE_OPEN;
}

function receiveModalShow(state: ModalsState, payload: { id: string }) {
    state.stateById[payload.id] = MODAL_STATE_SHOW;
}

function receiveModalClose(state: ModalsState, payload: { id: string }) {
    for (let i = 0; i < state.stack.length; ++i) {
        if (state.stack[i].id === payload.id) {
            state.stack.splice(i, 1);
            delete (state.stateById[payload.id]);
            return;
        }
    }
}

function receiveModalDismiss(state: ModalsState, payload: { id: string }) {
    state.stateById[payload.id] = MODAL_STATE_DISMISS;
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(SEND_MODAL_OPEN, (state, action) => receiveModalOpen(state, (action as SendModalOpen).payload))
        .addCase(SEND_MODAL_SHOW, (state, action) => receiveModalShow(state, (action as SendModalShow).payload))
        .addCase(SEND_MODAL_CLOSE, (state, action) => receiveModalClose(state, (action as SendModalClose).payload))
        .addCase(SEND_MODAL_DISMISS, (state, action) => receiveModalDismiss(state, (action as SendModalDismiss).payload))
});