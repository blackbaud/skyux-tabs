
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
  SkyVerticalTabsDemoComponent
} from './vertical-tabs-demo.component';

@NgModule({
  imports: [
    CommonModule,
    SkyAlertModule
  ],
  declarations: [
    SkyVerticalTabsDemoComponent
  ],
  exports: [
    SkyVerticalTabsDemoComponent
  ]
})

export class SkyVerticalTabDemoModule { }
