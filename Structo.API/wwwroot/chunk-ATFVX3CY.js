import {
  LanguageService
} from "./chunk-V45S3CYS.js";
import {
  TenantProfileService
} from "./chunk-FTG4CJWM.js";
import {
  TranslatePipe
} from "./chunk-P67FNHXX.js";
import {
  AuthService,
  NotificationService
} from "./chunk-S6E5JOGH.js";
import "./chunk-3XAG2D2P.js";
import {
  DomSanitizer,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-EJQP67NP.js";
import {
  DatePipe
} from "./chunk-FIWEE23C.js";
import {
  Component,
  HostListener,
  __spreadProps,
  __spreadValues,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
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
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-ODSQXAQU.js";

// src/app/core/components/notification-bell.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function NotificationBellComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 4);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.notifService.unreadCount() > 99 ? "99+" : ctx_r0.notifService.unreadCount(), " ");
  }
}
function NotificationBellComponent_Conditional_5_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 10);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.notifService.unreadCount(), " new ");
  }
}
function NotificationBellComponent_Conditional_5_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 16);
    \u0275\u0275domListener("click", function NotificationBellComponent_Conditional_5_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.markAllAsRead());
    });
    \u0275\u0275text(1, " Mark all read ");
    \u0275\u0275domElementEnd();
  }
}
function NotificationBellComponent_Conditional_5_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 13)(1, "div", 17);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(2, "svg", 18);
    \u0275\u0275domElement(3, "path", 19);
    \u0275\u0275domElementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(4, "p", 20);
    \u0275\u0275text(5, "No notifications yet");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p", 21);
    \u0275\u0275text(7, "You're all caught up! New notifications will appear here in real-time.");
    \u0275\u0275domElementEnd()();
  }
}
function NotificationBellComponent_Conditional_5_For_11_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 29);
  }
}
function NotificationBellComponent_Conditional_5_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 22);
    \u0275\u0275domListener("click", function NotificationBellComponent_Conditional_5_For_11_Template_button_click_0_listener() {
      const notif_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.handleClick(notif_r4));
    });
    \u0275\u0275domElementStart(1, "div", 23)(2, "span", 24);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "div", 25)(5, "p", 26);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "p", 27);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "p", 28);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(12, NotificationBellComponent_Conditional_5_For_11_Conditional_12_Template, 1, 0, "div", 29);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const notif_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-indigo-500/5", !notif_r4.isRead)("hover:bg-slate-800/60", notif_r4.isRead)("hover:bg-indigo-500/10", !notif_r4.isRead);
    \u0275\u0275domProperty("id", \u0275\u0275interpolate1("notif-item-", notif_r4.id));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.getTypeStyles(notif_r4.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getTypeEmoji(notif_r4.type));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(notif_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(notif_r4.message);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(11, 15, notif_r4.createdAt, "dd/MM/yyyy h:mm a"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!notif_r4.isRead ? 12 : -1);
  }
}
function NotificationBellComponent_Conditional_5_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 15)(1, "button", 30);
    \u0275\u0275domListener("click", function NotificationBellComponent_Conditional_5_Conditional_12_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.clearAll());
    });
    \u0275\u0275text(2, " Clear All / \u0645\u0633\u062D \u0627\u0644\u0643\u0644 ");
    \u0275\u0275domElementEnd()();
  }
}
function NotificationBellComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5)(1, "div", 6)(2, "div", 7);
    \u0275\u0275domElement(3, "div", 8);
    \u0275\u0275domElementStart(4, "span", 9);
    \u0275\u0275text(5, "Notifications");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(6, NotificationBellComponent_Conditional_5_Conditional_6_Template, 2, 1, "span", 10);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(7, NotificationBellComponent_Conditional_5_Conditional_7_Template, 2, 0, "button", 11);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "div", 12);
    \u0275\u0275conditionalCreate(9, NotificationBellComponent_Conditional_5_Conditional_9_Template, 8, 0, "div", 13);
    \u0275\u0275repeaterCreate(10, NotificationBellComponent_Conditional_5_For_11_Template, 13, 18, "button", 14, _forTrack0);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(12, NotificationBellComponent_Conditional_5_Conditional_12_Template, 3, 0, "div", 15);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r0.notifService.unreadCount() > 0 ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.notifService.unreadCount() > 0 ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.notifService.notifications().length === 0 ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.notifService.notifications());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.notifService.notifications().length > 0 ? 12 : -1);
  }
}
var NotificationBellComponent = class _NotificationBellComponent {
  notifService = inject(NotificationService);
  router = inject(Router);
  isOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onDocumentClick(event) {
    const target = event.target;
    if (!target.closest("#notification-bell-container")) {
      this.isOpen.set(false);
    }
  }
  toggleDropdown() {
    this.isOpen.update((v) => !v);
  }
  handleClick(notif) {
    this.notifService.markAsRead(notif.id);
    this.notifService.navigateDeepLink(notif.deepLink);
    this.isOpen.set(false);
  }
  markAllAsRead() {
    this.notifService.markAllAsRead();
  }
  clearAll() {
    this.notifService.clearAllNotifications();
  }
  getTypeEmoji(type) {
    const map = {
      Registration: "\u{1F3E2}",
      PettyCash: "\u{1F4B0}",
      Project: "\u{1F4CB}",
      System: "\u{1F514}"
    };
    return map[type] ?? "\u{1F514}";
  }
  getTypeStyles(type) {
    const map = {
      Registration: "bg-indigo-500/15 text-indigo-400",
      PettyCash: "bg-emerald-500/15 text-emerald-400",
      Project: "bg-blue-500/15 text-blue-400",
      System: "bg-slate-700/60 text-slate-400"
    };
    return map[type] ?? "bg-slate-700/60 text-slate-400";
  }
  static \u0275fac = function NotificationBellComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotificationBellComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationBellComponent, selectors: [["app-notification-bell"]], hostBindings: function NotificationBellComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function NotificationBellComponent_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 6, vars: 2, consts: [["id", "notification-bell-container", 1, "relative"], ["id", "notification-bell-btn", 1, "relative", "flex", "items-center", "justify-center", "w-10", "h-10", "rounded-xl", "border", "border-slate-800", "bg-slate-950/60", "text-slate-400", "hover:text-white", "hover:border-indigo-500/40", "hover:bg-indigo-500/10", "transition-all", "duration-200", "cursor-pointer", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.8", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"], [1, "absolute", "-top-1", "-right-1", "min-w-[18px]", "h-[18px]", "px-1", "flex", "items-center", "justify-center", "rounded-full", "bg-gradient-to-r", "from-red-500", "to-rose-600", "text-white", "text-[10px]", "font-extrabold", "shadow-lg", "shadow-red-500/40", "animate-pulse", "ring-2", "ring-slate-900"], ["id", "notification-dropdown", 1, "absolute", "end-0", "top-[calc(100%+10px)]", "w-[calc(100vw-2rem)]", "sm:w-[340px]", "max-h-[92vh]", "flex", "flex-col", "bg-slate-900", "border", "border-slate-800", "rounded-2xl", "shadow-2xl", "shadow-slate-950/80", "overflow-hidden", "z-50", "animate-slide-in"], [1, "flex", "items-center", "justify-between", "px-4", "py-3", "border-b", "border-slate-800", "shrink-0"], [1, "flex", "items-center", "gap-2"], [1, "w-2", "h-2", "rounded-full", "bg-indigo-500", "animate-pulse"], [1, "text-sm", "font-semibold", "text-slate-100"], [1, "text-[10px]", "font-bold", "px-1.5", "py-0.5", "rounded-full", "bg-indigo-500/20", "text-indigo-400", "border", "border-indigo-500/30"], [1, "text-[11px]", "font-medium", "text-slate-500", "hover:text-indigo-400", "transition-colors", "cursor-pointer"], ["id", "notification-list", 1, "overflow-y-auto", "min-h-0", "flex-1", "divide-y", "divide-slate-800/60"], [1, "flex", "flex-col", "items-center", "justify-center", "py-12", "px-4", "gap-3"], [1, "w-full", "flex", "items-start", "gap-3", "px-4", "py-3", "text-left", "transition-all", "duration-150", "cursor-pointer", "group", 3, "id", "bg-indigo-500/5", "hover:bg-slate-800/60", "hover:bg-indigo-500/10"], [1, "flex", "items-center", "justify-center", "p-2", "border-t", "border-slate-800", "shrink-0", "bg-slate-950/40"], [1, "text-[11px]", "font-medium", "text-slate-500", "hover:text-indigo-400", "transition-colors", "cursor-pointer", 3, "click"], [1, "w-12", "h-12", "rounded-full", "bg-slate-800", "flex", "items-center", "justify-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-6", "h-6", "text-slate-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"], [1, "text-sm", "text-slate-500", "font-medium"], [1, "text-xs", "text-slate-600", "text-center"], [1, "w-full", "flex", "items-start", "gap-3", "px-4", "py-3", "text-left", "transition-all", "duration-150", "cursor-pointer", "group", 3, "click", "id"], [1, "shrink-0", "mt-0.5", "w-8", "h-8", "rounded-lg", "flex", "items-center", "justify-center", "transition-transform", "duration-200", "group-hover:scale-105"], [1, "text-sm"], [1, "flex-1", "min-w-0"], [1, "text-sm", "font-semibold", "text-slate-100", "leading-snug", "truncate"], [1, "text-xs", "text-slate-400", "mt-0.5", "line-clamp-2", "leading-relaxed"], [1, "text-[10px]", "text-slate-600", "mt-1.5", "font-medium"], [1, "shrink-0", "mt-2", "w-2", "h-2", "rounded-full", "bg-indigo-500", "shadow-md", "shadow-indigo-500/40"], [1, "w-full", "py-1.5", "text-center", "text-xs", "font-semibold", "text-rose-500", "hover:text-rose-400", "hover:bg-rose-500/5", "rounded-lg", "transition-all", "cursor-pointer", 3, "click"]], template: function NotificationBellComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275domListener("click", function NotificationBellComponent_Template_button_click_1_listener() {
        return ctx.toggleDropdown();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(2, "svg", 2);
      \u0275\u0275domElement(3, "path", 3);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(4, NotificationBellComponent_Conditional_4_Template, 2, 1, "span", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(5, NotificationBellComponent_Conditional_5_Template, 13, 4, "div", 5);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.notifService.unreadCount() > 0 ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isOpen() ? 5 : -1);
    }
  }, dependencies: [DatePipe], styles: ["\n@keyframes _ngcontent-%COMP%_slide-in {\n  from {\n    opacity: 0;\n    transform: translateY(-8px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.animate-slide-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slide-in 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n.line-clamp-2[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n/*# sourceMappingURL=notification-bell.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationBellComponent, [{
    type: Component,
    args: [{ selector: "app-notification-bell", standalone: true, imports: [DatePipe], template: `
    <!-- Bell Button -->
    <div class="relative" id="notification-bell-container">
      <button
        id="notification-bell-btn"
        (click)="toggleDropdown()"
        class="relative flex items-center justify-center w-10 h-10 rounded-xl border border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-200 cursor-pointer">

        <!-- Bell Icon -->
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>

        <!-- Unread Badge -->
        @if (notifService.unreadCount() > 0) {
          <span
            class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center
                   rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-extrabold
                   shadow-lg shadow-red-500/40 animate-pulse ring-2 ring-slate-900">
            {{ notifService.unreadCount() > 99 ? '99+' : notifService.unreadCount() }}
          </span>
        }
      </button>

      <!-- Dropdown Panel -->
      @if (isOpen()) {
        <div
          id="notification-dropdown"
          class="absolute end-0 top-[calc(100%+10px)] w-[calc(100vw-2rem)] sm:w-[340px] max-h-[92vh] flex flex-col
                 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-slate-950/80
                 overflow-hidden z-50 animate-slide-in">

          <!-- Header -->
          <div class="flex items-center justify-between px-4 py-3 border-b border-slate-800 shrink-0">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
              <span class="text-sm font-semibold text-slate-100">Notifications</span>
              @if (notifService.unreadCount() > 0) {
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  {{ notifService.unreadCount() }} new
                </span>
              }
            </div>
            @if (notifService.unreadCount() > 0) {
              <button
                (click)="markAllAsRead()"
                class="text-[11px] font-medium text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer">
                Mark all read
              </button>
            }
          </div>

          <!-- Notification list -->
          <div class="overflow-y-auto min-h-0 flex-1 divide-y divide-slate-800/60" id="notification-list">
            @if (notifService.notifications().length === 0) {
              <div class="flex flex-col items-center justify-center py-12 px-4 gap-3">
                <div class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                  <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p class="text-sm text-slate-500 font-medium">No notifications yet</p>
                <p class="text-xs text-slate-600 text-center">You're all caught up! New notifications will appear here in real-time.</p>
              </div>
            }

            @for (notif of notifService.notifications(); track notif.id) {
              <button
                id="notif-item-{{ notif.id }}"
                (click)="handleClick(notif)"
                class="w-full flex items-start gap-3 px-4 py-3 text-left transition-all duration-150 cursor-pointer group"
                [class.bg-indigo-500/5]="!notif.isRead"
                [class.hover:bg-slate-800/60]="notif.isRead"
                [class.hover:bg-indigo-500/10]="!notif.isRead">

                <!-- Icon by type -->
                <div class="shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                     [class]="getTypeStyles(notif.type)">
                  <span class="text-sm">{{ getTypeEmoji(notif.type) }}</span>
                </div>

                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-slate-100 leading-snug truncate">{{ notif.title }}</p>
                  <p class="text-xs text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">{{ notif.message }}</p>
                  <p class="text-[10px] text-slate-600 mt-1.5 font-medium">
                    {{ notif.createdAt | date:'dd/MM/yyyy h:mm a' }}
                  </p>
                </div>

                <!-- Unread dot -->
                @if (!notif.isRead) {
                  <div class="shrink-0 mt-2 w-2 h-2 rounded-full bg-indigo-500 shadow-md shadow-indigo-500/40"></div>
                }
              </button>
            }
          </div>

          <!-- Footer -->
          @if (notifService.notifications().length > 0) {
            <div class="flex items-center justify-center p-2 border-t border-slate-800 shrink-0 bg-slate-950/40">
              <button
                (click)="clearAll()"
                class="w-full py-1.5 text-center text-xs font-semibold text-rose-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-lg transition-all cursor-pointer">
                Clear All / \u0645\u0633\u062D \u0627\u0644\u0643\u0644
              </button>
            </div>
          }
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:css;c0838adc45d264b63f5c3c52f297480c4bfc5b6e8ce1c4852823086810b07008;E:/private/structo/structo/Structo.Client/src/app/core/components/notification-bell.component.ts */\n@keyframes slide-in {\n  from {\n    opacity: 0;\n    transform: translateY(-8px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.animate-slide-in {\n  animation: slide-in 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n.line-clamp-2 {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n/*# sourceMappingURL=notification-bell.component.css.map */\n"] }]
  }], null, { onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationBellComponent, { className: "NotificationBellComponent", filePath: "src/app/core/components/notification-bell.component.ts", lineNumber: 139 });
})();

// src/app/features/dashboard/dashboard-layout.component.ts
var _c0 = () => ({ exact: false });
var _forTrack02 = ($index, $item) => $item.route;
function DashboardLayoutComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function DashboardLayoutComponent_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openUpgradeModal());
    });
    \u0275\u0275elementStart(1, "span", 30);
    \u0275\u0275text(2, "\u{1F48E}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4, "\u0634\u0631\u0627\u0621 / \u062A\u0631\u0642\u064A\u0629 \u0645\u0634\u0627\u0631\u064A\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 32);
    \u0275\u0275text(6, "\u062A\u0631\u0642\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 33);
    \u0275\u0275text(8, "+\u0625\u0636\u0627\u0641\u0629");
    \u0275\u0275elementEnd()();
  }
}
function DashboardLayoutComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275listener("click", function DashboardLayoutComponent_Conditional_27_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebar());
    });
    \u0275\u0275elementEnd();
  }
}
function DashboardLayoutComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 35);
    \u0275\u0275listener("click", function DashboardLayoutComponent_For_34_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebar());
    });
    \u0275\u0275element(1, "span", 36);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r5.route)("routerLinkActiveOptions", \u0275\u0275pureFunction0(6, _c0));
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", item_r5.icon, \u0275\u0275sanitizeHtml);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 4, item_r5.label));
  }
}
function DashboardLayoutComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "span", 37);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 38);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 3, "DASHBOARD.TENANT_ENV"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r1.authService.currentUser()?.tenantId ?? "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.authService.currentUser()?.tenantId, " ");
  }
}
function DashboardLayoutComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 39);
    \u0275\u0275element(2, "path", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "div")(4, "h4", 41);
    \u0275\u0275text(5, "\u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0645\u0644\u0641 \u0634\u062E\u0635\u064A\u0627\u064B / Legal profile setup required");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 42);
    \u0275\u0275text(7, "\u26A0\uFE0F \u062D\u0633\u0627\u0628\u0643 \u0645\u0641\u0639\u0644 \u0648\u0645\u0642\u0628\u0648\u0644\u060C \u0648\u0644\u0643\u0646 \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0628\u0627\u0642\u064A \u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0644\u062A\u062C\u0646\u0628 \u062A\u0639\u0644\u064A\u0642 \u0627\u0644\u062D\u0633\u0627\u0628 \u0645\u0633\u062A\u0642\u0628\u0644\u0627\u064B.");
    \u0275\u0275elementEnd()()();
  }
}
var DashboardLayoutComponent = class _DashboardLayoutComponent {
  authService = inject(AuthService);
  langService = inject(LanguageService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  sanitizer = inject(DomSanitizer);
  profileService = inject(TenantProfileService);
  isSidebarOpen = signal(
    typeof window !== "undefined" ? window.innerWidth >= 768 : false,
    ...ngDevMode ? [{ debugName: "isSidebarOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    const user = this.authService.currentUser();
    if (user) {
      this.notificationService.initializeOneSignal(user.userId, user.email);
    }
  }
  ngOnInit() {
    const user = this.authService.currentUser();
    if (user && ["tenantowner", "admin"].includes(user.role.toLowerCase())) {
      this.profileService.getProfile().subscribe({
        next: (res) => {
          if (res.success && res.data) {
            if (res.data.latitude && res.data.region) {
              const updatedUser = __spreadProps(__spreadValues({}, user), { isProfileComplete: true });
              this.authService.currentUser.set(updatedUser);
            }
          }
        }
      });
    }
  }
  // SVG icons for sidebar items
  icons = {
    overview: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>`,
    tenants: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>`,
    projects: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
    financials: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
    pettyCash: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    profile: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`
  };
  // Role-based navigation computed from auth state (using translation keys instead of raw text)
  menuItems = computed(
    () => {
      const role = this.authService.currentUser()?.role;
      switch (role) {
        case "SuperAdmin":
          return [
            { label: "DASHBOARD.GLOBAL_OVERVIEW", route: "/dashboard/overview", icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.overview) },
            { label: "DASHBOARD.TENANTS_MGMT", route: "/dashboard/tenants", icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.tenants) },
            { label: "Pending Approvals / \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A", route: "/dashboard/pending-users", icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.users) }
          ];
        case "TenantOwner":
          return [
            { label: "DASHBOARD.FINANCIALS", route: "/dashboard/financials", icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.financials) },
            { label: "PROJECTS.PAGE_TITLE", route: "/dashboard/projects", icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.projects) },
            { label: "USERS.TAB_USERS", route: "/dashboard/users", icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.users) },
            { label: "PROFILE.TAB_PROFILE", route: "/dashboard/profile", icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.profile) }
          ];
        case "Accountant":
          return [
            { label: "DASHBOARD.FINANCIALS", route: "/dashboard/financials", icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.financials) },
            { label: "PROJECTS.PAGE_TITLE", route: "/dashboard/projects", icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.projects) }
          ];
        case "Manager":
        case "SiteEngineer":
        case "DesignEngineer":
          return [
            { label: "My Custody / \u0639\u0647\u062F\u064A", route: "/dashboard/projects", icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.pettyCash) }
          ];
        default:
          return [];
      }
    },
    ...ngDevMode ? [{ debugName: "menuItems" }] : (
      /* istanbul ignore next */
      []
    )
  );
  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }
  closeSidebar() {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      this.isSidebarOpen.set(false);
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
  openUpgradeModal() {
    this.router.navigate(["/dashboard/projects"], { queryParams: { upgrade: "true" } });
  }
  static \u0275fac = function DashboardLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardLayoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardLayoutComponent, selectors: [["app-dashboard-layout"]], decls: 46, vars: 31, consts: [[1, "min-h-screen", "bg-slate-950", "text-slate-100", "font-sans", "flex", "flex-col"], [1, "bg-slate-900", "border-b", "border-slate-800", "fixed", "top-0", "left-0", "w-full", "h-16", "flex", "items-center", "justify-between", "px-4", "z-40"], [1, "flex", "items-center", "gap-3"], [1, "p-2", "rounded-lg", "text-slate-400", "hover:text-white", "hover:bg-slate-800", "focus:outline-none", "transition-colors", "duration-200", "cursor-pointer", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-6", "w-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 6h16M4 12h16M4 18h16"], ["src", "assets/images/default-tenant-logo.png", "alt", "Osos Logo", 1, "h-9", "w-auto", "object-contain"], [1, "text-lg", "font-bold", "tracking-tight", "bg-gradient-to-r", "from-white", "to-slate-400", "bg-clip-text", "text-transparent", "hidden", "sm:inline-block"], [1, "flex", "items-center", "gap-3", "sm:gap-4"], ["title", "\u0627\u0646\u0642\u0631 \u0644\u062A\u0631\u0642\u064A\u0629 \u0627\u0644\u0628\u0627\u0642\u0629 \u0648\u0632\u064A\u0627\u062F\u0629 \u0633\u0639\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 / Upgrade Capacity", 1, "flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-xl", "bg-gradient-to-r", "from-amber-500/15", "via-indigo-500/15", "to-purple-500/15", "hover:from-amber-500/25", "hover:via-indigo-500/25", "hover:to-purple-500/25", "border", "border-amber-500/35", "text-amber-300", "hover:text-amber-200", "text-xs", "font-bold", "font-cairo", "transition-all", "shadow-md", "shadow-amber-500/10", "active:scale-95", "cursor-pointer"], [1, "text-xs", "font-semibold", "text-indigo-400", "hover:text-indigo-300", "transition-all", "duration-200", "cursor-pointer", "px-2.5", "py-1.5", "rounded-lg", "border", "border-indigo-500/20", "bg-indigo-500/5", "hover:bg-indigo-500/10", "active:scale-95", 3, "click"], [1, "hidden", "md:flex", "flex-col", "text-right", "rtl:text-left"], [1, "text-xs", "font-semibold", "text-slate-500"], [1, "text-sm", "font-medium", "text-slate-200"], [1, "px-2", "py-0.5", "rounded-full", "text-xs", "font-semibold", "bg-indigo-500/10", "text-indigo-400", "border", "border-indigo-500/20", "uppercase", "tracking-wide"], [1, "px-3", "py-1.5", "rounded-lg", "border", "border-slate-800", "hover:border-red-500/40", "bg-slate-950", "hover:bg-red-950/20", "text-xs", "font-semibold", "text-slate-400", "hover:text-red-400", "transition-all", "duration-200", "cursor-pointer", 3, "click"], [1, "flex", "flex-1", "pt-16", "h-screen", "overflow-hidden"], [1, "fixed", "inset-0", "bg-slate-950/70", "backdrop-blur-sm", "z-30", "md:hidden"], [1, "fixed", "md:relative", "inset-y-0", "start-0", "pt-16", "md:pt-0", "bg-slate-900", "flex", "flex-col", "z-[35]", "md:z-20", "transition-all", "duration-300", "ease-in-out", "overflow-hidden"], [1, "flex-1", "px-4", "py-6", "space-y-1", "overflow-y-auto"], [1, "text-[10px]", "font-extrabold", "tracking-wider", "text-slate-500", "uppercase", "px-3", "block", "mb-4"], ["routerLinkActive", "bg-slate-800 text-indigo-400 border-indigo-500/40", 1, "flex", "items-center", "gap-3", "px-3", "py-2.5", "rounded-xl", "border", "border-transparent", "text-sm", "font-medium", "text-slate-400", "hover:text-slate-100", "hover:bg-slate-800/60", "transition-all", "duration-200", 3, "routerLink", "routerLinkActiveOptions"], [1, "w-full", "flex", "items-center", "gap-3", "px-3", "py-2.5", "rounded-xl", "border", "border-transparent", "text-sm", "font-medium", "text-red-400", "hover:text-red-300", "hover:bg-red-950/20", "transition-all", "duration-200", "text-right", "rtl:text-left", "cursor-pointer", "focus:outline-none", "mt-4", "border-t", "border-slate-800/60", "pt-4", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"], [1, "p-4", "border-t", "border-slate-800", "bg-slate-950/40"], [1, "flex-1", "overflow-y-auto", "bg-slate-950", "p-4", "sm:p-6", "lg:p-8", "pb-20", "md:pb-8"], [1, "max-w-7xl", "mx-auto", "w-full", "space-y-6"], [1, "mb-6", "bg-amber-500/10", "border", "border-amber-500/20", "text-amber-400", "rounded-2xl", "p-4", "flex", "items-start", "gap-3", "shadow-lg", "shadow-amber-500/5", "font-cairo"], ["title", "\u0627\u0646\u0642\u0631 \u0644\u062A\u0631\u0642\u064A\u0629 \u0627\u0644\u0628\u0627\u0642\u0629 \u0648\u0632\u064A\u0627\u062F\u0629 \u0633\u0639\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 / Upgrade Capacity", 1, "flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-xl", "bg-gradient-to-r", "from-amber-500/15", "via-indigo-500/15", "to-purple-500/15", "hover:from-amber-500/25", "hover:via-indigo-500/25", "hover:to-purple-500/25", "border", "border-amber-500/35", "text-amber-300", "hover:text-amber-200", "text-xs", "font-bold", "font-cairo", "transition-all", "shadow-md", "shadow-amber-500/10", "active:scale-95", "cursor-pointer", 3, "click"], [1, "text-amber-400", "animate-pulse", "text-sm"], [1, "hidden", "sm:inline"], [1, "sm:hidden"], [1, "text-[10px]", "bg-amber-500/30", "text-amber-200", "px-1.5", "py-0.5", "rounded", "font-mono", "font-bold"], [1, "fixed", "inset-0", "bg-slate-950/70", "backdrop-blur-sm", "z-30", "md:hidden", 3, "click"], ["routerLinkActive", "bg-slate-800 text-indigo-400 border-indigo-500/40", 1, "flex", "items-center", "gap-3", "px-3", "py-2.5", "rounded-xl", "border", "border-transparent", "text-sm", "font-medium", "text-slate-400", "hover:text-slate-100", "hover:bg-slate-800/60", "transition-all", "duration-200", 3, "click", "routerLink", "routerLinkActiveOptions"], [1, "h-5", "w-5", "shrink-0", "flex", "items-center", "justify-center", 3, "innerHTML"], [1, "text-[10px]", "font-extrabold", "text-slate-500", "tracking-wider", "uppercase", "block"], [1, "text-xs", "font-mono", "text-slate-400", "truncate", "block", "mt-1", "select-all", 3, "title"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-amber-400", "shrink-0", "mt-0.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"], [1, "font-bold", "text-sm", "text-white"], [1, "text-xs", "text-amber-200/80", "mt-1", "font-semibold"]], template: function DashboardLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "div", 2)(3, "button", 3);
      \u0275\u0275listener("click", function DashboardLayoutComponent_Template_button_click_3_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(4, "svg", 4);
      \u0275\u0275element(5, "path", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(6, "div", 2);
      \u0275\u0275element(7, "img", 6);
      \u0275\u0275elementStart(8, "span", 7);
      \u0275\u0275text(9, "\u0623\u064F\u0633\u064F\u0633 / Osos");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 8);
      \u0275\u0275conditionalCreate(11, DashboardLayoutComponent_Conditional_11_Template, 9, 0, "button", 9);
      \u0275\u0275elementStart(12, "button", 10);
      \u0275\u0275listener("click", function DashboardLayoutComponent_Template_button_click_12_listener() {
        return ctx.langService.toggleLanguage();
      });
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275element(14, "app-notification-bell");
      \u0275\u0275elementStart(15, "div", 11)(16, "span", 12);
      \u0275\u0275text(17);
      \u0275\u0275pipe(18, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "span", 13);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "span", 14);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "button", 15);
      \u0275\u0275listener("click", function DashboardLayoutComponent_Template_button_click_23_listener() {
        return ctx.logout();
      });
      \u0275\u0275text(24);
      \u0275\u0275pipe(25, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 16);
      \u0275\u0275conditionalCreate(27, DashboardLayoutComponent_Conditional_27_Template, 1, 0, "div", 17);
      \u0275\u0275elementStart(28, "aside", 18)(29, "div", 19)(30, "span", 20);
      \u0275\u0275text(31);
      \u0275\u0275pipe(32, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(33, DashboardLayoutComponent_For_34_Template, 5, 7, "a", 21, _forTrack02);
      \u0275\u0275elementStart(35, "button", 22);
      \u0275\u0275listener("click", function DashboardLayoutComponent_Template_button_click_35_listener() {
        return ctx.logout();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(36, "svg", 23);
      \u0275\u0275element(37, "path", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(38, "span");
      \u0275\u0275text(39);
      \u0275\u0275pipe(40, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(41, DashboardLayoutComponent_Conditional_41_Template, 6, 5, "div", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "main", 26)(43, "div", 27);
      \u0275\u0275conditionalCreate(44, DashboardLayoutComponent_Conditional_44_Template, 8, 0, "div", 28);
      \u0275\u0275element(45, "router-outlet");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.authService.currentUser()?.role !== "SuperAdmin" ? 11 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.langService.currentLang() === "en" ? "\u0639\u0631\u0628\u064A" : "English", " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 23, "DASHBOARD.LOGGED_IN_AS"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.authService.currentUser()?.name);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.authService.currentUser()?.role, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(25, 25, "COMMON.LOGOUT"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.isSidebarOpen() ? 27 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("w-64", ctx.isSidebarOpen())("w-0", !ctx.isSidebarOpen())("border-e", ctx.isSidebarOpen())("border-slate-800", ctx.isSidebarOpen())("sidebar-open", ctx.isSidebarOpen())("sidebar-closed", !ctx.isSidebarOpen());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(32, 27, "DASHBOARD.SIDEBAR_NAV"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.menuItems());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(40, 29, "COMMON.LOGOUT"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.authService.currentUser()?.tenantId ? 41 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.authService.currentUser()?.isApproved && ctx.authService.currentUser()?.isProfileComplete === false ? 44 : -1);
    }
  }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive, NotificationBellComponent, TranslatePipe], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 100vh;\n}\naside[_ngcontent-%COMP%] {\n  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;\n}\n[_nghost-%COMP%]     html[dir=ltr] .sidebar-closed {\n  transform: translateX(-100%);\n}\n[_nghost-%COMP%]     html[dir=rtl] .sidebar-closed {\n  transform: translateX(100%);\n}\n.sidebar-open[_ngcontent-%COMP%] {\n  transform: translateX(0) !important;\n}\n@media (min-width: 768px) {\n  .sidebar-closed[_ngcontent-%COMP%] {\n    transform: translateX(0) !important;\n    width: 16rem !important;\n  }\n}\n/*# sourceMappingURL=dashboard-layout.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard-layout", standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe, NotificationBellComponent], template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">

      <!-- Top Navbar -->
      <nav class="bg-slate-900 border-b border-slate-800 fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 z-40">
        <!-- Brand & Mobile Toggle -->
        <div class="flex items-center gap-3">
          <button
            (click)="toggleSidebar()"
            class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors duration-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div class="flex items-center gap-3">
            <img src="assets/images/default-tenant-logo.png" alt="Osos Logo" class="h-9 w-auto object-contain">
            <span class="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent hidden sm:inline-block">\u0623\u064F\u0633\u064F\u0633 / Osos</span>
          </div>
        </div>

        <!-- User info, Language & Logout -->
        <div class="flex items-center gap-3 sm:gap-4">
          
          <!-- Clickable Subscription Upgrade Badge for Tenant Users -->
          @if (authService.currentUser()?.role !== 'SuperAdmin') {
            <button 
              (click)="openUpgradeModal()"
              title="\u0627\u0646\u0642\u0631 \u0644\u062A\u0631\u0642\u064A\u0629 \u0627\u0644\u0628\u0627\u0642\u0629 \u0648\u0632\u064A\u0627\u062F\u0629 \u0633\u0639\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 / Upgrade Capacity"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-indigo-500/15 to-purple-500/15 hover:from-amber-500/25 hover:via-indigo-500/25 hover:to-purple-500/25 border border-amber-500/35 text-amber-300 hover:text-amber-200 text-xs font-bold font-cairo transition-all shadow-md shadow-amber-500/10 active:scale-95 cursor-pointer">
              <span class="text-amber-400 animate-pulse text-sm">\u{1F48E}</span>
              <span class="hidden sm:inline">\u0634\u0631\u0627\u0621 / \u062A\u0631\u0642\u064A\u0629 \u0645\u0634\u0627\u0631\u064A\u0639</span>
              <span class="sm:hidden">\u062A\u0631\u0642\u064A\u0629</span>
              <span class="text-[10px] bg-amber-500/30 text-amber-200 px-1.5 py-0.5 rounded font-mono font-bold">+\u0625\u0636\u0627\u0641\u0629</span>
            </button>
          }

          <button 
            (click)="langService.toggleLanguage()"
            class="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-all duration-200 cursor-pointer px-2.5 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 active:scale-95">
            {{ langService.currentLang() === 'en' ? '\u0639\u0631\u0628\u064A' : 'English' }}
          </button>

          <!-- Notification Bell -->
          <app-notification-bell></app-notification-bell>

          <div class="hidden md:flex flex-col text-right rtl:text-left">
            <span class="text-xs font-semibold text-slate-500">{{ 'DASHBOARD.LOGGED_IN_AS' | translate }}</span>
            <span class="text-sm font-medium text-slate-200">{{ authService.currentUser()?.name }}</span>
          </div>
          <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wide">
            {{ authService.currentUser()?.role }}
          </span>
          <button
            (click)="logout()"
            class="px-3 py-1.5 rounded-lg border border-slate-800 hover:border-red-500/40 bg-slate-950 hover:bg-red-950/20 text-xs font-semibold text-slate-400 hover:text-red-400 transition-all duration-200 cursor-pointer">
            {{ 'COMMON.LOGOUT' | translate }}
          </button>
        </div>
      </nav>

      <!-- Sidebar + Main content -->
      <div class="flex flex-1 pt-16 h-screen overflow-hidden">

        <!-- Mobile Backdrop -->
        @if (isSidebarOpen()) {
          <div
            (click)="closeSidebar()"
            class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-30 md:hidden">
          </div>
        }

        <!-- Sidebar -->
        <aside
          class="fixed md:relative inset-y-0 start-0 pt-16 md:pt-0 bg-slate-900 flex flex-col z-[35] md:z-20 transition-all duration-300 ease-in-out overflow-hidden"
          [class.w-64]="isSidebarOpen()"
          [class.w-0]="!isSidebarOpen()"
          [class.border-e]="isSidebarOpen()"
          [class.border-slate-800]="isSidebarOpen()"
          [class.sidebar-open]="isSidebarOpen()"
          [class.sidebar-closed]="!isSidebarOpen()">

          <div class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <span class="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase px-3 block mb-4">
              {{ 'DASHBOARD.SIDEBAR_NAV' | translate }}
            </span>

            @for (item of menuItems(); track item.route) {
              <a
                [routerLink]="item.route"
                routerLinkActive="bg-slate-800 text-indigo-400 border-indigo-500/40"
                [routerLinkActiveOptions]="{ exact: false }"
                (click)="closeSidebar()"
                class="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all duration-200">
                <span [innerHTML]="item.icon" class="h-5 w-5 shrink-0 flex items-center justify-center"></span>
                <span>{{ item.label | translate }}</span>
              </a>
            }

            <!-- Sidebar Sign Out Option (Visible inside mobile/desktop sidebar menu list) -->
            <button
              (click)="logout()"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all duration-200 text-right rtl:text-left cursor-pointer focus:outline-none mt-4 border-t border-slate-800/60 pt-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>{{ 'COMMON.LOGOUT' | translate }}</span>
            </button>
          </div>

          <!-- Bottom Tenant Info -->
          @if (authService.currentUser()?.tenantId) {
            <div class="p-4 border-t border-slate-800 bg-slate-950/40">
              <span class="text-[10px] font-extrabold text-slate-500 tracking-wider uppercase block">
                {{ 'DASHBOARD.TENANT_ENV' | translate }}
              </span>
              <span class="text-xs font-mono text-slate-400 truncate block mt-1 select-all" [title]="authService.currentUser()?.tenantId ?? ''">
                {{ authService.currentUser()?.tenantId }}
              </span>
            </div>
          }
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
          <div class="max-w-7xl mx-auto w-full space-y-6">
            <!-- Profile incomplete warning banner -->
            @if (authService.currentUser()?.isApproved && authService.currentUser()?.isProfileComplete === false) {
              <div class="mb-6 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl p-4 flex items-start gap-3 shadow-lg shadow-amber-500/5 font-cairo">
                <svg class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 class="font-bold text-sm text-white">\u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0645\u0644\u0641 \u0634\u062E\u0635\u064A\u0627\u064B / Legal profile setup required</h4>
                  <p class="text-xs text-amber-200/80 mt-1 font-semibold">\u26A0\uFE0F \u062D\u0633\u0627\u0628\u0643 \u0645\u0641\u0639\u0644 \u0648\u0645\u0642\u0628\u0648\u0644\u060C \u0648\u0644\u0643\u0646 \u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0628\u0627\u0642\u064A \u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0644\u062A\u062C\u0646\u0628 \u062A\u0639\u0644\u064A\u0642 \u0627\u0644\u062D\u0633\u0627\u0628 \u0645\u0633\u062A\u0642\u0628\u0644\u0627\u064B.</p>
                </div>
              </div>
            }
            <router-outlet></router-outlet>
          </div>
        </main>

      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;6b1460c52fb0f11cf414e8eae98182ee2525e84da6dd2105bf1208a8bd9c8acd;E:/private/structo/structo/Structo.Client/src/app/features/dashboard/dashboard-layout.component.ts */\n:host {\n  display: block;\n  height: 100vh;\n}\naside {\n  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;\n}\n:host ::ng-deep html[dir=ltr] .sidebar-closed {\n  transform: translateX(-100%);\n}\n:host ::ng-deep html[dir=rtl] .sidebar-closed {\n  transform: translateX(100%);\n}\n.sidebar-open {\n  transform: translateX(0) !important;\n}\n@media (min-width: 768px) {\n  .sidebar-closed {\n    transform: translateX(0) !important;\n    width: 16rem !important;\n  }\n}\n/*# sourceMappingURL=dashboard-layout.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardLayoutComponent, { className: "DashboardLayoutComponent", filePath: "src/app/features/dashboard/dashboard-layout.component.ts", lineNumber: 190 });
})();
export {
  DashboardLayoutComponent
};
//# sourceMappingURL=chunk-ATFVX3CY.js.map
