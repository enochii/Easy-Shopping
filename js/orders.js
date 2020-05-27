/*
    A sample :

    <div class="item-box">
        <div class="item-table">
            <div  class="item-row">
                <div class="col col-check">
                </div>
                <div class="col col-img">
                    <a href=""><img style="width:80px;" src="../img/cart/1.jpg" alt=""></a>
                </div>
                <div class="col col-name">直流变频落地扇1X 白色</div>
                <div class="col col-price">￥100.00</div>
                <div class="col col-num">数量</div>
                <div class="col col-total">小计</div>
                <div class="col col-time">5-25 12:08</div>
                <div class="col col-state">未付款</div>
            </div>
        </div>
    </div>
*/

function order2item(order) {
    // console.log(order);
    html = '';
    html += '<div class="item-table">';
    html += '<div  class="item-row">';
    html += '<div class="col col-check"></div>';
                    
    html += '<div class="col col-img">';
    html += '<a href=""><img style="width:80px;" src="../img/cart/1.jpg" alt=""></a>';
    html += '</div>';
    html += '<div class="col col-name">直流变频落地扇1X 白色</div>'
    html += '<div class="col col-price">￥100.00</div>'
    html += '<div class="col col-num">数量</div>'
    html += '<div class="col col-total">小计</div>'
    // html += '<div class="col col-time">5-25 12:08</div>'
    html += '<div class="col col-state">未付款</div>'
    html += '</div></div>'
    return html
}

const ORDER_URL_PREFIX = HOST + '/orders/';
function loadOrders() {
    if(!hasLogin()) {
        alert('你还没有登录哦，即将返回登陆界面');
        window.location.href = '../html/login.js';
    }
    var userid = localStorage.getItem('userid');
    url = ORDER_URL_PREFIX + userid;

    requestTemplate(url, undefined, loadOrderSucc, 'GET');
}

function loadOrderSucc(data_json) {
    if(data_json.code != 1) {
        alert(data_json.msg);
        return;
    }
    orders = data_json.payload.orders;

    var table = document.querySelector('#listBody');
    table.textContent = '';//清空
    orders.forEach(order => {
        html = order2item(order);
        var item = document.createElement('div');
        item.innerHTML = html;
        item.className = 'item-box';
        table.appendChild(item);
    });
}