import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js'

createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'paperplane-hexschool',
      user: {
        username: '',
        password: '',
      },
      toastBg: '',
      toastText: '',
    }
  },
  methods: {
    login() {
      axios
        .post(`${this.url}/admin/signin`, this.user)
        // 成功
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `token= ${token}; expries=${new Date(expired)}`
          const toastDOM = document.querySelector('#toast')
          const toast = new bootstrap.Toast(toastDOM)
          this.toastBg = 'bg-success'
          this.toastText = '登入成功，即將轉入後台...'
          toast.show()
          setTimeout(() => {
            window.location = 'products_list.html'
          }, 3000)
        })
        // 失敗
        .catch((error) => {
          const toastDOM = document.querySelector('#toast')
          const toast = new bootstrap.Toast(toastDOM)
          this.toastBg = 'bg-danger'
          this.toastText = '登入失敗，請重新登入...'
          toast.show()
          // console.dir(error)
        })
    },
  },
}).mount('#app')
