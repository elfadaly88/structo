import {
  takeUntilDestroyed
} from "./chunk-W27PLDBB.js";
import {
  ToastService
} from "./chunk-DLHRGTU7.js";
import {
  CommonModule,
  DatePipe,
  HttpClient,
  NgClass,
  environment
} from "./chunk-2FDFRP6Y.js";
import {
  Component,
  DestroyRef,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-EHUV6UVS.js";

// src/app/features/dashboard/pending-users/pending-users.component.ts
var _c0 = (a0, a1, a2) => ({ "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20": a0, "bg-blue-500/10 text-blue-400 border border-blue-500/20": a1, "bg-slate-500/10 text-slate-400 border border-slate-500/20": a2 });
var _forTrack0 = ($index, $item) => $item.id;
function PendingUsersComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 18);
    \u0275\u0275text(2, " Loading pending users... ");
    \u0275\u0275elementEnd()();
  }
}
function PendingUsersComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 19);
    \u0275\u0275text(2, " \u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u062D\u0627\u0644\u064A\u0627\u064B / No pending users awaiting approval. ");
    \u0275\u0275elementEnd()();
  }
}
function PendingUsersComponent_Conditional_31_For_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 28);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r2.tenantName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("ID: ", user_r2.tenantId);
  }
}
function PendingUsersComponent_Conditional_31_For_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function PendingUsersComponent_Conditional_31_For_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(2, _c0, user_r2.subscriptionPlan === "Premium", user_r2.subscriptionPlan === "Standard", user_r2.subscriptionPlan === "Free"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r2.subscriptionPlan, " ");
  }
}
function PendingUsersComponent_Conditional_31_For_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function PendingUsersComponent_Conditional_31_For_1_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Processing... ");
  }
}
function PendingUsersComponent_Conditional_31_For_1_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062A\u0641\u0639\u064A\u0644 \u0648\u062A\u0646\u0634\u064A\u0637 / Activate & Approve ");
  }
}
function PendingUsersComponent_Conditional_31_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 20)(1, "td", 12)(2, "div", 21);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 22);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 12);
    \u0275\u0275conditionalCreate(7, PendingUsersComponent_Conditional_31_For_1_Conditional_7_Template, 4, 2)(8, PendingUsersComponent_Conditional_31_For_1_Conditional_8_Template, 2, 0, "span", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 12);
    \u0275\u0275conditionalCreate(10, PendingUsersComponent_Conditional_31_For_1_Conditional_10_Template, 2, 6, "span", 24)(11, PendingUsersComponent_Conditional_31_For_1_Conditional_11_Template, 2, 0, "span", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 25);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 13)(16, "button", 26);
    \u0275\u0275listener("click", function PendingUsersComponent_Conditional_31_For_1_Template_button_click_16_listener() {
      const user_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.approve(user_r2));
    });
    \u0275\u0275conditionalCreate(17, PendingUsersComponent_Conditional_31_For_1_Conditional_17_Template, 1, 0)(18, PendingUsersComponent_Conditional_31_For_1_Conditional_18_Template, 1, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", user_r2.firstName, " ", user_r2.lastName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r2.email);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(user_r2.tenantName ? 7 : 8);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(user_r2.subscriptionPlan ? 10 : 11);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(14, 8, user_r2.createdAt, "dd/MM/yyyy h:mm a"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.processingId() === user_r2.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.processingId() === user_r2.id ? 17 : 18);
  }
}
function PendingUsersComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, PendingUsersComponent_Conditional_31_For_1_Template, 19, 11, "tr", 20, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.pendingUsers());
  }
}
function PendingUsersComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function PendingUsersComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, "\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u062D\u0627\u0644\u064A\u0627\u064B.");
    \u0275\u0275elementEnd();
  }
}
function PendingUsersComponent_Conditional_35_For_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r5.subscriptionPlan);
  }
}
function PendingUsersComponent_Conditional_35_For_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 37);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F3E2} ", user_r5.tenantName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("ID: ", user_r5.tenantId);
  }
}
function PendingUsersComponent_Conditional_35_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 30)(2, "div")(3, "div", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 32);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, PendingUsersComponent_Conditional_35_For_1_Conditional_7_Template, 2, 1, "span", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, PendingUsersComponent_Conditional_35_For_1_Conditional_8_Template, 5, 2, "div", 34);
    \u0275\u0275elementStart(9, "div", 35);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 36);
    \u0275\u0275listener("click", function PendingUsersComponent_Conditional_35_For_1_Template_button_click_12_listener() {
      const user_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.approve(user_r5));
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", user_r5.firstName, " ", user_r5.lastName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r5.email);
    \u0275\u0275advance();
    \u0275\u0275conditional(user_r5.subscriptionPlan ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(user_r5.tenantName ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u{1F4C5} ", \u0275\u0275pipeBind2(11, 8, user_r5.createdAt, "dd/MM/yyyy h:mm a"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.processingId() === user_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.processingId() === user_r5.id ? "Processing..." : "\u062A\u0641\u0639\u064A\u0644 \u0648\u062A\u0646\u0634\u064A\u0637 / Activate & Approve", " ");
  }
}
function PendingUsersComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, PendingUsersComponent_Conditional_35_For_1_Template, 14, 11, "div", 29, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.pendingUsers());
  }
}
var PendingUsersComponent = class _PendingUsersComponent {
  http = inject(HttpClient);
  toast = inject(ToastService);
  destroyRef = inject(DestroyRef);
  pendingUsers = signal(
    [],
    ...ngDevMode ? [{ debugName: "pendingUsers" }] : (
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
  processingId = signal(
    null,
    ...ngDevMode ? [{ debugName: "processingId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ngOnInit() {
    this.fetchPendingUsers();
  }
  fetchPendingUsers() {
    this.isLoading.set(true);
    this.http.get(`${environment.apiUrl}/superadmin/pending-users`).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          this.pendingUsers.set(res.data);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.toast.show("\u062E\u0637\u0623 / Error", "Failed to load pending users.", "error");
      }
    });
  }
  approve(user) {
    this.processingId.set(user.id);
    this.http.post(`${environment.apiUrl}/superadmin/approve/${user.id}`, {}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.processingId.set(null);
        if (res.success) {
          this.toast.show("\u0646\u062C\u0627\u062D / Success", `\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u062D\u0633\u0627\u0628 ${user.firstName} \u0628\u0646\u062C\u0627\u062D.`, "success");
          this.pendingUsers.update((users) => users.filter((u) => u.id !== user.id));
        } else {
          this.toast.show("\u062E\u0637\u0623 / Error", res.message || "Failed to approve user.", "error");
        }
      },
      error: (err) => {
        this.processingId.set(null);
        this.toast.show("\u062E\u0637\u0623 / Error", err.error?.message || err.message || "Failed to approve user.", "error");
      }
    });
  }
  static \u0275fac = function PendingUsersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PendingUsersComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PendingUsersComponent, selectors: [["app-pending-users"]], decls: 36, vars: 3, consts: [[1, "space-y-6", "w-full", "max-w-7xl", "mx-auto"], [1, "flex", "flex-col", "sm:flex-row", "justify-between", "items-start", "sm:items-center", "gap-4", "border-b", "border-slate-800/60", "pb-5"], [1, "text-3xl", "font-extrabold", "tracking-tight", "text-white", "font-cairo"], [1, "text-sm", "text-slate-400", "mt-1", "font-cairo"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-5"], [1, "bg-slate-900/40", "border", "border-slate-800/80", "rounded-2xl", "p-5", "shadow-lg", "shadow-indigo-500/5"], [1, "text-xs", "text-slate-500", "font-bold", "uppercase", "tracking-wider", "block", "font-cairo"], [1, "text-3xl", "font-extrabold", "text-white", "mt-1", "font-mono", "tabular-nums"], [1, "bg-slate-900/20", "border", "border-slate-800/60", "rounded-2xl", "overflow-hidden", "shadow-xl"], [1, "hidden", "md:block", "overflow-x-auto", "min-h-0"], [1, "w-full", "text-left", "border-collapse", "font-cairo"], [1, "border-b", "border-slate-800", "bg-slate-950/40", "text-slate-400", "text-xs", "font-bold", "uppercase", "tracking-wider"], [1, "py-4", "px-6"], [1, "py-4", "px-6", "text-right"], [1, "divide-y", "divide-slate-800/60", "text-slate-300", "text-sm"], [1, "block", "md:hidden", "p-4", "space-y-3"], [1, "py-8", "text-center", "text-slate-500", "text-xs", "font-cairo", "animate-pulse"], [1, "py-8", "text-center", "text-slate-500", "text-xs", "font-cairo"], ["colspan", "5", 1, "py-12", "text-center", "text-slate-500", "font-semibold", "animate-pulse"], ["colspan", "5", 1, "py-12", "text-center", "text-slate-500", "font-semibold", "font-cairo"], [1, "hover:bg-slate-900/30", "transition-colors", "duration-150"], [1, "font-bold", "text-white", "text-sm"], [1, "text-xs", "text-slate-400", "mt-0.5", "font-mono", "tabular-nums"], [1, "text-xs", "text-slate-500", "font-semibold"], [1, "inline-flex", "items-center", "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-semibold", 3, "ngClass"], [1, "py-4", "px-6", "text-xs", "text-slate-400", "font-mono", "tabular-nums"], [1, "px-4", "py-1.5", "bg-indigo-600", "hover:bg-indigo-700", "text-white", "rounded-xl", "text-xs", "font-bold", "shadow-lg", "shadow-indigo-600/10", "transition-all", "hover:scale-[1.03]", "active:scale-[0.97]", "cursor-pointer", "disabled:opacity-50", "disabled:cursor-not-allowed", "font-cairo", 3, "click", "disabled"], [1, "font-semibold", "text-slate-200"], [1, "text-[10px]", "text-slate-500", "font-mono", "tabular-nums", "mt-0.5"], [1, "bg-slate-950", "border", "border-slate-800", "rounded-xl", "p-4", "space-y-3", "shadow-md"], [1, "flex", "items-center", "justify-between", "gap-2", "border-b", "border-slate-800/80", "pb-2"], [1, "font-bold", "text-white", "text-sm", "font-cairo"], [1, "text-xs", "text-slate-400", "font-mono", "tabular-nums"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "bg-indigo-500/10", "text-indigo-400", "border", "border-indigo-500/20", "font-cairo"], [1, "text-xs", "text-slate-300", "font-cairo", "flex", "items-center", "justify-between"], [1, "text-[11px]", "text-slate-500", "font-mono", "tabular-nums"], [1, "w-full", "min-h-[44px]", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "rounded-xl", "text-xs", "font-bold", "font-cairo", "shadow-lg", "shadow-indigo-600/20", "active:scale-95", "disabled:opacity-50", 3, "click", "disabled"], [1, "font-mono", "tabular-nums", "text-slate-500", "text-[10px]"]], template: function PendingUsersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, " \u23F3 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0627\u0644\u0645\u0639\u0644\u0642\u0648\u0646 / Pending Approvals ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "\u062A\u0641\u0639\u064A\u0644 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0644\u0627\u0643 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062C\u062F\u062F \u0648\u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u062E\u0637\u0637 \u0627\u0634\u062A\u0631\u0627\u0643\u0627\u062A\u0647\u0645 \u0642\u0628\u0644 \u0645\u0646\u062D\u0647\u0645 \u062D\u0642 \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0645\u0646\u0635\u0629.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 4)(8, "div", 5)(9, "span", 6);
      \u0275\u0275text(10, "\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 / Awaiting Approval");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "h3", 7);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 8)(14, "div", 9)(15, "table", 10)(16, "thead")(17, "tr", 11)(18, "th", 12);
      \u0275\u0275text(19, "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 / User Details");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "th", 12);
      \u0275\u0275text(21, "\u0627\u0644\u0634\u0631\u0643\u0629 / Company Details");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "th", 12);
      \u0275\u0275text(23, "\u062E\u0637\u0629 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 / Plan");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "th", 12);
      \u0275\u0275text(25, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0633\u062C\u064A\u0644 / Created At");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "th", 13);
      \u0275\u0275text(27, "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A / Actions");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "tbody", 14);
      \u0275\u0275conditionalCreate(29, PendingUsersComponent_Conditional_29_Template, 3, 0, "tr")(30, PendingUsersComponent_Conditional_30_Template, 3, 0, "tr")(31, PendingUsersComponent_Conditional_31_Template, 2, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "div", 15);
      \u0275\u0275conditionalCreate(33, PendingUsersComponent_Conditional_33_Template, 2, 0, "div", 16)(34, PendingUsersComponent_Conditional_34_Template, 2, 0, "div", 17)(35, PendingUsersComponent_Conditional_35_Template, 2, 0);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.pendingUsers().length);
      \u0275\u0275advance(17);
      \u0275\u0275conditional(ctx.isLoading() ? 29 : ctx.pendingUsers().length === 0 ? 30 : 31);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.isLoading() ? 33 : ctx.pendingUsers().length === 0 ? 34 : 35);
    }
  }, dependencies: [CommonModule, NgClass, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PendingUsersComponent, [{
    type: Component,
    args: [{
      selector: "app-pending-users",
      standalone: true,
      imports: [CommonModule, DatePipe],
      template: `
    <div class="space-y-6 w-full max-w-7xl mx-auto">
      <!-- Title -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/60 pb-5">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-white font-cairo">
            \u23F3 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0627\u0644\u0645\u0639\u0644\u0642\u0648\u0646 / Pending Approvals
          </h1>
          <p class="text-sm text-slate-400 mt-1 font-cairo">\u062A\u0641\u0639\u064A\u0644 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0644\u0627\u0643 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062C\u062F\u062F \u0648\u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u062E\u0637\u0637 \u0627\u0634\u062A\u0631\u0627\u0643\u0627\u062A\u0647\u0645 \u0642\u0628\u0644 \u0645\u0646\u062D\u0647\u0645 \u062D\u0642 \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0645\u0646\u0635\u0629.</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-lg shadow-indigo-500/5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider block font-cairo">\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 / Awaiting Approval</span>
          <h3 class="text-3xl font-extrabold text-white mt-1 font-mono tabular-nums">{{ pendingUsers().length }}</h3>
        </div>
      </div>

      <!-- Main Container with custom scrolls -->
      <div class="bg-slate-900/20 border border-slate-800/60 rounded-2xl overflow-hidden shadow-xl">
        <!-- Desktop Table (md+) -->
        <div class="hidden md:block overflow-x-auto min-h-0">
          <table class="w-full text-left border-collapse font-cairo">
            <thead>
              <tr class="border-b border-slate-800 bg-slate-950/40 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th class="py-4 px-6">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 / User Details</th>
                <th class="py-4 px-6">\u0627\u0644\u0634\u0631\u0643\u0629 / Company Details</th>
                <th class="py-4 px-6">\u062E\u0637\u0629 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 / Plan</th>
                <th class="py-4 px-6">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0633\u062C\u064A\u0644 / Created At</th>
                <th class="py-4 px-6 text-right">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A / Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 text-slate-300 text-sm">
              @if (isLoading()) {
                <tr>
                  <td colspan="5" class="py-12 text-center text-slate-500 font-semibold animate-pulse">
                    Loading pending users...
                  </td>
                </tr>
              } @else if (pendingUsers().length === 0) {
                <tr>
                  <td colspan="5" class="py-12 text-center text-slate-500 font-semibold font-cairo">
                    \u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u062D\u0627\u0644\u064A\u0627\u064B / No pending users awaiting approval.
                  </td>
                </tr>
              } @else {
                @for (user of pendingUsers(); track user.id) {
                  <tr class="hover:bg-slate-900/30 transition-colors duration-150">
                    <td class="py-4 px-6">
                      <div class="font-bold text-white text-sm">{{ user.firstName }} {{ user.lastName }}</div>
                      <div class="text-xs text-slate-400 mt-0.5 font-mono tabular-nums">{{ user.email }}</div>
                    </td>
                    <td class="py-4 px-6">
                      @if (user.tenantName) {
                        <div class="font-semibold text-slate-200">{{ user.tenantName }}</div>
                        <div class="text-[10px] text-slate-500 font-mono tabular-nums mt-0.5">ID: {{ user.tenantId }}</div>
                      } @else {
                        <span class="text-xs text-slate-500 font-semibold">\u2014</span>
                      }
                    </td>
                    <td class="py-4 px-6">
                      @if (user.subscriptionPlan) {
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          [ngClass]="{
                            'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': user.subscriptionPlan === 'Premium',
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20': user.subscriptionPlan === 'Standard',
                            'bg-slate-500/10 text-slate-400 border border-slate-500/20': user.subscriptionPlan === 'Free'
                          }">
                          {{ user.subscriptionPlan }}
                        </span>
                      } @else {
                        <span class="text-xs text-slate-500 font-semibold">\u2014</span>
                      }
                    </td>
                    <td class="py-4 px-6 text-xs text-slate-400 font-mono tabular-nums">
                      {{ user.createdAt | date: 'dd/MM/yyyy h:mm a' }}
                    </td>
                    <td class="py-4 px-6 text-right">
                      <button
                        (click)="approve(user)"
                        [disabled]="processingId() === user.id"
                        class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-cairo"
                      >
                        @if (processingId() === user.id) {
                          Processing...
                        } @else {
                          \u062A\u0641\u0639\u064A\u0644 \u0648\u062A\u0646\u0634\u064A\u0637 / Activate & Approve
                        }
                      </button>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards View (< md) -->
        <div class="block md:hidden p-4 space-y-3">
          @if (isLoading()) {
            <div class="py-8 text-center text-slate-500 text-xs font-cairo animate-pulse">Loading...</div>
          } @else if (pendingUsers().length === 0) {
            <div class="py-8 text-center text-slate-500 text-xs font-cairo">\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u062D\u0627\u0644\u064A\u0627\u064B.</div>
          } @else {
            @for (user of pendingUsers(); track user.id) {
              <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 shadow-md">
                <div class="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div>
                    <div class="font-bold text-white text-sm font-cairo">{{ user.firstName }} {{ user.lastName }}</div>
                    <div class="text-xs text-slate-400 font-mono tabular-nums">{{ user.email }}</div>
                  </div>
                  @if (user.subscriptionPlan) {
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-cairo">{{ user.subscriptionPlan }}</span>
                  }
                </div>
                @if (user.tenantName) {
                  <div class="text-xs text-slate-300 font-cairo flex items-center justify-between">
                    <span>\u{1F3E2} {{ user.tenantName }}</span>
                    <span class="font-mono tabular-nums text-slate-500 text-[10px]">ID: {{ user.tenantId }}</span>
                  </div>
                }
                <div class="text-[11px] text-slate-500 font-mono tabular-nums">
                  \u{1F4C5} {{ user.createdAt | date: 'dd/MM/yyyy h:mm a' }}
                </div>
                <button
                  (click)="approve(user)"
                  [disabled]="processingId() === user.id"
                  class="w-full min-h-[44px] bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold font-cairo shadow-lg shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
                >
                  {{ processingId() === user.id ? 'Processing...' : '\u062A\u0641\u0639\u064A\u0644 \u0648\u062A\u0646\u0634\u064A\u0637 / Activate & Approve' }}
                </button>
              </div>
            }
          }
        </div>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PendingUsersComponent, { className: "PendingUsersComponent", filePath: "src/app/features/dashboard/pending-users/pending-users.component.ts", lineNumber: 168 });
})();
export {
  PendingUsersComponent
};
//# sourceMappingURL=chunk-67W6Y3G2.js.map
