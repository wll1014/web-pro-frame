var scaleObj = {
    det: -1,//纪录window.innerWidth-window.document.body.clientWidth，这是因为clentfwidth在onresize中获取的不准，所以使用innerWidth来处理，innerwidth比较稳定
    minWidth:-1,
    init:function(minWidth){
        this.minWidth = minWidth==undefined?this.minWidth:minWidth
        this.det = this.getDet()
    },
    getDet:function(){
        var det = this.det<0?window.innerWidth-window.document.body.clientWidth:this.det
        return det
    },
    getScreenResolution:function(){
        return {
            height:window.screen.height,
            width:window.screen.width
        }
    },
	getBrowserDpr:function(){
		return dprObj.getBrowserDpr()
	},
    getScreenDpr:function(){
        return dprObj.getScreenDpr()
    },
	getDpr:function(){
		return window.devicePixelRatio==undefined?this.getBrowserDpr():window.devicePixelRatio;//IE版本比较低（IE10及以下）的情况下，可能为undefined，先不做处理
	},
    scaleByDpr:function(dpr){
        
        var suitableScale = dpr==undefined?1/this.getDpr():1/dpr //合适的释放比例

        console.log("仅根据系统dpr，您的屏幕适合的缩放比例为......",suitableScale)
        window.document.getElementsByTagName('body')[0].style.zoom = suitableScale//仅保证全屏的情况下不出现滚动条
    },
    sacleByWidth:function(minWidth){
		var zoom = window.document.getElementsByTagName('body')[0].style.zoom
		zoom = zoom==undefined||zoom==""?1:zoom
        
        var scrollWidth = 10//这是竖向滚动条的宽度，目前暂定默认值，后续可精确计算
        
        window.document.getElementsByTagName('body')[0].style.zoom = zoom *  (window.innerWidth/zoom - this.det)/(minWidth+scrollWidth)//仅保证全屏的情况下不出现滚动条
        console.log("结合dpr和您的屏幕分辩，您的屏幕适合的缩放比例为......",window.document.getElementsByTagName('body')[0].style.zoom)
    },
    autoScale:function(minWidth){//自动缩放
		
        var dpr = this.getScreenDpr();
        if(dpr<1){
			return ;
		}

        //情况1 根据dpr缩放
        this.scaleByDpr(dpr)

        //情况2 临界宽度缩放
        var minWidth = minWidth==undefined?this.minWidth:minWidth
        if(minWidth>0&&dpr>=1){
            var screen = this.getScreenResolution()//获取屏幕分辨率
            var screen_width = screen.width
            if((Math.abs(scaleObj.getScreenDpr()-window.devicePixelRatio)<0.1)){//没有进行了浏览器缩放
                if(minWidth>screen_width){//当最小宽度超过了屏幕宽度，全屏的情况下出现了滚动条了哦，就需要我们进行缩放啦
                    this.sacleByWidth(minWidth)
                }else{
                    this.restore()
                }

            }else{//进行了浏览器缩放
                

            }

            
        }
    },
    restore:function(){
        window.document.getElementsByTagName('body')[0].style.zoom = 1
    }

}
var dprObj = {
    
    user_agent:function(){
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('msie')>=0) {
            return 'ie';
        };
        if (ua.indexOf('firefox')>=0) {
            return 'firefox';
        };
        if (ua.indexOf('chrome')>=0) {
            return 'chrome';
        };
        if (ua.indexOf('opera')>=0) {
            return 'opera';
        };
    },
    /* 设备检测
    *  继续探索一种不使用mediaQuery的方法，求推荐
    */
    mediaQueryBinarySearch : function (property, unit, a, b, maxIter, epsilon) {
        var matchMedia;
        var head, style, div;
        if (window.matchMedia) {
            matchMedia = window.matchMedia;
        } else {
            head =  window.document.getElementsByTagName('head')[0];
            style =  window.document.createElement('style');
            head.appendChild(style);

            div =  window.document.createElement('div');
            div.className = 'mediaQueryBinarySearch';
            div.style.display = 'none';
            window.document.body.appendChild(div);

            matchMedia = function (query) {
                style.sheet.insertRule('@media ' + query + '{.mediaQueryBinarySearch ' + '{text-decoration: underline} }', 0);
                var matched = getComputedStyle(div, null).textDecoration == 'underline';
                style.sheet.deleteRule(0);
                return {matches: matched};
            };
        }
        var ratio = this.binarySearch(a, b, maxIter);
        if (div) {
            head.removeChild(style);
             window.document.body.removeChild(div);
        }
        return ratio;

        
    },
    binarySearch:function(a, b, maxIter) {
            var mid = (a + b) / 2;
            if (maxIter <= 0 || b - a < epsilon) {
                return mid;
            }
            var query = "(" + property + ":" + mid + unit + ")";
            if (matchMedia(query).matches) {
                return this.binarySearch(mid, b, maxIter - 1);
            } else {
                return this.binarySearch(a, mid, maxIter - 1);
            }
        },
    
    zoom:{
        ie: function(){
            return window.screen.deviceXDPI / window.screen.logicalXDPI;
        },
        firefox:function(){
            return mediaQueryBinarySearch('min--moz-device-pixel-ratio', '', 0, 10, 20, 0.0001);
        },
        opera:function(){
            return window.outerWidth / window.innerWidth;   
        },
        chrome:function(){
            return window.outerWidth / window.innerWidth; 
        }

    },

    getBrowserDpr:function(){
        return this.zoom[this.user_agent()]();
    },
    getScreenDpr:function(){
        if(window.devicePixelRatio!=undefined){
            return window.devicePixelRatio/this.getBrowserDpr()
        }else{//先给一个默认处理
            return this.getBrowserDpr()
        }
    }
}