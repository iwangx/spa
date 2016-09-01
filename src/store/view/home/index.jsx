/**
 * Created by iwangx on 16/3/22.
 */
import bindRedux from "../../common/ConnectRedux"
import reducer from "../../reducers/home/index"
import action from "../../actions/home/indexAction"
import { Link } from  "react-router"
import style from  '../../css/home/about.scss'
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

module.exports=bindRedux(Index,reducer,action);