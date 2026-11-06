import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDetailsStore } from './project-details.store';

type TabId = ReturnType<ProjectDetailsStore['activeTab']>;

interface TabDef {
  id: TabId;
  label: string;
  icon: string;
  badge?: number;
  badgeTone?: 'amber' | 'indigo';
  hint: string;
}

/**
 * Project tabs: one tab list for every screen size (scrollable pills on phones, evenly spread tabs on
 * desktop). The active tab is kept in the URL (?tab=) so refresh, back and shared links keep it.
 */
@Component({
  selector: 'app-pd-tabs-nav',
  standalone: true,
  template: `
    <nav class="font-cairo -mx-3 sm:mx-0 border-b border-slate-800" aria-label="أقسام المشروع">
      <div role="tablist" class="flex gap-1.5 md:gap-2 overflow-x-auto scrollbar-none px-3 sm:px-0 snap-x">
        @for (tab of tabs(); track tab.id) {
          <button type="button" role="tab" [id]="'tab-' + tab.id" [attr.aria-selected]="vm.activeTab() === tab.id"
            (click)="select(tab.id)"
            class="snap-start shrink-0 md:flex-1 md:min-w-0 flex items-center justify-center gap-2 px-3.5 md:px-3 py-2.5 text-sm font-bold whitespace-nowrap border-b-2 rounded-t-xl transition-colors cursor-pointer"
            [class]="vm.activeTab() === tab.id
              ? 'border-indigo-500 text-indigo-300 bg-indigo-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'">
            <span aria-hidden="true">{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
            @if (tab.badge) {
              <span class="px-1.5 min-w-5 py-0.5 rounded-full text-[10px] font-bold font-sans"
                [class]="tab.badgeTone === 'amber' ? 'bg-amber-500/20 text-amber-300' : 'bg-indigo-500/20 text-indigo-300'">{{ tab.badge }}</span>
            }
          </button>
        }
      </div>
    </nav>

    @if (!vm.isTabInfoDismissed() && activeHint()) {
      <div class="mt-3 bg-indigo-950/40 border-s-4 border-indigo-500 text-slate-300 text-sm p-3 rounded-lg flex items-start justify-between gap-2 font-cairo" role="note">
        <span>💡 {{ activeHint() }}</span>
        <button type="button" (click)="vm.isTabInfoDismissed.set(true)" aria-label="إخفاء التلميح"
          class="text-slate-400 hover:text-white text-base leading-none font-bold px-1.5 py-0.5 rounded hover:bg-slate-800 transition-colors cursor-pointer shrink-0">×</button>
      </div>
    }
  `
})
export class ProjectTabsNavComponent implements OnInit {
  readonly vm = inject(ProjectDetailsStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly tabs = computed<TabDef[]>(() => {
    const vm = this.vm;
    const list: TabDef[] = [
      { id: 'petty-cash', icon: '🧾', label: 'عهدة الموقع', badge: vm.unsettledCount(), badgeTone: 'amber', hint: 'صرف ومتابعة المبالغ النقدية المسلّمة لمهندس الموقع للمصاريف اليومية.' },
    ];
    if (!vm.isEngineer()) list.push({ id: 'transactions', icon: '📖', label: 'الدفتر المالي', hint: 'كل إيرادات ومصروفات المشروع الفعلية في سجل واحد.' });
    list.push({ id: 'settlements', icon: '⚖️', label: 'التسويات', hint: 'مراجعة واعتماد الفواتير المقدمة من مهندس الموقع لتسوية العهدة.' });
    if (!vm.isAccountant()) list.push({ id: 'gallery', icon: '📸', label: 'معرض الصور', hint: 'صور تقدّم العمل في الموقع، ويمكن إظهارها في البروفايل العام.' });
    list.push({ id: 'members', icon: '👥', label: 'فريق العمل', badge: vm.projectMembers().length, badgeTone: 'indigo', hint: 'المهندسون والمحاسبون المسندون لهذا المشروع.' });
    if (vm.isOwnerOrAccountant()) list.push({ id: 'closeout', icon: '⚙️', label: 'إدارة المشروع', hint: 'المطابقة، التجميد المالي، والإقفال النهائي للمشروع.' });
    return list;
  });

  readonly activeHint = computed(() => this.tabs().find((t) => t.id === this.vm.activeTab())?.hint ?? '');

  constructor() {
    // If the current tab is not available for this role (e.g. ledger for engineers), fall back to the first one
    effect(() => {
      const tabs = this.tabs();
      const active = this.vm.activeTab();
      if (active !== 'admin-settings' && tabs.length && !tabs.some((t) => t.id === active)) {
        this.vm.activeTab.set(tabs[0].id);
      }
    });
  }

  ngOnInit(): void {
    const fromUrl = this.route.snapshot.queryParamMap.get('tab') as TabId | null;
    if (fromUrl && this.tabs().some((t) => t.id === fromUrl)) {
      this.vm.activeTab.set(fromUrl);
    }
    this.revealActive();
  }

  /** Keep the active tab visible in the horizontally scrolling tab bar (phones). */
  private revealActive(): void {
    setTimeout(() => document.getElementById('tab-' + this.vm.activeTab())?.scrollIntoView({ block: 'nearest', inline: 'center' }));
  }

  select(id: TabId): void {
    this.vm.activeTab.set(id);
    this.router.navigate([], { relativeTo: this.route, queryParams: { tab: id }, queryParamsHandling: 'merge', replaceUrl: true });
    this.revealActive();
  }
}
