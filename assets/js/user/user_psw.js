$(function(){
    $(".layui-form").on('subumit',function(e){
        e.preventDefault();
        $.ajax({
            methos: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layui.layer.msg(res.message);
                }

                layui.layer.msg("修改密码成功！");
                console.log("修改密码成功")
            }
        })
    })
})