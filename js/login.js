// import { LOGIN_URL } from "./const";

function handleSubmit() {
    function sendData(form) {
        var request = new XMLHttpRequest();
        request.open('POST', LOGIN_URL);
        request.responseType = JSON_FORMAT;
    
        request.onload = function() {
            console.log('onload');
        };
    
        var formdata  = new FormData(form);
    
        // 数据成功发送
        request.addEventListener("load", function(event) {
            data = JSON.parse(event.target.responseText);
            
            console.log(data);
            // 把 token 存到 local storage
            if(data.code == 1) {
                localStorage.setItem("token", data.payload.token);
                localStorage.setItem("userid", data.payload.userid);
                window.location.href = '../index.html'
            } else {
                alert(data.msg)
            }
        });
    
        // 失败
        request.addEventListener("error", function(event) {
            alert('something went wrong');
        });

        console.log(formdata);
        // 发送的数据是由用户在表单中提供的
        request.send(formdata);
    }
    
    var form = document.getElementById("loginForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendData(form)
        // alert('登录成功')
    })
}