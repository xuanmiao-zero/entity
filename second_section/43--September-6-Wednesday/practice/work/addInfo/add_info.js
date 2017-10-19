/**
 * Created by xuanmiao on 2017/9/6.
 */
var sexDown = document.querySelector('.sex .sex-down');
var sexOption = document.querySelector('.sex-option');
var sexOptionItem = document.querySelectorAll('span');
var listItem = document.querySelector('.list-item');
var inputBox = document.querySelector('.input-box');
var inputName = inputBox.querySelector('.name div');
var age = inputBox.querySelector('.age div');
var sexShow = document.querySelector('.sex div');
var addBtn = document.querySelector('.add-btn');
var infoList = document.querySelector('.info-list');
var checkboxes = document.querySelector('.checkbox');
var titleCheckbox = infoList.querySelector('.title .checkbox');
//初始化
sexOptionClick();
infoList.checkedNumber = 0;

//下拉按钮点击事件
sexDown.onclick = function () {
    if(getCss(sexOption,"height") === 0){
        ATween(sexOption,30,500,"height",'linear');
    }else if(getCss(sexOption,"height") === 30){
        ATween(sexOption,-30,500,"height",'linear');
    }
};
//性别选项
function sexOptionClick(){
    for(var i = 0; i < sexOptionItem.length; i++){
        sexOptionItem[i].onclick = function () {
            sexShow.innerHTML = this.innerHTML;
            if(getCss(sexOption,"height") === 30){
                sexOption.style.height = 0;
            }
        };
    }
}

//添加按钮点击事件
addBtn.onclick = function () {
    //检测是否有输入内容
    if(inputName.innerHTML === ""){
        alert("请输入姓名");
        return;
    }else{
        if(inputName.innerHTML.length > 26){
            alert("请输入合法的姓名");
            return;
        }
    }
    if(age.innerHTML === ""){
        alert("请输入年龄");
        return;
    }else{
        if(parseInt(age.innerHTML).toString() === "NaN" || parseInt(age.innerHTML)>200 || parseInt(age.innerHTML) <= 0){
            alert("请输入合法的年龄！");
            return;
        }
    }
    if(sexShow.innerHTML === ""){
        alert("请输入性别");
        return;
    }

    //将内容添加到列表中
    var cloneNode = listItem.cloneNode(true);
    cloneNode.children[2].innerHTML = inputName.innerHTML;
    cloneNode.children[3].innerHTML = age.innerHTML;
    cloneNode.children[4].innerHTML = sexShow.innerHTML;

    //取消全选
    titleCheckbox.innerHTML = "";

    //上移点击事件
    cloneNode.querySelector('.up').onclick = function () {
        if(this.parentNode.parentNode.previousElementSibling.previousElementSibling){
            infoList.insertBefore(this.parentNode.parentNode,this.parentNode.parentNode.previousSibling);
        }else{
            alert("已经移到第一位了");
        }
    };

    //下移点击事件
    cloneNode.querySelector('.down').onclick = function () {
        if(this.parentNode.parentNode.nextElementSibling){
            infoList.insertBefore(this.parentNode.parentNode,this.parentNode.parentNode.nextElementSibling.nextElementSibling);
        }else{
            alert("已经移到最后一位了");
        }
    };

    //删除事件
    cloneNode.querySelector('.delete').onclick = function () {
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    };

    //选择
    cloneNode.querySelector('.checkbox').onclick = function () {
        if(this.innerHTML === ""){
            this.innerHTML = "✔";
            infoList.checkedNumber++;
            if(infoList.checkedNumber === infoList.children.length - 1)
                titleCheckbox.innerHTML = "✔";
        }
        else{
            this.innerHTML = "";
            titleCheckbox.innerHTML = "";
        }
    };
    //清空输入
    inputName.innerHTML = "";
    age.innerHTML = "";
    sexShow.innerHTML = "";

    cloneNode.style.display = "block";
    infoList.appendChild(cloneNode);
};

//全选
titleCheckbox.onclick = function () {
    if(infoList.children.length - 1 === 0){
        alert("列表为空，请添加。");
        return;
    }
    var listItemChecks = document.querySelectorAll('.info-list .list-item .checkbox');
    if(this.innerHTML === ""){
        this.innerHTML = "✔";
        for(var i = 0; i < listItemChecks.length; i ++){
            listItemChecks[i].innerHTML = "✔";
        }
    }
    else{
        this.innerHTML = "";
        for(var i = 0; i< listItemChecks.length; i ++){
            listItemChecks[i].innerHTML = "";
        }
    }
};
