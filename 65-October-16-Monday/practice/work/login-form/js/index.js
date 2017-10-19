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
                qq:/^[1-9]\d{4,13}$/,
                birthday: this.birthdayReg(),
                email:/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i,
                password:/^[0-9A-Za-z!@#$%^&*]{6,16}$/
        };
            this.inputChangeExec();
        }

        birthdayReg(){
            let date = new Date();
            /**
             * 判断闰年函数
             * @param  {number} year 要判断的年份
             * @return {bool} 返回布尔值
             *
             * 其实只要满足下面几个条件即可、
             * 1.普通年能被4整除且不能被100整除的为闰年。如2004年就是闰年,1900年不是闰年
             * 2.世纪年能被400整除的是闰年。如2000年是闰年，1900年不是闰年
             */
            function leapYear(year) {
                return !(year % (year % 100 ? 4 : 400));
            }

            if(this.id === "qq"){
                this.
            }
            return /^(19\d{2}|200\d|201[0-7])-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/;
        }

        /*焦点切换时切换目标输入框*/
        inputChangeExec(){
            document.onclick=() => {
                this.id = document.activeElement.id;
                this.ele = document.activeElement;
                this.ele.addEventListener('input', ()=>{
                    this.inputChange();
                });
            };
        }

        /*判断输入字符是否合法并改变输入框状态*/
        inputChange() {
            if(!this.regObj[this.id].test(this.ele.value)){
                this.ele.className = "form-control warn";
                this.ele.checkout = "false";
            }else{
                this.ele.className = "form-control";
                this.ele.checkout = "ok";
            }

            this.changeBtn();
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
    new Checkout();
};