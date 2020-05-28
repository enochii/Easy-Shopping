// 通用的  ajax 请求
// 会返回一个 request 对象
// 可以替换默认的 handler
function requestTemplate(url, form, handleResponse, method  = 'POST') {
    var formdata = new FormData(form);
    requestWithFormData(url, formdata, handleResponse, method);
}

// 打个补丁
// 有些 FormData 是手工构造的
function requestWithFormData(url, formdata, handleResponse, method  = 'POST') {
    var request = new XMLHttpRequest();
    request.open(method, url);
    request.responseType = JSON_FORMAT;

    // default onload
    request.onload = function() {
        console.log('onload');
    };

    // 数据成功发送
    request.addEventListener("load", function(event) {
        // console.log(event.target.responseText);
        data = JSON.parse(event.target.responseText);
        
        // console.log(data);
        // 把 token 存到 local storage
        handleResponse(data);
    });

    // 失败
    request.addEventListener("error", function(event) {
        alert('something went wrong');
    });

    // console.log(formdata);
    // 发送的数据是由用户在表单中提供的
    request.send(formdata);
    
    console.log('send request');
    return request;
}

// 判断用户是否登录
function hasLogin() {
    return localItemExist('token');
}

function localItemExist(key) {
    token = localStorage.getItem(key);
    return typeof(token) != "undefined";
}

function logout() {
    localStorage.removeItem('token');
}

// 根据 local storage 填充用户名和密码
function fillUserInfo() {
    if(localItemExist('username')) {
        
    }
}