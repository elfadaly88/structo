import {
  ImageUploadService
} from "./chunk-53BJWY4X.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
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
  TranslateModule
} from "./chunk-P67FNHXX.js";
import {
  AuthService
} from "./chunk-S6E5JOGH.js";
import {
  ToastService
} from "./chunk-3XAG2D2P.js";
import {
  CommonModule,
  DecimalPipe,
  isPlatformBrowser
} from "./chunk-FIWEE23C.js";
import {
  Component,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation,
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-ODSQXAQU.js";

// src/app/features/dashboard/tenant-profile/tenant-profile.component.ts
var _c0 = ["profileMapContainer"];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.display_name;
var _forTrack2 = ($index, $item) => $item.extra;
function TenantProfileComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 6);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.profileForm.get("bannerUrl")?.value, \u0275\u0275sanitizeUrl);
  }
}
function TenantProfileComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 113);
    \u0275\u0275element(2, "path", 114);
    \u0275\u0275elementEnd()();
  }
}
function TenantProfileComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "div", 115);
    \u0275\u0275elementStart(2, "span", 116);
    \u0275\u0275text(3, "\u062C\u0627\u0631\u064A \u0627\u0644\u0631\u0641\u0639... / Uploading...");
    \u0275\u0275elementEnd()();
  }
}
function TenantProfileComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 18);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.profileForm.get("logoUrl")?.value, \u0275\u0275sanitizeUrl);
  }
}
function TenantProfileComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 19);
  }
}
function TenantProfileComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275element(1, "div", 117);
    \u0275\u0275elementEnd();
  }
}
function TenantProfileComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 118);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...");
    \u0275\u0275elementEnd();
  }
}
function TenantProfileComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 10);
    \u0275\u0275element(1, "path", 119);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A");
    \u0275\u0275elementEnd();
  }
}
function TenantProfileComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 60);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 120);
    \u0275\u0275element(3, "path", 121);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 122);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_42_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toastMessage.set(null));
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.toastMessage());
  }
}
function TenantProfileComponent_Conditional_110_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u0645\u0634\u0627\u0631\u064A\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u0648\u062F\u0629");
    \u0275\u0275elementEnd();
  }
}
function TenantProfileComponent_Conditional_111_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.tenantData()?.maxActiveProjects || 2, " \u0645\u0634\u0627\u0631\u064A\u0639 \u0646\u0634\u0637\u0629");
  }
}
function TenantProfileComponent_Conditional_113_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 123);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_113_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openPlanModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 124);
    \u0275\u0275element(2, "path", 125);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u062A\u0631\u0642\u064A\u0629 \u0627\u0644\u0628\u0627\u0642\u0629 / Upgrade Plan ");
    \u0275\u0275elementEnd();
  }
}
function TenantProfileComponent_Conditional_114_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 126);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_114_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openTopUpModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 70);
    \u0275\u0275element(2, "path", 127);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0634\u062D\u0646 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 / +Add Projects ");
    \u0275\u0275elementEnd();
  }
}
function TenantProfileComponent_For_149_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 86);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const gov_r8 = ctx.$implicit;
    \u0275\u0275property("value", gov_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(gov_r8.label);
  }
}
function TenantProfileComponent_Conditional_187_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 101);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Lat: ", \u0275\u0275pipeBind2(2, 2, ctx_r1.profileForm.get("latitude")?.value, "1.4-6"), " | Lng: ", \u0275\u0275pipeBind2(3, 5, ctx_r1.profileForm.get("longitude")?.value, "1.4-6"), " ");
  }
}
function TenantProfileComponent_Conditional_193_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 129);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_193_For_2_Template_button_click_0_listener() {
      const result_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectMapSearchResult(result_r10));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 130);
    \u0275\u0275element(2, "path", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span", 131);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r10 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(result_r10.display_name);
  }
}
function TenantProfileComponent_Conditional_193_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106);
    \u0275\u0275repeaterCreate(1, TenantProfileComponent_Conditional_193_For_2_Template, 5, 1, "button", 128, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.mapSearchResults());
  }
}
function TenantProfileComponent_Conditional_204_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 110)(1, "div", 132);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 133);
    \u0275\u0275element(3, "path", 134);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 135);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 136);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_204_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toastMessage.set(null));
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.toastMessage());
  }
}
function TenantProfileComponent_Conditional_205_For_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 152);
    \u0275\u0275text(1, "\u2B50\uFE0F \u0627\u0644\u0623\u0641\u0636\u0644 \u062A\u0648\u0641\u064A\u0631\u0627\u064B / Best Value");
    \u0275\u0275elementEnd();
  }
}
function TenantProfileComponent_Conditional_205_For_13_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 153);
    \u0275\u0275text(1, "\u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A");
    \u0275\u0275elementEnd();
  }
}
function TenantProfileComponent_Conditional_205_For_13_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F4E6} ");
  }
}
function TenantProfileComponent_Conditional_205_For_13_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F680} ");
  }
}
function TenantProfileComponent_Conditional_205_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 150);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_205_For_13_Template_div_click_0_listener() {
      const plan_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectPlan(plan_r14));
    });
    \u0275\u0275elementStart(1, "div")(2, "div", 151);
    \u0275\u0275conditionalCreate(3, TenantProfileComponent_Conditional_205_For_13_Conditional_3_Template, 2, 0, "span", 152)(4, TenantProfileComponent_Conditional_205_For_13_Conditional_4_Template, 2, 0, "span", 153);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 154)(6, "div", 155);
    \u0275\u0275conditionalCreate(7, TenantProfileComponent_Conditional_205_For_13_Conditional_7_Template, 1, 0)(8, TenantProfileComponent_Conditional_205_For_13_Conditional_8_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h4", 140);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 156);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 154)(14, "div", 157)(15, "span", 158);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 159);
    \u0275\u0275text(18, "\u062C.\u0645 / EGP");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "p", 160);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const plan_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ring-2", ctx_r1.selectedPlan()?.id === plan_r14.id)("ring-indigo-500", ctx_r1.selectedPlan()?.id === plan_r14.id)("bg-indigo-950", ctx_r1.selectedPlan()?.id === plan_r14.id)("border-indigo-500", ctx_r1.selectedPlan()?.id === plan_r14.id);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(plan_r14.id === "5" || plan_r14.extra === 5 || plan_r14.maxProjects === 5 ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("bg-emerald-600/20", plan_r14.id === "1" || plan_r14.extra === 1)("bg-gradient-to-br", plan_r14.id === "5" || plan_r14.extra === 5)("from-amber-500", plan_r14.id === "5" || plan_r14.extra === 5)("to-orange-600", plan_r14.id === "5" || plan_r14.extra === 5);
    \u0275\u0275advance();
    \u0275\u0275conditional(plan_r14.id === "1" || plan_r14.extra === 1 ? 7 : 8);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(plan_r14.nameEn || plan_r14.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r14.nameAr);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(plan_r14.priceEgp);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", plan_r14.description || "\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 \u0644\u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u062D\u0627\u0644\u064A (Adds projects to active quota)", " ");
  }
}
function TenantProfileComponent_Conditional_205_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 137);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_205_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePlanModal());
    });
    \u0275\u0275elementStart(1, "div", 138);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_205_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 139)(3, "div")(4, "h3", 140);
    \u0275\u0275text(5, "\u0634\u0631\u0627\u0621 \u0633\u0639\u0629 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 / Buy Project Quota");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 141);
    \u0275\u0275text(7, "\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0628\u0627\u0644\u062C\u0646\u064A\u0647 \u0627\u0644\u0645\u0635\u0631\u064A / All prices in EGP");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 142);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_205_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePlanModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 133);
    \u0275\u0275element(10, "path", 143);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(11, "div", 144);
    \u0275\u0275repeaterCreate(12, TenantProfileComponent_Conditional_205_For_13_Template, 21, 22, "div", 145, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 146)(15, "button", 147);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_205_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePlanModal());
    });
    \u0275\u0275text(16, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 148);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_205_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.proceedToCheckout("upgrade"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(18, "svg", 10);
    \u0275\u0275element(19, "path", 149);
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " \u0634\u0631\u0627\u0621 \u0627\u0644\u0628\u0627\u0642\u0629 / Buy Plan ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275repeater(ctx_r1.availablePlans());
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r1.selectedPlan() || ctx_r1.isCurrentPlan(ctx_r1.selectedPlan()?.id || ""));
  }
}
function TenantProfileComponent_Conditional_206_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 180);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_206_For_19_Template_div_click_0_listener() {
      const opt_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectTopUp(opt_r17));
    });
    \u0275\u0275elementStart(1, "div", 68)(2, "div", 181);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 182);
    \u0275\u0275element(4, "path", 127);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div")(6, "span", 183);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 176);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 184)(11, "div", 185);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 186);
    \u0275\u0275text(15, "\u062C.\u0645 \u0634\u0627\u0645\u0644 \u0636\u0631\u064A\u0628\u0629");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const opt_r17 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ring-2", ctx_r1.selectedTopUp()?.extra === opt_r17.extra)("ring-emerald-500", ctx_r1.selectedTopUp()?.extra === opt_r17.extra)("bg-emerald-950", ctx_r1.selectedTopUp()?.extra === opt_r17.extra)("border-emerald-500", ctx_r1.selectedTopUp()?.extra === opt_r17.extra);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(opt_r17.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u064A\u0635\u0628\u062D \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A: ", (ctx_r1.tenantData()?.maxActiveProjects || 2) + opt_r17.extra, " \u0645\u0634\u0627\u0631\u064A\u0639");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 11, opt_r17.priceWithVat, "1.0-0"));
  }
}
function TenantProfileComponent_Conditional_206_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 137);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_206_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTopUpModal());
    });
    \u0275\u0275elementStart(1, "div", 161);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_206_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 139)(3, "div")(4, "h3", 140);
    \u0275\u0275text(5, "\u0634\u062D\u0646 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 / Add Extra Projects");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 162);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 163);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_206_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTopUpModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 133);
    \u0275\u0275element(10, "path", 143);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(11, "div", 164)(12, "div", 165);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 166);
    \u0275\u0275element(14, "path", 167);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "p", 168);
    \u0275\u0275text(16, " \u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629 \u062A\u0634\u0645\u0644 \u0645\u0634\u0631\u0648\u0639\u064A\u0646 \u0645\u062F\u0649 \u0627\u0644\u062D\u064A\u0627\u0629. \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u0645\u0646\u062A\u0647\u064A \u0623\u0648 \u0627\u0644\u0645\u063A\u0644\u0642 \u064A\u0633\u062A\u0647\u0644\u0643 \u0627\u0644\u0631\u0635\u064A\u062F \u0628\u0634\u0643\u0644 \u062F\u0627\u0626\u0645. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 169);
    \u0275\u0275repeaterCreate(18, TenantProfileComponent_Conditional_206_For_19_Template, 16, 14, "div", 170, _forTrack2);
    \u0275\u0275elementStart(20, "a", 171)(21, "div", 99)(22, "div", 68)(23, "div", 172);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(24, "svg", 173);
    \u0275\u0275element(25, "path", 174);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(26, "div")(27, "span", 175);
    \u0275\u0275text(28, "\u0623\u0643\u062B\u0631 \u0645\u0646 5 \u0645\u0634\u0627\u0631\u064A\u0639 / Need More?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "p", 176);
    \u0275\u0275text(30, "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0639\u0631\u0636 \u0645\u062E\u0635\u0635");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 177);
    \u0275\u0275text(32, " \u0627\u062A\u0635\u0644 \u0628\u0646\u0627 ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(33, "svg", 124);
    \u0275\u0275element(34, "path", 178);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(35, "div", 146)(36, "button", 147);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_206_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTopUpModal());
    });
    \u0275\u0275text(37, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 179);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_206_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.proceedToCheckout("topup"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(39, "svg", 10);
    \u0275\u0275element(40, "path", 149);
    \u0275\u0275elementEnd();
    \u0275\u0275text(41, " \u0634\u0631\u0627\u0621 \u0627\u0644\u062D\u0632\u0645\u0629 / Buy Package ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("\u062A\u064F\u0636\u0627\u0641 \u0641\u0648\u0631\u0627\u064B \u0641\u0648\u0642 \u0633\u0639\u062A\u0643 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 (", ctx_r1.tenantData()?.maxActiveProjects || 2, " \u0645\u0634\u0631\u0648\u0639)");
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r1.availableTopUps());
    \u0275\u0275advance(20);
    \u0275\u0275property("disabled", !ctx_r1.selectedTopUp());
  }
}
function TenantProfileComponent_Conditional_207_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 221);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_207_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeCheckoutModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 133);
    \u0275\u0275element(2, "path", 143);
    \u0275\u0275elementEnd()();
  }
}
function TenantProfileComponent_Conditional_207_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 222);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629... / Processing...");
    \u0275\u0275elementEnd();
  }
}
function TenantProfileComponent_Conditional_207_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 133);
    \u0275\u0275element(1, "path", 121);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A / Process Test Payment");
    \u0275\u0275elementEnd();
  }
}
function TenantProfileComponent_Conditional_207_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 112)(1, "div", 187)(2, "div", 139)(3, "div", 68)(4, "div", 188);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 189);
    \u0275\u0275element(6, "path", 190);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div")(8, "h3", 191);
    \u0275\u0275text(9, "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A\u0629 / Mock Checkout");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 192);
    \u0275\u0275text(11, "\u0622\u0645\u0646 \u0648\u0645\u0634\u0641\u0631 \u2022 SSL Encrypted");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(12, TenantProfileComponent_Conditional_207_Conditional_12_Template, 3, 0, "button", 193);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 194)(14, "div", 195)(15, "h4", 196);
    \u0275\u0275text(16, "\u0645\u0644\u062E\u0635 \u0627\u0644\u0637\u0644\u0628 / Order Summary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 197)(18, "span", 198);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 199);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 197)(24, "span", 200);
    \u0275\u0275text(25, "\u0636\u0631\u064A\u0628\u0629 \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 (0%)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 198);
    \u0275\u0275text(27, "0.00 \u062C.\u0645 (\u0635\u0627\u0641\u064A)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 201)(29, "span", 183);
    \u0275\u0275text(30, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 202);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 203)(35, "h4", 204);
    \u0275\u0275text(36, "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0643\u0627\u0631\u062A (\u062A\u062C\u0631\u064A\u0628\u064A) / Card Details (Test Mode)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div")(38, "label", 205);
    \u0275\u0275text(39, "\u0631\u0642\u0645 \u0627\u0644\u0643\u0627\u0631\u062A / Card Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 102)(41, "input", 206);
    \u0275\u0275listener("input", function TenantProfileComponent_Conditional_207_Template_input_input_41_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onMockCardInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 207);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(43, "svg", 208);
    \u0275\u0275element(44, "path", 209);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(45, "p", 210);
    \u0275\u0275text(46, "\u{1F4A1} \u0627\u0633\u062A\u062E\u062F\u0645: 4242 4242 4242 4242");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 211)(48, "div")(49, "label", 212);
    \u0275\u0275text(50, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "input", 213);
    \u0275\u0275listener("input", function TenantProfileComponent_Conditional_207_Template_input_input_51_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onMockExpiryInput($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div")(53, "label", 214);
    \u0275\u0275text(54, "CVC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "input", 215);
    \u0275\u0275twoWayListener("ngModelChange", function TenantProfileComponent_Conditional_207_Template_input_ngModelChange_55_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.mockCvc, $event) || (ctx_r1.mockCvc = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(56, "div", 216);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(57, "svg", 217);
    \u0275\u0275element(58, "path", 167);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(59, "span", 218);
    \u0275\u0275text(60, "\u0647\u0630\u0647 \u0628\u0648\u0627\u0628\u0629 \u062F\u0641\u0639 \u062A\u062C\u0631\u064A\u0628\u064A\u0629 \u2014 \u0644\u0646 \u064A\u062A\u0645 \u062E\u0635\u0645 \u0623\u064A \u0645\u0628\u0627\u0644\u063A \u062D\u0642\u064A\u0642\u064A\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(61, "div", 219)(62, "button", 220);
    \u0275\u0275listener("click", function TenantProfileComponent_Conditional_207_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.processPayment());
    });
    \u0275\u0275conditionalCreate(63, TenantProfileComponent_Conditional_207_Conditional_63_Template, 3, 0)(64, TenantProfileComponent_Conditional_207_Conditional_64_Template, 4, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275conditional(!ctx_r1.isProcessingPayment() ? 12 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.checkoutSummary().description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(22, 12, ctx_r1.checkoutSummary().amount, "1.0-2"), " \u062C.\u0645");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(33, 15, ctx_r1.checkoutSummary().totalAmount, "1.0-2"), " \u062C.\u0645");
    \u0275\u0275advance(9);
    \u0275\u0275property("value", ctx_r1.mockCardNumber)("disabled", ctx_r1.isProcessingPayment());
    \u0275\u0275advance(10);
    \u0275\u0275property("value", ctx_r1.mockExpiry)("disabled", ctx_r1.isProcessingPayment());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.mockCvc);
    \u0275\u0275property("disabled", ctx_r1.isProcessingPayment());
    \u0275\u0275control();
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r1.isProcessingPayment());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isProcessingPayment() ? 63 : 64);
  }
}
var EGYPT_GOVERNORATES = [
  { id: "Cairo", nameEn: "Cairo", nameAr: "\u0627\u0644\u0642\u0627\u0647\u0631\u0629", label: "\u0627\u0644\u0642\u0627\u0647\u0631\u0629 / Cairo" },
  { id: "Giza", nameEn: "Giza", nameAr: "\u0627\u0644\u062C\u064A\u0632\u0629", label: "\u0627\u0644\u062C\u064A\u0632\u0629 / Giza" },
  { id: "Alexandria", nameEn: "Alexandria", nameAr: "\u0627\u0644\u0625\u0633\u0643\u0646\u062F\u0631\u064A\u0629", label: "\u0627\u0644\u0625\u0633\u0643\u0646\u062F\u0631\u064A\u0629 / Alexandria" },
  { id: "Qalyubia", nameEn: "Qalyubia", nameAr: "\u0627\u0644\u0642\u0644\u064A\u0648\u0628\u064A\u0629", label: "\u0627\u0644\u0642\u0644\u064A\u0648\u0628\u064A\u0629 / Qalyubia" },
  { id: "Gharbia", nameEn: "Gharbia", nameAr: "\u0627\u0644\u063A\u0631\u0628\u064A\u0629", label: "\u0627\u0644\u063A\u0631\u0628\u064A\u0629 / Gharbia" },
  { id: "Dakahlia", nameEn: "Dakahlia", nameAr: "\u0627\u0644\u062F\u0642\u0647\u0644\u064A\u0629", label: "\u0627\u0644\u062F\u0642\u0647\u0644\u064A\u0629 / Dakahlia" },
  { id: "Sharqia", nameEn: "Sharqia", nameAr: "\u0627\u0644\u0634\u0631\u0642\u064A\u0629", label: "\u0627\u0644\u0634\u0631\u0642\u064A\u0629 / Sharqia" },
  { id: "Monufia", nameEn: "Monufia", nameAr: "\u0627\u0644\u0645\u0646\u0648\u0641\u064A\u0629", label: "\u0627\u0644\u0645\u0646\u0648\u0641\u064A\u0629 / Monufia" },
  { id: "Beheira", nameEn: "Beheira", nameAr: "\u0627\u0644\u0628\u062D\u064A\u0631\u0629", label: "\u0627\u0644\u0628\u062D\u064A\u0631\u0629 / Beheira" },
  { id: "Kafr El Sheikh", nameEn: "Kafr El Sheikh", nameAr: "\u0643\u0641\u0631 \u0627\u0644\u0634\u064A\u062E", label: "\u0643\u0641\u0631 \u0627\u0644\u0634\u064A\u062E / Kafr El Sheikh" },
  { id: "Damietta", nameEn: "Damietta", nameAr: "\u062F\u0645\u064A\u0627\u0637", label: "\u062F\u0645\u064A\u0627\u0637 / Damietta" },
  { id: "Port Said", nameEn: "Port Said", nameAr: "\u0628\u0648\u0631\u0633\u0639\u064A\u062F", label: "\u0628\u0648\u0631\u0633\u0639\u064A\u062F / Port Said" },
  { id: "Ismailia", nameEn: "Ismailia", nameAr: "\u0627\u0644\u0625\u0633\u0645\u0627\u0639\u064A\u0644\u064A\u0629", label: "\u0627\u0644\u0625\u0633\u0645\u0627\u0639\u064A\u0644\u064A\u0629 / Ismailia" },
  { id: "Suez", nameEn: "Suez", nameAr: "\u0627\u0644\u0633\u0648\u064A\u0633", label: "\u0627\u0644\u0633\u0648\u064A\u0633 / Suez" },
  { id: "Aswan", nameEn: "Aswan", nameAr: "\u0623\u0633\u0648\u0627\u0646", label: "\u0623\u0633\u0648\u0627\u0646 / Aswan" },
  { id: "Luxor", nameEn: "Luxor", nameAr: "\u0627\u0644\u0623\u0642\u0635\u0631", label: "\u0627\u0644\u0623\u0642\u0635\u0631 / Luxor" },
  { id: "Red Sea", nameEn: "Red Sea", nameAr: "\u0627\u0644\u0628\u062D\u0631 \u0627\u0644\u0623\u062D\u0645\u0631", label: "\u0627\u0644\u0628\u062D\u0631 \u0627\u0644\u0623\u062D\u0645\u0631 / Red Sea" },
  { id: "Matrouh", nameEn: "Matrouh", nameAr: "\u0645\u0637\u0631\u0648\u062D", label: "\u0645\u0637\u0631\u0648\u062D / Matrouh" },
  { id: "Sohag", nameEn: "Sohag", nameAr: "\u0633\u0648\u0647\u0627\u062C", label: "\u0633\u0648\u0647\u0627\u062C / Sohag" },
  { id: "Asyut", nameEn: "Asyut", nameAr: "\u0623\u0633\u064A\u0648\u0637", label: "\u0623\u0633\u064A\u0648\u0637 / Asyut" },
  { id: "Minya", nameEn: "Minya", nameAr: "\u0627\u0644\u0645\u0646\u064A\u0627", label: "\u0627\u0644\u0645\u0646\u064A\u0627 / Minya" },
  { id: "Beni Suef", nameEn: "Beni Suef", nameAr: "\u0628\u0646\u064A \u0633\u0648\u064A\u0641", label: "\u0628\u0646\u064A \u0633\u0648\u064A\u0641 / Beni Suef" },
  { id: "Faiyum", nameEn: "Faiyum", nameAr: "\u0627\u0644\u0641\u064A\u0648\u0645", label: "\u0627\u0644\u0641\u064A\u0648\u0645 / Faiyum" },
  { id: "Qena", nameEn: "Qena", nameAr: "\u0642\u0646\u0627", label: "\u0642\u0646\u0627 / Qena" },
  { id: "North Sinai", nameEn: "North Sinai", nameAr: "\u0634\u0645\u0627\u0644 \u0633\u064A\u0646\u0627\u0621", label: "\u0634\u0645\u0627\u0644 \u0633\u064A\u0646\u0627\u0621 / North Sinai" },
  { id: "South Sinai", nameEn: "South Sinai", nameAr: "\u062C\u0646\u0648\u0628 \u0633\u064A\u0646\u0627\u0621", label: "\u062C\u0646\u0648\u0628 \u0633\u064A\u0646\u0627\u0621 / South Sinai" },
  { id: "New Valley", nameEn: "New Valley", nameAr: "\u0627\u0644\u0648\u0627\u062F\u064A \u0627\u0644\u062C\u062F\u064A\u062F", label: "\u0627\u0644\u0648\u0627\u062F\u064A \u0627\u0644\u062C\u062F\u064A\u062F / New Valley" }
];
var TenantProfileComponent = class _TenantProfileComponent {
  platformId = inject(PLATFORM_ID);
  profileService = inject(TenantProfileService);
  auth = inject(AuthService);
  imageUploadService = inject(ImageUploadService);
  fb = inject(FormBuilder);
  toastService = inject(ToastService);
  profileMapContainer;
  governorates = EGYPT_GOVERNORATES;
  activeTab = signal(
    1,
    ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tenantData = signal(
    null,
    ...ngDevMode ? [{ debugName: "tenantData" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSaving = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSaving" }] : (
      /* istanbul ignore next */
      []
    )
  );
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
  toastMessage = signal(
    null,
    ...ngDevMode ? [{ debugName: "toastMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mapSearchResults = signal(
    [],
    ...ngDevMode ? [{ debugName: "mapSearchResults" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mapSearchQuery = "";
  mapSearchTimeout = null;
  profileMap = null;
  profileMarker = null;
  currentLatLng = { lat: 30.0444, lng: 31.2357 };
  // ── Subscription Modal Signals ──────────────────────────────
  showPlanModal = signal(
    false,
    ...ngDevMode ? [{ debugName: "showPlanModal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showTopUpModal = signal(
    false,
    ...ngDevMode ? [{ debugName: "showTopUpModal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showCheckoutModal = signal(
    false,
    ...ngDevMode ? [{ debugName: "showCheckoutModal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isProcessingPayment = signal(
    false,
    ...ngDevMode ? [{ debugName: "isProcessingPayment" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedPlan = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedPlan" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedTopUp = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedTopUp" }] : (
      /* istanbul ignore next */
      []
    )
  );
  availablePlans = signal(
    [],
    ...ngDevMode ? [{ debugName: "availablePlans" }] : (
      /* istanbul ignore next */
      []
    )
  );
  availableTopUps = signal(
    [],
    ...ngDevMode ? [{ debugName: "availableTopUps" }] : (
      /* istanbul ignore next */
      []
    )
  );
  checkoutMode = "upgrade";
  // Mock card fields (tightly scoped to checkout)
  mockCardNumber = "4242 4242 4242 4242";
  mockExpiry = "12/29";
  mockCvc = "123";
  checkoutSummary = computed(
    () => {
      if (this.checkoutMode === "upgrade" && this.selectedPlan()) {
        const p = this.selectedPlan();
        return {
          description: `\u062A\u0631\u0642\u064A\u0629 \u0625\u0644\u0649 \u0628\u0627\u0642\u0629 ${p.nameEn} / Upgrade to ${p.nameEn}`,
          amount: p.priceEgp,
          taxAmount: 0,
          totalAmount: p.priceEgp
        };
      }
      if (this.checkoutMode === "topup" && this.selectedTopUp()) {
        const t = this.selectedTopUp();
        return {
          description: `\u0625\u0636\u0627\u0641\u0629 ${t.extra} \u0645\u0634\u0627\u0631\u064A\u0639 / Add ${t.extra} Extra Projects`,
          amount: t.priceEgp,
          taxAmount: 0,
          totalAmount: t.priceEgp
        };
      }
      return { description: "", amount: 0, taxAmount: 0, totalAmount: 0 };
    },
    ...ngDevMode ? [{ debugName: "checkoutSummary" }] : (
      /* istanbul ignore next */
      []
    )
  );
  profileForm = this.fb.group({
    name: ["", [Validators.required]],
    logoUrl: [""],
    bannerUrl: [""],
    companyDescription: [""],
    personalPhone: [""],
    whatsAppPhone: [""],
    governorateId: [""],
    location: [""],
    commercialRegister: [""],
    taxCard: [""],
    nationalId: [""],
    syndicateId: [""],
    manualAddress: [""],
    mapLocationUrl: [""],
    latitude: [null],
    longitude: [null]
  });
  ngOnInit() {
    this.loadProfile();
    this.loadSubscriptionPlans();
  }
  ngAfterViewInit() {
    if (this.activeTab() === 3) {
      setTimeout(() => this.initMap(), 150);
    }
  }
  ngOnDestroy() {
    if (this.profileMap) {
      this.profileMap.remove();
      this.profileMap = null;
    }
  }
  selectTab(tab) {
    const targetTab = typeof tab === "string" ? tab === "location" ? 3 : parseInt(tab, 10) || 1 : tab;
    this.activeTab.set(targetTab);
    if (targetTab === 3 || tab === "location") {
      setTimeout(() => {
        this.initMap();
        if (this.profileMap) {
          this.profileMap.invalidateSize();
        }
      }, 150);
    }
  }
  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const tenant = res.data;
          this.tenantData.set(tenant);
          const resolvedGov = this.resolveGovernorateId(tenant.governorateId || tenant.location || tenant.region);
          this.profileForm.patchValue({
            name: tenant.name || "",
            logoUrl: tenant.logoUrl || "",
            bannerUrl: tenant.bannerUrl || "",
            companyDescription: tenant.companyDescription || "",
            personalPhone: tenant.personalPhone || "",
            whatsAppPhone: tenant.whatsAppPhone || "",
            governorateId: resolvedGov,
            location: resolvedGov,
            commercialRegister: tenant.commercialRegister || "",
            taxCard: tenant.taxCard || "",
            nationalId: tenant.nationalId || "",
            syndicateId: tenant.syndicateId || "",
            manualAddress: tenant.manualAddress || tenant.address || "",
            mapLocationUrl: tenant.mapLocationUrl || "",
            latitude: tenant.latitude ?? tenant.lat ?? null,
            longitude: tenant.longitude ?? tenant.lng ?? null
          });
          if (tenant.latitude && tenant.longitude) {
            this.currentLatLng = { lat: tenant.latitude, lng: tenant.longitude };
          }
        }
      },
      error: (err) => {
        console.error("Error fetching tenant profile:", err);
      }
    });
  }
  resolveGovernorateId(rawValue) {
    if (!rawValue)
      return "";
    const clean = rawValue.trim().toLowerCase();
    const match = EGYPT_GOVERNORATES.find((gov) => gov.id.toLowerCase() === clean || gov.nameEn.toLowerCase() === clean || gov.nameAr.toLowerCase() === clean || gov.label.toLowerCase().includes(clean));
    return match ? match.id : rawValue;
  }
  resolveGovernorateLabel(rawValue) {
    const resolved = this.resolveGovernorateId(rawValue);
    const gov = EGYPT_GOVERNORATES.find((g) => g.id === resolved);
    return gov ? gov.label : rawValue || "";
  }
  saveCurrentTab() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.isSaving.set(true);
    const formVal = this.profileForm.value;
    const resolvedGov = this.resolveGovernorateId(formVal.governorateId || formVal.location);
    const dto = {
      name: formVal.name,
      logoUrl: formVal.logoUrl,
      bannerUrl: formVal.bannerUrl,
      companyDescription: formVal.companyDescription,
      personalPhone: formVal.personalPhone || null,
      whatsAppPhone: formVal.whatsAppPhone || null,
      governorateId: resolvedGov,
      location: resolvedGov,
      region: resolvedGov,
      commercialRegister: formVal.commercialRegister || null,
      taxCard: formVal.taxCard || null,
      nationalId: formVal.nationalId || null,
      syndicateId: formVal.syndicateId || null,
      manualAddress: formVal.manualAddress || null,
      address: formVal.manualAddress || null,
      mapLocationUrl: formVal.mapLocationUrl || null,
      latitude: formVal.latitude ?? null,
      longitude: formVal.longitude ?? null,
      lat: formVal.latitude ?? null,
      lng: formVal.longitude ?? null
    };
    this.profileService.updateProfile(dto).subscribe({
      next: (res) => {
        this.isSaving.set(false);
        if (res.success && res.data) {
          this.tenantData.set(res.data);
          const msg = "\u062A\u0645 \u062D\u0641\u0638 \u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0646\u062C\u0627\u062D! / Profile updated successfully.";
          this.showToast(msg);
          this.toastService.show("\u0646\u062C\u0627\u062D / Success", msg, "success");
          try {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } catch {
          }
        } else {
          const errMsg = res.message || "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638 / Failed to update profile";
          this.showToast(errMsg);
          this.toastService.show("\u062E\u0637\u0623 / Error", errMsg, "error");
        }
      },
      error: (err) => {
        this.isSaving.set(false);
        const errMsg = "\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0634\u0628\u0643\u0629.";
        this.showToast(errMsg);
        this.toastService.show("\u062E\u0637\u0623 / Error", errMsg, "error");
      }
    });
  }
  showToast(msg) {
    this.toastMessage.set(msg);
    setTimeout(() => {
      if (this.toastMessage() === msg) {
        this.toastMessage.set(null);
      }
    }, 4500);
  }
  // --- MAP FUNCTIONS ---
  initMap() {
    try {
      if (!isPlatformBrowser(this.platformId))
        return;
      if (!this.profileMapContainer?.nativeElement)
        return;
      if (typeof L === "undefined")
        return;
      const lat = this.profileForm.get("latitude")?.value || this.currentLatLng.lat;
      const lng = this.profileForm.get("longitude")?.value || this.currentLatLng.lng;
      const iconDefault = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      if (!this.profileMap) {
        this.profileMap = L.map(this.profileMapContainer.nativeElement, {
          center: [lat, lng],
          zoom: 13,
          zoomControl: true
        });
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          maxZoom: 19,
          subdomains: "abcd",
          attribution: "&copy; OpenStreetMap & CartoDB"
        }).addTo(this.profileMap);
        this.profileMarker = L.marker([lat, lng], { draggable: true, icon: iconDefault }).addTo(this.profileMap);
        this.profileMarker.on("dragend", () => {
          const pos = this.profileMarker.getLatLng();
          this.updateCoords(pos.lat, pos.lng);
        });
        this.profileMap.on("click", (e) => {
          this.profileMarker.setLatLng(e.latlng);
          this.updateCoords(e.latlng.lat, e.latlng.lng);
        });
      }
      setTimeout(() => {
        if (this.profileMap) {
          this.profileMap.invalidateSize();
          this.profileMap.setView([lat, lng], 13);
          if (this.profileMarker) {
            this.profileMarker.setLatLng([lat, lng]);
          }
        }
      }, 200);
    } catch (err) {
      console.error("Leaflet Map Init Error:", err);
    }
  }
  updateCoords(lat, lng) {
    this.profileForm.patchValue({
      latitude: lat,
      longitude: lng
    });
  }
  onMapSearchChange(event) {
    const val = event.target.value;
    this.mapSearchQuery = val;
    if (this.mapSearchTimeout)
      clearTimeout(this.mapSearchTimeout);
    if (!val || val.trim().length < 3) {
      this.mapSearchResults.set([]);
      return;
    }
    this.mapSearchTimeout = setTimeout(() => this.searchNominatim(val), 400);
  }
  onMapSearchSubmit() {
    if (this.mapSearchQuery && this.mapSearchQuery.trim().length >= 3) {
      this.searchNominatim(this.mapSearchQuery);
    }
  }
  searchNominatim(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=eg&limit=5`;
    fetch(url).then((res) => res.json()).then((data) => {
      if (Array.isArray(data)) {
        this.mapSearchResults.set(data);
      }
    }).catch(() => this.mapSearchResults.set([]));
  }
  selectMapSearchResult(result) {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    this.mapSearchResults.set([]);
    this.mapSearchQuery = result.display_name;
    if (!isNaN(lat) && !isNaN(lon)) {
      this.updateCoords(lat, lon);
      if (this.profileMap && this.profileMarker) {
        this.profileMap.setView([lat, lon], 14);
        this.profileMarker.setLatLng([lat, lon]);
      }
    }
  }
  // --- FILE UPLOAD HANDLERS ---
  onLogoFileSelected(event) {
    const input = event.target;
    if (!input.files || input.files.length === 0)
      return;
    const file = input.files[0];
    this.isUploadingLogo.set(true);
    this.imageUploadService.uploadTenantLogo(file).subscribe({
      next: (res) => {
        this.isUploadingLogo.set(false);
        if (res.success && res.data?.url) {
          this.profileForm.patchValue({ logoUrl: res.data.url });
          this.saveCurrentTab();
        }
      },
      error: () => this.isUploadingLogo.set(false)
    });
  }
  onBannerFileSelected(event) {
    const input = event.target;
    if (!input.files || input.files.length === 0)
      return;
    const file = input.files[0];
    this.isUploadingBanner.set(true);
    this.imageUploadService.uploadTenantBanner(file).subscribe({
      next: (res) => {
        this.isUploadingBanner.set(false);
        if (res.success && res.data?.url) {
          this.profileForm.patchValue({ bannerUrl: res.data.url });
          this.saveCurrentTab();
        }
      },
      error: () => this.isUploadingBanner.set(false)
    });
  }
  // ─────────────────────────────────────────────────────────────
  // SUBSCRIPTION UPGRADE & MOCK PAYMENT METHODS
  // ─────────────────────────────────────────────────────────────
  loadSubscriptionPlans() {
    this.profileService.getSubscriptionPlans().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.availablePlans.set(res.data.plans);
          this.availableTopUps.set(res.data.topups);
        }
      },
      error: () => {
        this.availablePlans.set([
          { id: "1", extra: 1, maxProjects: 1, nameAr: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0631\u0648\u0639 \u0648\u0627\u062D\u062F", nameEn: "\u{1F4E6} \u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0631\u0648\u0639 \u0648\u0627\u062D\u062F (+1 Project)", priceEgp: 250, priceWithVat: 250, description: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0631\u0648\u0639 \u0648\u0627\u062D\u062F \u0625\u0636\u0627\u0641\u064A \u0644\u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u062D\u0627\u0644\u064A (Adds +1 project to your active quota)" },
          { id: "5", extra: 5, maxProjects: 5, nameAr: "\u062D\u0632\u0645\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639", nameEn: "\u{1F680} \u062D\u0632\u0645\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 (+5 Projects Package)", priceEgp: 950, priceWithVat: 950, description: "\u0625\u0636\u0627\u0641\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 \u0644\u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u062D\u0627\u0644\u064A (Adds +5 projects to your active quota)" }
        ]);
        this.availableTopUps.set([
          { extra: 1, priceEgp: 250, priceWithVat: 250, label: "+1 \u0645\u0634\u0631\u0648\u0639" },
          { extra: 5, priceEgp: 950, priceWithVat: 950, label: "+5 \u0645\u0634\u0627\u0631\u064A\u0639" }
        ]);
      }
    });
  }
  isCurrentPlan(planId) {
    const current = (this.tenantData()?.subscriptionPlan || "Free").toLowerCase();
    return current === planId.toLowerCase();
  }
  openPlanModal() {
    this.selectedPlan.set(null);
    this.showPlanModal.set(true);
  }
  closePlanModal() {
    this.showPlanModal.set(false);
  }
  openTopUpModal() {
    this.selectedTopUp.set(null);
    this.showTopUpModal.set(true);
  }
  closeTopUpModal() {
    this.showTopUpModal.set(false);
  }
  closeCheckoutModal() {
    this.showCheckoutModal.set(false);
  }
  selectPlan(plan) {
    if (this.isCurrentPlan(plan.id))
      return;
    this.selectedPlan.set(plan);
  }
  selectTopUp(opt) {
    this.selectedTopUp.set(opt);
  }
  proceedToCheckout(mode) {
    this.checkoutMode = mode;
    if (mode === "upgrade")
      this.showPlanModal.set(false);
    else
      this.showTopUpModal.set(false);
    this.mockCardNumber = "4242 4242 4242 4242";
    this.mockExpiry = "12/29";
    this.mockCvc = "123";
    this.showCheckoutModal.set(true);
  }
  processPayment() {
    this.isProcessingPayment.set(true);
    setTimeout(() => {
      const req = this.checkoutMode === "upgrade" ? { targetPlanId: this.selectedPlan()?.id, paymentMethod: "TestCard" } : { extraProjectsCount: this.selectedTopUp()?.extra, paymentMethod: "TestCard" };
      this.profileService.upgradeSubscription(req).subscribe({
        next: (res) => {
          this.isProcessingPayment.set(false);
          if (res.success && res.data) {
            this.showCheckoutModal.set(false);
            const current = this.tenantData();
            if (current) {
              this.tenantData.set(__spreadProps(__spreadValues({}, current), {
                subscriptionPlan: res.data.newPlan,
                maxActiveProjects: res.data.newMaxActiveProjects
              }));
            }
            const successMsg = this.checkoutMode === "upgrade" ? `\u{1F389} \u062A\u0645\u062A \u0627\u0644\u062A\u0631\u0642\u064A\u0629 \u0625\u0644\u0649 ${res.data.newPlan} \u0628\u0646\u062C\u0627\u062D! REF: ${res.data.referenceNumber}` : `\u2705 \u062A\u0645\u062A \u0625\u0636\u0627\u0641\u0629 ${res.data.extraProjectsAdded} \u0645\u0634\u0627\u0631\u064A\u0639! \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A: ${res.data.newMaxActiveProjects} \u0645\u0634\u0631\u0648\u0639`;
            this.showToast(successMsg);
            this.toastService.show("\u0646\u062C\u0627\u062D / Success", successMsg, "success");
            this.selectedPlan.set(null);
            this.selectedTopUp.set(null);
          } else {
            const errMsg = res.message || "\u0641\u0634\u0644\u062A \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062F\u0641\u0639 \u2014 \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649";
            this.showToast(errMsg);
            this.toastService.show("\u062E\u0637\u0623 / Error", errMsg, "error");
          }
        },
        error: (err) => {
          this.isProcessingPayment.set(false);
          const errMsg = "\u062A\u0639\u0630\u0631 \u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0634\u0628\u0643\u0629";
          this.showToast(errMsg);
          this.toastService.show("\u062E\u0637\u0623 / Error", errMsg, "error");
        }
      });
    }, 1500);
  }
  // Mock card input formatters
  onMockCardInput(event) {
    let val = event.target.value.replace(/\D/g, "");
    val = val.match(/.{1,4}/g)?.join(" ") ?? val;
    this.mockCardNumber = val;
    event.target.value = val;
  }
  onMockExpiryInput(event) {
    let val = event.target.value.replace(/\D/g, "");
    if (val.length > 2)
      val = val.slice(0, 2) + "/" + val.slice(2, 4);
    this.mockExpiry = val;
    event.target.value = val;
  }
  static \u0275fac = function TenantProfileComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TenantProfileComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TenantProfileComponent, selectors: [["app-tenant-profile"]], viewQuery: function TenantProfileComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.profileMapContainer = _t.first);
    }
  }, decls: 208, vars: 68, consts: [["bannerFileInput", ""], ["logoFileInput", ""], ["profileMapContainer", ""], [1, "w-full", "max-w-5xl", "mx-auto", "space-y-6"], [1, "relative", "bg-slate-900", "border", "border-slate-800/80", "rounded-2xl", "overflow-hidden", "shadow-2xl"], [1, "w-full", "h-40", "sm:h-52", "bg-slate-800", "relative", "overflow-hidden", "group"], ["alt", "Banner", 1, "w-full", "h-full", "object-cover", 3, "src"], [1, "w-full", "h-full", "bg-gradient-to-br", "from-slate-900", "via-indigo-950", "to-slate-900", "flex", "items-center", "justify-center"], ["type", "button", 1, "absolute", "inset-0", "bg-slate-950/60", "flex", "items-center", "justify-center", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-2", "text-white", "text-xs", "font-bold", "font-cairo", "bg-slate-900/90", "px-4", "py-2", "rounded-xl", "border", "border-slate-700", "backdrop-blur-md", "hover:bg-indigo-600", "transition-colors"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 13a3 3 0 11-6 0 3 3 0 016 0z"], ["type", "file", "accept", "image/*", 1, "hidden", 3, "change"], [1, "absolute", "inset-0", "bg-slate-950/80", "backdrop-blur-sm", "flex", "flex-col", "items-center", "justify-center", "z-10"], [1, "p-6", "pt-0", "relative", "flex", "flex-col", "sm:flex-row", "items-start", "sm:items-end", "justify-between", "gap-4", "-mt-12", "sm:-mt-14"], [1, "flex", "items-end", "gap-4"], [1, "relative", "w-24", "h-24", "sm:w-28", "sm:h-28", "rounded-2xl", "bg-slate-900", "border-4", "border-slate-900", "shadow-2xl", "overflow-hidden", "group", "flex-shrink-0"], ["alt", "Logo", 1, "w-full", "h-full", "object-cover", 3, "src"], ["src", "assets/images/default-tenant-logo.png", "alt", "Default Logo", 1, "w-full", "h-full", "object-cover", "opacity-80"], ["type", "button", 1, "absolute", "inset-0", "bg-slate-950/70", "flex", "items-center", "justify-center", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300", "cursor-pointer", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-6", "h-6", "text-white"], [1, "absolute", "inset-0", "bg-slate-950/80", "backdrop-blur-sm", "flex", "items-center", "justify-center"], [1, "pb-1", "space-y-1", "font-cairo"], [1, "flex", "items-center", "gap-2", "flex-wrap"], [1, "text-xl", "sm:text-2xl", "font-bold", "text-white"], [1, "px-2.5", "py-0.5", "text-[11px]", "font-bold", "rounded-full", "bg-indigo-500/10", "text-indigo-400", "border", "border-indigo-500/20"], [1, "px-2.5", "py-0.5", "text-[11px]", "font-bold", "rounded-full", "bg-emerald-500/10", "text-emerald-400", "border", "border-emerald-500/20"], [1, "text-xs", "text-slate-400", "flex", "items-center", "gap-1.5"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5", "text-indigo-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 11a3 3 0 11-6 0 3 3 0 016 0z"], [1, "w-full", "sm:w-auto", "flex", "items-center", "justify-end"], ["type", "button", 1, "w-full", "sm:w-auto", "px-6", "py-2.5", "bg-gradient-to-r", "from-indigo-600", "to-violet-600", "hover:from-indigo-500", "hover:to-violet-500", "disabled:opacity-50", "text-white", "font-bold", "text-xs", "rounded-xl", "shadow-lg", "shadow-indigo-600/20", "transition-all", "font-cairo", "flex", "items-center", "justify-center", "gap-2", "cursor-pointer", 3, "click", "disabled"], [1, "mx-6", "mb-4", "p-3", "bg-emerald-500/10", "border", "border-emerald-500/30", "rounded-xl", "text-emerald-400", "text-xs", "font-bold", "font-cairo", "flex", "items-center", "justify-between", "animate-fade-in"], [1, "bg-slate-900/90", "border", "border-slate-800", "rounded-2xl", "p-1.5", "flex", "items-center", "gap-1.5", "overflow-x-auto", "font-cairo", "shadow-lg"], ["type", "button", 1, "flex-1", "min-w-[140px]", "px-4", "py-2.5", "rounded-xl", "text-xs", "font-bold", "transition-all", "duration-200", "flex", "items-center", "justify-center", "gap-2", "cursor-pointer", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-8l-2-2m0 0l-2 2m2-2v6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], [1, "space-y-6", 3, "ngSubmit", "formGroup"], [1, "bg-slate-900/80", "border", "border-slate-800", "rounded-2xl", "p-5", "sm:p-6", "space-y-5", "shadow-xl", "font-cairo", 3, "hidden"], [1, "flex", "items-center", "justify-between", "border-b", "border-slate-800", "pb-3"], [1, "text-sm", "font-bold", "text-white", "flex", "items-center", "gap-2"], [1, "w-2", "h-2", "rounded-full", "bg-indigo-500"], [1, "text-[11px]", "text-slate-400"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], ["for", "prof-name", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-300", "mb-1"], [1, "text-rose-400"], ["id", "prof-name", "type", "text", "formControlName", "name", "placeholder", "\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all"], ["for", "prof-email", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1"], ["id", "prof-email", "type", "email", "readonly", "", "disabled", "", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950/60", "border", "border-slate-800/80", "rounded-xl", "text-slate-400", "text-xs", "cursor-not-allowed", 3, "value"], ["for", "prof-personal-phone", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-300", "mb-1"], ["id", "prof-personal-phone", "type", "tel", "formControlName", "personalPhone", "maxlength", "11", "placeholder", "01xxxxxxxxx", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all", "font-sans"], ["for", "prof-whatsapp-phone", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-300", "mb-1"], ["id", "prof-whatsapp-phone", "type", "tel", "formControlName", "whatsAppPhone", "maxlength", "11", "placeholder", "01xxxxxxxxx", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all", "font-sans"], [1, "col-span-1", "sm:col-span-2", "relative", "overflow-hidden", "rounded-2xl", "border", "border-indigo-500/30", "bg-gradient-to-br", "from-indigo-950", "via-slate-900", "to-violet-950", "p-5", "shadow-2xl"], [1, "absolute", "-top-8", "-right-8", "w-32", "h-32", "rounded-full", "bg-indigo-600/20", "blur-2xl", "pointer-events-none"], [1, "absolute", "-bottom-8", "-left-8", "w-24", "h-24", "rounded-full", "bg-violet-600/20", "blur-2xl", "pointer-events-none"], [1, "relative", "flex", "flex-col", "sm:flex-row", "items-start", "sm:items-center", "justify-between", "gap-4"], [1, "space-y-1"], [1, "flex", "items-center", "gap-2"], [1, "p-1.5", "rounded-lg", "bg-indigo-500/20"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-indigo-300"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 3l14 9-14 9V3z"], [1, "text-[10px]", "font-bold", "uppercase", "tracking-widest", "text-indigo-400"], [1, "flex", "items-baseline", "gap-2"], [1, "text-2xl", "font-black", "text-white"], [1, "text-xs", "font-bold", "text-slate-400"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "gap-1", "text-xs", "text-slate-300"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5", "text-emerald-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4"], [1, "flex", "flex-col", "sm:flex-row", "gap-2", "w-full", "sm:w-auto"], ["type", "button", "id", "btn-upgrade-plan", 1, "flex", "items-center", "justify-center", "gap-2", "px-4", "py-2", "bg-gradient-to-r", "from-indigo-600", "to-violet-600", "hover:from-indigo-500", "hover:to-violet-500", "text-white", "font-bold", "text-xs", "rounded-xl", "shadow-lg", "shadow-indigo-600/30", "transition-all", "duration-200", "cursor-pointer"], ["type", "button", "id", "btn-add-extra", 1, "flex", "items-center", "justify-center", "gap-2", "px-4", "py-2", "bg-slate-800", "hover:bg-slate-700", "border", "border-slate-600", "text-slate-200", "font-bold", "text-xs", "rounded-xl", "transition-all", "duration-200", "cursor-pointer"], [1, "p-3.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "flex", "items-center", "justify-between"], [1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase"], [1, "text-sm", "font-bold", "text-emerald-400"], [1, "text-xs", "text-slate-400"], ["for", "prof-desc", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-300", "mb-1"], ["id", "prof-desc", "formControlName", "companyDescription", "rows", "3", "placeholder", "\u0646\u0628\u0630\u0629 \u0645\u062E\u062A\u0635\u0631\u0629 \u0639\u0646 \u0646\u0634\u0627\u0637 \u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u062E\u062F\u0645\u0627\u062A\u0647\u0627...", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all", "resize-none"], [1, "flex", "items-center", "justify-end", "pt-3", "border-t", "border-slate-800"], ["type", "button", 1, "px-6", "py-2.5", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "font-bold", "text-xs", "rounded-xl", "shadow-md", "transition-all", "flex", "items-center", "gap-2", "cursor-pointer", 3, "click", "disabled"], ["for", "prof-gov", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-300", "mb-1"], ["id", "prof-gov", "formControlName", "governorateId", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all", "font-sans"], ["value", ""], [3, "value"], ["for", "prof-cr", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-300", "mb-1"], ["id", "prof-cr", "type", "text", "formControlName", "commercialRegister", "placeholder", "\u0645\u062B\u0627\u0644: 102030", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all", "font-sans"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-4"], ["for", "prof-tax", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-300", "mb-1"], ["id", "prof-tax", "type", "text", "formControlName", "taxCard", "placeholder", "\u0645\u062B\u0627\u0644: 334-556-789", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all", "font-sans"], ["for", "prof-nat", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-300", "mb-1"], ["id", "prof-nat", "type", "text", "formControlName", "nationalId", "maxlength", "14", "placeholder", "14 \u0631\u0642\u0645 \u0642\u0648\u0645\u064A", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all", "font-sans"], ["for", "prof-syn", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-300", "mb-1"], ["id", "prof-syn", "type", "text", "formControlName", "syndicateId", "placeholder", "\u0631\u0642\u0645 \u0627\u0644\u0642\u064A\u062F \u0627\u0644\u0646\u0642\u0627\u0628\u064A", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all", "font-sans"], ["for", "prof-address", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-300", "mb-1"], ["id", "prof-address", "type", "text", "formControlName", "manualAddress", "placeholder", "\u0627\u0633\u0645 \u0627\u0644\u0634\u0627\u0631\u0639\u060C \u0627\u0644\u0645\u0628\u0646\u0649\u060C \u0631\u0642\u0645 \u0627\u0644\u062F\u0648\u0631\u060C \u0627\u0644\u062D\u064A...", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all"], [1, "space-y-2"], [1, "flex", "items-center", "justify-between"], [1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-300"], [1, "text-[11px]", "text-emerald-400", "font-mono", "font-bold", "bg-emerald-500/10", "px-2.5", "py-1", "rounded-lg", "border", "border-emerald-500/20"], [1, "relative"], ["type", "text", "placeholder", "\u0627\u0628\u062D\u062B \u0639\u0646 \u0645\u0646\u0637\u0642\u0629 \u0623\u0648 \u0639\u0646\u0648\u0627\u0646 \u0644\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u062E\u0631\u064A\u0637\u0629 (\u0645\u062B\u0627\u0644: \u0627\u0644\u0645\u0639\u0627\u062F\u064A\u060C \u0627\u0644\u062A\u062C\u0645\u0639)...", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all", "pr-10", 3, "input", "keydown.enter", "value"], ["type", "button", 1, "absolute", "inset-y-0", "right-0", "px-3", "text-slate-400", "hover:text-white", "flex", "items-center", "justify-center", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], [1, "bg-slate-950", "border", "border-slate-800", "rounded-xl", "overflow-hidden", "shadow-2xl", "max-h-48", "overflow-y-auto"], [1, "w-full", "h-[380px]", "min-h-[380px]", "rounded-xl", "border", "border-slate-800", "overflow-hidden", "shadow-inner", "bg-slate-900", "block", "relative", 2, "height", "380px", "width", "100%", "min-height", "380px", 3, "hidden"], ["for", "prof-map-url", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-300", "mb-1"], ["id", "prof-map-url", "type", "url", "formControlName", "mapLocationUrl", "placeholder", "https://maps.google.com/...", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all", "font-sans"], [1, "fixed", "bottom-6", "left-6", "z-[9999]", "flex", "items-center", "gap-3", "px-5", "py-3.5", "bg-emerald-600/95", "backdrop-blur-md", "border", "border-emerald-400/30", "text-white", "rounded-2xl", "shadow-2xl", "font-cairo", "text-sm", "max-w-md", "animate-slide-in"], [1, "fixed", "inset-0", "z-[10000]", "flex", "items-center", "justify-center", "p-4", "bg-slate-950/80", "backdrop-blur-md"], [1, "fixed", "inset-0", "z-[10001]", "flex", "items-center", "justify-center", "p-4", "bg-slate-950/90", "backdrop-blur-lg"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-12", "h-12", "text-indigo-500/20"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-8l-2-2m0 0l-2 2m2-2v6"], [1, "w-8", "h-8", "border-4", "border-indigo-500", "border-t-transparent", "rounded-full", "animate-spin", "mb-2"], [1, "text-xs", "text-indigo-300", "font-cairo", "font-bold"], [1, "w-6", "h-6", "border-3", "border-indigo-500", "border-t-transparent", "rounded-full", "animate-spin"], [1, "w-4", "h-4", "border-2", "border-white", "border-t-transparent", "rounded-full", "animate-spin"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-emerald-400", "flex-shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], ["type", "button", 1, "text-slate-400", "hover:text-white", "text-sm", "font-bold", 3, "click"], ["type", "button", "id", "btn-upgrade-plan", 1, "flex", "items-center", "justify-center", "gap-2", "px-4", "py-2", "bg-gradient-to-r", "from-indigo-600", "to-violet-600", "hover:from-indigo-500", "hover:to-violet-500", "text-white", "font-bold", "text-xs", "rounded-xl", "shadow-lg", "shadow-indigo-600/30", "transition-all", "duration-200", "cursor-pointer", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M5 10l7-7m0 0l7 7m-7-7v18"], ["type", "button", "id", "btn-add-extra", 1, "flex", "items-center", "justify-center", "gap-2", "px-4", "py-2", "bg-slate-800", "hover:bg-slate-700", "border", "border-slate-600", "text-slate-200", "font-bold", "text-xs", "rounded-xl", "transition-all", "duration-200", "cursor-pointer", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M12 4v16m8-8H4"], ["type", "button", 1, "w-full", "text-left", "px-3.5", "py-2", "text-xs", "text-slate-300", "hover:bg-slate-900", "border-b", "border-slate-800/80", "last:border-b-0", "transition-colors", "font-cairo", "flex", "items-center", "gap-2"], ["type", "button", 1, "w-full", "text-left", "px-3.5", "py-2", "text-xs", "text-slate-300", "hover:bg-slate-900", "border-b", "border-slate-800/80", "last:border-b-0", "transition-colors", "font-cairo", "flex", "items-center", "gap-2", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5", "text-indigo-400", "flex-shrink-0"], [1, "truncate"], [1, "p-1.5", "bg-emerald-500/30", "rounded-xl", "text-white", "shrink-0"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M5 13l4 4L19 7"], [1, "font-bold"], ["type", "button", 1, "text-white/80", "hover:text-white", "text-base", "font-bold", "ml-2", 3, "click"], [1, "fixed", "inset-0", "z-[10000]", "flex", "items-center", "justify-center", "p-4", "bg-slate-950/80", "backdrop-blur-md", 3, "click"], [1, "relative", "w-full", "max-w-2xl", "bg-slate-900", "border", "border-slate-700", "rounded-2xl", "shadow-2xl", "overflow-y-auto", "max-h-[92vh]", "flex", "flex-col", 3, "click"], [1, "flex", "items-center", "justify-between", "p-5", "border-b", "border-slate-800"], [1, "text-base", "font-black", "text-white", "font-cairo"], [1, "text-xs", "text-slate-400", "font-cairo", "mt-0.5"], ["type", "button", "id", "btn-close-plan-modal", 1, "p-2", "rounded-xl", "text-slate-400", "hover:text-white", "hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "p-5", "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4", "overflow-y-auto", "min-h-0"], [1, "relative", "p-5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "transition-all", "duration-200", "hover:border-slate-600", "flex", "flex-col", "justify-between", "cursor-pointer", 3, "ring-2", "ring-indigo-500", "bg-indigo-950", "border-indigo-500"], [1, "flex", "items-center", "justify-between", "p-5", "border-t", "border-slate-800"], ["type", "button", 1, "px-4", "py-2", "text-xs", "text-slate-400", "hover:text-white", "transition-colors", "font-cairo", "cursor-pointer", 3, "click"], ["type", "button", "id", "btn-proceed-checkout", 1, "px-7", "py-3", "bg-indigo-600", "hover:bg-indigo-500", "active:bg-indigo-700", "disabled:opacity-40", "disabled:cursor-not-allowed", "text-white", "font-black", "text-sm", "rounded-xl", "shadow-lg", "shadow-indigo-600/40", "transition-all", "flex", "items-center", "gap-2", "cursor-pointer", 3, "click", "disabled"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"], [1, "relative", "p-5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "transition-all", "duration-200", "hover:border-slate-600", "flex", "flex-col", "justify-between", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "justify-between", "mb-3", "min-h-[22px]"], [1, "text-[10px]", "font-bold", "px-2.5", "py-0.5", "bg-gradient-to-r", "from-amber-500", "to-orange-500", "text-white", "rounded-full", "font-cairo", "shadow-sm"], [1, "text-[10px]", "font-bold", "px-2.5", "py-0.5", "bg-emerald-500/20", "text-emerald-400", "border", "border-emerald-500/30", "rounded-full", "font-cairo"], [1, "mb-3"], [1, "w-10", "h-10", "rounded-xl", "flex", "items-center", "justify-center", "mb-3", "text-lg"], [1, "text-xs", "text-slate-400", "mt-0.5", "font-cairo"], [1, "flex", "items-baseline", "gap-1"], [1, "text-xl", "font-black", "text-white", "font-mono"], [1, "text-xs", "text-slate-400", "font-cairo"], [1, "text-xs", "text-slate-400", "leading-relaxed", "font-cairo"], [1, "relative", "w-full", "max-w-md", "bg-slate-900", "border", "border-slate-700", "rounded-2xl", "shadow-2xl", "overflow-y-auto", "max-h-[92vh]", "flex", "flex-col", 3, "click"], [1, "text-[11px]", "text-slate-400", "font-cairo", "mt-0.5"], ["type", "button", "id", "btn-close-topup-modal", 1, "p-2", "rounded-xl", "text-slate-400", "hover:text-white", "hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "mx-5", "mt-4", "flex", "items-center", "gap-2.5", "p-3", "bg-slate-800/60", "border", "border-slate-700", "rounded-xl"], [1, "p-1.5", "rounded-lg", "bg-slate-700"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5", "text-slate-300"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-[10px]", "text-slate-300", "font-cairo", "leading-relaxed"], [1, "p-5", "space-y-3", "overflow-y-auto", "min-h-0"], [1, "p-4", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "cursor-pointer", "transition-all", "duration-200", "hover:border-slate-600", "flex", "items-center", "justify-between", 3, "ring-2", "ring-emerald-500", "bg-emerald-950", "border-emerald-500"], ["href", "mailto:admin@structo.app", "target", "_blank", 1, "block", "p-4", "bg-slate-950", "border", "border-dashed", "border-amber-500/40", "hover:border-amber-400/70", "rounded-xl", "transition-all", "duration-200", "group"], [1, "w-10", "h-10", "rounded-xl", "bg-amber-500/10", "flex", "items-center", "justify-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-amber-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"], [1, "text-sm", "font-black", "text-amber-300"], [1, "text-[10px]", "text-slate-400", "mt-0.5"], [1, "flex", "items-center", "gap-1", "text-[10px]", "text-amber-400", "font-bold", "group-hover:gap-2", "transition-all"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M17 8l4 4m0 0l-4 4m4-4H3"], ["type", "button", "id", "btn-proceed-topup", 1, "px-7", "py-3", "bg-emerald-600", "hover:bg-emerald-500", "active:bg-emerald-700", "disabled:opacity-40", "disabled:cursor-not-allowed", "text-white", "font-black", "text-sm", "rounded-xl", "shadow-lg", "shadow-emerald-600/40", "transition-all", "flex", "items-center", "gap-2", "cursor-pointer", 3, "click", "disabled"], [1, "p-4", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "cursor-pointer", "transition-all", "duration-200", "hover:border-slate-600", "flex", "items-center", "justify-between", 3, "click"], [1, "w-10", "h-10", "rounded-xl", "bg-emerald-500/15", "flex", "items-center", "justify-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-emerald-400"], [1, "text-sm", "font-black", "text-white"], [1, "text-right"], [1, "text-base", "font-black", "text-white"], [1, "text-[10px]", "text-slate-400"], [1, "relative", "w-full", "max-w-md", "bg-slate-900", "border", "border-slate-700", "rounded-2xl", "shadow-2xl", "overflow-y-auto", "max-h-[92vh]", "flex", "flex-col"], [1, "p-2", "rounded-xl", "bg-indigo-600"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"], [1, "text-sm", "font-black", "text-white", "font-cairo"], [1, "text-[10px]", "text-slate-400", "font-cairo"], ["type", "button", 1, "p-2", "rounded-xl", "text-slate-400", "hover:text-white", "hover:bg-slate-800", "transition-colors", "cursor-pointer"], [1, "p-5", "space-y-5", "overflow-y-auto", "min-h-0"], [1, "bg-slate-950", "rounded-xl", "p-4", "border", "border-slate-800", "space-y-2"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-3"], [1, "flex", "justify-between", "text-xs"], [1, "text-slate-300"], [1, "text-white", "font-bold"], [1, "text-slate-400"], [1, "border-t", "border-slate-700", "pt-2", "flex", "justify-between"], [1, "text-sm", "font-black", "text-indigo-300"], [1, "space-y-3"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400"], ["for", "mock-card-num", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "mock-card-num", "type", "text", "maxlength", "19", "placeholder", "4242 4242 4242 4242", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all", "font-mono", "tracking-wider", "pr-10", 3, "input", "value", "disabled"], [1, "absolute", "inset-y-0", "right-3", "flex", "items-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-slate-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"], [1, "text-[10px]", "text-indigo-400", "mt-1"], [1, "grid", "grid-cols-2", "gap-3"], ["for", "mock-expiry", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "mock-expiry", "type", "text", "maxlength", "5", "placeholder", "MM/YY", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all", "font-mono", 3, "input", "value", "disabled"], ["for", "mock-cvc", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "mock-cvc", "type", "password", "maxlength", "4", "placeholder", "\u2022\u2022\u2022", 1, "w-full", "px-3.5", "py-2.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-white", "text-xs", "placeholder-slate-600", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "transition-all", "font-mono", 3, "ngModelChange", "ngModel", "disabled"], [1, "flex", "items-center", "gap-2", "p-3", "bg-amber-500/10", "border", "border-amber-500/20", "rounded-xl"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-amber-400", "flex-shrink-0"], [1, "text-[10px]", "text-amber-300", "font-cairo"], [1, "p-5", "border-t", "border-slate-800"], ["type", "button", "id", "btn-process-payment", 1, "w-full", "py-3.5", "bg-gradient-to-r", "from-indigo-600", "to-violet-600", "hover:from-indigo-500", "hover:to-violet-500", "disabled:opacity-60", "text-white", "font-black", "text-sm", "rounded-xl", "shadow-2xl", "shadow-indigo-600/30", "transition-all", "flex", "items-center", "justify-center", "gap-3", "cursor-pointer", 3, "click", "disabled"], ["type", "button", 1, "p-2", "rounded-xl", "text-slate-400", "hover:text-white", "hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "w-5", "h-5", "border-2", "border-white", "border-t-transparent", "rounded-full", "animate-spin"]], template: function TenantProfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div", 5);
      \u0275\u0275conditionalCreate(3, TenantProfileComponent_Conditional_3_Template, 1, 1, "img", 6)(4, TenantProfileComponent_Conditional_4_Template, 3, 0, "div", 7);
      \u0275\u0275elementStart(5, "button", 8);
      \u0275\u0275listener("click", function TenantProfileComponent_Template_button_click_5_listener() {
        \u0275\u0275restoreView(_r1);
        const bannerFileInput_r3 = \u0275\u0275reference(12);
        return \u0275\u0275resetView(bannerFileInput_r3.click());
      });
      \u0275\u0275elementStart(6, "span", 9);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(7, "svg", 10);
      \u0275\u0275element(8, "path", 11)(9, "path", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275text(10, " \u062A\u063A\u064A\u064A\u0631 \u0635\u0648\u0631\u0629 \u0627\u0644\u063A\u0644\u0627\u0641 / Change Banner ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(11, "input", 13, 0);
      \u0275\u0275listener("change", function TenantProfileComponent_Template_input_change_11_listener($event) {
        return ctx.onBannerFileSelected($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(13, TenantProfileComponent_Conditional_13_Template, 4, 0, "div", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 15)(15, "div", 16)(16, "div", 17);
      \u0275\u0275conditionalCreate(17, TenantProfileComponent_Conditional_17_Template, 1, 1, "img", 18)(18, TenantProfileComponent_Conditional_18_Template, 1, 0, "img", 19);
      \u0275\u0275elementStart(19, "button", 20);
      \u0275\u0275listener("click", function TenantProfileComponent_Template_button_click_19_listener() {
        \u0275\u0275restoreView(_r1);
        const logoFileInput_r4 = \u0275\u0275reference(23);
        return \u0275\u0275resetView(logoFileInput_r4.click());
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(20, "svg", 21);
      \u0275\u0275element(21, "path", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(22, "input", 13, 1);
      \u0275\u0275listener("change", function TenantProfileComponent_Template_input_change_22_listener($event) {
        return ctx.onLogoFileSelected($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(24, TenantProfileComponent_Conditional_24_Template, 2, 0, "div", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 23)(26, "div", 24)(27, "h2", 25);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "span", 26);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "span", 27);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "p", 28);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(34, "svg", 29);
      \u0275\u0275element(35, "path", 30)(36, "path", 31);
      \u0275\u0275elementEnd();
      \u0275\u0275text(37);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(38, "div", 32)(39, "button", 33);
      \u0275\u0275listener("click", function TenantProfileComponent_Template_button_click_39_listener() {
        return ctx.saveCurrentTab();
      });
      \u0275\u0275conditionalCreate(40, TenantProfileComponent_Conditional_40_Template, 3, 0)(41, TenantProfileComponent_Conditional_41_Template, 4, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(42, TenantProfileComponent_Conditional_42_Template, 8, 1, "div", 34);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "div", 35)(44, "button", 36);
      \u0275\u0275listener("click", function TenantProfileComponent_Template_button_click_44_listener() {
        return ctx.selectTab(1);
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(45, "svg", 10);
      \u0275\u0275element(46, "path", 37);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(47, "span");
      \u0275\u0275text(48, "1. \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u0627\u0644\u062D\u0633\u0627\u0628");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "button", 36);
      \u0275\u0275listener("click", function TenantProfileComponent_Template_button_click_49_listener() {
        return ctx.selectTab(2);
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(50, "svg", 10);
      \u0275\u0275element(51, "path", 38);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(52, "span");
      \u0275\u0275text(53, "2. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u0627\u062A\u0635\u0627\u0644");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "button", 36);
      \u0275\u0275listener("click", function TenantProfileComponent_Template_button_click_54_listener() {
        return ctx.selectTab(3);
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(55, "svg", 10);
      \u0275\u0275element(56, "path", 30)(57, "path", 31);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(58, "span");
      \u0275\u0275text(59, "3. \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u062C\u063A\u0631\u0627\u0641\u064A\u0627");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(60, "form", 39);
      \u0275\u0275listener("ngSubmit", function TenantProfileComponent_Template_form_ngSubmit_60_listener() {
        return ctx.saveCurrentTab();
      });
      \u0275\u0275elementStart(61, "div", 40)(62, "div", 41)(63, "div")(64, "h3", 42);
      \u0275\u0275element(65, "span", 43);
      \u0275\u0275text(66, " \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 / Company & Account Details ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "p", 44);
      \u0275\u0275text(68, "\u0625\u062F\u0627\u0631\u0629 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0643\u064A\u0627\u0646\u060C \u0627\u0633\u0645 \u0627\u0644\u0645\u0624\u0633\u0633\u0629 \u0648\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064A");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(69, "div", 45)(70, "div")(71, "label", 46);
      \u0275\u0275text(72, " \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 / Company Name ");
      \u0275\u0275elementStart(73, "span", 47);
      \u0275\u0275text(74, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(75, "input", 48);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "div")(77, "label", 49);
      \u0275\u0275text(78, " \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0644\u0644\u0622\u062F\u0645\u0646 / Admin Email ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(79, "input", 50);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(80, "div", 45)(81, "div")(82, "label", 51);
      \u0275\u0275text(83, " \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0634\u062E\u0635\u064A / Personal Phone ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(84, "input", 52);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "div")(86, "label", 53);
      \u0275\u0275text(87, " \u0631\u0642\u0645 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628 / WhatsApp Phone ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(88, "input", 54);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(89, "div", 45)(90, "div", 55);
      \u0275\u0275element(91, "div", 56)(92, "div", 57);
      \u0275\u0275elementStart(93, "div", 58)(94, "div", 59)(95, "div", 60)(96, "div", 61);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(97, "svg", 62);
      \u0275\u0275element(98, "path", 63);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(99, "span", 64);
      \u0275\u0275text(100, "\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 \u0627\u0644\u062D\u0627\u0644\u064A / Subscription");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(101, "div", 65)(102, "span", 66);
      \u0275\u0275text(103);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(104, "span", 67);
      \u0275\u0275text(105, "Plan");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(106, "div", 68)(107, "span", 69);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(108, "svg", 70);
      \u0275\u0275element(109, "path", 71);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(110, TenantProfileComponent_Conditional_110_Template, 2, 0, "span")(111, TenantProfileComponent_Conditional_111_Template, 2, 1, "span");
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(112, "div", 72);
      \u0275\u0275conditionalCreate(113, TenantProfileComponent_Conditional_113_Template, 4, 0, "button", 73);
      \u0275\u0275conditionalCreate(114, TenantProfileComponent_Conditional_114_Template, 4, 0, "button", 74);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(115, "div", 75)(116, "div")(117, "span", 76);
      \u0275\u0275text(118, "\u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(119, "span", 77);
      \u0275\u0275text(120);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(121, "span", 78);
      \u0275\u0275text(122, "\u0645\u0633\u062C\u0644 \u0628\u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(123, "div")(124, "label", 79);
      \u0275\u0275text(125, " \u0648\u0635\u0641 \u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u0627\u0644\u0646\u0634\u0627\u0637 / Company Description ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(126, "textarea", 80);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(127, "div", 81)(128, "button", 82);
      \u0275\u0275listener("click", function TenantProfileComponent_Template_button_click_128_listener() {
        return ctx.saveCurrentTab();
      });
      \u0275\u0275elementStart(129, "span");
      \u0275\u0275text(130, "\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(131, "div", 40)(132, "div", 41)(133, "div")(134, "h3", 42);
      \u0275\u0275element(135, "span", 43);
      \u0275\u0275text(136, " \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u0648\u062B\u0627\u0626\u0642 / Legal Information & Documents ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(137, "p", 44);
      \u0275\u0275text(138, "\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 \u0648\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0631\u0633\u0645\u064A\u0629 \u0648\u0627\u0644\u0633\u062C\u0644\u0627\u062A");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(139, "div", 45)(140, "div")(141, "label", 83);
      \u0275\u0275text(142, " \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 / Governorate ");
      \u0275\u0275elementStart(143, "span", 47);
      \u0275\u0275text(144, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(145, "select", 84)(146, "option", 85);
      \u0275\u0275text(147, "-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 / Select Governorate --");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(148, TenantProfileComponent_For_149_Template, 2, 2, "option", 86, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(150, "div")(151, "label", 87);
      \u0275\u0275text(152, " \u0631\u0642\u0645 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / Commercial Register ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(153, "input", 88);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(154, "div", 89)(155, "div")(156, "label", 90);
      \u0275\u0275text(157, " \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0636\u0631\u064A\u0628\u064A\u0629 / Tax Card ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(158, "input", 91);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(159, "div")(160, "label", 92);
      \u0275\u0275text(161, " \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A \u0644\u0644\u0645\u0627\u0644\u0643 / National ID ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(162, "input", 93);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(163, "div")(164, "label", 94);
      \u0275\u0275text(165, " \u0631\u0642\u0645 \u0643\u0627\u0631\u0646\u064A\u0647 \u0627\u0644\u0646\u0642\u0627\u0628\u0629 / Syndicate ID ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(166, "input", 95);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(167, "div", 81)(168, "button", 82);
      \u0275\u0275listener("click", function TenantProfileComponent_Template_button_click_168_listener() {
        return ctx.saveCurrentTab();
      });
      \u0275\u0275elementStart(169, "span");
      \u0275\u0275text(170, "\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(171, "div", 40)(172, "div", 41)(173, "div")(174, "h3", 42);
      \u0275\u0275element(175, "span", 43);
      \u0275\u0275text(176, " \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u062C\u063A\u0631\u0627\u0641\u064A\u0627 / Location & Geolocation ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(177, "p", 44);
      \u0275\u0275text(178, "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062F\u0642\u064A\u0642 \u0648\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u0643\u0627\u062A\u0628 \u0648\u0627\u0644\u0641\u0631\u0648\u0639 \u0639\u0628\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(179, "div")(180, "label", 96);
      \u0275\u0275text(181, " \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A / Manual Address ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(182, "input", 97);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(183, "div", 98)(184, "div", 99)(185, "label", 100);
      \u0275\u0275text(186, " \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0648\u0642\u0639 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 / Drop Pin Map Selector ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(187, TenantProfileComponent_Conditional_187_Template, 4, 8, "span", 101);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(188, "div", 102)(189, "input", 103);
      \u0275\u0275listener("input", function TenantProfileComponent_Template_input_input_189_listener($event) {
        return ctx.onMapSearchChange($event);
      })("keydown.enter", function TenantProfileComponent_Template_input_keydown_enter_189_listener() {
        return ctx.onMapSearchSubmit();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(190, "button", 104);
      \u0275\u0275listener("click", function TenantProfileComponent_Template_button_click_190_listener() {
        return ctx.onMapSearchSubmit();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(191, "svg", 10);
      \u0275\u0275element(192, "path", 105);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(193, TenantProfileComponent_Conditional_193_Template, 3, 0, "div", 106);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275element(194, "div", 107, 2);
      \u0275\u0275elementStart(196, "div")(197, "label", 108);
      \u0275\u0275text(198, " \u0631\u0627\u0628\u0637 \u062E\u0631\u0627\u0626\u0637 \u062C\u0648\u062C\u0644 (\u0627\u062E\u062A\u0631 \u0627\u062E\u062A\u064A\u0627\u0631\u064A) / Google Maps Link ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(199, "input", 109);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(200, "div", 81)(201, "button", 82);
      \u0275\u0275listener("click", function TenantProfileComponent_Template_button_click_201_listener() {
        return ctx.saveCurrentTab();
      });
      \u0275\u0275elementStart(202, "span");
      \u0275\u0275text(203, "\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275conditionalCreate(204, TenantProfileComponent_Conditional_204_Template, 8, 1, "div", 110);
      \u0275\u0275conditionalCreate(205, TenantProfileComponent_Conditional_205_Template, 21, 1, "div", 111);
      \u0275\u0275conditionalCreate(206, TenantProfileComponent_Conditional_206_Template, 42, 2, "div", 111);
      \u0275\u0275conditionalCreate(207, TenantProfileComponent_Conditional_207_Template, 65, 18, "div", 112);
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.profileForm.get("bannerUrl")?.value ? 3 : 4);
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.isUploadingBanner() ? 13 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.profileForm.get("logoUrl")?.value ? 17 : 18);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.isUploadingLogo() ? 24 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.profileForm.get("name")?.value || "\u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0629", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.tenantData()?.accountType || "Company", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" Plan: ", ctx.tenantData()?.subscriptionPlan || "Free", " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.resolveGovernorateLabel(ctx.profileForm.get("governorateId")?.value || ctx.profileForm.get("location")?.value) || "\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 / Region not set", " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isSaving());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSaving() ? 40 : 41);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.toastMessage() ? 42 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("bg-indigo-600", ctx.activeTab() === 1)("text-white", ctx.activeTab() === 1)("shadow-md", ctx.activeTab() === 1)("text-slate-400", ctx.activeTab() !== 1)("hover:text-slate-200", ctx.activeTab() !== 1)("hover:bg-slate-800/60", ctx.activeTab() !== 1);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("bg-indigo-600", ctx.activeTab() === 2)("text-white", ctx.activeTab() === 2)("shadow-md", ctx.activeTab() === 2)("text-slate-400", ctx.activeTab() !== 2)("hover:text-slate-200", ctx.activeTab() !== 2)("hover:bg-slate-800/60", ctx.activeTab() !== 2);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("bg-indigo-600", ctx.activeTab() === 3)("text-white", ctx.activeTab() === 3)("shadow-md", ctx.activeTab() === 3)("text-slate-400", ctx.activeTab() !== 3)("hover:text-slate-200", ctx.activeTab() !== 3)("hover:bg-slate-800/60", ctx.activeTab() !== 3);
      \u0275\u0275advance(6);
      \u0275\u0275property("formGroup", ctx.profileForm);
      \u0275\u0275advance();
      \u0275\u0275property("hidden", ctx.activeTab() !== 1);
      \u0275\u0275advance(14);
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.tenantData()?.adminEmail || ctx.auth.currentUser()?.email || "N/A");
      \u0275\u0275advance(5);
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275control();
      \u0275\u0275advance(15);
      \u0275\u0275textInterpolate(ctx.tenantData()?.subscriptionPlan || "Free");
      \u0275\u0275advance(7);
      \u0275\u0275conditional((ctx.tenantData()?.maxActiveProjects || 2) === -1 ? 110 : 111);
      \u0275\u0275advance(3);
      \u0275\u0275conditional((ctx.tenantData()?.subscriptionPlan || "Free") !== "Enterprise" ? 113 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.tenantData()?.maxActiveProjects || 2) !== -1 ? 114 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.tenantData()?.accountType || "Company");
      \u0275\u0275advance(6);
      \u0275\u0275control();
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isSaving());
      \u0275\u0275advance(3);
      \u0275\u0275property("hidden", ctx.activeTab() !== 2);
      \u0275\u0275advance(14);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.governorates);
      \u0275\u0275advance(5);
      \u0275\u0275control();
      \u0275\u0275advance(5);
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275control();
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isSaving());
      \u0275\u0275advance(3);
      \u0275\u0275property("hidden", ctx.activeTab() !== 3);
      \u0275\u0275advance(11);
      \u0275\u0275control();
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.profileForm.get("latitude")?.value && ctx.profileForm.get("longitude")?.value ? 187 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", ctx.mapSearchQuery);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.mapSearchResults().length > 0 ? 193 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("hidden", ctx.activeTab() !== 3);
      \u0275\u0275advance(5);
      \u0275\u0275control();
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isSaving());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.toastMessage() ? 204 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showPlanModal() ? 205 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showTopUpModal() ? 206 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showCheckoutModal() ? 207 : -1);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, FormsModule, NgModel, TranslateModule, DecimalPipe], styles: ['@import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";\n\n/* angular:styles/component:css;3af23bbfdbbc2a03e0d02c12605d8e94d73c38652c44c59b7626a7b52aa6dd3c;E:/private/structo/structo/Structo.Client/src/app/features/dashboard/tenant-profile/tenant-profile.component.ts */\n.font-cairo {\n  font-family:\n    "Cairo",\n    "Inter",\n    sans-serif;\n}\n.leaflet-container {\n  height: 380px !important;\n  min-height: 380px !important;\n  width: 100% !important;\n  background-color: #0f172a !important;\n  z-index: 1 !important;\n}\n.leaflet-tile-container img {\n  width: 256px !important;\n  height: 256px !important;\n}\n@keyframes slide-in-toast {\n  from {\n    opacity: 0;\n    transform: translateY(12px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.animate-slide-in {\n  animation: slide-in-toast 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n/*! tailwindcss v4.3.1 | MIT License | https://tailwindcss.com */\n/*# sourceMappingURL=tenant-profile.component.css.map */\n'], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TenantProfileComponent, [{
    type: Component,
    args: [{ selector: "app-tenant-profile", standalone: true, encapsulation: ViewEncapsulation.None, imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule], template: `
    <div class="w-full max-w-5xl mx-auto space-y-6">
      
      <!-- HEADER BANNER & COMPANY IDENTITY -->
      <div class="relative bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
        <!-- Banner Image / Gradient -->
        <div class="w-full h-40 sm:h-52 bg-slate-800 relative overflow-hidden group">
          @if (profileForm.get('bannerUrl')?.value) {
            <img [src]="profileForm.get('bannerUrl')?.value" alt="Banner" class="w-full h-full object-cover">
          } @else {
            <div class="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
              <svg class="w-12 h-12 text-indigo-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-8l-2-2m0 0l-2 2m2-2v6" />
              </svg>
            </div>
          }
          
          <!-- Banner Upload Button -->
          <button type="button" (click)="bannerFileInput.click()" 
            class="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
            <span class="flex items-center gap-2 text-white text-xs font-bold font-cairo bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-700 backdrop-blur-md hover:bg-indigo-600 transition-colors">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              \u062A\u063A\u064A\u064A\u0631 \u0635\u0648\u0631\u0629 \u0627\u0644\u063A\u0644\u0627\u0641 / Change Banner
            </span>
          </button>
          <input #bannerFileInput type="file" class="hidden" (change)="onBannerFileSelected($event)" accept="image/*">
          
          @if (isUploadingBanner()) {
            <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
              <div class="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <span class="text-xs text-indigo-300 font-cairo font-bold">\u062C\u0627\u0631\u064A \u0627\u0644\u0631\u0641\u0639... / Uploading...</span>
            </div>
          }
        </div>

        <!-- Identity Bar -->
        <div class="p-6 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 sm:-mt-14">
          <div class="flex items-end gap-4">
            <!-- Logo Box -->
            <div class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-900 border-4 border-slate-900 shadow-2xl overflow-hidden group flex-shrink-0">
              @if (profileForm.get('logoUrl')?.value) {
                <img [src]="profileForm.get('logoUrl')?.value" alt="Logo" class="w-full h-full object-cover">
              } @else {
                <img src="assets/images/default-tenant-logo.png" alt="Default Logo" class="w-full h-full object-cover opacity-80">
              }
              <button type="button" (click)="logoFileInput.click()" 
                class="absolute inset-0 bg-slate-950/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </button>
              <input #logoFileInput type="file" class="hidden" (change)="onLogoFileSelected($event)" accept="image/*">
              
              @if (isUploadingLogo()) {
                <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
                  <div class="w-6 h-6 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }
            </div>

            <!-- Titles & Status Badges -->
            <div class="pb-1 space-y-1 font-cairo">
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-xl sm:text-2xl font-bold text-white">
                  {{ profileForm.get('name')?.value || '\u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0629' }}
                </h2>
                <span class="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {{ tenantData()?.accountType || 'Company' }}
                </span>
                <span class="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Plan: {{ tenantData()?.subscriptionPlan || 'Free' }}
                </span>
              </div>
              <p class="text-xs text-slate-400 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ resolveGovernorateLabel(profileForm.get('governorateId')?.value || profileForm.get('location')?.value) || '\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 / Region not set' }}
              </p>
            </div>
          </div>

          <!-- Overall Quick Save Action -->
          <div class="w-full sm:w-auto flex items-center justify-end">
            <button type="button" (click)="saveCurrentTab()" [disabled]="isSaving()" 
              class="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all font-cairo flex items-center justify-center gap-2 cursor-pointer">
              @if (isSaving()) {
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...</span>
              } @else {
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A</span>
              }
            </button>
          </div>
        </div>

        <!-- SUCCESS TOAST BANNER -->
        @if (toastMessage()) {
          <div class="mx-6 mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold font-cairo flex items-center justify-between animate-fade-in">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ toastMessage() }}</span>
            </div>
            <button type="button" (click)="toastMessage.set(null)" class="text-slate-400 hover:text-white text-sm font-bold">\xD7</button>
          </div>
        }
      </div>

      <!-- TAB NAVIGATION BAR -->
      <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-1.5 flex items-center gap-1.5 overflow-x-auto font-cairo shadow-lg">
        <button type="button" (click)="selectTab(1)"
          [class.bg-indigo-600]="activeTab() === 1"
          [class.text-white]="activeTab() === 1"
          [class.shadow-md]="activeTab() === 1"
          [class.text-slate-400]="activeTab() !== 1"
          [class.hover:text-slate-200]="activeTab() !== 1"
          [class.hover:bg-slate-800/60]="activeTab() !== 1"
          class="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-8l-2-2m0 0l-2 2m2-2v6" />
          </svg>
          <span>1. \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u0627\u0644\u062D\u0633\u0627\u0628</span>
        </button>

        <button type="button" (click)="selectTab(2)"
          [class.bg-indigo-600]="activeTab() === 2"
          [class.text-white]="activeTab() === 2"
          [class.shadow-md]="activeTab() === 2"
          [class.text-slate-400]="activeTab() !== 2"
          [class.hover:text-slate-200]="activeTab() !== 2"
          [class.hover:bg-slate-800/60]="activeTab() !== 2"
          class="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>2. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u0627\u062A\u0635\u0627\u0644</span>
        </button>

        <button type="button" (click)="selectTab(3)"
          [class.bg-indigo-600]="activeTab() === 3"
          [class.text-white]="activeTab() === 3"
          [class.shadow-md]="activeTab() === 3"
          [class.text-slate-400]="activeTab() !== 3"
          [class.hover:text-slate-200]="activeTab() !== 3"
          [class.hover:bg-slate-800/60]="activeTab() !== 3"
          class="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>3. \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u062C\u063A\u0631\u0627\u0641\u064A\u0627</span>
        </button>
      </div>

      <!-- MAIN FORM CONTAINER -->
      <form [formGroup]="profileForm" (ngSubmit)="saveCurrentTab()" class="space-y-6">

        <!-- TAB 1: COMPANY & ACCOUNT DATA -->
        <div [hidden]="activeTab() !== 1" class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl font-cairo">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 / Company & Account Details
              </h3>
              <p class="text-[11px] text-slate-400">\u0625\u062F\u0627\u0631\u0629 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0643\u064A\u0627\u0646\u060C \u0627\u0633\u0645 \u0627\u0644\u0645\u0624\u0633\u0633\u0629 \u0648\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064A</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Company Name -->
            <div>
              <label for="prof-name" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 / Company Name <span class="text-rose-400">*</span>
              </label>
              <input id="prof-name" type="text" formControlName="name" placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all">
            </div>

            <!-- Admin Email (Readonly) -->
            <div>
              <label for="prof-email" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0644\u0644\u0622\u062F\u0645\u0646 / Admin Email
              </label>
              <input id="prof-email" type="email" [value]="tenantData()?.adminEmail || auth.currentUser()?.email || 'N/A'" readonly disabled
                class="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-slate-400 text-xs cursor-not-allowed">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Personal Phone -->
            <div>
              <label for="prof-personal-phone" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0634\u062E\u0635\u064A / Personal Phone
              </label>
              <input id="prof-personal-phone" type="tel" formControlName="personalPhone" maxlength="11" placeholder="01xxxxxxxxx"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
            </div>

            <!-- WhatsApp Phone -->
            <div>
              <label for="prof-whatsapp-phone" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                \u0631\u0642\u0645 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628 / WhatsApp Phone
              </label>
              <input id="prof-whatsapp-phone" type="tel" formControlName="whatsAppPhone" maxlength="11" placeholder="01xxxxxxxxx"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SUBSCRIPTION PREMIUM CARD \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            <div class="col-span-1 sm:col-span-2 relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 p-5 shadow-2xl">
              <!-- Background glow -->
              <div class="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-indigo-600/20 blur-2xl pointer-events-none"></div>
              <div class="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-violet-600/20 blur-2xl pointer-events-none"></div>

              <div class="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <!-- Plan Info -->
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <div class="p-1.5 rounded-lg bg-indigo-500/20">
                      <svg class="w-4 h-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/>
                      </svg>
                    </div>
                    <span class="text-[10px] font-bold uppercase tracking-widest text-indigo-400">\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 \u0627\u0644\u062D\u0627\u0644\u064A / Subscription</span>
                  </div>
                  <div class="flex items-baseline gap-2">
                    <span class="text-2xl font-black text-white">{{ tenantData()?.subscriptionPlan || 'Free' }}</span>
                    <span class="text-xs font-bold text-slate-400">Plan</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="flex items-center gap-1 text-xs text-slate-300">
                      <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>
                      </svg>
                      @if ((tenantData()?.maxActiveProjects || 2) === -1) {
                        <span>\u0645\u0634\u0627\u0631\u064A\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u0648\u062F\u0629</span>
                      } @else {
                        <span>{{ tenantData()?.maxActiveProjects || 2 }} \u0645\u0634\u0627\u0631\u064A\u0639 \u0646\u0634\u0637\u0629</span>
                      }
                    </span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <!-- Upgrade Plan Button -->
                  @if ((tenantData()?.subscriptionPlan || 'Free') !== 'Enterprise') {
                    <button type="button" id="btn-upgrade-plan" (click)="openPlanModal()"
                      class="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 cursor-pointer">
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                      </svg>
                      \u062A\u0631\u0642\u064A\u0629 \u0627\u0644\u0628\u0627\u0642\u0629 / Upgrade Plan
                    </button>
                  }
                  <!-- Add Extra Projects Button -->
                  @if ((tenantData()?.maxActiveProjects || 2) !== -1) {
                    <button type="button" id="btn-add-extra" (click)="openTopUpModal()"
                      class="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-xs rounded-xl transition-all duration-200 cursor-pointer">
                      <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
                      </svg>
                      \u0634\u062D\u0646 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 / +Add Projects
                    </button>
                  }
                </div>
              </div>
            </div>

            <!-- Account Type -->
            <div class="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <span class="block text-[10px] font-bold text-slate-400 uppercase">\u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628</span>
                <span class="text-sm font-bold text-emerald-400">{{ tenantData()?.accountType || 'Company' }}</span>
              </div>
              <span class="text-xs text-slate-400">\u0645\u0633\u062C\u0644 \u0628\u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629</span>
            </div>
          </div>

          <!-- Company Description -->
          <div>
            <label for="prof-desc" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              \u0648\u0635\u0641 \u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u0627\u0644\u0646\u0634\u0627\u0637 / Company Description
            </label>
            <textarea id="prof-desc" formControlName="companyDescription" rows="3" placeholder="\u0646\u0628\u0630\u0629 \u0645\u062E\u062A\u0635\u0631\u0629 \u0639\u0646 \u0646\u0634\u0627\u0637 \u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u062E\u062F\u0645\u0627\u062A\u0647\u0627..."
              class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all resize-none"></textarea>
          </div>

          <!-- Tab 1 Footer Actions -->
          <div class="flex items-center justify-end pt-3 border-t border-slate-800">
            <button type="button" (click)="saveCurrentTab()" [disabled]="isSaving()" 
              class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer">
              <span>\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A</span>
            </button>
          </div>
        </div>

        <!-- TAB 2: LEGAL & CONTACT DATA -->
        <div [hidden]="activeTab() !== 2" class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl font-cairo">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u0648\u062B\u0627\u0626\u0642 / Legal Information & Documents
              </h3>
              <p class="text-[11px] text-slate-400">\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 \u0648\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0631\u0633\u0645\u064A\u0629 \u0648\u0627\u0644\u0633\u062C\u0644\u0627\u062A</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Governorate Dropdown (Strict Binding Fix) -->
            <div>
              <label for="prof-gov" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 / Governorate <span class="text-rose-400">*</span>
              </label>
              <select id="prof-gov" formControlName="governorateId"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
                <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 / Select Governorate --</option>
                @for (gov of governorates; track gov.id) {
                  <option [value]="gov.id">{{ gov.label }}</option>
                }
              </select>
            </div>

            <!-- Commercial Register -->
            <div>
              <label for="prof-cr" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                \u0631\u0642\u0645 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / Commercial Register
              </label>
              <input id="prof-cr" type="text" formControlName="commercialRegister" placeholder="\u0645\u062B\u0627\u0644: 102030"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Tax Card -->
            <div>
              <label for="prof-tax" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0636\u0631\u064A\u0628\u064A\u0629 / Tax Card
              </label>
              <input id="prof-tax" type="text" formControlName="taxCard" placeholder="\u0645\u062B\u0627\u0644: 334-556-789"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
            </div>

            <!-- National ID -->
            <div>
              <label for="prof-nat" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                \u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0642\u0648\u0645\u064A \u0644\u0644\u0645\u0627\u0644\u0643 / National ID
              </label>
              <input id="prof-nat" type="text" formControlName="nationalId" maxlength="14" placeholder="14 \u0631\u0642\u0645 \u0642\u0648\u0645\u064A"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
            </div>

            <!-- Syndicate ID -->
            <div>
              <label for="prof-syn" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                \u0631\u0642\u0645 \u0643\u0627\u0631\u0646\u064A\u0647 \u0627\u0644\u0646\u0642\u0627\u0628\u0629 / Syndicate ID
              </label>
              <input id="prof-syn" type="text" formControlName="syndicateId" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0642\u064A\u062F \u0627\u0644\u0646\u0642\u0627\u0628\u064A"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
            </div>
          </div>

          <!-- Tab 2 Footer Actions -->
          <div class="flex items-center justify-end pt-3 border-t border-slate-800">
            <button type="button" (click)="saveCurrentTab()" [disabled]="isSaving()" 
              class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer">
              <span>\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A</span>
            </button>
          </div>
        </div>

        <!-- TAB 3: LOCATION & GEOGRAPHY -->
        <div [hidden]="activeTab() !== 3" class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl font-cairo">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u062C\u063A\u0631\u0627\u0641\u064A\u0627 / Location & Geolocation
              </h3>
              <p class="text-[11px] text-slate-400">\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062F\u0642\u064A\u0642 \u0648\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u0643\u0627\u062A\u0628 \u0648\u0627\u0644\u0641\u0631\u0648\u0639 \u0639\u0628\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629</p>
            </div>
          </div>

          <!-- Manual Address Field -->
          <div>
            <label for="prof-address" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A / Manual Address
            </label>
            <input id="prof-address" type="text" formControlName="manualAddress" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0634\u0627\u0631\u0639\u060C \u0627\u0644\u0645\u0628\u0646\u0649\u060C \u0631\u0642\u0645 \u0627\u0644\u062F\u0648\u0631\u060C \u0627\u0644\u062D\u064A..."
              class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all">
          </div>

          <!-- Interactive Map Header & Search -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-300">
                \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0648\u0642\u0639 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 / Drop Pin Map Selector
              </label>
              @if (profileForm.get('latitude')?.value && profileForm.get('longitude')?.value) {
                <span class="text-[11px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  Lat: {{ profileForm.get('latitude')?.value | number:'1.4-6' }} | Lng: {{ profileForm.get('longitude')?.value | number:'1.4-6' }}
                </span>
              }
            </div>

            <!-- Map Search Input -->
            <div class="relative">
              <input type="text" [value]="mapSearchQuery" (input)="onMapSearchChange($event)" (keydown.enter)="onMapSearchSubmit()"
                placeholder="\u0627\u0628\u062D\u062B \u0639\u0646 \u0645\u0646\u0637\u0642\u0629 \u0623\u0648 \u0639\u0646\u0648\u0627\u0646 \u0644\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u062E\u0631\u064A\u0637\u0629 (\u0645\u062B\u0627\u0644: \u0627\u0644\u0645\u0639\u0627\u062F\u064A\u060C \u0627\u0644\u062A\u062C\u0645\u0639)..."
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all pr-10">
              <button type="button" (click)="onMapSearchSubmit()" class="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-white flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <!-- Search Results Dropdown -->
            @if (mapSearchResults().length > 0) {
              <div class="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl max-h-48 overflow-y-auto">
                @for (result of mapSearchResults(); track result.display_name) {
                  <button type="button" (click)="selectMapSearchResult(result)" 
                    class="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:bg-slate-900 border-b border-slate-800/80 last:border-b-0 transition-colors font-cairo flex items-center gap-2">
                    <svg class="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span class="truncate">{{ result.display_name }}</span>
                  </button>
                }
              </div>
            }
          </div>

          <div #profileMapContainer 
               style="height: 380px; width: 100%; min-height: 380px;" 
               [hidden]="activeTab() !== 3" 
               class="w-full h-[380px] min-h-[380px] rounded-xl border border-slate-800 overflow-hidden shadow-inner bg-slate-900 block relative">
          </div>

          <!-- Map Location URL -->
          <div>
            <label for="prof-map-url" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              \u0631\u0627\u0628\u0637 \u062E\u0631\u0627\u0626\u0637 \u062C\u0648\u062C\u0644 (\u0627\u062E\u062A\u0631 \u0627\u062E\u062A\u064A\u0627\u0631\u064A) / Google Maps Link
            </label>
            <input id="prof-map-url" type="url" formControlName="mapLocationUrl" placeholder="https://maps.google.com/..."
              class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
          </div>

          <!-- Tab 3 Footer Actions -->
          <div class="flex items-center justify-end pt-3 border-t border-slate-800">
            <button type="button" (click)="saveCurrentTab()" [disabled]="isSaving()" 
              class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer">
              <span>\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A</span>
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- SUCCESS FLOATING TOAST -->
    @if (toastMessage()) {
      <div class="fixed bottom-6 left-6 z-[9999] flex items-center gap-3 px-5 py-3.5 bg-emerald-600/95 backdrop-blur-md border border-emerald-400/30 text-white rounded-2xl shadow-2xl font-cairo text-sm max-w-md animate-slide-in">
        <div class="p-1.5 bg-emerald-500/30 rounded-xl text-white shrink-0">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span class="font-bold">{{ toastMessage() }}</span>
        <button type="button" (click)="toastMessage.set(null)" class="text-white/80 hover:text-white text-base font-bold ml-2">\xD7</button>
      </div>
    }

    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
    <!-- MODAL 1 \u2014 PLAN SELECTION MODAL                                  -->
    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
    @if (showPlanModal()) {
      <div class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" (click)="closePlanModal()">
        <div class="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] flex flex-col" (click)="$event.stopPropagation()">
          <!-- Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800">
            <div>
              <h3 class="text-base font-black text-white font-cairo">\u0634\u0631\u0627\u0621 \u0633\u0639\u0629 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 / Buy Project Quota</h3>
              <p class="text-xs text-slate-400 font-cairo mt-0.5">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0628\u0627\u0644\u062C\u0646\u064A\u0647 \u0627\u0644\u0645\u0635\u0631\u064A / All prices in EGP</p>
            </div>
            <button type="button" (click)="closePlanModal()" id="btn-close-plan-modal"
              class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Plan Cards (2 Additive Top-up Options) -->
          <div class="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto min-h-0">
            @for (plan of availablePlans(); track plan.id) {
              <div (click)="selectPlan(plan)"
                [class.ring-2]="selectedPlan()?.id === plan.id"
                [class.ring-indigo-500]="selectedPlan()?.id === plan.id"
                [class.bg-indigo-950]="selectedPlan()?.id === plan.id"
                [class.border-indigo-500]="selectedPlan()?.id === plan.id"
                class="relative p-5 bg-slate-950 border border-slate-800 rounded-xl transition-all duration-200 hover:border-slate-600 flex flex-col justify-between cursor-pointer">

                <div>
                  <!-- Best Value Badge -->
                  <div class="flex items-center justify-between mb-3 min-h-[22px]">
                    @if (plan.id === '5' || plan.extra === 5 || plan.maxProjects === 5) {
                      <span class="text-[10px] font-bold px-2.5 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-cairo shadow-sm">\u2B50\uFE0F \u0627\u0644\u0623\u0641\u0636\u0644 \u062A\u0648\u0641\u064A\u0631\u0627\u064B / Best Value</span>
                    } @else {
                      <span class="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-cairo">\u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A</span>
                    }
                  </div>

                  <div class="mb-3">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-lg"
                      [class.bg-emerald-600/20]="plan.id === '1' || plan.extra === 1"
                      [class.bg-gradient-to-br]="plan.id === '5' || plan.extra === 5"
                      [class.from-amber-500]="plan.id === '5' || plan.extra === 5"
                      [class.to-orange-600]="plan.id === '5' || plan.extra === 5">
                      @if (plan.id === '1' || plan.extra === 1) { \u{1F4E6} } @else { \u{1F680} }
                    </div>
                    <h4 class="text-base font-black text-white font-cairo">{{ plan.nameEn || plan.label }}</h4>
                    <p class="text-xs text-slate-400 mt-0.5 font-cairo">{{ plan.nameAr }}</p>
                  </div>

                  <div class="mb-3">
                    <div class="flex items-baseline gap-1">
                      <span class="text-xl font-black text-white font-mono">{{ plan.priceEgp }}</span>
                      <span class="text-xs text-slate-400 font-cairo">\u062C.\u0645 / EGP</span>
                    </div>
                  </div>

                  <p class="text-xs text-slate-400 leading-relaxed font-cairo">
                    {{ plan.description || '\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 \u0644\u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u062D\u0627\u0644\u064A (Adds projects to active quota)' }}
                  </p>
                </div>
              </div>
            }
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between p-5 border-t border-slate-800">
            <button type="button" (click)="closePlanModal()" class="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors font-cairo cursor-pointer">\u0625\u0644\u063A\u0627\u0621</button>
            <button type="button" id="btn-proceed-checkout" (click)="proceedToCheckout('upgrade')"
              [disabled]="!selectedPlan() || isCurrentPlan(selectedPlan()?.id || '')"
              class="px-7 py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm rounded-xl shadow-lg shadow-indigo-600/40 transition-all flex items-center gap-2 cursor-pointer">
              <!-- Cart / Buy Icon -->
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              \u0634\u0631\u0627\u0621 \u0627\u0644\u0628\u0627\u0642\u0629 / Buy Plan
            </button>
          </div>
        </div>
      </div>
    }

    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
    <!-- MODAL 2 \u2014 ADD-ON TOP-UP MODAL                                   -->
    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
    @if (showTopUpModal()) {
      <div class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" (click)="closeTopUpModal()">
        <div class="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] flex flex-col" (click)="$event.stopPropagation()">
          <!-- Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800">
            <div>
              <h3 class="text-base font-black text-white font-cairo">\u0634\u062D\u0646 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 / Add Extra Projects</h3>
              <p class="text-[11px] text-slate-400 font-cairo mt-0.5">\u062A\u064F\u0636\u0627\u0641 \u0641\u0648\u0631\u0627\u064B \u0641\u0648\u0642 \u0633\u0639\u062A\u0643 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 ({{ tenantData()?.maxActiveProjects || 2 }} \u0645\u0634\u0631\u0648\u0639)</p>
            </div>
            <button type="button" (click)="closeTopUpModal()" id="btn-close-topup-modal"
              class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Free Plan Info Badge -->
          <div class="mx-5 mt-4 flex items-center gap-2.5 p-3 bg-slate-800/60 border border-slate-700 rounded-xl">
            <div class="p-1.5 rounded-lg bg-slate-700">
              <svg class="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p class="text-[10px] text-slate-300 font-cairo leading-relaxed">
              \u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629 \u062A\u0634\u0645\u0644 \u0645\u0634\u0631\u0648\u0639\u064A\u0646 \u0645\u062F\u0649 \u0627\u0644\u062D\u064A\u0627\u0629. \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u0645\u0646\u062A\u0647\u064A \u0623\u0648 \u0627\u0644\u0645\u063A\u0644\u0642 \u064A\u0633\u062A\u0647\u0644\u0643 \u0627\u0644\u0631\u0635\u064A\u062F \u0628\u0634\u0643\u0644 \u062F\u0627\u0626\u0645.
            </p>
          </div>

          <!-- Top-Up Options -->
          <div class="p-5 space-y-3 overflow-y-auto min-h-0">
            @for (opt of availableTopUps(); track opt.extra) {
              <div (click)="selectTopUp(opt)"
                [class.ring-2]="selectedTopUp()?.extra === opt.extra"
                [class.ring-emerald-500]="selectedTopUp()?.extra === opt.extra"
                [class.bg-emerald-950]="selectedTopUp()?.extra === opt.extra"
                [class.border-emerald-500]="selectedTopUp()?.extra === opt.extra"
                class="p-4 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer transition-all duration-200 hover:border-slate-600 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                    <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
                    </svg>
                  </div>
                  <div>
                    <span class="text-sm font-black text-white">{{ opt.label }}</span>
                    <p class="text-[10px] text-slate-400 mt-0.5">\u064A\u0635\u0628\u062D \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A: {{ (tenantData()?.maxActiveProjects || 2) + opt.extra }} \u0645\u0634\u0627\u0631\u064A\u0639</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-base font-black text-white">{{ opt.priceWithVat | number:'1.0-0' }}</div>
                  <div class="text-[10px] text-slate-400">\u062C.\u0645 \u0634\u0627\u0645\u0644 \u0636\u0631\u064A\u0628\u0629</div>
                </div>
              </div>
            }

            <!-- Contact Admin Card (for > 5 projects) -->
            <a href="mailto:admin@structo.app" target="_blank"
              class="block p-4 bg-slate-950 border border-dashed border-amber-500/40 hover:border-amber-400/70 rounded-xl transition-all duration-200 group">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <span class="text-sm font-black text-amber-300">\u0623\u0643\u062B\u0631 \u0645\u0646 5 \u0645\u0634\u0627\u0631\u064A\u0639 / Need More?</span>
                    <p class="text-[10px] text-slate-400 mt-0.5">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0639\u0631\u0636 \u0645\u062E\u0635\u0635</p>
                  </div>
                </div>
                <div class="flex items-center gap-1 text-[10px] text-amber-400 font-bold group-hover:gap-2 transition-all">
                  \u0627\u062A\u0635\u0644 \u0628\u0646\u0627
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            </a>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between p-5 border-t border-slate-800">
            <button type="button" (click)="closeTopUpModal()" class="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors font-cairo cursor-pointer">\u0625\u0644\u063A\u0627\u0621</button>
            <button type="button" id="btn-proceed-topup" (click)="proceedToCheckout('topup')"
              [disabled]="!selectedTopUp()"
              class="px-7 py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-600/40 transition-all flex items-center gap-2 cursor-pointer">
              <!-- Cart / Buy Icon -->
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              \u0634\u0631\u0627\u0621 \u0627\u0644\u062D\u0632\u0645\u0629 / Buy Package
            </button>
          </div>
        </div>
      </div>
    }

    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
    <!-- MODAL 3 \u2014 MOCK CHECKOUT SCREEN                                  -->
    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
    @if (showCheckoutModal()) {
      <div class="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg">
        <div class="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl bg-indigo-600">
                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-black text-white font-cairo">\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A\u0629 / Mock Checkout</h3>
                <p class="text-[10px] text-slate-400 font-cairo">\u0622\u0645\u0646 \u0648\u0645\u0634\u0641\u0631 \u2022 SSL Encrypted</p>
              </div>
            </div>
            @if (!isProcessingPayment()) {
              <button type="button" (click)="closeCheckoutModal()" class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            }
          </div>

          <!-- Checkout Body -->
          <div class="p-5 space-y-5 overflow-y-auto min-h-0">

            <!-- Order Summary -->
            <div class="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">\u0645\u0644\u062E\u0635 \u0627\u0644\u0637\u0644\u0628 / Order Summary</h4>
              <div class="flex justify-between text-xs">
                <span class="text-slate-300">{{ checkoutSummary().description }}</span>
                <span class="text-white font-bold">{{ checkoutSummary().amount | number:'1.0-2' }} \u062C.\u0645</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-slate-400">\u0636\u0631\u064A\u0628\u0629 \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 (0%)</span>
                <span class="text-slate-300">0.00 \u062C.\u0645 (\u0635\u0627\u0641\u064A)</span>
              </div>
              <div class="border-t border-slate-700 pt-2 flex justify-between">
                <span class="text-sm font-black text-white">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</span>
                <span class="text-sm font-black text-indigo-300">{{ checkoutSummary().totalAmount | number:'1.0-2' }} \u062C.\u0645</span>
              </div>
            </div>

            <!-- Mock Card Fields -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0643\u0627\u0631\u062A (\u062A\u062C\u0631\u064A\u0628\u064A) / Card Details (Test Mode)</h4>

              <!-- Card Number -->
              <div>
                <label for="mock-card-num" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">\u0631\u0642\u0645 \u0627\u0644\u0643\u0627\u0631\u062A / Card Number</label>
                <div class="relative">
                  <input id="mock-card-num" type="text" [value]="mockCardNumber" (input)="onMockCardInput($event)"
                    maxlength="19" placeholder="4242 4242 4242 4242"
                    class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-mono tracking-wider pr-10"
                    [disabled]="isProcessingPayment()">
                  <div class="absolute inset-y-0 right-3 flex items-center">
                    <svg class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                    </svg>
                  </div>
                </div>
                <p class="text-[10px] text-indigo-400 mt-1">\u{1F4A1} \u0627\u0633\u062A\u062E\u062F\u0645: 4242 4242 4242 4242</p>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <!-- Expiry -->
                <div>
                  <label for="mock-expiry" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</label>
                  <input id="mock-expiry" type="text" [value]="mockExpiry" (input)="onMockExpiryInput($event)"
                    maxlength="5" placeholder="MM/YY"
                    class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-mono"
                    [disabled]="isProcessingPayment()">
                </div>
                <!-- CVC -->
                <div>
                  <label for="mock-cvc" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">CVC</label>
                  <input id="mock-cvc" type="password" [(ngModel)]="mockCvc" maxlength="4" placeholder="\u2022\u2022\u2022"
                    class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-mono"
                    [disabled]="isProcessingPayment()">
                </div>
              </div>
            </div>

            <!-- Test Mode Badge -->
            <div class="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <svg class="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-[10px] text-amber-300 font-cairo">\u0647\u0630\u0647 \u0628\u0648\u0627\u0628\u0629 \u062F\u0641\u0639 \u062A\u062C\u0631\u064A\u0628\u064A\u0629 \u2014 \u0644\u0646 \u064A\u062A\u0645 \u062E\u0635\u0645 \u0623\u064A \u0645\u0628\u0627\u0644\u063A \u062D\u0642\u064A\u0642\u064A\u0629</span>
            </div>
          </div>

          <!-- Checkout Footer -->
          <div class="p-5 border-t border-slate-800">
            <button type="button" id="btn-process-payment" (click)="processPayment()"
              [disabled]="isProcessingPayment()"
              class="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 text-white font-black text-sm rounded-xl shadow-2xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3 cursor-pointer">
              @if (isProcessingPayment()) {
                <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629... / Processing...</span>
              } @else {
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A / Process Test Payment</span>
              }
            </button>
          </div>
        </div>
      </div>
    }
  `, styles: ['@import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";\n\n/* angular:styles/component:css;3af23bbfdbbc2a03e0d02c12605d8e94d73c38652c44c59b7626a7b52aa6dd3c;E:/private/structo/structo/Structo.Client/src/app/features/dashboard/tenant-profile/tenant-profile.component.ts */\n.font-cairo {\n  font-family:\n    "Cairo",\n    "Inter",\n    sans-serif;\n}\n.leaflet-container {\n  height: 380px !important;\n  min-height: 380px !important;\n  width: 100% !important;\n  background-color: #0f172a !important;\n  z-index: 1 !important;\n}\n.leaflet-tile-container img {\n  width: 256px !important;\n  height: 256px !important;\n}\n@keyframes slide-in-toast {\n  from {\n    opacity: 0;\n    transform: translateY(12px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.animate-slide-in {\n  animation: slide-in-toast 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n/*! tailwindcss v4.3.1 | MIT License | https://tailwindcss.com */\n/*# sourceMappingURL=tenant-profile.component.css.map */\n'] }]
  }], null, { profileMapContainer: [{
    type: ViewChild,
    args: ["profileMapContainer"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TenantProfileComponent, { className: "TenantProfileComponent", filePath: "src/app/features/dashboard/tenant-profile/tenant-profile.component.ts", lineNumber: 876 });
})();

export {
  EGYPT_GOVERNORATES,
  TenantProfileComponent
};
//# sourceMappingURL=chunk-2HNOSWSB.js.map
