import React, { Component } from 'react';
import PropTypes from 'prop-types';

import customTheme from './customTheme';



export default function withMaterialUI(ComposedComponent) {
    return class MaterialUI extends Component {

        static childContextTypes = {
            muiTheme: PropTypes.object
        }

        getChildContext() {
            return {
                muiTheme: {}
            };
        }

        render() {
            const { context, ...other } = this.props;
            return <ComposedComponent {...other} />;
        }
    };
}
