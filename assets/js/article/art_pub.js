$(function () {
    const layer = layui.layer;
    const form = layui.form;
    initCate();

    // 初始化富文本编辑器
    initEditor()


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                let htmlStr = template('init_cates', res);
                $("[name=cate_id]").html(htmlStr);
                form.render();
            }
        })
    }

    //未选择封面的按钮绑定事件
    $("#btnChooseImage").on('click', function () {
        $("#coverFile").click();
    })
    //监听coverFile的change事件
    $("#coverFile").on('change', function (e) {

        //获取到文件的列表数组
        var files = e.target.files;
        //判断用户是否选择了文件
        if (files.length <= 0) {
            return;
        }
        //根据文件，创建对应的URL地址
        var newImgURL = URL.createObjectURL(files[0]);

        //先销毁旧的裁剪区域，再重新设置图片路径`，之后再`创建新的裁剪区域`
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    let state = "已发布";
    $("#save").on("click", function () {
        state = "草稿";
    })

    $("#form-pub").on('submit', function (e) {
        e.preventDefault();

        var fd = new FormData($(this)[0]);
        fd.append("state", state);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append("cover_img", blob);
                //发送ajax请求
                publishArticle(fd);
            })
    })

    function publishArticle(fd){
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function(res){
                if(res.status !== 0){
                    layer.msg(res.message);
                }
                layer.msg("发布文章成功！");
                location.href = "/article/atr_list.html"
            }

        })
    }
})