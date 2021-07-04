// 检查连接信息的输入

function checkInfo(){
    if($("#user").val() == ""){
        alert("用户名不能为空！")
        return false
    }
    if($("#password").val() == ""){
        alert("密码不能为空！")
        return false
    }
    return true
}

function checkInfo2(){
    if($("#user2").val() == ""){
        alert("用户名不能为空！")
        return false
    }
    if($("#password2").val() == ""){
        alert("密码不能为空！")
        return false
    }
    if($("#repassword").val() == ""){
        alert("密码不能为空！")
        return false
    }

    if($("#repassword").val() != $("#password2").val()){
        alert("两次输入密码不相同！")
        return false
    }
    return true
}
// 登录
function login(){
    if(checkInfo()){
        data = {
            user:$("#user").val(),
            password:$("#password").val()
        }
        $.ajax({
            type: 'POST',
            url: BASE_URL + '/login',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(res) {
                if (res['status']) {
                    localStorage.setItem('current', JSON.stringify(data))
                    M.toast({ html: '登录成功' })
                    window.location.href = "main.html"
                } else {
                    M.toast({ html: "登录失败：" + res['msg'] })
                        // alert("登录失败：" + res['msg'])
                }
            },
            dataType: 'json'
        });
    }
}

// 注册

function register(){
    if(checkInfo2()){
        data = {
            user: $("#user2").val(),
            password:$("#password2").val(),
        }
        $.ajax({
            type:"POST",
            url:BASE_URL + '/register',
            data:JSON.stringify(data),
            contentType:"application/json;charset=utf-8",
            success: function(res) {
                if (res['status']) {
                    localStorage.setItem('current', JSON.stringify(data))
                    M.toast({ html: '注册成功' })
                    window.location.href = "main.html"
                } else {
                    M.toast({ html: "注册失败：" + res['msg'] })
                        // alert("登录失败：" + res['msg'])
                }
            },
            dataType: 'json'
        });
    }
}
