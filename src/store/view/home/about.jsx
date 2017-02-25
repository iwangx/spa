/**
 * Created by iwangx on 16/5/31.
 */

import  {connect} from "react-redux"
import {bindActionCreators} from "redux"
//import bindRedux  from "../../common/ConnectRedux"
//import reducer from "../../reducers/home/about"
import action from "../../actions/home/aboutAction"
import style from  '../../css/home/about.scss'

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
            <div className={classname(style.style,style.back,style.aboutA)}  onClick={this.click}>
                {todos.name}
                <div className="c"></div>
            </div>
        )
    }
});



module.exports = connect(
    function(state) {
        return {
            //通过this.props.todos访问
            todo: state.about
        }
    },
    function(dispatch) {
        return {
            //通过this.props.actions访问
            actions: bindActionCreators(action, dispatch)
        }
    }
)(About);