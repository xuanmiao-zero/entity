/**
 * Created by xuanmiao on 2017/9/14.
 */

/*获取元素*/
var computer = document.querySelector('.computer ');
var img = computer.querySelector('.img');
var magnifier = computer.querySelector('.magnifier');
var enlargedImage = computer.querySelector('.enlarged-image');

/*添加事件*/

//鼠标移动放大镜移动
img.onmousemove = function (event) {
    if(event.clientX >= getElementLeft(img) && event.clientX <= getElementLeft(img) + img.clientWidth ){
        magnifier.style.left = event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)- getElementLeft(img) - magnifier.offsetWidth/2  + "px";
    }
    if(event.clientY >= getElementTop(img)- (document.documentElement.scrollTop || document.body.scrollTop) && event.clientY <= getElementTop(img) + img.clientHeight - (document.documentElement.scrollTop || document.body.scrollTop)){
        magnifier.style.top = event.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - getElementTop(img) - magnifier.offsetHeight/2 + "px";
    }
    //显示放大的图像
    enlargedImage.style.backgroundPosition = "-" +  parseFloat(getComputedStyle(magnifier)["left"])*10 + "px -" + parseFloat(getComputedStyle(magnifier)["top"])*10+ "px";
};
img.onmouseover = function () {
    console.log(1);
    enlargedImage.style.display = "block";
};
img.onmouseout = function () {
    console.log(2);
    enlargedImage.style.display = "";
};
//获取元素左上角距离网页左上角的距离
function getElementLeft(element){
    var actualLeft = element.offsetLeft+ element.clientLeft;
    var current = element.offsetParent;
    while (current !== null && current !== undefined){
        actualLeft += current.offsetLeft;
        actualLeft += current.clientLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}
function getElementTop(element){
    var actualTop = element.offsetTop + element.clientTop;
    var current = element.offsetParent;
    while (current !== null && current !== undefined){
        actualTop += current.offsetTop;
        actualTop += current.clientTop;
        current = current.offsetParent;
    }
    return actualTop;
}
