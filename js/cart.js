const UNPAID_ORDER_URL_PREFIX = HOST + '/orders/unpaid/';
function loadUnpaidOrders() {
    if(!hasLogin()) {
        alert('你还没有登录哦，即将返回登陆界面');
        window.location.href = '../html/login.html';
    }
    var userid = localStorage.getItem('userid');
    url = UNPAID_ORDER_URL_PREFIX + userid;

    requestTemplate(url, undefined, loadUnpaidOrderSucc, 'GET');
}

function loadUnpaidOrderSucc(data_json) {
    if(data_json.code != 1) {
        alert(data_json.msg);
        return;
    }
    orders = data_json.payload.orders;

    var table = document.querySelector('#listBody');
    table.textContent = '';//清空
    orders.forEach(order => {
        html = unpaidOrder2item(order);
        var item = document.createElement('div');
        item.innerHTML = html;
        item.className = 'item-box';
        item.id = 'box-' + order.orderid;
        table.appendChild(item);
    });
}

function selectAllOnChange() {
    // 取消全选 或  全选
    checked = document.querySelector('#selectAll').checked;
    
    var children = document.querySelectorAll('.item-row');
    var totalPrice = 0;
    children.forEach(element => {
        var cb = element.querySelector('.check-box')
        cb.checked = checked;
        if(checked) totalPrice += getItemrowPrice(element);
    });
    console.log(totalPrice);
    setTotalPrice(totalPrice);
}

// 当选中或取消选中一个 订单，需要更新总价，以及表格
function oneItemOnchange(orderid) {
    // item-row  即一个产品
    var item = document.querySelector("#order-"+orderid);

    var checkbox = item.querySelector('.check-box');
    
    var price = getItemrowPrice(item);
    delta = checkbox.checked==true? price : -price;
    if(checkbox.checked == false) {
        // 取消全选
    }

    changeTotalPrice(delta);
    // console.log(delta);
}

function unpaidOrder2item(order) {
    // console.log(order);
    html = '';
    html += '<div class="item-table">';
    html += '<div  class="item-row" ';
    html += 'id="order-'+order.orderid +'">';

    // 这里要整 选中的 逻辑
    // 选中和取消选中
    html += '<div class="col col-check">';
    html += '<input class="check-box" type="checkbox" onchange="oneItemOnchange('+ order.orderid +')"/>';
    html += '</div>';
    
    html += '<div class="col place-holder">&nbsp;</div>';
    html += '<div class="col col-img">';
    html += '<a href=""><img style="width:80px;" src="';
    // todo : 考虑怎么整图片路径
    html += order.picture;
    html += '" alt="产品缩略图"></a>';
    html += '</div>';
    html += '<div class="col col-name">';
    html += order.name;
    html += '</div>';
    html += '<div class="col col-price">￥';
    html += order.price + '</div>';
    html += '<div class="col col-num">';
    html += order.num + '</div>';
    html += '<div class="col col-total">￥';
    html += (order.num * order.price) + '</div>';
    // html += '<div class="col col-time">5-25 12:08</div>'
    html += '<div class="col col-action"><button '
    // html += (order.state == 0? '未付款':'已付款');
    html += 'onclick="removeUnpaidOrder('+order.orderid+')"';
    html += '>移除'
    
    html += '</button></div></div>';
    html += '</div>';
    return html
}


function changeTotalPrice(delta) {
    totalPriceItem = document.querySelector('#cartTotalPrice');
    totalPriceItem.innerHTML = delta + parseInt(totalPriceItem.innerHTML);
    console.log(totalPriceItem.innerHTML)
}

function setTotalPrice(val) {
    totalPriceItem = document.querySelector('#cartTotalPrice');
    totalPriceItem.innerHTML = val;
}

// 对 item-box item-table item-row 均适用
function getItemrowPrice(item) {
    ret = parseFloat(item.querySelector('.col-total').innerHTML.slice(1)); // skip ￥
    // console.log(ret);
    return ret;
}

function removeUnpaidOrder(orderid) {
    // 发请求给后端请求删除
    var url = HOST + '/orders/' + orderid;

    function rmUnpaidSucc(data_json) {
        if(data_json.code != 1) {
            alert(data_json.msg);
            return;
        }
        
        rmOrder_FrontEnd(orderid);
    }

    requestTemplate(url,undefined,rmUnpaidSucc,'DELETE');
}

// 在前端删除 order item 
function rmOrder_FrontEnd(orderid ){
    var itembox = document.querySelector('#box-'+orderid);

    var cb = itembox.querySelector('.check-box');
    if(cb.checked == true)changeTotalPrice(-getItemrowPrice(itembox));
    // 这里
    console.log('delete order');
    itembox.parentNode.removeChild(itembox);
}

function getAllOrderId() {
    var children = document.querySelectorAll('.item-row');
    console.log(children)

    var orderids = []
    children.forEach(element => {
        var cb = element.querySelector('.check-box')
        orderid = element.id.slice(6);
        if(cb.checked) orderids.push(parseInt(orderid))
    });

    return orderids;
}
function payAll() {
    var url = HOST + '/orders/pay';
    orderids = getAllOrderId();
    console.log(orderids);
    
    var formdata = new FormData();
    formdata.append('orders', JSON.stringify(orderids));
    requestWithFormData(url, formdata, removeCheckedOrders)

    function removeCheckedOrders(data_json) {
        if(data_json.code != 1) {
            alert(data_json.msg);
            return ;
        }
        //
        orderids.forEach(id => {
            rmOrder_FrontEnd(id);
        });
    }
}