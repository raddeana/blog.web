import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Blogpost extends Component {
    static propTypes = {}

    static contextTypes = {}

    static defaultProps = {}

    getStyles() {}

    render() {
        return (
            <div className="pokemon-wrapper rainbow">
                <div className="pokemon">
                    <div className="pikachu"></div>
                </div>
            </div> 
        );
    }
}
