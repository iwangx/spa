var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var config = require('./config.json');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var dev =process.env.MODE;
var entryPage=path.join(__dirname, config.base + '/js/pages/');
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
        'common':['react', 'react-dom',path.join(__dirname, config.base + '/js/util/common')]
    },

    /**
     * Output
     * doc: http://webpack.github.io/docs/configuration.html#output
     * js输出设置
     */
    output: {
        path: path.join(__dirname,dev!="server"?config.build:""),
        publicPath:"",
        chunkFilename:dev=="test"?"js/[name]-[chunkhash:8].js": 'js/[name].js',
        filename: dev=="test"?'js/[name]-[chunkhash:8].js':'js/[name].js'
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
            },{
                test: /\.(scss|css)$/,
                include: __dirname,
                loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
            }]
    },
    /**
     * Resolve
     * doc: doc: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
        root: __dirname,
        alias: {
            //这里设置别名
            //jsx控件文件夹
            controlJs: path.join(__dirname, config.base + '/js/components'),
            //jsx页面文件夹
            pageJs:path.join(__dirname, config.base + '/js/pages'),
            //js工具文件
            utilJs:path.join(__dirname, config.base + '/js/util'),
            //页面css文件夹
            pageCss: path.join(__dirname, config.base + '/css/pages'),
            //控件css文件夹
            controlCss:path.join(__dirname, config.base + '/css/components'),
            //工具css文件夹
            utilCss:path.join(__dirname, config.base + '/css/util'),
            //iamages
            images:path.join(__dirname, config.base + '/images')
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
            reqwest:"reqwest",
            Reflux:"reflux"
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin("common",dev=="test"?"js/common-[hash:8].js":"js/common.js"),
        //公用部分配置，webpack可以根据大小以及使用次数来决定是否生成commonjs
        new webpack.optimize.CommonsChunkPlugin({
            filename: dev=="test"?'js/commons-[hash:8].js':'js/commons.js',
            children: true,
            minSize: 10 * 1000, // 10k
            minChunks: 5
        }),
        new webpack.optimize.DedupePlugin(),
        //css配置
        new ExtractTextPlugin(dev=="test"?'css/[name]-[contenthash:8].css':'css/[name].css')
    ]
};

var templateList=[
    //首页
    {fileName:"default/index",chunk:"index"},
    //选择场次
    {fileName:"item/show",chunk:"chooseSession"},
    //选择分区
    {fileName:"item/show_area",chunk:"choosePartition"},
    //选择座位
    {fileName:"item/area_seat",chunk:"chooseSeat"},
    //项目明细
    {fileName:"item/detail",chunk:"detail"},
    //订单确认
    {fileName:"order/confirm",chunk:"confirm",title:"支付订单"},
    //订单页面
    {fileName:"order/order",chunk:"order"},
    //订单详情
    {fileName:"order/orderDetail",chunk:"orderDetail",title:"订单详情"},
    //关注页面
    {fileName:"default/focus",chunk:"focus"},
    //预约页面
    {fileName:"default/subscribe",chunk:"subscribe"},
    //错误页面
    {fileName:"error/index",chunk:"error",title:"错误"},
    //支付成功
    {fileName:"order/success",chunk:'success',title:"下单成功"},
    //活动专题-普通
    {fileName:"active/activity",chunk:'activity',title:""},
    //活动专题-刮刮卡
    {fileName:"active/scratchCard",chunk:'scratchCard',title:""},
];

//判断采用哪种模板
var templateUrl=(dev == "server"?"template/server.template.html":"template/test.template.html");

templateList.forEach(function(item,i){

    webpackDefaultConfig.entry[item.chunk]=entryPage+item.chunk;

    webpackDefaultConfig.plugins.push(new HtmlWebpackPlugin({
        title:item.title || "",
        filename: dev =="server" ?item.chunk + ".html":item.fileName+".php",
        template:  templateUrl,
        chunks: ["common",item.chunk],
        inject:false
    }));
});

module.exports = webpackDefaultConfig;