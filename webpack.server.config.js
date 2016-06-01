var webpack = require('webpack');
var path = require('path');
//var config = require('./config.json');
var webpackDefaultConfig=require("./webpack.config");
var chunkConfig=require("./readModuleConfig");
var ip=require("./util").getIPAddress();

var webpackConfig = {
    /**
     * Server Configuration options
     * doc: http://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer:{
        contentBase: path.join(__dirname, chunkConfig.distFile),    //Relative directory for base of server
        hot: true,          //Live-reload
        host:ip|| "127.0.0.1",
        inline: true,
        port:30001,    //Port Number
        // historyApiFallback: true,
        stats: {
            colors: true,
            cached: false,
            exclude: [/node_modules[\\\/]/]
        }
    },

    /**
     * Devtool
     * doc: http://webpack.github.io/docs/configuration.html#devtool
     */
    devtool: 'source-map',

    /**
     * switch loader to debug mode
     * doc: http://webpack.github.io/docs/configuration.html#devtool
     */
    debug: true,

    module:{
        loaders: [
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'url?limit=20480&name=../../images/[name].[ext]'//20k
            },
            {
                test: /\.(ttf|eot|svg|woff[1-9]?)$/,
                loader: "file?name=../../fonts/[name].[ext]"
            },
            {
                test: /\.jpeg?$/,
                loader: 'file?name=../../images/[name]-[hash:8].[ext]'//20k
            }
        ]
    },

    /**
     * Plugin
     * doc: http://webpack.github.io/docs/using-plugins.html
     * list: http://webpack.github.io/docs/list-of-plugins.html
     */
    plugins: [
        //Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        //Allows error warnings but does not stop compiling. Will remove when eslint is added
        new webpack.NoErrorsPlugin()
    ]
};

webpackDefaultConfig.devServer=webpackConfig.devServer;
webpackDefaultConfig.devtool=webpackConfig.devtool;
webpackDefaultConfig.module.loaders=webpackConfig.module.loaders.concat(webpackDefaultConfig.module.loaders);
webpackDefaultConfig.plugins=webpackDefaultConfig.plugins.concat(webpackConfig.plugins);
webpackDefaultConfig.debug=true;
module.exports = webpackDefaultConfig;
