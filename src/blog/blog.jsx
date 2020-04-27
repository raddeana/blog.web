/**
 * 应用入口
 * @Philip
 */
import React from 'react'
import ReactDOM from 'react-dom'

import { 
    Route,
    IndexRoute,
    browserHistory,
    Router
} from 'react-router'

import { Provider } from 'mobx-react'

import Content from './pages/Content'
import Hack from './pages/Hack'
import User from './pages/User'
import store from './store'

import './blog.less';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route
                path="/"
                component={App}
            >
                <IndexRoute component={Content} />
                <Route path="/hack" component={Hack} />
                <Route path="/user" component={User} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);