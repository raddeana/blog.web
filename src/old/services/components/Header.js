import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
    handleClickMenuItem (target) {
        location.href = target;
    }
  
    render() {
        return (
            <div></div>
        );
    }
}
