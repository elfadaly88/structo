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

// src/app/core/services/project-closeout.service.ts
var ProjectCloseoutService = class _ProjectCloseoutService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/projects`;
  publicApiUrl = `${environment.apiUrl}/public/projects`;
  /** GET reconciliation audit report for a project */
  getReconciliationReport(projectId) {
    return this.http.get(`${this.apiUrl}/${projectId}/reconciliation-report`);
  }
  /** POST freeze project (TenantOwner or Accountant) */
  freezeProject(projectId) {
    return this.http.post(`${this.apiUrl}/${projectId}/freeze`, {});
  }
  /** POST final closeout (TenantOwner only, requires full reconciliation) */
  finalCloseout(projectId) {
    return this.http.post(`${this.apiUrl}/${projectId}/final-closeout`, {});
  }
  /** POST anonymous client review (no auth required) */
  submitClientReview(token, dto) {
    return this.http.post(`${this.publicApiUrl}/review/${token}`, dto);
  }
  static \u0275fac = function ProjectCloseoutService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectCloseoutService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProjectCloseoutService, factory: _ProjectCloseoutService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectCloseoutService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ProjectCloseoutService
};
//# sourceMappingURL=chunk-7LRVYSY5.js.map
