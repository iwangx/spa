/*
* mobile配置
*
*
* */

var path = require('path');
//入口文件路径
var viewFile=path.join(__dirname,"../src/store/view/");
//php view文件路径
var phpFile = "../views";
//入口列表
var chunkList=[
    //首页
    {fileName:"default/index",chunk:"index"}
];

var config={
    //入口解析后带路径的地址
    chunkList:(function(){
        return chunkList.map(function(item){
            item.file=viewFile;
            return item;
        })
    })(),
    //打包到哪里
    distFile:'dist/store',
    phpFile:phpFile
};

module.exports= config;