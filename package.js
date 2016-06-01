/**
 * Created by iwangx on 16/5/10.
 * 打包完成后的回调
 */

var chunkConfig=require("./readModuleConfig");

var fs = require( 'fs' ),
    path=require('path');
var dev =process.env.MODE;
/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var copy = function( src, dst ){
    var fileList=fs.readdirSync(src);
    fileList.forEach(function(item,i){
        var _src = src + '/' + item,
            _dst = dst + '/' + item,
            readable, writable;
        var stat = fs.lstatSync(_src);
        if(stat.isFile()){
            // 创建读取流
            readable = fs.createReadStream( _src );
            // 创建写入流
            writable = fs.createWriteStream( _dst );
            // 通过管道来传输流
            readable.pipe( writable );
        }else if( stat.isDirectory() ){
            exists( _src, _dst, copy );
        }
    });
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback ){
    if(!fs.existsSync(dst)){
        var pathtmp;
        dst.split(path.sep).forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                fs.mkdirSync(pathtmp);
                callback( src, dst );
            }
        });
    }else{
        callback( src, dst );
    }
};

//删除文件夹
var deletePath = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deletePath(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

//复制images目录
exists( 'images', 'dist/store/images', copy );
deletePath("images");
