import {
  FinancialService,
  PettyCashService
} from "./chunk-54BPY3KT.js";
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
  ImageUploadService
} from "./chunk-53BJWY4X.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  RequiredValidator,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-BKICS27Q.js";
import {
  TranslatePipe
} from "./chunk-P67FNHXX.js";
import {
  AuthService
} from "./chunk-S6E5JOGH.js";
import "./chunk-3XAG2D2P.js";
import "./chunk-EJQP67NP.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgIf
} from "./chunk-FIWEE23C.js";
import {
  Component,
  DestroyRef,
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
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-ODSQXAQU.js";

// src/app/features/dashboard/financials/financials.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function FinancialsComponent_Conditional_0_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 20)(2, "div", 21)(3, "div", 22);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 23);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 21)(11, "div", 22);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 24);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 21)(19, "div", 22);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 25);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "number");
    \u0275\u0275pipe(25, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 21)(27, "div", 22);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 26);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 15, "FINANCE.TOTAL_INCOME"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(8, 17, ctx_r1.totalIncome, "1.2-2"), " ", \u0275\u0275pipeBind1(9, 20, "COMMON.CURRENCY"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 22, "FINANCE.TOTAL_EXPENSES"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(16, 24, ctx_r1.totalExpenses, "1.2-2"), " ", \u0275\u0275pipeBind1(17, 27, "COMMON.CURRENCY"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(21, 29, "FINANCE.NET_BALANCE"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-emerald-400", ctx_r1.netBalance >= 0)("text-rose-400", ctx_r1.netBalance < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(24, 31, ctx_r1.netBalance, "1.2-2"), " ", \u0275\u0275pipeBind1(25, 34, "COMMON.CURRENCY"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(29, 36, "FINANCE.PENDING_PETTY_CASH"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.pendingPettyCashCount);
  }
}
function FinancialsComponent_Conditional_0_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r3 = ctx.$implicit;
    \u0275\u0275property("value", project_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(project_r3.name);
  }
}
function FinancialsComponent_Conditional_0_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPettyCashModal());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.isClosedProjectSelected());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, "FINANCE.REQUEST_PETTY_CASH"), " ");
  }
}
function FinancialsComponent_Conditional_0_div_22_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div")(2, "h3", 32);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 33);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 34)(8, "div", 35)(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275pipe(12, "number");
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 36);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 37);
    \u0275\u0275element(18, "div", 38);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const project_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    const budget_r6 = ctx_r1.getProjectBudget(project_r5);
    const spent_r7 = ctx_r1.projectExpenses().get(project_r5.id) || 0;
    const pct_r8 = ctx_r1.getProjectBurnRate(project_r5);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(project_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(6, 17, "PROJECTS.TABLE_CLIENT"), ": ", ctx_r1.getProjectClient(project_r5), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate3("", \u0275\u0275pipeBind2(11, 19, spent_r7, "1.0-0"), " / ", \u0275\u0275pipeBind2(12, 22, budget_r6, "1.0-0"), " ", \u0275\u0275pipeBind1(13, 25, "COMMON.CURRENCY"));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("text-rose-400", pct_r8 > 85)("text-indigo-400", pct_r8 <= 85);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(16, 27, pct_r8, "1.1-1"), "%");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", pct_r8, "%");
    \u0275\u0275classProp("bg-rose-500", pct_r8 > 85)("bg-indigo-600", pct_r8 <= 85);
  }
}
function FinancialsComponent_Conditional_0_div_22_ForEmpty_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "PROJECTS.NO_PROJECTS"), " ");
  }
}
function FinancialsComponent_Conditional_0_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "h2", 28);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 29);
    \u0275\u0275repeaterCreate(5, FinancialsComponent_Conditional_0_div_22_For_6_Template, 19, 30, "div", 30, _forTrack0, false, FinancialsComponent_Conditional_0_div_22_ForEmpty_7_Template, 3, 3, "div", 31);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "FINANCE.BURN_RATES"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.getFilteredProjects());
  }
}
function FinancialsComponent_Conditional_0_Conditional_23_For_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 48)(1, "td", 52);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 53);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 54);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 55);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_23_For_32_Template_td_click_9_listener() {
      const request_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openPendingApprovalReasonModal(request_r10));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 56);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 57)(15, "div", 58)(16, "button", 59);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_23_For_32_Template_button_click_16_listener() {
      const request_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openApproveModal(request_r10));
    });
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 60);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_23_For_32_Template_button_click_19_listener() {
      const request_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openRejectModal(request_r10));
    });
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const request_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r10.issuedTo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getProjectName(request_r10));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(7, 9, request_r10.amount, "1.2-2"), " ", \u0275\u0275pipeBind1(8, 12, "COMMON.CURRENCY"));
    \u0275\u0275advance(3);
    \u0275\u0275property("title", request_r10.reason);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", request_r10.reason, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 14, request_r10.issuedAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(18, 17, "FINANCE.APPROVE"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(21, 19, "FINANCE.REJECT"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_23_ForEmpty_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 61);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "FINANCE.NO_PENDING_APPROVALS"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_23_For_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50)(1, "div", 62)(2, "span", 63);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 64);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 65)(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 66);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p", 67);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_23_For_36_Template_p_click_14_listener() {
      const request_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openPendingApprovalReasonModal(request_r12));
    });
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 68)(17, "button", 69);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_23_For_36_Template_button_click_17_listener() {
      const request_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openApproveModal(request_r12));
    });
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 70);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_23_For_36_Template_button_click_20_listener() {
      const request_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openRejectModal(request_r12));
    });
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const request_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r12.issuedTo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(6, 8, request_r12.amount, "1.2-2"), " ", \u0275\u0275pipeBind1(7, 11, "COMMON.CURRENCY"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u{1F3D7}\uFE0F ", ctx_r1.getProjectName(request_r12));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 13, request_r12.issuedAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u{1F4AC} ", request_r12.reason, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 16, "FINANCE.APPROVE"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 18, "FINANCE.REJECT"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_23_ForEmpty_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "FINANCE.NO_PENDING_APPROVALS"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 39)(2, "h2", 40);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 41);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 42)(9, "table", 43)(10, "thead")(11, "tr", 44)(12, "th", 45);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 45);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 45);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th", 45);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th", 45);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th", 46);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "tbody", 47);
    \u0275\u0275repeaterCreate(31, FinancialsComponent_Conditional_0_Conditional_23_For_32_Template, 22, 21, "tr", 48, _forTrack0, false, FinancialsComponent_Conditional_0_Conditional_23_ForEmpty_33_Template, 4, 3, "tr");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 49);
    \u0275\u0275repeaterCreate(35, FinancialsComponent_Conditional_0_Conditional_23_For_36_Template, 23, 20, "div", 50, _forTrack0, false, FinancialsComponent_Conditional_0_Conditional_23_ForEmpty_37_Template, 3, 3, "div", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 11, "FINANCE.PENDING_APPROVALS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r1.pendingApprovals().length, " ", \u0275\u0275pipeBind1(7, 13, "FINANCE.PENDING"), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 15, "FINANCE.REQUESTER"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 17, "FINANCE.PROJECT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 19, "FINANCE.AMOUNT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 21, "FINANCE.REASON"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(26, 23, "FINANCE.DATE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(29, 25, "FINANCE.ACTIONS"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.pendingApprovals());
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.pendingApprovals());
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "FINANCE.PENDING"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Approved ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Rejected ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "FINANCE.SETTLED"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 81);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const request_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openSettleModal(request_r14));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "FINANCE.SUBMIT_RECEIPTS"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 78);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("title", request_r14.comments);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Reason: ", request_r14.comments);
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_21_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 82);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 85);
    \u0275\u0275element(2, "path", 86);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0625\u064A\u0635\u0627\u0644");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const request_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("href", request_r14.receiptPhotoUrl, \u0275\u0275sanitizeUrl);
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_21_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 83);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", request_r14.settlementPaymentMethod, " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_21_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, request_r14.expenseDate, "dd/MM/yyyy"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79);
    \u0275\u0275conditionalCreate(1, FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_21_Conditional_1_Template, 5, 1, "a", 82);
    \u0275\u0275conditionalCreate(2, FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_21_Conditional_2_Template, 2, 1, "span", 83);
    \u0275\u0275conditionalCreate(3, FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_21_Conditional_3_Template, 3, 4, "span", 84);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(request_r14.receiptPhotoUrl ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(request_r14.settlementPaymentMethod ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(request_r14.expenseDate ? 3 : -1);
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 80);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 48)(1, "td", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 73);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 55);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_24_For_28_Template_td_click_7_listener() {
      const request_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openMyPettyCashReasonModal(request_r14));
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 74);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 75)(13, "span", 76);
    \u0275\u0275conditionalCreate(14, FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_14_Template, 2, 3)(15, FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_15_Template, 1, 0)(16, FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_16_Template, 1, 0)(17, FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_17_Template, 2, 3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 75);
    \u0275\u0275conditionalCreate(19, FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_19_Template, 3, 3, "button", 77)(20, FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_20_Template, 2, 2, "span", 78)(21, FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_21_Template, 4, 3, "div", 79)(22, FinancialsComponent_Conditional_0_Conditional_24_For_28_Conditional_22_Template, 2, 0, "span", 80);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const request_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getProjectName(request_r14));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(5, 32, request_r14.amount, "1.2-2"), " ", \u0275\u0275pipeBind1(6, 35, "COMMON.CURRENCY"));
    \u0275\u0275advance(3);
    \u0275\u0275property("title", request_r14.reason);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", request_r14.reason, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 37, request_r14.issuedAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275classProp("bg-emerald-500/10", request_r14.status === "Settled")("text-emerald-400", request_r14.status === "Settled")("border-emerald-500/20", request_r14.status === "Settled")("bg-amber-500/10", request_r14.status === "Issued")("text-amber-400", request_r14.status === "Issued")("border-amber-500/20", request_r14.status === "Issued")("bg-blue-500/10", request_r14.status === "Pending")("text-blue-400", request_r14.status === "Pending")("border-blue-500/20", request_r14.status === "Pending")("bg-rose-500/10", request_r14.status === "Rejected")("text-rose-400", request_r14.status === "Rejected")("border-rose-500/20", request_r14.status === "Rejected");
    \u0275\u0275advance();
    \u0275\u0275conditional(request_r14.status === "Pending" ? 14 : request_r14.status === "Issued" ? 15 : request_r14.status === "Rejected" ? 16 : 17);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(request_r14.status === "Issued" ? 19 : request_r14.status === "Rejected" && request_r14.comments ? 20 : request_r14.status === "Settled" ? 21 : 22);
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_ForEmpty_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 61);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "FINANCE.NO_PETTY_CASH"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "h2", 28);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 71)(5, "table", 43)(6, "thead")(7, "tr", 44)(8, "th", 45);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 45);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 45);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 45);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 46);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 46);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "tbody", 47);
    \u0275\u0275repeaterCreate(27, FinancialsComponent_Conditional_0_Conditional_24_For_28_Template, 23, 40, "tr", 48, _forTrack0, false, FinancialsComponent_Conditional_0_Conditional_24_ForEmpty_29_Template, 4, 3, "tr");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 8, "FINANCE.MY_PETTY_CASH"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 10, "FINANCE.PROJECT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 12, "FINANCE.AMOUNT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 14, "FINANCE.REASON"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(19, 16, "FINANCE.DATE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 18, "FINANCE.STATUS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(25, 20, "FINANCE.ACTIONS"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.myPettyCash());
  }
}
function FinancialsComponent_Conditional_0_Conditional_25_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 46);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "FINANCE.ACTIONS"));
  }
}
function FinancialsComponent_Conditional_0_Conditional_25_For_23_Conditional_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 90);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 92);
    \u0275\u0275element(2, "path", 93);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u{1F512} \u0645\u0642\u0641\u0644\u0629 ");
    \u0275\u0275elementEnd();
  }
}
function FinancialsComponent_Conditional_0_Conditional_25_For_23_Conditional_15_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 91)(1, "button", 94);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_25_For_23_Conditional_15_Conditional_2_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r18);
      const transaction_r17 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openEditTransactionModal(transaction_r17));
    });
    \u0275\u0275text(2, " Edit ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 95);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_25_For_23_Conditional_15_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r18);
      const transaction_r17 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onDeleteTransaction(transaction_r17.id, ctx_r1.selectedProjectId()));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 85);
    \u0275\u0275element(5, "path", 96);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Delete ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.isDeletingTx());
  }
}
function FinancialsComponent_Conditional_0_Conditional_25_For_23_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 75);
    \u0275\u0275conditionalCreate(1, FinancialsComponent_Conditional_0_Conditional_25_For_23_Conditional_15_Conditional_1_Template, 4, 0, "span", 90)(2, FinancialsComponent_Conditional_0_Conditional_25_For_23_Conditional_15_Conditional_2_Template, 7, 1, "div", 91);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const transaction_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(transaction_r17.description.toLowerCase().startsWith("petty cash settlement -") ? 1 : 2);
  }
}
function FinancialsComponent_Conditional_0_Conditional_25_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 48)(1, "td", 56);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 88);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_25_For_23_Template_td_click_4_listener() {
      const transaction_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openTransactionInspectionModal(transaction_r17));
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 57)(7, "span", 76);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 89);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, FinancialsComponent_Conditional_0_Conditional_25_For_23_Conditional_15_Template, 3, 1, "td", 75);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const transaction_r17 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 24, transaction_r17.transactionDate, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", transaction_r17.description);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", transaction_r17.description, " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-emerald-500/10", transaction_r17.type === "Income")("text-emerald-400", transaction_r17.type === "Income")("border-emerald-500/20", transaction_r17.type === "Income")("bg-rose-500/10", transaction_r17.type === "Expense")("text-rose-400", transaction_r17.type === "Expense")("border-rose-500/20", transaction_r17.type === "Expense");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", transaction_r17.type === "Income" ? \u0275\u0275pipeBind1(9, 27, "FINANCE.INCOME") : \u0275\u0275pipeBind1(10, 29, "FINANCE.EXPENSE"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("text-emerald-400", transaction_r17.type === "Income")("text-rose-400", transaction_r17.type === "Expense");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", transaction_r17.type === "Income" ? "+" : "-", "", \u0275\u0275pipeBind2(13, 31, transaction_r17.amount, "1.2-2"), " ", \u0275\u0275pipeBind1(14, 34, "COMMON.CURRENCY"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.isOwnerOrAccountant() ? 15 : -1);
  }
}
function FinancialsComponent_Conditional_0_Conditional_25_ForEmpty_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 97);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "FINANCE.NO_TRANSACTIONS"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_25_For_27_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 102)(1, "button", 103);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_25_For_27_Conditional_16_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r21);
      const transaction_r20 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openEditTransactionModal(transaction_r20));
    });
    \u0275\u0275text(2, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 104);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_25_For_27_Conditional_16_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r21);
      const transaction_r20 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onDeleteTransaction(transaction_r20.id, ctx_r1.selectedProjectId()));
    });
    \u0275\u0275text(4, "Delete");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.isDeletingTx());
  }
}
function FinancialsComponent_Conditional_0_Conditional_25_For_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 87)(1, "div", 98)(2, "span", 76);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 99);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 100);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_25_For_27_Template_p_click_10_listener() {
      const transaction_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openTransactionInspectionModal(transaction_r20));
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 101)(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, FinancialsComponent_Conditional_0_Conditional_25_For_27_Conditional_16_Template, 5, 1, "div", 102);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const transaction_r20 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-emerald-500/10", transaction_r20.type === "Income")("text-emerald-400", transaction_r20.type === "Income")("border-emerald-500/20", transaction_r20.type === "Income")("bg-rose-500/10", transaction_r20.type === "Expense")("text-rose-400", transaction_r20.type === "Expense")("border-rose-500/20", transaction_r20.type === "Expense");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", transaction_r20.type === "Income" ? \u0275\u0275pipeBind1(4, 23, "FINANCE.INCOME") : \u0275\u0275pipeBind1(5, 25, "FINANCE.EXPENSE"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("text-emerald-400", transaction_r20.type === "Income")("text-rose-400", transaction_r20.type === "Expense");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", transaction_r20.type === "Income" ? "+" : "-", "", \u0275\u0275pipeBind2(8, 27, transaction_r20.amount, "1.2-2"), " ", \u0275\u0275pipeBind1(9, 30, "COMMON.CURRENCY"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", transaction_r20.description, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4C5} ", \u0275\u0275pipeBind2(15, 32, transaction_r20.transactionDate, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isOwnerOrAccountant() && !transaction_r20.description.toLowerCase().startsWith("petty cash settlement -") ? 16 : -1);
  }
}
function FinancialsComponent_Conditional_0_Conditional_25_ForEmpty_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "FINANCE.NO_TRANSACTIONS"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "h2", 28);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 42)(5, "table", 43)(6, "thead")(7, "tr", 44)(8, "th", 45);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 45);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 45);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 46);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, FinancialsComponent_Conditional_0_Conditional_25_Conditional_20_Template, 3, 3, "th", 46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "tbody", 47);
    \u0275\u0275repeaterCreate(22, FinancialsComponent_Conditional_0_Conditional_25_For_23_Template, 16, 36, "tr", 48, _forTrack0, false, FinancialsComponent_Conditional_0_Conditional_25_ForEmpty_24_Template, 4, 3, "tr");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 49);
    \u0275\u0275repeaterCreate(26, FinancialsComponent_Conditional_0_Conditional_25_For_27_Template, 17, 35, "div", 87, _forTrack0, false, FinancialsComponent_Conditional_0_Conditional_25_ForEmpty_28_Template, 3, 3, "div", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 8, "FINANCE.TRANSACTIONS"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 10, "FINANCE.DATE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 12, "FINANCE.DESCRIPTION"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 14, "FINANCE.TYPE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(19, 16, "FINANCE.AMOUNT"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isOwnerOrAccountant() ? 20 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.transactions());
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.transactions());
  }
}
function FinancialsComponent_Conditional_0_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "button", 105);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_26_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPettyCashModal());
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isClosedProjectSelected());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2795 ", \u0275\u0275pipeBind1(3, 2, "FINANCE.REQUEST_PETTY_CASH"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_27_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r24 = ctx.$implicit;
    \u0275\u0275property("value", project_r24.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(project_r24.name);
  }
}
function FinancialsComponent_Conditional_0_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 106);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_27_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closePettyCashModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 107)(3, "div", 39)(4, "h3", 40);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 108);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_27_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closePettyCashModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 109);
    \u0275\u0275element(9, "path", 110);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "form", 111);
    \u0275\u0275listener("ngSubmit", function FinancialsComponent_Conditional_0_Conditional_27_Template_form_ngSubmit_10_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitPettyCashRequest());
    });
    \u0275\u0275elementStart(11, "div")(12, "label", 112);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 113);
    \u0275\u0275twoWayListener("ngModelChange", function FinancialsComponent_Conditional_0_Conditional_27_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.pettyCashForm.projectId, $event) || (ctx_r1.pettyCashForm.projectId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(16, "option", 12);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(19, FinancialsComponent_Conditional_0_Conditional_27_For_20_Template, 2, 2, "option", 13, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div")(22, "label", 112);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 114);
    \u0275\u0275twoWayListener("ngModelChange", function FinancialsComponent_Conditional_0_Conditional_27_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.pettyCashForm.amount, $event) || (ctx_r1.pettyCashForm.amount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div")(27, "label", 112);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "select", 115);
    \u0275\u0275twoWayListener("ngModelChange", function FinancialsComponent_Conditional_0_Conditional_27_Template_select_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.pettyCashForm.category, $event) || (ctx_r1.pettyCashForm.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(31, "option", 12);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "option", 116);
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 117);
    \u0275\u0275text(38);
    \u0275\u0275pipe(39, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "option", 118);
    \u0275\u0275text(41);
    \u0275\u0275pipe(42, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "option", 119);
    \u0275\u0275text(44);
    \u0275\u0275pipe(45, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "option", 120);
    \u0275\u0275text(47);
    \u0275\u0275pipe(48, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div")(50, "label", 112);
    \u0275\u0275text(51);
    \u0275\u0275pipe(52, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "textarea", 121);
    \u0275\u0275twoWayListener("ngModelChange", function FinancialsComponent_Conditional_0_Conditional_27_Template_textarea_ngModelChange_53_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.pettyCashForm.reason, $event) || (ctx_r1.pettyCashForm.reason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 122)(55, "button", 123);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_27_Template_button_click_55_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closePettyCashModal());
    });
    \u0275\u0275text(56);
    \u0275\u0275pipe(57, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "button", 124);
    \u0275\u0275text(59);
    \u0275\u0275pipe(60, "translate");
    \u0275\u0275pipe(61, "translate");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 19, "FINANCE.REQUEST_PETTY_CASH"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 21, "FINANCE.PROJECT"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.pettyCashForm.projectId);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 23, "FINANCE.SELECT_PROJECT"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.projects());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(24, 25, "FINANCE.AMOUNT"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.pettyCashForm.amount);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(29, 27, "FINANCE.CATEGORY"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.pettyCashForm.category);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(33, 29, "FINANCE.SELECT_CATEGORY"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(36, 31, "FINANCE.CATEGORY_CEMENT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(39, 33, "FINANCE.CATEGORY_LOGISTICS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(42, 35, "FINANCE.CATEGORY_MATERIALS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(45, 37, "FINANCE.CATEGORY_LABOR"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(48, 39, "FINANCE.CATEGORY_OTHER"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(52, 41, "FINANCE.REASON"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.pettyCashForm.reason);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(57, 43, "COMMON.CANCEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.loading() || !ctx_r1.pettyCashForm.projectId || ctx_r1.pettyCashForm.amount <= 0 || !ctx_r1.pettyCashForm.reason);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loading() ? \u0275\u0275pipeBind1(60, 45, "COMMON.LOADING") : \u0275\u0275pipeBind1(61, 47, "FINANCE.SUBMIT_REQUEST"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 106);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_28_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeSettleModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 107)(3, "div", 39)(4, "h3", 40);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 108);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_28_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeSettleModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 109);
    \u0275\u0275element(9, "path", 110);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "form", 111);
    \u0275\u0275listener("ngSubmit", function FinancialsComponent_Conditional_0_Conditional_28_Template_form_ngSubmit_10_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitSettleRequest());
    });
    \u0275\u0275elementStart(11, "div", 125)(12, "div", 126);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 127);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div")(20, "label", 112);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 128);
    \u0275\u0275twoWayListener("ngModelChange", function FinancialsComponent_Conditional_0_Conditional_28_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.settleForm.spentAmount, $event) || (ctx_r1.settleForm.spentAmount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div")(25, "label", 112);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 129);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "number");
    \u0275\u0275pipe(31, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div")(33, "label", 112);
    \u0275\u0275text(34, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u0641\u0639\u0644\u064A ");
    \u0275\u0275elementStart(35, "span", 130);
    \u0275\u0275text(36, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "input", 131);
    \u0275\u0275twoWayListener("ngModelChange", function FinancialsComponent_Conditional_0_Conditional_28_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.settleForm.expenseDate, $event) || (ctx_r1.settleForm.expenseDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div")(39, "label", 112);
    \u0275\u0275text(40, "\u0625\u0631\u0641\u0627\u0642 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 / \u0625\u064A\u0635\u0627\u0644 \u0627\u0644\u0635\u0631\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "input", 132);
    \u0275\u0275listener("change", function FinancialsComponent_Conditional_0_Conditional_28_Template_input_change_41_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onFileSelect($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div")(43, "label", 112);
    \u0275\u0275text(44);
    \u0275\u0275pipe(45, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "textarea", 133);
    \u0275\u0275twoWayListener("ngModelChange", function FinancialsComponent_Conditional_0_Conditional_28_Template_textarea_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.settleForm.notes, $event) || (ctx_r1.settleForm.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div")(48, "label", 112);
    \u0275\u0275text(49, "Payment Method / \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639 ");
    \u0275\u0275elementStart(50, "span", 130);
    \u0275\u0275text(51, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "select", 134);
    \u0275\u0275twoWayListener("ngModelChange", function FinancialsComponent_Conditional_0_Conditional_28_Template_select_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.settleForm.settlementPaymentMethod, $event) || (ctx_r1.settleForm.settlementPaymentMethod = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(53, "option", 12);
    \u0275\u0275text(54, "Select Method...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "option", 135);
    \u0275\u0275text(56, "\u0643\u0627\u0634 (Cash)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "option", 136);
    \u0275\u0275text(58, "\u0625\u0646\u0633\u062A\u0627 \u0628\u0627\u064A (InstaPay)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "option", 137);
    \u0275\u0275text(60, "\u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u0643\u064A (Bank Transfer)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "option", 138);
    \u0275\u0275text(62, "\u0634\u064A\u0643 (Cheque)");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 122)(64, "button", 123);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_28_Template_button_click_64_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeSettleModal());
    });
    \u0275\u0275text(65);
    \u0275\u0275pipe(66, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "button", 124);
    \u0275\u0275text(68);
    \u0275\u0275pipe(69, "translate");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 16, "FINANCE.SUBMIT_RECEIPTS"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 18, "FINANCE.ISSUED_AMOUNT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(17, 20, ctx_r1.settleRequest()?.amount, "1.2-2"), " ", \u0275\u0275pipeBind1(18, 23, "COMMON.CURRENCY"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 25, "FINANCE.SPENT_AMOUNT"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.settleForm.spentAmount);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(27, 27, "FINANCE.RETURN_AMOUNT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(30, 29, ctx_r1.getCalculatedReturnAmount(), "1.2-2"), " ", \u0275\u0275pipeBind1(31, 32, "COMMON.CURRENCY"), " ");
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.settleForm.expenseDate);
    \u0275\u0275control();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(45, 34, "FINANCE.RECEIPT_NOTES"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.settleForm.notes);
    \u0275\u0275control();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.settleForm.settlementPaymentMethod);
    \u0275\u0275control();
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(66, 36, "COMMON.CANCEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.loading() || ctx_r1.settleForm.spentAmount <= 0 || ctx_r1.settleForm.spentAmount > (ctx_r1.settleRequest()?.amount || 0) || !ctx_r1.settleForm.notes || !ctx_r1.settleForm.settlementPaymentMethod || !ctx_r1.settleForm.expenseDate);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loading() ? \u0275\u0275pipeBind1(69, 38, "COMMON.LOADING") : "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062A\u0633\u0648\u064A\u0629", " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 106);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_29_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeRejectModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 107)(3, "div", 39)(4, "h3", 40);
    \u0275\u0275text(5, "Reject Petty Cash Request");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 108);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_29_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeRejectModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 109);
    \u0275\u0275element(8, "path", 110);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "form", 111);
    \u0275\u0275listener("ngSubmit", function FinancialsComponent_Conditional_0_Conditional_29_Template_form_ngSubmit_9_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitRejectRequest());
    });
    \u0275\u0275elementStart(10, "div")(11, "label", 112);
    \u0275\u0275text(12, "Rejection Comments / Reason ");
    \u0275\u0275elementStart(13, "span", 130);
    \u0275\u0275text(14, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "textarea", 139);
    \u0275\u0275twoWayListener("ngModelChange", function FinancialsComponent_Conditional_0_Conditional_29_Template_textarea_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.rejectComments, $event) || (ctx_r1.rejectComments = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 122)(17, "button", 123);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_29_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeRejectModal());
    });
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 140);
    \u0275\u0275text(21, " Reject Request ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.rejectComments);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 3, "COMMON.CANCEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.loading() || !ctx_r1.rejectComments.trim());
  }
}
function FinancialsComponent_Conditional_0_Conditional_30_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pool_r28 = ctx.$implicit;
    \u0275\u0275property("value", pool_r28.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", pool_r28.sourceType, " (Avail: ", \u0275\u0275pipeBind2(2, 3, pool_r28.availableBalance, "1.2-2"), ")");
  }
}
function FinancialsComponent_Conditional_0_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 106);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_30_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeApproveModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 107)(3, "div", 39)(4, "h3", 40);
    \u0275\u0275text(5, "Approve Petty Cash");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 108);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_30_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeApproveModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 109);
    \u0275\u0275element(8, "path", 110);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "form", 111);
    \u0275\u0275listener("ngSubmit", function FinancialsComponent_Conditional_0_Conditional_30_Template_form_ngSubmit_9_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitApproveRequest());
    });
    \u0275\u0275elementStart(10, "div")(11, "label", 112);
    \u0275\u0275text(12, "Source Cash Pool ");
    \u0275\u0275elementStart(13, "span", 130);
    \u0275\u0275text(14, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "select", 141);
    \u0275\u0275twoWayListener("ngModelChange", function FinancialsComponent_Conditional_0_Conditional_30_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.approveSourcePoolId, $event) || (ctx_r1.approveSourcePoolId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(16, "option", 142);
    \u0275\u0275text(17, "Select cash pool...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(18, FinancialsComponent_Conditional_0_Conditional_30_For_19_Template, 3, 6, "option", 13, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 122)(21, "button", 123);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_30_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeApproveModal());
    });
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 143);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275pipe(27, "translate");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.approveSourcePoolId);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.currentProjectPools());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(23, 4, "COMMON.CANCEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.loading() || !ctx_r1.approveSourcePoolId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loading() ? \u0275\u0275pipeBind1(26, 6, "COMMON.LOADING") : \u0275\u0275pipeBind1(27, 8, "FINANCE.APPROVE"), " ");
  }
}
function FinancialsComponent_Conditional_0_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 106);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_31_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeEditTransactionModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 144)(3, "div", 39)(4, "h3", 40);
    \u0275\u0275text(5, "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 (Edit Transaction)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 108);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_31_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeEditTransactionModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 109);
    \u0275\u0275element(8, "path", 110);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "form", 145);
    \u0275\u0275listener("ngSubmit", function FinancialsComponent_Conditional_0_Conditional_31_Template_form_ngSubmit_9_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitEditTransaction());
    });
    \u0275\u0275elementStart(10, "div")(11, "label", 112);
    \u0275\u0275text(12, "Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 146);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div")(15, "label", 112);
    \u0275\u0275text(16, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "textarea", 147);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 122)(19, "button", 123);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_0_Conditional_31_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeEditTransactionModal());
    });
    \u0275\u0275text(20, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 124);
    \u0275\u0275text(22, "Save");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275property("formGroup", ctx_r1.editTransactionForm);
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.editTransactionForm.invalid || ctx_r1.isSavingTransaction());
  }
}
function FinancialsComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h1", 4);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 5);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, FinancialsComponent_Conditional_0_ng_container_8_Template, 32, 38, "ng-container", 6);
    \u0275\u0275elementStart(9, "div", 7)(10, "div", 8)(11, "div", 9)(12, "label", 10);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 11);
    \u0275\u0275twoWayListener("ngModelChange", function FinancialsComponent_Conditional_0_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedProjectId, $event) || (ctx_r1.selectedProjectId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function FinancialsComponent_Conditional_0_Template_select_change_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onProjectChange());
    });
    \u0275\u0275elementStart(16, "option", 12);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(19, FinancialsComponent_Conditional_0_For_20_Template, 2, 2, "option", 13, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, FinancialsComponent_Conditional_0_Conditional_21_Template, 3, 4, "button", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(22, FinancialsComponent_Conditional_0_div_22_Template, 8, 4, "div", 15);
    \u0275\u0275conditionalCreate(23, FinancialsComponent_Conditional_0_Conditional_23_Template, 38, 27, "div", 16);
    \u0275\u0275conditionalCreate(24, FinancialsComponent_Conditional_0_Conditional_24_Template, 30, 22, "div", 16);
    \u0275\u0275conditionalCreate(25, FinancialsComponent_Conditional_0_Conditional_25_Template, 29, 18, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(26, FinancialsComponent_Conditional_0_Conditional_26_Template, 4, 4, "div", 18);
    \u0275\u0275conditionalCreate(27, FinancialsComponent_Conditional_0_Conditional_27_Template, 62, 49, "div", 19);
    \u0275\u0275conditionalCreate(28, FinancialsComponent_Conditional_0_Conditional_28_Template, 70, 40, "div", 19);
    \u0275\u0275conditionalCreate(29, FinancialsComponent_Conditional_0_Conditional_29_Template, 22, 5, "div", 19);
    \u0275\u0275conditionalCreate(30, FinancialsComponent_Conditional_0_Conditional_30_Template, 28, 10, "div", 19);
    \u0275\u0275conditionalCreate(31, FinancialsComponent_Conditional_0_Conditional_31_Template, 23, 2, "div", 19);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 17, "FINANCE.PAGE_TITLE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 19, "FINANCE.PAGE_SUBTITLE"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.isEngineer());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 21, "FINANCE.SELECT_PROJECT"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedProjectId);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 23, "FINANCE.ALL_PROJECTS"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.projects());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isSiteEngineer() ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isEngineer());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isOwnerOrAccountant() ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSiteEngineer() ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isOwnerOrAccountant() ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSiteEngineer() ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showPettyCashModal() ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showSettleModal() ? 28 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showRejectModal() ? 29 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showApproveModal() ? 30 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isEditTransactionModalOpen() ? 31 : -1);
  }
}
function FinancialsComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275text(1, " \u063A\u064A\u0631 \u0645\u0633\u0645\u0648\u062D \u0644\u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0639\u0627\u0645 \u0628\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0644\u0644\u0645\u0633\u062A\u0623\u062C\u0631\u064A\u0646. ");
    \u0275\u0275elementEnd();
  }
}
function FinancialsComponent_Conditional_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 155);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.activeTextInspection().subtitle);
  }
}
function FinancialsComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 106);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_2_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTextInspectionModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 148)(3, "div", 149)(4, "div", 150)(5, "div", 151);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 152);
    \u0275\u0275element(7, "path", 153);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div")(9, "h3", 154);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, FinancialsComponent_Conditional_2_Conditional_11_Template, 2, 1, "p", 155);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 156);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_2_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTextInspectionModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 152);
    \u0275\u0275element(14, "path", 110);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "div", 157);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 158)(18, "button", 159);
    \u0275\u0275listener("click", function FinancialsComponent_Conditional_2_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTextInspectionModal());
    });
    \u0275\u0275text(19, " \u0625\u063A\u0644\u0627\u0642 / Close ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.activeTextInspection().title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeTextInspection().subtitle ? 11 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.activeTextInspection().content, " ");
  }
}
var FinancialsComponent = class _FinancialsComponent {
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
  openPendingApprovalReasonModal(request) {
    if (!request.reason)
      return;
    const dateStr = request.issuedAt ? new Date(request.issuedAt).toLocaleString("en-GB") : "";
    const projName = this.getProjectName(request);
    const subtitle = request.issuedTo + " \u2022 " + projName + (dateStr ? ` \u2022 ${dateStr}` : "");
    this.openTextInspectionModal("\u0627\u0644\u0628\u064A\u0627\u0646 / \u0627\u0644\u0633\u0628\u0628", request.reason, subtitle);
  }
  openMyPettyCashReasonModal(request) {
    if (!request.reason)
      return;
    const dateStr = request.issuedAt ? new Date(request.issuedAt).toLocaleString("en-GB") : "";
    const projName = this.getProjectName(request);
    const subtitle = projName + (dateStr ? ` \u2022 ${dateStr}` : "");
    this.openTextInspectionModal("\u0627\u0644\u0628\u064A\u0627\u0646 / \u0627\u0644\u0633\u0628\u0628", request.reason, subtitle);
  }
  openTransactionInspectionModal(transaction) {
    if (!transaction.description)
      return;
    const dateStr = transaction.transactionDate ? new Date(transaction.transactionDate).toLocaleString("en-GB") : "";
    this.openTextInspectionModal("\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629", transaction.description, dateStr);
  }
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  pettyCashService = inject(PettyCashService);
  financialService = inject(FinancialService);
  imageUploadService = inject(ImageUploadService);
  confirmService = inject(ConfirmModalService);
  fb = inject(FormBuilder);
  destroyRef = inject(DestroyRef);
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
  projects = signal(
    [],
    ...ngDevMode ? [{ debugName: "projects" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingApprovals = signal(
    [],
    ...ngDevMode ? [{ debugName: "pendingApprovals" }] : (
      /* istanbul ignore next */
      []
    )
  );
  myPettyCash = signal(
    [],
    ...ngDevMode ? [{ debugName: "myPettyCash" }] : (
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
  isDeletingTx = signal(
    false,
    ...ngDevMode ? [{ debugName: "isDeletingTx" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Track project expenses for burn rates
  projectExpenses = signal(
    /* @__PURE__ */ new Map(),
    ...ngDevMode ? [{ debugName: "projectExpenses" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedProjectId = signal(
    "",
    ...ngDevMode ? [{ debugName: "selectedProjectId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showPettyCashModal = signal(
    false,
    ...ngDevMode ? [{ debugName: "showPettyCashModal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showSettleModal = signal(
    false,
    ...ngDevMode ? [{ debugName: "showSettleModal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showRejectModal = signal(
    false,
    ...ngDevMode ? [{ debugName: "showRejectModal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = signal(
    false,
    ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  settleRequest = signal(
    null,
    ...ngDevMode ? [{ debugName: "settleRequest" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rejectRequest = signal(
    null,
    ...ngDevMode ? [{ debugName: "rejectRequest" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedFile = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedFile" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rejectComments = "";
  showApproveModal = signal(
    false,
    ...ngDevMode ? [{ debugName: "showApproveModal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  approveRequest = signal(
    null,
    ...ngDevMode ? [{ debugName: "approveRequest" }] : (
      /* istanbul ignore next */
      []
    )
  );
  approveSourcePoolId = "";
  currentProjectPools = signal(
    [],
    ...ngDevMode ? [{ debugName: "currentProjectPools" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pettyCashForm = {
    projectId: "",
    amount: 0,
    category: "",
    reason: ""
  };
  settleForm = {
    spentAmount: 0,
    notes: "",
    settlementPaymentMethod: "",
    expenseDate: (/* @__PURE__ */ new Date()).toISOString().substring(0, 10),
    receiptPhotoUrl: ""
  };
  get totalIncome() {
    return this.transactions().filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0);
  }
  get totalExpenses() {
    return this.transactions().filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0);
  }
  get netBalance() {
    return this.totalIncome - this.totalExpenses;
  }
  get pendingPettyCashCount() {
    return this.pendingApprovals().length;
  }
  ngOnInit() {
    this.loadProjects();
  }
  loadProjects() {
    this.projectService.getProjects().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        if (response.data) {
          this.projects.set(response.data);
          if (response.data.length > 0 && !this.selectedProjectId()) {
            this.selectedProjectId.set(response.data[0].id);
            this.loadData();
          }
          response.data.forEach((p) => {
            this.financialService.getProjectTransactions(p.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
              next: (res) => {
                if (res.data) {
                  const totalExp = res.data.items.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0);
                  this.projectExpenses.update((map) => {
                    map.set(p.id, totalExp);
                    return new Map(map);
                  });
                }
              }
            });
          });
        }
      }
    });
  }
  getFilteredProjects() {
    const activeId = this.selectedProjectId();
    if (activeId) {
      return this.projects().filter((p) => p.id === activeId);
    }
    return this.projects();
  }
  getProjectBudget(project) {
    const desc = project.description;
    if (desc && desc.startsWith("{")) {
      try {
        return JSON.parse(desc).budget || 0;
      } catch (e) {
      }
    }
    return 0;
  }
  getProjectClient(project) {
    const desc = project.description;
    if (desc && desc.startsWith("{")) {
      try {
        return JSON.parse(desc).client || "N/A";
      } catch (e) {
      }
    }
    return "N/A";
  }
  getProjectBurnRate(project) {
    const budget = this.getProjectBudget(project);
    if (budget <= 0)
      return 0;
    const spent = this.projectExpenses().get(project.id) || 0;
    const pct = spent / budget * 100;
    return isNaN(pct) || !isFinite(pct) ? 0 : Math.min(pct, 100);
  }
  getCalculatedReturnAmount() {
    const limit = this.settleRequest()?.amount || 0;
    const spent = this.settleForm.spentAmount || 0;
    return Math.max(0, limit - spent);
  }
  loadData() {
    const projectId = this.selectedProjectId();
    if (!projectId) {
      this.pendingApprovals.set([]);
      this.myPettyCash.set([]);
      this.transactions.set([]);
      return;
    }
    this.loading.set(true);
    this.pettyCashService.getProjectPettyCash(projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const items = response.data.items;
          const pending = items.filter((i) => i.status === "Pending");
          this.pendingApprovals.set(pending);
          const currentUserName = this.authService.currentUser()?.name;
          const myReqs = items.filter((i) => i.issuedTo === currentUserName);
          this.myPettyCash.set(myReqs);
        }
      }
    });
    this.financialService.getProjectTransactions(projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.loading.set(false);
        if (response.success && response.data) {
          this.transactions.set(response.data.items);
        }
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
  onProjectChange() {
    this.loadData();
  }
  isSiteEngineer() {
    return this.authService.currentUser()?.role === "SiteEngineer";
  }
  isEngineer() {
    const role = this.authService.currentUser()?.role?.toLowerCase() || "";
    return ["manager", "siteengineer", "designengineer"].includes(role);
  }
  isSuperAdmin() {
    return this.authService.currentUser()?.role === "SuperAdmin";
  }
  isOwnerOrAccountant() {
    const role = this.authService.currentUser()?.role;
    return role === "TenantOwner" || role === "Accountant";
  }
  getProjectName(requestOrProjectId) {
    if (typeof requestOrProjectId !== "string") {
      if (requestOrProjectId.projectName && requestOrProjectId.projectName.trim()) {
        return requestOrProjectId.projectName;
      }
      if (requestOrProjectId.projectId) {
        const project2 = this.projects().find((p) => p.id === requestOrProjectId.projectId);
        return project2?.name || "Project";
      }
      return "Project";
    }
    const project = this.projects().find((p) => p.id === requestOrProjectId);
    return project?.name || "Project";
  }
  isClosedProjectSelected() {
    const selectedProjId = this.selectedProjectId();
    if (!selectedProjId)
      return false;
    const proj = this.projects().find((p) => p.id === selectedProjId);
    return proj?.status === "Closed";
  }
  openPettyCashModal() {
    const selectedProjId = this.selectedProjectId();
    if (selectedProjId) {
      const proj = this.projects().find((p) => p.id === selectedProjId);
      if (proj?.status === "Closed")
        return;
    }
    this.pettyCashForm.projectId = selectedProjId || "";
    this.pettyCashForm.amount = 0;
    this.pettyCashForm.category = "";
    this.pettyCashForm.reason = "";
    this.showPettyCashModal.set(true);
    this.confirmService.toggleBodyScroll(true);
  }
  closePettyCashModal() {
    this.showPettyCashModal.set(false);
    this.confirmService.toggleBodyScroll(false);
  }
  submitPettyCashRequest() {
    if (!this.pettyCashForm.projectId || this.pettyCashForm.amount <= 0 || !this.pettyCashForm.reason) {
      return;
    }
    this.loading.set(true);
    const dto = {
      issuedToUserId: this.authService.currentUser()?.userId || "",
      amount: this.pettyCashForm.amount,
      reason: this.pettyCashForm.reason,
      category: this.pettyCashForm.category
    };
    this.pettyCashService.requestPettyCash(this.pettyCashForm.projectId, dto).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.closePettyCashModal();
        this.loadProjects();
        this.loadData();
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }
  openSettleModal(request) {
    this.settleRequest.set(request);
    this.settleForm.spentAmount = request.amount;
    this.settleForm.notes = "";
    this.settleForm.settlementPaymentMethod = "";
    this.settleForm.expenseDate = (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
    this.selectedFile.set(null);
    this.showSettleModal.set(true);
    this.confirmService.toggleBodyScroll(true);
  }
  closeSettleModal() {
    this.showSettleModal.set(false);
    this.settleRequest.set(null);
    this.confirmService.toggleBodyScroll(false);
  }
  onFileSelect(event) {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.confirmService.alert({
          title: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B",
          message: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B! \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0635\u0648\u0631 2 \u0645\u064A\u062C\u0627 \u0648\u0644\u0644\u0645\u0642\u0627\u064A\u0633\u0627\u062A 5 \u0645\u064A\u062C\u0627.",
          type: "error"
        });
        event.target.value = "";
        return;
      }
      this.selectedFile.set(file);
    }
  }
  submitSettleRequest() {
    if (!this.settleForm.spentAmount || !this.settleForm.notes || !this.settleForm.settlementPaymentMethod || !this.settleRequest()) {
      return;
    }
    this.loading.set(true);
    const request = this.settleRequest();
    if (this.selectedFile()) {
      this.imageUploadService.uploadProjectGallery(request.projectId, this.selectedFile()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          const photoUrl = res.data?.url || "";
          this.submitSettleDto(request, photoUrl);
        },
        error: () => {
          this.loading.set(false);
        }
      });
    } else {
      this.submitSettleDto(request, "");
    }
  }
  submitSettleDto(request, photoUrl) {
    const dto = {
      spentAmount: this.settleForm.spentAmount,
      receiptDescription: this.settleForm.notes,
      settlementPaymentMethod: this.settleForm.settlementPaymentMethod,
      expenseDate: new Date(this.settleForm.expenseDate),
      receiptPhotoUrl: photoUrl
    };
    this.pettyCashService.settlePettyCash(request.projectId, request.id, dto).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.closeSettleModal();
        this.loadProjects();
        this.loadData();
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }
  openApproveModal(request) {
    if (!request)
      return;
    this.approveRequest.set(request);
    this.approveSourcePoolId = "";
    this.showApproveModal.set(true);
    this.confirmService.toggleBodyScroll(true);
    this.loading.set(true);
    this.financialService.getCashPools(request.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.currentProjectPools.set(res.data);
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  closeApproveModal() {
    this.showApproveModal.set(false);
    this.approveRequest.set(null);
    this.confirmService.toggleBodyScroll(false);
  }
  submitApproveRequest() {
    const req = this.approveRequest();
    if (!req || !this.approveSourcePoolId)
      return;
    this.loading.set(true);
    this.pettyCashService.approvePettyCash(req.projectId, req.id, { sourcePoolId: this.approveSourcePoolId }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.closeApproveModal();
        this.loadProjects();
        this.loadData();
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }
  openRejectModal(request) {
    this.rejectRequest.set(request);
    this.rejectComments = "";
    this.showRejectModal.set(true);
    this.confirmService.toggleBodyScroll(true);
  }
  closeRejectModal() {
    this.showRejectModal.set(false);
    this.rejectRequest.set(null);
    this.confirmService.toggleBodyScroll(false);
  }
  submitRejectRequest() {
    const req = this.rejectRequest();
    if (!req || !this.rejectComments.trim())
      return;
    this.loading.set(true);
    this.pettyCashService.rejectPettyCash(req.projectId, req.id, this.rejectComments).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.closeRejectModal();
        this.loadProjects();
        this.loadData();
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }
  /**
   * Delete a financial transaction.
   * Only callable from the @if(isOwnerOrAccountant()) guarded section.
   * The API rolls back the cash pool balance if the record was a Capital Injection.
   */
  async onDeleteTransaction(id, projectId) {
    const isConfirmed = await this.confirmService.confirm({
      title: "\u062D\u0630\u0641 \u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629",
      message: "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u062D\u0631\u0643\u0629\u061F \u0641\u064A \u062D\u0627\u0644 \u0643\u0627\u0646\u062A \u0632\u064A\u0627\u062F\u0629 \u0631\u0623\u0633 \u0645\u0627\u0644\u060C \u0641\u0633\u064A\u062A\u0645 \u0625\u0631\u062C\u0627\u0639 \u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062D\u0641\u0638\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.",
      confirmText: "\u0646\u0639\u0645\u060C \u0627\u062D\u0630\u0641",
      cancelText: "\u0625\u0644\u063A\u0627\u0621"
    });
    if (!isConfirmed)
      return;
    const pid = projectId || this.selectedProjectId();
    if (!pid)
      return;
    this.isDeletingTx.set(true);
    this.financialService.deleteTransaction(pid, id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.isDeletingTx.set(false);
        this.loadData();
        this.loadProjects();
      },
      error: (err) => {
        this.isDeletingTx.set(false);
        this.confirmService.alert({
          title: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0629",
          message: err?.error?.message || "\u0641\u0634\u0644\u062A \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062D\u0630\u0641.",
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
    const pid = this.selectedProjectId();
    this.financialService.updateTransaction(pid, this.selectedTransactionToEdit.id, formVal).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.isSavingTransaction.set(false);
        this.closeEditTransactionModal();
        this.loadData();
        this.loadProjects();
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
  static \u0275fac = function FinancialsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FinancialsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FinancialsComponent, selectors: [["app-financials"]], decls: 3, vars: 2, consts: [[1, "p-6", "text-center", "text-rose-400", "font-bold", "font-cairo"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-slate-950/75", "backdrop-blur-sm", "animate-fade-in", "font-sans"], [1, "w-full", "max-w-none"], [1, "mb-8"], [1, "text-3xl", "font-bold", "text-white", "mb-2", "font-cairo"], [1, "text-slate-400", "font-cairo"], [4, "ngIf"], [1, "bg-slate-900", "border", "border-slate-800", "rounded-2xl", "p-6", "mb-8"], [1, "flex", "flex-col", "sm:flex-row", "items-start", "sm:items-center", "gap-4", "justify-between"], [1, "flex", "items-center", "gap-4", "w-full", "sm:w-auto"], [1, "text-sm", "font-medium", "text-slate-300", "font-cairo", "shrink-0"], [1, "w-full", "sm:w-80", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-4", "py-2", "text-white", "focus:outline-none", "focus:border-indigo-500", "font-sans", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value"], [1, "bg-indigo-600", "hover:bg-indigo-500", "text-white", "px-5", "py-2.5", "rounded-xl", "font-bold", "transition-all", "duration-200", "hover:scale-[1.03]", "active:scale-95", "cursor-pointer", "font-cairo", "text-sm", "w-full", "sm:w-auto", "text-center", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:pointer-events-none", 3, "disabled"], ["class", "bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8", 4, "ngIf"], [1, "bg-slate-900", "border", "border-slate-800", "rounded-2xl", "p-6", "mb-8", "shadow-xl"], [1, "bg-slate-900", "border", "border-slate-800", "rounded-2xl", "p-6", "shadow-xl"], [1, "md:hidden", "fixed", "bottom-0", "left-0", "right-0", "p-3", "bg-slate-900/95", "backdrop-blur-md", "border-t", "border-slate-800", "z-30", "flex", "items-center", "justify-center", "shadow-2xl"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-2", "sm:p-4", "bg-black/70", "backdrop-blur-sm"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-4", "sm:gap-6", "mb-8", "font-sans"], [1, "bg-slate-900", "border", "border-slate-800", "rounded-2xl", "p-5", "sm:p-6"], [1, "text-slate-400", "text-sm", "font-medium", "mb-2", "font-cairo"], [1, "text-2xl", "sm:text-3xl", "font-bold", "text-emerald-400", "font-mono", "tabular-nums"], [1, "text-2xl", "sm:text-3xl", "font-bold", "text-rose-400", "font-mono", "tabular-nums"], [1, "text-2xl", "sm:text-3xl", "font-bold", "font-mono", "tabular-nums"], [1, "text-2xl", "sm:text-3xl", "font-bold", "text-amber-400", "font-mono", "tabular-nums"], [1, "bg-indigo-600", "hover:bg-indigo-500", "text-white", "px-5", "py-2.5", "rounded-xl", "font-bold", "transition-all", "duration-200", "hover:scale-[1.03]", "active:scale-95", "cursor-pointer", "font-cairo", "text-sm", "w-full", "sm:w-auto", "text-center", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:pointer-events-none", 3, "click", "disabled"], [1, "text-xl", "font-bold", "text-white", "mb-6", "font-cairo"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-6"], [1, "bg-slate-950", "border", "border-slate-800/80", "rounded-xl", "p-5", "flex", "flex-col", "justify-between", "shadow-lg"], [1, "col-span-full", "py-10", "text-center", "text-slate-500", "text-sm", "font-cairo"], [1, "text-base", "font-bold", "text-white", "font-cairo", "truncate"], [1, "text-xs", "text-slate-500", "font-medium", "block", "mt-1.5", "font-cairo"], [1, "mt-5", "space-y-2.5"], [1, "flex", "justify-between", "text-xs", "text-slate-400", "font-mono"], [1, "font-bold"], [1, "w-full", "bg-slate-800", "rounded-full", "h-2", "overflow-hidden"], [1, "h-full", "rounded-full", "transition-all", "duration-500"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-xl", "font-bold", "text-white", "font-cairo"], [1, "px-3", "py-1", "rounded-full", "text-xs", "font-semibold", "bg-amber-500/10", "text-amber-400", "border", "border-amber-500/20", "font-mono"], [1, "hidden", "md:block", "overflow-x-auto"], [1, "w-full", "text-left", "rtl:text-right", "font-sans"], [1, "text-slate-400", "text-xs", "font-bold", "uppercase", "border-b", "border-slate-800/80"], [1, "pb-4", "font-cairo"], [1, "pb-4", "text-center", "font-cairo"], [1, "text-sm", "divide-y", "divide-slate-800/60", "text-slate-300"], [1, "hover:bg-slate-950/20"], [1, "block", "md:hidden", "space-y-3"], [1, "bg-slate-950", "border", "border-slate-800", "rounded-xl", "p-4", "space-y-3", "shadow-md"], [1, "py-8", "text-center", "text-slate-500", "text-sm", "font-cairo"], [1, "py-4", "text-white", "font-semibold"], [1, "py-4", "text-slate-300", "font-medium"], [1, "py-4", "text-amber-400", "font-bold", "font-mono", "tabular-nums"], [1, "py-4", "text-slate-400", "max-w-[220px]", "lg:max-w-[320px]", "truncate", "cursor-pointer", "hover:text-sky-400", "transition-colors", 3, "click", "title"], [1, "py-4", "text-slate-400", "font-mono", "tabular-nums"], [1, "py-4"], [1, "flex", "items-center", "gap-2", "justify-center"], [1, "bg-emerald-600", "hover:bg-emerald-500", "text-white", "px-4", "py-1.5", "rounded-lg", "text-xs", "font-bold", "transition-all", "duration-150", "hover:scale-105", "active:scale-95", "cursor-pointer", "font-cairo", 3, "click"], [1, "bg-rose-600", "hover:bg-rose-500", "text-white", "px-4", "py-1.5", "rounded-lg", "text-xs", "font-bold", "transition-all", "duration-150", "hover:scale-105", "active:scale-95", "cursor-pointer", "font-cairo", 3, "click"], ["colspan", "6", 1, "py-12", "text-center", "text-slate-500", "font-cairo"], [1, "flex", "items-center", "justify-between", "gap-2", "border-b", "border-slate-800/80", "pb-2.5"], [1, "text-sm", "font-bold", "text-white", "font-cairo"], [1, "text-sm", "font-bold", "text-amber-400", "font-mono", "tabular-nums"], [1, "text-xs", "text-slate-400", "font-cairo", "flex", "items-center", "justify-between"], [1, "font-mono", "tabular-nums", "text-slate-500"], [1, "text-xs", "text-slate-300", "bg-slate-900/80", "p-2.5", "rounded-lg", "font-cairo", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-2", "pt-1"], [1, "flex-1", "min-h-[40px]", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "rounded-xl", "text-xs", "font-bold", "font-cairo", 3, "click"], [1, "flex-1", "min-h-[40px]", "bg-rose-600", "hover:bg-rose-500", "text-white", "rounded-xl", "text-xs", "font-bold", "font-cairo", 3, "click"], [1, "overflow-x-auto"], [1, "py-4", "text-white", "font-medium"], [1, "py-4", "text-amber-400", "font-bold", "font-mono"], [1, "py-4", "text-slate-400", "font-mono"], [1, "py-4", "text-center"], [1, "px-2.5", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "uppercase", "border", "font-cairo"], [1, "bg-indigo-600", "hover:bg-indigo-500", "text-white", "px-4", "py-1.5", "rounded-lg", "text-xs", "font-bold", "transition-all", "duration-150", "hover:scale-105", "active:scale-95", "cursor-pointer", "font-cairo"], [1, "text-xs", "text-rose-400", "italic", "block", "max-w-xs", "truncate", 3, "title"], [1, "flex", "items-center", "justify-center", "gap-2"], [1, "text-xs", "text-slate-600", "italic", "font-cairo"], [1, "bg-indigo-600", "hover:bg-indigo-500", "text-white", "px-4", "py-1.5", "rounded-lg", "text-xs", "font-bold", "transition-all", "duration-150", "hover:scale-105", "active:scale-95", "cursor-pointer", "font-cairo", 3, "click"], ["target", "_blank", "title", "View Receipt", 1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-1", "text-xs", "font-semibold", "rounded-lg", "bg-indigo-500/10", "hover:bg-indigo-500/25", "text-indigo-400", "border", "border-indigo-500/20", "transition-all", "cursor-pointer", "font-cairo", "shadow-sm", 3, "href"], ["title", "Payment Method", 1, "px-2", "py-0.5", "rounded", "text-[10px]", "uppercase", "font-bold", "tracking-wider", "bg-slate-800", "text-slate-300"], ["title", "Expense Date", 1, "px-2", "py-0.5", "rounded", "text-[10px]", "uppercase", "font-bold", "tracking-wider", "bg-slate-800", "text-slate-400"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"], [1, "bg-slate-950", "border", "border-slate-800", "rounded-xl", "p-4", "space-y-2.5", "shadow-md"], [1, "py-4", "text-white", "font-medium", "max-w-[220px]", "lg:max-w-[320px]", "truncate", "cursor-pointer", "hover:text-sky-400", "transition-colors", 3, "click", "title"], [1, "py-4", "text-center", "font-bold", "font-mono", "tabular-nums"], [1, "inline-flex", "items-center", "gap-1", "text-slate-500", "text-xs", "font-semibold", "px-2", "py-1", "bg-slate-950/40", "border", "border-slate-800", "rounded-lg", "select-none"], [1, "flex", "items-center", "justify-center", "gap-1.5"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5", "text-slate-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"], ["title", "Edit transaction", 1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1.5", "rounded-lg", "text-[11px]", "font-bold", "bg-amber-500/10", "text-amber-400", "border", "border-amber-500/20", "hover:bg-amber-500/20", "hover:text-amber-300", "transition-all", "duration-150", "cursor-pointer", "font-cairo", 3, "click"], ["title", "Delete transaction \u2014 capital injections roll back the pool automatically", 1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1.5", "rounded-lg", "text-[11px]", "font-bold", "bg-rose-500/10", "text-rose-400", "border", "border-rose-500/20", "hover:bg-rose-500/20", "hover:text-rose-300", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-all", "duration-150", "cursor-pointer", "font-cairo", 3, "click", "disabled"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], ["colspan", "5", 1, "py-12", "text-center", "text-slate-500", "font-cairo"], [1, "flex", "items-center", "justify-between", "gap-2", "border-b", "border-slate-800/80", "pb-2"], [1, "font-bold", "font-mono", "tabular-nums", "text-sm"], [1, "text-xs", "text-white", "font-medium", "font-cairo", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "justify-between", "text-xs", "text-slate-500", "font-mono", "tabular-nums", "pt-1"], [1, "flex", "items-center", "gap-1.5"], [1, "px-2.5", "py-1", "text-[11px]", "font-bold", "bg-amber-500/10", "text-amber-400", "border", "border-amber-500/20", "rounded-lg", "font-cairo", 3, "click"], [1, "px-2.5", "py-1", "text-[11px]", "font-bold", "bg-rose-500/10", "text-rose-400", "border", "border-rose-500/20", "rounded-lg", "font-cairo", 3, "click", "disabled"], [1, "w-full", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "py-3", "rounded-xl", "font-bold", "font-cairo", "text-sm", "shadow-lg", "shadow-indigo-600/30", "active:scale-95", "disabled:opacity-50", "transition-all", 3, "click", "disabled"], [1, "absolute", "inset-0", 3, "click"], [1, "relative", "w-full", "max-w-lg", "mx-auto", "max-h-[92vh]", "flex", "flex-col", "rounded-2xl", "bg-slate-900", "border", "border-slate-700/60", "p-4", "sm:p-6", "shadow-2xl", "transition-all", "z-10"], [1, "text-slate-400", "hover:text-white", "cursor-pointer", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-6", "w-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "space-y-4", "font-sans", "overflow-y-auto", "min-h-0", "pr-1", "flex-1", 3, "ngSubmit"], [1, "block", "text-sm", "font-medium", "text-slate-300", "mb-2", "font-cairo"], ["name", "projectId", "required", "", 1, "w-full", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-4", "py-2.5", "text-white", "focus:outline-none", "focus:border-indigo-500", 3, "ngModelChange", "ngModel"], ["type", "number", "name", "amount", "required", "", 1, "w-full", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-4", "py-2.5", "text-white", "focus:outline-none", "focus:border-indigo-500", "font-mono", 3, "ngModelChange", "ngModel"], ["name", "category", "required", "", 1, "w-full", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-4", "py-2.5", "text-white", "focus:outline-none", "focus:border-indigo-500", 3, "ngModelChange", "ngModel"], ["value", "Cement"], ["value", "Logistics"], ["value", "Materials"], ["value", "Labor"], ["value", "Other"], ["name", "reason", "rows", "3", "required", "", 1, "w-full", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-4", "py-2.5", "text-white", "focus:outline-none", "focus:border-indigo-500", "resize-none", 3, "ngModelChange", "ngModel"], [1, "flex", "gap-3", "pt-4"], ["type", "button", 1, "flex-1", "bg-slate-800", "hover:bg-slate-700", "text-white", "px-4", "py-2.5", "rounded-xl", "font-medium", "transition-all", "duration-200", "cursor-pointer", "font-cairo", "text-sm", 3, "click"], ["type", "submit", 1, "flex-1", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "px-4", "py-2.5", "rounded-xl", "font-bold", "transition-all", "duration-200", "disabled:opacity-50", "cursor-pointer", "font-cairo", "text-sm", 3, "disabled"], [1, "bg-slate-950", "border", "border-slate-800/80", "rounded-xl", "p-4"], [1, "text-sm", "text-slate-400", "mb-1", "font-cairo"], [1, "text-xl", "font-bold", "text-white", "font-mono"], ["type", "number", "name", "spentAmount", "required", "", 1, "w-full", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-4", "py-2.5", "text-white", "focus:outline-none", "focus:border-indigo-500", "font-mono", 3, "ngModelChange", "ngModel"], [1, "w-full", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "px-4", "py-2.5", "text-slate-400", "font-mono"], [1, "text-red-400"], ["type", "date", "name", "expenseDate", "required", "", 1, "w-full", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-4", "py-2.5", "text-white", "focus:outline-none", "focus:border-indigo-500", "font-mono", 3, "ngModelChange", "ngModel"], ["type", "file", "accept", "image/*", 1, "w-full", "bg-slate-955", "border", "border-slate-700", "rounded-xl", "px-4", "py-2", "text-white", "focus:outline-none", "focus:border-indigo-500", "file:mr-4", "file:py-2", "file:px-4", "file:rounded-lg", "file:border-0", "file:text-sm", "file:font-semibold", "file:bg-indigo-600", "file:text-white", "hover:file:bg-indigo-500", "file:cursor-pointer", 3, "change"], ["name", "notes", "rows", "3", "required", "", "placeholder", "\u0645\u062B\u0627\u0644: \u0634\u0631\u0627\u0621 \u0646\u062B\u0631\u064A\u0627\u062A \u0644\u0644\u0645\u0648\u0642\u0639\u060C \u062D\u0648\u0627\u0641\u0632 \u0639\u0645\u0627\u0644\u060C \u0641\u0648\u0627\u062A\u064A\u0631 \u0646\u0642\u0644...", 1, "w-full", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-4", "py-2.5", "text-white", "focus:outline-none", "focus:border-indigo-500", "resize-none", 3, "ngModelChange", "ngModel"], ["name", "settlementPaymentMethod", "required", "", 1, "w-full", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-4", "py-2.5", "text-white", "focus:outline-none", "focus:border-indigo-500", 3, "ngModelChange", "ngModel"], ["value", "Cash"], ["value", "InstaPay"], ["value", "BankTransfer"], ["value", "Cheque"], ["name", "comments", "rows", "3", "required", "", "placeholder", "Type the reason for rejection...", 1, "w-full", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-4", "py-2.5", "text-white", "focus:outline-none", "focus:border-indigo-500", "resize-none", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "flex-1", "bg-rose-600", "hover:bg-rose-500", "text-white", "px-4", "py-2.5", "rounded-xl", "font-bold", "transition-all", "duration-200", "disabled:opacity-50", "cursor-pointer", "font-cairo", "text-sm", 3, "disabled"], ["name", "sourcePoolId", "required", "", 1, "w-full", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-4", "py-2.5", "text-white", "focus:outline-none", "focus:border-indigo-500", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", ""], ["type", "submit", 1, "flex-1", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "px-4", "py-2.5", "rounded-xl", "font-bold", "transition-all", "duration-200", "disabled:opacity-50", "cursor-pointer", "font-cairo", "text-sm", 3, "disabled"], [1, "relative", "w-full", "max-w-lg", "mx-auto", "max-h-[92vh]", "flex", "flex-col", "rounded-2xl", "bg-slate-900", "border", "border-slate-700/60", "p-4", "sm:p-6", "shadow-2xl", "transition-all", "z-10", "animate-[scaleIn_0.15s_ease-out]"], [1, "space-y-4", "font-sans", "overflow-y-auto", "min-h-0", "pr-1", "flex-1", 3, "ngSubmit", "formGroup"], ["type", "number", "formControlName", "amount", "required", "", 1, "w-full", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-4", "py-2.5", "text-white", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40"], ["formControlName", "description", "rows", "3", "required", "", 1, "w-full", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "px-4", "py-2.5", "text-white", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "resize-none"], [1, "relative", "w-full", "max-w-lg", "mx-auto", "max-h-[92vh]", "flex", "flex-col", "rounded-2xl", "bg-slate-900", "border", "border-slate-700/80", "p-5", "sm:p-6", "shadow-2xl", "z-10", "transition-all"], [1, "flex", "items-center", "justify-between", "pb-3", "mb-4", "border-b", "border-slate-800"], [1, "flex", "items-center", "gap-3"], [1, "p-2", "rounded-xl", "bg-sky-500/10", "text-sky-400", "border", "border-sky-500/20", "shrink-0"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-base", "font-bold", "text-white", "font-cairo"], [1, "text-xs", "text-slate-400", "font-cairo", "mt-0.5"], [1, "p-1.5", "text-slate-400", "hover:text-white", "rounded-lg", "hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "overflow-y-auto", "min-h-0", "pr-1", "space-y-3", "text-slate-200", "text-sm", "leading-relaxed", "whitespace-pre-wrap", "font-cairo", "bg-slate-950/60", "p-4", "rounded-xl", "border", "border-slate-800/80", "selection:bg-sky-500/30", "selection:text-sky-200"], [1, "mt-4", "pt-3", "border-t", "border-slate-800", "flex", "justify-end"], [1, "px-4", "py-2", "text-xs", "font-bold", "text-slate-300", "hover:text-white", "bg-slate-800", "hover:bg-slate-700", "rounded-xl", "transition-colors", "cursor-pointer", "font-cairo", 3, "click"]], template: function FinancialsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, FinancialsComponent_Conditional_0_Template, 32, 25)(1, FinancialsComponent_Conditional_1_Template, 2, 0, "div", 0);
      \u0275\u0275conditionalCreate(2, FinancialsComponent_Conditional_2_Template, 20, 3, "div", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(!ctx.isSuperAdmin() ? 0 : 1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activeTextInspection() ? 2 : -1);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, ReactiveFormsModule, FormGroupDirective, FormControlName, DecimalPipe, DatePipe, TranslatePipe], styles: ['\n.font-cairo[_ngcontent-%COMP%] {\n  font-family:\n    "Cairo",\n    "Inter",\n    sans-serif;\n}\n/*# sourceMappingURL=financials.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FinancialsComponent, [{
    type: Component,
    args: [{ selector: "app-financials", standalone: true, imports: [CommonModule, FormsModule, TranslatePipe, ReactiveFormsModule], template: `
    @if (!isSuperAdmin()) {
      <div class="w-full max-w-none">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2 font-cairo">{{ 'FINANCE.PAGE_TITLE' | translate }}</h1>
        <p class="text-slate-400 font-cairo">{{ 'FINANCE.PAGE_SUBTITLE' | translate }}</p>
      </div>

      <!-- Stats Cards -->
      <ng-container *ngIf="!isEngineer()"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 font-sans">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
          <div class="text-slate-400 text-sm font-medium mb-2 font-cairo">{{ 'FINANCE.TOTAL_INCOME' | translate }}</div>
          <div class="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums">{{ totalIncome | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
          <div class="text-slate-400 text-sm font-medium mb-2 font-cairo">{{ 'FINANCE.TOTAL_EXPENSES' | translate }}</div>
          <div class="text-2xl sm:text-3xl font-bold text-rose-400 font-mono tabular-nums">{{ totalExpenses | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
          <div class="text-slate-400 text-sm font-medium mb-2 font-cairo">{{ 'FINANCE.NET_BALANCE' | translate }}</div>
          <div class="text-2xl sm:text-3xl font-bold font-mono tabular-nums" [class.text-emerald-400]="netBalance >= 0" [class.text-rose-400]="netBalance < 0">
            {{ netBalance | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}
          </div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
          <div class="text-slate-400 text-sm font-medium mb-2 font-cairo">{{ 'FINANCE.PENDING_PETTY_CASH' | translate }}</div>
          <div class="text-2xl sm:text-3xl font-bold text-amber-400 font-mono tabular-nums">{{ pendingPettyCashCount }}</div>
        </div>
      </div>
      </ng-container>

      <!-- Project Selector (for all roles) -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div class="flex items-center gap-4 w-full sm:w-auto">
            <label class="text-sm font-medium text-slate-300 font-cairo shrink-0">{{ 'FINANCE.SELECT_PROJECT' | translate }}</label>
            <select 
              [(ngModel)]="selectedProjectId" 
              (change)="onProjectChange()"
              class="w-full sm:w-80 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 font-sans"
            >
              <option value="">{{ 'FINANCE.ALL_PROJECTS' | translate }}</option>
              @for (project of projects(); track project.id) {
                <option [value]="project.id">{{ project.name }}</option>
              }
            </select>
          </div>
          @if (isSiteEngineer()) {
            <button 
              (click)="openPettyCashModal()"
              [disabled]="isClosedProjectSelected()"
              class="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer font-cairo text-sm w-full sm:w-auto text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
            >
              {{ 'FINANCE.REQUEST_PETTY_CASH' | translate }}
            </button>
          }
        </div>
      </div>

      <!-- Project Budget Consumption (Burn Rate) Widescreen UI -->
      <div *ngIf="!isEngineer()" class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
        <h2 class="text-xl font-bold text-white mb-6 font-cairo">{{ 'FINANCE.BURN_RATES' | translate }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of getFilteredProjects(); track project.id) {
            @let budget = getProjectBudget(project);
            @let spent = projectExpenses().get(project.id) || 0;
            @let pct = getProjectBurnRate(project);
            <div class="bg-slate-950 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <h3 class="text-base font-bold text-white font-cairo truncate">{{ project.name }}</h3>
                <span class="text-xs text-slate-500 font-medium block mt-1.5 font-cairo">
                  {{ 'PROJECTS.TABLE_CLIENT' | translate }}: {{ getProjectClient(project) }}
                </span>
              </div>
              <div class="mt-5 space-y-2.5">
                <div class="flex justify-between text-xs text-slate-400 font-mono">
                  <span>{{ spent | number:'1.0-0' }} / {{ budget | number:'1.0-0' }} {{ 'COMMON.CURRENCY' | translate }}</span>
                  <span [class.text-rose-400]="pct > 85" [class.text-indigo-400]="pct <= 85" class="font-bold">{{ pct | number:'1.1-1' }}%</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    [class.bg-rose-500]="pct > 85"
                    [class.bg-indigo-600]="pct <= 85" 
                    class="h-full rounded-full transition-all duration-500" 
                    [style.width.%]="pct"
                  ></div>
                </div>
              </div>
            </div>
          } @empty {
            <div class="col-span-full py-10 text-center text-slate-500 text-sm font-cairo">
              {{ 'PROJECTS.NO_PROJECTS' | translate }}
            </div>
          }
        </div>
      </div>

      <!-- Pending Approvals (for TenantOwner and Accountant) -->
      @if (isOwnerOrAccountant()) {
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-white font-cairo">{{ 'FINANCE.PENDING_APPROVALS' | translate }}</h2>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
              {{ pendingApprovals().length }} {{ 'FINANCE.PENDING' | translate }}
            </span>
          </div>
          <!-- Desktop Table (md+) -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full text-left rtl:text-right font-sans">
              <thead>
                <tr class="text-slate-400 text-xs font-bold uppercase border-b border-slate-800/80">
                  <th class="pb-4 font-cairo">{{ 'FINANCE.REQUESTER' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.PROJECT' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.AMOUNT' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.REASON' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.DATE' | translate }}</th>
                  <th class="pb-4 text-center font-cairo">{{ 'FINANCE.ACTIONS' | translate }}</th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-slate-800/60 text-slate-300">
                @for (request of pendingApprovals(); track request.id) {
                  <tr class="hover:bg-slate-950/20">
                    <td class="py-4 text-white font-semibold">{{ request.issuedTo }}</td>
                    <td class="py-4 text-slate-300 font-medium">{{ getProjectName(request) }}</td>
                    <td class="py-4 text-amber-400 font-bold font-mono tabular-nums">{{ request.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</td>
                    <td class="py-4 text-slate-400 max-w-[220px] lg:max-w-[320px] truncate cursor-pointer hover:text-sky-400 transition-colors"
                        [title]="request.reason"
                        (click)="openPendingApprovalReasonModal(request)">
                      {{ request.reason }}
                    </td>
                    <td class="py-4 text-slate-400 font-mono tabular-nums">{{ request.issuedAt | date:'dd/MM/yyyy HH:mm' }}</td>
                    <td class="py-4">
                      <div class="flex items-center gap-2 justify-center">
                        <button 
                          (click)="openApproveModal(request)"
                          class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer font-cairo"
                        >
                          {{ 'FINANCE.APPROVE' | translate }}
                        </button>
                        <button 
                          (click)="openRejectModal(request)"
                          class="bg-rose-600 hover:bg-rose-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer font-cairo"
                        >
                          {{ 'FINANCE.REJECT' | translate }}
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="py-12 text-center text-slate-500 font-cairo">
                      {{ 'FINANCE.NO_PENDING_APPROVALS' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Mobile Cards View (< md) -->
          <div class="block md:hidden space-y-3">
            @for (request of pendingApprovals(); track request.id) {
              <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 shadow-md">
                <div class="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                  <span class="text-sm font-bold text-white font-cairo">{{ request.issuedTo }}</span>
                  <span class="text-sm font-bold text-amber-400 font-mono tabular-nums">{{ request.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</span>
                </div>
                <div class="text-xs text-slate-400 font-cairo flex items-center justify-between">
                  <span>\u{1F3D7}\uFE0F {{ getProjectName(request) }}</span>
                  <span class="font-mono tabular-nums text-slate-500">{{ request.issuedAt | date:'dd/MM/yyyy HH:mm' }}</span>
                </div>
                <p class="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg font-cairo cursor-pointer" (click)="openPendingApprovalReasonModal(request)">
                  \u{1F4AC} {{ request.reason }}
                </p>
                <div class="flex items-center gap-2 pt-1">
                  <button (click)="openApproveModal(request)" class="flex-1 min-h-[40px] bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-cairo">
                    {{ 'FINANCE.APPROVE' | translate }}
                  </button>
                  <button (click)="openRejectModal(request)" class="flex-1 min-h-[40px] bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold font-cairo">
                    {{ 'FINANCE.REJECT' | translate }}
                  </button>
                </div>
              </div>
            } @empty {
              <div class="py-8 text-center text-slate-500 text-sm font-cairo">
                {{ 'FINANCE.NO_PENDING_APPROVALS' | translate }}
              </div>
            }
          </div>
        </div>
      }

      <!-- Petty Cash Requests (for Site Engineer) -->
      @if (isSiteEngineer()) {
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 class="text-xl font-bold text-white mb-6 font-cairo">{{ 'FINANCE.MY_PETTY_CASH' | translate }}</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left rtl:text-right font-sans">
              <thead>
                <tr class="text-slate-400 text-xs font-bold uppercase border-b border-slate-800/80">
                  <th class="pb-4 font-cairo">{{ 'FINANCE.PROJECT' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.AMOUNT' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.REASON' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.DATE' | translate }}</th>
                  <th class="pb-4 text-center font-cairo">{{ 'FINANCE.STATUS' | translate }}</th>
                  <th class="pb-4 text-center font-cairo">{{ 'FINANCE.ACTIONS' | translate }}</th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-slate-800/60 text-slate-300">
                @for (request of myPettyCash(); track request.id) {
                  <tr class="hover:bg-slate-950/20">
                    <td class="py-4 text-white font-medium">{{ getProjectName(request) }}</td>
                    <td class="py-4 text-amber-400 font-bold font-mono">{{ request.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</td>
                    <td class="py-4 text-slate-400 max-w-[220px] lg:max-w-[320px] truncate cursor-pointer hover:text-sky-400 transition-colors"
                        [title]="request.reason"
                        (click)="openMyPettyCashReasonModal(request)">
                      {{ request.reason }}
                    </td>
                    <td class="py-4 text-slate-400 font-mono">{{ request.issuedAt | date:'dd/MM/yyyy HH:mm' }}</td>
                    <td class="py-4 text-center">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border font-cairo" 
                        [class.bg-emerald-500/10]="request.status === 'Settled'" 
                        [class.text-emerald-400]="request.status === 'Settled'"
                        [class.border-emerald-500/20]="request.status === 'Settled'"
                        [class.bg-amber-500/10]="request.status === 'Issued'" 
                        [class.text-amber-400]="request.status === 'Issued'"
                        [class.border-amber-500/20]="request.status === 'Issued'"
                        [class.bg-blue-500/10]="request.status === 'Pending'" 
                        [class.text-blue-400]="request.status === 'Pending'"
                        [class.border-blue-500/20]="request.status === 'Pending'"
                        [class.bg-rose-500/10]="request.status === 'Rejected'" 
                        [class.text-rose-400]="request.status === 'Rejected'"
                        [class.border-rose-500/20]="request.status === 'Rejected'"
                      >
                        @if (request.status === 'Pending') {
                          {{ 'FINANCE.PENDING' | translate }}
                        } @else if (request.status === 'Issued') {
                          Approved
                        } @else if (request.status === 'Rejected') {
                          Rejected
                        } @else {
                          {{ 'FINANCE.SETTLED' | translate }}
                        }
                      </span>
                    </td>
                    <td class="py-4 text-center">
                      @if (request.status === 'Issued') {
                        <button 
                          (click)="openSettleModal(request)"
                          class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer font-cairo"
                        >
                          {{ 'FINANCE.SUBMIT_RECEIPTS' | translate }}
                        </button>
                      } @else if (request.status === 'Rejected' && request.comments) {
                        <span class="text-xs text-rose-400 italic block max-w-xs truncate" [title]="request.comments">Reason: {{ request.comments }}</span>
                      } @else if (request.status === 'Settled') {
                        <div class="flex items-center justify-center gap-2">
                          @if (request.receiptPhotoUrl) {
                            <a [href]="request.receiptPhotoUrl" target="_blank" 
                               class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-500/10 hover:bg-indigo-500/25 text-indigo-400 border border-indigo-500/20 transition-all cursor-pointer font-cairo shadow-sm" 
                               title="View Receipt">
                              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0625\u064A\u0635\u0627\u0644</span>
                            </a>
                          }
                          @if (request.settlementPaymentMethod) {
                            <span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-300" title="Payment Method">
                              {{ request.settlementPaymentMethod }}
                            </span>
                          }
                          @if (request.expenseDate) {
                            <span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-400" title="Expense Date">
                              {{ request.expenseDate | date:'dd/MM/yyyy' }}
                            </span>
                          }
                        </div>
                      } @else {
                        <span class="text-xs text-slate-600 italic font-cairo">-</span>
                      }
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="py-12 text-center text-slate-500 font-cairo">
                      {{ 'FINANCE.NO_PETTY_CASH' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- Financial Transactions (for TenantOwner and Accountant) -->
      @if (isOwnerOrAccountant()) {
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 class="text-xl font-bold text-white mb-6 font-cairo">{{ 'FINANCE.TRANSACTIONS' | translate }}</h2>
          <!-- Desktop Table (md+) -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full text-left rtl:text-right font-sans">
              <thead>
                <tr class="text-slate-400 text-xs font-bold uppercase border-b border-slate-800/80">
                  <th class="pb-4 font-cairo">{{ 'FINANCE.DATE' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.DESCRIPTION' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.TYPE' | translate }}</th>
                  <th class="pb-4 text-center font-cairo">{{ 'FINANCE.AMOUNT' | translate }}</th>
                  @if (isOwnerOrAccountant()) {
                    <th class="pb-4 text-center font-cairo">{{ 'FINANCE.ACTIONS' | translate }}</th>
                  }
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-slate-800/60 text-slate-300">
                @for (transaction of transactions(); track transaction.id) {
                  <tr class="hover:bg-slate-950/20">
                    <td class="py-4 text-slate-400 font-mono tabular-nums">{{ transaction.transactionDate | date:'dd/MM/yyyy HH:mm' }}</td>
                    <td class="py-4 text-white font-medium max-w-[220px] lg:max-w-[320px] truncate cursor-pointer hover:text-sky-400 transition-colors"
                        [title]="transaction.description"
                        (click)="openTransactionInspectionModal(transaction)">
                      {{ transaction.description }}
                    </td>
                    <td class="py-4">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border font-cairo" 
                        [class.bg-emerald-500/10]="transaction.type === 'Income'" 
                        [class.text-emerald-400]="transaction.type === 'Income'"
                        [class.border-emerald-500/20]="transaction.type === 'Income'"
                        [class.bg-rose-500/10]="transaction.type === 'Expense'" 
                        [class.text-rose-400]="transaction.type === 'Expense'"
                        [class.border-rose-500/20]="transaction.type === 'Expense'"
                      >
                        {{ transaction.type === 'Income' ? ('FINANCE.INCOME' | translate) : ('FINANCE.EXPENSE' | translate) }}
                      </span>
                    </td>
                    <td class="py-4 text-center font-bold font-mono tabular-nums" 
                      [class.text-emerald-400]="transaction.type === 'Income'" 
                      [class.text-rose-400]="transaction.type === 'Expense'"
                    >
                      {{ transaction.type === 'Income' ? '+' : '-' }}{{ transaction.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}
                    </td>
                    @if (isOwnerOrAccountant()) {
                      <td class="py-4 text-center">
                        @if (transaction.description.toLowerCase().startsWith('petty cash settlement -')) {
                          <span class="inline-flex items-center gap-1 text-slate-500 text-xs font-semibold px-2 py-1 bg-slate-950/40 border border-slate-800 rounded-lg select-none">
                            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            \u{1F512} \u0645\u0642\u0641\u0644\u0629
                          </span>
                        } @else {
                          <div class="flex items-center justify-center gap-1.5">
                            <button
                              (click)="openEditTransactionModal(transaction)"
                              title="Edit transaction"
                              class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-150 cursor-pointer font-cairo">
                              Edit
                            </button>
                            <button
                              (click)="onDeleteTransaction(transaction.id, selectedProjectId())"
                              [disabled]="isDeletingTx()"
                              title="Delete transaction \u2014 capital injections roll back the pool automatically"
                              class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer font-cairo">
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
                    <td colspan="5" class="py-12 text-center text-slate-500 font-cairo">
                      {{ 'FINANCE.NO_TRANSACTIONS' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Mobile Cards View (< md) -->
          <div class="block md:hidden space-y-3">
            @for (transaction of transactions(); track transaction.id) {
              <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5 shadow-md">
                <div class="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border font-cairo" 
                    [class.bg-emerald-500/10]="transaction.type === 'Income'" 
                    [class.text-emerald-400]="transaction.type === 'Income'"
                    [class.border-emerald-500/20]="transaction.type === 'Income'"
                    [class.bg-rose-500/10]="transaction.type === 'Expense'" 
                    [class.text-rose-400]="transaction.type === 'Expense'"
                    [class.border-rose-500/20]="transaction.type === 'Expense'"
                  >
                    {{ transaction.type === 'Income' ? ('FINANCE.INCOME' | translate) : ('FINANCE.EXPENSE' | translate) }}
                  </span>
                  <span class="font-bold font-mono tabular-nums text-sm"
                    [class.text-emerald-400]="transaction.type === 'Income'" 
                    [class.text-rose-400]="transaction.type === 'Expense'"
                  >
                    {{ transaction.type === 'Income' ? '+' : '-' }}{{ transaction.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}
                  </span>
                </div>
                <p class="text-xs text-white font-medium font-cairo cursor-pointer" (click)="openTransactionInspectionModal(transaction)">
                  {{ transaction.description }}
                </p>
                <div class="flex items-center justify-between text-xs text-slate-500 font-mono tabular-nums pt-1">
                  <span>\u{1F4C5} {{ transaction.transactionDate | date:'dd/MM/yyyy HH:mm' }}</span>
                  @if (isOwnerOrAccountant() && !transaction.description.toLowerCase().startsWith('petty cash settlement -')) {
                    <div class="flex items-center gap-1.5">
                      <button (click)="openEditTransactionModal(transaction)" class="px-2.5 py-1 text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg font-cairo">Edit</button>
                      <button (click)="onDeleteTransaction(transaction.id, selectedProjectId())" [disabled]="isDeletingTx()" class="px-2.5 py-1 text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg font-cairo">Delete</button>
                    </div>
                  }
                </div>
              </div>
            } @empty {
              <div class="py-8 text-center text-slate-500 text-sm font-cairo">
                {{ 'FINANCE.NO_TRANSACTIONS' | translate }}
              </div>
            }
          </div>
        </div>
      }
    </div>

      <!-- Sticky Mobile Action Bar for Site Engineers -->
      @if (isSiteEngineer()) {
        <div class="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-30 flex items-center justify-center shadow-2xl">
          <button 
            (click)="openPettyCashModal()"
            [disabled]="isClosedProjectSelected()"
            class="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold font-cairo text-sm shadow-lg shadow-indigo-600/30 active:scale-95 disabled:opacity-50 transition-all"
          >
            \u2795 {{ 'FINANCE.REQUEST_PETTY_CASH' | translate }}
          </button>
        </div>
      }

    <!-- Petty Cash Request Modal -->
    @if (showPettyCashModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div (click)="closePettyCashModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">{{ 'FINANCE.REQUEST_PETTY_CASH' | translate }}</h3>
            <button (click)="closePettyCashModal()" class="text-slate-400 hover:text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form (ngSubmit)="submitPettyCashRequest()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.PROJECT' | translate }}</label>
              <select 
                [(ngModel)]="pettyCashForm.projectId" 
                name="projectId"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">{{ 'FINANCE.SELECT_PROJECT' | translate }}</option>
                @for (project of projects(); track project.id) {
                  <option [value]="project.id">{{ project.name }}</option>
                }
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.AMOUNT' | translate }}</label>
              <input 
                type="number" 
                [(ngModel)]="pettyCashForm.amount" 
                name="amount"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 font-mono"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.CATEGORY' | translate }}</label>
              <select 
                [(ngModel)]="pettyCashForm.category" 
                name="category"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">{{ 'FINANCE.SELECT_CATEGORY' | translate }}</option>
                <option value="Cement">{{ 'FINANCE.CATEGORY_CEMENT' | translate }}</option>
                <option value="Logistics">{{ 'FINANCE.CATEGORY_LOGISTICS' | translate }}</option>
                <option value="Materials">{{ 'FINANCE.CATEGORY_MATERIALS' | translate }}</option>
                <option value="Labor">{{ 'FINANCE.CATEGORY_LABOR' | translate }}</option>
                <option value="Other">{{ 'FINANCE.CATEGORY_OTHER' | translate }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.REASON' | translate }}</label>
              <textarea 
                [(ngModel)]="pettyCashForm.reason" 
                name="reason"
                rows="3"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 resize-none"
                required
              ></textarea>
            </div>
            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                (click)="closePettyCashModal()"
                class="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer font-cairo text-sm"
              >
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button 
                type="submit"
                [disabled]="loading() || !pettyCashForm.projectId || pettyCashForm.amount <= 0 || !pettyCashForm.reason"
                class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 cursor-pointer font-cairo text-sm"
              >
                {{ loading() ? ('COMMON.LOADING' | translate) : ('FINANCE.SUBMIT_REQUEST' | translate) }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Settle Petty Cash Modal -->
    @if (showSettleModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div (click)="closeSettleModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">{{ 'FINANCE.SUBMIT_RECEIPTS' | translate }}</h3>
            <button (click)="closeSettleModal()" class="text-slate-400 hover:text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form (ngSubmit)="submitSettleRequest()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div class="bg-slate-950 border border-slate-800/80 rounded-xl p-4">
              <div class="text-sm text-slate-400 mb-1 font-cairo">{{ 'FINANCE.ISSUED_AMOUNT' | translate }}</div>
              <div class="text-xl font-bold text-white font-mono">{{ settleRequest()?.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.SPENT_AMOUNT' | translate }}</label>
              <input 
                type="number" 
                [(ngModel)]="settleForm.spentAmount" 
                name="spentAmount"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 font-mono"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.RETURN_AMOUNT' | translate }}</label>
              <div class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-400 font-mono">
                {{ getCalculatedReturnAmount() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u0641\u0639\u0644\u064A <span class="text-red-400">*</span></label>
              <input 
                type="date" 
                [(ngModel)]="settleForm.expenseDate" 
                name="expenseDate"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 font-mono"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">\u0625\u0631\u0641\u0627\u0642 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 / \u0625\u064A\u0635\u0627\u0644 \u0627\u0644\u0635\u0631\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>
              <input 
                type="file" 
                (change)="onFileSelect($event)"
                accept="image/*"
                class="w-full bg-slate-955 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:cursor-pointer"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.RECEIPT_NOTES' | translate }}</label>
              <textarea 
                [(ngModel)]="settleForm.notes" 
                name="notes"
                rows="3"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 resize-none"
                required
                placeholder="\u0645\u062B\u0627\u0644: \u0634\u0631\u0627\u0621 \u0646\u062B\u0631\u064A\u0627\u062A \u0644\u0644\u0645\u0648\u0642\u0639\u060C \u062D\u0648\u0627\u0641\u0632 \u0639\u0645\u0627\u0644\u060C \u0641\u0648\u0627\u062A\u064A\u0631 \u0646\u0642\u0644..."
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">Payment Method / \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639 <span class="text-red-400">*</span></label>
              <select 
                [(ngModel)]="settleForm.settlementPaymentMethod" 
                name="settlementPaymentMethod"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">Select Method...</option>
                <option value="Cash">\u0643\u0627\u0634 (Cash)</option>
                <option value="InstaPay">\u0625\u0646\u0633\u062A\u0627 \u0628\u0627\u064A (InstaPay)</option>
                <option value="BankTransfer">\u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u0643\u064A (Bank Transfer)</option>
                <option value="Cheque">\u0634\u064A\u0643 (Cheque)</option>
              </select>
            </div>
            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                (click)="closeSettleModal()"
                class="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer font-cairo text-sm"
              >
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button 
                type="submit"
                [disabled]="loading() || settleForm.spentAmount <= 0 || settleForm.spentAmount > (settleRequest()?.amount || 0) || !settleForm.notes || !settleForm.settlementPaymentMethod || !settleForm.expenseDate"
                class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 cursor-pointer font-cairo text-sm"
              >
                {{ loading() ? ('COMMON.LOADING' | translate) : '\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062A\u0633\u0648\u064A\u0629' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Reject Comments Modal -->
    @if (showRejectModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div (click)="closeRejectModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">Reject Petty Cash Request</h3>
            <button (click)="closeRejectModal()" class="text-slate-400 hover:text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form (ngSubmit)="submitRejectRequest()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">Rejection Comments / Reason <span class="text-red-400">*</span></label>
              <textarea 
                [(ngModel)]="rejectComments" 
                name="comments"
                rows="3"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 resize-none"
                required
                placeholder="Type the reason for rejection..."
              ></textarea>
            </div>
            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                (click)="closeRejectModal()"
                class="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer font-cairo text-sm"
              >
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button 
                type="submit"
                [disabled]="loading() || !rejectComments.trim()"
                class="flex-1 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 cursor-pointer font-cairo text-sm"
              >
                Reject Request
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Approve Modal -->
    @if (showApproveModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div (click)="closeApproveModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">Approve Petty Cash</h3>
            <button (click)="closeApproveModal()" class="text-slate-400 hover:text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form (ngSubmit)="submitApproveRequest()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">Source Cash Pool <span class="text-red-400">*</span></label>
              <select 
                [(ngModel)]="approveSourcePoolId" 
                name="sourcePoolId"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                required>
                <option value="" disabled>Select cash pool...</option>
                @for (pool of currentProjectPools(); track pool.id) {
                  <option [value]="pool.id">{{ pool.sourceType }} (Avail: {{ pool.availableBalance | number:'1.2-2' }})</option>
                }
              </select>
            </div>
            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                (click)="closeApproveModal()"
                class="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer font-cairo text-sm"
              >
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button 
                type="submit"
                [disabled]="loading() || !approveSourcePoolId"
                class="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 cursor-pointer font-cairo text-sm"
              >
                {{ loading() ? ('COMMON.LOADING' | translate) : ('FINANCE.APPROVE' | translate) }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Edit Transaction Modal -->
    @if (isEditTransactionModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div (click)="closeEditTransactionModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 (Edit Transaction)</h3>
            <button (click)="closeEditTransactionModal()" class="text-slate-400 hover:text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form [formGroup]="editTransactionForm" (ngSubmit)="submitEditTransaction()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">Amount</label>
              <input type="number" formControlName="amount" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">Description</label>
              <textarea formControlName="description" rows="3" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none" required></textarea>
            </div>
            <div class="flex gap-3 pt-4">
              <button type="button" (click)="closeEditTransactionModal()" class="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer font-cairo text-sm">Cancel</button>
              <button type="submit" [disabled]="editTransactionForm.invalid || isSavingTransaction()" class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 cursor-pointer font-cairo text-sm">Save</button>
            </div>
          </form>
        </div>
      </div>
    }
    } @else {
      <div class="p-6 text-center text-rose-400 font-bold font-cairo">
        \u063A\u064A\u0631 \u0645\u0633\u0645\u0648\u062D \u0644\u0644\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0639\u0627\u0645 \u0628\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0644\u0644\u0645\u0633\u062A\u0623\u062C\u0631\u064A\u0646.
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
  `, styles: ['/* angular:styles/component:css;08f2e2ceb9d4f09b3c1b237b9c6ec71e9bc78f687db84d8ac0cce078b9bce77a;E:/private/structo/structo/Structo.Client/src/app/features/dashboard/financials/financials.component.ts */\n.font-cairo {\n  font-family:\n    "Cairo",\n    "Inter",\n    sans-serif;\n}\n/*# sourceMappingURL=financials.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FinancialsComponent, { className: "FinancialsComponent", filePath: "src/app/features/dashboard/financials/financials.component.ts", lineNumber: 822 });
})();
export {
  FinancialsComponent
};
//# sourceMappingURL=chunk-CTDEL54N.js.map
