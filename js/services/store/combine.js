import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import scan from './modules/scan';
import spider from './modules/spider';
import intrusion from './modules/intrusion';

export default combineReducers({
    scan,
    spider,
    intrusion
});
