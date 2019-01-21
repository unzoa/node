/* 
 * @ y as yuhongyu
 * _.ready
 * _.ajax
 * _overscroll('className'),配合className的style，阻止在顶部的拖动
 * _browserVer() 获取浏览器版本IE5 , IE55 , IE6 , IE7 , IE8 , FF , Opera
 * _setCookie(name, value, _time), _time/ms
 * _getCookie(name)
 * _clearCookie()
 * _getRadio(name)
 * _getCheckBox(name)
 * _getUrlParams(name)
 * _verEmail(email)
 * _verIDcard(IDcard)
 * _verPwd(pwd)
 */

var _ = document;
var _log     = console.log.bind(console);
var _find    = function (ev) {return _.querySelector(ev); }
var _findAll = function (ev) {return _.querySelectorAll(ev); }
var _toStr   = function (ev) {return JSON.stringify(ev); }
var _toJson  = function (ev) {return JSON.parse(ev); }


// window.onload:dom文档树加载完和所有文件加载完
// ready:dom文档树加载完
// 预先加载的loading:可以在ready写程序，window.load中写停止加载
_.ready = function (callback) {
    ///兼容FF,Google
    if (_.addEventListener) {
        _.addEventListener('DOMContentLoaded', function () {
            _.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false)
    }
     //兼容IE
    else if (_.attachEvent) {
        _.attachEvent('onreadystatechange', function () {
            if (_.readyState == "complete") {
                _.detachEvent("onreadystatechange", arguments.callee);
                callback();
            }
        })
    }
    else if (_.lastChild == _.body) {
        callback();
    }
}


_.ajax = function(options){//options =  {url:'',method:'',data:'',callback:'',async:''}
    //默认参数
    options.url = options.url || '',
    options.method = options.method || 'get',
    options.data = options.data || '',
    options.callback = options.callback || '',
    options.async = options.async || true;
    //get请求-拼接url
    if(options.method.toLowerCase() == 'get'){
        if(typeof options.data == 'object'){
            options.data = [];
            for (var k in options.data){
                options.data.push(k+'='+options.data[k]);
                options.data.join('&');
            }
        }
        options.url += (options.url.indexOf('?' == -1) ? '?' : '') + options.data;
    }
    //post请求-转换字符串
    if(options.method.toLowerCase() == 'post'){
        if(typeof options.data == 'object'){
            var arrs = [];
            for (var k in options.data){
                arrs.push(k+'='+options.data[k]);
            }
            options.data = arrs.join('&');
        }
    }
    //创建发送请求
    var xhr = window.XMLHttpRequest ?  new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); //兼容ie
    xhr.open(options.method,options.url,options.async);
    if(options.method == 'post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(options.data);
    }else{
        xhr.send(null);
    }
    //异步请求
    if(options.async == true){
        xhr.onreadystatechange = function(){
          if(xhr.readyState == 4){
              callcall();
          }
        }
    }
    // xhr.abort(); // 取消异步请求
    //同步请求
    if(options.async == false){
        callcall();
    }
    //返回状态判断
    function callcall(){
        if(xhr.status == 200){
            options.callback(xhr.responseText);
        }else{
            options.callback('error:' + xhr.status + xhr.statusText);
        }
    }
};


// 在固定header的同时，想要pages阻止微信浏览器下拉查看网址
var _overscroll = function(el) {
  el.addEventListener('touchstart', function() {
    var top = el.scrollTop //滚动条距离顶部的高度
      , totalScroll = el.scrollHeight //容器的高度
      , currentScroll = top + el.offsetHeight //父级容器的高度

    //If we're at the top or the bottom of the containers
    //scroll, push up or down one pixel.
    //
    //this prevents the scroll from "passing through" to
    //the body.
    if(top === 0) {
      el.scrollTop = 1
    } else if(currentScroll === totalScroll) {
      el.scrollTop = top - 1
    }
  })

  el.addEventListener('touchmove', function(evt) {
    //if the content is actually scrollable, i.e. the content is long enough
    //that scrolling can occur
    if(el.offsetHeight < el.scrollHeight)
      evt._isScroller = true
  })
}


_.body.addEventListener('touchmove', function(evt) {
  //In this case, the default behavior is scrolling the body, which
  //would result in an overflow.  Since we don't want that, we preventDefault.
  if(!evt._isScroller) {
    evt.preventDefault()
  }
})


// 根据myBrowser()返回值判断浏览器版本
var _browserVer = function (){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        if (IE55) {
            return "IE55";
        }
        if (IE6) {
            return "IE6";
        }
        if (IE7) {
            return "IE7";
        }
        if (IE8) {
            return "IE8";
        }
    }//isIE end
    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isAndroid) {
        return "Android";
    }
    if (isIOS) {
        return "ios";
    }
}


// 设置cookie
// _time. ms
var _setCookie = function (name, value, _time) {
    //定义一天
    var days = 1;
    var exp = new Date();
    //定义的失效时间，
    exp.setTime(exp.getTime() + days * _time);
    //写入Cookie  ，toGMTstring将时间转换成字符串。
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString;
}


// 获取cookie
var _getCookie = function (cookie_name) {
    var strCookie = document.cookie;
    //将多cookie切割为多个名/值对
    var arrCookie = strCookie.split("; ");
    var userId;
    //遍历cookie数组，处理每个cookie对
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        //找到名称为userId的cookie，并返回它的值
        if (cookie_name == arr[0]) {
            userId = arr[1];
            break;
        }
    }
    return unescape(userId);
}


// 清楚cookie
var _clearCookie = function () {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
    if(keys) {  
        for(var i = keys.length; i--;)  
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
    }  
}


// 获取url参数
var _getUrlParam  = function (name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
}


// 取到radio的值
var _getRadio = function (radioName){
    var name = document.getElementsByName(radioName);
    for(i=0; i<name.length;i++){
        if(name[i].checked)    { 
            return  name[i].value; 
        } 
    }         
    return "undefined";  
}


// 获取checkbox的值
var _getCheckBox = function (boxName){
    var name = document.getElementsByName(boxName);
    var sum = '';
    for(i=0; i<name.length;i++){
        if(name[i].checked){
            sum =  sum + name[i].value + ',';
        } 
    } 
    if (sum.lastIndexOf(',')==-1) {
        return '';
    }else{
        return  sum.substr(0,sum.length-1); 
    } 
}

// 邮箱格式
var _verEmail = function(email){
    if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)) {
        return false//'邮箱格式不正确!'; 
    }
}

// 身份证格式
var _verIDcard = function(IDcard){
    if(!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(IDcard)){
        return false//'身份证格式不正确!'; 
    }
}

// 密码格式
var _verPwd = function(pwd){
    if (/[\W]/.test(pwd.value)) {
        return false//'密码格式不正确!';
    }
}