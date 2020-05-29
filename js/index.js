// 所有的产品数
var totalProduct = 0
// 每页展示 8 个产品，做分页
const productPerPage = 8

const urlPrefix = HOST+"/products/page/";

// index 页面的 products 列表
var index_products = undefined;
var index_purchase_cnt = undefined

// loadData
function loadProductPage(page, urlpre) {
    var request = new XMLHttpRequest();
    request.open('GET', urlpre+page);
    request.responseType = JSON_FORMAT;

    request.onload = function() {
        console.log('onload');
    };
    // 数据成功发送
    request.addEventListener("load", function(event) {
        data = JSON.parse(event.target.responseText);
        // 把 token 存到 local storage
        if(data.code == SUCCESS) {
            console.log('success');
            console.log(data.payload);
            // append
            payload = data.payload;

            pros = payload.products;
            // 全局对象赋值（index.js）
            index_products = pros
            index_purchase_cnt = Array(pros.length)

            console.log(pros);
            var table = document.querySelector("#product-list");
            // remove all children
            table.textContent = '';
            var index = 0
            pros.forEach(item => {
                index ++;
                var html = product2tr(item,index );

                // console.log(table.childNodes.length);
                var tr = document.createElement('li');
                if(index > 4) tr.className = "down";
                tr.innerHTML = html.trim();
                table.appendChild(tr)
            });
            // 页面个数
            console.log('total page ' + payload.total_page);
            var totalPage = payload.total_page;
            var pageList = document.querySelector('#page-list');
            if(page > totalPage) {
                alert('页面加载出了点小问题');
                reutrn ;
            }
            pageList.innerHTML = ''; // 清空数据
            for(i = 1; i<=totalPage; i++) {
                // <a href="#">2</a>
                var item = document.createElement('a');
                item.href = '#';
                
                html = '<span onclick="loadProductPage(';
                html += i + ', urlPrefix)">' + i + '</span>';
                item.innerHTML = html;
                pageList.appendChild(item);
            }

        } else {
            console.log('something went wrong')
        }
    });

    // 失败
    request.addEventListener("error", function(event) {
        alert('something went wrong');
    });

    request.send();
}

/* sample: 
    <li>
        <div>
            <img src="img/index/jiadian1.jpg"/>
            <h3>小米电视4A 32英寸</h3>
            <p class="index-pro-desc">64位四核处理器 / 1GB+4GB大内存</p>
            <p class="price">999 元<del>1199元</del></p>
        </div>
    </li>
*/
function product2tr(item, index) {
    var html = '';

    html += '<div>';
    html += '<a href= "detail.html">'

    html += '<img src="'+item.picture+'" onclick="setProid(';
    html += item.proid + ')"/></a>';
    html += '<h3>'+ item.name +'</h3>';
    // todo: 加一个简介
    // console.log(item);
    html += '<p class="index-pro-desc">'+ item.descr+'</p>';
    html += '<p class="price"> ￥' + item.price + '</p>' 

    html += '</div>';
    return html;
}

function setProid(proid) {
    localStorage.setItem('proid', proid);
}