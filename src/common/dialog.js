/**
 * Created by iwangx on 16/3/16.
 */

var count=0;


function dialog(opt){
    count++;
    var id = opt.id = opt.id || (new Date - 0) + count;
    return dialog.list[id] = new dialog.create(opt,count);
}

dialog.get = function (id) {
    return id === undefined
        ? dialog.list
        : dialog.list[id];
};

dialog.list = {};

dialog.create=function(options,count){

    var defaultOption={
        ok:false,
        cancel:false,
        okValue:"确定",
        cancelValue:"取消",
        // 自定义按钮
        button: [],

        content:"",

        innerHTML: '<div i="dialog" class="dialog-con">' +
            '<div i="content"></div>' +
            '<div i="button" class="box">' +
            '</div>' +
        '</div>'
    };
    var _this=this;

    options = this.extend(defaultOption,options);
    this.options = options;
    this.destroyed = false;
    this.__popup= document.createElement("div");
    this.__popup.style.display="none";
    this.__popup.innerHTML=options.innerHTML;
    this.__popup.classList.add("dialog-mask");

    document.body.appendChild(this.__popup);

    if (options.ok) {
        options.button.push({
            id: 'ok',
            value: options.okValue,
            callback: options.ok
        });
    }

    if (options.cancel) {
        options.button.push({
            id: 'cancel',
            value: options.cancelValue,
            callback: options.cancel
        });
    }

    for(var name in options){
        if(typeof _this[name]=== 'function'){
            _this[name](options[name]);
        }else{
            _this[name]=options[name];
        }
    }


    function resize(){
        var winHeight=document.documentElement.getBoundingClientRect().height>document.documentElement.clientHeight?document.documentElement.getBoundingClientRect().height:document.documentElement.clientHeight;
        _this.__popup.style.height=winHeight+"px";
    }

    window.addEventListener("resize",resize);
    resize();
};

dialog.create.prototype={
    open: false,
    extend:function ( child ,parent) {
        child = child || {};
        for(var i in parent) {
            if(parent.hasOwnProperty(i)) {
                //检测当前属性是否为对象
                if(typeof parent[i] === "object") {
                    //如果当前属性为对象，还要检测它是否为数组
                    //这是因为数组的字面量表示和对象的字面量表示不同
                    //前者是[],而后者是{}
                    child[i] = (Object.prototype.toString.call(parent[i]) === "[object Array]") ? [] : {};
                    //递归调用extend
                    this.extend(child[i],parent[i]);
                } else {
                    child[i] = parent[i];
                }
            }
        }
        return child;
    },
    show:function(){
        if (this.destroyed) {
            return this;
        }
        var popup = this.__popup;

        if(!this.__ready){
            //如果有遮罩层
            if (this.modal) {
                popup.classList.add("dialog-modal");
            }
        }

        this.open = true;
        popup.classList.add('mask-show');
        popup.style.display="block";
        this._$("dialog").classList.add("show");
        document.body.addEventListener('touchmove', this.touchmove, false);
        return this;
    },
    /** 显示模态浮层。参数参见 show() */
    showModal: function () {
        this.modal = true;
        return this.show.apply(this, arguments);
    },
    /** 关闭浮层 */
    close: function (result) {
        if (!this.destroyed && this.open) {
            if (result !== undefined) {
                this.returnValue = result;
            }
            this.__popup.classList.remove("mask-show");
            this.__popup.style.display="none";
            this.open = false;
            this.__dispatchEvent('close');
            document.body.removeEventListener('touchmove', this.touchmove, false);
        }
        return this;
    },

    touchmove:function(e){
        e.preventDefault();
    },

    /** 销毁浮层 */
    remove: function () {
        if (this.destroyed) {
            return this;
        }

        // 从 DOM 中移除节点
        this.__popup.parentNode.removeChild(this.__popup);

        this.__dispatchEvent('remove');
        document.body.removeEventListener('touchmove', this.touchmove, false);
        for (var i in this) {
            delete this[i];
        }

        return this;
    },
    addEventListener: function (type, callback) {
        this.__getEventListener(type).push(callback);
        return this;
    },
    removeEventListener: function (type, callback) {
        var listeners = this.__getEventListener(type);
        for (var i = 0; i < listeners.length; i ++) {
            if (callback === listeners[i]) {
                listeners.splice(i--, 1);
            }
        }
        return this;
    },
    // 获取事件缓存
    __getEventListener: function (type) {
        var listener = this.__listener;
        if (!listener) {
            listener = this.__listener = {};
        }
        if (!listener[type]) {
            listener[type] = [];
        }
        return listener[type];
    },


    // 派发事件
    __dispatchEvent: function (type) {
        var listeners = this.__getEventListener(type);

        if (this['on' + type]) {
            this['on' + type]();
        }

        for (var i = 0; i < listeners.length; i ++) {
            listeners[i].call(this);
        }
    },
    _$: function (i) {
        return this.__popup.querySelector('[i=' + i + ']');
    },
    // 触发按钮回调函数
    _trigger: function (id) {
        var fn = this.callbacks[id];

        return typeof fn !== 'function' || fn.call(this) !== false ?
            this.close() : this;
    },
    /**
     * 设置内容
     * @param    {String, HTMLElement}   内容
     */
    content: function (html) {
        var $content = this._$('content');
        // HTMLElement
        if (typeof html === 'object') {
            $content.innerHTML="";
            $content.appendChild(html);
        } else {
            $content.innerHTML=html;
        }
        return this;
    },

    button: function (args) {
        args = args || [];
        var _this=this;
        var html = '';
        var number = 0;
        this.callbacks = {};
        if (typeof args === 'string') {
            html = args;
            number ++;
        } else {
            args.forEach(function(val, i){
                var id = val.id = val.id || val.value;
                var style = '';
                _this.callbacks[id] = val.callback;

                number ++;

                html +=
                    '<button class="flex background-theme" '
                    + ' type="button"'
                    + ' i-id="' + id + '"'
                    + '>'
                    +   val.value
                    + '</button>';

                _this._$('button').addEventListener("click",function(e){
                    if(e.target.getAttribute("i-id") ==  id){
                        _this._trigger(id);
                    }
                    e.preventDefault();
                });
            });
        }

        this._$('button').innerHTML =html;
        return this;
    }

};

dialog.tip=function(msg,ok,cancel){
  var para={
      content:"<p class='dialog-con-text'>"+msg+"</p>",
      ok:ok || true,
      cancel:cancel || false,
      id:"dialog.tip"
  };
    if(dialog.get("dialog.tip")){
        dialog.get("dialog.tip").remove();
    }
    dialog(para).showModal();
};

dialog.loading=function(msg){
    var para={
        content:"<div class='loading-content box'><i></i><p>"+msg+"</p></div>",
        id:"dialog.loading"
    };
    if(dialog.get("dialog.loading")){
        dialog.get("dialog.loading").remove();
    }
    dialog(para).show()._$("dialog").style.backgroundColor="rgba(0,0,0,0)";
};

dialog.loadingClose=function(){
    if(dialog.get("dialog.loading")){
        dialog.get("dialog.loading").remove();
    }
};

module.exports=dialog;