/**
 * Created by iwangx on 16/5/10.
 * 读取不同命令的配置文件
 */

var app =process.env.app;
var chunkConfig;

switch (app){
    case "mobile":
        chunkConfig=require("./mobileConfig.js");
        break;
    case "store":
        chunkConfig=require("./storeConfig.js");
        break;
}


module.exports=chunkConfig;