import "./Dialog.scss"
import Mask from "Mask.jsx";

var Dialog =React.createClass({

    getInitialState:function(){
        return {
            isShow:false,
            show:false
        }
    },

    getDefaultProps:function(){
        return{
            show:false,
            clickClose:false, //是否点击遮罩层退出,
            clickCloseHandel:function(){},
            className:""
        }
    },

    componentDidMount:function(){

    },

    componentWillReceiveProps:function(nextProps){
        this.setState({show:nextProps.show})
    },

    maskClickHandel:function(e){
        if(this.props.clickClose && e.target.classList.contains("dialog-mask")){
            this.props.clickCloseHandel();
            this.setState({show:false});
        }
    },

    render:function(){
        setTimeout(function(){
            this.setState({isShow:this.state.show});
        }.bind(this),100);

        return (
            <Mask className={this.props.className} onClick={this.maskClickHandel} show={this.state.show}>
                <div className={"dialog-content border-theme "+(this.state.isShow?"show":"")}>
                    {this.props.children}
                </div>
            </Mask>
        )
    }
});

module.exports=Dialog;