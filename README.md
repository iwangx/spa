##文件夹解释

	├── mobileConfig.js                      #mobile项目的配置文件
	├── package.js                           #打包后执行的文件
	├── package.json
	├── readModuleConfig.js                  #读取配置信息的文件
	├── src
	│   ├── active                           #活动项目的文件夹，类似与php下的app下的单个项目
	│   │   ├── css
	│   │   └── js
	│   ├── common                           #公共资源存放
	│   ├── mobile                           #活动项目的文件夹，类似与php下的app下的单个项目
	│   │   ├── css
	│   │   ├── images                       #图片存放
	│   │   └── js
	│   │       ├── action                   #action
	│   │       ├── components               #各种控件
	│   │       ├── store                    #store
	│   │       └── view                     #页面入口
	│   └── store                            #店铺文件夹                     
	│       ├── css
	│       └── js
	├── template                             #html模板
	├── test                                 #单元测试
	├── webpack.config.js                    
	├── webpack.production.config.js
	└── webpack.server.config.js
	
	
##运行
	npm run mobileServer
	运行本地webpack-dev-server
	
	npm run mobileTest
	运行打包提交测试
	
	以后会增加php的配置
	
##mock
[mockjs](http://mockjs.com/)
