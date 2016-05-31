/**
 * Created by iwangx on 16/5/31.
 */
var Provider=require("react-redux").Provider;
var combineReducers=require("redux").combineReducers;
var createStore=require("redux").createStore;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var hashHistory=require("react-router").hashHistory;
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import index from '../reducers/index'
import about from '../reducers/about'

const store = createStore(
    combineReducers({ index,about, routing: routerReducer})
);

const history = syncHistoryWithStore(hashHistory, store);

var Index = require("./index");
var About=require("./about");

ReactDOM.render(
    <Provider key="provider" store={store}>
        <Router history={history}>
            <Route path="/" component={Index} />
            <Route path="/about" component={About} />
        </Router>
    </Provider>,
    document.getElementById('app')
);