/**
 * Created by jiangtao on 15/12/16.
 */
(function(root){
    var createjs    = require('@wepiao/createjs'),
        Iscroll     = require('iscroll/build/iscroll-zoom.js'),
        SeatPath    = require('utilJs/seatPath');
    var CreateSeat  =  function(container,options){
        if(!container || typeof container != 'object') return;
        this.container       = container;
        this.canvasContainer = new createjs.Stage(container);
        this.myScroll        = null;
        this.selectSeat      = null;
        this.salce           = 0 ;
        this.selectNumber    = 0;
        this.initUnlockSeat  = [];
        this.timeOut         = null;
        this.timeOuter       = null;
        this.selectTime      = new Date().getTime();
        this.selectState     = true;
        this.mapShowNumber   = 1500;
        var opt              = {
            seatData:[],
            selectSeatColor:'#f40',
            initSeatColor:'#ececec',
            send:function(){},
            canvasParent:'body',
            maxCol:0,
            debug:false,
            minMapWrap:'body',
            maxRow:0,
            minMap:null,
            maxSelectNumber:0,
            selectMove:false,
            selectBefore:function(){},
            selectMAxTips:function(){}
        };
        var opts             = this.mergeOptions(opt,options);
        this.options         = opts;
        this.options.minMap ? this._setMapSize() : "";
        this._init();
        setTimeout(function(){
            this.options.minMap ? this._setMiniMap() : "";
        }.bind(this),100)
        this.totalSeat();
    };
    CreateSeat.prototype  = {
        //主入口
        _init:function(){
            var $this = this;

            createjs.Touch.enable(this.canvasContainer,true,false);//开启touch事件

            $this._setContainer();

            $this._initSeat();

            $this.container.addEventListener('touchstart',function(){
                $this.selectState = true;
            });
        },
        convertCanvasToImage:function(canvas) {
            var base64 = canvas.toDataURL("image/png");
            return base64;
        },
        totalSeat:function(){
            if(!this.options.debug) return;
            alert(this.options.seatData.length + '个座位');
        },
        mergeOptions:function(oldObj,newObj){
            for(var key in oldObj){
                oldObj[key] = newObj[key];
            };
            return newObj;
        },
        _setMiniMap:function(){
            if(!this._getRunState()) return;
            var mapEl                   = this.options.minMap;
            mapEl.style.backgroundImage = 'url('+this.convertCanvasToImage(this.container)+')';
        },
        _setMapSize:function(){
            if(!this._getRunState()) return;
            var maxHeight   = this.options.canvasParent.getAttribute('data-maxheight');
            var   ps        = (this.options.maxRow * (39 + 8)) / (this.options.maxCol * (42 + 8)),
                  width     = this.options.canvasParent.clientWidth,
                  setHeight = width * ps  + 10;
            if(setHeight - 10 >= maxHeight) setHeight = maxHeight;
            this.options.canvasParent.style.height = setHeight +'px'; //设置canvs父元素的高度
            var mapEl  = this.options.minMap,
                height = this.options.canvasParent.clientHeight,
                scale  =  0.4;
            mapEl.style.height = height + 'px';
            mapEl.style.width  = width  + 'px';

            new Iscroll(this.options.minMapWrap,{
                zoom: true,
                wheelAction: 'zoom',
                disableTouch:true,
                zoomMin: scale,
                zoomMax: scale,
                startZoom: scale
            });

            setTimeout(function(){
                this.removeClass(this.options.minMapWrap,'visi-none');
            }.bind(this),100);

        },
        _setContainer:function(){
            var $this      = this;
            var width      = $this.options.maxCol * (42 + 8),
                height     = $this.options.maxRow * (39 + 8);
            var container  = this.container;
            container.setAttribute( 'width' , width );
            container.setAttribute( 'height' , height );
            var parentWidth  =  $this.options.canvasParent.clientWidth,
                parentHeight =  $this.options.canvasParent.clientHeight,
                min          =  (width > height ? parentWidth / width : parentHeight /height) || 0;
            if(min > 1) min = 1;

            var mapState = true;
            if(!this._getRunState()) mapState = false;
            $this.myScroll = new Iscroll($this.options.canvasParent, {
                zoom: true,
                scrollX: true,
                scrollY: true,
                mouseWheel: true,
                wheelAction: 'zoom',
                zoomMin: min,
                zoomMax: 1,
                startZoom: min,
                freeScroll:true,
                indicators: (this.options.minMap && mapState )? {
                    el: this.options.minMap,
                    interactive: true,
                } : null
                //preventDefault:false
            });

            if(this.options.minMap){
               $this._initMap();
            };

            if(min == 1) return;

            var zoomX = (width) / 2 ,
                zoomY = (height) / 2 ;

            $this.myScroll.on('zoomStart',function(){
                $this.salce = this.scale;
            });

            $this.myScroll.on('zoomEnd',function(){
                $this.salce = this.scale;
            });

            if(min >= .5) return;

            setTimeout(function(){
                $this.goToCenter(zoomX,zoomY,0.5,$this.options.selectMove,2000,1000);
            },500);

        },
        _getRunState:function(){
            if(this.options.seatData.length >= this.mapShowNumber) {
                if(this.Navigator().u  == 'ios' && this.Navigator().v <= 4) return false;
                if( this.Navigator().u == 'Android') return false;
            } else {
                if(this.options.seatData.length >= 900){
                    if(this.Navigator().u  == 'ios' && this.Navigator().v <= 4) return false;
                };
            };
            return true;
        },
        _initMap:function(){
            var $this = this;

            setTimeout(function(){
                this.showMinMap(true,2000);
                this.showMinMap(false,2500);
            }.bind(this),500);

            this.options.minMap.addEventListener('touchmove',function(){
                $this.showMinMap(true,1000);
            });
            this.options.minMap.addEventListener('touchend',function(){
                $this.showMinMap(false,1000);
            });
            //控制 minmap的显示与隐藏
            this.container.addEventListener('touchend',function(){
                $this.showMinMap(false,1000);
            });

            this.container.addEventListener('touchmove',function(){
                $this.showMinMap(true,1000);
            });

            $this.myScroll.on('zoomStart',function(){
                $this.showMinMap(true,1000);
            });
        },
        showMinMap:function(show,time){
             var mapEl = this.options.minMap;
             clearTimeout(this.timeOut);
             if(show){
                 this.removeClass(mapEl,'visi-none');
                 this.removeClass(mapEl,'opacity-0');

             } else {
                 this.timeOut = setTimeout(function(){
                     this.addClass(mapEl,'opacity-0');
                     this.addClass(mapEl,'visi-none');
                 }.bind(this),time);

             };
        },
        show:function(el){
           el.style.display = 'none';
            return this;
        },
        hide:function(el){
            el.style.display = 'block';
            return this;
        },
        hasClass:function(obj, cls) {
            return obj.classList.contains(cls);
        },
        addClass:function(obj, cls) {
            if (!this.hasClass(obj, cls)) obj.classList.add(cls);
        },
        removeClass:function(obj, cls) {
            if (this.hasClass(obj, cls)) obj.classList.remove(cls);
        },
        //初始化座位
        _initSeat:function(){
            var $this      = this,
                physicSeat = $this.options.seatData;

            $this.initUnlockSeat = physicSeat;

            var bgColor,seatPath,type;

            var speed  = ($this.Navigator().u == 'ios' && $this.Navigator().v > 4 ) || $this.Navigator().u == 'Android';

            physicSeat.forEach(function(seat,index){
                bgColor            =  $this.options.initSeatColor;
                seatPath           =  new createjs.Shape();
                type               = 'default';
                seatPath.disable   = true;

                //可售的座位  seatStatus 1为可售 99为用户已选座位
                if(seat.seatStatus && seat.seatStatus == 1 || seat.seatStatus == 99){
                    bgColor = seat.priceColor;
                    seatPath.choosed   = false;
                    seatPath.fillColor = bgColor;
                    //初始化数据中如果作为已被选中
                    if(seat.seatStatus == 99){
                        type    = 'select';
                        $this.selectNumber ++;
                        bgColor =  $this.options.selectSeatColor;
                        seatPath.choosed = true;
                    };
                    seatPath.disable = false;
                    //给每个路径绑定点击事件
                    seatPath.on('click',function(){
                        if(! $this.selectState ) return;
                        if($this._getTimeCode() <= 120 ) return;
                        $this.selectSeat = seat;
                        $this._seatEvent(this,seat.id);
                        $this.selectState = false;
                    });
                };

                seatPath.name  = seat.id; //座位的唯一标识，通过name可以找到当前座位
                seatPath.x     = ( seat.physicCol - .9) * (42 + 8);
                seatPath.y     = ( seat.physicRow - .9) * (39 + 8);

                $this._drawCanvasPath(seatPath,bgColor,type,'draw');

                $this.canvasContainer.addChild(seatPath);

                //canvas加速 解决卡顿
                if(speed){
                    $this.canvasContainer.getChildAt(index).cache(-50, -50, 50 * 2, 50 * 2);
                };
            });
            $this.canvasContainer.update();
        },
        _getTimeCode:function(){
            var timeCode    =  new Date().getTime();
            var time        =  timeCode - this.selectTime;
            this.selectTime =  timeCode;
            return time;
        },
        _drawCanvasPath:function(seatPath,color,type,clear){
            var $this      =  this;
            var canvasPath =  seatPath.graphics;

            //清除当前座位路径，释放内存
            if(clear == 'clear') canvasPath.clear();

            if(type == 'default'){
                this.defaultStyle(color,canvasPath);
            }else if(type == 'select'){
                this.selectStyle(color,canvasPath);
            }else {
                this.defaultStyle(color,canvasPath);
            };

        },
        defaultStyle:function(color,canvasPath){
            canvasPath.setStrokeStyle(3);
            canvasPath.beginStroke(color);
            if(color == this.options.initSeatColor){
                canvasPath.beginFill(color);
            }else{
                canvasPath.beginFill('#fff');
            };
            SeatPath.defaultStyle(canvasPath);
        },
        selectStyle:function(color,canvasPath){
            canvasPath.beginFill(color);
            SeatPath.selectStyle(canvasPath);
        },
        _seatEvent:function(evt,seatId){
            if(evt.disable) return;
            var $this = this;
            this.options.selectBefore();
            if($this.selectNumber >= $this.options.maxSelectNumber && !evt.choosed){
                $this.selectNumber = $this.options.maxSelectNumber;
                $this.options.selectMAxTips({
                    max:$this.options.maxSelectNumber
                });
                return false;
            };
            this._send(evt,seatId);
            this.alertData();
        },
        alertData:function(){
            if(!this.options.debug) return;
            console.log(this.selectSeat);
            var seatStr = "";
            for(var key in this.selectSeat){
                seatStr += key + ':' + this.selectSeat[key] +';\n';
            };
            alert(seatStr);
        },
        selectSeatEvent:function(seatId,disable,type){
            var $this      = this,
                target     = $this.canvasContainer.getChildByName(seatId),
                fillColor  = $this.options.selectSeatColor,
                status     = 'select';
            if(!disable){
                if(!target.choosed){
                    $this.selectNumber ++ ;
                }else{
                    fillColor  = target.fillColor;
                    status     = 'default';
                    $this.selectNumber --;
                };
                if(type == 'cancel'){
                    fillColor  = target.fillColor;
                    status     = 'default';
                };
            }else{
                fillColor = $this.options.initSeatColor;
                status    = 'disable';
            };

            $this._drawCanvasPath(target,fillColor,status,'clear');
            $this._updateSeatData(target,status);
            var speed  = ($this.Navigator().u == 'ios' && $this.Navigator().v > 4 ) || $this.Navigator().u == 'Android';
            speed ? target.updateCache() : "";
            $this.canvasContainer.update(target);
            if($this.options.minMap){
                $this._setMiniMap();
                if(type == 'selected'){
                    $this.showMinMap(true,1500);
                    $this.showMinMap(false,1500);
                }else {
                    $this.showMinMap(false,0);
                };
            };
        },
        isIos:function(){
            return 'Android'
        },
        Navigator:function(){
            var u         = navigator.userAgent, app = navigator.appVersion,
                isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                isiOS     = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                width     = window.screen.width,
                height    = window.screen.height,
                v         = 4;
            if(isiOS && !isAndroid){
                if(width == 320 && height >= 480 && height < 568){
                    v = 4; //4
                } else if (width == 320 && height >= 568 && height < 627){
                    v = 5; //5
                } else if(width == 375 && height >= 627 && height < 736 ){
                    v = 6; //6
                } else if (width == 414 && height >= 736){
                    v = 6.5; //6p
                };
                return {
                    u : 'ios',
                    v : v
                };
            } else if(isAndroid && !isiOS){
                return {
                    u:'Android',
                    v:null
                };
            } else {
                return {
                    u:'Android',
                    v:null
                };
            };
        },
        //更新选座数据
        _updateSeatData:function(seats,status){
            if(status == 'disable'){
                seats.disable = true;
            } else {
                if(status == 'select'){
                    seats.choosed = true;
                }else if(status == 'default'){
                    seats.choosed = false;
                };
            };
            if(!this.selectSeat) return;
            setTimeout(function(){
                this._zoomSeatPostion(seats);
            }.bind(this),100);
        },
        _zoomSeatPostion:function(seats){
            if(!seats.choosed)  return;
            var $this = this;

            var seatX    = $this.selectSeat.physicCol * (42 + 8),
                seatY    = $this.selectSeat.physicRow * (39 + 8) ;

            this.goToCenter(seatX,seatY,1,this.options.selectMove,100,150);
        },
        goToCenter:function(x,y,scale,zoomMove,zoomTime,moveTime){
            var $this = this;
            var parent       = $this.options.canvasParent;
            var canvas       = $this.options.canvasParent.querySelector('canvas');

            //canvas size
            var viewH    = canvas.getAttribute('height'),
                viewW    = canvas.getAttribute('width');

            //parents size
            var parentH  = parent.clientHeight,
                parentW  = parent.clientWidth;

            //seatx ,seaty
            var seatX    = x * scale,
                seatY    = y * scale;

            //move x,y
            var x        =  - ( seatX - ( parentW )  / 2 - ( 42 + 8 ) / 2),
                y        =  - ( seatY - ( parentH ) / 2 - ( 39 + 8 ) / 2);

            //放大Y轴超出边界时
            if( viewH - seatY < parentH / 2 ) y = - parseInt(viewH)  +  parentH;

            //if( viewH - seatY < parentH / 2 ) y = $this.myScroll.y;

            //放大X轴超出边界时
            if( viewW - seatX < parentW / 2 ) x = - parseInt(viewW) + parentW;
            //if( viewW - seatX < parentW / 2 ) x = $this.myScroll.x;

            //左边边界
            if(x >= 0 ) x = 0;
            if(y >= 0 ) y = 0;

            //if(x >= 0 ) x = $this.myScroll.x;
            //if(y >= 0 ) y = $this.myScroll.y;

            if($this.salce >= 1 ) {
                if(zoomMove)$this.myScroll.scrollTo(x,y,2000);
                return;
            };

            setTimeout(function(){
                $this.myScroll.zoom(scale,0,0,zoomTime);
                $this.myScroll.scrollTo(x,y,moveTime);
                $this.salce = $this.myScroll.scale;
            });

        },
        //将数据暴露到外部
        _send:function(e,seat,index){
            var $this = this;
            $this.options.send(e,seat,index);
        }
    };
    root.CreateSeat = function(container,options){
        return  new CreateSeat(container,options);
    };
})(window);

module.exports= CreateSeat;

