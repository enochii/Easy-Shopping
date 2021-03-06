// 需要在页面之间传递的数据使用 localStorage
// 单页使用且每次刷新就改变的，使用全局变量

// 当前页面产品个数
product_num = 1;
product_stock = undefined;

function getProInput() {
    return document.querySelector('#product-num');
}

function decProNum() {
    var input_item = getProInput();
    if(input_item == null) console.log("该商品不存在")

    if(input_item.value <= 1) return;
    input_item.value --;
    product_num = input_item.value;
    console.log(product_num);
}

function incProNum() {
    var input_item = getProInput();
    if(input_item == null) console.log("该商品不存在")

    // if(input_item.value >= product_stock) {
    //     return;
    // }
    input_item.value ++;
    product_num = input_item.value;
    console.log(product_num);
}

function newOrder() {
    // proid | num | userid |
    // 准备数据
    // if(!hasLogin()) {
    //     alert('你还没登录呢！');
    //     return;
    // }
    var form = new FormData();
    userid = localStorage.getItem('userid');
    if (userid == -1) {
        console.log(userid);

        var uuid = get_uuid();
        form.append('uuid', uuid);
        console.log(uuid);
    }

    proid = localStorage.getItem('proid');
    
    form.append('proid', proid);
    form.append('userid', userid);
    form.append('num', product_num);

    var url = HOST + '/orders';

    function newOrderSucc(data_json) {
        if(data_json.code != 1) {
            alert('下单好像有问题');
            return;
        }
        payload = data_json.payload;
        console.log(payload);
        if(payload.userid != userid) {
            console.log('uuid update userid', userid);
            localStorage.setItem('userid', payload.userid);
            console.log(localStorage.getItem('userid'));
        }
    
        alert('下单成功啦！你可以点右上角去购物车看看哦')
    }

    requestWithFormData(url, form, newOrderSucc);
}


function payNow() {

}

function loadDetail() {
    if(!localItemExist('proid')) {
        console.log('no proid available');
        return;
    }
    var url = HOST + '/products/' + localStorage.getItem('proid');
    getProInput().value = product_num;
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

    product_stock = product.stock;
    document.querySelector('#product-desc').textContent = product.descr;
    
    // todo: 加图片... 还得最终改成绝对路径
    // 在 const 里面改吧
    document.querySelector('#product-picture').src = product.picture;
    document.querySelector('#product-price').textContent = product.price;
}
