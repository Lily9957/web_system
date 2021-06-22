$(function () {
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: ""
    }

    getList();
    initCate();
    const form = layui.form;
    function getList() {
        //文章列表请求
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    }

    //渲染分类可选项
    function initCate(){
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res){
                let htmlStr = template('tpl-cate', res);
                console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }
})