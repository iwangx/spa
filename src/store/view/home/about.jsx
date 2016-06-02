/**
 * Created by iwangx on 16/5/31.
 */
var bindActionCreators=require("redux").bindActionCreators;
var connect=require("react-redux").connect;
var action=require("../../actions/home/aboutAction");
var Provider=require("react-redux").Provider;

var store=require("../../store/home/aboutStore");
import style from  '../../css/home/about.scss';

var About=React.createClass({

    getInitialState:function(){
        return {
            
        }
    },


    click:function(){
        var actions=this.props.actions;
        actions.test();
    },

    render() {
        var todos= this.props.todo;
        var actions=this.props.actions;
        return (
            <div className={classname(style.style,style.back)}  onClick={this.click}>
                {todos.name}
            </div>
        )
    }
});

var AboutComp = connect(
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
)(About);

module.exports=React.createClass({
    render: function () {
        return (<Provider store={store}><AboutComp/></Provider>)
    }
});