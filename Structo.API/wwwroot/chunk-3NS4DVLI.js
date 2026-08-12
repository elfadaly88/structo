import {
  ERROR_TRANSLATIONS,
  extractApiMessage
} from "./chunk-FNABJRMO.js";
import {
  RateLimitService
} from "./chunk-A6YFNXNO.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  ɵNgNoValidate
} from "./chunk-PRQNVNAF.js";
import {
  TranslatePipe,
  TranslateService
} from "./chunk-2SDLZEQZ.js";
import {
  AuthService
} from "./chunk-CXPACYC7.js";
import {
  ToastService
} from "./chunk-DLHRGTU7.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-YUU7E6C7.js";
import {
  CommonModule,
  environment
} from "./chunk-2FDFRP6Y.js";
import {
  Component,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-EHUV6UVS.js";

// src/app/features/login/login.component.ts
function LoginComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12);
    \u0275\u0275text(2, "\u23F3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 13);
    \u0275\u0275text(4, "\u062A\u0633\u062C\u064A\u0644 \u0646\u0627\u062C\u062D \u0648\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 / Successfully Registered");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 14);
    \u0275\u0275text(6, " Successfully registered via Google! Your account is currently pending SuperAdmin approval. You will receive an email notification once activated. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 15)(8, "a", 16);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 1, "LOGIN.RETURN_HOME"), " ");
  }
}
function LoginComponent_Conditional_19_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 46);
    \u0275\u0275element(2, "path", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function LoginComponent_Conditional_19_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "LOGIN.USERNAME_REQ"), " ");
  }
}
function LoginComponent_Conditional_19_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 27);
    \u0275\u0275element(1, "path", 48);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_19_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 27);
    \u0275\u0275element(1, "path", 49)(2, "path", 50);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_19_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "LOGIN.PASSWORD_REQ"), " ");
  }
}
function LoginComponent_Conditional_19_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 51);
    \u0275\u0275element(2, "circle", 52)(3, "path", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 (", ctx_r1.rateLimitService.cooldownSeconds(), " \u062B\u0627\u0646\u064A\u0629)");
  }
}
function LoginComponent_Conditional_19_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 54);
    \u0275\u0275element(1, "circle", 52)(2, "path", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 1, "LOGIN.SIGNING_IN"), " ");
  }
}
function LoginComponent_Conditional_19_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "LOGIN.SIGN_IN"), " ");
  }
}
function LoginComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, LoginComponent_Conditional_19_Conditional_0_Template, 5, 1, "div", 17);
    \u0275\u0275elementStart(1, "form", 18);
    \u0275\u0275listener("ngSubmit", function LoginComponent_Conditional_19_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(2, "div")(3, "label", 19);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 20);
    \u0275\u0275element(7, "input", 21);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, LoginComponent_Conditional_19_Conditional_9_Template, 3, 3, "p", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div")(11, "label", 23);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 24);
    \u0275\u0275element(15, "input", 25);
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(16, "button", 26);
    \u0275\u0275listener("click", function LoginComponent_Conditional_19_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglePasswordVisibility());
    });
    \u0275\u0275conditionalCreate(17, LoginComponent_Conditional_19_Conditional_17_Template, 2, 0, ":svg:svg", 27)(18, LoginComponent_Conditional_19_Conditional_18_Template, 3, 0, ":svg:svg", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(19, LoginComponent_Conditional_19_Conditional_19_Template, 3, 3, "p", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 28)(21, "div", 29);
    \u0275\u0275element(22, "input", 30);
    \u0275\u0275elementStart(23, "label", 31);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 32)(27, "a", 33);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div")(31, "button", 34);
    \u0275\u0275conditionalCreate(32, LoginComponent_Conditional_19_Conditional_32_Template, 6, 1, "div", 35)(33, LoginComponent_Conditional_19_Conditional_33_Template, 5, 3)(34, LoginComponent_Conditional_19_Conditional_34_Template, 2, 3);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 36)(36, "div", 37);
    \u0275\u0275element(37, "div", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 39)(39, "span", 40);
    \u0275\u0275text(40, "Or registration by / \u0623\u0648 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "div", 41);
    \u0275\u0275element(42, "div", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 43)(44, "p", 44);
    \u0275\u0275text(45, " Don't have an account? ");
    \u0275\u0275elementStart(46, "a", 45);
    \u0275\u0275text(47, " Register your tenant/company here ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.errorMessage() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.loginForm);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 17, "LOGIN.USERNAME_LABEL"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("border-red-500", ctx_r1.isFieldInvalid("email"));
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(8, 19, "LOGIN.USERNAME_PLACEHOLDER"));
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isFieldInvalid("email") ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 21, "LOGIN.PASSWORD_LABEL"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("border-red-500", ctx_r1.isFieldInvalid("password"));
    \u0275\u0275property("type", ctx_r1.showPassword() ? "text" : "password");
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showPassword() ? 17 : 18);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isFieldInvalid("password") ? 19 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(25, 23, "LOGIN.REMEMBER_ME"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(29, 25, "LOGIN.FORGOT_PASSWORD"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.loginForm.invalid || ctx_r1.isLoading() || ctx_r1.rateLimitService.isLockedOut());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.rateLimitService.isLockedOut() ? 32 : ctx_r1.isLoading() ? 33 : 34);
  }
}
var LoginComponent = class _LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  rateLimitService = inject(RateLimitService);
  translateService = inject(TranslateService);
  toastService = inject(ToastService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  loginForm = this.fb.group({
    email: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });
  isLoading = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showPassword = signal(
    false,
    ...ngDevMode ? [{ debugName: "showPassword" }] : (
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
  registrationPending = signal(
    false,
    ...ngDevMode ? [{ debugName: "registrationPending" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedPlan = "Free";
  isGisInitialized = false;
  ngOnInit() {
    if (typeof window !== "undefined") {
      if (window.google?.accounts?.id) {
        this.initGoogleGis();
      } else {
        const checkGis = setInterval(() => {
          if (window.google?.accounts?.id) {
            clearInterval(checkGis);
            this.initGoogleGis();
          }
        }, 100);
        setTimeout(() => clearInterval(checkGis), 5e3);
      }
    }
  }
  initGoogleGis() {
    if (this.isGisInitialized)
      return;
    const google = window.google;
    if (google && google.accounts && google.accounts.id) {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response) => this.handleGoogleCredential(response.credential),
        auto_select: false,
        itp_support: true
      });
      this.isGisInitialized = true;
      this.renderGoogleButton();
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          console.warn("Google One Tap not displayed:", notification.getNotDisplayedReason());
        } else if (notification.isSkippedMoment()) {
          console.warn("Google One Tap skipped:", notification.getSkippedReason());
        } else if (notification.isDismissedMoment()) {
          console.warn("Google One Tap dismissed:", notification.getDismissedReason());
        }
      });
    }
  }
  renderGoogleButton() {
    const google = window.google;
    if (!google || !google.accounts || !google.accounts.id)
      return;
    const renderOptions = {
      theme: "filled_black",
      size: "large",
      type: "standard",
      shape: "rectangular",
      text: "signin_with",
      logo_alignment: "left",
      width: 380
    };
    const btn = document.getElementById("googleBtn");
    if (btn) {
      google.accounts.id.renderButton(btn, renderOptions);
    } else {
      const interval = setInterval(() => {
        const dynamicBtn = document.getElementById("googleBtn");
        if (dynamicBtn) {
          clearInterval(interval);
          google.accounts.id.renderButton(dynamicBtn, renderOptions);
        }
      }, 50);
      setTimeout(() => clearInterval(interval), 5e3);
    }
  }
  loginWithGoogle() {
    const google = window.google;
    if (google && google.accounts && google.accounts.id) {
      if (!this.isGisInitialized) {
        this.initGoogleGis();
      }
      google.accounts.id.prompt();
    } else {
      this.initGoogleGis();
    }
  }
  onGoogleLogin() {
    this.loginWithGoogle();
  }
  handleGoogleCredential(credential) {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.authService.googleLogin(credential, this.selectedPlan).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success && response.data) {
          const returnUrl = this.route.snapshot.queryParams["returnUrl"];
          this.redirectUser(response.data.role, returnUrl);
        } else {
          this.handleAuthErrorMessage(response.message || "LOGIN.FAILED");
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 429 || err.status === 503) {
          this.errorMessage.set(null);
          this.rateLimitService.startCooldown(60);
          return;
        }
        const apiMessage = extractApiMessage(err);
        this.handleAuthErrorMessage(apiMessage);
      }
    });
  }
  handleAuthErrorMessage(rawMsg) {
    if (!rawMsg) {
      this.errorMessage.set(this.translateService.instant("LOGIN.FAILED"));
      return;
    }
    if (rawMsg === "ACCOUNT_PENDING_APPROVAL") {
      this.errorMessage.set(null);
      this.registrationPending.set(true);
      return;
    }
    const mappedMsg = ERROR_TRANSLATIONS[rawMsg];
    if (mappedMsg) {
      this.errorMessage.set(mappedMsg);
      this.toastService.show("\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u062D\u0633\u0627\u0628", mappedMsg, rawMsg === "ACCOUNT_DEACTIVATED" || rawMsg === "REFRESH_TOKEN_EXPIRED" ? "error" : "warning");
      if (rawMsg === "ACCOUNT_DEACTIVATED" || rawMsg === "REFRESH_TOKEN_EXPIRED") {
        this.authService.logout();
        if (this.router.url !== "/login") {
          this.router.navigate(["/login"]);
        }
      }
      return;
    }
    if (rawMsg === "ACCOUNT_PENDING_OR_INACTIVE" || rawMsg === "AUTH.ACCOUNT_PENDING_OR_INACTIVE") {
      const translated2 = this.translateService.instant("AUTH.ACCOUNT_PENDING_OR_INACTIVE");
      const friendlyMsg = translated2 && translated2 !== "AUTH.ACCOUNT_PENDING_OR_INACTIVE" ? translated2 : "\u26A0\uFE0F \u062D\u0633\u0627\u0628\u0643 \u0642\u064A\u062F \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0623\u0648 \u063A\u064A\u0631 \u0646\u0634\u0637 \u062D\u0627\u0644\u064A\u0627\u064B.";
      this.errorMessage.set(friendlyMsg);
      this.toastService.show("\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u062D\u0633\u0627\u0628", friendlyMsg, "warning");
      return;
    }
    if (typeof rawMsg === "string" && rawMsg.startsWith("\u26A0\uFE0F")) {
      this.errorMessage.set(rawMsg);
      this.toastService.show("\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u062D\u0633\u0627\u0628", rawMsg, "warning");
      return;
    }
    if (typeof rawMsg === "string" && (rawMsg.includes("Http failure") || rawMsg.includes("status 503") || rawMsg.includes("status 429"))) {
      this.errorMessage.set(null);
      return;
    }
    let translated = this.translateService.instant(rawMsg);
    if (translated === rawMsg && typeof rawMsg === "string" && !rawMsg.includes(".")) {
      const authPrefixed = this.translateService.instant(`AUTH.${rawMsg}`);
      if (authPrefixed !== `AUTH.${rawMsg}`) {
        translated = authPrefixed;
      }
    }
    const finalMsg = translated && translated !== rawMsg ? translated : rawMsg;
    this.errorMessage.set(finalMsg);
    if (finalMsg && typeof finalMsg === "string" && finalMsg.length < 150) {
      this.toastService.show("\u062A\u0646\u0628\u064A\u0647 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644", finalMsg, "warning");
    }
  }
  redirectUser(role, returnUrl) {
    if (returnUrl && returnUrl !== "/dashboard" && returnUrl !== "/") {
      this.router.navigateByUrl(returnUrl);
      return;
    }
    if (role === "SuperAdmin") {
      this.router.navigateByUrl("/dashboard/overview");
    } else if (role === "TenantOwner" || role === "Accountant") {
      this.router.navigateByUrl("/dashboard/financials");
    } else {
      this.router.navigateByUrl("/dashboard/projects");
    }
  }
  togglePasswordVisibility() {
    this.showPassword.update((v) => !v);
  }
  isFieldInvalid(fieldName) {
    const field = this.loginForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }
  onSubmit() {
    if (this.loginForm.invalid || this.rateLimitService.isLockedOut()) {
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success && response.data) {
          const returnUrl = this.route.snapshot.queryParams["returnUrl"];
          this.redirectUser(response.data.role, returnUrl);
        } else {
          this.handleAuthErrorMessage(response.message || "LOGIN.FAILED");
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 429 || err.status === 503) {
          this.errorMessage.set(null);
          this.rateLimitService.startCooldown(60);
          return;
        }
        const apiMessage = extractApiMessage(err);
        this.handleAuthErrorMessage(apiMessage);
      }
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 20, vars: 13, consts: [[1, "min-h-screen", "bg-slate-950", "flex", "flex-col", "justify-center", "py-12", "sm:px-6", "lg:px-8", "relative", "overflow-hidden"], [1, "absolute", "top-1/4", "left-1/2", "-translate-x-1/2", "-translate-y-1/2", "w-[400px]", "h-[400px]", "bg-indigo-500/10", "rounded-full", "blur-[100px]", "pointer-events-none"], [1, "absolute", "bottom-1/4", "right-1/4", "w-[300px]", "h-[300px]", "bg-pink-500/5", "rounded-full", "blur-[100px]", "pointer-events-none"], [1, "sm:mx-auto", "sm:w-full", "sm:max-w-md", "z-10"], [1, "flex", "justify-center"], ["src", "assets/images/default-tenant-logo.png", 1, "h-14", "w-auto", "object-contain", 3, "alt"], [1, "mt-6", "text-center", "text-3xl", "font-extrabold", "text-white", "tracking-tight"], [1, "mt-2", "text-center", "text-sm", "text-slate-400"], ["routerLink", "/", 1, "font-medium", "text-indigo-400", "hover:text-indigo-300", "transition-colors", "duration-200"], [1, "mt-8", "sm:mx-auto", "sm:w-full", "sm:max-w-md", "z-10", "px-4"], [1, "bg-slate-900/50", "backdrop-blur-md", "py-8", "px-4", "border", "border-slate-800/80", "shadow-2xl", "sm:rounded-2xl", "sm:px-10"], [1, "rounded-2xl", "bg-indigo-500/10", "border", "border-indigo-500/20", "p-6", "text-slate-200", "text-center", "font-cairo", "shadow-lg", "shadow-indigo-500/5", "space-y-4"], [1, "text-4xl"], [1, "text-lg", "font-bold", "text-white"], [1, "text-sm", "text-slate-300", "leading-relaxed", "font-semibold"], [1, "pt-2"], ["routerLink", "/", 1, "text-indigo-400", "hover:text-indigo-300", "font-semibold", "text-sm", "transition-colors"], [1, "mb-6", "rounded-lg", "bg-red-500/10", "border", "border-red-500/30", "p-4", "text-sm", "text-red-400", "flex", "items-start", "space-x-3", "rtl:space-x-reverse"], [1, "space-y-6", 3, "ngSubmit", "formGroup"], ["for", "email", 1, "block", "text-sm", "font-semibold", "text-slate-300"], [1, "mt-1"], ["id", "email", "type", "text", "formControlName", "email", "autocomplete", "username", "required", "", 1, "appearance-none", "block", "w-full", "px-3", "py-2.5", "border", "border-slate-800", "bg-slate-950/80", "rounded-xl", "placeholder-slate-600", "text-slate-200", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "sm:text-sm", 3, "placeholder"], [1, "mt-1", "text-xs", "text-red-400"], ["for", "password", 1, "block", "text-sm", "font-semibold", "text-slate-300"], [1, "mt-1", "relative"], ["id", "password", "formControlName", "password", "autocomplete", "current-password", "required", "", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "appearance-none", "block", "w-full", "pl-3", "pr-10", "py-2.5", "border", "border-slate-800", "bg-slate-950/80", "rounded-xl", "placeholder-slate-600", "text-slate-200", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "sm:text-sm", 3, "type"], ["type", "button", 1, "absolute", "inset-y-0", "right-0", "pr-3", "flex", "items-center", "text-slate-500", "hover:text-slate-300", "focus:outline-none", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5"], [1, "flex", "items-center", "justify-between", "text-sm"], [1, "flex", "items-center"], ["id", "remember-me", "type", "checkbox", 1, "h-4", "w-4", "text-indigo-600", "focus:ring-indigo-500/20", "border-slate-800", "bg-slate-950", "rounded"], ["for", "remember-me", 1, "ml-2", "rtl:mr-2", "rtl:ml-0", "block", "text-slate-400"], [1, "text-sm"], ["href", "#", 1, "font-medium", "text-indigo-400", "hover:text-indigo-300", "transition-colors", "duration-200"], ["type", "submit", 1, "w-full", "flex", "justify-center", "py-3", "px-4", "border", "border-transparent", "rounded-xl", "shadow-lg", "text-sm", "font-semibold", "text-white", "bg-indigo-600", "hover:bg-indigo-700", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-indigo-500", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "duration-200", "shadow-indigo-600/20", "hover:scale-[1.02]", "active:scale-[0.98]", "cursor-pointer", 3, "disabled"], [1, "flex", "items-center", "space-x-2", "rtl:space-x-reverse", "text-amber-300", "font-bold"], [1, "relative", "my-6"], ["aria-hidden", "true", 1, "absolute", "inset-0", "flex", "items-center"], [1, "w-full", "border-t", "border-slate-800"], [1, "relative", "flex", "justify-center", "text-xs"], [1, "px-2", "bg-slate-900", "text-slate-400"], [1, "w-full", "mt-2", "flex", "justify-center", "items-center", "min-h-[44px]"], ["id", "googleBtn", 1, "w-full", "flex", "justify-center"], [1, "mt-6", "text-center"], [1, "text-sm", "text-slate-400"], ["routerLink", "/register", 1, "font-semibold", "text-indigo-400", "hover:text-indigo-300", "hover:underline", "transition-colors", "duration-200"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5", "shrink-0", "mt-0.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"], ["fill", "none", "viewBox", "0 0 24 24", 1, "h-4", "w-4", "animate-spin"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "-ml-1", "mr-3", "rtl:ml-3", "rtl:mr-1", "h-5", "w-5", "text-white"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "div", 1)(2, "div", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "div", 4);
      \u0275\u0275element(5, "img", 5);
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "h2", 6);
      \u0275\u0275text(8);
      \u0275\u0275pipe(9, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p", 7);
      \u0275\u0275text(11);
      \u0275\u0275pipe(12, "translate");
      \u0275\u0275elementStart(13, "a", 8);
      \u0275\u0275text(14);
      \u0275\u0275pipe(15, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 9)(17, "div", 10);
      \u0275\u0275conditionalCreate(18, LoginComponent_Conditional_18_Template, 11, 3, "div", 11)(19, LoginComponent_Conditional_19_Template, 48, 27);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("alt", \u0275\u0275pipeBind1(6, 5, "NAV.LOGO_ALT"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(9, 7, "LOGIN.TITLE"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(12, 9, "LOGIN.SUBTITLE"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(15, 11, "LOGIN.RETURN_HOME"), " ");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.registrationPending() ? 18 : 19);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, FormGroupDirective, FormControlName, FormsModule, RouterLink, TranslatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{
      selector: "app-login",
      standalone: true,
      imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, TranslatePipe],
      template: `
    <div class="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <!-- Glow background -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <!-- Logo -->
        <div class="flex justify-center">
          <img src="assets/images/default-tenant-logo.png" [alt]="'NAV.LOGO_ALT' | translate" class="h-14 w-auto object-contain">
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
          {{ 'LOGIN.TITLE' | translate }}
        </h2>
        <p class="mt-2 text-center text-sm text-slate-400">
          {{ 'LOGIN.SUBTITLE' | translate }}
          <a routerLink="/" class="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
            {{ 'LOGIN.RETURN_HOME' | translate }}
          </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div class="bg-slate-900/50 backdrop-blur-md py-8 px-4 border border-slate-800/80 shadow-2xl sm:rounded-2xl sm:px-10">
          
          <!-- Registration Pending Card -->
          @if (registrationPending()) {
            <div class="rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-6 text-slate-200 text-center font-cairo shadow-lg shadow-indigo-500/5 space-y-4">
              <div class="text-4xl">\u23F3</div>
              <h3 class="text-lg font-bold text-white">\u062A\u0633\u062C\u064A\u0644 \u0646\u0627\u062C\u062D \u0648\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 / Successfully Registered</h3>
              <p class="text-sm text-slate-300 leading-relaxed font-semibold">
                Successfully registered via Google! Your account is currently pending SuperAdmin approval. You will receive an email notification once activated.
              </p>
              <div class="pt-2">
                <a routerLink="/" class="text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors">
                  {{ 'LOGIN.RETURN_HOME' | translate }}
                </a>
              </div>
            </div>
          } @else {
            <!-- Error Alert -->
            @if (errorMessage()) {
              <div class="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-400 flex items-start space-x-3 rtl:space-x-reverse">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{{ errorMessage() }}</span>
              </div>
            }

            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- Username Field -->
              <div>
                <label for="email" class="block text-sm font-semibold text-slate-300">
                  {{ 'LOGIN.USERNAME_LABEL' | translate }}
                </label>
                <div class="mt-1">
                  <input
                    id="email"
                    type="text"
                    formControlName="email"
                    autocomplete="username"
                    required
                    class="appearance-none block w-full px-3 py-2.5 border border-slate-800 bg-slate-950/80 rounded-xl placeholder-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 sm:text-sm"
                    [class.border-red-500]="isFieldInvalid('email')"
                    [placeholder]="'LOGIN.USERNAME_PLACEHOLDER' | translate"
                  />
                </div>
                @if (isFieldInvalid('email')) {
                  <p class="mt-1 text-xs text-red-400">
                    {{ 'LOGIN.USERNAME_REQ' | translate }}
                  </p>
                }
              </div>

              <!-- Password Field -->
              <div>
                <label for="password" class="block text-sm font-semibold text-slate-300">
                  {{ 'LOGIN.PASSWORD_LABEL' | translate }}
                </label>
                <div class="mt-1 relative">
                  <input
                    id="password"
                    [type]="showPassword() ? 'text' : 'password'"
                    formControlName="password"
                    autocomplete="current-password"
                    required
                    class="appearance-none block w-full pl-3 pr-10 py-2.5 border border-slate-800 bg-slate-950/80 rounded-xl placeholder-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 sm:text-sm"
                    [class.border-red-500]="isFieldInvalid('password')"
                    placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  />
                  <button
                    type="button"
                    (click)="togglePasswordVisibility()"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none"
                  >
                    @if (showPassword()) {
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    } @else {
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    }
                  </button>
                </div>
                @if (isFieldInvalid('password')) {
                  <p class="mt-1 text-xs text-red-400">
                    {{ 'LOGIN.PASSWORD_REQ' | translate }}
                  </p>
                }
              </div>

              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500/20 border-slate-800 bg-slate-950 rounded"
                  />
                  <label for="remember-me" class="ml-2 rtl:mr-2 rtl:ml-0 block text-slate-400">
                    {{ 'LOGIN.REMEMBER_ME' | translate }}
                  </label>
                </div>
                <div class="text-sm">
                  <a href="#" class="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                    {{ 'LOGIN.FORGOT_PASSWORD' | translate }}
                  </a>
                </div>
              </div>

              <!-- Submit Button -->
              <div>
                <button
                  type="submit"
                  [disabled]="loginForm.invalid || isLoading() || rateLimitService.isLockedOut()"
                  class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  @if (rateLimitService.isLockedOut()) {
                    <div class="flex items-center space-x-2 rtl:space-x-reverse text-amber-300 font-bold">
                      <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>\u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 ({{ rateLimitService.cooldownSeconds() }} \u062B\u0627\u0646\u064A\u0629)</span>
                    </div>
                  } @else if (isLoading()) {
                    <svg class="animate-spin -ml-1 mr-3 rtl:ml-3 rtl:mr-1 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ 'LOGIN.SIGNING_IN' | translate }}
                  } @else {
                    {{ 'LOGIN.SIGN_IN' | translate }}
                  }
                </button>
              </div>
            </form>

            <!-- Divider -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-slate-800"></div>
              </div>
              <div class="relative flex justify-center text-xs">
                <span class="px-2 bg-slate-900 text-slate-400">Or registration by / \u0623\u0648 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0628\u0648\u0627\u0633\u0637\u0629</span>
              </div>
            </div>

            <!-- Google Sign In Button Container -->
            <div class="w-full mt-2 flex justify-center items-center min-h-[44px]">
              <div id="googleBtn" class="w-full flex justify-center"></div>
            </div>

            <!-- Public Registration Link -->
            <div class="mt-6 text-center">
              <p class="text-sm text-slate-400">
                Don't have an account? 
                <a routerLink="/register" class="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200">
                  Register your tenant/company here
                </a>
              </p>
            </div>

          }
        </div>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/login/login.component.ts", lineNumber: 208 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-3NS4DVLI.js.map
