import { bindActionCreators } from 'redux';
import * as ScanActions from './store/modules/scan';
import * as SpiderActions from './store/modules/spider';
import * as IntrusionActions from './store/modules/intrusion';

export function bootstrap({ dispatch }) {
    const scanActions = bindActionCreators(ScanActions, dispatch);
    const spiderActions = bindActionCreators(SpiderActions, dispatch);
    const intrusionActions = bindActionCreators(IntrusionActions, dispatch);

    return () => {};
}
