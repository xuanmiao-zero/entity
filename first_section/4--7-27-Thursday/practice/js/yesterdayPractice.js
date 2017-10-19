//放在head标签的js获取不到元素，因为元素加载在js加载之后，因此要让js等待元素加载完成之后再执行

//两种方法
//window.onload 使DOM加载完成之后再执行js脚本
//使用defer
var pad = document.getElementById('pad');
console.log(pad);
console.log(2);