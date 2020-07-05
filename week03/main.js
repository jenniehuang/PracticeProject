var app = new Vue({
  el: '#app',
  // Vue 有雙向綁定的特性，在此需要先定義基本的資料才能進行綁定
  data: {
    text: '',
    categories: ["韓國泡麵", "日本泡麵", "新加坡泡麵"],
    temptProduct: {
      title: ''
      // category: '', 
      // content: '', 
      // enabled: true,
      // origin_price: null ,
      // price: null
    },
    list: [{
      id: 0,
      title: '安成湯麵',
      category: '韓國泡麵',
      content: '韓國第一名泡麵',
      description: '',
      imageUrl: '',
      enabled: true,
      origin_price: 60,
      price: 45,
      unit: 'NTD',
      options: {
        stars: 5,
        comments: [{
          name: '小明',
          avator: 'img url...',
          comment: '漂亮阿姨的餃子最好吃了'
        }]
      }
    }]
  },
  methods: {
    openModal(situation, item) {
      var vm = this;
      switch (situation) {
        case 'new':
          vm.temptProduct = {};
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