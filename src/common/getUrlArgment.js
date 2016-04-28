/**
 * Created by jiangtao on 16/1/10.
 */
var  getUrlarguments = function(name){
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)","i"));
    if(result == null || result.length < 1) return "";
    return decodeURI(result[1]);
};

module.exports=getUrlarguments;
