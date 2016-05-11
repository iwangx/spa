/**
 * Created by iwangx on 16/5/11.
 */

var createStore=require("redux").createStore;
var indexReducer=require('../reducers/index');
var applyMiddleware=require("redux").applyMiddleware;
var thunkMiddleware=require("redux-thunk").default;
module .exports = function(initialState) {
    var finalCreateStore=applyMiddleware(thunkMiddleware)(createStore)
    //const store = finalCreateStore(reducer)
    return finalCreateStore(indexReducer, initialState)
};