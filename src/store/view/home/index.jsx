/**
 * Created by iwangx on 16/3/22.
 */
var bindActionCreators=require("redux").bindActionCreators;
var connect=require("react-redux").connect;
var Link = require('react-router').Link;
var Provider=require("react-redux").Provider;

var action=require("../../actions/home/indexAction");
var store=require("../../store/home/indexStore");
require("../../css/home/app.scss");

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
                <Link to="/about">About</Link>
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
            actions: bindActionCreators(action, dispatch)
        }
    }
)(Index);


module.exports=React.createClass({
    render: function () {
        return (<Provider store={store}><IndexComp/></Provider>)
    }
});