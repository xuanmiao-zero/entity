/**
 * Created by xuanmiao on 2017/8/16.
 */
// showClock(document.body.querySelector('#test'));
function showClock(obj){
    var clockImgs = [
        "img/0.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/3.jpg",
        "img/4.jpg",
        "img/5.jpg",
        "img/6.jpg",
        "img/7.jpg",
        "img/8.jpg",
        "img/9.jpg"
    ];
    /*初始化*/
    var div = document.createElement('div');
    div.className = "clock";
    for(var i = 0; i < 8; i++){
        if( i === 2 || i === 5){
            var colonImg = document.createElement('img');
            colonImg.src = "img/c.jpg";
            colonImg.style.float = "left";
            div.appendChild(colonImg);
        }else{
            var numberImg = document.createElement('img');
            numberImg.src = "img/b.jpg";
            numberImg.style.float = "left";
            div.appendChild(numberImg);
        }
    }
    obj.appendChild(div);
    var clockImg = document.querySelectorAll(".clock img");
    changClock();
    setInterval(changClock,1000);

    function changClock(){
        var date = new Date();
        /*时*/
        var hours = date.getHours();
        if(hours >= 10){
            var hours0 = hours.toString().charAt(0);
            var hours1 = hours.toString().charAt(1);
            clockImg[0].src = clockImgs[hours0];
            clockImg[1].src = clockImgs[hours1];
        }else{
            clockImg[0].src = clockImgs[0];
            clockImg[1].src = clockImgs[hours];
        }

        /*分*/
        var minutes = date.getMinutes();
        if(minutes >= 10){
            var minutes0 = minutes.toString().charAt(0);
            var minutes1 = minutes.toString().charAt(1);
            clockImg[3].src = clockImgs[minutes0];
            clockImg[4].src = clockImgs[minutes1];
        }else{
            clockImg[3].src = clockImgs[0];
            clockImg[4].src = clockImgs[minutes];
        }

        /*秒*/
        var seconds = date.getSeconds();
        if(seconds >= 10){
            var seconds0 = seconds.toString().charAt(0);
            var seconds1 = seconds.toString().charAt(1);
            clockImg[6].src = clockImgs[seconds0];
            clockImg[7].src = clockImgs[seconds1];
        }else{
            clockImg[6].src = clockImgs[0];
            clockImg[7].src = clockImgs[seconds];
        }
    }
}

