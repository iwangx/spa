/**
 * Created by iwangx on 16/5/31.
 */
import {Router,Route,hashHistory} from "react-router"
import  {Provider} from "react-redux"
import  store from "../store/index"
function routerChange() {
    console.log("change ")
}
ReactDOM.render(
    <Provider store={store}>
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
        </Router>
    </Provider>
    ,
    document.getElementById('app')
);