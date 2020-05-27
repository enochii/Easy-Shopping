function loadDetail() {
    if(!localItemExist('proid')) {
        console.log('no proid available');
        return;
    }
    var url = HOST + '/products/' + localStorage.getItem('proid');
    console.log(url);
    requestTemplate(url, undefined, detailSuccess, 'GET');
}

function detailSuccess(data_json) {
    // 错误处理也可以放在 requestTemplate 里面
    if(data_json.code != 1) {
        console.log('loading product detail fails ');
        return;
    }

    product = data_json.payload;
    console.log('fill product detail');
    var name = document.querySelector('#product-name');
    name.textContent = product.name;

    document.querySelector('#product-desc').textContent = product.desc;
    
    // todo: 加图片... 还得最终改成绝对路径
    // 在 const 里面改吧
    document.querySelector('#product-picture').src = product.picture;
    document.querySelector('#product-price').textContent = product.price;
}
