import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';


import middleware from './middleware';
import reducer from './combine';

let finalCreateStore = compose(applyMiddleware.apply(this, middleware))(createStore);;

export const store = finalCreateStore(reducer);