$(function(){
    $("#link_reg").on('click',function(){
        $(".login-box").hide();
        $(".reg-box").show();
    });
    $("#link_login").on('click',function(){
        $(".reg-box").hide();
        $(".login-box").show();
    })

    var layer = layui.layer;
    // 注册模块
    $("#layui-reg").on('submit',function(e){
        e.preventDefault();
        let data = {username: $('#layui-reg [name=username]').val(),
                password: $('#layui-reg [name=password]').val()};
        $.post('/api/reguser',
        data,function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg("注册成功！");
                $("#link_login").click();
            })

    })

    //登录模块
    $("#layui-login").submit(function(e){
        e.preventDefault();
        let data = $(this).serialize();
        console.log(data);
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: data,
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg('登录成功！');
                //将登录成功的token保存到localStorage中
                localStorage.setItem('token', res.token);
                //跳转到主页
               location.href = '/index.html';
            }

        })
    })

})