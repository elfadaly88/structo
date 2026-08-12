import {
  HttpClient,
  HttpParams,
  environment
} from "./chunk-FIWEE23C.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-ODSQXAQU.js";

// src/app/core/services/petty-cash.service.ts
var PettyCashService = class _PettyCashService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/projects`;
  getProjectPettyCash(projectId, pageNumber = 1, pageSize = 10) {
    const params = new HttpParams().set("pageNumber", pageNumber.toString()).set("pageSize", pageSize.toString());
    return this.http.get(`${this.baseUrl}/${projectId}/pettycash/mobile`, { params });
  }
  requestPettyCash(projectId, dto) {
    return this.http.post(`${this.baseUrl}/${projectId}/pettycash`, dto);
  }
  approvePettyCash(projectId, id, dto) {
    return this.http.post(`${this.baseUrl}/${projectId}/pettycash/${id}/approve`, dto);
  }
  rejectPettyCash(projectId, id, comments) {
    return this.http.post(`${this.baseUrl}/${projectId}/pettycash/${id}/reject`, { comments });
  }
  settlePettyCash(projectId, id, dto) {
    return this.http.post(`${this.baseUrl}/${projectId}/pettycash/${id}/settle`, dto);
  }
  /** Update a Pending petty cash record. Only TenantOwner / Accountant will be authorized. */
  updatePettyCash(projectId, id, dto) {
    return this.http.put(`${this.baseUrl}/${projectId}/pettycash/${id}`, dto);
  }
  /**
   * Delete a petty cash record.
   * The API automatically refunds the pool balance if the voucher was in "Issued" status.
   * Only TenantOwner / Accountant will be authorized.
   */
  deletePettyCash(projectId, id) {
    return this.http.delete(`${this.baseUrl}/${projectId}/pettycash/${id}`);
  }
  static \u0275fac = function PettyCashService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PettyCashService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PettyCashService, factory: _PettyCashService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PettyCashService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/core/services/financial.service.ts
var FinancialService = class _FinancialService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/projects`;
  getProjectTransactions(projectId, pageNumber = 1, pageSize = 10) {
    const params = new HttpParams().set("pageNumber", pageNumber.toString()).set("pageSize", pageSize.toString());
    return this.http.get(`${this.baseUrl}/${projectId}/financialtransactions/mobile`, { params });
  }
  createTransaction(projectId, dto) {
    return this.http.post(`${this.baseUrl}/${projectId}/financialtransactions`, dto);
  }
  /** Update a financial transaction. Only TenantOwner / Accountant will be authorized. */
  updateTransaction(projectId, id, dto) {
    return this.http.put(`${this.baseUrl}/${projectId}/financialtransactions/${id}`, dto);
  }
  /**
   * Delete a financial transaction.
   * The API will automatically roll back the cash pool if this was a Capital Injection.
   * Only TenantOwner / Accountant will be authorized.
   */
  deleteTransaction(projectId, id) {
    return this.http.delete(`${this.baseUrl}/${projectId}/financialtransactions/${id}`);
  }
  getCashPools(projectId) {
    return this.http.get(`${this.baseUrl}/${projectId}/financialtransactions/cash-pools`);
  }
  injectCapital(projectId, dto) {
    return this.http.post(`${this.baseUrl}/${projectId}/financialtransactions/inject-capital`, dto);
  }
  directDisbursement(projectId, dto) {
    return this.http.post(`${this.baseUrl}/${projectId}/financialtransactions/direct-disbursement`, dto);
  }
  static \u0275fac = function FinancialService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FinancialService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FinancialService, factory: _FinancialService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FinancialService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  PettyCashService,
  FinancialService
};
//# sourceMappingURL=chunk-54BPY3KT.js.map
