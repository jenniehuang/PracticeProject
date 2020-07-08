var app = new Vue({
  el: '#app',
  // Vue 有雙向綁定的特性，在此需要先定義基本的資料才能進行綁定
  data: {
    text: '',
    test:'',
    categories: ["韓國泡麵", "日本泡麵", "新加坡泡麵"],
    temptProduct: {
      options: {
        stars: 0
      }
    },
    list: [{
      id: 0,
      title: '安城湯麵',
      category: '韓國泡麵',
      content: '韓國第一名泡麵',
      description: '',
      imageUrl: 'https://media.karousell.com/media/photos/products/2016/08/17/_5__1471418825_2df21f9f.jpg',
      enabled: true,
      origin_price: 60,
      price: 45,
      unit: 'NTD',
      options: {
        stars: 5,
        deliver: ["宅配","超商取貨付款","郵局寄送"]
      }
    }]
  },
  methods: {
    openModal(situation, item) {
      var vm = this;
      switch (situation) {
        case 'new':
          // vm.$set(vm.temptProduct.options, 'stars', 0);
          vm.temptProduct = {
            options:{
              stars: 0
            }
           
          };
          break;
        case 'edit':
          vm.temptProduct = item;
          break;
        case 'delete':
          vm.temptProduct = item;
          break;
      }
    },
    updateProduct() {
      var vm = this;
      if (vm.temptProduct.id) {
        const id = vm.temptProduct.id;
        vm.list.forEach((e, index) => {
          if (e.id == id) {
            vm.list[index] = vm.temptProduct;
          }
        });

      } else {
        console.log("l");
        
        var time = (new Date()).getTime();
        vm.temptProduct.id = time;
        vm.list.push(vm.temptProduct);
      }
      vm.temptProduct = {};
      $('#editModal').modal('hide');
    },
    delProduct() {
      var vm = this;
      const id = vm.temptProduct.id;
      vm.list.forEach((e, index) => {
        if (e.id == id) {
          vm.list.splice(index, 1);
          console.log(index);
        }
      });
      $('#delModal').modal('hide');
    }
  }
});