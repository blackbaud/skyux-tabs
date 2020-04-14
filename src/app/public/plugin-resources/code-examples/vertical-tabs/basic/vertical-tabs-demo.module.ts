
import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyAlertModule
} from '@skyux/indicators';

import {
  VerticalTabDemoComponent
} from './vertical-tabs-demo.component';

@NgModule({
  imports: [
    CommonModule,
    SkyAlertModule
  ],
  declarations: [
    VerticalTabDemoComponent
  ],
  exports: [
    VerticalTabDemoComponent
  ]
})

export class SkyVerticalTabDemoModule { }
