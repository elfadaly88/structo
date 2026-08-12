import {
  Injectable,
  computed,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-ODSQXAQU.js";

// src/app/core/services/rate-limit.service.ts
var RateLimitService = class _RateLimitService {
  cooldownSeconds = signal(
    0,
    ...ngDevMode ? [{ debugName: "cooldownSeconds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLockedOut = computed(
    () => this.cooldownSeconds() > 0,
    ...ngDevMode ? [{ debugName: "isLockedOut" }] : (
      /* istanbul ignore next */
      []
    )
  );
  timerRef = null;
  /**
   * Starts a countdown timer for rate limit cooldown
   * @param seconds Duration in seconds (default: 60)
   */
  startCooldown(seconds = 60) {
    if (this.cooldownSeconds() > 0 && seconds <= this.cooldownSeconds()) {
      return;
    }
    this.stopTimer();
    this.cooldownSeconds.set(seconds);
    if (typeof window !== "undefined") {
      this.timerRef = setInterval(() => {
        const current = this.cooldownSeconds();
        if (current <= 1) {
          this.cooldownSeconds.set(0);
          this.stopTimer();
        } else {
          this.cooldownSeconds.set(current - 1);
        }
      }, 1e3);
    }
  }
  stopTimer() {
    if (this.timerRef !== null) {
      clearInterval(this.timerRef);
      this.timerRef = null;
    }
  }
  static \u0275fac = function RateLimitService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RateLimitService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RateLimitService, factory: _RateLimitService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RateLimitService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  RateLimitService
};
//# sourceMappingURL=chunk-53D5K455.js.map
