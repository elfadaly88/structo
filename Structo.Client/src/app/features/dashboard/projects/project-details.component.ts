import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ProjectDetailsStore } from './project-details/project-details.store';
import { ProjectHeaderComponent } from './project-details/pd-header.component';
import { ProjectTabsNavComponent } from './project-details/pd-tabs-nav.component';
import { ProjectMembersTabComponent } from './project-details/tab-members.component';
import { ProjectCloseoutTabComponent } from './project-details/tab-closeout.component';
import { ProjectGalleryTabComponent } from './project-details/tab-gallery.component';
import { ProjectCustodyTabComponent } from './project-details/tab-custody.component';
import { ProjectSettlementsTabComponent } from './project-details/tab-settlements.component';
import { ProjectLedgerTabComponent } from './project-details/tab-ledger.component';
import { ProjectSettingsTabComponent } from './project-details/tab-settings.component';
import { ProjectCustodyModalsComponent } from './project-details/custody-modals.component';
import { ProjectFinanceModalsComponent } from './project-details/finance-modals.component';
import { ProjectCommonModalsComponent } from './project-details/common-modals.component';

/**
 * Project details page. State and actions live in ProjectDetailsStore (one instance per page);
 * each tab and each group of dialogs is its own component under ./project-details/.
 */
@Component({
  selector: 'app-project-details',
  standalone: true,
  providers: [ProjectDetailsStore],
  imports: [
    ProjectHeaderComponent, ProjectTabsNavComponent,
    ProjectMembersTabComponent, ProjectCloseoutTabComponent, ProjectGalleryTabComponent, ProjectCustodyTabComponent,
    ProjectSettlementsTabComponent, ProjectLedgerTabComponent, ProjectSettingsTabComponent,
    ProjectCustodyModalsComponent, ProjectFinanceModalsComponent, ProjectCommonModalsComponent,
  ],
  template: `
    <div class="space-y-4 w-full">
      <app-pd-header />
      <app-pd-tabs-nav />

      @switch (vm.activeTab()) {
        @case ('members') { <app-pd-tab-members /> }
        @case ('closeout') { <app-pd-tab-closeout /> }
        @case ('gallery') { <app-pd-tab-gallery /> }
        @case ('petty-cash') { <app-pd-tab-custody /> }
        @case ('settlements') { <app-pd-tab-settlements /> }
        @case ('transactions') { <app-pd-tab-ledger /> }
        @case ('admin-settings') { <app-pd-tab-settings /> }
      }
    </div>

    <app-pd-custody-modals />
    <app-pd-finance-modals />
    <app-pd-common-modals />
  `
})
export class ProjectDetailsComponent implements OnInit {
  // Injected here first so the store is created with this page's injector
  readonly vm = inject(ProjectDetailsStore);

  ngOnInit(): void {
    this.vm.init();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    this.vm.handleKeyboardEvent(event);
  }
}
