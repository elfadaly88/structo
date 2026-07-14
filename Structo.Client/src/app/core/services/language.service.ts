import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  readonly currentLang = signal<'en' | 'ar'>('ar');

  initLanguage() {
    const saved = localStorage.getItem('ousos_lang') as 'en' | 'ar';
    const defaultLang = saved || 'ar';
    this.setLanguage(defaultLang);
  }

  setLanguage(lang: 'en' | 'ar') {
    this.currentLang.set(lang);
    localStorage.setItem('ousos_lang', lang);
    this.translate.use(lang);

    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    const html = this.document.documentElement;
    if (html) {
      html.setAttribute('dir', dir);
      html.setAttribute('lang', lang);
    }
  }

  toggleLanguage() {
    const nextLang = this.currentLang() === 'en' ? 'ar' : 'en';
    this.setLanguage(nextLang);
  }
}
