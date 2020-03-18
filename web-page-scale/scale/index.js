var scaleObj = {
    getScreenResolution:function(){
        return {
            height:window.screen.height,
            width:window.screen.width
        }
    },
    getDpr:function(){
        return window.devicePixelRatio
    },
    scaleByDpr:function(dpr){
        
        var suitableScale = dpr==undefined?1/this.getDpr():1/dpr //合适的释放比例

        console.log("您的屏幕适合的缩放比例为......",suitableScale)
        window.document.getElementsByTagName('body')[0].style.zoom = suitableScale//仅保证全屏的情况下不出现滚动条
    },
    sacleByWidth:function(minWidth){
		var zoom = window.document.getElementsByTagName('body')[0].style.zoom
		zoom = zoom==undefined||zoom==""?1:zoom
        
        var scrollWidth = 10//这是竖向滚动条的宽度，目前暂定默认值，后续可精确计算
        
        window.document.getElementsByTagName('body')[0].style.zoom = zoom *  window.document.body.clientWidth/(minWidth+scrollWidth)//仅保证全屏的情况下不出现滚动条
    },
    autoScale:function(minWidth){//自动缩放

        var dpr = this.getDpr()
        if(dpr<1){//当dpr<1的情况，不进行缩放
            return;
        }

        //情况1 根据dpr缩放
        this.scaleByDpr(dpr)
        //情况2 临界宽度缩放
        if(minWidth!=undefined&&dpr>=1){
            var screen = this.getScreenResolution()//获取屏幕分辨率
            var screen_width = screen.width
            if(minWidth>screen_width){//当最小宽度超过了屏幕宽度，全屏的情况下出现了滚动条了哦，就需要我们进行缩放啦
                this.sacleByWidth(minWidth)
            }else{
                this.restore()
            }
        }
    },
    restore:function(){
        window.document.getElementsByTagName('body')[0].style.zoom = 1
    }

}