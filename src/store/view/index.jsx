/**
 * Created by iwangx on 16/3/22.
 */
var bindActionCreators=require("redux").bindActionCreators;
var connect=require("react-redux").connect;
var actions=require("../actions/indexAction");
var indexStore=require("../store/indexStore");
var Provider=require("react-redux").Provider;
require("../css/app.css");
var store=indexStore();


var Index =React.createClass({

    getInitialState:function(){
        return {
            filter: "123"
        }
    },

    click:function(){
        var actions=this.props.actions;
        actions.getAll();
    },

    render() {
        var todos= this.props.todo;
        var actions=this.props.actions;
        console.log("状态改变");
        return (
            <div>
                <button type="button" style={{"marginTop":20}} onClick={this.click}>点击获取全部</button>
                {"this:"+JSON.stringify(todos)}
            </div>
        )
    }
});

var IndexComp = connect(
    function(state){
        return {
            //通过this.props.todos访问
            todos: state.todos,
            data:state.data
        }
    },
    function(dispatch){
        return {
            //通过this.props.actions访问
            actions: bindActionCreators(actions, dispatch)
        }
    }
)(Index);

ReactDOM.render(
    <Provider store={store}>
        <IndexComp />
    </Provider>,
    document.getElementById('app')
);