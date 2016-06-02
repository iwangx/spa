/**
 * Created by iwangx on 16/5/31.
 */
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory=require("react-router").hashHistory;

function routerChange() {
    console.log("change ")
}
ReactDOM.render(
    <Router onUpdate={routerChange} history={hashHistory}>
        <Route path="/" getComponent={function(nextState, cb) {
                require.ensure([], (require) => {
                     cb(null, require("./home/index"))
                })
            }} />
        <Route path="/about" getComponent={function(nextState, cb) {
                require.ensure([], (require) => {
                     cb(null, require("./home/about"))
                })
            }} />
    </Router>,
    document.getElementById('app')
);