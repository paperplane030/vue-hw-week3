import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js'

createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'paperplane-hexschool',
      products: [],
      product_temp: null,
      isReady: false,
    }
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    axios.defaults.headers.common['Authorization'] = token
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      axios
        .post(`${this.url}/api/user/check`)
        // 成功
        .then((res) => {
          this.getData()
        })
        // 失敗
        .catch((error) => {
          const toastDOM = document.querySelector('#toast')
          const toast = new bootstrap.Toast(toastDOM)
          toast.show()
          setTimeout(() => {
            window.location = 'login.html'
          }, 3000)
        })
    },
    getData() {
      axios
        .get(`${this.url}/api/${this.path}/admin/products`)
        // 成功
        .then((res) => {
          this.products = res.data.products
          this.isReady = true
        })
        // 失敗
        .catch((error) => {
          // console.dir(error)
        })
    },
    productDetail(index) {
      this.product_temp = this.products[index]
    },
    toastOpen() {
      const toastDOM = document.querySelector('#toast')
      const toast = new bootstrap.Toast(toastDOM)
      toast.show()
    },
  },
}).mount('#app')
