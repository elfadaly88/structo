import {
  TranslateService
} from "./chunk-2SDLZEQZ.js";
import {
  DOCUMENT,
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-EHUV6UVS.js";

// src/app/core/services/language.service.ts
var LanguageService = class _LanguageService {
  translate = inject(TranslateService);
  document = inject(DOCUMENT);
  currentLang = signal(
    "ar",
    ...ngDevMode ? [{ debugName: "currentLang" }] : (
      /* istanbul ignore next */
      []
    )
  );
  initLanguage() {
    const saved = localStorage.getItem("osos_lang");
    const defaultLang = saved || "ar";
    this.setLanguage(defaultLang);
  }
  setLanguage(lang) {
    this.currentLang.set(lang);
    localStorage.setItem("osos_lang", lang);
    this.translate.use(lang);
    const dir = lang === "ar" ? "rtl" : "ltr";
    const html = this.document.documentElement;
    if (html) {
      html.setAttribute("dir", dir);
      html.setAttribute("lang", lang);
    }
  }
  toggleLanguage() {
    const nextLang = this.currentLang() === "en" ? "ar" : "en";
    this.setLanguage(nextLang);
  }
  static \u0275fac = function LanguageService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LanguageService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LanguageService, factory: _LanguageService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LanguageService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  LanguageService
};
//# sourceMappingURL=chunk-TPAXF35E.js.map
