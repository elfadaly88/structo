import {
  OfflineSyncService,
  TenantUserService
} from "./chunk-U4LRY55Z.js";
import {
  ProjectService
} from "./chunk-NMKKIC2T.js";
import {
  takeUntilDestroyed
} from "./chunk-W27PLDBB.js";
import {
  ConfirmModalService
} from "./chunk-GUMJX5WL.js";
import {
  WhatsAppLinkService
} from "./chunk-AUDUMTKV.js";
import {
  require_leaflet_src
} from "./chunk-A7Z3MP62.js";
import {
  LanguageService
} from "./chunk-TPAXF35E.js";
import {
  TenantProfileComponent
} from "./chunk-M4LQLFI6.js";
import {
  ImageUploadService
} from "./chunk-N4XWCQTG.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-PRQNVNAF.js";
import {
  TenantProfileService
} from "./chunk-UTWWNGDA.js";
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
  Router
} from "./chunk-YUU7E6C7.js";
import {
  DatePipe,
  DecimalPipe,
  HttpClient
} from "./chunk-2FDFRP6Y.js";
import {
  Component,
  DestroyRef,
  ViewChild,
  __spreadProps,
  __spreadValues,
  __toESM,
  computed,
  inject,
  setClassMetadata,
  signal,
  take,
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
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-EHUV6UVS.js";

// src/app/features/dashboard/projects/projects.component.ts
var L = __toESM(require_leaflet_src());
var _c0 = ["profileMapContainer"];
var _forTrack0 = ($index, $item) => $item.id;
function ProjectsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "PROJECTS.PAGE_TITLE"), " ");
  }
}
function ProjectsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "USERS.TAB_USERS"), " ");
  }
}
function ProjectsComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "PROFILE.TAB_PROFILE"), " ");
  }
}
function ProjectsComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "PROJECTS.PAGE_SUBTITLE"), " ");
  }
}
function ProjectsComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "USERS.MODAL_SUBTITLE"), " ");
  }
}
function ProjectsComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "MARKETPLACE.SECTION_SUBTITLE"), " ");
  }
}
function ProjectsComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openProjectModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 14);
    \u0275\u0275element(2, "path", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 1, "PROJECTS.NEW_PROJECT"), " ");
  }
}
function ProjectsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openUserModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 14);
    \u0275\u0275element(2, "path", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 1, "USERS.NEW_USER"), " ");
  }
}
function ProjectsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "nav", 18)(2, "button", 19);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_14_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateToTab("projects"));
    });
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 19);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_14_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateToTab("users"));
    });
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 19);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_14_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateToTab("profile"));
    });
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("border-indigo-500", ctx_r1.activeTab() === "projects")("text-indigo-400", ctx_r1.activeTab() === "projects")("border-transparent", ctx_r1.activeTab() !== "projects")("text-slate-400", ctx_r1.activeTab() !== "projects")("hover:text-slate-200", ctx_r1.activeTab() !== "projects");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 33, "PROJECTS.PAGE_TITLE"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("border-indigo-500", ctx_r1.activeTab() === "users")("text-indigo-400", ctx_r1.activeTab() === "users")("border-transparent", ctx_r1.activeTab() !== "users")("text-slate-400", ctx_r1.activeTab() !== "users")("hover:text-slate-200", ctx_r1.activeTab() !== "users");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 35, "USERS.TAB_USERS"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("border-indigo-500", ctx_r1.activeTab() === "profile")("text-indigo-400", ctx_r1.activeTab() === "profile")("border-transparent", ctx_r1.activeTab() !== "profile")("text-slate-400", ctx_r1.activeTab() !== "profile")("hover:text-slate-200", ctx_r1.activeTab() !== "profile");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 37, "PROFILE.TAB_PROFILE"), " ");
  }
}
function ProjectsComponent_Conditional_15_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 30)(2, "div", 31);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 32);
    \u0275\u0275element(4, "path", 33);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div")(6, "div", 34)(7, "h4", 35);
    \u0275\u0275text(8, "\u0633\u0639\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 36);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 37);
    \u0275\u0275text(12, " \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u0647\u0644\u0643\u0629: ");
    \u0275\u0275elementStart(13, "strong", 38);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " \u0645\u0646 \u0623\u0635\u0644 ");
    \u0275\u0275elementStart(16, "strong", 39);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " \u0645\u062A\u0627\u062D \u0641\u064A \u0628\u0627\u0642\u062A\u0643 \u0627\u0644\u062D\u0627\u0644\u064A\u0629. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 40)(20, "div", 41)(21, "span", 42);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 43);
    \u0275\u0275element(24, "div", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "button", 45);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_15_Conditional_0_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.isUpgradeModalOpen.set(true));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(26, "svg", 46);
    \u0275\u0275element(27, "path", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29, "+ \u0634\u0631\u0627\u0621 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate2(" ", ctx_r1.usedProjectsCount(), " \u0645\u0646 \u0623\u0635\u0644 ", ctx_r1.allowedProjectsCount(), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.usedProjectsCount());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.allowedProjectsCount());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", ctx_r1.usedProjectsCount(), " / ", ctx_r1.allowedProjectsCount(), " Projects Used ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.usedProjectsCount() / (ctx_r1.allowedProjectsCount() || 1) * 100 > 100 ? 100 : ctx_r1.usedProjectsCount() / (ctx_r1.allowedProjectsCount() || 1) * 100, "%");
  }
}
function ProjectsComponent_Conditional_15_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 48);
    \u0275\u0275element(2, "circle", 49)(3, "path", 50);
    \u0275\u0275elementEnd()();
  }
}
function ProjectsComponent_Conditional_15_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 51);
    \u0275\u0275element(2, "path", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.projectError());
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 56);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "PROJECTS.TABLE_BUDGET"));
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1, "\u{1F512}");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275text(1, "Public");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 70);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const proj_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(2, 2, proj_r7.budget, "1.0-0"), " ", \u0275\u0275pipeBind1(3, 5, "COMMON.CURRENCY"), " ");
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "PROJECTS.STATUS.ACTIVE"), " ");
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "PROJECTS.STATUS.DELAYED"), " ");
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 74);
    \u0275\u0275text(1, " \u0642\u064A\u062F \u0627\u0644\u062A\u0641\u0639\u064A\u0644 / Pending ");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.langService.currentLang() === "ar" ? "\u0645\u062C\u0645\u0651\u062F" : "Frozen", " ");
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.langService.currentLang() === "ar" ? "\u0645\u063A\u0644\u0642" : "Closed", " ");
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "PROJECTS.STATUS.COMPLETED"), " ");
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275textInterpolate1(" \u{1F3E0} ", ctx_r1.langService.currentLang() === "ar" ? "\u0633\u0643\u0646\u064A" : "Residential", " ");
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275textInterpolate1(" \u{1F3E2} ", ctx_r1.langService.currentLang() === "ar" ? "\u0625\u062F\u0627\u0631\u064A" : "Administrative", " ");
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 63);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_15_Conditional_22_For_23_Template_tr_click_0_listener() {
      const proj_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.viewDetails(proj_r7.id));
    });
    \u0275\u0275elementStart(1, "td", 64)(2, "div", 34)(3, "div", 65);
    \u0275\u0275conditionalCreate(4, ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_4_Template, 2, 0, "span", 66);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_6_Template, 2, 0, "span", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 68);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 69);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_12_Template, 4, 7, "td", 70);
    \u0275\u0275elementStart(13, "td", 71);
    \u0275\u0275conditionalCreate(14, ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_14_Template, 3, 3, "span", 72)(15, ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_15_Template, 3, 3, "span", 73)(16, ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_16_Template, 2, 0, "span", 74)(17, ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_17_Template, 2, 1, "span", 73)(18, ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_18_Template, 2, 1, "span", 75)(19, ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_19_Template, 3, 3, "span", 75);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td", 76);
    \u0275\u0275conditionalCreate(21, ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_21_Template, 1, 1)(22, ProjectsComponent_Conditional_15_Conditional_22_For_23_Conditional_22_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td", 77);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const proj_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("opacity-60", proj_r7.status === "PendingActivation");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(proj_r7.status === "PendingActivation" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", proj_r7.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(proj_r7.isPublicPortfolio ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", proj_r7.description || \u0275\u0275pipeBind1(9, 11, "PROJECTS.NO_DESCRIPTION"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(proj_r7.client);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isEngineer() ? 12 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(proj_r7.status === "Active" ? 14 : proj_r7.status === "Delayed" ? 15 : proj_r7.status === "PendingActivation" ? 16 : proj_r7.status === "FinancialFreeze" ? 17 : proj_r7.status === "Closed" ? 18 : 19);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(proj_r7.propertyType === "Residential" ? 21 : 22);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(25, 13, proj_r7.startDate, "dd/MM/yyyy"));
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_ForEmpty_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 78);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 79);
    \u0275\u0275element(3, "path", 80);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p", 81);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 82);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 2, "PROJECTS.NO_PROJECTS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 4, "PROJECTS.CREATE_FIRST"));
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1, "\u{1F512}");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 86);
    \u0275\u0275text(1, "Active");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 87);
    \u0275\u0275text(1, "Pending");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 87);
    \u0275\u0275text(1, "Frozen");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 88);
    \u0275\u0275text(1, "Closed");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 88);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const proj_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(proj_r9.status);
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 90);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const proj_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(2, 2, proj_r9.budget, "1.0-0"), " ", \u0275\u0275pipeBind1(3, 5, "COMMON.CURRENCY"));
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_For_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 83);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_15_Conditional_22_For_27_Template_div_click_0_listener() {
      const proj_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.viewDetails(proj_r9.id));
    });
    \u0275\u0275elementStart(1, "div", 84)(2, "div", 85);
    \u0275\u0275conditionalCreate(3, ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_3_Template, 2, 0, "span", 66);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_5_Template, 2, 0, "span", 86)(6, ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_6_Template, 2, 0, "span", 87)(7, ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_7_Template, 2, 0, "span", 87)(8, ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_8_Template, 2, 0, "span", 88)(9, ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_9_Template, 2, 1, "span", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 89)(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, ProjectsComponent_Conditional_15_Conditional_22_For_27_Conditional_13_Template, 4, 7, "span", 90);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 91)(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 92);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const proj_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("opacity-60", proj_r9.status === "PendingActivation");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(proj_r9.status === "PendingActivation" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", proj_r9.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(proj_r9.status === "Active" ? 5 : proj_r9.status === "PendingActivation" ? 6 : proj_r9.status === "FinancialFreeze" ? 7 : proj_r9.status === "Closed" ? 8 : 9);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("\u{1F464} ", proj_r9.client);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isEngineer() ? 13 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(proj_r9.propertyType === "Residential" ? "\u{1F3E0} Residential" : "\u{1F3E2} Administrative");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4C5} ", \u0275\u0275pipeBind2(19, 9, proj_r9.startDate, "dd/MM/yyyy"));
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_ForEmpty_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "PROJECTS.NO_PROJECTS"), " ");
  }
}
function ProjectsComponent_Conditional_15_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 53)(2, "table", 54)(3, "thead")(4, "tr", 55)(5, "th", 56);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 56);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, ProjectsComponent_Conditional_15_Conditional_22_Conditional_11_Template, 3, 3, "th", 56);
    \u0275\u0275elementStart(12, "th", 57);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 57);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 56);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "tbody", 58);
    \u0275\u0275repeaterCreate(22, ProjectsComponent_Conditional_15_Conditional_22_For_23_Template, 26, 16, "tr", 59, _forTrack0, false, ProjectsComponent_Conditional_15_Conditional_22_ForEmpty_24_Template, 10, 6, "tr");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 60);
    \u0275\u0275repeaterCreate(26, ProjectsComponent_Conditional_15_Conditional_22_For_27_Template, 20, 12, "div", 61, _forTrack0, false, ProjectsComponent_Conditional_15_Conditional_22_ForEmpty_28_Template, 3, 3, "div", 62);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 8, "PROJECTS.TABLE_NAME"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 10, "PROJECTS.TABLE_CLIENT"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.isEngineer() ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 12, "PROJECTS.TABLE_STATUS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 14, "PROJECTS.FIELD_CATEGORY"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 16, "PROJECTS.TABLE_START_DATE"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.projects());
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.projects());
  }
}
function ProjectsComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProjectsComponent_Conditional_15_Conditional_0_Template, 30, 8, "div", 20);
    \u0275\u0275elementStart(1, "div", 21)(2, "div", 22)(3, "span", 23);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3", 24);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 22)(9, "span", 23);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "h3", 25);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 22)(15, "span", 23);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "h3", 26);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(20, ProjectsComponent_Conditional_15_Conditional_20_Template, 4, 0, "div", 27);
    \u0275\u0275conditionalCreate(21, ProjectsComponent_Conditional_15_Conditional_21_Template, 5, 1, "div", 28);
    \u0275\u0275conditionalCreate(22, ProjectsComponent_Conditional_15_Conditional_22_Template, 29, 18, "div", 29);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.currentUserRole() === "TenantOwner" || ctx_r1.currentUserRole() === "Manager" ? 0 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 10, "PROJECTS.STAT_TOTAL"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.projects().length);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 12, "PROJECTS.STAT_ACTIVE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.activeProjectsCount());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 14, "PROJECTS.STAT_COMPLETED"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.completedProjectsCount());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isLoadingProjects() ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.projectError() ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isLoadingProjects() ? 22 : -1);
  }
}
function ProjectsComponent_Conditional_16_Conditional_19_For_28_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 102);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "USERS.CURRENT_USER"), " ");
  }
}
function ProjectsComponent_Conditional_16_Conditional_19_For_28_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 104);
    \u0275\u0275element(1, "circle", 110)(2, "path", 111);
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_16_Conditional_19_For_28_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 105);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "USERS.CURRENT_USER"), " ");
  }
}
function ProjectsComponent_Conditional_16_Conditional_19_For_28_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 112);
    \u0275\u0275elementStart(1, "span", 105);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const usr_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("bg-emerald-400", usr_r11.isActive)("bg-rose-400", !usr_r11.isActive);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", usr_r11.isActive ? \u0275\u0275pipeBind1(3, 5, "USERS.ACTION_SUSPEND") : \u0275\u0275pipeBind1(4, 7, "USERS.ACTION_ACTIVATE"), " ");
  }
}
function ProjectsComponent_Conditional_16_Conditional_19_For_28_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 113);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_16_Conditional_19_For_28_Conditional_32_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const usr_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openWhatsAppForUser(usr_r11));
    });
    \u0275\u0275text(1, " \u0625\u0631\u0633\u0627\u0644 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628 ");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_16_Conditional_19_For_28_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_16_Conditional_19_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 96)(1, "td", 64)(2, "div", 97)(3, "div", 98)(4, "div", 99);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 100);
    \u0275\u0275element(7, "span", 101);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, ProjectsComponent_Conditional_16_Conditional_19_For_28_Conditional_11_Template, 3, 3, "span", 102);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 103);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_16_Conditional_19_For_28_Template_button_click_12_listener() {
      const usr_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleUserStatus(usr_r11));
    });
    \u0275\u0275conditionalCreate(13, ProjectsComponent_Conditional_16_Conditional_19_For_28_Conditional_13_Template, 3, 0, ":svg:svg", 104)(14, ProjectsComponent_Conditional_16_Conditional_19_For_28_Conditional_14_Template, 3, 3, "span", 105)(15, ProjectsComponent_Conditional_16_Conditional_19_For_28_Conditional_15_Template, 5, 9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "td", 106);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 77);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td", 77);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 77);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "td", 71)(25, "span", 107);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "td", 77);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "td", 71);
    \u0275\u0275conditionalCreate(32, ProjectsComponent_Conditional_16_Conditional_19_For_28_Conditional_32_Template, 2, 0, "button", 108)(33, ProjectsComponent_Conditional_16_Conditional_19_For_28_Conditional_33_Template, 2, 0, "span", 109);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const usr_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(usr_r11.firstName);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-emerald-400", usr_r11.isActive)("text-rose-400", !usr_r11.isActive);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-emerald-400", usr_r11.isActive)("bg-rose-400", !usr_r11.isActive);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", usr_r11.isActive ? \u0275\u0275pipeBind1(9, 64, "USERS.STATUS_ACTIVE") : \u0275\u0275pipeBind1(10, 66, "USERS.STATUS_SUSPENDED"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(usr_r11.id === ctx_r1.currentUserId() ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("border-emerald-500/30", usr_r11.isActive)("bg-emerald-500/10", usr_r11.isActive)("text-emerald-400", usr_r11.isActive)("hover:bg-emerald-500/20", usr_r11.isActive)("border-rose-500/30", !usr_r11.isActive)("bg-rose-500/10", !usr_r11.isActive)("text-rose-400", !usr_r11.isActive)("hover:bg-rose-500/20", !usr_r11.isActive)("shadow-[0_0_18px_rgba(16,185,129,0", usr_r11.isActive)("shadow-[0_0_18px_rgba(244,63,94,0", !usr_r11.isActive);
    \u0275\u0275property("disabled", ctx_r1.isUserToggleLoading(usr_r11.id) || usr_r11.id === ctx_r1.currentUserId());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isUserToggleLoading(usr_r11.id) ? 13 : usr_r11.id === ctx_r1.currentUserId() ? 14 : 15);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(usr_r11.lastName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(usr_r11.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(usr_r11.personalPhone || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(usr_r11.whatsAppPhone || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-indigo-500/10", usr_r11.role === "Manager")("text-indigo-400", usr_r11.role === "Manager")("border", usr_r11.role === "Manager")("border-indigo-500/20", usr_r11.role === "Manager")("bg-emerald-500/10", usr_r11.role === "SiteEngineer" || usr_r11.role === "DesignEngineer")("text-emerald-400", usr_r11.role === "SiteEngineer" || usr_r11.role === "DesignEngineer")("border-emerald-500/20", usr_r11.role === "SiteEngineer" || usr_r11.role === "DesignEngineer")("border", usr_r11.role === "SiteEngineer" || usr_r11.role === "DesignEngineer")("bg-purple-500/10", usr_r11.role === "Accountant")("text-purple-400", usr_r11.role === "Accountant")("border-purple-500/20", usr_r11.role === "Accountant")("border", usr_r11.role === "Accountant");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(27, 68, "USERS.ROLES." + usr_r11.role), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(30, 70, usr_r11.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(usr_r11.whatsAppPhone ? 32 : 33);
  }
}
function ProjectsComponent_Conditional_16_Conditional_19_ForEmpty_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 114)(2, "p", 81);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 82);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 2, "USERS.NO_USERS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 4, "USERS.CREATE_FIRST"));
  }
}
function ProjectsComponent_Conditional_16_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 93)(2, "table", 94)(3, "thead")(4, "tr", 95)(5, "th", 56);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 56);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 56);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 56);
    \u0275\u0275text(15, "Contact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 56);
    \u0275\u0275text(17, "WhatsApp");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 57);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th", 56);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th", 57);
    \u0275\u0275text(25, "Action");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "tbody", 58);
    \u0275\u0275repeaterCreate(27, ProjectsComponent_Conditional_16_Conditional_19_For_28_Template, 34, 73, "tr", 96, _forTrack0, false, ProjectsComponent_Conditional_16_Conditional_19_ForEmpty_29_Template, 8, 6, "tr");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 6, "USERS.TABLE_FIRST_NAME"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 8, "USERS.TABLE_LAST_NAME"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 10, "USERS.TABLE_EMAIL"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 12, "USERS.TABLE_ROLE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 14, "USERS.TABLE_CREATED_AT"));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.users());
  }
}
function ProjectsComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22)(2, "span", 23);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3", 24);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 22)(8, "span", 23);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "h3", 25);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 22)(14, "span", 23);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "h3", 26);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(19, ProjectsComponent_Conditional_16_Conditional_19_Template, 30, 16, "div", 29);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 7, "USERS.STAT_TOTAL"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.users().length);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 9, "USERS.STAT_MANAGERS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.managerCount());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 11, "USERS.STAT_ENGINEERS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.engineerCount());
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isLoadingUsers() ? 19 : -1);
  }
}
function ProjectsComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-tenant-profile");
  }
}
function ProjectsComponent_Conditional_18_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 116);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_18_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openProjectModal());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2795 ", \u0275\u0275pipeBind1(2, 1, "PROJECTS.NEW_PROJECT"), " ");
  }
}
function ProjectsComponent_Conditional_18_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 116);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_18_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openUserModal());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2795 ", \u0275\u0275pipeBind1(2, 1, "USERS.NEW_USER"), " ");
  }
}
function ProjectsComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275conditionalCreate(1, ProjectsComponent_Conditional_18_Conditional_1_Template, 3, 3, "button", 115)(2, ProjectsComponent_Conditional_18_Conditional_2_Template, 3, 3, "button", 115);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeTab() === "projects" ? 1 : ctx_r1.activeTab() === "users" ? 2 : -1);
  }
}
function ProjectsComponent_Conditional_19_Conditional_35_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2022 ", err_r16);
  }
}
function ProjectsComponent_Conditional_19_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 130)(1, "span", 139);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, ProjectsComponent_Conditional_19_Conditional_35_For_5_Template, 2, 1, "div", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, "PROJECTS.VALIDATION_TITLE"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.projectValidationErrors());
  }
}
function ProjectsComponent_Conditional_19_Conditional_36_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 143);
    \u0275\u0275text(1, "\u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u0637\u0644\u0648\u0628 / Project Name is required.");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_19_Conditional_36_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 143);
    \u0275\u0275text(1, "\u0627\u0633\u0645 \u0627\u0644\u0639\u0645\u064A\u0644 \u0645\u0637\u0644\u0648\u0628 / Client Name is required.");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_19_Conditional_36_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 143);
    \u0275\u0275text(1, "\u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0645\u0637\u0644\u0648\u0628\u0629 \u0628\u0631\u0642\u0645 \u0635\u062D\u064A\u062D / Budget is required.");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_19_Conditional_36_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 143);
    \u0275\u0275text(1, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621 \u0645\u0637\u0644\u0648\u0628 / Start Date is required.");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_19_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 131)(1, "div")(2, "label", 140);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementStart(5, "span", 141);
    \u0275\u0275text(6, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(7, "input", 142);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(8, ProjectsComponent_Conditional_19_Conditional_36_Conditional_8_Template, 2, 0, "p", 143);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 144)(10, "div")(11, "label", 145);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementStart(14, "span", 141);
    \u0275\u0275text(15, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(16, "input", 146);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(17, ProjectsComponent_Conditional_19_Conditional_36_Conditional_17_Template, 2, 0, "p", 143);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div")(19, "label", 147);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "translate");
    \u0275\u0275elementStart(22, "span", 141);
    \u0275\u0275text(23, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(24, "input", 148);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(25, ProjectsComponent_Conditional_19_Conditional_36_Conditional_25_Template, 2, 0, "p", 143);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 144)(27, "div")(28, "label", 149);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "translate");
    \u0275\u0275elementStart(31, "span", 141);
    \u0275\u0275text(32, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(33, "input", 150);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(34, ProjectsComponent_Conditional_19_Conditional_36_Conditional_34_Template, 2, 0, "p", 143);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div")(36, "label", 151);
    \u0275\u0275text(37);
    \u0275\u0275pipe(38, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(39, "input", 152);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 9, "PROJECTS.FIELD_NAME"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isProjectFieldInvalid("name") ? 8 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 11, "PROJECTS.TABLE_CLIENT"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isProjectFieldInvalid("client") ? 17 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(21, 13, "PROJECTS.TABLE_BUDGET"), " (EGP) ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isProjectFieldInvalid("budget") ? 25 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(30, 15, "PROJECTS.FIELD_START"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isProjectFieldInvalid("startDate") ? 34 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(38, 17, "PROJECTS.FIELD_END"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275control();
  }
}
function ProjectsComponent_Conditional_19_Conditional_37_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 143);
    \u0275\u0275text(1, "\u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 \u0645\u0637\u0644\u0648\u0628\u0629 / Governorate is required.");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_19_Conditional_37_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 143);
    \u0275\u0275text(1, "\u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0645\u0637\u0644\u0648\u0628\u0629 / Zone is required.");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_19_Conditional_37_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 143);
    \u0275\u0275text(1, "\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0645\u0637\u0644\u0648\u0628 / Address is required.");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_19_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 131)(1, "div", 144)(2, "div")(3, "label", 153);
    \u0275\u0275text(4, " \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 / Governorate ");
    \u0275\u0275elementStart(5, "span", 141);
    \u0275\u0275text(6, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "select", 154)(8, "option", 155);
    \u0275\u0275text(9, "-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 --");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "option", 156);
    \u0275\u0275text(11, "Cairo / \u0627\u0644\u0642\u0627\u0647\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "option", 157);
    \u0275\u0275text(13, "Giza / \u0627\u0644\u062C\u064A\u0632\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 158);
    \u0275\u0275text(15, "Alexandria / \u0627\u0644\u0625\u0633\u0643\u0646\u062F\u0631\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 159);
    \u0275\u0275text(17, "Qalyubia / \u0627\u0644\u0642\u0644\u064A\u0648\u0628\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 160);
    \u0275\u0275text(19, "Gharbia / \u0627\u0644\u063A\u0631\u0628\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 161);
    \u0275\u0275text(21, "Dakahlia / \u0627\u0644\u062F\u0642\u0647\u0644\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 162);
    \u0275\u0275text(23, "Sharqia / \u0627\u0644\u0634\u0631\u0642\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 163);
    \u0275\u0275text(25, "Monufia / \u0627\u0644\u0645\u0646\u0648\u0641\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 164);
    \u0275\u0275text(27, "Beheira / \u0627\u0644\u0628\u062D\u064A\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 165);
    \u0275\u0275text(29, "Kafr El Sheikh / \u0643\u0641\u0631 \u0627\u0644\u0634\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 166);
    \u0275\u0275text(31, "Damietta / \u062F\u0645\u064A\u0627\u0637");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "option", 167);
    \u0275\u0275text(33, "Port Said / \u0628\u0648\u0631\u0633\u0639\u064A\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "option", 168);
    \u0275\u0275text(35, "Ismailia / \u0627\u0644\u0625\u0633\u0645\u0627\u0639\u064A\u0644\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "option", 169);
    \u0275\u0275text(37, "Suez / \u0627\u0644\u0633\u0648\u064A\u0633");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "option", 170);
    \u0275\u0275text(39, "Aswan / \u0623\u0633\u0648\u0627\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "option", 171);
    \u0275\u0275text(41, "Luxor / \u0627\u0644\u0623\u0642\u0635\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "option", 172);
    \u0275\u0275text(43, "Red Sea / \u0627\u0644\u0628\u062D\u0631 \u0627\u0644\u0623\u062D\u0645\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "option", 173);
    \u0275\u0275text(45, "Matrouh / \u0645\u0637\u0631\u0648\u062D");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(46, ProjectsComponent_Conditional_19_Conditional_37_Conditional_46_Template, 2, 0, "p", 143);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div")(48, "label", 174);
    \u0275\u0275text(49, " \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0623\u0648 \u0627\u0644\u0645\u0646\u0637\u0642\u0629 / City or Zone ");
    \u0275\u0275elementStart(50, "span", 141);
    \u0275\u0275text(51, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(52, "input", 175);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(53, ProjectsComponent_Conditional_19_Conditional_37_Conditional_53_Template, 2, 0, "p", 143);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div")(55, "label", 176);
    \u0275\u0275text(56, " \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A / Physical Site Address ");
    \u0275\u0275elementStart(57, "span", 141);
    \u0275\u0275text(58, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(59, "input", 177);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(60, ProjectsComponent_Conditional_19_Conditional_37_Conditional_60_Template, 2, 0, "p", 143);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "div")(62, "label", 178);
    \u0275\u0275text(63, " \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 / Project Classification ");
    \u0275\u0275elementStart(64, "span", 141);
    \u0275\u0275text(65, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "select", 179)(67, "option", 180);
    \u0275\u0275text(68, "Residential / \u0633\u0643\u0646\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "option", 181);
    \u0275\u0275text(70, "Commercial / \u062A\u062C\u0627\u0631\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "option", 182);
    \u0275\u0275text(72, "Administrative / \u0625\u062F\u0627\u0631\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "option", 183);
    \u0275\u0275text(74, "Industrial / \u0635\u0646\u0627\u0639\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "option", 184);
    \u0275\u0275text(76, "Other / \u0623\u062E\u0631\u0649");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275control();
    \u0275\u0275advance(39);
    \u0275\u0275conditional(ctx_r1.isProjectFieldInvalid("governorate") ? 46 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isProjectFieldInvalid("cityOrZone") ? 53 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isProjectFieldInvalid("siteAddress") ? 60 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275control();
  }
}
function ProjectsComponent_Conditional_19_Conditional_38_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 143);
    \u0275\u0275text(1, "\u0631\u0642\u0645 \u0648\u0627\u062A\u0633\u0627\u0628 \u0627\u0644\u0639\u0645\u064A\u0644 \u0645\u0637\u0644\u0648\u0628 \u0628\u0635\u064A\u063A\u0629 \u0635\u062D\u064A\u062D\u0629 / Invalid WhatsApp number.");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_19_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 131)(1, "div", 144)(2, "div")(3, "label", 185);
    \u0275\u0275text(4, " \u0631\u0642\u0645 \u0648\u0627\u062A\u0633\u0627\u0628 \u0627\u0644\u0639\u0645\u064A\u0644 / Client WhatsApp ");
    \u0275\u0275elementStart(5, "span", 141);
    \u0275\u0275text(6, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(7, "input", 186);
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(8, ProjectsComponent_Conditional_19_Conditional_38_Conditional_8_Template, 2, 0, "p", 143);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div")(10, "label", 187);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementStart(13, "span", 141);
    \u0275\u0275text(14, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "select", 188)(16, "option", 189);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 190);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 191);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 192);
    \u0275\u0275element(26, "input", 193);
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(27, "label", 194);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div")(31, "label", 195);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(34, "textarea", 196);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isProjectFieldInvalid("clientWhatsApp") ? 8 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(12, 7, "PROJECTS.TABLE_STATUS"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 9, "PROJECTS.STATUS.ACTIVE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(21, 11, "PROJECTS.STATUS.DELAYED"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(24, 13, "PROJECTS.STATUS.COMPLETED"));
    \u0275\u0275advance(3);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(29, 15, "PROJECTS.FIELD_PUBLIC"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(33, 17, "PROJECTS.FIELD_DESC"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275control();
  }
}
function ProjectsComponent_Conditional_19_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 197);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_19_Conditional_41_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.prevProjectTab());
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\u2190");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.langService.currentLang() === "ar" ? "\u0627\u0644\u0633\u0627\u0628\u0642" : "Back");
  }
}
function ProjectsComponent_Conditional_19_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 198);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_19_Conditional_42_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nextProjectTab());
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.langService.currentLang() === "ar" ? "\u0627\u0644\u062A\u0627\u0644\u064A" : "Next");
  }
}
function ProjectsComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "div", 117);
    \u0275\u0275elementStart(2, "div", 118)(3, "div", 119)(4, "div")(5, "h3", 120)(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 121);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 122);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 123);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_19_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeProjectModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 124);
    \u0275\u0275element(16, "path", 125);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(17, "div", 126)(18, "button", 127);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_19_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setProjectTab(1));
    });
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "\u{1F4CB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "button", 127);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_19_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setProjectTab(2));
    });
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25, "\u{1F4CD}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27, "\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0641");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "button", 127);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_19_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setProjectTab(3));
    });
    \u0275\u0275elementStart(29, "span");
    \u0275\u0275text(30, "\u{1F4F2}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span");
    \u0275\u0275text(32, "\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0648\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "form", 128);
    \u0275\u0275listener("ngSubmit", function ProjectsComponent_Conditional_19_Template_form_ngSubmit_33_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onProjectSubmit());
    });
    \u0275\u0275elementStart(34, "div", 129);
    \u0275\u0275conditionalCreate(35, ProjectsComponent_Conditional_19_Conditional_35_Template, 6, 3, "div", 130);
    \u0275\u0275conditionalCreate(36, ProjectsComponent_Conditional_19_Conditional_36_Template, 40, 19, "div", 131);
    \u0275\u0275conditionalCreate(37, ProjectsComponent_Conditional_19_Conditional_37_Template, 77, 3, "div", 131);
    \u0275\u0275conditionalCreate(38, ProjectsComponent_Conditional_19_Conditional_38_Template, 35, 19, "div", 131);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 132)(40, "div", 133);
    \u0275\u0275conditionalCreate(41, ProjectsComponent_Conditional_19_Conditional_41_Template, 5, 1, "button", 134);
    \u0275\u0275conditionalCreate(42, ProjectsComponent_Conditional_19_Conditional_42_Template, 5, 1, "button", 135);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 136)(44, "button", 137);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_19_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeProjectModal());
    });
    \u0275\u0275text(45);
    \u0275\u0275pipe(46, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "button", 138)(48, "span");
    \u0275\u0275text(49, "\u{1F4BE}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span");
    \u0275\u0275text(51);
    \u0275\u0275pipe(52, "translate");
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 43, "PROJECTS.MODAL_TITLE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u0627\u0644\u062E\u0637\u0648\u0629 ", ctx_r1.activeProjectTab(), " \u0645\u0646 3 ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 45, "PROJECTS.MODAL_SUBTITLE"));
    \u0275\u0275advance(6);
    \u0275\u0275classProp("border-indigo-500", ctx_r1.activeProjectTab() === 1)("text-indigo-400", ctx_r1.activeProjectTab() === 1)("border-transparent", ctx_r1.activeProjectTab() !== 1)("text-slate-400", ctx_r1.activeProjectTab() !== 1)("hover:text-slate-200", ctx_r1.activeProjectTab() !== 1);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("border-indigo-500", ctx_r1.activeProjectTab() === 2)("text-indigo-400", ctx_r1.activeProjectTab() === 2)("border-transparent", ctx_r1.activeProjectTab() !== 2)("text-slate-400", ctx_r1.activeProjectTab() !== 2)("hover:text-slate-200", ctx_r1.activeProjectTab() !== 2);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("border-indigo-500", ctx_r1.activeProjectTab() === 3)("text-indigo-400", ctx_r1.activeProjectTab() === 3)("border-transparent", ctx_r1.activeProjectTab() !== 3)("text-slate-400", ctx_r1.activeProjectTab() !== 3)("hover:text-slate-200", ctx_r1.activeProjectTab() !== 3);
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx_r1.projectForm);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.projectValidationErrors().length > 0 ? 35 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeProjectTab() === 1 ? 36 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeProjectTab() === 2 ? 37 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeProjectTab() === 3 ? 38 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.activeProjectTab() > 1 ? 41 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeProjectTab() < 3 ? 42 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(46, 47, "COMMON.CANCEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.projectForm.invalid || ctx_r1.isSavingProject());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(52, 49, "PROJECTS.BTN_CREATE"));
  }
}
function ProjectsComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 199);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_20_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isUpgradeModalOpen.set(false));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 200)(3, "div", 201)(4, "div", 202)(5, "div", 203);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 204);
    \u0275\u0275element(7, "path", 205);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div")(9, "h3", 206);
    \u0275\u0275text(10, "\u0634\u0631\u0627\u0621 \u0633\u0639\u0629 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 / Buy Project Quota");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 207);
    \u0275\u0275text(12, "\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0628\u0627\u0644\u062C\u0646\u064A\u0647 \u0627\u0644\u0645\u0635\u0631\u064A / All prices in EGP");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "button", 208);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_20_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isUpgradeModalOpen.set(false));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 124);
    \u0275\u0275element(15, "path", 125);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "div", 209)(17, "div", 210)(18, "div", 211)(19, "div")(20, "div", 212)(21, "span", 213);
    \u0275\u0275text(22, "+1 \u0645\u0634\u0631\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 214);
    \u0275\u0275text(24, "250 EGP");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 215);
    \u0275\u0275text(26, " \u{1F4E6} ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "h4", 216);
    \u0275\u0275text(28, "\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0631\u0648\u0639 \u0648\u0627\u062D\u062F (+1 Project)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "p", 217);
    \u0275\u0275text(30, "\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0631\u0648\u0639 \u0648\u0627\u062D\u062F \u0625\u0636\u0627\u0641\u064A \u0644\u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u062D\u0627\u0644\u064A (Adds +1 project to your active quota)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 218)(32, "button", 219);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_20_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCheckout({ extraProjectsCount: 1, titleAr: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0631\u0648\u0639 \u0648\u0627\u062D\u062F (+1 Project)", titleEn: "+1 Extra Project", priceEgp: 250, badge: "\u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A" }));
    });
    \u0275\u0275elementStart(33, "span");
    \u0275\u0275text(34, "\u0634\u0631\u0627\u0621 \u0645\u0634\u0631\u0648\u0639 (+1 Project) \u{1F4B3}");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(35, "div", 220)(36, "div", 221);
    \u0275\u0275text(37, " \u2B50\uFE0F \u0627\u0644\u0623\u0641\u0636\u0644 \u062A\u0648\u0641\u064A\u0631\u0627\u064B / Best Value ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 222)(39, "div", 212)(40, "span", 223);
    \u0275\u0275text(41, "\u062D\u0632\u0645\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 224)(43, "span", 225);
    \u0275\u0275text(44, "950 EGP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span", 226);
    \u0275\u0275text(46, "1,250 EGP");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div", 227);
    \u0275\u0275text(48, " \u{1F680} ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "h4", 216);
    \u0275\u0275text(50, "\u062D\u0632\u0645\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 (+5 Projects Package)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "p", 228);
    \u0275\u0275text(52, "\u0625\u0636\u0627\u0641\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 \u0644\u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u062D\u0627\u0644\u064A (Adds +5 projects to your active quota)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 229)(54, "button", 230);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_20_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCheckout({ extraProjectsCount: 5, titleAr: "\u062D\u0632\u0645\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 (+5 Projects Package)", titleEn: "+5 Projects Package", priceEgp: 950, badge: "\u2B50\uFE0F \u0627\u0644\u0623\u0641\u0636\u0644 \u062A\u0648\u0641\u064A\u0631\u0627\u064B" }));
    });
    \u0275\u0275elementStart(55, "span");
    \u0275\u0275text(56, "\u0634\u0631\u0627\u0621 5 \u0645\u0634\u0627\u0631\u064A\u0639 (+5 Projects) \u{1F6D2}");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(57, "div", 231)(58, "button", 232);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_20_Template_button_click_58_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isUpgradeModalOpen.set(false));
    });
    \u0275\u0275text(59);
    \u0275\u0275pipe(60, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(59);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(60, 1, "COMMON.CANCEL"), " ");
  }
}
function ProjectsComponent_Conditional_21_Conditional_3_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "label", 258);
    \u0275\u0275text(2, "\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0628\u0637\u0627\u0642\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 259);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "label", 258);
    \u0275\u0275text(6, "\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 260);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 261)(9, "div")(10, "label", 258);
    \u0275\u0275text(11, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 262);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "label", 258);
    \u0275\u0275text(15, "\u0631\u0645\u0632 \u0627\u0644\u0623\u0645\u0627\u0646 CVV");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 263);
    \u0275\u0275elementEnd()();
  }
}
function ProjectsComponent_Conditional_21_Conditional_3_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "label", 258);
    \u0275\u0275text(2, "\u0631\u0642\u0645 \u0627\u0644\u0645\u062D\u0641\u0638\u0629 / \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 264);
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_21_Conditional_3_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 265);
    \u0275\u0275element(1, "circle", 49)(2, "path", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u062F\u0641\u0639...");
    \u0275\u0275elementEnd();
  }
}
function ProjectsComponent_Conditional_21_Conditional_3_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u0622\u0646 (", \u0275\u0275pipeBind1(2, 1, ctx_r1.selectedCheckoutPackage()?.totalAmount), " EGP)");
  }
}
function ProjectsComponent_Conditional_21_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 235)(1, "div", 202)(2, "div", 236);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 204);
    \u0275\u0275element(4, "path", 237);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div")(6, "h3", 238);
    \u0275\u0275text(7, "\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0634\u0631\u0627\u0621 \u0648\u0627\u0644\u062A\u0641\u0639\u064A\u0644 / Checkout");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 207);
    \u0275\u0275text(9, "\u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A \u0644\u0645\u0634\u0627\u0631\u064A\u0639\u0643 \u0639\u0628\u0631 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062F\u0641\u0639");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "button", 239);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_21_Conditional_3_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeCheckoutModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 124);
    \u0275\u0275element(12, "path", 125);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "div", 240)(14, "div", 241)(15, "div", 242)(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 243);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 244)(22, "span");
    \u0275\u0275text(23, "\u0627\u0644\u0631\u0633\u0648\u0645 \u0648\u0627\u0644\u0645\u0635\u0627\u0631\u064A\u0641 / Fees");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 245);
    \u0275\u0275text(25, "0 EGP");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 246)(27, "span");
    \u0275\u0275text(28, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0643\u0644\u064A / Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 247);
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div")(33, "label", 248);
    \u0275\u0275text(34, "\u0627\u062E\u062A\u0631 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639 / Payment Method");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 249)(36, "button", 250);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_21_Conditional_3_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectedPaymentMethod.set("CreditCard"));
    });
    \u0275\u0275elementStart(37, "span", 251);
    \u0275\u0275text(38, "\u{1F4B3}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 252);
    \u0275\u0275text(40, "\u0628\u0637\u0627\u0642\u0629 \u0628\u0646\u0643\u064A\u0629");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "button", 250);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_21_Conditional_3_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectedPaymentMethod.set("VodafoneCash"));
    });
    \u0275\u0275elementStart(42, "span", 251);
    \u0275\u0275text(43, "\u{1F4F1}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 252);
    \u0275\u0275text(45, "\u0645\u062D\u0641\u0638\u0629 \u0643\u0627\u0634");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "button", 250);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_21_Conditional_3_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectedPaymentMethod.set("InstaPay"));
    });
    \u0275\u0275elementStart(47, "span", 251);
    \u0275\u0275text(48, "\u26A1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "span", 252);
    \u0275\u0275text(50, "\u0625\u0646\u0633\u062A\u0627\u0628\u0627\u064A");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(51, "div", 253);
    \u0275\u0275conditionalCreate(52, ProjectsComponent_Conditional_21_Conditional_3_Conditional_52_Template, 17, 0)(53, ProjectsComponent_Conditional_21_Conditional_3_Conditional_53_Template, 4, 0, "div");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 254)(55, "span");
    \u0275\u0275text(56, "\u{1F512}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "span");
    \u0275\u0275text(58, "\u0639\u0645\u0644\u064A\u0629 \u062F\u0641\u0639 \u0622\u0645\u0646\u0629 \u0645\u0634\u0641\u0631\u0629 \u2014 \u0633\u064A\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0632\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0641\u064A \u062D\u0633\u0627\u0628\u0643 \u0641\u0648\u0631\u0627\u064B.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "div", 255)(60, "button", 256);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_21_Conditional_3_Template_button_click_60_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeCheckoutModal());
    });
    \u0275\u0275text(61, " \u0625\u0644\u063A\u0627\u0621 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "button", 257);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_21_Conditional_3_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitUpgradePayment());
    });
    \u0275\u0275conditionalCreate(63, ProjectsComponent_Conditional_21_Conditional_3_Conditional_63_Template, 5, 0)(64, ProjectsComponent_Conditional_21_Conditional_3_Conditional_64_Template, 3, 3, "span");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(17);
    \u0275\u0275textInterpolate(ctx_r1.selectedCheckoutPackage()?.titleAr);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(20, 18, ctx_r1.selectedCheckoutPackage()?.priceEgp), " EGP");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(31, 20, ctx_r1.selectedCheckoutPackage()?.totalAmount), " EGP");
    \u0275\u0275advance(6);
    \u0275\u0275classProp("border-indigo-500", ctx_r1.selectedPaymentMethod() === "CreditCard")("bg-indigo-950", ctx_r1.selectedPaymentMethod() === "CreditCard");
    \u0275\u0275advance(5);
    \u0275\u0275classProp("border-indigo-500", ctx_r1.selectedPaymentMethod() === "VodafoneCash")("bg-indigo-950", ctx_r1.selectedPaymentMethod() === "VodafoneCash");
    \u0275\u0275advance(5);
    \u0275\u0275classProp("border-indigo-500", ctx_r1.selectedPaymentMethod() === "InstaPay")("bg-indigo-950", ctx_r1.selectedPaymentMethod() === "InstaPay");
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.selectedPaymentMethod() === "CreditCard" ? 52 : 53);
    \u0275\u0275advance(10);
    \u0275\u0275property("disabled", ctx_r1.isProcessingPayment());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isProcessingPayment() ? 63 : 64);
  }
}
function ProjectsComponent_Conditional_21_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 234)(1, "div", 266)(2, "div", 267)(3, "div", 202)(4, "div", 268);
    \u0275\u0275text(5, " \u{1F48E} ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "h4", 269);
    \u0275\u0275text(8, "\u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0644\u062D\u0644\u0648\u0644 \u0627\u0644\u0625\u0646\u0634\u0627\u0621\u0627\u062A \u0648\u0627\u0644\u062A\u0637\u0648\u064A\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 270);
    \u0275\u0275text(10, "STRUCTO OSOS PLATFORM \xB7 OFFICIAL INVOICING");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 271)(12, "span", 272);
    \u0275\u0275text(13, " \u2713 \u0625\u064A\u0635\u0627\u0644 \u0645\u062F\u0641\u0648\u0639 \u0648\u0645\u0643\u062A\u0645\u0644 / PAID ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 273);
    \u0275\u0275text(15, "\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644: ");
    \u0275\u0275elementStart(16, "strong", 274);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(18, "div", 275)(19, "div")(20, "h5", 276);
    \u0275\u0275text(21, "\u{1F4DC} \u0625\u064A\u0635\u0627\u0644 \u0633\u062F\u0627\u062F \u0631\u0633\u0648\u0645 \u0648\u062A\u0641\u0639\u064A\u0644 \u0633\u0639\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 273);
    \u0275\u0275text(23, "\u0635\u0627\u062F\u0631 \u0631\u0633\u0645\u064A\u0627\u064B \u0639\u0646 \u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0644\u0625\u062F\u0627\u0631\u0629 \u0648\u062A\u0642\u0646\u064A\u0627\u062A \u0627\u0644\u062A\u0637\u0648\u064A\u0631 \u0627\u0644\u0639\u0642\u0627\u0631\u064A \u0648\u0627\u0644\u0647\u0646\u062F\u0633\u064A.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "span", 277);
    \u0275\u0275text(25, " SEC-VERIFIED ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 278)(27, "div", 279)(28, "span", 280);
    \u0275\u0275text(29, "\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0623\u0648\u0644 (\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u062F\u0631\u0629):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 281);
    \u0275\u0275text(31, "\u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0627\u0644\u0631\u0642\u0645\u064A\u0629 / Structo Inc.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 282);
    \u0275\u0275text(33, "support@structo.app");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 279)(35, "span", 280);
    \u0275\u0275text(36, "\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u062B\u0627\u0646\u064A (\u0627\u0644\u0639\u0645\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u0641\u064A\u062F):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 283);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 284);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "div", 285)(42, "table", 286)(43, "thead", 287)(44, "tr")(45, "th", 288);
    \u0275\u0275text(46, "\u0628\u064A\u0627\u0646 \u0627\u0644\u062D\u0632\u0645\u0629 \u0648\u0627\u0644\u062E\u062F\u0645\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "th", 289);
    \u0275\u0275text(48, "\u0627\u0644\u0643\u0645\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "th", 289);
    \u0275\u0275text(50, "\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0635\u0627\u0641\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "th", 290);
    \u0275\u0275text(52, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "tbody", 291)(54, "tr")(55, "td", 288)(56, "span", 292);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "span", 293);
    \u0275\u0275text(59, "\u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A \u0644\u0631\u0635\u064A\u062F \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "td", 294);
    \u0275\u0275text(61, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "td", 294);
    \u0275\u0275text(63);
    \u0275\u0275pipe(64, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "td", 295);
    \u0275\u0275text(66);
    \u0275\u0275pipe(67, "number");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(68, "div", 296)(69, "div", 297)(70, "span", 298);
    \u0275\u0275text(71, "\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "span", 299);
    \u0275\u0275text(73);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(74, "div", 297)(75, "span", 298);
    \u0275\u0275text(76, "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u0636\u0627\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "span", 300);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "div", 297)(80, "span", 298);
    \u0275\u0275text(81, "\u0627\u0644\u0633\u0639\u0629 \u0627\u0644\u0643\u0644\u064A\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "span", 301);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(84, "div", 302)(85, "div")(86, "span", 303);
    \u0275\u0275text(87, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0643\u0644\u064A \u0627\u0644\u0645\u062D\u0635\u0651\u0644 (\u0635\u0627\u0641\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "span", 304);
    \u0275\u0275text(89, "NET AMOUNT PAID \xB7 0% VAT");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(90, "div", 305);
    \u0275\u0275text(91);
    \u0275\u0275pipe(92, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(93, "div", 306)(94, "span");
    \u0275\u0275text(95, "\u{1F6E1}\uFE0F \u0647\u0630\u0627 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 \u0645\u064F\u0635\u062F\u0631 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0648\u0645\u0648\u062B\u0642 \u0628\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0631\u0642\u0645\u064A \u0644\u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0648\u0644\u0627 \u064A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u062A\u0648\u0642\u064A\u0639 \u064A\u062F\u0648\u064A\u0627\u064B.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "span", 307);
    \u0275\u0275text(97, "Structo Platform Invoicing System");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(98, "div", 308)(99, "button", 309);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_21_Conditional_4_Template_button_click_99_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sendReceiptWhatsApp());
    });
    \u0275\u0275elementStart(100, "span");
    \u0275\u0275text(101, "\u{1F4F2} \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "button", 310);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_21_Conditional_4_Template_button_click_102_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.printReceipt());
    });
    \u0275\u0275elementStart(103, "span");
    \u0275\u0275text(104, "\u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 / Print PDF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(105, "div", 311)(106, "button", 312);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_21_Conditional_4_Template_button_click_106_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.closeCheckoutModal();
      return \u0275\u0275resetView(ctx_r1.openProjectModal());
    });
    \u0275\u0275text(107, " \u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0648\u0625\u0646\u0634\u0627\u0621 \u0645\u0634\u0631\u0648\u0639 \u062C\u062F\u064A\u062F \u{1F680} ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(17);
    \u0275\u0275textInterpolate(ctx_r1.paymentSuccessData()?.referenceNumber || "TXN-SUCCESS");
    \u0275\u0275advance(21);
    \u0275\u0275textInterpolate(ctx_r1.tenantProfile()?.name || ctx_r1.authService.currentUser()?.name || "\u0634\u0631\u0643\u0629 \u0645\u0639\u062A\u0645\u062F\u0629");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.authService.currentUser()?.email);
    \u0275\u0275advance(17);
    \u0275\u0275textInterpolate(ctx_r1.selectedCheckoutPackage()?.titleAr || "\u062A\u0631\u0642\u064A\u0629 \u0633\u0639\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(64, 10, ctx_r1.paymentSuccessData()?.totalAmount || ctx_r1.selectedCheckoutPackage()?.totalAmount || 0), " EGP");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(67, 12, ctx_r1.paymentSuccessData()?.totalAmount || ctx_r1.selectedCheckoutPackage()?.totalAmount || 0), " EGP");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.selectedPaymentMethod() === "CreditCard" ? "\u0628\u0637\u0627\u0642\u0629 \u0628\u0646\u0643\u064A\u0629 \u{1F4B3}" : "\u0645\u062D\u0641\u0638\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 / \u0625\u0646\u0633\u062A\u0627\u0628\u0627\u064A \u{1F4F1}");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("+", ctx_r1.paymentSuccessData()?.extraProjectsAdded || 1, " \u0645\u0634\u0627\u0631\u064A\u0639");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.paymentSuccessData()?.newMaxActiveProjects || 1, " \u0645\u0634\u0627\u0631\u064A\u0639");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(92, 14, ctx_r1.paymentSuccessData()?.totalAmount || ctx_r1.selectedCheckoutPackage()?.totalAmount || 0), " EGP ");
  }
}
function ProjectsComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 199);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_21_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeCheckoutModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 233);
    \u0275\u0275conditionalCreate(3, ProjectsComponent_Conditional_21_Conditional_3_Template, 65, 22)(4, ProjectsComponent_Conditional_21_Conditional_4_Template, 108, 16, "div", 234);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!ctx_r1.paymentSuccessData() ? 3 : 4);
  }
}
function ProjectsComponent_Conditional_22_Conditional_14_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r24 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2022 ", err_r24);
  }
}
function ProjectsComponent_Conditional_22_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 317)(1, "span", 139);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, ProjectsComponent_Conditional_22_Conditional_14_For_5_Template, 2, 1, "div", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, "PROJECTS.VALIDATION_TITLE"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.userValidationErrors());
  }
}
function ProjectsComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 313);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_22_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeUserModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 314)(3, "div", 315)(4, "div")(5, "h3", 316);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 122);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 123);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_22_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeUserModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 124);
    \u0275\u0275element(13, "path", 125);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(14, ProjectsComponent_Conditional_22_Conditional_14_Template, 6, 3, "div", 317);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "form", 318);
    \u0275\u0275listener("ngSubmit", function ProjectsComponent_Conditional_22_Template_form_ngSubmit_15_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onUserSubmit());
    });
    \u0275\u0275elementStart(16, "div", 144)(17, "div")(18, "label", 319);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementStart(21, "span", 141);
    \u0275\u0275text(22, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(23, "input", 320);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div")(25, "label", 321);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "translate");
    \u0275\u0275elementStart(28, "span", 141);
    \u0275\u0275text(29, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(30, "input", 322);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div")(32, "label", 323);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "translate");
    \u0275\u0275elementStart(35, "span", 141);
    \u0275\u0275text(36, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(37, "input", 324);
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(38, "p", 325);
    \u0275\u0275text(39, " \u{1F4A1} Tip: If you enter the employee's Gmail, they can log in instantly using 'Sign in with Google' without needing to enter a password! ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 144)(41, "div")(42, "label", 326);
    \u0275\u0275text(43, "Personal Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275element(44, "input", 327);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div")(46, "label", 328);
    \u0275\u0275text(47, "WhatsApp Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275element(48, "input", 329);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div")(50, "label", 330);
    \u0275\u0275text(51);
    \u0275\u0275pipe(52, "translate");
    \u0275\u0275elementStart(53, "span", 141);
    \u0275\u0275text(54, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(55, "input", 331);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "div")(57, "label", 332);
    \u0275\u0275text(58);
    \u0275\u0275pipe(59, "translate");
    \u0275\u0275elementStart(60, "span", 141);
    \u0275\u0275text(61, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "select", 333)(63, "option", 334);
    \u0275\u0275text(64);
    \u0275\u0275pipe(65, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "option", 335);
    \u0275\u0275text(67);
    \u0275\u0275pipe(68, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "option", 336);
    \u0275\u0275text(70);
    \u0275\u0275pipe(71, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "option", 337);
    \u0275\u0275text(73);
    \u0275\u0275pipe(74, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "div", 338)(76, "button", 339);
    \u0275\u0275listener("click", function ProjectsComponent_Conditional_22_Template_button_click_76_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeUserModal());
    });
    \u0275\u0275text(77);
    \u0275\u0275pipe(78, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "button", 340);
    \u0275\u0275text(80);
    \u0275\u0275pipe(81, "translate");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 16, "USERS.MODAL_TITLE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 18, "USERS.MODAL_SUBTITLE"));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.userValidationErrors().length > 0 ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.userForm);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(20, 20, "USERS.FIELD_FIRST_NAME"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(27, 22, "USERS.FIELD_LAST_NAME"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(34, 24, "USERS.FIELD_EMAIL"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(7);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(52, 26, "USERS.FIELD_PASSWORD"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(59, 28, "USERS.FIELD_ROLE"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(65, 30, "USERS.ROLES.Manager"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(68, 32, "USERS.ROLES.Accountant"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(71, 34, "USERS.ROLES.SiteEngineer"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(74, 36, "USERS.ROLES.DesignEngineer"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(78, 38, "COMMON.CANCEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.userForm.invalid || ctx_r1.isSavingUser());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(81, 40, "USERS.BTN_CREATE"), " ");
  }
}
function ProjectsComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 341);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 342);
    \u0275\u0275element(3, "path", 343);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 344);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.profileSuccessMessage());
  }
}
var GOVERNORATES = [
  { id: "Cairo", label: "Cairo / \u0627\u0644\u0642\u0627\u0647\u0631\u0629" },
  { id: "Giza", label: "Giza / \u0627\u0644\u062C\u064A\u0632\u0629" },
  { id: "Alexandria", label: "Alexandria / \u0627\u0644\u0625\u0633\u0643\u0646\u062F\u0631\u064A\u0629" },
  { id: "Qalyubia", label: "Qalyubia / \u0627\u0644\u0642\u0644\u064A\u0648\u0628\u064A\u0629" },
  { id: "Gharbia", label: "Gharbia / \u0627\u0644\u063A\u0631\u0628\u064A\u0629" },
  { id: "Dakahlia", label: "Dakahlia / \u0627\u0644\u062F\u0642\u0647\u0644\u064A\u0629" },
  { id: "Sharqia", label: "Sharqia / \u0627\u0644\u0634\u0631\u0642\u064A\u0629" },
  { id: "Monufia", label: "Monufia / \u0627\u0644\u0645\u0646\u0648\u0641\u064A\u0629" },
  { id: "Beheira", label: "Beheira / \u0627\u0644\u0628\u062D\u064A\u0631\u0629" },
  { id: "Kafr El Sheikh", label: "Kafr El Sheikh / \u0643\u0641\u0631 \u0627\u0644\u0634\u064A\u062E" },
  { id: "Damietta", label: "Damietta / \u062F\u0645\u064A\u0627\u0637" },
  { id: "Port Said", label: "Port Said / \u0628\u0648\u0631\u0633\u0639\u064A\u062F" },
  { id: "Ismailia", label: "Ismailia / \u0627\u0644\u0625\u0633\u0645\u0627\u0639\u064A\u0644\u064A\u0629" },
  { id: "Suez", label: "Suez / \u0627\u0644\u0633\u0648\u064A\u0633" },
  { id: "Aswan", label: "Aswan / \u0623\u0633\u0648\u0627\u0646" },
  { id: "Luxor", label: "Luxor / \u0627\u0644\u0623\u0642\u0635\u0631" },
  { id: "Red Sea", label: "Red Sea / \u0627\u0644\u0628\u062D\u0631 \u0627\u0644\u0623\u062D\u0645\u0631" },
  { id: "Matrouh", label: "Matrouh / \u0645\u0637\u0631\u0648\u062D" }
];
var ProjectsComponent = class _ProjectsComponent {
  projectService = inject(ProjectService);
  userService = inject(TenantUserService);
  profileService = inject(TenantProfileService);
  offlineSync = inject(OfflineSyncService);
  whatsappLink = inject(WhatsAppLinkService);
  uploadService = inject(ImageUploadService);
  authService = inject(AuthService);
  tenantProfileService = inject(TenantProfileService);
  langService = inject(LanguageService);
  translateService = inject(TranslateService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  confirmService = inject(ConfirmModalService);
  toastService = inject(ToastService);
  destroyRef = inject(DestroyRef);
  profileMapContainer;
  activeTab = signal(
    "projects",
    ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    )
  );
  togglingUserId = signal(
    null,
    ...ngDevMode ? [{ debugName: "togglingUserId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentUserId = computed(
    () => this.authService.currentUser()?.userId || "",
    ...ngDevMode ? [{ debugName: "currentUserId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentUserRole = computed(
    () => this.authService.currentUser()?.role || "",
    ...ngDevMode ? [{ debugName: "currentUserRole" }] : (
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
  // Quota & Billing Signals
  isUpgradeModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isUpgradeModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isCheckoutModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isCheckoutModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedCheckoutPackage = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedCheckoutPackage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedPaymentMethod = signal(
    "CreditCard",
    ...ngDevMode ? [{ debugName: "selectedPaymentMethod" }] : (
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
  paymentSuccessData = signal(
    null,
    ...ngDevMode ? [{ debugName: "paymentSuccessData" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tenantProfile = signal(
    null,
    ...ngDevMode ? [{ debugName: "tenantProfile" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Upload Signals
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
  // Signals for Projects
  projects = signal(
    [],
    ...ngDevMode ? [{ debugName: "projects" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingProjects = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingProjects" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isProjectModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isProjectModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeProjectTab = signal(
    1,
    ...ngDevMode ? [{ debugName: "activeProjectTab" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSavingProject = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSavingProject" }] : (
      /* istanbul ignore next */
      []
    )
  );
  projectValidationErrors = signal(
    [],
    ...ngDevMode ? [{ debugName: "projectValidationErrors" }] : (
      /* istanbul ignore next */
      []
    )
  );
  projectError = signal(
    null,
    ...ngDevMode ? [{ debugName: "projectError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Signals for Users
  users = signal(
    [],
    ...ngDevMode ? [{ debugName: "users" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingUsers = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingUsers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isUserModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isUserModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSavingUser = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSavingUser" }] : (
      /* istanbul ignore next */
      []
    )
  );
  userValidationErrors = signal(
    [],
    ...ngDevMode ? [{ debugName: "userValidationErrors" }] : (
      /* istanbul ignore next */
      []
    )
  );
  userError = signal(
    null,
    ...ngDevMode ? [{ debugName: "userError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Signals for Profile
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
  profileMapSearchResults = signal(
    [],
    ...ngDevMode ? [{ debugName: "profileMapSearchResults" }] : (
      /* istanbul ignore next */
      []
    )
  );
  governorates = GOVERNORATES;
  profileMap = null;
  profileMarker = null;
  profileMapSearchTimeout = null;
  profileMapLatLng = L.latLng(30.0444, 31.2357);
  profileMapSearchQuery = "";
  // Computed counters
  activeProjectsCount = computed(
    () => this.projects().filter((p) => p.status === "Active" || p.status === "Delayed").length,
    ...ngDevMode ? [{ debugName: "activeProjectsCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completedProjectsCount = computed(
    () => this.projects().filter((p) => p.status === "Completed" || p.status === "Closed").length,
    ...ngDevMode ? [{ debugName: "completedProjectsCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  usedProjectsCount = computed(
    () => this.projects().length,
    ...ngDevMode ? [{ debugName: "usedProjectsCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  allowedProjectsCount = computed(
    () => {
      const max = this.tenantProfile()?.maxActiveProjects;
      if (max === -1)
        return -1;
      if (max != null && max > 0)
        return max;
      return 2;
    },
    ...ngDevMode ? [{ debugName: "allowedProjectsCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  managerCount = computed(
    () => this.users().filter((u) => u.role === "Manager").length,
    ...ngDevMode ? [{ debugName: "managerCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  engineerCount = computed(
    () => this.users().filter((u) => u.role === "SiteEngineer" || u.role === "DesignEngineer").length,
    ...ngDevMode ? [{ debugName: "engineerCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Forms
  projectForm = this.fb.group({
    name: ["", Validators.required],
    client: ["", Validators.required],
    budget: [null, [Validators.required, Validators.min(0)]],
    startDate: [(/* @__PURE__ */ new Date()).toISOString().substring(0, 10), Validators.required],
    endDate: [null],
    status: ["Active", Validators.required],
    category: ["Residential", Validators.required],
    isPublicPortfolio: [false],
    description: [""],
    governorate: ["", Validators.required],
    cityOrZone: ["", Validators.required],
    siteAddress: ["", Validators.required],
    clientWhatsApp: ["", [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
    propertyType: ["Residential", Validators.required]
  });
  userForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    personalPhone: ["", [Validators.pattern(/^01\d{9}$/)]],
    whatsAppPhone: ["", [Validators.pattern(/^01\d{9}$/)]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    role: ["Manager", Validators.required]
  });
  profileForm = this.fb.group({
    name: ["", Validators.required],
    logoUrl: [""],
    bannerUrl: [""],
    region: [""],
    governorateId: [""],
    personalPhone: ["", [Validators.pattern(/^01\d{9}$/)]],
    whatsAppPhone: ["", [Validators.pattern(/^01\d{9}$/)]],
    manualAddress: [""],
    mapLocationUrl: [""],
    latitude: [null],
    longitude: [null],
    companyDescription: [""]
  });
  ngOnInit() {
    const url = this.router.url;
    const isRestrictedTab = url.includes("/dashboard/users") || url.includes("/dashboard/profile");
    if (isRestrictedTab && this.currentUserRole() !== "TenantOwner") {
      this.activeTab.set("projects");
      this.router.navigate(["/dashboard/projects"], { replaceUrl: true });
      return;
    }
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      if (params["upgrade"] === "true") {
        this.isUpgradeModalOpen.set(true);
      }
    });
    if (url.includes("/dashboard/users")) {
      this.activeTab.set("users");
    } else if (url.includes("/dashboard/profile")) {
      this.activeTab.set("profile");
    } else {
      this.activeTab.set("projects");
    }
    this.fetchProjects();
    this.fetchProfile();
    if (this.currentUserRole() === "TenantOwner") {
      this.fetchUsers();
    }
    this.offlineSync.registerHandler("tenant-profile-update", (dto) => this.profileService.updateProfile(dto));
    this.offlineSync.registerHandler("user-create", (dto) => this.userService.createUser(dto));
  }
  selectTab(tabName) {
    const mappedTab = tabName === "location" || tabName === "profile" ? "profile" : tabName;
    this.navigateToTab(mappedTab);
    if (tabName === "location" || mappedTab === "profile") {
      setTimeout(() => {
        if (this.profileMap) {
          this.profileMap.invalidateSize();
        }
      }, 150);
    }
  }
  navigateToTab(tab) {
    this.activeTab.set(tab);
    if (tab === "projects") {
      this.router.navigate(["/dashboard/projects"]);
    } else {
      this.router.navigate([`/dashboard/${tab}`]);
      if (tab === "profile") {
        setTimeout(() => this.syncProfileMapFromForm(), 150);
      }
    }
  }
  resolveGovernorateId(rawValue) {
    if (!rawValue) {
      return "";
    }
    const normalized = rawValue.trim().toLowerCase();
    const match = GOVERNORATES.find((option) => option.id.toLowerCase() === normalized || option.label.toLowerCase() === normalized || option.label.toLowerCase().startsWith(normalized));
    return match?.id ?? rawValue;
  }
  resolveGovernorateLabel(rawValue) {
    if (!rawValue) {
      return "";
    }
    const resolved = this.resolveGovernorateId(rawValue);
    return GOVERNORATES.find((option) => option.id === resolved)?.label ?? resolved;
  }
  queueProfileMapSync() {
    setTimeout(() => this.syncProfileMapFromForm(), 150);
  }
  syncProfileMapFromForm() {
    const latitude = this.profileForm.get("latitude")?.value;
    const longitude = this.profileForm.get("longitude")?.value;
    const hasCoordinates = latitude != null && longitude != null;
    if (hasCoordinates) {
      this.profileMapLatLng = L.latLng(latitude, longitude);
      this.profileMapSearchQuery = this.profileForm.get("manualAddress")?.value || this.profileMapSearchQuery;
    }
    if (!this.profileMapContainer?.nativeElement) {
      return;
    }
    if (!this.profileMap) {
      this.initProfileMap();
      return;
    }
    setTimeout(() => {
      if (this.profileMap) {
        this.profileMap.invalidateSize();
        this.profileMap.setView(this.profileMapLatLng, hasCoordinates ? 15 : 12);
        if (this.profileMarker) {
          this.profileMarker.setLatLng(this.profileMapLatLng);
        }
      }
    }, 150);
  }
  initProfileMap() {
    if (!this.profileMapContainer?.nativeElement || this.profileMap) {
      return;
    }
    const iconDefault = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
    this.profileMap = L.map(this.profileMapContainer.nativeElement).setView(this.profileMapLatLng, 12);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap contributors, &copy; CARTO",
      subdomains: "abcd",
      maxZoom: 19
    }).addTo(this.profileMap);
    this.profileMarker = L.marker(this.profileMapLatLng, { draggable: true }).addTo(this.profileMap);
    this.profileMarker.on("dragend", () => {
      const latLng2 = this.profileMarker.getLatLng();
      this.profileMapLatLng = latLng2;
      this.profileForm.patchValue({
        latitude: latLng2.lat,
        longitude: latLng2.lng,
        manualAddress: `Coordinates: ${latLng2.lat.toFixed(5)}, ${latLng2.lng.toFixed(5)}`,
        mapLocationUrl: `https://www.google.com/maps/search/?api=1&query=${latLng2.lat},${latLng2.lng}`
      });
    });
    setTimeout(() => {
      if (this.profileMap) {
        this.profileMap.invalidateSize();
      }
    }, 150);
  }
  onProfileMapSearchChange(event) {
    const query = event.target.value;
    this.profileMapSearchQuery = query;
    if (this.profileMapSearchTimeout) {
      clearTimeout(this.profileMapSearchTimeout);
    }
    if (query.length < 2) {
      this.profileMapSearchResults.set([]);
      return;
    }
    this.profileMapSearchTimeout = setTimeout(() => this.searchProfileMap(query), 400);
  }
  onProfileMapSearchSubmit() {
    const query = this.profileMapSearchQuery.trim();
    if (query.length >= 2) {
      this.searchProfileMap(query);
    }
  }
  searchProfileMap(query) {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=en`;
    this.http.get(url).subscribe({
      next: (response) => {
        const results = (response.features || []).map((feature) => ({
          lat: feature.geometry.coordinates[1].toString(),
          lon: feature.geometry.coordinates[0].toString(),
          display_name: feature.properties.name || feature.properties.street || feature.properties.city || feature.properties.country || query
        }));
        this.profileMapSearchResults.set(results);
      },
      error: () => {
        this.profileMapSearchResults.set([]);
      }
    });
  }
  selectProfileMapSearchResult(result) {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    this.profileMapLatLng = L.latLng(lat, lng);
    this.profileMapSearchQuery = result.display_name;
    this.profileMapSearchResults.set([]);
    if (this.profileMap) {
      this.profileMap.flyTo(this.profileMapLatLng, 15);
    }
    if (this.profileMarker) {
      this.profileMarker.setLatLng(this.profileMapLatLng);
    }
    this.profileForm.patchValue({
      latitude: lat,
      longitude: lng,
      manualAddress: result.display_name,
      mapLocationUrl: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    });
  }
  fetchProjects() {
    this.isLoadingProjects.set(true);
    this.projectError.set(null);
    this.projectService.getProjects().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.isLoadingProjects.set(false);
        if (response.success && response.data) {
          const mapped = response.data.map((p, index) => {
            let client = index % 2 === 0 ? "El-Mokawloon El-Arab" : "Orascom Construction";
            let budget = index % 2 === 0 ? 54e5 : 89e5;
            let status = "Active";
            if (p.status) {
              status = p.status;
            } else {
              status = p.isActive ? index % 3 === 0 ? "Delayed" : "Active" : "Completed";
            }
            let category = "Residential";
            let isPublicPortfolio = false;
            let description = p.description;
            try {
              if (p.description && p.description.startsWith("{")) {
                const parsed = JSON.parse(p.description);
                if (parsed.client)
                  client = parsed.client;
                if (parsed.budget !== void 0)
                  budget = parsed.budget;
                if (parsed.status)
                  status = parsed.status;
                if (parsed.category)
                  category = parsed.category;
                if (parsed.isPublicPortfolio !== void 0)
                  isPublicPortfolio = parsed.isPublicPortfolio;
                if (parsed.description !== void 0)
                  description = parsed.description;
              }
            } catch (e) {
            }
            if (p.clientName)
              client = p.clientName;
            return __spreadProps(__spreadValues({}, p), {
              client,
              budget,
              status,
              category,
              isPublicPortfolio,
              description
            });
          });
          let filtered = mapped;
          this.projects.set(filtered);
        } else {
          this.projectError.set(response.message || "Failed to load projects.");
        }
      },
      error: (err) => {
        this.isLoadingProjects.set(false);
        this.projectError.set(err.status === 401 ? "Session expired. Please log in again." : err.error?.message || "Error connecting to backend.");
      }
    });
  }
  fetchUsers() {
    this.isLoadingUsers.set(true);
    this.userError.set(null);
    this.userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.isLoadingUsers.set(false);
        if (response.success && response.data) {
          this.users.set(response.data);
        } else {
          this.userError.set(response.message || "Failed to load users.");
        }
      },
      error: (err) => {
        this.isLoadingUsers.set(false);
        this.userError.set(err.status === 401 ? "Session expired. Please log in again." : err.error?.message || "Error connecting to backend.");
      }
    });
  }
  isUserToggleLoading(userId) {
    return this.togglingUserId() === userId;
  }
  toggleUserStatus(user) {
    if (this.currentUserRole() !== "TenantOwner") {
      return;
    }
    if (user.id === this.currentUserId()) {
      this.toastService.show(this.translateService.instant("COMMON.ERROR"), this.translateService.instant("USERS.CANNOT_DISABLE_SELF"), "error");
      return;
    }
    this.togglingUserId.set(user.id);
    this.userService.toggleUserStatus(user.id).pipe(take(1)).subscribe({
      next: (response) => {
        this.togglingUserId.set(null);
        if (response.success) {
          const updatedActiveState = response.data ?? !user.isActive;
          this.users.update((current) => current.map((item) => item.id === user.id ? __spreadProps(__spreadValues({}, item), { isActive: updatedActiveState }) : item));
          this.toastService.show(this.translateService.instant("COMMON.SUCCESS"), this.translateService.instant("USERS.STATUS_UPDATED_SUCCESS"), "success");
        } else {
          this.toastService.show(this.translateService.instant("COMMON.ERROR"), this.translateService.instant(response.message || "USERS.STATUS_UPDATE_FAILED"), "error");
        }
      },
      error: (err) => {
        this.togglingUserId.set(null);
        this.toastService.show(this.translateService.instant("COMMON.ERROR"), this.translateService.instant(err.error?.message || err.message || "USERS.STATUS_UPDATE_FAILED"), "error");
      }
    });
  }
  fetchProfile() {
    this.profileService.getProfile().pipe(take(1)).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.tenantProfile.set(res.data);
          const getCleanUrl = (url) => {
            if (!url)
              return url;
            if (url.startsWith("PRESIGNED_SPLIT")) {
              const parts = url.split("|");
              return parts.length > 2 ? parts[2] : url;
            }
            return url;
          };
          this.profileForm.patchValue({
            name: res.data.name,
            logoUrl: getCleanUrl(res.data.logoUrl),
            bannerUrl: getCleanUrl(res.data.bannerUrl),
            region: this.resolveGovernorateId(res.data.governorateId ?? res.data.region),
            governorateId: this.resolveGovernorateId(res.data.governorateId ?? res.data.region),
            personalPhone: res.data.personalPhone,
            whatsAppPhone: res.data.whatsAppPhone,
            manualAddress: res.data.manualAddress,
            mapLocationUrl: res.data.mapLocationUrl,
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            companyDescription: res.data.companyDescription
          });
          this.profileMapSearchQuery = res.data.manualAddress || "";
          this.queueProfileMapSync();
          const hasMap = res.data.latitude !== null && res.data.latitude !== void 0 && res.data.longitude !== null && res.data.longitude !== void 0;
          const hasAddress = !!res.data.manualAddress && res.data.manualAddress.trim() !== "";
          this.authService.updateProfileCompletionStatus(hasMap && hasAddress);
        }
      }
    });
  }
  onProfileSubmit() {
    if (this.profileForm.invalid) {
      return;
    }
    this.isSavingProfile.set(true);
    this.profileSuccessMessage.set(null);
    const governorateId = this.resolveGovernorateId(this.profileForm.value.governorateId || this.profileForm.value.region || "");
    const dto = __spreadProps(__spreadValues({}, this.profileForm.value), {
      region: governorateId,
      governorateId,
      personalPhone: this.profileForm.value.personalPhone || null,
      whatsAppPhone: this.profileForm.value.whatsAppPhone || null,
      manualAddress: this.profileForm.value.manualAddress || null,
      mapLocationUrl: this.profileForm.value.mapLocationUrl || null,
      latitude: this.profileForm.value.latitude || null,
      longitude: this.profileForm.value.longitude || null
    });
    this.offlineSync.submit("tenant-profile-update", dto, (value) => this.profileService.updateProfile(value)).pipe(take(1)).subscribe({
      next: (res) => {
        this.isSavingProfile.set(false);
        if (res.success) {
          const msg = res.message && res.message !== "PROFILE.SUCCESS" ? res.message : "\u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u0646\u062C\u0627\u062D / Profile updated successfully";
          this.toastService.show("\u0646\u062C\u0627\u062D / Success", msg, "success");
          this.profileSuccessMessage.set(msg);
          if (navigator.onLine) {
            this.fetchProfile();
          }
          this.queueProfileMapSync();
          try {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } catch {
          }
          setTimeout(() => this.profileSuccessMessage.set(null), 4e3);
        }
      },
      error: (err) => {
        this.isSavingProfile.set(false);
        this.toastService.show("\u062E\u0637\u0623 / Error", err?.error?.message || "\u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629 / Failed to update profile", "error");
      }
    });
  }
  onLogoFileSelected(event) {
    const input = event.target;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > 2 * 1024 * 1024) {
        this.confirmService.alert({
          title: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B",
          message: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B! \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0635\u0648\u0631 2 \u0645\u064A\u062C\u0627 \u0648\u0644\u0644\u0645\u0642\u0627\u064A\u0633\u0627\u062A 5 \u0645\u064A\u062C\u0627.",
          type: "error"
        });
        input.value = "";
        return;
      }
      this.isUploadingLogo.set(true);
      this.uploadService.uploadTenantLogo(file).pipe(take(1)).subscribe({
        next: (res) => {
          this.isUploadingLogo.set(false);
          if (res.success && res.data && res.data.url) {
            this.profileForm.patchValue({ logoUrl: res.data.url });
          }
        },
        error: () => {
          this.isUploadingLogo.set(false);
          this.confirmService.alert({ title: "\u062E\u0637\u0623", message: "\u0641\u0634\u0644 \u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641.", type: "error" });
        }
      });
    }
  }
  onBannerFileSelected(event) {
    const input = event.target;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > 2 * 1024 * 1024) {
        this.confirmService.alert({
          title: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B",
          message: "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B! \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0635\u0648\u0631 2 \u0645\u064A\u062C\u0627 \u0648\u0644\u0644\u0645\u0642\u0627\u064A\u0633\u0627\u062A 5 \u0645\u064A\u062C\u0627.",
          type: "error"
        });
        input.value = "";
        return;
      }
      this.isUploadingBanner.set(true);
      this.uploadService.uploadTenantBanner(file).pipe(take(1)).subscribe({
        next: (res) => {
          this.isUploadingBanner.set(false);
          if (res.success && res.data && res.data.url) {
            this.profileForm.patchValue({ bannerUrl: res.data.url });
          }
        },
        error: () => {
          this.isUploadingBanner.set(false);
          this.confirmService.alert({ title: "\u062E\u0637\u0623", message: "\u0641\u0634\u0644 \u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641.", type: "error" });
        }
      });
    }
  }
  isProjectFieldInvalid(fieldName) {
    const field = this.projectForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }
  openProjectModal() {
    if (this.usedProjectsCount() >= this.allowedProjectsCount()) {
      this.toastService.show("\u0627\u0633\u062A\u0647\u0644\u0643\u062A \u0633\u0639\u0629 \u0628\u0627\u0642\u062A\u0643 / Quota Limit Reached", "\u0644\u0642\u062F \u0627\u0633\u062A\u0647\u0644\u0643\u062A \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u0641\u064A \u0628\u0627\u0642\u062A\u0643\u060C \u064A\u0645\u0643\u0646\u0643 \u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0627\u0631\u064A\u0639 \u062C\u062F\u064A\u062F\u0629 \u0641\u0648\u0631\u0627\u064B \u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0639\u0645\u0644.", "warning");
      this.isUpgradeModalOpen.set(true);
      return;
    }
    this.projectForm.reset({
      name: "",
      client: "",
      budget: null,
      startDate: (/* @__PURE__ */ new Date()).toISOString().substring(0, 10),
      endDate: null,
      status: "Active",
      category: "Residential",
      isPublicPortfolio: false,
      description: "",
      governorate: "",
      cityOrZone: "",
      siteAddress: "",
      clientWhatsApp: "",
      propertyType: "Residential"
    });
    this.projectValidationErrors.set([]);
    this.activeProjectTab.set(1);
    this.isProjectModalOpen.set(true);
  }
  closeProjectModal() {
    this.isProjectModalOpen.set(false);
  }
  setProjectTab(tab) {
    this.activeProjectTab.set(tab);
  }
  nextProjectTab() {
    const current = this.activeProjectTab();
    if (current < 3) {
      this.activeProjectTab.set(current + 1);
    }
  }
  prevProjectTab() {
    const current = this.activeProjectTab();
    if (current > 1) {
      this.activeProjectTab.set(current - 1);
    }
  }
  onProjectSubmit() {
    if (this.currentUserRole() !== "TenantOwner") {
      return;
    }
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }
    this.isSavingProject.set(true);
    this.projectValidationErrors.set([]);
    const formVal = this.projectForm.value;
    const classification = formVal.category || "Residential";
    const descPayload = {
      client: formVal.client,
      budget: Number(formVal.budget),
      status: formVal.status,
      category: classification,
      isPublicPortfolio: !!formVal.isPublicPortfolio,
      description: formVal.description || ""
    };
    const dto = {
      name: formVal.name,
      description: JSON.stringify(descPayload),
      startDate: new Date(formVal.startDate).toISOString(),
      endDate: formVal.endDate ? new Date(formVal.endDate).toISOString() : null,
      managerId: null,
      tenantId: null,
      governorate: formVal.governorate,
      cityOrZone: formVal.cityOrZone,
      siteAddress: formVal.siteAddress,
      clientName: formVal.client,
      clientWhatsApp: formVal.clientWhatsApp,
      propertyType: classification
    };
    this.projectService.createProject(dto).subscribe({
      next: (response) => {
        this.isSavingProject.set(false);
        if (response.success && response.data) {
          this.closeProjectModal();
          this.fetchProjects();
        } else {
          this.projectValidationErrors.set(response.errors || [response.message || "Failed to create project."]);
        }
      },
      error: (err) => {
        this.isSavingProject.set(false);
        const errors = err.error?.errors || [err.error?.message || err.message || "Error occurred."];
        this.projectValidationErrors.set(Array.isArray(errors) ? errors : [errors]);
      }
    });
  }
  isUserFieldInvalid(fieldName) {
    const field = this.userForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }
  openUserModal() {
    this.userForm.reset({
      firstName: "",
      lastName: "",
      email: "",
      personalPhone: "",
      whatsAppPhone: "",
      password: "",
      role: "Manager"
    });
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
    this.userValidationErrors.set([]);
    this.isUserModalOpen.set(true);
  }
  closeUserModal() {
    this.isUserModalOpen.set(false);
  }
  onUserSubmit() {
    if (this.currentUserRole() !== "TenantOwner") {
      return;
    }
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.isSavingUser.set(true);
    this.userValidationErrors.set([]);
    const dto = this.userForm.value;
    this.offlineSync.submit("user-create", dto, (value) => this.userService.createUser(value)).pipe(take(1)).subscribe({
      next: (response) => {
        this.isSavingUser.set(false);
        if (response.success) {
          this.closeUserModal();
          if (navigator.onLine) {
            this.fetchUsers();
          }
        } else {
          this.userValidationErrors.set(response.errors || [response.message || "Failed to add user."]);
        }
      },
      error: (err) => {
        this.isSavingUser.set(false);
        const errors = err.error?.errors || [err.error?.message || err.message || "Error occurred."];
        this.userValidationErrors.set(Array.isArray(errors) ? errors : [errors]);
      }
    });
  }
  openWhatsAppForUser(user) {
    const message = `\u0645\u0631\u062D\u0628\u0627\u064B ${user.firstName} ${user.lastName}\u060C \u0647\u0630\u0647 \u0631\u0633\u0627\u0644\u0629 \u0645\u0646 Structo.`;
    this.whatsappLink.openChat(user.whatsAppPhone, message);
  }
  contactSuperAdminForUpgrade(numProjects) {
    const msg = `\u0645\u0631\u062D\u0628\u0627\u064B\u060C \u0623\u0648\u062F \u062A\u0631\u0642\u064A\u0629 \u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0644\u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0644\u0639\u062F\u062F ${numProjects} \u0645\u0634\u0631\u0648\u0639/\u0645\u0634\u0627\u0631\u064A\u0639.`;
    this.whatsappLink.openChat("201004500766", msg);
  }
  openCheckout(pkg) {
    const vat = 0;
    const total = pkg.priceEgp;
    this.selectedCheckoutPackage.set(__spreadProps(__spreadValues({}, pkg), {
      vatAmount: vat,
      totalAmount: total
    }));
    this.isUpgradeModalOpen.set(false);
    this.isCheckoutModalOpen.set(true);
    this.paymentSuccessData.set(null);
  }
  closeCheckoutModal() {
    this.isCheckoutModalOpen.set(false);
    this.selectedCheckoutPackage.set(null);
    this.paymentSuccessData.set(null);
  }
  submitUpgradePayment() {
    const pkg = this.selectedCheckoutPackage();
    if (!pkg)
      return;
    this.isProcessingPayment.set(true);
    const req = pkg.extraProjectsCount ? { extraProjectsCount: pkg.extraProjectsCount, paymentMethod: this.selectedPaymentMethod() } : { targetPlanId: pkg.targetPlanId, paymentMethod: this.selectedPaymentMethod() };
    this.tenantProfileService.upgradeSubscription(req).subscribe({
      next: (res) => {
        this.isProcessingPayment.set(false);
        if (res.success && res.data) {
          this.paymentSuccessData.set({
            referenceNumber: res.data.referenceNumber,
            extraProjectsAdded: res.data.extraProjectsAdded,
            newMaxActiveProjects: res.data.newMaxActiveProjects,
            totalAmount: res.data.totalAmount
          });
          if (this.tenantProfile()) {
            this.tenantProfile.set(__spreadProps(__spreadValues({}, this.tenantProfile()), {
              maxActiveProjects: res.data.newMaxActiveProjects
            }));
          }
          this.fetchProjects();
          const successMsg = `\u{1F389} \u062A\u0645 \u062F\u0641\u0639 ${res.data.totalAmount} \u062C.\u0645 \u0648\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0628\u0646\u062C\u0627\u062D!`;
          this.toastService.show("\u0646\u062C\u0627\u062D / Success", successMsg, "success");
        } else {
          this.toastService.show("\u062E\u0637\u0623 / Error", res.message || "\u0641\u0634\u0644\u062A \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062F\u0641\u0639 \u2014 \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.", "error");
        }
      },
      error: (err) => {
        this.isProcessingPayment.set(false);
        const msg = err.error?.message || "\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062F\u0641\u0639. \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.";
        this.toastService.show("\u062E\u0637\u0623 / Error", msg, "error");
      }
    });
  }
  sendReceiptWhatsApp() {
    const successData = this.paymentSuccessData();
    const pkg = this.selectedCheckoutPackage();
    const tenantPhone = this.tenantProfile()?.whatsAppPhone || this.tenantProfile()?.personalPhone || this.authService.currentUser()?.whatsAppPhone;
    if (!tenantPhone) {
      this.toastService.show("\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628 / WhatsApp Alert", "\u0644\u0645 \u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0639\u062F\u0645 \u0648\u062C\u0648\u062F \u0631\u0642\u0645 \u0648\u0627\u062A\u0633\u0627\u0628 \u0645\u0633\u062C\u0644 \u0641\u064A \u0628\u0631\u0648\u0641\u0627\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0629.", "warning");
      return;
    }
    const companyName = this.tenantProfile()?.name || this.authService.currentUser()?.name || "\u0634\u0631\u0643\u0629 \u0645\u0639\u062A\u0645\u062F\u0629";
    const refNo = successData?.referenceNumber || "TXN-000000";
    const totalAmount = successData?.totalAmount || pkg?.totalAmount || 0;
    const addedProjects = successData?.extraProjectsAdded || pkg?.extraProjectsCount || 1;
    const msg = `\u0645\u0631\u062D\u0628\u0627\u064B ${companyName}\u060C \u062A\u0645 \u0625\u0635\u062F\u0627\u0631 \u0625\u064A\u0635\u0627\u0644 \u0633\u062F\u0627\u062F \u0631\u0633\u0648\u0645 \u0627\u0634\u062A\u0631\u0627\u0643 \u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633/Structo \u0631\u0642\u0645 (${refNo}) \u0628\u0645\u0628\u0644\u063A \u0625\u062C\u0645\u0627\u0644\u064A ${totalAmount} EGP \u0644\u0639\u062F\u062F +${addedProjects} \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629. \u0634\u0643\u0631\u0627\u064B \u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0643\u0645 \u0623\u064F\u0633\u064F\u0633!`;
    this.whatsappLink.openChat(tenantPhone, msg);
    this.toastService.show("\u0646\u062C\u0627\u062D / Success", "\u062A\u0645 \u0641\u062A\u062D \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0625\u0631\u0633\u0627\u0644 \u0645\u0644\u062E\u0635 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 \u0628\u0646\u062C\u0627\u062D.", "success");
  }
  printReceipt() {
    window.print();
  }
  viewDetails(id) {
    const proj = this.projects().find((p) => p.id === id);
    if (proj && proj.status === "PendingActivation") {
      this.toastService.show("\u062A\u0646\u0628\u064A\u0647 / Attention", "\u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0645\u0646 \u0642\u0628\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629. \u064A\u0631\u062C\u0649 \u062A\u0631\u0642\u064A\u0629 \u0627\u0644\u0628\u0627\u0642\u0629 \u0644\u062A\u0641\u0639\u064A\u0644\u0647.", "warning");
      this.isUpgradeModalOpen.set(true);
      return;
    }
    this.router.navigate(["/dashboard/projects", id]);
  }
  static \u0275fac = function ProjectsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectsComponent, selectors: [["app-projects"]], viewQuery: function ProjectsComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.profileMapContainer = _t.first);
    }
  }, decls: 24, vars: 13, consts: [[1, "space-y-6", "w-full", "px-4", "sm:px-6", "lg:px-8"], [1, "flex", "flex-col", "sm:flex-row", "justify-between", "items-start", "sm:items-center", "gap-4", "border-b", "border-slate-800/60", "pb-5"], [1, "text-3xl", "font-extrabold", "tracking-tight", "text-white", "font-cairo"], [1, "text-sm", "text-slate-400", "mt-1"], [1, "flex", "flex-col", "sm:flex-row", "gap-3", "w-full", "sm:w-auto"], ["id", "btn-new-project", 1, "bg-indigo-600", "hover:bg-indigo-500", "text-white", "font-bold", "py-2.5", "px-5", "rounded-xl", "shadow-lg", "shadow-indigo-600/30", "flex", "items-center", "justify-center", "gap-2", "transition-all", "duration-200", "hover:scale-[1.02]", "active:scale-95", "cursor-pointer", "font-cairo", "text-sm", "w-full", "sm:w-auto"], ["id", "btn-new-user", 1, "inline-flex", "w-full", "sm:w-auto", "items-center", "justify-center", "gap-2", "px-5", "py-2.5", "bg-indigo-600", "hover:bg-indigo-500", "text-sm", "font-semibold", "rounded-xl", "text-white", "shadow-lg", "shadow-indigo-600/30", "transition-all", "duration-200", "hover:scale-[1.02]", "active:scale-95", "cursor-pointer", "font-cairo"], [1, "border-b", "border-slate-800"], [1, "md:hidden", "fixed", "bottom-0", "left-0", "right-0", "p-3", "bg-slate-900/95", "backdrop-blur-md", "border-t", "border-slate-800", "z-30", "flex", "items-center", "justify-around", "gap-2", "shadow-2xl"], [1, "fixed", "inset-0", "z-50", "flex", "items-end", "md:items-center", "justify-center", "p-0", "sm:p-4"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "sm:p-6"], [1, "fixed", "inset-0", "z-50", "flex", "items-stretch", "justify-center", "p-3", "sm:p-4"], [1, "fixed", "bottom-6", "left-6", "z-[9999]", "flex", "items-center", "gap-3", "px-5", "py-3.5", "bg-emerald-600/95", "backdrop-blur-md", "border", "border-emerald-400/30", "text-white", "rounded-2xl", "shadow-2xl", "font-cairo", "text-sm", "max-w-md", "animate-slide-in"], ["id", "btn-new-project", 1, "bg-indigo-600", "hover:bg-indigo-500", "text-white", "font-bold", "py-2.5", "px-5", "rounded-xl", "shadow-lg", "shadow-indigo-600/30", "flex", "items-center", "justify-center", "gap-2", "transition-all", "duration-200", "hover:scale-[1.02]", "active:scale-95", "cursor-pointer", "font-cairo", "text-sm", "w-full", "sm:w-auto", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M12 4v16m8-8H4"], ["id", "btn-new-user", 1, "inline-flex", "w-full", "sm:w-auto", "items-center", "justify-center", "gap-2", "px-5", "py-2.5", "bg-indigo-600", "hover:bg-indigo-500", "text-sm", "font-semibold", "rounded-xl", "text-white", "shadow-lg", "shadow-indigo-600/30", "transition-all", "duration-200", "hover:scale-[1.02]", "active:scale-95", "cursor-pointer", "font-cairo", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"], [1, "flex", "gap-8"], [1, "pb-4", "text-sm", "font-bold", "border-b-2", "cursor-pointer", "transition-all", "duration-200", "font-cairo", 3, "click"], [1, "bg-slate-900/60", "border", "border-slate-800/80", "rounded-2xl", "p-4", "sm:p-5", "shadow-lg", "mb-6", "flex", "flex-col", "lg:flex-row", "justify-between", "items-start", "lg:items-center", "gap-4", "backdrop-blur-sm"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-5"], [1, "bg-slate-900/40", "border", "border-slate-800/80", "rounded-2xl", "p-5", "shadow-sm"], [1, "text-xs", "text-slate-500", "font-bold", "uppercase", "tracking-wider", "font-cairo"], [1, "text-3xl", "font-extrabold", "text-white", "mt-1"], [1, "text-3xl", "font-extrabold", "text-indigo-400", "mt-1"], [1, "text-3xl", "font-extrabold", "text-emerald-400", "mt-1"], [1, "flex", "justify-center", "items-center", "py-20"], [1, "rounded-xl", "bg-red-500/10", "border", "border-red-500/30", "p-5", "text-sm", "text-red-400", "flex", "items-start", "gap-3"], [1, "bg-slate-900/25", "border", "border-slate-800/80", "rounded-2xl", "overflow-hidden", "shadow-2xl"], [1, "flex", "items-center", "gap-3.5", "w-full", "lg:w-auto"], [1, "h-10", "w-10", "bg-indigo-500/10", "rounded-xl", "flex", "items-center", "justify-center", "border", "border-indigo-500/20", "text-indigo-400", "shrink-0"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5", "text-indigo-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"], [1, "flex", "items-center", "gap-2"], [1, "font-bold", "text-sm", "text-white", "font-cairo"], [1, "text-sm", "font-extrabold", "text-indigo-300", "font-mono"], [1, "text-xs", "text-slate-400", "mt-0.5", "font-cairo"], [1, "text-indigo-300", "font-mono"], [1, "text-white", "font-mono"], [1, "flex", "flex-col", "sm:flex-row", "items-stretch", "sm:items-center", "gap-3.5", "w-full", "lg:w-auto", "shrink-0"], [1, "flex", "items-center", "justify-between", "sm:justify-start", "gap-3", "bg-slate-950/60", "px-3.5", "py-2", "rounded-xl", "border", "border-slate-800/80"], [1, "text-xs", "text-slate-400", "font-mono", "font-medium", "shrink-0"], [1, "w-28", "sm:w-36", "bg-slate-800", "rounded-full", "h-2", "overflow-hidden", "shrink-0"], [1, "bg-indigo-500", "h-2", "rounded-full", "transition-all", "duration-500"], [1, "bg-slate-800/80", "hover:bg-slate-700", "text-indigo-300", "border", "border-indigo-500/40", "text-xs", "font-semibold", "py-2", "px-3.5", "rounded-lg", "transition-all", "flex", "items-center", "justify-center", "gap-1.5", "cursor-pointer", "font-cairo", "shadow-sm", "hover:border-indigo-500/60", "active:scale-95", "shrink-0", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5", "text-indigo-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-8", "w-8", "text-indigo-500"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5", "shrink-0", "mt-0.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"], [1, "hidden", "md:block", "overflow-x-auto"], [1, "w-full", "text-left", "rtl:text-right", "font-sans"], [1, "text-slate-400", "text-xs", "font-bold", "uppercase", "border-b", "border-slate-800/80"], [1, "px-6", "py-4", "font-cairo"], [1, "px-6", "py-4", "text-center", "font-cairo"], [1, "divide-y", "divide-slate-800/60", "text-sm"], [1, "hover:bg-slate-900/40", "transition-colors", "duration-150", "text-slate-300", "cursor-pointer", 3, "opacity-60"], [1, "block", "md:hidden", "space-y-3"], [1, "bg-slate-950", "border", "border-slate-800", "rounded-xl", "p-4", "space-y-3", "shadow-md", "cursor-pointer", "hover:border-indigo-500/50", "transition-all", 3, "opacity-60"], [1, "py-8", "text-center", "text-slate-500", "font-cairo", "text-sm"], [1, "hover:bg-slate-900/40", "transition-colors", "duration-150", "text-slate-300", "cursor-pointer", 3, "click"], [1, "px-6", "py-4"], [1, "font-bold", "text-white", "hover:text-indigo-400", "transition-colors", "duration-200", "flex", "items-center", "gap-1.5", "font-cairo"], [1, "text-amber-500"], [1, "px-1.5", "py-0.5", "rounded", "text-[8px]", "font-bold", "uppercase", "bg-indigo-500/20", "text-indigo-400", "border", "border-indigo-500/30"], [1, "block", "text-xs", "font-normal", "text-slate-500", "mt-0.5", "max-w-xs", "truncate", "font-cairo"], [1, "px-6", "py-4", "text-slate-400", "font-medium", "font-cairo"], [1, "px-6", "py-4", "font-mono", "tabular-nums", "text-emerald-400", "font-bold"], [1, "px-6", "py-4", "text-center"], [1, "px-2.5", "py-1", "rounded-full", "text-[10px]", "font-bold", "tracking-wider", "uppercase", "bg-emerald-500/10", "text-emerald-400", "border", "border-emerald-500/20", "font-cairo"], [1, "px-2.5", "py-1", "rounded-full", "text-[10px]", "font-bold", "tracking-wider", "uppercase", "bg-amber-500/10", "text-amber-400", "border", "border-amber-500/20", "font-cairo"], [1, "px-2.5", "py-1", "rounded-full", "text-[10px]", "font-bold", "tracking-wider", "bg-amber-500/10", "text-amber-400", "border", "border-amber-500/20", "font-cairo"], [1, "px-2.5", "py-1", "rounded-full", "text-[10px]", "font-bold", "tracking-wider", "uppercase", "bg-slate-800", "text-slate-400", "border", "border-slate-700", "font-cairo"], [1, "px-6", "py-4", "text-center", "font-cairo", "text-xs", "font-semibold"], [1, "px-6", "py-4", "text-slate-400", "font-mono", "tabular-nums"], ["colspan", "6", 1, "px-6", "py-16", "text-center", "text-slate-500", "text-sm"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-12", "w-12", "text-slate-700", "mx-auto", "mb-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.2", "d", "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"], [1, "font-bold", "text-slate-400", "font-cairo"], [1, "text-xs", "text-slate-500", "mt-1", "font-cairo"], [1, "bg-slate-950", "border", "border-slate-800", "rounded-xl", "p-4", "space-y-3", "shadow-md", "cursor-pointer", "hover:border-indigo-500/50", "transition-all", 3, "click"], [1, "flex", "items-center", "justify-between", "gap-2", "border-b", "border-slate-800/80", "pb-2.5"], [1, "font-bold", "text-white", "flex", "items-center", "gap-1.5", "font-cairo"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "uppercase", "bg-emerald-500/10", "text-emerald-400", "border", "border-emerald-500/20", "font-cairo"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "bg-amber-500/10", "text-amber-400", "border", "border-amber-500/20", "font-cairo"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "bg-slate-800", "text-slate-400", "border", "border-slate-700", "font-cairo"], [1, "text-xs", "text-slate-400", "font-cairo", "flex", "items-center", "justify-between"], [1, "font-mono", "tabular-nums", "text-emerald-400", "font-bold"], [1, "text-[11px]", "text-slate-500", "font-cairo", "flex", "items-center", "justify-between", "pt-1", "border-t", "border-slate-900"], [1, "font-mono", "tabular-nums"], [1, "hidden", "md:block", "overflow-x-auto", "font-sans"], [1, "w-full", "text-left", "rtl:text-right"], [1, "border-b", "border-slate-800", "text-slate-500", "text-xs", "font-bold", "uppercase", "tracking-wider", "bg-slate-950/40"], [1, "hover:bg-slate-900/40", "transition-colors", "duration-150", "text-slate-300"], [1, "flex", "items-center", "justify-between", "gap-3"], [1, "min-w-0"], [1, "font-bold", "text-white", "truncate"], [1, "mt-1", "inline-flex", "items-center", "gap-2", "text-xs", "font-semibold"], [1, "h-2.5", "w-2.5", "rounded-full", "shadow-[0_0_10px_currentColor]"], [1, "mt-2", "inline-flex", "rounded-full", "border", "border-slate-700", "bg-slate-900/80", "px-2", "py-0.5", "text-[10px]", "font-bold", "uppercase", "tracking-wider", "text-slate-400"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "rounded-full", "border", "px-2", "py-1.5", "transition-all", "duration-200", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"], ["viewBox", "0 0 24 24", "fill", "none", 1, "h-4", "w-4", "animate-spin"], [1, "text-[10px]", "font-bold", "uppercase", "tracking-wider"], [1, "px-6", "py-4", "font-medium", "text-slate-300"], [1, "px-2.5", "py-1", "rounded-full", "text-[10px]", "font-bold", "tracking-wider", "uppercase", "font-cairo"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-1.5", "rounded-lg", "text-xs", "font-semibold", "bg-emerald-500/10", "text-emerald-400", "border", "border-emerald-500/20", "hover:bg-emerald-500/20", "transition-colors", "cursor-pointer", "font-cairo"], [1, "text-slate-600", "text-xs"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "3", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-90"], [1, "h-2.5", "w-2.5", "rounded-full"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-1.5", "rounded-lg", "text-xs", "font-semibold", "bg-emerald-500/10", "text-emerald-400", "border", "border-emerald-500/20", "hover:bg-emerald-500/20", "transition-colors", "cursor-pointer", "font-cairo", 3, "click"], ["colspan", "8", 1, "px-6", "py-12", "text-center", "text-slate-500", "font-cairo", "text-sm"], [1, "w-full", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "py-3", "rounded-xl", "font-bold", "font-cairo", "text-sm", "shadow-lg", "shadow-indigo-600/30", "active:scale-95", "transition-all", "flex", "items-center", "justify-center", "gap-2"], [1, "w-full", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "py-3", "rounded-xl", "font-bold", "font-cairo", "text-sm", "shadow-lg", "shadow-indigo-600/30", "active:scale-95", "transition-all", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "absolute", "inset-0", "bg-slate-950/80", "backdrop-blur-sm"], [1, "relative", "z-10", "w-full", "max-w-2xl", "mx-auto", "my-auto", "max-h-[92vh]", "flex", "flex-col", "bg-slate-950", "border", "border-slate-900", "rounded-t-2xl", "md:rounded-2xl", "overflow-hidden", "shadow-2xl", "shadow-black/50"], [1, "flex", "items-start", "justify-between", "p-5", "pb-3", "border-b", "border-slate-800/60", "bg-slate-950/60"], [1, "text-xl", "font-bold", "text-white", "font-cairo", "flex", "items-center", "gap-2"], [1, "text-xs", "font-semibold", "px-2.5", "py-0.5", "rounded-full", "bg-indigo-500/10", "text-indigo-400", "border", "border-indigo-500/20", "font-mono"], [1, "text-xs", "text-slate-400", "mt-1", "font-cairo"], [1, "p-1.5", "rounded-lg", "text-slate-500", "hover:text-white", "hover:bg-slate-800", "transition-colors", "duration-150", "cursor-pointer", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "flex", "border-b", "border-slate-800", "bg-slate-950/40", "px-4", "sm:px-6", "overflow-x-auto", "whitespace-nowrap", "scrollbar-none"], ["type", "button", 1, "py-3", "px-3.5", "text-xs", "sm:text-sm", "font-bold", "border-b-2", "transition-all", "duration-200", "cursor-pointer", "font-cairo", "flex", "items-center", "gap-2", "shrink-0", 3, "click"], [1, "flex-1", "flex", "flex-col", "min-h-0", "overflow-hidden", 3, "ngSubmit", "formGroup"], [1, "flex-1", "overflow-y-auto", "min-h-0", "p-5", "sm:p-6", "space-y-4"], [1, "mb-4", "rounded-xl", "bg-red-500/10", "border", "border-red-500/30", "p-4", "text-xs", "text-red-400", "space-y-1"], [1, "space-y-4", "animate-fade-in"], [1, "px-6", "py-4", "bg-slate-950/90", "border-t", "border-slate-900", "flex", "flex-col-reverse", "sm:flex-row", "items-center", "justify-between", "gap-3", "shrink-0"], [1, "flex", "items-center", "gap-2", "w-full", "sm:w-auto", "justify-between", "sm:justify-start"], ["type", "button", 1, "px-4", "py-2", "text-xs", "sm:text-sm", "font-semibold", "rounded-xl", "text-slate-300", "hover:text-white", "bg-slate-800", "hover:bg-slate-700", "border", "border-slate-700", "transition-all", "duration-200", "cursor-pointer", "font-cairo", "flex", "items-center", "gap-1.5"], ["type", "button", 1, "px-5", "py-2", "text-xs", "sm:text-sm", "font-semibold", "rounded-xl", "text-white", "bg-indigo-600", "hover:bg-indigo-500", "transition-all", "duration-200", "cursor-pointer", "font-cairo", "flex", "items-center", "gap-1.5", "shadow-md", "shadow-indigo-600/20"], [1, "flex", "items-center", "gap-3", "w-full", "sm:w-auto", "justify-end"], ["type", "button", 1, "px-4", "py-2", "text-xs", "sm:text-sm", "font-semibold", "rounded-xl", "text-slate-400", "hover:text-white", "bg-slate-950", "hover:bg-slate-800", "border", "border-slate-800", "transition-all", "duration-200", "cursor-pointer", "font-cairo", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-xs", "sm:text-sm", "font-bold", "rounded-xl", "text-white", "bg-indigo-600", "hover:bg-indigo-500", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "duration-200", "hover:scale-105", "active:scale-95", "cursor-pointer", "font-cairo", "shadow-lg", "shadow-indigo-600/30", "flex", "items-center", "gap-2", 3, "disabled"], [1, "font-bold", "block", "mb-1", "font-cairo"], ["for", "proj-name", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], [1, "text-red-400"], ["id", "proj-name", "type", "text", "formControlName", "name", "placeholder", "e.g. \u0628\u0631\u062C \u0627\u0644\u0639\u0627\u0635\u0645\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], [1, "text-[10px]", "text-rose-400", "mt-1", "font-cairo"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], ["for", "proj-client", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "proj-client", "type", "text", "formControlName", "client", "placeholder", "e.g. \u0634\u0631\u0643\u0629 \u0623\u0648\u0631\u0627\u0633\u0643\u0648\u0645 \u0644\u0644\u0627\u0646\u0634\u0627\u0621\u0627\u062A", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], ["for", "proj-budget", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "proj-budget", "type", "number", "formControlName", "budget", "placeholder", "e.g. 15000000", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], ["for", "proj-start", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "proj-start", "type", "date", "formControlName", "startDate", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], ["for", "proj-end", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "proj-end", "type", "date", "formControlName", "endDate", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], ["for", "proj-gov", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "proj-gov", "formControlName", "governorate", 1, "w-full", "px-3", "py-2.5", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all"], ["value", "", "disabled", "", "selected", ""], ["value", "Cairo"], ["value", "Giza"], ["value", "Alexandria"], ["value", "Qalyubia"], ["value", "Gharbia"], ["value", "Dakahlia"], ["value", "Sharqia"], ["value", "Monufia"], ["value", "Beheira"], ["value", "Kafr El Sheikh"], ["value", "Damietta"], ["value", "Port Said"], ["value", "Ismailia"], ["value", "Suez"], ["value", "Aswan"], ["value", "Luxor"], ["value", "Red Sea"], ["value", "Matrouh"], ["for", "proj-city", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "proj-city", "type", "text", "formControlName", "cityOrZone", "placeholder", "e.g. \u0627\u0644\u062A\u062C\u0645\u0639 \u0627\u0644\u062E\u0627\u0645\u0633", 1, "w-full", "px-3", "py-2.5", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all"], ["for", "proj-address", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "proj-address", "type", "text", "formControlName", "siteAddress", "placeholder", "e.g. \u0634\u0627\u0631\u0639 \u0627\u0644\u062A\u0633\u0639\u064A\u0646 \u0627\u0644\u0634\u0645\u0627\u0644\u064A\u060C \u0642\u0637\u0639\u0629 44", 1, "w-full", "px-3", "py-2.5", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all"], ["for", "proj-cat", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "proj-cat", "formControlName", "category", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], ["value", "Residential"], ["value", "Commercial"], ["value", "Administrative"], ["value", "Industrial"], ["value", "Other"], ["for", "proj-client-wh", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "proj-client-wh", "type", "text", "formControlName", "clientWhatsApp", "placeholder", "e.g. +201012345678", 1, "w-full", "px-3", "py-2.5", "bg-slate-950", "border", "border-slate-700", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all"], ["for", "proj-status", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "proj-status", "formControlName", "status", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], ["value", "Active"], ["value", "Delayed"], ["value", "Completed"], [1, "flex", "items-center", "gap-3", "py-1.5", "bg-slate-950/40", "border", "border-slate-800/80", "rounded-xl", "p-3.5"], ["id", "proj-pub", "type", "checkbox", "formControlName", "isPublicPortfolio", 1, "h-4", "w-4", "rounded", "border-slate-700", "text-indigo-600", "bg-slate-950", "focus:ring-0"], ["for", "proj-pub", 1, "text-xs", "text-slate-300", "font-cairo", "font-semibold", "cursor-pointer", "select-none"], ["for", "proj-desc", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "proj-desc", "formControlName", "description", "rows", "3", "placeholder", "\u0646\u0637\u0627\u0642 \u0648\u0631\u0624\u064A\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629...", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "resize-none"], ["type", "button", 1, "px-4", "py-2", "text-xs", "sm:text-sm", "font-semibold", "rounded-xl", "text-slate-300", "hover:text-white", "bg-slate-800", "hover:bg-slate-700", "border", "border-slate-700", "transition-all", "duration-200", "cursor-pointer", "font-cairo", "flex", "items-center", "gap-1.5", 3, "click"], ["type", "button", 1, "px-5", "py-2", "text-xs", "sm:text-sm", "font-semibold", "rounded-xl", "text-white", "bg-indigo-600", "hover:bg-indigo-500", "transition-all", "duration-200", "cursor-pointer", "font-cairo", "flex", "items-center", "gap-1.5", "shadow-md", "shadow-indigo-600/20", 3, "click"], [1, "absolute", "inset-0", "bg-slate-950/85", "backdrop-blur-md", "transition-opacity", "duration-300", 3, "click"], [1, "relative", "bg-slate-900", "border", "border-slate-800", "rounded-3xl", "max-w-3xl", "w-full", "max-h-[92vh]", "flex", "flex-col", "p-0", "shadow-2xl", "z-10", "font-sans", "overflow-hidden"], [1, "px-6", "py-5", "border-b", "border-slate-800/80", "flex", "items-center", "justify-between", "bg-slate-950/40"], [1, "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "rounded-2xl", "bg-gradient-to-br", "from-indigo-500/20", "to-purple-500/20", "border", "border-indigo-500/30", "flex", "items-center", "justify-center", "text-indigo-400"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 10V3L4 14h7v7l9-11h-7z"], [1, "text-xl", "font-black", "text-white", "font-cairo", "tracking-wide"], [1, "text-xs", "text-slate-400", "font-cairo", "mt-0.5"], [1, "p-2", "rounded-xl", "bg-slate-800/50", "border", "border-slate-700/50", "text-slate-400", "hover:text-white", "hover:bg-slate-800", "transition-colors", "duration-150", "cursor-pointer", 3, "click"], [1, "overflow-y-auto", "min-h-0", "p-6", "space-y-5"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-5"], [1, "p-5", "bg-slate-950", "border", "border-slate-800", "rounded-2xl", "flex", "flex-col", "justify-between", "hover:border-emerald-500/70", "transition-all", "duration-200", "shadow-lg", "relative", "group"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "px-2.5", "py-0.5", "text-[10px]", "font-bold", "text-emerald-400", "bg-emerald-950/60", "border", "border-emerald-500/30", "rounded-full", "font-cairo"], [1, "text-xl", "font-black", "text-emerald-400", "font-mono"], [1, "w-10", "h-10", "rounded-xl", "bg-emerald-600/20", "border", "border-emerald-500/30", "flex", "items-center", "justify-center", "mb-3", "text-emerald-400"], [1, "font-bold", "text-base", "text-white", "font-cairo"], [1, "text-xs", "text-slate-400", "font-cairo", "mt-1", "leading-relaxed"], [1, "mt-4", "pt-3", "border-t", "border-slate-800/60"], [1, "w-full", "py-2.5", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "font-bold", "text-xs", "rounded-xl", "font-cairo", "transition-all", "duration-200", "flex", "items-center", "justify-center", "gap-2", "shadow-lg", "shadow-emerald-600/20", "cursor-pointer", 3, "click"], [1, "p-5", "bg-gradient-to-br", "from-indigo-950/40", "via-slate-950", "to-amber-950/20", "border-2", "border-amber-500/70", "rounded-2xl", "flex", "flex-col", "justify-between", "hover:border-amber-400", "transition-all", "duration-200", "shadow-xl", "shadow-amber-500/10", "relative", "overflow-hidden"], [1, "absolute", "top-0", "right-0", "bg-gradient-to-r", "from-amber-500", "to-orange-500", "text-white", "text-[9px]", "font-black", "uppercase", "px-2.5", "py-0.5", "rounded-bl-xl", "font-cairo", "shadow-md"], [1, "pt-2"], [1, "px-2.5", "py-0.5", "text-[10px]", "font-bold", "text-amber-300", "bg-amber-950/80", "border", "border-amber-500/40", "rounded-full", "font-cairo"], [1, "text-left", "rtl:text-right"], [1, "text-xl", "font-black", "text-amber-400", "font-mono"], [1, "block", "text-[10px]", "text-slate-500", "line-through", "font-mono"], [1, "w-10", "h-10", "rounded-xl", "bg-gradient-to-br", "from-amber-500", "to-orange-600", "flex", "items-center", "justify-center", "mb-3", "text-white"], [1, "text-xs", "text-slate-300", "font-cairo", "mt-1", "leading-relaxed"], [1, "mt-4", "pt-3", "border-t", "border-amber-500/30"], [1, "w-full", "py-2.5", "bg-gradient-to-r", "from-amber-500", "via-indigo-600", "to-purple-600", "hover:from-amber-400", "hover:to-indigo-500", "text-white", "font-black", "text-xs", "rounded-xl", "font-cairo", "transition-all", "duration-200", "flex", "items-center", "justify-center", "gap-2", "shadow-xl", "shadow-indigo-600/30", "cursor-pointer", 3, "click"], [1, "px-6", "py-4", "border-t", "border-slate-800/80", "bg-slate-950/40", "flex", "justify-end"], [1, "px-5", "py-2", "text-xs", "font-semibold", "rounded-xl", "text-slate-400", "hover:text-white", "bg-slate-800/60", "hover:bg-slate-800", "border", "border-slate-700/50", "transition-all", "duration-200", "cursor-pointer", "font-cairo", 3, "click"], [1, "relative", "bg-slate-900", "border", "border-slate-800", "rounded-3xl", "max-w-lg", "w-full", "max-h-[92vh]", "flex", "flex-col", "p-0", "shadow-2xl", "z-10", "font-sans", "overflow-hidden"], [1, "overflow-y-auto", "min-h-0", "p-6", "space-y-5", "text-right", "rtl:text-left", "font-cairo"], [1, "px-6", "py-4", "border-b", "border-slate-800", "flex", "items-center", "justify-between", "bg-slate-950/40"], [1, "w-9", "h-9", "rounded-xl", "bg-indigo-500/20", "border", "border-indigo-500/30", "flex", "items-center", "justify-center", "text-indigo-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"], [1, "text-lg", "font-bold", "text-white", "font-cairo"], [1, "p-1.5", "rounded-lg", "bg-slate-800/50", "border", "border-slate-700/50", "text-slate-400", "hover:text-white", "hover:bg-slate-800", "transition-colors", 3, "click"], [1, "overflow-y-auto", "min-h-0", "p-6", "space-y-5", "text-right", "rtl:text-left"], [1, "p-4", "bg-slate-950/60", "border", "border-slate-800", "rounded-2xl", "space-y-2.5"], [1, "flex", "items-center", "justify-between", "text-sm", "font-bold", "text-white", "font-cairo"], [1, "font-mono", "text-indigo-400"], [1, "flex", "items-center", "justify-between", "text-xs", "text-slate-400", "font-cairo"], [1, "font-mono"], [1, "pt-2", "border-t", "border-slate-800", "flex", "items-center", "justify-between", "text-base", "font-black", "text-emerald-400", "font-cairo"], [1, "font-mono", "text-lg"], [1, "block", "text-xs", "font-bold", "text-slate-300", "font-cairo", "mb-2"], [1, "grid", "grid-cols-3", "gap-2"], ["type", "button", 1, "p-3", "border", "border-slate-800", "rounded-xl", "flex", "flex-col", "items-center", "gap-1.5", "hover:border-slate-700", "transition-all", "cursor-pointer", 3, "click"], [1, "text-lg"], [1, "text-[11px]", "font-bold", "text-white", "font-cairo"], [1, "space-y-3", "pt-1"], [1, "p-3", "bg-emerald-950/30", "border", "border-emerald-500/20", "rounded-xl", "text-[11px]", "text-emerald-300", "font-cairo", "flex", "items-center", "gap-2"], [1, "px-6", "py-4", "border-t", "border-slate-800", "bg-slate-950/40", "flex", "items-center", "justify-between", "gap-3"], [1, "px-4", "py-2", "text-xs", "font-semibold", "rounded-xl", "text-slate-400", "hover:text-white", "bg-slate-800/60", "hover:bg-slate-800", "border", "border-slate-700/50", "transition-all", "font-cairo", "cursor-pointer", 3, "click"], [1, "px-6", "py-2.5", "bg-gradient-to-r", "from-emerald-600", "to-indigo-600", "hover:from-emerald-500", "hover:to-indigo-500", "text-white", "font-bold", "text-xs", "rounded-xl", "font-cairo", "transition-all", "shadow-lg", "shadow-emerald-600/20", "disabled:opacity-50", "flex", "items-center", "gap-2", "cursor-pointer", 3, "click", "disabled"], [1, "block", "text-[11px]", "text-slate-400", "font-cairo", "mb-1"], ["type", "text", "value", "Structo Client", 1, "w-full", "px-3", "py-2", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-xs", "text-white", "focus:outline-none", "focus:border-indigo-500", "font-cairo"], ["type", "text", "value", "4242 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 4242", 1, "w-full", "px-3", "py-2", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-xs", "text-white", "focus:outline-none", "focus:border-indigo-500", "font-mono"], [1, "grid", "grid-cols-2", "gap-3"], ["type", "text", "value", "12/28", 1, "w-full", "px-3", "py-2", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-xs", "text-white", "focus:outline-none", "focus:border-indigo-500", "font-mono", "text-center"], ["type", "password", "value", "123", 1, "w-full", "px-3", "py-2", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-xs", "text-white", "focus:outline-none", "focus:border-indigo-500", "font-mono", "text-center"], ["type", "text", "placeholder", "01012345678", "value", "01004500766", 1, "w-full", "px-3", "py-2", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "text-xs", "text-white", "focus:outline-none", "focus:border-indigo-500", "font-mono"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "-ml-1", "mr-2", "h-4", "w-4", "text-white"], ["dir", "rtl", 1, "p-6", "bg-gradient-to-br", "from-slate-900", "via-slate-900", "to-indigo-950/60", "border", "border-indigo-500/30", "rounded-2xl", "relative", "shadow-xl", "print-only", "space-y-4", "text-right", "font-cairo"], [1, "flex", "items-center", "justify-between", "border-b", "border-slate-800", "pb-3.5", "mb-1"], [1, "w-12", "h-12", "bg-indigo-500/20", "border", "border-indigo-500/40", "rounded-xl", "flex", "items-center", "justify-center", "text-indigo-400", "text-2xl", "font-bold"], [1, "font-black", "text-lg", "text-white"], [1, "text-[11px]", "text-indigo-400", "font-mono", "tracking-wider"], [1, "text-left", "font-mono"], [1, "px-3", "py-1", "text-xs", "font-bold", "text-emerald-300", "bg-emerald-950/90", "border", "border-emerald-500/40", "rounded-lg", "inline-block", "mb-1"], [1, "text-[10px]", "text-slate-400"], [1, "text-amber-400", "font-mono"], [1, "flex", "items-center", "justify-between", "bg-slate-950/80", "border", "border-slate-800", "p-3", "rounded-xl"], [1, "font-black", "text-xs", "text-white"], [1, "text-[10px]", "font-mono", "text-indigo-300", "bg-indigo-950", "border", "border-indigo-500/30", "px-2.5", "py-1", "rounded"], [1, "grid", "grid-cols-2", "gap-3", "text-xs"], [1, "p-3", "bg-slate-950/60", "rounded-xl", "border", "border-slate-850", "space-y-1"], [1, "text-[10px]", "text-slate-400", "block", "font-cairo"], [1, "font-bold", "text-white", "block", "font-cairo"], [1, "text-[10px]", "text-slate-400", "font-mono", "block"], [1, "font-bold", "text-white", "block", "font-cairo", "truncate"], [1, "text-[10px]", "text-slate-400", "font-mono", "block", "truncate"], [1, "border", "border-slate-800", "rounded-xl", "overflow-hidden", "text-xs"], [1, "w-full", "text-right", "font-cairo"], [1, "bg-slate-950", "text-slate-300", "font-bold", "border-b", "border-slate-800", "text-[11px]"], [1, "p-2.5"], [1, "p-2.5", "text-center"], [1, "p-2.5", "text-left"], [1, "divide-y", "divide-slate-850", "bg-slate-900/60"], [1, "font-bold", "text-white", "block"], [1, "text-[10px]", "text-slate-400", "block"], [1, "p-2.5", "text-center", "font-mono", "font-bold", "text-slate-200"], [1, "p-2.5", "text-left", "font-mono", "font-black", "text-amber-400", "text-sm"], [1, "grid", "grid-cols-3", "gap-2.5", "text-xs"], [1, "p-2.5", "bg-slate-950/60", "rounded-xl", "border", "border-slate-850"], [1, "text-[10px]", "text-slate-400", "block", "mb-0.5", "font-cairo"], [1, "font-bold", "text-white", "font-cairo", "text-xs"], [1, "font-bold", "text-emerald-400", "font-cairo", "text-xs"], [1, "font-mono", "font-bold", "text-amber-400", "text-xs"], [1, "p-3.5", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "flex", "items-center", "justify-between"], [1, "text-xs", "font-bold", "text-white", "font-cairo", "block"], [1, "text-[10px]", "text-slate-400", "font-mono"], [1, "text-xl", "font-black", "font-mono", "text-amber-400"], [1, "pt-2", "border-t", "border-slate-800", "flex", "items-center", "justify-between", "text-[10px]", "text-slate-400", "font-cairo"], [1, "font-mono", "text-slate-500"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-3", "pt-1", "no-print"], [1, "py-3", "px-4", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "font-bold", "text-xs", "rounded-xl", "transition-all", "shadow-lg", "shadow-emerald-600/20", "flex", "items-center", "justify-center", "gap-2", "cursor-pointer", 3, "click"], [1, "py-3", "px-4", "bg-slate-800", "hover:bg-slate-700", "text-slate-200", "font-bold", "text-xs", "rounded-xl", "border", "border-slate-700", "transition-all", "flex", "items-center", "justify-center", "gap-2", "cursor-pointer", 3, "click"], [1, "pt-2", "no-print"], [1, "w-full", "py-3", "bg-gradient-to-r", "from-indigo-600", "to-purple-600", "hover:from-indigo-500", "hover:to-purple-500", "text-white", "font-bold", "text-xs", "rounded-xl", "transition-all", "shadow-xl", "shadow-indigo-600/30", "cursor-pointer", 3, "click"], [1, "absolute", "inset-0", "bg-slate-950/80", "backdrop-blur-sm", 3, "click"], [1, "relative", "z-10", "w-full", "max-w-2xl", "mx-auto", "my-auto", "p-4", "md:p-6", "max-h-[92vh]", "flex", "flex-col", "bg-slate-950", "border", "border-slate-900", "rounded-xl", "overflow-hidden", "shadow-2xl", "shadow-black/50"], [1, "flex", "items-start", "justify-between", "mb-6"], [1, "text-xl", "font-bold", "text-white", "font-cairo"], [1, "mb-5", "rounded-xl", "bg-red-500/10", "border", "border-red-500/30", "p-4", "text-xs", "text-red-400", "space-y-1"], ["autocomplete", "off", 1, "space-y-4", "overflow-y-auto", "min-h-0", "pr-1", 3, "ngSubmit", "formGroup"], ["for", "usr-first", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "usr-first", "type", "text", "formControlName", "firstName", "autocomplete", "off", "placeholder", "e.g. Ahmed", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "placeholder-slate-600"], ["for", "usr-last", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "usr-last", "type", "text", "formControlName", "lastName", "autocomplete", "off", "placeholder", "e.g. Ali", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "placeholder-slate-600"], ["for", "usr-email", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "usr-email", "type", "email", "formControlName", "email", "autocomplete", "off", "placeholder", "e.g. ahmed.ali@company.com", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "placeholder-slate-600"], [1, "mt-1.5", "text-xs", "text-indigo-400/80", "font-cairo", "leading-relaxed"], ["for", "usr-contact-phone", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "usr-contact-phone", "type", "tel", "formControlName", "personalPhone", "inputmode", "numeric", "maxlength", "11", "placeholder", "01xxxxxxxxx", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "placeholder-slate-600"], ["for", "usr-whatsapp-phone", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "usr-whatsapp-phone", "type", "tel", "formControlName", "whatsAppPhone", "inputmode", "numeric", "maxlength", "11", "placeholder", "01xxxxxxxxx", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "placeholder-slate-600"], ["for", "usr-pass", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "usr-pass", "type", "password", "formControlName", "password", "autocomplete", "new-password", "placeholder", "Min 6 characters", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200", "placeholder-slate-600"], ["for", "usr-role", 1, "block", "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5", "font-cairo"], ["id", "usr-role", "formControlName", "role", 1, "w-full", "px-3", "py-2.5", "border", "border-slate-700", "bg-slate-950", "rounded-xl", "text-slate-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500/40", "focus:border-indigo-500", "transition-all", "duration-200"], ["value", "Manager"], ["value", "Accountant"], ["value", "SiteEngineer"], ["value", "DesignEngineer"], [1, "flex", "flex-col-reverse", "md:flex-row", "justify-end", "gap-3", "w-full", "p-4", "border-t", "border-slate-900"], ["type", "button", 1, "w-full", "md:w-auto", "px-4", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-slate-400", "hover:text-white", "bg-slate-950", "hover:bg-slate-800", "border", "border-slate-800", "transition-all", "duration-200", "cursor-pointer", "font-cairo", 3, "click"], ["type", "submit", 1, "w-full", "md:w-auto", "px-5", "py-2", "text-sm", "font-semibold", "rounded-xl", "text-white", "bg-indigo-600", "hover:bg-indigo-700", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "duration-200", "hover:scale-105", "active:scale-95", "cursor-pointer", "font-cairo", 3, "disabled"], [1, "p-1.5", "bg-emerald-500/30", "rounded-xl", "text-white", "shrink-0"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M5 13l4 4L19 7"], [1, "font-bold"]], template: function ProjectsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275conditionalCreate(4, ProjectsComponent_Conditional_4_Template, 2, 3)(5, ProjectsComponent_Conditional_5_Template, 2, 3)(6, ProjectsComponent_Conditional_6_Template, 2, 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 3);
      \u0275\u0275conditionalCreate(8, ProjectsComponent_Conditional_8_Template, 2, 3)(9, ProjectsComponent_Conditional_9_Template, 2, 3)(10, ProjectsComponent_Conditional_10_Template, 2, 3);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 4);
      \u0275\u0275conditionalCreate(12, ProjectsComponent_Conditional_12_Template, 5, 3, "button", 5)(13, ProjectsComponent_Conditional_13_Template, 5, 3, "button", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(14, ProjectsComponent_Conditional_14_Template, 11, 39, "div", 7);
      \u0275\u0275conditionalCreate(15, ProjectsComponent_Conditional_15_Template, 23, 16);
      \u0275\u0275conditionalCreate(16, ProjectsComponent_Conditional_16_Template, 20, 13);
      \u0275\u0275conditionalCreate(17, ProjectsComponent_Conditional_17_Template, 1, 0, "app-tenant-profile");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(18, ProjectsComponent_Conditional_18_Template, 3, 1, "div", 8);
      \u0275\u0275conditionalCreate(19, ProjectsComponent_Conditional_19_Template, 53, 51, "div", 9);
      \u0275\u0275conditionalCreate(20, ProjectsComponent_Conditional_20_Template, 61, 3, "div", 10);
      \u0275\u0275conditionalCreate(21, ProjectsComponent_Conditional_21_Template, 5, 1, "div", 10);
      \u0275\u0275conditionalCreate(22, ProjectsComponent_Conditional_22_Template, 82, 42, "div", 11);
      \u0275\u0275conditionalCreate(23, ProjectsComponent_Conditional_23_Template, 6, 1, "div", 12);
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.activeTab() === "projects" ? 4 : ctx.activeTab() === "users" ? 5 : 6);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.activeTab() === "projects" ? 8 : ctx.activeTab() === "users" ? 9 : 10);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.activeTab() === "projects" && ctx.currentUserRole() === "TenantOwner" ? 12 : ctx.activeTab() === "users" ? 13 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.currentUserRole() === "TenantOwner" ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "projects" ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "users" && ctx.currentUserRole() === "TenantOwner" ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "profile" && ctx.currentUserRole() === "TenantOwner" ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentUserRole() === "TenantOwner" ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isProjectModalOpen() ? 19 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isUpgradeModalOpen() ? 20 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isCheckoutModalOpen() ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isUserModalOpen() ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.profileSuccessMessage() ? 23 : -1);
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, TenantProfileComponent, DatePipe, DecimalPipe, TranslatePipe], styles: ['\n.font-cairo[_ngcontent-%COMP%] {\n  font-family:\n    "Cairo",\n    "Inter",\n    sans-serif;\n}\n#profile-map[_ngcontent-%COMP%], \n#map[_ngcontent-%COMP%] {\n  height: 350px !important;\n  min-height: 350px !important;\n  width: 100% !important;\n  display: block !important;\n}\n@keyframes _ngcontent-%COMP%_slide-in-toast {\n  from {\n    opacity: 0;\n    transform: translateY(12px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.animate-slide-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slide-in-toast 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n/*# sourceMappingURL=projects.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectsComponent, [{
    type: Component,
    args: [{ selector: "app-projects", standalone: true, imports: [ReactiveFormsModule, DatePipe, DecimalPipe, TranslatePipe, TenantProfileComponent], template: `
    <div class="space-y-6 w-full px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/60 pb-5">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-white font-cairo">
            @if (activeTab() === 'projects') {
              {{ 'PROJECTS.PAGE_TITLE' | translate }}
            } @else if (activeTab() === 'users') {
              {{ 'USERS.TAB_USERS' | translate }}
            } @else {
              {{ 'PROFILE.TAB_PROFILE' | translate }}
            }
          </h1>
          <p class="text-sm text-slate-400 mt-1">
            @if (activeTab() === 'projects') {
              {{ 'PROJECTS.PAGE_SUBTITLE' | translate }}
            } @else if (activeTab() === 'users') {
              {{ 'USERS.MODAL_SUBTITLE' | translate }}
            } @else {
              {{ 'MARKETPLACE.SECTION_SUBTITLE' | translate }}
            }
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          @if (activeTab() === 'projects' && currentUserRole() === 'TenantOwner') {
            <button
              id="btn-new-project"
              (click)="openProjectModal()"
              class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo text-sm w-full sm:w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              {{ 'PROJECTS.NEW_PROJECT' | translate }}
            </button>
          } @else if (activeTab() === 'users') {
            <button
              id="btn-new-user"
              (click)="openUserModal()"
              class="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold rounded-xl text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              {{ 'USERS.NEW_USER' | translate }}
            </button>
          }
        </div>
      </div>

      <!-- Navigation Tabs -->
      @if (currentUserRole() === 'TenantOwner') {
        <div class="border-b border-slate-800">
          <nav class="flex gap-8">
            <button 
              (click)="navigateToTab('projects')" 
              class="pb-4 text-sm font-bold border-b-2 cursor-pointer transition-all duration-200 font-cairo"
              [class.border-indigo-500]="activeTab() === 'projects'"
              [class.text-indigo-400]="activeTab() === 'projects'"
              [class.border-transparent]="activeTab() !== 'projects'"
              [class.text-slate-400]="activeTab() !== 'projects'"
              [class.hover:text-slate-200]="activeTab() !== 'projects'">
              {{ 'PROJECTS.PAGE_TITLE' | translate }}
            </button>
            <button 
              (click)="navigateToTab('users')" 
              class="pb-4 text-sm font-bold border-b-2 cursor-pointer transition-all duration-200 font-cairo"
              [class.border-indigo-500]="activeTab() === 'users'"
              [class.text-indigo-400]="activeTab() === 'users'"
              [class.border-transparent]="activeTab() !== 'users'"
              [class.text-slate-400]="activeTab() !== 'users'"
              [class.hover:text-slate-200]="activeTab() !== 'users'">
              {{ 'USERS.TAB_USERS' | translate }}
            </button>
            <button 
              (click)="navigateToTab('profile')" 
              class="pb-4 text-sm font-bold border-b-2 cursor-pointer transition-all duration-200 font-cairo"
              [class.border-indigo-500]="activeTab() === 'profile'"
              [class.text-indigo-400]="activeTab() === 'profile'"
              [class.border-transparent]="activeTab() !== 'profile'"
              [class.text-slate-400]="activeTab() !== 'profile'"
              [class.hover:text-slate-200]="activeTab() !== 'profile'">
              {{ 'PROFILE.TAB_PROFILE' | translate }}
            </button>
          </nav>
        </div>
      }

      <!-- SECTION 1: PROJECTS HUB -->
      @if (activeTab() === 'projects') {
        <!-- Sleek Dark-themed Quota & Consumption Indicator -->
        @if (currentUserRole() === 'TenantOwner' || currentUserRole() === 'Manager') {
          <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 backdrop-blur-sm">
            <!-- Right Side (RTL Start): Icon & Status Text -->
            <div class="flex items-center gap-3.5 w-full lg:w-auto">
              <div class="h-10 w-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 text-indigo-400 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h4 class="font-bold text-sm text-white font-cairo">\u0633\u0639\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639:</h4>
                  <span class="text-sm font-extrabold text-indigo-300 font-mono">
                    {{ usedProjectsCount() }} \u0645\u0646 \u0623\u0635\u0644 {{ allowedProjectsCount() }}
                  </span>
                </div>
                <p class="text-xs text-slate-400 mt-0.5 font-cairo">
                  \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u0647\u0644\u0643\u0629: <strong class="text-indigo-300 font-mono">{{ usedProjectsCount() }}</strong> \u0645\u0646 \u0623\u0635\u0644 <strong class="text-white font-mono">{{ allowedProjectsCount() }}</strong> \u0645\u062A\u0627\u062D \u0641\u064A \u0628\u0627\u0642\u062A\u0643 \u0627\u0644\u062D\u0627\u0644\u064A\u0629.
                </p>
              </div>
            </div>

            <!-- Left Side (RTL End): Clean Progress Bar & Secondary Upgrade Button -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
              <div class="flex items-center justify-between sm:justify-start gap-3 bg-slate-950/60 px-3.5 py-2 rounded-xl border border-slate-800/80">
                <span class="text-xs text-slate-400 font-mono font-medium shrink-0">
                  {{ usedProjectsCount() }} / {{ allowedProjectsCount() }} Projects Used
                </span>
                <div class="w-28 sm:w-36 bg-slate-800 rounded-full h-2 overflow-hidden shrink-0">
                  <div 
                    class="bg-indigo-500 h-2 rounded-full transition-all duration-500" 
                    [style.width.%]="(usedProjectsCount() / (allowedProjectsCount() || 1)) * 100 > 100 ? 100 : (usedProjectsCount() / (allowedProjectsCount() || 1)) * 100">
                  </div>
                </div>
              </div>

              <!-- Upgrade Button (Secondary / Subtle Action) -->
              <button 
                (click)="isUpgradeModalOpen.set(true)"
                class="bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border border-indigo-500/40 text-xs font-semibold py-2 px-3.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer font-cairo shadow-sm hover:border-indigo-500/60 active:scale-95 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>+ \u0634\u0631\u0627\u0621 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629</span>
              </button>
            </div>
          </div>
        }

        <!-- Projects Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'PROJECTS.STAT_TOTAL' | translate }}</span>
            <h3 class="text-3xl font-extrabold text-white mt-1">{{ projects().length }}</h3>
          </div>
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'PROJECTS.STAT_ACTIVE' | translate }}</span>
            <h3 class="text-3xl font-extrabold text-indigo-400 mt-1">{{ activeProjectsCount() }}</h3>
          </div>
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'PROJECTS.STAT_COMPLETED' | translate }}</span>
            <h3 class="text-3xl font-extrabold text-emerald-400 mt-1">{{ completedProjectsCount() }}</h3>
          </div>
        </div>

        <!-- Projects Loading State -->
        @if (isLoadingProjects()) {
          <div class="flex justify-center items-center py-20">
            <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        }

        <!-- Projects Error State -->
        @if (projectError()) {
          <div class="rounded-xl bg-red-500/10 border border-red-500/30 p-5 text-sm text-red-400 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{{ projectError() }}</span>
          </div>
        }

        <!-- Projects Grid / Table View -->
        @if (!isLoadingProjects()) {
          <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
            <!-- Desktop Table (md+) -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full text-left rtl:text-right font-sans">
              <thead>
                <tr class="text-slate-400 text-xs font-bold uppercase border-b border-slate-800/80">
                  <th class="px-6 py-4 font-cairo">{{ 'PROJECTS.TABLE_NAME' | translate }}</th>
                  <th class="px-6 py-4 font-cairo">{{ 'PROJECTS.TABLE_CLIENT' | translate }}</th>
                  @if (!isEngineer()) {
                    <th class="px-6 py-4 font-cairo">{{ 'PROJECTS.TABLE_BUDGET' | translate }}</th>
                  }
                  <th class="px-6 py-4 text-center font-cairo">{{ 'PROJECTS.TABLE_STATUS' | translate }}</th>
                  <th class="px-6 py-4 text-center font-cairo">{{ 'PROJECTS.FIELD_CATEGORY' | translate }}</th>
                  <th class="px-6 py-4 font-cairo">{{ 'PROJECTS.TABLE_START_DATE' | translate }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 text-sm">
                @for (proj of projects(); track proj.id) {
                  <tr 
                    (click)="viewDetails(proj.id)"
                    class="hover:bg-slate-900/40 transition-colors duration-150 text-slate-300 cursor-pointer"
                    [class.opacity-60]="proj.status === 'PendingActivation'">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <div class="font-bold text-white hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1.5 font-cairo">
                          @if (proj.status === 'PendingActivation') {
                            <span class="text-amber-500">\u{1F512}</span>
                          }
                          {{ proj.name }}
                        </div>
                        @if (proj.isPublicPortfolio) {
                          <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">Public</span>
                        }
                      </div>
                      <span class="block text-xs font-normal text-slate-500 mt-0.5 max-w-xs truncate font-cairo">
                        {{ proj.description || ('PROJECTS.NO_DESCRIPTION' | translate) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-slate-400 font-medium font-cairo">{{ proj.client }}</td>
                    @if (!isEngineer()) {
                      <td class="px-6 py-4 font-mono tabular-nums text-emerald-400 font-bold">
                        {{ proj.budget | number:'1.0-0' }} {{ 'COMMON.CURRENCY' | translate }}
                      </td>
                    }
                    <td class="px-6 py-4 text-center">
                      @if (proj.status === 'Active') {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-cairo">
                          {{ 'PROJECTS.STATUS.ACTIVE' | translate }}
                        </span>
                      } @else if (proj.status === 'Delayed') {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 font-cairo">
                          {{ 'PROJECTS.STATUS.DELAYED' | translate }}
                        </span>
                      } @else if (proj.status === 'PendingActivation') {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 font-cairo">
                          \u0642\u064A\u062F \u0627\u0644\u062A\u0641\u0639\u064A\u0644 / Pending
                        </span>
                      } @else if (proj.status === 'FinancialFreeze') {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 font-cairo">
                          {{ langService.currentLang() === 'ar' ? '\u0645\u062C\u0645\u0651\u062F' : 'Frozen' }}
                        </span>
                      } @else if (proj.status === 'Closed') {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-slate-400 border border-slate-700 font-cairo">
                          {{ langService.currentLang() === 'ar' ? '\u0645\u063A\u0644\u0642' : 'Closed' }}
                        </span>
                      } @else {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-slate-400 border border-slate-700 font-cairo">
                          {{ 'PROJECTS.STATUS.COMPLETED' | translate }}
                        </span>
                      }
                    </td>
                    <td class="px-6 py-4 text-center font-cairo text-xs font-semibold">
                      @if (proj.propertyType === 'Residential') {
                        \u{1F3E0} {{ langService.currentLang() === 'ar' ? '\u0633\u0643\u0646\u064A' : 'Residential' }}
                      } @else {
                        \u{1F3E2} {{ langService.currentLang() === 'ar' ? '\u0625\u062F\u0627\u0631\u064A' : 'Administrative' }}
                      }
                    </td>
                    <td class="px-6 py-4 text-slate-400 font-mono tabular-nums">{{ proj.startDate | date:'dd/MM/yyyy' }}</td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="px-6 py-16 text-center text-slate-500 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                      </svg>
                      <p class="font-bold text-slate-400 font-cairo">{{ 'PROJECTS.NO_PROJECTS' | translate }}</p>
                      <p class="text-xs text-slate-500 mt-1 font-cairo">{{ 'PROJECTS.CREATE_FIRST' | translate }}</p>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Mobile Cards View (< md) -->
          <div class="block md:hidden space-y-3">
            @for (proj of projects(); track proj.id) {
              <div 
                (click)="viewDetails(proj.id)"
                class="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 shadow-md cursor-pointer hover:border-indigo-500/50 transition-all"
                [class.opacity-60]="proj.status === 'PendingActivation'">
                <div class="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                  <div class="font-bold text-white flex items-center gap-1.5 font-cairo">
                    @if (proj.status === 'PendingActivation') {
                      <span class="text-amber-500">\u{1F512}</span>
                    }
                    {{ proj.name }}
                  </div>
                  @if (proj.status === 'Active') {
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-cairo">Active</span>
                  } @else if (proj.status === 'PendingActivation') {
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-cairo">Pending</span>
                  } @else if (proj.status === 'FinancialFreeze') {
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-cairo">Frozen</span>
                  } @else if (proj.status === 'Closed') {
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700 font-cairo">Closed</span>
                  } @else {
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700 font-cairo">{{ proj.status }}</span>
                  }
                </div>
                <div class="text-xs text-slate-400 font-cairo flex items-center justify-between">
                  <span>\u{1F464} {{ proj.client }}</span>
                  @if (!isEngineer()) {
                    <span class="font-mono tabular-nums text-emerald-400 font-bold">{{ proj.budget | number:'1.0-0' }} {{ 'COMMON.CURRENCY' | translate }}</span>
                  }
                </div>
                <div class="text-[11px] text-slate-500 font-cairo flex items-center justify-between pt-1 border-t border-slate-900">
                  <span>{{ proj.propertyType === 'Residential' ? '\u{1F3E0} Residential' : '\u{1F3E2} Administrative' }}</span>
                  <span class="font-mono tabular-nums">\u{1F4C5} {{ proj.startDate | date:'dd/MM/yyyy' }}</span>
                </div>
              </div>
            } @empty {
              <div class="py-8 text-center text-slate-500 font-cairo text-sm">
                {{ 'PROJECTS.NO_PROJECTS' | translate }}
              </div>
            }
          </div>
        </div>
      }
    }

      <!-- SECTION 2: COMPANY USERS MANAGEMENT -->
      @if (activeTab() === 'users' && currentUserRole() === 'TenantOwner') {
        <!-- Users Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'USERS.STAT_TOTAL' | translate }}</span>
            <h3 class="text-3xl font-extrabold text-white mt-1">{{ users().length }}</h3>
          </div>
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'USERS.STAT_MANAGERS' | translate }}</span>
            <h3 class="text-3xl font-extrabold text-indigo-400 mt-1">{{ managerCount() }}</h3>
          </div>
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'USERS.STAT_ENGINEERS' | translate }}</span>
            <h3 class="text-3xl font-extrabold text-emerald-400 mt-1">{{ engineerCount() }}</h3>
          </div>
        </div>

        <!-- Users Table View (Desktop md+) -->
        @if (!isLoadingUsers()) {
          <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
            <div class="hidden md:block overflow-x-auto font-sans">
              <table class="w-full text-left rtl:text-right">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wider bg-slate-950/40">
                    <th class="px-6 py-4 font-cairo">{{ 'USERS.TABLE_FIRST_NAME' | translate }}</th>
                    <th class="px-6 py-4 font-cairo">{{ 'USERS.TABLE_LAST_NAME' | translate }}</th>
                    <th class="px-6 py-4 font-cairo">{{ 'USERS.TABLE_EMAIL' | translate }}</th>
                    <th class="px-6 py-4 font-cairo">Contact</th>
                    <th class="px-6 py-4 font-cairo">WhatsApp</th>
                    <th class="px-6 py-4 text-center font-cairo">{{ 'USERS.TABLE_ROLE' | translate }}</th>
                    <th class="px-6 py-4 font-cairo">{{ 'USERS.TABLE_CREATED_AT' | translate }}</th>
                    <th class="px-6 py-4 text-center font-cairo">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm">
                  @for (usr of users(); track usr.id) {
                    <tr class="hover:bg-slate-900/40 transition-colors duration-150 text-slate-300">
                      <td class="px-6 py-4">
                        <div class="flex items-center justify-between gap-3">
                          <div class="min-w-0">
                            <div class="font-bold text-white truncate">{{ usr.firstName }}</div>
                            <div class="mt-1 inline-flex items-center gap-2 text-xs font-semibold"
                              [class.text-emerald-400]="usr.isActive"
                              [class.text-rose-400]="!usr.isActive">
                              <span class="h-2.5 w-2.5 rounded-full shadow-[0_0_10px_currentColor]"
                                [class.bg-emerald-400]="usr.isActive"
                                [class.bg-rose-400]="!usr.isActive"></span>
                              {{ usr.isActive ? ('USERS.STATUS_ACTIVE' | translate) : ('USERS.STATUS_SUSPENDED' | translate) }}
                            </div>

                            @if (usr.id === currentUserId()) {
                              <span class="mt-2 inline-flex rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                {{ 'USERS.CURRENT_USER' | translate }}
                              </span>
                            }
                          </div>

                          <button
                            type="button"
                            (click)="toggleUserStatus(usr)"
                            [disabled]="isUserToggleLoading(usr.id) || usr.id === currentUserId()"
                            class="inline-flex items-center gap-2 rounded-full border px-2 py-1.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            [class.border-emerald-500/30]="usr.isActive"
                            [class.bg-emerald-500/10]="usr.isActive"
                            [class.text-emerald-400]="usr.isActive"
                            [class.hover:bg-emerald-500/20]="usr.isActive"
                            [class.border-rose-500/30]="!usr.isActive"
                            [class.bg-rose-500/10]="!usr.isActive"
                            [class.text-rose-400]="!usr.isActive"
                            [class.hover:bg-rose-500/20]="!usr.isActive"
                            [class.shadow-[0_0_18px_rgba(16,185,129,0.12)]]="usr.isActive"
                            [class.shadow-[0_0_18px_rgba(244,63,94,0.12)]]="!usr.isActive">
                            @if (isUserToggleLoading(usr.id)) {
                              <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
                                <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            } @else if (usr.id === currentUserId()) {
                              <span class="text-[10px] font-bold uppercase tracking-wider">
                                {{ 'USERS.CURRENT_USER' | translate }}
                              </span>
                            } @else {
                              <span class="h-2.5 w-2.5 rounded-full"
                                [class.bg-emerald-400]="usr.isActive"
                                [class.bg-rose-400]="!usr.isActive"></span>
                              <span class="text-[10px] font-bold uppercase tracking-wider">
                                {{ usr.isActive ? ('USERS.ACTION_SUSPEND' | translate) : ('USERS.ACTION_ACTIVATE' | translate) }}
                              </span>
                            }
                          </button>
                        </div>
                      </td>
                      <td class="px-6 py-4 font-medium text-slate-300">{{ usr.lastName }}</td>
                      <td class="px-6 py-4 text-slate-400 font-mono tabular-nums">{{ usr.email }}</td>
                      <td class="px-6 py-4 text-slate-400 font-mono tabular-nums">{{ usr.personalPhone || '\u2014' }}</td>
                      <td class="px-6 py-4 text-slate-400 font-mono tabular-nums">{{ usr.whatsAppPhone || '\u2014' }}</td>
                      <td class="px-6 py-4 text-center">
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase font-cairo"
                          [class.bg-indigo-500/10]="usr.role === 'Manager'"
                          [class.text-indigo-400]="usr.role === 'Manager'"
                          [class.border]="usr.role === 'Manager'"
                          [class.border-indigo-500/20]="usr.role === 'Manager'"
                          [class.bg-emerald-500/10]="usr.role === 'SiteEngineer' || usr.role === 'DesignEngineer'"
                          [class.text-emerald-400]="usr.role === 'SiteEngineer' || usr.role === 'DesignEngineer'"
                          [class.border-emerald-500/20]="usr.role === 'SiteEngineer' || usr.role === 'DesignEngineer'"
                          [class.border]="usr.role === 'SiteEngineer' || usr.role === 'DesignEngineer'"
                          [class.bg-purple-500/10]="usr.role === 'Accountant'"
                          [class.text-purple-400]="usr.role === 'Accountant'"
                          [class.border-purple-500/20]="usr.role === 'Accountant'"
                          [class.border]="usr.role === 'Accountant'">
                          {{ 'USERS.ROLES.' + usr.role | translate }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-slate-400 font-mono tabular-nums">{{ usr.createdAt | date:'dd/MM/yyyy HH:mm' }}</td>
                      <td class="px-6 py-4 text-center">
                        @if (usr.whatsAppPhone) {
                          <button
                            type="button"
                            (click)="openWhatsAppForUser(usr)"
                            class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-pointer font-cairo">
                            \u0625\u0631\u0633\u0627\u0644 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628
                          </button>
                        } @else {
                          <span class="text-slate-600 text-xs">\u2014</span>
                        }
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="8" class="px-6 py-12 text-center text-slate-500 font-cairo text-sm">
                        <p class="font-bold text-slate-400 font-cairo">{{ 'USERS.NO_USERS' | translate }}</p>
                        <p class="text-xs text-slate-500 mt-1 font-cairo">{{ 'USERS.CREATE_FIRST' | translate }}</p>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
      }

      <!-- SECTION 3: CORPORATE PROFILE EDITOR -->
      @if (activeTab() === 'profile' && currentUserRole() === 'TenantOwner') {
        <app-tenant-profile></app-tenant-profile>
      }
    </div>

    <!-- Sticky Mobile Action Bar for TenantOwner -->
    @if (currentUserRole() === 'TenantOwner') {
      <div class="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-30 flex items-center justify-around gap-2 shadow-2xl">
        @if (activeTab() === 'projects') {
          <button
            (click)="openProjectModal()"
            class="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold font-cairo text-sm shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            \u2795 {{ 'PROJECTS.NEW_PROJECT' | translate }}
          </button>
        } @else if (activeTab() === 'users') {
          <button
            (click)="openUserModal()"
            class="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold font-cairo text-sm shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            \u2795 {{ 'USERS.NEW_USER' | translate }}
          </button>
        }
      </div>
    }

    <!-- MODAL 1: CREATE PROJECT (Tabbed Layout) -->
    @if (isProjectModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 sm:p-4">
        <!-- Backdrop (Static - Disabled click dismiss to prevent accidental data loss) -->
        <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

        <!-- Modal container -->
        <div class="relative z-10 w-full max-w-2xl mx-auto my-auto max-h-[92vh] flex flex-col bg-slate-950 border border-slate-900 rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
          
          <!-- Modal Header -->
          <div class="flex items-start justify-between p-5 pb-3 border-b border-slate-800/60 bg-slate-950/60">
            <div>
              <h3 class="text-xl font-bold text-white font-cairo flex items-center gap-2">
                <span>{{ 'PROJECTS.MODAL_TITLE' | translate }}</span>
                <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                  \u0627\u0644\u062E\u0637\u0648\u0629 {{ activeProjectTab() }} \u0645\u0646 3
                </span>
              </h3>
              <p class="text-xs text-slate-400 mt-1 font-cairo">{{ 'PROJECTS.MODAL_SUBTITLE' | translate }}</p>
            </div>
            <button
              (click)="closeProjectModal()"
              class="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Responsive Tab Navigation Header -->
          <div class="flex border-b border-slate-800 bg-slate-950/40 px-4 sm:px-6 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button 
              type="button"
              (click)="setProjectTab(1)" 
              class="py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all duration-200 cursor-pointer font-cairo flex items-center gap-2 shrink-0"
              [class.border-indigo-500]="activeProjectTab() === 1"
              [class.text-indigo-400]="activeProjectTab() === 1"
              [class.border-transparent]="activeProjectTab() !== 1"
              [class.text-slate-400]="activeProjectTab() !== 1"
              [class.hover:text-slate-200]="activeProjectTab() !== 1">
              <span>\u{1F4CB}</span>
              <span>\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</span>
            </button>

            <button 
              type="button"
              (click)="setProjectTab(2)" 
              class="py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all duration-200 cursor-pointer font-cairo flex items-center gap-2 shrink-0"
              [class.border-indigo-500]="activeProjectTab() === 2"
              [class.text-indigo-400]="activeProjectTab() === 2"
              [class.border-transparent]="activeProjectTab() !== 2"
              [class.text-slate-400]="activeProjectTab() !== 2"
              [class.hover:text-slate-200]="activeProjectTab() !== 2">
              <span>\u{1F4CD}</span>
              <span>\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0641</span>
            </button>

            <button 
              type="button"
              (click)="setProjectTab(3)" 
              class="py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all duration-200 cursor-pointer font-cairo flex items-center gap-2 shrink-0"
              [class.border-indigo-500]="activeProjectTab() === 3"
              [class.text-indigo-400]="activeProjectTab() === 3"
              [class.border-transparent]="activeProjectTab() !== 3"
              [class.text-slate-400]="activeProjectTab() !== 3"
              [class.hover:text-slate-200]="activeProjectTab() !== 3">
              <span>\u{1F4F2}</span>
              <span>\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0648\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A</span>
            </button>
          </div>

          <!-- Modal Body & Form -->
          <form [formGroup]="projectForm" (ngSubmit)="onProjectSubmit()" class="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div class="flex-1 overflow-y-auto min-h-0 p-5 sm:p-6 space-y-4">
              @if (projectValidationErrors().length > 0) {
                <div class="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-400 space-y-1">
                  <span class="font-bold block mb-1 font-cairo">{{ 'PROJECTS.VALIDATION_TITLE' | translate }}</span>
                  @for (err of projectValidationErrors(); track err) {
                    <div>\u2022 {{ err }}</div>
                  }
                </div>
              }

              <!-- TAB 1: \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 (Basic Info) -->
              @if (activeProjectTab() === 1) {
                <div class="space-y-4 animate-fade-in">
                  <div>
                    <label for="proj-name" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                      {{ 'PROJECTS.FIELD_NAME' | translate }} <span class="text-red-400">*</span>
                    </label>
                    <input
                      id="proj-name"
                      type="text"
                      formControlName="name"
                      class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                      placeholder="e.g. \u0628\u0631\u062C \u0627\u0644\u0639\u0627\u0635\u0645\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629">
                    @if (isProjectFieldInvalid('name')) {
                      <p class="text-[10px] text-rose-400 mt-1 font-cairo">\u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u0637\u0644\u0648\u0628 / Project Name is required.</p>
                    }
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="proj-client" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                        {{ 'PROJECTS.TABLE_CLIENT' | translate }} <span class="text-red-400">*</span>
                      </label>
                      <input
                        id="proj-client"
                        type="text"
                        formControlName="client"
                        class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                        placeholder="e.g. \u0634\u0631\u0643\u0629 \u0623\u0648\u0631\u0627\u0633\u0643\u0648\u0645 \u0644\u0644\u0627\u0646\u0634\u0627\u0621\u0627\u062A">
                      @if (isProjectFieldInvalid('client')) {
                        <p class="text-[10px] text-rose-400 mt-1 font-cairo">\u0627\u0633\u0645 \u0627\u0644\u0639\u0645\u064A\u0644 \u0645\u0637\u0644\u0648\u0628 / Client Name is required.</p>
                      }
                    </div>

                    <div>
                      <label for="proj-budget" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                        {{ 'PROJECTS.TABLE_BUDGET' | translate }} (EGP) <span class="text-red-400">*</span>
                      </label>
                      <input
                        id="proj-budget"
                        type="number"
                        formControlName="budget"
                        class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                        placeholder="e.g. 15000000">
                      @if (isProjectFieldInvalid('budget')) {
                        <p class="text-[10px] text-rose-400 mt-1 font-cairo">\u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0645\u0637\u0644\u0648\u0628\u0629 \u0628\u0631\u0642\u0645 \u0635\u062D\u064A\u062D / Budget is required.</p>
                      }
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="proj-start" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                        {{ 'PROJECTS.FIELD_START' | translate }} <span class="text-red-400">*</span>
                      </label>
                      <input
                        id="proj-start"
                        type="date"
                        formControlName="startDate"
                        class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                      @if (isProjectFieldInvalid('startDate')) {
                        <p class="text-[10px] text-rose-400 mt-1 font-cairo">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621 \u0645\u0637\u0644\u0648\u0628 / Start Date is required.</p>
                      }
                    </div>
                    <div>
                      <label for="proj-end" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                        {{ 'PROJECTS.FIELD_END' | translate }}
                      </label>
                      <input
                        id="proj-end"
                        type="date"
                        formControlName="endDate"
                        class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                    </div>
                  </div>
                </div>
              }

              <!-- TAB 2: \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0641 (Location & Classification) -->
              @if (activeProjectTab() === 2) {
                <div class="space-y-4 animate-fade-in">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="proj-gov" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                        \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 / Governorate <span class="text-red-400">*</span>
                      </label>
                      <select
                        id="proj-gov"
                        formControlName="governorate"
                        class="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
                        <option value="" disabled selected>-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 --</option>
                        <option value="Cairo">Cairo / \u0627\u0644\u0642\u0627\u0647\u0631\u0629</option>
                        <option value="Giza">Giza / \u0627\u0644\u062C\u064A\u0632\u0629</option>
                        <option value="Alexandria">Alexandria / \u0627\u0644\u0625\u0633\u0643\u0646\u062F\u0631\u064A\u0629</option>
                        <option value="Qalyubia">Qalyubia / \u0627\u0644\u0642\u0644\u064A\u0648\u0628\u064A\u0629</option>
                        <option value="Gharbia">Gharbia / \u0627\u0644\u063A\u0631\u0628\u064A\u0629</option>
                        <option value="Dakahlia">Dakahlia / \u0627\u0644\u062F\u0642\u0647\u0644\u064A\u0629</option>
                        <option value="Sharqia">Sharqia / \u0627\u0644\u0634\u0631\u0642\u064A\u0629</option>
                        <option value="Monufia">Monufia / \u0627\u0644\u0645\u0646\u0648\u0641\u064A\u0629</option>
                        <option value="Beheira">Beheira / \u0627\u0644\u0628\u062D\u064A\u0631\u0629</option>
                        <option value="Kafr El Sheikh">Kafr El Sheikh / \u0643\u0641\u0631 \u0627\u0644\u0634\u064A\u062E</option>
                        <option value="Damietta">Damietta / \u062F\u0645\u064A\u0627\u0637</option>
                        <option value="Port Said">Port Said / \u0628\u0648\u0631\u0633\u0639\u064A\u062F</option>
                        <option value="Ismailia">Ismailia / \u0627\u0644\u0625\u0633\u0645\u0627\u0639\u064A\u0644\u064A\u0629</option>
                        <option value="Suez">Suez / \u0627\u0644\u0633\u0648\u064A\u0633</option>
                        <option value="Aswan">Aswan / \u0623\u0633\u0648\u0627\u0646</option>
                        <option value="Luxor">Luxor / \u0627\u0644\u0623\u0642\u0635\u0631</option>
                        <option value="Red Sea">Red Sea / \u0627\u0644\u0628\u062D\u0631 \u0627\u0644\u0623\u062D\u0645\u0631</option>
                        <option value="Matrouh">Matrouh / \u0645\u0637\u0631\u0648\u062D</option>
                      </select>
                      @if (isProjectFieldInvalid('governorate')) {
                        <p class="text-[10px] text-rose-400 mt-1 font-cairo">\u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 \u0645\u0637\u0644\u0648\u0628\u0629 / Governorate is required.</p>
                      }
                    </div>
                    <div>
                      <label for="proj-city" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                        \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0623\u0648 \u0627\u0644\u0645\u0646\u0637\u0642\u0629 / City or Zone <span class="text-red-400">*</span>
                      </label>
                      <input
                        id="proj-city"
                        type="text"
                        formControlName="cityOrZone"
                        placeholder="e.g. \u0627\u0644\u062A\u062C\u0645\u0639 \u0627\u0644\u062E\u0627\u0645\u0633"
                        class="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
                      @if (isProjectFieldInvalid('cityOrZone')) {
                        <p class="text-[10px] text-rose-400 mt-1 font-cairo">\u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0645\u0637\u0644\u0648\u0628\u0629 / Zone is required.</p>
                      }
                    </div>
                  </div>

                  <div>
                    <label for="proj-address" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                      \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A / Physical Site Address <span class="text-red-400">*</span>
                    </label>
                    <input
                      id="proj-address"
                      type="text"
                      formControlName="siteAddress"
                      placeholder="e.g. \u0634\u0627\u0631\u0639 \u0627\u0644\u062A\u0633\u0639\u064A\u0646 \u0627\u0644\u0634\u0645\u0627\u0644\u064A\u060C \u0642\u0637\u0639\u0629 44"
                      class="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
                    @if (isProjectFieldInvalid('siteAddress')) {
                      <p class="text-[10px] text-rose-400 mt-1 font-cairo">\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0645\u0637\u0644\u0648\u0628 / Address is required.</p>
                    }
                  </div>

                  <div>
                    <label for="proj-cat" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                      \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 / Project Classification <span class="text-red-400">*</span>
                    </label>
                    <select
                      id="proj-cat"
                      formControlName="category"
                      class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                      <option value="Residential">Residential / \u0633\u0643\u0646\u064A</option>
                      <option value="Commercial">Commercial / \u062A\u062C\u0627\u0631\u064A</option>
                      <option value="Administrative">Administrative / \u0625\u062F\u0627\u0631\u064A</option>
                      <option value="Industrial">Industrial / \u0635\u0646\u0627\u0639\u064A</option>
                      <option value="Other">Other / \u0623\u062E\u0631\u0649</option>
                    </select>
                  </div>
                </div>
              }

              <!-- TAB 3: \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0648\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A (Contact & Settings) -->
              @if (activeProjectTab() === 3) {
                <div class="space-y-4 animate-fade-in">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="proj-client-wh" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                        \u0631\u0642\u0645 \u0648\u0627\u062A\u0633\u0627\u0628 \u0627\u0644\u0639\u0645\u064A\u0644 / Client WhatsApp <span class="text-red-400">*</span>
                      </label>
                      <input
                        id="proj-client-wh"
                        type="text"
                        formControlName="clientWhatsApp"
                        placeholder="e.g. +201012345678"
                        class="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
                      @if (isProjectFieldInvalid('clientWhatsApp')) {
                        <p class="text-[10px] text-rose-400 mt-1 font-cairo">\u0631\u0642\u0645 \u0648\u0627\u062A\u0633\u0627\u0628 \u0627\u0644\u0639\u0645\u064A\u0644 \u0645\u0637\u0644\u0648\u0628 \u0628\u0635\u064A\u063A\u0629 \u0635\u062D\u064A\u062D\u0629 / Invalid WhatsApp number.</p>
                      }
                    </div>

                    <div>
                      <label for="proj-status" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                        {{ 'PROJECTS.TABLE_STATUS' | translate }} <span class="text-red-400">*</span>
                      </label>
                      <select
                        id="proj-status"
                        formControlName="status"
                        class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                        <option value="Active">{{ 'PROJECTS.STATUS.ACTIVE' | translate }}</option>
                        <option value="Delayed">{{ 'PROJECTS.STATUS.DELAYED' | translate }}</option>
                        <option value="Completed">{{ 'PROJECTS.STATUS.COMPLETED' | translate }}</option>
                      </select>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 py-1.5 bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5">
                    <input
                      id="proj-pub"
                      type="checkbox"
                      formControlName="isPublicPortfolio"
                      class="h-4 w-4 rounded border-slate-700 text-indigo-600 bg-slate-950 focus:ring-0">
                    <label for="proj-pub" class="text-xs text-slate-300 font-cairo font-semibold cursor-pointer select-none">
                      {{ 'PROJECTS.FIELD_PUBLIC' | translate }}
                    </label>
                  </div>

                  <div>
                    <label for="proj-desc" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                      {{ 'PROJECTS.FIELD_DESC' | translate }}
                    </label>
                    <textarea
                      id="proj-desc"
                      formControlName="description"
                      rows="3"
                      class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none"
                      placeholder="\u0646\u0637\u0627\u0642 \u0648\u0631\u0624\u064A\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629..."></textarea>
                  </div>
                </div>
              }
            </div>

            <!-- Action Bar (Footer) -->
            <div class="px-6 py-4 bg-slate-950/90 border-t border-slate-900 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 shrink-0">
              <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                @if (activeProjectTab() > 1) {
                  <button
                    type="button"
                    (click)="prevProjectTab()"
                    class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all duration-200 cursor-pointer font-cairo flex items-center gap-1.5">
                    <span>\u2190</span>
                    <span>{{ langService.currentLang() === 'ar' ? '\u0627\u0644\u0633\u0627\u0628\u0642' : 'Back' }}</span>
                  </button>
                }

                @if (activeProjectTab() < 3) {
                  <button
                    type="button"
                    (click)="nextProjectTab()"
                    class="px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 cursor-pointer font-cairo flex items-center gap-1.5 shadow-md shadow-indigo-600/20">
                    <span>{{ langService.currentLang() === 'ar' ? '\u0627\u0644\u062A\u0627\u0644\u064A' : 'Next' }}</span>
                    <span>\u2192</span>
                  </button>
                }
              </div>

              <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  (click)="closeProjectModal()"
                  class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer font-cairo">
                  {{ 'COMMON.CANCEL' | translate }}
                </button>

                <button
                  type="submit"
                  [disabled]="projectForm.invalid || isSavingProject()"
                  class="px-5 py-2 text-xs sm:text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-cairo shadow-lg shadow-indigo-600/30 flex items-center gap-2">
                  <span>\u{1F4BE}</span>
                  <span>{{ 'PROJECTS.BTN_CREATE' | translate }}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- UPGRADE PACKAGE MODAL -->
    @if (isUpgradeModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div (click)="isUpgradeModalOpen.set(false)" class="absolute inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity duration-300"></div>

        <!-- Modal Container -->
        <div class="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col p-0 shadow-2xl z-10 font-sans overflow-hidden">
          
          <!-- Modal Header -->
          <div class="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-black text-white font-cairo tracking-wide">\u0634\u0631\u0627\u0621 \u0633\u0639\u0629 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 / Buy Project Quota</h3>
                <p class="text-xs text-slate-400 font-cairo mt-0.5">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0628\u0627\u0644\u062C\u0646\u064A\u0647 \u0627\u0644\u0645\u0635\u0631\u064A / All prices in EGP</p>
              </div>
            </div>
            <button 
              (click)="isUpgradeModalOpen.set(false)"
              class="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Body (Independent Inner Scroll) -->
          <div class="overflow-y-auto min-h-0 p-6 space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <!-- Card 1: +1 Project (250 EGP) -->
              <div class="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-emerald-500/70 transition-all duration-200 shadow-lg relative group">
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-full font-cairo">+1 \u0645\u0634\u0631\u0648\u0639</span>
                    <span class="text-xl font-black text-emerald-400 font-mono">250 EGP</span>
                  </div>
                  <div class="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center mb-3 text-emerald-400">
                    \u{1F4E6}
                  </div>
                  <h4 class="font-bold text-base text-white font-cairo">\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0631\u0648\u0639 \u0648\u0627\u062D\u062F (+1 Project)</h4>
                  <p class="text-xs text-slate-400 font-cairo mt-1 leading-relaxed">\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0631\u0648\u0639 \u0648\u0627\u062D\u062F \u0625\u0636\u0627\u0641\u064A \u0644\u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u062D\u0627\u0644\u064A (Adds +1 project to your active quota)</p>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-800/60">
                  <button 
                    (click)="openCheckout({ extraProjectsCount: 1, titleAr: '\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0631\u0648\u0639 \u0648\u0627\u062D\u062F (+1 Project)', titleEn: '+1 Extra Project', priceEgp: 250, badge: '\u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A' })"
                    class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl font-cairo transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer">
                    <span>\u0634\u0631\u0627\u0621 \u0645\u0634\u0631\u0648\u0639 (+1 Project) \u{1F4B3}</span>
                  </button>
                </div>
              </div>

              <!-- Card 2: +5 Projects Package (950 EGP - Best Value) -->
              <div class="p-5 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-amber-950/20 border-2 border-amber-500/70 rounded-2xl flex flex-col justify-between hover:border-amber-400 transition-all duration-200 shadow-xl shadow-amber-500/10 relative overflow-hidden">
                <div class="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-bl-xl font-cairo shadow-md">
                  \u2B50\uFE0F \u0627\u0644\u0623\u0641\u0636\u0644 \u062A\u0648\u0641\u064A\u0631\u0627\u064B / Best Value
                </div>
                <div class="pt-2">
                  <div class="flex items-center justify-between mb-3">
                    <span class="px-2.5 py-0.5 text-[10px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 rounded-full font-cairo">\u062D\u0632\u0645\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639</span>
                    <div class="text-left rtl:text-right">
                      <span class="text-xl font-black text-amber-400 font-mono">950 EGP</span>
                      <span class="block text-[10px] text-slate-500 line-through font-mono">1,250 EGP</span>
                    </div>
                  </div>
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-3 text-white">
                    \u{1F680}
                  </div>
                  <h4 class="font-bold text-base text-white font-cairo">\u062D\u0632\u0645\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 (+5 Projects Package)</h4>
                  <p class="text-xs text-slate-300 font-cairo mt-1 leading-relaxed">\u0625\u0636\u0627\u0641\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 \u0625\u0636\u0627\u0641\u064A\u0629 \u0644\u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u062D\u0627\u0644\u064A (Adds +5 projects to your active quota)</p>
                </div>
                <div class="mt-4 pt-3 border-t border-amber-500/30">
                  <button 
                    (click)="openCheckout({ extraProjectsCount: 5, titleAr: '\u062D\u0632\u0645\u0629 5 \u0645\u0634\u0627\u0631\u064A\u0639 (+5 Projects Package)', titleEn: '+5 Projects Package', priceEgp: 950, badge: '\u2B50\uFE0F \u0627\u0644\u0623\u0641\u0636\u0644 \u062A\u0648\u0641\u064A\u0631\u0627\u064B' })"
                    class="w-full py-2.5 bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:from-amber-400 hover:to-indigo-500 text-white font-black text-xs rounded-xl font-cairo transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 cursor-pointer">
                    <span>\u0634\u0631\u0627\u0621 5 \u0645\u0634\u0627\u0631\u064A\u0639 (+5 Projects) \u{1F6D2}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t border-slate-800/80 bg-slate-950/40 flex justify-end">
            <button 
              (click)="isUpgradeModalOpen.set(false)"
              class="px-5 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-all duration-200 cursor-pointer font-cairo">
              {{ 'COMMON.CANCEL' | translate }}
            </button>
          </div>

        </div>
      </div>
    }

    <!-- PAYMENT CHECKOUT MODAL -->
    @if (isCheckoutModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div (click)="closeCheckoutModal()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity duration-300"></div>

        <!-- Modal Container -->
        <div class="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col p-0 shadow-2xl z-10 font-sans overflow-hidden">
          
          @if (!paymentSuccessData()) {
            <!-- Header -->
            <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-white font-cairo">\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0634\u0631\u0627\u0621 \u0648\u0627\u0644\u062A\u0641\u0639\u064A\u0644 / Checkout</h3>
                  <p class="text-xs text-slate-400 font-cairo mt-0.5">\u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A \u0644\u0645\u0634\u0627\u0631\u064A\u0639\u0643 \u0639\u0628\u0631 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062F\u0641\u0639</p>
                </div>
              </div>
              <button 
                (click)="closeCheckoutModal()"
                class="p-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Body (Inner Scroll Box) -->
            <div class="overflow-y-auto min-h-0 p-6 space-y-5 text-right rtl:text-left">
              
              <!-- Order Summary Card -->
              <div class="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2.5">
                <div class="flex items-center justify-between text-sm font-bold text-white font-cairo">
                  <span>{{ selectedCheckoutPackage()?.titleAr }}</span>
                  <span class="font-mono text-indigo-400">{{ selectedCheckoutPackage()?.priceEgp | number }} EGP</span>
                </div>
                <div class="flex items-center justify-between text-xs text-slate-400 font-cairo">
                  <span>\u0627\u0644\u0631\u0633\u0648\u0645 \u0648\u0627\u0644\u0645\u0635\u0627\u0631\u064A\u0641 / Fees</span>
                  <span class="font-mono">0 EGP</span>
                </div>
                <div class="pt-2 border-t border-slate-800 flex items-center justify-between text-base font-black text-emerald-400 font-cairo">
                  <span>\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0643\u0644\u064A / Total</span>
                  <span class="font-mono text-lg">{{ selectedCheckoutPackage()?.totalAmount | number }} EGP</span>
                </div>
              </div>

              <!-- Payment Method Selector -->
              <div>
                <label class="block text-xs font-bold text-slate-300 font-cairo mb-2">\u0627\u062E\u062A\u0631 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639 / Payment Method</label>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    type="button"
                    (click)="selectedPaymentMethod.set('CreditCard')"
                    [class.border-indigo-500]="selectedPaymentMethod() === 'CreditCard'"
                    [class.bg-indigo-950]="selectedPaymentMethod() === 'CreditCard'"
                    class="p-3 border border-slate-800 rounded-xl flex flex-col items-center gap-1.5 hover:border-slate-700 transition-all cursor-pointer">
                    <span class="text-lg">\u{1F4B3}</span>
                    <span class="text-[11px] font-bold text-white font-cairo">\u0628\u0637\u0627\u0642\u0629 \u0628\u0646\u0643\u064A\u0629</span>
                  </button>

                  <button 
                    type="button"
                    (click)="selectedPaymentMethod.set('VodafoneCash')"
                    [class.border-indigo-500]="selectedPaymentMethod() === 'VodafoneCash'"
                    [class.bg-indigo-950]="selectedPaymentMethod() === 'VodafoneCash'"
                    class="p-3 border border-slate-800 rounded-xl flex flex-col items-center gap-1.5 hover:border-slate-700 transition-all cursor-pointer">
                    <span class="text-lg">\u{1F4F1}</span>
                    <span class="text-[11px] font-bold text-white font-cairo">\u0645\u062D\u0641\u0638\u0629 \u0643\u0627\u0634</span>
                  </button>

                  <button 
                    type="button"
                    (click)="selectedPaymentMethod.set('InstaPay')"
                    [class.border-indigo-500]="selectedPaymentMethod() === 'InstaPay'"
                    [class.bg-indigo-950]="selectedPaymentMethod() === 'InstaPay'"
                    class="p-3 border border-slate-800 rounded-xl flex flex-col items-center gap-1.5 hover:border-slate-700 transition-all cursor-pointer">
                    <span class="text-lg">\u26A1</span>
                    <span class="text-[11px] font-bold text-white font-cairo">\u0625\u0646\u0633\u062A\u0627\u0628\u0627\u064A</span>
                  </button>
                </div>
              </div>

              <!-- Interactive Payment Input Fields -->
              <div class="space-y-3 pt-1">
                @if (selectedPaymentMethod() === 'CreditCard') {
                  <div>
                    <label class="block text-[11px] text-slate-400 font-cairo mb-1">\u0627\u0633\u0645 \u0635\u0627\u062D\u0628 \u0627\u0644\u0628\u0637\u0627\u0642\u0629</label>
                    <input type="text" value="Structo Client" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-cairo" />
                  </div>
                  <div>
                    <label class="block text-[11px] text-slate-400 font-cairo mb-1">\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629</label>
                    <input type="text" value="4242 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 4242" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono" />
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-[11px] text-slate-400 font-cairo mb-1">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</label>
                      <input type="text" value="12/28" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono text-center" />
                    </div>
                    <div>
                      <label class="block text-[11px] text-slate-400 font-cairo mb-1">\u0631\u0645\u0632 \u0627\u0644\u0623\u0645\u0627\u0646 CVV</label>
                      <input type="password" value="123" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono text-center" />
                    </div>
                  </div>
                } @else {
                  <div>
                    <label class="block text-[11px] text-slate-400 font-cairo mb-1">\u0631\u0642\u0645 \u0627\u0644\u0645\u062D\u0641\u0638\u0629 / \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641</label>
                    <input type="text" placeholder="01012345678" value="01004500766" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono" />
                  </div>
                }
              </div>

              <div class="p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-300 font-cairo flex items-center gap-2">
                <span>\u{1F512}</span>
                <span>\u0639\u0645\u0644\u064A\u0629 \u062F\u0641\u0639 \u0622\u0645\u0646\u0629 \u0645\u0634\u0641\u0631\u0629 \u2014 \u0633\u064A\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0632\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0641\u064A \u062D\u0633\u0627\u0628\u0643 \u0641\u0648\u0631\u0627\u064B.</span>
              </div>

            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between gap-3">
              <button 
                (click)="closeCheckoutModal()"
                class="px-4 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-all font-cairo cursor-pointer">
                \u0625\u0644\u063A\u0627\u0621
              </button>

              <button 
                [disabled]="isProcessingPayment()"
                (click)="submitUpgradePayment()"
                class="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl font-cairo transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer">
                @if (isProcessingPayment()) {
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>\u062C\u0627\u0631\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u062F\u0641\u0639...</span>
                } @else {
                  <span>\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u0622\u0646 ({{ selectedCheckoutPackage()?.totalAmount | number }} EGP)</span>
                }
              </button>
            </div>
          } @else {
            <!-- SUCCESS STATE / OFFICIAL PAYMENT RECEIPT MODAL -->
            <div class="overflow-y-auto min-h-0 p-6 space-y-5 text-right rtl:text-left font-cairo">
              
              <!-- Official Enterprise Printable Receipt Container -->
              <div class="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-indigo-500/30 rounded-2xl relative shadow-xl print-only space-y-4 text-right font-cairo" dir="rtl">
                
                <!-- Receipt Header / Letterhead -->
                <div class="flex items-center justify-between border-b border-slate-800 pb-3.5 mb-1">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-indigo-500/20 border border-indigo-500/40 rounded-xl flex items-center justify-center text-indigo-400 text-2xl font-bold">
                      \u{1F48E}
                    </div>
                    <div>
                      <h4 class="font-black text-lg text-white">\u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0644\u062D\u0644\u0648\u0644 \u0627\u0644\u0625\u0646\u0634\u0627\u0621\u0627\u062A \u0648\u0627\u0644\u062A\u0637\u0648\u064A\u0631</h4>
                      <span class="text-[11px] text-indigo-400 font-mono tracking-wider">STRUCTO OSOS PLATFORM \xB7 OFFICIAL INVOICING</span>
                    </div>
                  </div>

                  <div class="text-left font-mono">
                    <span class="px-3 py-1 text-xs font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 rounded-lg inline-block mb-1">
                      \u2713 \u0625\u064A\u0635\u0627\u0644 \u0645\u062F\u0641\u0648\u0639 \u0648\u0645\u0643\u062A\u0645\u0644 / PAID
                    </span>
                    <p class="text-[10px] text-slate-400">\u0631\u0642\u0645 \u0627\u0644\u0625\u064A\u0635\u0627\u0644: <strong class="text-amber-400 font-mono">{{ paymentSuccessData()?.referenceNumber || 'TXN-SUCCESS' }}</strong></p>
                  </div>
                </div>

                <!-- Subtitle Bar -->
                <div class="flex items-center justify-between bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                  <div>
                    <h5 class="font-black text-xs text-white">\u{1F4DC} \u0625\u064A\u0635\u0627\u0644 \u0633\u062F\u0627\u062F \u0631\u0633\u0648\u0645 \u0648\u062A\u0641\u0639\u064A\u0644 \u0633\u0639\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639</h5>
                    <p class="text-[10px] text-slate-400">\u0635\u0627\u062F\u0631 \u0631\u0633\u0645\u064A\u0627\u064B \u0639\u0646 \u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0644\u0625\u062F\u0627\u0631\u0629 \u0648\u062A\u0642\u0646\u064A\u0627\u062A \u0627\u0644\u062A\u0637\u0648\u064A\u0631 \u0627\u0644\u0639\u0642\u0627\u0631\u064A \u0648\u0627\u0644\u0647\u0646\u062F\u0633\u064A.</p>
                  </div>
                  <span class="text-[10px] font-mono text-indigo-300 bg-indigo-950 border border-indigo-500/30 px-2.5 py-1 rounded">
                    SEC-VERIFIED
                  </span>
                </div>

                <!-- Parties Info Grid -->
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-850 space-y-1">
                    <span class="text-[10px] text-slate-400 block font-cairo">\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0623\u0648\u0644 (\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u062F\u0631\u0629):</span>
                    <span class="font-bold text-white block font-cairo">\u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0627\u0644\u0631\u0642\u0645\u064A\u0629 / Structo Inc.</span>
                    <span class="text-[10px] text-slate-400 font-mono block">support@structo.app</span>
                  </div>

                  <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-850 space-y-1">
                    <span class="text-[10px] text-slate-400 block font-cairo">\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u062B\u0627\u0646\u064A (\u0627\u0644\u0639\u0645\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u0641\u064A\u062F):</span>
                    <span class="font-bold text-white block font-cairo truncate">{{ tenantProfile()?.name || authService.currentUser()?.name || '\u0634\u0631\u0643\u0629 \u0645\u0639\u062A\u0645\u062F\u0629' }}</span>
                    <span class="text-[10px] text-slate-400 font-mono block truncate">{{ authService.currentUser()?.email }}</span>
                  </div>
                </div>

                <!-- Itemized Service Breakdown Table -->
                <div class="border border-slate-800 rounded-xl overflow-hidden text-xs">
                  <table class="w-full text-right font-cairo">
                    <thead class="bg-slate-950 text-slate-300 font-bold border-b border-slate-800 text-[11px]">
                      <tr>
                        <th class="p-2.5">\u0628\u064A\u0627\u0646 \u0627\u0644\u062D\u0632\u0645\u0629 \u0648\u0627\u0644\u062E\u062F\u0645\u0629</th>
                        <th class="p-2.5 text-center">\u0627\u0644\u0643\u0645\u064A\u0629</th>
                        <th class="p-2.5 text-center">\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0635\u0627\u0641\u064A</th>
                        <th class="p-2.5 text-left">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-850 bg-slate-900/60">
                      <tr>
                        <td class="p-2.5">
                          <span class="font-bold text-white block">{{ selectedCheckoutPackage()?.titleAr || '\u062A\u0631\u0642\u064A\u0629 \u0633\u0639\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629' }}</span>
                          <span class="text-[10px] text-slate-400 block">\u062A\u0641\u0639\u064A\u0644 \u0641\u0648\u0631\u064A \u0644\u0631\u0635\u064A\u062F \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639.</span>
                        </td>
                        <td class="p-2.5 text-center font-mono font-bold text-slate-200">1</td>
                        <td class="p-2.5 text-center font-mono font-bold text-slate-200">{{ (paymentSuccessData()?.totalAmount || selectedCheckoutPackage()?.totalAmount || 0) | number }} EGP</td>
                        <td class="p-2.5 text-left font-mono font-black text-amber-400 text-sm">{{ (paymentSuccessData()?.totalAmount || selectedCheckoutPackage()?.totalAmount || 0) | number }} EGP</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Summary Breakdown Grid -->
                <div class="grid grid-cols-3 gap-2.5 text-xs">
                  <div class="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850">
                    <span class="text-[10px] text-slate-400 block mb-0.5 font-cairo">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639</span>
                    <span class="font-bold text-white font-cairo text-xs">{{ selectedPaymentMethod() === 'CreditCard' ? '\u0628\u0637\u0627\u0642\u0629 \u0628\u0646\u0643\u064A\u0629 \u{1F4B3}' : '\u0645\u062D\u0641\u0638\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 / \u0625\u0646\u0633\u062A\u0627\u0628\u0627\u064A \u{1F4F1}' }}</span>
                  </div>

                  <div class="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850">
                    <span class="text-[10px] text-slate-400 block mb-0.5 font-cairo">\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u0636\u0627\u0641</span>
                    <span class="font-bold text-emerald-400 font-cairo text-xs">+{{ paymentSuccessData()?.extraProjectsAdded || 1 }} \u0645\u0634\u0627\u0631\u064A\u0639</span>
                  </div>

                  <div class="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850">
                    <span class="text-[10px] text-slate-400 block mb-0.5 font-cairo">\u0627\u0644\u0633\u0639\u0629 \u0627\u0644\u0643\u0644\u064A\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629</span>
                    <span class="font-mono font-bold text-amber-400 text-xs">{{ paymentSuccessData()?.newMaxActiveProjects || 1 }} \u0645\u0634\u0627\u0631\u064A\u0639</span>
                  </div>
                </div>

                <!-- Total Paid Card -->
                <div class="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span class="text-xs font-bold text-white font-cairo block">\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0643\u0644\u064A \u0627\u0644\u0645\u062D\u0635\u0651\u0644 (\u0635\u0627\u0641\u064A)</span>
                    <span class="text-[10px] text-slate-400 font-mono">NET AMOUNT PAID \xB7 0% VAT</span>
                  </div>
                  <div class="text-xl font-black font-mono text-amber-400">
                    {{ (paymentSuccessData()?.totalAmount || selectedCheckoutPackage()?.totalAmount || 0) | number }} EGP
                  </div>
                </div>

                <!-- Official Footer Disclaimer -->
                <div class="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-cairo">
                  <span>\u{1F6E1}\uFE0F \u0647\u0630\u0627 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 \u0645\u064F\u0635\u062F\u0631 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0648\u0645\u0648\u062B\u0642 \u0628\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0631\u0642\u0645\u064A \u0644\u0645\u0646\u0635\u0629 \u0623\u064F\u0633\u064F\u0633 \u0648\u0644\u0627 \u064A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u062A\u0648\u0642\u064A\u0639 \u064A\u062F\u0648\u064A\u0627\u064B.</span>
                  <span class="font-mono text-slate-500">Structo Platform Invoicing System</span>
                </div>

              </div>

              <!-- Dispatch Action Buttons (Hidden on PDF Print) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 no-print">
                <button 
                  (click)="sendReceiptWhatsApp()"
                  class="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer">
                  <span>\u{1F4F2} \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628</span>
                </button>

                <button 
                  (click)="printReceipt()"
                  class="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span>\u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0625\u064A\u0635\u0627\u0644 / Print PDF</span>
                </button>
              </div>

              <div class="pt-2 no-print">
                <button 
                  (click)="closeCheckoutModal(); openProjectModal()"
                  class="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl transition-all shadow-xl shadow-indigo-600/30 cursor-pointer">
                  \u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0648\u0625\u0646\u0634\u0627\u0621 \u0645\u0634\u0631\u0648\u0639 \u062C\u062F\u064A\u062F \u{1F680}
                </button>
              </div>

            </div>
          }

        </div>
      </div>
    }

    <!-- MODAL 2: REGISTER COMPANY USER -->
    @if (isUserModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-stretch justify-center p-3 sm:p-4">
        <div (click)="closeUserModal()" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

        <div class="relative z-10 w-full max-w-2xl mx-auto my-auto p-4 md:p-6 max-h-[92vh] flex flex-col bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h3 class="text-xl font-bold text-white font-cairo">{{ 'USERS.MODAL_TITLE' | translate }}</h3>
              <p class="text-xs text-slate-400 mt-1 font-cairo">{{ 'USERS.MODAL_SUBTITLE' | translate }}</p>
            </div>
            <button
              (click)="closeUserModal()"
              class="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          @if (userValidationErrors().length > 0) {
            <div class="mb-5 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-400 space-y-1">
              <span class="font-bold block mb-1 font-cairo">{{ 'PROJECTS.VALIDATION_TITLE' | translate }}</span>
              @for (err of userValidationErrors(); track err) {
                <div>\u2022 {{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="userForm" (ngSubmit)="onUserSubmit()" autocomplete="off" class="space-y-4 overflow-y-auto min-h-0 pr-1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="usr-first" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_FIRST_NAME' | translate }} <span class="text-red-400">*</span></label>
                <input
                  id="usr-first"
                  type="text"
                  formControlName="firstName"
                  autocomplete="off"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                  placeholder="e.g. Ahmed">
              </div>

              <div>
                <label for="usr-last" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_LAST_NAME' | translate }} <span class="text-red-400">*</span></label>
                <input
                  id="usr-last"
                  type="text"
                  formControlName="lastName"
                  autocomplete="off"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                  placeholder="e.g. Ali">
              </div>
            </div>

            <div>
              <label for="usr-email" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_EMAIL' | translate }} <span class="text-red-400">*</span></label>
              <input
                id="usr-email"
                type="email"
                formControlName="email"
                autocomplete="off"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                placeholder="e.g. ahmed.ali@company.com">
              <p class="mt-1.5 text-xs text-indigo-400/80 font-cairo leading-relaxed">
                \u{1F4A1} Tip: If you enter the employee's Gmail, they can log in instantly using 'Sign in with Google' without needing to enter a password!
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="usr-contact-phone" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Personal Phone</label>
                <input
                  id="usr-contact-phone"
                  type="tel"
                  formControlName="personalPhone"
                  inputmode="numeric"
                  maxlength="11"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                  placeholder="01xxxxxxxxx">
              </div>

              <div>
                <label for="usr-whatsapp-phone" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">WhatsApp Phone</label>
                <input
                  id="usr-whatsapp-phone"
                  type="tel"
                  formControlName="whatsAppPhone"
                  inputmode="numeric"
                  maxlength="11"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                  placeholder="01xxxxxxxxx">
              </div>
            </div>

            <div>
              <label for="usr-pass" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_PASSWORD' | translate }} <span class="text-red-400">*</span></label>
              <input
                id="usr-pass"
                type="password"
                formControlName="password"
                autocomplete="new-password"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                placeholder="Min 6 characters">
            </div>

            <div>
              <label for="usr-role" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_ROLE' | translate }} <span class="text-red-400">*</span></label>
              <select
                id="usr-role"
                formControlName="role"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                <option value="Manager">{{ 'USERS.ROLES.Manager' | translate }}</option>
                <option value="Accountant">{{ 'USERS.ROLES.Accountant' | translate }}</option>
                <option value="SiteEngineer">{{ 'USERS.ROLES.SiteEngineer' | translate }}</option>
                <option value="DesignEngineer">{{ 'USERS.ROLES.DesignEngineer' | translate }}</option>
              </select>
            </div>

            <div class="flex flex-col-reverse md:flex-row justify-end gap-3 w-full p-4 border-t border-slate-900">
              <button
                type="button"
                (click)="closeUserModal()"
                class="w-full md:w-auto px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer font-cairo">
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button
                type="submit"
                [disabled]="userForm.invalid || isSavingUser()"
                class="w-full md:w-auto px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-cairo">
                {{ 'USERS.BTN_CREATE' | translate }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    @if (profileSuccessMessage()) {
      <div class="fixed bottom-6 left-6 z-[9999] flex items-center gap-3 px-5 py-3.5 bg-emerald-600/95 backdrop-blur-md border border-emerald-400/30 text-white rounded-2xl shadow-2xl font-cairo text-sm max-w-md animate-slide-in">
        <div class="p-1.5 bg-emerald-500/30 rounded-xl text-white shrink-0">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span class="font-bold">{{ profileSuccessMessage() }}</span>
      </div>
    }
  `, styles: ['/* angular:styles/component:css;60547454e3e8135280be7158b8d91fc117d8035eb620db6c0d2116771fec1347;E:/private/structo/structo/Structo.Client/src/app/features/dashboard/projects/projects.component.ts */\n.font-cairo {\n  font-family:\n    "Cairo",\n    "Inter",\n    sans-serif;\n}\n#profile-map,\n#map {\n  height: 350px !important;\n  min-height: 350px !important;\n  width: 100% !important;\n  display: block !important;\n}\n@keyframes slide-in-toast {\n  from {\n    opacity: 0;\n    transform: translateY(12px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.animate-slide-in {\n  animation: slide-in-toast 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n/*# sourceMappingURL=projects.component.css.map */\n'] }]
  }], null, { profileMapContainer: [{
    type: ViewChild,
    args: ["profileMapContainer"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectsComponent, { className: "ProjectsComponent", filePath: "src/app/features/dashboard/projects/projects.component.ts", lineNumber: 1467 });
})();
export {
  ProjectsComponent
};
//# sourceMappingURL=chunk-PUQ3LH37.js.map
