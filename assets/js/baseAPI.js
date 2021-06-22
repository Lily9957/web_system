//简化url，每次调用$.post()或$.get或$.ajax()前都会先调用这个函数
$.ajaxPrefilter(function(options){
    //在发起ajax请求前，统一拼接请求的根路径
    options.url = "http://api-breakingnews-web.itheima.net"+options.url;

    //统一为有权限的接口，设置headers请求头
    if(options.url.includes('/my/')){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res){
            //在complete回调函数中，可以使用res.responseJSON拿到服务器响应的数据
            // console.log(res.responseJSON.status);
            // console.log(res.responseJSON.message)
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
                //强制清空token
                localStorage.removeItem('token');
                //强制跳转到登录页
                location.href = '/login.html';
            }
        }

})