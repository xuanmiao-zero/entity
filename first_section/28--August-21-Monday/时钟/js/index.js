	// 获取元素
	var trans1 = document.querySelector('.trans1');
	var trans2 = document.querySelector('.trans2');
	var trans3 = document.querySelector('.trans3');
	var date = new Date();
		var h = date.getHours();
		var m = date.getMinutes();
		var s = date.getSeconds();

		trans1.style.transform = 'rotate('+(h-1)+'deg)';
		trans2.style.transform = 'rotate('+(m)+'deg)';
		trans3.style.transform = 'rotate('+(s*6)+'deg)';


	var timer = 0;

	timer = setInterval(function(){
		changeTime();
	},1000)

	function changeTime(){
		var date = new Date();
		var h = date.getHours();
		var m = date.getMinutes();
		var s = date.getSeconds();

		trans1.style.transform = 'rotate('+(h-1)+'deg)';
		trans2.style.transform = 'rotate('+(m)+'deg)';
		trans3.style.transform = 'rotate('+(s*6)+'deg)';

	}