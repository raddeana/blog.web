import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Layout from '../../containers/layout';
import { Table } from 'antd';

let List = [];

export default class Scan extends Component {
    static propTypes = {};
    static contextTypes = {};
    static defaultProps = {};

    static columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
    }, {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
    }];

    componentDidMount () {};
    getStyles () {};

    render() {
        return (
            <div className="view view-scan">
                <Layout>
                    <Table dataSource={List} columns={columns} />
                </Layout>
            </div> 
        );
    }
}
