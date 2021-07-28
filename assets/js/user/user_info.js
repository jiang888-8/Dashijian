$(function () {
  const { form, layer } = layui;
  getUserInfo();

  // 自定义验证
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在 1 ~ 6 个字符之间！";
      }
    },
  });

  // 初始化用户的基本信息
  function getUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // console.log(res);

        // 快速填充表单
        form.val("formUserInfo", res.data);
      },
    });
  }

  // 重置按钮  重置表单的数据
  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    getUserInfo();
  });

  // 修改按钮
  // 监听表单的提交事件
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message || "修改失败！");
        }
        layer.msg(res.message);
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        window.parent.getUserInfo();
      },
    });
  });
});
