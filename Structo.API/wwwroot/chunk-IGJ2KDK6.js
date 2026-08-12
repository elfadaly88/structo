import {
  takeUntilDestroyed
} from "./chunk-W27PLDBB.js";
import {
  WhatsAppLinkService
} from "./chunk-AUDUMTKV.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-PRQNVNAF.js";
import {
  TranslatePipe
} from "./chunk-2SDLZEQZ.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  HttpClient,
  environment
} from "./chunk-2FDFRP6Y.js";
import {
  Component,
  DestroyRef,
  Injectable,
  __spreadProps,
  __spreadValues,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-EHUV6UVS.js";

// src/app/core/services/tenants.service.ts
var TenantsService = class _TenantsService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/Tenants`;
  getAllTenants() {
    return this.http.get(this.baseUrl);
  }
  provisionTenant(id) {
    return this.http.post(`${this.baseUrl}/${id}/provision`, {});
  }
  toggleTenantStatus(id) {
    return this.http.post(`${this.baseUrl}/${id}/toggle-status`, {});
  }
  getTenantAuditProfile(id) {
    return this.http.get(`${environment.apiUrl}/superadmin/tenants/${id}/profile`);
  }
  getTenantProjects(tenantId) {
    return this.http.get(`${environment.apiUrl}/projects?tenantId=${tenantId}`);
  }
  toggleReviewVisibility(reviewId) {
    return this.http.post(`${environment.apiUrl}/superadmin/reviews/${reviewId}/toggle-visibility`, {});
  }
  manualUpgradeTenant(id, req) {
    return this.http.post(`${this.baseUrl}/${id}/manual-upgrade`, req);
  }
  static \u0275fac = function TenantsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TenantsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TenantsService, factory: _TenantsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TenantsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/dashboard/tenants/tenants.component.ts
var _c0 = () => [1, 2, 3, 4, 5];
var _forTrack0 = ($index, $item) => $item.id;
function TenantsComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 21);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_24_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.errorMessage.set(null));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 22);
    \u0275\u0275element(5, "path", 23);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function TenantsComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 24);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_25_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.successMessage.set(null));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 22);
    \u0275\u0275element(5, "path", 23);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.successMessage());
  }
}
function TenantsComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 25);
    \u0275\u0275element(2, "circle", 26)(3, "path", 27);
    \u0275\u0275elementEnd()();
  }
}
function TenantsComponent_Conditional_32_For_22_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 35);
  }
  if (rf & 2) {
    const tenant_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", tenant_r5.logoUrl, \u0275\u0275sanitizeUrl);
  }
}
function TenantsComponent_Conditional_32_For_22_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tenant_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tenant_r5.name.substring(0, 2));
  }
}
function TenantsComponent_Conditional_32_For_22_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1, "Premium");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_32_For_22_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "Standard");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_32_For_22_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1, "Free");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_32_For_22_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1, "Active");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_32_For_22_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1, "\u{1F6AB} Suspended");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_32_For_22_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tenant_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tenant_r5.status);
  }
}
function TenantsComponent_Conditional_32_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 33)(1, "td", 30)(2, "div", 34);
    \u0275\u0275conditionalCreate(3, TenantsComponent_Conditional_32_For_22_Conditional_3_Template, 1, 1, "img", 35)(4, TenantsComponent_Conditional_32_For_22_Conditional_4_Template, 2, 1, "div", 36);
    \u0275\u0275elementStart(5, "span", 37);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td", 38);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 30);
    \u0275\u0275conditionalCreate(10, TenantsComponent_Conditional_32_For_22_Conditional_10_Template, 2, 0, "span", 39)(11, TenantsComponent_Conditional_32_For_22_Conditional_11_Template, 2, 0, "span", 40)(12, TenantsComponent_Conditional_32_For_22_Conditional_12_Template, 2, 0, "span", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 42);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 31)(16, "button", 43);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_32_For_22_Template_button_click_16_listener() {
      const tenant_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openReviewsModal(tenant_r5.id, tenant_r5.name));
    });
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 44);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 30);
    \u0275\u0275conditionalCreate(23, TenantsComponent_Conditional_32_For_22_Conditional_23_Template, 2, 0, "span", 45)(24, TenantsComponent_Conditional_32_For_22_Conditional_24_Template, 2, 0, "span", 46)(25, TenantsComponent_Conditional_32_For_22_Conditional_25_Template, 2, 1, "span", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "td", 30)(27, "div", 48)(28, "button", 49);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_32_For_22_Template_button_click_28_listener() {
      const tenant_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.inspectTenant(tenant_r5));
    });
    \u0275\u0275text(29, " \u0645\u0631\u0627\u062C\u0639\u0629 / Inspect ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 50);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_32_For_22_Template_button_click_30_listener() {
      const tenant_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openManualUpgradeModal(tenant_r5));
    });
    \u0275\u0275elementStart(31, "span");
    \u0275\u0275text(32, "\u{1F4B3} \u062A\u0631\u0642\u064A\u0629 \u0648\u0625\u064A\u0635\u0627\u0644");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const tenant_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275conditional(tenant_r5.logoUrl ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tenant_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tenant_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(tenant_r5.subscriptionPlan === "Premium" ? 10 : tenant_r5.subscriptionPlan === "Standard" ? 11 : 12);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(tenant_r5.region || "\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u2B50 ", \u0275\u0275pipeBind2(18, 8, tenant_r5.rating || 0, "1.1-1"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(21, 11, tenant_r5.createdAt, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(tenant_r5.status === "Active" ? 23 : tenant_r5.status === "Suspended" ? 24 : 25);
  }
}
function TenantsComponent_Conditional_32_ForEmpty_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 51);
    \u0275\u0275text(2, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0634\u0631\u0643\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0627\u0644\u0645\u0646\u0635\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.");
    \u0275\u0275elementEnd()();
  }
}
function TenantsComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "table", 28)(2, "thead")(3, "tr", 29)(4, "th", 30);
    \u0275\u0275text(5, "\u0627\u0644\u0634\u0631\u0643\u0629 / Tenant Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 30);
    \u0275\u0275text(7, "\u0645\u0639\u0631\u0641 \u0627\u0644\u0634\u0631\u0643\u0629 / Tenant ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 30);
    \u0275\u0275text(9, "\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 / Plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 30);
    \u0275\u0275text(11, "\u0627\u0644\u0645\u0648\u0642\u0639 / Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 31);
    \u0275\u0275text(13, "\u0627\u0644\u062A\u0642\u064A\u064A\u0645 / Rating");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 30);
    \u0275\u0275text(15, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u0636\u0645\u0627\u0645 / Created");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 30);
    \u0275\u0275text(17, "\u062D\u0627\u0644\u0629 \u0627\u0644\u062D\u0633\u0627\u0628 / Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 31);
    \u0275\u0275text(19, "\u0627\u0644\u062A\u062D\u0643\u0645 \u0648\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A / Controls");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody", 32);
    \u0275\u0275repeaterCreate(21, TenantsComponent_Conditional_32_For_22_Template, 33, 14, "tr", 33, _forTrack0, false, TenantsComponent_Conditional_32_ForEmpty_23_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(21);
    \u0275\u0275repeater(ctx_r1.filteredTenants());
  }
}
function TenantsComponent_Conditional_33_Conditional_12_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const actionContext_r8 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" \u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u0627\u0646\u0636\u0645\u0627\u0645 \u0644\u0644\u0634\u0631\u0643\u0629 ", actionContext_r8.tenantName, ". ");
  }
}
function TenantsComponent_Conditional_33_Conditional_12_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const actionContext_r8 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0644\u0644\u0634\u0631\u0643\u0629 ", actionContext_r8.tenantName, ". ");
  }
}
function TenantsComponent_Conditional_33_Conditional_12_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const actionContext_r8 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" \u062A\u0645 \u062A\u0639\u0644\u064A\u0642 \u0627\u0644\u0634\u0631\u0643\u0629 ", actionContext_r8.tenantName, " \u0645\u0624\u0642\u062A\u0627\u064B. ");
  }
}
function TenantsComponent_Conditional_33_Conditional_12_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 71);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_33_Conditional_12_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.launchTargetMapLocation());
    });
    \u0275\u0275text(1, " \u0641\u062A\u062D \u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 / Open Targeted Map Location ");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_33_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 63)(2, "div", 64)(3, "div", 65);
    \u0275\u0275text(4, "Operational Action Tray");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 66);
    \u0275\u0275conditionalCreate(6, TenantsComponent_Conditional_33_Conditional_12_Conditional_6_Template, 1, 1)(7, TenantsComponent_Conditional_33_Conditional_12_Conditional_7_Template, 1, 1)(8, TenantsComponent_Conditional_33_Conditional_12_Conditional_8_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 67);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 68)(12, "button", 69);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_33_Conditional_12_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.launchWhatsAppAction());
    });
    \u0275\u0275text(13, " \u0625\u0631\u0633\u0627\u0644 \u0639\u0628\u0631 WhatsApp ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, TenantsComponent_Conditional_33_Conditional_12_Conditional_14_Template, 2, 0, "button", 70);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const actionContext_r8 = ctx;
    \u0275\u0275classProp("border-emerald-500/30", actionContext_r8.status === "Activate")("bg-emerald-500/10", actionContext_r8.status === "Activate")("border-amber-500/30", actionContext_r8.status === "Reject" || actionContext_r8.status === "Suspend")("bg-amber-500/10", actionContext_r8.status === "Reject")("bg-rose-500/10", actionContext_r8.status === "Suspend");
    \u0275\u0275advance(6);
    \u0275\u0275conditional(actionContext_r8.status === "Activate" ? 6 : actionContext_r8.status === "Reject" ? 7 : 8);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("\u0627\u0644\u0645\u0633\u0624\u0648\u0644: ", actionContext_r8.ownerName, " \xB7 \u0627\u0644\u0647\u0627\u062A\u0641: ", actionContext_r8.phone);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-emerald-500/15", actionContext_r8.status === "Activate")("text-emerald-300", actionContext_r8.status === "Activate")("border-emerald-500/30", actionContext_r8.status === "Activate")("hover:bg-emerald-500/20", actionContext_r8.status === "Activate")("bg-amber-500/15", actionContext_r8.status === "Reject" || actionContext_r8.status === "Suspend")("text-amber-300", actionContext_r8.status === "Reject" || actionContext_r8.status === "Suspend")("border-amber-500/30", actionContext_r8.status === "Reject" || actionContext_r8.status === "Suspend")("hover:bg-amber-500/20", actionContext_r8.status === "Reject" || actionContext_r8.status === "Suspend")("bg-rose-500/15", actionContext_r8.status === "Suspend")("text-rose-300", actionContext_r8.status === "Suspend")("border-rose-500/30", actionContext_r8.status === "Suspend");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(actionContext_r8.status === "Reject" && actionContext_r8.mapLink ? 14 : -1);
  }
}
function TenantsComponent_Conditional_33_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 25);
    \u0275\u0275element(2, "circle", 26)(3, "path", 27);
    \u0275\u0275elementEnd()();
  }
}
function TenantsComponent_Conditional_33_Conditional_14_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275text(1, "Active");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_33_Conditional_14_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1, "Suspended");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_33_Conditional_14_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tenant_r10 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tenant_r10.status);
  }
}
function TenantsComponent_Conditional_33_Conditional_14_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 86);
    \u0275\u0275text(1, "\u0627\u0641\u062A\u062D \u0627\u0644\u0645\u0648\u0642\u0639 / Open map location");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tenant_r10 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", tenant_r10.mapLocationUrl, \u0275\u0275sanitizeUrl);
  }
}
function TenantsComponent_Conditional_33_Conditional_14_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " N/A ");
  }
}
function TenantsComponent_Conditional_33_Conditional_14_Conditional_92_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 100);
    \u0275\u0275element(1, "circle", 26)(2, "path", 27);
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_33_Conditional_14_Conditional_92_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 99);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_33_Conditional_14_Conditional_92_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const tenant_r10 = \u0275\u0275nextContext(2);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAction(tenant_r10.id, "Activate"));
    });
    \u0275\u0275conditionalCreate(1, TenantsComponent_Conditional_33_Conditional_14_Conditional_92_Conditional_1_Template, 3, 0, ":svg:svg", 100);
    \u0275\u0275text(2, " Activate ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tenant_r10 = \u0275\u0275nextContext(2);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.isActioningId() === tenant_r10.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isActioningId() === tenant_r10.id ? 1 : -1);
  }
}
function TenantsComponent_Conditional_33_Conditional_14_Conditional_93_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 100);
    \u0275\u0275element(1, "circle", 26)(2, "path", 27);
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_33_Conditional_14_Conditional_93_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 100);
    \u0275\u0275element(1, "circle", 26)(2, "path", 27);
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_33_Conditional_14_Conditional_93_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 101);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_33_Conditional_14_Conditional_93_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const tenant_r10 = \u0275\u0275nextContext(2);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAction(tenant_r10.id, "Reject"));
    });
    \u0275\u0275conditionalCreate(1, TenantsComponent_Conditional_33_Conditional_14_Conditional_93_Conditional_1_Template, 3, 0, ":svg:svg", 100);
    \u0275\u0275text(2, " Reject ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 102);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_33_Conditional_14_Conditional_93_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r12);
      const tenant_r10 = \u0275\u0275nextContext(2);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAction(tenant_r10.id, "Suspend"));
    });
    \u0275\u0275conditionalCreate(4, TenantsComponent_Conditional_33_Conditional_14_Conditional_93_Conditional_4_Template, 3, 0, ":svg:svg", 100);
    \u0275\u0275text(5, " Suspend ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tenant_r10 = \u0275\u0275nextContext(2);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.isActioningId() === tenant_r10.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isActioningId() === tenant_r10.id ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isActioningId() === tenant_r10.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isActioningId() === tenant_r10.id ? 4 : -1);
  }
}
function TenantsComponent_Conditional_33_Conditional_14_Conditional_104_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 103)(1, "div", 104)(2, "span", 105);
    \u0275\u0275text(3, "\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 106);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 104)(7, "span", 105);
    \u0275\u0275text(8, "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 106);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 104)(12, "span", 105);
    \u0275\u0275text(13, "\u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0639\u0627\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 107);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_33_Conditional_14_Conditional_104_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r13);
      const tenant_r10 = \u0275\u0275nextContext(2);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openReviewsModal(tenant_r10.id, tenant_r10.name));
    });
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 108)(18, "div", 109)(19, "span", 110);
    \u0275\u0275text(20, "\u{1F4BE} \u0627\u0644\u0633\u0639\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 / Storage Metrics");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 111);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 112);
    \u0275\u0275element(24, "div", 113);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 114)(26, "span");
    \u0275\u0275text(27, "\u062A\u0645 \u0627\u062D\u062A\u0633\u0627\u0628\u0647\u0627 \u0645\u0646 \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0627\u062A \u0627\u0644\u0645\u0631\u0641\u0648\u0639\u0629 \u0648\u0627\u0644\u0639\u0647\u062F\u0629.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.auditProfile().totalProjectsCount);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.auditProfile().activeUserCount);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" \u2B50 ", \u0275\u0275pipeBind2(16, 7, ctx_r1.auditProfile().globalRatingScore, "1.1-1"), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", ctx_r1.auditProfile().storageUsedMb, " MB / 100 MB");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.storagePercentage(), "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643: ", \u0275\u0275pipeBind2(30, 10, ctx_r1.storagePercentage(), "1.0-0"), "%");
  }
}
function TenantsComponent_Conditional_33_Conditional_14_Conditional_105_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93);
    \u0275\u0275text(1, " \u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u062A\u0627\u062D\u0629 \u0628\u0639\u062F. ");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_33_Conditional_14_For_111_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 121);
    \u0275\u0275text(1, "\u0645\u062E\u0641\u064A / Hidden");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_33_Conditional_14_For_111_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 122);
    \u0275\u0275text(1, "\u0646\u0634\u0637 / Visible");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_33_Conditional_14_For_111_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 100);
    \u0275\u0275element(1, "circle", 26)(2, "path", 27);
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_33_Conditional_14_For_111_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const project_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", project_r15.isReviewHidden ? "\u0625\u0638\u0647\u0627\u0631 / Show" : "\u062D\u062C\u0628 / Hide", " ");
  }
}
function TenantsComponent_Conditional_33_Conditional_14_For_111_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 97)(1, "div", 64)(2, "div", 115)(3, "span", 116);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 117);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 118);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 119);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 120);
    \u0275\u0275conditionalCreate(12, TenantsComponent_Conditional_33_Conditional_14_For_111_Conditional_12_Template, 2, 0, "span", 121)(13, TenantsComponent_Conditional_33_Conditional_14_For_111_Conditional_13_Template, 2, 0, "span", 122);
    \u0275\u0275elementStart(14, "button", 123);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_33_Conditional_14_For_111_Template_button_click_14_listener() {
      const project_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleReview(project_r15));
    });
    \u0275\u0275conditionalCreate(15, TenantsComponent_Conditional_33_Conditional_14_For_111_Conditional_15_Template, 3, 0, ":svg:svg", 100)(16, TenantsComponent_Conditional_33_Conditional_14_For_111_Conditional_16_Template, 1, 1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const project_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(project_r15.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u2B50 ", project_r15.clientRating);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0627\u0644\u0639\u0645\u064A\u0644: ", project_r15.clientName || "\u063A\u064A\u0631 \u0645\u0633\u062C\u0644");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(project_r15.clientReviewNotes || "\u0644\u0645 \u064A\u0643\u062A\u0628 \u062A\u0639\u0644\u064A\u0642\u0627\u064B \u0646\u0635\u064A\u0627\u064B");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(project_r15.isReviewHidden ? 12 : 13);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isModeratingId() === project_r15.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isModeratingId() === project_r15.id ? 15 : 16);
  }
}
function TenantsComponent_Conditional_33_Conditional_14_ForEmpty_112_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 98);
    \u0275\u0275text(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u0643\u062A\u0648\u0628\u0629 \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F.");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_33_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61)(1, "div", 72)(2, "div", 73)(3, "div")(4, "span", 55);
    \u0275\u0275text(5, "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0633\u062C\u064A\u0644 / Registration Data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h4", 74);
    \u0275\u0275text(7, "\u0645\u0644\u0641 \u0627\u0644\u0639\u0645\u064A\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064A");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, TenantsComponent_Conditional_33_Conditional_14_Conditional_8_Template, 2, 0, "span", 75)(9, TenantsComponent_Conditional_33_Conditional_14_Conditional_9_Template, 2, 0, "span", 76)(10, TenantsComponent_Conditional_33_Conditional_14_Conditional_10_Template, 2, 1, "span", 77);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 78)(12, "div", 79)(13, "div", 80);
    \u0275\u0275text(14, "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 81);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 79)(18, "div", 80);
    \u0275\u0275text(19, "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 82);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 79)(23, "div", 80);
    \u0275\u0275text(24, "\u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 83);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 79)(28, "div", 80);
    \u0275\u0275text(29, "\u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 / Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 83);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 79)(33, "div", 80);
    \u0275\u0275text(34, "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 82);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 79)(38, "div", 80);
    \u0275\u0275text(39, "\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 83);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 79)(43, "div", 80);
    \u0275\u0275text(44, "\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 82);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 79)(48, "div", 80);
    \u0275\u0275text(49, "\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0636\u0631\u064A\u0628\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 82);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div", 79)(53, "div", 80);
    \u0275\u0275text(54, "\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "div", 82);
    \u0275\u0275text(56);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 79)(58, "div", 80);
    \u0275\u0275text(59, "\u0631\u0642\u0645 \u0627\u0644\u0646\u0642\u0627\u0628\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "div", 82);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div", 84)(63, "div", 80);
    \u0275\u0275text(64, "\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 83);
    \u0275\u0275text(66);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div", 84)(68, "div", 80);
    \u0275\u0275text(69, "\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0648\u0642\u0639 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "div", 85);
    \u0275\u0275conditionalCreate(71, TenantsComponent_Conditional_33_Conditional_14_Conditional_71_Template, 2, 1, "a", 86)(72, TenantsComponent_Conditional_33_Conditional_14_Conditional_72_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "div", 79)(74, "div", 80);
    \u0275\u0275text(75, "\u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "div", 82);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 79)(79, "div", 80);
    \u0275\u0275text(80, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u0636\u0645\u0627\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "div", 87);
    \u0275\u0275text(82);
    \u0275\u0275pipe(83, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(84, "div", 88)(85, "div", 73)(86, "div")(87, "span", 55);
    \u0275\u0275text(88, "Administrative Action Set");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "h4", 74);
    \u0275\u0275text(90, "\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(91, "div", 89);
    \u0275\u0275conditionalCreate(92, TenantsComponent_Conditional_33_Conditional_14_Conditional_92_Template, 3, 2, "button", 90);
    \u0275\u0275conditionalCreate(93, TenantsComponent_Conditional_33_Conditional_14_Conditional_93_Template, 6, 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(94, "div", 91);
    \u0275\u0275text(95, " \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0633\u0629 \u062A\u0628\u0642\u0649 \u062F\u0627\u062E\u0644 \u0634\u0627\u0634\u0629 \u0627\u0644\u0633\u0648\u0628\u0631\u0623\u062F\u0645\u0650\u0646 \u0641\u0642\u0637\u060C \u0648\u0644\u0627 \u062A\u0638\u0647\u0631 \u0641\u064A \u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u0639\u0627\u0645 \u0623\u0648 \u0623\u064A \u0648\u0627\u062C\u0647\u0629 \u0639\u0627\u0645\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(96, "div", 92)(97, "div", 72)(98, "div", 73)(99, "div")(100, "span", 55);
    \u0275\u0275text(101, "\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0627\u062A / Audit & Moderation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(102, "h4", 74);
    \u0275\u0275text(103, "\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0627\u0621 \u0648\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(104, TenantsComponent_Conditional_33_Conditional_14_Conditional_104_Template, 31, 13)(105, TenantsComponent_Conditional_33_Conditional_14_Conditional_105_Template, 2, 0, "div", 93);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(106, "div", 94)(107, "span", 95);
    \u0275\u0275text(108, "\u270D\uFE0F Review Moderation Hub");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(109, "div", 96);
    \u0275\u0275repeaterCreate(110, TenantsComponent_Conditional_33_Conditional_14_For_111_Template, 17, 7, "div", 97, _forTrack0, false, TenantsComponent_Conditional_33_Conditional_14_ForEmpty_112_Template, 2, 0, "p", 98);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const tenant_r10 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275conditional(tenant_r10.status === "Active" ? 8 : tenant_r10.status === "Suspended" ? 9 : 10);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate2("", tenant_r10.adminFirstName || "\u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631", " ", tenant_r10.adminLastName || "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(tenant_r10.adminEmail || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(tenant_r10.accountType || "Company");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(tenant_r10.location || tenant_r10.region || "\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(tenant_r10.personalPhone || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(tenant_r10.subscriptionPlan);
    \u0275\u0275advance();
    \u0275\u0275classProp("sm:col-span-2", true);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(tenant_r10.commercialRegister || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(tenant_r10.taxCard || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(tenant_r10.nationalId || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(tenant_r10.syndicateId || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(tenant_r10.manualAddress || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275conditional(tenant_r10.mapLocationUrl ? 71 : 72);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2(" ", tenant_r10.latitude ?? "N/A", " , ", tenant_r10.longitude ?? "N/A", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(83, 23, tenant_r10.createdAt, "dd/MM/yyyy"));
    \u0275\u0275advance(10);
    \u0275\u0275conditional(tenant_r10.status !== "Active" ? 92 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(tenant_r10.status !== "Suspended" ? 93 : -1);
    \u0275\u0275advance(11);
    \u0275\u0275conditional(ctx_r1.auditProfile() ? 104 : 105);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.moderatedProjects());
  }
}
function TenantsComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 52);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_33_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeInspector());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 53)(3, "div", 54)(4, "div")(5, "span", 55);
    \u0275\u0275text(6, "Platform Audit & Moderation Control");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h3", 56);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 57);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_33_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeInspector());
    });
    \u0275\u0275text(10, " \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 / Close ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 58);
    \u0275\u0275conditionalCreate(12, TenantsComponent_Conditional_33_Conditional_12_Template, 15, 36, "div", 59);
    \u0275\u0275conditionalCreate(13, TenantsComponent_Conditional_33_Conditional_13_Template, 4, 0, "div", 60)(14, TenantsComponent_Conditional_33_Conditional_14_Template, 113, 26, "div", 61);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx.name);
    \u0275\u0275advance(4);
    \u0275\u0275conditional((tmp_3_0 = ctx_r1.activeActionContext()) ? 12 : -1, tmp_3_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isLoadingAudit() ? 13 : 14);
  }
}
function TenantsComponent_Conditional_34_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 130);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 25);
    \u0275\u0275element(2, "circle", 26)(3, "path", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 132);
    \u0275\u0275text(5, "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A...");
    \u0275\u0275elementEnd()();
  }
}
function TenantsComponent_Conditional_34_Conditional_13_For_14_Conditional_7_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 149);
    \u0275\u0275text(1, "\u2605");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const star_r17 = ctx.$implicit;
    const rev_r18 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classProp("text-amber-400", star_r17 <= rev_r18.clientRating)("text-slate-700", star_r17 > rev_r18.clientRating);
  }
}
function TenantsComponent_Conditional_34_Conditional_13_For_14_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, TenantsComponent_Conditional_34_Conditional_13_For_14_Conditional_7_For_1_Template, 2, 4, "span", 147, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(2, "span", 148);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rev_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275repeater(\u0275\u0275pureFunction0(1, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("(", rev_r18.clientRating, ")");
  }
}
function TenantsComponent_Conditional_34_Conditional_13_For_14_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 143);
    \u0275\u0275text(1, "\u0628\u062F\u0648\u0646 \u062A\u0642\u064A\u064A\u0645 \u0646\u062C\u0648\u0645");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_34_Conditional_13_For_14_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 145);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rev_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", rev_r18.clientReviewNotes, " ");
  }
}
function TenantsComponent_Conditional_34_Conditional_13_For_14_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 146);
    \u0275\u0275text(1, "\u0644\u0627 \u064A\u0648\u062C\u062F \u062A\u0639\u0644\u064A\u0642 \u0646\u0635\u064A");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_34_Conditional_13_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 138)(1, "td", 139);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 140);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 141)(6, "div", 142);
    \u0275\u0275conditionalCreate(7, TenantsComponent_Conditional_34_Conditional_13_For_14_Conditional_7_Template, 4, 2)(8, TenantsComponent_Conditional_34_Conditional_13_For_14_Conditional_8_Template, 2, 0, "span", 143);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 144);
    \u0275\u0275conditionalCreate(10, TenantsComponent_Conditional_34_Conditional_13_For_14_Conditional_10_Template, 2, 1, "div", 145)(11, TenantsComponent_Conditional_34_Conditional_13_For_14_Conditional_11_Template, 2, 0, "span", 146);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const rev_r18 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(rev_r18.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(rev_r18.clientName || "\u063A\u064A\u0631 \u0645\u0633\u062C\u0644");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(rev_r18.clientRating ? 7 : 8);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(rev_r18.clientReviewNotes ? 10 : 11);
  }
}
function TenantsComponent_Conditional_34_Conditional_13_ForEmpty_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 150);
    \u0275\u0275text(2, "\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F.");
    \u0275\u0275elementEnd()();
  }
}
function TenantsComponent_Conditional_34_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 131)(1, "table", 133)(2, "thead")(3, "tr", 134)(4, "th", 135);
    \u0275\u0275text(5, "\u0627\u0644\u0645\u0634\u0631\u0648\u0639 / Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 135);
    \u0275\u0275text(7, "\u0627\u0644\u0639\u0645\u064A\u0644 / Client");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 136);
    \u0275\u0275text(9, "\u0627\u0644\u062A\u0642\u064A\u064A\u0645 / Rating");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 135);
    \u0275\u0275text(11, "\u0627\u0644\u062A\u0639\u0644\u064A\u0642 / Comments");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody", 137);
    \u0275\u0275repeaterCreate(13, TenantsComponent_Conditional_34_Conditional_13_For_14_Template, 12, 4, "tr", 138, _forTrack0, false, TenantsComponent_Conditional_34_Conditional_13_ForEmpty_15_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r1.reviewsList());
  }
}
function TenantsComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 52);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_34_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeReviewsModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 124)(3, "div", 125)(4, "div")(5, "span", 126);
    \u0275\u0275text(6, "\u0633\u062C\u0644 \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0639\u0645\u0644\u0627\u0621 / Client Ratings Ledger");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h3", 127);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 128);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_34_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeReviewsModal());
    });
    \u0275\u0275text(10, " \u0625\u063A\u0644\u0627\u0642 / Close ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 129);
    \u0275\u0275conditionalCreate(12, TenantsComponent_Conditional_34_Conditional_12_Template, 6, 0, "div", 130)(13, TenantsComponent_Conditional_34_Conditional_13_Template, 16, 1, "div", 131);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0634\u0631\u0643\u0629: ", ctx_r1.reviewsModalTenantName());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.isLoadingReviews() ? 12 : 13);
  }
}
function TenantsComponent_Conditional_35_Conditional_16_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0648\u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0625\u064A\u0635\u0627\u0644...");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_35_Conditional_16_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u26A1 \u062A\u0641\u0639\u064A\u0644 \u0648\u0625\u0635\u062F\u0627\u0631 \u0625\u064A\u0635\u0627\u0644 \u0631\u0633\u0645\u064A\u0627\u064B");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_35_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 157)(1, "div", 159)(2, "span");
    \u0275\u0275text(3, "\u062D\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u064A \u0644\u0644\u0634\u0631\u0643\u0629:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 160);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "label", 161);
    \u0275\u0275text(8, "\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629 \u0627\u0644\u0645\u0631\u0627\u062F \u0625\u0636\u0627\u0641\u062A\u0647\u0627 *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 162);
    \u0275\u0275listener("ngModelChange", function TenantsComponent_Conditional_35_Conditional_16_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.manualProjectsCount.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div")(11, "label", 161);
    \u0275\u0275text(12, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062D\u0635\u0651\u0644 \u064A\u062F\u0648\u064A\u064B\u0627 (EGP) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 163);
    \u0275\u0275listener("ngModelChange", function TenantsComponent_Conditional_35_Conditional_16_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.manualAmountEgp.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div")(15, "label", 161);
    \u0275\u0275text(16, "\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639 *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 164);
    \u0275\u0275listener("ngModelChange", function TenantsComponent_Conditional_35_Conditional_16_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.manualPaymentMethod.set($event));
    });
    \u0275\u0275elementStart(18, "option", 165);
    \u0275\u0275text(19, "\u0646\u0642\u062F\u0627\u064B / \u0643\u0627\u0634 (Cash)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 166);
    \u0275\u0275text(21, "\u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u0643\u064A / \u062D\u0633\u0627\u0628 \u0627\u0644\u0634\u0631\u0643\u0629 (Bank Transfer)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 167);
    \u0275\u0275text(23, "\u0641\u0648\u062F\u0627\u0641\u0648\u0646 \u0643\u0627\u0634 / \u0645\u062D\u0641\u0638\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 (Vodafone Cash)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 168);
    \u0275\u0275text(25, "\u062A\u0637\u0628\u064A\u0642 \u0625\u0646\u0633\u062A\u0627\u0628\u0627\u064A (InstaPay)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 169);
    \u0275\u0275text(27, "\u0637\u0631\u064A\u0642\u0629 \u0623\u062E\u0631\u0649 / \u0645\u062E\u0635\u0635\u0629");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div")(29, "label", 161);
    \u0275\u0275text(30, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0625\u064A\u0635\u0627\u0644 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 170);
    \u0275\u0275listener("ngModelChange", function TenantsComponent_Conditional_35_Conditional_16_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.manualNotes.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 171)(33, "button", 172);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_35_Conditional_16_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeManualUpgradeModal());
    });
    \u0275\u0275text(34, " \u0625\u0644\u063A\u0627\u0621 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 173);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_35_Conditional_16_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitManualUpgrade());
    });
    \u0275\u0275conditionalCreate(36, TenantsComponent_Conditional_35_Conditional_16_Conditional_36_Template, 2, 0, "span")(37, TenantsComponent_Conditional_35_Conditional_16_Conditional_37_Template, 2, 0, "span");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r21 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", t_r21.maxActiveProjects, " \u0645\u0634\u0627\u0631\u064A\u0639");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.manualProjectsCount());
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.manualAmountEgp());
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.manualPaymentMethod());
    \u0275\u0275control();
    \u0275\u0275advance(14);
    \u0275\u0275property("ngModel", ctx_r1.manualNotes());
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.isSubmittingManualUpgrade());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSubmittingManualUpgrade() ? 36 : 37);
  }
}
function TenantsComponent_Conditional_35_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 158)(1, "div", 174)(2, "div", 175)(3, "div", 34)(4, "div", 176);
    \u0275\u0275text(5, " \u{1F4DC} ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "h4", 177);
    \u0275\u0275text(8, "\u0625\u064A\u0635\u0627\u0644 \u0633\u062F\u0627\u062F \u0648\u062A\u0641\u0639\u064A\u0644 \u0625\u062F\u0627\u0631\u064A \u0645\u062D\u0635\u0651\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 178);
    \u0275\u0275text(10, "SUPER ADMIN OFFICIAL INVOICE \xB7 STRUCTO PLATFORM");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 179)(12, "span", 180);
    \u0275\u0275text(13, " \u2713 \u0645\u0643\u062A\u0645\u0644 \u0648\u0645\u0641\u0639\u0644 \u0625\u062F\u0627\u0631\u064A\u0627\u064B / CONFIRMED ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 181);
    \u0275\u0275text(15, "\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644: ");
    \u0275\u0275elementStart(16, "strong", 182);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(18, "div", 183)(19, "div")(20, "h5", 184);
    \u0275\u0275text(21, "\u0625\u064A\u0635\u0627\u0644 \u0633\u062F\u0627\u062F \u0648\u062A\u062D\u0635\u064A\u0644 \u0625\u062F\u0627\u0631\u064A \u0645\u0628\u0627\u0634\u0631 (Super Admin Manual Receipt)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 181);
    \u0275\u0275text(23, "\u0635\u0627\u062F\u0631 \u0631\u0633\u0645\u064A\u0627\u064B \u0639\u0646 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u064A\u0627 \u0644\u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0644\u0625\u0639\u0627\u062F\u0629 \u0634\u062D\u0646 \u0648\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "span", 185);
    \u0275\u0275text(25, " ADMIN-AUTH ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 186)(27, "div", 187)(28, "span", 188);
    \u0275\u0275text(29, "\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u062A\u062D\u0635\u064A\u0644\u064A\u0629 (Super Admin):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 189);
    \u0275\u0275text(31, "\u0625\u062F\u0627\u0631\u0629 \u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 / Structo Central Admin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 190);
    \u0275\u0275text(33, "admin@structo.app");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 187)(35, "span", 188);
    \u0275\u0275text(36, "\u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u0627\u0644\u0639\u0645\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u0641\u064A\u062F:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 191);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 192);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "div", 193)(42, "table", 194)(43, "thead", 195)(44, "tr")(45, "th", 196);
    \u0275\u0275text(46, "\u0628\u064A\u0627\u0646 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0648\u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "th", 197);
    \u0275\u0275text(48, "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u0636\u0627\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "th", 197);
    \u0275\u0275text(50, "\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062D\u0635\u064A\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "th", 198);
    \u0275\u0275text(52, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062D\u0635\u0644");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "tbody", 199)(54, "tr")(55, "td", 196)(56, "span", 200);
    \u0275\u0275text(57, "\u0634\u062D\u0646 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 \u0648\u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A (Manual Top-Up)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "span", 201);
    \u0275\u0275text(59, "\u062A\u0645 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u064A\u062F\u0648\u064A \u0628\u0648\u0627\u0633\u0637\u0629 \u0627\u0644\u0633\u0648\u0628\u0631 \u0623\u062F\u0645\u0646.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "td", 202);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "td", 203);
    \u0275\u0275text(63);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "td", 204);
    \u0275\u0275text(65);
    \u0275\u0275pipe(66, "number");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(67, "div", 205)(68, "div", 206)(69, "span", 207);
    \u0275\u0275text(70, "\u062D\u0627\u0644\u0629 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "span", 208);
    \u0275\u0275text(72, "\u0645\u0643\u062A\u0645\u0644 \u0648\u0645\u062D\u0635\u0644 100%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "div", 206)(74, "span", 207);
    \u0275\u0275text(75, "\u0627\u0644\u0632\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "span", 208);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 206)(79, "span", 207);
    \u0275\u0275text(80, "\u0627\u0644\u0633\u0639\u0629 \u0627\u0644\u0643\u0644\u064A\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "span", 209);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(83, "div", 210)(84, "div")(85, "span", 211);
    \u0275\u0275text(86, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062D\u0635\u0651\u0644 (\u0635\u0627\u0641\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "span", 212);
    \u0275\u0275text(88, "TOTAL COLLECTED AMOUNT \xB7 NET");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "div", 213);
    \u0275\u0275text(90);
    \u0275\u0275pipe(91, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "div", 214)(93, "span");
    \u0275\u0275text(94, "\u{1F4DC} \u0625\u064A\u0635\u0627\u0644 \u062A\u062D\u0635\u064A\u0644 \u0648\u0633\u062F\u0627\u062F \u0625\u062F\u0627\u0631\u064A \u0631\u0633\u0645\u064A \u0635\u0627\u062F\u0631 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0648\u0645\u0633\u062C\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "span", 215);
    \u0275\u0275text(96, "Structo Super Admin Authority");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(97, "div", 216)(98, "button", 217);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_35_Conditional_17_Template_button_click_98_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sendAdminReceiptWhatsApp());
    });
    \u0275\u0275elementStart(99, "span");
    \u0275\u0275text(100, "\u{1F4F2} \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(101, "button", 218);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_35_Conditional_17_Template_button_click_101_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.printAdminReceipt());
    });
    \u0275\u0275elementStart(102, "span");
    \u0275\u0275text(103, "\u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 / Print PDF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(104, "div", 219)(105, "button", 220);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_35_Conditional_17_Template_button_click_105_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeManualUpgradeModal());
    });
    \u0275\u0275text(106, " \u062A\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0648\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062A ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r21 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275textInterpolate(ctx_r1.adminReceiptData()?.referenceNumber);
    \u0275\u0275advance(21);
    \u0275\u0275textInterpolate(t_r21.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("ID: ", t_r21.id);
    \u0275\u0275advance(21);
    \u0275\u0275textInterpolate1("+", ctx_r1.adminReceiptData()?.extraProjectsAdded, " \u0645\u0634\u0627\u0631\u064A\u0639");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.manualPaymentMethod());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(66, 9, ctx_r1.adminReceiptData()?.totalAmount), " EGP");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1("+", ctx_r1.adminReceiptData()?.extraProjectsAdded, " \u0645\u0634\u0627\u0631\u064A\u0639");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.adminReceiptData()?.newMaxActiveProjects, " \u0645\u0634\u0627\u0631\u064A\u0639");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(91, 11, ctx_r1.adminReceiptData()?.totalAmount), " EGP ");
  }
}
function TenantsComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 52);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_35_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeManualUpgradeModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 151)(3, "div", 152)(4, "div", 115)(5, "span", 153);
    \u0275\u0275text(6, "\u{1F4B3}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "h3", 154);
    \u0275\u0275text(9, "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 \u0648\u0627\u0644\u0625\u064A\u0635\u0627\u0644\u0627\u062A \u064A\u062F\u0648\u064A\u064B\u0627");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 132);
    \u0275\u0275text(11, "\u0634\u0631\u0643\u0629: ");
    \u0275\u0275elementStart(12, "strong", 155);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(14, "button", 156);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_35_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeManualUpgradeModal());
    });
    \u0275\u0275text(15, " \u2715 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(16, TenantsComponent_Conditional_35_Conditional_16_Template, 38, 7, "div", 157)(17, TenantsComponent_Conditional_35_Conditional_17_Template, 107, 13, "div", 158);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(ctx.name);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!ctx_r1.adminReceiptData() ? 16 : 17);
  }
}
var TenantsComponent = class _TenantsComponent {
  tenantsService = inject(TenantsService);
  whatsAppLink = inject(WhatsAppLinkService);
  destroyRef = inject(DestroyRef);
  tenants = signal(
    [],
    ...ngDevMode ? [{ debugName: "tenants" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoading = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isActioningId = signal(
    null,
    ...ngDevMode ? [{ debugName: "isActioningId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  errorMessage = signal(
    null,
    ...ngDevMode ? [{ debugName: "errorMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  successMessage = signal(
    null,
    ...ngDevMode ? [{ debugName: "successMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeActionContext = signal(
    null,
    ...ngDevMode ? [{ debugName: "activeActionContext" }] : (
      /* istanbul ignore next */
      []
    )
  );
  searchQuery = "";
  selectedTenant = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedTenant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  auditProfile = signal(
    null,
    ...ngDevMode ? [{ debugName: "auditProfile" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingAudit = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingAudit" }] : (
      /* istanbul ignore next */
      []
    )
  );
  moderatedProjects = signal(
    [],
    ...ngDevMode ? [{ debugName: "moderatedProjects" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isModeratingId = signal(
    null,
    ...ngDevMode ? [{ debugName: "isModeratingId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Super Admin Manual Upgrade Signals
  isManualUpgradeModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isManualUpgradeModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedTenantForUpgrade = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedTenantForUpgrade" }] : (
      /* istanbul ignore next */
      []
    )
  );
  manualProjectsCount = signal(
    5,
    ...ngDevMode ? [{ debugName: "manualProjectsCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  manualAmountEgp = signal(
    950,
    ...ngDevMode ? [{ debugName: "manualAmountEgp" }] : (
      /* istanbul ignore next */
      []
    )
  );
  manualPaymentMethod = signal(
    "Cash",
    ...ngDevMode ? [{ debugName: "manualPaymentMethod" }] : (
      /* istanbul ignore next */
      []
    )
  );
  manualNotes = signal(
    "",
    ...ngDevMode ? [{ debugName: "manualNotes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSubmittingManualUpgrade = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSubmittingManualUpgrade" }] : (
      /* istanbul ignore next */
      []
    )
  );
  adminReceiptData = signal(
    null,
    ...ngDevMode ? [{ debugName: "adminReceiptData" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filteredTenants = computed(
    () => {
      const query = this.searchQuery.toLowerCase().trim();
      if (!query)
        return this.tenants();
      return this.tenants().filter((t) => t.name.toLowerCase().includes(query) || t.region && t.region.toLowerCase().includes(query) || t.id.toLowerCase().includes(query));
    },
    ...ngDevMode ? [{ debugName: "filteredTenants" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeCount = computed(
    () => this.tenants().filter((t) => t.status === "Active").length,
    ...ngDevMode ? [{ debugName: "activeCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  suspendedCount = computed(
    () => this.tenants().filter((t) => t.status === "Suspended").length,
    ...ngDevMode ? [{ debugName: "suspendedCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  storagePercentage = computed(
    () => {
      const profile = this.auditProfile();
      if (!profile)
        return 0;
      const pct = profile.storageUsedMb / 100 * 100;
      return Math.min(Math.max(pct, 2), 100);
    },
    ...ngDevMode ? [{ debugName: "storagePercentage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ngOnInit() {
    this.fetchTenants();
  }
  fetchTenants() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.tenantsService.getAllTenants().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          this.tenants.set(res.data);
        } else {
          this.errorMessage.set(res.message || "Failed to fetch tenants.");
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || "Error loading companies list.");
      }
    });
  }
  inspectTenant(tenant) {
    this.selectedTenant.set(tenant);
    this.isLoadingAudit.set(true);
    this.auditProfile.set(null);
    this.moderatedProjects.set([]);
    this.tenantsService.getTenantAuditProfile(tenant.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.auditProfile.set(res.data);
        }
      },
      complete: () => {
        this.isLoadingAudit.set(false);
      }
    });
    this.tenantsService.getTenantProjects(tenant.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.moderatedProjects.set(res.data.filter((p) => !!p.clientReviewNotes));
        }
      }
    });
  }
  closeInspector() {
    this.selectedTenant.set(null);
    this.auditProfile.set(null);
    this.moderatedProjects.set([]);
    this.activeActionContext.set(null);
    this.successMessage.set(null);
  }
  // Reviews Modal states and methods
  showReviewsModal = signal(
    false,
    ...ngDevMode ? [{ debugName: "showReviewsModal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reviewsModalTenantName = signal(
    "",
    ...ngDevMode ? [{ debugName: "reviewsModalTenantName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reviewsList = signal(
    [],
    ...ngDevMode ? [{ debugName: "reviewsList" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingReviews = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingReviews" }] : (
      /* istanbul ignore next */
      []
    )
  );
  openReviewsModal(tenantId, tenantName) {
    this.reviewsModalTenantName.set(tenantName);
    this.showReviewsModal.set(true);
    this.isLoadingReviews.set(true);
    this.reviewsList.set([]);
    this.tenantsService.getTenantProjects(tenantId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isLoadingReviews.set(false);
        if (res.success && res.data) {
          const reviews = res.data.filter((p) => p.clientRating !== null || !!p.clientReviewNotes);
          this.reviewsList.set(reviews);
        }
      },
      error: () => {
        this.isLoadingReviews.set(false);
      }
    });
  }
  closeReviewsModal() {
    this.showReviewsModal.set(false);
    this.reviewsModalTenantName.set("");
    this.reviewsList.set([]);
  }
  onAction(tenantId, actionType) {
    const tenant = this.tenants().find((item) => item.id === tenantId) ?? this.selectedTenant();
    if (!tenant) {
      this.errorMessage.set("Tenant not found.");
      return;
    }
    this.isActioningId.set(tenantId);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    if (actionType === "Activate") {
      this.tenantsService.provisionTenant(tenantId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          this.isActioningId.set(null);
          if (!res.success) {
            this.errorMessage.set(res.message || "Failed to update company status.");
            return;
          }
          const ownerName = [tenant.adminFirstName, tenant.adminLastName].filter(Boolean).join(" ").trim() || "\u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631";
          const phone = this.resolveActionPhone(tenant);
          const updatedTenant = __spreadProps(__spreadValues({}, tenant), {
            status: "Active"
          });
          this.tenants.update((list) => list.map((item) => item.id === tenantId ? updatedTenant : item));
          if (this.selectedTenant()?.id === tenantId) {
            this.selectedTenant.set(updatedTenant);
          }
          this.activeActionContext.set({
            tenantName: tenant.name,
            ownerName,
            phone,
            status: "Activate",
            mapLink: null
          });
          this.successMessage.set(res.message || "Status updated successfully.");
        },
        error: (err) => {
          this.isActioningId.set(null);
          this.errorMessage.set(err.error?.message || "Error occurred updating company status.");
        }
      });
      return;
    }
    this.tenantsService.toggleTenantStatus(tenantId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isActioningId.set(null);
        if (!res.success) {
          this.errorMessage.set(res.message || "Failed to update company status.");
          return;
        }
        const ownerName = [tenant.adminFirstName, tenant.adminLastName].filter(Boolean).join(" ").trim() || "\u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631";
        const phone = this.resolveActionPhone(tenant);
        const mapLink = actionType === "Reject" ? this.buildMapLink(tenant.latitude, tenant.longitude) : null;
        const updatedTenant = __spreadProps(__spreadValues({}, tenant), {
          status: "Suspended"
        });
        this.tenants.update((list) => list.map((item) => item.id === tenantId ? updatedTenant : item));
        if (this.selectedTenant()?.id === tenantId) {
          this.selectedTenant.set(updatedTenant);
        }
        this.activeActionContext.set({
          tenantName: tenant.name,
          ownerName,
          phone,
          status: actionType,
          mapLink
        });
        this.successMessage.set(res.message || "Status updated successfully.");
      },
      error: (err) => {
        this.isActioningId.set(null);
        this.errorMessage.set(err.error?.message || "Error occurred updating company status.");
      }
    });
  }
  launchWhatsAppAction() {
    const actionContext = this.activeActionContext();
    if (!actionContext || !actionContext.phone) {
      return;
    }
    const message = this.buildWhatsAppMessage(actionContext);
    const encodedMessage = encodeURIComponent(message);
    let cleanPhone = actionContext.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = `2${cleanPhone}`;
    } else if (!cleanPhone.startsWith("20") && cleanPhone.startsWith("1")) {
      cleanPhone = `20${cleanPhone}`;
    }
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }
  launchTargetMapLocation() {
    const actionContext = this.activeActionContext();
    if (!actionContext?.mapLink) {
      return;
    }
    window.open(actionContext.mapLink, "_blank");
  }
  buildWhatsAppMessage(actionContext) {
    const loginUrl = new URL("/login", window.location.origin).toString();
    if (actionContext.status === "Activate") {
      return `\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645 \u0623/ ${actionContext.ownerName}\u060C \u062A\u0645 \u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0642\u0628\u0648\u0644 \u0637\u0644\u0628 \u0627\u0646\u0636\u0645\u0627\u0645 \u0634\u0631\u0643\u062A\u0643 (${actionContext.tenantName}) \u0625\u0644\u0649 \u0645\u0646\u0635\u0629 Structo \u0628\u0646\u062C\u0627\u062D! \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0622\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0648\u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0645\u0644\u0641\u0643 \u0627\u0644\u062A\u062C\u0627\u0631\u064A: ${loginUrl}`;
    }
    if (actionContext.status === "Reject") {
      return `\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645 \u0623/ ${actionContext.ownerName}\u060C \u0628\u062E\u0635\u0648\u0635 \u0637\u0644\u0628 \u0627\u0646\u0636\u0645\u0627\u0645 \u0634\u0631\u0643\u062A\u0643 (${actionContext.tenantName})\u060C \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u062A\u0639\u062F\u064A\u0644 \u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A \u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u0643\u062A\u0628 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0629 \u0647\u0646\u0627: ${actionContext.mapLink}. \u0634\u0643\u0631\u0627\u064B \u0644\u0643!`;
    }
    return `\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645 \u0623/ ${actionContext.ownerName}\u060C \u062A\u0645 \u062A\u0639\u0644\u064A\u0642 \u062D\u0627\u0644\u0629 \u0634\u0631\u0643\u0629 (${actionContext.tenantName}) \u0645\u0624\u0642\u062A\u0627\u064B \u0645\u0646 \u0642\u0628\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 Structo \u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644.`;
  }
  resolveActionPhone(tenant) {
    return tenant.whatsAppPhone ?? tenant.personalPhone ?? "";
  }
  buildMapLink(latitude, longitude) {
    if (latitude == null || longitude == null) {
      return null;
    }
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }
  toggleReview(project) {
    this.isModeratingId.set(project.id);
    this.tenantsService.toggleReviewVisibility(project.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isModeratingId.set(null);
        if (res.success) {
          const updated = this.moderatedProjects().map((p) => p.id === project.id ? __spreadProps(__spreadValues({}, p), { isReviewHidden: !p.isReviewHidden }) : p);
          this.moderatedProjects.set(updated);
        }
      },
      error: () => {
        this.isModeratingId.set(null);
      }
    });
  }
  openManualUpgradeModal(tenant) {
    this.selectedTenantForUpgrade.set(tenant);
    this.manualProjectsCount.set(5);
    this.manualAmountEgp.set(950);
    this.manualPaymentMethod.set("Cash");
    this.manualNotes.set("");
    this.adminReceiptData.set(null);
    this.isManualUpgradeModalOpen.set(true);
  }
  closeManualUpgradeModal() {
    this.isManualUpgradeModalOpen.set(false);
    this.selectedTenantForUpgrade.set(null);
    this.adminReceiptData.set(null);
  }
  submitManualUpgrade() {
    const tenant = this.selectedTenantForUpgrade();
    if (!tenant)
      return;
    if (this.manualProjectsCount() <= 0) {
      this.errorMessage.set("\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0623\u0643\u0628\u0631 \u0645\u0646 0.");
      return;
    }
    this.isSubmittingManualUpgrade.set(true);
    this.errorMessage.set(null);
    const payload = {
      extraProjectsCount: this.manualProjectsCount(),
      amount: this.manualAmountEgp(),
      paymentMethod: this.manualPaymentMethod(),
      notes: this.manualNotes()
    };
    this.tenantsService.manualUpgradeTenant(tenant.id, payload).subscribe({
      next: (res) => {
        this.isSubmittingManualUpgrade.set(false);
        if (res.success && res.data) {
          this.adminReceiptData.set(res.data);
          this.tenants.update((list) => list.map((t) => t.id === tenant.id ? __spreadProps(__spreadValues({}, t), { maxActiveProjects: res.data.newMaxActiveProjects }) : t));
          this.successMessage.set(`\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 ${payload.extraProjectsCount} \u0645\u0634\u0627\u0631\u064A\u0639 \u0648\u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0625\u064A\u0635\u0627\u0644 \u0631\u0642\u0645 ${res.data.referenceNumber} \u0628\u0646\u062C\u0627\u062D!`);
        } else {
          this.errorMessage.set(res.message || "\u0641\u0634\u0644\u062A \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062A\u0631\u0642\u064A\u0629 \u0627\u0644\u064A\u062F\u0648\u064A\u0629.");
        }
      },
      error: (err) => {
        this.isSubmittingManualUpgrade.set(false);
        this.errorMessage.set(err.error?.message || "\u062E\u0637\u0623 \u0641\u064A \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062A\u0631\u0642\u064A\u0629 \u0627\u0644\u064A\u062F\u0648\u064A\u0629.");
      }
    });
  }
  sendAdminReceiptWhatsApp() {
    const receipt = this.adminReceiptData();
    const tenant = this.selectedTenantForUpgrade();
    if (!receipt || !tenant)
      return;
    const phone = tenant.whatsAppPhone || tenant.personalPhone;
    if (!phone) {
      this.errorMessage.set("\u0644\u0645 \u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0639\u062F\u0645 \u0648\u062C\u0648\u062F \u0631\u0642\u0645 \u0648\u0627\u062A\u0633\u0627\u0628 \u0645\u0633\u062C\u0644 \u0641\u064A \u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0629.");
      return;
    }
    const msg = `\u0645\u0631\u062D\u0628\u0627\u064B ${tenant.name}\u060C \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0627\u0631\u064A\u0639 \u062C\u062F\u064A\u062F\u0629 \u0625\u0644\u0649 \u0631\u0635\u064A\u062F \u062D\u0633\u0627\u0628\u0643\u0645 \u0648\u0633\u062F\u0627\u062F \u0627\u0644\u0631\u0633\u0645 \u0631\u0642\u0645 (${receipt.referenceNumber}) \u0628\u0645\u0628\u0644\u063A ${receipt.totalAmount} EGP \u0644\u0639\u062F\u062F +${receipt.extraProjectsAdded} \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 (\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062A\u0627\u062D: ${receipt.newMaxActiveProjects} \u0645\u0634\u0631\u0648\u0639). \u0634\u0643\u0631\u0627\u064B \u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0643\u0645 \u0623\u064F\u0633\u064F\u0633!`;
    this.whatsAppLink.openChat(phone, msg);
    this.successMessage.set("\u062A\u0645 \u0641\u062A\u062D \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 \u0628\u0646\u062C\u0627\u062D.");
  }
  printAdminReceipt() {
    window.print();
  }
  static \u0275fac = function TenantsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TenantsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TenantsComponent, selectors: [["app-tenants"]], decls: 36, vars: 13, consts: [[1, "space-y-6", "w-full", "max-w-7xl", "mx-auto"], [1, "flex", "flex-col", "sm:flex-row", "justify-between", "items-start", "sm:items-center", "gap-4", "border-b", "border-slate-800/60", "pb-5"], [1, "text-3xl", "font-extrabold", "tracking-tight", "text-white", "font-cairo"], [1, "text-sm", "text-slate-400", "mt-1", "font-cairo"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-4", "sm:gap-6"], [1, "bg-slate-900/40", "border", "border-slate-800/80", "rounded-2xl", "p-5"], [1, "text-xs", "text-slate-500", "font-bold", "uppercase", "tracking-wider", "font-cairo"], [1, "text-3xl", "font-extrabold", "text-white", "mt-1", "font-mono", "tabular-nums"], [1, "text-3xl", "font-extrabold", "text-emerald-400", "mt-1", "font-mono", "tabular-nums"], [1, "text-3xl", "font-extrabold", "text-rose-400", "mt-1", "font-mono", "tabular-nums"], [1, "bg-rose-500/10", "border", "border-rose-500/30", "text-rose-400", "rounded-xl", "p-4", "text-sm", "font-semibold", "flex", "items-center", "justify-between"], [1, "bg-emerald-500/10", "border", "border-emerald-500/30", "text-emerald-400", "rounded-xl", "p-4", "text-sm", "font-semibold", "flex", "items-center", "justify-between"], [1, "bg-slate-900/20", "border", "border-slate-850", "rounded-2xl", "overflow-hidden", "shadow-xl"], [1, "px-6", "py-4", "border-b", "border-slate-850", "flex", "flex-col", "sm:flex-row", "items-stretch", "sm:items-center", "justify-between", "gap-4"], [1, "text-base", "font-bold", "text-white", "font-cairo"], ["type", "text", "placeholder", "\u0628\u062D\u062B \u0628\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 \u0623\u0648 \u0627\u0644\u0645\u0648\u0642\u0639...", 1, "px-4", "py-2", "border", "border-slate-800", "bg-slate-950", "rounded-xl", "text-xs", "text-white", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "w-full", "sm:w-64", "transition-all", 3, "ngModelChange", "ngModel"], [1, "flex", "justify-center", "items-center", "py-12"], [1, "overflow-x-auto"], [1, "fixed", "inset-0", "z-50", "flex", "items-stretch", "justify-center", "p-3", "sm:p-4"], [1, "fixed", "inset-0", "z-[100]", "flex", "items-center", "justify-center", "p-3", "sm:p-4"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4"], [1, "text-rose-400", "hover:text-rose-300", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "text-emerald-400", "hover:text-emerald-300", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-8", "w-8", "text-indigo-500"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"], [1, "w-full", "text-left", "rtl:text-right"], [1, "border-b", "border-slate-850", "text-slate-500", "text-xs", "font-bold", "uppercase", "tracking-wider", "font-cairo", "bg-slate-900/10"], [1, "px-6", "py-4"], [1, "px-6", "py-4", "text-center"], [1, "divide-y", "divide-slate-850", "text-slate-300", "text-xs"], [1, "hover:bg-slate-900/30", "transition-colors", "duration-150"], [1, "flex", "items-center", "gap-3"], [1, "w-8", "h-8", "rounded-lg", "object-cover", 3, "src"], [1, "w-8", "h-8", "rounded-lg", "bg-indigo-600/10", "text-indigo-400", "border", "border-indigo-500/20", "flex", "items-center", "justify-center", "font-bold", "text-xs", "uppercase"], [1, "font-bold", "text-white", "text-sm"], [1, "px-6", "py-4", "font-mono", "text-[10px]", "text-slate-500", "select-all"], [1, "px-2.5", "py-1", "rounded-full", "text-[10px]", "font-bold", "bg-purple-500/10", "text-purple-400", "border", "border-purple-500/25"], [1, "px-2.5", "py-1", "rounded-full", "text-[10px]", "font-bold", "bg-indigo-500/10", "text-indigo-400", "border", "border-indigo-500/25"], [1, "px-2.5", "py-1", "rounded-full", "text-[10px]", "font-bold", "bg-slate-800", "text-slate-400", "border", "border-slate-700/60"], [1, "px-6", "py-4", "font-cairo", "font-semibold", "text-slate-400"], ["title", "View all client reviews", 1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-1", "bg-amber-500/10", "hover:bg-amber-500/20", "text-amber-400", "hover:text-amber-300", "border", "border-amber-500/25", "rounded-lg", "text-[11px]", "font-bold", "transition-all", "cursor-pointer", 3, "click"], [1, "px-6", "py-4", "text-slate-400", "font-mono"], [1, "px-2", "py-0.5", "rounded-full", "bg-emerald-500/15", "text-emerald-400", "font-bold", "border", "border-emerald-500/25"], [1, "px-2", "py-0.5", "rounded-full", "bg-rose-500/15", "text-rose-400", "font-bold", "border", "border-rose-500/25"], [1, "px-2", "py-0.5", "rounded-full", "bg-amber-500/15", "text-amber-400", "font-bold", "border", "border-amber-500/25"], [1, "flex", "items-center", "justify-center", "gap-2"], [1, "px-2.5", "py-1.5", "bg-slate-950", "hover:bg-slate-800", "text-indigo-400", "border", "border-indigo-900/30", "rounded-xl", "text-[10px]", "font-bold", "font-cairo", "transition-all", "duration-200", "active:scale-95", "cursor-pointer", 3, "click"], [1, "px-2.5", "py-1.5", "bg-emerald-950/80", "hover:bg-emerald-900", "text-emerald-300", "border", "border-emerald-500/30", "rounded-xl", "text-[10px]", "font-bold", "font-cairo", "transition-all", "duration-200", "active:scale-95", "cursor-pointer", "flex", "items-center", "gap-1", 3, "click"], ["colspan", "8", 1, "px-6", "py-12", "text-center", "text-slate-500", "text-sm", "font-cairo"], [1, "absolute", "inset-0", "bg-slate-950/85", "backdrop-blur-sm", 3, "click"], [1, "relative", "z-10", "w-full", "max-w-2xl", "mx-auto", "my-auto", "p-4", "md:p-6", "max-h-[92vh]", "flex", "flex-col", "bg-slate-950", "border", "border-slate-900", "rounded-xl", "overflow-hidden", "shadow-2xl", "shadow-black/80"], [1, "sticky", "top-0", "z-10", "border-b", "border-slate-900", "bg-slate-950/95", "px-4", "md:px-6", "py-4", "backdrop-blur-sm", "flex", "flex-col", "md:flex-row", "md:items-center", "md:justify-between", "gap-3"], [1, "text-[10px]", "font-bold", "text-indigo-400", "tracking-wider", "uppercase", "font-cairo"], [1, "text-xl", "font-bold", "text-white", "font-cairo", "mt-1"], [1, "self-start", "md:self-auto", "w-full", "md:w-auto", "px-3", "py-2", "rounded-xl", "border", "border-slate-700", "text-slate-400", "hover:text-white", "hover:bg-slate-800", "transition-colors", "duration-150", "text-xs", "font-bold", "font-cairo", "cursor-pointer", 3, "click"], [1, "flex-1", "overflow-y-auto", "min-h-0", "p-4", "md:p-6", "space-y-6"], [1, "rounded-2xl", "border", "px-5", "py-4", "shadow-lg", "shadow-black/20", "transition-all", "duration-300", 3, "border-emerald-500/30", "bg-emerald-500/10", "border-amber-500/30", "bg-amber-500/10", "bg-rose-500/10"], [1, "flex", "justify-center", "items-center", "py-16"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6", "items-start"], [1, "rounded-2xl", "border", "px-5", "py-4", "shadow-lg", "shadow-black/20", "transition-all", "duration-300"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "lg:justify-between", "gap-4"], [1, "space-y-1"], [1, "text-[10px]", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "font-cairo"], [1, "text-sm", "font-bold", "text-white", "font-cairo"], [1, "text-xs", "text-slate-300", "font-cairo"], [1, "flex", "flex-col", "sm:flex-row", "gap-3"], [1, "px-4", "py-2", "rounded-xl", "text-xs", "font-bold", "font-cairo", "border", "transition-all", "duration-200", "active:scale-95", "cursor-pointer", 3, "click"], [1, "px-4", "py-2", "rounded-xl", "text-xs", "font-bold", "font-cairo", "border", "border-sky-500/30", "bg-sky-500/10", "text-sky-300", "hover:bg-sky-500/20", "transition-all", "duration-200", "active:scale-95", "cursor-pointer"], [1, "px-4", "py-2", "rounded-xl", "text-xs", "font-bold", "font-cairo", "border", "border-sky-500/30", "bg-sky-500/10", "text-sky-300", "hover:bg-sky-500/20", "transition-all", "duration-200", "active:scale-95", "cursor-pointer", 3, "click"], [1, "bg-slate-950/55", "border", "border-slate-800", "rounded-2xl", "p-5", "space-y-4"], [1, "flex", "items-center", "justify-between", "gap-3", "border-b", "border-slate-800", "pb-3"], [1, "text-lg", "font-bold", "text-white", "font-cairo", "mt-1"], [1, "px-2", "py-0.5", "rounded-full", "bg-emerald-500/15", "text-emerald-400", "font-bold", "border", "border-emerald-500/25", "text-[10px]"], [1, "px-2", "py-0.5", "rounded-full", "bg-rose-500/15", "text-rose-400", "font-bold", "border", "border-rose-500/25", "text-[10px]"], [1, "px-2", "py-0.5", "rounded-full", "bg-amber-500/15", "text-amber-400", "font-bold", "border", "border-amber-500/25", "text-[10px]"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-3", "text-xs"], [1, "rounded-xl", "border", "border-slate-800", "bg-slate-950/70", "p-3"], [1, "text-slate-500", "uppercase", "tracking-wider", "font-bold", "font-cairo"], [1, "mt-1", "text-slate-200", "font-semibold", "font-cairo"], [1, "mt-1", "text-slate-200", "font-mono", "break-all"], [1, "mt-1", "text-slate-200", "font-semibold"], [1, "rounded-xl", "border", "border-slate-800", "bg-slate-950/70", "p-3", "sm:col-span-2"], [1, "mt-1", "text-slate-200", "break-all"], ["target", "_blank", "rel", "noreferrer", 1, "text-indigo-300", "hover:text-indigo-200", "underline", "decoration-dotted", 3, "href"], [1, "mt-1", "text-slate-200", "font-semibold", "font-mono"], [1, "bg-slate-950/55", "border", "border-slate-800", "rounded-2xl", "p-4", "space-y-3"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-3"], [1, "px-3", "py-2", "rounded-xl", "text-xs", "font-bold", "font-cairo", "border", "border-emerald-500/30", "bg-emerald-500/10", "text-emerald-300", "hover:bg-emerald-500/20", "transition-all", "duration-200", "active:scale-95", "cursor-pointer", "flex", "items-center", "justify-center", "gap-2", 3, "disabled"], [1, "bg-slate-950/40", "border", "border-slate-850", "rounded-xl", "p-4", "text-sm", "text-slate-300", "font-cairo"], [1, "space-y-4", "w-full"], [1, "bg-slate-950/40", "border", "border-slate-850", "rounded-xl", "p-4", "text-sm", "text-slate-400", "font-cairo"], [1, "bg-slate-950/55", "border", "border-slate-800", "rounded-2xl", "p-5", "space-y-3"], [1, "text-xs", "font-bold", "text-indigo-400", "font-cairo", "uppercase", "tracking-wider", "block", "border-b", "border-slate-800", "pb-2"], [1, "space-y-3", "max-h-[28rem]", "overflow-y-auto", "pr-1"], [1, "bg-slate-950/65", "border", "border-slate-850", "rounded-xl", "p-4", "flex", "flex-col", "sm:flex-row", "justify-between", "items-start", "sm:items-center", "gap-4"], [1, "text-xs", "text-slate-500", "text-center", "font-cairo", "py-6", "bg-slate-950/30", "rounded-xl", "border", "border-slate-850"], [1, "px-3", "py-2", "rounded-xl", "text-xs", "font-bold", "font-cairo", "border", "border-emerald-500/30", "bg-emerald-500/10", "text-emerald-300", "hover:bg-emerald-500/20", "transition-all", "duration-200", "active:scale-95", "cursor-pointer", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-3.5", "w-3.5", "text-current"], [1, "px-3", "py-2", "rounded-xl", "text-xs", "font-bold", "font-cairo", "border", "border-amber-500/30", "bg-amber-500/10", "text-amber-300", "hover:bg-amber-500/20", "transition-all", "duration-200", "active:scale-95", "cursor-pointer", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], [1, "px-3", "py-2", "rounded-xl", "text-xs", "font-bold", "font-cairo", "border", "border-rose-500/30", "bg-rose-500/10", "text-rose-300", "hover:bg-rose-500/20", "transition-all", "duration-200", "active:scale-95", "cursor-pointer", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], [1, "grid", "grid-cols-3", "gap-3"], [1, "bg-slate-950/60", "rounded-xl", "p-3", "border", "border-slate-850"], [1, "text-[10px]", "text-slate-500", "uppercase", "tracking-wider", "font-cairo"], [1, "text-xl", "font-bold", "text-slate-200", "mt-0.5"], ["title", "Click to view detailed customer reviews ledger", 1, "w-full", "text-right", "flex", "items-center", "gap-1.5", "text-xl", "font-bold", "text-amber-400", "mt-0.5", "hover:text-amber-300", "transition-colors", "cursor-pointer", "focus:outline-none", 3, "click"], [1, "bg-slate-950/40", "border", "border-slate-850", "rounded-xl", "p-4.5", "space-y-2"], [1, "flex", "justify-between", "items-center", "text-xs"], [1, "text-slate-400", "font-cairo", "font-bold"], [1, "font-mono", "text-indigo-400", "font-bold"], [1, "h-2", "w-full", "bg-slate-900", "rounded-full", "overflow-hidden", "flex"], [1, "h-full", "bg-gradient-to-r", "from-indigo-500", "via-purple-500", "to-pink-500", "rounded-full", "transition-all", "duration-500"], [1, "flex", "justify-between", "items-center", "text-[10px]", "text-slate-500", "font-cairo"], [1, "flex", "items-center", "gap-2"], [1, "text-xs", "font-bold", "text-white"], [1, "text-[10px]", "px-2", "py-0.5", "rounded", "bg-slate-900", "text-amber-400", "font-bold", "border", "border-slate-800"], [1, "text-xs", "text-slate-400", "font-cairo", "font-medium"], [1, "text-[11px]", "text-slate-300", "italic", "bg-slate-900/30", "rounded", "p-2", "border", "border-slate-850/60", "font-cairo", "mt-1.5"], [1, "shrink-0", "flex", "items-center", "gap-2", "self-end", "sm:self-center"], [1, "text-[10px]", "font-bold", "text-rose-400", "bg-rose-950/20", "border", "border-rose-900/30", "px-2", "py-0.5", "rounded", "font-cairo"], [1, "text-[10px]", "font-bold", "text-emerald-400", "bg-emerald-950/20", "border", "border-emerald-900/30", "px-2", "py-0.5", "rounded", "font-cairo"], [1, "px-2.5", "py-1.5", "bg-slate-900", "hover:bg-slate-850", "text-slate-300", "border", "border-slate-800", "hover:text-white", "rounded-xl", "text-[10px]", "font-bold", "font-cairo", "cursor-pointer", "active:scale-95", "transition-all", "flex", "items-center", "gap-1", 3, "click", "disabled"], [1, "relative", "z-10", "w-full", "max-w-3xl", "mx-auto", "my-auto", "max-h-[92vh]", "flex", "flex-col", "bg-slate-900", "border", "border-slate-800", "rounded-2xl", "overflow-hidden", "shadow-2xl", "shadow-black/85", "font-sans"], [1, "sticky", "top-0", "z-10", "border-b", "border-slate-800", "bg-slate-900/95", "px-5", "py-4", "backdrop-blur-sm", "flex", "items-center", "justify-between"], [1, "text-[10px]", "font-bold", "text-amber-400", "tracking-wider", "uppercase", "font-cairo"], [1, "text-base", "font-bold", "text-white", "font-cairo", "mt-1"], [1, "px-3", "py-1.5", "rounded-xl", "border", "border-slate-700", "text-slate-400", "hover:text-white", "hover:bg-slate-850", "transition-colors", "duration-150", "text-xs", "font-bold", "font-cairo", "cursor-pointer", 3, "click"], [1, "flex-1", "overflow-y-auto", "min-h-0", "p-5", "space-y-4"], [1, "flex", "flex-col", "items-center", "justify-center", "py-12", "gap-3"], [1, "w-full", "overflow-x-auto", "block"], [1, "text-xs", "text-slate-400", "font-cairo"], [1, "w-full", "text-right", "border-collapse", "min-w-[650px]"], [1, "border-b", "border-slate-800", "text-slate-400", "text-xs", "font-bold", "font-cairo"], [1, "pb-3", "px-3"], [1, "pb-3", "px-3", "text-center"], [1, "divide-y", "divide-slate-850", "text-slate-300", "text-xs", "font-sans"], [1, "hover:bg-slate-950/20", "transition-colors"], [1, "py-3.5", "px-3", "font-semibold", "text-white", "font-cairo"], [1, "py-3.5", "px-3", "text-slate-400", "font-cairo"], [1, "py-3.5", "px-3", "text-center"], [1, "flex", "items-center", "justify-center", "gap-0.5"], [1, "text-slate-500", "font-cairo"], [1, "py-3.5", "px-3", "max-w-[280px]", "break-words"], [1, "text-slate-300", "italic", "font-cairo", "bg-slate-950/30", "border", "border-slate-850", "p-2.5", "rounded-lg"], [1, "text-slate-550", "font-cairo", "italic"], [1, "text-sm", 3, "text-amber-400", "text-slate-700"], [1, "text-[10px]", "font-bold", "text-amber-500/80", "font-mono", "ml-1"], [1, "text-sm"], ["colspan", "4", 1, "py-12", "text-center", "text-slate-500", "text-sm", "font-cairo"], [1, "relative", "z-10", "w-full", "max-w-lg", "bg-slate-950", "border", "border-slate-800", "rounded-2xl", "overflow-hidden", "shadow-2xl"], [1, "px-6", "py-4", "border-b", "border-slate-850", "flex", "items-center", "justify-between", "bg-slate-900/60"], [1, "text-xl"], [1, "font-bold", "text-base", "text-white", "font-cairo"], [1, "text-indigo-400"], [1, "p-2", "rounded-xl", "text-slate-400", "hover:text-white", "bg-slate-800/50", "hover:bg-slate-800", "border", "border-slate-700/50", "transition-colors", "cursor-pointer", 3, "click"], [1, "p-6", "space-y-4", "text-right", "font-cairo"], [1, "overflow-y-auto", "min-h-0", "p-6", "space-y-5", "text-right", "font-cairo"], [1, "p-3", "bg-indigo-950/40", "border", "border-indigo-500/20", "rounded-xl", "text-xs", "text-indigo-300", "flex", "items-center", "justify-between"], [1, "font-mono", "font-bold", "text-amber-400", "text-sm"], [1, "block", "text-xs", "font-bold", "text-slate-300", "mb-1"], ["type", "number", "min", "1", 1, "w-full", "px-3", "py-2.5", "bg-slate-900", "border", "border-slate-800", "rounded-xl", "text-sm", "text-white", "focus:outline-none", "focus:border-indigo-500", "font-mono", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 1, "w-full", "px-3", "py-2.5", "bg-slate-900", "border", "border-slate-800", "rounded-xl", "text-sm", "text-white", "focus:outline-none", "focus:border-indigo-500", "font-mono", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-3", "py-2.5", "bg-slate-900", "border", "border-slate-800", "rounded-xl", "text-sm", "text-white", "focus:outline-none", "focus:border-indigo-500", "font-cairo", 3, "ngModelChange", "ngModel"], ["value", "Cash"], ["value", "BankTransfer"], ["value", "VodafoneCash"], ["value", "InstaPay"], ["value", "Other"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: \u062A\u0645 \u062A\u062D\u0635\u064A\u0644 \u0627\u0644\u0645\u0628\u0644\u063A \u0628\u062D\u0648\u0627\u0644\u0629 \u0628\u0646\u0643\u064A\u0629 \u0631\u0642\u0645 84920", 1, "w-full", "px-3", "py-2.5", "bg-slate-900", "border", "border-slate-800", "rounded-xl", "text-xs", "text-white", "focus:outline-none", "focus:border-indigo-500", "font-cairo", 3, "ngModelChange", "ngModel"], [1, "pt-2", "flex", "items-center", "justify-end", "gap-3"], [1, "px-4", "py-2.5", "bg-slate-800", "hover:bg-slate-700", "text-slate-300", "text-xs", "font-bold", "rounded-xl", "transition-all", "cursor-pointer", 3, "click"], [1, "px-6", "py-2.5", "bg-gradient-to-r", "from-emerald-600", "to-indigo-600", "hover:from-emerald-500", "hover:to-indigo-500", "text-white", "font-bold", "text-xs", "rounded-xl", "shadow-lg", "shadow-emerald-600/20", "disabled:opacity-50", "flex", "items-center", "gap-2", "cursor-pointer", 3, "click", "disabled"], ["dir", "rtl", 1, "p-6", "bg-gradient-to-br", "from-slate-900", "via-slate-900", "to-indigo-950/60", "border", "border-indigo-500/30", "rounded-2xl", "relative", "shadow-xl", "print-only", "space-y-4", "text-right", "font-cairo"], [1, "flex", "items-center", "justify-between", "border-b", "border-slate-800", "pb-3.5", "mb-1"], [1, "w-12", "h-12", "bg-indigo-500/20", "border", "border-indigo-500/40", "rounded-xl", "flex", "items-center", "justify-center", "text-indigo-400", "text-2xl", "font-bold"], [1, "font-black", "text-lg", "text-white"], [1, "text-[11px]", "text-indigo-400", "font-mono", "tracking-wider"], [1, "text-left", "font-mono"], [1, "px-3", "py-1", "text-xs", "font-bold", "text-emerald-300", "bg-emerald-950/90", "border", "border-emerald-500/40", "rounded-lg", "inline-block", "mb-1"], [1, "text-[10px]", "text-slate-400"], [1, "text-indigo-400", "font-mono"], [1, "flex", "items-center", "justify-between", "bg-slate-950/80", "border", "border-slate-800", "p-3", "rounded-xl"], [1, "font-black", "text-xs", "text-white"], [1, "text-[10px]", "font-mono", "text-indigo-300", "bg-indigo-950", "border", "border-indigo-500/30", "px-2.5", "py-1", "rounded"], [1, "grid", "grid-cols-2", "gap-3", "text-xs"], [1, "p-3", "bg-slate-950/60", "rounded-xl", "border", "border-slate-850", "space-y-1"], [1, "text-[10px]", "text-slate-400", "block", "font-cairo"], [1, "font-bold", "text-white", "block", "font-cairo"], [1, "text-[10px]", "text-slate-400", "font-mono", "block"], [1, "font-bold", "text-white", "block", "font-cairo", "truncate"], [1, "text-[10px]", "text-slate-400", "font-mono", "block", "truncate"], [1, "border", "border-slate-800", "rounded-xl", "overflow-hidden", "text-xs"], [1, "w-full", "text-right", "font-cairo"], [1, "bg-slate-950", "text-slate-300", "font-bold", "border-b", "border-slate-800", "text-[11px]"], [1, "p-2.5"], [1, "p-2.5", "text-center"], [1, "p-2.5", "text-left"], [1, "divide-y", "divide-slate-850", "bg-slate-900/60"], [1, "font-bold", "text-white", "block"], [1, "text-[10px]", "text-slate-400", "block"], [1, "p-2.5", "text-center", "font-bold", "text-emerald-400"], [1, "p-2.5", "text-center", "font-bold", "text-slate-200"], [1, "p-2.5", "text-left", "font-mono", "font-black", "text-amber-400", "text-sm"], [1, "grid", "grid-cols-3", "gap-2.5", "text-xs"], [1, "p-2.5", "bg-slate-950/60", "rounded-xl", "border", "border-slate-850"], [1, "text-[10px]", "text-slate-400", "block", "mb-0.5", "font-cairo"], [1, "font-bold", "text-emerald-400", "font-cairo", "text-xs"], [1, "font-mono", "font-bold", "text-amber-400", "text-xs"], [1, "p-3.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "flex", "items-center", "justify-between"], [1, "text-xs", "font-bold", "text-white", "font-cairo", "block"], [1, "text-[10px]", "text-slate-400", "font-mono"], [1, "text-xl", "font-black", "font-mono", "text-amber-400"], [1, "pt-2", "border-t", "border-slate-800", "flex", "items-center", "justify-between", "text-[10px]", "text-slate-400", "font-cairo"], [1, "font-mono", "text-slate-500"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-3", "pt-1", "no-print"], [1, "py-3", "px-4", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "font-bold", "text-xs", "rounded-xl", "transition-all", "shadow-lg", "shadow-emerald-600/20", "flex", "items-center", "justify-center", "gap-2", "cursor-pointer", 3, "click"], [1, "py-3", "px-4", "bg-slate-800", "hover:bg-slate-700", "text-slate-200", "font-bold", "text-xs", "rounded-xl", "border", "border-slate-700", "transition-all", "flex", "items-center", "justify-center", "gap-2", "cursor-pointer", 3, "click"], [1, "pt-2", "no-print"], [1, "w-full", "py-3", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "font-bold", "text-xs", "rounded-xl", "transition-all", "shadow-lg", "shadow-indigo-600/30", "cursor-pointer", 3, "click"]], template: function TenantsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 3);
      \u0275\u0275text(7, "\u0625\u062F\u0627\u0631\u0629 \u0634\u0624\u0648\u0646 \u0627\u0644\u0634\u0631\u0643\u0627\u062A\u060C \u062A\u0639\u0644\u064A\u0642 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A\u060C \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0633\u0639\u0627\u062A \u0627\u0644\u062A\u062E\u0632\u064A\u0646\u064A\u0629 \u0648\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A \u0627\u0644\u0639\u0627\u0645\u0629.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "div", 4)(9, "div", 5)(10, "span", 6);
      \u0275\u0275text(11, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0634\u0631\u0643\u0627\u062A / Total Companies");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "h3", 7);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 5)(15, "span", 6);
      \u0275\u0275text(16, "\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u0646\u0634\u0637\u0629 / Active Companies");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "h3", 8);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 5)(20, "span", 6);
      \u0275\u0275text(21, "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629 / Suspended Accounts");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "h3", 9);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(24, TenantsComponent_Conditional_24_Template, 6, 1, "div", 10);
      \u0275\u0275conditionalCreate(25, TenantsComponent_Conditional_25_Template, 6, 1, "div", 11);
      \u0275\u0275elementStart(26, "div", 12)(27, "div", 13)(28, "h3", 14);
      \u0275\u0275text(29, "\u0633\u062C\u0644 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0648\u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function TenantsComponent_Template_input_ngModelChange_30_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(31, TenantsComponent_Conditional_31_Template, 4, 0, "div", 16)(32, TenantsComponent_Conditional_32_Template, 24, 1, "div", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(33, TenantsComponent_Conditional_33_Template, 15, 3, "div", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(34, TenantsComponent_Conditional_34_Template, 14, 2, "div", 19);
      \u0275\u0275conditionalCreate(35, TenantsComponent_Conditional_35_Template, 18, 2, "div", 20);
    }
    if (rf & 2) {
      let tmp_9_0;
      let tmp_11_0;
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" \u{1F6E1}\uFE0F ", \u0275\u0275pipeBind1(5, 11, "DASHBOARD.TENANTS_MGMT"), " ");
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.tenants().length);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.activeCount());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.suspendedCount());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 24 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMessage() ? 25 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 31 : 32);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_9_0 = ctx.selectedTenant()) ? 33 : -1, tmp_9_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showReviewsModal() ? 34 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_11_0 = ctx.isManualUpgradeModalOpen() && ctx.selectedTenantForUpgrade()) ? 35 : -1, tmp_11_0);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, DecimalPipe, DatePipe, TranslatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TenantsComponent, [{
    type: Component,
    args: [{
      selector: "app-tenants",
      standalone: true,
      imports: [CommonModule, TranslatePipe, FormsModule, DatePipe, DecimalPipe],
      template: `
    <div class="space-y-6 w-full max-w-7xl mx-auto">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/60 pb-5">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-white font-cairo">
            \u{1F6E1}\uFE0F {{ 'DASHBOARD.TENANTS_MGMT' | translate }}
          </h1>
          <p class="text-sm text-slate-400 mt-1 font-cairo">\u0625\u062F\u0627\u0631\u0629 \u0634\u0624\u0648\u0646 \u0627\u0644\u0634\u0631\u0643\u0627\u062A\u060C \u062A\u0639\u0644\u064A\u0642 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A\u060C \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0633\u0639\u0627\u062A \u0627\u0644\u062A\u062E\u0632\u064A\u0646\u064A\u0629 \u0648\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A \u0627\u0644\u0639\u0627\u0645\u0629.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0634\u0631\u0643\u0627\u062A / Total Companies</span>
          <h3 class="text-3xl font-extrabold text-white mt-1 font-mono tabular-nums">{{ tenants().length }}</h3>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u0646\u0634\u0637\u0629 / Active Companies</span>
          <h3 class="text-3xl font-extrabold text-emerald-400 mt-1 font-mono tabular-nums">{{ activeCount() }}</h3>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629 / Suspended Accounts</span>
          <h3 class="text-3xl font-extrabold text-rose-400 mt-1 font-mono tabular-nums">{{ suspendedCount() }}</h3>
        </div>
      </div>

      @if (errorMessage()) {
        <div class="bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl p-4 text-sm font-semibold flex items-center justify-between">
          <span>{{ errorMessage() }}</span>
          <button (click)="errorMessage.set(null)" class="text-rose-400 hover:text-rose-300">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      }
      @if (successMessage()) {
        <div class="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl p-4 text-sm font-semibold flex items-center justify-between">
          <span>{{ successMessage() }}</span>
          <button (click)="successMessage.set(null)" class="text-emerald-400 hover:text-emerald-300">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      }

      <div class="bg-slate-900/20 border border-slate-850 rounded-2xl overflow-hidden shadow-xl">
        <div class="px-6 py-4 border-b border-slate-850 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <h3 class="text-base font-bold text-white font-cairo">\u0633\u062C\u0644 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0648\u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062A</h3>
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="\u0628\u062D\u062B \u0628\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 \u0623\u0648 \u0627\u0644\u0645\u0648\u0642\u0639..."
            class="px-4 py-2 border border-slate-800 bg-slate-950 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 w-full sm:w-64 transition-all">
        </div>

        @if (isLoading()) {
          <div class="flex justify-center items-center py-12">
            <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        } @else {
          <div class="overflow-x-auto">
            <table class="w-full text-left rtl:text-right">
              <thead>
                <tr class="border-b border-slate-850 text-slate-500 text-xs font-bold uppercase tracking-wider font-cairo bg-slate-900/10">
                  <th class="px-6 py-4">\u0627\u0644\u0634\u0631\u0643\u0629 / Tenant Name</th>
                  <th class="px-6 py-4">\u0645\u0639\u0631\u0641 \u0627\u0644\u0634\u0631\u0643\u0629 / Tenant ID</th>
                  <th class="px-6 py-4">\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 / Plan</th>
                  <th class="px-6 py-4">\u0627\u0644\u0645\u0648\u0642\u0639 / Location</th>
                  <th class="px-6 py-4 text-center">\u0627\u0644\u062A\u0642\u064A\u064A\u0645 / Rating</th>
                  <th class="px-6 py-4">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u0636\u0645\u0627\u0645 / Created</th>
                  <th class="px-6 py-4">\u062D\u0627\u0644\u0629 \u0627\u0644\u062D\u0633\u0627\u0628 / Status</th>
                  <th class="px-6 py-4 text-center">\u0627\u0644\u062A\u062D\u0643\u0645 \u0648\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A / Controls</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-850 text-slate-300 text-xs">
                @for (tenant of filteredTenants(); track tenant.id) {
                  <tr class="hover:bg-slate-900/30 transition-colors duration-150">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        @if (tenant.logoUrl) {
                          <img [src]="tenant.logoUrl" class="w-8 h-8 rounded-lg object-cover">
                        } @else {
                          <div class="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xs uppercase">{{ tenant.name.substring(0, 2) }}</div>
                        }
                        <span class="font-bold text-white text-sm">{{ tenant.name }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-mono text-[10px] text-slate-500 select-all">{{ tenant.id }}</td>
                    <td class="px-6 py-4">
                      @if (tenant.subscriptionPlan === 'Premium') {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/25">Premium</span>
                      } @else if (tenant.subscriptionPlan === 'Standard') {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">Standard</span>
                      } @else {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700/60">Free</span>
                      }
                    </td>
                    <td class="px-6 py-4 font-cairo font-semibold text-slate-400">{{ tenant.region || '\u063A\u064A\u0631 \u0645\u062D\u062F\u062F' }}</td>
                    <td class="px-6 py-4 text-center">
                       <button
                         (click)="openReviewsModal(tenant.id, tenant.name)"
                         title="View all client reviews"
                         class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-amber-500/25 rounded-lg text-[11px] font-bold transition-all cursor-pointer">
                         \u2B50 {{ (tenant.rating || 0) | number:'1.1-1' }}
                       </button>
                    </td>
                    <td class="px-6 py-4 text-slate-400 font-mono">{{ tenant.createdAt | date:'dd/MM/yyyy' }}</td>
                    <td class="px-6 py-4">
                      @if (tenant.status === 'Active') {
                        <span class="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25">Active</span>
                      } @else if (tenant.status === 'Suspended') {
                        <span class="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 font-bold border border-rose-500/25">\u{1F6AB} Suspended</span>
                      } @else {
                        <span class="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-bold border border-amber-500/25">{{ tenant.status }}</span>
                      }
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          (click)="inspectTenant(tenant)"
                          class="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-indigo-400 border border-indigo-900/30 rounded-xl text-[10px] font-bold font-cairo transition-all duration-200 active:scale-95 cursor-pointer">
                          \u0645\u0631\u0627\u062C\u0639\u0629 / Inspect
                        </button>

                        <button
                          (click)="openManualUpgradeModal(tenant)"
                          class="px-2.5 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 rounded-xl text-[10px] font-bold font-cairo transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-1">
                          <span>\u{1F4B3} \u062A\u0631\u0642\u064A\u0629 \u0648\u0625\u064A\u0635\u0627\u0644</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="8" class="px-6 py-12 text-center text-slate-500 text-sm font-cairo">\u0644\u0627 \u062A\u0648\u062C\u062F \u0634\u0631\u0643\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0627\u0644\u0645\u0646\u0635\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>

      @if (selectedTenant(); as tenant) {
        <div class="fixed inset-0 z-50 flex items-stretch justify-center p-3 sm:p-4">
          <div (click)="closeInspector()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"></div>

            <div class="relative z-10 w-full max-w-2xl mx-auto my-auto p-4 md:p-6 max-h-[92vh] flex flex-col bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-2xl shadow-black/80">
              <div class="sticky top-0 z-10 border-b border-slate-900 bg-slate-950/95 px-4 md:px-6 py-4 backdrop-blur-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <span class="text-[10px] font-bold text-indigo-400 tracking-wider uppercase font-cairo">Platform Audit & Moderation Control</span>
                <h3 class="text-xl font-bold text-white font-cairo mt-1">{{ tenant.name }}</h3>
              </div>
              <button
                (click)="closeInspector()"
                class="self-start md:self-auto w-full md:w-auto px-3 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-150 text-xs font-bold font-cairo cursor-pointer">
                \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 / Close
              </button>
            </div>

            <div class="flex-1 overflow-y-auto min-h-0 p-4 md:p-6 space-y-6">
              @if (activeActionContext(); as actionContext) {
                <div
                  class="rounded-2xl border px-5 py-4 shadow-lg shadow-black/20 transition-all duration-300"
                  [class.border-emerald-500/30]="actionContext.status === 'Activate'"
                  [class.bg-emerald-500/10]="actionContext.status === 'Activate'"
                  [class.border-amber-500/30]="actionContext.status === 'Reject' || actionContext.status === 'Suspend'"
                  [class.bg-amber-500/10]="actionContext.status === 'Reject'"
                  [class.bg-rose-500/10]="actionContext.status === 'Suspend'">
                  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div class="space-y-1">
                      <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-cairo">Operational Action Tray</div>
                      <div class="text-sm font-bold text-white font-cairo">
                        @if (actionContext.status === 'Activate') {
                          \u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u0627\u0646\u0636\u0645\u0627\u0645 \u0644\u0644\u0634\u0631\u0643\u0629 {{ actionContext.tenantName }}.
                        } @else if (actionContext.status === 'Reject') {
                          \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0644\u0644\u0634\u0631\u0643\u0629 {{ actionContext.tenantName }}.
                        } @else {
                          \u062A\u0645 \u062A\u0639\u0644\u064A\u0642 \u0627\u0644\u0634\u0631\u0643\u0629 {{ actionContext.tenantName }} \u0645\u0624\u0642\u062A\u0627\u064B.
                        }
                      </div>
                      <div class="text-xs text-slate-300 font-cairo">\u0627\u0644\u0645\u0633\u0624\u0648\u0644: {{ actionContext.ownerName }} \xB7 \u0627\u0644\u0647\u0627\u062A\u0641: {{ actionContext.phone }}</div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-3">
                      <button
                        (click)="launchWhatsAppAction()"
                        class="px-4 py-2 rounded-xl text-xs font-bold font-cairo border transition-all duration-200 active:scale-95 cursor-pointer"
                        [class.bg-emerald-500/15]="actionContext.status === 'Activate'"
                        [class.text-emerald-300]="actionContext.status === 'Activate'"
                        [class.border-emerald-500/30]="actionContext.status === 'Activate'"
                        [class.hover:bg-emerald-500/20]="actionContext.status === 'Activate'"
                        [class.bg-amber-500/15]="actionContext.status === 'Reject' || actionContext.status === 'Suspend'"
                        [class.text-amber-300]="actionContext.status === 'Reject' || actionContext.status === 'Suspend'"
                        [class.border-amber-500/30]="actionContext.status === 'Reject' || actionContext.status === 'Suspend'"
                        [class.hover:bg-amber-500/20]="actionContext.status === 'Reject' || actionContext.status === 'Suspend'"
                        [class.bg-rose-500/15]="actionContext.status === 'Suspend'"
                        [class.text-rose-300]="actionContext.status === 'Suspend'"
                        [class.border-rose-500/30]="actionContext.status === 'Suspend'">
                        \u0625\u0631\u0633\u0627\u0644 \u0639\u0628\u0631 WhatsApp
                      </button>

                      @if (actionContext.status === 'Reject' && actionContext.mapLink) {
                        <button
                          (click)="launchTargetMapLocation()"
                          class="px-4 py-2 rounded-xl text-xs font-bold font-cairo border border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 transition-all duration-200 active:scale-95 cursor-pointer">
                          \u0641\u062A\u062D \u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 / Open Targeted Map Location
                        </button>
                      }
                    </div>
                  </div>
                </div>
              }

              @if (isLoadingAudit()) {
                <div class="flex justify-center items-center py-16">
                  <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                </div>
              } @else {
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div class="bg-slate-950/55 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div class="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <span class="text-[10px] font-bold text-indigo-400 tracking-wider uppercase font-cairo">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0633\u062C\u064A\u0644 / Registration Data</span>
                        <h4 class="text-lg font-bold text-white font-cairo mt-1">\u0645\u0644\u0641 \u0627\u0644\u0639\u0645\u064A\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064A</h4>
                      </div>
                      @if (tenant.status === 'Active') {
                        <span class="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25 text-[10px]">Active</span>
                      } @else if (tenant.status === 'Suspended') {
                        <span class="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 font-bold border border-rose-500/25 text-[10px]">Suspended</span>
                      } @else {
                        <span class="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-bold border border-amber-500/25 text-[10px]">{{ tenant.status }}</span>
                      }
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644</div>
                        <div class="mt-1 text-slate-200 font-semibold font-cairo">{{ tenant.adminFirstName || '\u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631' }} {{ tenant.adminLastName || '' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">{{ tenant.adminEmail || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628</div>
                        <div class="mt-1 text-slate-200 font-semibold">{{ tenant.accountType || 'Company' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 / Location</div>
                        <div class="mt-1 text-slate-200 font-semibold">{{ tenant.location || tenant.region || '\u063A\u064A\u0631 \u0645\u062D\u062F\u062F' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">{{ tenant.personalPhone || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643</div>
                        <div class="mt-1 text-slate-200 font-semibold">{{ tenant.subscriptionPlan }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3" [class.sm:col-span-2]="true">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">{{ tenant.commercialRegister || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0636\u0631\u064A\u0628\u064A\u0629</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">{{ tenant.taxCard || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">{{ tenant.nationalId || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u0631\u0642\u0645 \u0627\u0644\u0646\u0642\u0627\u0628\u0629</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">{{ tenant.syndicateId || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3 sm:col-span-2">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A</div>
                        <div class="mt-1 text-slate-200 font-semibold">{{ tenant.manualAddress || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3 sm:col-span-2">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0648\u0642\u0639 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629</div>
                        <div class="mt-1 text-slate-200 break-all">
                          @if (tenant.mapLocationUrl) {
                            <a [href]="tenant.mapLocationUrl" target="_blank" rel="noreferrer" class="text-indigo-300 hover:text-indigo-200 underline decoration-dotted">\u0627\u0641\u062A\u062D \u0627\u0644\u0645\u0648\u0642\u0639 / Open map location</a>
                          } @else {
                            N/A
                          }
                        </div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">
                          {{ tenant.latitude ?? 'N/A' }} , {{ tenant.longitude ?? 'N/A' }}
                        </div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u0636\u0645\u0627\u0645</div>
                        <div class="mt-1 text-slate-200 font-semibold font-mono">{{ tenant.createdAt | date:'dd/MM/yyyy' }}</div>
                      </div>
                    </div>

                    <div class="bg-slate-950/55 border border-slate-800 rounded-2xl p-4 space-y-3">
                      <div class="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                        <div>
                          <span class="text-[10px] font-bold text-indigo-400 tracking-wider uppercase font-cairo">Administrative Action Set</span>
                          <h4 class="text-lg font-bold text-white font-cairo mt-1">\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0629</h4>
                        </div>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        @if (tenant.status !== 'Active') {
                          <button
                            (click)="onAction(tenant.id, 'Activate')"
                            [disabled]="isActioningId() === tenant.id"
                            class="px-3 py-2 rounded-xl text-xs font-bold font-cairo border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2">
                            @if (isActioningId() === tenant.id) {
                              <svg class="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            }
                            Activate
                          </button>
                        }

                        @if (tenant.status !== 'Suspended') {
                          <button
                            (click)="onAction(tenant.id, 'Reject')"
                            [disabled]="isActioningId() === tenant.id"
                            class="px-3 py-2 rounded-xl text-xs font-bold font-cairo border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2">
                            @if (isActioningId() === tenant.id) {
                              <svg class="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            }
                            Reject
                          </button>

                          <button
                            (click)="onAction(tenant.id, 'Suspend')"
                            [disabled]="isActioningId() === tenant.id"
                            class="px-3 py-2 rounded-xl text-xs font-bold font-cairo border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2">
                            @if (isActioningId() === tenant.id) {
                              <svg class="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            }
                            Suspend
                          </button>
                        }
                      </div>

                      </div>

                    <div class="bg-slate-950/40 border border-slate-850 rounded-xl p-4 text-sm text-slate-300 font-cairo">
                      \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0633\u0629 \u062A\u0628\u0642\u0649 \u062F\u0627\u062E\u0644 \u0634\u0627\u0634\u0629 \u0627\u0644\u0633\u0648\u0628\u0631\u0623\u062F\u0645\u0650\u0646 \u0641\u0642\u0637\u060C \u0648\u0644\u0627 \u062A\u0638\u0647\u0631 \u0641\u064A \u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u0639\u0627\u0645 \u0623\u0648 \u0623\u064A \u0648\u0627\u062C\u0647\u0629 \u0639\u0627\u0645\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646.
                    </div>
                  </div>

                  <div class="space-y-4 w-full">
                    <div class="bg-slate-950/55 border border-slate-800 rounded-2xl p-5 space-y-4">
                      <div class="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                        <div>
                          <span class="text-[10px] font-bold text-indigo-400 tracking-wider uppercase font-cairo">\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0648\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0627\u062A / Audit & Moderation</span>
                          <h4 class="text-lg font-bold text-white font-cairo mt-1">\u0633\u062C\u0644 \u0627\u0644\u0623\u062F\u0627\u0621 \u0648\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0627\u062A</h4>
                        </div>
                      </div>

                      @if (auditProfile()) {
                        <div class="grid grid-cols-3 gap-3">
                          <div class="bg-slate-950/60 rounded-xl p-3 border border-slate-850">
                            <span class="text-[10px] text-slate-500 uppercase tracking-wider font-cairo">\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639</span>
                            <div class="text-xl font-bold text-slate-200 mt-0.5">{{ auditProfile().totalProjectsCount }}</div>
                          </div>
                          <div class="bg-slate-950/60 rounded-xl p-3 border border-slate-850">
                            <span class="text-[10px] text-slate-500 uppercase tracking-wider font-cairo">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646</span>
                            <div class="text-xl font-bold text-slate-200 mt-0.5">{{ auditProfile().activeUserCount }}</div>
                          </div>
                          <div class="bg-slate-950/60 rounded-xl p-3 border border-slate-850">
                            <span class="text-[10px] text-slate-500 uppercase tracking-wider font-cairo">\u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0639\u0627\u0645</span>
                            <button
                              (click)="openReviewsModal(tenant.id, tenant.name)"
                              title="Click to view detailed customer reviews ledger"
                              class="w-full text-right flex items-center gap-1.5 text-xl font-bold text-amber-400 mt-0.5 hover:text-amber-300 transition-colors cursor-pointer focus:outline-none">
                              \u2B50 {{ auditProfile().globalRatingScore | number:'1.1-1' }}
                            </button>
                          </div>
                        </div>

                        <div class="bg-slate-950/40 border border-slate-850 rounded-xl p-4.5 space-y-2">
                          <div class="flex justify-between items-center text-xs">
                            <span class="text-slate-400 font-cairo font-bold">\u{1F4BE} \u0627\u0644\u0633\u0639\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 / Storage Metrics</span>
                            <span class="font-mono text-indigo-400 font-bold">{{ auditProfile().storageUsedMb }} MB / 100 MB</span>
                          </div>
                          <div class="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                            <div class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500" [style.width.%]="storagePercentage()"></div>
                          </div>
                          <div class="flex justify-between items-center text-[10px] text-slate-500 font-cairo">
                            <span>\u062A\u0645 \u0627\u062D\u062A\u0633\u0627\u0628\u0647\u0627 \u0645\u0646 \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0627\u062A \u0627\u0644\u0645\u0631\u0641\u0648\u0639\u0629 \u0648\u0627\u0644\u0639\u0647\u062F\u0629.</span>
                            <span>\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643: {{ storagePercentage() | number:'1.0-0' }}%</span>
                          </div>
                        </div>
                      } @else {
                        <div class="bg-slate-950/40 border border-slate-850 rounded-xl p-4 text-sm text-slate-400 font-cairo">
                          \u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u062A\u0627\u062D\u0629 \u0628\u0639\u062F.
                        </div>
                      }
                    </div>

                    <div class="bg-slate-950/55 border border-slate-800 rounded-2xl p-5 space-y-3">
                      <span class="text-xs font-bold text-indigo-400 font-cairo uppercase tracking-wider block border-b border-slate-800 pb-2">\u270D\uFE0F Review Moderation Hub</span>

                      <div class="space-y-3 max-h-[28rem] overflow-y-auto pr-1">
                        @for (project of moderatedProjects(); track project.id) {
                          <div class="bg-slate-950/65 border border-slate-850 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div class="space-y-1">
                              <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-white">{{ project.name }}</span>
                                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-bold border border-slate-800">\u2B50 {{ project.clientRating }}</span>
                              </div>
                              <p class="text-xs text-slate-400 font-cairo font-medium">\u0627\u0644\u0639\u0645\u064A\u0644: {{ project.clientName || '\u063A\u064A\u0631 \u0645\u0633\u062C\u0644' }}</p>
                              <p class="text-[11px] text-slate-300 italic bg-slate-900/30 rounded p-2 border border-slate-850/60 font-cairo mt-1.5">{{ project.clientReviewNotes || '\u0644\u0645 \u064A\u0643\u062A\u0628 \u062A\u0639\u0644\u064A\u0642\u0627\u064B \u0646\u0635\u064A\u0627\u064B' }}</p>
                            </div>

                            <div class="shrink-0 flex items-center gap-2 self-end sm:self-center">
                              @if (project.isReviewHidden) {
                                <span class="text-[10px] font-bold text-rose-400 bg-rose-950/20 border border-rose-900/30 px-2 py-0.5 rounded font-cairo">\u0645\u062E\u0641\u064A / Hidden</span>
                              } @else {
                                <span class="text-[10px] font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 px-2 py-0.5 rounded font-cairo">\u0646\u0634\u0637 / Visible</span>
                              }

                              <button
                                (click)="toggleReview(project)"
                                [disabled]="isModeratingId() === project.id"
                                class="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 hover:text-white rounded-xl text-[10px] font-bold font-cairo cursor-pointer active:scale-95 transition-all flex items-center gap-1">
                                @if (isModeratingId() === project.id) {
                                  <svg class="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                } @else {
                                  {{ project.isReviewHidden ? '\u0625\u0638\u0647\u0627\u0631 / Show' : '\u062D\u062C\u0628 / Hide' }}
                                }
                              </button>
                            </div>
                          </div>
                        } @empty {
                          <p class="text-xs text-slate-500 text-center font-cairo py-6 bg-slate-950/30 rounded-xl border border-slate-850">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u0643\u062A\u0648\u0628\u0629 \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F.</p>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </div>

    <!-- Client Reviews Ledger Popup Modal -->
    @if (showReviewsModal()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
        <div (click)="closeReviewsModal()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"></div>

        <div class="relative z-10 w-full max-w-3xl mx-auto my-auto max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/85 font-sans">
          <!-- Modal Header -->
          <div class="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/95 px-5 py-4 backdrop-blur-sm flex items-center justify-between">
            <div>
              <span class="text-[10px] font-bold text-amber-400 tracking-wider uppercase font-cairo">\u0633\u062C\u0644 \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0639\u0645\u0644\u0627\u0621 / Client Ratings Ledger</span>
              <h3 class="text-base font-bold text-white font-cairo mt-1">\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0634\u0631\u0643\u0629: {{ reviewsModalTenantName() }}</h3>
            </div>
            <button
              (click)="closeReviewsModal()"
              class="px-3 py-1.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-850 transition-colors duration-150 text-xs font-bold font-cairo cursor-pointer">
              \u0625\u063A\u0644\u0627\u0642 / Close
            </button>
          </div>

          <!-- Modal Body (Independent Scroll Box) -->
          <div class="flex-1 overflow-y-auto min-h-0 p-5 space-y-4">
            @if (isLoadingReviews()) {
              <div class="flex flex-col items-center justify-center py-12 gap-3">
                <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-xs text-slate-400 font-cairo">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A...</span>
              </div>
            } @else {
              <div class="w-full overflow-x-auto block">
                <table class="w-full text-right border-collapse min-w-[650px]">
                  <thead>
                    <tr class="border-b border-slate-800 text-slate-400 text-xs font-bold font-cairo">
                      <th class="pb-3 px-3">\u0627\u0644\u0645\u0634\u0631\u0648\u0639 / Project</th>
                      <th class="pb-3 px-3">\u0627\u0644\u0639\u0645\u064A\u0644 / Client</th>
                      <th class="pb-3 px-3 text-center">\u0627\u0644\u062A\u0642\u064A\u064A\u0645 / Rating</th>
                      <th class="pb-3 px-3">\u0627\u0644\u062A\u0639\u0644\u064A\u0642 / Comments</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-850 text-slate-300 text-xs font-sans">
                    @for (rev of reviewsList(); track rev.id) {
                      <tr class="hover:bg-slate-950/20 transition-colors">
                        <td class="py-3.5 px-3 font-semibold text-white font-cairo">{{ rev.name }}</td>
                        <td class="py-3.5 px-3 text-slate-400 font-cairo">{{ rev.clientName || '\u063A\u064A\u0631 \u0645\u0633\u062C\u0644' }}</td>
                        <td class="py-3.5 px-3 text-center">
                          <div class="flex items-center justify-center gap-0.5">
                            @if (rev.clientRating) {
                              @for (star of [1,2,3,4,5]; track star) {
                                <span class="text-sm" [class.text-amber-400]="star <= rev.clientRating" [class.text-slate-700]="star > rev.clientRating">\u2605</span>
                              }
                              <span class="text-[10px] font-bold text-amber-500/80 font-mono ml-1">({{ rev.clientRating }})</span>
                            } @else {
                              <span class="text-slate-500 font-cairo">\u0628\u062F\u0648\u0646 \u062A\u0642\u064A\u064A\u0645 \u0646\u062C\u0648\u0645</span>
                            }
                          </div>
                        </td>
                        <td class="py-3.5 px-3 max-w-[280px] break-words">
                          @if (rev.clientReviewNotes) {
                            <div class="text-slate-300 italic font-cairo bg-slate-950/30 border border-slate-850 p-2.5 rounded-lg">
                              {{ rev.clientReviewNotes }}
                            </div>
                          } @else {
                            <span class="text-slate-550 font-cairo italic">\u0644\u0627 \u064A\u0648\u062C\u062F \u062A\u0639\u0644\u064A\u0642 \u0646\u0635\u064A</span>
                          }
                        </td>
                      </tr>
                    } @empty {
                      <tr>
                        <td colspan="4" class="py-12 text-center text-slate-500 text-sm font-cairo">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F.</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      </div>
    }

    <!-- SUPER ADMIN MANUAL UPGRADE & RECEIPT MODAL -->
    @if (isManualUpgradeModalOpen() && selectedTenantForUpgrade(); as t) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div (click)="closeManualUpgradeModal()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"></div>

        <div class="relative z-10 w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <!-- Modal Header -->
          <div class="px-6 py-4 border-b border-slate-850 flex items-center justify-between bg-slate-900/60">
            <div class="flex items-center gap-2">
              <span class="text-xl">\u{1F4B3}</span>
              <div>
                <h3 class="font-bold text-base text-white font-cairo">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 \u0648\u0627\u0644\u0625\u064A\u0635\u0627\u0644\u0627\u062A \u064A\u062F\u0648\u064A\u064B\u0627</h3>
                <p class="text-xs text-slate-400 font-cairo">\u0634\u0631\u0643\u0629: <strong class="text-indigo-400">{{ t.name }}</strong></p>
              </div>
            </div>
            <button (click)="closeManualUpgradeModal()" class="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-colors cursor-pointer">
              \u2715
            </button>
          </div>

          <!-- Modal Body -->
          @if (!adminReceiptData()) {
            <!-- FORM STATE -->
            <div class="p-6 space-y-4 text-right font-cairo">
              
              <div class="p-3 bg-indigo-950/40 border border-indigo-500/20 rounded-xl text-xs text-indigo-300 flex items-center justify-between">
                <span>\u062D\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u064A \u0644\u0644\u0634\u0631\u0643\u0629:</span>
                <span class="font-mono font-bold text-amber-400 text-sm">{{ t.maxActiveProjects }} \u0645\u0634\u0627\u0631\u064A\u0639</span>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">\u0639\u062F\u062F \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629 \u0627\u0644\u0645\u0631\u0627\u062F \u0625\u0636\u0627\u0641\u062A\u0647\u0627 *</label>
                <input 
                  type="number" 
                  [ngModel]="manualProjectsCount()" 
                  (ngModelChange)="manualProjectsCount.set($event)"
                  min="1" 
                  class="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 font-mono" />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062D\u0635\u0651\u0644 \u064A\u062F\u0648\u064A\u064B\u0627 (EGP) *</label>
                <input 
                  type="number" 
                  [ngModel]="manualAmountEgp()" 
                  (ngModelChange)="manualAmountEgp.set($event)"
                  min="0" 
                  class="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 font-mono" />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639 *</label>
                <select 
                  [ngModel]="manualPaymentMethod()" 
                  (ngModelChange)="manualPaymentMethod.set($event)"
                  class="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 font-cairo">
                  <option value="Cash">\u0646\u0642\u062F\u0627\u064B / \u0643\u0627\u0634 (Cash)</option>
                  <option value="BankTransfer">\u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u0643\u064A / \u062D\u0633\u0627\u0628 \u0627\u0644\u0634\u0631\u0643\u0629 (Bank Transfer)</option>
                  <option value="VodafoneCash">\u0641\u0648\u062F\u0627\u0641\u0648\u0646 \u0643\u0627\u0634 / \u0645\u062D\u0641\u0638\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 (Vodafone Cash)</option>
                  <option value="InstaPay">\u062A\u0637\u0628\u064A\u0642 \u0625\u0646\u0633\u062A\u0627\u0628\u0627\u064A (InstaPay)</option>
                  <option value="Other">\u0637\u0631\u064A\u0642\u0629 \u0623\u062E\u0631\u0649 / \u0645\u062E\u0635\u0635\u0629</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0625\u064A\u0635\u0627\u0644 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
                <input 
                  type="text" 
                  [ngModel]="manualNotes()" 
                  (ngModelChange)="manualNotes.set($event)"
                  placeholder="\u0645\u062B\u0627\u0644: \u062A\u0645 \u062A\u062D\u0635\u064A\u0644 \u0627\u0644\u0645\u0628\u0644\u063A \u0628\u062D\u0648\u0627\u0644\u0629 \u0628\u0646\u0643\u064A\u0629 \u0631\u0642\u0645 84920" 
                  class="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-cairo" />
              </div>

              <div class="pt-2 flex items-center justify-end gap-3">
                <button 
                  (click)="closeManualUpgradeModal()" 
                  class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all cursor-pointer">
                  \u0625\u0644\u063A\u0627\u0621
                </button>

                <button 
                  [disabled]="isSubmittingManualUpgrade()"
                  (click)="submitManualUpgrade()"
                  class="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer">
                  @if (isSubmittingManualUpgrade()) {
                    <span>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0648\u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0625\u064A\u0635\u0627\u0644...</span>
                  } @else {
                    <span>\u26A1 \u062A\u0641\u0639\u064A\u0644 \u0648\u0625\u0635\u062F\u0627\u0631 \u0625\u064A\u0635\u0627\u0644 \u0631\u0633\u0645\u064A\u0627\u064B</span>
                  }
                </button>
              </div>
            </div>
          } @else {
            <!-- OFFICIAL PRINTABLE ADMIN RECEIPT -->
            <div class="overflow-y-auto min-h-0 p-6 space-y-5 text-right font-cairo">
              
              <!-- Official Enterprise Printable Admin Receipt Container -->
              <div class="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-indigo-500/30 rounded-2xl relative shadow-xl print-only space-y-4 text-right font-cairo" dir="rtl">
                
                <!-- Receipt Header / Letterhead -->
                <div class="flex items-center justify-between border-b border-slate-800 pb-3.5 mb-1">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-indigo-500/20 border border-indigo-500/40 rounded-xl flex items-center justify-center text-indigo-400 text-2xl font-bold">
                      \u{1F4DC}
                    </div>
                    <div>
                      <h4 class="font-black text-lg text-white">\u0625\u064A\u0635\u0627\u0644 \u0633\u062F\u0627\u062F \u0648\u062A\u0641\u0639\u064A\u0644 \u0625\u062F\u0627\u0631\u064A \u0645\u062D\u0635\u0651\u0644</h4>
                      <span class="text-[11px] text-indigo-400 font-mono tracking-wider">SUPER ADMIN OFFICIAL INVOICE \xB7 STRUCTO PLATFORM</span>
                    </div>
                  </div>

                  <div class="text-left font-mono">
                    <span class="px-3 py-1 text-xs font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 rounded-lg inline-block mb-1">
                      \u2713 \u0645\u0643\u062A\u0645\u0644 \u0648\u0645\u0641\u0639\u0644 \u0625\u062F\u0627\u0631\u064A\u0627\u064B / CONFIRMED
                    </span>
                    <p class="text-[10px] text-slate-400">\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644: <strong class="text-indigo-400 font-mono">{{ adminReceiptData()?.referenceNumber }}</strong></p>
                  </div>
                </div>

                <!-- Subtitle Bar -->
                <div class="flex items-center justify-between bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                  <div>
                    <h5 class="font-black text-xs text-white">\u0625\u064A\u0635\u0627\u0644 \u0633\u062F\u0627\u062F \u0648\u062A\u062D\u0635\u064A\u0644 \u0625\u062F\u0627\u0631\u064A \u0645\u0628\u0627\u0634\u0631 (Super Admin Manual Receipt)</h5>
                    <p class="text-[10px] text-slate-400">\u0635\u0627\u062F\u0631 \u0631\u0633\u0645\u064A\u0627\u064B \u0639\u0646 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u064A\u0627 \u0644\u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0644\u0625\u0639\u0627\u062F\u0629 \u0634\u062D\u0646 \u0648\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A.</p>
                  </div>
                  <span class="text-[10px] font-mono text-indigo-300 bg-indigo-950 border border-indigo-500/30 px-2.5 py-1 rounded">
                    ADMIN-AUTH
                  </span>
                </div>

                <!-- Parties Info Grid -->
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-850 space-y-1">
                    <span class="text-[10px] text-slate-400 block font-cairo">\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u062A\u062D\u0635\u064A\u0644\u064A\u0629 (Super Admin):</span>
                    <span class="font-bold text-white block font-cairo">\u0625\u062F\u0627\u0631\u0629 \u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 / Structo Central Admin</span>
                    <span class="text-[10px] text-slate-400 font-mono block">admin@structo.app</span>
                  </div>

                  <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-850 space-y-1">
                    <span class="text-[10px] text-slate-400 block font-cairo">\u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u0627\u0644\u0639\u0645\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u0641\u064A\u062F:</span>
                    <span class="font-bold text-white block font-cairo truncate">{{ t.name }}</span>
                    <span class="text-[10px] text-slate-400 font-mono block truncate">ID: {{ t.id }}</span>
                  </div>
                </div>

                <!-- Itemized Service Breakdown Table -->
                <div class="border border-slate-800 rounded-xl overflow-hidden text-xs">
                  <table class="w-full text-right font-cairo">
                    <thead class="bg-slate-950 text-slate-300 font-bold border-b border-slate-800 text-[11px]">
                      <tr>
                        <th class="p-2.5">\u0628\u064A\u0627\u0646 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0648\u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u064A</th>
                        <th class="p-2.5 text-center">\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u0636\u0627\u0641</th>
                        <th class="p-2.5 text-center">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062D\u0635\u064A\u0644</th>
                        <th class="p-2.5 text-left">\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062D\u0635\u0644</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-850 bg-slate-900/60">
                      <tr>
                        <td class="p-2.5">
                          <span class="font-bold text-white block">\u0634\u062D\u0646 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 \u0648\u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A (Manual Top-Up)</span>
                          <span class="text-[10px] text-slate-400 block">\u062A\u0645 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u064A\u062F\u0648\u064A \u0628\u0648\u0627\u0633\u0637\u0629 \u0627\u0644\u0633\u0648\u0628\u0631 \u0623\u062F\u0645\u0646.</span>
                        </td>
                        <td class="p-2.5 text-center font-bold text-emerald-400">+{{ adminReceiptData()?.extraProjectsAdded }} \u0645\u0634\u0627\u0631\u064A\u0639</td>
                        <td class="p-2.5 text-center font-bold text-slate-200">{{ manualPaymentMethod() }}</td>
                        <td class="p-2.5 text-left font-mono font-black text-amber-400 text-sm">{{ adminReceiptData()?.totalAmount | number }} EGP</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Summary Breakdown Grid -->
                <div class="grid grid-cols-3 gap-2.5 text-xs">
                  <div class="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850">
                    <span class="text-[10px] text-slate-400 block mb-0.5 font-cairo">\u062D\u0627\u0644\u0629 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</span>
                    <span class="font-bold text-emerald-400 font-cairo text-xs">\u0645\u0643\u062A\u0645\u0644 \u0648\u0645\u062D\u0635\u0644 100%</span>
                  </div>

                  <div class="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850">
                    <span class="text-[10px] text-slate-400 block mb-0.5 font-cairo">\u0627\u0644\u0632\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629</span>
                    <span class="font-bold text-emerald-400 font-cairo text-xs">+{{ adminReceiptData()?.extraProjectsAdded }} \u0645\u0634\u0627\u0631\u064A\u0639</span>
                  </div>

                  <div class="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850">
                    <span class="text-[10px] text-slate-400 block mb-0.5 font-cairo">\u0627\u0644\u0633\u0639\u0629 \u0627\u0644\u0643\u0644\u064A\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629</span>
                    <span class="font-mono font-bold text-amber-400 text-xs">{{ adminReceiptData()?.newMaxActiveProjects }} \u0645\u0634\u0627\u0631\u064A\u0639</span>
                  </div>
                </div>

                <!-- Total Paid Card -->
                <div class="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span class="text-xs font-bold text-white font-cairo block">\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062D\u0635\u0651\u0644 (\u0635\u0627\u0641\u064A)</span>
                    <span class="text-[10px] text-slate-400 font-mono">TOTAL COLLECTED AMOUNT \xB7 NET</span>
                  </div>
                  <div class="text-xl font-black font-mono text-amber-400">
                    {{ adminReceiptData()?.totalAmount | number }} EGP
                  </div>
                </div>

                <!-- Official Footer Disclaimer -->
                <div class="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-cairo">
                  <span>\u{1F4DC} \u0625\u064A\u0635\u0627\u0644 \u062A\u062D\u0635\u064A\u0644 \u0648\u0633\u062F\u0627\u062F \u0625\u062F\u0627\u0631\u064A \u0631\u0633\u0645\u064A \u0635\u0627\u062F\u0631 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0648\u0645\u0633\u062C\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633.</span>
                  <span class="font-mono text-slate-500">Structo Super Admin Authority</span>
                </div>

              </div>

              <!-- Buttons (Hidden during PDF print) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 no-print">
                <button 
                  (click)="sendAdminReceiptWhatsApp()"
                  class="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer">
                  <span>\u{1F4F2} \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628</span>
                </button>

                <button 
                  (click)="printAdminReceipt()"
                  class="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span>\u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 / Print PDF</span>
                </button>
              </div>

              <div class="pt-2 no-print">
                <button 
                  (click)="closeManualUpgradeModal()"
                  class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/30 cursor-pointer">
                  \u062A\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0648\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062A
                </button>
              </div>

            </div>
          }

        </div>
      </div>
    }
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TenantsComponent, { className: "TenantsComponent", filePath: "src/app/features/dashboard/tenants/tenants.component.ts", lineNumber: 806 });
})();
export {
  TenantsComponent
};
//# sourceMappingURL=chunk-IGJ2KDK6.js.map
