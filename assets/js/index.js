$(function () {
  getUserInfo();

  // 点击按钮，实现退出功能
  $("#btnLogout").on("click", function () {
    // 提示用户是否确认退出
    layer.confirm(
      "你确定要退出登录吗?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem("token");
        // 2. 重新跳转到登录页面
        location.href = "/login.html";
        // 关闭 confirm 询问框
        layer.close(index);
      }
    );
  });
});

const { layer } = layui;

function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success(res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      // 调用 renderAvatar 渲染用户头像
      renderAvatar(res.data);
    },
    // 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: function (res) {
    //   // console.log('执行了 complete 回调：')
    //   // console.log(res)
    //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (
    //     res.responseJSON.status == 1 &&
    //     res.responseJSON.message == "身份认证失败！"
    //   ) {
    //     // 1. 强制清空 token
    //     localStorage.removeItem("token");
    //     // 2. 强制跳转到登录页面
    //     location.href = "/login.html";
    //   }
    // },
  });
}

// 渲染用户头像
function renderAvatar(user) {
  // 获取用户名的名称
  const name = user.nickname || user.username;
  // 设置欢迎的文本
  $("#welcome").html("欢迎  " + name);
  //
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    const first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
