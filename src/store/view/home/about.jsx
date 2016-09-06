/**
 * Created by iwangx on 16/5/31.
 */
import bindRedux  from "../../common/ConnectRedux"
import reducer from "../../reducers/home/about"
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
                <div className="c">

                </div>
            </div>
        )
    }
});

module.exports = bindRedux(About,reducer,action);