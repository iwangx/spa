/**
 * Created by iwangx on 16/5/31.
 */
var bindActionCreators=require("redux").bindActionCreators;
var connect=require("react-redux").connect;
var action=require("../../actions/home/aboutAction");

import style from  '../../css/home/about.scss';

console.log(style);

var About=React.createClass({

    getInitialState:function(){
        return {
            filter: "123"
        }
    },


    click:function(){
        var actions=this.props.actions;
        actions.test();
    },

    render() {
        var todos= this.props.todo;
        var actions=this.props.actions;
        //console.log("状态改变");
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
            todo: state.about.todo
        }
    },
    function(dispatch) {
        return {
            //通过this.props.actions访问
            actions: bindActionCreators(action, dispatch)
        }
    }
)(About);

module.exports=AboutComp;