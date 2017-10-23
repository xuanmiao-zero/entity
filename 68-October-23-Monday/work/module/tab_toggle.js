/**
 * Created by xuanmiao on 2017/10/23.
 */
class TabToggle{
    constructor(id){
        this.box = document.getElementById(id);
        this.settings = {
            buttons:['新闻','体育','音乐','娱乐','游戏'],
            contents:['什么时候能脱贫','夜王标枪得第一','双节棍','鹿晗和xx好','LOLS7'],
            event:"onclick"
        };
    }

    /*初始化*/
    init(json){
        this.settings = Object.assign(this.settings,json);
        this.createCSS();
        this.createBtns();
        this.createConts();
        this.addEvent();
    }

    /*创建css*/
    createCSS(){
        let link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = "tab_toggle.css";
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    /*创建按钮*/
    createBtns(){
        this.settings.buttons.forEach((e,i)=>{
            let btn = document.createElement('button');
            btn.className = i === 0 ? "active": "";
            btn.innerHTML = e;
            this.box.appendChild(btn);
        });
    }

    /*创建内容*/
    createConts(){
        this.settings.contents.forEach((e,i)=>{
            let div = document.createElement('div');
            div.innerHTML  = e;
            div.className = i === 0 ? "show" : "";
            this.box.appendChild(div);
        });
    }

    /*添加事件*/
    addEvent(){
        this.btns = Array.prototype.slice.call(this.box.getElementsByTagName('button'));
        this.conts = Array.prototype.slice.call(this.box.getElementsByTagName('div'));
        this.btns.forEach((e,i)=>{
            e[this.settings.event] = () => this.tab(i);
        });

    }

    /*触发事件操作*/
    tab(i){
        this.btns.forEach((e,i)=>{
            e.className = '';
            this.conts[i].className = '';
        });
        this.btns[i].className = 'active';
        this.conts[i].className = 'show';
    }


}