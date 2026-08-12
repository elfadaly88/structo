import {
  HttpClient,
  HttpErrorResponse,
  environment
} from "./chunk-FIWEE23C.js";
import {
  Injectable,
  Observable,
  firstValueFrom,
  inject,
  of,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-ODSQXAQU.js";

// src/app/core/services/tenant-user.service.ts
var TenantUserService = class _TenantUserService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/users`;
  getUsers() {
    return this.http.get(this.apiUrl);
  }
  createUser(dto) {
    return this.http.post(`${environment.apiUrl}/employees`, dto);
  }
  toggleUserStatus(userId) {
    return this.http.put(`${this.apiUrl}/${userId}/toggle-status`, {});
  }
  static \u0275fac = function TenantUserService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TenantUserService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TenantUserService, factory: _TenantUserService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TenantUserService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/core/services/offline-sync.service.ts
var OfflineSyncService = class _OfflineSyncService {
  storageKey = "structo_offline_queue";
  handlers = /* @__PURE__ */ new Map();
  isFlushing = false;
  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("online", () => this.syncPendingRequests());
    }
  }
  registerHandler(type, handler) {
    this.handlers.set(type, handler);
    void this.syncPendingRequests();
  }
  submit(type, payload, executor) {
    if (!this.isOnline()) {
      this.queueOperation(type, payload);
      return of({ success: true, message: "Saved offline. It will sync automatically when the connection returns.", data: null });
    }
    return new Observable((observer) => {
      executor(payload).subscribe({
        next: (value) => {
          observer.next(value);
          observer.complete();
        },
        error: (error) => {
          if (this.isNetworkError(error)) {
            this.queueOperation(type, payload);
            observer.next({ success: true, message: "Saved offline. It will sync automatically when the connection returns.", data: null });
            observer.complete();
            return;
          }
          observer.error(error);
        }
      });
    });
  }
  isOnline() {
    return typeof navigator === "undefined" ? true : navigator.onLine;
  }
  isNetworkError(error) {
    return error instanceof HttpErrorResponse && error.status === 0;
  }
  queueOperation(type, payload) {
    const queue = this.getQueue();
    queue.push({
      id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type,
      payload,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    localStorage.setItem(this.storageKey, JSON.stringify(queue));
  }
  getQueue() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  setQueue(queue) {
    localStorage.setItem(this.storageKey, JSON.stringify(queue));
  }
  syncPendingRequests() {
    void this.flushQueue();
  }
  async flushQueue() {
    if (this.isFlushing || !this.isOnline()) {
      return;
    }
    this.isFlushing = true;
    try {
      const queue = this.getQueue();
      if (queue.length === 0) {
        return;
      }
      const remaining = [];
      for (const item of queue) {
        const handler = this.handlers.get(item.type);
        if (!handler) {
          remaining.push(item);
          continue;
        }
        try {
          await firstValueFrom(handler(item.payload));
        } catch {
          remaining.push(item);
          break;
        }
      }
      this.setQueue(remaining);
    } finally {
      this.isFlushing = false;
    }
  }
  static \u0275fac = function OfflineSyncService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OfflineSyncService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OfflineSyncService, factory: _OfflineSyncService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OfflineSyncService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  TenantUserService,
  OfflineSyncService
};
//# sourceMappingURL=chunk-QA7CAYAB.js.map
