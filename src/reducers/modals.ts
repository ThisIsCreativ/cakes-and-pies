import { createReducer } from "@reduxjs/toolkit";
import { SEND_MODAL_OPEN, SEND_MODAL_CLOSE } from "../constants/modal";
import { ModalInfo, ModalsState, SendModalOpen, SendModalClose } from "../types/modals";

const initialState: ModalsState = {
    stack: []
}

function receiveModalOpen(state: ModalsState, payload: { modalInfo: ModalInfo }) {
    state.stack.push(payload.modalInfo);
}

function receiveModalClose(state: ModalsState, payload: { id: string }) {
    for(let i = 0; i < state.stack.length; ++i) {
        if(state.stack[i].id === payload.id) {
            state.stack.splice(i, 1);
            return;
        }
    }
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(SEND_MODAL_OPEN, (state, action) => receiveModalOpen(state, (action as SendModalOpen).payload))
        .addCase(SEND_MODAL_CLOSE, (state, action) => receiveModalClose(state, (action as SendModalClose).payload))
});