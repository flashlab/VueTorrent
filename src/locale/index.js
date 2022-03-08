import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/locale/en.json'
import axios from 'axios'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages: {
    en: messages
  }
})

const loadedLanguages = ['en'] // our default language that is preloaded

export const languagesAvailable = ['en', 'fr', 'id', 'it', 'nl', 'pt-br', 'zh', 'zh-hant']

function setI18nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)

  return lang
}

export function navigatorLanguage() {
  const clientLang = navigator.language
  if (languagesAvailable.includes(clientLang)) {
    return clientLang
  } else if (clientLang.includes('-')) {
    const clientLangSplit = clientLang.split('-')
    if (languagesAvailable.includes(clientLangSplit[0])) {
      return clientLangSplit[0]
    }
  }

  return 'en'
}

export function loadLanguageAsync(lang) {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language hasn't been loaded yet
  return import(/* webpackChunkName: "lang-[request]" */ `./${lang}.json`).then(
    messages => {
      i18n.setLocaleMessage(lang, messages)
      loadedLanguages.push(lang)

      return setI18nLanguage(lang)
    }
  )
}
