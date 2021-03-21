import { configureStore } from '@reduxjs/toolkit';
import { ApplicationState, ApplicationAction } from '../types/app';
import { INTL } from '../constants/intl';
import { CATALOG } from '../constants/catalog';
import intlReducer from '../reducers/intl';
import catalogReducer from '../reducers/catalog';

export default configureStore<ApplicationState, ApplicationAction>({
    reducer: {
        [INTL]: intlReducer,
        [CATALOG]: catalogReducer
    }
});