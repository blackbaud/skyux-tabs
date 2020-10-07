
import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkySectionedFormModule
} from '@skyux/tabs';

import {
  SectionedFormDemoComponent
} from './sectioned-form-demo.component';

@NgModule({
  imports: [
    CommonModule,
    SkySectionedFormModule
  ],
  declarations: [
    SectionedFormDemoComponent
  ],
  exports: [
    SectionedFormDemoComponent
  ]
})

export class SectionedFormDemoModule { }
