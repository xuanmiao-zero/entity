
/*
 * t   已过时间
 * b:  开始位置
 * c:  总路程
 * d:  总时间
 *
 * */
var Tween = {
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //*正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){//*
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
};


/*
* obj  ：  要运动的元素
* count:  运动的总路程
* duration: 运动的总时间
* attr ： 变化的属性
* fx: 运动的模式
* fn：运动结束后要做的事情 （回调函数）
*
* */

function ATween(obj,count,duration,attr,fx,fn){
    //清除定时器
    clearInterval(obj.timer);
    var startTime = new Date().getTime();//运动前的时间
    var begin = getCss(obj,attr);//运动前的位置

    //运动动画
    obj.timer = setInterval(function(){
        //计算已经运动过的时间
        //由于定时器执行间隔时间不稳定，受到其他程序影响，所以间隔时间要通过计算来获取
        var t = new Date().getTime()-startTime;
        if(t>=duration){
            t = duration;
            clearInterval(obj.timer);
        }
        obj.style[attr] = Tween[fx](t,begin,count,duration)+'px';
        //是否有fn参数
        if(t>=duration&&fn) fn();
    },30);
}

//获取元素属性
function getCss(obj,attr){
    var objAttr = getComputedStyle(obj)[attr];
    return isNaN(parseFloat(objAttr))?objAttr:parseFloat(objAttr);
}

//获取随机数
/*
* minNumber: 能够产生的最小随机数
* maxNumber: 能够产生的最大随机数
* */
function getRandom(minNumber,maxNumber){
    return Math.floor(Math.random()*(maxNumber + 1 - minNumber) + minNumber);
}

//抖动效果实现
/*
* obj:  元素
* attr: 元素属性
* dist: 抖动最大距离
* diff: 每次抖动递减距离
* interval: 抖动间隔时间
* originalValue:  元素属性原先的值
* */
function jitter(obj,attr,dist,diff,interval,fn){
    var attrArrIndex = 0;
    clearInterval(obj.timer);
    var attrArr = [];
    //在原先位置抖动
    originalValue = getCss(obj,attr);
    //产生每次抖动位置的数组
    while(Math.abs(dist) >= diff){
        dist = -dist;
        attrArr[attrArrIndex] = dist;
        if(dist > 0){
            dist = dist - diff;
        }
        attrArrIndex++;
    }
    attrArr[attrArr.length]  = 0;
    attrArrIndex = 0;
    //元素运动
    obj.timer = setInterval(function () {
        obj.style[attr] = originalValue + attrArr[attrArrIndex] + "px";
        attrArrIndex++;
        if(getCss(obj,attr) === originalValue){
            clearInterval(obj.timer);
            fn&&fn();
        }
    },interval);
}
