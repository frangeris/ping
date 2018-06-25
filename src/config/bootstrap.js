import vue from 'vue'
import vee from 'vee-validate'
import moment from 'moment'
import axios from 'axios'

// vee validate
vue.use(vee)

// moment js
moment.locale(process.env.DEFAULT_LANG)

// axios
axios.defaults.baseURL = `${process.env.API_URL}/${process.env.ENVIRONMENT}`
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.interceptors.request.use(config => config)
axios.interceptors.response.use(response => response.data)
