import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyChevronModule,
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyThemeModule
} from '@skyux/theme';

import {
  SkyTabsResourcesModule
} from '../shared/tabs-resources.module';

import {
  SkyVerticalTabsetComponent
} from './vertical-tabset.component';

import {
  SkyVerticalTabComponent
} from './vertical-tab.component';

import {
  SkyVerticalTabsetGroupComponent
} from './vertical-tabset-group.component';

@NgModule({
  declarations: [
    SkyVerticalTabsetComponent,
    SkyVerticalTabsetGroupComponent,
    SkyVerticalTabComponent
  ],
  imports: [
    CommonModule,
    SkyChevronModule,
    SkyIconModule,
    SkyTabsResourcesModule,
    SkyThemeModule
  ],
  exports: [
    SkyVerticalTabsetComponent,
    SkyVerticalTabsetGroupComponent,
    SkyVerticalTabComponent
  ]
})
export class SkyVerticalTabsetModule { }
