/**
 * Created by xuanmiao on 2017/9/19.
 */
/*
* 功能点：
* 1.全选  将所有单选打勾
* 2.单选  单选时检测是否需要为全选打勾
* 3.删除
* 4.碰撞检测
* 5.拖拽显示选择邮件数
*
* */

var checkAllBox = document.querySelector("thead input[type=checkbox]");

var checkBoxes = document.querySelectorAll("tbody input[type=checkbox]");

var deleteBtns = document.querySelectorAll(".delete");



/*全选*/
checkAllBox.onclick = function () {
    for(var i = 0; i < checkBoxes.length; i++){

        /*单选与全选保持一致*/
        checkBoxes[i].checked = this.checked;

        /*改变背景色*/
        if(this.checked)
            checkBoxes[i].parentNode.parentNode.style.backgroundColor = "lightskyblue";
        else
            checkBoxes[i].parentNode.parentNode.style.backgroundColor = "";
    }
};

/*单选*/
(function () {
    for(var i = 0; i < checkBoxes.length; i++){
        checkBoxes[i].onclick = function () {
            /*选中的更改背景颜色*/
            if(this.checked)
                this.parentNode.parentNode.style.backgroundColor = "lightskyblue";
            else
                this.parentNode.parentNode.style.backgroundColor = "";

            /*所有单选都选择的时候将全选选择上*/
            checkAllBox.checked = true;
            for(var i = 0; i < checkBoxes.length; i++){
                /*有一个单选 没有选则全选选择取消*/
                if(!checkBoxes[i].checked){
                    checkAllBox.checked = false;
                    break;
                }
            }
        };
    }
})();

/*删除*/
(function () {
    for(var i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].onclick = function () {
            checkBoxes = document.querySelectorAll("tbody input[type=checkbox]");
            for(var i = 0; i < checkBoxes.length; i++){
                /*如果状态为选中则删除*/
                if(checkBoxes[i].checked){
                    checkBoxes[i].parentNode.parentNode.parentNode.removeChild(checkBoxes[i].parentNode.parentNode);
                }
            }
        };
    }
})();


/*碰撞检测*/

/*获取元素*/
var deleted = document.querySelector('.deleted');

/*已删除邮件分组的中心点*/
var x1 = deleted.offsetWidth/2 + deleted.offsetLeft + getCss(deleted, "marginLeft");


var y1 = deleted.offsetHeight/2 + deleted.offsetTop + getCss(deleted, "marginTop");

//获取元素属性
function getCss(obj,attr){
    var objAttr = getComputedStyle(obj)[attr];
    return isNaN(parseFloat(objAttr))?objAttr:parseFloat(objAttr);
}
/*最小碰撞值*/
var w = deleted.offsetWidth/2;
var h = deleted.offsetHeight/2;
var tbodyTr =  document.querySelectorAll("tbody tr");

var timer = 0;

(function () {
    for(var i = 0 ; i < tbodyTr.length; i ++){
        tbodyTr[i].addEventListener("mousedown",function (ev) {
            /*判断邮件是否被选中*/
            if(!this.querySelector('input[type=checkbox]').checked)
                return;

            var mailCount = 0;
            checkBoxes = document.querySelectorAll("tbody input[type=checkbox]");
            /*统计选中邮件总数*/
            for(var i = 0; i < checkBoxes.length; i++){
                if(checkBoxes[i].checked)
                    mailCount++;
            }

            var mailNumberTips = document.createElement('div');
            mailNumberTips.className = "mail-number-count";
            mailNumberTips.innerHTML = "共" + mailCount + "封邮件";
            mailNumberTips.style.left = ev.clientX + 1 + "px";
            mailNumberTips.style.top = ev.clientY + 1 +"px";
            document.body.appendChild(mailNumberTips);

            /*移动时显示选中邮件总数的框*/
            document.onmousemove = function (ev) {
                mailNumberTips.style.left = ev.clientX + window.pageXOffset + "px";
                mailNumberTips.style.top = ev.clientY + window.pageYOffset + "px";
                return false;
            };

        },false);
    }
})();

document.onmouseup = function (ev) {

    /*抬起时清除已选邮件数目统计*/
    var mailNumberCount = document.querySelector('.mail-number-count');
    mailNumberCount&& document.body.removeChild(mailNumberCount);
    if(Math.abs(ev.clientX - x1 ) < w && Math.abs(ev.clientY - y1 ) < h){
        /*重新获取*/
        checkBoxes = document.querySelectorAll("tbody input[type=checkbox]");

        for(var i = 0; i < checkBoxes.length; i++){
            if(checkBoxes[i].checked){
                checkBoxes[i].parentNode.parentNode.parentNode.removeChild(checkBoxes[i].parentNode.parentNode);
            }
        }

        checkAllBox.checked = false;
    }


};


