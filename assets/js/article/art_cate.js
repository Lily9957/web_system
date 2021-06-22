$(function () {
    getInitArtCate();

    function getInitArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    }
    //弹出层设置
    var indexAdd = null;
    var layer = layui.layer;
    var form = layui.form;
    $("#addCate").on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#form_add").html()
        });

    })

    //提交事件
    $('body').on('submit', '#formId', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                getInitArtCate();
                layui.layer.msg('新增分类成功!');
                layer.close(indexAdd);
            }
        })
    })

    //更新信息操作
    $('body').on('click', '#updateBtn', function () {
        indexUpdate = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $("#form_update").html()
        });

        var id = $(this).attr("data-id");

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                form.val('formUpdate', res.data);
            }
        })
    })

    //确认修改部分
    $('body').on('submit', '#formUpdate', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message);
                }
                layer.msg(res.message);
                getInitArtCate();
                layer.close(indexUpdate);
            }
        })
    })

    //删除按钮事件
    $('body').on('click', '#deleteBtn', function () {
        //显示提示框
        var id = $(this).attr('data-id');
        layer.confirm('确认删除吗', { icon: 3, title: '提示' }, function (index) {   
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/'+ id,
                success: function(res){
                    if(res.status !== 0){
                        return layer.msg(res.message);
                    }

                    layer.msg(res.message);
                    getInitArtCate();
                }

            })
        });
    })
})

