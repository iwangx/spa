/**
 * Created by iwangx on 16/3/15.
 * 多语言包
 * 公用的一些语言可以提示可以放在这里面
 *
 */
function Ji18n(){
    //默认的语言
    this.default={
        'zh-cn':{
            ok:"确定",
            cancel:"取消",
            loading:"加载中..."
        },
        'zh-tw':{
            ok:"確定",
            cancel:"取消",
            loading:"加載中..."
        },
        en:{
            ok:"ok",
            cancel:"cancel",
            loading:"loading..."
        }
    }
}

Ji18n.prototype={
    //设置语言包,不传就是中文en英文,zh-cn中文,zh-tw繁体
    lang:function(langStr){
        if((typeof langStr) !== "string"){
            alert("请输入字符串!");
            return false;
        }
        this.curLang=langStr.toLowerCase();
    },
    curLang:"zh-cn",
    //注册新的语句
    r:function(obj){
        if((typeof obj)!= "object"  ){
            alert("请传入一个object");
            return false;
        }
        if(obj instanceof Array){
            alert("请传入一个object");
            return false;
        }
        for(var k in obj){
            //如果传入的语言在默认的里面有了,循环下级替换和添加
            if(this.default[k.toLowerCase()]){
                var defaultItem=this.default[k.toLowerCase()];
                for(var key in obj[k]){
                    if(defaultItem[key]){
                        defaultItem[key]=obj[k][key];
                    }else{
                        defaultItem[key]=obj[k][key];
                    }
                }
            }else{
                this.default[k.toLowerCase()]=obj[k];
            }
        }
    },
    //转换返回字符串,传入设置的key
    t:function(key){
        var langPackage=this.default[this.curLang] || this.default["zh-cn"] ;
        return langPackage[key];
    }
};


var I18N= new Ji18n();


module.exports=I18N;