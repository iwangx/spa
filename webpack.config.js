var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var dev = process.env.MODE;
var chunkConfig=require("./readModuleConfig");
var AssetsPlugin=require("assets-webpack-plugin");
//是否是需要打包的时候
var isTest =  (dev == "test");
//判断采用哪种模板
var templateUrl=(dev == "server"?"template/server.template.html":"template/test.template.html");
var webpackDefaultConfig = {
    /**
     * Entry points to the project
     * doc: http://webpack.github.io/docs/configuration.html#entry
     *
     * If you pass an object: Multiple entry bundles are created.
     * The key is the chunk name. The value can be a string or an array.
     * 这里是程序的入口，每个页面如果有js都需要在这里配置入口
     */
    entry: {
        'common':['react', 'react-dom','redux','react-redux','redux-thunk','react-router',path.join(__dirname,'src/common/common.js'),'src/store/view/router']
    },

    /**
     * Output
     * doc: http://webpack.github.io/docs/configuration.html#output
     * js输出设置
     */
    output: {
        path: path.join(__dirname,chunkConfig.distFile),
        //这里的路径必须要为绝对地址,否则图片有可能找不到
        publicPath:isTest?"http://test.com/":"",
        filename: isTest?'js/[name]-[chunkhash:8].js':'js/[name].js',
        chunkFilename:isTest?"js/[name]-[chunkhash:8].js": 'js/[name].js'
    },

    /**
     * Bunch of Loaders
     * doc: http://webpack.github.io/docs/using-loaders.html
     * list: http://webpack.github.io/docs/list-of-loaders.html
     * 这里配置加载器
     */
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: __dirname,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.(scss|css)$/,
                loader: 'style!css?camelCase&modules&localIdentName=[local]-[hash:base64:8]!sass?sourceMap=false!autoprefixer'
            }
        ]
    },
    /**
     * Resolve
     * doc: doc: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
        root: __dirname,
        alias: {
            //这里设置别名,其实可以不用设置
            //jsx控件文件夹
        },
        modulesDirectories: ["web_modules", "node_modules", 'bower_components'],
        extensions: ['', '.js', '.json', '.jsx', '.scss', '.css']
    },
    plugins:[
        // Global modules
        // http://webpack.github.io/docs/shimming-modules.html
        //这里将很多要require的可以放在这里直接用
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM:"react-dom",
            FastClick:"fastclick",
            classname:"classname",
            reqwest:"reqwest"
        }),
        new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.CommonsChunkPlugin("common",dev=="test"?"js/common-[hash:8].js":"js/common.js"),
        //公用部分配置，webpack可以根据大小以及使用次数来决定是否生成commonjs
        new webpack.optimize.CommonsChunkPlugin({
            filename: dev=="test"?'js/commons-[hash:8].js':'js/commons.js',
            children: true,
            minSize: 10 * 1000, // 10k
            minChunks: 5
        }),
        new webpack.optimize.DedupePlugin(),
        //在打包或者开本地服务器的时候快速调整
        new HtmlWebpackPlugin({
            title:"123",
            filename:"index.html" ,
            template: templateUrl,
            chunks: ["common"],
            inject:false
        }),
        new AssetsPlugin({
            filename: 'assets.js',
            prettyPrint: false,
            processOutput:function (assets) {
                return 'window.staticMap = ' + JSON.stringify(assets);
            }
        })
    ]
};

module.exports = webpackDefaultConfig;