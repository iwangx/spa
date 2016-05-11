
import "./Alert.scss"
import Mask from "./Mask.jsx"


var Alert =React.createClass({

    getInitialState:function(){
        return {
            isShow:false
        }
    },

    getDefaultProps:function(){
        return {
            text: "",
            show: false,
            ok:function(){},
            cancel:false,
            title:false,
            onMaskClick:function(){},
            clickClose:false
        }
    },

    propTypes:{
        text:React.PropTypes.string,
        show:React.PropTypes.bool,
        ok:React.PropTypes.func
    },

    componentDidMount:function(){

    },

    maskClickHandel:function(e){
        if(this.props.clickClose && e.target.classList.contains("dialog-mask")){
            this.props.onMaskClick();
        }
    },

    render :function(){
        setTimeout(function(){
            this.setState({isShow:this.props.show});
        }.bind(this),100);

        return (
            <Mask onClick={this.maskClickHandel} show={this.props.show}>
                <div className={classname("alert-content",this.state.isShow && "show",this.props.title && "has-title")}>
                    {this.props.title && <p className="alert-title">{this.props.title}</p> }
                    {this.props.text ? <p className="alert-text">{this.props.text}</p>:this.props.children}
                    <div className="box alert-buttons">
                        <button onClick={this.props.ok} className="flex">{this.props.okValue||"确定"}</button>
                        {this.props.cancel?<button onClick={this.props.cancel} className="flex alert-cancel">{this.props.cancelValue||"取消"}</button>:""}
                    </div>
                </div>
            </Mask>
        )
    }
});

module.exports=Alert;