import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { INTL } from './constants/intl';

import { ApplicationState } from './types/app';

//Simple wrapper for IntlProvider to work with redux
export default connect(function (globalState: ApplicationState) {
    return globalState[INTL];
})(IntlProvider);