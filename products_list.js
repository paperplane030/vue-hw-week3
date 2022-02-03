import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js'
// let productModal = {}
createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'paperplane-hexschool',
      products: [],
      product_temp: {
        edit: false,
        data: {
          title: '',
          category: '',
          origin_price: 0,
          price: 0,
          unit: '',
          description: '',
          content: '',
          is_enabled: 0,
          imageUrl: '',
          imagesUrl: [],
        },
      },
      isReady: false,
      productModal: {},
      delProductModal: {},
      toast: {
        instance: {},
        text: '',
      },
    }
  },
  mounted() {
    this.checkLogin()
    // 定義 toast
    this.toast = new bootstrap.Toast(document.querySelector('#toast'))
    // 定義 modal
    this.productModal = new bootstrap.Modal(
      document.querySelector('#productModal')
    )
    this.delProductModal = new bootstrap.Modal(
      document.querySelector('#delProductModal')
    )
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      axios.defaults.headers.common['Authorization'] = token
      axios
        .post(`${this.url}/api/user/check`)
        // 成功
        .then((res) => {
          this.getData()
        })
        // 失敗
        .catch((error) => {
          // console.dir(error)
          this.toast.text = '登入資訊驗證錯誤，將回到登入頁面...'
          this.toast.show()
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
    addProductModal() {
      this.product_temp.edit = false
      this.productModal.show()
    },
    addProduct() {
      axios
        .post(`${this.url}/api/${this.path}/admin/product`, {
          data: this.product_temp.data,
        })
        // 成功
        .then((res) => {
          this.getData()
          this.productModal.hide()
        })
        // 失敗
        .catch((error) => {
          alert('新增商品失敗，請重新操作')
          this.productModal.hide()
        })
    },
    editProductModal(item) {
      this.product_temp.edit = true
      this.product_temp.data = item
      this.productModal.show()
    },
    editProduct() {
      axios
        .put(
          `${this.url}/api/${this.path}/admin/product/${this.product_temp.data.id}`,
          {
            data: this.product_temp.data,
          }
        )
        // 成功
        .then((res) => {
          this.getData()
          this.productModal.hide()
        })
        // 失敗
        .catch((error) => {
          alert('編輯商品失敗，請重新操作')
          this.productModal.hide()
        })
    },
    openDelProductModal(item) {
      this.delProductModal.show()
      this.product_temp.data = item
    },
    delProduct() {
      axios
        .delete(
          `${this.url}/api/${this.path}/admin/product/${this.product_temp.data.id}`
        )
        // 成功
        .then((res) => {
          this.getData()
          this.delProductModal.hide()
        })
        // 失敗
        .catch((error) => {
          alert('刪除商品失敗，請重新操作')
          this.delProductModal.hide()
        })
    },
    delImages(index) {
      this.product_temp.data.imagesUrl.splice(index, 1)
    },
    productStatus(status, item) {
      const temp = JSON.parse(JSON.stringify(item))
      temp.is_enabled = status
      axios
        .put(`${this.url}/api/${this.path}/admin/product/${temp.id}`, {
          data: temp,
        })
        // 成功
        .then((res) => {
          this.getData()
        })
        // 失敗
        .catch((error) => {
          alert('編輯商品失敗，請重新操作')
        })
    },
    toastOpen() {
      this.toast.text = '登入資訊驗證錯誤，將回到登入頁面...'
      this.toast.show()
    },
  },
}).mount('#app')
