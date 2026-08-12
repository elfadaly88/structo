import {
  HttpClient,
  environment
} from "./chunk-2FDFRP6Y.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-EHUV6UVS.js";

// src/app/core/services/image-upload.service.ts
var ImageUploadService = class _ImageUploadService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/ImageUpload`;
  uploadTenantLogo(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.apiUrl}/tenant-logo`, formData);
  }
  uploadTenantBanner(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.apiUrl}/tenant-banner`, formData);
  }
  uploadProjectGallery(projectId, file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.apiUrl}/project-gallery/${projectId}`, formData);
  }
  getProjectPhotos(projectId, pageNumber = 1, pageSize = 24) {
    return this.http.get(`${environment.apiUrl}/projects/${projectId}/SitePhotos/mobile?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  uploadProjectDocument(projectId, file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.apiUrl}/project-document/${projectId}`, formData);
  }
  deleteProjectPhoto(projectId, photoId) {
    return this.http.delete(`${environment.apiUrl}/projects/${projectId}/SitePhotos/${photoId}`);
  }
  static \u0275fac = function ImageUploadService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImageUploadService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ImageUploadService, factory: _ImageUploadService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImageUploadService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ImageUploadService
};
//# sourceMappingURL=chunk-N4XWCQTG.js.map
