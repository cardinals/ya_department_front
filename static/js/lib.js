document.write('<scr' + 'ipt type="text/javascript" src="'+'../../static/js/jquery-3.2.1.min.js'+'"></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="'+'../../static/js/vue.min.js'+'"></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="'+'../../static/js/elementUI.js'+'"></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="'+'../../static/js/axios.min.js'+'"></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="'+'../../static/js/vue-resource.min.js'+'"></scr' + 'ipt>');



//公共方法-地址栏取参方法
window.getQueryString = function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)",'i');
    var r = window.location.search.substr(1).match(reg);
    if(r!=null){
        return unescape(r[2]);
    } 
    return null;
}