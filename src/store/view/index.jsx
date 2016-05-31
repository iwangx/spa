/**
 * Created by iwangx on 16/3/22.
 */
var bindActionCreators=require("redux").bindActionCreators;
var connect=require("react-redux").connect;
var Provider=require("react-redux").Provider;


var actions=require("../actions/indexAction");
var indexStore=require("../store/indexStore");
var store=indexStore();


require("../css/app.css");



var Index =React.createClass({

    getInitialState:function(){
        return {
            filter: "123"
        }
    },


    click:function(){
        var action=this.props.actions;
        action.getAll();
    },

    render() {
        var todos= this.props.todo;
        var action=this.props.actions;
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
    function(state) {
        return {
            //通过this.props.todos访问
            todo: state.todo
        }
    },
    function(dispatch) {
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