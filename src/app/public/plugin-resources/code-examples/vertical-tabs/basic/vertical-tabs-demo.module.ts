
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
  VerticalTabDemoComponent
} from './vertical-tabs-demo.component';

@NgModule({
  imports: [
    CommonModule,
    SkyTabsModule
  ],
  declarations: [
    VerticalTabDemoComponent
  ],
  exports: [
    VerticalTabDemoComponent
  ]
})

export class SkyVerticalTabDemoModule { }
