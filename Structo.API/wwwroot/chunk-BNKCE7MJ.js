import {
  ProjectCloseoutService
} from "./chunk-7LRVYSY5.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-BKICS27Q.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-EJQP67NP.js";
import {
  CommonModule
} from "./chunk-FIWEE23C.js";
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
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-ODSQXAQU.js";

// src/app/features/public/project-review.component.ts
var _c0 = () => [1, 2, 3, 4, 5];
function ProjectReviewComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 12);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 13);
    \u0275\u0275element(3, "path", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div", 15)(5, "h3", 16);
    \u0275\u0275text(6, "\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u062A\u0642\u064A\u064A\u0645\u0643 \u0628\u0646\u062C\u0627\u062D!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 17);
    \u0275\u0275text(8, "\u0646\u0634\u0643\u0631\u0643 \u062C\u0632\u064A\u0644 \u0627\u0644\u0634\u0643\u0631 \u0639\u0644\u0649 \u0648\u0642\u062A\u0643 \u0648\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643 \u0627\u0644\u0642\u064A\u0645\u0629.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 18)(10, "a", 19);
    \u0275\u0275text(11, " \u0627\u0644\u0631\u062C\u0648\u0639 \u0644\u0644\u0631\u0626\u064A\u0633\u064A\u0629 / Home ");
    \u0275\u0275elementEnd()()();
  }
}
function ProjectReviewComponent_Conditional_12_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function ProjectReviewComponent_Conditional_12_For_8_Template_button_click_0_listener() {
      const star_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setRating(star_r4));
    })("mouseenter", function ProjectReviewComponent_Conditional_12_For_8_Template_button_mouseenter_0_listener() {
      const star_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.hoverRating.set(star_r4));
    })("mouseleave", function ProjectReviewComponent_Conditional_12_For_8_Template_button_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.hoverRating.set(0));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, " \u2605 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const star_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-amber-400", star_r4 <= (ctx_r1.hoverRating() || ctx_r1.currentRating()))("text-slate-700", star_r4 > (ctx_r1.hoverRating() || ctx_r1.currentRating()));
  }
}
function ProjectReviewComponent_Conditional_12_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1, "\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0627\u0644\u0646\u062C\u0648\u0645 / Rating is required");
    \u0275\u0275elementEnd();
  }
}
function ProjectReviewComponent_Conditional_12_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "\u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0645\u0637\u0644\u0648\u0628 \u0648\u0644\u0627 \u064A\u0642\u0644 \u0639\u0646 10 \u0623\u062D\u0631\u0641 / Notes must be at least 10 characters");
    \u0275\u0275elementEnd();
  }
}
function ProjectReviewComponent_Conditional_12_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage(), " ");
  }
}
function ProjectReviewComponent_Conditional_12_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 32);
    \u0275\u0275element(1, "circle", 33)(2, "path", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0631\u0633\u0627\u0644...");
    \u0275\u0275elementEnd();
  }
}
function ProjectReviewComponent_Conditional_12_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 / Submit Review");
    \u0275\u0275elementEnd();
  }
}
function ProjectReviewComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 20);
    \u0275\u0275listener("ngSubmit", function ProjectReviewComponent_Conditional_12_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 21)(2, "label", 22);
    \u0275\u0275text(3, " \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0639\u0627\u0645 / Star Rating ");
    \u0275\u0275elementStart(4, "span", 23);
    \u0275\u0275text(5, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 24);
    \u0275\u0275repeaterCreate(7, ProjectReviewComponent_Conditional_12_For_8_Template, 3, 4, "button", 25, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, ProjectReviewComponent_Conditional_12_Conditional_9_Template, 2, 0, "p", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 21)(11, "label", 22);
    \u0275\u0275text(12, " \u062A\u0639\u0644\u064A\u0642\u0627\u062A\u0643 \u0648\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643 / Review Notes ");
    \u0275\u0275elementStart(13, "span", 23);
    \u0275\u0275text(14, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(15, "textarea", 27);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(16, ProjectReviewComponent_Conditional_12_Conditional_16_Template, 2, 0, "p", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, ProjectReviewComponent_Conditional_12_Conditional_17_Template, 2, 1, "div", 29);
    \u0275\u0275elementStart(18, "button", 30);
    \u0275\u0275conditionalCreate(19, ProjectReviewComponent_Conditional_12_Conditional_19_Template, 5, 0)(20, ProjectReviewComponent_Conditional_12_Conditional_20_Template, 2, 0, "span");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.reviewForm);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(6, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.reviewForm.get("rating")?.touched && ctx_r1.reviewForm.get("rating")?.invalid ? 9 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.reviewForm.get("notes")?.touched && ctx_r1.reviewForm.get("notes")?.invalid ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.errorMessage() ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.reviewForm.invalid || ctx_r1.isSubmitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSubmitting() ? 19 : 20);
  }
}
var ProjectReviewComponent = class _ProjectReviewComponent {
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  closeoutService = inject(ProjectCloseoutService);
  currentRating = signal(
    0,
    ...ngDevMode ? [{ debugName: "currentRating" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hoverRating = signal(
    0,
    ...ngDevMode ? [{ debugName: "hoverRating" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSubmitting = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSubmitting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSuccess = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSuccess" }] : (
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
  currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  token = "";
  reviewForm = this.fb.group({
    rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    notes: ["", [Validators.required, Validators.minLength(10)]]
  });
  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token") || "";
    if (!this.token) {
      this.errorMessage.set("\u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D / Invalid review link.");
    }
  }
  setRating(val) {
    this.currentRating.set(val);
    this.reviewForm.patchValue({ rating: val });
    this.reviewForm.get("rating")?.markAsTouched();
  }
  onSubmit() {
    if (this.reviewForm.invalid || !this.token) {
      this.reviewForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    const formVal = this.reviewForm.value;
    const dto = {
      rating: formVal.rating,
      notes: formVal.notes
    };
    this.closeoutService.submitClientReview(this.token, dto).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        if (res.success) {
          this.isSuccess.set(true);
        } else {
          this.errorMessage.set(res.message || "\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645. \u0642\u062F \u064A\u0643\u0648\u0646 \u0627\u0644\u0631\u0627\u0628\u0637 \u0645\u0646\u062A\u0647\u064A \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629.");
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.error?.message || err.message || "\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645.");
      }
    });
  }
  static \u0275fac = function ProjectReviewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectReviewComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectReviewComponent, selectors: [["app-project-review"]], decls: 15, vars: 2, consts: [[1, "min-h-screen", "bg-slate-950", "text-slate-100", "flex", "flex-col", "justify-between", "py-12", "px-4", "sm:px-6", "lg:px-8"], [1, "absolute", "top-0", "inset-x-0", "h-80", "bg-gradient-to-b", "from-indigo-500/10", "via-transparent", "to-transparent", "pointer-events-none"], [1, "relative", "max-w-lg", "w-full", "mx-auto", "my-auto", "bg-slate-900", "border", "border-slate-800", "rounded-3xl", "p-6", "sm:p-8", "shadow-2xl", "space-y-6"], [1, "text-center", "space-y-2"], [1, "inline-flex", "p-3", "rounded-2xl", "bg-indigo-500/10", "text-indigo-400", "border", "border-indigo-500/20", "mb-2"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-8", "h-8"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.242.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.175 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.883c-.773-.569-.374-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z"], [1, "text-2xl", "font-extrabold", "tracking-tight", "text-white", "font-cairo"], [1, "text-sm", "text-slate-400", "font-cairo", "max-w-sm", "mx-auto"], [1, "text-center", "py-8", "space-y-4", "animate-[scaleIn_0.2s_ease-out]"], [1, "space-y-5", 3, "formGroup"], [1, "text-center", "text-xs", "text-slate-600", "font-cairo"], [1, "inline-flex", "p-3", "rounded-full", "bg-emerald-500/10", "text-emerald-400", "border", "border-emerald-500/20"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-10", "h-10"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "3", "d", "M5 13l4 4L19 7"], [1, "space-y-1"], [1, "text-lg", "font-bold", "text-white", "font-cairo"], [1, "text-xs", "text-slate-400", "font-cairo"], [1, "pt-4"], ["routerLink", "/", 1, "inline-flex", "items-center", "justify-center", "px-6", "py-2.5", "bg-slate-800", "hover:bg-slate-700", "text-slate-200", "text-xs", "font-bold", "rounded-xl", "transition-all", "font-cairo"], [1, "space-y-5", 3, "ngSubmit", "formGroup"], [1, "space-y-2"], [1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "font-cairo"], [1, "text-red-400"], [1, "flex", "items-center", "gap-3", "justify-center", "py-3", "bg-slate-950/40", "rounded-2xl", "border", "border-slate-800"], ["type", "button", 1, "p-1", "hover:scale-125", "transition-transform", "duration-100", "text-3xl", "focus:outline-none", "cursor-pointer"], [1, "text-[11px]", "text-rose-400", "font-cairo", "text-center"], ["formControlName", "notes", "rows", "4", "placeholder", "\u0623\u0636\u0641 \u062A\u0639\u0644\u064A\u0642\u0627\u062A\u0643 \u062D\u0648\u0644 \u0623\u062F\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u060C \u0627\u0644\u062C\u0648\u062F\u0629\u060C \u0648\u0627\u0644\u062A\u0648\u0627\u0635\u0644...", 1, "w-full", "bg-slate-950/80", "border", "border-slate-800", "focus:border-indigo-500", "rounded-2xl", "p-4", "text-sm", "text-slate-200", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/20", "transition-all", "font-cairo", "resize-none"], [1, "text-[11px]", "text-rose-400", "font-cairo"], [1, "p-3", "bg-rose-500/10", "border", "border-rose-500/20", "text-rose-400", "rounded-xl", "text-xs", "font-semibold", "text-center", "font-cairo"], ["type", "submit", 1, "w-full", "flex", "items-center", "justify-center", "gap-2", "py-3", "bg-indigo-600", "hover:bg-indigo-500", "disabled:opacity-50", "text-sm", "font-bold", "rounded-2xl", "text-white", "shadow-xl", "hover:shadow-indigo-500/10", "transition-all", "duration-150", "cursor-pointer", "font-cairo", 3, "disabled"], ["type", "button", 1, "p-1", "hover:scale-125", "transition-transform", "duration-100", "text-3xl", "focus:outline-none", "cursor-pointer", 3, "click", "mouseenter", "mouseleave"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-5", "w-5", "text-white"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 12 5.373 12 12h4z", 1, "opacity-75"]], template: function ProjectReviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 5);
      \u0275\u0275element(6, "path", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "h2", 7);
      \u0275\u0275text(8, " \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 / Project Evaluation ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 8);
      \u0275\u0275text(10, " \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643\u0645 \u062A\u0633\u0627\u0639\u062F\u0646\u0627 \u0639\u0644\u0649 \u062A\u0637\u0648\u064A\u0631 \u062C\u0648\u062F\u0629 \u0627\u0644\u062E\u062F\u0645\u0629 \u0648\u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062F\u0627\u0645\u0629. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(11, ProjectReviewComponent_Conditional_11_Template, 12, 0, "div", 9)(12, ProjectReviewComponent_Conditional_12_Template, 21, 7, "form", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 11);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.isSuccess() ? 11 : 12);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" \xA9 ", ctx.currentYear, " Structo Accounting System. All rights reserved. ");
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectReviewComponent, [{
    type: Component,
    args: [{
      selector: "app-project-review",
      standalone: true,
      imports: [CommonModule, ReactiveFormsModule, RouterLink],
      template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      
      <!-- Top Decorator -->
      <div class="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none"></div>

      <!-- Main Container -->
      <div class="relative max-w-lg w-full mx-auto my-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <!-- Brand / Header -->
        <div class="text-center space-y-2">
          <div class="inline-flex p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.242.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.175 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.883c-.773-.569-.374-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
            </svg>
          </div>
          <h2 class="text-2xl font-extrabold tracking-tight text-white font-cairo">
            \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 / Project Evaluation
          </h2>
          <p class="text-sm text-slate-400 font-cairo max-w-sm mx-auto">
            \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643\u0645 \u062A\u0633\u0627\u0639\u062F\u0646\u0627 \u0639\u0644\u0649 \u062A\u0637\u0648\u064A\u0631 \u062C\u0648\u062F\u0629 \u0627\u0644\u062E\u062F\u0645\u0629 \u0648\u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062F\u0627\u0645\u0629.
          </p>
        </div>

        @if (isSuccess()) {
          <!-- Success State -->
          <div class="text-center py-8 space-y-4 animate-[scaleIn_0.2s_ease-out]">
            <div class="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="space-y-1">
              <h3 class="text-lg font-bold text-white font-cairo">\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u062A\u0642\u064A\u064A\u0645\u0643 \u0628\u0646\u062C\u0627\u062D!</h3>
              <p class="text-xs text-slate-400 font-cairo">\u0646\u0634\u0643\u0631\u0643 \u062C\u0632\u064A\u0644 \u0627\u0644\u0634\u0643\u0631 \u0639\u0644\u0649 \u0648\u0642\u062A\u0643 \u0648\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643 \u0627\u0644\u0642\u064A\u0645\u0629.</p>
            </div>
            <div class="pt-4">
              <a routerLink="/" class="inline-flex items-center justify-center px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all font-cairo">
                \u0627\u0644\u0631\u062C\u0648\u0639 \u0644\u0644\u0631\u0626\u064A\u0633\u064A\u0629 / Home
              </a>
            </div>
          </div>
        } @else {
          <!-- Form State -->
          <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="space-y-5">
            
            <!-- Rating Star Selector -->
            <div class="space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 font-cairo">
                \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0639\u0627\u0645 / Star Rating <span class="text-red-400">*</span>
              </label>
              
              <div class="flex items-center gap-3 justify-center py-3 bg-slate-950/40 rounded-2xl border border-slate-800">
                @for (star of [1, 2, 3, 4, 5]; track star) {
                  <button
                    type="button"
                    (click)="setRating(star)"
                    (mouseenter)="hoverRating.set(star)"
                    (mouseleave)="hoverRating.set(0)"
                    class="p-1 hover:scale-125 transition-transform duration-100 text-3xl focus:outline-none cursor-pointer">
                    <span [class.text-amber-400]="star <= (hoverRating() || currentRating())" [class.text-slate-700]="star > (hoverRating() || currentRating())">
                      \u2605
                    </span>
                  </button>
                }
              </div>
              @if (reviewForm.get('rating')?.touched && reviewForm.get('rating')?.invalid) {
                <p class="text-[11px] text-rose-400 font-cairo text-center">\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0627\u0644\u0646\u062C\u0648\u0645 / Rating is required</p>
              }
            </div>

            <!-- Notes TextArea -->
            <div class="space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 font-cairo">
                \u062A\u0639\u0644\u064A\u0642\u0627\u062A\u0643 \u0648\u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643 / Review Notes <span class="text-red-400">*</span>
              </label>
              <textarea
                formControlName="notes"
                rows="4"
                placeholder="\u0623\u0636\u0641 \u062A\u0639\u0644\u064A\u0642\u0627\u062A\u0643 \u062D\u0648\u0644 \u0623\u062F\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u060C \u0627\u0644\u062C\u0648\u062F\u0629\u060C \u0648\u0627\u0644\u062A\u0648\u0627\u0635\u0644..."
                class="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-2xl p-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-cairo resize-none"></textarea>
              @if (reviewForm.get('notes')?.touched && reviewForm.get('notes')?.invalid) {
                <p class="text-[11px] text-rose-400 font-cairo">\u0627\u0644\u062A\u0639\u0644\u064A\u0642 \u0645\u0637\u0644\u0648\u0628 \u0648\u0644\u0627 \u064A\u0642\u0644 \u0639\u0646 10 \u0623\u062D\u0631\u0641 / Notes must be at least 10 characters</p>
              }
            </div>

            <!-- Error Banner -->
            @if (errorMessage()) {
              <div class="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold text-center font-cairo">
                {{ errorMessage() }}
              </div>
            }

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="reviewForm.invalid || isSubmitting()"
              class="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-sm font-bold rounded-2xl text-white shadow-xl hover:shadow-indigo-500/10 transition-all duration-150 cursor-pointer font-cairo">
              @if (isSubmitting()) {
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 12 5.373 12 12h4z"></path>
                </svg>
                <span>\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0631\u0633\u0627\u0644...</span>
              } @else {
                <span>\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 / Submit Review</span>
              }
            </button>

          </form>
        }

      </div>

      <!-- Footer -->
      <div class="text-center text-xs text-slate-600 font-cairo">
        &copy; {{ currentYear }} Structo Accounting System. All rights reserved.
      </div>

    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectReviewComponent, { className: "ProjectReviewComponent", filePath: "src/app/features/public/project-review.component.ts", lineNumber: 133 });
})();
export {
  ProjectReviewComponent
};
//# sourceMappingURL=chunk-BNKCE7MJ.js.map
