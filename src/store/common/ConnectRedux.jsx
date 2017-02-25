/**
 * Created by iwangx on 16/8/10.
 */
import  {connect,Provider} from "react-redux"
import {bindActionCreators,createStore,applyMiddleware,combineReducers} from "redux"
var thunkMiddleware=require("redux-thunk").default;

//绑定
function bindRedux(ReactComponent,action) {
    var store = function(initialState) {
        var finalCreateStore=applyMiddleware(thunkMiddleware)(createStore);
        return finalCreateStore(reducer, initialState)
    }();
    var ReduxComponent = connect(
        function(state) {
            return {
                //通过this.props.todos访问
                todo: state.todo
            }
        },
        function(dispatch) {
            return {
                //通过this.props.actions访问
                actions: bindActionCreators(action, dispatch)
            }
        }
    )(ReactComponent);
    return React.createClass({
        render:function () {
            return <Provider store={store}>
                <ReduxComponent />
            </Provider>
        }
    });
}

module.exports=bindRedux;