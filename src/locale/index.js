import Vue from 'vue'
import I18n from 'vue-i18n'
import es from '@locale/es.json'
import en from '@locale/en.json'

// locale
Vue.use(I18n)
Vue.config.lang = process.env.DEFAULT_LANG

export default new I18n({
  locale: Vue.config.lang,
  messages: {
    es,
    en
  }
})
