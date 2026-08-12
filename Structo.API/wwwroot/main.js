import {
  extractApiMessage,
  translateErrorMessage
} from "./chunk-FNABJRMO.js";
import {
  RateLimitService
} from "./chunk-53D5K455.js";
import {
  ConfirmModalService
} from "./chunk-2WWLVAKF.js";
import {
  LanguageService
} from "./chunk-V45S3CYS.js";
import {
  TranslateLoader,
  provideTranslateService
} from "./chunk-P67FNHXX.js";
import {
  AuthService
} from "./chunk-S6E5JOGH.js";
import {
  ToastService
} from "./chunk-3XAG2D2P.js";
import {
  Router,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-EJQP67NP.js";
import {
  CommonModule,
  DATE_PIPE_DEFAULT_OPTIONS,
  HttpClient,
  HttpErrorResponse,
  NgClass,
  NgForOf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  environment,
  provideHttpClient,
  withInterceptors
} from "./chunk-FIWEE23C.js";
import {
  Component,
  ErrorHandler,
  Inject,
  Injectable,
  catchError,
  filter,
  inject,
  provideBrowserGlobalErrorListeners,
  setClassMetadata,
  signal,
  switchMap,
  take,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction4,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-ODSQXAQU.js";

// src/app/core/guards/auth.guard.ts
var authGuard = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isAuthenticated()) {
    return router.createUrlTree(["/login"], {
      queryParams: { returnUrl: state.url }
    });
  }
  const currentUser = authService.currentUser();
  const userRole = currentUser?.role;
  const allowedRoles = route.data?.["roles"];
  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    if (userRole === "SuperAdmin") {
      return router.createUrlTree(["/dashboard/overview"]);
    } else {
      return router.createUrlTree(["/dashboard/projects"]);
    }
  }
  return true;
};

// src/app/app.routes.ts
var DashboardRedirectComponent = class _DashboardRedirectComponent {
  auth = inject(AuthService);
  router = inject(Router);
  ngOnInit() {
    const role = this.auth.currentUser()?.role;
    if (role === "SuperAdmin") {
      this.router.navigate(["/dashboard/overview"], { replaceUrl: true });
    } else {
      this.router.navigate(["/dashboard/financials"], { replaceUrl: true });
    }
  }
  static \u0275fac = function DashboardRedirectComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardRedirectComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardRedirectComponent, selectors: [["ng-component"]], decls: 4, vars: 0, consts: [[1, "flex", "items-center", "justify-center", "h-48"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-8", "w-8", "text-indigo-500"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"]], template: function DashboardRedirectComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(1, "svg", 1);
      \u0275\u0275domElement(2, "circle", 2)(3, "path", 3);
      \u0275\u0275domElementEnd()();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardRedirectComponent, [{
    type: Component,
    args: [{
      standalone: true,
      template: `<div class="flex items-center justify-center h-48">
    <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>`
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardRedirectComponent, { className: "DashboardRedirectComponent", filePath: "src/app/app.routes.ts", lineNumber: 16 });
})();
var routes = [
  {
    path: "",
    loadComponent: () => import("./chunk-DNPCV57R.js").then((m) => m.LandingPageComponent)
  },
  {
    path: "login",
    loadComponent: () => import("./chunk-DSDCKPPH.js").then((m) => m.LoginComponent)
  },
  {
    path: "register",
    loadComponent: () => import("./chunk-NUJCYRSN.js").then((m) => m.TenantRegisterComponent)
  },
  {
    path: "dashboard",
    loadComponent: () => import("./chunk-ATFVX3CY.js").then((m) => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: "",
        component: DashboardRedirectComponent
      },
      {
        path: "overview",
        loadComponent: () => import("./chunk-VQAAXFMH.js").then((m) => m.OverviewComponent),
        data: { roles: ["SuperAdmin"] }
      },
      {
        path: "projects",
        loadComponent: () => import("./chunk-ZPUMJGZU.js").then((m) => m.ProjectsComponent),
        data: { roles: ["TenantOwner", "Accountant", "Manager", "SiteEngineer", "DesignEngineer"] }
      },
      {
        path: "projects/:id",
        loadComponent: () => import("./chunk-HDDXCJSJ.js").then((m) => m.ProjectDetailsComponent),
        data: { roles: ["TenantOwner", "Accountant", "Manager", "SiteEngineer", "DesignEngineer"] }
      },
      {
        path: "financials",
        loadComponent: () => import("./chunk-CTDEL54N.js").then((m) => m.FinancialsComponent),
        data: { roles: ["TenantOwner", "Accountant", "Manager", "SiteEngineer", "DesignEngineer"] }
      },
      {
        path: "users",
        loadComponent: () => import("./chunk-ZPUMJGZU.js").then((m) => m.ProjectsComponent),
        data: { roles: ["TenantOwner"] }
      },
      {
        path: "profile",
        loadComponent: () => import("./chunk-WCLC6GDQ.js").then((m) => m.TenantProfileComponent),
        data: { roles: ["TenantOwner"] }
      },
      {
        path: "tenants",
        loadComponent: () => import("./chunk-AWNKU4KL.js").then((m) => m.TenantsComponent),
        data: { roles: ["SuperAdmin"] }
      },
      {
        path: "pending-users",
        loadComponent: () => import("./chunk-7QPSJQ4Y.js").then((m) => m.PendingUsersComponent),
        data: { roles: ["SuperAdmin"] }
      }
    ]
  },
  {
    path: "superadmin/dashboard",
    redirectTo: "dashboard/tenants",
    pathMatch: "full"
  },
  {
    path: "public/project-review/:token",
    loadComponent: () => import("./chunk-BNKCE7MJ.js").then((m) => m.ProjectReviewComponent)
  },
  {
    path: "**",
    redirectTo: ""
  }
];

// src/app/core/interceptors/jwt.interceptor.ts
var jwtInterceptor = (req, next) => {
  const authService = inject(AuthService);
  const toastService = inject(ToastService);
  const router = inject(Router);
  const token = authService.getToken();
  let authReq = req;
  const isApiRequest = req.url.startsWith(environment.apiUrl) || req.url.startsWith("/api") || req.url.includes("/api/");
  if (token && isApiRequest) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(authReq).pipe(catchError((error) => {
    const apiMessage = extractApiMessage(error);
    if (apiMessage === "ACCOUNT_DEACTIVATED" || apiMessage === "REFRESH_TOKEN_EXPIRED") {
      authService.logout();
      const translatedMsg = translateErrorMessage(apiMessage);
      toastService.show("\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u062D\u0633\u0627\u0628", translatedMsg, "error");
      router.navigate(["/login"]);
      return throwError(() => error);
    }
    if (error instanceof HttpErrorResponse && error.status === 401 && !req.url.includes("/auth/refresh") && !req.url.includes("/auth/refresh-token") && !req.url.includes("/auth/login")) {
      return handle401Error(authReq, next, authService, toastService, router);
    }
    return throwError(() => error);
  }));
};
function handle401Error(req, next, authService, toastService, router) {
  if (!authService.isRefreshingToken) {
    authService.isRefreshingToken = true;
    authService.refreshTokenSubject.next(null);
    return authService.refreshToken().pipe(switchMap((response) => {
      authService.isRefreshingToken = false;
      if (response.success && response.data) {
        authService.refreshTokenSubject.next(response.data.token);
        return next(req.clone({
          setHeaders: {
            Authorization: `Bearer ${response.data.token}`
          }
        }));
      } else {
        authService.logout();
        const apiMsg = response.message || "REFRESH_TOKEN_EXPIRED";
        const translatedMsg = translateErrorMessage(apiMsg);
        toastService.show("\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u062D\u0633\u0627\u0628", translatedMsg, "error");
        router.navigate(["/login"]);
        return throwError(() => new Error(translatedMsg));
      }
    }), catchError((err) => {
      authService.isRefreshingToken = false;
      authService.logout();
      const apiMsg = extractApiMessage(err) || "REFRESH_TOKEN_EXPIRED";
      const translatedMsg = translateErrorMessage(apiMsg);
      toastService.show("\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u062D\u0633\u0627\u0628", translatedMsg, "error");
      router.navigate(["/login"]);
      return throwError(() => err);
    }));
  } else {
    return authService.refreshTokenSubject.pipe(filter((token) => token !== null), take(1), switchMap((token) => {
      return next(req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }));
    }));
  }
}

// src/app/core/interceptors/rate-limit.interceptor.ts
var rateLimitInterceptor = (req, next) => {
  const toastService = inject(ToastService);
  const rateLimitService = inject(RateLimitService);
  return next(req).pipe(catchError((error) => {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 429 || error.status === 503) {
        toastService.show("\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0627\u062A \u0627\u0644\u0643\u062B\u064A\u0631\u0629", "\u0644\u0642\u062F \u062A\u062C\u0627\u0648\u0632\u062A \u0639\u062F\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u0645\u0648\u062D\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 \u062F\u0642\u064A\u0642\u0629 \u0642\u0628\u0644 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u062C\u062F\u062F\u0627\u064B.", "warning");
        rateLimitService.startCooldown(60);
      }
    }
    return throwError(() => error);
  }));
};

// node_modules/@ngx-translate/http-loader/fesm2022/ngx-translate-http-loader.mjs
var TranslateHttpLoader = class _TranslateHttpLoader {
  http;
  prefix;
  suffix;
  constructor(http, prefix = "/assets/i18n/", suffix = ".json") {
    this.http = http;
    this.prefix = prefix;
    this.suffix = suffix;
  }
  /**
   * Gets the translations from the server
   */
  getTranslation(lang) {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
  static \u0275fac = function TranslateHttpLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TranslateHttpLoader)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(String), \u0275\u0275inject(String));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _TranslateHttpLoader,
    factory: _TranslateHttpLoader.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslateHttpLoader, [{
    type: Injectable
  }], () => [{
    type: HttpClient
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [String]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [String]
    }]
  }], null);
})();

// src/app/core/services/global-error-handler.service.ts
var GlobalErrorHandlerService = class _GlobalErrorHandlerService {
  handleError(error) {
    const errorMsg = error?.message || error?.toString() || "";
    if (errorMsg.includes("Failed to fetch dynamically imported module") || errorMsg.includes("Loading chunk") || errorMsg.includes("ChunkLoadError")) {
      console.warn("Chunk load/dynamic import error detected. Performing a hard reload to fetch the latest code version...");
      window.location.reload();
      return;
    }
    console.error(error);
  }
  static \u0275fac = function GlobalErrorHandlerService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GlobalErrorHandlerService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GlobalErrorHandlerService, factory: _GlobalErrorHandlerService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GlobalErrorHandlerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/app.config.ts
function HttpLoaderFactory(http) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, rateLimitInterceptor])),
    provideTranslateService({
      defaultLanguage: "ar",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: "dd/MM/yyyy" } },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ]
};

// src/app/core/components/confirm-modal.component.ts
function ConfirmModalComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 13);
    \u0275\u0275domElement(2, "path", 14);
    \u0275\u0275domElementEnd()();
  }
}
function ConfirmModalComponent_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 6);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 15);
    \u0275\u0275domElement(2, "path", 16);
    \u0275\u0275domElementEnd()();
  }
}
function ConfirmModalComponent_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 7);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 17);
    \u0275\u0275domElement(2, "path", 18);
    \u0275\u0275domElementEnd()();
  }
}
function ConfirmModalComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275domListener("click", function ConfirmModalComponent_Conditional_0_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.modal.resolveConfirm(false));
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "div", 2)(3, "div", 3)(4, "div", 4);
    \u0275\u0275conditionalCreate(5, ConfirmModalComponent_Conditional_0_Conditional_5_Template, 3, 0, "div", 5)(6, ConfirmModalComponent_Conditional_0_Conditional_6_Template, 3, 0, "div", 6)(7, ConfirmModalComponent_Conditional_0_Conditional_7_Template, 3, 0, "div", 7);
    \u0275\u0275domElementStart(8, "h3", 8);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "p", 9);
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "div", 10)(13, "button", 11);
    \u0275\u0275domListener("click", function ConfirmModalComponent_Conditional_0_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.modal.resolveConfirm(false));
    });
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "button", 12);
    \u0275\u0275domListener("click", function ConfirmModalComponent_Conditional_0_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.modal.resolveConfirm(true));
    });
    \u0275\u0275text(16);
    \u0275\u0275domElementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.modal.confirmConfig().type === "danger" ? 5 : ctx_r1.modal.confirmConfig().type === "warning" ? 6 : 7);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.modal.confirmConfig().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.modal.confirmConfig().message, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.modal.confirmConfig().cancelText, " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-rose-600", ctx_r1.modal.confirmConfig().type === "danger")("hover:bg-rose-500", ctx_r1.modal.confirmConfig().type === "danger")("bg-amber-600", ctx_r1.modal.confirmConfig().type === "warning")("hover:bg-amber-500", ctx_r1.modal.confirmConfig().type === "warning")("bg-indigo-600", ctx_r1.modal.confirmConfig().type === "info")("hover:bg-indigo-500", ctx_r1.modal.confirmConfig().type === "info");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modal.confirmConfig().confirmText, " ");
  }
}
function ConfirmModalComponent_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 13);
    \u0275\u0275domElement(2, "path", 22);
    \u0275\u0275domElementEnd()();
  }
}
function ConfirmModalComponent_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 19);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 23);
    \u0275\u0275domElement(2, "path", 24);
    \u0275\u0275domElementEnd()();
  }
}
function ConfirmModalComponent_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 7);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 17);
    \u0275\u0275domElement(2, "path", 18);
    \u0275\u0275domElementEnd()();
  }
}
function ConfirmModalComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275domListener("click", function ConfirmModalComponent_Conditional_1_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.modal.resolveAlert());
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "div", 2)(3, "div", 3)(4, "div", 4);
    \u0275\u0275conditionalCreate(5, ConfirmModalComponent_Conditional_1_Conditional_5_Template, 3, 0, "div", 5)(6, ConfirmModalComponent_Conditional_1_Conditional_6_Template, 3, 0, "div", 19)(7, ConfirmModalComponent_Conditional_1_Conditional_7_Template, 3, 0, "div", 7);
    \u0275\u0275domElementStart(8, "h3", 8);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "p", 9);
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "div", 20)(13, "button", 21);
    \u0275\u0275domListener("click", function ConfirmModalComponent_Conditional_1_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.modal.resolveAlert());
    });
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.modal.alertConfig().type === "error" ? 5 : ctx_r1.modal.alertConfig().type === "success" ? 6 : 7);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.modal.alertConfig().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.modal.alertConfig().message, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.modal.alertConfig().buttonText, " ");
  }
}
var ConfirmModalComponent = class _ConfirmModalComponent {
  modal = inject(ConfirmModalService);
  static \u0275fac = function ConfirmModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmModalComponent, selectors: [["app-confirm-modal"]], decls: 2, vars: 2, consts: [[1, "fixed", "inset-0", "z-[999]", "flex", "items-center", "justify-center", "p-2", "sm:p-4", "bg-black/70", "backdrop-blur-sm"], [1, "absolute", "inset-0", 3, "click"], [1, "relative", "w-full", "max-w-lg", "mx-auto", "max-h-[92vh]", "flex", "flex-col", "rounded-2xl", "bg-slate-900", "border", "border-slate-700/60", "shadow-2xl", "transition-all", "z-10", "animate-[scaleIn_0.15s_ease-out]"], [1, "p-4", "sm:p-6", "overflow-y-auto", "min-h-0", "w-full", "flex-1"], [1, "flex", "items-center", "gap-3", "mb-4"], [1, "w-10", "h-10", "rounded-xl", "bg-rose-500/10", "border", "border-rose-500/20", "flex", "items-center", "justify-center", "shrink-0"], [1, "w-10", "h-10", "rounded-xl", "bg-amber-500/10", "border", "border-amber-500/20", "flex", "items-center", "justify-center", "shrink-0"], [1, "w-10", "h-10", "rounded-xl", "bg-indigo-500/10", "border", "border-indigo-500/20", "flex", "items-center", "justify-center", "shrink-0"], [1, "text-lg", "font-bold", "text-white", "leading-tight"], [1, "text-sm", "text-slate-300", "leading-relaxed", "mb-6", "pl-[52px]"], [1, "flex", "items-center", "justify-end", "gap-3"], [1, "px-4", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-slate-400", "hover:text-white", "bg-slate-950", "hover:bg-slate-800", "border", "border-slate-800", "transition-all", "duration-200", "cursor-pointer", 3, "click"], [1, "px-5", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-white", "transition-all", "duration-200", "hover:scale-[1.02]", "active:scale-95", "cursor-pointer", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-rose-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-amber-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-indigo-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "w-10", "h-10", "rounded-xl", "bg-emerald-500/10", "border", "border-emerald-500/20", "flex", "items-center", "justify-center", "shrink-0"], [1, "flex", "items-center", "justify-end"], [1, "px-5", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-white", "bg-indigo-600", "hover:bg-indigo-500", "transition-all", "duration-200", "hover:scale-[1.02]", "active:scale-95", "cursor-pointer", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-emerald-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"]], template: function ConfirmModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ConfirmModalComponent_Conditional_0_Template, 17, 17, "div", 0);
      \u0275\u0275conditionalCreate(1, ConfirmModalComponent_Conditional_1_Template, 15, 4, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.modal.isConfirmOpen() ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.modal.isAlertOpen() ? 1 : -1);
    }
  }, styles: ["\n@keyframes _ngcontent-%COMP%_scaleIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95) translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n/*# sourceMappingURL=confirm-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmModalComponent, [{
    type: Component,
    args: [{ selector: "app-confirm-modal", standalone: true, template: `
    <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 Confirmation Dialog \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
    @if (modal.isConfirmOpen()) {
      <div class="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <!-- Backdrop clickable to dismiss -->
        <div (click)="modal.resolveConfirm(false)" class="absolute inset-0"></div>

        <!-- Modal Panel -->
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="p-4 sm:p-6 overflow-y-auto min-h-0 w-full flex-1">
          <!-- Icon -->
          <div class="flex items-center gap-3 mb-4">
            @if (modal.confirmConfig().type === 'danger') {
              <div class="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            } @else if (modal.confirmConfig().type === 'warning') {
              <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            } @else {
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            }
            <h3 class="text-lg font-bold text-white leading-tight">{{ modal.confirmConfig().title }}</h3>
          </div>

          <!-- Body -->
          <p class="text-sm text-slate-300 leading-relaxed mb-6 pl-[52px]">
            {{ modal.confirmConfig().message }}
          </p>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3">
            <button
              (click)="modal.resolveConfirm(false)"
              class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer">
              {{ modal.confirmConfig().cancelText }}
            </button>
            <button
              (click)="modal.resolveConfirm(true)"
              class="px-5 py-2 text-sm font-semibold rounded-xl text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
              [class.bg-rose-600]="modal.confirmConfig().type === 'danger'"
              [class.hover:bg-rose-500]="modal.confirmConfig().type === 'danger'"
              [class.bg-amber-600]="modal.confirmConfig().type === 'warning'"
              [class.hover:bg-amber-500]="modal.confirmConfig().type === 'warning'"
              [class.bg-indigo-600]="modal.confirmConfig().type === 'info'"
              [class.hover:bg-indigo-500]="modal.confirmConfig().type === 'info'">
              {{ modal.confirmConfig().confirmText }}
            </button>
          </div>
          </div>
        </div>
      </div>
    }

    <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 Alert Dialog \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
    @if (modal.isAlertOpen()) {
      <div class="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <!-- Backdrop clickable to dismiss -->
        <div (click)="modal.resolveAlert()" class="absolute inset-0"></div>

        <!-- Modal Panel -->
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="p-4 sm:p-6 overflow-y-auto min-h-0 w-full flex-1">
          <!-- Icon -->
          <div class="flex items-center gap-3 mb-4">
            @if (modal.alertConfig().type === 'error') {
              <div class="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            } @else if (modal.alertConfig().type === 'success') {
              <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            } @else {
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            }
            <h3 class="text-lg font-bold text-white leading-tight">{{ modal.alertConfig().title }}</h3>
          </div>

          <!-- Body -->
          <p class="text-sm text-slate-300 leading-relaxed mb-6 pl-[52px]">
            {{ modal.alertConfig().message }}
          </p>

          <!-- Dismiss -->
          <div class="flex items-center justify-end">
            <button
              (click)="modal.resolveAlert()"
              class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer">
              {{ modal.alertConfig().buttonText }}
            </button>
          </div>
          </div>
        </div>
      </div>
    }
  `, styles: ["/* angular:styles/component:css;5082ada8b4c92af53b9b455b8cd5876510bc351cd3569079a4ba2f81625e001b;E:/private/structo/structo/Structo.Client/src/app/core/components/confirm-modal.component.ts */\n@keyframes scaleIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95) translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n/*# sourceMappingURL=confirm-modal.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmModalComponent, { className: "ConfirmModalComponent", filePath: "src/app/core/components/confirm-modal.component.ts", lineNumber: 128 });
})();

// src/app/core/components/toast-container.component.ts
var _c0 = (a0, a1, a2, a3) => ({ "bg-slate-900/90 border-indigo-500/30 text-white hover:border-indigo-400": a0, "bg-emerald-950/90 border-emerald-500/30 text-emerald-100 hover:border-emerald-400": a1, "bg-amber-950/90 border-amber-500/30 text-amber-100 hover:border-amber-400": a2, "bg-rose-950/90 border-rose-500/30 text-rose-100 hover:border-rose-400": a3 });
function ToastContainerComponent_div_1__svg_svg_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 15);
    \u0275\u0275element(1, "path", 16);
    \u0275\u0275elementEnd();
  }
}
function ToastContainerComponent_div_1__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 17);
    \u0275\u0275element(1, "path", 18);
    \u0275\u0275elementEnd();
  }
}
function ToastContainerComponent_div_1__svg_svg_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 19);
    \u0275\u0275element(1, "path", 20);
    \u0275\u0275elementEnd();
  }
}
function ToastContainerComponent_div_1__svg_svg_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 21);
    \u0275\u0275element(1, "path", 22);
    \u0275\u0275elementEnd();
  }
}
function ToastContainerComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275listener("click", function ToastContainerComponent_div_1_Template_div_click_0_listener() {
      const toast_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.handleToastClick(toast_r2));
    });
    \u0275\u0275elementStart(1, "div", 3);
    \u0275\u0275elementContainerStart(2, 4);
    \u0275\u0275template(3, ToastContainerComponent_div_1__svg_svg_3_Template, 2, 0, "svg", 5)(4, ToastContainerComponent_div_1__svg_svg_4_Template, 2, 0, "svg", 6)(5, ToastContainerComponent_div_1__svg_svg_5_Template, 2, 0, "svg", 7)(6, ToastContainerComponent_div_1__svg_svg_6_Template, 2, 0, "svg", 8);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 9)(8, "p", 10);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 11);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 12);
    \u0275\u0275listener("click", function ToastContainerComponent_div_1_Template_button_click_12_listener($event) {
      const toast_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.handleClose($event, toast_r2.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 13);
    \u0275\u0275element(14, "path", 14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const toast_r2 = ctx.$implicit;
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(7, _c0, toast_r2.type === "info", toast_r2.type === "success", toast_r2.type === "warning", toast_r2.type === "error"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngSwitch", toast_r2.type);
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "success");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "warning");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "error");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(toast_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(toast_r2.message);
  }
}
var ToastContainerComponent = class _ToastContainerComponent {
  toastService = inject(ToastService);
  handleToastClick(toast) {
    if (toast.onClick) {
      toast.onClick();
    }
    this.toastService.dismiss(toast.id);
  }
  handleClose(event, id) {
    event.stopPropagation();
    this.toastService.dismiss(id);
  }
  static \u0275fac = function ToastContainerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastContainerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ToastContainerComponent, selectors: [["app-toast-container"]], decls: 2, vars: 1, consts: [[1, "fixed", "bottom-5", "right-5", "z-50", "flex", "flex-col", "gap-3", "max-w-sm", "w-full", "pointer-events-none"], ["class", "pointer-events-auto flex items-start p-4 rounded-xl shadow-2xl border backdrop-blur-md cursor-pointer transition-all duration-300 transform translate-y-0 hover:-translate-x-1 hover:shadow-indigo-500/10 active:scale-95 animate-slide-in", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "pointer-events-auto", "flex", "items-start", "p-4", "rounded-xl", "shadow-2xl", "border", "backdrop-blur-md", "cursor-pointer", "transition-all", "duration-300", "transform", "translate-y-0", "hover:-translate-x-1", "hover:shadow-indigo-500/10", "active:scale-95", "animate-slide-in", 3, "click", "ngClass"], [1, "flex-shrink-0", "mr-3"], [3, "ngSwitch"], ["class", "h-5 w-5 text-emerald-400 animate-bounce", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 4, "ngSwitchCase"], ["class", "h-5 w-5 text-amber-400", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 4, "ngSwitchCase"], ["class", "h-5 w-5 text-rose-400 animate-pulse", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 4, "ngSwitchCase"], ["class", "h-5 w-5 text-indigo-400", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 4, "ngSwitchDefault"], [1, "flex-1", "min-w-0"], [1, "text-sm", "font-semibold", "select-none", "leading-snug"], [1, "mt-1", "text-xs", "opacity-80", "leading-relaxed", "select-none"], [1, "flex-shrink-0", "ml-4", "text-slate-400", "hover:text-white", "transition-colors", "duration-150", "focus:outline-none", "cursor-pointer", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5", "text-emerald-400", "animate-bounce"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5", "text-amber-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5", "text-rose-400", "animate-pulse"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5", "text-indigo-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"]], template: function ToastContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, ToastContainerComponent_div_1_Template, 15, 12, "div", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.toastService.toasts());
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault], styles: ["\n@keyframes _ngcontent-%COMP%_slide-in {\n  from {\n    opacity: 0;\n    transform: translateX(20px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0) scale(1);\n  }\n}\n.animate-slide-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slide-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n/*# sourceMappingURL=toast-container.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastContainerComponent, [{
    type: Component,
    args: [{ selector: "app-toast-container", standalone: true, imports: [CommonModule], template: `
    <div class="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <div 
        *ngFor="let toast of toastService.toasts()"
        (click)="handleToastClick(toast)"
        class="pointer-events-auto flex items-start p-4 rounded-xl shadow-2xl border backdrop-blur-md cursor-pointer transition-all duration-300 transform translate-y-0 hover:-translate-x-1 hover:shadow-indigo-500/10 active:scale-95 animate-slide-in"
        [ngClass]="{
          'bg-slate-900/90 border-indigo-500/30 text-white hover:border-indigo-400': toast.type === 'info',
          'bg-emerald-950/90 border-emerald-500/30 text-emerald-100 hover:border-emerald-400': toast.type === 'success',
          'bg-amber-950/90 border-amber-500/30 text-amber-100 hover:border-amber-400': toast.type === 'warning',
          'bg-rose-950/90 border-rose-500/30 text-rose-100 hover:border-rose-400': toast.type === 'error'
        }"
      >
        <!-- Icon -->
        <div class="flex-shrink-0 mr-3">
          <ng-container [ngSwitch]="toast.type">
            <!-- Success Icon -->
            <svg *ngSwitchCase="'success'" class="h-5 w-5 text-emerald-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <!-- Warning Icon -->
            <svg *ngSwitchCase="'warning'" class="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <!-- Error Icon -->
            <svg *ngSwitchCase="'error'" class="h-5 w-5 text-rose-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <!-- Info Icon -->
            <svg *ngSwitchDefault class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </ng-container>
        </div>

        <!-- Body -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold select-none leading-snug">{{ toast.title }}</p>
          <p class="mt-1 text-xs opacity-80 leading-relaxed select-none">{{ toast.message }}</p>
        </div>

        <!-- Close Button -->
        <button 
          (click)="handleClose($event, toast.id)" 
          class="flex-shrink-0 ml-4 text-slate-400 hover:text-white transition-colors duration-150 focus:outline-none cursor-pointer"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;b0b26f286c4eab58259eda3835559154479cecfb891ee52f9e1a092a6002a541;E:/private/structo/structo/Structo.Client/src/app/core/components/toast-container.component.ts */\n@keyframes slide-in {\n  from {\n    opacity: 0;\n    transform: translateX(20px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0) scale(1);\n  }\n}\n.animate-slide-in {\n  animation: slide-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n/*# sourceMappingURL=toast-container.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ToastContainerComponent, { className: "ToastContainerComponent", filePath: "src/app/core/components/toast-container.component.ts", lineNumber: 72 });
})();

// src/app/app.ts
var App = class _App {
  title = signal(
    "\u0623\u064F\u0633\u064F\u0633 / Osos",
    ...ngDevMode ? [{ debugName: "title" }] : (
      /* istanbul ignore next */
      []
    )
  );
  langService = inject(LanguageService);
  authService = inject(AuthService);
  router = inject(Router);
  ngOnInit() {
    this.langService.initLanguage();
  }
  redirectUser(role) {
    if (role === "SuperAdmin") {
      this.router.navigateByUrl("/dashboard/overview");
    } else if (role === "TenantOwner" || role === "Accountant") {
      this.router.navigateByUrl("/dashboard/financials");
    } else {
      this.router.navigateByUrl("/dashboard/projects");
    }
  }
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 3, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet")(1, "app-confirm-modal")(2, "app-toast-container");
    }
  }, dependencies: [RouterOutlet, ConfirmModalComponent, ToastContainerComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet, ConfirmModalComponent, ToastContainerComponent], template: "<router-outlet />\r\n<app-confirm-modal />\r\n<app-toast-container />\r\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 14 });
})();

// src/main.ts
console.log("%c\u{1F680} Osos App Environment Config:", "color: #00ff00; font-weight: bold; font-size: 14px;");
console.log("Is Production:", environment.production);
console.log("API URL Absolute:", environment.apiUrl);
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
