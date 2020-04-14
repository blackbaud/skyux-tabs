
import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyTabsModule
} from '@skyux/tabs';

import {
  SkyVerticalTabsDemoComponent
} from './vertical-tabs-demo.component';

@NgModule({
  imports: [
    CommonModule,
    SkyTabsModule
  ],
  declarations: [
    SkyVerticalTabsDemoComponent
  ],
  exports: [
    SkyVerticalTabsDemoComponent
  ]
})

export class SkyVerticalTabDemoModule { }
