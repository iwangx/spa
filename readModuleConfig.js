/**
 * Created by iwangx on 16/5/10.
 * 读取不同命令的配置文件
 */

var app =process.env.app;
var chunkConfig=require("./config/"+app+"Config.js");
module.exports=chunkConfig;