import {
  Injectable,
  __spreadValues,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-EHUV6UVS.js";

// src/app/core/services/confirm-modal.service.ts
var ConfirmModalService = class _ConfirmModalService {
  // ── Confirm state ──
  isConfirmOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isConfirmOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  confirmConfig = signal(
    {
      title: "",
      message: "",
      confirmText: "Confirm",
      cancelText: "Cancel",
      type: "danger"
    },
    ...ngDevMode ? [{ debugName: "confirmConfig" }] : (
      /* istanbul ignore next */
      []
    )
  );
  confirmResolve = null;
  // ── Alert state ──
  isAlertOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isAlertOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  alertConfig = signal(
    {
      title: "",
      message: "",
      buttonText: "OK",
      type: "error"
    },
    ...ngDevMode ? [{ debugName: "alertConfig" }] : (
      /* istanbul ignore next */
      []
    )
  );
  alertResolve = null;
  toggleBodyScroll(lock) {
    if (typeof document !== "undefined" && document.body) {
      if (lock) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    }
  }
  /**
   * Opens a confirmation dialog. Returns a Promise that resolves to
   * `true` (confirmed) or `false` (cancelled).
   */
  confirm(config) {
    this.confirmConfig.set(__spreadValues({
      confirmText: "Confirm",
      cancelText: "Cancel",
      type: "danger"
    }, config));
    this.isConfirmOpen.set(true);
    this.toggleBodyScroll(true);
    return new Promise((resolve) => {
      this.confirmResolve = resolve;
    });
  }
  /** Called internally by the modal component. */
  resolveConfirm(result) {
    this.isConfirmOpen.set(false);
    this.toggleBodyScroll(false);
    this.confirmResolve?.(result);
    this.confirmResolve = null;
  }
  /**
   * Opens an alert dialog (single "OK" button). Returns a Promise
   * that resolves when the user dismisses the alert.
   */
  alert(config) {
    this.alertConfig.set(__spreadValues({
      buttonText: "OK",
      type: "error"
    }, config));
    this.isAlertOpen.set(true);
    this.toggleBodyScroll(true);
    return new Promise((resolve) => {
      this.alertResolve = resolve;
    });
  }
  /** Called internally by the modal component. */
  resolveAlert() {
    this.isAlertOpen.set(false);
    this.toggleBodyScroll(false);
    this.alertResolve?.();
    this.alertResolve = null;
  }
  static \u0275fac = function ConfirmModalService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmModalService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ConfirmModalService, factory: _ConfirmModalService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmModalService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ConfirmModalService
};
//# sourceMappingURL=chunk-GUMJX5WL.js.map
