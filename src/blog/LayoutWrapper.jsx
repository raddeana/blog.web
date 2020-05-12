/**
 * 框架
 * @author Philip
 */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import {
    Route,
    Switch,
    NavLink,
    withRouter
} from 'react-router-dom'

import { Layout, Menu, Breadcrumb } from 'antd'
const { Header, Content, Footer } = Layout

import Loadable from 'react-loadable'
import breadcrumb from './store/breadcrumb'
import RouterLoading from './RouterLoading'
 
const ContentListComponent = Loadable({
    loader: () => import(/* webpackChunkName: "ContentList" */'./pages/ContentList'),
    loading: RouterLoading
})

const HackComponent = Loadable({
    loader: () => import(/* webpackChunkName: "Hack" */'./pages/Hack'),
    loading: RouterLoading
})

const UserComponent = Loadable({
    loader: () => import(/* webpackChunkName: "User" */'./pages/User'),
    loading: RouterLoading
})

import './LayoutWrapper.less'

@inject('breadcrumb')
@observer
class LayoutWrapper extends Component {

    componentWillReceiveProps (nextProps) {
        let nextPath = nextProps.history.location.pathname
        breadcrumb.updateCurrentNavPath(nextPath)
    }

    render () {
        return (
            <Layout className="layout">
                <Header className="header">
                    <img className="logo" src="https://raddeana-materials.oss-cn-hangzhou.aliyuncs.com/images/logo.png" />
                    <Menu
                        className="nav"
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[this.props.breadcrumb.currentNavKey]}
                    >
                        <Menu.Item key="content-list">
                            <NavLink to="/content-list">
                                内容列表
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="hack">
                            <NavLink to="/hack">
                                黑客
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="user">
                            <NavLink to="/user">
                                用户
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content className="content">
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item>{this.props.breadcrumb.currentNavName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <Switch>
                            <Route path="/content-list" component={ContentListComponent} onEnter={() => { alert() }} />
                            <Route path="/hack" component={HackComponent} />
                            <Route path="/user" component={UserComponent} />
                        </Switch>
                    </div>
                </Content>
                <Footer className="footer">@Philip&apos;s Blog</Footer>
            </Layout>
        )
    }
}

export default withRouter(LayoutWrapper)
