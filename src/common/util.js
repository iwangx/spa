

var PubSub = {handlers: {}};
PubSub.on = function(eventType, handler) {
    if (!(eventType in this.handlers)) {
        this.handlers[eventType] = [];
    }
    this.handlers[eventType].push(handler);
    return this;
};

PubSub.emit = function(eventType) {
    var handlerArgs = Array.prototype.slice.call(arguments, 1);
    if(!this.handlers[eventType]) return ;
    for (var i = 0; i < this.handlers[eventType].length; i++) {
        this.handlers[eventType][i].apply(this, handlerArgs);
    }
    return this;
};

module.exports.PubSub=PubSub;

function getReqCode(code){
    var defaultCode={
        200:false,
        201:"",
        202:"",
        20400:"抱歉, 项目未在该渠道售卖",
        20401:"业务方法调用出现错误",
        20402:"场次不存在",
        20403:"场次已隐藏，不能恢复销售",
        20404:"场次已过期，不能恢复销售",
        20405:"场次票价锁日志",
        20406:"缺少配送方式",
        20407:"当前项目未上架",
        20408:"税号不足以补充以前已生成的没有税号的订单",
        20409:"当前没有可以进行售卖的场次",
        20410:"演出时间错误",
        20411:"当前场次不可售",
        20500:"保存上下架信息失败",
        20501:"保存适用渠道或经销商信息失败",
        20420:"库存初始化失败",
        20421:"更新库存信息失败",
        //20500:"项目不存在",
        //20501:"当前项目已下架，暂时无法购票",
        20502:"当前项目已下架，暂时无法购票",
        20503:"当前项目未上架，暂时无法购票",
        20600:"用户id，项目id, 评论内容均不能为空",
        20601:"查询的数据过大，请重设查询记录数",
        20602:"状态不合法",
        20603:"存在不合法的票价id"
    };
    return defaultCode[code];
}

module.exports.getReqCode=getReqCode;

function reqTimeout(req,time){
    var timeOut = setTimeout(function(){
         req.abort();
    },15000);
    req.always(function(){
        clearTimeout(timeOut);
        PubSub.emit('loading',{
            text:'',
            show:false
        })
    });
}

module.exports.reqTimeout=reqTimeout;

function Navigator(){
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS && !isAndroid){
        return 'ios';
    } else if(isAndroid && !isiOS){
        return 'Android';
    };
};

module.exports.Navigator=Navigator;


var pageError = function(initJsData){
    var code    = initJsData.error.code,
        message = initJsData.error.message,
        url     = location.href,
        okVal   = "";
    if(code == 20900){
        url   = initJsData.navHome;
        okVal = '返回首页';
    } else if(code == 20901){
        url   = initJsData.navHome + initJsData.showErrorRedirect;
        okVal = '重选场次';
    };
    return {
        url:url,
        okVal:okVal,
        message:message
    };
};

module.exports.PageError=pageError;


function hasClass(obj, cls) {
   return obj.classList.contains(cls);
};

module.exports.hasClass=hasClass;

function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.classList.add(cls);
}

module.exports.addClass=addClass;

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
       cls.classList.remove(cls);
    };
};

module.exports.removeClass=removeClass;

function pagePreventDefault(el,type){
   window.onload = function(){
       if(el == document){
           el.addEventListener(type,function(e){
               e.preventDefault();
           });
       } else {
           document.querySelectorAll(el).addEventListener(type,function(e){
               e.preventDefault();
           });
       };
   };
};

module.exports.PagePreventDefault=pagePreventDefault;