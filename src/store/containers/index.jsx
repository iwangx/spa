/**
 * Created by iwangx on 16/3/22.
 */
var bindActionCreators=require("redux").bindActionCreators;
var connect=require("react-redux").connect;
var actions=require("../actions/indexAction");
var indexStore=require("../store/indexStore");
var Provider=require("react-redux").Provider;
var Header = require('../components/indexHeader');
var MainSection = require('../components/indexMainSection');
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
        actions.getAll()
    },

    render() {
        var todos= this.props.todos;
        var actions=this.props.actions;

        return (
            <div>
                <Header addTodo={actions.addTodo} />
                <MainSection todos={todos} actions={actions} />
                <button type="button" style={{"marginTop":20}} onClick={this.click}>点击获取全部</button>
            </div>
        )
    }
});



function mapStateToProps(state) {
    return {
        //通过this.props.todos访问
        todos: state.todo,
        data:state.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //通过this.props.actions访问
        actions: bindActionCreators(actions, dispatch)
    }
}

var IndexComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);




ReactDOM.render(
    <Provider store={store}>
        <IndexComp />
    </Provider>,
    document.getElementById('app')
);