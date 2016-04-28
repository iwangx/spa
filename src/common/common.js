/**
 * Created by iwangx on 16/1/7.
 */
require("./common.scss");
//引入全球化包
//var I18N=require("utilJs/i18n");
////设置默认语言.不设或者错误就是中文
//I18N.lang("en");
//window.I18N=I18N;
//
//var dialog=require("utilJs/dialog");
//
//window.dialog=dialog;

window.addEventListener("load",function(){
    document.body.classList.add("body-show");
});

FastClick.attach(document.body);
