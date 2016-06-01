var webpack = require('webpack');
var webpackDefaultConfig=require("./webpack.config");
var PRODUCT_CONFIG = {

    module:{
        loaders: [
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'url?limit=20480&name=../images/[name]-[hash:8].[ext]'//20k
            },
            {
                test: /\.(ttf|eot|svg|woff[1-9]?)$/,
                loader: "file?name=../fonts/[name]-[hash:8].[ext]"
            },
            {
                test: /\.jpeg?$/,
                loader: 'file?name=../../images/[name]-[hash:8].[ext]'//20k
            }
        ]
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        //js压缩参数
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            beautify:false,
            comments:false
        }),
        //定义环境变量production,定义后就不不把提示的东西打包进去
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'}
        })
    ]
};

webpackDefaultConfig.module.loaders=PRODUCT_CONFIG.module.loaders.concat(webpackDefaultConfig.module.loaders);
webpackDefaultConfig.plugins=webpackDefaultConfig.plugins.concat(PRODUCT_CONFIG.plugins);
module.exports = webpackDefaultConfig;
