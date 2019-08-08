import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  RouterTestingModule
} from '@angular/router/testing';

import {
  SkyModalModule
} from '@skyux/modals';

import {
  SkyTabsModule
} from '../tabs.module';

import {
  TabsetActiveTestComponent
} from './tabset-active.component.fixture';

import {
  SkyTabsetQueryParamsFixtureComponent
} from './tabset-query-params.component.fixture';

import {
  SkyWizardTestFormComponent
} from './tabset-wizard.component.fixture';

import {
  TabsetTestComponent
} from './tabset.component.fixture';

@NgModule({
  declarations: [
    TabsetTestComponent,
    SkyTabsetQueryParamsFixtureComponent,
    SkyWizardTestFormComponent,
    TabsetActiveTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyModalModule,
    SkyTabsModule,
    NoopAnimationsModule,
    RouterTestingModule
  ],
  exports: [
    TabsetTestComponent,
    SkyTabsetQueryParamsFixtureComponent,
    SkyWizardTestFormComponent,
    TabsetActiveTestComponent
  ],
  entryComponents: [
    SkyWizardTestFormComponent
  ]
})
export class SkyTabsFixturesModule { }
