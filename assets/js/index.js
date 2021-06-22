$(function(){

    //获取用户信息
    getUserInfo()
})

const layer = layui.layer
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //头部信息
        success: function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }

            //调用renderAvatar
            renderAvatar(res.data);
        },
        //无论成功还是失败都会调用这个complte
        // complete: function(res){
        //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应的数据
        //     // console.log(res.responseJSON.status);
        //     // console.log(res.responseJSON.message)
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         //强制清空token
        //         localStorage.removeItem('token');
        //         //强制跳转到登录页
        //         location.href = '/login.html';
        //     }
        // }
    })
}

function renderAvatar(user) {
    //获取用户名称
    let name = user.nickname || user.username;
    // 设置欢迎文本
    $("#welcome").html('欢迎&nbsp;'+name);

    //按需渲染头像
    if(user.user_pic !== null){
        //渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else {
        // 渲染文字图像
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}

//退出功能
$("#btnLogout").on('click',function(){
    //显示提示框
    layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
        
        //清空本地缓存
        localStorage.removeItem('token');
        
        //重新跳转到登录页
        location.href = '/login.html'
        layer.close(index);
      });
})