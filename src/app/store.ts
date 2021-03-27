import { configureStore } from '@reduxjs/toolkit';
import { ApplicationState, ApplicationAction } from '../types/app';
import { INTL } from '../constants/intl';
import { MODALS } from '../constants/modal';
import { CATALOG } from '../constants/catalog';
import intlReducer from '../reducers/intl';
import modalsReducer from '../reducers/modals';
import catalogReducer from '../reducers/catalog';

export default configureStore<ApplicationState, ApplicationAction>({
    reducer: {
        [INTL]: intlReducer,
        [MODALS]: modalsReducer,
        [CATALOG]: catalogReducer
    }
});