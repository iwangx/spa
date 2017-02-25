/**
 * Created by iwangx on 2017/2/25.
 */

import {createStore,combineAsyncReducers} from 'redux-async-actions-reducers';
import {applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from "../reducers/index"
const reducer = combineAsyncReducers(reducers);

module.exports = function(initialState) {
    var finalCreateStore=applyMiddleware(thunk)(createStore);
    return finalCreateStore(reducer, initialState)
}();