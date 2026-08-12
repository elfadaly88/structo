import {
  HttpClient,
  environment
} from "./chunk-FIWEE23C.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-ODSQXAQU.js";

// src/app/core/services/tenant-profile.service.ts
var TenantProfileService = class _TenantProfileService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/tenant-profile`;
  subscriptionUrl = `${environment.apiUrl}/subscription`;
  // ── Profile ──────────────────────────────────────────────
  getProfile() {
    return this.http.get(this.apiUrl);
  }
  updateProfile(dto) {
    return this.http.put(`${this.apiUrl}/update`, dto);
  }
  getQuota() {
    return this.http.get(`${this.apiUrl}/quota`);
  }
  // ── Subscription ─────────────────────────────────────────
  /**
   * Fetches available subscription plans and add-on top-up options with pricing.
   */
  getSubscriptionPlans() {
    return this.http.get(`${this.subscriptionUrl}/plans`);
  }
  /**
   * Performs a mock plan upgrade or add-on top-up.
   *
   * Extensibility note:
   *   To integrate Paymob or Stripe, replace the URL and/or add a payment token
   *   to the request body. The backend controller is designed for this swap.
   *
   * @param req - { targetPlanId } for plan upgrade OR { extraProjectsCount } for add-on top-up
   */
  upgradeSubscription(req) {
    const payload = {
      targetPlanId: req.targetPlanId ?? null,
      extraProjectsCount: req.extraProjectsCount ?? null,
      paymentMethod: req.paymentMethod ?? "TestCard"
    };
    return this.http.post(`${this.subscriptionUrl}/upgrade-mock`, payload);
  }
  static \u0275fac = function TenantProfileService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TenantProfileService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TenantProfileService, factory: _TenantProfileService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TenantProfileService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  TenantProfileService
};
//# sourceMappingURL=chunk-FTG4CJWM.js.map
