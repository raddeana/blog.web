/**
 * 框架
 * @author Philip
 */
import React, { Component } from 'react'
import {
    Route,
    Switch
} from 'react-router-dom'

import Content from './pages/Content'
import Hack from './pages/Hack'
import User from './pages/User'

export default class Layout extends Component {
    render () {
        return (
            <div class="layout">
                <Switch>
                    <Route path="/" component={Content} />
                    <Route path="/hack" component={Hack} />
                    <Route path="/user" component={User} />
                </Switch>
            </div>
        )
    }
}
