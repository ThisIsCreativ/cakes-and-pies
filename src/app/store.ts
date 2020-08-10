import { configureStore } from '@reduxjs/toolkit';
import { ApplicationState, ApplicationAction } from '../types/app';
import { INTL } from '../constants/intl';
import intlReducer from '../reducers/intl';

export default configureStore<ApplicationState, ApplicationAction>({
    reducer: {
        [INTL]: intlReducer
    }
});