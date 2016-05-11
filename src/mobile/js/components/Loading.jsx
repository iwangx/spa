import "./Loading.scss"
import Mask from "Mask.jsx"

var Loading =React.createClass({

    getInitialState:function(){
        return {
            isShow:false
        }
    },

    getDefaultProps:function(){
        return {
            text: "努力加载中...",
            show: false
        }
    },

    propTypes:{
        text:React.PropTypes.string,
        show:React.PropTypes.bool
    },

    componentDidMount:function(){

    },

    render :function(){
        return (
            <Mask className="loading-mask" show={this.props.show} >
                <div className={classname("loading-content","box",this.state.isShow?"show":"")}>
                    <i />
                    <p>{this.props.text}</p>
                </div>
            </Mask>
        )
    }
});

module.exports=Loading;