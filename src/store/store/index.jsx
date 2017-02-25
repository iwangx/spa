/**
 * Created by iwangx on 2017/2/25.
 */

import {applyMiddleware, createStore,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from "../reducers/index"

const reducer = combineReducers(reducers);

module.exports = function(initialState) {
    var finalCreateStore=applyMiddleware(thunk)(createStore);
    return finalCreateStore(reducer, initialState)
}();