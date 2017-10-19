var getUser = document.getElementById('user');
var getVal = document.getElementById('import');
var isUser = 1;
var getCon = document.querySelector('.content');
getUser.onclick = function(){
	isUser = isUser + 1;
	if(isUser > 2){
		isUser = 1;
	}
	getUser.src = 'img/' + isUser + '.jpg';
}
document.querySelector('.enter').onclick = function(){
	if(getVal.value == ''){
		alert('亲，请写点什么吧！');
	}else if(isUser == 1){
		getCon.innerHTML = '<dl class=\"blue clearfix\"><dt class=\"userImg\"><img src=\"img/1.jpg\"/></dt><dd class=\"text\">' + getVal.value + '</dd></dl>' + getCon.innerHTML;
	}else if(isUser == 2){
		getCon.innerHTML = '<dl class=\"red clearfix\"><dt class=\"userImg\"><img src=\"img/2.jpg\"/></dt><dd class=\"text\">' + getVal.value + '</dd></dl>' + getCon.innerHTML;
	}
	getVal.value = '';
}
