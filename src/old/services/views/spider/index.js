import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Layout from '../../containers/layout';

export default class Spider extends Component {
    static propTypes = {}

    static contextTypes = {}

    static defaultProps = {}

    getStyles() {}

    render() {
        return (
            <div className="view view-spider">
                <Layout></Layout>
            </div> 
        );
    }
}
