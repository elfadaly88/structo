import {
  WhatsAppLinkService
} from "./chunk-AUDUMTKV.js";
import {
  LanguageService
} from "./chunk-TPAXF35E.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-PRQNVNAF.js";
import {
  TranslatePipe
} from "./chunk-2SDLZEQZ.js";
import {
  AuthService
} from "./chunk-CXPACYC7.js";
import "./chunk-DLHRGTU7.js";
import {
  Router,
  RouterLink
} from "./chunk-YUU7E6C7.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  HttpClient,
  HttpParams,
  environment
} from "./chunk-2FDFRP6Y.js";
import {
  Component,
  DOCUMENT,
  HostListener,
  Injectable,
  Renderer2,
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
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreadContextLet,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstoreLet,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-EHUV6UVS.js";

// src/app/core/services/public-directory.service.ts
var PublicDirectoryService = class _PublicDirectoryService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/public`;
  getTenants(filters) {
    let params = new HttpParams();
    if (filters?.region) {
      params = params.set("region", filters.region);
    }
    if (filters?.category) {
      params = params.set("category", filters.category);
    }
    if (filters?.minRating !== void 0) {
      params = params.set("minRating", filters.minRating.toString());
    }
    return this.http.get(`${this.apiUrl}/tenants`, { params });
  }
  getTenantPortfolio(id) {
    return this.http.get(`${this.apiUrl}/tenants/${id}/portfolio`);
  }
  getTenantReviews(tenantId) {
    return this.http.get(`${this.apiUrl}/directory/${tenantId}/reviews`);
  }
  static \u0275fac = function PublicDirectoryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PublicDirectoryService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PublicDirectoryService, factory: _PublicDirectoryService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PublicDirectoryService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/landing-page/landing-page.component.ts
var _c0 = () => [1, 2, 3, 4, 5];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.projectName;
function LandingPageComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 88);
    \u0275\u0275text(1, " Welcome back, ");
    \u0275\u0275elementStart(2, "span", 89);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "a", 90)(5, "span", 91);
    \u0275\u0275text(6, "Dashboard");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "div", 92);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.authService.currentUser()?.name);
  }
}
function LandingPageComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 93);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 94);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_15_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.navigateToLogin());
    });
    \u0275\u0275elementStart(4, "span", 91);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "div", 92);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, "NAV.LOGIN"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 4, "NAV.GET_STARTED"));
  }
}
function LandingPageComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0623\u064F\u0633\u064F\u0633 | \u0627\u0636\u0628\u0637 \u0639\u064F\u0647\u062F \u0645\u0634\u0627\u0631\u064A\u0639\u0643\u060C \u0648\u0631\u0627\u0642\u0628 \u0645\u0635\u0627\u0631\u064A\u0641 \u0645\u0648\u0642\u0639\u0643 ");
    \u0275\u0275elementStart(1, "span", 95);
    \u0275\u0275text(2, "\u0641\u064A \u062B\u0627\u0646\u064A\u0629 \u0648\u0628\u062F\u0648\u0646 \u0645\u062D\u0627\u0633\u0628");
    \u0275\u0275elementEnd();
  }
}
function LandingPageComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Osos | Track your project cash & monitor site expenses ");
    \u0275\u0275elementStart(1, "span", 95);
    \u0275\u0275text(2, "instantly without an accountant");
    \u0275\u0275elementEnd();
  }
}
function LandingPageComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 16);
    \u0275\u0275text(1, " Go to Dashboard ");
    \u0275\u0275elementStart(2, "span", 96);
    \u0275\u0275text(3, "\u2192");
    \u0275\u0275elementEnd()();
  }
}
function LandingPageComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 97);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_31_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.navigateToLogin());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 96);
    \u0275\u0275text(3, "\u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.langService.currentLang() === "ar" ? "\u0627\u0628\u062F\u0623 \u0645\u0634\u0631\u0648\u0639\u0643 \u0627\u0644\u0623\u0648\u0644 \u0645\u062C\u0627\u0646\u0627\u064B \u0641\u0648\u0631\u0627\u064B" : "Start Your First Project Free Now", " ");
  }
}
function LandingPageComponent_Conditional_207_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 98);
    \u0275\u0275element(2, "circle", 99)(3, "path", 100);
    \u0275\u0275elementEnd()();
  }
}
function LandingPageComponent_Conditional_208_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 104)(1, "img", 115);
    \u0275\u0275listener("error", function LandingPageComponent_Conditional_208_For_2_Conditional_3_Template_img_error_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onLogoError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 116);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const comp_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", comp_r6.logoUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", comp_r6.name.substring(0, 2), " ");
  }
}
function LandingPageComponent_Conditional_208_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 105);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", comp_r6.name.substring(0, 2), " ");
  }
}
function LandingPageComponent_Conditional_208_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 101)(1, "div")(2, "div", 103);
    \u0275\u0275conditionalCreate(3, LandingPageComponent_Conditional_208_For_2_Conditional_3_Template, 4, 2, "div", 104)(4, LandingPageComponent_Conditional_208_For_2_Conditional_4_Template, 2, 1, "div", 105);
    \u0275\u0275elementStart(5, "div")(6, "h3", 106);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 107);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "p", 108);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 109)(13, "button", 110);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_208_For_2_Template_button_click_13_listener($event) {
      const comp_r6 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openReviewsModal($event, comp_r6.id, comp_r6.name));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 111);
    \u0275\u0275element(15, "path", 112);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "span", 113);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "button", 114);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_208_For_2_Template_button_click_19_listener() {
      const comp_r6 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openPortfolioModal(comp_r6.id));
    });
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const comp_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275conditional(comp_r6.logoUrl ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(comp_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(comp_r6.region || "Global");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", comp_r6.companyDescription || "No description available for this corporate portfolio yet.", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 6, comp_r6.rating, "1.1-1"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(21, 9, "MARKETPLACE.VIEW_PORTFOLIO"), " ");
  }
}
function LandingPageComponent_Conditional_208_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 102);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 117);
    \u0275\u0275element(2, "path", 118);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 119);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 1, "MARKETPLACE.NO_COMPANIES"));
  }
}
function LandingPageComponent_Conditional_208_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83);
    \u0275\u0275repeaterCreate(1, LandingPageComponent_Conditional_208_For_2_Template, 22, 11, "div", 101, _forTrack0, false, LandingPageComponent_Conditional_208_ForEmpty_3_Template, 6, 3, "div", 102);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.companies());
  }
}
function LandingPageComponent_Conditional_209_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 154);
    \u0275\u0275listener("error", function LandingPageComponent_Conditional_209_Conditional_5_Template_img_error_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onImgError($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r0.selectedCompany().bannerUrl, \u0275\u0275sanitizeUrl);
  }
}
function LandingPageComponent_Conditional_209_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 132)(1, "img", 115);
    \u0275\u0275listener("error", function LandingPageComponent_Conditional_209_Conditional_13_Template_img_error_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onLogoError($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.selectedCompany().logoUrl, \u0275\u0275sanitizeUrl);
  }
}
function LandingPageComponent_Conditional_209_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 133);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.selectedCompany().name.substring(0, 2), " ");
  }
}
function LandingPageComponent_Conditional_209_For_51_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 170);
    \u0275\u0275listener("error", function LandingPageComponent_Conditional_209_For_51_Conditional_3_Template_img_error_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onImgError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 171)(2, "span", 172);
    \u0275\u0275text(3, " \u{1F50D} \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0635\u0648\u0631\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const proj_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("alt", \u0275\u0275interpolate(proj_r11.name))("src", proj_r11.sitePhotos[0], \u0275\u0275sanitizeUrl);
  }
}
function LandingPageComponent_Conditional_209_For_51_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 156);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 173);
    \u0275\u0275element(2, "path", 174);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span", 175);
    \u0275\u0275text(4, "\u0645\u0639\u0631\u0636 \u0635\u0648\u0631 \u0642\u064A\u062F \u0627\u0644\u062A\u062D\u062F\u064A\u062B");
    \u0275\u0275elementEnd()();
  }
}
function LandingPageComponent_Conditional_209_For_51_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 159);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const proj_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u{1F4F7} ", proj_r11.sitePhotos.length, " \u0635\u0648\u0631 ");
  }
}
function LandingPageComponent_Conditional_209_For_51_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const meta_r13 = \u0275\u0275readContextLet(0);
    \u0275\u0275textInterpolate1(" - ", meta_r13.cityOrZone, " ");
  }
}
function LandingPageComponent_Conditional_209_For_51_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 162);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, LandingPageComponent_Conditional_209_For_51_Conditional_13_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const meta_r13 = \u0275\u0275readContextLet(0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F4CD} ", meta_r13.governorate, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(meta_r13.cityOrZone ? 2 : -1);
  }
}
function LandingPageComponent_Conditional_209_For_51_Conditional_26_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 178);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_209_For_51_Conditional_26_Conditional_1_For_2_Template_div_click_0_listener($event) {
      const \u0275$index_613_r15 = \u0275\u0275restoreView(_r14).$index;
      const proj_r11 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openLightbox(proj_r11.sitePhotos, \u0275$index_613_r15, $event));
    });
    \u0275\u0275elementStart(1, "img", 179);
    \u0275\u0275listener("error", function LandingPageComponent_Conditional_209_For_51_Conditional_26_Conditional_1_For_2_Template_img_error_1_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.onImgError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 180);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 181);
    \u0275\u0275element(4, "path", 182);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const photo_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", photo_r16, \u0275\u0275sanitizeUrl);
  }
}
function LandingPageComponent_Conditional_209_For_51_Conditional_26_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 176);
    \u0275\u0275repeaterCreate(1, LandingPageComponent_Conditional_209_For_51_Conditional_26_Conditional_1_For_2_Template, 5, 1, "div", 177, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const proj_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(proj_r11.sitePhotos);
  }
}
function LandingPageComponent_Conditional_209_For_51_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 169);
    \u0275\u0275conditionalCreate(1, LandingPageComponent_Conditional_209_For_51_Conditional_26_Conditional_1_Template, 3, 0, "div", 176);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const proj_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(proj_r11.sitePhotos && proj_r11.sitePhotos.length > 0 ? 1 : -1);
  }
}
function LandingPageComponent_Conditional_209_For_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275declareLet(0);
    \u0275\u0275elementStart(1, "div", 152)(2, "div", 155);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_209_For_51_Template_div_click_2_listener($event) {
      const proj_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(proj_r11.sitePhotos && proj_r11.sitePhotos.length > 0 && ctx_r0.openLightbox(proj_r11.sitePhotos, 0, $event));
    });
    \u0275\u0275conditionalCreate(3, LandingPageComponent_Conditional_209_For_51_Conditional_3_Template, 4, 3)(4, LandingPageComponent_Conditional_209_For_51_Conditional_4_Template, 5, 0, "div", 156);
    \u0275\u0275elementStart(5, "div", 157)(6, "span", 158);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, LandingPageComponent_Conditional_209_For_51_Conditional_8_Template, 2, 1, "div", 159);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 160)(10, "div")(11, "h4", 161);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, LandingPageComponent_Conditional_209_For_51_Conditional_13_Template, 3, 2, "p", 162);
    \u0275\u0275elementStart(14, "p", 163);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 164)(18, "span", 165);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 166);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_209_For_51_Template_button_click_21_listener() {
      const proj_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleProjectDetailsExpand(proj_r11.id));
    });
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23, "\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0648\u0627\u0644\u0635\u0648\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(24, "svg", 167);
    \u0275\u0275element(25, "path", 168);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(26, LandingPageComponent_Conditional_209_For_51_Conditional_26_Template, 2, 1, "div", 169);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const proj_r11 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    const meta_r17 = \u0275\u0275storeLet(ctx_r0.parseProjectDetails(proj_r11.description));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("cursor-pointer", proj_r11.sitePhotos && proj_r11.sitePhotos.length > 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(proj_r11.sitePhotos && proj_r11.sitePhotos.length > 0 ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", meta_r17.category || "\u0639\u0627\u0645", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(proj_r11.sitePhotos && proj_r11.sitePhotos.length > 0 ? 8 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(proj_r11.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(meta_r17.governorate ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", meta_r17.cleanDescription || \u0275\u0275pipeBind1(16, 13, "PROJECTS.NO_DESCRIPTION"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(20, 15, proj_r11.startDate, "dd/MM/yyyy"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275classProp("rotate-180", ctx_r0.expandedProjectId() === proj_r11.id);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.expandedProjectId() === proj_r11.id ? 26 : -1);
  }
}
function LandingPageComponent_Conditional_209_ForEmpty_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 153);
    \u0275\u0275text(1, " \u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0634\u0627\u0631\u064A\u0639 \u0639\u0644\u0646\u064A\u0629 \u0645\u0636\u0627\u0641\u0629 \u0641\u064A \u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0639\u0627\u0645 \u0644\u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0643\u0629 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646. ");
    \u0275\u0275elementEnd();
  }
}
function LandingPageComponent_Conditional_209_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 84)(1, "div", 120);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_209_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 121)(3, "div", 122)(4, "div", 123);
    \u0275\u0275conditionalCreate(5, LandingPageComponent_Conditional_209_Conditional_5_Template, 1, 1, "img", 124);
    \u0275\u0275element(6, "div", 125);
    \u0275\u0275elementStart(7, "button", 126);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_209_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 127);
    \u0275\u0275element(9, "path", 128);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "div", 129)(11, "div", 130)(12, "div", 131);
    \u0275\u0275conditionalCreate(13, LandingPageComponent_Conditional_209_Conditional_13_Template, 2, 1, "div", 132)(14, LandingPageComponent_Conditional_209_Conditional_14_Template, 2, 1, "div", 133);
    \u0275\u0275elementStart(15, "div")(16, "h2", 134);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 135)(19, "span", 136);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "span", 137);
    \u0275\u0275elementStart(22, "button", 138);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_209_Template_button_click_22_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openReviewsModal($event, ctx_r0.selectedCompany().id, ctx_r0.selectedCompany().name));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(23, "svg", 139);
    \u0275\u0275element(24, "path", 112);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 140);
    \u0275\u0275text(29, "(\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0639\u0645\u0644\u0627\u0621)");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(30, "div", 141)(31, "span", 142);
    \u0275\u0275text(32, "\u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u0648\u062B\u0642\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 143);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(35, "div", 144)(36, "div")(37, "h3", 145);
    \u0275\u0275element(38, "span", 146);
    \u0275\u0275text(39, " \u0639\u0646 \u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u0627\u0644\u0646\u0634\u0627\u0637 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "p", 147);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div")(43, "h3", 148)(44, "span", 2);
    \u0275\u0275element(45, "span", 149);
    \u0275\u0275text(46, " \u0645\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u0646\u0641\u0630\u0629 \u0648\u0627\u0644\u0639\u0644\u0646\u064A\u0629 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "span", 150);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 151);
    \u0275\u0275repeaterCreate(50, LandingPageComponent_Conditional_209_For_51_Template, 27, 18, "div", 152, _forTrack0, false, LandingPageComponent_Conditional_209_ForEmpty_52_Template, 2, 0, "div", 153);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.selectedCompany().bannerUrl ? 5 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r0.selectedCompany().logoUrl ? 13 : 14);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.selectedCompany().name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u{1F4CD} ", ctx_r0.selectedCompany().region || "\u0645\u0635\u0631", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(27, 9, ctx_r0.selectedCompany().rating, "1.1-1"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.selectedCompany().projects.length);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.selectedCompany().companyDescription || "\u0644\u0627 \u064A\u062A\u0648\u0641\u0631 \u0648\u0635\u0641 \u0645\u0646\u0641\u0635\u0644 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u062A\u0639\u0631\u064A\u0641\u064A \u0644\u0644\u0634\u0631\u0643\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.", " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("(", ctx_r0.selectedCompany().projects.length, " \u0645\u0634\u0631\u0648\u0639)");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.selectedCompany().projects);
  }
}
function LandingPageComponent_Conditional_210_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 189);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_210_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.prevLightboxPhoto());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 190);
    \u0275\u0275element(2, "path", 191);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "button", 192);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_210_Conditional_12_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.nextLightboxPhoto());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 190);
    \u0275\u0275element(5, "path", 193);
    \u0275\u0275elementEnd()();
  }
}
function LandingPageComponent_Conditional_210_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85)(1, "div", 183);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_210_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeLightbox());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 184);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_210_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeLightbox());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 185);
    \u0275\u0275element(4, "path", 128);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 186)(6, "span");
    \u0275\u0275text(7, "\u{1F4F7}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 187)(11, "img", 188);
    \u0275\u0275listener("error", function LandingPageComponent_Conditional_210_Template_img_error_11_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onImgError($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, LandingPageComponent_Conditional_210_Conditional_12_Template, 6, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate2("", ctx_r0.activeLightboxIndex() + 1, " / ", ctx_r0.lightboxPhotos().length);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r0.lightboxPhotos()[ctx_r0.activeLightboxIndex()], \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.lightboxPhotos().length > 1 ? 12 : -1);
  }
}
function LandingPageComponent_Conditional_211_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 201);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 98);
    \u0275\u0275element(2, "circle", 99)(3, "path", 100);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 203);
    \u0275\u0275text(5, "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A...");
    \u0275\u0275elementEnd()();
  }
}
function LandingPageComponent_Conditional_211_Conditional_13_For_2_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 214);
    \u0275\u0275text(1, "\u2605");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const star_r21 = ctx.$implicit;
    const rev_r22 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("text-amber-400", star_r21 <= rev_r22.ratingScore)("text-slate-800", star_r21 > rev_r22.ratingScore);
  }
}
function LandingPageComponent_Conditional_211_Conditional_13_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 212);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rev_r22 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", rev_r22.comment, " ");
  }
}
function LandingPageComponent_Conditional_211_Conditional_13_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 213);
    \u0275\u0275text(1, "\u0644\u0645 \u064A\u062A\u0631\u0643 \u0627\u0644\u0639\u0645\u064A\u0644 \u062A\u0639\u0644\u064A\u0642\u0627\u064B \u0646\u0635\u064A\u0627\u064B.");
    \u0275\u0275elementEnd();
  }
}
function LandingPageComponent_Conditional_211_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 204)(1, "div", 206)(2, "div")(3, "h4", 207);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 208);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 209);
    \u0275\u0275repeaterCreate(8, LandingPageComponent_Conditional_211_Conditional_13_For_2_For_9_Template, 2, 4, "span", 210, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(10, "span", 211);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(13, LandingPageComponent_Conditional_211_Conditional_13_For_2_Conditional_13_Template, 2, 1, "div", 212)(14, LandingPageComponent_Conditional_211_Conditional_13_For_2_Conditional_14_Template, 2, 0, "p", 213);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rev_r22 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(rev_r22.clientName || "\u0627\u0644\u0639\u0645\u064A\u0644 \u0627\u0644\u0643\u0631\u064A\u0645");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0645\u0634\u0631\u0648\u0639: ", rev_r22.projectName);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(7, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("(", \u0275\u0275pipeBind2(12, 4, rev_r22.reviewDate, "dd/MM/yyyy"), ")");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(rev_r22.comment ? 13 : 14);
  }
}
function LandingPageComponent_Conditional_211_Conditional_13_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 205);
    \u0275\u0275text(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u0643\u062A\u0648\u0628\u0629 \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F.");
    \u0275\u0275elementEnd();
  }
}
function LandingPageComponent_Conditional_211_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 202);
    \u0275\u0275repeaterCreate(1, LandingPageComponent_Conditional_211_Conditional_13_For_2_Template, 15, 8, "div", 204, _forTrack1, false, LandingPageComponent_Conditional_211_Conditional_13_ForEmpty_3_Template, 2, 0, "div", 205);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.reviewsList());
  }
}
function LandingPageComponent_Conditional_211_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 86)(1, "div", 194);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_211_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeReviewsModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 195)(3, "div", 196)(4, "div")(5, "span", 197);
    \u0275\u0275text(6, "\u0633\u062C\u0644 \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0639\u0645\u0644\u0627\u0621 / Client Reviews Ledger");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h3", 198);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 199);
    \u0275\u0275listener("click", function LandingPageComponent_Conditional_211_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeReviewsModal());
    });
    \u0275\u0275text(10, " \u0625\u063A\u0644\u0627\u0642 / Close ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 200);
    \u0275\u0275conditionalCreate(12, LandingPageComponent_Conditional_211_Conditional_12_Template, 6, 0, "div", 201)(13, LandingPageComponent_Conditional_211_Conditional_13_Template, 4, 1, "div", 202);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0634\u0631\u0643\u0629: ", ctx_r0.reviewsModalTenantName());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.isLoadingReviews() ? 12 : 13);
  }
}
var LandingPageComponent = class _LandingPageComponent {
  router = inject(Router);
  langService = inject(LanguageService);
  authService = inject(AuthService);
  directoryService = inject(PublicDirectoryService);
  whatsappLink = inject(WhatsAppLinkService);
  renderer = inject(Renderer2);
  document = inject(DOCUMENT);
  companies = signal(
    [],
    ...ngDevMode ? [{ debugName: "companies" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedCompany = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedCompany" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isModalOpen" }] : (
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
  expandedProjectId = signal(
    null,
    ...ngDevMode ? [{ debugName: "expandedProjectId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Lightbox Viewer State
  lightboxPhotos = signal(
    [],
    ...ngDevMode ? [{ debugName: "lightboxPhotos" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeLightboxIndex = signal(
    0,
    ...ngDevMode ? [{ debugName: "activeLightboxIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLightboxOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLightboxOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  openLightbox(photos, startIndex = 0, event) {
    if (event) {
      event.stopPropagation();
    }
    if (!photos || photos.length === 0)
      return;
    this.lightboxPhotos.set(photos);
    this.activeLightboxIndex.set(startIndex);
    this.isLightboxOpen.set(true);
  }
  closeLightbox() {
    this.isLightboxOpen.set(false);
    this.lightboxPhotos.set([]);
    this.activeLightboxIndex.set(0);
  }
  nextLightboxPhoto() {
    const photos = this.lightboxPhotos();
    if (photos.length === 0)
      return;
    this.activeLightboxIndex.set((this.activeLightboxIndex() + 1) % photos.length);
  }
  prevLightboxPhoto() {
    const photos = this.lightboxPhotos();
    if (photos.length === 0)
      return;
    this.activeLightboxIndex.set((this.activeLightboxIndex() - 1 + photos.length) % photos.length);
  }
  handleKeyboardEvent(event) {
    if (this.isLightboxOpen()) {
      if (event.key === "Escape") {
        this.closeLightbox();
      } else if (event.key === "ArrowRight") {
        this.nextLightboxPhoto();
      } else if (event.key === "ArrowLeft") {
        this.prevLightboxPhoto();
      }
    } else if (this.isModalOpen() && event.key === "Escape") {
      this.closeModal();
    } else if (this.isReviewsModalOpen() && event.key === "Escape") {
      this.closeReviewsModal();
    }
  }
  // Reviews states
  isReviewsModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isReviewsModalOpen" }] : (
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
  openReviewsModal(event, tenantId, tenantName) {
    event.stopPropagation();
    this.reviewsModalTenantName.set(tenantName);
    this.isReviewsModalOpen.set(true);
    this.isLoadingReviews.set(true);
    this.reviewsList.set([]);
    this.directoryService.getTenantReviews(tenantId).subscribe({
      next: (res) => {
        this.isLoadingReviews.set(false);
        if (res.success && res.data) {
          this.reviewsList.set(res.data);
        }
      },
      error: () => {
        this.isLoadingReviews.set(false);
      }
    });
  }
  closeReviewsModal() {
    this.isReviewsModalOpen.set(false);
    this.reviewsModalTenantName.set("");
    this.reviewsList.set([]);
  }
  // Pricing state
  sliderVal = signal(
    1,
    ...ngDevMode ? [{ debugName: "sliderVal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pricingInfo = computed(
    () => {
      const val = this.sliderVal();
      const isAr = this.langService.currentLang() === "ar";
      if (val <= 2) {
        return {
          planNameAr: "\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629",
          planNameEn: "Free Plan",
          price: "0 EGP",
          periodAr: "\u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A \u0644\u0645\u062F\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 (\u0645\u062C\u0627\u0646\u064A \u0644\u0644\u0623\u0628\u062F)",
          periodEn: "Lifetime instant activation (Free forever)",
          isCustom: false,
          noteAr: "\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u2014 \u062A\u062A\u0636\u0645\u0646 \u0645\u0634\u0631\u0648\u0639\u064A\u0646 (2) \u0646\u0634\u0637\u064A\u0646 \u0645\u062C\u0627\u0646\u0627\u064B \u0645\u062F\u0649 \u0627\u0644\u062D\u064A\u0627\u0629.",
          noteEn: "Basic Free Plan \u2014 includes 2 active projects free for lifetime."
        };
      }
      if (val >= 7) {
        return {
          planNameAr: "\u0628\u0627\u0642\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 (+2 \u0645\u062C\u0627\u0646\u0627\u064B)",
          planNameEn: "5-Project Pack (+2 Free)",
          price: "950 EGP",
          periodAr: "\u062F\u0641\u0639 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u2014 \u062A\u0648\u0641\u064A\u0631 \u0625\u0636\u0627\u0641\u064A (\u0623\u0643\u062B\u0631 \u0645\u0646 7\u061F \u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627)",
          periodEn: "One-time payment \u2014 Save 300 EGP (7+ contact support)",
          isCustom: false,
          noteAr: "\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629 (2 \u0645\u0634\u0627\u0631\u064A\u0639) + \u0628\u0627\u0642\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 (\u062A\u0648\u0641\u064A\u0631 300 \u062C\u0646\u064A\u0647).",
          noteEn: "Free Plan (2 Projects) + 5-Project Pack (Save 300 EGP)."
        };
      }
      const map = {
        3: {
          planNameAr: "+1 \u0645\u0634\u0631\u0648\u0639 \u0625\u0636\u0627\u0641\u064A",
          planNameEn: "+1 Extra Project",
          price: "250 EGP",
          periodAr: "\u062F\u0641\u0639 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u2014 \u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A",
          periodEn: "One-time payment \u2014 Instant activation",
          isCustom: false,
          noteAr: "\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629 (2 \u0645\u0634\u0627\u0631\u064A\u0639) + \u0645\u0634\u0631\u0648\u0639 \u0625\u0636\u0627\u0641\u064A \u0648\u0627\u062D\u062F \u0628\u062A\u0643\u0644\u0641\u0629 250 \u062C.\u0645.",
          noteEn: "Free Plan (2 Projects) + 1 Extra Project (250 EGP)."
        },
        4: {
          planNameAr: "+2 \u0645\u0634\u0631\u0648\u0639 \u0625\u0636\u0627\u0641\u064A",
          planNameEn: "+2 Extra Projects",
          price: "500 EGP",
          periodAr: "\u062F\u0641\u0639 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u2014 \u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A",
          periodEn: "One-time payment \u2014 Instant activation",
          isCustom: false,
          noteAr: "\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629 (2 \u0645\u0634\u0627\u0631\u064A\u0639) + 2 \u0645\u0634\u0631\u0648\u0639 \u0625\u0636\u0627\u0641\u064A \u0628\u062A\u0643\u0644\u0641\u0629 500 \u062C.\u0645.",
          noteEn: "Free Plan (2 Projects) + 2 Extra Projects (500 EGP)."
        },
        5: {
          planNameAr: "+3 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629",
          planNameEn: "+3 Extra Projects",
          price: "750 EGP",
          periodAr: "\u062F\u0641\u0639 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u2014 \u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A",
          periodEn: "One-time payment \u2014 Instant activation",
          isCustom: false,
          noteAr: "\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629 (2 \u0645\u0634\u0627\u0631\u064A\u0639) + 3 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 \u0628\u062A\u0643\u0644\u0641\u0629 750 \u062C.\u0645.",
          noteEn: "Free Plan (2 Projects) + 3 Extra Projects (750 EGP)."
        },
        6: {
          planNameAr: "\u0628\u0627\u0642\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 (+5)",
          planNameEn: "5-Project Pack (+5)",
          price: "950 EGP",
          periodAr: "\u062F\u0641\u0639 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u2014 \u062A\u0648\u0641\u064A\u0631 \u0625\u0636\u0627\u0641\u064A (\u0648\u0641\u0631 300 \u062C.\u0645)",
          periodEn: "One-time payment \u2014 Save 300 EGP",
          isCustom: false,
          noteAr: "\u062A\u0648\u0641\u064A\u0631 \u0645\u062A\u0645\u064A\u0632: \u0628\u0627\u0642\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 \u062A\u0645\u0646\u062D\u0643 7 \u0645\u0634\u0627\u0631\u064A\u0639 \u0643\u0644\u064A\u0627\u064B \u0628\u0640 950 \u062C.\u0645 \u0641\u0642\u0637 (\u0623\u0648\u0641\u0631 \u0645\u0646 \u0634\u0631\u0627\u0621 4 \u0645\u0634\u0627\u0631\u064A\u0639 \u0641\u0631\u062F\u064A\u0629).",
          noteEn: "Best Value: 5-Project Pack gives 7 total projects for 950 EGP (cheaper than 4 single projects)."
        }
      };
      return {
        planNameAr: map[val]?.planNameAr || "\u0645\u062E\u0635\u0635",
        planNameEn: map[val]?.planNameEn || "Custom",
        price: map[val]?.price || "Custom",
        periodAr: map[val]?.periodAr || "",
        periodEn: map[val]?.periodEn || "",
        isCustom: map[val]?.isCustom || false,
        noteAr: map[val]?.noteAr || "",
        noteEn: map[val]?.noteEn || ""
      };
    },
    ...ngDevMode ? [{ debugName: "pricingInfo" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Filters
  regionFilter = "";
  categoryFilter = "";
  ratingFilter = void 0;
  ngOnInit() {
    this.fetchCompanies();
  }
  onSliderInput(event) {
    const target = event.target;
    this.sliderVal.set(parseInt(target.value, 10));
  }
  onPricingAction() {
    if (this.pricingInfo().isCustom) {
      const msg = `\u0645\u0631\u062D\u0628\u0627\u064B\u060C \u0623\u0648\u062F \u062A\u0631\u0642\u064A\u0629 \u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0644\u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0644\u0639\u062F\u062F 10+ \u0645\u0634\u0627\u0631\u064A\u0639.`;
      this.whatsappLink.openChat("201004500766", msg);
    } else {
      this.router.navigate(["/login"]);
    }
  }
  onSelectPricingPlan(extraProjectsCount = 0) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/dashboard/projects"]);
    } else {
      if (extraProjectsCount === 0) {
        this.router.navigate(["/register"]);
      } else {
        this.router.navigate(["/register"], { queryParams: { plan: extraProjectsCount } });
      }
    }
  }
  fetchCompanies() {
    this.isLoading.set(true);
    this.directoryService.getTenants({
      region: this.regionFilter || void 0,
      category: this.categoryFilter || void 0,
      minRating: this.ratingFilter
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          this.companies.set(res.data);
        }
      },
      error: () => this.isLoading.set(false)
    });
  }
  onFilterChange() {
    this.fetchCompanies();
  }
  openPortfolioModal(id) {
    this.directoryService.getTenantPortfolio(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.selectedCompany.set(res.data);
          this.isModalOpen.set(true);
          this.renderer.addClass(this.document.body, "overflow-hidden");
        }
      }
    });
  }
  closeModal() {
    this.isModalOpen.set(false);
    this.selectedCompany.set(null);
    this.expandedProjectId.set(null);
    this.renderer.removeClass(this.document.body, "overflow-hidden");
  }
  toggleProjectDetailsExpand(id) {
    if (this.expandedProjectId() === id) {
      this.expandedProjectId.set(null);
    } else {
      this.expandedProjectId.set(id);
    }
  }
  parseProjectDetails(rawDescription) {
    if (!rawDescription) {
      return { cleanDescription: "", category: "", governorate: "", cityOrZone: "", client: "" };
    }
    if (rawDescription.startsWith("{")) {
      try {
        const parsed = JSON.parse(rawDescription);
        return {
          cleanDescription: parsed.description || "",
          category: parsed.category || "",
          governorate: parsed.governorate || "",
          cityOrZone: parsed.cityOrZone || "",
          client: parsed.client || ""
        };
      } catch (e) {
      }
    }
    return { cleanDescription: rawDescription, category: "", governorate: "", cityOrZone: "", client: "" };
  }
  getCategoryTranslation(cat) {
    if (!cat)
      return "PROJECTS.CATEGORIES.Other";
    const trimmed = cat.trim();
    const normalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    const known = ["Residential", "Commercial", "Industrial", "Other"];
    if (known.includes(normalized)) {
      return `PROJECTS.CATEGORIES.${normalized}`;
    }
    return "PROJECTS.CATEGORIES.Other";
  }
  onImgError(event) {
    const img = event.target;
    if (img) {
      img.style.display = "none";
      const fallback = img.nextElementSibling;
      if (fallback) {
        fallback.classList.remove("hidden");
        fallback.classList.add("flex");
      }
    }
  }
  onLogoError(event) {
    const img = event.target;
    if (img) {
      img.style.display = "none";
      const fallback = img.nextElementSibling;
      if (fallback) {
        fallback.classList.remove("hidden");
        fallback.classList.add("flex");
      }
    }
  }
  navigateToLogin() {
    this.router.navigate(["/login"]);
  }
  static \u0275fac = function LandingPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LandingPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LandingPageComponent, selectors: [["app-landing-page"]], hostBindings: function LandingPageComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown", function LandingPageComponent_keydown_HostBindingHandler($event) {
        return ctx.handleKeyboardEvent($event);
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 216, vars: 62, consts: [[1, "min-h-screen", "bg-slate-950", "text-slate-100", "font-sans", "selection:bg-indigo-500", "selection:text-white", "overflow-x-hidden"], [1, "fixed", "top-0", "left-0", "w-full", "z-50", "bg-slate-950/80", "backdrop-blur-md", "border-b", "border-slate-900", "px-4", "py-3", "md:px-6", "md:py-4", "flex", "justify-between", "items-center"], [1, "flex", "items-center", "gap-2"], [1, "h-8", "w-8", "bg-gradient-to-tr", "from-indigo-500", "via-purple-500", "to-pink-500", "rounded-lg", "flex", "items-center", "justify-center", "shadow-lg", "shadow-indigo-500/20", "shrink-0"], [1, "text-white", "font-extrabold", "text-sm"], [1, "text-base", "md:text-lg", "font-bold", "tracking-tight", "bg-gradient-to-r", "from-white", "to-slate-400", "bg-clip-text", "text-transparent", "font-cairo"], [1, "flex", "items-center", "gap-2", "md:gap-4"], ["href", "#marketplace", 1, "hidden", "sm:inline-block", "text-xs", "md:text-sm", "font-semibold", "text-slate-400", "hover:text-white", "transition-colors", "duration-200", "font-cairo"], [1, "text-[10px]", "md:text-xs", "font-semibold", "text-indigo-400", "hover:text-indigo-300", "transition-all", "duration-200", "cursor-pointer", "px-2", "py-1", "md:px-2.5", "md:py-1.5", "rounded-lg", "border", "border-indigo-500/20", "bg-indigo-500/5", "hover:bg-indigo-500/10", "active:scale-95", 3, "click"], [1, "relative", "pt-32", "pb-16", "px-6", "max-w-7xl", "mx-auto", "flex", "flex-col", "items-center", "text-center"], [1, "absolute", "top-1/4", "left-1/2", "-translate-x-1/2", "-translate-y-1/2", "w-[500px]", "h-[500px]", "bg-indigo-500/10", "rounded-full", "blur-[120px]", "pointer-events-none"], [1, "absolute", "top-1/3", "left-1/3", "w-[300px]", "h-[300px]", "bg-purple-500/10", "rounded-full", "blur-[100px]", "pointer-events-none"], [1, "inline-flex", "items-center", "gap-2", "px-3", "py-1.5", "rounded-full", "border", "border-indigo-500/30", "bg-indigo-500/5", "text-indigo-400", "text-xs", "font-semibold", "uppercase", "tracking-wider", "mb-8", "animate-fade-in-down"], [1, "text-4xl", "md:text-6xl", "font-extrabold", "tracking-tight", "max-w-5xl", "leading-tight", "mb-8", "font-cairo"], [1, "text-lg", "md:text-xl", "text-slate-400", "max-w-2xl", "mb-10", "leading-relaxed", "font-cairo"], [1, "flex", "flex-col", "sm:flex-row", "gap-4", "mb-12"], ["routerLink", "/dashboard", 1, "px-8", "py-4", "rounded-xl", "bg-indigo-600", "text-white", "font-semibold", "shadow-xl", "shadow-indigo-600/30", "transition-all", "duration-300", "hover:scale-105", "active:scale-95", "group", "cursor-pointer", "font-cairo"], [1, "px-8", "py-4", "rounded-xl", "bg-indigo-600", "text-white", "font-semibold", "shadow-xl", "shadow-indigo-600/30", "transition-all", "duration-300", "hover:scale-105", "active:scale-95", "group", "cursor-pointer", "font-cairo"], ["href", "#marketplace", 1, "px-8", "py-4", "rounded-xl", "border", "border-slate-800", "bg-slate-900/50", "hover:bg-slate-900", "font-semibold", "text-slate-300", "hover:text-white", "transition-all", "duration-300", "font-cairo"], ["href", "#marketplace", 1, "group", "flex", "flex-col", "items-center", "gap-2", "cursor-pointer", "transition-all", "duration-300", "hover:opacity-100", "opacity-80", "mt-2"], [1, "text-xs", "font-semibold", "text-slate-400", "group-hover:text-indigo-400", "font-cairo", "transition-colors", "duration-200"], [1, "w-9", "h-9", "rounded-full", "border", "border-indigo-500/30", "bg-indigo-500/10", "flex", "items-center", "justify-center", "text-indigo-400", "shadow-lg", "shadow-indigo-500/20", "group-hover:bg-indigo-600", "group-hover:text-white", "group-hover:border-indigo-500", "animate-bounce", "transition-all", "duration-300"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M19 14l-7 7m0 0l-7-7m7 7V3"], ["id", "pricing", 1, "py-20", "px-6", "max-w-6xl", "mx-auto", "border-t", "border-slate-900"], [1, "text-center", "mb-14", "max-w-3xl", "mx-auto"], [1, "text-3xl", "sm:text-4xl", "font-extrabold", "tracking-tight", "mb-3", "font-cairo", "text-white"], [1, "text-slate-400", "font-cairo", "text-sm", "sm:text-base", "leading-relaxed"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-6", "max-w-6xl", "mx-auto", "items-stretch"], [1, "bg-slate-900/50", "border", "border-slate-800", "rounded-3xl", "p-6", "sm:p-8", "flex", "flex-col", "justify-between", "hover:border-slate-700", "transition-all", "duration-300", "shadow-xl", "relative", "group"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "px-3", "py-1", "rounded-full", "text-xs", "font-bold", "bg-emerald-500/10", "text-emerald-400", "border", "border-emerald-500/20", "font-cairo"], [1, "text-xs", "font-mono", "text-slate-500", "font-bold"], [1, "text-xl", "font-bold", "text-white", "font-cairo", "mb-2"], [1, "my-4"], [1, "text-3xl", "font-extrabold", "text-emerald-400", "font-mono"], [1, "text-xs", "text-slate-400", "font-cairo", "block", "mt-1"], [1, "space-y-3", "my-6", "text-xs", "text-slate-300", "font-cairo"], [1, "text-emerald-400", "font-bold"], [1, "w-full", "py-3", "px-4", "bg-slate-800", "hover:bg-slate-700", "border", "border-slate-700", "text-white", "font-bold", "text-xs", "rounded-xl", "font-cairo", "transition-all", "duration-200", "text-center", "shadow-md", "cursor-pointer", "block", 3, "click"], [1, "bg-slate-900/60", "border", "border-slate-800", "rounded-3xl", "p-6", "sm:p-8", "flex", "flex-col", "justify-between", "hover:border-indigo-500/50", "transition-all", "duration-300", "shadow-xl", "relative", "group"], [1, "px-3", "py-1", "rounded-full", "text-xs", "font-bold", "bg-indigo-500/10", "text-indigo-400", "border", "border-indigo-500/20", "font-cairo"], [1, "text-xs", "font-mono", "text-slate-400", "font-bold"], [1, "text-3xl", "font-extrabold", "text-white", "font-mono"], [1, "text-indigo-400", "font-bold"], [1, "w-full", "py-3", "px-4", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "font-bold", "text-xs", "rounded-xl", "font-cairo", "transition-all", "duration-200", "text-center", "shadow-lg", "shadow-indigo-600/30", "cursor-pointer", "block", 3, "click"], [1, "bg-gradient-to-br", "from-indigo-950/60", "via-slate-900", "to-amber-950/30", "border-2", "border-indigo-500", "shadow-xl", "shadow-indigo-500/20", "rounded-3xl", "p-6", "sm:p-8", "flex", "flex-col", "justify-between", "hover:border-indigo-400", "transition-all", "duration-300", "relative", "overflow-hidden"], [1, "absolute", "top-0", "right-0", "bg-gradient-to-r", "from-amber-500", "to-indigo-600", "text-white", "text-[10px]", "font-black", "uppercase", "px-3.5", "py-1", "rounded-bl-2xl", "font-cairo", "shadow-md"], [1, "pt-2"], [1, "px-3", "py-1", "rounded-full", "text-xs", "font-bold", "bg-amber-500/10", "text-amber-300", "border", "border-amber-500/30", "font-cairo"], [1, "text-xs", "font-mono", "text-amber-400", "font-bold"], [1, "text-xl", "font-extrabold", "text-white", "font-cairo", "mb-2"], [1, "flex", "items-baseline", "gap-2"], [1, "text-3xl", "font-extrabold", "text-amber-400", "font-mono"], [1, "text-sm", "text-slate-500", "line-through", "font-mono"], [1, "text-xs", "text-amber-300/90", "font-cairo", "block", "mt-1"], [1, "space-y-3", "my-6", "text-xs", "text-slate-200", "font-cairo"], [1, "text-amber-400", "font-bold"], [1, "w-full", "py-3", "px-4", "bg-gradient-to-r", "from-amber-500", "via-indigo-600", "to-purple-600", "hover:from-amber-400", "hover:to-indigo-500", "text-white", "font-black", "text-xs", "rounded-xl", "font-cairo", "transition-all", "duration-200", "text-center", "shadow-xl", "shadow-indigo-600/30", "active:scale-[0.98]", "ring-2", "ring-amber-500/30", "cursor-pointer", "block", 3, "click"], [1, "mt-12", "text-center", "flex", "flex-col", "items-center"], ["href", "#marketplace", 1, "inline-flex", "items-center", "gap-2.5", "px-5", "py-2.5", "rounded-full", "border", "border-slate-800", "hover:border-indigo-500/40", "bg-slate-900/60", "hover:bg-indigo-950/30", "text-xs", "font-bold", "text-slate-300", "hover:text-indigo-300", "transition-all", "duration-300", "shadow-lg", "group", "cursor-pointer", "font-cairo"], [1, "w-5", "h-5", "rounded-full", "bg-indigo-500/20", "flex", "items-center", "justify-center", "text-indigo-400", "group-hover:bg-indigo-500", "group-hover:text-white", "transition-all", "duration-300", "animate-bounce"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3", "h-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M19 9l-7 7-7-7"], ["id", "marketplace", 1, "py-20", "px-6", "border-t", "border-slate-900", "bg-slate-900/10", "relative"], [1, "max-w-7xl", "mx-auto"], [1, "text-center", "max-w-3xl", "mx-auto", "mb-12"], [1, "text-3xl", "md:text-5xl", "font-extrabold", "tracking-tight", "mb-4", "font-cairo"], [1, "text-slate-400", "font-cairo", "text-sm"], [1, "bg-slate-900/40", "border", "border-slate-800/80", "rounded-2xl", "p-6", "mb-10", "grid", "grid-cols-1", "sm:grid-cols-3", "gap-5", "font-sans"], [1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500", "mb-1.5", "font-cairo"], ["type", "text", 1, "w-full", "px-3", "py-2", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", 3, "ngModelChange", "ngModel", "placeholder"], [1, "w-full", "px-3", "py-2", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "Residential"], ["value", "Commercial"], ["value", "Industrial"], ["value", "Other"], [3, "value"], ["value", "3"], ["value", "4"], ["value", "4.5"], [1, "flex", "justify-center", "py-16"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-8"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-2", "sm:p-4", "animate-fade-in"], [1, "fixed", "inset-0", "z-[200]", "flex", "items-center", "justify-center", "p-4", "bg-black/92", "backdrop-blur-md", "animate-fade-in"], [1, "fixed", "inset-0", "z-[100]", "flex", "items-center", "justify-center", "p-3", "sm:p-4"], [1, "py-12", "border-t", "border-slate-900", "text-center", "text-slate-600", "text-sm"], [1, "hidden", "lg:inline-block", "text-xs", "md:text-sm", "text-slate-400", "font-medium", "font-cairo"], [1, "text-white", "font-semibold"], ["routerLink", "/dashboard", 1, "relative", "group", "overflow-hidden", "px-3", "py-1.5", "md:px-4", "md:py-2", "rounded-lg", "bg-indigo-600", "text-xs", "md:text-sm", "font-semibold", "text-white", "shadow-lg", "shadow-indigo-600/30", "transition-all", "duration-300", "hover:scale-105", "active:scale-95", "cursor-pointer", "font-cairo"], [1, "relative", "z-10"], [1, "absolute", "inset-0", "bg-gradient-to-r", "from-indigo-500", "via-purple-600", "to-pink-500", "opacity-0", "group-hover:opacity-100", "transition-opacity", "duration-300"], ["routerLink", "/login", 1, "text-xs", "md:text-sm", "font-medium", "text-slate-400", "hover:text-white", "transition-colors", "duration-200", "font-cairo", "px-1"], [1, "relative", "group", "overflow-hidden", "px-3", "py-1.5", "md:px-4", "md:py-2", "rounded-lg", "bg-indigo-600", "text-xs", "md:text-sm", "font-semibold", "text-white", "shadow-lg", "shadow-indigo-600/30", "transition-all", "duration-300", "hover:scale-105", "active:scale-95", "cursor-pointer", "font-cairo", 3, "click"], [1, "bg-gradient-to-r", "from-indigo-400", "via-purple-400", "to-pink-400", "bg-clip-text", "text-transparent"], [1, "inline-block", "transform", "transition-transform", "group-hover:translate-x-1", "rtl:group-hover:-translate-x-1", "ml-1", "rtl:mr-1", "rtl:ml-0"], [1, "px-8", "py-4", "rounded-xl", "bg-indigo-600", "text-white", "font-semibold", "shadow-xl", "shadow-indigo-600/30", "transition-all", "duration-300", "hover:scale-105", "active:scale-95", "group", "cursor-pointer", "font-cairo", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-8", "w-8", "text-indigo-500"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"], [1, "group", "flex", "flex-col", "justify-between", "bg-slate-900/25", "border", "border-slate-800/80", "rounded-2xl", "p-6", "hover:border-indigo-500/40", "hover:bg-slate-900/40", "transition-all", "duration-300", "shadow-xl"], [1, "col-span-1", "md:col-span-2", "lg:col-span-3", "py-16", "text-center", "text-slate-500"], [1, "flex", "items-center", "gap-4", "mb-4"], [1, "relative", "h-12", "w-12", "rounded-xl", "border", "border-slate-700", "bg-slate-950", "overflow-hidden", "flex", "items-center", "justify-center", "shrink-0"], [1, "h-12", "w-12", "rounded-xl", "bg-gradient-to-tr", "from-indigo-500", "to-purple-600", "flex", "items-center", "justify-center", "font-bold", "text-white", "uppercase", "text-base", "shadow-md", "font-cairo", "shrink-0"], [1, "text-lg", "font-bold", "text-white", "group-hover:text-indigo-400", "transition-colors", "duration-200", "font-cairo"], [1, "text-xs", "text-slate-500", "font-mono"], [1, "text-slate-400", "text-sm", "leading-relaxed", "mb-6", "line-clamp-3"], [1, "flex", "items-center", "justify-between", "border-t", "border-slate-800/80", "pt-4", "mt-auto"], ["title", "View client reviews", 1, "flex", "items-center", "gap-1.5", "cursor-pointer", "hover:underline", "text-amber-400", "hover:text-amber-300", "font-bold", "focus:outline-none", "bg-transparent", "border-0", "p-0", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 20 20", "fill", "currentColor", 1, "h-4", "w-4", "text-amber-400", "fill-amber-400", "shrink-0"], ["d", "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"], [1, "text-sm", "font-bold"], [1, "px-4", "py-2", "bg-indigo-600", "hover:bg-indigo-700", "text-xs", "font-semibold", "rounded-lg", "text-white", "shadow-md", "shadow-indigo-600/10", "hover:scale-105", "active:scale-95", "transition-all", "duration-200", "cursor-pointer", "font-cairo", 3, "click"], ["alt", "", 1, "h-full", "w-full", "object-cover", 3, "error", "src"], [1, "hidden", "h-full", "w-full", "bg-gradient-to-tr", "from-indigo-500", "to-purple-600", "flex", "items-center", "justify-center", "font-bold", "text-white", "uppercase", "text-base", "shadow-md", "font-cairo"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-12", "w-12", "text-slate-800", "mx-auto", "mb-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.2", "d", "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"], [1, "font-bold", "font-cairo"], [1, "absolute", "inset-0", "bg-slate-950/85", "backdrop-blur-md", 3, "click"], [1, "relative", "bg-slate-900", "border", "border-slate-800", "rounded-2xl", "max-w-5xl", "w-11/12", "sm:w-full", "max-h-[92vh]", "flex", "flex-col", "p-0", "shadow-2xl", "z-10", "font-sans", "overflow-hidden"], [1, "shrink-0", "bg-slate-900", "border-b", "border-slate-800", "relative", "z-20", "shadow-md"], [1, "relative", "h-28", "sm:h-36", "w-full", "bg-gradient-to-r", "from-indigo-950", "via-slate-900", "to-purple-950", "border-b", "border-slate-800/80", "overflow-hidden"], ["alt", "", 1, "w-full", "h-full", "object-cover", 3, "src"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-slate-900", "via-slate-900/50", "to-transparent"], [1, "absolute", "top-3", "right-3", "p-2", "rounded-xl", "bg-slate-950/70", "border", "border-white/10", "text-slate-300", "hover:text-white", "hover:bg-slate-950", "transition-all", "duration-150", "cursor-pointer", "shadow-lg", "z-30", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "px-4", "sm:px-8", "pb-4", "pt-1", "font-cairo"], [1, "relative", "flex", "flex-col", "sm:flex-row", "justify-between", "items-start", "sm:items-end", "gap-3", "-mt-10", "sm:-mt-12", "z-10"], [1, "flex", "items-end", "gap-4"], [1, "h-20", "w-20", "sm:h-24", "sm:w-24", "rounded-2xl", "border-4", "border-slate-900", "bg-slate-950", "shadow-2xl", "overflow-hidden", "shrink-0", "flex", "items-center", "justify-center"], [1, "h-20", "w-20", "sm:h-24", "sm:w-24", "rounded-2xl", "bg-gradient-to-br", "from-indigo-600", "to-purple-600", "flex", "items-center", "justify-center", "font-black", "text-white", "text-2xl", "sm:text-3xl", "border-4", "border-slate-900", "shadow-2xl", "font-cairo", "shrink-0"], [1, "text-xl", "sm:text-2xl", "font-black", "text-white", "tracking-tight", "font-cairo"], [1, "flex", "items-center", "gap-3", "mt-1", "flex-wrap"], [1, "text-xs", "sm:text-sm", "text-indigo-400", "font-bold", "font-cairo", "flex", "items-center", "gap-1"], [1, "h-1.5", "w-1.5", "rounded-full", "bg-slate-700"], ["title", "View all client reviews", 1, "flex", "items-center", "gap-1.5", "text-xs", "font-bold", "text-amber-400", "hover:text-amber-300", "hover:underline", "cursor-pointer", "bg-slate-950/60", "px-2.5", "py-1", "rounded-lg", "border", "border-amber-500/20", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 20 20", "fill", "currentColor", 1, "h-3.5", "w-3.5", "text-amber-400", "fill-amber-400", "shrink-0"], [1, "text-[10px]", "text-amber-400/80", "font-normal"], [1, "px-3.5", "py-1.5", "bg-slate-950/80", "border", "border-slate-800", "rounded-xl", "flex", "items-center", "gap-2.5", "shadow-md", "shrink-0"], [1, "text-xs", "text-slate-400", "font-bold", "font-cairo"], [1, "text-base", "font-black", "text-indigo-400", "font-mono"], [1, "overflow-y-auto", "min-h-0", "w-full", "flex-1", "px-4", "sm:px-8", "py-6", "font-cairo", "scrollbar-none", "space-y-6"], [1, "text-xs", "font-bold", "text-slate-400", "uppercase", "tracking-wider", "font-cairo", "mb-2", "flex", "items-center", "gap-2"], [1, "w-2", "h-2", "rounded-full", "bg-indigo-500"], [1, "text-sm", "text-slate-300", "leading-relaxed", "whitespace-pre-line", "bg-slate-950/50", "border", "border-slate-800/60", "rounded-2xl", "p-4", "sm:p-5", "shadow-inner", "font-cairo"], [1, "text-base", "font-extrabold", "text-white", "font-cairo", "mb-4", "border-b", "border-slate-800", "pb-3", "flex", "items-center", "justify-between"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-emerald-500"], [1, "text-xs", "font-normal", "text-slate-400"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-5"], [1, "bg-slate-950/60", "border", "border-slate-800/80", "hover:border-indigo-500/40", "rounded-2xl", "overflow-hidden", "flex", "flex-col", "justify-between", "transition-all", "duration-200", "shadow-xl", "group"], [1, "col-span-2", "py-12", "text-center", "text-slate-500", "font-cairo", "text-sm", "bg-slate-950/40", "rounded-2xl", "border", "border-slate-800"], ["alt", "", 1, "w-full", "h-full", "object-cover", 3, "error", "src"], [1, "relative", "h-44", "w-full", "bg-slate-900", "overflow-hidden", 3, "click"], [1, "w-full", "h-full", "bg-gradient-to-br", "from-slate-900", "to-indigo-950/40", "flex", "flex-col", "items-center", "justify-center", "p-4", "text-slate-600"], [1, "absolute", "top-3", "right-3", "flex", "items-center", "gap-2"], [1, "px-3", "py-1", "rounded-xl", "text-xs", "font-bold", "bg-slate-950/80", "backdrop-blur-md", "text-indigo-300", "border", "border-indigo-500/30", "font-cairo", "shadow-lg"], [1, "absolute", "bottom-3", "left-3", "bg-slate-950/80", "backdrop-blur-md", "px-2.5", "py-1", "rounded-lg", "border", "border-white/10", "text-[11px]", "font-bold", "text-slate-200", "flex", "items-center", "gap-1", "font-mono"], [1, "p-5", "flex-1", "flex", "flex-col", "justify-between", "space-y-3"], [1, "text-lg", "font-bold", "text-white", "font-cairo", "group-hover:text-indigo-400", "transition-colors", "line-clamp-1"], [1, "text-xs", "text-indigo-400", "font-cairo", "font-medium", "mt-1"], [1, "text-xs", "text-slate-400", "leading-relaxed", "font-cairo", "mt-2", "line-clamp-2"], [1, "pt-3", "border-t", "border-slate-800/80", "flex", "items-center", "justify-between"], [1, "text-[11px]", "text-slate-500", "font-mono"], [1, "px-3.5", "py-1.5", "rounded-xl", "text-xs", "font-bold", "bg-indigo-600/10", "hover:bg-indigo-600", "text-indigo-400", "hover:text-white", "border", "border-indigo-500/30", "transition-all", "cursor-pointer", "font-cairo", "flex", "items-center", "gap-1.5", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5", "transition-transform"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 9l-7 7-7-7"], [1, "pt-3", "border-t", "border-slate-800/80", "space-y-3", "animate-fade-in"], [1, "w-full", "h-full", "object-cover", "group-hover:scale-105", "transition-transform", "duration-300", 3, "error", "src", "alt"], [1, "absolute", "inset-0", "bg-black/30", "opacity-0", "group-hover:opacity-100", "transition-opacity", "flex", "items-center", "justify-center"], [1, "px-3", "py-1.5", "rounded-xl", "bg-slate-950/80", "backdrop-blur-md", "text-white", "text-xs", "font-bold", "font-cairo", "flex", "items-center", "gap-1.5", "shadow-xl", "border", "border-white/20"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-10", "h-10", "mb-2", "opacity-40", "text-indigo-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-8l-2-2m0 0l-2 2m2-2v6"], [1, "text-xs", "text-slate-500", "font-cairo"], [1, "grid", "grid-cols-3", "gap-2"], [1, "relative", "aspect-video", "rounded-xl", "overflow-hidden", "border", "border-slate-800", "bg-slate-900", "cursor-pointer", "group/photo"], [1, "relative", "aspect-video", "rounded-xl", "overflow-hidden", "border", "border-slate-800", "bg-slate-900", "cursor-pointer", "group/photo", 3, "click"], ["alt", "", 1, "w-full", "h-full", "object-cover", "group-hover/photo:scale-110", "transition-transform", 3, "error", "src"], [1, "absolute", "inset-0", "bg-black/40", "opacity-0", "group-hover/photo:opacity-100", "transition-opacity", "flex", "items-center", "justify-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"], [1, "absolute", "inset-0", "z-0", 3, "click"], [1, "absolute", "top-4", "right-4", "z-20", "p-2.5", "rounded-full", "bg-slate-900/80", "border", "border-white/20", "text-white", "hover:bg-slate-800", "transition-all", "cursor-pointer", "shadow-2xl", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-6", "h-6"], [1, "absolute", "top-4", "left-4", "z-20", "px-3.5", "py-1.5", "rounded-xl", "bg-slate-900/80", "border", "border-white/20", "text-white", "text-xs", "font-mono", "font-bold", "shadow-xl", "flex", "items-center", "gap-2", "font-cairo"], [1, "relative", "z-10", "max-w-5xl", "max-h-[85vh]", "flex", "items-center", "justify-center", "p-2"], ["alt", "Public Portfolio Photo", 1, "max-w-full", "max-h-[85vh]", "object-contain", "rounded-2xl", "shadow-2xl", "border", "border-slate-800", "transition-all", "duration-200", 3, "error", "src"], [1, "absolute", "left-4", "sm:left-8", "z-20", "p-3", "rounded-full", "bg-slate-900/80", "border", "border-white/20", "text-white", "hover:bg-indigo-600", "transition-all", "cursor-pointer", "shadow-2xl", "hover:scale-110", "active:scale-95", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-6", "h-6", "rtl:rotate-180"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M15 19l-7-7 7-7"], [1, "absolute", "right-4", "sm:right-8", "z-20", "p-3", "rounded-full", "bg-slate-900/80", "border", "border-white/20", "text-white", "hover:bg-indigo-600", "transition-all", "cursor-pointer", "shadow-2xl", "hover:scale-110", "active:scale-95", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M9 5l7 7-7 7"], [1, "absolute", "inset-0", "bg-slate-950/85", "backdrop-blur-sm", 3, "click"], [1, "relative", "z-10", "w-full", "max-w-2xl", "mx-auto", "my-auto", "max-h-[92vh]", "flex", "flex-col", "bg-slate-900", "border", "border-slate-800", "rounded-2xl", "overflow-hidden", "shadow-2xl", "shadow-black/85", "font-sans"], [1, "sticky", "top-0", "z-10", "border-b", "border-slate-800", "bg-slate-900/95", "px-5", "py-4", "backdrop-blur-sm", "flex", "items-center", "justify-between"], [1, "text-[10px]", "font-bold", "text-amber-400", "tracking-wider", "uppercase", "font-cairo"], [1, "text-base", "font-bold", "text-white", "font-cairo", "mt-1"], [1, "px-3", "py-1.5", "rounded-xl", "border", "border-slate-700", "text-slate-400", "hover:text-white", "hover:bg-slate-850", "transition-colors", "duration-150", "text-xs", "font-bold", "font-cairo", "cursor-pointer", 3, "click"], [1, "flex-1", "overflow-y-auto", "min-h-0", "p-5", "space-y-4"], [1, "flex", "flex-col", "items-center", "justify-center", "py-12", "gap-3"], [1, "space-y-4"], [1, "text-xs", "text-slate-400", "font-cairo"], [1, "bg-slate-950/40", "border", "border-slate-800/80", "rounded-xl", "p-4", "space-y-2.5"], [1, "py-12", "text-center", "text-slate-500", "text-sm", "font-cairo"], [1, "flex", "flex-col", "sm:flex-row", "justify-between", "items-start", "sm:items-center", "gap-2"], [1, "text-sm", "font-bold", "text-white", "font-cairo"], [1, "text-[11px]", "text-slate-500", "font-cairo", "font-medium"], [1, "flex", "items-center", "gap-1"], [1, "text-base", 3, "text-amber-400", "text-slate-800"], [1, "text-[10px]", "font-mono", "text-slate-500", "ml-1"], [1, "text-xs", "text-slate-300", "leading-relaxed", "font-cairo", "bg-slate-900/30", "border", "border-slate-850", "p-3", "rounded-lg", "max-h-36", "overflow-y-auto", "italic"], [1, "text-[11px]", "text-slate-600", "italic", "font-cairo", "bg-slate-900/10", "border", "border-slate-850/40", "p-2.5", "rounded-lg"], [1, "text-base"]], template: function LandingPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "\u0623");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "span", 5);
      \u0275\u0275text(7, "\u0623\u064F\u0633\u064F\u0633 / Osos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 6)(9, "a", 7);
      \u0275\u0275text(10);
      \u0275\u0275pipe(11, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 8);
      \u0275\u0275listener("click", function LandingPageComponent_Template_button_click_12_listener() {
        return ctx.langService.toggleLanguage();
      });
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(14, LandingPageComponent_Conditional_14_Template, 8, 1)(15, LandingPageComponent_Conditional_15_Template, 8, 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "header", 9);
      \u0275\u0275element(17, "div", 10)(18, "div", 11);
      \u0275\u0275elementStart(19, "div", 12)(20, "span");
      \u0275\u0275text(21);
      \u0275\u0275pipe(22, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "h1", 13);
      \u0275\u0275conditionalCreate(24, LandingPageComponent_Conditional_24_Template, 3, 0)(25, LandingPageComponent_Conditional_25_Template, 3, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "p", 14);
      \u0275\u0275text(27);
      \u0275\u0275pipe(28, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div", 15);
      \u0275\u0275conditionalCreate(30, LandingPageComponent_Conditional_30_Template, 4, 0, "a", 16)(31, LandingPageComponent_Conditional_31_Template, 4, 1, "button", 17);
      \u0275\u0275elementStart(32, "a", 18);
      \u0275\u0275text(33);
      \u0275\u0275pipe(34, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "a", 19)(36, "span", 20);
      \u0275\u0275text(37);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div", 21);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(39, "svg", 22);
      \u0275\u0275element(40, "path", 23);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(41, "section", 24)(42, "div", 25)(43, "h2", 26);
      \u0275\u0275text(44);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "p", 27);
      \u0275\u0275text(46);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "div", 28)(48, "div", 29)(49, "div")(50, "div", 30)(51, "span", 31);
      \u0275\u0275text(52, "\u{1F381} \u0645\u062C\u0627\u0646\u0627\u064B \u0644\u0644\u0623\u0628\u062F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "span", 32);
      \u0275\u0275text(54, "0 EGP");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "h3", 33);
      \u0275\u0275text(56, "\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629 / Free");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "div", 34)(58, "span", 35);
      \u0275\u0275text(59, "0 \u062C.\u0645");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "span", 36);
      \u0275\u0275text(61, "\u0645\u062C\u0627\u0646\u064A \u0645\u062F\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 / Free Forever");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "ul", 37)(63, "li", 2)(64, "span", 38);
      \u0275\u0275text(65, "\u2713");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "span");
      \u0275\u0275text(67, "2 \u0645\u0634\u0627\u0631\u064A\u0639 \u0645\u062C\u0627\u0646\u0627\u064B \u0645\u062F\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 (2 Lifetime Projects)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "li", 2)(69, "span", 38);
      \u0275\u0275text(70, "\u2713");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "span");
      \u0275\u0275text(72, "\u0625\u0645\u0643\u0627\u0646\u064A\u0629 \u062A\u062C\u0631\u0628\u0629 \u0643\u0627\u0645\u0644 \u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0645\u0646\u0635\u0629");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(73, "li", 2)(74, "span", 38);
      \u0275\u0275text(75, "\u2713");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "span");
      \u0275\u0275text(77, "\u0628\u062F\u0648\u0646 \u0623\u064A \u0628\u0637\u0627\u0642\u0629 \u0625\u0626\u062A\u0645\u0627\u0646\u064A\u0629");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(78, "button", 39);
      \u0275\u0275listener("click", function LandingPageComponent_Template_button_click_78_listener() {
        return ctx.onSelectPricingPlan(0);
      });
      \u0275\u0275elementStart(79, "span");
      \u0275\u0275text(80, "\u0627\u0628\u062F\u0623 \u0645\u062C\u0627\u0646\u0627\u064B \u0627\u0644\u0627\u0646 / Start Free");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(81, "div", 40)(82, "div")(83, "div", 30)(84, "span", 41);
      \u0275\u0275text(85, "\u{1F4E6} \u0645\u0634\u0631\u0648\u0639 \u0625\u0636\u0627\u0641\u064A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "span", 42);
      \u0275\u0275text(87, "250 EGP");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(88, "h3", 33);
      \u0275\u0275text(89, "\u0645\u0634\u0631\u0648\u0639 \u0625\u0636\u0627\u0641\u064A / Single Project");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(90, "div", 34)(91, "span", 43);
      \u0275\u0275text(92, "250 \u062C.\u0645");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "span", 36);
      \u0275\u0275text(94, "\u062F\u0641\u0639 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 / One-Time Payment");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(95, "ul", 37)(96, "li", 2)(97, "span", 44);
      \u0275\u0275text(98, "\u2713");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "span");
      \u0275\u0275text(100, "\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0631\u0648\u0639 1 \u0625\u0636\u0627\u0641\u064A \u0644\u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u062D\u0627\u0644\u064A");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(101, "li", 2)(102, "span", 44);
      \u0275\u0275text(103, "\u2713");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(104, "span");
      \u0275\u0275text(105, "\u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A \u0648\u0645\u0628\u0627\u0634\u0631");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(106, "li", 2)(107, "span", 44);
      \u0275\u0275text(108, "\u2713");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(109, "span");
      \u0275\u0275text(110, "\u0627\u0644\u0645\u0644\u0643\u064A\u0629 \u062F\u0627\u0626\u0645\u0629 \u0628\u062F\u0648\u0646 \u0627\u0634\u062A\u0631\u0627\u0643 \u0634\u0647\u0631\u064A");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(111, "button", 45);
      \u0275\u0275listener("click", function LandingPageComponent_Template_button_click_111_listener() {
        return ctx.onSelectPricingPlan(1);
      });
      \u0275\u0275elementStart(112, "span");
      \u0275\u0275text(113, "\u0634\u0631\u0627\u0621 \u0645\u0634\u0631\u0648\u0639 \u0625\u0636\u0627\u0641\u064A / Buy Single Project");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(114, "div", 46)(115, "div", 47);
      \u0275\u0275text(116, " \u2B50\uFE0F \u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B - \u062A\u0648\u0641\u064A\u0631 300 \u062C.\u0645 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(117, "div", 48)(118, "div", 30)(119, "span", 49);
      \u0275\u0275text(120, "\u{1F680} \u062D\u0632\u0645\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(121, "span", 50);
      \u0275\u0275text(122, "950 EGP");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(123, "h3", 51);
      \u0275\u0275text(124, "\u062D\u0632\u0645\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 / +5 Projects");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(125, "div", 34)(126, "div", 52)(127, "span", 53);
      \u0275\u0275text(128, "950 \u062C.\u0645");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(129, "span", 54);
      \u0275\u0275text(130, "1,250 \u062C.\u0645");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(131, "span", 55);
      \u0275\u0275text(132, "\u062F\u0641\u0639 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0628\u062F\u0644\u0627\u064B \u0645\u0646 1250 \u062C.\u0645");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(133, "ul", 56)(134, "li", 2)(135, "span", 57);
      \u0275\u0275text(136, "\u2713");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(137, "span");
      \u0275\u0275text(138, "\u0625\u0636\u0627\u0641\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 \u0643\u0627\u0645\u0644\u0629 \u0644\u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u062D\u0627\u0644\u064A");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(139, "li", 2)(140, "span", 57);
      \u0275\u0275text(141, "\u2713");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(142, "span");
      \u0275\u0275text(143, "\u062A\u0648\u0641\u064A\u0631 300 \u062C.\u0645 \u0641\u0648\u0631\u0627\u064B");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(144, "li", 2)(145, "span", 57);
      \u0275\u0275text(146, "\u2713");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(147, "span");
      \u0275\u0275text(148, "\u0623\u0648\u0644\u0648\u064A\u0629 \u0648\u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0641\u0646\u064A");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(149, "button", 58);
      \u0275\u0275listener("click", function LandingPageComponent_Template_button_click_149_listener() {
        return ctx.onSelectPricingPlan(5);
      });
      \u0275\u0275elementStart(150, "span");
      \u0275\u0275text(151, "\u0627\u0634\u062A\u0631\u0650 \u0627\u0644\u062D\u0632\u0645\u0629 \u0648\u0648\u0641\u0631 \u0627\u0644\u0627\u0646 / Buy Package & Save");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(152, "div", 59)(153, "a", 60)(154, "span");
      \u0275\u0275text(155);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(156, "div", 61);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(157, "svg", 62);
      \u0275\u0275element(158, "path", 63);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(159, "section", 64)(160, "div", 65)(161, "div", 66)(162, "h2", 67);
      \u0275\u0275text(163);
      \u0275\u0275pipe(164, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(165, "p", 68);
      \u0275\u0275text(166);
      \u0275\u0275pipe(167, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(168, "div", 69)(169, "div")(170, "label", 70);
      \u0275\u0275text(171);
      \u0275\u0275pipe(172, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(173, "input", 71);
      \u0275\u0275pipe(174, "translate");
      \u0275\u0275twoWayListener("ngModelChange", function LandingPageComponent_Template_input_ngModelChange_173_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.regionFilter, $event) || (ctx.regionFilter = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function LandingPageComponent_Template_input_ngModelChange_173_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(175, "div")(176, "label", 70);
      \u0275\u0275text(177);
      \u0275\u0275pipe(178, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(179, "select", 72);
      \u0275\u0275twoWayListener("ngModelChange", function LandingPageComponent_Template_select_ngModelChange_179_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.categoryFilter, $event) || (ctx.categoryFilter = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function LandingPageComponent_Template_select_ngModelChange_179_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(180, "option", 73);
      \u0275\u0275text(181);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(182, "option", 74);
      \u0275\u0275text(183);
      \u0275\u0275pipe(184, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(185, "option", 75);
      \u0275\u0275text(186);
      \u0275\u0275pipe(187, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(188, "option", 76);
      \u0275\u0275text(189);
      \u0275\u0275pipe(190, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(191, "option", 77);
      \u0275\u0275text(192);
      \u0275\u0275pipe(193, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(194, "div")(195, "label", 70);
      \u0275\u0275text(196);
      \u0275\u0275pipe(197, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(198, "select", 72);
      \u0275\u0275twoWayListener("ngModelChange", function LandingPageComponent_Template_select_ngModelChange_198_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.ratingFilter, $event) || (ctx.ratingFilter = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function LandingPageComponent_Template_select_ngModelChange_198_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(199, "option", 78);
      \u0275\u0275text(200, "All Ratings");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(201, "option", 79);
      \u0275\u0275text(202, "3.0+ Stars");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(203, "option", 80);
      \u0275\u0275text(204, "4.0+ Stars");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(205, "option", 81);
      \u0275\u0275text(206, "4.5+ Stars");
      \u0275\u0275elementEnd()();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(207, LandingPageComponent_Conditional_207_Template, 4, 0, "div", 82)(208, LandingPageComponent_Conditional_208_Template, 4, 1, "div", 83);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(209, LandingPageComponent_Conditional_209_Template, 53, 12, "div", 84);
      \u0275\u0275conditionalCreate(210, LandingPageComponent_Conditional_210_Template, 13, 4, "div", 85);
      \u0275\u0275conditionalCreate(211, LandingPageComponent_Conditional_211_Template, 14, 2, "div", 86);
      \u0275\u0275elementStart(212, "footer", 87)(213, "p");
      \u0275\u0275text(214);
      \u0275\u0275pipe(215, "translate");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 32, "USERS.TAB_USERS"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.langService.currentLang() === "en" ? "\u0639\u0631\u0628\u064A" : "English", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.authService.isAuthenticated() ? 14 : 15);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 34, "HERO.LIVE_TAG"));
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.langService.currentLang() === "ar" ? 24 : 25);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(28, 36, "HERO.SUBTITLE"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.authService.isAuthenticated() ? 30 : 31);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(34, 38, "MARKETPLACE.VIEW_PORTFOLIO"), " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.langService.currentLang() === "ar" ? "\u0627\u0633\u062A\u0643\u0634\u0641 \u062F\u0644\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0648\u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u0627\u0644\u0645\u0646\u0635\u0629" : "Explore Registered Companies & Portfolios", " ");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", ctx.langService.currentLang() === "ar" ? "\u062E\u0637\u0637 \u0623\u0633\u0639\u0627\u0631 \u0645\u0631\u0646\u0629 \u062A\u0646\u0627\u0633\u0628 \u062D\u062C\u0645 \u0623\u0639\u0645\u0627\u0644\u0643" : "Transparent & Flexible Pricing", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.langService.currentLang() === "ar" ? "\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0628\u0627\u0644\u062C\u0646\u064A\u0647 \u0627\u0644\u0645\u0635\u0631\u064A \u0648\u0627\u0644\u062F\u0641\u0639 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0628\u062F\u0648\u0646 \u0623\u064A \u0627\u0634\u062A\u0631\u0627\u0643\u0627\u062A \u0634\u0647\u0631\u064A\u0629 \u0645\u062A\u0643\u0631\u0631\u0629." : "All prices in EGP with one-time payment and zero recurring monthly fees.", " ");
      \u0275\u0275advance(109);
      \u0275\u0275textInterpolate(ctx.langService.currentLang() === "ar" ? "\u062A\u0635\u0641\u062D \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0648\u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u0634\u062A\u0631\u0643\u0629 \u0645\u0639\u0646\u0627" : "Browse Subscribed Companies & Projects Directory");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(164, 40, "MARKETPLACE.SECTION_TITLE"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(167, 42, "MARKETPLACE.SECTION_SUBTITLE"), " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(172, 44, "MARKETPLACE.FILTER_REGION"));
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.regionFilter);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(174, 46, "MARKETPLACE.SEARCH_PLACEHOLDER"));
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(178, 48, "MARKETPLACE.FILTER_CATEGORY"));
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.categoryFilter);
      \u0275\u0275control();
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.langService.currentLang() === "ar" ? "\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A" : "All Categories");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(184, 50, "PROJECTS.CATEGORIES.Residential"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(187, 52, "PROJECTS.CATEGORIES.Commercial"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(190, 54, "PROJECTS.CATEGORIES.Industrial"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(193, 56, "PROJECTS.CATEGORIES.Other"));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(197, 58, "MARKETPLACE.FILTER_RATING"));
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.ratingFilter);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275property("value", void 0);
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.isLoading() ? 207 : 208);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isModalOpen() && ctx.selectedCompany() ? 209 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLightboxOpen() && ctx.lightboxPhotos().length > 0 ? 210 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isReviewsModalOpen() ? 211 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(215, 60, "FOOTER.COPYRIGHT"));
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe, DatePipe, TranslatePipe], styles: ['\n.font-cairo[_ngcontent-%COMP%] {\n  font-family:\n    "Cairo",\n    "Inter",\n    sans-serif;\n}\n/*# sourceMappingURL=landing-page.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LandingPageComponent, [{
    type: Component,
    args: [{ selector: "app-landing-page", standalone: true, imports: [CommonModule, RouterLink, TranslatePipe, FormsModule], template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <!-- Nav Bar -->
      <nav class="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
            <span class="text-white font-extrabold text-sm">\u0623</span>
          </div>
          <span class="text-base md:text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent font-cairo">\u0623\u064F\u0633\u064F\u0633 / Osos</span>
        </div>
        <div class="flex items-center gap-2 md:gap-4">
          <a href="#marketplace" class="hidden sm:inline-block text-xs md:text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200 font-cairo">
            {{ 'USERS.TAB_USERS' | translate }}
          </a>
          <button 
            (click)="langService.toggleLanguage()"
            class="text-[10px] md:text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-all duration-200 cursor-pointer px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 active:scale-95">
            {{ langService.currentLang() === 'en' ? '\u0639\u0631\u0628\u064A' : 'English' }}
          </button>
          @if (authService.isAuthenticated()) {
            <span class="hidden lg:inline-block text-xs md:text-sm text-slate-400 font-medium font-cairo">
              Welcome back, <span class="text-white font-semibold">{{ authService.currentUser()?.name }}</span>
            </span>
            <a routerLink="/dashboard" class="relative group overflow-hidden px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-indigo-600 text-xs md:text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer font-cairo">
              <span class="relative z-10">Dashboard</span>
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          } @else {
            <a routerLink="/login" class="text-xs md:text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 font-cairo px-1">
              {{ 'NAV.LOGIN' | translate }}
            </a>
            <button (click)="navigateToLogin()" class="relative group overflow-hidden px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-indigo-600 text-xs md:text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer font-cairo">
              <span class="relative z-10">{{ 'NAV.GET_STARTED' | translate }}</span>
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          }
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="relative pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-in-down">
          <span>{{ 'HERO.LIVE_TAG' | translate }}</span>
        </div>

        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight max-w-5xl leading-tight mb-8 font-cairo">
          @if (langService.currentLang() === 'ar') {
            \u0623\u064F\u0633\u064F\u0633 | \u0627\u0636\u0628\u0637 \u0639\u064F\u0647\u062F \u0645\u0634\u0627\u0631\u064A\u0639\u0643\u060C \u0648\u0631\u0627\u0642\u0628 \u0645\u0635\u0627\u0631\u064A\u0641 \u0645\u0648\u0642\u0639\u0643 <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">\u0641\u064A \u062B\u0627\u0646\u064A\u0629 \u0648\u0628\u062F\u0648\u0646 \u0645\u062D\u0627\u0633\u0628</span>
          } @else {
            Osos | Track your project cash & monitor site expenses <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">instantly without an accountant</span>
          }
        </h1>

        <p class="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-cairo">
          {{ 'HERO.SUBTITLE' | translate }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 mb-12">
          @if (authService.isAuthenticated()) {
            <a routerLink="/dashboard" class="px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer font-cairo">
              Go to Dashboard
              <span class="inline-block transform transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ml-1 rtl:mr-1 rtl:ml-0">&rarr;</span>
            </a>
          } @else {
            <button (click)="navigateToLogin()" class="px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer font-cairo">
              {{ langService.currentLang() === 'ar' ? '\u0627\u0628\u062F\u0623 \u0645\u0634\u0631\u0648\u0639\u0643 \u0627\u0644\u0623\u0648\u0644 \u0645\u062C\u0627\u0646\u0627\u064B \u0641\u0648\u0631\u0627\u064B' : 'Start Your First Project Free Now' }}
              <span class="inline-block transform transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ml-1 rtl:mr-1 rtl:ml-0">&rarr;</span>
            </button>
          }
          <a href="#marketplace" class="px-8 py-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 font-semibold text-slate-300 hover:text-white transition-all duration-300 font-cairo">
            {{ 'MARKETPLACE.VIEW_PORTFOLIO' | translate }}
          </a>
        </div>

        <!-- Scroll Down Indicator to Marketplace -->
        <a href="#marketplace" class="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:opacity-100 opacity-80 mt-2">
          <span class="text-xs font-semibold text-slate-400 group-hover:text-indigo-400 font-cairo transition-colors duration-200">
            {{ langService.currentLang() === 'ar' ? '\u0627\u0633\u062A\u0643\u0634\u0641 \u062F\u0644\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0648\u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0628\u0627\u0644\u0645\u0646\u0635\u0629' : 'Explore Registered Companies & Portfolios' }}
          </span>
          <div class="w-9 h-9 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 animate-bounce transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </a>
      </header>

      <!-- Modern 3-Card Pricing Section -->
      <section id="pricing" class="py-20 px-6 max-w-6xl mx-auto border-t border-slate-900">
        <!-- Section Header -->
        <div class="text-center mb-14 max-w-3xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 font-cairo text-white">
            {{ langService.currentLang() === 'ar' ? '\u062E\u0637\u0637 \u0623\u0633\u0639\u0627\u0631 \u0645\u0631\u0646\u0629 \u062A\u0646\u0627\u0633\u0628 \u062D\u062C\u0645 \u0623\u0639\u0645\u0627\u0644\u0643' : 'Transparent & Flexible Pricing' }}
          </h2>
          <p class="text-slate-400 font-cairo text-sm sm:text-base leading-relaxed">
            {{ langService.currentLang() === 'ar' ? '\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0628\u0627\u0644\u062C\u0646\u064A\u0647 \u0627\u0644\u0645\u0635\u0631\u064A \u0648\u0627\u0644\u062F\u0641\u0639 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0628\u062F\u0648\u0646 \u0623\u064A \u0627\u0634\u062A\u0631\u0627\u0643\u0627\u062A \u0634\u0647\u0631\u064A\u0629 \u0645\u062A\u0643\u0631\u0631\u0629.' : 'All prices in EGP with one-time payment and zero recurring monthly fees.' }}
          </p>
        </div>

        <!-- 3-Card Pricing Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">

          <!-- Card 1: Free Lifetime Plan -->
          <div class="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl relative group">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-cairo">\u{1F381} \u0645\u062C\u0627\u0646\u0627\u064B \u0644\u0644\u0623\u0628\u062F</span>
                <span class="text-xs font-mono text-slate-500 font-bold">0 EGP</span>
              </div>
              <h3 class="text-xl font-bold text-white font-cairo mb-2">\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629 / Free</h3>
              <div class="my-4">
                <span class="text-3xl font-extrabold text-emerald-400 font-mono">0 \u062C.\u0645</span>
                <span class="text-xs text-slate-400 font-cairo block mt-1">\u0645\u062C\u0627\u0646\u064A \u0645\u062F\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 / Free Forever</span>
              </div>
              <ul class="space-y-3 my-6 text-xs text-slate-300 font-cairo">
                <li class="flex items-center gap-2">
                  <span class="text-emerald-400 font-bold">\u2713</span>
                  <span>2 \u0645\u0634\u0627\u0631\u064A\u0639 \u0645\u062C\u0627\u0646\u0627\u064B \u0645\u062F\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 (2 Lifetime Projects)</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-emerald-400 font-bold">\u2713</span>
                  <span>\u0625\u0645\u0643\u0627\u0646\u064A\u0629 \u062A\u062C\u0631\u0628\u0629 \u0643\u0627\u0645\u0644 \u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0645\u0646\u0635\u0629</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-emerald-400 font-bold">\u2713</span>
                  <span>\u0628\u062F\u0648\u0646 \u0623\u064A \u0628\u0637\u0627\u0642\u0629 \u0625\u0626\u062A\u0645\u0627\u0646\u064A\u0629</span>
                </li>
              </ul>
            </div>
            <button 
              (click)="onSelectPricingPlan(0)"
              class="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs rounded-xl font-cairo transition-all duration-200 text-center shadow-md cursor-pointer block">
              <span>\u0627\u0628\u062F\u0623 \u0645\u062C\u0627\u0646\u0627\u064B \u0627\u0644\u0627\u0646 / Start Free</span>
            </button>
          </div>

          <!-- Card 2: +1 Single Project Topup -->
          <div class="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 shadow-xl relative group">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-cairo">\u{1F4E6} \u0645\u0634\u0631\u0648\u0639 \u0625\u0636\u0627\u0641\u064A</span>
                <span class="text-xs font-mono text-slate-400 font-bold">250 EGP</span>
              </div>
              <h3 class="text-xl font-bold text-white font-cairo mb-2">\u0645\u0634\u0631\u0648\u0639 \u0625\u0636\u0627\u0641\u064A / Single Project</h3>
              <div class="my-4">
                <span class="text-3xl font-extrabold text-white font-mono">250 \u062C.\u0645</span>
                <span class="text-xs text-slate-400 font-cairo block mt-1">\u062F\u0641\u0639 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 / One-Time Payment</span>
              </div>
              <ul class="space-y-3 my-6 text-xs text-slate-300 font-cairo">
                <li class="flex items-center gap-2">
                  <span class="text-indigo-400 font-bold">\u2713</span>
                  <span>\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0631\u0648\u0639 1 \u0625\u0636\u0627\u0641\u064A \u0644\u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u062D\u0627\u0644\u064A</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-indigo-400 font-bold">\u2713</span>
                  <span>\u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A \u0648\u0645\u0628\u0627\u0634\u0631</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-indigo-400 font-bold">\u2713</span>
                  <span>\u0627\u0644\u0645\u0644\u0643\u064A\u0629 \u062F\u0627\u0626\u0645\u0629 \u0628\u062F\u0648\u0646 \u0627\u0634\u062A\u0631\u0627\u0643 \u0634\u0647\u0631\u064A</span>
                </li>
              </ul>
            </div>
            <button 
              (click)="onSelectPricingPlan(1)"
              class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl font-cairo transition-all duration-200 text-center shadow-lg shadow-indigo-600/30 cursor-pointer block">
              <span>\u0634\u0631\u0627\u0621 \u0645\u0634\u0631\u0648\u0639 \u0625\u0636\u0627\u0641\u064A / Buy Single Project</span>
            </button>
          </div>

          <!-- Card 3: +5 Projects Package (Highlighted Card) -->
          <div class="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-amber-950/30 border-2 border-indigo-500 shadow-xl shadow-indigo-500/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-400 transition-all duration-300 relative overflow-hidden">
            <div class="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-indigo-600 text-white text-[10px] font-black uppercase px-3.5 py-1 rounded-bl-2xl font-cairo shadow-md">
              \u2B50\uFE0F \u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B - \u062A\u0648\u0641\u064A\u0631 300 \u062C.\u0645
            </div>
            <div class="pt-2">
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 font-cairo">\u{1F680} \u062D\u0632\u0645\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639</span>
                <span class="text-xs font-mono text-amber-400 font-bold">950 EGP</span>
              </div>
              <h3 class="text-xl font-extrabold text-white font-cairo mb-2">\u062D\u0632\u0645\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 / +5 Projects</h3>
              <div class="my-4">
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-extrabold text-amber-400 font-mono">950 \u062C.\u0645</span>
                  <span class="text-sm text-slate-500 line-through font-mono">1,250 \u062C.\u0645</span>
                </div>
                <span class="text-xs text-amber-300/90 font-cairo block mt-1">\u062F\u0641\u0639 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0628\u062F\u0644\u0627\u064B \u0645\u0646 1250 \u062C.\u0645</span>
              </div>
              <ul class="space-y-3 my-6 text-xs text-slate-200 font-cairo">
                <li class="flex items-center gap-2">
                  <span class="text-amber-400 font-bold">\u2713</span>
                  <span>\u0625\u0636\u0627\u0641\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 \u0643\u0627\u0645\u0644\u0629 \u0644\u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u062D\u0627\u0644\u064A</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-amber-400 font-bold">\u2713</span>
                  <span>\u062A\u0648\u0641\u064A\u0631 300 \u062C.\u0645 \u0641\u0648\u0631\u0627\u064B</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-amber-400 font-bold">\u2713</span>
                  <span>\u0623\u0648\u0644\u0648\u064A\u0629 \u0648\u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0641\u0646\u064A</span>
                </li>
              </ul>
            </div>
            <button 
              (click)="onSelectPricingPlan(5)"
              class="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:from-amber-400 hover:to-indigo-500 text-white font-black text-xs rounded-xl font-cairo transition-all duration-200 text-center shadow-xl shadow-indigo-600/30 active:scale-[0.98] ring-2 ring-amber-500/30 cursor-pointer block">
              <span>\u0627\u0634\u062A\u0631\u0650 \u0627\u0644\u062D\u0632\u0645\u0629 \u0648\u0648\u0641\u0631 \u0627\u0644\u0627\u0646 / Buy Package & Save</span>
            </button>
          </div>

        </div>

        <!-- Scroll Down Cue to Directory -->
        <div class="mt-12 text-center flex flex-col items-center">
          <a href="#marketplace" class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-800 hover:border-indigo-500/40 bg-slate-900/60 hover:bg-indigo-950/30 text-xs font-bold text-slate-300 hover:text-indigo-300 transition-all duration-300 shadow-lg group cursor-pointer font-cairo">
            <span>{{ langService.currentLang() === 'ar' ? '\u062A\u0635\u0641\u062D \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0648\u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u0634\u062A\u0631\u0643\u0629 \u0645\u0639\u0646\u0627' : 'Browse Subscribed Companies & Projects Directory' }}</span>
            <div class="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      <!-- MARKETPLACE SaaS DIRECTORY -->
      <section id="marketplace" class="py-20 px-6 border-t border-slate-900 bg-slate-900/10 relative">
        <div class="max-w-7xl mx-auto">
          <div class="text-center max-w-3xl mx-auto mb-12">
            <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-cairo">
              {{ 'MARKETPLACE.SECTION_TITLE' | translate }}
            </h2>
            <p class="text-slate-400 font-cairo text-sm">
              {{ 'MARKETPLACE.SECTION_SUBTITLE' | translate }}
            </p>
          </div>

          <!-- Filter Controls -->
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 mb-10 grid grid-cols-1 sm:grid-cols-3 gap-5 font-sans">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-cairo">{{ 'MARKETPLACE.FILTER_REGION' | translate }}</label>
              <input 
                type="text" 
                [(ngModel)]="regionFilter" 
                (ngModelChange)="onFilterChange()"
                [placeholder]="'MARKETPLACE.SEARCH_PLACEHOLDER' | translate"
                class="w-full px-3 py-2 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-cairo">{{ 'MARKETPLACE.FILTER_CATEGORY' | translate }}</label>
              <select 
                [(ngModel)]="categoryFilter" 
                (ngModelChange)="onFilterChange()"
                class="w-full px-3 py-2 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                <option value="">{{ langService.currentLang() === 'ar' ? '\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A' : 'All Categories' }}</option>
                <option value="Residential">{{ 'PROJECTS.CATEGORIES.Residential' | translate }}</option>
                <option value="Commercial">{{ 'PROJECTS.CATEGORIES.Commercial' | translate }}</option>
                <option value="Industrial">{{ 'PROJECTS.CATEGORIES.Industrial' | translate }}</option>
                <option value="Other">{{ 'PROJECTS.CATEGORIES.Other' | translate }}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-cairo">{{ 'MARKETPLACE.FILTER_RATING' | translate }}</label>
              <select 
                [(ngModel)]="ratingFilter" 
                (ngModelChange)="onFilterChange()"
                class="w-full px-3 py-2 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                <option [value]="undefined">All Ratings</option>
                <option value="3">3.0+ Stars</option>
                <option value="4">4.0+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>

          <!-- Company Portfolios Grid -->
          @if (isLoading()) {
            <div class="flex justify-center py-16">
              <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          } @else {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              @for (comp of companies(); track comp.id) {
                <div class="group flex flex-col justify-between bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/40 hover:bg-slate-900/40 transition-all duration-300 shadow-xl">
                  <div>
                    <div class="flex items-center gap-4 mb-4">
                      <!-- Company Logo -->
                      @if (comp.logoUrl) {
                        <div class="relative h-12 w-12 rounded-xl border border-slate-700 bg-slate-950 overflow-hidden flex items-center justify-center shrink-0">
                          <img [src]="comp.logoUrl" (error)="onLogoError($event)" alt="" class="h-full w-full object-cover">
                          <div class="hidden h-full w-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white uppercase text-base shadow-md font-cairo">
                            {{ comp.name.substring(0,2) }}
                          </div>
                        </div>
                      } @else {
                        <div class="h-12 w-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white uppercase text-base shadow-md font-cairo shrink-0">
                          {{ comp.name.substring(0,2) }}
                        </div>
                      }
                      <div>
                        <h3 class="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors duration-200 font-cairo">{{ comp.name }}</h3>
                        <p class="text-xs text-slate-500 font-mono">{{ comp.region || 'Global' }}</p>
                      </div>
                    </div>

                    <p class="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {{ comp.companyDescription || 'No description available for this corporate portfolio yet.' }}
                    </p>
                  </div>

                  <div class="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-auto">
                    <!-- Rating Indicator -->
                    <button
                      (click)="openReviewsModal($event, comp.id, comp.name)"
                      title="View client reviews"
                      class="flex items-center gap-1.5 cursor-pointer hover:underline text-amber-400 hover:text-amber-300 font-bold focus:outline-none bg-transparent border-0 p-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="text-sm font-bold">{{ comp.rating | number:'1.1-1' }}</span>
                    </button>

                    <button 
                      (click)="openPortfolioModal(comp.id)"
                      class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white shadow-md shadow-indigo-600/10 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer font-cairo">
                      {{ 'MARKETPLACE.VIEW_PORTFOLIO' | translate }}
                    </button>
                  </div>
                </div>
              } @empty {
                <div class="col-span-1 md:col-span-2 lg:col-span-3 py-16 text-center text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-800 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p class="font-bold font-cairo">{{ 'MARKETPLACE.NO_COMPANIES' | translate }}</p>
                </div>
              }
            </div>
          }
        </div>
      </section>

      <!-- PORTFOLIO PROFILE DETAILS MODAL -->
      @if (isModalOpen() && selectedCompany()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in">
          <div (click)="closeModal()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-md"></div>

          <div class="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-5xl w-11/12 sm:w-full max-h-[92vh] flex flex-col p-0 shadow-2xl z-10 font-sans overflow-hidden">
            
            <!-- 1\uFE0F\u20E3 FIXED TOP HEADER (PERMANENTLY VISIBLE ON SCROLL) -->
            <div class="shrink-0 bg-slate-900 border-b border-slate-800 relative z-20 shadow-md">
              <!-- Banner Container with Dark Gradient Overlay -->
              <div class="relative h-28 sm:h-36 w-full bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-slate-800/80 overflow-hidden">
                @if (selectedCompany()!.bannerUrl) {
                  <img [src]="selectedCompany()!.bannerUrl" (error)="onImgError($event)" alt="" class="w-full h-full object-cover">
                }
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                <!-- Close Button (X) -->
                <button 
                  (click)="closeModal()"
                  class="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/70 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-950 transition-all duration-150 cursor-pointer shadow-lg z-30">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Fixed Avatar & Profile Summary Bar -->
              <div class="px-4 sm:px-8 pb-4 pt-1 font-cairo">
                <div class="relative flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 -mt-10 sm:-mt-12 z-10">
                  <!-- Company Avatar & Name -->
                  <div class="flex items-end gap-4">
                    @if (selectedCompany()!.logoUrl) {
                      <div class="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border-4 border-slate-900 bg-slate-950 shadow-2xl overflow-hidden shrink-0 flex items-center justify-center">
                        <img [src]="selectedCompany()!.logoUrl" (error)="onLogoError($event)" alt="" class="h-full w-full object-cover">
                      </div>
                    } @else {
                      <div class="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-black text-white text-2xl sm:text-3xl border-4 border-slate-900 shadow-2xl font-cairo shrink-0">
                        {{ selectedCompany()!.name.substring(0,2) }}
                      </div>
                    }
                    <div>
                      <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight font-cairo">{{ selectedCompany()!.name }}</h2>
                      <div class="flex items-center gap-3 mt-1 flex-wrap">
                        <span class="text-xs sm:text-sm text-indigo-400 font-bold font-cairo flex items-center gap-1">
                          \u{1F4CD} {{ selectedCompany()!.region || '\u0645\u0635\u0631' }}
                        </span>
                        <span class="h-1.5 w-1.5 rounded-full bg-slate-700"></span>
                        <button
                          (click)="openReviewsModal($event, selectedCompany()!.id, selectedCompany()!.name)"
                          title="View all client reviews"
                          class="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline cursor-pointer bg-slate-950/60 px-2.5 py-1 rounded-lg border border-amber-500/20">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{{ selectedCompany()!.rating | number:'1.1-1' }}</span>
                          <span class="text-[10px] text-amber-400/80 font-normal">(\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0639\u0645\u0644\u0627\u0621)</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Projects Stats Badge -->
                  <div class="px-3.5 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center gap-2.5 shadow-md shrink-0">
                    <span class="text-xs text-slate-400 font-bold font-cairo">\u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u0648\u062B\u0642\u0629</span>
                    <span class="text-base font-black text-indigo-400 font-mono">{{ selectedCompany()!.projects.length }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2\uFE0F\u20E3 SCROLLABLE CONTENT AREA (PROJECTS GRID & ABOUT SCROLL UNDERNEATH) -->
            <div class="overflow-y-auto min-h-0 w-full flex-1 px-4 sm:px-8 py-6 font-cairo scrollbar-none space-y-6">
              <!-- About Description Section -->
              <div>
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider font-cairo mb-2 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                  \u0639\u0646 \u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u0627\u0644\u0646\u0634\u0627\u0637
                </h3>
                <p class="text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/50 border border-slate-800/60 rounded-2xl p-4 sm:p-5 shadow-inner font-cairo">
                  {{ selectedCompany()!.companyDescription || '\u0644\u0627 \u064A\u062A\u0648\u0641\u0631 \u0648\u0635\u0641 \u0645\u0646\u0641\u0635\u0644 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u062A\u0639\u0631\u064A\u0641\u064A \u0644\u0644\u0634\u0631\u0643\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.' }}
                </p>
              </div>

              <!-- Public Projects Grid Showcase -->
              <div>
                <h3 class="text-base font-extrabold text-white font-cairo mb-4 border-b border-slate-800 pb-3 flex items-center justify-between">
                  <span class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    \u0645\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u0646\u0641\u0630\u0629 \u0648\u0627\u0644\u0639\u0644\u0646\u064A\u0629
                  </span>
                  <span class="text-xs font-normal text-slate-400">({{ selectedCompany()!.projects.length }} \u0645\u0634\u0631\u0648\u0639)</span>
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  @for (proj of selectedCompany()!.projects; track proj.id) {
                    @let meta = parseProjectDetails(proj.description);
                    <div class="bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 shadow-xl group">
                      <!-- Project Card Cover Photo & Badges (Click Cover to Open Lightbox) -->
                      <div 
                        (click)="proj.sitePhotos && proj.sitePhotos.length > 0 && openLightbox(proj.sitePhotos, 0, $event)"
                        class="relative h-44 w-full bg-slate-900 overflow-hidden"
                        [class.cursor-pointer]="proj.sitePhotos && proj.sitePhotos.length > 0">
                        @if (proj.sitePhotos && proj.sitePhotos.length > 0) {
                          <img [src]="proj.sitePhotos[0]" (error)="onImgError($event)" alt="{{ proj.name }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                          <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span class="px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold font-cairo flex items-center gap-1.5 shadow-xl border border-white/20">
                              \u{1F50D} \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0635\u0648\u0631\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644
                            </span>
                          </div>
                        } @else {
                          <div class="w-full h-full bg-gradient-to-br from-slate-900 to-indigo-950/40 flex flex-col items-center justify-center p-4 text-slate-600">
                            <svg class="w-10 h-10 mb-2 opacity-40 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-8l-2-2m0 0l-2 2m2-2v6" />
                            </svg>
                            <span class="text-xs text-slate-500 font-cairo">\u0645\u0639\u0631\u0636 \u0635\u0648\u0631 \u0642\u064A\u062F \u0627\u0644\u062A\u062D\u062F\u064A\u062B</span>
                          </div>
                        }

                        <!-- Category / Classification Badge -->
                        <div class="absolute top-3 right-3 flex items-center gap-2">
                          <span class="px-3 py-1 rounded-xl text-xs font-bold bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30 font-cairo shadow-lg">
                            {{ meta.category || '\u0639\u0627\u0645' }}
                          </span>
                        </div>

                        <!-- Photos Count Badge -->
                        @if (proj.sitePhotos && proj.sitePhotos.length > 0) {
                          <div class="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-bold text-slate-200 flex items-center gap-1 font-mono">
                            \u{1F4F7} {{ proj.sitePhotos.length }} \u0635\u0648\u0631
                          </div>
                        }
                      </div>

                      <!-- Project Card Content -->
                      <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 class="text-lg font-bold text-white font-cairo group-hover:text-indigo-400 transition-colors line-clamp-1">{{ proj.name }}</h4>
                          @if (meta.governorate) {
                            <p class="text-xs text-indigo-400 font-cairo font-medium mt-1">\u{1F4CD} {{ meta.governorate }} @if (meta.cityOrZone) { - {{ meta.cityOrZone }} }</p>
                          }
                          <p class="text-xs text-slate-400 leading-relaxed font-cairo mt-2 line-clamp-2">
                            {{ meta.cleanDescription || ('PROJECTS.NO_DESCRIPTION' | translate) }}
                          </p>
                        </div>

                        <!-- Card Footer Action Button -->
                        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                          <span class="text-[11px] text-slate-500 font-mono">
                            {{ proj.startDate | date:'dd/MM/yyyy' }}
                          </span>
                          <button
                            (click)="toggleProjectDetailsExpand(proj.id)"
                            class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 transition-all cursor-pointer font-cairo flex items-center gap-1.5">
                            <span>\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0648\u0627\u0644\u0635\u0648\u0631</span>
                            <svg class="w-3.5 h-3.5 transition-transform" [class.rotate-180]="expandedProjectId() === proj.id" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>

                        <!-- Expanded Project Details & Photos Gallery -->
                        @if (expandedProjectId() === proj.id) {
                          <div class="pt-3 border-t border-slate-800/80 space-y-3 animate-fade-in">
                            @if (proj.sitePhotos && proj.sitePhotos.length > 0) {
                              <div class="grid grid-cols-3 gap-2">
                                @for (photo of proj.sitePhotos; track photo; let idx = $index) {
                                  <div 
                                    (click)="openLightbox(proj.sitePhotos, idx, $event)"
                                    class="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer group/photo">
                                    <img [src]="photo" (error)="onImgError($event)" alt="" class="w-full h-full object-cover group-hover/photo:scale-110 transition-transform">
                                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                                      <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                      </svg>
                                    </div>
                                  </div>
                                }
                              </div>
                            }
                          </div>
                        }
                      </div>
                    </div>
                  } @empty {
                    <div class="col-span-2 py-12 text-center text-slate-500 font-cairo text-sm bg-slate-950/40 rounded-2xl border border-slate-800">
                      \u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0634\u0627\u0631\u064A\u0639 \u0639\u0644\u0646\u064A\u0629 \u0645\u0636\u0627\u0641\u0629 \u0641\u064A \u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0639\u0627\u0645 \u0644\u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0643\u0629 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646.
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- \u{1F5BC}\uFE0F FULLSCREEN LIGHTBOX VIEWER -->
      @if (isLightboxOpen() && lightboxPhotos().length > 0) {
        <div class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-fade-in">
          <!-- Backdrop Click to Close -->
          <div (click)="closeLightbox()" class="absolute inset-0 z-0"></div>

          <!-- Close Button (X) -->
          <button 
            (click)="closeLightbox()" 
            class="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-slate-800 transition-all cursor-pointer shadow-2xl">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Counter Indicator -->
          <div class="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/20 text-white text-xs font-mono font-bold shadow-xl flex items-center gap-2 font-cairo">
            <span>\u{1F4F7}</span>
            <span>{{ activeLightboxIndex() + 1 }} / {{ lightboxPhotos().length }}</span>
          </div>

          <!-- Main Image Container -->
          <div class="relative z-10 max-w-5xl max-h-[85vh] flex items-center justify-center p-2">
            <img 
              [src]="lightboxPhotos()[activeLightboxIndex()]" 
              (error)="onImgError($event)" 
              alt="Public Portfolio Photo" 
              class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-slate-800 transition-all duration-200">
          </div>

          <!-- Navigation Arrow Prev (<) & Next (>) -->
          @if (lightboxPhotos().length > 1) {
            <button 
              (click)="prevLightboxPhoto()" 
              class="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-indigo-600 transition-all cursor-pointer shadow-2xl hover:scale-110 active:scale-95">
              <svg class="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              (click)="nextLightboxPhoto()" 
              class="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-indigo-600 transition-all cursor-pointer shadow-2xl hover:scale-110 active:scale-95">
              <svg class="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          }
        </div>
      }

      <!-- CLIENT REVIEWS LEDGER MODAL -->
      @if (isReviewsModalOpen()) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          <div (click)="closeReviewsModal()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"></div>

          <div class="relative z-10 w-full max-w-2xl mx-auto my-auto max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/85 font-sans">
            <!-- Modal Header -->
            <div class="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/95 px-5 py-4 backdrop-blur-sm flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold text-amber-400 tracking-wider uppercase font-cairo">\u0633\u062C\u0644 \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0639\u0645\u0644\u0627\u0621 / Client Reviews Ledger</span>
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
                <div class="space-y-4">
                  @for (rev of reviewsList(); track rev.projectName) {
                    <div class="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 space-y-2.5">
                      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <h4 class="text-sm font-bold text-white font-cairo">{{ rev.clientName || '\u0627\u0644\u0639\u0645\u064A\u0644 \u0627\u0644\u0643\u0631\u064A\u0645' }}</h4>
                          <span class="text-[11px] text-slate-500 font-cairo font-medium">\u0645\u0634\u0631\u0648\u0639: {{ rev.projectName }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                          @for (star of [1,2,3,4,5]; track star) {
                            <span class="text-base" [class.text-amber-400]="star <= rev.ratingScore" [class.text-slate-800]="star > rev.ratingScore">\u2605</span>
                          }
                          <span class="text-[10px] font-mono text-slate-500 ml-1">({{ rev.reviewDate | date:'dd/MM/yyyy' }})</span>
                        </div>
                      </div>
                      
                      @if (rev.comment) {
                        <div class="text-xs text-slate-300 leading-relaxed font-cairo bg-slate-900/30 border border-slate-850 p-3 rounded-lg max-h-36 overflow-y-auto italic">
                          {{ rev.comment }}
                        </div>
                      } @else {
                        <p class="text-[11px] text-slate-600 italic font-cairo bg-slate-900/10 border border-slate-850/40 p-2.5 rounded-lg">\u0644\u0645 \u064A\u062A\u0631\u0643 \u0627\u0644\u0639\u0645\u064A\u0644 \u062A\u0639\u0644\u064A\u0642\u0627\u064B \u0646\u0635\u064A\u0627\u064B.</p>
                      }
                    </div>
                  } @empty {
                    <div class="py-12 text-center text-slate-500 text-sm font-cairo">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u0643\u062A\u0648\u0628\u0629 \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0639\u062F.</div>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      }

      <!-- Footer -->
      <footer class="py-12 border-t border-slate-900 text-center text-slate-600 text-sm">
        <p>{{ 'FOOTER.COPYRIGHT' | translate }}</p>
      </footer>
    </div>
  `, styles: ['/* angular:styles/component:css;08f2e2ceb9d4f09b3c1b237b9c6ec71e9bc78f687db84d8ac0cce078b9bce77a;E:/private/structo/structo/Structo.Client/src/app/features/landing-page/landing-page.component.ts */\n.font-cairo {\n  font-family:\n    "Cairo",\n    "Inter",\n    sans-serif;\n}\n/*# sourceMappingURL=landing-page.component.css.map */\n'] }]
  }], null, { handleKeyboardEvent: [{
    type: HostListener,
    args: ["document:keydown", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LandingPageComponent, { className: "LandingPageComponent", filePath: "src/app/features/landing-page/landing-page.component.ts", lineNumber: 687 });
})();
export {
  LandingPageComponent
};
//# sourceMappingURL=chunk-RXKJSTXX.js.map
