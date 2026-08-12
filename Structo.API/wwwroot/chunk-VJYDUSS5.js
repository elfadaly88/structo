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

// src/app/core/services/project.service.ts
var ProjectService = class _ProjectService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/projects`;
  getProjects() {
    return this.http.get(this.apiUrl);
  }
  getProjectById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createProject(dto) {
    return this.http.post(this.apiUrl, dto);
  }
  reviseBudget(projectId, dto) {
    return this.http.post(`${this.apiUrl}/${projectId}/budget-revision`, dto);
  }
  updateProject(projectId, dto) {
    return this.http.put(`${this.apiUrl}/${projectId}`, dto);
  }
  getProjectBudgetHistory(projectId) {
    return this.http.get(`${this.apiUrl}/${projectId}/budget-history`);
  }
  static \u0275fac = function ProjectService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProjectService, factory: _ProjectService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ProjectService
};
//# sourceMappingURL=chunk-VJYDUSS5.js.map
