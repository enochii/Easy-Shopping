function register() {
    // required 属性虽然 出发，但是还是得和 拦截表单 submit 结合--
    var form = document.querySelector("#registerForm");
    var url = HOST + '/users'
    console.log('register');
    requestTemplate(url, form, registerSuccess);
}

function registerSuccess(data_json) {
    if(data_json.code != 1) {
        alert(data_json.msg);
        return;
    }

    payload = data_json.payload;
    console.log(payload);
    localStorage.setItem('username', payload.username);
    localStorage.setItem('password', payload.password);
    location.href='./login.html';
}