/**
 * 应用入口
 * @Philip
 */
import React from 'react'
import ReactDOM from 'react-dom'

import {
    Route,
    BrowserRouter
} from 'react-router-dom'

import { Provider } from 'mobx-react'

import Layout from './layout'
import store from './store'

import './app.less'

ReactDOM.render(
    <Provider {...store}>
        <BrowserRouter>
            <Route
                path="/"
                component={Layout}
            />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
)
