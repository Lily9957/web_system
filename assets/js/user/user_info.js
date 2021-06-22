$(function(){
    initUserInfo();
})

var form = layui.form;
var layer = layui.layer;
function initUserInfo(){
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }
            //使用form.val快速为表单赋值
            form.val("formUserInfo",res.data)
        }
    })
}

//重置按钮
$("#btnReset").on('click', function(e){
    e.preventDefault();
    initUserInfo();
})

//提交修改
$(".layui-form").on('submit',function(e){
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            window.parent.getUserInfo();
        }
    } )
})