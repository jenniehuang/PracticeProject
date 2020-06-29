var productList = document.getElementById('productList')
var uuid = "d34cdc3f-0b73-4b5e-86d5-7684d0dd3241";
var apiPath = 'https://course-ec-api.hexschool.io/';


var obj2 ={
    info:{
        api:`${apiPath}api/${uuid}/ec/products`,
        products:[]
    },
    getAPI: function (){
        var vm = this;
        axios.get(this.info.api)
             .then(function (response){
               vm.info.products = response.data.data;
               vm.renderHTML();
            })},
    renderHTML: function(){
        var productsArray = this.info.products;
        var content = '';
        productsArray.forEach(e => {
            content += ` <div class="col-12 col-lg-4 ">
           <div class="card mx-auto mb-4" style="width: 18rem;">
           <div class="img-top" style="background-image: url(${e.imageUrl[0]});"></div>
               <div class="card-body">
                   <h5 class="card-title">${e.title}</h5>
                   <span class="badge badge-pill ">${e.category}</span>
                   <p class="card-text">${e.content}</p>
                   <p class="price"><span>$${e.origin_price}</span>特價: $${e.price}</p>
                   <a href="#" class="btn btn-custom"><span>+</span>加入購物車</a>
               </div>
           </div>
       </div>`;

       
        });
        productList.innerHTML = content;
    }
};

obj2.getAPI();


// 原先寫法
// var Obj = {};
    

// function getData() {
//     var api = `${apiPath}api/${uuid}/ec/products`;
//     axios.get(api)
//          .then(function (response) {
//             Obj = response.data.data;
//             var content = '';
//             Obj.forEach(e => {
//                 content += ` <div class="col-12 col-lg-4 ">
//                <div class="card mx-auto mb-4" style="width: 18rem;">
//                <div class="img-top" style="background-image: url(${e.imageUrl[0]});"></div>
//                    <div class="card-body">
//                        <h5 class="card-title">${e.title}</h5>
//                        <span class="badge badge-pill ">${e.category}</span>
//                        <p class="card-text">${e.content}</p>
//                        <a href="#" class="btn btn-custom"><span>+</span>加入購物車</a>
//                    </div>
//                </div>
//            </div>`;

//             });
//             productList.innerHTML = content;
//         })
// }


// getData();