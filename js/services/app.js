import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import createHashHistory from 'history/createHashHistory';
import Main from './main';

render(<Main />, document.getElementsByTagName('app')[0]);
