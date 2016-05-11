/**
 * Created by iwangx on 16/1/11.
 */
require("controlCss/DataLazyload");
var DataLazyload=React.createClass({
    getDefaultProps:function(){
        return {
            url:"",
            loadCallback:function(){},
            data:{},
            load:true
        }
    },

    getInitialState:function(){
        return {
            showLoading:false,
            url:this.props.url,
            data:this.props.data,
            load:this.props.load
        }
    },

    shoudLoading:true,

    componentDidMount:function(){
        var _this=this;
        document.addEventListener("scroll",function(e){
            //加载更多数据
            if((document.body.clientHeight-document.documentElement.clientHeight- window.scrollY) <80){
                if(_this.shoudLoading && _this.state.load){
                    _this.shoudLoading=false;
                    _this.getData();
                    console.log("加载更多")
                }
            }
        });
    },

    componentWillReceiveProps:function(nextProps){
        if(nextProps.url!=this.state.url){
            this.setState({url:nextProps.url});
        }
        if(!this.equalObject(nextProps.data,this.state.data)){
            this.setState({data:nextProps.data});
        }
        this.setState({load:nextProps.load});
    },

    getData:function(){
        var _this =this;
        _this.shoudLoading=false;
        _this.setState({showLoading:true});
        reqwest({
            url:this.state.url,
            type: 'json',
            data:this.state.data,
            method:"post",
            error: function (err) {
                _this.setState({showLoading:false});
            },
            success:function(data){
                if(data.code == 200){
                    _this.props.loadCallback(data);
                }else if(data.code == 302){
                    location.href=data.data;
                }
            },
            complete:function(){
                _this.shoudLoading=true;
                _this.setState({showLoading:false});
            }
        });
    },

    /**
     * 对象比较
     * @param o1
     * @param o2
     * @return
     */
    equalObject: function (o1, o2) {
        if (typeof o1 != typeof o2)return false;
        if (o1 == null || o2 == null)return o1 == o2;
        if (typeof o1 == 'object') {
            for (var o in o1) {
                if (typeof o2[o] == 'undefined')return false;
                if (!this.equalObject(o1[o], o2[o]))return false;
            }
            return true;
        } else {
            return o1 == o2;
        }
    },

    render:function(){
        return (
            <div className="data-lazy-load">
                {this.props.children}
                {this.state.showLoading?<div className="box data-lazy-wrip"><i className="data-lazy-loading" /><p>加载中...</p></div>:""}
            </div>
        )
    }
});


module .exports=DataLazyload;