$(function () {
  const { layer, form } = layui;
  initArtCateList();

  //
  function initArtCateList() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        const htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  }

  //
  let index = null;
  $("#btnAdd").on("click", function () {
    index = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });

  //
  // 通过代理的形式，为 form-add 表单绑定 submit 事件
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("添加失败");
        }
        initArtCateList();
        layer.msg("添加成功");
        // 根据索引，关闭对应的弹出层
        layer.close(index);
      },
    });
  });

  //
  let indexEiDt = null;
  $("tbody").on("click", ".btn-edit", function (e) {
    indexEiDt = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });

    //
    const id = $(this).attr("data-Id");
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });

  //
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新分类失败");
        }
        layer.msg("更新分类成功");
        layer.close(indexEiDt);
        initArtCateList();
      },
    });
  });

  //
  $("tbody").on("click", ".btn-delete", function () {
    const id = $(this).attr("data-Id");
    layer.confirm("确认删除", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg("删除失败");
          }
          layer.msg("删除成功");
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });
});
