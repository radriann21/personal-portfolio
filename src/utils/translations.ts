// @ts-nocheck
import { ui, defaultLanguage } from "../i18n/ui"

export const getLangFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as keyof typeof ui
  return defaultLanguage
}

export const getTranslations = (lang: keyof typeof ui) => {
  return function t(key: keyof typeof ui[typeof defaultLanguage]) {
    return ui[lang] && key in ui[lang] ? ui[lang][key] : ui[defaultLanguage][key]
  }
}

