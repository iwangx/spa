var path = require('path');
//入口文件路径
var viewFile=path.join(__dirname,"src/mobile/js/view/");

var config=[
    //首页
    {fileName:"default/index",chunk:"index"}
];

module.exports=config.map(function(item){
    item.file=viewFile;
    return item;
});