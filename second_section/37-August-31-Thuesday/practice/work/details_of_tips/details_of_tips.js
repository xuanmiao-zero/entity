/**
 * Created by xuanmiao on 2017/8/31.
 */

var div1 = document.querySelector('#div1');
var keywords = div1.querySelectorAll('span');
var box = div1.querySelector('#box');
var p1 = div1.querySelector('p');
//鼠标移入关键词，显示解释
showExplanation(keywords);
var timer;
function showExplanation(keywords){
    for(var i = 0; i < keywords.length; i ++){
        keywords[i].onmouseover = function () {
            clearInterval(timer);
            box.style.visibility = "visible";
            var c;
            box.innerHTML = c = this.getAttribute('c');
            var l = this.getAttribute('l');
            box.innerHTML=c+'   <a href="'+ l +'">详情</a>';
            boxPosition(this);
        };

        keywords[i].onmouseout = function () {

            timer = setTimeout(function () {
                box.style.visibility = "hidden";
            },100);
        };

        box.onmouseover = function () {
            clearInterval(timer);
            box.style.visibility = "visible";
        };
        box.onmouseout = function () {
            box.style.visibility = "hidden";
        };

        //判断关键词解释窗是否超出父级容器
        function boxPosition(obj) {
            var x =  getElementLeft(obj);
            var y = getElementTop(obj)  + 20;
            var boxMaxAreaX = x  + parseFloat(getComputedStyle(box)['width']);
            var boxMaxAreaY = y + parseFloat(getComputedStyle(box)['height']);
            var p1MaxAreaX = getElementLeft(p1) + parseFloat(getComputedStyle(p1)['width']);
            var p1MaxAreaY = getElementTop(p1) + parseFloat(getComputedStyle(div1)['height']) - parseFloat(getComputedStyle(div1)['border']) * 2;
            if(boxMaxAreaX > p1MaxAreaX ){
                x = x + (  p1MaxAreaX - boxMaxAreaX);
            }
            if(boxMaxAreaY > p1MaxAreaY){
                // y = y + (  p1MaxAreaY - boxMaxAreaY) - 20;
                y = getElementTop(obj) - parseFloat(getComputedStyle(box)['height']);
            }

            box.style.left = x + "px";
            box.style.top = y + "px";
        }

        function mouseCoords(ev)
        {
            if(ev.pageX || ev.pageY){
                return {x:ev.pageX, y:ev.pageY};
            }
            return{
                x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y:ev.clientY + document.body.scrollTop - document.body.clientTop
            };
        }
        //获取位置元素的绝对位置
        function getElementLeft(element){
            var actualLeft = element.offsetLeft;
            var current = element.offsetParent;
            while (current !== null && current !== undefined){
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            return actualLeft;
        }
        function getElementTop(element){
            var actualTop = element.offsetTop;
            var current = element.offsetParent;
            while (current !== null && current !== undefined){
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            return actualTop;
        }
    }
}
