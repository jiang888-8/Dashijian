$(function () {
  // 点击‘去注册账号’的链接事件
  $("#link-reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  // 点击‘去登录’的链接事件
  $("#link-login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  // 从layui中获得对象
  const { form, layer } = layui;
  // const layer = layui.layer;
  // 自定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    rePwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      const pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致！";
      }
    },
  });

  // 监听注册表单提交事件
  $("#formReg").on("submit", function (e) {
    e.preventDefault();
    const data = {
      username: $(".reg-box [name=username]").val(),
      password: $(".reg-box [name=password]").val(),
    };
    $.ajax({
      method: "POST",
      url: "/api/reguser",
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功，请登录");

        $("#link-login").click();
      },
    });
  });

  // 监听登录表单提交事件
  $("#formLogin").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("登录成功");
        // 将登录成功得到的token字符串，保存到localStorage中
        localStorage.setItem("token", res.token);
        // 跳转到后台主页
        location.href = "/index.html";
      },
    });
  });
});
