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
  SkyTabsetPermalinksFixtureComponent
} from './tabset-permalinks.component.fixture';

import {
  TabsetTestComponent
} from './tabset.component.fixture';

@NgModule({
  declarations: [
    TabsetTestComponent,
    SkyTabsetPermalinksFixtureComponent,
    TabsetActiveTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyModalModule,
    SkyTabsModule,
    RouterTestingModule
  ],
  exports: [
    TabsetTestComponent,
    SkyTabsetPermalinksFixtureComponent,
    TabsetActiveTestComponent
  ]
})
export class SkyTabsFixturesModule { }
