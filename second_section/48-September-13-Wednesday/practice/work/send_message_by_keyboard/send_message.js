/**
 * Created by xuanmiao on 2017/9/13.
 */

//发送方式选择下拉按钮
var sendWayBtn = document.querySelector('.send-way-btn');
//发送方式选择项容器
var sendWay = document.querySelector('.send-way');
//发送方式选择项
var sendWayItem = sendWay.querySelectorAll('p');
//发送按钮
var sendBtn = document.querySelector('#sent-btn');
//输入框
var content = document.querySelector('#content');

//发送方式标志
var sendWayFlag = 0;

//初始化
content.value = "";
var pm = document.querySelector('.pm');
sendWayBtn.onclick = function () {
    if(getComputedStyle(sendWay)["display"] === "none"){
        sendWay.style.display = "block";
    }else{
        sendWay.style.display = "none";
    }
};

//给发送消息选择方式添加点击事件。
(function () {
    for(var i = 0; i < sendWayItem.length; i++){
        sendWayItem[i].index = i;
        sendWayItem[i].onclick = function () {
            sendWayFlag = this.index;
            for(var i = 0; i < sendWayItem.length; i++){
                var correct = sendWayItem[i].querySelector('span');
                correct.style.opacity = "0";
            }
            var correct1 = this.querySelector('span');
            correct1.style.opacity = "1";
            sendWay.style = "none";
            content.focus();
        };
    }
})();

//添加键盘监听事件
content.onkeydown = function (event) {
    var inputText = content.value;
    if(event.keyCode === 13){
        if(sendWayFlag === 0){
            if(event.ctrlKey !== true){
                sendMessage();
            }
        }
        if(sendWayFlag === 1){
            if(event.ctrlKey === true){
                sendMessage();
            }
        }
    }

};

//发送按钮按下
sendBtn.onmousedown = function () {
    sendMessage();
};


function sendMessage(){
    if(content.value === ""){
        alert("请输入内容。");
        return;
    }
    pm.innerHTML += '<li class="right"><div class="ava"><img src="img/eye%20(3).jpg" alt=""></div><div class="text"><span>' + content.value + '</span></div></li>';
    content.value = "";
}
