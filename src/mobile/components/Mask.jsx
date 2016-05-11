/**
 * Created by iwangx on 16/1/7.
 * 弹出遮罩层
 */

import "./Mask.scss"

var Mask =React.createClass({


    getDefaultProps:function(){
        return {
            show: false,
            className:"",
            onClick:function(){}
        }
    },

    componentDidMount:function(){
        this.app = document.querySelector('#app') || document.body;
        this.node = document.createElement('div');
        this.app.appendChild(this.node);
        this.handleRender();
    },

    componentDidUpdate:function(){
        if(this.props.show){
            document.body.addEventListener('touchmove', this.touchmove, false);
        }else{
            document.body.removeEventListener('touchmove', this.touchmove, false);
        }
        this.handleRender();
    },

    componentWillUnmount () {
        ReactDOM.unmountComponentAtNode(this.node);
        this.app.removeChild(this.node);
    },

    handleRender () {
        var winHeight=document.documentElement.getBoundingClientRect().height>document.documentElement.clientHeight?document.documentElement.getBoundingClientRect().height:document.documentElement.clientHeight;

        ReactDOM.render(
            <div onClick={this.props.onClick}  style={{height:winHeight}} className={classname("dialog-mask",this.props.show?"":"dialog-mask-hide",this.props.className)} >
                {this.props.children}
            </div>
            , this.node);
    },

    touchmove:function(event){
        event.preventDefault();
    },

    render:function(){
        return React.DOM.noscript();
    }
});

module.exports=Mask;