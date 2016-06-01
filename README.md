##文件结构
    
    ├── README.md
    ├── config                                   #环境配置，以后的一些环境配置都可以放这里
    │   └── storeConfig.js
    ├── dist                                     #压缩打包后的目录
    │   └── store
    │       ├── index.html
    │       └── js
    ├── package.js                               #打包执行完成后的一些后续操作
    ├── package.json               
    ├── readModuleConfig.js                      #读取单个配置信息
    ├── src
    │   ├── common                               #公用部分
    │   │   ├── common.js                        #公用js、
    │   │   ├── common.scss                      #公用scss
    │   │   ├── reset.scss                       #reset scss
    │   │   └── size.scss                        #自适应scss
    │   └── store                                #单个项目的文件夹
    │       ├── actions                          #action 放这里
    │       │   └── home
    │       │       ├── aboutAction.jsx
    │       │       └── indexAction.jsx
    │       ├── components                        #公用控件
    │       │   ├── Alert.jsx
    │       │   ├── Alert.scss
    │       │   ├── Dialog.jsx
    │       │   ├── Dialog.scss
    │       │   ├── Loading.jsx
    │       │   ├── Loading.scss
    │       │   ├── Mask.jsx
    │       │   ├── Mask.scss
    │       │   └── size.scss
    │       ├── const                              #常量
    │       │   └── home
    │       │       ├── IndexTypes.jsx
    │       │       └── aboutTypes.jsx
    │       ├── css                                #css
    │       │   └── home
    │       │       ├── about.scss
    │       │       └── app.scss
    │       ├── images                             #图片
    │       │   ├── README.md
    │       │   └── test.jpeg
    │       ├── reducers                           #reducer
    │       │   └── home
    │       │       ├── about.jsx
    │       │       └── index.jsx
    │       ├── store                              #store
    │       │   └── home
    │       │       ├── aboutStore.jsx
    │       │       └── indexStore.jsx
    │       └── view                               #单个页面存放
    │           ├── home
    │           │   ├── about.jsx
    │           │   └── index.jsx
    │           └── router.jsx                     #路由
    ├── template                                   #html模板
    │   ├── server.template.html
    │   └── test.template.html
    ├── util.js                                    #node工具类
    ├── webpack.config.js                          #打包公共配置
    ├── webpack.production.config.js               #打包配置
    └── webpack.server.config.js                   #热更新服务器配置
##执行
	npm install
	npm run server #开启热更新服务器，访问:http://内网ip:30001/index.html
	npm run test   #打包操作输出到dist下的store文件夹
 
 
