/**
 * Created by iwangx on 16/3/22.
 */
var createStore=require("redux").createStore;
var indexReducer=require('../../reducers/home/about');
var applyMiddleware=require("redux").applyMiddleware;
var thunkMiddleware=require("redux-thunk").default;
module .exports = function(initialState) {
    var finalCreateStore=applyMiddleware(thunkMiddleware)(createStore)
    return finalCreateStore(indexReducer, initialState)
}();

