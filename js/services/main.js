import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { store } from './store';
import withMaterialUI from './decorators/withMaterialUI';
import * as hooks from './hooks';

import Portal from './views/portal';
import Scan from './views/scan';
import Spider from './views/spider';
import Intrusion from './views/intrusion';

hooks.bootstrap(store)();

const history = createBrowserHistory();

@withMaterialUI
export default class Main extends Component {
    render () {
        return (
            <div className="">
                <Provider store={store}>
                    <Router history={history}>
                        <div className="page page-services">
                            <Route path='/services' exact component={Portal} />
                            <Route path='/services/scan' component={Scan}/>
                            <Route path='/services/spider' component={Spider}/>
                            <Route path='/services/intrusion' component={Intrusion}/>
                        </div>
                    </Router>
                </Provider>
            </div>
        );
    }
};
