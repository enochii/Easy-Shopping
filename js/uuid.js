// generate uuid
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function get_uuid() {
    if(!localItemExist('uuid')) {
        uuid = uuidv4();
        localStorage.setItem('uuid', uuid);
        return uuid;
    }
    // fast path
    uuid = localStorage.getItem('uuid');
    return uuid;
}

// function registerUuidThenOrder() {
//     var uuid = get_uuid();
//     console.log(uuid);
//     // 用 uuid 作为名字注册匿名用户
//     var formdata = new FormData();
//     formdata.append('username', uuid);
//     formdata.append('password', 'nopassword');

//     var url = HOST + '/users'
//     console.log('uuid register');
//     // 现在会有 合法的userid 在 local storage 了
//     requestWithFormData(url, formdata, registerSuccess);
// }

// function addCart() {
//     var id = localStorage.getItem('userid');
//     if(id == -1) {
//         // 未登录 且没有 uuid
//         registerUuidThenOrder();
//     } else {
//         newOrder();
//     }
// }