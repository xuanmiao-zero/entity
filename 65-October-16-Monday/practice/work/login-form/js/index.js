/**
 * Created by xuanmiao on 2017/10/16.
 */


/*<!--
1.写出手机、邮箱、qq的注册、出生年月

2.其中出生年月需要精确匹配（2月30是没有的，比当前时间大也不行）

3.所有的条件成立，就能点击注册（不然注册都不能点）
-->*/

window.onload = function () {
    let formSignin = document.querySelector('.form-signin');
    let signUp = document.getElementById('signUp');
    let inputs = formSignin.querySelectorAll('input');

    /*初始化*/
    signUp.setAttribute("disabled","disabled");
    class Checkout{
        constructor(){
            this.id = "phone";
            this.ele = document.getElementById('phone');
            this.okNumber = 0;

            /*各输入框的正则表达式*/
            this.regObj = {
                phone:/^1(3|4|5|7|8)[0-9]\d{8}$/,
                qq: /^[1-9]\d{4,13}$/,
                birthday:this.birthdayReg(),
                email:/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i,
                password: /^[0-9A-Za-z!@#$%^&*]{6,16}$/
            };
        }

        init(){
            this.inputChangeExec();
        }

        /*焦点切换时切换目标输入框*/
        inputChangeExec(){
            this.ele.focus();
            /*页面加载时*/
            this.focusEleChangeAction();

            /*点击切换焦点*/
            document.onclick=() => {
                this.focusEleChangeAction();
            };

            /*tab切换焦点*/
            document.addEventListener("keyup", (ev) => {
                if(ev.keyCode === 9){
                    this.focusEleChangeAction();
                }
            });

        }

        /*焦点切换时执行的动作*/
        focusEleChangeAction(){
            this.id = document.activeElement.id;
            this.ele = document.activeElement;
            this.ele.addEventListener('input', ()=>{
                this.inputChange();
            });
        }

        /*判断输入字符是否合法并改变输入框状态*/
        inputChange() {
            this.regObj.birthday = this.birthdayReg();
            if(this.regObj[this.id] === undefined){
                console.log("没有对应的正则检测！");
                return;
            }
            if(!this.regObj[this.id].test(this.ele.value) && this.ele.value !== ""){
                this.ele.className = "form-control warn";
                this.ele.checkout = "false";
            }else{
                this.ele.className = "form-control";
                this.ele.checkout = "ok";
            }

            this.changeBtn();
        }

        /*生日单独处理*/
        birthdayReg(){
            if(this.id === "birthday"){
                let date = new Date();
                let birthdayArr = this.ele.value.match(/\d+/g);
                if(birthdayArr&&birthdayArr.length === 3){
                    let oldTime = new Date();
                    date.setYear(birthdayArr[0]);
                    date.setMonth(birthdayArr[1] - 1);
                    date.setDate(birthdayArr[2]);
                    if(date > oldTime){
                        return /你是从未来穿越过来的？/;
                    }
                    if(date.getFullYear() === parseInt(birthdayArr[0])&& date.getMonth() + 1 === parseInt(birthdayArr[1]) && date.getDate() === parseInt(birthdayArr[2])){
                        return /^19\d{2}|20\d{2}\D([1-9]|0[1-9]|1[0-2])\D([1-9]|0[1-9]|[1-2][0-9]|30|31)$/;
                    }else{
                        return /你输入的生日日期不存在/;
                    }
                }
            }
            return /^19\d{2}|20\d{2}\D([1-9]|0[1-9]|1[0-2])\D([1-9]|0[1-9]|[1-2][0-9]|30|31)$/;
        }

        /*改变按钮状态*/
        changeBtn(){
            this.okNumber = 0;
            for(let i = 0; i < inputs.length; i++){
                if(inputs[i].checkout === "ok"){
                    this.okNumber ++;
                }
            }
            if(this.okNumber === 5){
                signUp.removeAttribute("disabled");
            }else{
                signUp.setAttribute("disabled","disabled");
            }
        }
    }
    new Checkout().init();
};
