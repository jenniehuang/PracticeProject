const apiPath = 'https://course-ec-api.hexschool.io/api/';
const uuid = 'd34cdc3f-0b73-4b5e-86d5-7684d0dd3241';

import pagination from './pagination.js';
Vue.component('pagination',pagination)

var app = new Vue({
  el: '#app',
  data: {
    token:'',
    categories: ["韓國泡麵", "日本泡麵", "新加坡泡麵"],
    temptProduct: {
      imageUrl: [],
      description:'',
      options: {
        stars: 0
      }
    },
    products:{
    },
    pagination:{

    },
    isNew: true
  },
  methods: {
    //取得api全部資料
    getData(page = 1){
      console.log(page);
      this.token = document.cookie
      .split('; ')
      .find(row => row.startsWith('temptToken'))
      .split('=')[1];

    const api = `${apiPath}${uuid}/admin/ec/products?page=${page}`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

    axios.get(api).then((response) => {
        this.products = response.data.data;
        this.pagination = response.data.meta.pagination;
      })
    },  
    openModal(situation, item) {
      var vm = this;
      switch (situation) {
        //新增產品 清空原有資料屬性
        case 'new':
          vm.temptProduct = {
            imageUrl: [],
            options:{
              stars: 0
            }
          };
          
          vm.isNew = true ;
        break;
        //編輯產品 取得該產品api資料
        case 'edit':
          vm.getProduct(item.id);
          vm.isNew = false ;
        break;
        case 'delete':
          vm.temptProduct = Object.assign({}, item);
        break;
      }
    },
    getProduct(id) {
     const api = `${apiPath}${uuid}/admin/ec/product/${id}`;
     axios.get(api).then((res) => {
       //將取回的資料放入 temptProduct
       this.temptProduct = res.data.data;
       // 確保資料已經回寫後在打開 Modal
       $('#editModal').modal('show');
      }).catch((error) => {
        console.log(error); 
      });
    },
    updateProduct() {
     //新增產品
     const vm = this;
     let api = `${apiPath}${uuid}/admin/ec/product`;
     let httpMethod = 'post';
     //編輯產品時
     if (!vm.isNew){
       api = `${api}/${vm.temptProduct.id}`;
       httpMethod = 'patch';
     }
     axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
     
     axios[httpMethod](api,this.temptProduct).then(()=>{
      //更新後關閉modal
      $('#editModal').modal('hide');
      this.getData();
     }).catch((error)=>{
       console.log(error)
     })
    },
    delProduct() {
      var vm = this;
      const api = `${apiPath}${uuid}/admin/ec/product/${vm.temptProduct.id}`;

      axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      axios.delete(api).then(()=>{
       //更新後關閉modal
       $('#delProductModal').modal('hide');
       this.getData();
      }).catch((error)=>{
        console.log(error)
      });
    },
    signout() {
      document.cookie = `temptToken=; expires=`;
      window.location = 'login.html';
    }
  }
});

app.getData();

