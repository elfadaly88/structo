import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-EHUV6UVS.js";

// src/app/core/services/whatsapp-link.service.ts
var WhatsAppLinkService = class _WhatsAppLinkService {
  buildLink(phone, message) {
    const normalized = this.normalizePhone(phone);
    if (!normalized) {
      return null;
    }
    return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
  }
  openChat(phone, message) {
    const link = this.buildLink(phone, message);
    if (!link || typeof window === "undefined") {
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
  }
  normalizePhone(phone) {
    if (!phone) {
      return null;
    }
    const digits = phone.replace(/\D/g, "");
    if (!digits) {
      return null;
    }
    if (digits.startsWith("20")) {
      return digits;
    }
    if (digits.startsWith("01") && digits.length === 11) {
      return `20${digits.slice(1)}`;
    }
    return digits;
  }
  static \u0275fac = function WhatsAppLinkService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WhatsAppLinkService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WhatsAppLinkService, factory: _WhatsAppLinkService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WhatsAppLinkService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  WhatsAppLinkService
};
//# sourceMappingURL=chunk-AUDUMTKV.js.map
