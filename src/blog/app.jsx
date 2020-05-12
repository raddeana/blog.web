/**
 * 应用入口
 * @Philip
 */
import React from 'react'
import ReactDOM from 'react-dom'

import {
    Route,
    Redirect,
    HashRouter
} from 'react-router-dom'

import { Provider } from 'mobx-react'

import LayoutWrapper from './LayoutWrapper'
import store from './store'

import './app.less'

ReactDOM.render(
    <Provider {...store}>
        <HashRouter>
            <Route
                path="/"
                component={LayoutWrapper}
            />
            <Redirect path="/" to="/content-list" />
        </HashRouter>
    </Provider>,
    document.getElementById('app')
)

if (module.hot) {
    module.hot.accept()
}
