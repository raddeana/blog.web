import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import Header from '../components/header';
import Footer from '../components/footer';

class Layout extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ])
    }

    getStyles () {
        return {
            main: {
                paddingTop: 10
            }
        };
    }

  render () {
    const styles = this.getStyles();

    return (
        <div className="layout">
            <Header />
            <main style={styles.main}>
                {this.props.children}
            </main>            
            <Footer />
        </div>
    );
  }
}

export default connect()(Layout);
