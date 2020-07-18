const uuid = 'd34cdc3f-0b73-4b5e-86d5-7684d0dd3241';
const apiPath = 'https://course-ec-api.hexschool.io/api/';
new Vue({
  el: '#app',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      token: ''
    };
  },
  methods: {
    signin() {
      const api = `${apiPath}auth/login`;
      axios.post(api, this.user).then((response) => {
        const token = response.data.token;
        const expired = response.data.expired;
        document.cookie = `temptToken=${token}; expires=${new Date(expired * 1000)}`;

        //成功登入跳轉畫面
        window.location = 'products.html'

      }).catch((error) => {
        console.log(error);
      });

    }

  },

})