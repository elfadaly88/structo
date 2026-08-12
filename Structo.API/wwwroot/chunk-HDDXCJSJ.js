import {
  FinancialService,
  PettyCashService
} from "./chunk-54BPY3KT.js";
import {
  ProjectCloseoutService
} from "./chunk-7LRVYSY5.js";
import {
  OfflineSyncService,
  TenantUserService
} from "./chunk-QA7CAYAB.js";
import {
  ProjectService
} from "./chunk-VJYDUSS5.js";
import {
  takeUntilDestroyed
} from "./chunk-PAGAL465.js";
import {
  ConfirmModalService
} from "./chunk-2WWLVAKF.js";
import {
  WhatsAppLinkService
} from "./chunk-EPE62D22.js";
import {
  LanguageService
} from "./chunk-V45S3CYS.js";
import {
  ImageUploadService
} from "./chunk-53BJWY4X.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormArrayName,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-BKICS27Q.js";
import {
  TenantProfileService
} from "./chunk-FTG4CJWM.js";
import {
  TranslatePipe
} from "./chunk-P67FNHXX.js";
import {
  AuthService
} from "./chunk-S6E5JOGH.js";
import "./chunk-3XAG2D2P.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-EJQP67NP.js";
import {
  DatePipe,
  DecimalPipe,
  HttpClient,
  environment
} from "./chunk-FIWEE23C.js";
import {
  Component,
  DestroyRef,
  HostListener,
  Injectable,
  __spreadProps,
  __spreadValues,
  computed,
  firstValueFrom,
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
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-ODSQXAQU.js";

// src/app/core/services/settlement.service.ts
var SettlementService = class _SettlementService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/projects`;
  getSettlements(projectId) {
    return this.http.get(`${this.baseUrl}/${projectId}/settlements`);
  }
  createSettlement(projectId, dto) {
    return this.http.post(`${this.baseUrl}/${projectId}/settlements`, dto);
  }
  approveSettlement(projectId, id) {
    return this.http.post(`${this.baseUrl}/${projectId}/settlements/${id}/approve`, {});
  }
  confirmRefund(projectId, id) {
    return this.http.post(`${this.baseUrl}/${projectId}/settlements/${id}/confirm-refund`, {});
  }
  rejectSettlement(projectId, id, comments) {
    return this.http.post(`${this.baseUrl}/${projectId}/settlements/${id}/reject`, { comments });
  }
  static \u0275fac = function SettlementService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettlementService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SettlementService, factory: _SettlementService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettlementService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/dashboard/projects/project-details.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.userId;
function ProjectDetailsComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "span", 9);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 54);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 8)(9, "span", 9);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "h3", 55);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 8)(17, "span", 9);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "h3", 56);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 13, "DETAILS.TOTAL_INCOME"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(6, 15, ctx_r0.totalIncome(), "1.2-2"), " ", \u0275\u0275pipeBind1(7, 18, "COMMON.CURRENCY"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 20, "DETAILS.TOTAL_EXPENSES"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(14, 22, ctx_r0.totalExpenses(), "1.2-2"), " ", \u0275\u0275pipeBind1(15, 25, "COMMON.CURRENCY"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(19, 27, "DETAILS.NET_BALANCE"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-emerald-400", ctx_r0.netBalance() >= 0)("text-rose-400", ctx_r0.netBalance() < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(22, 29, ctx_r0.netBalance(), "1.2-2"), " ", \u0275\u0275pipeBind1(23, 32, "COMMON.CURRENCY"), " ");
  }
}
function ProjectDetailsComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r0.project().name, " ");
  }
}
function ProjectDetailsComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "DETAILS.LOADING_PROJECT"));
  }
}
function ProjectDetailsComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "DETAILS.PROJECT_NOT_FOUND"));
  }
}
function ProjectDetailsComponent_Conditional_23_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "PROJECTS.STATUS.ACTIVE"), " ");
  }
}
function ProjectDetailsComponent_Conditional_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "PROJECTS.STATUS_CLOSED"), " ");
  }
}
function ProjectDetailsComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProjectDetailsComponent_Conditional_23_Conditional_0_Template, 3, 3, "span", 57)(1, ProjectDetailsComponent_Conditional_23_Conditional_1_Template, 3, 3, "span", 58);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.project().isActive ? 0 : 1);
  }
}
function ProjectDetailsComponent_Conditional_24_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" - ", ctx_r0.project().cityOrZone, " ");
  }
}
function ProjectDetailsComponent_Conditional_24_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, ProjectDetailsComponent_Conditional_24_Conditional_1_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F4CD} ", ctx_r0.project().governorate, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.project().cityOrZone ? 2 : -1);
  }
}
function ProjectDetailsComponent_Conditional_24_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F3E0} \u0633\u0643\u0646\u064A ");
  }
}
function ProjectDetailsComponent_Conditional_24_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F3E2} \u0625\u062F\u0627\u0631\u064A ");
  }
}
function ProjectDetailsComponent_Conditional_24_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 61);
    \u0275\u0275conditionalCreate(3, ProjectDetailsComponent_Conditional_24_Conditional_2_Conditional_3_Template, 1, 0)(4, ProjectDetailsComponent_Conditional_24_Conditional_2_Conditional_4_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.project().propertyType === "Residential" ? 3 : 4);
  }
}
function ProjectDetailsComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275conditionalCreate(1, ProjectDetailsComponent_Conditional_24_Conditional_1_Template, 3, 2, "span", 59);
    \u0275\u0275conditionalCreate(2, ProjectDetailsComponent_Conditional_24_Conditional_2_Template, 5, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.project().governorate ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.project().propertyType ? 2 : -1);
  }
}
function ProjectDetailsComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 62)(2, "span", 63);
    \u0275\u0275element(3, "span", 64);
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "\u0625\u0638\u0647\u0627\u0631 \u0641\u064A \u0627\u0644\u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0639\u0627\u0645");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "label", 65)(7, "input", 66);
    \u0275\u0275listener("change", function ProjectDetailsComponent_Conditional_25_Template_input_change_7_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.togglePublicVisibility($event.target.checked));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "div", 67);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 68);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_25_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openInjectModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 69);
    \u0275\u0275element(11, "path", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classProp("bg-emerald-400", ctx_r0.isPublicPortfolio())("bg-slate-600", !ctx_r0.isPublicPortfolio());
    \u0275\u0275advance(4);
    \u0275\u0275property("checked", ctx_r0.isPublicPortfolio())("disabled", ctx_r0.isSavingProjectSettings());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.project()?.status === "Closed");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("+ ", \u0275\u0275pipeBind1(14, 8, "DETAILS.INJECT_CAPITAL"));
  }
}
function ProjectDetailsComponent_Conditional_26_Conditional_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 80);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_26_Conditional_7_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openReviseBudgetModal());
    });
    \u0275\u0275text(1, " \u062A\u0639\u062F\u064A\u0644 \u270F\uFE0F ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.project()?.status === "Closed");
  }
}
function ProjectDetailsComponent_Conditional_26_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "div", 76)(2, "span", 77);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ProjectDetailsComponent_Conditional_26_Conditional_7_Conditional_5_Template, 2, 1, "button", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 79);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 4, "PROJECTS.TABLE_BUDGET"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isOwnerOrAccountant() ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(8, 6, ctx_r0.parsedBudget(), "1.0-0"), " ", \u0275\u0275pipeBind1(9, 9, "COMMON.CURRENCY"));
  }
}
function ProjectDetailsComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 71)(2, "span", 72);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 73);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, ProjectDetailsComponent_Conditional_26_Conditional_7_Template, 10, 11, "div", 71);
    \u0275\u0275elementStart(8, "div", 74)(9, "span", 72);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 75);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 8, "PROJECTS.TABLE_CLIENT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.parsedClient() || "N/A");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isEngineer() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("sm:col-span-2", ctx_r0.isEngineer());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 10, "DETAILS.SCOPE_DESC"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r0.parsedDescription());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.parsedDescription() || \u0275\u0275pipeBind1(14, 12, "PROJECTS.NO_DESCRIPTION"));
  }
}
function ProjectDetailsComponent_Conditional_27_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 83);
    \u0275\u0275element(1, "path", 87);
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_27_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 84);
    \u0275\u0275element(1, "path", 88);
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81)(1, "div", 82);
    \u0275\u0275conditionalCreate(2, ProjectDetailsComponent_Conditional_27_Conditional_2_Template, 2, 0, ":svg:svg", 83)(3, ProjectDetailsComponent_Conditional_27_Conditional_3_Template, 2, 0, ":svg:svg", 84);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "p", 85);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 86);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("border-amber-500", ctx_r0.project().status === "FinancialFreeze")("bg-amber-500/5", ctx_r0.project().status === "FinancialFreeze")("border-slate-700", ctx_r0.project().status === "Closed")("bg-slate-900/40", ctx_r0.project().status === "Closed");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.project().status === "FinancialFreeze" ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("text-amber-300", ctx_r0.project().status === "FinancialFreeze")("text-slate-300", ctx_r0.project().status === "Closed");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.project().status === "FinancialFreeze" ? "\u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0641\u064A \u0648\u0636\u0639 \u0627\u0644\u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0645\u0627\u0644\u064A \u2014 \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0642\u062F\u064A\u0645 \u0637\u0644\u0628\u0627\u062A \u062C\u062F\u064A\u062F\u0629" : "\u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u063A\u0644\u0642 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0645\u062D\u0638\u0648\u0631\u0629", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.project().status === "FinancialFreeze" ? "\u062A\u0645 \u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0631\u0633\u0645\u064A." : "\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0634\u0643\u0644 \u0646\u0647\u0627\u0626\u064A. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0641\u0648\u0638\u0629 \u0644\u0644\u062A\u062F\u0642\u064A\u0642.");
  }
}
function ProjectDetailsComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 89)(2, "div", 90);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 91);
    \u0275\u0275element(4, "path", 92);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div")(6, "h4", 93);
    \u0275\u0275text(7, "\u0631\u0627\u0628\u0637 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0644\u0644\u0639\u0645\u064A\u0644 / Client Review Link");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 94);
    \u0275\u0275text(9, "\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0646\u062C\u0627\u062D. \u0623\u0631\u0633\u0644 \u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0644\u0644\u0639\u0645\u064A\u0644 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0642\u064A\u0627\u0633 \u0645\u0633\u062A\u0648\u0649 \u0631\u0636\u0627\u0643\u0645.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 95);
    \u0275\u0275element(11, "input", 96);
    \u0275\u0275elementStart(12, "button", 97);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_28_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.copyReviewLink());
    });
    \u0275\u0275text(13, "\u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "a", 98);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 99);
    \u0275\u0275element(16, "path", 92);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " \u0627\u0631\u0633\u0627\u0644 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0639\u0645\u064A\u0644 (\u0648\u0627\u062A\u0633\u0627\u0628) ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275property("value", ctx_r0.getPublicReviewUrl());
    \u0275\u0275advance(3);
    \u0275\u0275property("href", ctx_r0.getWhatsAppShareUrl(), \u0275\u0275sanitizeUrl);
  }
}
function ProjectDetailsComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 31);
    \u0275\u0275text(1, "\u{1F4D6} \u0627\u0644\u062F\u0641\u062A\u0631 \u0627\u0644\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 33);
    \u0275\u0275text(1, "\u{1F4F8} \u0645\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1, "\u2699\uFE0F \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.unsettledCount());
  }
}
function ProjectDetailsComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 100);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_49_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activeTab.set("transactions"));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\u{1F4D6} \u0627\u0644\u062F\u0641\u062A\u0631 \u0627\u0644\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("bg-indigo-600/10", ctx_r0.activeTab() === "transactions")("text-indigo-400", ctx_r0.activeTab() === "transactions")("border-indigo-500", ctx_r0.activeTab() === "transactions")("border-transparent", ctx_r0.activeTab() !== "transactions")("text-slate-400", ctx_r0.activeTab() !== "transactions");
  }
}
function ProjectDetailsComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 101);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_53_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activeTab.set("gallery"));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\u{1F4F8} \u0645\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("bg-indigo-600/10", ctx_r0.activeTab() === "gallery")("text-indigo-400", ctx_r0.activeTab() === "gallery")("border-indigo-500", ctx_r0.activeTab() === "gallery")("border-transparent", ctx_r0.activeTab() !== "gallery")("text-slate-400", ctx_r0.activeTab() !== "gallery");
  }
}
function ProjectDetailsComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 102);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_54_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activeTab.set("closeout"));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\u2699\uFE0F \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("bg-indigo-600/10", ctx_r0.activeTab() === "closeout")("text-indigo-400", ctx_r0.activeTab() === "closeout")("border-indigo-500", ctx_r0.activeTab() === "closeout")("border-transparent", ctx_r0.activeTab() !== "closeout")("text-slate-400", ctx_r0.activeTab() !== "closeout");
  }
}
function ProjectDetailsComponent_Case_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u{1F4A1} ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "\u0639\u0647\u062F \u0627\u0644\u0645\u0648\u0642\u0639:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0635\u0631\u0641 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0627\u0644\u0633\u0627\u0626\u0644\u0629 \u0627\u0644\u0645\u0633\u0644\u0645\u0629 \u0644\u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0645\u0648\u0642\u0639 \u0644\u0644\u0645\u0635\u0627\u0631\u064A\u0641 \u0627\u0644\u064A\u0648\u0645\u064A\u0629.");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Case_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u{1F4A1} ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "\u0627\u0644\u062F\u0641\u062A\u0631 \u0627\u0644\u0645\u0627\u0644\u064A:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0634\u0627\u0645\u0644 \u0648\u0627\u0644\u0645\u0648\u062B\u0642 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A \u0648\u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u0634\u0631\u0648\u0639.");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Case_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u{1F4A1} ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "\u0627\u0644\u062A\u0633\u0648\u064A\u0627\u062A:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631 \u0648\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u0642\u062F\u0645\u0629 \u0645\u0646 \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0645\u0648\u0642\u0639 \u0644\u062A\u0633\u0648\u064A\u0629 \u0627\u0644\u0639\u0647\u062F\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629.");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Case_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u{1F4A1} ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "\u0645\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0631\u0641\u0639 \u0648\u062A\u0648\u062B\u064A\u0642 \u0635\u0648\u0631 \u0627\u0644\u062A\u0642\u062F\u0645 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0644\u0644\u0645\u0634\u0631\u0648\u0639 (\u064A\u0645\u0643\u0646 \u0625\u0638\u0647\u0627\u0631\u0647\u0627 \u0641\u064A \u0627\u0644\u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0639\u0627\u0645).");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Case_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u{1F4A1} ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629\u060C \u062D\u0627\u0644\u0629 \u0627\u0644\u0638\u0647\u0648\u0631\u060C \u0648\u0631\u0641\u0639 \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629.");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 126);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-emerald-500/10", ctx_r0.project().status === "Active")("text-emerald-400", ctx_r0.project().status === "Active")("border-emerald-500/30", ctx_r0.project().status === "Active")("bg-amber-500/10", ctx_r0.project().status === "FinancialFreeze")("text-amber-300", ctx_r0.project().status === "FinancialFreeze")("border-amber-500/30", ctx_r0.project().status === "FinancialFreeze")("bg-slate-800", ctx_r0.project().status === "Closed")("text-slate-400", ctx_r0.project().status === "Closed")("border-slate-700", ctx_r0.project().status === "Closed");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.project().status === "Active" ? "\u{1F7E2} \u0646\u0634\u0637" : ctx_r0.project().status === "FinancialFreeze" ? "\u{1F7E1} \u0645\u062C\u0645\u0651\u062F" : "\u26AB \u0645\u063A\u0644\u0642 \u0646\u0647\u0627\u0626\u064A\u0627\u064B", " ");
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_27_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 137);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_61_Conditional_27_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      \u0275\u0275nextContext(2);
      const boqFileInput_r10 = \u0275\u0275reference(30);
      return \u0275\u0275resetView(boqFileInput_r10.click());
    });
    \u0275\u0275text(1, " \u{1F504} \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0627\u0644\u0645\u0644\u0641 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.isUploadingBOQ());
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 118)(1, "div", 127)(2, "div", 128);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 129);
    \u0275\u0275element(4, "path", 130);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 17)(6, "p", 131);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 132);
    \u0275\u0275text(9, "\u2705 \u0645\u0644\u0641 \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629 \u0645\u0631\u0641\u0648\u0639 \u0648\u0645\u062D\u0641\u0648\u0638");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 133)(11, "a", 134);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 69);
    \u0275\u0275element(13, "path", 135);
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629 ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, ProjectDetailsComponent_Conditional_61_Conditional_27_Conditional_15_Template, 2, 1, "button", 136);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("title", ctx_r0.boqFileDetails().fileName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.boqFileDetails().fileName, " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("href", ctx_r0.boqFileDetails().fileUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.isOwnerOrAccountant() ? 15 : -1);
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_28_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 144);
    \u0275\u0275element(1, "circle", 145)(2, "path", 146);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u062C\u0627\u0631\u064A \u0631\u0641\u0639 \u0645\u0644\u0641 \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629... ");
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_28_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F4C1} \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629 ");
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_28_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 143);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_61_Conditional_28_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      \u0275\u0275nextContext(2);
      const boqFileInput_r10 = \u0275\u0275reference(30);
      return \u0275\u0275resetView(boqFileInput_r10.click());
    });
    \u0275\u0275conditionalCreate(1, ProjectDetailsComponent_Conditional_61_Conditional_28_Conditional_7_Conditional_1_Template, 4, 0)(2, ProjectDetailsComponent_Conditional_61_Conditional_28_Conditional_7_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.isUploadingBOQ());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isUploadingBOQ() ? 1 : 2);
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 119);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 138);
    \u0275\u0275element(2, "path", 139);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 140);
    \u0275\u0275text(4, "\u0644\u0645 \u064A\u062A\u0645 \u0631\u0641\u0639 \u0645\u0644\u0641 \u0645\u0642\u0627\u064A\u0633\u0629 \u0645\u0631\u062C\u0639\u064A\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0639\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 141);
    \u0275\u0275text(6, "\u064A\u064F\u0633\u0645\u062D \u0628\u0631\u0641\u0639 \u0645\u0644\u0641\u0627\u062A (.pdf, .xlsx, .docx) \u062D\u062A\u0649 10 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, ProjectDetailsComponent_Conditional_61_Conditional_28_Conditional_7_Template, 3, 2, "button", 142);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r0.isOwnerOrAccountant() ? 7 : -1);
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 121);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", ctx_r0.boqUploadError());
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 122)(1, "h4", 147);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 113);
    \u0275\u0275element(3, "path", 148);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0631\u0627\u0628\u0637 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0644\u0644\u0639\u0645\u064A\u0644 / Project Review Link ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "p", 149);
    \u0275\u0275text(6, "\u0623\u0631\u0633\u0644 \u0647\u0630\u0627 \u0627\u0644\u0631\u0627\u0628\u0637 \u0644\u0644\u0639\u0645\u064A\u0644 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u062A\u0642\u064A\u064A\u0645 \u062C\u0648\u062F\u0629 \u062A\u0633\u0644\u064A\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u2014 \u0644\u0627 \u064A\u062A\u0637\u0644\u0628 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 150);
    \u0275\u0275element(8, "input", 151);
    \u0275\u0275elementStart(9, "button", 152);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_61_Conditional_32_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.copyReviewLink());
    });
    \u0275\u0275text(10, "\u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "a", 153);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 99);
    \u0275\u0275element(13, "path", 92);
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " \u0627\u0631\u0633\u0627\u0644 \u0648\u0627\u062A\u0633\u0627\u0628 ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275property("value", ctx_r0.getPublicReviewUrl());
    \u0275\u0275advance(3);
    \u0275\u0275property("href", ctx_r0.getWhatsAppShareUrl(), \u0275\u0275sanitizeUrl);
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_33_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 158);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_61_Conditional_33_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onFreezeProject());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 69);
    \u0275\u0275element(2, "path", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u0627\u0644\u064A\u0627\u064B ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.isCloseoutLoading());
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_33_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 156);
    \u0275\u0275element(1, "circle", 145)(2, "path", 159);
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_33_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 69);
    \u0275\u0275element(1, "path", 160);
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_33_Conditional_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 163);
    \u0275\u0275text(1, "(\u064A\u062A\u0637\u0644\u0628 \u062A\u0635\u0641\u064A\u0629 \u0643\u0627\u0645\u0644\u0629)");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_33_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 161);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_61_Conditional_33_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onFinalCloseout());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 69);
    \u0275\u0275element(2, "path", 162);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0644\u0644\u0645\u0634\u0631\u0648\u0639 ");
    \u0275\u0275conditionalCreate(4, ProjectDetailsComponent_Conditional_61_Conditional_33_Conditional_6_Conditional_4_Template, 2, 0, "span", 163);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.isCloseoutLoading() || !ctx_r0.reconciliationReport()?.isFullyReconciled || ctx_r0.project().status !== "FinancialFreeze");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(!ctx_r0.reconciliationReport()?.isFullyReconciled ? 4 : -1);
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 123);
    \u0275\u0275conditionalCreate(1, ProjectDetailsComponent_Conditional_61_Conditional_33_Conditional_1_Template, 4, 1, "button", 154);
    \u0275\u0275elementStart(2, "button", 155);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_61_Conditional_33_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onRunReconciliation());
    });
    \u0275\u0275conditionalCreate(3, ProjectDetailsComponent_Conditional_61_Conditional_33_Conditional_3_Template, 3, 0, ":svg:svg", 156)(4, ProjectDetailsComponent_Conditional_61_Conditional_33_Conditional_4_Template, 2, 0, ":svg:svg", 69);
    \u0275\u0275text(5, " \u062A\u0634\u063A\u064A\u0644 \u062A\u062F\u0642\u064A\u0642 \u0627\u0644\u0623\u0631\u0635\u062F\u0629 ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, ProjectDetailsComponent_Conditional_61_Conditional_33_Conditional_6_Template, 5, 2, "button", 157);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.project().status === "Active" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.isCloseoutLoading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isCloseoutLoading() ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.isTenantOwner() ? 6 : -1);
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0639\u0647\u062F \u0627\u0644\u0645\u0639\u0644\u0642\u0629 / Unsettled Custody Details ");
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062A\u0641\u0627\u0635\u064A\u0644 \u0645\u0631\u062A\u062C\u0639\u0627\u062A \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 / Pending Treasury Refunds ");
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0639\u0648\u064A\u0636\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062D\u0642\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 / Pending Reimbursements ");
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_10_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 192)(1, "td", 193);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 194);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 195);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 196);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 197)(11, "button", 198);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_10_For_16_Template_button_click_11_listener() {
      const item_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.onWhatsAppAlert(item_r19, "\u0645\u0631\u062D\u0628\u0627\u064B " + item_r19.issuedTo + "\u060C \u064A\u0631\u062C\u0649 \u062A\u0633\u0648\u064A\u0629 \u0639\u0647\u062F\u062A\u0643 \u0627\u0644\u0645\u0639\u0644\u0642\u0629 \u0628\u0642\u064A\u0645\u0629 " + item_r19.amount + " EGP \u0644\u0640 " + item_r19.projectName + " - " + item_r19.reason + "."));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 199);
    \u0275\u0275element(13, "path", 200);
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " \u0625\u0631\u0633\u0627\u0644 \u062A\u0630\u0643\u064A\u0631 \u062A\u0633\u0648\u064A\u0629 / WhatsApp Reminder ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r19 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r19.issuedTo || "Staff");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r19.reason);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(7, 4, item_r19.amount, "1.2-2"), " EGP");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r19.status);
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_10_ForEmpty_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 201);
    \u0275\u0275text(2, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0647\u062F \u0645\u0639\u0644\u0642\u0629 \u0644\u0644\u063A\u0644\u0642");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 185)(1, "table", 186)(2, "thead", 187)(3, "tr")(4, "th", 188);
    \u0275\u0275text(5, "\u0627\u0644\u0645\u0633\u062A\u0644\u0645 / Engineer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 188);
    \u0275\u0275text(7, "\u0627\u0644\u0628\u064A\u0627\u0646 / Reason");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 189);
    \u0275\u0275text(9, "\u0627\u0644\u0645\u0628\u0644\u063A / Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 188);
    \u0275\u0275text(11, "\u0627\u0644\u062D\u0627\u0644\u0629 / Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 190);
    \u0275\u0275text(13, "\u0625\u062C\u0631\u0627\u0621 \u0633\u0631\u064A\u0639 / Quick Reminder");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody", 191);
    \u0275\u0275repeaterCreate(15, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_10_For_16_Template, 15, 7, "tr", 192, _forTrack0, false, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_10_ForEmpty_17_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r0.unsettledCustodyList());
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_11_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 192)(1, "td", 193);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 194);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 202);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 202);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 203);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 197)(15, "button", 204);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_11_For_18_Template_button_click_15_listener() {
      const sett_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.onConfirmRefund(sett_r21.id));
    });
    \u0275\u0275text(16, " \u062A\u0623\u0643\u064A\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0645\u0631\u062A\u062C\u0639 / Confirm Refund ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const sett_r21 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sett_r21.issuedTo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sett_r21.custodyReason);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(7, 5, sett_r21.custodyAmount, "1.2-2"), " EGP");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(10, 8, sett_r21.totalAmount, "1.2-2"), " EGP");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(13, 11, sett_r21.netDifference, "1.2-2"), " EGP");
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_11_ForEmpty_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 205);
    \u0275\u0275text(2, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0628\u0627\u0644\u063A \u0645\u0631\u062A\u062C\u0639\u0629 \u0645\u0639\u0644\u0642\u0629 \u0628\u0627\u0644\u062E\u0632\u064A\u0646\u0629");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 185)(1, "table", 186)(2, "thead", 187)(3, "tr")(4, "th", 188);
    \u0275\u0275text(5, "\u0627\u0644\u0645\u0633\u062A\u0644\u0645 / Engineer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 188);
    \u0275\u0275text(7, "\u0627\u0644\u0628\u064A\u0627\u0646 \u0627\u0644\u0623\u0633\u0627\u0633\u064A / Reason");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 189);
    \u0275\u0275text(9, "\u0642\u064A\u0645\u0629 \u0627\u0644\u0639\u0647\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 189);
    \u0275\u0275text(11, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 189);
    \u0275\u0275text(13, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0631\u062A\u062C\u0639 / Net Difference");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 190);
    \u0275\u0275text(15, "\u0625\u062C\u0631\u0627\u0621 \u0633\u0631\u064A\u0639 / Immediate Action");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody", 191);
    \u0275\u0275repeaterCreate(17, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_11_For_18_Template, 17, 14, "tr", 192, _forTrack0, false, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_11_ForEmpty_19_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r0.pendingRefundsList());
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_12_For_16_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 209);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pool_r24 = ctx.$implicit;
    const item_r23 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275property("value", pool_r24.id)("disabled", pool_r24.availableBalance < item_r23.amount);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r0.getPoolSourceTranslationKey(pool_r24.sourceType), " (", \u0275\u0275pipeBind2(2, 4, pool_r24.availableBalance, "1.0-0"), " EGP) ");
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_12_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 192)(1, "td", 193);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 194);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 195);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 206)(9, "select", 207);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_12_For_16_Template_select_ngModelChange_9_listener($event) {
      const item_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      \u0275\u0275twoWayBindingSet(ctx_r0.selectedReimbursementPool[item_r23.id], $event) || (ctx_r0.selectedReimbursementPool[item_r23.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(10, "option", 208);
    \u0275\u0275text(11, "-- \u0627\u062E\u062A\u0631 \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0635\u0646\u062F\u0648\u0642 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(12, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_12_For_16_For_13_Template, 3, 7, "option", 209, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 197)(15, "button", 210);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_12_For_16_Template_button_click_15_listener() {
      const item_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.onApproveReimbursement(item_r23, ctx_r0.selectedReimbursementPool[item_r23.id]));
    });
    \u0275\u0275text(16, " \u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0635\u0631\u0641 \u0627\u0644\u062A\u0639\u0648\u064A\u0636 / Disburse ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r23 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r23.issuedTo || "Staff");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r23.reason);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(7, 5, item_r23.amount, "1.2-2"), " EGP");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.selectedReimbursementPool[item_r23.id]);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("value", void 0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.cashPools());
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_12_ForEmpty_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 201);
    \u0275\u0275text(2, "\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0639\u0648\u064A\u0636\u0627\u062A \u0645\u0639\u0644\u0642\u0629 \u0645\u0633\u062A\u062D\u0642\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 185)(1, "table", 186)(2, "thead", 187)(3, "tr")(4, "th", 188);
    \u0275\u0275text(5, "\u0627\u0644\u0645\u0633\u062A\u062D\u0642 / Employee");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 188);
    \u0275\u0275text(7, "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0635\u0627\u0631\u064A\u0641 \u0627\u0644\u0632\u0627\u0626\u062F\u0629 / Reason");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 189);
    \u0275\u0275text(9, "\u0645\u0628\u0644\u063A \u0627\u0644\u062A\u0639\u0648\u064A\u0636 \u0627\u0644\u0645\u0637\u0644\u0648\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 188);
    \u0275\u0275text(11, "\u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0635\u0631\u0641 / Treasury Pool");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 190);
    \u0275\u0275text(13, "\u0625\u062C\u0631\u0627\u0621 \u0633\u0631\u064A\u0639 / Immediate Action");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody", 191);
    \u0275\u0275repeaterCreate(15, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_12_For_16_Template, 17, 8, "tr", 192, _forTrack0, false, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_12_ForEmpty_17_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r0.pendingReimbursementsList());
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 175)(1, "div", 180)(2, "h4", 181);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 182);
    \u0275\u0275element(4, "path", 183);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_5_Template, 1, 0)(6, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_6_Template, 1, 0)(7, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_7_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "button", 184);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.selectedDrilldown.set(null));
    });
    \u0275\u0275text(9, " \u0625\u063A\u0644\u0627\u0642 / Close \xD7 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_10_Template, 18, 1, "div", 185);
    \u0275\u0275conditionalCreate(11, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_11_Template, 20, 1, "div", 185);
    \u0275\u0275conditionalCreate(12, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Conditional_12_Template, 18, 1, "div", 185);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.selectedDrilldown() === "unsettled" ? 5 : ctx_r0.selectedDrilldown() === "refunds" ? 6 : ctx_r0.selectedDrilldown() === "reimbursements" ? 7 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.selectedDrilldown() === "unsettled" ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.selectedDrilldown() === "refunds" ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.selectedDrilldown() === "reimbursements" ? 12 : -1);
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 211);
    \u0275\u0275element(1, "path", 212);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(2, "p", 213);
    \u0275\u0275text(3, "\u2705 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0631\u0635\u062F\u0629 \u0645\u0635\u0641\u064E\u0651\u0627\u0629 \u2014 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u062C\u0627\u0647\u0632 \u0644\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0647\u0627\u0626\u064A");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 214);
    \u0275\u0275element(1, "path", 87);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(2, "p", 215);
    \u0275\u0275text(3, "\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u2014 \u064A\u0648\u062C\u062F \u0639\u0647\u062F \u0645\u0639\u0644\u064E\u0651\u0642\u0629 \u0623\u0648 \u0623\u0631\u0635\u062F\u0629 \u0645\u0648\u0638\u0641\u064A\u0646 \u063A\u064A\u0631 \u0635\u0641\u0631\u064A\u0629");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 177);
    \u0275\u0275text(1, " * \u064A\u062C\u0628 \u062A\u0635\u0641\u064A\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0647\u062F \u0627\u0644\u0645\u0639\u0644\u0642\u0629\u060C \u0648\u0627\u0633\u062A\u0631\u062F\u0627\u062F \u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0627\u0644\u0645\u0631\u062A\u062C\u0639\u0629\u060C \u0648\u0635\u0631\u0641 \u0627\u0644\u062A\u0639\u0648\u064A\u0636\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062D\u0642\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u062D\u062A\u0649 \u062A\u062A\u0633\u0627\u0648\u0649 \u0643\u0627\u0641\u0629 \u0627\u0644\u0623\u0631\u0635\u062F\u0629 \u0625\u0644\u0649 0.00 EGP \u062A\u0645\u0627\u0645\u0627\u064B \u0644\u062A\u0645\u0643\u064A\u0646 \u0632\u0631 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0644\u0644\u0645\u0634\u0631\u0648\u0639. ");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_For_24_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const emp_r25 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, emp_r25.totalReturnAmount, "1.2-2"), " ");
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_For_24_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_For_24_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 232);
    \u0275\u0275text(1, "\u2705 \u0645\u064F\u0635\u0641\u064E\u0651\u0649");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_For_24_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 233);
    \u0275\u0275text(1, "\u26A0\uFE0F \u062F\u064E\u064A\u0652\u0646");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_For_24_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 234);
    \u0275\u0275text(1, "\u{1F499} \u062A\u0639\u0648\u064A\u0636");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 225)(1, "td", 226);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 227);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 228);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 229);
    \u0275\u0275conditionalCreate(10, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_For_24_Conditional_10_Template, 2, 4)(11, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_For_24_Conditional_11_Template, 2, 0, "span", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 230);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 231);
    \u0275\u0275conditionalCreate(16, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_For_24_Conditional_16_Template, 2, 0, "span", 232)(17, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_For_24_Conditional_17_Template, 2, 0, "span", 233)(18, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_For_24_Conditional_18_Template, 2, 0, "span", 234);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const emp_r25 = ctx.$implicit;
    \u0275\u0275classProp("bg-rose-950/10", !emp_r25.isClean);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(emp_r25.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 14, emp_r25.totalIssued, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 17, emp_r25.totalSettled, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(emp_r25.totalReturnAmount > 0 ? 10 : 11);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-rose-400", emp_r25.balance > 0)("text-slate-300", emp_r25.balance === 0)("text-blue-400", emp_r25.balance < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 20, emp_r25.balance, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(emp_r25.isClean ? 16 : emp_r25.balance > 0 ? 17 : 18);
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 178)(1, "div", 216)(2, "h4", 181);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 113);
    \u0275\u0275element(4, "path", 217);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " \u062F\u0641\u062A\u0631 \u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 / Employee Balance Ledger ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 185)(7, "table", 186)(8, "thead", 218)(9, "tr", 219)(10, "th", 220);
    \u0275\u0275text(11, "\u0627\u0644\u0645\u0648\u0638\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 221);
    \u0275\u0275text(13, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u064F\u0647\u064E\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 221);
    \u0275\u0275text(15, "\u0627\u0644\u0645\u064F\u0633\u0648\u064E\u0651\u0649");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 221);
    \u0275\u0275text(17, "\u0627\u0644\u0645\u0631\u062A\u062C\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 221);
    \u0275\u0275text(19, "\u0627\u0644\u0631\u0635\u064A\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 222);
    \u0275\u0275text(21, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "tbody", 223);
    \u0275\u0275repeaterCreate(23, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_For_24_Template, 19, 23, "tr", 224, _forTrack1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(23);
    \u0275\u0275repeater(ctx_r0.reconciliationReport().employeeBalances);
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 124)(1, "div", 164)(2, "div", 165)(3, "span", 77);
    \u0275\u0275text(4, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 166);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 165)(9, "span", 77);
    \u0275\u0275text(10, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u062E\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 167);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 165)(15, "span", 77);
    \u0275\u0275text(16, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 168);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 165)(21, "span", 77);
    \u0275\u0275text(22, "\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0635\u064A\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 169);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 170)(27, "div", 171);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_61_Conditional_34_Template_div_click_27_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectedDrilldown.set(ctx_r0.selectedDrilldown() === "unsettled" ? null : "unsettled"));
    });
    \u0275\u0275elementStart(28, "span", 172);
    \u0275\u0275text(29, "\u0639\u064F\u0647\u064E\u062F \u0645\u0639\u0644\u064E\u0651\u0642\u0629 \u0644\u0644\u063A\u0644\u0642 / Unsettled Custody");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 173);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 174);
    \u0275\u0275text(34, "\u0627\u0636\u063A\u0637 \u0644\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0648\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0630\u0643\u064A\u0631\u0627\u062A");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 171);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_61_Conditional_34_Template_div_click_35_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectedDrilldown.set(ctx_r0.selectedDrilldown() === "refunds" ? null : "refunds"));
    });
    \u0275\u0275elementStart(36, "span", 172);
    \u0275\u0275text(37, "\u0645\u0631\u062A\u062C\u0639\u0627\u062A \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0627\u0644\u0645\u0639\u0644\u0642\u0629 / Treasury Refunds");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "p", 173);
    \u0275\u0275text(39);
    \u0275\u0275pipe(40, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span", 174);
    \u0275\u0275text(42, "\u0627\u0636\u063A\u0637 \u0644\u062A\u0623\u0643\u064A\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0645\u0628\u0644\u063A \u0646\u0642\u062F\u0627\u064B");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 171);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_61_Conditional_34_Template_div_click_43_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectedDrilldown.set(ctx_r0.selectedDrilldown() === "reimbursements" ? null : "reimbursements"));
    });
    \u0275\u0275elementStart(44, "span", 172);
    \u0275\u0275text(45, "\u062A\u0639\u0648\u064A\u0636\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u0639\u0644\u0642\u0629 / Reimbursements");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "p", 173);
    \u0275\u0275text(47);
    \u0275\u0275pipe(48, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "span", 174);
    \u0275\u0275text(50, "\u0627\u0636\u063A\u0637 \u0644\u0635\u0631\u0641 \u0627\u0644\u062A\u0639\u0648\u064A\u0636 \u0644\u0644\u0645\u0648\u0638\u0641");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(51, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_51_Template, 13, 4, "div", 175);
    \u0275\u0275elementStart(52, "div", 176)(53, "div", 89);
    \u0275\u0275conditionalCreate(54, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_54_Template, 4, 0)(55, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_55_Template, 4, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(56, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_56_Template, 2, 0, "p", 177);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(57, ProjectDetailsComponent_Conditional_61_Conditional_34_Conditional_57_Template, 25, 0, "div", 178);
    \u0275\u0275elementStart(58, "p", 179);
    \u0275\u0275text(59);
    \u0275\u0275pipe(60, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(7, 45, ctx_r0.reconciliationReport().totalBudget, "1.0-0"), " EGP");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(13, 48, ctx_r0.reconciliationReport().totalIncome, "1.0-0"), " EGP");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(19, 51, ctx_r0.reconciliationReport().totalExpenses, "1.0-0"), " EGP");
    \u0275\u0275advance(5);
    \u0275\u0275classProp("text-emerald-400", ctx_r0.reconciliationReport().netBalance >= 0)("text-rose-400", ctx_r0.reconciliationReport().netBalance < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(25, 54, ctx_r0.reconciliationReport().netBalance, "1.0-0"), " EGP");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("border-amber-500", ctx_r0.selectedDrilldown() === "unsettled")("border-slate-800/60", ctx_r0.selectedDrilldown() !== "unsettled")("bg-amber-500/5", ctx_r0.selectedDrilldown() === "unsettled");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r0.unsettledCustodyList().length, " \u0639\u0647\u062F\u0629 (", \u0275\u0275pipeBind2(32, 57, ctx_r0.unsettledCustodySum(), "1.0-0"), " EGP) ");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-amber-500", ctx_r0.selectedDrilldown() === "refunds")("border-slate-800/60", ctx_r0.selectedDrilldown() !== "refunds")("bg-amber-500/5", ctx_r0.selectedDrilldown() === "refunds");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r0.pendingRefundsList().length, " \u062A\u0633\u0648\u064A\u0629 (", \u0275\u0275pipeBind2(40, 60, ctx_r0.pendingRefundsSum(), "1.0-0"), " EGP) ");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-amber-500", ctx_r0.selectedDrilldown() === "reimbursements")("border-slate-800/60", ctx_r0.selectedDrilldown() !== "reimbursements")("bg-amber-500/5", ctx_r0.selectedDrilldown() === "reimbursements");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r0.pendingReimbursementsList().length, " \u0637\u0644\u0628 (", \u0275\u0275pipeBind2(48, 63, ctx_r0.pendingReimbursementsSum(), "1.0-0"), " EGP) ");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.selectedDrilldown() !== null ? 51 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-emerald-500/5", ctx_r0.reconciliationReport().isFullyReconciled)("border-emerald-500/30", ctx_r0.reconciliationReport().isFullyReconciled)("bg-rose-500/5", !ctx_r0.reconciliationReport().isFullyReconciled)("border-rose-500/30", !ctx_r0.reconciliationReport().isFullyReconciled);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.reconciliationReport().isFullyReconciled ? 54 : 55);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r0.reconciliationReport().isFullyReconciled ? 56 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.reconciliationReport().employeeBalances.length > 0 ? 57 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0622\u062E\u0631 \u062A\u062F\u0642\u064A\u0642: ", \u0275\u0275pipeBind2(60, 66, ctx_r0.reconciliationReport().generatedAt, "dd/MM/yyyy HH:mm:ss"));
  }
}
function ProjectDetailsComponent_Conditional_61_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 125);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 235);
    \u0275\u0275element(2, "path", 236);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 237);
    \u0275\u0275text(4, '\u0627\u0636\u063A\u0637 "\u062A\u0634\u063A\u064A\u0644 \u062A\u062F\u0642\u064A\u0642 \u0627\u0644\u0623\u0631\u0635\u062F\u0629" \u0644\u062A\u0648\u0644\u064A\u062F \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u0627\u0645\u0644\u0629.');
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 103)(2, "div", 104)(3, "div")(4, "h3", 105);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 106);
    \u0275\u0275element(6, "path", 107);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " \u0644\u0648\u062D\u0629 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 / Project Closeout Dashboard ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "p", 108);
    \u0275\u0275text(9, "\u0645\u0631\u062D\u0644\u0629 \u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629\u060C \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0623\u0631\u0635\u062F\u0629\u060C \u0648\u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0627\u0644\u0645\u0648\u062B\u064E\u0651\u0642.");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, ProjectDetailsComponent_Conditional_61_Conditional_10_Template, 2, 19, "span", 109);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 110)(12, "div", 111)(13, "div")(14, "h4", 112);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 113);
    \u0275\u0275element(16, "path", 114);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629 \u0644\u0644\u0645\u0634\u0631\u0648\u0639 / Project BOQ Reference ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "p", 108);
    \u0275\u0275text(19, " \u0631\u0641\u0639 \u0648\u0625\u062F\u0627\u0631\u0629 \u0645\u0633\u062A\u0646\u062F \u062C\u062F\u0648\u0644 \u0627\u0644\u0643\u0645\u064A\u0627\u062A \u0648\u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u0634\u0631\u0648\u0639. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 115);
    \u0275\u0275text(21, " \u0645\u0633\u062A\u0646\u062F \u0645\u0631\u062C\u0639\u064A \u062E\u0627\u0635 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 116)(23, "span", 117);
    \u0275\u0275text(24, "\u{1F512}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, "\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0645\u0631\u062C\u0639\u064A \u062F\u0627\u062E\u0644\u064A \u0641\u0642\u0637 \u0648\u0644\u0627 \u064A\u0638\u0647\u0631 \u0625\u0637\u0644\u0627\u0642\u0627\u064B \u0641\u064A \u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0645 \u0648\u0644\u0627 \u064A\u0624\u062B\u0631 \u0639\u0644\u0649 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629.");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(27, ProjectDetailsComponent_Conditional_61_Conditional_27_Template, 16, 4, "div", 118)(28, ProjectDetailsComponent_Conditional_61_Conditional_28_Template, 8, 1, "div", 119);
    \u0275\u0275elementStart(29, "input", 120, 0);
    \u0275\u0275listener("change", function ProjectDetailsComponent_Conditional_61_Template_input_change_29_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onBOQFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(31, ProjectDetailsComponent_Conditional_61_Conditional_31_Template, 2, 1, "p", 121);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(32, ProjectDetailsComponent_Conditional_61_Conditional_32_Template, 15, 2, "div", 122);
    \u0275\u0275conditionalCreate(33, ProjectDetailsComponent_Conditional_61_Conditional_33_Template, 7, 4, "div", 123);
    \u0275\u0275conditionalCreate(34, ProjectDetailsComponent_Conditional_61_Conditional_34_Template, 61, 69, "div", 124)(35, ProjectDetailsComponent_Conditional_61_Conditional_35_Template, 5, 0, "div", 125);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275conditional(ctx_r0.project() ? 10 : -1);
    \u0275\u0275advance(17);
    \u0275\u0275conditional(ctx_r0.boqFileDetails().fileUrl ? 27 : 28);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.boqUploadError() ? 31 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.project() && ctx_r0.project().publicReviewToken ? 32 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.project() && ctx_r0.project().status !== "Closed" ? 33 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.reconciliationReport() ? 34 : !ctx_r0.isCloseoutLoading() ? 35 : -1);
  }
}
function ProjectDetailsComponent_Conditional_62_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 144);
    \u0275\u0275element(1, "circle", 145)(2, "path", 146);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 1, "DETAILS.UPLOADING"), " ");
  }
}
function ProjectDetailsComponent_Conditional_62_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 245);
    \u0275\u0275element(1, "path", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "DETAILS.UPLOAD_IMAGE"), " ");
  }
}
function ProjectDetailsComponent_Conditional_62_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 243);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 246);
    \u0275\u0275element(2, "circle", 145)(3, "path", 146);
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_Conditional_62_Conditional_15_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 261);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_62_Conditional_15_For_2_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r30);
      const photo_r31 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onDeletePhoto(photo_r31.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 262);
    \u0275\u0275element(2, "path", 263);
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_Conditional_62_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 249);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_62_Conditional_15_For_2_Template_div_click_0_listener($event) {
      const \u0275$index_968_r29 = \u0275\u0275restoreView(_r28).$index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openLightbox(ctx_r0.galleryPhotos(), \u0275$index_968_r29, $event));
    });
    \u0275\u0275elementStart(1, "img", 250);
    \u0275\u0275listener("error", function ProjectDetailsComponent_Conditional_62_Conditional_15_For_2_Template_img_error_1_listener($event) {
      \u0275\u0275restoreView(_r28);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onImgError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 251)(3, "span", 252);
    \u0275\u0275text(4, " \u{1F50D} \u0645\u0639\u0627\u064A\u0646\u0629 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 253);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 254);
    \u0275\u0275element(7, "path", 255);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "span", 256);
    \u0275\u0275text(9, "\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, ProjectDetailsComponent_Conditional_62_Conditional_15_For_2_Conditional_10_Template, 3, 0, "button", 257);
    \u0275\u0275elementStart(11, "div", 258)(12, "p", 259);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 260);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const photo_r31 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("src", photo_r31.photoUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r0.isTenantOwner() ? 10 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 4, photo_r31.uploadedAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("By: ", photo_r31.uploadedBy || "Owner");
  }
}
function ProjectDetailsComponent_Conditional_62_Conditional_15_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 248);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "MARKETPLACE.NO_PHOTOS"), " ");
  }
}
function ProjectDetailsComponent_Conditional_62_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 244);
    \u0275\u0275repeaterCreate(1, ProjectDetailsComponent_Conditional_62_Conditional_15_For_2_Template, 17, 7, "div", 247, _forTrack0, false, ProjectDetailsComponent_Conditional_62_Conditional_15_ForEmpty_3_Template, 3, 3, "div", 248);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.galleryPhotos());
  }
}
function ProjectDetailsComponent_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 238)(2, "div")(3, "h3", 239);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 240);
    \u0275\u0275text(7, "Upload and manage site photos for public portfolio listings.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "button", 241);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_62_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r26);
      const galleryFileInput_r27 = \u0275\u0275reference(13);
      return \u0275\u0275resetView(galleryFileInput_r27.click());
    });
    \u0275\u0275conditionalCreate(10, ProjectDetailsComponent_Conditional_62_Conditional_10_Template, 5, 3)(11, ProjectDetailsComponent_Conditional_62_Conditional_11_Template, 4, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 242, 1);
    \u0275\u0275listener("change", function ProjectDetailsComponent_Conditional_62_Template_input_change_12_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onGalleryFileSelected($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(14, ProjectDetailsComponent_Conditional_62_Conditional_14_Template, 4, 0, "div", 243)(15, ProjectDetailsComponent_Conditional_62_Conditional_15_Template, 4, 1, "div", 244);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 4, "MARKETPLACE.PROJECT_GALLERY"));
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.isUploadingGallery());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isUploadingGallery() ? 10 : 11);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.isLoadingGallery() ? 14 : 15);
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 270);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_63_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openRequestModal());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.project()?.status === "Closed");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, "DETAILS.BTN_REQUEST_PETTY"), " ");
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 268);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 246);
    \u0275\u0275element(2, "circle", 145)(3, "path", 146);
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 281);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "DETAILS.STATUS_SETTLED"), " ");
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 282);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "DETAILS.STATUS_PENDING"), " ");
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 286);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r35);
      const item_r34 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openSettlementModal(item_r34));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r0.project()?.status === "Closed");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, "DETAILS.BTN_SETTLE"), " ");
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 287);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r36);
      const item_r34 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onWhatsAppAlert(item_r34));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 288);
    \u0275\u0275element(2, "path", 200);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0648\u0627\u062A\u0633\u0627\u0628");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_19_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 289);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 292);
    \u0275\u0275element(2, "path", 293);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0625\u064A\u0635\u0627\u0644");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r34 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("href", item_r34.receiptPhotoUrl, \u0275\u0275sanitizeUrl);
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_19_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 290);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r34 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r34.settlementPaymentMethod, " ");
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 291);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r34 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, item_r34.expenseDate, "dd/MM/yyyy"), " ");
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_19_Conditional_0_Template, 5, 1, "a", 289);
    \u0275\u0275conditionalCreate(1, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_19_Conditional_1_Template, 2, 1, "span", 290);
    \u0275\u0275conditionalCreate(2, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_19_Conditional_2_Template, 3, 4, "span", 291);
  }
  if (rf & 2) {
    const item_r34 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(item_r34.receiptPhotoUrl ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r34.settlementPaymentMethod ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r34.expenseDate ? 2 : -1);
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 294);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 296);
    \u0275\u0275element(2, "path", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u{1F512} \u0645\u0642\u0641\u0644\u0629 ");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Conditional_1_Conditional_1_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 209);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pool_r39 = ctx.$implicit;
    const item_r34 = \u0275\u0275nextContext(4).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("value", pool_r39.id)("disabled", pool_r39.availableBalance < item_r34.amount);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(2, 4, "FINANCE." + ctx_r0.getPoolSourceTranslationKey(pool_r39.sourceType)), " (", \u0275\u0275pipeBind2(3, 6, pool_r39.availableBalance, "1.0-0"), " EGP) ");
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 297)(1, "select", 301);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Conditional_1_Conditional_1_Template_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r38);
      const item_r34 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.selectedPettyCashPool[item_r34.id], $event) || (ctx_r0.selectedPettyCashPool[item_r34.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(2, "option", 208);
    \u0275\u0275text(3, "-- \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0635\u0631\u0641 / Source Pool --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Conditional_1_Conditional_1_For_5_Template, 4, 9, "option", 209, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(6, "button", 302);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Conditional_1_Conditional_1_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r38);
      const item_r34 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onApprovePettyCashRequest(item_r34, ctx_r0.selectedPettyCashPool[item_r34.id]));
    });
    \u0275\u0275text(7, " Approve / Disburse ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 303);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Conditional_1_Conditional_1_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r38);
      const item_r34 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onRejectPettyCashRequest(item_r34));
    });
    \u0275\u0275text(9, " Reject ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r34 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.selectedPettyCashPool[item_r34.id]);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("value", void 0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.cashPools());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.project()?.status === "Closed");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.project()?.status === "Closed");
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 295);
    \u0275\u0275conditionalCreate(1, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Conditional_1_Conditional_1_Template, 10, 4, "div", 297);
    \u0275\u0275elementStart(2, "button", 298);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Conditional_1_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r37);
      const item_r34 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openEditPettyCashModal(item_r34));
    });
    \u0275\u0275text(3, " Edit ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 299);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Conditional_1_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r37);
      const item_r34 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onDeletePettyCash(item_r34.id, item_r34.isSettled));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 292);
    \u0275\u0275element(6, "path", 300);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r34 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r34.status === "Pending" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.project()?.status === "Closed");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isDeletingPettyCash() || ctx_r0.project()?.status === "Closed");
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Conditional_0_Template, 4, 0, "span", 294)(1, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Conditional_1_Template, 7, 3, "div", 295);
  }
  if (rf & 2) {
    const item_r34 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(item_r34.isSettled || item_r34.status === "Settled" ? 0 : 1);
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 276)(1, "td", 277);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 278);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Template_td_click_3_listener() {
      const item_r34 = \u0275\u0275restoreView(_r33).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openPettyCashReasonModal(item_r34));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 279);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 280);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 274);
    \u0275\u0275conditionalCreate(13, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_13_Template, 3, 3, "span", 281)(14, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_14_Template, 3, 3, "span", 282);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 274)(16, "div", 283);
    \u0275\u0275conditionalCreate(17, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_17_Template, 3, 4, "button", 284);
    \u0275\u0275conditionalCreate(18, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_18_Template, 5, 0, "button", 285)(19, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_19_Template, 3, 3);
    \u0275\u0275conditionalCreate(20, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Conditional_20_Template, 2, 1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r34 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r34.issuedTo || "Staff");
    \u0275\u0275advance();
    \u0275\u0275property("title", item_r34.reason);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r34.reason, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 10, item_r34.issuedAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(10, 13, item_r34.amount, "1.2-2"), " ", \u0275\u0275pipeBind1(11, 16, "COMMON.CURRENCY"));
    \u0275\u0275advance(4);
    \u0275\u0275conditional(item_r34.isSettled ? 13 : 14);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(!item_r34.isSettled && item_r34.status === "Issued" ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r34.status === "Issued" || item_r34.status === "Pending" || item_r34.isSettled ? 18 : 19);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isOwnerOrAccountant() ? 20 : -1);
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_ForEmpty_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 304);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "DETAILS.NO_VOUCHERS"), " ");
  }
}
function ProjectDetailsComponent_Conditional_63_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 269)(1, "table", 271)(2, "thead")(3, "tr", 272)(4, "th", 273);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 273);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 273);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 273);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 274);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 274);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "tbody", 275);
    \u0275\u0275repeaterCreate(23, ProjectDetailsComponent_Conditional_63_Conditional_11_For_24_Template, 21, 18, "tr", 276, _forTrack0, false, ProjectDetailsComponent_Conditional_63_Conditional_11_ForEmpty_25_Template, 4, 3, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 7, "DETAILS.TH_ISSUED_TO"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 9, "DETAILS.TH_REASON"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 11, "DETAILS.TH_DATE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 13, "DETAILS.TH_AMOUNT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 15, "DETAILS.TH_STATUS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(21, 17, "DETAILS.TH_ACTION"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.pettyCashes());
  }
}
function ProjectDetailsComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 264)(2, "h3", 265);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 89);
    \u0275\u0275conditionalCreate(6, ProjectDetailsComponent_Conditional_63_Conditional_6_Template, 3, 4, "button", 266);
    \u0275\u0275elementStart(7, "span", 267);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(10, ProjectDetailsComponent_Conditional_63_Conditional_10_Template, 4, 0, "div", 268)(11, ProjectDetailsComponent_Conditional_63_Conditional_11_Template, 26, 19, "div", 269);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 5, "DETAILS.VOUCHERS_TITLE"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional((ctx_r0.isEngineer() || ctx_r0.isTenantOwner()) && ctx_r0.project()?.status !== "Closed" ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.pettyCashes().length, " ", \u0275\u0275pipeBind1(9, 7, "DETAILS.RECORDS"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isLoadingPettyCash() ? 10 : 11);
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 268);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 246);
    \u0275\u0275element(2, "circle", 145)(3, "path", 146);
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 313);
    \u0275\u0275text(1, "Draft / \u0645\u0633\u0648\u062F\u0629");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 314);
    \u0275\u0275text(1, "Approved");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 315);
    \u0275\u0275text(1, "Pending Refund");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 316);
    \u0275\u0275text(1, "Refunded");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 317);
    \u0275\u0275text(1, "Rejected");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 318);
    \u0275\u0275text(1, "Pending Approval");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 328);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r41);
      const s_r42 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onApproveSettlement(s_r42.id));
    });
    \u0275\u0275text(1, " \u0627\u0639\u062A\u0645\u0627\u062F ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 329);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_27_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r41);
      const s_r42 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onRejectSettlement(s_r42.id));
    });
    \u0275\u0275text(3, " \u0631\u0641\u0636 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r0.project()?.status === "Closed");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.project()?.status === "Closed");
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 330);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r43);
      const s_r42 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onConfirmRefund(s_r42.id));
    });
    \u0275\u0275text(1, " \u062A\u0623\u0643\u064A\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0645\u0631\u062A\u062C\u0639 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r0.project()?.status === "Closed");
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_31_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 332)(1, "span", 333);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 334);
    \u0275\u0275element(3, "path", 335);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div")(5, "span", 336);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 337);
    \u0275\u0275text(9, "\u2014 \u062A\u0645 \u062A\u0648\u0644\u064A\u062F \u0637\u0644\u0628 \u062A\u0639\u0648\u064A\u0636 \u062A\u0644\u0642\u0627\u0626\u064A (Reimbursement) \u064A\u062A\u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u062D\u0627\u0633\u0628 \u0648\u0635\u0631\u0641\u0647 \u0645\u0646 \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0635\u0646\u062F\u0648\u0642");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r42 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("\u26A1 \u0627\u0644\u0645\u0647\u0646\u062F\u0633 \u0635\u0631\u0641 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0627\u0644\u0639\u0647\u062F\u0629 \u0628\u0640 ", \u0275\u0275pipeBind2(7, 1, s_r42.netDifference * -1, "1.2-2"), " EGP");
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_31_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 338);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 339);
    \u0275\u0275element(2, "path", 340);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "div")(4, "span", 341);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 342);
    \u0275\u0275text(8, "\u2014 \u0627\u0644\u0645\u0647\u0646\u062F\u0633 \u0635\u0631\u0641 \u0623\u0642\u0644 \u0645\u0646 \u0627\u0644\u0639\u0647\u062F\u0629 \u0648\u0627\u0644\u0628\u0627\u0642\u064A \u064A\u062C\u0628 \u0625\u0631\u062C\u0627\u0639\u0647 \u0644\u0644\u0635\u0646\u062F\u0648\u0642");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r42 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u{1F4B0} \u0645\u0631\u062A\u062C\u0639 ", \u0275\u0275pipeBind2(6, 1, s_r42.netDifference, "1.2-2"), " EGP \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u0623\u0643\u064A\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0645\u062D\u0627\u0633\u0628");
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_31_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 343);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 344);
    \u0275\u0275element(2, "path", 212);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "div")(4, "span", 345);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 346);
    \u0275\u0275text(8, "\u2014 \u0627\u0644\u0645\u0631\u062A\u062C\u0639 \u0645\u064F\u0624\u064E\u0643\u064E\u0651\u062F \u0648\u0645\u064F\u0633\u062C\u064E\u0651\u0644 \u0643\u0640 RefundToTreasury");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r42 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u2705 \u062A\u0645 \u0627\u0633\u062A\u0631\u062F\u0627\u062F ", \u0275\u0275pipeBind2(6, 1, s_r42.netDifference, "1.2-2"), " EGP \u0628\u0646\u062C\u0627\u062D \u0648\u0625\u0639\u0627\u062F\u062A\u0647\u0627 \u0644\u0644\u0635\u0646\u062F\u0648\u0642");
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_31_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 347);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 348);
    \u0275\u0275element(2, "path", 212);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "div")(4, "span", 349);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r42 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u0627\u0644\u0645\u0647\u0646\u062F\u0633 \u0635\u0631\u0641 \u0623\u0642\u0644 \u0645\u0646 \u0627\u0644\u0639\u0647\u062F\u0629 \u2014 \u0641\u0627\u0626\u0636 ", \u0275\u0275pipeBind2(6, 1, s_r42.netDifference, "1.2-2"), " EGP");
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_31_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 332);
    \u0275\u0275conditionalCreate(1, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_31_Conditional_3_Conditional_1_Template, 9, 4)(2, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_31_Conditional_3_Conditional_2_Template, 9, 4)(3, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_31_Conditional_3_Conditional_3_Template, 7, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r42 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(s_r42.status === "ApprovedPendingRefund" ? 1 : s_r42.status === "Refunded" ? 2 : 3);
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 322)(1, "td", 331);
    \u0275\u0275conditionalCreate(2, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_31_Conditional_2_Template, 10, 4, "div", 332)(3, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_31_Conditional_3_Template, 4, 1, "div", 332);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r42 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(s_r42.netDifference < 0 ? 2 : 3);
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_For_38_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 354);
    \u0275\u0275text(1, "\u{1F4C4} \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r44 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", line_r44.invoiceUrl, \u0275\u0275sanitizeUrl);
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 327)(1, "div")(2, "span", 350);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 351);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 352)(7, "div", 353);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_For_38_Conditional_9_Template, 2, 1, "a", 354);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r44 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(line_r44.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r44.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", line_r44.amount, " EGP");
    \u0275\u0275advance();
    \u0275\u0275conditional(line_r44.invoiceUrl ? 9 : -1);
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 276)(1, "td", 273)(2, "div", 309);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 310);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 311);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 280);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 312);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 273);
    \u0275\u0275conditionalCreate(16, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_16_Template, 2, 0, "span", 313)(17, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_17_Template, 2, 0, "span", 314)(18, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_18_Template, 2, 0, "span", 315)(19, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_19_Template, 2, 0, "span", 316)(20, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_20_Template, 2, 0, "span", 317)(21, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_21_Template, 2, 0, "span", 318);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 319);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "td", 273)(26, "div", 283);
    \u0275\u0275conditionalCreate(27, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_27_Template, 4, 2);
    \u0275\u0275conditionalCreate(28, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_28_Template, 2, 1, "button", 320);
    \u0275\u0275elementStart(29, "button", 321);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Template_button_click_29_listener() {
      const s_r42 = \u0275\u0275restoreView(_r40).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.printSettlementReport(s_r42));
    });
    \u0275\u0275text(30, " \u0637\u0628\u0627\u0639\u0629 / Print \u{1F5A8}\uFE0F ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(31, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Conditional_31_Template, 4, 1, "tr", 322);
    \u0275\u0275elementStart(32, "tr", 323)(33, "td", 324)(34, "div", 325);
    \u0275\u0275text(35, "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0629 / Invoiced Lines:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 326);
    \u0275\u0275repeaterCreate(37, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_For_38_Template, 10, 4, "div", 327, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r42 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r42.issuedTo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r42.custodyReason);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(8, 14, s_r42.custodyAmount, "1.2-2"), " EGP");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(11, 17, s_r42.totalAmount, "1.2-2"), " EGP");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-emerald-400", s_r42.netDifference > 0)("text-rose-400", s_r42.netDifference < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(14, 20, s_r42.netDifference, "1.2-2"), " EGP ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(s_r42.status === "Draft" ? 16 : s_r42.status === "Approved" ? 17 : s_r42.status === "ApprovedPendingRefund" ? 18 : s_r42.status === "Refunded" ? 19 : s_r42.status === "Rejected" ? 20 : 21);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(24, 23, s_r42.submittedAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(4);
    \u0275\u0275conditional(s_r42.status === "Pending" && ctx_r0.isOwnerOrAccountant() ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(s_r42.status === "ApprovedPendingRefund" && ctx_r0.isOwnerOrAccountant() ? 28 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(s_r42.netDifference !== 0 && s_r42.status !== "Pending" && s_r42.status !== "Draft" && s_r42.status !== "Rejected" ? 31 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(s_r42.lines);
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_ForEmpty_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 355);
    \u0275\u0275text(2, " \u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u062A\u0633\u0648\u064A\u0629 \u0645\u0642\u062F\u0645\u0629 \u062D\u0627\u0644\u064A\u0627\u064B / No settlements submitted yet. ");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_Conditional_64_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 269)(1, "table", 306)(2, "thead")(3, "tr", 272)(4, "th", 307);
    \u0275\u0275text(5, "\u0635\u0627\u062D\u0628 \u0627\u0644\u0639\u0647\u062F\u0629 / Engineer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 307);
    \u0275\u0275text(7, "\u0645\u0628\u0644\u063A \u0627\u0644\u0639\u0647\u062F\u0629 / Custody");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 307);
    \u0275\u0275text(9, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0635\u0631\u0648\u0641 / Spent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 307);
    \u0275\u0275text(11, "\u0627\u0644\u0641\u0631\u0642 / Difference");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 307);
    \u0275\u0275text(13, "\u0627\u0644\u062D\u0627\u0644\u0629 / Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 307);
    \u0275\u0275text(15, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E / Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 308);
    \u0275\u0275text(17, "\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A / Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody", 275);
    \u0275\u0275repeaterCreate(19, ProjectDetailsComponent_Conditional_64_Conditional_7_For_20_Template, 39, 26, null, null, _forTrack0, false, ProjectDetailsComponent_Conditional_64_Conditional_7_ForEmpty_21_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(19);
    \u0275\u0275repeater(ctx_r0.settlements());
  }
}
function ProjectDetailsComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 264)(2, "h3", 239);
    \u0275\u0275text(3, "\u0637\u0644\u0628\u0627\u062A \u062A\u0633\u0648\u064A\u0629 \u0627\u0644\u0639\u0647\u062F / Settlements");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 305);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, ProjectDetailsComponent_Conditional_64_Conditional_6_Template, 4, 0, "div", 268)(7, ProjectDetailsComponent_Conditional_64_Conditional_7_Template, 22, 1, "div", 269);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.settlements().length, " \u0633\u062C\u0644 / Records");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isLoadingSettlements() ? 6 : 7);
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 357);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_65_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openDisburseModal());
    });
    \u0275\u0275text(1, " \u062A\u0639\u0632\u064A\u0632 \u0639\u0647\u062F\u0629 \u0645\u0628\u0627\u0634\u0631 / Direct Disbursement ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.project()?.status === "Closed");
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 268);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 246);
    \u0275\u0275element(2, "circle", 145)(3, "path", 146);
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 274);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "DETAILS.TH_ACTION"));
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 358);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r47 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Paid: ", \u0275\u0275pipeBind2(2, 1, t_r47.paymentDate, "dd/MM/yyyy"));
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 359);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r47 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r47.paymentMethod, " ");
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 360);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 281);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "DETAILS.BADGE_INCOME"), " ");
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 362);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "DETAILS.BADGE_EXPENSE"), " ");
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 289);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 292);
    \u0275\u0275element(2, "path", 293);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0625\u064A\u0635\u0627\u0644");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r47 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", t_r47.receiptPhotoUrl, \u0275\u0275sanitizeUrl);
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 360);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_21_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 294);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 296);
    \u0275\u0275element(2, "path", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u{1F512} \u0645\u0642\u0641\u0644\u0629 ");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_21_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 363)(1, "button", 364);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_21_Conditional_2_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r48);
      const t_r47 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openEditTransactionModal(t_r47));
    });
    \u0275\u0275text(2, " Edit ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 365);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_21_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r48);
      const t_r47 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onDeleteTransaction(t_r47.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 292);
    \u0275\u0275element(5, "path", 300);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Delete ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.project()?.status === "Closed");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isDeletingTransaction() || ctx_r0.project()?.status === "Closed");
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 274);
    \u0275\u0275conditionalCreate(1, ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_21_Conditional_1_Template, 4, 0, "span", 294)(2, ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_21_Conditional_2_Template, 7, 2, "div", 363);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r47 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r47.description.toLowerCase().startsWith("petty cash settlement -") ? 1 : 2);
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 276)(1, "td", 279)(2, "div");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_5_Template, 3, 4, "div", 358);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 273);
    \u0275\u0275conditionalCreate(7, ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_7_Template, 2, 1, "span", 359)(8, ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_8_Template, 2, 0, "span", 360);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 361);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Template_td_click_9_listener() {
      const t_r47 = \u0275\u0275restoreView(_r46).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openTransactionInspectionModal(t_r47));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 273);
    \u0275\u0275conditionalCreate(12, ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_12_Template, 3, 3, "span", 281)(13, ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_13_Template, 3, 3, "span", 362);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 312);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 274);
    \u0275\u0275conditionalCreate(19, ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_19_Template, 5, 1, "a", 289)(20, ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_20_Template, 2, 0, "span", 360);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Conditional_21_Template, 3, 1, "td", 274);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r47 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 15, t_r47.transactionDate, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(t_r47.paymentDate ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(t_r47.paymentMethod ? 7 : 8);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", t_r47.description);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r47.description, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(t_r47.type === "Income" ? 12 : 13);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-emerald-400", t_r47.type === "Income")("text-rose-400", t_r47.type !== "Income");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", t_r47.type === "Income" ? "+" : "-", "", \u0275\u0275pipeBind2(16, 18, t_r47.amount, "1.2-2"), " ", \u0275\u0275pipeBind1(17, 21, "COMMON.CURRENCY"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(t_r47.receiptPhotoUrl ? 19 : 20);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isOwnerOrAccountant() ? 21 : -1);
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_ForEmpty_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 366);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "DETAILS.NO_TRANSACTIONS"), " ");
  }
}
function ProjectDetailsComponent_Conditional_65_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 269)(1, "table", 271)(2, "thead")(3, "tr", 272)(4, "th", 273);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 273);
    \u0275\u0275text(8, "Method");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 273);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 273);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 273);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 274);
    \u0275\u0275text(19, "Receipt");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, ProjectDetailsComponent_Conditional_65_Conditional_11_Conditional_20_Template, 3, 3, "th", 274);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "tbody", 275);
    \u0275\u0275repeaterCreate(22, ProjectDetailsComponent_Conditional_65_Conditional_11_For_23_Template, 22, 23, "tr", 276, _forTrack0, false, ProjectDetailsComponent_Conditional_65_Conditional_11_ForEmpty_24_Template, 4, 3, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 6, "DETAILS.TH_DATE"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 8, "PROJECTS.FIELD_DESC"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 10, "DETAILS.TH_STATUS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 12, "DETAILS.TH_AMOUNT"));
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.isOwnerOrAccountant() ? 20 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.transactions());
  }
}
function ProjectDetailsComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 264)(2, "h3", 265);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 89);
    \u0275\u0275conditionalCreate(6, ProjectDetailsComponent_Conditional_65_Conditional_6_Template, 2, 1, "button", 356);
    \u0275\u0275elementStart(7, "span", 267);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(10, ProjectDetailsComponent_Conditional_65_Conditional_10_Template, 4, 0, "div", 268)(11, ProjectDetailsComponent_Conditional_65_Conditional_11_Template, 25, 14, "div", 269);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 5, "DETAILS.LEDGER_TITLE"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.isOwnerOrAccountant() ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.transactions().length, " ", \u0275\u0275pipeBind1(9, 7, "DETAILS.ENTRIES"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isLoadingTransactions() ? 10 : 11);
  }
}
function ProjectDetailsComponent_Conditional_66_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 372);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r0.profileForm.get("bannerUrl")?.value, \u0275\u0275sanitizeUrl);
  }
}
function ProjectDetailsComponent_Conditional_66_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 373)(1, "span", 401);
    \u0275\u0275text(2, "\u0644\u0627 \u064A\u0648\u062C\u062F \u0628\u0627\u0646\u0631 / No Banner");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_Conditional_66_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062C\u0627\u0631\u064A \u0627\u0644\u0631\u0641\u0639... ");
  }
}
function ProjectDetailsComponent_Conditional_66_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0628\u0627\u0646\u0631 / Change Banner ");
  }
}
function ProjectDetailsComponent_Conditional_66_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 378);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r0.profileForm.get("logoUrl")?.value, \u0275\u0275sanitizeUrl);
  }
}
function ProjectDetailsComponent_Conditional_66_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 379);
    \u0275\u0275text(1, "Logo");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_66_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062C\u0627\u0631\u064A... ");
  }
}
function ProjectDetailsComponent_Conditional_66_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062A\u063A\u064A\u064A\u0631 / Change ");
  }
}
function ProjectDetailsComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 367)(2, "h3", 368);
    \u0275\u0275text(3, "\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 / Edit Company Profile");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "form", 369);
    \u0275\u0275listener("ngSubmit", function ProjectDetailsComponent_Conditional_66_Template_form_ngSubmit_4_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onProfileSubmit());
    });
    \u0275\u0275elementStart(5, "div")(6, "label", 370);
    \u0275\u0275text(7, "\u0628\u0627\u0646\u0631 \u0627\u0644\u0634\u0631\u0643\u0629 / Company Banner");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 371);
    \u0275\u0275conditionalCreate(9, ProjectDetailsComponent_Conditional_66_Conditional_9_Template, 1, 1, "img", 372)(10, ProjectDetailsComponent_Conditional_66_Conditional_10_Template, 3, 0, "div", 373);
    \u0275\u0275elementStart(11, "button", 374);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_66_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r49);
      const bannerFileInput_r50 = \u0275\u0275reference(16);
      return \u0275\u0275resetView(bannerFileInput_r50.click());
    });
    \u0275\u0275elementStart(12, "span", 375);
    \u0275\u0275conditionalCreate(13, ProjectDetailsComponent_Conditional_66_Conditional_13_Template, 1, 0)(14, ProjectDetailsComponent_Conditional_66_Conditional_14_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "input", 242, 2);
    \u0275\u0275listener("change", function ProjectDetailsComponent_Conditional_66_Template_input_change_15_listener($event) {
      \u0275\u0275restoreView(_r49);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onBannerFileSelected($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 376)(18, "div", 377);
    \u0275\u0275conditionalCreate(19, ProjectDetailsComponent_Conditional_66_Conditional_19_Template, 1, 1, "img", 378)(20, ProjectDetailsComponent_Conditional_66_Conditional_20_Template, 2, 0, "span", 379);
    \u0275\u0275elementStart(21, "button", 380);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_66_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r49);
      const logoFileInput_r51 = \u0275\u0275reference(26);
      return \u0275\u0275resetView(logoFileInput_r51.click());
    });
    \u0275\u0275elementStart(22, "span", 381);
    \u0275\u0275conditionalCreate(23, ProjectDetailsComponent_Conditional_66_Conditional_23_Template, 1, 0)(24, ProjectDetailsComponent_Conditional_66_Conditional_24_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "input", 242, 3);
    \u0275\u0275listener("change", function ProjectDetailsComponent_Conditional_66_Template_input_change_25_listener($event) {
      \u0275\u0275restoreView(_r49);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onLogoFileSelected($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 382)(28, "div")(29, "label", 383);
    \u0275\u0275text(30, "\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 / Company Name *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "input", 384);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 385)(33, "div")(34, "label", 386);
    \u0275\u0275text(35, "\u0627\u0644\u0645\u0646\u0637\u0642\u0629 / Region");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "input", 387);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div")(38, "label", 388);
    \u0275\u0275text(39, "\u0648\u0635\u0641 \u0627\u0644\u0634\u0631\u0643\u0629 / Company Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(40, "textarea", 389);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 390)(42, "button", 391);
    \u0275\u0275text(43, " \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A / Save Settings ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(44, "div", 392)(45, "h3", 368);
    \u0275\u0275text(46, "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062E\u0635\u0648\u0635\u064A\u0629 \u0648\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 / Project Visibility Settings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "p", 393);
    \u0275\u0275text(48, "\u062D\u062F\u062F \u0645\u0627 \u0625\u0630\u0627 \u0643\u0627\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0633\u064A\u0638\u0647\u0631 \u0644\u0644\u0639\u0627\u0645\u0629 \u0641\u064A \u0645\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u0627\u062A \u0648\u0627\u0644\u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0639\u0627\u0645 \u0644\u0634\u0631\u0643\u062A\u0643 \u0623\u0645 \u0633\u064A\u0638\u0644 \u062E\u0627\u0635\u0627\u064B.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "form", 394);
    \u0275\u0275listener("ngSubmit", function ProjectDetailsComponent_Conditional_66_Template_form_ngSubmit_49_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onProjectSettingsSubmit());
    });
    \u0275\u0275elementStart(50, "div", 395)(51, "div", 396)(52, "label", 397);
    \u0275\u0275text(53, "\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0641\u064A \u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0639\u0627\u0645 / Show on Public Portfolio Gallery");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "p", 398);
    \u0275\u0275text(55, "\u0639\u0646\u062F \u0627\u0644\u062A\u0641\u0639\u064A\u0644\u060C \u0633\u064A\u062A\u0645 \u0625\u062A\u0627\u062D\u0629 \u0635\u0648\u0631 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0644\u0644\u0632\u0648\u0627\u0631 \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 399);
    \u0275\u0275element(57, "input", 400);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "div", 390)(59, "button", 391);
    \u0275\u0275text(60, " \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629 / Update Visibility ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx_r0.profileForm);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.profileForm.get("bannerUrl")?.value ? 9 : 10);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.isUploadingBanner() ? 13 : 14);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r0.profileForm.get("logoUrl")?.value ? 19 : 20);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.isUploadingLogo() ? 23 : 24);
    \u0275\u0275advance(8);
    \u0275\u0275control();
    \u0275\u0275advance(5);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.profileForm.invalid || ctx_r0.isSavingProfile());
    \u0275\u0275advance(7);
    \u0275\u0275property("formGroup", ctx_r0.projectSettingsForm);
    \u0275\u0275advance(8);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isSavingProjectSettings());
  }
}
function ProjectDetailsComponent_Conditional_67_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 410)(1, "div", 436)(2, "span", 20);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 437);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 436)(8, "span", 20);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 438);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 436)(16, "span", 20);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 439);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 7, "DETAILS.INFO_ISSUED_TO"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.activePettyCash().issuedTo || "Staff");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 9, "DETAILS.INFO_ISSUED_AMOUNT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(13, 11, ctx_r0.activePettyCash().amount, "1.2-2"), " ", \u0275\u0275pipeBind1(14, 14, "COMMON.CURRENCY"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 16, "DETAILS.INFO_REASON"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.activePettyCash().reason);
  }
}
function ProjectDetailsComponent_Conditional_67_Conditional_15_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r53 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2022 ", err_r53);
  }
}
function ProjectDetailsComponent_Conditional_67_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 411)(1, "span", 440);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, ProjectDetailsComponent_Conditional_67_Conditional_15_For_5_Template, 2, 1, "div", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, "DETAILS.SETTLE_FAILED"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.settleErrors());
  }
}
function ProjectDetailsComponent_Conditional_67_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 415);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "DETAILS.INPUT_SPENT_ERR"), " ");
  }
}
function ProjectDetailsComponent_Conditional_67_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 415);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "DETAILS.INPUT_NOTES_ERR"), " ");
  }
}
function ProjectDetailsComponent_Conditional_67_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 415);
    \u0275\u0275text(1, "Expense Date is required.");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_67_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 415);
    \u0275\u0275text(1, " Payment Method is required. ");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_67_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 432);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 441);
    \u0275\u0275element(2, "circle", 145)(3, "path", 146);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Uploading receipt... ");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_67_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 150);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 156);
    \u0275\u0275element(2, "circle", 145)(3, "path", 146);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 1, "DETAILS.PROCESSING"), " ");
  }
}
function ProjectDetailsComponent_Conditional_67_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062A\u0633\u0648\u064A\u0629 ");
  }
}
function ProjectDetailsComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275element(1, "div", 402);
    \u0275\u0275elementStart(2, "div", 403)(3, "div", 404)(4, "div")(5, "h3", 405);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 406);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 407);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_67_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r52);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeSettleModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 408);
    \u0275\u0275element(13, "path", 409);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(14, ProjectDetailsComponent_Conditional_67_Conditional_14_Template, 21, 18, "div", 410);
    \u0275\u0275conditionalCreate(15, ProjectDetailsComponent_Conditional_67_Conditional_15_Template, 6, 3, "div", 411);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "form", 394);
    \u0275\u0275listener("ngSubmit", function ProjectDetailsComponent_Conditional_67_Template_form_ngSubmit_16_listener() {
      \u0275\u0275restoreView(_r52);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSettleSubmit());
    });
    \u0275\u0275elementStart(17, "div")(18, "label", 412);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementStart(21, "span", 413);
    \u0275\u0275text(22, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(23, "input", 414);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(24, ProjectDetailsComponent_Conditional_67_Conditional_24_Template, 3, 3, "span", 415);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div")(26, "label", 416);
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "translate");
    \u0275\u0275elementStart(29, "span", 413);
    \u0275\u0275text(30, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(31, "textarea", 417);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(32, ProjectDetailsComponent_Conditional_67_Conditional_32_Template, 3, 3, "span", 415);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div")(34, "label", 418);
    \u0275\u0275text(35, " \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u0641\u0639\u0644\u064A ");
    \u0275\u0275elementStart(36, "span", 413);
    \u0275\u0275text(37, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 28)(39, "input", 419);
    \u0275\u0275listener("input", function ProjectDetailsComponent_Conditional_67_Template_input_input_39_listener($event) {
      \u0275\u0275restoreView(_r52);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDateInputChanged($event, "expenseDate", ctx_r0.settleForm));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "input", 420, 4);
    \u0275\u0275listener("change", function ProjectDetailsComponent_Conditional_67_Template_input_change_40_listener($event) {
      \u0275\u0275restoreView(_r52);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onNativeDatePicked($event, "expenseDate", ctx_r0.settleForm));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 421);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_67_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r52);
      const expenseDatePicker_r54 = \u0275\u0275reference(41);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openDatePicker(expenseDatePicker_r54));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(43, "svg", 69);
    \u0275\u0275element(44, "path", 422);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(45, ProjectDetailsComponent_Conditional_67_Conditional_45_Template, 2, 0, "span", 415);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(46, "div")(47, "label", 423);
    \u0275\u0275text(48, " Payment Method / \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639 ");
    \u0275\u0275elementStart(49, "span", 413);
    \u0275\u0275text(50, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "select", 424)(52, "option", 425);
    \u0275\u0275text(53, "Select Method");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "option", 426);
    \u0275\u0275text(55, "\u0643\u0627\u0634 (Cash)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "option", 427);
    \u0275\u0275text(57, "\u0625\u0646\u0633\u062A\u0627 \u0628\u0627\u064A (InstaPay)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "option", 428);
    \u0275\u0275text(59, "\u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u0643\u064A (Bank Transfer)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "option", 429);
    \u0275\u0275text(61, "\u0634\u064A\u0643 (Cheque)");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(62, ProjectDetailsComponent_Conditional_67_Conditional_62_Template, 2, 0, "span", 415);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div")(64, "label", 430);
    \u0275\u0275text(65, " \u0625\u0631\u0641\u0627\u0642 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 / \u0625\u064A\u0635\u0627\u0644 \u0627\u0644\u0635\u0631\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "input", 431);
    \u0275\u0275listener("change", function ProjectDetailsComponent_Conditional_67_Template_input_change_66_listener($event) {
      \u0275\u0275restoreView(_r52);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSettleReceiptSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(67, ProjectDetailsComponent_Conditional_67_Conditional_67_Template, 5, 0, "span", 432);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 433)(69, "button", 434);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_67_Template_button_click_69_listener() {
      \u0275\u0275restoreView(_r52);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeSettleModal());
    });
    \u0275\u0275text(70);
    \u0275\u0275pipe(71, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "button", 435);
    \u0275\u0275conditionalCreate(73, ProjectDetailsComponent_Conditional_67_Conditional_73_Template, 6, 3, "span", 150)(74, ProjectDetailsComponent_Conditional_67_Conditional_74_Template, 1, 0);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 18, "DETAILS.MODAL_SETTLE_TITLE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 20, "DETAILS.MODAL_SETTLE_SUBTITLE"));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.activePettyCash() ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.settleErrors().length > 0 ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.settleForm);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(20, 22, "DETAILS.INPUT_SPENT"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isSettleFieldInvalid("spentAmount") ? 24 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(28, 24, "DETAILS.INPUT_NOTES"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isSettleFieldInvalid("receiptDescription") ? 32 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r0.formatDisplayDate(ctx_r0.settleForm.get("expenseDate")?.value));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.settleForm.get("expenseDate")?.value);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.isSettleFieldInvalid("expenseDate") ? 45 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(10);
    \u0275\u0275conditional(ctx_r0.isSettleFieldInvalid("settlementPaymentMethod") ? 62 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.isUploadingSettleReceipt() ? 67 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(71, 26, "COMMON.CANCEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.settleForm.invalid || ctx_r0.isSettling());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isSettling() ? 73 : 74);
  }
}
function ProjectDetailsComponent_Conditional_68_Conditional_14_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r56 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2022 ", err_r56);
  }
}
function ProjectDetailsComponent_Conditional_68_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 411)(1, "span", 440);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, ProjectDetailsComponent_Conditional_68_Conditional_14_For_5_Template, 2, 1, "div", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, "DETAILS.REQUEST_FAILED"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.requestErrors());
  }
}
function ProjectDetailsComponent_Conditional_68_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 415);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "DETAILS.INPUT_AMOUNT_ERR"), " ");
  }
}
function ProjectDetailsComponent_Conditional_68_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 444);
    \u0275\u0275text(1, " \u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0644\u0644\u0639\u0647\u062F\u0629 \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u062D \u0641\u064A \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0645\u062D\u062F\u062F! / The requested amount exceeds the available balance! ");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_68_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 415);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "DETAILS.INPUT_REASON_ERR"), " ");
  }
}
function ProjectDetailsComponent_Conditional_68_Conditional_33_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 449);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275pipe(4, "number");
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pool_r57 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("value", pool_r57.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4("", \u0275\u0275pipeBind1(2, 5, "FINANCE." + ctx_r0.getPoolSourceTranslationKey(pool_r57.sourceType)), " (", \u0275\u0275pipeBind1(3, 7, "DETAILS.BAL_PREFIX"), ": ", \u0275\u0275pipeBind2(4, 9, pool_r57.availableBalance, "1.2-2"), " ", \u0275\u0275pipeBind1(5, 12, "COMMON.CURRENCY"), ")");
  }
}
function ProjectDetailsComponent_Conditional_68_Conditional_33_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 415);
    \u0275\u0275text(1, "Please select a funding source pool.");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_68_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "label", 447);
    \u0275\u0275text(2, " Disburse From Pool ");
    \u0275\u0275elementStart(3, "span", 413);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 448)(6, "option", 425);
    \u0275\u0275text(7, "Select funding source...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, ProjectDetailsComponent_Conditional_68_Conditional_33_For_9_Template, 6, 14, "option", 449, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(10, ProjectDetailsComponent_Conditional_68_Conditional_33_Conditional_10_Template, 2, 0, "span", 415);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.cashPools());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isRequestFieldInvalid("sourcePoolId") ? 10 : -1);
  }
}
function ProjectDetailsComponent_Conditional_68_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 150);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 156);
    \u0275\u0275element(2, "circle", 145)(3, "path", 146);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 1, "DETAILS.BTN_SUBMITTING"), " ");
  }
}
function ProjectDetailsComponent_Conditional_68_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "DETAILS.BTN_REQUEST_SUBMIT"), " ");
  }
}
function ProjectDetailsComponent_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275element(1, "div", 402);
    \u0275\u0275elementStart(2, "div", 403)(3, "div", 404)(4, "div")(5, "h3", 405);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 406);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 407);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_68_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r55);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeRequestModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 408);
    \u0275\u0275element(13, "path", 409);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(14, ProjectDetailsComponent_Conditional_68_Conditional_14_Template, 6, 3, "div", 411);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "form", 394);
    \u0275\u0275listener("ngSubmit", function ProjectDetailsComponent_Conditional_68_Template_form_ngSubmit_15_listener() {
      \u0275\u0275restoreView(_r55);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onRequestSubmit());
    });
    \u0275\u0275elementStart(16, "div")(17, "label", 442);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementStart(20, "span", 413);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(22, "input", 443);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(23, ProjectDetailsComponent_Conditional_68_Conditional_23_Template, 3, 3, "span", 415);
    \u0275\u0275conditionalCreate(24, ProjectDetailsComponent_Conditional_68_Conditional_24_Template, 2, 0, "span", 444);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div")(26, "label", 445);
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "translate");
    \u0275\u0275elementStart(29, "span", 413);
    \u0275\u0275text(30, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(31, "textarea", 446);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(32, ProjectDetailsComponent_Conditional_68_Conditional_32_Template, 3, 3, "span", 415);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(33, ProjectDetailsComponent_Conditional_68_Conditional_33_Template, 11, 2, "div");
    \u0275\u0275elementStart(34, "div", 433)(35, "button", 434);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_68_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r55);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeRequestModal());
    });
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 435);
    \u0275\u0275conditionalCreate(39, ProjectDetailsComponent_Conditional_68_Conditional_39_Template, 6, 3, "span", 150)(40, ProjectDetailsComponent_Conditional_68_Conditional_40_Template, 2, 3);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 13, "DETAILS.MODAL_REQUEST_TITLE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 15, "DETAILS.MODAL_REQUEST_SUBTITLE"));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.requestErrors().length > 0 ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.requestForm);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 17, "DETAILS.INPUT_AMOUNT"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isRequestFieldInvalid("amount") ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.requestForm.get("amount")?.hasError("insufficientBalance") ? 24 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(28, 19, "DETAILS.INPUT_REASON"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isRequestFieldInvalid("reason") ? 32 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isTenantOwner() ? 33 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(37, 21, "COMMON.CANCEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.requestForm.invalid || ctx_r0.isRequesting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isRequesting() ? 39 : 40);
  }
}
function ProjectDetailsComponent_Conditional_69_Conditional_10_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const error_r59 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(error_r59);
  }
}
function ProjectDetailsComponent_Conditional_69_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 454)(1, "ul", 470);
    \u0275\u0275repeaterCreate(2, ProjectDetailsComponent_Conditional_69_Conditional_10_For_3_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.injectErrors());
  }
}
function ProjectDetailsComponent_Conditional_69_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "COMMON.LOADING"), " ");
  }
}
function ProjectDetailsComponent_Conditional_69_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "DETAILS.INJECT_CAPITAL"), " ");
  }
}
function ProjectDetailsComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275element(1, "div", 402);
    \u0275\u0275elementStart(2, "div", 450)(3, "div", 451)(4, "h3", 452);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 453);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_69_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeInjectModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 129);
    \u0275\u0275element(9, "path", 409);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(10, ProjectDetailsComponent_Conditional_69_Conditional_10_Template, 4, 0, "div", 454);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(11, "form", 455);
    \u0275\u0275listener("ngSubmit", function ProjectDetailsComponent_Conditional_69_Template_form_ngSubmit_11_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitCapitalInjection());
    });
    \u0275\u0275elementStart(12, "div")(13, "label", 430);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementStart(16, "span", 413);
    \u0275\u0275text(17, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(18, "input", 456);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div")(20, "label", 430);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementStart(23, "span", 413);
    \u0275\u0275text(24, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "select", 457)(26, "option", 425);
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "option", 458);
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "option", 459);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 460);
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 461)(39, "div")(40, "label", 430);
    \u0275\u0275text(41, " Payment Date ");
    \u0275\u0275elementStart(42, "span", 413);
    \u0275\u0275text(43, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 28)(45, "input", 462);
    \u0275\u0275listener("input", function ProjectDetailsComponent_Conditional_69_Template_input_input_45_listener($event) {
      \u0275\u0275restoreView(_r58);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDateInputChanged($event, "paymentDate", ctx_r0.injectForm));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "input", 420, 5);
    \u0275\u0275listener("change", function ProjectDetailsComponent_Conditional_69_Template_input_change_46_listener($event) {
      \u0275\u0275restoreView(_r58);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onNativeDatePicked($event, "paymentDate", ctx_r0.injectForm));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "button", 421);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_69_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r58);
      const injectDatePicker_r60 = \u0275\u0275reference(47);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openDatePicker(injectDatePicker_r60));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(49, "svg", 69);
    \u0275\u0275element(50, "path", 422);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(51, "div")(52, "label", 430);
    \u0275\u0275text(53, " Payment Method ");
    \u0275\u0275elementStart(54, "span", 413);
    \u0275\u0275text(55, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "select", 463)(57, "option", 425);
    \u0275\u0275text(58, "Select Method");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "option", 426);
    \u0275\u0275text(60, "Cash");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "option", 428);
    \u0275\u0275text(62, "Bank Transfer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "option", 427);
    \u0275\u0275text(64, "InstaPay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "option", 429);
    \u0275\u0275text(66, "Cheque");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div")(68, "label", 430);
    \u0275\u0275text(69);
    \u0275\u0275pipe(70, "translate");
    \u0275\u0275elementStart(71, "span", 413);
    \u0275\u0275text(72, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(73, "textarea", 464);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "div")(75, "label", 430);
    \u0275\u0275text(76, " Receipt / Proof of Payment ");
    \u0275\u0275elementStart(77, "span", 465);
    \u0275\u0275text(78, "(Optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "input", 466);
    \u0275\u0275listener("change", function ProjectDetailsComponent_Conditional_69_Template_input_change_79_listener($event) {
      \u0275\u0275restoreView(_r58);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onInjectReceiptSelected($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(80, "div", 467)(81, "button", 468);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_69_Template_button_click_81_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeInjectModal());
    });
    \u0275\u0275text(82);
    \u0275\u0275pipe(83, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "button", 469);
    \u0275\u0275conditionalCreate(85, ProjectDetailsComponent_Conditional_69_Conditional_85_Template, 2, 3)(86, ProjectDetailsComponent_Conditional_69_Conditional_86_Template, 2, 3);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 17, "DETAILS.INJECT_CAPITAL"));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.injectErrors().length > 0 ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.injectForm);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(15, 19, "FINANCE.AMOUNT"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 21, "FINANCE.SOURCE_TYPE"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(28, 23, "FINANCE.SELECT_SOURCE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(31, 25, "FINANCE.CLIENT_DEPOSIT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(34, 27, "FINANCE.OWNER_CAPITAL"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(37, 29, "FINANCE.EXTERNAL_LOAN"));
    \u0275\u0275advance(9);
    \u0275\u0275property("value", ctx_r0.formatDisplayDate(ctx_r0.injectForm.get("paymentDate")?.value));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.injectForm.get("paymentDate")?.value);
    \u0275\u0275advance(10);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(70, 31, "FINANCE.NOTES_REFERENCE"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(83, 33, "COMMON.CANCEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.injectForm.invalid || ctx_r0.isInjecting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isInjecting() ? 85 : 86);
  }
}
function ProjectDetailsComponent_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r61 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275element(1, "div", 402);
    \u0275\u0275elementStart(2, "div", 471)(3, "div", 472)(4, "h3", 452);
    \u0275\u0275text(5, "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0639\u0647\u062F\u0629 \u0627\u0644\u0646\u0642\u062F\u064A\u0629 (Edit Petty Cash)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 453);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_70_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r61);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeEditPettyCashModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 129);
    \u0275\u0275element(8, "path", 409);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "form", 473);
    \u0275\u0275listener("ngSubmit", function ProjectDetailsComponent_Conditional_70_Template_form_ngSubmit_9_listener() {
      \u0275\u0275restoreView(_r61);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitEditPettyCash());
    });
    \u0275\u0275elementStart(10, "div")(11, "label", 370);
    \u0275\u0275text(12, "Amount / \u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 474);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div")(15, "label", 370);
    \u0275\u0275text(16, "Category / \u0627\u0644\u062A\u0635\u0646\u064A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 475)(18, "option", 476);
    \u0275\u0275text(19, "Cement / \u0623\u0633\u0645\u0646\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 477);
    \u0275\u0275text(21, "Logistics / \u062E\u062F\u0645\u0627\u062A \u0644\u0648\u062C\u0633\u062A\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 478);
    \u0275\u0275text(23, "Materials / \u0645\u0648\u0627\u062F \u0628\u0646\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 479);
    \u0275\u0275text(25, "Labor / \u062D\u0648\u0627\u0641\u0632 \u0648\u0623\u062C\u0648\u0631 \u0639\u0645\u0627\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 480);
    \u0275\u0275text(27, "Other / \u0623\u062E\u0631\u0649");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div")(29, "label", 370);
    \u0275\u0275text(30, "Reason / \u0627\u0644\u0633\u0628\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "textarea", 481);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 433)(33, "button", 482);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_70_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r61);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeEditPettyCashModal());
    });
    \u0275\u0275text(34, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 483);
    \u0275\u0275text(36, "\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("formGroup", ctx_r0.editPettyCashForm);
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(14);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.editPettyCashForm.invalid || ctx_r0.isEditingPettyCash());
  }
}
function ProjectDetailsComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    const _r62 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275element(1, "div", 402);
    \u0275\u0275elementStart(2, "div", 471)(3, "div", 472)(4, "h3", 452);
    \u0275\u0275text(5, "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 (Edit Transaction)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 453);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_71_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r62);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeEditTransactionModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 129);
    \u0275\u0275element(8, "path", 409);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "form", 473);
    \u0275\u0275listener("ngSubmit", function ProjectDetailsComponent_Conditional_71_Template_form_ngSubmit_9_listener() {
      \u0275\u0275restoreView(_r62);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitEditTransaction());
    });
    \u0275\u0275elementStart(10, "div")(11, "label", 370);
    \u0275\u0275text(12, "Amount / \u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 474);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div")(15, "label", 370);
    \u0275\u0275text(16, "Description / \u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "textarea", 484);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 433)(19, "button", 482);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_71_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r62);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeEditTransactionModal());
    });
    \u0275\u0275text(20, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 483);
    \u0275\u0275text(22, "\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("formGroup", ctx_r0.editTransactionForm);
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.editTransactionForm.invalid || ctx_r0.isSavingTransaction());
  }
}
function ProjectDetailsComponent_Conditional_72_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 488);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 441);
    \u0275\u0275element(2, "circle", 145)(3, "path", 146);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Uploading BOQ document... ");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_72_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "COMMON.LOADING"), " ");
  }
}
function ProjectDetailsComponent_Conditional_72_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A ");
  }
}
function ProjectDetailsComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275element(1, "div", 402);
    \u0275\u0275elementStart(2, "div", 471)(3, "div", 472)(4, "h3", 452);
    \u0275\u0275text(5, "\u062A\u0639\u062F\u064A\u0644 \u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 (Revise Budget)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 453);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_72_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r63);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeReviseBudgetModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 129);
    \u0275\u0275element(8, "path", 409);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "form", 473);
    \u0275\u0275listener("ngSubmit", function ProjectDetailsComponent_Conditional_72_Template_form_ngSubmit_9_listener() {
      \u0275\u0275restoreView(_r63);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitReviseBudget());
    });
    \u0275\u0275elementStart(10, "div")(11, "label", 370);
    \u0275\u0275text(12, "New Budget / \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 ");
    \u0275\u0275elementStart(13, "span", 413);
    \u0275\u0275text(14, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(15, "input", 485);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div")(17, "label", 370);
    \u0275\u0275text(18, "Reason / \u0633\u0628\u0628 \u0627\u0644\u062A\u063A\u064A\u064A\u0631 ");
    \u0275\u0275elementStart(19, "span", 413);
    \u0275\u0275text(20, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(21, "textarea", 486);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div")(23, "label", 370);
    \u0275\u0275text(24, "BOQ Document / \u062C\u062F\u0648\u0644 \u0627\u0644\u0643\u0645\u064A\u0627\u062A (PDF, Excel) ");
    \u0275\u0275elementStart(25, "span", 465);
    \u0275\u0275text(26, "(Optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "input", 487);
    \u0275\u0275listener("change", function ProjectDetailsComponent_Conditional_72_Template_input_change_27_listener($event) {
      \u0275\u0275restoreView(_r63);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onBoqFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(28, ProjectDetailsComponent_Conditional_72_Conditional_28_Template, 5, 0, "span", 488);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 433)(30, "button", 482);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_72_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r63);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeReviseBudgetModal());
    });
    \u0275\u0275text(31, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 483);
    \u0275\u0275conditionalCreate(33, ProjectDetailsComponent_Conditional_72_Conditional_33_Template, 2, 3)(34, ProjectDetailsComponent_Conditional_72_Conditional_34_Template, 1, 0);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("formGroup", ctx_r0.reviseBudgetForm);
    \u0275\u0275advance(6);
    \u0275\u0275control();
    \u0275\u0275advance(6);
    \u0275\u0275control();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r0.isUploadingBoq() ? 28 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.reviseBudgetForm.invalid || ctx_r0.isRevisingBudget() || ctx_r0.isUploadingBoq());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isRevisingBudget() ? 33 : 34);
  }
}
function ProjectDetailsComponent_Conditional_73_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r65 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(err_r65);
  }
}
function ProjectDetailsComponent_Conditional_73_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 489);
    \u0275\u0275repeaterCreate(1, ProjectDetailsComponent_Conditional_73_Conditional_9_For_2_Template, 2, 1, "div", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.disburseErrors());
  }
}
function ProjectDetailsComponent_Conditional_73_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 449);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r66 = ctx.$implicit;
    \u0275\u0275property("value", u_r66.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", u_r66.firstName, " ", u_r66.lastName, " (", u_r66.role, ")");
  }
}
function ProjectDetailsComponent_Conditional_73_For_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 449);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pool_r67 = ctx.$implicit;
    \u0275\u0275property("value", pool_r67.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", pool_r67.sourceType, " (", pool_r67.availableBalance, " EGP)");
  }
}
function ProjectDetailsComponent_Conditional_73_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0648\u064A\u0644... ");
  }
}
function ProjectDetailsComponent_Conditional_73_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062A\u062D\u0648\u064A\u0644 ");
  }
}
function ProjectDetailsComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r64 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275element(1, "div", 402);
    \u0275\u0275elementStart(2, "div", 471)(3, "div", 472)(4, "h3", 452);
    \u0275\u0275text(5, "\u062A\u0639\u0632\u064A\u0632 \u0639\u0647\u062F\u0629 \u0645\u0628\u0627\u0634\u0631 / Direct Disbursement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 453);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_73_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r64);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDisburseModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 129);
    \u0275\u0275element(8, "path", 409);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(9, ProjectDetailsComponent_Conditional_73_Conditional_9_Template, 3, 0, "div", 489);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "form", 473);
    \u0275\u0275listener("ngSubmit", function ProjectDetailsComponent_Conditional_73_Template_form_ngSubmit_10_listener() {
      \u0275\u0275restoreView(_r64);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDisburseSubmit());
    });
    \u0275\u0275elementStart(11, "div")(12, "label", 370);
    \u0275\u0275text(13, "\u0627\u0644\u0645\u0647\u0646\u062F\u0633 / Engineer ");
    \u0275\u0275elementStart(14, "span", 490);
    \u0275\u0275text(15, "(\u0627\u062E\u062A\u064A\u0627\u0631\u064A \u2014 \u0625\u0630\u0627 \u0641\u0627\u0631\u063A\u060C \u0633\u062A\u064F\u0633\u062C\u0644 \u0627\u0644\u0639\u0647\u062F\u0629 \u0644\u062D\u0633\u0627\u0628\u0643)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "select", 491)(17, "option", 492);
    \u0275\u0275text(18, "-- \u0644\u0646\u0641\u0633\u064A (\u0627\u0644\u0623\u062F\u0645\u0646 \u0627\u0644\u062D\u0627\u0644\u064A) / Self --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(19, ProjectDetailsComponent_Conditional_73_For_20_Template, 2, 4, "option", 449, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 461)(22, "div")(23, "label", 370);
    \u0275\u0275text(24, "\u0627\u0644\u0645\u0628\u0644\u063A / Amount ");
    \u0275\u0275elementStart(25, "span", 413);
    \u0275\u0275text(26, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(27, "input", 474);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div")(29, "label", 370);
    \u0275\u0275text(30, "\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639 / Payment Method ");
    \u0275\u0275elementStart(31, "span", 413);
    \u0275\u0275text(32, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "select", 493)(34, "option", 426);
    \u0275\u0275text(35, "Cash / \u0646\u0642\u062F\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "option", 428);
    \u0275\u0275text(37, "Bank Transfer / \u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u0643\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "option", 427);
    \u0275\u0275text(39, "InstaPay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "option", 429);
    \u0275\u0275text(41, "Cheque / \u0634\u064A\u0643");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div")(43, "label", 370);
    \u0275\u0275text(44, "\u0645\u0635\u062F\u0631 \u0627\u0644\u062A\u0645\u0648\u064A\u0644 / Fund Pool ");
    \u0275\u0275elementStart(45, "span", 413);
    \u0275\u0275text(46, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "select", 494)(48, "option", 425);
    \u0275\u0275text(49, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0646\u062F\u0648\u0642 / Select Pool");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(50, ProjectDetailsComponent_Conditional_73_For_51_Template, 2, 3, "option", 449, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "div")(53, "label", 370);
    \u0275\u0275text(54, "\u0627\u0644\u0628\u064A\u0627\u0646 / Notes ");
    \u0275\u0275elementStart(55, "span", 413);
    \u0275\u0275text(56, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(57, "textarea", 495);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 433)(59, "button", 482);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_73_Template_button_click_59_listener() {
      \u0275\u0275restoreView(_r64);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDisburseModal());
    });
    \u0275\u0275text(60, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "button", 496);
    \u0275\u0275conditionalCreate(62, ProjectDetailsComponent_Conditional_73_Conditional_62_Template, 1, 0)(63, ProjectDetailsComponent_Conditional_73_Conditional_63_Template, 1, 0);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r0.disburseErrors().length > 0 ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.disburseForm);
    \u0275\u0275advance(6);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.usersList());
    \u0275\u0275advance(8);
    \u0275\u0275control();
    \u0275\u0275advance(6);
    \u0275\u0275control();
    \u0275\u0275advance(14);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.cashPools());
    \u0275\u0275advance(7);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.disburseForm.invalid || ctx_r0.isDisbursing());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isDisbursing() ? 62 : 63);
  }
}
function ProjectDetailsComponent_Conditional_74_Conditional_17_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r69 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(err_r69);
  }
}
function ProjectDetailsComponent_Conditional_74_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 489);
    \u0275\u0275repeaterCreate(1, ProjectDetailsComponent_Conditional_74_Conditional_17_For_2_Template, 2, 1, "div", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.settlementErrors());
  }
}
function ProjectDetailsComponent_Conditional_74_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r70 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 522);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_74_Conditional_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r70);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.addSettlementLine());
    });
    \u0275\u0275text(1, " + \u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F / Add Line ");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_74_For_34_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r72 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 533);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_74_For_34_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r72);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onSettlementSubmit(true));
    });
    \u0275\u0275text(1, " \u{1F4BE} \u062D\u0641\u0638 \u0627\u0644\u0628\u0646\u062F / Save Item ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 534);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_74_For_34_Conditional_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r72);
      const \u0275$index_2515_r73 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.removeSettlementLine(\u0275$index_2515_r73));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 69);
    \u0275\u0275element(4, "path", 300);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r74 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", line_r74.invalid || ctx_r0.isSubmittingSettlement());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.settlementLines.length === 1);
  }
}
function ProjectDetailsComponent_Conditional_74_For_34_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 530);
    \u0275\u0275text(1, "Uploading...");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_74_For_34_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r75 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 535);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_74_For_34_Conditional_32_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r75);
      const line_r74 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.activePreviewPhotoUrl.set(line_r74.get("localPreviewUrl")?.value));
    });
    \u0275\u0275element(1, "img", 536);
    \u0275\u0275elementStart(2, "div", 537);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 538);
    \u0275\u0275element(4, "path", 539)(5, "path", 540);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const line_r74 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", line_r74.get("localPreviewUrl")?.value, \u0275\u0275sanitizeUrl);
  }
}
function ProjectDetailsComponent_Conditional_74_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r71 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 512)(1, "div", 523)(2, "span", 524);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 150);
    \u0275\u0275conditionalCreate(5, ProjectDetailsComponent_Conditional_74_For_34_Conditional_5_Template, 5, 2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 170)(7, "div")(8, "label", 525);
    \u0275\u0275text(9, "\u0627\u0644\u062A\u0635\u0646\u064A\u0641 / Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "select", 526)(11, "option", 476);
    \u0275\u0275text(12, "Cement / \u0623\u0633\u0645\u0646\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 477);
    \u0275\u0275text(14, "Logistics / \u062E\u062F\u0645\u0627\u062A \u0644\u0648\u062C\u0633\u062A\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 478);
    \u0275\u0275text(16, "Materials / \u0645\u0648\u0627\u062F \u0628\u0646\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 479);
    \u0275\u0275text(18, "Labor / \u062D\u0648\u0627\u0641\u0632 \u0648\u0623\u062C\u0648\u0631 \u0639\u0645\u0627\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 480);
    \u0275\u0275text(20, "Other / \u0623\u062E\u0631\u0649");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div")(22, "label", 525);
    \u0275\u0275text(23, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0635\u0631\u0648\u0641 / Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "input", 527);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div")(26, "label", 525);
    \u0275\u0275text(27, "\u0625\u064A\u0635\u0627\u0644 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 / Invoice Receipt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 89)(29, "div", 528)(30, "input", 529);
    \u0275\u0275listener("change", function ProjectDetailsComponent_Conditional_74_For_34_Template_input_change_30_listener($event) {
      const \u0275$index_2515_r73 = \u0275\u0275restoreView(_r71).$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onSettlementLineFileSelected($event, \u0275$index_2515_r73));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(31, ProjectDetailsComponent_Conditional_74_For_34_Conditional_31_Template, 2, 0, "span", 530);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(32, ProjectDetailsComponent_Conditional_74_For_34_Conditional_32_Template, 6, 1, "div", 531);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div")(34, "label", 525);
    \u0275\u0275text(35, "\u0627\u0644\u0628\u064A\u0627\u0646 / Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "input", 532);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r74 = ctx.$implicit;
    const \u0275$index_2515_r73 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("formGroupName", \u0275$index_2515_r73);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("\u0627\u0644\u0628\u0646\u062F #", \u0275$index_2515_r73 + 1, " / Item #", \u0275$index_2515_r73 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r0.isSettlementLocked() ? 5 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275control();
    \u0275\u0275advance(14);
    \u0275\u0275control();
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r0.isSettlementLocked());
    \u0275\u0275advance();
    \u0275\u0275conditional(line_r74.get("uploading")?.value ? 31 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(line_r74.get("localPreviewUrl")?.value ? 32 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275control();
  }
}
function ProjectDetailsComponent_Conditional_74_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 541);
    \u0275\u0275text(1, "\u0645\u062A\u0628\u0642\u064A \u064A\u062C\u0628 \u0625\u0631\u062C\u0627\u0639\u0647 \u0644\u0644\u062E\u0632\u064A\u0646\u0629 (Net Refund to Treasury):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 542);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("+", ctx_r0.selectedPettyCashForSettlement().amount - ctx_r0.calculateSettlementTotal(), " EGP");
  }
}
function ProjectDetailsComponent_Conditional_74_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 543);
    \u0275\u0275text(1, "\u0645\u0633\u062A\u062D\u0642 \u0644\u0644\u0645\u0647\u0646\u062F\u0633 (Due to Employee):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 544);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.selectedPettyCashForSettlement().amount - ctx_r0.calculateSettlementTotal(), " EGP");
  }
}
function ProjectDetailsComponent_Conditional_74_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 545);
    \u0275\u0275text(1, "\u062A\u0633\u0648\u064A\u0629 \u0645\u062A\u0637\u0627\u0628\u0642\u0629 \u062A\u0645\u0627\u0645\u0627\u064B (Matched):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 546);
    \u0275\u0275text(3, "0.00 EGP");
    \u0275\u0275elementEnd();
  }
}
function ProjectDetailsComponent_Conditional_74_Conditional_53_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638... ");
  }
}
function ProjectDetailsComponent_Conditional_74_Conditional_53_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F4BE} \u062D\u0641\u0638 \u0627\u0644\u0643\u0644 \u0643\u0645\u0633\u0648\u062F\u0629 / Save All Draft ");
  }
}
function ProjectDetailsComponent_Conditional_74_Conditional_53_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0642\u062F\u064A\u0645... ");
  }
}
function ProjectDetailsComponent_Conditional_74_Conditional_53_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F680} \u062A\u0642\u062F\u064A\u0645 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629 / Submit for Review ");
  }
}
function ProjectDetailsComponent_Conditional_74_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r76 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 520)(1, "button", 547);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_74_Conditional_53_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r76);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onSettlementSubmit(true));
    });
    \u0275\u0275conditionalCreate(2, ProjectDetailsComponent_Conditional_74_Conditional_53_Conditional_2_Template, 1, 0)(3, ProjectDetailsComponent_Conditional_74_Conditional_53_Conditional_3_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 548);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_74_Conditional_53_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r76);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onSettlementSubmit(false));
    });
    \u0275\u0275conditionalCreate(5, ProjectDetailsComponent_Conditional_74_Conditional_53_Conditional_5_Template, 1, 0)(6, ProjectDetailsComponent_Conditional_74_Conditional_53_Conditional_6_Template, 1, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.settlementForm.invalid || ctx_r0.isSubmittingSettlement());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isSubmittingSettlement() ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.settlementForm.invalid || ctx_r0.isSubmittingSettlement());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isSubmittingSettlement() ? 5 : 6);
  }
}
function ProjectDetailsComponent_Conditional_74_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r77 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 521)(1, "div", 497);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_74_Conditional_54_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r77);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.activePreviewPhotoUrl.set(null));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 549)(3, "button", 550);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_74_Conditional_54_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r77);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.activePreviewPhotoUrl.set(null));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 129);
    \u0275\u0275element(5, "path", 409);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(6, "img", 551);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("src", ctx_r0.activePreviewPhotoUrl(), \u0275\u0275sanitizeUrl);
  }
}
function ProjectDetailsComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    const _r68 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 497);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_74_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r68);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeSettlementModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 498)(3, "div", 472)(4, "div")(5, "h3", 452);
    \u0275\u0275text(6, "\u062A\u0633\u0648\u064A\u0629 \u0639\u0647\u062F\u0629 / Settlement Voucher");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 499);
    \u0275\u0275text(8, " \u0627\u0644\u0639\u0647\u062F \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0627\u0644\u0635\u0627\u062F\u0631\u0629: ");
    \u0275\u0275elementStart(9, "span", 500);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " | \u0628\u064A\u0627\u0646: ");
    \u0275\u0275elementStart(12, "span", 501);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "button", 453);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_74_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r68);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeSettlementModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 129);
    \u0275\u0275element(16, "path", 409);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(17, ProjectDetailsComponent_Conditional_74_Conditional_17_Template, 3, 0, "div", 489);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "form", 502)(19, "div", 503)(20, "div", 504)(21, "span", 505);
    \u0275\u0275text(22, "\u0628\u0646\u0648\u062F \u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631 \u0648\u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A / Invoice Line Items");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, ProjectDetailsComponent_Conditional_74_Conditional_23_Template, 2, 0, "button", 506);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 507)(25, "div")(26, "span", 508);
    \u0275\u0275text(27, "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062A\u0628\u0642\u064A \u0645\u0646 \u0627\u0644\u0639\u0647\u062F\u0629 / Remaining Custody");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 509);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 510);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 511);
    \u0275\u0275repeaterCreate(33, ProjectDetailsComponent_Conditional_74_For_34_Template, 37, 7, "div", 512, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 513)(36, "div", 514)(37, "span");
    \u0275\u0275text(38, "\u0625\u062C\u0645\u0627\u0644\u064A \u0645\u0628\u0644\u063A \u0627\u0644\u0639\u0647\u062F\u0629 \u0627\u0644\u0623\u0635\u0644\u064A:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 515);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 514)(42, "span");
    \u0275\u0275text(43, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0629 \u0628\u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 516);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 517);
    \u0275\u0275conditionalCreate(47, ProjectDetailsComponent_Conditional_74_Conditional_47_Template, 4, 1)(48, ProjectDetailsComponent_Conditional_74_Conditional_48_Template, 4, 1)(49, ProjectDetailsComponent_Conditional_74_Conditional_49_Template, 4, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(50, "div", 518)(51, "button", 519);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_74_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r68);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeSettlementModal());
    });
    \u0275\u0275text(52, "\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629 / Close");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(53, ProjectDetailsComponent_Conditional_74_Conditional_53_Template, 7, 4, "div", 520);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(54, ProjectDetailsComponent_Conditional_74_Conditional_54_Template, 7, 1, "div", 521);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", ctx_r0.selectedPettyCashForSettlement()?.amount, " EGP");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.selectedPettyCashForSettlement()?.reason);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.settlementErrors().length > 0 ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.settlementForm);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(!ctx_r0.isSettlementLocked() ? 23 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.selectedPettyCashForSettlement().amount - ctx_r0.calculateSettlementTotal(), " EGP ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u0625\u0635\u062F\u0627\u0631 \u0639\u0647\u062F\u0629 \u0628\u0642\u064A\u0645\u0629: ", ctx_r0.selectedPettyCashForSettlement()?.amount, " EGP ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.settlementLines.controls);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", ctx_r0.selectedPettyCashForSettlement()?.amount, " EGP");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.calculateSettlementTotal(), " EGP");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.selectedPettyCashForSettlement().amount - ctx_r0.calculateSettlementTotal() > 0 ? 47 : ctx_r0.selectedPettyCashForSettlement().amount - ctx_r0.calculateSettlementTotal() < 0 ? 48 : 49);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(!ctx_r0.isSettlementLocked() ? 53 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.activePreviewPhotoUrl() ? 54 : -1);
  }
}
function ProjectDetailsComponent_Conditional_75_For_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 568)(1, "td", 571);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 572);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 573);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r78 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 3, "FINANCE.CATEGORY_" + line_r78.category.toUpperCase()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(line_r78.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(8, 5, line_r78.amount, "1.2-2"), " EGP");
  }
}
function ProjectDetailsComponent_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "div", 552)(2, "h1", 553);
    \u0275\u0275text(3, "\u062A\u0642\u0631\u064A\u0631 \u062A\u0633\u0648\u064A\u0629 \u0639\u0647\u062F\u0629 \u0645\u0634\u0631\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 554);
    \u0275\u0275text(5, "\u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 / Osos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 555)(7, "div")(8, "p")(9, "strong");
    \u0275\u0275text(10, "\u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 / Project Name:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p")(13, "strong");
    \u0275\u0275text(14, "\u0635\u0627\u062D\u0628 \u0627\u0644\u0639\u0647\u062F\u0629 (\u0627\u0644\u0645\u0647\u0646\u062F\u0633) / Engineer:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p")(17, "strong");
    \u0275\u0275text(18, "\u0633\u0628\u0628 \u0627\u0644\u0639\u0647\u062F\u0629 / Custody Reason:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 556)(21, "p")(22, "strong");
    \u0275\u0275text(23, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u062F\u064A\u0645 / Submitted At:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p")(27, "strong");
    \u0275\u0275text(28, "\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0633\u0648\u064A\u0629 / Status:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p")(31, "strong");
    \u0275\u0275text(32, "\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0648\u064A\u0629 / ID:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 557)(35, "div")(36, "span", 558);
    \u0275\u0275text(37, "\u0642\u064A\u0645\u0629 \u0627\u0644\u0639\u0647\u062F\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0629 / Custody Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "span", 559);
    \u0275\u0275text(39);
    \u0275\u0275pipe(40, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div")(42, "span", 558);
    \u0275\u0275text(43, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0635\u0631\u0648\u0641 \u0641\u0639\u0644\u064A\u0627\u064B / Spent Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 560);
    \u0275\u0275text(45);
    \u0275\u0275pipe(46, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div")(48, "span", 558);
    \u0275\u0275text(49, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0633\u062A\u062D\u0642 (\u0627\u0644\u0641\u0631\u0642) / Net Difference");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span", 559);
    \u0275\u0275text(51);
    \u0275\u0275pipe(52, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 561)(54, "h3", 562);
    \u0275\u0275text(55, "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0628\u0646\u0648\u062F \u0648\u0627\u0644\u0645\u0635\u0627\u0631\u064A\u0641 \u0627\u0644\u0641\u0631\u062F\u064A\u0629 / Itemized Expenses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "table", 563)(57, "thead")(58, "tr", 564)(59, "th", 565);
    \u0275\u0275text(60, "\u0627\u0644\u062A\u0635\u0646\u064A\u0641 / Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "th", 565);
    \u0275\u0275text(62, "\u0627\u0644\u0648\u0635\u0641 / Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "th", 566);
    \u0275\u0275text(64, "\u0627\u0644\u0645\u0628\u0644\u063A / Amount");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(65, "tbody", 567);
    \u0275\u0275repeaterCreate(66, ProjectDetailsComponent_Conditional_75_For_67_Template, 9, 8, "tr", 568, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(68, "div", 569)(69, "div")(70, "p")(71, "strong");
    \u0275\u0275text(72, "\u0627\u0644\u0645\u0631\u0627\u062C\u0639 / Approved By:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "p")(75, "strong");
    \u0275\u0275text(76, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F / Resolved At:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(77);
    \u0275\u0275pipe(78, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "div", 570);
    \u0275\u0275text(80, " VERIFIED BY OSOS ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1(" ", ctx_r0.project()?.name);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.activePrintSettlement().issuedTo);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.activePrintSettlement().custodyReason);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(25, 15, ctx_r0.activePrintSettlement().submittedAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.activePrintSettlement().status);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.activePrintSettlement().id);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(40, 18, ctx_r0.activePrintSettlement().custodyAmount, "1.2-2"), " EGP");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(46, 21, ctx_r0.activePrintSettlement().totalAmount, "1.2-2"), " EGP");
    \u0275\u0275advance(5);
    \u0275\u0275classProp("text-emerald-600", ctx_r0.activePrintSettlement().netDifference > 0)("text-rose-600", ctx_r0.activePrintSettlement().netDifference < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(52, 24, ctx_r0.activePrintSettlement().netDifference, "1.2-2"), " EGP ");
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r0.activePrintSettlement().lines);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.activePrintSettlement().resolvedBy || "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.activePrintSettlement().resolvedAt ? \u0275\u0275pipeBind2(78, 27, ctx_r0.activePrintSettlement().resolvedAt, "dd/MM/yyyy HH:mm") : "\u2014");
  }
}
function ProjectDetailsComponent_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "div", 574);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 69);
    \u0275\u0275element(3, "path", 575);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.profileSuccessMessage());
  }
}
function ProjectDetailsComponent_Conditional_77_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 580);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.activeTextInspection().subtitle);
  }
}
function ProjectDetailsComponent_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    const _r79 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 497);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_77_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r79);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeTextInspectionModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 576)(3, "div", 577)(4, "div", 89)(5, "div", 578);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 36);
    \u0275\u0275element(7, "path", 579);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div")(9, "h3", 239);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, ProjectDetailsComponent_Conditional_77_Conditional_11_Template, 2, 1, "p", 580);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 581);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_77_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r79);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeTextInspectionModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 36);
    \u0275\u0275element(14, "path", 409);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "div", 582);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 583)(18, "button", 584);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_77_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r79);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeTextInspectionModal());
    });
    \u0275\u0275text(19, " \u0625\u063A\u0644\u0627\u0642 / Close ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.activeTextInspection().title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.activeTextInspection().subtitle ? 11 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.activeTextInspection().content, " ");
  }
}
function ProjectDetailsComponent_Conditional_78_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r81 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 590);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_78_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r81);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.prevLightboxPhoto());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 591);
    \u0275\u0275element(2, "path", 592);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "button", 593);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_78_Conditional_12_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r81);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.nextLightboxPhoto());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 591);
    \u0275\u0275element(5, "path", 594);
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetailsComponent_Conditional_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r80 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 585);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_78_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r80);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeLightbox());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 586);
    \u0275\u0275listener("click", function ProjectDetailsComponent_Conditional_78_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r80);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeLightbox());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 129);
    \u0275\u0275element(4, "path", 409);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 587)(6, "span");
    \u0275\u0275text(7, "\u{1F4F7}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 588)(11, "img", 589);
    \u0275\u0275listener("error", function ProjectDetailsComponent_Conditional_78_Template_img_error_11_listener($event) {
      \u0275\u0275restoreView(_r80);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onImgError($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, ProjectDetailsComponent_Conditional_78_Conditional_12_Template, 6, 0);
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
var ProjectDetailsComponent = class _ProjectDetailsComponent {
  activePrintSettlement = signal(
    null,
    ...ngDevMode ? [{ debugName: "activePrintSettlement" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeTextInspection = signal(
    null,
    ...ngDevMode ? [{ debugName: "activeTextInspection" }] : (
      /* istanbul ignore next */
      []
    )
  );
  openTextInspectionModal(title, content, subtitle) {
    if (!content)
      return;
    this.activeTextInspection.set({ title, content, subtitle });
  }
  closeTextInspectionModal() {
    this.activeTextInspection.set(null);
  }
  openPettyCashReasonModal(item) {
    if (!item.reason)
      return;
    const dateStr = item.issuedAt ? new Date(item.issuedAt).toLocaleString("en-GB") : "";
    const subtitle = (item.issuedTo || "Staff") + (dateStr ? ` \u2022 ${dateStr}` : "");
    this.openTextInspectionModal("\u0627\u0644\u0628\u064A\u0627\u0646 / \u0627\u0644\u0633\u0628\u0628", item.reason, subtitle);
  }
  openTransactionInspectionModal(t) {
    if (!t.description)
      return;
    const dateStr = t.transactionDate ? new Date(t.transactionDate).toLocaleString("en-GB") : "";
    this.openTextInspectionModal("\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629", t.description, dateStr);
  }
  printSettlementReport(s) {
    this.activePrintSettlement.set(s);
    setTimeout(() => {
      window.print();
    }, 100);
  }
  route = inject(ActivatedRoute);
  projectService = inject(ProjectService);
  pettyCashService = inject(PettyCashService);
  financialService = inject(FinancialService);
  uploadService = inject(ImageUploadService);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  confirmService = inject(ConfirmModalService);
  profileService = inject(TenantProfileService);
  settlementService = inject(SettlementService);
  offlineSync = inject(OfflineSyncService);
  whatsappLink = inject(WhatsAppLinkService);
  userService = inject(TenantUserService);
  projectCloseoutService = inject(ProjectCloseoutService);
  langService = inject(LanguageService);
  destroyRef = inject(DestroyRef);
  reconciliationReport = signal(
    null,
    ...ngDevMode ? [{ debugName: "reconciliationReport" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isCloseoutLoading = signal(
    false,
    ...ngDevMode ? [{ debugName: "isCloseoutLoading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedDrilldown = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedDrilldown" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedReimbursementPool = {};
  selectedPettyCashPool = {};
  unsettledCustodyList = computed(
    () => this.pettyCashes().filter((pc) => !pc.isSettled && !pc.isReimbursement),
    ...ngDevMode ? [{ debugName: "unsettledCustodyList" }] : (
      /* istanbul ignore next */
      []
    )
  );
  unsettledCustodySum = computed(
    () => this.unsettledCustodyList().reduce((sum, item) => sum + item.amount, 0),
    ...ngDevMode ? [{ debugName: "unsettledCustodySum" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingRefundsList = computed(
    () => this.settlements().filter((s) => s.status === "ApprovedPendingRefund"),
    ...ngDevMode ? [{ debugName: "pendingRefundsList" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingRefundsSum = computed(
    () => this.pendingRefundsList().reduce((sum, item) => sum + item.netDifference, 0),
    ...ngDevMode ? [{ debugName: "pendingRefundsSum" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingReimbursementsList = computed(
    () => this.pettyCashes().filter((pc) => pc.status === "Pending" && pc.isReimbursement),
    ...ngDevMode ? [{ debugName: "pendingReimbursementsList" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingReimbursementsSum = computed(
    () => this.pendingReimbursementsList().reduce((sum, item) => sum + item.amount, 0),
    ...ngDevMode ? [{ debugName: "pendingReimbursementsSum" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSettlementLocked = computed(
    () => {
      const pc = this.selectedPettyCashForSettlement();
      if (!pc)
        return false;
      const sett = this.settlements().find((s) => s.pettyCashId === pc.id);
      return !!sett && sett.status !== "Draft" && sett.status !== "Rejected";
    },
    ...ngDevMode ? [{ debugName: "isSettlementLocked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isEditPettyCashModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isEditPettyCashModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isEditingPettyCash = signal(
    false,
    ...ngDevMode ? [{ debugName: "isEditingPettyCash" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedPettyCashToEdit = null;
  editPettyCashForm = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    category: ["", Validators.required],
    reason: ["", [Validators.required, Validators.minLength(5)]]
  });
  isEditTransactionModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isEditTransactionModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSavingTransaction = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSavingTransaction" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedTransactionToEdit = null;
  editTransactionForm = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    description: ["", [Validators.required, Validators.minLength(5)]]
  });
  isReviseBudgetModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isReviseBudgetModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isRevisingBudget = signal(
    false,
    ...ngDevMode ? [{ debugName: "isRevisingBudget" }] : (
      /* istanbul ignore next */
      []
    )
  );
  budgetHistory = signal(
    [],
    ...ngDevMode ? [{ debugName: "budgetHistory" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isUploadingBoq = signal(
    false,
    ...ngDevMode ? [{ debugName: "isUploadingBoq" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedBoqFile = null;
  reviseBudgetForm = this.fb.group({
    newBudget: [null, [Validators.required, Validators.min(0.01)]],
    reasonForChange: ["", [Validators.required, Validators.minLength(5)]],
    boqFileUrl: [""]
  });
  // Direct Disbursement signals & form
  isDisburseModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isDisburseModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isDisbursing = signal(
    false,
    ...ngDevMode ? [{ debugName: "isDisbursing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  disburseErrors = signal(
    [],
    ...ngDevMode ? [{ debugName: "disburseErrors" }] : (
      /* istanbul ignore next */
      []
    )
  );
  usersList = signal(
    [],
    ...ngDevMode ? [{ debugName: "usersList" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // To populate engineer select in direct disbursement
  disburseForm = this.fb.group({
    userId: [null],
    amount: [null, [Validators.required, Validators.min(0.01)]],
    description: ["", [Validators.required, Validators.minLength(5)]],
    sourcePoolId: [null, Validators.required],
    paymentMethod: ["Cash", Validators.required]
  });
  // Settlement signals & FormArray form
  isSettlementModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSettlementModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSubmittingSettlement = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSubmittingSettlement" }] : (
      /* istanbul ignore next */
      []
    )
  );
  settlementErrors = signal(
    [],
    ...ngDevMode ? [{ debugName: "settlementErrors" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedPettyCashForSettlement = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedPettyCashForSettlement" }] : (
      /* istanbul ignore next */
      []
    )
  );
  settlements = signal(
    [],
    ...ngDevMode ? [{ debugName: "settlements" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingSettlements = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingSettlements" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activePreviewPhotoUrl = signal(
    null,
    ...ngDevMode ? [{ debugName: "activePreviewPhotoUrl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  settlementForm = this.fb.group({
    lines: this.fb.array([])
  });
  get settlementLines() {
    return this.settlementForm.get("lines");
  }
  addSettlementLine() {
    this.settlementLines.push(this.fb.group({
      category: ["Cement", Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      description: ["", [Validators.required, Validators.minLength(3)]],
      invoiceUrl: [""],
      uploading: [false],
      localPreviewUrl: [""]
    }));
  }
  removeSettlementLine(index) {
    this.settlementLines.removeAt(index);
  }
  calculateSettlementTotal() {
    return this.settlementLines.controls.reduce((sum, control) => sum + (control.get("amount")?.value || 0), 0);
  }
  currentUserRole = computed(
    () => this.authService.currentUser()?.role || "",
    ...ngDevMode ? [{ debugName: "currentUserRole" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isTenantOwner = computed(
    () => ["tenantowner", "admin"].includes(this.currentUserRole().toLowerCase()),
    ...ngDevMode ? [{ debugName: "isTenantOwner" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isAccountant = computed(
    () => this.currentUserRole().toLowerCase() === "accountant",
    ...ngDevMode ? [{ debugName: "isAccountant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isOwnerOrAccountant = computed(
    () => ["tenantowner", "accountant", "admin"].includes(this.currentUserRole().toLowerCase()),
    ...ngDevMode ? [{ debugName: "isOwnerOrAccountant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isEngineer = computed(
    () => ["manager", "siteengineer", "designengineer"].includes(this.currentUserRole().toLowerCase()),
    ...ngDevMode ? [{ debugName: "isEngineer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  projectId = this.route.snapshot.paramMap.get("id") || "";
  project = signal(
    null,
    ...ngDevMode ? [{ debugName: "project" }] : (
      /* istanbul ignore next */
      []
    )
  );
  parsedClient = computed(
    () => {
      const desc = this.project()?.description;
      if (desc && desc.startsWith("{")) {
        try {
          return JSON.parse(desc).client || "";
        } catch (e) {
        }
      }
      return "";
    },
    ...ngDevMode ? [{ debugName: "parsedClient" }] : (
      /* istanbul ignore next */
      []
    )
  );
  parsedBudget = computed(
    () => {
      const desc = this.project()?.description;
      if (desc && desc.startsWith("{")) {
        try {
          return JSON.parse(desc).budget || 0;
        } catch (e) {
        }
      }
      return 0;
    },
    ...ngDevMode ? [{ debugName: "parsedBudget" }] : (
      /* istanbul ignore next */
      []
    )
  );
  parsedDescription = computed(
    () => {
      const desc = this.project()?.description;
      if (desc && desc.startsWith("{")) {
        try {
          return JSON.parse(desc).description || "";
        } catch (e) {
        }
      }
      return desc || "";
    },
    ...ngDevMode ? [{ debugName: "parsedDescription" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isPublicPortfolio = computed(
    () => {
      const proj = this.project();
      if (!proj)
        return false;
      if (proj.isPublicPortfolio !== void 0) {
        return !!proj.isPublicPortfolio;
      }
      if (proj.description && proj.description.startsWith("{")) {
        try {
          const parsed = JSON.parse(proj.description);
          return !!parsed.isPublicPortfolio || !!parsed.isPublic;
        } catch (e) {
        }
      }
      return false;
    },
    ...ngDevMode ? [{ debugName: "isPublicPortfolio" }] : (
      /* istanbul ignore next */
      []
    )
  );
  togglePublicVisibility(newValue) {
    const currentProj = this.project();
    if (!currentProj)
      return;
    this.projectSettingsForm.patchValue({ isPublicPortfolio: newValue });
    this.onProjectSettingsSubmit();
  }
  boqFileDetails = computed(
    () => {
      const proj = this.project();
      if (!proj)
        return { fileUrl: "", fileName: "" };
      if (proj.boqFileUrl) {
        return {
          fileUrl: proj.boqFileUrl,
          fileName: proj.boqFileName || "\u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629_\u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629_\u0644\u0644\u0645\u0634\u0631\u0648\u0639.pdf"
        };
      }
      if (proj.description && proj.description.startsWith("{")) {
        try {
          const parsed = JSON.parse(proj.description);
          return {
            fileUrl: parsed.boqFileUrl || "",
            fileName: parsed.boqFileName || "\u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629_\u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629_\u0644\u0644\u0645\u0634\u0631\u0648\u0639.pdf"
          };
        } catch (e) {
        }
      }
      return { fileUrl: "", fileName: "" };
    },
    ...ngDevMode ? [{ debugName: "boqFileDetails" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isUploadingBOQ = signal(
    false,
    ...ngDevMode ? [{ debugName: "isUploadingBOQ" }] : (
      /* istanbul ignore next */
      []
    )
  );
  boqUploadError = signal(
    null,
    ...ngDevMode ? [{ debugName: "boqUploadError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onBOQFileSelected(event) {
    const input = event.target;
    if (!input.files || input.files.length === 0)
      return;
    const file = input.files[0];
    if (file.size > 10 * 1024 * 1024) {
      this.boqUploadError.set("\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0627\u0644\u0645\u0633\u0645\u0648\u062D \u0628\u0647 (10 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A).");
      return;
    }
    this.boqUploadError.set(null);
    this.isUploadingBOQ.set(true);
    this.uploadService.uploadProjectGallery(this.projectId, file).subscribe({
      next: (res) => {
        this.isUploadingBOQ.set(false);
        const uploadedUrl = res.data?.url || (typeof res.data === "string" ? res.data : null);
        if (res.success && uploadedUrl) {
          this.updateProjectBOQReference(uploadedUrl, file.name);
        } else {
          this.boqUploadError.set("\u0641\u0634\u0644 \u0631\u0641\u0639 \u0645\u0644\u0641 \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");
        }
      },
      error: () => {
        this.isUploadingBOQ.set(false);
        this.boqUploadError.set("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0639 \u0645\u0644\u0641 \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629.");
      }
    });
  }
  updateProjectBOQReference(fileUrl, fileName) {
    const proj = this.project();
    if (!proj)
      return;
    let payloadObj = {};
    if (proj.description && proj.description.startsWith("{")) {
      try {
        payloadObj = JSON.parse(proj.description);
      } catch (e) {
      }
    } else {
      payloadObj = { description: proj.description || "" };
    }
    payloadObj.boqFileUrl = fileUrl;
    payloadObj.boqFileName = fileName;
    const updateDto = {
      name: proj.name,
      description: JSON.stringify(payloadObj),
      status: proj.status
    };
    this.projectService.updateProject(this.projectId, updateDto).subscribe({
      next: (res) => {
        if (res.success) {
          this.fetchProjectDetails();
        }
      }
    });
  }
  openDatePicker(picker) {
    if (picker && typeof picker.showPicker === "function") {
      picker.showPicker();
    } else if (picker) {
      picker.click();
    }
  }
  formatDisplayDate(rawVal) {
    if (!rawVal)
      return "";
    if (typeof rawVal === "string") {
      const trimmed = rawVal.trim();
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
        return trimmed;
      }
      if (trimmed.includes("-")) {
        const parts = trimmed.split("T")[0].split("-");
        if (parts.length === 3) {
          const [yyyy, mm, dd] = parts;
          return `${dd}/${mm}/${yyyy}`;
        }
      }
    }
    if (rawVal instanceof Date && !isNaN(rawVal.getTime())) {
      const dd = String(rawVal.getDate()).padStart(2, "0");
      const mm = String(rawVal.getMonth() + 1).padStart(2, "0");
      const yyyy = rawVal.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }
    return String(rawVal);
  }
  onNativeDatePicked(event, fieldName, formGroup) {
    const input = event.target;
    if (input && input.value) {
      formGroup.get(fieldName)?.setValue(input.value);
    }
  }
  onDateInputChanged(event, fieldName, formGroup) {
    const input = event.target;
    if (!input)
      return;
    const val = input.value.trim();
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
      const [dd, mm, yyyy] = val.split("/");
      const isoDate = `${yyyy}-${mm}-${dd}`;
      formGroup.get(fieldName)?.setValue(isoDate);
    } else if (val === "") {
      formGroup.get(fieldName)?.setValue("");
    }
  }
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
    if (event)
      event.stopPropagation();
    if (!photos || photos.length === 0)
      return;
    const urls = photos.map((p) => typeof p === "string" ? p : p.photoUrl).filter(Boolean);
    if (urls.length === 0)
      return;
    this.lightboxPhotos.set(urls);
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
    }
  }
  pettyCashes = signal(
    [],
    ...ngDevMode ? [{ debugName: "pettyCashes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  transactions = signal(
    [],
    ...ngDevMode ? [{ debugName: "transactions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cashPools = signal(
    [],
    ...ngDevMode ? [{ debugName: "cashPools" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingProject = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingProject" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingPettyCash = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingPettyCash" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingTransactions = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingTransactions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeTab = signal(
    "petty-cash",
    ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Admin settings forms & signals
  isUploadingLogo = signal(
    false,
    ...ngDevMode ? [{ debugName: "isUploadingLogo" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isUploadingBanner = signal(
    false,
    ...ngDevMode ? [{ debugName: "isUploadingBanner" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSavingProfile = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSavingProfile" }] : (
      /* istanbul ignore next */
      []
    )
  );
  profileSuccessMessage = signal(
    null,
    ...ngDevMode ? [{ debugName: "profileSuccessMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSavingProjectSettings = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSavingProjectSettings" }] : (
      /* istanbul ignore next */
      []
    )
  );
  profileForm = this.fb.group({
    name: ["", Validators.required],
    logoUrl: [""],
    bannerUrl: [""],
    region: [""],
    companyDescription: [""]
  });
  projectSettingsForm = this.fb.group({
    isPublicPortfolio: [false]
  });
  // Gallery signals
  galleryPhotos = signal(
    [],
    ...ngDevMode ? [{ debugName: "galleryPhotos" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingGallery = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingGallery" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isUploadingGallery = signal(
    false,
    ...ngDevMode ? [{ debugName: "isUploadingGallery" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSettleModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSettleModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSettling = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSettling" }] : (
      /* istanbul ignore next */
      []
    )
  );
  settleErrors = signal(
    [],
    ...ngDevMode ? [{ debugName: "settleErrors" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activePettyCash = signal(
    null,
    ...ngDevMode ? [{ debugName: "activePettyCash" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedSettleReceipt = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedSettleReceipt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  settleForm = this.fb.group({
    spentAmount: [null, [Validators.required, Validators.min(0.01)]],
    receiptDescription: ["", [Validators.required, Validators.minLength(5)]],
    settlementPaymentMethod: [null, Validators.required],
    expenseDate: [(/* @__PURE__ */ new Date()).toISOString().substring(0, 10), Validators.required],
    receiptPhotoUrl: [""]
  });
  isRequestModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isRequestModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isRequesting = signal(
    false,
    ...ngDevMode ? [{ debugName: "isRequesting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  requestErrors = signal(
    [],
    ...ngDevMode ? [{ debugName: "requestErrors" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isInjectModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isInjectModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isInjecting = signal(
    false,
    ...ngDevMode ? [{ debugName: "isInjecting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injectErrors = signal(
    [],
    ...ngDevMode ? [{ debugName: "injectErrors" }] : (
      /* istanbul ignore next */
      []
    )
  );
  requestForm = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    reason: ["", [Validators.required, Validators.minLength(5)]],
    sourcePoolId: [null]
  }, {
    validators: (group) => this.insufficientBalanceValidator(group)
  });
  insufficientBalanceValidator(formGroup) {
    const amountControl = formGroup.get("amount");
    const sourcePoolIdControl = formGroup.get("sourcePoolId");
    if (!amountControl)
      return null;
    const amount = amountControl.value;
    if (amount === null || amount === void 0) {
      this.clearInsufficientBalanceError(amountControl);
      return null;
    }
    const sourcePoolId = sourcePoolIdControl?.value;
    if (sourcePoolId) {
      const pool = this.cashPools().find((p) => p.id === sourcePoolId);
      if (pool && amount > pool.availableBalance) {
        amountControl.setErrors(__spreadProps(__spreadValues({}, amountControl.errors), { insufficientBalance: true }));
        return { insufficientBalance: true };
      }
    } else {
      const totalAvailable = this.cashPools().reduce((sum, p) => sum + p.availableBalance, 0);
      if (totalAvailable > 0 && amount > totalAvailable) {
        amountControl.setErrors(__spreadProps(__spreadValues({}, amountControl.errors), { insufficientBalance: true }));
        return { insufficientBalance: true };
      }
    }
    this.clearInsufficientBalanceError(amountControl);
    return null;
  }
  clearInsufficientBalanceError(control) {
    if (control.hasError("insufficientBalance")) {
      const errors = __spreadValues({}, control.errors);
      delete errors["insufficientBalance"];
      control.setErrors(Object.keys(errors).length ? errors : null);
    }
  }
  injectForm = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    sourceType: [null, Validators.required],
    paymentDate: [(/* @__PURE__ */ new Date()).toISOString().substring(0, 10), Validators.required],
    paymentMethod: [null, Validators.required],
    description: ["", [Validators.required, Validators.minLength(5)]]
  });
  selectedInjectReceipt = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedInjectReceipt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onInjectReceiptSelected(event) {
    const file = event.target.files?.[0];
    this.selectedInjectReceipt.set(file || null);
  }
  // Computed financial KPIs from transaction data
  totalIncome = computed(
    () => this.transactions().filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0),
    ...ngDevMode ? [{ debugName: "totalIncome" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalExpenses = computed(
    () => this.transactions().filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0),
    ...ngDevMode ? [{ debugName: "totalExpenses" }] : (
      /* istanbul ignore next */
      []
    )
  );
  netBalance = computed(
    () => this.totalIncome() - this.totalExpenses(),
    ...ngDevMode ? [{ debugName: "netBalance" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalUnsettledPettyCash = computed(
    () => {
      return this.pettyCashes().filter((p) => !p.isSettled).reduce((sum, p) => {
        const sett = this.settlements().find((s) => s.pettyCashId === p.id);
        const spent = sett ? sett.lines.reduce((sSum, l) => sSum + l.amount, 0) : 0;
        return sum + (p.amount - spent);
      }, 0);
    },
    ...ngDevMode ? [{ debugName: "totalUnsettledPettyCash" }] : (
      /* istanbul ignore next */
      []
    )
  );
  unsettledCount = computed(
    () => this.pettyCashes().filter((p) => !p.isSettled).length,
    ...ngDevMode ? [{ debugName: "unsettledCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ngOnInit() {
    if (this.projectId) {
      if (this.isEngineer()) {
        this.activeTab.set("petty-cash");
      } else if (this.isAccountant()) {
        this.activeTab.set("transactions");
      } else {
        this.activeTab.set("petty-cash");
      }
      this.fetchProjectDetails();
      this.fetchBudgetHistory();
      this.fetchPettyCash();
      this.fetchSettlements();
      if (!this.isEngineer()) {
        this.fetchTransactions();
        this.fetchCashPools();
      }
      this.fetchGalleryPhotos();
      if (this.isTenantOwner()) {
        this.fetchCompanyProfile();
      }
      if (this.isOwnerOrAccountant()) {
        this.fetchUsersList();
      }
      this.offlineSync.registerHandler("create-settlement", (payload) => this.settlementService.createSettlement(this.projectId, payload));
    }
  }
  fetchGalleryPhotos() {
    this.isLoadingGallery.set(true);
    this.uploadService.getProjectPhotos(this.projectId).subscribe({
      next: (response) => {
        this.isLoadingGallery.set(false);
        if (response.success && response.data) {
          this.galleryPhotos.set(response.data.items);
        }
      },
      error: () => this.isLoadingGallery.set(false)
    });
  }
  onGalleryFileSelected(event) {
    const input = event.target;
    if (input.files && input.files.length > 0) {
      if (this.galleryPhotos().length >= 5) {
        this.confirmService.alert({
          title: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0635\u0648\u0631 / Max Photos Limit",
          message: "\u0644\u0627 \u064A\u0645\u0643\u0646 \u0631\u0641\u0639 \u0623\u0643\u062B\u0631 \u0645\u0646 5 \u0635\u0648\u0631 \u0644\u0643\u0644 \u0645\u0634\u0631\u0648\u0639. \u0628\u0631\u062C\u0627\u0621 \u0645\u0633\u062D \u0628\u0639\u0636 \u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0642\u062F\u064A\u0645\u0629 \u0623\u0648\u0644\u0627\u064B. / A project can have a maximum of 5 site photos. Please delete old ones first.",
          type: "info"
        });
        return;
      }
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) {
        this.confirmService.alert({
          title: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B / File Size Too Large",
          message: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B! \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0645\u0644\u0641\u0627\u062A 5 \u0645\u064A\u062C\u0627. / The maximum file size is 5MB.",
          type: "error"
        });
        return;
      }
      this.isUploadingGallery.set(true);
      this.uploadService.uploadProjectGallery(this.projectId, file).subscribe({
        next: (res) => {
          this.isUploadingGallery.set(false);
          if (res.success) {
            this.fetchGalleryPhotos();
          }
        },
        error: () => this.isUploadingGallery.set(false)
      });
    }
  }
  onDeletePhoto(photoId) {
    this.confirmService.confirm({
      title: "\u062D\u0630\u0641 \u0627\u0644\u0635\u0648\u0631\u0629 / Delete Photo",
      message: "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0635\u0648\u0631\u0629\u061F / Are you sure you want to delete this photo?",
      confirmText: "\u0646\u0639\u0645\u060C \u0627\u062D\u0630\u0641 / Yes, Delete",
      cancelText: "\u0625\u0644\u063A\u0627\u0621 / Cancel"
    }).then((confirmed) => {
      if (confirmed) {
        this.uploadService.deleteProjectPhoto(this.projectId, photoId).subscribe({
          next: (res) => {
            if (res.success) {
              this.fetchGalleryPhotos();
            }
          }
        });
      }
    });
  }
  fetchCompanyProfile() {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const cleanUrl = (url) => {
            if (url && url.startsWith("PRESIGNED_SPLIT")) {
              const parts = url.split("|");
              return parts.length > 2 ? parts[2] : url;
            }
            return url;
          };
          this.profileForm.patchValue({
            name: res.data.name,
            logoUrl: cleanUrl(res.data.logoUrl),
            bannerUrl: cleanUrl(res.data.bannerUrl),
            region: res.data.region,
            companyDescription: res.data.companyDescription
          });
        }
      }
    });
  }
  onProfileSubmit() {
    if (this.profileForm.invalid)
      return;
    this.isSavingProfile.set(true);
    this.profileSuccessMessage.set(null);
    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: (res) => {
        this.isSavingProfile.set(false);
        if (res.success) {
          this.profileSuccessMessage.set("\u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0646\u062C\u0627\u062D / Profile updated successfully");
          this.fetchCompanyProfile();
          setTimeout(() => this.profileSuccessMessage.set(null), 3e3);
        }
      },
      error: () => this.isSavingProfile.set(false)
    });
  }
  onLogoFileSelected(event) {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.confirmService.alert({
          title: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B",
          message: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0635\u0648\u0631 2 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A.",
          type: "error"
        });
        return;
      }
      this.isUploadingLogo.set(true);
      this.uploadService.uploadTenantLogo(file).subscribe({
        next: (res) => {
          this.isUploadingLogo.set(false);
          if (res.success && res.data) {
            this.profileForm.patchValue({ logoUrl: res.data.url });
          }
        },
        error: () => this.isUploadingLogo.set(false)
      });
    }
  }
  onBannerFileSelected(event) {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.confirmService.alert({
          title: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B",
          message: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0635\u0648\u0631 2 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A.",
          type: "error"
        });
        return;
      }
      this.isUploadingBanner.set(true);
      this.uploadService.uploadTenantBanner(file).subscribe({
        next: (res) => {
          this.isUploadingBanner.set(false);
          if (res.success && res.data) {
            this.profileForm.patchValue({ bannerUrl: res.data.url });
          }
        },
        error: () => this.isUploadingBanner.set(false)
      });
    }
  }
  onProjectSettingsSubmit() {
    const isPublic = this.projectSettingsForm.value.isPublicPortfolio;
    this.isSavingProjectSettings.set(true);
    const currentProj = this.project();
    if (!currentProj)
      return;
    let client = "";
    let budget = 0;
    let status = "Active";
    let category = "Other";
    let description = currentProj.description;
    if (currentProj.description && currentProj.description.startsWith("{")) {
      try {
        const parsed = JSON.parse(currentProj.description);
        client = parsed.client || "";
        budget = parsed.budget || 0;
        status = parsed.status || "Active";
        category = parsed.category || "Other";
        description = parsed.description || "";
      } catch (e) {
      }
    }
    const legacyDescObj = {
      client,
      budget,
      status,
      category,
      isPublicPortfolio: isPublic,
      description
    };
    const dto = {
      name: currentProj.name,
      description: JSON.stringify(legacyDescObj),
      startDate: currentProj.startDate,
      endDate: currentProj.endDate,
      managerId: currentProj.managerId
    };
    this.projectService.updateProject(this.projectId, dto).subscribe({
      next: (res) => {
        this.isSavingProjectSettings.set(false);
        if (res.success) {
          this.fetchProjectDetails();
          this.confirmService.alert({
            title: "\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B / Updated",
            message: "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0646\u062C\u0627\u062D. / Project visibility settings updated successfully.",
            type: "success"
          });
        }
      },
      error: () => this.isSavingProjectSettings.set(false)
    });
  }
  fetchProjectDetails() {
    this.isLoadingProject.set(true);
    this.projectService.getProjectById(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.isLoadingProject.set(false);
        if (response.success && response.data) {
          const proj = response.data;
          const user = this.authService.currentUser();
          this.project.set(proj);
          let isPublicPortfolio = false;
          if (proj.description && proj.description.startsWith("{")) {
            try {
              const parsed = JSON.parse(proj.description);
              isPublicPortfolio = !!parsed.isPublicPortfolio || !!parsed.isPublic;
            } catch (e) {
            }
          }
          this.projectSettingsForm.patchValue({ isPublicPortfolio });
          if (proj.status === "Closed" || proj.status === "FinancialFreeze") {
            this.projectCloseoutService.getReconciliationReport(this.projectId).subscribe({
              next: (res) => {
                if (res.success && res.data) {
                  this.reconciliationReport.set(res.data);
                }
              }
            });
          }
        }
      },
      error: () => this.isLoadingProject.set(false)
    });
  }
  fetchPettyCash() {
    this.isLoadingPettyCash.set(true);
    this.pettyCashService.getProjectPettyCash(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.isLoadingPettyCash.set(false);
        if (response.success && response.data) {
          this.pettyCashes.set(response.data.items);
        }
      },
      error: () => this.isLoadingPettyCash.set(false)
    });
  }
  fetchCashPools() {
    this.financialService.getCashPools(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.cashPools.set(response.data);
        }
      }
    });
  }
  fetchTransactions() {
    this.isLoadingTransactions.set(true);
    this.financialService.getProjectTransactions(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.isLoadingTransactions.set(false);
        if (response.success && response.data) {
          this.transactions.set(response.data.items);
        }
      },
      error: () => this.isLoadingTransactions.set(false)
    });
  }
  isSettleFieldInvalid(fieldName) {
    const field = this.settleForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }
  openSettleModal(item) {
    this.activePettyCash.set(item);
    this.settleErrors.set([]);
    this.selectedSettleReceipt.set(null);
    this.settleForm.reset({
      spentAmount: item.amount,
      receiptDescription: "",
      settlementPaymentMethod: null,
      expenseDate: (/* @__PURE__ */ new Date()).toISOString().substring(0, 10),
      receiptPhotoUrl: ""
    });
    this.settleForm.get("spentAmount")?.setValidators([
      Validators.required,
      Validators.min(0.01),
      Validators.max(item.amount)
    ]);
    this.settleForm.get("spentAmount")?.updateValueAndValidity();
    this.isSettleModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }
  closeSettleModal() {
    this.isSettleModalOpen.set(false);
    this.activePettyCash.set(null);
    this.settleErrors.set([]);
    this.selectedSettleReceipt.set(null);
    this.confirmService.toggleBodyScroll(false);
  }
  async onSettleSubmit() {
    if (this.settleForm.invalid || !this.activePettyCash()) {
      this.settleForm.markAllAsTouched();
      return;
    }
    this.isSettling.set(true);
    this.settleErrors.set([]);
    const formVal = this.settleForm.value;
    let receiptPhotoUrl = formVal.receiptPhotoUrl || "";
    const fileToUpload = this.selectedSettleReceipt();
    if (fileToUpload) {
      if (fileToUpload.size > 5 * 1024 * 1024) {
        this.isSettling.set(false);
        this.settleErrors.set(["\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B! \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0625\u064A\u0635\u0627\u0644 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 5 \u0645\u064A\u062C\u0627."]);
        return;
      }
      this.isUploadingSettleReceipt.set(true);
      try {
        const uploadResult = await firstValueFrom(this.uploadService.uploadProjectGallery(this.projectId, fileToUpload));
        if (uploadResult.success && uploadResult.data) {
          receiptPhotoUrl = uploadResult.data.url;
          this.settleForm.patchValue({ receiptPhotoUrl });
        } else {
          this.isUploadingSettleReceipt.set(false);
          this.isSettling.set(false);
          this.settleErrors.set([uploadResult.message || "Failed to upload receipt image."]);
          return;
        }
      } catch (err) {
        this.isUploadingSettleReceipt.set(false);
        this.isSettling.set(false);
        this.settleErrors.set([err.error?.message || err.message || "Failed to upload receipt image."]);
        return;
      }
      this.isUploadingSettleReceipt.set(false);
    }
    const dto = {
      spentAmount: formVal.spentAmount,
      receiptDescription: formVal.receiptDescription,
      settlementPaymentMethod: formVal.settlementPaymentMethod,
      expenseDate: new Date(formVal.expenseDate),
      receiptPhotoUrl
    };
    const pettyCashId = this.activePettyCash().id;
    try {
      const response = await firstValueFrom(this.pettyCashService.settlePettyCash(this.projectId, pettyCashId, dto));
      this.isSettling.set(false);
      if (response.success) {
        this.closeSettleModal();
        this.fetchPettyCash();
        this.fetchTransactions();
      } else {
        this.settleErrors.set(response.errors || [response.message || "Failed to settle request."]);
      }
    } catch (err) {
      this.isSettling.set(false);
      const errors = err.error?.errors || [err.error?.message || err.message || "Error occurred."];
      this.settleErrors.set(Array.isArray(errors) ? errors : [errors]);
    }
  }
  isRequestFieldInvalid(fieldName) {
    const field = this.requestForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }
  openRequestModal() {
    if (this.project()?.status === "Closed")
      return;
    this.requestErrors.set([]);
    this.requestForm.reset({
      amount: null,
      reason: "",
      sourcePoolId: null
    });
    if (this.isTenantOwner()) {
      this.requestForm.get("sourcePoolId")?.setValidators(Validators.required);
    } else {
      this.requestForm.get("sourcePoolId")?.clearValidators();
    }
    this.requestForm.get("sourcePoolId")?.updateValueAndValidity();
    this.isRequestModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }
  closeRequestModal() {
    this.isRequestModalOpen.set(false);
    this.requestErrors.set([]);
    this.confirmService.toggleBodyScroll(false);
  }
  async onRequestSubmit() {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }
    this.isRequesting.set(true);
    this.requestErrors.set([]);
    const formVal = this.requestForm.value;
    const user = this.authService.currentUser();
    if (!user)
      return;
    const dto = {
      issuedToUserId: user.userId,
      amount: formVal.amount,
      reason: formVal.reason,
      category: "Other",
      sourcePoolId: formVal.sourcePoolId
    };
    try {
      const response = await firstValueFrom(this.pettyCashService.requestPettyCash(this.projectId, dto));
      this.isRequesting.set(false);
      if (response.success) {
        this.closeRequestModal();
        this.fetchPettyCash();
      } else {
        this.requestErrors.set(response.errors || [response.message || "Failed to request petty cash."]);
      }
    } catch (err) {
      this.isRequesting.set(false);
      const errors = err.error?.errors || [err.error?.message || err.message || "Error occurred."];
      this.requestErrors.set(Array.isArray(errors) ? errors : [errors]);
    }
  }
  openInjectModal() {
    this.injectErrors.set([]);
    this.injectForm.reset({
      amount: null,
      sourceType: null,
      description: ""
    });
    this.isInjectModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }
  closeInjectModal() {
    this.isInjectModalOpen.set(false);
    this.injectForm.reset();
    this.confirmService.toggleBodyScroll(false);
  }
  async submitCapitalInjection() {
    if (this.injectForm.invalid)
      return;
    this.isInjecting.set(true);
    this.injectErrors.set([]);
    let receiptUrl = null;
    const fileToUpload = this.selectedInjectReceipt();
    if (fileToUpload) {
      try {
        const res = await firstValueFrom(this.uploadService.uploadProjectGallery(this.projectId, fileToUpload));
        if (res.success && res.data) {
          receiptUrl = res.data.url;
        }
      } catch (err) {
        this.injectErrors.set(["Failed to upload receipt image."]);
        this.isInjecting.set(false);
        return;
      }
    }
    const formVal = this.injectForm.value;
    const dto = {
      amount: formVal.amount,
      sourceType: formVal.sourceType,
      description: formVal.description,
      paymentDate: new Date(formVal.paymentDate).toISOString(),
      paymentMethod: formVal.paymentMethod,
      receiptPhotoUrl: receiptUrl
    };
    this.financialService.injectCapital(this.projectId, dto).subscribe({
      next: (response) => {
        if (response.success) {
          this.closeInjectModal();
          this.fetchCashPools();
          this.fetchTransactions();
        } else {
          this.injectErrors.set([response.message || "Failed to inject capital"]);
        }
      },
      error: (err) => {
        this.injectErrors.set(err.error?.errors || [err.error?.message || "An unexpected error occurred."]);
        this.isInjecting.set(false);
      },
      complete: () => {
        this.isInjecting.set(false);
      }
    });
  }
  getPoolSourceTranslationKey(sourceType) {
    switch (sourceType) {
      case "ClientDeposit":
        return "CLIENT_DEPOSIT";
      case "OwnerCapital":
        return "OWNER_CAPITAL";
      case "ExternalLoan":
        return "EXTERNAL_LOAN";
      default:
        return sourceType.toUpperCase();
    }
  }
  isUploadingSettleReceipt = signal(
    false,
    ...ngDevMode ? [{ debugName: "isUploadingSettleReceipt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isDeletingTransaction = signal(
    false,
    ...ngDevMode ? [{ debugName: "isDeletingTransaction" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isDeletingPettyCash = signal(
    false,
    ...ngDevMode ? [{ debugName: "isDeletingPettyCash" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onSettleReceiptSelected(event) {
    const input = event.target;
    if (input.files && input.files.length > 0) {
      this.selectedSettleReceipt.set(input.files[0]);
    }
  }
  /** Delete a financial transaction — only reachable if isOwnerOrAccountant(). Rolls back pool on API side. */
  async onDeleteTransaction(id) {
    const isConfirmed = await this.confirmService.confirm({
      title: "\u062D\u0630\u0641 \u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629",
      message: "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u062D\u0631\u0643\u0629\u061F \u0641\u064A \u062D\u0627\u0644 \u0643\u0627\u0646\u062A \u0632\u064A\u0627\u062F\u0629 \u0631\u0623\u0633 \u0645\u0627\u0644\u060C \u0641\u0633\u064A\u062A\u0645 \u0625\u0631\u062C\u0627\u0639 \u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062D\u0641\u0638\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.",
      confirmText: "\u0646\u0639\u0645\u060C \u0627\u062D\u0630\u0641",
      cancelText: "\u0625\u0644\u063A\u0627\u0621"
    });
    if (!isConfirmed)
      return;
    this.isDeletingTransaction.set(true);
    this.financialService.deleteTransaction(this.projectId, id).subscribe({
      next: () => {
        this.isDeletingTransaction.set(false);
        this.fetchTransactions();
        this.fetchCashPools();
      },
      error: (err) => {
        this.isDeletingTransaction.set(false);
        this.confirmService.alert({
          title: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0629",
          message: err?.error?.message || "\u0641\u0634\u0644\u062A \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062D\u0630\u0641.",
          type: "error"
        });
      }
    });
  }
  /** Delete a petty cash voucher — only reachable if isOwnerOrAccountant(). Refunds pool on API side if Issued. */
  async onDeletePettyCash(id, isSettled) {
    const warning = isSettled ? "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0639\u0647\u062F\u0629 \u0627\u0644\u0645\u0633\u0648\u0627\u0629\u061F \u0633\u064A\u062A\u0645 \u0625\u0632\u0627\u0644\u062A\u0647\u0627 \u0646\u0647\u0627\u0626\u064A\u0627\u064B." : "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u062D\u0630\u0641\u061F \u0633\u064A\u062A\u0645 \u0625\u0631\u062C\u0627\u0639 \u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u0633\u062A\u0642\u0637\u0639 \u0625\u0644\u0649 \u0645\u062D\u0641\u0638\u0629 \u062A\u0645\u0648\u064A\u0644 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.";
    const isConfirmed = await this.confirmService.confirm({
      title: "\u062D\u0630\u0641 \u0627\u0644\u0639\u0647\u062F\u0629 \u0627\u0644\u0646\u0642\u062F\u064A\u0629",
      message: warning,
      confirmText: "\u0646\u0639\u0645\u060C \u0627\u062D\u0630\u0641",
      cancelText: "\u0625\u0644\u063A\u0627\u0621"
    });
    if (!isConfirmed)
      return;
    this.isDeletingPettyCash.set(true);
    this.pettyCashService.deletePettyCash(this.projectId, id).subscribe({
      next: () => {
        this.isDeletingPettyCash.set(false);
        this.fetchPettyCash();
        this.fetchCashPools();
      },
      error: (err) => {
        this.isDeletingPettyCash.set(false);
        this.confirmService.alert({
          title: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0629",
          message: err?.error?.message || "\u0641\u0634\u0644\u062A \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062D\u0630\u0641.",
          type: "error"
        });
      }
    });
  }
  // ── Edit Petty Cash Modal Actions ──
  openEditPettyCashModal(item) {
    this.selectedPettyCashToEdit = item;
    this.editPettyCashForm.reset({
      amount: item.amount,
      category: item.category || "Other",
      reason: item.reason
    });
    this.isEditPettyCashModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }
  closeEditPettyCashModal() {
    this.isEditPettyCashModalOpen.set(false);
    this.selectedPettyCashToEdit = null;
    this.confirmService.toggleBodyScroll(false);
  }
  submitEditPettyCash() {
    if (this.editPettyCashForm.invalid || !this.selectedPettyCashToEdit)
      return;
    this.isEditingPettyCash.set(true);
    const formVal = this.editPettyCashForm.value;
    this.pettyCashService.updatePettyCash(this.projectId, this.selectedPettyCashToEdit.id, formVal).subscribe({
      next: () => {
        this.isEditingPettyCash.set(false);
        this.closeEditPettyCashModal();
        this.fetchPettyCash();
      },
      error: (err) => {
        this.isEditingPettyCash.set(false);
        this.confirmService.alert({
          title: "\u0641\u0634\u0644 \u0627\u0644\u062A\u0639\u062F\u064A\u0644",
          message: err?.error?.message || "\u062A\u0639\u0630\u0631 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0639\u0647\u062F\u0629 \u0627\u0644\u0646\u0642\u062F\u064A\u0629.",
          type: "error"
        });
      }
    });
  }
  // ── Edit Transaction Modal Actions ──
  openEditTransactionModal(t) {
    this.selectedTransactionToEdit = t;
    this.editTransactionForm.reset({
      amount: t.amount,
      description: t.description
    });
    this.isEditTransactionModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }
  closeEditTransactionModal() {
    this.isEditTransactionModalOpen.set(false);
    this.selectedTransactionToEdit = null;
    this.confirmService.toggleBodyScroll(false);
  }
  submitEditTransaction() {
    if (this.editTransactionForm.invalid || !this.selectedTransactionToEdit)
      return;
    this.isSavingTransaction.set(true);
    const formVal = this.editTransactionForm.value;
    this.financialService.updateTransaction(this.projectId, this.selectedTransactionToEdit.id, formVal).subscribe({
      next: () => {
        this.isSavingTransaction.set(false);
        this.closeEditTransactionModal();
        this.fetchTransactions();
        this.fetchCashPools();
      },
      error: (err) => {
        this.isSavingTransaction.set(false);
        this.confirmService.alert({
          title: "\u0641\u0634\u0644 \u0627\u0644\u062A\u0639\u062F\u064A\u0644",
          message: err?.error?.message || "\u062A\u0639\u0630\u0631 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629.",
          type: "error"
        });
      }
    });
  }
  // ── Revise Budget Modal Actions ──
  openReviseBudgetModal() {
    this.reviseBudgetForm.reset({
      newBudget: this.parsedBudget(),
      reasonForChange: "",
      boqFileUrl: ""
    });
    this.selectedBoqFile = null;
    this.isReviseBudgetModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }
  closeReviseBudgetModal() {
    this.isReviseBudgetModalOpen.set(false);
    this.selectedBoqFile = null;
    this.confirmService.toggleBodyScroll(false);
  }
  onBoqFileSelected(event) {
    const file = event.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith("image/");
      const maxSize = isImage ? 2 * 1024 * 1024 : 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.confirmService.alert({
          title: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B",
          message: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B! \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0635\u0648\u0631 2 \u0645\u064A\u062C\u0627 \u0648\u0644\u0644\u0645\u0642\u0627\u064A\u0633\u0627\u062A 5 \u0645\u064A\u062C\u0627.",
          type: "error"
        });
        event.target.value = "";
        return;
      }
      this.selectedBoqFile = file;
    }
  }
  submitReviseBudget() {
    if (this.reviseBudgetForm.invalid)
      return;
    this.isRevisingBudget.set(true);
    const proceed = (boqUrl) => {
      const formVal = this.reviseBudgetForm.value;
      const dto = {
        newBudget: formVal.newBudget,
        reasonForChange: formVal.reasonForChange,
        boqFileUrl: boqUrl
      };
      this.projectService.reviseBudget(this.projectId, dto).subscribe({
        next: () => {
          this.isRevisingBudget.set(false);
          this.closeReviseBudgetModal();
          this.fetchProjectDetails();
          this.fetchBudgetHistory();
        },
        error: (err) => {
          this.isRevisingBudget.set(false);
          this.confirmService.alert({
            title: "\u0641\u0634\u0644 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629",
            message: err?.error?.message || "\u062A\u0639\u0630\u0631 \u062A\u0639\u062F\u064A\u0644 \u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.",
            type: "error"
          });
        }
      });
    };
    if (this.selectedBoqFile) {
      this.isUploadingBoq.set(true);
      this.uploadService.uploadProjectDocument(this.projectId, this.selectedBoqFile).subscribe({
        next: (res) => {
          this.isUploadingBoq.set(false);
          if (res.success && res.data) {
            proceed(res.data.url);
          } else {
            this.isRevisingBudget.set(false);
            this.confirmService.alert({
              title: "\u0641\u0634\u0644 \u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641",
              message: "\u0641\u0634\u0644 \u0631\u0641\u0639 \u0645\u0644\u0641 BOQ.",
              type: "error"
            });
          }
        },
        error: () => {
          this.isUploadingBoq.set(false);
          this.isRevisingBudget.set(false);
          this.confirmService.alert({
            title: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0631\u0641\u0639",
            message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0639 \u0645\u0644\u0641 BOQ.",
            type: "error"
          });
        }
      });
    } else {
      proceed("");
    }
  }
  fetchBudgetHistory() {
    this.projectService.getProjectBudgetHistory(this.projectId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.budgetHistory.set(res.data);
        }
      }
    });
  }
  fetchUsersList() {
    this.userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.usersList.set(res.data.filter((u) => ["manager", "siteengineer", "designengineer"].includes(u.role.toLowerCase())));
        }
      }
    });
  }
  fetchSettlements() {
    this.isLoadingSettlements.set(true);
    this.settlementService.getSettlements(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isLoadingSettlements.set(false);
        if (res.success && res.data) {
          this.settlements.set(res.data);
        }
      },
      error: () => this.isLoadingSettlements.set(false)
    });
  }
  openDisburseModal() {
    if (this.project()?.status === "Closed")
      return;
    this.disburseForm.reset({
      userId: null,
      amount: null,
      description: "",
      sourcePoolId: null,
      paymentMethod: "Cash"
    });
    this.disburseErrors.set([]);
    this.isDisburseModalOpen.set(true);
  }
  closeDisburseModal() {
    this.isDisburseModalOpen.set(false);
  }
  onDisburseSubmit() {
    if (this.disburseForm.invalid)
      return;
    this.isDisbursing.set(true);
    this.disburseErrors.set([]);
    this.financialService.directDisbursement(this.projectId, this.disburseForm.value).subscribe({
      next: (res) => {
        this.isDisbursing.set(false);
        if (res.success) {
          this.confirmService.alert({
            title: "\u062A\u0645 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u062C\u0627\u062D",
            message: "\u062A\u0645 \u062A\u0639\u0632\u064A\u0632 \u0627\u0644\u0639\u0647\u062F\u0629 \u0648\u0635\u0631\u0641\u0647\u0627 \u0628\u0646\u062C\u0627\u062D \u0648\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0623\u0631\u0635\u062F\u0629.",
            type: "success"
          });
          this.closeDisburseModal();
          this.fetchCashPools();
          this.fetchPettyCash();
          this.fetchTransactions();
        } else {
          this.disburseErrors.set([res.message || "\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631."]);
        }
      },
      error: (err) => {
        this.isDisbursing.set(false);
        this.disburseErrors.set([err.error?.message || err.message || "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645."]);
      }
    });
  }
  openSettlementModal(pettyCash) {
    this.selectedPettyCashForSettlement.set(pettyCash);
    this.settlementErrors.set([]);
    this.settlementLines.clear();
    const existing = this.settlements().find((s) => s.pettyCashId === pettyCash.id);
    const isLocked = existing && existing.status !== "Draft" && existing.status !== "Rejected";
    if (existing && existing.lines && existing.lines.length > 0) {
      existing.lines.forEach((line) => {
        this.settlementLines.push(this.fb.group({
          category: [{ value: line.category, disabled: isLocked }, Validators.required],
          amount: [{ value: line.amount, disabled: isLocked }, [Validators.required, Validators.min(0.01)]],
          description: [{ value: line.description, disabled: isLocked }, Validators.required],
          invoiceUrl: [line.invoiceUrl],
          uploading: [false],
          localPreviewUrl: [line.invoiceUrl || ""]
        }));
      });
    } else {
      this.addSettlementLine();
    }
    this.isSettlementModalOpen.set(true);
  }
  closeSettlementModal() {
    this.isSettlementModalOpen.set(false);
    this.selectedPettyCashForSettlement.set(null);
  }
  onSettlementLineFileSelected(event, index) {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.confirmService.alert({
          title: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B / File Size Too Large",
          message: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B! \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0645\u0644\u0641\u0627\u062A 5 \u0645\u064A\u062C\u0627. / The maximum file size is 5MB.",
          type: "error"
        });
        return;
      }
      const localUrl = URL.createObjectURL(file);
      const lineGroup = this.settlementLines.at(index);
      lineGroup.patchValue({ localPreviewUrl: localUrl, uploading: true });
      this.uploadService.uploadProjectDocument(this.projectId, file).subscribe({
        next: (res) => {
          lineGroup.patchValue({ uploading: false });
          URL.revokeObjectURL(localUrl);
          if (res.success && res.data) {
            lineGroup.patchValue({ invoiceUrl: res.data.url, localPreviewUrl: res.data.url });
          } else {
            this.confirmService.alert({ title: "\u0641\u0634\u0644 \u0627\u0644\u0631\u0641\u0639", message: "\u0641\u0634\u0644 \u0631\u0641\u0639 \u0625\u064A\u0635\u0627\u0644 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629.", type: "error" });
          }
        },
        error: () => {
          lineGroup.patchValue({ uploading: false });
          URL.revokeObjectURL(localUrl);
          this.confirmService.alert({ title: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0631\u0641\u0639", message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0639 \u0625\u064A\u0635\u0627\u0644 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629.", type: "error" });
        }
      });
    }
  }
  onSettlementSubmit(isDraft) {
    if (this.settlementForm.invalid)
      return;
    const pettyCash = this.selectedPettyCashForSettlement();
    if (!pettyCash)
      return;
    this.isSubmittingSettlement.set(true);
    this.settlementErrors.set([]);
    const payload = {
      pettyCashId: pettyCash.id,
      lines: this.settlementLines.value.map((l) => ({
        category: l.category,
        amount: l.amount,
        description: l.description,
        invoiceUrl: l.invoiceUrl
      })),
      isDraft
    };
    this.offlineSync.submit("create-settlement", payload, (p) => this.settlementService.createSettlement(this.projectId, p)).subscribe({
      next: (res) => {
        this.isSubmittingSettlement.set(false);
        if (res.success) {
          this.confirmService.alert({
            title: isDraft ? "\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0633\u0648\u062F\u0629" : "\u062A\u0645 \u062A\u0642\u062F\u064A\u0645 \u0627\u0644\u062A\u0633\u0648\u064A\u0629 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629",
            message: res.message || (isDraft ? "\u062A\u0645 \u062D\u0641\u0638 \u0645\u0633\u0648\u062F\u0629 \u0627\u0644\u062A\u0633\u0648\u064A\u0629 \u0628\u0646\u062C\u0627\u062D." : "\u062A\u0645 \u062A\u0642\u062F\u064A\u0645 \u0637\u0644\u0628 \u062A\u0633\u0648\u064A\u0629 \u0627\u0644\u0639\u0647\u062F\u0629 \u0628\u0646\u062C\u0627\u062D \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629."),
            type: "success"
          });
          if (!isDraft) {
            this.closeSettlementModal();
          }
          this.fetchPettyCash();
          this.fetchSettlements();
        } else {
          this.settlementErrors.set([res.message || "\u0641\u0634\u0644 \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062A\u0633\u0648\u064A\u0629."]);
        }
      },
      error: (err) => {
        this.isSubmittingSettlement.set(false);
        this.settlementErrors.set([err.error?.message || err.message || "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645."]);
      }
    });
  }
  onApproveSettlement(id) {
    this.confirmService.confirm({
      title: "\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0633\u0648\u064A\u0629 / Approve Settlement",
      message: "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u062A\u0633\u0648\u064A\u0629 \u0647\u0630\u0647 \u0627\u0644\u0639\u0647\u062F\u0629\u061F / Are you sure you want to approve this settlement?",
      confirmText: "\u0646\u0639\u0645\u060C \u0627\u0639\u062A\u0645\u062F / Yes, Approve",
      cancelText: "\u0625\u0644\u063A\u0627\u0621 / Cancel"
    }).then((confirmed) => {
      if (confirmed) {
        this.settlementService.approveSettlement(this.projectId, id).subscribe({
          next: (res) => {
            if (res.success) {
              this.confirmService.alert({
                title: "\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D",
                message: res.message || "\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0633\u0648\u064A\u0629 \u0628\u0646\u062C\u0627\u062D.",
                type: "success"
              });
              this.fetchSettlements();
              this.fetchPettyCash();
              this.fetchCashPools();
              this.fetchTransactions();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({ title: "\u0641\u0634\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F", message: res.message || "\u0641\u0634\u0644 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0633\u0648\u064A\u0629.", type: "error" });
            }
          }
        });
      }
    });
  }
  onConfirmRefund(id) {
    this.confirmService.confirm({
      title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0633\u062A\u0631\u062C\u0627\u0639 \u0627\u0644\u0646\u0642\u0648\u062F / Confirm Refund",
      message: "\u0647\u0644 \u062A\u0624\u0643\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0631\u062A\u062C\u0639 \u0646\u0642\u062F\u0627\u064B \u0645\u0646 \u0627\u0644\u0645\u0647\u0646\u062F\u0633 \u0648\u0625\u064A\u062F\u0627\u0639\u0647 \u0628\u0627\u0644\u062E\u0632\u064A\u0646\u0629\u061F / Do you confirm receiving the cash refund from the engineer?",
      confirmText: "\u0646\u0639\u0645\u060C \u0627\u0633\u062A\u0644\u0645\u062A / Yes, Confirmed",
      cancelText: "\u0625\u0644\u063A\u0627\u0621 / Cancel"
    }).then((confirmed) => {
      if (confirmed) {
        this.settlementService.confirmRefund(this.projectId, id).subscribe({
          next: (res) => {
            if (res.success) {
              this.confirmService.alert({
                title: "\u062A\u0645 \u0627\u0644\u062A\u0623\u0643\u064A\u062F \u0648\u0625\u064A\u062F\u0627\u0639 \u0627\u0644\u0645\u0628\u0644\u063A",
                message: "\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0646\u0642\u0648\u062F \u0628\u0646\u062C\u0627\u062D \u0648\u0625\u0639\u0627\u062F\u0629 \u0634\u062D\u0646 \u0627\u0644\u062E\u0632\u064A\u0646\u0629/\u0627\u0644\u0635\u0646\u062F\u0648\u0642.",
                type: "success"
              });
              this.fetchSettlements();
              this.fetchPettyCash();
              this.fetchCashPools();
              this.fetchTransactions();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({ title: "\u0641\u0634\u0644 \u0627\u0644\u062A\u0623\u0643\u064A\u062F", message: res.message || "\u0641\u0634\u0644 \u062A\u0623\u0643\u064A\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0646\u0642\u0648\u062F.", type: "error" });
            }
          }
        });
      }
    });
  }
  onRejectSettlement(id) {
    this.confirmService.confirm({
      title: "\u0631\u0641\u0636 \u0627\u0644\u062A\u0633\u0648\u064A\u0629 / Reject Settlement",
      message: "\u0647\u0644 \u062A\u0631\u064A\u062F \u0631\u0641\u0636 \u062A\u0633\u0648\u064A\u0629 \u0647\u0630\u0647 \u0627\u0644\u0639\u0647\u062F\u0629\u061F \u0628\u0631\u062C\u0627\u0621 \u0643\u062A\u0627\u0628\u0629 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 \u0623\u062F\u0646\u0627\u0647: / Write reason for rejection:",
      confirmText: "\u0631\u0641\u0636 / Reject",
      cancelText: "\u0625\u0644\u063A\u0627\u0621 / Cancel"
    }).then((confirmed) => {
      if (confirmed) {
        const comments = prompt("\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 / Rejection Comments:");
        if (comments === null)
          return;
        if (!comments.trim()) {
          alert("\u064A\u062C\u0628 \u0643\u062A\u0627\u0628\u0629 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 / Rejection comments are required.");
          return;
        }
        this.settlementService.rejectSettlement(this.projectId, id, comments).subscribe({
          next: (res) => {
            if (res.success) {
              this.confirmService.alert({
                title: "\u062A\u0645 \u0627\u0644\u0631\u0641\u0636",
                message: "\u062A\u0645 \u0631\u0641\u0636 \u0637\u0644\u0628 \u062A\u0633\u0648\u064A\u0629 \u0627\u0644\u0639\u0647\u062F\u0629 \u0628\u0646\u062C\u0627\u062D \u0648\u0625\u0639\u0627\u062F\u062A\u0647\u0627 \u0644\u0644\u0645\u0647\u0646\u062F\u0633.",
                type: "success"
              });
              this.fetchSettlements();
              this.fetchPettyCash();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({ title: "\u0641\u0634\u0644 \u0627\u0644\u0631\u0641\u0636", message: res.message || "\u0641\u0634\u0644 \u0631\u0641\u0636 \u0627\u0644\u062A\u0633\u0648\u064A\u0629.", type: "error" });
            }
          }
        });
      }
    });
  }
  onApproveReimbursement(item, poolId) {
    if (!poolId) {
      this.confirmService.alert({
        title: "\u0627\u062E\u062A\u0631 \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u062A\u0645\u0648\u064A\u0644",
        message: "\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u062A\u0645\u0648\u064A\u0644 \u0623\u0648\u0644\u0627\u064B \u0644\u0635\u0631\u0641 \u0627\u0644\u062A\u0639\u0648\u064A\u0636.",
        type: "info"
      });
      return;
    }
    this.confirmService.confirm({
      title: "\u0635\u0631\u0641 \u062A\u0639\u0648\u064A\u0636 \u0627\u0644\u0645\u0635\u0627\u0631\u064A\u0641 / Approve Reimbursement",
      message: `\u0647\u0644 \u062A\u0624\u0643\u062F \u0635\u0631\u0641 \u0645\u0628\u0644\u063A \u0627\u0644\u062A\u0639\u0648\u064A\u0636 \u0628\u0642\u064A\u0645\u0629 ${item.amount} EGP \u0644\u0644\u0645\u0648\u0638\u0641 ${item.issuedTo} \u0645\u0646 \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u062A\u0645\u0648\u064A\u0644 \u0627\u0644\u0645\u062D\u062F\u062F\u0629\u061F`,
      confirmText: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0635\u0631\u0641 / Yes, Disburse",
      cancelText: "\u0625\u0644\u063A\u0627\u0621 / Cancel"
    }).then((confirmed) => {
      if (confirmed) {
        this.isCloseoutLoading.set(true);
        this.pettyCashService.approvePettyCash(this.projectId, item.id, { sourcePoolId: poolId }).subscribe({
          next: (res) => {
            this.isCloseoutLoading.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: "\u062A\u0645 \u0627\u0644\u0635\u0631\u0641 \u0648\u0627\u0644\u062A\u0633\u0648\u064A\u0629",
                message: "\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u0627\u0644\u062A\u0639\u0648\u064A\u0636 \u0648\u0635\u0631\u0641\u0647 \u0628\u0646\u062C\u0627\u062D \u0645\u0646 \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0648\u062A\u062D\u062F\u064A\u062B \u0631\u0635\u064A\u062F \u0627\u0644\u0645\u0648\u0638\u0641.",
                type: "success"
              });
              this.fetchPettyCash();
              this.fetchSettlements();
              this.fetchCashPools();
              this.fetchTransactions();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({
                title: "\u0641\u0634\u0644 \u0635\u0631\u0641 \u0627\u0644\u062A\u0639\u0648\u064A\u0636",
                message: res.message || "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0635\u0631\u0641 \u0627\u0644\u062A\u0639\u0648\u064A\u0636.",
                type: "error"
              });
            }
          },
          error: (err) => {
            this.isCloseoutLoading.set(false);
            this.confirmService.alert({
              title: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0629",
              message: err.error?.message || err.message || "\u0641\u0634\u0644\u062A \u0639\u0645\u0644\u064A\u0629 \u0635\u0631\u0641 \u0627\u0644\u062A\u0639\u0648\u064A\u0636.",
              type: "error"
            });
          }
        });
      }
    });
  }
  onApprovePettyCashRequest(item, poolId) {
    if (!poolId) {
      this.confirmService.alert({
        title: "\u0627\u062E\u062A\u0631 \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u062A\u0645\u0648\u064A\u0644",
        message: "\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u062A\u0645\u0648\u064A\u0644 \u0623\u0648\u0644\u0627\u064B \u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0635\u0631\u0641 \u0627\u0644\u0639\u0647\u062F\u0629.",
        type: "info"
      });
      return;
    }
    this.confirmService.confirm({
      title: "\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0635\u0631\u0641 \u0627\u0644\u0639\u0647\u062F\u0629 / Approve & Disburse",
      message: `\u0647\u0644 \u062A\u0624\u0643\u062F \u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0635\u0631\u0641 \u0645\u0628\u0644\u063A \u0627\u0644\u0639\u0647\u062F\u0629 \u0628\u0642\u064A\u0645\u0629 ${item.amount} EGP \u0644\u0644\u0645\u0648\u0638\u0641 ${item.issuedTo} \u0645\u0646 \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u062A\u0645\u0648\u064A\u0644 \u0627\u0644\u0645\u062D\u062F\u062F\u0629\u061F`,
      confirmText: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0635\u0631\u0641 / Yes, Disburse",
      cancelText: "\u0625\u0644\u063A\u0627\u0621 / Cancel"
    }).then((confirmed) => {
      if (confirmed) {
        this.isLoadingPettyCash.set(true);
        this.pettyCashService.approvePettyCash(this.projectId, item.id, { sourcePoolId: poolId }).subscribe({
          next: (res) => {
            this.isLoadingPettyCash.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: "\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u0635\u0631\u0641",
                message: "\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0637\u0644\u0628 \u0627\u0644\u0639\u0647\u062F\u0629 \u0648\u0635\u0631\u0641\u0647\u0627 \u0628\u0646\u062C\u0627\u062D \u0648\u062A\u062D\u062F\u064A\u062B \u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.",
                type: "success"
              });
              this.fetchPettyCash();
              this.fetchSettlements();
              this.fetchCashPools();
              this.fetchTransactions();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({
                title: "\u0641\u0634\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u0635\u0631\u0641",
                message: res.message || "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0639\u0647\u062F\u0629.",
                type: "error"
              });
            }
          },
          error: (err) => {
            this.isLoadingPettyCash.set(false);
            this.confirmService.alert({
              title: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0629",
              message: err.error?.message || err.message || "\u0641\u0634\u0644\u062A \u0639\u0645\u0644\u064A\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0639\u0647\u062F\u0629.",
              type: "error"
            });
          }
        });
      }
    });
  }
  onRejectPettyCashRequest(item) {
    this.confirmService.confirm({
      title: "\u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u0639\u0647\u062F\u0629 / Reject Petty Cash",
      message: `\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u0639\u0647\u062F\u0629 \u0644\u0644\u0645\u0648\u0638\u0641 ${item.issuedTo} \u0628\u0642\u064A\u0645\u0629 ${item.amount} EGP\u061F \u064A\u0631\u062C\u0649 \u0643\u062A\u0627\u0628\u0629 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 \u0623\u062F\u0646\u0627\u0647:`,
      confirmText: "\u0646\u0639\u0645\u060C \u0627\u0631\u0641\u0636 / Yes, Reject",
      cancelText: "\u0625\u0644\u063A\u0627\u0621 / Cancel"
    }).then((confirmed) => {
      if (confirmed) {
        const comments = prompt("\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 / Rejection Comments:");
        if (comments === null)
          return;
        if (!comments.trim()) {
          alert("\u064A\u062C\u0628 \u0643\u062A\u0627\u0628\u0629 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 / Rejection comments are required.");
          return;
        }
        this.isLoadingPettyCash.set(true);
        this.pettyCashService.rejectPettyCash(this.projectId, item.id, comments).subscribe({
          next: (res) => {
            this.isLoadingPettyCash.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: "\u062A\u0645 \u0627\u0644\u0631\u0641\u0636 \u0628\u0646\u062C\u0627\u062D",
                message: "\u062A\u0645 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u0639\u0647\u062F\u0629 \u0628\u0646\u062C\u0627\u062D \u0648\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0644\u0644\u0645\u0648\u0638\u0641.",
                type: "success"
              });
              this.fetchPettyCash();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({
                title: "\u0641\u0634\u0644 \u0631\u0641\u0636 \u0627\u0644\u0639\u0647\u062F\u0629",
                message: res.message || "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0636 \u0627\u0644\u0639\u0647\u062F\u0629.",
                type: "error"
              });
            }
          },
          error: (err) => {
            this.isLoadingPettyCash.set(false);
            this.confirmService.alert({
              title: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0629",
              message: err.error?.message || err.message || "\u0641\u0634\u0644\u062A \u0639\u0645\u0644\u064A\u0629 \u0631\u0641\u0636 \u0627\u0644\u0639\u0647\u062F\u0629.",
              type: "error"
            });
          }
        });
      }
    });
  }
  onWhatsAppAlert(pettyCash, customMessage) {
    const defaultMsg = `\u0645\u0631\u062D\u0628\u0627\u064B ${pettyCash.issuedTo}\u060C \u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0648\u062A\u062D\u062F\u064A\u062B \u0637\u0644\u0628 \u0627\u0644\u0639\u0647\u062F\u0629 \u0627\u0644\u062E\u0627\u0635 \u0628\u0643 \u0628\u0642\u064A\u0645\u0629 ${pettyCash.amount} EGP \u0644\u0640 ${pettyCash.projectName} - ${pettyCash.reason}.`;
    const message = customMessage || defaultMsg;
    this.userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const userObj = res.data.find((u) => `${u.firstName} ${u.lastName}`.trim() === pettyCash.issuedTo.trim());
          const phone = userObj?.whatsAppPhone || userObj?.personalPhone;
          if (phone) {
            this.whatsappLink.openChat(phone, message);
          } else {
            this.confirmService.alert({
              title: "\u062A\u0646\u0628\u064A\u0647 \u0648\u0627\u062A\u0633\u0627\u0628",
              message: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0631\u0642\u0645 \u0648\u0627\u062A\u0633\u0627\u0628 \u0645\u0633\u062C\u0644 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0644\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647.",
              type: "info"
            });
          }
        }
      }
    });
  }
  // --- Closeout & Reconciliation Operations ---
  onFreezeProject() {
    this.confirmService.confirm({
      title: "\u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0644\u0644\u0645\u0634\u0631\u0648\u0639 / Freeze Financial Operations",
      message: "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u062C\u0645\u064A\u062F \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0648\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0639\u0647\u062F \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0647 \u0627\u0644\u062E\u0637\u0648\u0629 \u0625\u0644\u0627 \u0628\u0637\u0644\u0628 \u0631\u0633\u0645\u064A.",
      confirmText: "\u0646\u0639\u0645\u060C \u0642\u0645 \u0628\u0627\u0644\u062A\u062C\u0645\u064A\u062F / Yes, Freeze",
      cancelText: "\u0625\u0644\u063A\u0627\u0621 / Cancel"
    }).then((confirmed) => {
      if (confirmed) {
        this.isCloseoutLoading.set(true);
        this.projectCloseoutService.freezeProject(this.projectId).subscribe({
          next: (res) => {
            this.isCloseoutLoading.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: "\u062A\u0645 \u0627\u0644\u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0645\u0627\u0644\u064A",
                message: "\u062A\u0645 \u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0644\u0644\u0645\u0634\u0631\u0648\u0639 \u0648\u062A\u0648\u0644\u064A\u062F \u0631\u0627\u0628\u0637 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0639\u0645\u064A\u0644 \u0628\u0646\u062C\u0627\u062D.",
                type: "success"
              });
              this.fetchProjectDetails();
            } else {
              this.confirmService.alert({
                title: "\u0641\u0634\u0644 \u0627\u0644\u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0645\u0627\u0644\u064A",
                message: res.message || "\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0623\u062B\u0646\u0627\u0621 \u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A.",
                type: "error"
              });
            }
          },
          error: (err) => {
            this.isCloseoutLoading.set(false);
            this.confirmService.alert({
              title: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0629",
              message: err.error?.message || err.message || "\u0641\u0634\u0644\u062A \u0639\u0645\u0644\u064A\u0629 \u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0645\u0634\u0631\u0648\u0639.",
              type: "error"
            });
          }
        });
      }
    });
  }
  onRunReconciliation() {
    this.isCloseoutLoading.set(true);
    this.projectCloseoutService.getReconciliationReport(this.projectId).subscribe({
      next: (res) => {
        this.isCloseoutLoading.set(false);
        if (res.success && res.data) {
          this.reconciliationReport.set(res.data);
        } else {
          this.confirmService.alert({
            title: "\u0641\u0634\u0644 \u0627\u0644\u062A\u062F\u0642\u064A\u0642",
            message: res.message || "\u0644\u0645 \u0646\u062A\u0645\u0643\u0646 \u0645\u0646 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u062A\u0642\u0631\u064A\u0631 \u0645\u0637\u0627\u0628\u0642\u0629 \u0627\u0644\u0623\u0631\u0635\u062F\u0629.",
            type: "error"
          });
        }
      },
      error: (err) => {
        this.isCloseoutLoading.set(false);
        this.confirmService.alert({
          title: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062F\u0642\u064A\u0642",
          message: err.error?.message || err.message || "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0634\u063A\u064A\u0644 \u0645\u062D\u0631\u0643 \u0627\u0644\u062A\u0633\u0648\u064A\u0629 \u0627\u0644\u0623\u0648\u062A\u0648\u0645\u0627\u062A\u064A\u0643\u064A.",
          type: "error"
        });
      }
    });
  }
  onFinalCloseout() {
    this.confirmService.confirm({
      title: "\u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0648\u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 / Final Project Closeout",
      message: "\u062A\u062D\u0630\u064A\u0631: \u0633\u064A\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0648\u062A\u062C\u0645\u064A\u062F \u062C\u0645\u064A\u0639 \u062D\u0633\u0627\u0628\u0627\u062A\u0647 \u0648\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0639\u062F\u064A\u0644 \u0623\u0648 \u062A\u0635\u0641\u064A\u0629 \u0623\u064A \u0639\u0647\u062F \u0628\u0639\u062F \u0630\u0644\u0643. \u0647\u0644 \u062A\u0631\u063A\u0628 \u0641\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F",
      confirmText: "\u0646\u0639\u0645\u060C \u0625\u063A\u0644\u0627\u0642 \u0646\u0647\u0627\u0626\u064A / Yes, Close Out",
      cancelText: "\u0625\u0644\u063A\u0627\u0621 / Cancel"
    }).then((confirmed) => {
      if (confirmed) {
        this.isCloseoutLoading.set(true);
        this.projectCloseoutService.finalCloseout(this.projectId).subscribe({
          next: (res) => {
            this.isCloseoutLoading.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: "\u062A\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0628\u0646\u062C\u0627\u062D",
                message: "\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0648\u062D\u0641\u0638 \u0627\u0644\u0623\u0631\u0634\u064A\u0641 \u0648\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0628\u0646\u062C\u0627\u062D.",
                type: "success"
              });
              this.fetchProjectDetails();
            } else {
              this.confirmService.alert({
                title: "\u0641\u0634\u0644 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0647\u0627\u0626\u064A",
                message: res.message || "\u064A\u0631\u062C\u0649 \u0645\u0631\u0627\u062C\u0639\u0629 \u0643\u0627\u0641\u0629 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062A \u0648\u0627\u0644\u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0645\u0639\u0644\u0642\u0629 \u0623\u0648\u0644\u0627\u064B.",
                type: "error"
              });
            }
          },
          error: (err) => {
            this.isCloseoutLoading.set(false);
            this.confirmService.alert({
              title: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0625\u063A\u0644\u0627\u0642",
              message: err.error?.message || err.message || "\u0641\u0634\u0644\u062A \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0647\u0627\u0626\u064A.",
              type: "error"
            });
          }
        });
      }
    });
  }
  getPublicReviewUrl() {
    const proj = this.project();
    if (!proj || !proj.publicReviewToken)
      return "";
    return `${window.location.origin}/public/project-review/${proj.publicReviewToken}`;
  }
  copyReviewLink() {
    const url = this.getPublicReviewUrl();
    if (!url)
      return;
    navigator.clipboard.writeText(url).then(() => {
      this.confirmService.alert({
        title: "\u062A\u0645 \u0627\u0644\u0646\u0633\u062E",
        message: "\u062A\u0645 \u0646\u0633\u062E \u0631\u0627\u0628\u0637 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0639\u0645\u064A\u0644 \u0625\u0644\u0649 \u0627\u0644\u062D\u0627\u0641\u0638\u0629 \u0628\u0646\u062C\u0627\u062D.",
        type: "success"
      });
    });
  }
  getWhatsAppShareUrl() {
    const proj = this.project();
    if (!proj)
      return "#";
    const url = this.getPublicReviewUrl();
    if (!url)
      return "#";
    let phone = proj.clientWhatsApp || "";
    phone = phone.replace(/\D/g, "");
    if (phone.startsWith("01") && phone.length === 11) {
      phone = "2" + phone;
    } else if (phone.startsWith("1") && phone.length === 10) {
      phone = "20" + phone;
    } else if (phone.startsWith("0") && phone.length > 9) {
      phone = "2" + phone.substring(1);
    }
    const message = `\u0645\u0631\u062D\u0628\u0627\u064B ${proj.clientName || "\u0627\u0644\u0639\u0645\u064A\u0644 \u0627\u0644\u0643\u0631\u064A\u0645"}\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0643\u0631\u0645 \u0628\u062A\u0642\u064A\u064A\u0645 \u0645\u0633\u062A\u0648\u0649 \u0631\u0636\u0627\u0643\u0645 \u0648\u062C\u0648\u062F\u0629 \u062A\u0646\u0641\u064A\u0630 \u0645\u0634\u0631\u0648\u0639\u0643\u0645 "${proj.name}" \u0645\u0646 \u062E\u0644\u0627\u0644 \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0627\u0644\u064A:
${url}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }
  shareReviewOnWhatsApp() {
    const waUrl = this.getWhatsAppShareUrl();
    if (waUrl && waUrl !== "#" && typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
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
  static \u0275fac = function ProjectDetailsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectDetailsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectDetailsComponent, selectors: [["app-project-details"]], hostBindings: function ProjectDetailsComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown", function ProjectDetailsComponent_keydown_HostBindingHandler($event) {
        return ctx.handleKeyboardEvent($event);
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 79, vars: 70, consts: [["boqFileInput", ""], ["galleryFileInput", ""], ["bannerFileInput", ""], ["logoFileInput", ""], ["expenseDatePicker", ""], ["injectDatePicker", ""], [1, "space-y-5", "w-full", "px-3", "sm:px-6", "lg:px-8"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-3", "font-sans"], [1, "bg-slate-900/80", "border", "border-slate-800", "p-3.5", "rounded-xl", "flex", "flex-col", "justify-between", "shadow-sm"], [1, "text-xs", "text-slate-400", "font-bold", "uppercase", "tracking-wider", "font-cairo", "block", "truncate"], [1, "text-base", "lg:text-lg", "font-extrabold", "text-amber-400", "mt-1", "font-mono", "tabular-nums"], [1, "bg-slate-900/60", "border", "border-slate-800/80", "rounded-2xl", "p-4", "sm:p-5", "shadow-xl", "space-y-4"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-b", "border-slate-800/80", "pb-3.5"], [1, "flex", "items-center", "gap-3", "min-w-0"], ["routerLink", "/dashboard/projects", 1, "p-2", "rounded-xl", "bg-slate-950", "border", "border-slate-800", "text-slate-400", "hover:text-white", "hover:border-slate-700", "transition-all", "duration-200", "shrink-0"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5", "rtl:rotate-180"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 19l-7-7m0 0l7-7m-7 7h18"], [1, "min-w-0"], [1, "flex", "items-center", "gap-2", "flex-wrap"], [1, "text-xl", "sm:text-2xl", "font-black", "tracking-tight", "text-white", "font-cairo", "truncate"], [1, "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2", "mt-1", "text-xs", "text-slate-400"], [1, "flex", "items-center", "gap-3", "shrink-0", "flex-wrap"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-3.5", "pt-1"], [1, "rounded-2xl", "border", "px-5", "py-4", "flex", "items-start", "gap-4", 3, "border-amber-500", "bg-amber-500/5", "border-slate-700", "bg-slate-900/40"], [1, "bg-gradient-to-r", "from-emerald-950/20", "to-slate-900/80", "border", "border-emerald-500/30", "rounded-2xl", "p-5", "flex", "flex-col", "sm:flex-row", "items-center", "justify-between", "gap-4", "shadow-xl"], [1, "md:hidden", "w-full", "pb-3", "border-b", "border-slate-800", "font-cairo"], ["for", "mobile-tab-select", 1, "sr-only"], [1, "relative"], ["id", "mobile-tab-select", 1, "w-full", "appearance-none", "bg-slate-900", "border", "border-indigo-500/40", "text-indigo-300", "font-bold", "text-sm", "rounded-xl", "py-3", "pr-4", "pl-10", "focus:outline-none", "focus:border-indigo-500", "focus:ring-1", "focus:ring-indigo-500", "shadow-lg", "cursor-pointer", "transition-all", "duration-150", "font-cairo", 3, "change", "value"], ["value", "petty-cash", 1, "bg-slate-900", "text-slate-100", "py-2"], ["value", "transactions", 1, "bg-slate-900", "text-slate-100", "py-2"], ["value", "settlements", 1, "bg-slate-900", "text-slate-100", "py-2"], ["value", "gallery", 1, "bg-slate-900", "text-slate-100", "py-2"], ["value", "closeout", 1, "bg-slate-900", "text-slate-100", "py-2"], [1, "pointer-events-none", "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "text-indigo-400"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 9l-7 7-7-7"], [1, "hidden", "md:flex", "w-full", "items-center", "justify-between", "gap-2", "border-b", "border-slate-800", "font-cairo", "scrollbar-none", "[-ms-overflow-style:none]", "[scrollbar-width:none]"], ["id", "tab-petty-cash", 1, "flex-1", "min-w-0", "px-3", "py-2.5", "text-xs", "lg:text-sm", "font-bold", "border-b-2", "transition-all", "duration-150", "cursor-pointer", "flex", "items-center", "justify-center", "gap-2", "rounded-t-lg", "whitespace-nowrap", 3, "click"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "bg-amber-500/20", "text-amber-400", "font-mono", "shrink-0"], ["id", "tab-transactions", 1, "flex-1", "min-w-0", "px-3", "py-2.5", "text-xs", "lg:text-sm", "font-bold", "border-b-2", "transition-all", "duration-150", "cursor-pointer", "flex", "items-center", "justify-center", "gap-2", "rounded-t-lg", "whitespace-nowrap", 3, "bg-indigo-600/10", "text-indigo-400", "border-indigo-500", "border-transparent", "text-slate-400"], ["id", "tab-settlements", 1, "flex-1", "min-w-0", "px-3", "py-2.5", "text-xs", "lg:text-sm", "font-bold", "border-b-2", "transition-all", "duration-150", "cursor-pointer", "flex", "items-center", "justify-center", "gap-2", "rounded-t-lg", "whitespace-nowrap", 3, "click"], ["id", "tab-gallery", 1, "flex-1", "min-w-0", "px-3", "py-2.5", "text-xs", "lg:text-sm", "font-bold", "border-b-2", "transition-all", "duration-150", "cursor-pointer", "flex", "items-center", "justify-center", "gap-2", "rounded-t-lg", "whitespace-nowrap", 3, "bg-indigo-600/10", "text-indigo-400", "border-indigo-500", "border-transparent", "text-slate-400"], ["id", "tab-closeout", 1, "flex-1", "min-w-0", "px-3", "py-2.5", "text-xs", "lg:text-sm", "font-bold", "border-b-2", "transition-all", "duration-150", "cursor-pointer", "flex", "items-center", "justify-center", "gap-2", "rounded-t-lg", "whitespace-nowrap", 3, "bg-indigo-600/10", "text-indigo-400", "border-indigo-500", "border-transparent", "text-slate-400"], [1, "bg-indigo-950/40", "border-l-4", "border-indigo-500", "text-slate-300", "text-xs", "p-3", "rounded-lg", "mb-4", "flex", "items-center", "gap-2", "font-cairo", "shadow-sm"], [1, "space-y-6"], [1, "bg-slate-900/25", "border", "border-slate-800/80", "rounded-2xl", "p-6", "shadow-xl", "space-y-6"], [1, "bg-slate-900/25", "border", "border-slate-800/80", "rounded-2xl", "overflow-hidden", "shadow-xl"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-2", "sm:p-4", "bg-black/70", "backdrop-blur-sm"], ["dir", "rtl", 1, "print-only", "hidden", "print:block", "p-8", "bg-white", "text-slate-900", "font-sans", "leading-relaxed"], [1, "fixed", "bottom-6", "right-6", "z-50", "flex", "items-center", "gap-3", "px-4", "py-3", "bg-emerald-600", "border", "border-emerald-500", "text-white", "rounded-xl", "shadow-2xl", "font-cairo", "text-sm", "max-w-sm"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-slate-950/75", "backdrop-blur-sm", "animate-fade-in", "font-sans"], [1, "fixed", "inset-0", "z-[200]", "flex", "items-center", "justify-center", "p-4", "bg-black/92", "backdrop-blur-md", "animate-fade-in"], [1, "text-base", "lg:text-lg", "font-extrabold", "text-emerald-400", "mt-1", "font-mono", "tabular-nums"], [1, "text-base", "lg:text-lg", "font-extrabold", "text-rose-400", "mt-1", "font-mono", "tabular-nums"], [1, "text-base", "lg:text-lg", "font-extrabold", "mt-1", "font-mono", "tabular-nums"], [1, "px-2.5", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "tracking-wider", "uppercase", "bg-emerald-500/10", "text-emerald-400", "border", "border-emerald-500/20", "shrink-0", "font-cairo"], [1, "px-2.5", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "tracking-wider", "uppercase", "bg-slate-800", "text-slate-400", "shrink-0", "font-cairo"], [1, "text-indigo-400", "font-cairo", "font-medium"], [1, "text-slate-600"], [1, "text-amber-400", "font-cairo", "font-medium"], [1, "flex", "items-center", "gap-2.5", "bg-slate-950/80", "border", "border-slate-800", "px-3.5", "py-2", "rounded-xl", "font-cairo", "shadow-sm"], [1, "text-xs", "font-bold", "text-slate-300", "flex", "items-center", "gap-1.5"], [1, "w-2", "h-2", "rounded-full", "transition-colors"], [1, "relative", "inline-flex", "items-center", "cursor-pointer"], ["type", "checkbox", 1, "sr-only", "peer", 3, "change", "checked", "disabled"], [1, "w-9", "h-5", "bg-slate-800", "peer-focus:outline-none", "rounded-full", "peer", "peer-checked:after:translate-x-full", "rtl:peer-checked:after:-translate-x-full", "peer-checked:after:border-white", "after:content-['']", "after:absolute", "after:top-[2px]", "after:start-[2px]", "after:bg-white", "after:border-slate-300", "after:border", "after:rounded-full", "after:h-4", "after:w-4", "after:transition-all", "peer-checked:bg-indigo-600"], [1, "px-4", "py-2.5", "bg-indigo-600", "hover:bg-indigo-500", "active:bg-indigo-700", "text-white", "text-xs", "sm:text-sm", "font-bold", "rounded-xl", "shadow-lg", "shadow-indigo-600/30", "transition-all", "duration-200", "flex", "items-center", "gap-2", "cursor-pointer", "font-cairo", "shrink-0", "disabled:opacity-40", "disabled:cursor-not-allowed", "disabled:bg-slate-800", "disabled:text-slate-500", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M12 4v16m8-8H4"], [1, "bg-slate-950/50", "border", "border-slate-800/80", "rounded-xl", "p-3"], [1, "text-[11px]", "text-slate-500", "font-bold", "uppercase", "tracking-wider", "font-cairo", "block", "mb-0.5"], [1, "text-sm", "font-bold", "text-slate-200", "truncate", "font-cairo"], [1, "bg-slate-950/50", "border", "border-slate-800/80", "rounded-xl", "p-3", "sm:col-span-1"], [1, "text-xs", "text-slate-300", "leading-relaxed", "font-cairo", "line-clamp-2", 3, "title"], [1, "flex", "items-center", "justify-between", "mb-0.5"], [1, "text-[11px]", "text-slate-500", "font-bold", "uppercase", "tracking-wider", "font-cairo"], [1, "text-[10px]", "font-bold", "text-indigo-400", "hover:text-indigo-300", "hover:underline", "cursor-pointer", "font-cairo", "disabled:opacity-40", 3, "disabled"], [1, "text-sm", "font-bold", "text-emerald-400", "font-mono"], [1, "text-[10px]", "font-bold", "text-indigo-400", "hover:text-indigo-300", "hover:underline", "cursor-pointer", "font-cairo", "disabled:opacity-40", 3, "click", "disabled"], [1, "rounded-2xl", "border", "px-5", "py-4", "flex", "items-start", "gap-4"], [1, "shrink-0", "mt-0.5"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-amber-400"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-slate-400"], [1, "text-sm", "font-bold", "font-cairo"], [1, "text-xs", "text-slate-500", "mt-0.5", "font-cairo"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"], [1, "flex", "items-center", "gap-3"], [1, "p-3", "bg-emerald-500/10", "rounded-xl", "border", "border-emerald-500/20", "text-emerald-400", "shrink-0"], ["viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg", 1, "w-6", "h-6", "fill-current"], ["d", "M17.472 14.382c-.022-.014-.029-.022-.054-.054l-.405-.405a1.107 1.107 0 0 0-1.565 0l-.364.364c-.162.162-.338.25-.562.15-.365-.163-.739-.372-1.127-.624-.388-.252-.76-.554-1.116-.906-.356-.352-.656-.724-.908-1.112a14.7 14.7 0 0 1-.624-1.127c-.1-.225-.013-.4.15-.563l.363-.363a1.108 1.108 0 0 0 0-1.566l-.405-.405c-.032-.025-.04-.032-.054-.054A1.123 1.123 0 0 0 9.07 8.35c-.412.413-.679.932-.782 1.488-.13.7.072 1.487.608 2.355.536.868 1.258 1.777 2.15 2.668.892.892 1.8 1.614 2.668 2.15.868.536 1.656.738 2.355.608a2.91 2.91 0 0 0 1.488-.782 1.122 1.122 0 0 0 .15-.717 1.096 1.096 0 0 0-.236-.837zM12.004 2c-5.518 0-10 4.482-10 10 0 1.758.46 3.41 1.266 4.858L2.03 21.684a1.002 1.002 0 0 0 1.286 1.286l4.826-1.24A9.957 9.957 0 0 0 12.004 22c5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18c-1.56 0-3.03-.393-4.323-1.085a1 1 0 0 0-.743-.075l-3.328.855.855-3.328a1 1 0 0 0-.075-.743A7.95 7.95 0 0 1 4.004 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"], [1, "text-sm", "font-bold", "text-white", "font-cairo"], [1, "text-xs", "text-slate-400", "mt-0.5", "font-cairo"], [1, "flex", "flex-wrap", "items-center", "gap-3", "w-full", "sm:w-auto", "shrink-0", "justify-end"], ["type", "text", "readonly", "", 1, "hidden", "sm:block", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "px-3", "py-2", "text-xs", "text-slate-400", "font-mono", "focus:outline-none", "max-w-[200px]", 3, "value"], [1, "px-3.5", "py-2", "rounded-xl", "bg-slate-900", "border", "border-slate-800", "hover:border-slate-700", "text-slate-300", "hover:text-white", "text-xs", "font-bold", "transition-all", "cursor-pointer", "font-cairo", 3, "click"], ["target", "_blank", "rel", "noopener noreferrer", 1, "px-4", "py-2", "rounded-xl", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "text-xs", "font-bold", "transition-all", "cursor-pointer", "font-cairo", "flex", "items-center", "gap-1.5", "justify-center", 3, "href"], ["viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg", 1, "w-4", "h-4", "fill-current"], ["id", "tab-transactions", 1, "flex-1", "min-w-0", "px-3", "py-2.5", "text-xs", "lg:text-sm", "font-bold", "border-b-2", "transition-all", "duration-150", "cursor-pointer", "flex", "items-center", "justify-center", "gap-2", "rounded-t-lg", "whitespace-nowrap", 3, "click"], ["id", "tab-gallery", 1, "flex-1", "min-w-0", "px-3", "py-2.5", "text-xs", "lg:text-sm", "font-bold", "border-b-2", "transition-all", "duration-150", "cursor-pointer", "flex", "items-center", "justify-center", "gap-2", "rounded-t-lg", "whitespace-nowrap", 3, "click"], ["id", "tab-closeout", 1, "flex-1", "min-w-0", "px-3", "py-2.5", "text-xs", "lg:text-sm", "font-bold", "border-b-2", "transition-all", "duration-150", "cursor-pointer", "flex", "items-center", "justify-center", "gap-2", "rounded-t-lg", "whitespace-nowrap", 3, "click"], [1, "bg-gradient-to-br", "from-slate-900/80", "to-rose-950/20", "border", "border-rose-900/40", "rounded-2xl", "p-6", "shadow-xl"], [1, "flex", "items-start", "justify-between"], [1, "text-lg", "font-extrabold", "text-white", "font-cairo", "flex", "items-center", "gap-2"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-rose-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"], [1, "text-xs", "text-slate-400", "mt-1", "font-cairo"], [1, "px-3", "py-1.5", "rounded-full", "text-xs", "font-bold", "tracking-widest", "uppercase", "font-cairo", "border", 3, "bg-emerald-500/10", "text-emerald-400", "border-emerald-500/30", "bg-amber-500/10", "text-amber-300", "border-amber-500/30", "bg-slate-800", "text-slate-400", "border-slate-700"], [1, "bg-slate-900/40", "border", "border-slate-800/80", "rounded-2xl", "p-5", "shadow-xl", "space-y-4"], [1, "flex", "flex-col", "sm:flex-row", "justify-between", "items-start", "sm:items-center", "gap-3", "border-b", "border-slate-800/60", "pb-3"], [1, "text-sm", "font-extrabold", "text-white", "font-cairo", "flex", "items-center", "gap-2"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-indigo-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], [1, "px-3", "py-1", "bg-indigo-500/10", "text-indigo-300", "border", "border-indigo-500/20", "text-[11px]", "font-bold", "rounded-xl", "font-cairo", "shrink-0"], [1, "bg-amber-500/10", "border", "border-amber-500/20", "rounded-xl", "p-3", "text-xs", "text-amber-300", "font-cairo", "flex", "items-center", "gap-2"], [1, "text-base", "shrink-0"], [1, "bg-slate-950/60", "border", "border-slate-800", "rounded-xl", "p-4", "flex", "flex-col", "sm:flex-row", "items-start", "sm:items-center", "justify-between", "gap-4"], [1, "border-2", "border-dashed", "border-slate-800", "hover:border-indigo-500/40", "rounded-xl", "p-6", "text-center", "bg-slate-950/30", "transition-all"], ["type", "file", "accept", ".pdf,.xlsx,.xls,.docx,.doc", 1, "hidden", 3, "change"], [1, "text-xs", "text-rose-400", "font-cairo", "font-bold", "mt-1"], [1, "bg-slate-900/40", "border", "border-indigo-900/40", "rounded-2xl", "p-5", "shadow-xl"], [1, "flex", "flex-wrap", "gap-3"], [1, "space-y-4"], [1, "text-center", "py-12", "text-slate-500"], [1, "px-3", "py-1.5", "rounded-full", "text-xs", "font-bold", "tracking-widest", "uppercase", "font-cairo", "border"], [1, "flex", "items-center", "gap-3", "overflow-hidden"], [1, "p-3", "bg-indigo-600/10", "rounded-xl", "border", "border-indigo-500/20", "text-indigo-400", "shrink-0"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-6", "h-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"], [1, "text-xs", "font-bold", "text-white", "font-mono", "truncate", 3, "title"], [1, "text-[10px]", "text-emerald-400", "font-cairo", "mt-0.5"], [1, "flex", "items-center", "gap-2", "w-full", "sm:w-auto", "shrink-0", "justify-end"], ["target", "_blank", "rel", "noopener noreferrer", "download", "", 1, "px-3.5", "py-2", "rounded-xl", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "text-xs", "font-bold", "transition-all", "cursor-pointer", "font-cairo", "flex", "items-center", "gap-1.5", "shadow-md", 3, "href"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"], [1, "px-3.5", "py-2", "rounded-xl", "bg-slate-800", "hover:bg-slate-700", "text-slate-300", "hover:text-white", "text-xs", "font-bold", "border", "border-slate-700", "transition-all", "cursor-pointer", "font-cairo", "flex", "items-center", "gap-1.5", 3, "disabled"], [1, "px-3.5", "py-2", "rounded-xl", "bg-slate-800", "hover:bg-slate-700", "text-slate-300", "hover:text-white", "text-xs", "font-bold", "border", "border-slate-700", "transition-all", "cursor-pointer", "font-cairo", "flex", "items-center", "gap-1.5", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-10", "h-10", "mx-auto", "text-slate-600", "mb-2", "opacity-50"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], [1, "text-xs", "font-bold", "text-slate-300", "font-cairo"], [1, "text-[11px]", "text-slate-500", "font-cairo", "mt-1"], [1, "mt-4", "px-4", "py-2", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "text-xs", "font-bold", "rounded-xl", "transition-all", "shadow-md", "cursor-pointer", "font-cairo", "inline-flex", "items-center", "gap-1.5", 3, "disabled"], [1, "mt-4", "px-4", "py-2", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "text-xs", "font-bold", "rounded-xl", "transition-all", "shadow-md", "cursor-pointer", "font-cairo", "inline-flex", "items-center", "gap-1.5", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-3.5", "w-3.5", "text-white"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"], [1, "text-sm", "font-bold", "text-indigo-300", "font-cairo", "flex", "items-center", "gap-2", "mb-2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"], [1, "text-xs", "text-slate-400", "mb-3", "font-cairo"], [1, "flex", "items-center", "gap-2"], ["type", "text", "readonly", "", 1, "flex-1", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-3", "py-2.5", "text-xs", "text-slate-300", "font-mono", "focus:outline-none", 3, "value"], [1, "px-4", "py-2.5", "rounded-xl", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "text-xs", "font-bold", "transition-all", "cursor-pointer", "font-cairo", "shrink-0", 3, "click"], ["target", "_blank", "rel", "noopener noreferrer", 1, "px-4", "py-2.5", "rounded-xl", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "text-xs", "font-bold", "transition-all", "cursor-pointer", "font-cairo", "flex", "items-center", "gap-1.5", "shrink-0", "justify-center", 3, "href"], ["id", "btn-freeze-project", 1, "inline-flex", "items-center", "gap-2", "px-5", "py-2.5", "rounded-xl", "bg-amber-500/10", "hover:bg-amber-500/20", "text-amber-300", "border", "border-amber-500/30", "text-sm", "font-bold", "transition-all", "duration-150", "hover:scale-105", "active:scale-95", "disabled:opacity-50", "cursor-pointer", "font-cairo", 3, "disabled"], ["id", "btn-run-audit", 1, "inline-flex", "items-center", "gap-2", "px-5", "py-2.5", "rounded-xl", "bg-indigo-600/10", "hover:bg-indigo-600/20", "text-indigo-400", "border", "border-indigo-500/30", "text-sm", "font-bold", "transition-all", "duration-150", "hover:scale-105", "active:scale-95", "disabled:opacity-50", "cursor-pointer", "font-cairo", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-4", "w-4"], ["id", "btn-final-closeout", 1, "inline-flex", "items-center", "gap-2", "px-5", "py-2.5", "rounded-xl", "bg-rose-600/10", "hover:bg-rose-600/20", "text-rose-400", "border", "border-rose-500/30", "text-sm", "font-bold", "transition-all", "duration-150", "hover:scale-105", "active:scale-95", "disabled:opacity-50", "disabled:cursor-not-allowed", "cursor-pointer", "font-cairo", 3, "disabled"], ["id", "btn-freeze-project", 1, "inline-flex", "items-center", "gap-2", "px-5", "py-2.5", "rounded-xl", "bg-amber-500/10", "hover:bg-amber-500/20", "text-amber-300", "border", "border-amber-500/30", "text-sm", "font-bold", "transition-all", "duration-150", "hover:scale-105", "active:scale-95", "disabled:opacity-50", "cursor-pointer", "font-cairo", 3, "click", "disabled"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 12 5.373 12 12h4z", 1, "opacity-75"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M12 7h.01M15 7h.01M9 17h6"], ["id", "btn-final-closeout", 1, "inline-flex", "items-center", "gap-2", "px-5", "py-2.5", "rounded-xl", "bg-rose-600/10", "hover:bg-rose-600/20", "text-rose-400", "border", "border-rose-500/30", "text-sm", "font-bold", "transition-all", "duration-150", "hover:scale-105", "active:scale-95", "disabled:opacity-50", "disabled:cursor-not-allowed", "cursor-pointer", "font-cairo", 3, "click", "disabled"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"], [1, "text-[10px]", "opacity-60"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-4"], [1, "bg-slate-900/50", "border", "border-slate-800", "rounded-xl", "p-4"], [1, "text-xl", "font-extrabold", "text-slate-200", "mt-1", "font-mono"], [1, "text-xl", "font-extrabold", "text-emerald-400", "mt-1", "font-mono"], [1, "text-xl", "font-extrabold", "text-rose-400", "mt-1", "font-mono"], [1, "text-xl", "font-extrabold", "mt-1", "font-mono"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-4"], [1, "bg-slate-900/40", "border", "p-4", "rounded-xl", "text-center", "cursor-pointer", "transition-all", "duration-200", "hover:border-slate-700", "select-none", "hover:scale-[1.01]", 3, "click"], [1, "text-[10px]", "text-slate-500", "font-bold", "uppercase", "tracking-wider", "font-cairo", "block"], [1, "text-lg", "font-bold", "text-amber-400", "mt-1", "font-mono", "hover:underline"], [1, "text-[9px]", "text-slate-500", "font-cairo", "block", "mt-0.5"], [1, "bg-slate-900/30", "border", "border-slate-800/80", "rounded-2xl", "p-5", "space-y-4", "transition-all", "duration-200", "shadow-lg"], [1, "rounded-xl", "border", "px-5", "py-3", "flex", "flex-col", "gap-2"], [1, "text-xs", "text-rose-400", "font-cairo", "ml-8", "rtl:mr-8", "rtl:ml-0"], [1, "bg-slate-950/50", "border", "border-slate-800/60", "rounded-2xl", "overflow-hidden"], [1, "text-[11px]", "text-slate-600", "text-center", "font-cairo"], [1, "flex", "items-center", "justify-between", "pb-2", "border-b", "border-slate-800/50"], [1, "text-sm", "font-bold", "text-white", "font-cairo", "flex", "items-center", "gap-2"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-amber-400", "animate-pulse"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M19 9l-7 7-7-7"], [1, "text-slate-400", "hover:text-white", "text-xs", "font-cairo", "cursor-pointer", 3, "click"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "rtl:text-right", "text-xs"], [1, "bg-slate-950/40", "text-slate-400", "border-b", "border-slate-800/50"], [1, "px-4", "py-2.5", "font-cairo"], [1, "px-4", "py-2.5", "text-right", "font-cairo"], [1, "px-4", "py-2.5", "text-center", "font-cairo"], [1, "divide-y", "divide-slate-800/30"], [1, "hover:bg-slate-900/20", "text-slate-300"], [1, "px-4", "py-2.5", "font-semibold", "text-white", "font-cairo"], [1, "px-4", "py-2.5", "text-slate-400", "max-w-xs", "truncate", "font-cairo"], [1, "px-4", "py-2.5", "text-right", "font-mono", "font-bold", "text-amber-400"], [1, "px-4", "py-2.5", "font-mono", "text-[10px]", "text-amber-500"], [1, "px-4", "py-2.5", "text-center"], [1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-lg", "bg-emerald-600/10", "hover:bg-emerald-600/20", "text-emerald-400", "border", "border-emerald-500/20", "text-[11px]", "font-bold", "cursor-pointer", "font-cairo", "transition-all", 3, "click"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "w-3.5", "h-3.5"], ["d", "M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.135-1.348a9.91 9.91 0 004.877 1.28h.005c5.505 0 9.989-4.478 9.99-9.984A10.02 10.02 0 0012.012 2zm5.772 14.184c-.237.669-1.38 1.282-1.9 1.373-.464.082-.9.18-2.95-.624-2.617-1.026-4.304-3.69-4.437-3.868-.131-.177-1.07-1.428-1.07-2.723 0-1.294.673-1.927.915-2.186.242-.259.525-.324.7-.324h.5c.137 0 .323-.05.503.39.186.455.637 1.558.694 1.672.057.114.095.247.02.4-.075.153-.114.248-.228.381l-.224.238c-.114.133-.243.278-.104.516.14.238.622 1.025 1.332 1.657.914.814 1.684 1.066 1.922 1.185.238.12.377.101.517-.06.14-.16.602-.703.763-.94.161-.238.322-.2.54-.12.217.08 1.38.653 1.618.772.238.12.398.18.458.283.06.103.06.598-.178 1.267z"], ["colspan", "5", 1, "px-4", "py-8", "text-center", "text-slate-500", "font-cairo"], [1, "px-4", "py-2.5", "text-right", "font-mono", "text-slate-400"], [1, "px-4", "py-2.5", "text-right", "font-mono", "font-bold", "text-emerald-400"], [1, "inline-flex", "items-center", "gap-1", "px-3", "py-1.5", "rounded-lg", "bg-orange-500/10", "hover:bg-orange-500/20", "text-orange-400", "border", "border-orange-500/20", "text-[11px]", "font-bold", "cursor-pointer", "font-cairo", "transition-all", 3, "click"], ["colspan", "6", 1, "px-4", "py-8", "text-center", "text-slate-500", "font-cairo"], [1, "px-4", "py-2.5"], [1, "w-full", "max-w-xs", "bg-slate-950", "border", "border-slate-700", "rounded-lg", "px-2.5", "py-1.5", "text-xs", "text-slate-300", "focus:outline-none", "focus:ring-1", "focus:ring-indigo-500", "font-cairo", 3, "ngModelChange", "ngModel"], ["disabled", "", "selected", "", 3, "value"], [3, "value", "disabled"], [1, "inline-flex", "items-center", "gap-1", "px-3", "py-1.5", "rounded-lg", "bg-emerald-600/10", "hover:bg-emerald-600/20", "text-emerald-400", "border", "border-emerald-500/20", "text-[11px]", "font-bold", "cursor-pointer", "font-cairo", "transition-all", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-emerald-400", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-sm", "font-bold", "text-emerald-300", "font-cairo"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-rose-400", "shrink-0"], [1, "text-sm", "font-bold", "text-rose-300", "font-cairo"], [1, "px-5", "py-3", "border-b", "border-slate-800/60", "bg-slate-900/40"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"], [1, "bg-slate-900/60", "border-b", "border-slate-800/60"], [1, "text-[11px]", "font-bold", "text-slate-400", "uppercase", "tracking-wider"], [1, "px-4", "py-3", "font-cairo"], [1, "px-4", "py-3", "text-right", "font-cairo"], [1, "px-4", "py-3", "text-center", "font-cairo"], [1, "divide-y", "divide-slate-800/40"], [1, "hover:bg-slate-900/30", "transition-colors", 3, "bg-rose-950/10"], [1, "hover:bg-slate-900/30", "transition-colors"], [1, "px-4", "py-3", "font-semibold", "text-slate-200", "font-cairo"], [1, "px-4", "py-3", "text-right", "font-mono", "text-amber-300"], [1, "px-4", "py-3", "text-right", "font-mono", "text-emerald-400"], [1, "px-4", "py-3", "text-right", "font-mono", "text-cyan-400"], [1, "px-4", "py-3", "text-right", "font-mono", "font-bold"], [1, "px-4", "py-3", "text-center"], [1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "bg-emerald-500/10", "text-emerald-400", "border", "border-emerald-500/20", "font-cairo"], [1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "bg-rose-500/10", "text-rose-400", "border", "border-rose-500/20", "font-cairo"], [1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "bg-blue-500/10", "text-blue-400", "border", "border-blue-500/20", "font-cairo"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-12", "h-12", "mx-auto", "mb-3", "opacity-30"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1", "d", "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], [1, "text-sm", "font-cairo"], [1, "flex", "items-center", "justify-between", "border-b", "border-slate-800/80", "pb-4"], [1, "text-base", "font-bold", "text-white", "font-cairo"], [1, "text-xs", "text-slate-500", "mt-1", "font-cairo"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "bg-indigo-600", "hover:bg-indigo-700", "disabled:opacity-50", "text-xs", "font-semibold", "rounded-xl", "text-white", "shadow-lg", "transition-all", "duration-150", "hover:scale-[1.02]", "active:scale-95", "cursor-pointer", "font-cairo", 3, "click", "disabled"], ["type", "file", "accept", "image/*", 1, "hidden", 3, "change"], [1, "flex", "justify-center", "py-16"], [1, "grid", "grid-cols-2", "sm:grid-cols-3", "lg:grid-cols-4", "gap-4"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-6", "w-6", "text-indigo-500"], [1, "group", "relative", "aspect-video", "rounded-xl", "overflow-hidden", "border", "border-slate-800", "bg-slate-950", "shadow-md", "flex", "items-center", "justify-center", "cursor-pointer"], [1, "col-span-2", "sm:col-span-3", "lg:col-span-4", "py-16", "text-center", "text-slate-500", "text-sm", "font-cairo"], [1, "group", "relative", "aspect-video", "rounded-xl", "overflow-hidden", "border", "border-slate-800", "bg-slate-950", "shadow-md", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], ["alt", "", 1, "w-full", "h-full", "object-cover", "group-hover:scale-110", "transition-transform", 3, "error", "src"], [1, "absolute", "inset-0", "bg-black/40", "opacity-0", "group-hover:opacity-100", "transition-opacity", "flex", "items-center", "justify-center"], [1, "px-2.5", "py-1", "bg-slate-950/80", "backdrop-blur-md", "rounded-lg", "text-[11px]", "font-bold", "text-white", "font-cairo", "flex", "items-center", "gap-1"], [1, "hidden", "flex-col", "items-center", "justify-center", "p-3", "text-slate-600", "font-cairo", "text-xs", "gap-1.5", "w-full", "h-full", "bg-slate-950/80"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-6", "w-6", "text-slate-600", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"], [1, "text-[11px]", "text-slate-500", "font-cairo"], ["type", "button", 1, "absolute", "top-2", "right-2", "rtl:left-2", "rtl:right-auto", "p-1.5", "rounded-lg", "bg-rose-500/90", "hover:bg-rose-600", "text-white", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-150", "cursor-pointer", "shadow-lg", "z-20"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-black/80", "via-transparent", "to-transparent", "opacity-0", "group-hover:opacity-100", "transition-opacity", "duration-200", "p-3", "flex", "flex-col", "justify-end"], [1, "text-[10px]", "text-slate-300", "font-mono"], [1, "text-[10px]", "text-slate-400", "truncate", "mt-0.5"], ["type", "button", 1, "absolute", "top-2", "right-2", "rtl:left-2", "rtl:right-auto", "p-1.5", "rounded-lg", "bg-rose-500/90", "hover:bg-rose-600", "text-white", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-150", "cursor-pointer", "shadow-lg", "z-20", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], [1, "px-6", "py-4", "border-b", "border-slate-800/80", "flex", "items-center", "justify-between"], [1, "text-base", "font-bold", "text-white"], [1, "px-3.5", "py-1.5", "bg-indigo-600", "hover:bg-indigo-700", "text-xs", "font-semibold", "rounded-xl", "text-white", "shadow-lg", "transition-all", "duration-150", "hover:scale-[1.02]", "active:scale-95", "cursor-pointer", "font-cairo", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:bg-slate-800", "disabled:text-slate-500", "disabled:hover:scale-100", "disabled:active:scale-100", "disabled:pointer-events-none", 3, "disabled"], [1, "text-xs", "text-slate-500", "font-semibold"], [1, "flex", "justify-center", "py-12"], [1, "w-full", "overflow-x-auto", "block", "font-sans"], [1, "px-3.5", "py-1.5", "bg-indigo-600", "hover:bg-indigo-700", "text-xs", "font-semibold", "rounded-xl", "text-white", "shadow-lg", "transition-all", "duration-150", "hover:scale-[1.02]", "active:scale-95", "cursor-pointer", "font-cairo", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:bg-slate-800", "disabled:text-slate-500", "disabled:hover:scale-100", "disabled:active:scale-100", "disabled:pointer-events-none", 3, "click", "disabled"], [1, "w-full", "text-left", "rtl:text-right", "min-w-[800px]"], [1, "border-b", "border-slate-800", "text-slate-500", "text-xs", "font-bold", "uppercase", "tracking-wide"], [1, "px-6", "py-4"], [1, "px-6", "py-4", "text-center"], [1, "divide-y", "divide-slate-800/60", "text-sm"], [1, "hover:bg-slate-900/30", "transition-colors", "duration-150", "text-slate-300"], [1, "px-6", "py-4", "font-semibold", "text-white"], [1, "px-6", "py-4", "text-slate-400", "max-w-[220px]", "lg:max-w-[320px]", "truncate", "cursor-pointer", "hover:text-sky-400", "transition-colors", 3, "click", "title"], [1, "px-6", "py-4", "text-slate-400"], [1, "px-6", "py-4", "font-mono", "font-bold", "text-amber-400"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "tracking-wider", "uppercase", "bg-emerald-500/10", "text-emerald-400"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "tracking-wider", "uppercase", "bg-amber-500/10", "text-amber-400"], [1, "flex", "items-center", "justify-center", "gap-2"], [1, "px-3", "py-1.5", "bg-indigo-600", "hover:bg-indigo-700", "text-xs", "font-semibold", "rounded-lg", "text-white", "shadow-md", "shadow-indigo-600/10", "transition-all", "duration-150", "hover:scale-105", "active:scale-95", "cursor-pointer", "font-cairo", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:bg-slate-800", "disabled:text-slate-500", "disabled:hover:scale-100", "disabled:active:scale-100", "disabled:pointer-events-none", 3, "disabled"], [1, "px-2.5", "py-1.5", "bg-emerald-600/80", "hover:bg-emerald-700", "text-xs", "font-semibold", "rounded-lg", "text-white", "shadow-md", "transition-all", "duration-150", "hover:scale-105", "active:scale-95", "cursor-pointer", "flex", "items-center", "gap-1", "font-cairo"], [1, "px-3", "py-1.5", "bg-indigo-600", "hover:bg-indigo-700", "text-xs", "font-semibold", "rounded-lg", "text-white", "shadow-md", "shadow-indigo-600/10", "transition-all", "duration-150", "hover:scale-105", "active:scale-95", "cursor-pointer", "font-cairo", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:bg-slate-800", "disabled:text-slate-500", "disabled:hover:scale-100", "disabled:active:scale-100", "disabled:pointer-events-none", 3, "click", "disabled"], [1, "px-2.5", "py-1.5", "bg-emerald-600/80", "hover:bg-emerald-700", "text-xs", "font-semibold", "rounded-lg", "text-white", "shadow-md", "transition-all", "duration-150", "hover:scale-105", "active:scale-95", "cursor-pointer", "flex", "items-center", "gap-1", "font-cairo", 3, "click"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "w-3", "h-3"], ["target", "_blank", "title", "View Receipt", 1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-1", "text-xs", "font-semibold", "rounded-lg", "bg-indigo-500/10", "hover:bg-indigo-500/25", "text-indigo-400", "border", "border-indigo-500/20", "transition-all", "cursor-pointer", "font-cairo", "shadow-sm", 3, "href"], ["title", "Payment Method", 1, "px-2", "py-0.5", "rounded", "text-[10px]", "uppercase", "font-bold", "tracking-wider", "bg-slate-800", "text-slate-300"], ["title", "Expense Date", 1, "px-2", "py-0.5", "rounded", "text-[10px]", "uppercase", "font-bold", "tracking-wider", "bg-slate-800", "text-slate-400"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"], [1, "inline-flex", "items-center", "gap-1", "text-slate-500", "text-xs", "font-semibold", "px-2", "py-1", "bg-slate-950/40", "border", "border-slate-800", "rounded-lg", "select-none"], [1, "flex", "items-center", "justify-center", "gap-2", "flex-wrap"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5", "text-slate-500"], [1, "flex", "items-center", "gap-1.5", "bg-slate-950/40", "border", "border-slate-800/80", "p-1.5", "rounded-xl"], ["title", "Edit pending request", 1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1.5", "rounded-lg", "text-[11px]", "font-bold", "bg-amber-500/10", "text-amber-400", "border", "border-amber-500/20", "hover:bg-amber-500/20", "hover:text-amber-300", "transition-all", "duration-150", "cursor-pointer", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:bg-slate-800/10", "disabled:text-slate-500", "disabled:border-slate-800/20", "disabled:pointer-events-none", 3, "click", "disabled"], ["title", "Delete voucher and restore pool balance", 1, "inline-flex", "items-center", "gap-1", "px-2", "py-1.5", "rounded-lg", "text-[11px]", "font-bold", "bg-rose-500/10", "text-rose-400", "border", "border-rose-500/20", "hover:bg-rose-500/20", "hover:text-rose-300", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-all", "duration-150", "cursor-pointer", 3, "click", "disabled"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], [1, "bg-slate-900", "border", "border-slate-700/80", "rounded-lg", "px-2", "py-1", "text-[11px]", "text-slate-300", "focus:outline-none", "focus:ring-1", "focus:ring-emerald-500", "font-cairo", 3, "ngModelChange", "ngModel"], ["title", "Approve and disburse", 1, "px-2.5", "py-1", "rounded-lg", "text-[11px]", "font-bold", "bg-emerald-500/10", "text-emerald-400", "border", "border-emerald-500/20", "hover:bg-emerald-500/20", "hover:text-emerald-300", "transition-all", "duration-150", "cursor-pointer", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"], ["title", "Reject request", 1, "px-2.5", "py-1", "rounded-lg", "text-[11px]", "font-bold", "bg-rose-500/10", "text-rose-400", "border", "border-rose-500/20", "hover:bg-rose-500/20", "hover:text-rose-300", "transition-all", "duration-150", "cursor-pointer", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"], ["colspan", "6", 1, "px-6", "py-14", "text-center", "text-slate-500", "text-sm"], [1, "text-xs", "text-slate-500", "font-semibold", "font-cairo"], [1, "w-full", "text-left", "rtl:text-right", "min-w-[900px]"], [1, "px-6", "py-4", "font-cairo"], [1, "px-6", "py-4", "text-center", "font-cairo"], [1, "font-semibold", "text-white"], [1, "text-xs", "text-slate-500", "max-w-xs", "truncate"], [1, "px-6", "py-4", "font-mono", "font-bold", "text-slate-400"], [1, "px-6", "py-4", "font-mono", "font-bold"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "uppercase", "bg-slate-500/20", "text-slate-400"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "uppercase", "bg-emerald-500/10", "text-emerald-400"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "uppercase", "bg-orange-500/10", "text-orange-400"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "uppercase", "bg-cyan-500/10", "text-cyan-400"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "uppercase", "bg-rose-500/10", "text-rose-400"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "uppercase", "bg-amber-500/10", "text-amber-400"], [1, "px-6", "py-4", "text-slate-400", "text-xs"], [1, "px-2.5", "py-1", "bg-orange-500", "hover:bg-orange-600", "text-xs", "font-semibold", "rounded-lg", "text-white", "font-cairo", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:bg-slate-800", "disabled:text-slate-500", "disabled:pointer-events-none", 3, "disabled"], [1, "px-2.5", "py-1", "bg-slate-800", "hover:bg-slate-700", "text-xs", "font-semibold", "rounded-lg", "text-slate-300", "hover:text-white", "border", "border-slate-700", "transition-all", "font-cairo", "flex", "items-center", "gap-1", "active:scale-95", "cursor-pointer", 3, "click"], [1, "bg-slate-950/30"], [1, "bg-slate-950/20"], ["colspan", "7", 1, "px-6", "py-3", "border-b", "border-slate-800/40"], [1, "text-xs", "font-bold", "text-slate-400", "mb-2", "font-cairo"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-3"], [1, "bg-slate-900/50", "border", "border-slate-800/50", "rounded-xl", "p-3", "flex", "justify-between", "items-center"], [1, "px-2.5", "py-1", "bg-emerald-600", "hover:bg-emerald-700", "text-xs", "font-semibold", "rounded-lg", "text-white", "font-cairo", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:bg-slate-800", "disabled:text-slate-500", "disabled:pointer-events-none", 3, "click", "disabled"], [1, "px-2.5", "py-1", "bg-rose-600", "hover:bg-rose-700", "text-xs", "font-semibold", "rounded-lg", "text-white", "font-cairo", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:bg-slate-800", "disabled:text-slate-500", "disabled:pointer-events-none", 3, "click", "disabled"], [1, "px-2.5", "py-1", "bg-orange-500", "hover:bg-orange-600", "text-xs", "font-semibold", "rounded-lg", "text-white", "font-cairo", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:bg-slate-800", "disabled:text-slate-500", "disabled:pointer-events-none", 3, "click", "disabled"], ["colspan", "7", 1, "px-6", "py-2.5", "border-b", "border-slate-800/30"], [1, "flex", "items-center", "gap-2.5"], [1, "flex", "items-center", "justify-center", "w-6", "h-6", "rounded-full", "bg-rose-500/15", "shrink-0"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5", "text-rose-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"], [1, "text-[11px]", "font-bold", "text-rose-300", "font-cairo"], [1, "text-[10px]", "text-rose-400/70", "font-cairo", "mr-2", "rtl:mr-0", "rtl:ml-2"], [1, "flex", "items-center", "justify-center", "w-6", "h-6", "rounded-full", "bg-orange-500/15", "shrink-0"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5", "text-orange-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-[11px]", "font-bold", "text-orange-300", "font-cairo"], [1, "text-[10px]", "text-orange-400/70", "font-cairo", "mr-2", "rtl:mr-0", "rtl:ml-2"], [1, "flex", "items-center", "justify-center", "w-6", "h-6", "rounded-full", "bg-cyan-500/15", "shrink-0"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5", "text-cyan-400"], [1, "text-[11px]", "font-bold", "text-cyan-300", "font-cairo"], [1, "text-[10px]", "text-cyan-400/70", "font-cairo", "mr-2", "rtl:mr-0", "rtl:ml-2"], [1, "flex", "items-center", "justify-center", "w-6", "h-6", "rounded-full", "bg-emerald-500/15", "shrink-0"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5", "text-emerald-400"], [1, "text-[11px]", "font-bold", "text-emerald-300", "font-cairo"], [1, "px-1.5", "py-0.5", "rounded", "text-[9px]", "font-bold", "bg-slate-800", "text-slate-300", "font-cairo"], [1, "text-xs", "text-white", "mt-1", "font-semibold"], [1, "text-right"], [1, "text-xs", "font-bold", "text-amber-400", "font-mono"], ["target", "_blank", 1, "text-[10px]", "text-indigo-400", "hover:underline", "font-cairo", "mt-1", "block", 3, "href"], ["colspan", "7", 1, "px-6", "py-14", "text-center", "text-slate-500", "text-sm", "font-cairo"], [1, "px-3.5", "py-1.5", "bg-emerald-600", "hover:bg-emerald-700", "text-xs", "font-semibold", "rounded-xl", "text-white", "shadow-lg", "transition-all", "duration-150", "hover:scale-[1.02]", "active:scale-95", "cursor-pointer", "font-cairo", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:bg-slate-800", "disabled:text-slate-500", "disabled:hover:scale-100", "disabled:active:scale-100", "disabled:pointer-events-none", 3, "disabled"], [1, "px-3.5", "py-1.5", "bg-emerald-600", "hover:bg-emerald-700", "text-xs", "font-semibold", "rounded-xl", "text-white", "shadow-lg", "transition-all", "duration-150", "hover:scale-[1.02]", "active:scale-95", "cursor-pointer", "font-cairo", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:bg-slate-800", "disabled:text-slate-500", "disabled:hover:scale-100", "disabled:active:scale-100", "disabled:pointer-events-none", 3, "click", "disabled"], [1, "text-[10px]", "text-slate-500", "mt-1"], [1, "px-2", "py-1", "rounded", "text-[10px]", "uppercase", "font-bold", "tracking-wider", "bg-slate-800", "text-slate-300"], [1, "text-xs", "text-slate-600"], [1, "px-6", "py-4", "font-medium", "text-white", "max-w-[220px]", "lg:max-w-[320px]", "truncate", "cursor-pointer", "hover:text-sky-400", "transition-colors", 3, "click", "title"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "tracking-wider", "uppercase", "bg-rose-500/10", "text-rose-400"], [1, "flex", "items-center", "justify-center", "gap-1.5"], ["title", "Edit transaction", 1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1.5", "rounded-lg", "text-[11px]", "font-bold", "bg-amber-500/10", "text-amber-400", "border", "border-amber-500/20", "hover:bg-amber-500/20", "hover:text-amber-300", "transition-all", "duration-150", "cursor-pointer", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:bg-slate-800/10", "disabled:text-slate-500", "disabled:border-slate-800/20", "disabled:pointer-events-none", 3, "click", "disabled"], ["title", "Delete transaction and roll back pool", 1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1.5", "rounded-lg", "text-[11px]", "font-bold", "bg-rose-500/10", "text-rose-400", "border", "border-rose-500/20", "hover:bg-rose-500/20", "hover:text-rose-300", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-all", "duration-150", "cursor-pointer", 3, "click", "disabled"], ["colspan", "4", 1, "px-6", "py-14", "text-center", "text-slate-500", "text-sm"], [1, "bg-slate-900/25", "border", "border-slate-800/80", "rounded-2xl", "p-6", "shadow-xl", "space-y-5"], [1, "text-lg", "font-bold", "text-white", "font-cairo"], [1, "space-y-5", "overflow-y-auto", "min-h-0", "pr-1", "flex-1", 3, "ngSubmit", "formGroup"], [1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], [1, "w-full", "h-36", "sm:h-44", "bg-slate-800", "rounded-xl", "relative", "overflow-hidden", "group", "border", "border-slate-700"], ["alt", "Banner", 1, "w-full", "h-full", "object-cover", 3, "src"], [1, "w-full", "h-full", "bg-gradient-to-br", "from-slate-800", "via-slate-900", "to-indigo-950", "flex", "items-center", "justify-center"], ["type", "button", 1, "absolute", "inset-0", "bg-slate-950/60", "flex", "items-center", "justify-center", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-2", "text-white", "text-xs", "font-bold", "font-cairo", "bg-slate-900/80", "px-4", "py-2", "rounded-xl", "border", "border-slate-700", "backdrop-blur-sm"], [1, "flex", "items-end", "gap-4"], [1, "w-24", "h-24", "rounded-full", "border-4", "border-slate-900", "bg-slate-800", "flex", "items-center", "justify-center", "overflow-hidden", "relative", "group", "shadow-xl", "shrink-0"], ["alt", "Logo", 1, "w-full", "h-full", "object-cover", 3, "src"], [1, "text-3xl", "font-extrabold", "text-slate-600", "select-none"], ["type", "button", 1, "absolute", "inset-0", "rounded-full", "bg-slate-950/60", "flex", "items-center", "justify-center", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300", "cursor-pointer", 3, "click"], [1, "text-white", "text-[10px]", "font-bold", "text-center"], [1, "flex-1", "space-y-4"], ["for", "prof-name", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "prof-name", "type", "text", "formControlName", "name", "placeholder", "Company Name", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-5"], ["for", "prof-region", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "prof-region", "type", "text", "formControlName", "region", "placeholder", "e.g. Cairo, Riyadh", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], ["for", "prof-desc", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "prof-desc", "formControlName", "companyDescription", "rows", "3", "placeholder", "Write a brief overview...", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "resize-none"], [1, "flex", "justify-end", "pt-2"], ["type", "submit", 1, "px-6", "py-2.5", "text-sm", "font-semibold", "rounded-xl", "text-white", "bg-indigo-600", "hover:bg-indigo-700", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "duration-200", "hover:scale-105", "active:scale-95", "cursor-pointer", "font-cairo", "font-bold", 3, "disabled"], [1, "bg-slate-900/25", "border", "border-slate-800/80", "rounded-2xl", "p-6", "shadow-xl", "space-y-4"], [1, "text-xs", "text-slate-400", "font-cairo"], [1, "space-y-4", "overflow-y-auto", "min-h-0", "pr-1", "flex-1", 3, "ngSubmit", "formGroup"], [1, "flex", "items-center", "justify-between", "p-4", "bg-slate-950", "rounded-xl", "border", "border-slate-800"], [1, "space-y-0.5"], [1, "text-sm", "font-bold", "text-slate-200", "font-cairo"], [1, "text-xs", "text-slate-500", "font-cairo"], [1, "flex", "items-center"], ["type", "checkbox", "id", "is-public-portfolio", "formControlName", "isPublicPortfolio", 1, "w-5", "h-5", "text-indigo-600", "border-slate-700", "bg-slate-950", "rounded", "focus:ring-indigo-500", "focus:ring-2", "focus:ring-offset-slate-900", "cursor-pointer"], [1, "text-xs", "text-slate-500"], [1, "absolute", "inset-0"], [1, "relative", "w-full", "max-w-lg", "mx-auto", "max-h-[92vh]", "flex", "flex-col", "rounded-2xl", "bg-slate-900", "border", "border-slate-700/60", "p-4", "sm:p-6", "shadow-2xl", "transition-all", "z-10"], [1, "flex", "items-start", "justify-between", "mb-2"], [1, "text-xl", "font-bold", "text-white"], [1, "text-xs", "text-slate-400", "mt-1"], [1, "p-1.5", "rounded-lg", "text-slate-500", "hover:text-white", "hover:bg-slate-800", "transition-colors", "duration-150", "cursor-pointer", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "my-5", "p-4", "rounded-xl", "bg-slate-950/60", "border", "border-slate-800", "text-xs", "text-slate-300", "space-y-2"], [1, "mb-4", "rounded-xl", "bg-red-500/10", "border", "border-red-500/30", "p-4", "text-xs", "text-red-400", "space-y-1"], ["for", "spentAmount", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5"], [1, "text-red-400"], ["id", "spentAmount", "type", "number", "formControlName", "spentAmount", "step", "0.01", "min", "0", "placeholder", "0.00", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], [1, "text-xs", "text-red-400", "mt-1", "block"], ["for", "receiptDescription", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5"], ["id", "receiptDescription", "formControlName", "receiptDescription", "rows", "3", "placeholder", "\u0645\u062B\u0627\u0644: \u0634\u0631\u0627\u0621 \u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0644\u0644\u0645\u0648\u0642\u0639\u060C \u062D\u0648\u0627\u0641\u0632 \u0639\u0645\u0627\u0644\u060C \u0641\u0648\u0627\u062A\u064A\u0631 \u0646\u0642\u0644...", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "resize-none"], ["for", "expenseDate", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5"], ["id", "expenseDate", "type", "text", "placeholder", "DD/MM/YYYY", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "font-mono", "pr-10", 3, "input", "value"], ["type", "date", 1, "sr-only", "opacity-0", "absolute", "inset-0", "w-full", "h-full", "cursor-pointer", "z-10", 2, "clip", "rect(0,0,0,0)", 3, "change", "value"], ["type", "button", 1, "absolute", "inset-y-0", "right-0", "pr-3", "flex", "items-center", "text-slate-400", "hover:text-white", "transition-colors", "cursor-pointer", "z-20", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"], ["for", "settlementPaymentMethod", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5"], ["id", "settlementPaymentMethod", "formControlName", "settlementPaymentMethod", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], ["disabled", "", 3, "ngValue"], ["value", "Cash"], ["value", "InstaPay"], ["value", "BankTransfer"], ["value", "Cheque"], [1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5"], ["type", "file", "accept", "image/*,application/pdf", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "file:mr-4", "file:py-2", "file:px-4", "file:rounded-full", "file:border-0", "file:text-sm", "file:font-semibold", "file:bg-indigo-500/10", "file:text-indigo-400", "hover:file:bg-indigo-500/20", "cursor-pointer", 3, "change"], [1, "text-xs", "text-indigo-400", "mt-1", "flex", "items-center", "gap-2"], [1, "flex", "justify-end", "gap-3", "pt-4"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-slate-400", "hover:text-white", "bg-slate-950", "hover:bg-slate-800", "border", "border-slate-800", "transition-all", "duration-200", "cursor-pointer", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-white", "bg-indigo-600", "hover:bg-indigo-700", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "duration-200", "hover:scale-105", "active:scale-95", "cursor-pointer", 3, "disabled"], [1, "flex", "justify-between"], [1, "font-semibold"], [1, "font-bold", "text-amber-400", "font-mono"], [1, "font-semibold", "text-right", "max-w-[180px]", "truncate"], [1, "font-bold", "block", "mb-1"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-3", "w-3"], ["for", "req-amount", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5"], ["id", "req-amount", "type", "number", "formControlName", "amount", "step", "0.01", "min", "0.01", "placeholder", "0.00", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], [1, "text-xs", "text-red-400", "mt-1", "block", "font-cairo"], ["for", "req-reason", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5"], ["id", "req-reason", "formControlName", "reason", "rows", "3", "placeholder", "e.g. Scaffolding rental or site supplies purchase.", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "resize-none"], ["for", "req-source", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5"], ["id", "req-source", "formControlName", "sourcePoolId", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], [3, "value"], [1, "relative", "w-full", "max-w-lg", "mx-auto", "max-h-[92vh]", "flex", "flex-col", "rounded-2xl", "bg-slate-900", "border", "border-slate-700/60", "p-4", "sm:p-6", "shadow-2xl", "transition-all", "z-10", "!overflow-hidden", "box-border", "deposit-modal-container", "scrollbar-none", 2, "overflow", "hidden !important"], [1, "flex", "justify-between", "items-center", "mb-6", "shrink-0"], [1, "text-xl", "font-bold", "text-white", "font-cairo"], [1, "text-slate-400", "hover:text-white", "transition-colors", "cursor-pointer", 3, "click"], [1, "bg-rose-500/10", "border", "border-rose-500/20", "rounded-lg", "p-3", "mb-4", "shrink-0"], [1, "space-y-5", "font-sans", "!overflow-x-hidden", "!overflow-y-hidden", "deposit-modal-body", "min-h-0", "pr-1", "pb-2", "flex-1", "box-border", "scrollbar-none", 2, "overflow-x", "hidden !important", "overflow-y", "hidden !important", 3, "ngSubmit", "formGroup"], ["type", "number", "formControlName", "amount", "step", "0.01", "min", "0.01", "placeholder", "0.00", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "font-mono"], ["formControlName", "sourceType", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], ["value", "ClientDeposit"], ["value", "OwnerCapital"], ["value", "ExternalLoan"], [1, "grid", "grid-cols-2", "gap-4"], ["type", "text", "placeholder", "DD/MM/YYYY", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "font-mono", "pr-10", 3, "input", "value"], ["formControlName", "paymentMethod", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], ["formControlName", "description", "rows", "2", "placeholder", "e.g. Received check #12345 from Client", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "resize-none"], [1, "text-xs", "font-normal", "text-slate-500"], ["type", "file", "accept", "image/*", 1, "w-full", "text-slate-200", "text-sm", "file:mr-4", "file:py-2", "file:px-4", "file:rounded-xl", "file:border-0", "file:text-sm", "file:font-bold", "file:bg-slate-800", "file:text-indigo-400", "hover:file:bg-slate-700", "cursor-pointer", 3, "change"], [1, "flex", "justify-end", "gap-3", "pt-4", "pb-1", "mb-1"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-slate-400", "hover:text-white", "bg-slate-950", "hover:bg-slate-800", "border", "border-slate-800", "transition-all", "duration-200", "cursor-pointer", "font-cairo", "focus:outline-none", "focus:ring-0", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-white", "bg-indigo-600", "hover:bg-indigo-500", "active:bg-indigo-700", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-colors", "duration-200", "focus:outline-none", "focus:ring-0", "cursor-pointer", "font-cairo", "shadow-lg", "shadow-indigo-600/20", "box-border", 3, "disabled"], [1, "list-disc", "list-inside", "text-xs", "text-rose-400"], [1, "relative", "w-full", "max-w-lg", "mx-auto", "max-h-[92vh]", "flex", "flex-col", "rounded-2xl", "bg-slate-900", "border", "border-slate-700/60", "p-4", "sm:p-6", "shadow-2xl", "transition-all", "z-10", "animate-[scaleIn_0.15s_ease-out]"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "space-y-4", "font-sans", "overflow-y-auto", "min-h-0", "pr-1", "flex-1", 3, "ngSubmit", "formGroup"], ["type", "number", "formControlName", "amount", "step", "0.01", "min", "0.01", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:ring-2", "focus:ring-indigo-500/40"], ["formControlName", "category", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:ring-2", "focus:ring-indigo-500/40"], ["value", "Cement"], ["value", "Logistics"], ["value", "Materials"], ["value", "Labor"], ["value", "Other"], ["formControlName", "reason", "rows", "3", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "resize-none"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-slate-400", "bg-slate-950", "border", "border-slate-800", "font-cairo", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-white", "bg-indigo-600", "hover:bg-indigo-500", "font-cairo", 3, "disabled"], ["formControlName", "description", "rows", "3", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "resize-none"], ["type", "number", "formControlName", "newBudget", "step", "0.01", "min", "0.01", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:ring-2", "focus:ring-indigo-500/40"], ["formControlName", "reasonForChange", "rows", "3", "placeholder", "e.g. Scope revision or cost adjustment...", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "resize-none"], ["type", "file", "accept", ".pdf,.xlsx,.xls,image/*", 1, "w-full", "text-slate-200", "text-sm", "file:mr-4", "file:py-2", "file:px-4", "file:rounded-xl", "file:border-0", "file:text-sm", "file:font-bold", "file:bg-slate-800", "file:text-indigo-400", "hover:file:bg-slate-700", "cursor-pointer", 3, "change"], [1, "text-xs", "text-indigo-400", "mt-1", "flex", "items-center", "gap-2", "font-cairo"], [1, "mb-4", "p-3.5", "bg-rose-500/10", "border", "border-rose-500/20", "text-rose-400", "rounded-xl", "text-xs", "font-semibold"], [1, "text-slate-500", "text-[10px]", "normal-case"], ["formControlName", "userId", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:ring-2", "focus:ring-indigo-500/40"], [3, "ngValue"], ["formControlName", "paymentMethod", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:ring-2", "focus:ring-indigo-500/40"], ["formControlName", "sourcePoolId", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:ring-2", "focus:ring-indigo-500/40"], ["formControlName", "description", "rows", "2", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "resize-none"], ["type", "submit", 1, "px-5", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-white", "bg-emerald-600", "hover:bg-emerald-500", "disabled:opacity-50", "font-cairo", 3, "disabled"], [1, "absolute", "inset-0", 3, "click"], [1, "relative", "w-full", "max-w-3xl", "mx-auto", "max-h-[92vh]", "flex", "flex-col", "overflow-hidden", "rounded-2xl", "bg-slate-900", "border", "border-slate-700/60", "p-4", "sm:p-6", "shadow-2xl", "transition-all", "z-10", "animate-[scaleIn_0.15s_ease-out]"], [1, "text-xs", "text-slate-400", "font-cairo", "mt-1"], [1, "text-amber-400", "font-bold", "font-mono"], [1, "text-slate-200"], [1, "flex", "flex-col", "flex-1", "min-h-0", "space-y-4", "font-sans", 3, "formGroup"], [1, "flex-1", "overflow-y-auto", "min-h-0", "pr-1", "space-y-4"], [1, "flex", "justify-between", "items-center", "border-b", "border-slate-800", "pb-3"], [1, "text-sm", "text-slate-400", "font-cairo"], ["type", "button", 1, "px-3", "py-1", "bg-indigo-600/30", "hover:bg-indigo-600/50", "text-indigo-400", "border", "border-indigo-500/20", "text-xs", "font-bold", "rounded-lg", "font-cairo", "flex", "items-center", "gap-1", "cursor-pointer"], [1, "p-4", "rounded-2xl", "bg-emerald-950/20", "border", "border-emerald-500/30", "shadow-[0_0_20px_rgba(16,185,129,0.08)]", "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-3", "font-sans"], [1, "text-xs", "font-bold", "text-slate-400", "block", "font-cairo"], [1, "text-2xl", "font-black", "text-emerald-400", "font-mono", "tracking-wide", "mt-1", "block"], [1, "px-3", "py-1.5", "rounded-xl", "bg-emerald-500/10", "text-emerald-400", "border", "border-emerald-500/20", "text-xs", "font-semibold", "font-cairo", "self-start", "sm:self-center"], ["formArrayName", "lines", 1, "space-y-4"], [1, "p-5", "bg-slate-900/60", "border", "border-slate-800", "rounded-2xl", "space-y-4", "relative", "hover:border-slate-700/60", "focus-within:border-indigo-500/50", "focus-within:shadow-[0_0_15px_rgba(99,102,241,0.05)]", "transition-all", "duration-200", 3, "formGroupName"], [1, "p-4", "bg-slate-950", "border", "border-slate-850", "rounded-xl", "space-y-2"], [1, "flex", "justify-between", "text-xs", "text-slate-400", "font-cairo"], [1, "font-mono", "font-semibold", "text-slate-300"], [1, "font-mono", "font-semibold", "text-amber-400"], [1, "border-t", "border-slate-800/80", "pt-2", "flex", "justify-between", "text-sm", "font-bold", "font-cairo"], [1, "flex", "flex-col", "sm:flex-row", "justify-between", "items-center", "gap-3", "pt-4", "border-t", "border-slate-800"], ["type", "button", 1, "w-full", "sm:w-auto", "px-4", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-slate-400", "hover:text-white", "bg-slate-950", "hover:bg-slate-800", "border", "border-slate-800", "transition-all", "font-cairo", "cursor-pointer", 3, "click"], [1, "flex", "flex-col", "sm:flex-row", "items-center", "gap-3", "w-full", "sm:w-auto"], [1, "fixed", "inset-0", "z-[100]", "flex", "items-center", "justify-center", "p-4", "bg-black/90", "backdrop-blur-md"], ["type", "button", 1, "px-3", "py-1", "bg-indigo-600/30", "hover:bg-indigo-600/50", "text-indigo-400", "border", "border-indigo-500/20", "text-xs", "font-bold", "rounded-lg", "font-cairo", "flex", "items-center", "gap-1", "cursor-pointer", 3, "click"], [1, "flex", "justify-between", "items-center", "pb-2", "border-b", "border-slate-800/80"], [1, "text-xs", "font-bold", "text-indigo-400", "font-cairo", "bg-indigo-500/10", "px-2.5", "py-1", "rounded-lg"], [1, "block", "text-[11px]", "font-bold", "text-slate-400", "mb-1.5", "font-cairo"], ["formControlName", "category", 1, "w-full", "px-3", "py-2", "border", "border-slate-800", "bg-slate-950", "rounded-xl", "text-slate-200", "text-xs", "focus:ring-2", "focus:ring-indigo-500/30", "focus:border-indigo-500", "focus:outline-none", "transition-all"], ["type", "number", "formControlName", "amount", 1, "w-full", "px-3", "py-2", "border", "border-slate-800", "bg-slate-950", "rounded-xl", "text-slate-200", "text-xs", "font-mono", "focus:ring-2", "focus:ring-indigo-500/30", "focus:border-indigo-500", "focus:outline-none", "transition-all"], [1, "relative", "flex-1"], ["type", "file", "accept", "image/*,application/pdf,.xlsx,.xls", 1, "w-full", "text-slate-400", "text-[11px]", "file:mr-2", "file:py-1.5", "file:px-2.5", "file:rounded-xl", "file:border-0", "file:text-[10px]", "file:bg-slate-800", "file:text-indigo-400", "cursor-pointer", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "change", "disabled"], [1, "text-[10px]", "text-indigo-400", "animate-pulse", "mt-1", "block"], ["title", "View Full Receipt", 1, "relative", "w-12", "h-12", "rounded-xl", "overflow-hidden", "border", "border-slate-700", "bg-slate-950", "flex-shrink-0", "cursor-pointer", "hover:scale-105", "transition-transform", "group", "shadow-md"], ["type", "text", "formControlName", "description", "placeholder", "\u0627\u0644\u0648\u0635\u0641 \u0623\u0648 \u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629...", 1, "w-full", "px-3", "py-2", "border", "border-slate-800", "bg-slate-950", "rounded-xl", "text-slate-200", "text-xs", "focus:ring-2", "focus:ring-indigo-500/30", "focus:border-indigo-500", "focus:outline-none", "transition-all"], ["type", "button", "title", "\u062D\u0641\u0638 \u0647\u0630\u0627 \u0627\u0644\u0628\u0646\u062F \u0643\u0645\u0633\u0648\u062F\u0629 / Save this item draft", 1, "px-2.5", "py-1", "rounded-xl", "text-[10px]", "font-bold", "text-emerald-400", "bg-emerald-500/10", "border", "border-emerald-500/20", "hover:bg-emerald-500/20", "disabled:opacity-50", "transition-all", "font-cairo", "cursor-pointer", 3, "click", "disabled"], ["type", "button", "title", "Remove Item", 1, "text-slate-500", "hover:text-rose-400", "p-1.5", "hover:bg-rose-500/10", "rounded-xl", "transition-all", "cursor-pointer", 3, "click", "disabled"], ["title", "View Full Receipt", 1, "relative", "w-12", "h-12", "rounded-xl", "overflow-hidden", "border", "border-slate-700", "bg-slate-950", "flex-shrink-0", "cursor-pointer", "hover:scale-105", "transition-transform", "group", "shadow-md", 3, "click"], [1, "w-full", "h-full", "object-cover", 3, "src"], [1, "absolute", "inset-0", "bg-black/40", "opacity-0", "group-hover:opacity-100", "flex", "items-center", "justify-center", "transition-opacity"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"], [1, "text-emerald-400"], [1, "text-emerald-400", "font-mono"], [1, "text-rose-400"], [1, "text-rose-400", "font-mono"], [1, "text-slate-300"], [1, "text-slate-300", "font-mono"], ["type", "button", 1, "w-full", "sm:w-auto", "px-4", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-slate-300", "bg-slate-800", "hover:bg-slate-750", "border", "border-slate-700", "disabled:opacity-50", "transition-all", "font-cairo", "cursor-pointer", 3, "click", "disabled"], ["type", "button", 1, "w-full", "sm:w-auto", "px-5", "py-2", "text-sm", "font-bold", "rounded-xl", "text-white", "bg-emerald-600", "hover:bg-emerald-500", "shadow-[0_0_15px_rgba(16,185,129,0.2)]", "disabled:opacity-50", "transition-all", "font-cairo", "cursor-pointer", 3, "click", "disabled"], [1, "relative", "max-w-4xl", "max-h-[85vh]", "z-10"], [1, "absolute", "-top-12", "right-0", "text-white/80", "hover:text-white", "bg-slate-800/80", "hover:bg-slate-700/80", "p-2", "rounded-full", "cursor-pointer", "transition-colors", "shadow-lg", 3, "click"], [1, "max-w-full", "max-h-[80vh]", "rounded-2xl", "object-contain", "border", "border-slate-750", "shadow-2xl", 3, "src"], [1, "text-center", "border-b-2", "border-slate-900", "pb-4", "mb-6"], [1, "text-2xl", "font-extrabold", "font-cairo"], [1, "text-lg", "font-bold", "text-slate-600", "font-cairo", "mt-1"], [1, "grid", "grid-cols-2", "gap-4", "mb-6", "text-sm"], [1, "text-left", "rtl:text-right"], [1, "bg-slate-100", "p-4", "rounded-xl", "mb-6", "grid", "grid-cols-3", "gap-4", "text-center", "border", "border-slate-300"], [1, "text-xs", "text-slate-500", "font-semibold", "block"], [1, "text-lg", "font-bold", "font-mono"], [1, "text-lg", "font-bold", "font-mono", "text-amber-600"], [1, "mb-6"], [1, "text-base", "font-bold", "mb-3", "font-cairo"], [1, "w-full", "text-right", "border-collapse", "text-sm"], [1, "border-b-2", "border-slate-300", "text-slate-700", "font-bold"], [1, "py-2", "px-2"], [1, "py-2", "px-2", "text-left", "rtl:text-right"], [1, "divide-y", "divide-slate-200"], [1, "text-slate-800"], [1, "mt-12", "flex", "justify-between", "items-center", "text-xs", "text-slate-400", "border-t", "border-slate-200", "pt-6"], [1, "text-center", "p-3", "border", "border-slate-300", "rounded-xl", "bg-slate-50", "min-w-[120px]", "text-slate-700", "font-semibold", "font-mono"], [1, "py-2", "px-2", "font-medium"], [1, "py-2", "px-2", "text-slate-600"], [1, "py-2", "px-2", "text-left", "rtl:text-right", "font-mono", "font-semibold"], [1, "p-1", "bg-emerald-700", "rounded-lg", "text-white", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "3", "d", "M5 13l4 4L19 7"], [1, "relative", "w-full", "max-w-lg", "mx-auto", "max-h-[92vh]", "flex", "flex-col", "rounded-2xl", "bg-slate-900", "border", "border-slate-700/80", "p-5", "sm:p-6", "shadow-2xl", "z-10", "transition-all"], [1, "flex", "items-center", "justify-between", "pb-3", "mb-4", "border-b", "border-slate-800"], [1, "p-2", "rounded-xl", "bg-sky-500/10", "text-sky-400", "border", "border-sky-500/20", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-xs", "text-slate-400", "font-cairo", "mt-0.5"], [1, "p-1.5", "text-slate-400", "hover:text-white", "rounded-lg", "hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "overflow-y-auto", "min-h-0", "pr-1", "space-y-3", "text-slate-200", "text-sm", "leading-relaxed", "whitespace-pre-wrap", "font-cairo", "bg-slate-950/60", "p-4", "rounded-xl", "border", "border-slate-800/80", "selection:bg-sky-500/30", "selection:text-sky-200"], [1, "mt-4", "pt-3", "border-t", "border-slate-800", "flex", "justify-end"], [1, "px-4", "py-2", "text-xs", "font-bold", "text-slate-300", "hover:text-white", "bg-slate-800", "hover:bg-slate-700", "rounded-xl", "transition-colors", "cursor-pointer", "font-cairo", 3, "click"], [1, "absolute", "inset-0", "z-0", 3, "click"], [1, "absolute", "top-4", "right-4", "z-20", "p-2.5", "rounded-full", "bg-slate-900/80", "border", "border-white/20", "text-white", "hover:bg-slate-800", "transition-all", "cursor-pointer", "shadow-2xl", 3, "click"], [1, "absolute", "top-4", "left-4", "z-20", "px-3.5", "py-1.5", "rounded-xl", "bg-slate-900/80", "border", "border-white/20", "text-white", "text-xs", "font-mono", "font-bold", "shadow-xl", "flex", "items-center", "gap-2", "font-cairo"], [1, "relative", "z-10", "max-w-5xl", "max-h-[85vh]", "flex", "items-center", "justify-center", "p-2"], ["alt", "Site Photo Full View", 1, "max-w-full", "max-h-[85vh]", "object-contain", "rounded-2xl", "shadow-2xl", "border", "border-slate-800", "transition-all", "duration-200", 3, "error", "src"], [1, "absolute", "left-4", "sm:left-8", "z-20", "p-3", "rounded-full", "bg-slate-900/80", "border", "border-white/20", "text-white", "hover:bg-indigo-600", "transition-all", "cursor-pointer", "shadow-2xl", "hover:scale-110", "active:scale-95", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-6", "h-6", "rtl:rotate-180"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M15 19l-7-7 7-7"], [1, "absolute", "right-4", "sm:right-8", "z-20", "p-3", "rounded-full", "bg-slate-900/80", "border", "border-white/20", "text-white", "hover:bg-indigo-600", "transition-all", "cursor-pointer", "shadow-2xl", "hover:scale-110", "active:scale-95", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M9 5l7 7-7 7"]], template: function ProjectDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 6)(1, "div", 7);
      \u0275\u0275conditionalCreate(2, ProjectDetailsComponent_Conditional_2_Template, 24, 34);
      \u0275\u0275elementStart(3, "div", 8)(4, "span", 9);
      \u0275\u0275text(5);
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "h3", 10);
      \u0275\u0275text(8);
      \u0275\u0275pipe(9, "number");
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 11)(12, "div", 12)(13, "div", 13)(14, "a", 14);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(15, "svg", 15);
      \u0275\u0275element(16, "path", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(17, "div", 17)(18, "div", 18)(19, "h1", 19);
      \u0275\u0275conditionalCreate(20, ProjectDetailsComponent_Conditional_20_Template, 1, 1)(21, ProjectDetailsComponent_Conditional_21_Template, 3, 3, "span", 20)(22, ProjectDetailsComponent_Conditional_22_Template, 3, 3, "span", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(23, ProjectDetailsComponent_Conditional_23_Template, 2, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(24, ProjectDetailsComponent_Conditional_24_Template, 3, 2, "div", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(25, ProjectDetailsComponent_Conditional_25_Template, 15, 10, "div", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(26, ProjectDetailsComponent_Conditional_26_Template, 15, 14, "div", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(27, ProjectDetailsComponent_Conditional_27_Template, 9, 15, "div", 24);
      \u0275\u0275conditionalCreate(28, ProjectDetailsComponent_Conditional_28_Template, 18, 2, "div", 25);
      \u0275\u0275elementStart(29, "div", 26)(30, "label", 27);
      \u0275\u0275text(31, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0633\u0645");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div", 28)(33, "select", 29);
      \u0275\u0275listener("change", function ProjectDetailsComponent_Template_select_change_33_listener($event) {
        return ctx.activeTab.set($event.target.value);
      });
      \u0275\u0275elementStart(34, "option", 30);
      \u0275\u0275text(35);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(36, ProjectDetailsComponent_Conditional_36_Template, 2, 0, "option", 31);
      \u0275\u0275elementStart(37, "option", 32);
      \u0275\u0275text(38, "\u2696\uFE0F \u0627\u0644\u062A\u0633\u0648\u064A\u0627\u062A");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(39, ProjectDetailsComponent_Conditional_39_Template, 2, 0, "option", 33);
      \u0275\u0275conditionalCreate(40, ProjectDetailsComponent_Conditional_40_Template, 2, 0, "option", 34);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "div", 35);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(42, "svg", 36);
      \u0275\u0275element(43, "path", 37);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(44, "div", 38)(45, "button", 39);
      \u0275\u0275listener("click", function ProjectDetailsComponent_Template_button_click_45_listener() {
        return ctx.activeTab.set("petty-cash");
      });
      \u0275\u0275elementStart(46, "span");
      \u0275\u0275text(47, "\u{1F9FE} \u0639\u0647\u062F\u0629 \u0627\u0644\u0645\u0648\u0642\u0639");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(48, ProjectDetailsComponent_Conditional_48_Template, 2, 1, "span", 40);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(49, ProjectDetailsComponent_Conditional_49_Template, 3, 10, "button", 41);
      \u0275\u0275elementStart(50, "button", 42);
      \u0275\u0275listener("click", function ProjectDetailsComponent_Template_button_click_50_listener() {
        return ctx.activeTab.set("settlements");
      });
      \u0275\u0275elementStart(51, "span");
      \u0275\u0275text(52, "\u2696\uFE0F \u0627\u0644\u062A\u0633\u0648\u064A\u0627\u062A");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(53, ProjectDetailsComponent_Conditional_53_Template, 3, 10, "button", 43);
      \u0275\u0275conditionalCreate(54, ProjectDetailsComponent_Conditional_54_Template, 3, 10, "button", 44);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "div", 45);
      \u0275\u0275conditionalCreate(56, ProjectDetailsComponent_Case_56_Template, 5, 0, "span")(57, ProjectDetailsComponent_Case_57_Template, 5, 0, "span")(58, ProjectDetailsComponent_Case_58_Template, 5, 0, "span")(59, ProjectDetailsComponent_Case_59_Template, 5, 0, "span")(60, ProjectDetailsComponent_Case_60_Template, 5, 0, "span");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(61, ProjectDetailsComponent_Conditional_61_Template, 36, 6, "div", 46);
      \u0275\u0275conditionalCreate(62, ProjectDetailsComponent_Conditional_62_Template, 16, 6, "div", 47);
      \u0275\u0275conditionalCreate(63, ProjectDetailsComponent_Conditional_63_Template, 12, 9, "div", 48);
      \u0275\u0275conditionalCreate(64, ProjectDetailsComponent_Conditional_64_Template, 8, 2, "div", 48);
      \u0275\u0275conditionalCreate(65, ProjectDetailsComponent_Conditional_65_Template, 12, 9, "div", 48);
      \u0275\u0275conditionalCreate(66, ProjectDetailsComponent_Conditional_66_Template, 61, 8, "div", 46);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(67, ProjectDetailsComponent_Conditional_67_Template, 75, 28, "div", 49);
      \u0275\u0275conditionalCreate(68, ProjectDetailsComponent_Conditional_68_Template, 41, 23, "div", 49);
      \u0275\u0275conditionalCreate(69, ProjectDetailsComponent_Conditional_69_Template, 87, 35, "div", 49);
      \u0275\u0275conditionalCreate(70, ProjectDetailsComponent_Conditional_70_Template, 37, 2, "div", 49);
      \u0275\u0275conditionalCreate(71, ProjectDetailsComponent_Conditional_71_Template, 23, 2, "div", 49);
      \u0275\u0275conditionalCreate(72, ProjectDetailsComponent_Conditional_72_Template, 35, 4, "div", 49);
      \u0275\u0275conditionalCreate(73, ProjectDetailsComponent_Conditional_73_Template, 64, 6, "div", 49);
      \u0275\u0275conditionalCreate(74, ProjectDetailsComponent_Conditional_74_Template, 55, 12, "div", 49);
      \u0275\u0275conditionalCreate(75, ProjectDetailsComponent_Conditional_75_Template, 81, 30, "div", 50);
      \u0275\u0275conditionalCreate(76, ProjectDetailsComponent_Conditional_76_Template, 6, 1, "div", 51);
      \u0275\u0275conditionalCreate(77, ProjectDetailsComponent_Conditional_77_Template, 20, 3, "div", 52);
      \u0275\u0275conditionalCreate(78, ProjectDetailsComponent_Conditional_78_Template, 13, 4, "div", 53);
    }
    if (rf & 2) {
      let tmp_31_0;
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.isEngineer() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("col-span-2", ctx.isEngineer())("lg:col-span-4", ctx.isEngineer());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 63, "DETAILS.UNSETTLED_PETTY_CASH"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(9, 65, ctx.totalUnsettledPettyCash(), "1.2-2"), " ", \u0275\u0275pipeBind1(10, 68, "COMMON.CURRENCY"));
      \u0275\u0275advance(12);
      \u0275\u0275conditional(ctx.project() ? 20 : ctx.isLoadingProject() ? 21 : 22);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.project() ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.project() ? 24 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isOwnerOrAccountant() && ctx.project() ? 25 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.project() ? 26 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.project() && ctx.project().status !== "Active" ? 27 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.project() && ctx.project().status === "Closed" && ctx.project().publicReviewToken && ctx.isTenantOwner() ? 28 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275property("value", ctx.activeTab());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" \u{1F9FE} \u0639\u0647\u062F\u0629 \u0627\u0644\u0645\u0648\u0642\u0639 ", ctx.unsettledCount() > 0 ? "(" + ctx.unsettledCount() + ")" : "", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isEngineer() ? 36 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.isAccountant() ? 39 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isOwnerOrAccountant() ? 40 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("bg-indigo-600/10", ctx.activeTab() === "petty-cash")("text-indigo-400", ctx.activeTab() === "petty-cash")("border-indigo-500", ctx.activeTab() === "petty-cash")("border-transparent", ctx.activeTab() !== "petty-cash")("text-slate-400", ctx.activeTab() !== "petty-cash");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.unsettledCount() > 0 ? 48 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isEngineer() ? 49 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("bg-indigo-600/10", ctx.activeTab() === "settlements")("text-indigo-400", ctx.activeTab() === "settlements")("border-indigo-500", ctx.activeTab() === "settlements")("border-transparent", ctx.activeTab() !== "settlements")("text-slate-400", ctx.activeTab() !== "settlements");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.isAccountant() ? 53 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isOwnerOrAccountant() ? 54 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_31_0 = ctx.activeTab()) === "petty-cash" ? 56 : tmp_31_0 === "transactions" ? 57 : tmp_31_0 === "settlements" ? 58 : tmp_31_0 === "gallery" ? 59 : tmp_31_0 === "closeout" ? 60 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.activeTab() === "closeout" && ctx.isOwnerOrAccountant() ? 61 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "gallery" ? 62 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "petty-cash" ? 63 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "settlements" ? 64 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "transactions" ? 65 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "admin-settings" ? 66 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSettleModalOpen() ? 67 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isRequestModalOpen() ? 68 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isInjectModalOpen() ? 69 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isEditPettyCashModalOpen() ? 70 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isEditTransactionModalOpen() ? 71 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isReviseBudgetModalOpen() ? 72 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isDisburseModalOpen() ? 73 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSettlementModalOpen() ? 74 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activePrintSettlement() ? 75 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.profileSuccessMessage() ? 76 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTextInspection() ? 77 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLightboxOpen() && ctx.lightboxPhotos().length > 0 ? 78 : -1);
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName, FormGroupName, FormArrayName, RouterLink, FormsModule, NgModel, DatePipe, DecimalPipe, TranslatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectDetailsComponent, [{
    type: Component,
    args: [{
      selector: "app-project-details",
      standalone: true,
      imports: [ReactiveFormsModule, RouterLink, DatePipe, DecimalPipe, TranslatePipe, FormsModule],
      template: `
    <div class="space-y-5 w-full px-3 sm:px-6 lg:px-8">

      <!-- 1\uFE0F\u20E3 Compact Top KPI Stats Bar -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 font-sans">
        @if (!isEngineer()) {
          <!-- Card 1: Total Income -->
          <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex flex-col justify-between shadow-sm">
            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider font-cairo block truncate">{{ 'DETAILS.TOTAL_INCOME' | translate }}</span>
            <h3 class="text-base lg:text-lg font-extrabold text-emerald-400 mt-1 font-mono tabular-nums">{{ totalIncome() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
          </div>
          <!-- Card 2: Total Expenses -->
          <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex flex-col justify-between shadow-sm">
            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider font-cairo block truncate">{{ 'DETAILS.TOTAL_EXPENSES' | translate }}</span>
            <h3 class="text-base lg:text-lg font-extrabold text-rose-400 mt-1 font-mono tabular-nums">{{ totalExpenses() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
          </div>
          <!-- Card 3: Net Balance -->
          <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex flex-col justify-between shadow-sm">
            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider font-cairo block truncate">{{ 'DETAILS.NET_BALANCE' | translate }}</span>
            <h3 class="text-base lg:text-lg font-extrabold mt-1 font-mono tabular-nums" [class.text-emerald-400]="netBalance() >= 0" [class.text-rose-400]="netBalance() < 0">
              {{ netBalance() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}
            </h3>
          </div>
        }
        <!-- Card 4: Unsettled Petty Cash -->
        <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex flex-col justify-between shadow-sm" [class.col-span-2]="isEngineer()" [class.lg:col-span-4]="isEngineer()">
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider font-cairo block truncate">{{ 'DETAILS.UNSETTLED_PETTY_CASH' | translate }}</span>
          <h3 class="text-base lg:text-lg font-extrabold text-amber-400 mt-1 font-mono tabular-nums">{{ totalUnsettledPettyCash() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
        </div>
      </div>

      <!-- 2\uFE0F\u20E3 Unified Project Info & Actions Header -->
      <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <!-- Top Row: Back Button, Title, Badges & Primary Action (+ \u0625\u064A\u062F\u0627\u0639 \u062F\u0641\u0639\u0629 \u0645\u0627\u0644\u064A\u0629) -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
          <div class="flex items-center gap-3 min-w-0">
            <a
              routerLink="/dashboard/projects"
              class="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </a>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h1 class="text-xl sm:text-2xl font-black tracking-tight text-white font-cairo truncate">
                  @if (project()) {
                    {{ project()!.name }}
                  } @else if (isLoadingProject()) {
                    <span class="text-slate-500">{{ 'DETAILS.LOADING_PROJECT' | translate }}</span>
                  } @else {
                    <span class="text-slate-500">{{ 'DETAILS.PROJECT_NOT_FOUND' | translate }}</span>
                  }
                </h1>
                @if (project()) {
                  @if (project()!.isActive) {
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 font-cairo">
                      {{ 'PROJECTS.STATUS.ACTIVE' | translate }}
                    </span>
                  } @else {
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-slate-400 shrink-0 font-cairo">
                      {{ 'PROJECTS.STATUS_CLOSED' | translate }}
                    </span>
                  }
                }
              </div>
              @if (project()) {
                <div class="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                  @if (project()!.governorate) {
                    <span class="text-indigo-400 font-cairo font-medium">\u{1F4CD} {{ project()!.governorate }} @if (project()!.cityOrZone) { - {{ project()!.cityOrZone }} }</span>
                  }
                  @if (project()!.propertyType) {
                    <span class="text-slate-600">\u2022</span>
                    <span class="text-amber-400 font-cairo font-medium">
                      @if (project()!.propertyType === 'Residential') { \u{1F3E0} \u0633\u0643\u0646\u064A } @else { \u{1F3E2} \u0625\u062F\u0627\u0631\u064A }
                    </span>
                  }
                </div>
              }
            </div>
          </div>

          <!-- Primary Action & Header Controls -->
          @if (isOwnerOrAccountant() && project()) {
            <div class="flex items-center gap-3 shrink-0 flex-wrap">
              <!-- Direct Public Visibility Toggle Switch -->
              <div class="flex items-center gap-2.5 bg-slate-950/80 border border-slate-800 px-3.5 py-2 rounded-xl font-cairo shadow-sm">
                <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full transition-colors" [class.bg-emerald-400]="isPublicPortfolio()" [class.bg-slate-600]="!isPublicPortfolio()"></span>
                  <span>\u0625\u0638\u0647\u0627\u0631 \u0641\u064A \u0627\u0644\u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0639\u0627\u0645</span>
                </span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    [checked]="isPublicPortfolio()"
                    (change)="togglePublicVisibility($any($event.target).checked)"
                    [disabled]="isSavingProjectSettings()"
                    class="sr-only peer">
                  <div class="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <!-- Primary Action Button: + \u0625\u064A\u062F\u0627\u0639 \u062F\u0641\u0639\u0629 \u0645\u0627\u0644\u064A\u0629 -->
              <button 
                (click)="openInjectModal()"
                [disabled]="project()?.status === 'Closed'"
                class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center gap-2 cursor-pointer font-cairo shrink-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                </svg>
                <span>+ {{ 'DETAILS.INJECT_CAPITAL' | translate }}</span>
              </button>
            </div>
          }
        </div>

        <!-- Info Grid Side-by-Side: Client, Budget, Scope -->
        @if (project()) {
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            <!-- Client Name -->
            <div class="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3">
              <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo block mb-0.5">{{ 'PROJECTS.TABLE_CLIENT' | translate }}</span>
              <p class="text-sm font-bold text-slate-200 truncate font-cairo">{{ parsedClient() || 'N/A' }}</p>
            </div>

            <!-- Budget -->
            @if (!isEngineer()) {
              <div class="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3">
                <div class="flex items-center justify-between mb-0.5">
                  <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'PROJECTS.TABLE_BUDGET' | translate }}</span>
                  @if (isOwnerOrAccountant()) {
                    <button
                      (click)="openReviseBudgetModal()"
                      [disabled]="project()?.status === 'Closed'"
                      class="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer font-cairo disabled:opacity-40">
                      \u062A\u0639\u062F\u064A\u0644 \u270F\uFE0F
                    </button>
                  }
                </div>
                <p class="text-sm font-bold text-emerald-400 font-mono">{{ parsedBudget() | number:'1.0-0' }} {{ 'COMMON.CURRENCY' | translate }}</p>
              </div>
            }

            <!-- Scope Description -->
            <div class="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3 sm:col-span-1" [class.sm:col-span-2]="isEngineer()">
              <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo block mb-0.5">{{ 'DETAILS.SCOPE_DESC' | translate }}</span>
              <p class="text-xs text-slate-300 leading-relaxed font-cairo line-clamp-2" [title]="parsedDescription()">{{ parsedDescription() || ('PROJECTS.NO_DESCRIPTION' | translate) }}</p>
            </div>
          </div>
        }
      </div>

      <!-- Project Status Banner (Freeze / Closed Guard) -->
      @if (project() && project()!.status !== 'Active') {
        <div class="rounded-2xl border px-5 py-4 flex items-start gap-4"
          [class.border-amber-500]="project()!.status === 'FinancialFreeze'"
          [class.bg-amber-500/5]="project()!.status === 'FinancialFreeze'"
          [class.border-slate-700]="project()!.status === 'Closed'"
          [class.bg-slate-900/40]="project()!.status === 'Closed'">
          <div class="shrink-0 mt-0.5">
            @if (project()!.status === 'FinancialFreeze') {
              <svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            } @else {
              <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          </div>
          <div>
            <p class="text-sm font-bold font-cairo" [class.text-amber-300]="project()!.status === 'FinancialFreeze'" [class.text-slate-300]="project()!.status === 'Closed'">
              {{ project()!.status === 'FinancialFreeze' ? '\u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0641\u064A \u0648\u0636\u0639 \u0627\u0644\u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0645\u0627\u0644\u064A \u2014 \u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0642\u062F\u064A\u0645 \u0637\u0644\u0628\u0627\u062A \u062C\u062F\u064A\u062F\u0629' : '\u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u063A\u0644\u0642 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u2014 \u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0645\u062D\u0638\u0648\u0631\u0629' }}
            </p>
            <p class="text-xs text-slate-500 mt-0.5 font-cairo">{{ project()!.status === 'FinancialFreeze' ? '\u062A\u0645 \u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0631\u0633\u0645\u064A.' : '\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0634\u0643\u0644 \u0646\u0647\u0627\u0626\u064A. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u0641\u0648\u0638\u0629 \u0644\u0644\u062A\u062F\u0642\u064A\u0642.' }}</p>
          </div>
        </div>
      }

      <!-- WhatsApp Client Review Quick-Access Banner (Visible on Closed projects to Tenant Owner) -->
      @if (project() && project()!.status === 'Closed' && project()!.publicReviewToken && isTenantOwner()) {
        <div class="bg-gradient-to-r from-emerald-950/20 to-slate-900/80 border border-emerald-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.022-.014-.029-.022-.054-.054l-.405-.405a1.107 1.107 0 0 0-1.565 0l-.364.364c-.162.162-.338.25-.562.15-.365-.163-.739-.372-1.127-.624-.388-.252-.76-.554-1.116-.906-.356-.352-.656-.724-.908-1.112a14.7 14.7 0 0 1-.624-1.127c-.1-.225-.013-.4.15-.563l.363-.363a1.108 1.108 0 0 0 0-1.566l-.405-.405c-.032-.025-.04-.032-.054-.054A1.123 1.123 0 0 0 9.07 8.35c-.412.413-.679.932-.782 1.488-.13.7.072 1.487.608 2.355.536.868 1.258 1.777 2.15 2.668.892.892 1.8 1.614 2.668 2.15.868.536 1.656.738 2.355.608a2.91 2.91 0 0 0 1.488-.782 1.122 1.122 0 0 0 .15-.717 1.096 1.096 0 0 0-.236-.837zM12.004 2c-5.518 0-10 4.482-10 10 0 1.758.46 3.41 1.266 4.858L2.03 21.684a1.002 1.002 0 0 0 1.286 1.286l4.826-1.24A9.957 9.957 0 0 0 12.004 22c5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18c-1.56 0-3.03-.393-4.323-1.085a1 1 0 0 0-.743-.075l-3.328.855.855-3.328a1 1 0 0 0-.075-.743A7.95 7.95 0 0 1 4.004 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white font-cairo">\u0631\u0627\u0628\u0637 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0644\u0644\u0639\u0645\u064A\u0644 / Client Review Link</h4>
              <p class="text-xs text-slate-400 mt-0.5 font-cairo">\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0646\u062C\u0627\u062D. \u0623\u0631\u0633\u0644 \u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0644\u0644\u0639\u0645\u064A\u0644 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0642\u064A\u0627\u0633 \u0645\u0633\u062A\u0648\u0649 \u0631\u0636\u0627\u0643\u0645.</p>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
            <input type="text" readonly [value]="getPublicReviewUrl()" class="hidden sm:block bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 font-mono focus:outline-none max-w-[200px]" />
            <button (click)="copyReviewLink()" class="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer font-cairo">\u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637</button>
            <a [href]="getWhatsAppShareUrl()" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer font-cairo flex items-center gap-1.5 justify-center">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.022-.014-.029-.022-.054-.054l-.405-.405a1.107 1.107 0 0 0-1.565 0l-.364.364c-.162.162-.338.25-.562.15-.365-.163-.739-.372-1.127-.624-.388-.252-.76-.554-1.116-.906-.356-.352-.656-.724-.908-1.112a14.7 14.7 0 0 1-.624-1.127c-.1-.225-.013-.4.15-.563l.363-.363a1.108 1.108 0 0 0 0-1.566l-.405-.405c-.032-.025-.04-.032-.054-.054A1.123 1.123 0 0 0 9.07 8.35c-.412.413-.679.932-.782 1.488-.13.7.072 1.487.608 2.355.536.868 1.258 1.777 2.15 2.668.892.892 1.8 1.614 2.668 2.15.868.536 1.656.738 2.355.608a2.91 2.91 0 0 0 1.488-.782 1.122 1.122 0 0 0 .15-.717 1.096 1.096 0 0 0-.236-.837zM12.004 2c-5.518 0-10 4.482-10 10 0 1.758.46 3.41 1.266 4.858L2.03 21.684a1.002 1.002 0 0 0 1.286 1.286l4.826-1.24A9.957 9.957 0 0 0 12.004 22c5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18c-1.56 0-3.03-.393-4.323-1.085a1 1 0 0 0-.743-.075l-3.328.855.855-3.328a1 1 0 0 0-.075-.743A7.95 7.95 0 0 1 4.004 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
              \u0627\u0631\u0633\u0627\u0644 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0639\u0645\u064A\u0644 (\u0648\u0627\u062A\u0633\u0627\u0628)
            </a>
          </div>
        </div>
      }

      <!-- \u{1F4F1} Mobile / Tablet Navigation (< md): Adaptive Select Picker -->
      <div class="md:hidden w-full pb-3 border-b border-slate-800 font-cairo">
        <label for="mobile-tab-select" class="sr-only">\u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0633\u0645</label>
        <div class="relative">
          <select
            id="mobile-tab-select"
            [value]="activeTab()"
            (change)="activeTab.set($any($event.target).value)"
            class="w-full appearance-none bg-slate-900 border border-indigo-500/40 text-indigo-300 font-bold text-sm rounded-xl py-3 pr-4 pl-10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-lg cursor-pointer transition-all duration-150 font-cairo">
            <option value="petty-cash" class="bg-slate-900 text-slate-100 py-2">
              \u{1F9FE} \u0639\u0647\u062F\u0629 \u0627\u0644\u0645\u0648\u0642\u0639 {{ unsettledCount() > 0 ? '(' + unsettledCount() + ')' : '' }}
            </option>
            @if (!isEngineer()) {
              <option value="transactions" class="bg-slate-900 text-slate-100 py-2">\u{1F4D6} \u0627\u0644\u062F\u0641\u062A\u0631 \u0627\u0644\u0645\u0627\u0644\u064A</option>
            }
            <option value="settlements" class="bg-slate-900 text-slate-100 py-2">\u2696\uFE0F \u0627\u0644\u062A\u0633\u0648\u064A\u0627\u062A</option>
            @if (!isAccountant()) {
              <option value="gallery" class="bg-slate-900 text-slate-100 py-2">\u{1F4F8} \u0645\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631</option>
            }
            @if (isOwnerOrAccountant()) {
              <option value="closeout" class="bg-slate-900 text-slate-100 py-2">\u2699\uFE0F \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639</option>
            }
          </select>
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-400">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- \u{1F5A5}\uFE0F Desktop Navigation (>= md): Equal Distribution Tabs Container -->
      <div class="hidden md:flex w-full items-center justify-between gap-2 border-b border-slate-800 font-cairo scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
        
        <!-- Tab 1: Site Petty Cash -->
        <button
          id="tab-petty-cash"
          (click)="activeTab.set('petty-cash')"
          class="flex-1 min-w-0 px-3 py-2.5 text-xs lg:text-sm font-bold border-b-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 rounded-t-lg whitespace-nowrap"
          [class.bg-indigo-600/10]="activeTab() === 'petty-cash'"
          [class.text-indigo-400]="activeTab() === 'petty-cash'"
          [class.border-indigo-500]="activeTab() === 'petty-cash'"
          [class.border-transparent]="activeTab() !== 'petty-cash'"
          [class.text-slate-400]="activeTab() !== 'petty-cash'">
          <span>\u{1F9FE} \u0639\u0647\u062F\u0629 \u0627\u0644\u0645\u0648\u0642\u0639</span>
          @if (unsettledCount() > 0) {
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 font-mono shrink-0">{{ unsettledCount() }}</span>
          }
        </button>

        <!-- Tab 2: Financial Ledger -->
        @if (!isEngineer()) {
          <button
            id="tab-transactions"
            (click)="activeTab.set('transactions')"
            class="flex-1 min-w-0 px-3 py-2.5 text-xs lg:text-sm font-bold border-b-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 rounded-t-lg whitespace-nowrap"
            [class.bg-indigo-600/10]="activeTab() === 'transactions'"
            [class.text-indigo-400]="activeTab() === 'transactions'"
            [class.border-indigo-500]="activeTab() === 'transactions'"
            [class.border-transparent]="activeTab() !== 'transactions'"
            [class.text-slate-400]="activeTab() !== 'transactions'">
            <span>\u{1F4D6} \u0627\u0644\u062F\u0641\u062A\u0631 \u0627\u0644\u0645\u0627\u0644\u064A</span>
          </button>
        }

        <!-- Tab 3: Settlements -->
        <button
          id="tab-settlements"
          (click)="activeTab.set('settlements')"
          class="flex-1 min-w-0 px-3 py-2.5 text-xs lg:text-sm font-bold border-b-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 rounded-t-lg whitespace-nowrap"
          [class.bg-indigo-600/10]="activeTab() === 'settlements'"
          [class.text-indigo-400]="activeTab() === 'settlements'"
          [class.border-indigo-500]="activeTab() === 'settlements'"
          [class.border-transparent]="activeTab() !== 'settlements'"
          [class.text-slate-400]="activeTab() !== 'settlements'">
          <span>\u2696\uFE0F \u0627\u0644\u062A\u0633\u0648\u064A\u0627\u062A</span>
        </button>

        <!-- Tab 4: Site Photos -->
        @if (!isAccountant()) {
          <button
            id="tab-gallery"
            (click)="activeTab.set('gallery')"
            class="flex-1 min-w-0 px-3 py-2.5 text-xs lg:text-sm font-bold border-b-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 rounded-t-lg whitespace-nowrap"
            [class.bg-indigo-600/10]="activeTab() === 'gallery'"
            [class.text-indigo-400]="activeTab() === 'gallery'"
            [class.border-indigo-500]="activeTab() === 'gallery'"
            [class.border-transparent]="activeTab() !== 'gallery'"
            [class.text-slate-400]="activeTab() !== 'gallery'">
            <span>\u{1F4F8} \u0645\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631</span>
          </button>
        }

        <!-- Tab 5: Project Control & Admin -->
        @if (isOwnerOrAccountant()) {
          <button
            id="tab-closeout"
            (click)="activeTab.set('closeout')"
            class="flex-1 min-w-0 px-3 py-2.5 text-xs lg:text-sm font-bold border-b-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 rounded-t-lg whitespace-nowrap"
            [class.bg-indigo-600/10]="activeTab() === 'closeout'"
            [class.text-indigo-400]="activeTab() === 'closeout'"
            [class.border-indigo-500]="activeTab() === 'closeout'"
            [class.border-transparent]="activeTab() !== 'closeout'"
            [class.text-slate-400]="activeTab() !== 'closeout'">
            <span>\u2699\uFE0F \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639</span>
          </button>
        }
      </div>

      <!-- Contextual Dynamic Tab Info Banner -->
      <div class="bg-indigo-950/40 border-l-4 border-indigo-500 text-slate-300 text-xs p-3 rounded-lg mb-4 flex items-center gap-2 font-cairo shadow-sm">
        @switch (activeTab()) {
          @case ('petty-cash') {
            <span>\u{1F4A1} <strong>\u0639\u0647\u062F \u0627\u0644\u0645\u0648\u0642\u0639:</strong> \u0635\u0631\u0641 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0627\u0644\u0633\u0627\u0626\u0644\u0629 \u0627\u0644\u0645\u0633\u0644\u0645\u0629 \u0644\u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0645\u0648\u0642\u0639 \u0644\u0644\u0645\u0635\u0627\u0631\u064A\u0641 \u0627\u0644\u064A\u0648\u0645\u064A\u0629.</span>
          }
          @case ('transactions') {
            <span>\u{1F4A1} <strong>\u0627\u0644\u062F\u0641\u062A\u0631 \u0627\u0644\u0645\u0627\u0644\u064A:</strong> \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0634\u0627\u0645\u0644 \u0648\u0627\u0644\u0645\u0648\u062B\u0642 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A \u0648\u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u0634\u0631\u0648\u0639.</span>
          }
          @case ('settlements') {
            <span>\u{1F4A1} <strong>\u0627\u0644\u062A\u0633\u0648\u064A\u0627\u062A:</strong> \u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631 \u0648\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u0642\u062F\u0645\u0629 \u0645\u0646 \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u0645\u0648\u0642\u0639 \u0644\u062A\u0633\u0648\u064A\u0629 \u0627\u0644\u0639\u0647\u062F\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629.</span>
          }
          @case ('gallery') {
            <span>\u{1F4A1} <strong>\u0645\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631:</strong> \u0631\u0641\u0639 \u0648\u062A\u0648\u062B\u064A\u0642 \u0635\u0648\u0631 \u0627\u0644\u062A\u0642\u062F\u0645 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A \u0644\u0644\u0645\u0634\u0631\u0648\u0639 (\u064A\u0645\u0643\u0646 \u0625\u0638\u0647\u0627\u0631\u0647\u0627 \u0641\u064A \u0627\u0644\u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0639\u0627\u0645).</span>
          }
          @case ('closeout') {
            <span>\u{1F4A1} <strong>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639:</strong> \u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629\u060C \u062D\u0627\u0644\u0629 \u0627\u0644\u0638\u0647\u0648\u0631\u060C \u0648\u0631\u0641\u0639 \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629.</span>
          }
        }
      </div>


      <!-- ======================== CLOSEOUT DASHBOARD TAB ======================== -->
      @if (activeTab() === 'closeout' && isOwnerOrAccountant()) {
        <div class="space-y-6">
          <!-- Header -->
          <div class="bg-gradient-to-br from-slate-900/80 to-rose-950/20 border border-rose-900/40 rounded-2xl p-6 shadow-xl">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-lg font-extrabold text-white font-cairo flex items-center gap-2">
                  <svg class="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  \u0644\u0648\u062D\u0629 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 / Project Closeout Dashboard
                </h3>
                <p class="text-xs text-slate-400 mt-1 font-cairo">\u0645\u0631\u062D\u0644\u0629 \u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629\u060C \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0623\u0631\u0635\u062F\u0629\u060C \u0648\u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0627\u0644\u0645\u0648\u062B\u064E\u0651\u0642.</p>
              </div>
              @if (project()) {
                <span class="px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase font-cairo border"
                  [class.bg-emerald-500/10]="project()!.status === 'Active'"
                  [class.text-emerald-400]="project()!.status === 'Active'"
                  [class.border-emerald-500/30]="project()!.status === 'Active'"
                  [class.bg-amber-500/10]="project()!.status === 'FinancialFreeze'"
                  [class.text-amber-300]="project()!.status === 'FinancialFreeze'"
                  [class.border-amber-500/30]="project()!.status === 'FinancialFreeze'"
                  [class.bg-slate-800]="project()!.status === 'Closed'"
                  [class.text-slate-400]="project()!.status === 'Closed'"
                  [class.border-slate-700]="project()!.status === 'Closed'">
                  {{ project()!.status === 'Active' ? '\u{1F7E2} \u0646\u0634\u0637' : project()!.status === 'FinancialFreeze' ? '\u{1F7E1} \u0645\u062C\u0645\u0651\u062F' : '\u26AB \u0645\u063A\u0644\u0642 \u0646\u0647\u0627\u0626\u064A\u0627\u064B' }}
                </span>
              }
            </div>
          </div>

          <!-- \u{1F4C4} Private BOQ / Estimation Attachment Card (\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 Tab) -->
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800/60 pb-3">
              <div>
                <h4 class="text-sm font-extrabold text-white font-cairo flex items-center gap-2">
                  <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629 \u0644\u0644\u0645\u0634\u0631\u0648\u0639 / Project BOQ Reference
                </h4>
                <p class="text-xs text-slate-400 mt-1 font-cairo">
                  \u0631\u0641\u0639 \u0648\u0625\u062F\u0627\u0631\u0629 \u0645\u0633\u062A\u0646\u062F \u062C\u062F\u0648\u0644 \u0627\u0644\u0643\u0645\u064A\u0627\u062A \u0648\u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u0634\u0631\u0648\u0639.
                </p>
              </div>
              <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px] font-bold rounded-xl font-cairo shrink-0">
                \u0645\u0633\u062A\u0646\u062F \u0645\u0631\u062C\u0639\u064A \u062E\u0627\u0635
              </span>
            </div>

            <!-- Lock Notice Banner -->
            <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-300 font-cairo flex items-center gap-2">
              <span class="text-base shrink-0">\u{1F512}</span>
              <span>\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0645\u0631\u062C\u0639\u064A \u062F\u0627\u062E\u0644\u064A \u0641\u0642\u0637 \u0648\u0644\u0627 \u064A\u0638\u0647\u0631 \u0625\u0637\u0644\u0627\u0642\u0627\u064B \u0641\u064A \u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0645 \u0648\u0644\u0627 \u064A\u0624\u062B\u0631 \u0639\u0644\u0649 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629.</span>
            </div>

            <!-- Upload / Download Actions Box -->
            @if (boqFileDetails().fileUrl) {
              <div class="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="flex items-center gap-3 overflow-hidden">
                  <div class="p-3 bg-indigo-600/10 rounded-xl border border-indigo-500/20 text-indigo-400 shrink-0">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="min-w-0">
                    <p class="text-xs font-bold text-white font-mono truncate" [title]="boqFileDetails().fileName">
                      {{ boqFileDetails().fileName }}
                    </p>
                    <p class="text-[10px] text-emerald-400 font-cairo mt-0.5">\u2705 \u0645\u0644\u0641 \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629 \u0645\u0631\u0641\u0648\u0639 \u0648\u0645\u062D\u0641\u0648\u0638</p>
                  </div>
                </div>

                <div class="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                  <!-- Download BOQ Button -->
                  <a 
                    [href]="boqFileDetails().fileUrl" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    download
                    class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer font-cairo flex items-center gap-1.5 shadow-md">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629
                  </a>

                  <!-- Replace BOQ Button -->
                  @if (isOwnerOrAccountant()) {
                    <button 
                      (click)="boqFileInput.click()" 
                      [disabled]="isUploadingBOQ()"
                      class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer font-cairo flex items-center gap-1.5">
                      \u{1F504} \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0627\u0644\u0645\u0644\u0641
                    </button>
                  }
                </div>
              </div>
            } @else {
              <!-- Empty Upload Box -->
              <div class="border-2 border-dashed border-slate-800 hover:border-indigo-500/40 rounded-xl p-6 text-center bg-slate-950/30 transition-all">
                <svg class="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-xs font-bold text-slate-300 font-cairo">\u0644\u0645 \u064A\u062A\u0645 \u0631\u0641\u0639 \u0645\u0644\u0641 \u0645\u0642\u0627\u064A\u0633\u0629 \u0645\u0631\u062C\u0639\u064A\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0639\u062F</p>
                <p class="text-[11px] text-slate-500 font-cairo mt-1">\u064A\u064F\u0633\u0645\u062D \u0628\u0631\u0641\u0639 \u0645\u0644\u0641\u0627\u062A (.pdf, .xlsx, .docx) \u062D\u062A\u0649 10 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A</p>
                
                @if (isOwnerOrAccountant()) {
                  <button 
                    (click)="boqFileInput.click()" 
                    [disabled]="isUploadingBOQ()"
                    class="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer font-cairo inline-flex items-center gap-1.5">
                    @if (isUploadingBOQ()) {
                      <svg class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      \u062C\u0627\u0631\u064A \u0631\u0641\u0639 \u0645\u0644\u0641 \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629...
                    } @else {
                      \u{1F4C1} \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 \u0627\u0644\u0645\u0642\u0627\u064A\u0633\u0629
                    }
                  </button>
                }
              </div>
            }

            <input 
              #boqFileInput 
              type="file" 
              class="hidden" 
              (change)="onBOQFileSelected($event)" 
              accept=".pdf,.xlsx,.xls,.docx,.doc">

            @if (boqUploadError()) {
              <p class="text-xs text-rose-400 font-cairo font-bold mt-1">\u26A0\uFE0F {{ boqUploadError() }}</p>
            }
          </div>

          <!-- Client Review Link Card (Displayed stably inside Closeout tab when publicReviewToken exists) -->
          @if (project() && project()!.publicReviewToken) {
            <div class="bg-slate-900/40 border border-indigo-900/40 rounded-2xl p-5 shadow-xl">
              <h4 class="text-sm font-bold text-indigo-300 font-cairo flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                \u0631\u0627\u0628\u0637 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0644\u0644\u0639\u0645\u064A\u0644 / Project Review Link
              </h4>
              <p class="text-xs text-slate-400 mb-3 font-cairo">\u0623\u0631\u0633\u0644 \u0647\u0630\u0627 \u0627\u0644\u0631\u0627\u0628\u0637 \u0644\u0644\u0639\u0645\u064A\u0644 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u062A\u0642\u064A\u064A\u0645 \u062C\u0648\u062F\u0629 \u062A\u0633\u0644\u064A\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u2014 \u0644\u0627 \u064A\u062A\u0637\u0644\u0628 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644.</p>
              <div class="flex items-center gap-2">
                <input type="text" readonly [value]="getPublicReviewUrl()" class="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-300 font-mono focus:outline-none" />
                <button (click)="copyReviewLink()" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer font-cairo shrink-0">\u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637</button>
                <a [href]="getWhatsAppShareUrl()" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer font-cairo flex items-center gap-1.5 shrink-0 justify-center">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.022-.014-.029-.022-.054-.054l-.405-.405a1.107 1.107 0 0 0-1.565 0l-.364.364c-.162.162-.338.25-.562.15-.365-.163-.739-.372-1.127-.624-.388-.252-.76-.554-1.116-.906-.356-.352-.656-.724-.908-1.112a14.7 14.7 0 0 1-.624-1.127c-.1-.225-.013-.4.15-.563l.363-.363a1.108 1.108 0 0 0 0-1.566l-.405-.405c-.032-.025-.04-.032-.054-.054A1.123 1.123 0 0 0 9.07 8.35c-.412.413-.679.932-.782 1.488-.13.7.072 1.487.608 2.355.536.868 1.258 1.777 2.15 2.668.892.892 1.8 1.614 2.668 2.15.868.536 1.656.738 2.355.608a2.91 2.91 0 0 0 1.488-.782 1.122 1.122 0 0 0 .15-.717 1.096 1.096 0 0 0-.236-.837zM12.004 2c-5.518 0-10 4.482-10 10 0 1.758.46 3.41 1.266 4.858L2.03 21.684a1.002 1.002 0 0 0 1.286 1.286l4.826-1.24A9.957 9.957 0 0 0 12.004 22c5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18c-1.56 0-3.03-.393-4.323-1.085a1 1 0 0 0-.743-.075l-3.328.855.855-3.328a1 1 0 0 0-.075-.743A7.95 7.95 0 0 1 4.004 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>
                  \u0627\u0631\u0633\u0627\u0644 \u0648\u0627\u062A\u0633\u0627\u0628
                </a>
              </div>
            </div>
          }

          <!-- Action Buttons -->
          @if (project() && project()!.status !== 'Closed') {
            <div class="flex flex-wrap gap-3">
              @if (project()!.status === 'Active') {
                <button id="btn-freeze-project" (click)="onFreezeProject()" [disabled]="isCloseoutLoading()"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer font-cairo">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  \u062A\u062C\u0645\u064A\u062F \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u0627\u0644\u064A\u0627\u064B
                </button>
              }
              <button id="btn-run-audit" (click)="onRunReconciliation()" [disabled]="isCloseoutLoading()"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer font-cairo">
                @if (isCloseoutLoading()) {
                  <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 12 5.373 12 12h4z"></path></svg>
                } @else {
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M12 7h.01M15 7h.01M9 17h6" /></svg>
                }
                \u062A\u0634\u063A\u064A\u0644 \u062A\u062F\u0642\u064A\u0642 \u0627\u0644\u0623\u0631\u0635\u062F\u0629
              </button>
              @if (isTenantOwner()) {
                <button id="btn-final-closeout" (click)="onFinalCloseout()"
                  [disabled]="isCloseoutLoading() || !reconciliationReport()?.isFullyReconciled || project()!.status !== 'FinancialFreeze'"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/30 text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-cairo">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0644\u0644\u0645\u0634\u0631\u0648\u0639
                  @if (!reconciliationReport()?.isFullyReconciled) { <span class="text-[10px] opacity-60">(\u064A\u062A\u0637\u0644\u0628 \u062A\u0635\u0641\u064A\u0629 \u0643\u0627\u0645\u0644\u0629)</span> }
                </button>
              }
            </div>
          }

          <!-- Reconciliation Report -->
          @if (reconciliationReport()) {
            <div class="space-y-4">
              <!-- KPI Summary -->
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                  <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629</span>
                  <p class="text-xl font-extrabold text-slate-200 mt-1 font-mono">{{ reconciliationReport()!.totalBudget | number:'1.0-0' }} EGP</p>
                </div>
                <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                  <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u062E\u0644</span>
                  <p class="text-xl font-extrabold text-emerald-400 mt-1 font-mono">{{ reconciliationReport()!.totalIncome | number:'1.0-0' }} EGP</p>
                </div>
                <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                  <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A</span>
                  <p class="text-xl font-extrabold text-rose-400 mt-1 font-mono">{{ reconciliationReport()!.totalExpenses | number:'1.0-0' }} EGP</p>
                </div>
                <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                  <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0635\u064A\u062F</span>
                  <p class="text-xl font-extrabold mt-1 font-mono" [class.text-emerald-400]="reconciliationReport()!.netBalance >= 0" [class.text-rose-400]="reconciliationReport()!.netBalance < 0">{{ reconciliationReport()!.netBalance | number:'1.0-0' }} EGP</p>
                </div>
              </div>
              <!-- Custody Row (Clickable KPI Drill-Down triggers) -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Card 1: Unsettled Custody -->
                <div (click)="selectedDrilldown.set(selectedDrilldown() === 'unsettled' ? null : 'unsettled')"
                  class="bg-slate-900/40 border p-4 rounded-xl text-center cursor-pointer transition-all duration-200 hover:border-slate-700 select-none hover:scale-[1.01]"
                  [class.border-amber-500]="selectedDrilldown() === 'unsettled'"
                  [class.border-slate-800/60]="selectedDrilldown() !== 'unsettled'"
                  [class.bg-amber-500/5]="selectedDrilldown() === 'unsettled'">
                  <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-cairo block">\u0639\u064F\u0647\u064E\u062F \u0645\u0639\u0644\u064E\u0651\u0642\u0629 \u0644\u0644\u063A\u0644\u0642 / Unsettled Custody</span>
                  <p class="text-lg font-bold text-amber-400 mt-1 font-mono hover:underline">
                    {{ unsettledCustodyList().length }} \u0639\u0647\u062F\u0629 ({{ unsettledCustodySum() | number:'1.0-0' }} EGP)
                  </p>
                  <span class="text-[9px] text-slate-500 font-cairo block mt-0.5">\u0627\u0636\u063A\u0637 \u0644\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0648\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0630\u0643\u064A\u0631\u0627\u062A</span>
                </div>

                <!-- Card 2: Pending Treasury Refunds -->
                <div (click)="selectedDrilldown.set(selectedDrilldown() === 'refunds' ? null : 'refunds')"
                  class="bg-slate-900/40 border p-4 rounded-xl text-center cursor-pointer transition-all duration-200 hover:border-slate-700 select-none hover:scale-[1.01]"
                  [class.border-amber-500]="selectedDrilldown() === 'refunds'"
                  [class.border-slate-800/60]="selectedDrilldown() !== 'refunds'"
                  [class.bg-amber-500/5]="selectedDrilldown() === 'refunds'">
                  <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-cairo block">\u0645\u0631\u062A\u062C\u0639\u0627\u062A \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0627\u0644\u0645\u0639\u0644\u0642\u0629 / Treasury Refunds</span>
                  <p class="text-lg font-bold text-amber-400 mt-1 font-mono hover:underline">
                    {{ pendingRefundsList().length }} \u062A\u0633\u0648\u064A\u0629 ({{ pendingRefundsSum() | number:'1.0-0' }} EGP)
                  </p>
                  <span class="text-[9px] text-slate-500 font-cairo block mt-0.5">\u0627\u0636\u063A\u0637 \u0644\u062A\u0623\u0643\u064A\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0645\u0628\u0644\u063A \u0646\u0642\u062F\u0627\u064B</span>
                </div>

                <!-- Card 3: Pending Reimbursements -->
                <div (click)="selectedDrilldown.set(selectedDrilldown() === 'reimbursements' ? null : 'reimbursements')"
                  class="bg-slate-900/40 border p-4 rounded-xl text-center cursor-pointer transition-all duration-200 hover:border-slate-700 select-none hover:scale-[1.01]"
                  [class.border-amber-500]="selectedDrilldown() === 'reimbursements'"
                  [class.border-slate-800/60]="selectedDrilldown() !== 'reimbursements'"
                  [class.bg-amber-500/5]="selectedDrilldown() === 'reimbursements'">
                  <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-cairo block">\u062A\u0639\u0648\u064A\u0636\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u0639\u0644\u0642\u0629 / Reimbursements</span>
                  <p class="text-lg font-bold text-amber-400 mt-1 font-mono hover:underline">
                    {{ pendingReimbursementsList().length }} \u0637\u0644\u0628 ({{ pendingReimbursementsSum() | number:'1.0-0' }} EGP)
                  </p>
                  <span class="text-[9px] text-slate-500 font-cairo block mt-0.5">\u0627\u0636\u063A\u0637 \u0644\u0635\u0631\u0641 \u0627\u0644\u062A\u0639\u0648\u064A\u0636 \u0644\u0644\u0645\u0648\u0638\u0641</span>
                </div>
              </div>

              <!-- Drill-down details container -->
              @if (selectedDrilldown() !== null) {
                <div class="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 space-y-4 transition-all duration-200 shadow-lg">
                  <div class="flex items-center justify-between pb-2 border-b border-slate-800/50">
                    <h4 class="text-sm font-bold text-white font-cairo flex items-center gap-2">
                      <svg class="w-4 h-4 text-amber-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                      @if (selectedDrilldown() === 'unsettled') {
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0639\u0647\u062F \u0627\u0644\u0645\u0639\u0644\u0642\u0629 / Unsettled Custody Details
                      } @else if (selectedDrilldown() === 'refunds') {
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0645\u0631\u062A\u062C\u0639\u0627\u062A \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 / Pending Treasury Refunds
                      } @else if (selectedDrilldown() === 'reimbursements') {
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0639\u0648\u064A\u0636\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062D\u0642\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 / Pending Reimbursements
                      }
                    </h4>
                    <button (click)="selectedDrilldown.set(null)" class="text-slate-400 hover:text-white text-xs font-cairo cursor-pointer">
                      \u0625\u063A\u0644\u0627\u0642 / Close \xD7
                    </button>
                  </div>

                  <!-- Details View: Unsettled Custody -->
                  @if (selectedDrilldown() === 'unsettled') {
                    <div class="overflow-x-auto">
                      <table class="w-full text-left rtl:text-right text-xs">
                        <thead class="bg-slate-950/40 text-slate-400 border-b border-slate-800/50">
                          <tr>
                            <th class="px-4 py-2.5 font-cairo">\u0627\u0644\u0645\u0633\u062A\u0644\u0645 / Engineer</th>
                            <th class="px-4 py-2.5 font-cairo">\u0627\u0644\u0628\u064A\u0627\u0646 / Reason</th>
                            <th class="px-4 py-2.5 text-right font-cairo">\u0627\u0644\u0645\u0628\u0644\u063A / Amount</th>
                            <th class="px-4 py-2.5 font-cairo">\u0627\u0644\u062D\u0627\u0644\u0629 / Status</th>
                            <th class="px-4 py-2.5 text-center font-cairo">\u0625\u062C\u0631\u0627\u0621 \u0633\u0631\u064A\u0639 / Quick Reminder</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800/30">
                          @for (item of unsettledCustodyList(); track item.id) {
                            <tr class="hover:bg-slate-900/20 text-slate-300">
                              <td class="px-4 py-2.5 font-semibold text-white font-cairo">{{ item.issuedTo || 'Staff' }}</td>
                              <td class="px-4 py-2.5 text-slate-400 max-w-xs truncate font-cairo">{{ item.reason }}</td>
                              <td class="px-4 py-2.5 text-right font-mono font-bold text-amber-400">{{ item.amount | number:'1.2-2' }} EGP</td>
                              <td class="px-4 py-2.5 font-mono text-[10px] text-amber-500">{{ item.status }}</td>
                              <td class="px-4 py-2.5 text-center">
                                <button (click)="onWhatsAppAlert(item, '\u0645\u0631\u062D\u0628\u0627\u064B ' + item.issuedTo + '\u060C \u064A\u0631\u062C\u0649 \u062A\u0633\u0648\u064A\u0629 \u0639\u0647\u062F\u062A\u0643 \u0627\u0644\u0645\u0639\u0644\u0642\u0629 \u0628\u0642\u064A\u0645\u0629 ' + item.amount + ' EGP \u0644\u0640 ' + item.projectName + ' - ' + item.reason + '.')" 
                                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold cursor-pointer font-cairo transition-all">
                                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.135-1.348a9.91 9.91 0 004.877 1.28h.005c5.505 0 9.989-4.478 9.99-9.984A10.02 10.02 0 0012.012 2zm5.772 14.184c-.237.669-1.38 1.282-1.9 1.373-.464.082-.9.18-2.95-.624-2.617-1.026-4.304-3.69-4.437-3.868-.131-.177-1.07-1.428-1.07-2.723 0-1.294.673-1.927.915-2.186.242-.259.525-.324.7-.324h.5c.137 0 .323-.05.503.39.186.455.637 1.558.694 1.672.057.114.095.247.02.4-.075.153-.114.248-.228.381l-.224.238c-.114.133-.243.278-.104.516.14.238.622 1.025 1.332 1.657.914.814 1.684 1.066 1.922 1.185.238.12.377.101.517-.06.14-.16.602-.703.763-.94.161-.238.322-.2.54-.12.217.08 1.38.653 1.618.772.238.12.398.18.458.283.06.103.06.598-.178 1.267z"/>
                                  </svg>
                                  \u0625\u0631\u0633\u0627\u0644 \u062A\u0630\u0643\u064A\u0631 \u062A\u0633\u0648\u064A\u0629 / WhatsApp Reminder
                                </button>
                              </td>
                            </tr>
                          } @empty {
                            <tr>
                              <td colspan="5" class="px-4 py-8 text-center text-slate-500 font-cairo">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0647\u062F \u0645\u0639\u0644\u0642\u0629 \u0644\u0644\u063A\u0644\u0642</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  }

                  <!-- Details View: Pending Refunds -->
                  @if (selectedDrilldown() === 'refunds') {
                    <div class="overflow-x-auto">
                      <table class="w-full text-left rtl:text-right text-xs">
                        <thead class="bg-slate-950/40 text-slate-400 border-b border-slate-800/50">
                          <tr>
                            <th class="px-4 py-2.5 font-cairo">\u0627\u0644\u0645\u0633\u062A\u0644\u0645 / Engineer</th>
                            <th class="px-4 py-2.5 font-cairo">\u0627\u0644\u0628\u064A\u0627\u0646 \u0627\u0644\u0623\u0633\u0627\u0633\u064A / Reason</th>
                            <th class="px-4 py-2.5 text-right font-cairo">\u0642\u064A\u0645\u0629 \u0627\u0644\u0639\u0647\u062F\u0629</th>
                            <th class="px-4 py-2.5 text-right font-cairo">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0631\u0641</th>
                            <th class="px-4 py-2.5 text-right font-cairo">\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0631\u062A\u062C\u0639 / Net Difference</th>
                            <th class="px-4 py-2.5 text-center font-cairo">\u0625\u062C\u0631\u0627\u0621 \u0633\u0631\u064A\u0639 / Immediate Action</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800/30">
                          @for (sett of pendingRefundsList(); track sett.id) {
                            <tr class="hover:bg-slate-900/20 text-slate-300">
                              <td class="px-4 py-2.5 font-semibold text-white font-cairo">{{ sett.issuedTo }}</td>
                              <td class="px-4 py-2.5 text-slate-400 max-w-xs truncate font-cairo">{{ sett.custodyReason }}</td>
                              <td class="px-4 py-2.5 text-right font-mono text-slate-400">{{ sett.custodyAmount | number:'1.2-2' }} EGP</td>
                              <td class="px-4 py-2.5 text-right font-mono text-slate-400">{{ sett.totalAmount | number:'1.2-2' }} EGP</td>
                              <td class="px-4 py-2.5 text-right font-mono font-bold text-emerald-400">{{ sett.netDifference | number:'1.2-2' }} EGP</td>
                              <td class="px-4 py-2.5 text-center">
                                <button (click)="onConfirmRefund(sett.id)" 
                                  class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 text-[11px] font-bold cursor-pointer font-cairo transition-all">
                                  \u062A\u0623\u0643\u064A\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0645\u0631\u062A\u062C\u0639 / Confirm Refund
                                </button>
                              </td>
                            </tr>
                          } @empty {
                            <tr>
                              <td colspan="6" class="px-4 py-8 text-center text-slate-500 font-cairo">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0628\u0627\u0644\u063A \u0645\u0631\u062A\u062C\u0639\u0629 \u0645\u0639\u0644\u0642\u0629 \u0628\u0627\u0644\u062E\u0632\u064A\u0646\u0629</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  }

                  <!-- Details View: Pending Reimbursements -->
                  @if (selectedDrilldown() === 'reimbursements') {
                    <div class="overflow-x-auto">
                      <table class="w-full text-left rtl:text-right text-xs">
                        <thead class="bg-slate-950/40 text-slate-400 border-b border-slate-800/50">
                          <tr>
                            <th class="px-4 py-2.5 font-cairo">\u0627\u0644\u0645\u0633\u062A\u062D\u0642 / Employee</th>
                            <th class="px-4 py-2.5 font-cairo">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0635\u0627\u0631\u064A\u0641 \u0627\u0644\u0632\u0627\u0626\u062F\u0629 / Reason</th>
                            <th class="px-4 py-2.5 text-right font-cairo">\u0645\u0628\u0644\u063A \u0627\u0644\u062A\u0639\u0648\u064A\u0636 \u0627\u0644\u0645\u0637\u0644\u0648\u0628</th>
                            <th class="px-4 py-2.5 font-cairo">\u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0635\u0631\u0641 / Treasury Pool</th>
                            <th class="px-4 py-2.5 text-center font-cairo">\u0625\u062C\u0631\u0627\u0621 \u0633\u0631\u064A\u0639 / Immediate Action</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800/30">
                          @for (item of pendingReimbursementsList(); track item.id) {
                            <tr class="hover:bg-slate-900/20 text-slate-300">
                              <td class="px-4 py-2.5 font-semibold text-white font-cairo">{{ item.issuedTo || 'Staff' }}</td>
                              <td class="px-4 py-2.5 text-slate-400 max-w-xs truncate font-cairo">{{ item.reason }}</td>
                              <td class="px-4 py-2.5 text-right font-mono font-bold text-amber-400">{{ item.amount | number:'1.2-2' }} EGP</td>
                              <td class="px-4 py-2.5">
                                <select [(ngModel)]="selectedReimbursementPool[item.id]" 
                                  class="w-full max-w-xs bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-cairo">
                                  <option [value]="undefined" disabled selected>-- \u0627\u062E\u062A\u0631 \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0635\u0646\u062F\u0648\u0642 --</option>
                                  @for (pool of cashPools(); track pool.id) {
                                    <option [value]="pool.id" [disabled]="pool.availableBalance < item.amount">
                                      {{ getPoolSourceTranslationKey(pool.sourceType) }} ({{ pool.availableBalance | number:'1.0-0' }} EGP)
                                    </option>
                                  }
                                </select>
                              </td>
                              <td class="px-4 py-2.5 text-center">
                                <button (click)="onApproveReimbursement(item, selectedReimbursementPool[item.id])" 
                                  class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold cursor-pointer font-cairo transition-all">
                                  \u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0635\u0631\u0641 \u0627\u0644\u062A\u0639\u0648\u064A\u0636 / Disburse
                                </button>
                              </td>
                            </tr>
                          } @empty {
                            <tr>
                              <td colspan="5" class="px-4 py-8 text-center text-slate-500 font-cairo">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0639\u0648\u064A\u0636\u0627\u062A \u0645\u0639\u0644\u0642\u0629 \u0645\u0633\u062A\u062D\u0642\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  }
                </div>
              }

              <!-- Status Banner -->
              <div class="rounded-xl border px-5 py-3 flex flex-col gap-2"
                [class.bg-emerald-500/5]="reconciliationReport()!.isFullyReconciled" [class.border-emerald-500/30]="reconciliationReport()!.isFullyReconciled"
                [class.bg-rose-500/5]="!reconciliationReport()!.isFullyReconciled" [class.border-rose-500/30]="!reconciliationReport()!.isFullyReconciled">
                <div class="flex items-center gap-3">
                  @if (reconciliationReport()!.isFullyReconciled) {
                    <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p class="text-sm font-bold text-emerald-300 font-cairo">\u2705 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0631\u0635\u062F\u0629 \u0645\u0635\u0641\u064E\u0651\u0627\u0629 \u2014 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u062C\u0627\u0647\u0632 \u0644\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0647\u0627\u0626\u064A</p>
                  } @else {
                    <svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                    <p class="text-sm font-bold text-rose-300 font-cairo">\u26A0\uFE0F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u2014 \u064A\u0648\u062C\u062F \u0639\u0647\u062F \u0645\u0639\u0644\u064E\u0651\u0642\u0629 \u0623\u0648 \u0623\u0631\u0635\u062F\u0629 \u0645\u0648\u0638\u0641\u064A\u0646 \u063A\u064A\u0631 \u0635\u0641\u0631\u064A\u0629</p>
                  }
                </div>
                @if (!reconciliationReport()!.isFullyReconciled) {
                  <p class="text-xs text-rose-400 font-cairo ml-8 rtl:mr-8 rtl:ml-0">
                    * \u064A\u062C\u0628 \u062A\u0635\u0641\u064A\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0647\u062F \u0627\u0644\u0645\u0639\u0644\u0642\u0629\u060C \u0648\u0627\u0633\u062A\u0631\u062F\u0627\u062F \u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0627\u0644\u0645\u0631\u062A\u062C\u0639\u0629\u060C \u0648\u0635\u0631\u0641 \u0627\u0644\u062A\u0639\u0648\u064A\u0636\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062D\u0642\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u062D\u062A\u0649 \u062A\u062A\u0633\u0627\u0648\u0649 \u0643\u0627\u0641\u0629 \u0627\u0644\u0623\u0631\u0635\u062F\u0629 \u0625\u0644\u0649 0.00 EGP \u062A\u0645\u0627\u0645\u0627\u064B \u0644\u062A\u0645\u0643\u064A\u0646 \u0632\u0631 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0644\u0644\u0645\u0634\u0631\u0648\u0639.
                  </p>
                }
              </div>
              <!-- Employee Ledger -->
              @if (reconciliationReport()!.employeeBalances.length > 0) {
                <div class="bg-slate-950/50 border border-slate-800/60 rounded-2xl overflow-hidden">
                  <div class="px-5 py-3 border-b border-slate-800/60 bg-slate-900/40">
                    <h4 class="text-sm font-bold text-white font-cairo flex items-center gap-2">
                      <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      \u062F\u0641\u062A\u0631 \u0623\u0631\u0635\u062F\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 / Employee Balance Ledger
                    </h4>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-left rtl:text-right text-xs">
                      <thead class="bg-slate-900/60 border-b border-slate-800/60">
                        <tr class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          <th class="px-4 py-3 font-cairo">\u0627\u0644\u0645\u0648\u0638\u0641</th>
                          <th class="px-4 py-3 text-right font-cairo">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u064F\u0647\u064E\u062F</th>
                          <th class="px-4 py-3 text-right font-cairo">\u0627\u0644\u0645\u064F\u0633\u0648\u064E\u0651\u0649</th>
                          <th class="px-4 py-3 text-right font-cairo">\u0627\u0644\u0645\u0631\u062A\u062C\u0639</th>
                          <th class="px-4 py-3 text-right font-cairo">\u0627\u0644\u0631\u0635\u064A\u062F</th>
                          <th class="px-4 py-3 text-center font-cairo">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-800/40">
                        @for (emp of reconciliationReport()!.employeeBalances; track emp.userId) {
                          <tr class="hover:bg-slate-900/30 transition-colors" [class.bg-rose-950/10]="!emp.isClean">
                            <td class="px-4 py-3 font-semibold text-slate-200 font-cairo">{{ emp.fullName }}</td>
                            <td class="px-4 py-3 text-right font-mono text-amber-300">{{ emp.totalIssued | number:'1.2-2' }}</td>
                            <td class="px-4 py-3 text-right font-mono text-emerald-400">{{ emp.totalSettled | number:'1.2-2' }}</td>
                            <td class="px-4 py-3 text-right font-mono text-cyan-400">
                              @if (emp.totalReturnAmount > 0) {
                                {{ emp.totalReturnAmount | number:'1.2-2' }}
                              } @else {
                                <span class="text-slate-600">\u2014</span>
                              }
                            </td>
                            <td class="px-4 py-3 text-right font-mono font-bold" [class.text-rose-400]="emp.balance > 0" [class.text-slate-300]="emp.balance === 0" [class.text-blue-400]="emp.balance < 0">{{ emp.balance | number:'1.2-2' }}</td>
                            <td class="px-4 py-3 text-center">
                              @if (emp.isClean) {
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-cairo">\u2705 \u0645\u064F\u0635\u0641\u064E\u0651\u0649</span>
                              } @else if (emp.balance > 0) {
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 font-cairo">\u26A0\uFE0F \u062F\u064E\u064A\u0652\u0646</span>
                              } @else {
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 font-cairo">\u{1F499} \u062A\u0639\u0648\u064A\u0636</span>
                              }
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              }
              <p class="text-[11px] text-slate-600 text-center font-cairo">\u0622\u062E\u0631 \u062A\u062F\u0642\u064A\u0642: {{ reconciliationReport()!.generatedAt | date:'dd/MM/yyyy HH:mm:ss' }}</p>
            </div>
          } @else if (!isCloseoutLoading()) {
            <div class="text-center py-12 text-slate-500">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <p class="text-sm font-cairo">\u0627\u0636\u063A\u0637 "\u062A\u0634\u063A\u064A\u0644 \u062A\u062F\u0642\u064A\u0642 \u0627\u0644\u0623\u0631\u0635\u062F\u0629" \u0644\u062A\u0648\u0644\u064A\u062F \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0627\u0644\u0634\u0627\u0645\u0644\u0629.</p>
            </div>
          }
        </div>
      }

      @if (activeTab() === 'gallery') {
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">

          <div class="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h3 class="text-base font-bold text-white font-cairo">{{ 'MARKETPLACE.PROJECT_GALLERY' | translate }}</h3>
              <p class="text-xs text-slate-500 mt-1 font-cairo">Upload and manage site photos for public portfolio listings.</p>
            </div>
            <div>
              <button
                type="button"
                (click)="galleryFileInput.click()"
                [disabled]="isUploadingGallery()"
                class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-xs font-semibold rounded-xl text-white shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo">
                @if (isUploadingGallery()) {
                  <svg class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ 'DETAILS.UPLOADING' | translate }}
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  {{ 'DETAILS.UPLOAD_IMAGE' | translate }}
                }
              </button>
              <!-- <input
                #galleryFileInput
                type="file"
                class="hidden"
                (change)="onGalleryFileSelected($event)"
                accept="image/*"> -->
                <input
                  #galleryFileInput
                  type="file"
                  class="hidden"
                  (change)="onGalleryFileSelected($event)"
                  accept="image/*">
            </div>
          </div>

          @if (isLoadingGallery()) {
            <div class="flex justify-center py-16">
              <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          } @else {
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              @for (photo of galleryPhotos(); track photo.id; let idx = $index) {
                <div 
                  (click)="openLightbox(galleryPhotos(), idx, $event)"
                  class="group relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md flex items-center justify-center cursor-pointer">
                  <img [src]="photo.photoUrl" (error)="onImgError($event)" alt="" class="w-full h-full object-cover group-hover:scale-110 transition-transform">
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span class="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg text-[11px] font-bold text-white font-cairo flex items-center gap-1">
                      \u{1F50D} \u0645\u0639\u0627\u064A\u0646\u0629
                    </span>
                  </div>
                  <div class="hidden flex-col items-center justify-center p-3 text-slate-600 font-cairo text-xs gap-1.5 w-full h-full bg-slate-950/80">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-[11px] text-slate-500 font-cairo">\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629</span>
                  </div>
                  
                  @if (isTenantOwner()) {
                    <button
                      type="button"
                      (click)="onDeletePhoto(photo.id)"
                      class="absolute top-2 right-2 rtl:left-2 rtl:right-auto p-1.5 rounded-lg bg-rose-500/90 hover:bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-all duration-150 cursor-pointer shadow-lg z-20">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  }

                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 flex flex-col justify-end">
                    <p class="text-[10px] text-slate-300 font-mono">{{ photo.uploadedAt | date:'dd/MM/yyyy HH:mm' }}</p>
                    <p class="text-[10px] text-slate-400 truncate mt-0.5">By: {{ photo.uploadedBy || 'Owner' }}</p>
                  </div>
                </div>
              } @empty {
                <div class="col-span-2 sm:col-span-3 lg:col-span-4 py-16 text-center text-slate-500 text-sm font-cairo">
                  {{ 'MARKETPLACE.NO_PHOTOS' | translate }}
                </div>
              }
            </div>
          }
        </div>
      }

      <!-- Tab Content: Petty Cash -->
      @if (activeTab() === 'petty-cash') {
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div class="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
            <h3 class="text-base font-bold text-white">{{ 'DETAILS.VOUCHERS_TITLE' | translate }}</h3>
            <div class="flex items-center gap-3">
              @if ((isEngineer() || isTenantOwner()) && project()?.status !== 'Closed') {
                <button
                  (click)="openRequestModal()"
                  [disabled]="project()?.status === 'Closed'"
                  class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-xl text-white shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:hover:scale-100 disabled:active:scale-100 disabled:pointer-events-none">
                  {{ 'DETAILS.BTN_REQUEST_PETTY' | translate }}
                </button>
              }
              <span class="text-xs text-slate-500 font-semibold">{{ pettyCashes().length }} {{ 'DETAILS.RECORDS' | translate }}</span>
            </div>
          </div>

          @if (isLoadingPettyCash()) {
            <div class="flex justify-center py-12">
              <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          } @else {
            <div class="w-full overflow-x-auto block font-sans">
              <table class="w-full text-left rtl:text-right min-w-[800px]">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wide">
                    <th class="px-6 py-4">{{ 'DETAILS.TH_ISSUED_TO' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_REASON' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_DATE' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_AMOUNT' | translate }}</th>
                    <th class="px-6 py-4 text-center">{{ 'DETAILS.TH_STATUS' | translate }}</th>
                    <th class="px-6 py-4 text-center">{{ 'DETAILS.TH_ACTION' | translate }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm">
                  @for (item of pettyCashes(); track item.id) {
                    <tr class="hover:bg-slate-900/30 transition-colors duration-150 text-slate-300">
                      <td class="px-6 py-4 font-semibold text-white">{{ item.issuedTo || 'Staff' }}</td>
                      <td class="px-6 py-4 text-slate-400 max-w-[220px] lg:max-w-[320px] truncate cursor-pointer hover:text-sky-400 transition-colors"
                          [title]="item.reason"
                          (click)="openPettyCashReasonModal(item)">
                        {{ item.reason }}
                      </td>
                      <td class="px-6 py-4 text-slate-400">{{ item.issuedAt | date:'dd/MM/yyyy HH:mm' }}</td>
                      <td class="px-6 py-4 font-mono font-bold text-amber-400">{{ item.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</td>
                      <td class="px-6 py-4 text-center">
                        @if (item.isSettled) {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400">
                            {{ 'DETAILS.STATUS_SETTLED' | translate }}
                          </span>
                        } @else {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400">
                            {{ 'DETAILS.STATUS_PENDING' | translate }}
                          </span>
                        }
                      </td>
                      <td class="px-6 py-4 text-center">
                        <div class="flex items-center justify-center gap-2">
                          @if (!item.isSettled && item.status === 'Issued') {
                            <button
                              (click)="openSettlementModal(item)"
                              [disabled]="project()?.status === 'Closed'"
                              class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white shadow-md shadow-indigo-600/10 transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:hover:scale-100 disabled:active:scale-100 disabled:pointer-events-none">
                              {{ 'DETAILS.BTN_SETTLE' | translate }}
                            </button>
                          }
                          @if (item.status === 'Issued' || item.status === 'Pending' || item.isSettled) {
                            <button
                              (click)="onWhatsAppAlert(item)"
                              class="px-2.5 py-1.5 bg-emerald-600/80 hover:bg-emerald-700 text-xs font-semibold rounded-lg text-white shadow-md transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1 font-cairo">
                              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.135-1.348a9.91 9.91 0 004.877 1.28h.005c5.505 0 9.989-4.478 9.99-9.984A10.02 10.02 0 0012.012 2zm5.772 14.184c-.237.669-1.38 1.282-1.9 1.373-.464.082-.9.18-2.95-.624-2.617-1.026-4.304-3.69-4.437-3.868-.131-.177-1.07-1.428-1.07-2.723 0-1.294.673-1.927.915-2.186.242-.259.525-.324.7-.324h.5c.137 0 .323-.05.503.39.186.455.637 1.558.694 1.672.057.114.095.247.02.4-.075.153-.114.248-.228.381l-.224.238c-.114.133-.243.278-.104.516.14.238.622 1.025 1.332 1.657.914.814 1.684 1.066 1.922 1.185.238.12.377.101.517-.06.14-.16.602-.703.763-.94.161-.238.322-.2.54-.12.217.08 1.38.653 1.618.772.238.12.398.18.458.283.06.103.06.598-.178 1.267z"/>
                              </svg>
                              <span>\u0648\u0627\u062A\u0633\u0627\u0628</span>
                            </button>
                          } @else {
                            @if (item.receiptPhotoUrl) {
                              <a [href]="item.receiptPhotoUrl" target="_blank" 
                                 class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-500/10 hover:bg-indigo-500/25 text-indigo-400 border border-indigo-500/20 transition-all cursor-pointer font-cairo shadow-sm" 
                                 title="View Receipt">
                                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0625\u064A\u0635\u0627\u0644</span>
                              </a>
                            }
                            @if (item.settlementPaymentMethod) {
                              <span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-300" title="Payment Method">
                                {{ item.settlementPaymentMethod }}
                              </span>
                            }
                            @if (item.expenseDate) {
                              <span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-400" title="Expense Date">
                                {{ item.expenseDate | date:'dd/MM/yyyy' }}
                              </span>
                            }
                          }
                          @if (isOwnerOrAccountant()) {
                            @if (item.isSettled || item.status === 'Settled') {
                              <span class="inline-flex items-center gap-1 text-slate-500 text-xs font-semibold px-2 py-1 bg-slate-950/40 border border-slate-800 rounded-lg select-none">
                                <svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                \u{1F512} \u0645\u0642\u0641\u0644\u0629
                              </span>
                            } @else {
                              <div class="flex items-center justify-center gap-2 flex-wrap">
                                @if (item.status === 'Pending') {
                                  <div class="flex items-center gap-1.5 bg-slate-950/40 border border-slate-800/80 p-1.5 rounded-xl">
                                    <select [(ngModel)]="selectedPettyCashPool[item.id]" 
                                      class="bg-slate-900 border border-slate-700/80 rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-cairo">
                                      <option [value]="undefined" disabled selected>-- \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0635\u0631\u0641 / Source Pool --</option>
                                      @for (pool of cashPools(); track pool.id) {
                                        <option [value]="pool.id" [disabled]="pool.availableBalance < item.amount">
                                          {{ 'FINANCE.' + getPoolSourceTranslationKey(pool.sourceType) | translate }} ({{ pool.availableBalance | number:'1.0-0' }} EGP)
                                        </option>
                                      }
                                    </select>
                                    <button
                                      (click)="onApprovePettyCashRequest(item, selectedPettyCashPool[item.id])"
                                      [disabled]="project()?.status === 'Closed'"
                                      title="Approve and disburse"
                                      class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                      Approve / Disburse
                                    </button>
                                    <button
                                      (click)="onRejectPettyCashRequest(item)"
                                      [disabled]="project()?.status === 'Closed'"
                                      title="Reject request"
                                      class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-300 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                      Reject
                                    </button>
                                  </div>
                                }
                                <button
                                  (click)="openEditPettyCashModal(item)"
                                  [disabled]="project()?.status === 'Closed'"
                                  title="Edit pending request"
                                  class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800/10 disabled:text-slate-500 disabled:border-slate-800/20 disabled:pointer-events-none">
                                  Edit
                                </button>
                                <button
                                  (click)="onDeletePettyCash(item.id, item.isSettled)"
                                  [disabled]="isDeletingPettyCash() || project()?.status === 'Closed'"
                                  title="Delete voucher and restore pool balance"
                                  class="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer">
                                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            }
                          }
                        </div>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="6" class="px-6 py-14 text-center text-slate-500 text-sm">
                        {{ 'DETAILS.NO_VOUCHERS' | translate }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      }

      <!-- Tab Content: Settlements -->
      @if (activeTab() === 'settlements') {
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div class="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
            <h3 class="text-base font-bold text-white font-cairo">\u0637\u0644\u0628\u0627\u062A \u062A\u0633\u0648\u064A\u0629 \u0627\u0644\u0639\u0647\u062F / Settlements</h3>
            <span class="text-xs text-slate-500 font-semibold font-cairo">{{ settlements().length }} \u0633\u062C\u0644 / Records</span>
          </div>

          @if (isLoadingSettlements()) {
            <div class="flex justify-center py-12">
              <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          } @else {
            <div class="w-full overflow-x-auto block font-sans">
              <table class="w-full text-left rtl:text-right min-w-[900px]">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wide">
                    <th class="px-6 py-4 font-cairo">\u0635\u0627\u062D\u0628 \u0627\u0644\u0639\u0647\u062F\u0629 / Engineer</th>
                    <th class="px-6 py-4 font-cairo">\u0645\u0628\u0644\u063A \u0627\u0644\u0639\u0647\u062F\u0629 / Custody</th>
                    <th class="px-6 py-4 font-cairo">\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0635\u0631\u0648\u0641 / Spent</th>
                    <th class="px-6 py-4 font-cairo">\u0627\u0644\u0641\u0631\u0642 / Difference</th>
                    <th class="px-6 py-4 font-cairo">\u0627\u0644\u062D\u0627\u0644\u0629 / Status</th>
                    <th class="px-6 py-4 font-cairo">\u0627\u0644\u062A\u0627\u0631\u064A\u062E / Date</th>
                    <th class="px-6 py-4 text-center font-cairo">\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A / Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm">
                  @for (s of settlements(); track s.id) {
                    <tr class="hover:bg-slate-900/30 transition-colors duration-150 text-slate-300">
                      <td class="px-6 py-4">
                        <div class="font-semibold text-white">{{ s.issuedTo }}</div>
                        <div class="text-xs text-slate-500 max-w-xs truncate">{{ s.custodyReason }}</div>
                      </td>
                      <td class="px-6 py-4 font-mono font-bold text-slate-400">{{ s.custodyAmount | number:'1.2-2' }} EGP</td>
                      <td class="px-6 py-4 font-mono font-bold text-amber-400">{{ s.totalAmount | number:'1.2-2' }} EGP</td>
                      <td class="px-6 py-4 font-mono font-bold" [class.text-emerald-400]="s.netDifference > 0" [class.text-rose-400]="s.netDifference < 0">
                        {{ s.netDifference | number:'1.2-2' }} EGP
                      </td>
                      <td class="px-6 py-4">
                        @if (s.status === 'Draft') {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-500/20 text-slate-400">Draft / \u0645\u0633\u0648\u062F\u0629</span>
                        } @else if (s.status === 'Approved') {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400">Approved</span>
                        } @else if (s.status === 'ApprovedPendingRefund') {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-orange-500/10 text-orange-400">Pending Refund</span>
                        } @else if (s.status === 'Refunded') {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400">Refunded</span>
                        } @else if (s.status === 'Rejected') {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/10 text-rose-400">Rejected</span>
                        } @else {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400">Pending Approval</span>
                        }
                      </td>
                      <td class="px-6 py-4 text-slate-400 text-xs">{{ s.submittedAt | date:'dd/MM/yyyy HH:mm' }}</td>
                      <td class="px-6 py-4">
                        <div class="flex items-center justify-center gap-2">
                          @if (s.status === 'Pending' && isOwnerOrAccountant()) {
                            <button
                              (click)="onApproveSettlement(s.id)"
                              [disabled]="project()?.status === 'Closed'"
                              class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold rounded-lg text-white font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:pointer-events-none">
                              \u0627\u0639\u062A\u0645\u0627\u062F
                            </button>
                            <button
                              (click)="onRejectSettlement(s.id)"
                              [disabled]="project()?.status === 'Closed'"
                              class="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-xs font-semibold rounded-lg text-white font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:pointer-events-none">
                              \u0631\u0641\u0636
                            </button>
                          }
                          @if (s.status === 'ApprovedPendingRefund' && isOwnerOrAccountant()) {
                            <button
                              (click)="onConfirmRefund(s.id)"
                              [disabled]="project()?.status === 'Closed'"
                              class="px-2.5 py-1 bg-orange-500 hover:bg-orange-600 text-xs font-semibold rounded-lg text-white font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:pointer-events-none">
                              \u062A\u0623\u0643\u064A\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0645\u0631\u062A\u062C\u0639
                            </button>
                          }
                          <button
                            (click)="printSettlementReport(s)"
                            class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 hover:text-white border border-slate-700 transition-all font-cairo flex items-center gap-1 active:scale-95 cursor-pointer">
                            \u0637\u0628\u0627\u0639\u0629 / Print \u{1F5A8}\uFE0F
                          </button>
                        </div>
                      </td>
                    </tr>
                    <!-- Difference Clarification Sub-Row -->
                    @if (s.netDifference !== 0 && s.status !== 'Pending' && s.status !== 'Draft' && s.status !== 'Rejected') {
                      <tr class="bg-slate-950/30">
                        <td colspan="7" class="px-6 py-2.5 border-b border-slate-800/30">
                          @if (s.netDifference < 0) {
                            <div class="flex items-center gap-2.5">
                              <span class="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/15 shrink-0">
                                <svg class="w-3.5 h-3.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                              </span>
                              <div>
                                <span class="text-[11px] font-bold text-rose-300 font-cairo">\u26A1 \u0627\u0644\u0645\u0647\u0646\u062F\u0633 \u0635\u0631\u0641 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0627\u0644\u0639\u0647\u062F\u0629 \u0628\u0640 {{ (s.netDifference * -1) | number:'1.2-2' }} EGP</span>
                                <span class="text-[10px] text-rose-400/70 font-cairo mr-2 rtl:mr-0 rtl:ml-2">\u2014 \u062A\u0645 \u062A\u0648\u0644\u064A\u062F \u0637\u0644\u0628 \u062A\u0639\u0648\u064A\u0636 \u062A\u0644\u0642\u0627\u0626\u064A (Reimbursement) \u064A\u062A\u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u062D\u0627\u0633\u0628 \u0648\u0635\u0631\u0641\u0647 \u0645\u0646 \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0635\u0646\u062F\u0648\u0642</span>
                              </div>
                            </div>
                          } @else {
                            <div class="flex items-center gap-2.5">
                              @if (s.status === 'ApprovedPendingRefund') {
                                <span class="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/15 shrink-0">
                                  <svg class="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </span>
                                <div>
                                  <span class="text-[11px] font-bold text-orange-300 font-cairo">\u{1F4B0} \u0645\u0631\u062A\u062C\u0639 {{ s.netDifference | number:'1.2-2' }} EGP \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u0623\u0643\u064A\u062F \u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0645\u062D\u0627\u0633\u0628</span>
                                  <span class="text-[10px] text-orange-400/70 font-cairo mr-2 rtl:mr-0 rtl:ml-2">\u2014 \u0627\u0644\u0645\u0647\u0646\u062F\u0633 \u0635\u0631\u0641 \u0623\u0642\u0644 \u0645\u0646 \u0627\u0644\u0639\u0647\u062F\u0629 \u0648\u0627\u0644\u0628\u0627\u0642\u064A \u064A\u062C\u0628 \u0625\u0631\u062C\u0627\u0639\u0647 \u0644\u0644\u0635\u0646\u062F\u0648\u0642</span>
                                </div>
                              } @else if (s.status === 'Refunded') {
                                <span class="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/15 shrink-0">
                                  <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </span>
                                <div>
                                  <span class="text-[11px] font-bold text-cyan-300 font-cairo">\u2705 \u062A\u0645 \u0627\u0633\u062A\u0631\u062F\u0627\u062F {{ s.netDifference | number:'1.2-2' }} EGP \u0628\u0646\u062C\u0627\u062D \u0648\u0625\u0639\u0627\u062F\u062A\u0647\u0627 \u0644\u0644\u0635\u0646\u062F\u0648\u0642</span>
                                  <span class="text-[10px] text-cyan-400/70 font-cairo mr-2 rtl:mr-0 rtl:ml-2">\u2014 \u0627\u0644\u0645\u0631\u062A\u062C\u0639 \u0645\u064F\u0624\u064E\u0643\u064E\u0651\u062F \u0648\u0645\u064F\u0633\u062C\u064E\u0651\u0644 \u0643\u0640 RefundToTreasury</span>
                                </div>
                              } @else {
                                <span class="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 shrink-0">
                                  <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </span>
                                <div>
                                  <span class="text-[11px] font-bold text-emerald-300 font-cairo">\u0627\u0644\u0645\u0647\u0646\u062F\u0633 \u0635\u0631\u0641 \u0623\u0642\u0644 \u0645\u0646 \u0627\u0644\u0639\u0647\u062F\u0629 \u2014 \u0641\u0627\u0626\u0636 {{ s.netDifference | number:'1.2-2' }} EGP</span>
                                </div>
                              }
                            </div>
                          }
                        </td>
                      </tr>
                    }
                    <!-- Nested Lines View -->
                    <tr class="bg-slate-950/20">
                      <td colspan="7" class="px-6 py-3 border-b border-slate-800/40">
                        <div class="text-xs font-bold text-slate-400 mb-2 font-cairo">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0629 / Invoiced Lines:</div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          @for (line of s.lines; track line.id) {
                            <div class="bg-slate-900/50 border border-slate-800/50 rounded-xl p-3 flex justify-between items-center">
                              <div>
                                <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-300 font-cairo">{{ line.category }}</span>
                                <div class="text-xs text-white mt-1 font-semibold">{{ line.description }}</div>
                              </div>
                              <div class="text-right">
                                <div class="text-xs font-bold text-amber-400 font-mono">{{ line.amount }} EGP</div>
                                @if (line.invoiceUrl) {
                                  <a [href]="line.invoiceUrl" target="_blank" class="text-[10px] text-indigo-400 hover:underline font-cairo mt-1 block">\u{1F4C4} \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629</a>
                                }
                              </div>
                            </div>
                          }
                        </div>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="7" class="px-6 py-14 text-center text-slate-500 text-sm font-cairo">
                        \u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u062A\u0633\u0648\u064A\u0629 \u0645\u0642\u062F\u0645\u0629 \u062D\u0627\u0644\u064A\u0627\u064B / No settlements submitted yet.
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      }

      <!-- Tab Content: Financial Transactions -->
      @if (activeTab() === 'transactions') {
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div class="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
            <h3 class="text-base font-bold text-white">{{ 'DETAILS.LEDGER_TITLE' | translate }}</h3>
            <div class="flex items-center gap-3">
              @if (isOwnerOrAccountant()) {
                <button
                  (click)="openDisburseModal()"
                  [disabled]="project()?.status === 'Closed'"
                  class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold rounded-xl text-white shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:hover:scale-100 disabled:active:scale-100 disabled:pointer-events-none">
                  \u062A\u0639\u0632\u064A\u0632 \u0639\u0647\u062F\u0629 \u0645\u0628\u0627\u0634\u0631 / Direct Disbursement
                </button>
              }
              <span class="text-xs text-slate-500 font-semibold">{{ transactions().length }} {{ 'DETAILS.ENTRIES' | translate }}</span>
            </div>
          </div>

          @if (isLoadingTransactions()) {
            <div class="flex justify-center py-12">
              <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          } @else {
            <div class="w-full overflow-x-auto block font-sans">
              <table class="w-full text-left rtl:text-right min-w-[800px]">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wide">
                    <th class="px-6 py-4">{{ 'DETAILS.TH_DATE' | translate }}</th>
                    <th class="px-6 py-4">Method</th>
                    <th class="px-6 py-4">{{ 'PROJECTS.FIELD_DESC' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_STATUS' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_AMOUNT' | translate }}</th>
                    <th class="px-6 py-4 text-center">Receipt</th>
                    @if (isOwnerOrAccountant()) {
                      <th class="px-6 py-4 text-center">{{ 'DETAILS.TH_ACTION' | translate }}</th>
                    }
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm">
                  @for (t of transactions(); track t.id) {
                    <tr class="hover:bg-slate-900/30 transition-colors duration-150 text-slate-300">
                      <td class="px-6 py-4 text-slate-400">
                        <div>{{ t.transactionDate | date:'dd/MM/yyyy HH:mm' }}</div>
                        @if (t.paymentDate) {
                          <div class="text-[10px] text-slate-500 mt-1">Paid: {{ t.paymentDate | date:'dd/MM/yyyy' }}</div>
                        }
                      </td>
                      <td class="px-6 py-4">
                        @if (t.paymentMethod) {
                          <span class="px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-300">
                            {{ t.paymentMethod }}
                          </span>
                        } @else {
                          <span class="text-xs text-slate-600">-</span>
                        }
                      </td>
                      <td class="px-6 py-4 font-medium text-white max-w-[220px] lg:max-w-[320px] truncate cursor-pointer hover:text-sky-400 transition-colors"
                          [title]="t.description"
                          (click)="openTransactionInspectionModal(t)">
                        {{ t.description }}
                      </td>
                      <td class="px-6 py-4">
                        @if (t.type === 'Income') {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400">
                            {{ 'DETAILS.BADGE_INCOME' | translate }}
                          </span>
                        } @else {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-rose-500/10 text-rose-400">
                            {{ 'DETAILS.BADGE_EXPENSE' | translate }}
                          </span>
                        }
                      </td>
                      <td class="px-6 py-4 font-mono font-bold"
                          [class.text-emerald-400]="t.type === 'Income'"
                          [class.text-rose-400]="t.type !== 'Income'">
                        {{ t.type === 'Income' ? '+' : '-' }}{{ t.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}
                      </td>
                      <td class="px-6 py-4 text-center">
                        @if (t.receiptPhotoUrl) {
                          <a [href]="t.receiptPhotoUrl" target="_blank" 
                             class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-500/10 hover:bg-indigo-500/25 text-indigo-400 border border-indigo-500/20 transition-all cursor-pointer font-cairo shadow-sm" 
                             title="View Receipt">
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0625\u064A\u0635\u0627\u0644</span>
                          </a>
                        } @else {
                          <span class="text-xs text-slate-600">-</span>
                        }
                      </td>
                      @if (isOwnerOrAccountant()) {
                        <td class="px-6 py-4 text-center">
                          @if (t.description.toLowerCase().startsWith('petty cash settlement -')) {
                            <span class="inline-flex items-center gap-1 text-slate-500 text-xs font-semibold px-2 py-1 bg-slate-950/40 border border-slate-800 rounded-lg select-none">
                              <svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              \u{1F512} \u0645\u0642\u0641\u0644\u0629
                            </span>
                          } @else {
                            <div class="flex items-center justify-center gap-1.5">
                              <button
                                (click)="openEditTransactionModal(t)"
                                [disabled]="project()?.status === 'Closed'"
                                title="Edit transaction"
                                class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800/10 disabled:text-slate-500 disabled:border-slate-800/20 disabled:pointer-events-none">
                                Edit
                              </button>
                              <button
                                (click)="onDeleteTransaction(t.id)"
                                [disabled]="isDeletingTransaction() || project()?.status === 'Closed'"
                                title="Delete transaction and roll back pool"
                                class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer">
                                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </button>
                            </div>
                          }
                        </td>
                      }
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="4" class="px-6 py-14 text-center text-slate-500 text-sm">
                        {{ 'DETAILS.NO_TRANSACTIONS' | translate }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      }

      <!-- Tab Content: Company Admin Settings -->
      @if (activeTab() === 'admin-settings') {
        <div class="space-y-6">
          <!-- Company profile details edit form -->
          <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 class="text-lg font-bold text-white font-cairo">\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 / Edit Company Profile</h3>


            <form [formGroup]="profileForm" (ngSubmit)="onProfileSubmit()" class="space-y-5 overflow-y-auto min-h-0 pr-1 flex-1">
              <!-- Banner upload -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">\u0628\u0627\u0646\u0631 \u0627\u0644\u0634\u0631\u0643\u0629 / Company Banner</label>
                <div class="w-full h-36 sm:h-44 bg-slate-800 rounded-xl relative overflow-hidden group border border-slate-700">
                  @if (profileForm.get('bannerUrl')?.value) {
                    <img [src]="profileForm.get('bannerUrl')?.value" alt="Banner" class="w-full h-full object-cover">
                  } @else {
                    <div class="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 flex items-center justify-center">
                      <span class="text-xs text-slate-500">\u0644\u0627 \u064A\u0648\u062C\u062F \u0628\u0627\u0646\u0631 / No Banner</span>
                    </div>
                  }
                  <button
                    type="button"
                    (click)="bannerFileInput.click()"
                    class="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                    <span class="flex items-center gap-2 text-white text-xs font-bold font-cairo bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700 backdrop-blur-sm">
                      @if (isUploadingBanner()) {
                        \u062C\u0627\u0631\u064A \u0627\u0644\u0631\u0641\u0639...
                      } @else {
                        \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0628\u0627\u0646\u0631 / Change Banner
                      }
                    </span>
                  </button>
                  <input #bannerFileInput type="file" (change)="onBannerFileSelected($event)" accept="image/*" class="hidden">
                </div>
              </div>

              <!-- Logo upload & profile name -->
              <div class="flex items-end gap-4">
                <div class="w-24 h-24 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden relative group shadow-xl shrink-0">
                  @if (profileForm.get('logoUrl')?.value) {
                    <img [src]="profileForm.get('logoUrl')?.value" alt="Logo" class="w-full h-full object-cover">
                  } @else {
                    <span class="text-3xl font-extrabold text-slate-600 select-none">Logo</span>
                  }
                  <button
                    type="button"
                    (click)="logoFileInput.click()"
                    class="absolute inset-0 rounded-full bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                    <span class="text-white text-[10px] font-bold text-center">
                      @if (isUploadingLogo()) {
                        \u062C\u0627\u0631\u064A...
                      } @else {
                        \u062A\u063A\u064A\u064A\u0631 / Change
                      }
                    </span>
                  </button>
                  <input #logoFileInput type="file" (change)="onLogoFileSelected($event)" accept="image/*" class="hidden">
                </div>

                <div class="flex-1 space-y-4">
                  <div>
                    <label for="prof-name" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 / Company Name *</label>
                    <input
                      id="prof-name"
                      type="text"
                      formControlName="name"
                      class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Company Name">
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label for="prof-region" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">\u0627\u0644\u0645\u0646\u0637\u0642\u0629 / Region</label>
                  <input
                    id="prof-region"
                    type="text"
                    formControlName="region"
                    class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                    placeholder="e.g. Cairo, Riyadh">
                </div>
                <div>
                  <label for="prof-desc" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">\u0648\u0635\u0641 \u0627\u0644\u0634\u0631\u0643\u0629 / Company Description</label>
                  <textarea
                    id="prof-desc"
                    formControlName="companyDescription"
                    rows="3"
                    class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none"
                    placeholder="Write a brief overview..."></textarea>
                </div>
              </div>

              <div class="flex justify-end pt-2">
                <button
                  type="submit"
                  [disabled]="profileForm.invalid || isSavingProfile()"
                  class="px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-cairo font-bold">
                  \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A / Save Settings
                </button>
              </div>
            </form>
          </div>

          <!-- Project visibility switch -->
          <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 class="text-lg font-bold text-white font-cairo">\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062E\u0635\u0648\u0635\u064A\u0629 \u0648\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 / Project Visibility Settings</h3>
            <p class="text-xs text-slate-400 font-cairo">\u062D\u062F\u062F \u0645\u0627 \u0625\u0630\u0627 \u0643\u0627\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0633\u064A\u0638\u0647\u0631 \u0644\u0644\u0639\u0627\u0645\u0629 \u0641\u064A \u0645\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u0627\u062A \u0648\u0627\u0644\u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0639\u0627\u0645 \u0644\u0634\u0631\u0643\u062A\u0643 \u0623\u0645 \u0633\u064A\u0638\u0644 \u062E\u0627\u0635\u0627\u064B.</p>

            <form [formGroup]="projectSettingsForm" (ngSubmit)="onProjectSettingsSubmit()" class="space-y-4 overflow-y-auto min-h-0 pr-1 flex-1">
              <div class="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div class="space-y-0.5">
                  <label class="text-sm font-bold text-slate-200 font-cairo">\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0641\u064A \u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0639\u0627\u0645 / Show on Public Portfolio Gallery</label>
                  <p class="text-xs text-slate-500 font-cairo">\u0639\u0646\u062F \u0627\u0644\u062A\u0641\u0639\u064A\u0644\u060C \u0633\u064A\u062A\u0645 \u0625\u062A\u0627\u062D\u0629 \u0635\u0648\u0631 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0644\u0644\u0632\u0648\u0627\u0631 \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629.</p>
                </div>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="is-public-portfolio"
                    formControlName="isPublicPortfolio"
                    class="w-5 h-5 text-indigo-600 border-slate-700 bg-slate-950 rounded focus:ring-indigo-500 focus:ring-2 focus:ring-offset-slate-900 cursor-pointer">
                </div>
              </div>

              <div class="flex justify-end pt-2">
                <button
                  type="submit"
                  [disabled]="isSavingProjectSettings()"
                  class="px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-cairo font-bold">
                  \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629 / Update Visibility
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>


    <!-- Settle Petty Cash Modal -->
    @if (isSettleModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10">
          <div class="flex items-start justify-between mb-2">
            <div>
              <h3 class="text-xl font-bold text-white">{{ 'DETAILS.MODAL_SETTLE_TITLE' | translate }}</h3>
              <p class="text-xs text-slate-400 mt-1">{{ 'DETAILS.MODAL_SETTLE_SUBTITLE' | translate }}</p>
            </div>
            <button
              (click)="closeSettleModal()"
              class="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Voucher Info Card -->
          @if (activePettyCash()) {
            <div class="my-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div class="flex justify-between">
                <span class="text-slate-500">{{ 'DETAILS.INFO_ISSUED_TO' | translate }}</span>
                <span class="font-semibold">{{ activePettyCash()!.issuedTo || 'Staff' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">{{ 'DETAILS.INFO_ISSUED_AMOUNT' | translate }}</span>
                <span class="font-bold text-amber-400 font-mono">{{ activePettyCash()!.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">{{ 'DETAILS.INFO_REASON' | translate }}</span>
                <span class="font-semibold text-right max-w-[180px] truncate">{{ activePettyCash()!.reason }}</span>
              </div>
            </div>
          }

          <!-- Settle Errors -->
          @if (settleErrors().length > 0) {
            <div class="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-400 space-y-1">
              <span class="font-bold block mb-1">{{ 'DETAILS.SETTLE_FAILED' | translate }}</span>
              @for (err of settleErrors(); track err) {
                <div>\u2022 {{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="settleForm" (ngSubmit)="onSettleSubmit()" class="space-y-4 overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label for="spentAmount" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'DETAILS.INPUT_SPENT' | translate }} <span class="text-red-400">*</span>
              </label>
              <input
                id="spentAmount"
                type="number"
                formControlName="spentAmount"
                step="0.01"
                min="0"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                placeholder="0.00">
              @if (isSettleFieldInvalid('spentAmount')) {
                <span class="text-xs text-red-400 mt-1 block">
                  {{ 'DETAILS.INPUT_SPENT_ERR' | translate }}
                </span>
              }
            </div>

            <div>
              <label for="receiptDescription" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'DETAILS.INPUT_NOTES' | translate }} <span class="text-red-400">*</span>
              </label>
              <textarea
                id="receiptDescription"
                formControlName="receiptDescription"
                rows="3"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none"
                placeholder="\u0645\u062B\u0627\u0644: \u0634\u0631\u0627\u0621 \u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0644\u0644\u0645\u0648\u0642\u0639\u060C \u062D\u0648\u0627\u0641\u0632 \u0639\u0645\u0627\u0644\u060C \u0641\u0648\u0627\u062A\u064A\u0631 \u0646\u0642\u0644..."></textarea>
              @if (isSettleFieldInvalid('receiptDescription')) {
                <span class="text-xs text-red-400 mt-1 block">
                  {{ 'DETAILS.INPUT_NOTES_ERR' | translate }}
                </span>
              }
            </div>

            <div>
              <label for="expenseDate" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u0641\u0639\u0644\u064A <span class="text-red-400">*</span>
              </label>
              <div class="relative">
                <input
                  id="expenseDate"
                  type="text"
                  [value]="formatDisplayDate(settleForm.get('expenseDate')?.value)"
                  (input)="onDateInputChanged($event, 'expenseDate', settleForm)"
                  placeholder="DD/MM/YYYY"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 font-mono pr-10">
                <input
                  #expenseDatePicker
                  type="date"
                  [value]="settleForm.get('expenseDate')?.value"
                  (change)="onNativeDatePicked($event, 'expenseDate', settleForm)"
                  class="sr-only opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                  style="clip: rect(0,0,0,0);">
                <button
                  type="button"
                  (click)="openDatePicker(expenseDatePicker)"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer z-20">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              @if (isSettleFieldInvalid('expenseDate')) {
                <span class="text-xs text-red-400 mt-1 block">Expense Date is required.</span>
              }
            </div>

            <div>
              <label for="settlementPaymentMethod" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Payment Method / \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639 <span class="text-red-400">*</span>
              </label>
              <select
                id="settlementPaymentMethod"
                formControlName="settlementPaymentMethod"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                <option [ngValue]="null" disabled>Select Method</option>
                <option value="Cash">\u0643\u0627\u0634 (Cash)</option>
                <option value="InstaPay">\u0625\u0646\u0633\u062A\u0627 \u0628\u0627\u064A (InstaPay)</option>
                <option value="BankTransfer">\u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u0643\u064A (Bank Transfer)</option>
                <option value="Cheque">\u0634\u064A\u0643 (Cheque)</option>
              </select>
              @if (isSettleFieldInvalid('settlementPaymentMethod')) {
                <span class="text-xs text-red-400 mt-1 block">
                  Payment Method is required.
                </span>
              }
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                \u0625\u0631\u0641\u0627\u0642 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 / \u0625\u064A\u0635\u0627\u0644 \u0627\u0644\u0635\u0631\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)
              </label>
              <input
                type="file"
                (change)="onSettleReceiptSelected($event)"
                accept="image/*,application/pdf"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer">
              @if (isUploadingSettleReceipt()) {
                <span class="text-xs text-indigo-400 mt-1 flex items-center gap-2">
                  <svg class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading receipt...
                </span>
              }
            </div>

            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                (click)="closeSettleModal()"
                class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer">
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button
                type="submit"
                [disabled]="settleForm.invalid || isSettling()"
                class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                @if (isSettling()) {
                  <span class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ 'DETAILS.PROCESSING' | translate }}
                  </span>
                } @else {
                  \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062A\u0633\u0648\u064A\u0629
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Request Petty Cash Modal -->
    @if (isRequestModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10">
          <div class="flex items-start justify-between mb-2">
            <div>
              <h3 class="text-xl font-bold text-white">{{ 'DETAILS.MODAL_REQUEST_TITLE' | translate }}</h3>
              <p class="text-xs text-slate-400 mt-1">{{ 'DETAILS.MODAL_REQUEST_SUBTITLE' | translate }}</p>
            </div>
            <button
              (click)="closeRequestModal()"
              class="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Request Errors -->
          @if (requestErrors().length > 0) {
            <div class="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-400 space-y-1">
              <span class="font-bold block mb-1">{{ 'DETAILS.REQUEST_FAILED' | translate }}</span>
              @for (err of requestErrors(); track err) {
                <div>\u2022 {{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="requestForm" (ngSubmit)="onRequestSubmit()" class="space-y-4 overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label for="req-amount" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'DETAILS.INPUT_AMOUNT' | translate }} <span class="text-red-400">*</span>
              </label>
              <input
                id="req-amount"
                type="number"
                formControlName="amount"
                step="0.01"
                min="0.01"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                placeholder="0.00">
              @if (isRequestFieldInvalid('amount')) {
                <span class="text-xs text-red-400 mt-1 block">
                  {{ 'DETAILS.INPUT_AMOUNT_ERR' | translate }}
                </span>
              }
              @if (requestForm.get('amount')?.hasError('insufficientBalance')) {
                <span class="text-xs text-red-400 mt-1 block font-cairo">
                  \u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0644\u0644\u0639\u0647\u062F\u0629 \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u062D \u0641\u064A \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0645\u062D\u062F\u062F! / The requested amount exceeds the available balance!
                </span>
              }

            </div>

            <div>
              <label for="req-reason" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'DETAILS.INPUT_REASON' | translate }} <span class="text-red-400">*</span>
              </label>
              <textarea
                id="req-reason"
                formControlName="reason"
                rows="3"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none"
                placeholder="e.g. Scaffolding rental or site supplies purchase."></textarea>
              @if (isRequestFieldInvalid('reason')) {
                <span class="text-xs text-red-400 mt-1 block">
                  {{ 'DETAILS.INPUT_REASON_ERR' | translate }}
                </span>
              }
            </div>

            @if (isTenantOwner()) {
              <div>
                <label for="req-source" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Disburse From Pool <span class="text-red-400">*</span>
                </label>
                <select
                  id="req-source"
                  formControlName="sourcePoolId"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                  <option [ngValue]="null" disabled>Select funding source...</option>
                  @for (pool of cashPools(); track pool.id) {
                    <option [value]="pool.id">{{ 'FINANCE.' + getPoolSourceTranslationKey(pool.sourceType) | translate }} ({{ 'DETAILS.BAL_PREFIX' | translate }}: {{ pool.availableBalance | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }})</option>
                  }
                </select>
                @if (isRequestFieldInvalid('sourcePoolId')) {
                  <span class="text-xs text-red-400 mt-1 block">Please select a funding source pool.</span>
                }
              </div>
            }

            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                (click)="closeRequestModal()"
                class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer">
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button
                type="submit"
                [disabled]="requestForm.invalid || isRequesting()"
                class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                @if (isRequesting()) {
                  <span class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ 'DETAILS.BTN_SUBMITTING' | translate }}
                  </span>
                } @else {
                  {{ 'DETAILS.BTN_REQUEST_SUBMIT' | translate }}
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Inject Capital Modal -->
    @if (isInjectModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 !overflow-hidden box-border deposit-modal-container scrollbar-none" style="overflow: hidden !important;">
          <div class="flex justify-between items-center mb-6 shrink-0">
            <h3 class="text-xl font-bold text-white font-cairo">{{ 'DETAILS.INJECT_CAPITAL' | translate }}</h3>
            <button (click)="closeInjectModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          @if (injectErrors().length > 0) {
            <div class="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 mb-4 shrink-0">
              <ul class="list-disc list-inside text-xs text-rose-400">
                @for (error of injectErrors(); track error) {
                  <li>{{ error }}</li>
                }
              </ul>
            </div>
          }

          <form [formGroup]="injectForm" (ngSubmit)="submitCapitalInjection()" class="space-y-5 font-sans !overflow-x-hidden !overflow-y-hidden deposit-modal-body min-h-0 pr-1 pb-2 flex-1 box-border scrollbar-none" style="overflow-x: hidden !important; overflow-y: hidden !important;">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'FINANCE.AMOUNT' | translate }} <span class="text-red-400">*</span>
              </label>
              <input
                type="number"
                formControlName="amount"
                step="0.01"
                min="0.01"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 font-mono"
                placeholder="0.00">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'FINANCE.SOURCE_TYPE' | translate }} <span class="text-red-400">*</span>
              </label>
              <select
                formControlName="sourceType"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                <option [ngValue]="null" disabled>{{ 'FINANCE.SELECT_SOURCE' | translate }}</option>
                <option value="ClientDeposit">{{ 'FINANCE.CLIENT_DEPOSIT' | translate }}</option>
                <option value="OwnerCapital">{{ 'FINANCE.OWNER_CAPITAL' | translate }}</option>
                <option value="ExternalLoan">{{ 'FINANCE.EXTERNAL_LOAN' | translate }}</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Payment Date <span class="text-red-400">*</span>
                </label>
                <div class="relative">
                  <input
                    type="text"
                    [value]="formatDisplayDate(injectForm.get('paymentDate')?.value)"
                    (input)="onDateInputChanged($event, 'paymentDate', injectForm)"
                    placeholder="DD/MM/YYYY"
                    class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 font-mono pr-10">
                  <input
                    #injectDatePicker
                    type="date"
                    [value]="injectForm.get('paymentDate')?.value"
                    (change)="onNativeDatePicked($event, 'paymentDate', injectForm)"
                    class="sr-only opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                    style="clip: rect(0,0,0,0);">
                  <button
                    type="button"
                    (click)="openDatePicker(injectDatePicker)"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer z-20">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Payment Method <span class="text-red-400">*</span>
                </label>
                <select
                  formControlName="paymentMethod"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                  <option [ngValue]="null" disabled>Select Method</option>
                  <option value="Cash">Cash</option>
                  <option value="BankTransfer">Bank Transfer</option>
                  <option value="InstaPay">InstaPay</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'FINANCE.NOTES_REFERENCE' | translate }} <span class="text-red-400">*</span>
              </label>
              <textarea
                formControlName="description"
                rows="2"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none"
                placeholder="e.g. Received check #12345 from Client"></textarea>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Receipt / Proof of Payment <span class="text-xs font-normal text-slate-500">(Optional)</span>
              </label>
              <input 
                type="file" 
                accept="image/*" 
                (change)="onInjectReceiptSelected($event)" 
                class="w-full text-slate-200 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-slate-800 file:text-indigo-400 hover:file:bg-slate-700 cursor-pointer">
            </div>

            <div class="flex justify-end gap-3 pt-4 pb-1 mb-1">
              <button
                type="button"
                (click)="closeInjectModal()"
                class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer font-cairo focus:outline-none focus:ring-0">
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button
                type="submit"
                [disabled]="injectForm.invalid || isInjecting()"
                class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-0 cursor-pointer font-cairo shadow-lg shadow-indigo-600/20 box-border">
                @if (isInjecting()) {
                  {{ 'COMMON.LOADING' | translate }}
                } @else {
                  {{ 'DETAILS.INJECT_CAPITAL' | translate }}
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Edit Petty Cash Modal -->
    @if (isEditPettyCashModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0639\u0647\u062F\u0629 \u0627\u0644\u0646\u0642\u062F\u064A\u0629 (Edit Petty Cash)</h3>
            <button (click)="closeEditPettyCashModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form [formGroup]="editPettyCashForm" (ngSubmit)="submitEditPettyCash()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Amount / \u0627\u0644\u0645\u0628\u0644\u063A</label>
              <input type="number" formControlName="amount" step="0.01" min="0.01" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Category / \u0627\u0644\u062A\u0635\u0646\u064A\u0641</label>
              <select formControlName="category" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
                <option value="Cement">Cement / \u0623\u0633\u0645\u0646\u062A</option>
                <option value="Logistics">Logistics / \u062E\u062F\u0645\u0627\u062A \u0644\u0648\u062C\u0633\u062A\u064A\u0629</option>
                <option value="Materials">Materials / \u0645\u0648\u0627\u062F \u0628\u0646\u0627\u0621</option>
                <option value="Labor">Labor / \u062D\u0648\u0627\u0641\u0632 \u0648\u0623\u062C\u0648\u0631 \u0639\u0645\u0627\u0644</option>
                <option value="Other">Other / \u0623\u062E\u0631\u0649</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Reason / \u0627\u0644\u0633\u0628\u0628</label>
              <textarea formControlName="reason" rows="3" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm resize-none"></textarea>
            </div>
            <div class="flex justify-end gap-3 pt-4">
              <button type="button" (click)="closeEditPettyCashModal()" class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 bg-slate-950 border border-slate-800 font-cairo">\u0625\u0644\u063A\u0627\u0621</button>
              <button type="submit" [disabled]="editPettyCashForm.invalid || isEditingPettyCash()" class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 font-cairo">\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A</button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Edit Transaction Modal -->
    @if (isEditTransactionModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 (Edit Transaction)</h3>
            <button (click)="closeEditTransactionModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form [formGroup]="editTransactionForm" (ngSubmit)="submitEditTransaction()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Amount / \u0627\u0644\u0645\u0628\u0644\u063A</label>
              <input type="number" formControlName="amount" step="0.01" min="0.01" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Description / \u0627\u0644\u0648\u0635\u0641</label>
              <textarea formControlName="description" rows="3" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm resize-none"></textarea>
            </div>
            <div class="flex justify-end gap-3 pt-4">
              <button type="button" (click)="closeEditTransactionModal()" class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 bg-slate-950 border border-slate-800 font-cairo">\u0625\u0644\u063A\u0627\u0621</button>
              <button type="submit" [disabled]="editTransactionForm.invalid || isSavingTransaction()" class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 font-cairo">\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A</button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Revise Budget Modal -->
    @if (isReviseBudgetModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">\u062A\u0639\u062F\u064A\u0644 \u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 (Revise Budget)</h3>
            <button (click)="closeReviseBudgetModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form [formGroup]="reviseBudgetForm" (ngSubmit)="submitReviseBudget()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">New Budget / \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 <span class="text-red-400">*</span></label>
              <input type="number" formControlName="newBudget" step="0.01" min="0.01" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Reason / \u0633\u0628\u0628 \u0627\u0644\u062A\u063A\u064A\u064A\u0631 <span class="text-red-400">*</span></label>
              <textarea formControlName="reasonForChange" rows="3" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm resize-none" placeholder="e.g. Scope revision or cost adjustment..."></textarea>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">BOQ Document / \u062C\u062F\u0648\u0644 \u0627\u0644\u0643\u0645\u064A\u0627\u062A (PDF, Excel) <span class="text-xs font-normal text-slate-500">(Optional)</span></label>
              <input type="file" accept=".pdf,.xlsx,.xls,image/*" (change)="onBoqFileSelected($event)" class="w-full text-slate-200 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-slate-800 file:text-indigo-400 hover:file:bg-slate-700 cursor-pointer">
              @if (isUploadingBoq()) {
                <span class="text-xs text-indigo-400 mt-1 flex items-center gap-2 font-cairo">
                  <svg class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading BOQ document...
                </span>
              }
            </div>
            <div class="flex justify-end gap-3 pt-4">
              <button type="button" (click)="closeReviseBudgetModal()" class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 bg-slate-950 border border-slate-800 font-cairo">\u0625\u0644\u063A\u0627\u0621</button>
              <button type="submit" [disabled]="reviseBudgetForm.invalid || isRevisingBudget() || isUploadingBoq()" class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 font-cairo">
                @if (isRevisingBudget()) {
                  {{ 'COMMON.LOADING' | translate }}
                } @else {
                  \u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Direct Disbursement Modal -->
    @if (isDisburseModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">\u062A\u0639\u0632\u064A\u0632 \u0639\u0647\u062F\u0629 \u0645\u0628\u0627\u0634\u0631 / Direct Disbursement</h3>
            <button (click)="closeDisburseModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          @if (disburseErrors().length > 0) {
            <div class="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold">
              @for (err of disburseErrors(); track err) {
                <div>{{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="disburseForm" (ngSubmit)="onDisburseSubmit()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">\u0627\u0644\u0645\u0647\u0646\u062F\u0633 / Engineer <span class="text-slate-500 text-[10px] normal-case">(\u0627\u062E\u062A\u064A\u0627\u0631\u064A \u2014 \u0625\u0630\u0627 \u0641\u0627\u0631\u063A\u060C \u0633\u062A\u064F\u0633\u062C\u0644 \u0627\u0644\u0639\u0647\u062F\u0629 \u0644\u062D\u0633\u0627\u0628\u0643)</span></label>
              <select formControlName="userId" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
                <option [ngValue]="null">-- \u0644\u0646\u0641\u0633\u064A (\u0627\u0644\u0623\u062F\u0645\u0646 \u0627\u0644\u062D\u0627\u0644\u064A) / Self --</option>
                @for (u of usersList(); track u.id) {
                  <option [value]="u.id">{{ u.firstName }} {{ u.lastName }} ({{ u.role }})</option>
                }
              </select>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">\u0627\u0644\u0645\u0628\u0644\u063A / Amount <span class="text-red-400">*</span></label>
                <input type="number" formControlName="amount" step="0.01" min="0.01" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639 / Payment Method <span class="text-red-400">*</span></label>
                <select formControlName="paymentMethod" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
                  <option value="Cash">Cash / \u0646\u0642\u062F\u064A</option>
                  <option value="BankTransfer">Bank Transfer / \u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u0643\u064A</option>
                  <option value="InstaPay">InstaPay</option>
                  <option value="Cheque">Cheque / \u0634\u064A\u0643</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">\u0645\u0635\u062F\u0631 \u0627\u0644\u062A\u0645\u0648\u064A\u0644 / Fund Pool <span class="text-red-400">*</span></label>
              <select formControlName="sourcePoolId" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
                <option [ngValue]="null" disabled>\u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0646\u062F\u0648\u0642 / Select Pool</option>
                @for (pool of cashPools(); track pool.id) {
                  <option [value]="pool.id">{{ pool.sourceType }} ({{ pool.availableBalance }} EGP)</option>
                }
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">\u0627\u0644\u0628\u064A\u0627\u0646 / Notes <span class="text-red-400">*</span></label>
              <textarea formControlName="description" rows="2" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm resize-none"></textarea>
            </div>

            <div class="flex justify-end gap-3 pt-4">
              <button type="button" (click)="closeDisburseModal()" class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 bg-slate-950 border border-slate-800 font-cairo">\u0625\u0644\u063A\u0627\u0621</button>
              <button type="submit" [disabled]="disburseForm.invalid || isDisbursing()" class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 font-cairo">
                @if (isDisbursing()) {
                  \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0648\u064A\u0644...
                } @else {
                  \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062A\u062D\u0648\u064A\u0644
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Settlement Modal -->
    @if (isSettlementModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div (click)="closeSettlementModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-3xl mx-auto max-h-[92vh] flex flex-col overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h3 class="text-xl font-bold text-white font-cairo">\u062A\u0633\u0648\u064A\u0629 \u0639\u0647\u062F\u0629 / Settlement Voucher</h3>
              <p class="text-xs text-slate-400 font-cairo mt-1">
                \u0627\u0644\u0639\u0647\u062F \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0627\u0644\u0635\u0627\u062F\u0631\u0629: <span class="text-amber-400 font-bold font-mono">{{ selectedPettyCashForSettlement()?.amount }} EGP</span> |
                \u0628\u064A\u0627\u0646: <span class="text-slate-200">{{ selectedPettyCashForSettlement()?.reason }}</span>
              </p>
            </div>
            <button (click)="closeSettlementModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          @if (settlementErrors().length > 0) {
            <div class="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold">
              @for (err of settlementErrors(); track err) {
                <div>{{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="settlementForm" class="flex flex-col flex-1 min-h-0 space-y-4 font-sans">
            <!-- Scrollable Content Area -->
            <div class="flex-1 overflow-y-auto min-h-0 pr-1 space-y-4">
            <div class="flex justify-between items-center border-b border-slate-800 pb-3">
              <span class="text-sm text-slate-400 font-cairo">\u0628\u0646\u0648\u062F \u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631 \u0648\u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A / Invoice Line Items</span>
              @if (!isSettlementLocked()) {
                <button type="button" (click)="addSettlementLine()" class="px-3 py-1 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-400 border border-indigo-500/20 text-xs font-bold rounded-lg font-cairo flex items-center gap-1 cursor-pointer">
                  + \u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F / Add Line
                </button>
              }
            </div>

            <!-- Remaining Custody Live Summary Card -->
            <div class="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
              <div>
                <span class="text-xs font-bold text-slate-400 block font-cairo">\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062A\u0628\u0642\u064A \u0645\u0646 \u0627\u0644\u0639\u0647\u062F\u0629 / Remaining Custody</span>
                <span class="text-2xl font-black text-emerald-400 font-mono tracking-wide mt-1 block">
                  {{ selectedPettyCashForSettlement()!.amount - calculateSettlementTotal() }} EGP
                </span>
              </div>
              <div class="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold font-cairo self-start sm:self-center">
                \u0625\u0635\u062F\u0627\u0631 \u0639\u0647\u062F\u0629 \u0628\u0642\u064A\u0645\u0629: {{ selectedPettyCashForSettlement()?.amount }} EGP
              </div>
            </div>

            <!-- Cards-based FormArray List -->
            <div formArrayName="lines" class="space-y-4">
              @for (line of settlementLines.controls; track line; let idx = $index) {
                <div [formGroupName]="idx" class="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 relative hover:border-slate-700/60 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_15px_rgba(99,102,241,0.05)] transition-all duration-200">
                  <div class="flex justify-between items-center pb-2 border-b border-slate-800/80">
                    <span class="text-xs font-bold text-indigo-400 font-cairo bg-indigo-500/10 px-2.5 py-1 rounded-lg">\u0627\u0644\u0628\u0646\u062F #{{ idx + 1 }} / Item #{{ idx + 1 }}</span>
                    <div class="flex items-center gap-2">
                      @if (!isSettlementLocked()) {
                        <button type="button" (click)="onSettlementSubmit(true)" [disabled]="line.invalid || isSubmittingSettlement()" class="px-2.5 py-1 rounded-xl text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 disabled:opacity-50 transition-all font-cairo cursor-pointer" title="\u062D\u0641\u0638 \u0647\u0630\u0627 \u0627\u0644\u0628\u0646\u062F \u0643\u0645\u0633\u0648\u062F\u0629 / Save this item draft">
                          \u{1F4BE} \u062D\u0641\u0638 \u0627\u0644\u0628\u0646\u062F / Save Item
                        </button>
                        <button type="button" (click)="removeSettlementLine(idx)" class="text-slate-500 hover:text-rose-400 p-1.5 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer" title="Remove Item" [disabled]="settlementLines.length === 1">
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      }
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-[11px] font-bold text-slate-400 mb-1.5 font-cairo">\u0627\u0644\u062A\u0635\u0646\u064A\u0641 / Category</label>
                      <select formControlName="category" class="w-full px-3 py-2 border border-slate-800 bg-slate-950 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:outline-none transition-all">
                        <option value="Cement">Cement / \u0623\u0633\u0645\u0646\u062A</option>
                        <option value="Logistics">Logistics / \u062E\u062F\u0645\u0627\u062A \u0644\u0648\u062C\u0633\u062A\u064A\u0629</option>
                        <option value="Materials">Materials / \u0645\u0648\u0627\u062F \u0628\u0646\u0627\u0621</option>
                        <option value="Labor">Labor / \u062D\u0648\u0627\u0641\u0632 \u0648\u0623\u062C\u0648\u0631 \u0639\u0645\u0627\u0644</option>
                        <option value="Other">Other / \u0623\u062E\u0631\u0649</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-[11px] font-bold text-slate-400 mb-1.5 font-cairo">\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0635\u0631\u0648\u0641 / Amount</label>
                      <input type="number" formControlName="amount" class="w-full px-3 py-2 border border-slate-800 bg-slate-950 rounded-xl text-slate-200 text-xs font-mono focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:outline-none transition-all">
                    </div>
                    <div>
                      <label class="block text-[11px] font-bold text-slate-400 mb-1.5 font-cairo">\u0625\u064A\u0635\u0627\u0644 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 / Invoice Receipt</label>
                      <div class="flex items-center gap-3">
                        <div class="relative flex-1">
                          <input type="file" 
                          accept="image/*,application/pdf,.xlsx,.xls"
                          [disabled]="isSettlementLocked()" 
                          (change)="onSettlementLineFileSelected($event, idx)" 
                          class="w-full text-slate-400 text-[11px] file:mr-2 file:py-1.5 file:px-2.5 file:rounded-xl file:border-0 file:text-[10px] file:bg-slate-800 file:text-indigo-400 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                          @if (line.get('uploading')?.value) {
                            <span class="text-[10px] text-indigo-400 animate-pulse mt-1 block">Uploading...</span>
                          }
                        </div>
                        
                        <!-- Thumbnail Preview -->
                        @if (line.get('localPreviewUrl')?.value) {
                          <div (click)="activePreviewPhotoUrl.set(line.get('localPreviewUrl')?.value)" class="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform group shadow-md" title="View Full Receipt">
                            <img [src]="line.get('localPreviewUrl')?.value" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="block text-[11px] font-bold text-slate-400 mb-1.5 font-cairo">\u0627\u0644\u0628\u064A\u0627\u0646 / Description</label>
                    <input type="text" formControlName="description" placeholder="\u0627\u0644\u0648\u0635\u0641 \u0623\u0648 \u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629..." class="w-full px-3 py-2 border border-slate-800 bg-slate-950 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:outline-none transition-all">
                  </div>
                </div>
              }
            </div>

            <!-- Ledger summary & Net calculation -->
            <div class="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
              <div class="flex justify-between text-xs text-slate-400 font-cairo">
                <span>\u0625\u062C\u0645\u0627\u0644\u064A \u0645\u0628\u0644\u063A \u0627\u0644\u0639\u0647\u062F\u0629 \u0627\u0644\u0623\u0635\u0644\u064A:</span>
                <span class="font-mono font-semibold text-slate-300">{{ selectedPettyCashForSettlement()?.amount }} EGP</span>
              </div>
              <div class="flex justify-between text-xs text-slate-400 font-cairo">
                <span>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0629 \u0628\u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631:</span>
                <span class="font-mono font-semibold text-amber-400">{{ calculateSettlementTotal() }} EGP</span>
              </div>
              <div class="border-t border-slate-800/80 pt-2 flex justify-between text-sm font-bold font-cairo">
                @if (selectedPettyCashForSettlement()!.amount - calculateSettlementTotal() > 0) {
                  <span class="text-emerald-400">\u0645\u062A\u0628\u0642\u064A \u064A\u062C\u0628 \u0625\u0631\u062C\u0627\u0639\u0647 \u0644\u0644\u062E\u0632\u064A\u0646\u0629 (Net Refund to Treasury):</span>
                  <span class="text-emerald-400 font-mono">+{{ selectedPettyCashForSettlement()!.amount - calculateSettlementTotal() }} EGP</span>
                } @else if (selectedPettyCashForSettlement()!.amount - calculateSettlementTotal() < 0) {
                  <span class="text-rose-400">\u0645\u0633\u062A\u062D\u0642 \u0644\u0644\u0645\u0647\u0646\u062F\u0633 (Due to Employee):</span>
                  <span class="text-rose-400 font-mono">{{ selectedPettyCashForSettlement()!.amount - calculateSettlementTotal() }} EGP</span>
                } @else {
                  <span class="text-slate-300">\u062A\u0633\u0648\u064A\u0629 \u0645\u062A\u0637\u0627\u0628\u0642\u0629 \u062A\u0645\u0627\u0645\u0627\u064B (Matched):</span>
                  <span class="text-slate-300 font-mono">0.00 EGP</span>
                }
              </div>
            </div>
            </div> <!-- End of Scrollable Content Area -->

            <div class="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-800">
              <button type="button" (click)="closeSettlementModal()" class="w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all font-cairo cursor-pointer">\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629 / Close</button>
              
              @if (!isSettlementLocked()) {
                <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button type="button" (click)="onSettlementSubmit(true)" [disabled]="settlementForm.invalid || isSubmittingSettlement()" class="w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-750 border border-slate-700 disabled:opacity-50 transition-all font-cairo cursor-pointer">
                    @if (isSubmittingSettlement()) {
                      \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...
                    } @else {
                      \u{1F4BE} \u062D\u0641\u0638 \u0627\u0644\u0643\u0644 \u0643\u0645\u0633\u0648\u062F\u0629 / Save All Draft
                    }
                  </button>

                  <button type="button" (click)="onSettlementSubmit(false)" [disabled]="settlementForm.invalid || isSubmittingSettlement()" class="w-full sm:w-auto px-5 py-2 text-sm font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] disabled:opacity-50 transition-all font-cairo cursor-pointer">
                    @if (isSubmittingSettlement()) {
                      \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0642\u062F\u064A\u0645...
                    } @else {
                      \u{1F680} \u062A\u0642\u062F\u064A\u0645 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629 / Submit for Review
                    }
                  </button>
                </div>
              }
            </div>

            <!-- Image Preview Lightbox Modal -->
            @if (activePreviewPhotoUrl()) {
              <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                <div (click)="activePreviewPhotoUrl.set(null)" class="absolute inset-0"></div>
                <div class="relative max-w-4xl max-h-[85vh] z-10">
                  <button (click)="activePreviewPhotoUrl.set(null)" class="absolute -top-12 right-0 text-white/80 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 p-2 rounded-full cursor-pointer transition-colors shadow-lg">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <img [src]="activePreviewPhotoUrl()" class="max-w-full max-h-[80vh] rounded-2xl object-contain border border-slate-750 shadow-2xl">
                </div>
              </div>
            }
          </form>
        </div>
      </div>
    }

    <!-- Hidden Print Layout -->
    @if (activePrintSettlement()) {
      <div class="print-only hidden print:block p-8 bg-white text-slate-900 font-sans leading-relaxed" dir="rtl">
        <!-- Report Header -->
        <div class="text-center border-b-2 border-slate-900 pb-4 mb-6">
          <h1 class="text-2xl font-extrabold font-cairo">\u062A\u0642\u0631\u064A\u0631 \u062A\u0633\u0648\u064A\u0629 \u0639\u0647\u062F\u0629 \u0645\u0634\u0631\u0648\u0639</h1>
          <h2 class="text-lg font-bold text-slate-600 font-cairo mt-1">\u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 / Osos</h2>
        </div>

        <!-- Project & Custody details -->
        <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <p><strong>\u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 / Project Name:</strong> {{ project()?.name }}</p>
            <p><strong>\u0635\u0627\u062D\u0628 \u0627\u0644\u0639\u0647\u062F\u0629 (\u0627\u0644\u0645\u0647\u0646\u062F\u0633) / Engineer:</strong> {{ activePrintSettlement()!.issuedTo }}</p>
            <p><strong>\u0633\u0628\u0628 \u0627\u0644\u0639\u0647\u062F\u0629 / Custody Reason:</strong> {{ activePrintSettlement()!.custodyReason }}</p>
          </div>
          <div class="text-left rtl:text-right">
            <p><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u062F\u064A\u0645 / Submitted At:</strong> {{ activePrintSettlement()!.submittedAt | date:'dd/MM/yyyy HH:mm' }}</p>
            <p><strong>\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0633\u0648\u064A\u0629 / Status:</strong> {{ activePrintSettlement()!.status }}</p>
            <p><strong>\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0648\u064A\u0629 / ID:</strong> {{ activePrintSettlement()!.id }}</p>
          </div>
        </div>

        <!-- Financial Summary -->
        <div class="bg-slate-100 p-4 rounded-xl mb-6 grid grid-cols-3 gap-4 text-center border border-slate-300">
          <div>
            <span class="text-xs text-slate-500 font-semibold block">\u0642\u064A\u0645\u0629 \u0627\u0644\u0639\u0647\u062F\u0629 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0629 / Custody Amount</span>
            <span class="text-lg font-bold font-mono">{{ activePrintSettlement()!.custodyAmount | number:'1.2-2' }} EGP</span>
          </div>
          <div>
            <span class="text-xs text-slate-500 font-semibold block">\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0635\u0631\u0648\u0641 \u0641\u0639\u0644\u064A\u0627\u064B / Spent Amount</span>
            <span class="text-lg font-bold font-mono text-amber-600">{{ activePrintSettlement()!.totalAmount | number:'1.2-2' }} EGP</span>
          </div>
          <div>
            <span class="text-xs text-slate-500 font-semibold block">\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0633\u062A\u062D\u0642 (\u0627\u0644\u0641\u0631\u0642) / Net Difference</span>
            <span class="text-lg font-bold font-mono" [class.text-emerald-600]="activePrintSettlement()!.netDifference > 0" [class.text-rose-600]="activePrintSettlement()!.netDifference < 0">
              {{ activePrintSettlement()!.netDifference | number:'1.2-2' }} EGP
            </span>
          </div>
        </div>

        <!-- Itemized Line Items -->
        <div class="mb-6">
          <h3 class="text-base font-bold mb-3 font-cairo">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0628\u0646\u0648\u062F \u0648\u0627\u0644\u0645\u0635\u0627\u0631\u064A\u0641 \u0627\u0644\u0641\u0631\u062F\u064A\u0629 / Itemized Expenses</h3>
          <table class="w-full text-right border-collapse text-sm">
            <thead>
              <tr class="border-b-2 border-slate-300 text-slate-700 font-bold">
                <th class="py-2 px-2">\u0627\u0644\u062A\u0635\u0646\u064A\u0641 / Category</th>
                <th class="py-2 px-2">\u0627\u0644\u0648\u0635\u0641 / Description</th>
                <th class="py-2 px-2 text-left rtl:text-right">\u0627\u0644\u0645\u0628\u0644\u063A / Amount</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              @for (line of activePrintSettlement()!.lines; track line.id) {
                <tr class="text-slate-800">
                  <td class="py-2 px-2 font-medium">{{ 'FINANCE.CATEGORY_' + line.category.toUpperCase() | translate }}</td>
                  <td class="py-2 px-2 text-slate-600">{{ line.description }}</td>
                  <td class="py-2 px-2 text-left rtl:text-right font-mono font-semibold">{{ line.amount | number:'1.2-2' }} EGP</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Verification Stamp -->
        <div class="mt-12 flex justify-between items-center text-xs text-slate-400 border-t border-slate-200 pt-6">
          <div>
            <p><strong>\u0627\u0644\u0645\u0631\u0627\u062C\u0639 / Approved By:</strong> {{ activePrintSettlement()!.resolvedBy || '\u2014' }}</p>
            <p><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F / Resolved At:</strong> {{ activePrintSettlement()!.resolvedAt ? (activePrintSettlement()!.resolvedAt | date:'dd/MM/yyyy HH:mm') : '\u2014' }}</p>
          </div>
          <div class="text-center p-3 border border-slate-300 rounded-xl bg-slate-50 min-w-[120px] text-slate-700 font-semibold font-mono">
            VERIFIED BY OSOS
          </div>
        </div>
      </div>
    }

    @if (profileSuccessMessage()) {
      <div class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-emerald-600 border border-emerald-500 text-white rounded-xl shadow-2xl font-cairo text-sm max-w-sm">
        <div class="p-1 bg-emerald-700 rounded-lg text-white shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span>{{ profileSuccessMessage() }}</span>
      </div>
    }

    <!-- Quick Inspection Modal for Truncated Text -->
    @if (activeTextInspection()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in font-sans">
        <div (click)="closeTextInspectionModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 p-5 sm:p-6 shadow-2xl z-10 transition-all">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-white font-cairo">{{ activeTextInspection()!.title }}</h3>
                @if (activeTextInspection()!.subtitle) {
                  <p class="text-xs text-slate-400 font-cairo mt-0.5">{{ activeTextInspection()!.subtitle }}</p>
                }
              </div>
            </div>
            <button (click)="closeTextInspectionModal()" class="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="overflow-y-auto min-h-0 pr-1 space-y-3 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-cairo bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 selection:bg-sky-500/30 selection:text-sky-200">
            {{ activeTextInspection()!.content }}
          </div>
          <div class="mt-4 pt-3 border-t border-slate-800 flex justify-end">
            <button (click)="closeTextInspectionModal()" class="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer font-cairo">
              \u0625\u063A\u0644\u0627\u0642 / Close
            </button>
          </div>
        </div>
      </div>
    }

    <!-- \u{1F5BC}\uFE0F FULLSCREEN LIGHTBOX VIEWER -->
    @if (isLightboxOpen() && lightboxPhotos().length > 0) {
      <div class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-fade-in">
        <div (click)="closeLightbox()" class="absolute inset-0 z-0"></div>

        <button 
          (click)="closeLightbox()" 
          class="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-slate-800 transition-all cursor-pointer shadow-2xl">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/20 text-white text-xs font-mono font-bold shadow-xl flex items-center gap-2 font-cairo">
          <span>\u{1F4F7}</span>
          <span>{{ activeLightboxIndex() + 1 }} / {{ lightboxPhotos().length }}</span>
        </div>

        <div class="relative z-10 max-w-5xl max-h-[85vh] flex items-center justify-center p-2">
          <img 
            [src]="lightboxPhotos()[activeLightboxIndex()]" 
            (error)="onImgError($event)" 
            alt="Site Photo Full View" 
            class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-slate-800 transition-all duration-200">
        </div>

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
  `
    }]
  }], null, { handleKeyboardEvent: [{
    type: HostListener,
    args: ["document:keydown", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectDetailsComponent, { className: "ProjectDetailsComponent", filePath: "src/app/features/dashboard/projects/project-details.component.ts", lineNumber: 2587 });
})();
export {
  ProjectDetailsComponent
};
//# sourceMappingURL=chunk-HDDXCJSJ.js.map
