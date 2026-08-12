import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext
} from "./chunk-EHUV6UVS.js";

// src/app/features/dashboard/overview/overview.component.ts
var OverviewComponent = class _OverviewComponent {
  static \u0275fac = function OverviewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OverviewComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OverviewComponent, selectors: [["app-overview"]], decls: 79, vars: 0, consts: [[1, "space-y-6", "w-full", "max-w-7xl", "mx-auto"], [1, "text-2xl", "font-extrabold", "tracking-tight", "text-white", "sm:text-3xl", "font-cairo"], [1, "text-sm", "text-slate-400", "mt-1", "font-cairo"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-4", "sm:gap-6"], [1, "bg-slate-900/40", "border", "border-slate-800/80", "rounded-2xl", "p-5"], [1, "text-xs", "text-slate-500", "font-bold", "uppercase", "tracking-wider", "font-cairo"], [1, "text-3xl", "font-extrabold", "text-white", "mt-1", "font-mono", "tabular-nums"], [1, "text-xs", "text-emerald-400", "mt-1", "font-mono", "tabular-nums"], [1, "text-3xl", "font-extrabold", "text-indigo-400", "mt-1", "font-mono", "tabular-nums"], [1, "text-xs", "text-slate-500", "mt-1", "font-mono", "tabular-nums"], [1, "text-3xl", "font-extrabold", "text-emerald-400", "mt-1", "font-mono", "tabular-nums"], [1, "text-xs", "text-slate-400", "mt-1", "font-mono", "tabular-nums"], [1, "text-3xl", "font-extrabold", "text-amber-400", "mt-1", "font-mono", "tabular-nums"], [1, "text-xs", "text-slate-500", "mt-1", "font-cairo"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "gap-6"], [1, "lg:col-span-2", "bg-slate-900/25", "border", "border-slate-800/80", "rounded-2xl", "p-6", "backdrop-blur-sm"], [1, "text-lg", "font-bold", "text-white", "mb-4"], [1, "space-y-4"], [1, "flex", "items-start", "space-x-3", "p-3", "rounded-xl", "bg-slate-900", "border", "border-slate-800/80"], [1, "h-2", "w-2", "mt-1.5", "rounded-full", "bg-emerald-500"], [1, "text-sm", "font-semibold", "text-white"], [1, "text-xs", "text-slate-400", "mt-0.5"], [1, "h-2", "w-2", "mt-1.5", "rounded-full", "bg-amber-500"], [1, "bg-slate-900/25", "border", "border-slate-800/80", "rounded-2xl", "p-6", "backdrop-blur-sm", "flex", "flex-col", "justify-between"], [1, "text-lg", "font-bold", "text-white", "mb-2"], [1, "text-sm", "text-slate-400", "mb-6"], [1, "flex", "justify-between", "text-xs", "text-slate-400", "mb-1"], [1, "bg-slate-950", "h-2", "rounded-full", "overflow-hidden", "border", "border-slate-800"], [1, "bg-indigo-500", "h-full", "w-[17%]", "rounded-full"], [1, "bg-purple-500", "h-full", "w-[14%]", "rounded-full"], [1, "text-slate-600", "text-[10px]", "uppercase", "font-bold", "tracking-wider", "pt-8", "block", "text-center"]], template: function OverviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div")(2, "h1", 1);
      \u0275\u0275text(3, "Global System Overview");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "p", 2);
      \u0275\u0275text(5, "Real-time diagnostics and global status reports of all host environments.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(6, "div", 3)(7, "div", 4)(8, "span", 5);
      \u0275\u0275text(9, "Active Tenants");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "h3", 6);
      \u0275\u0275text(11, "12");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "p", 7);
      \u0275\u0275text(13, "\u2191 8.3% vs last month");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(14, "div", 4)(15, "span", 5);
      \u0275\u0275text(16, "Global DB Size");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(17, "h3", 8);
      \u0275\u0275text(18, "1.42 GB");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(19, "p", 9);
      \u0275\u0275text(20, "Daily delta: +22MB");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(21, "div", 4)(22, "span", 5);
      \u0275\u0275text(23, "API Latency");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(24, "h3", 10);
      \u0275\u0275text(25, "42 ms");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(26, "p", 11);
      \u0275\u0275text(27, "99th percentile: 120ms");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(28, "div", 4)(29, "span", 5);
      \u0275\u0275text(30, "System CPU");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(31, "h3", 12);
      \u0275\u0275text(32, "14.8%");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(33, "p", 13);
      \u0275\u0275text(34, "Status: Stable");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(35, "div", 14)(36, "div", 15)(37, "h3", 16);
      \u0275\u0275text(38, "Core System Alerts");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(39, "div", 17)(40, "div", 18);
      \u0275\u0275domElement(41, "span", 19);
      \u0275\u0275domElementStart(42, "div")(43, "h4", 20);
      \u0275\u0275text(44, "PostgreSQL Migrations Complete");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(45, "p", 21);
      \u0275\u0275text(46, "Database schema matches v1.0.3 specifications. Indexes rebuilt successfully.");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(47, "div", 18);
      \u0275\u0275domElement(48, "span", 22);
      \u0275\u0275domElementStart(49, "div")(50, "h4", 20);
      \u0275\u0275text(51, "Daily Backup Completed with Warnings");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(52, "p", 21);
      \u0275\u0275text(53, "GCS Storage sync completed. Backup file structo_backup_2026-06-21.sql generated.");
      \u0275\u0275domElementEnd()()()()();
      \u0275\u0275domElementStart(54, "div", 23)(55, "div")(56, "h3", 24);
      \u0275\u0275text(57, "Resource Monitor");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(58, "p", 25);
      \u0275\u0275text(59, "Internal server allocations for Structo API daemon instance.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(60, "div", 17)(61, "div")(62, "div", 26)(63, "span");
      \u0275\u0275text(64, "Memory Alloc (RAM)");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(65, "span");
      \u0275\u0275text(66, "342 MB / 2048 MB");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(67, "div", 27);
      \u0275\u0275domElement(68, "div", 28);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(69, "div")(70, "div", 26)(71, "span");
      \u0275\u0275text(72, "Disk Storage");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(73, "span");
      \u0275\u0275text(74, "14.2 GB / 100 GB");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(75, "div", 27);
      \u0275\u0275domElement(76, "div", 29);
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElementStart(77, "span", 30);
      \u0275\u0275text(78, "Last update: just now");
      \u0275\u0275domElementEnd()()()();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverviewComponent, [{
    type: Component,
    args: [{
      selector: "app-overview",
      standalone: true,
      imports: [],
      template: `
    <div class="space-y-6 w-full max-w-7xl mx-auto">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-white sm:text-3xl font-cairo">Global System Overview</h1>
        <p class="text-sm text-slate-400 mt-1 font-cairo">Real-time diagnostics and global status reports of all host environments.</p>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">Active Tenants</span>
          <h3 class="text-3xl font-extrabold text-white mt-1 font-mono tabular-nums">12</h3>
          <p class="text-xs text-emerald-400 mt-1 font-mono tabular-nums">\u2191 8.3% vs last month</p>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">Global DB Size</span>
          <h3 class="text-3xl font-extrabold text-indigo-400 mt-1 font-mono tabular-nums">1.42 GB</h3>
          <p class="text-xs text-slate-500 mt-1 font-mono tabular-nums">Daily delta: +22MB</p>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">API Latency</span>
          <h3 class="text-3xl font-extrabold text-emerald-400 mt-1 font-mono tabular-nums">42 ms</h3>
          <p class="text-xs text-slate-400 mt-1 font-mono tabular-nums">99th percentile: 120ms</p>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">System CPU</span>
          <h3 class="text-3xl font-extrabold text-amber-400 mt-1 font-mono tabular-nums">14.8%</h3>
          <p class="text-xs text-slate-500 mt-1 font-cairo">Status: Stable</p>
        </div>
      </div>

      <!-- Details panel -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
          <h3 class="text-lg font-bold text-white mb-4">Core System Alerts</h3>
          <div class="space-y-4">
            <div class="flex items-start space-x-3 p-3 rounded-xl bg-slate-900 border border-slate-800/80">
              <span class="h-2 w-2 mt-1.5 rounded-full bg-emerald-500"></span>
              <div>
                <h4 class="text-sm font-semibold text-white">PostgreSQL Migrations Complete</h4>
                <p class="text-xs text-slate-400 mt-0.5">Database schema matches v1.0.3 specifications. Indexes rebuilt successfully.</p>
              </div>
            </div>
            <div class="flex items-start space-x-3 p-3 rounded-xl bg-slate-900 border border-slate-800/80">
              <span class="h-2 w-2 mt-1.5 rounded-full bg-amber-500"></span>
              <div>
                <h4 class="text-sm font-semibold text-white">Daily Backup Completed with Warnings</h4>
                <p class="text-xs text-slate-400 mt-0.5">GCS Storage sync completed. Backup file structo_backup_2026-06-21.sql generated.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h3 class="text-lg font-bold text-white mb-2">Resource Monitor</h3>
            <p class="text-sm text-slate-400 mb-6">Internal server allocations for Structo API daemon instance.</p>
            
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Memory Alloc (RAM)</span>
                  <span>342 MB / 2048 MB</span>
                </div>
                <div class="bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div class="bg-indigo-500 h-full w-[17%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Disk Storage</span>
                  <span>14.2 GB / 100 GB</span>
                </div>
                <div class="bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div class="bg-purple-500 h-full w-[14%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <span class="text-slate-600 text-[10px] uppercase font-bold tracking-wider pt-8 block text-center">Last update: just now</span>
        </div>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OverviewComponent, { className: "OverviewComponent", filePath: "src/app/features/dashboard/overview/overview.component.ts", lineNumber: 92 });
})();
export {
  OverviewComponent
};
//# sourceMappingURL=chunk-FZ6WHITI.js.map
