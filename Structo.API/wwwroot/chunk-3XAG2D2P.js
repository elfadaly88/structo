import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-ODSQXAQU.js";

// src/app/core/services/toast.service.ts
var ToastService = class _ToastService {
  toasts = signal(
    [],
    ...ngDevMode ? [{ debugName: "toasts" }] : (
      /* istanbul ignore next */
      []
    )
  );
  show(title, message, type = "info", onClick) {
    const id = Math.random().toString(36).substring(2, 9);
    const toast = { id, title, message, type, onClick };
    console.log("[ToastService] show() called:", toast);
    this.toasts.update((current) => [...current, toast]);
    setTimeout(() => this.dismiss(id), 6e3);
  }
  dismiss(id) {
    console.log("[ToastService] dismiss() called for ID:", id);
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }
  clearAll() {
    console.log("[ToastService] clearAll() called");
    this.toasts.set([]);
  }
  static \u0275fac = function ToastService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ToastService
};
//# sourceMappingURL=chunk-3XAG2D2P.js.map
