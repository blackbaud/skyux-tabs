import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ReactiveFormsModule
} from '@angular/forms';

import {
  SkyIdModule
} from '@skyux/core';

import {
  SkyInputBoxModule
} from '@skyux/forms';

import {
  SkyModalModule
} from '@skyux/modals';

import {
  SkySectionedFormModule
} from '@skyux/tabs';

import {
  DemoAddressFormComponent
} from './demo-address-form.component';

import {
  DemoInformationFormComponent
} from './demo-information-form.component';

import {
  DemoPhoneFormComponent
} from './demo-phone-form.component';

import {
  ModalSectionedFormDemoComponent
} from './modal-sectioned-form-demo.component';

import {
  SectionedFormDemoComponent
} from './sectioned-form-demo.component';

@NgModule({
  declarations: [
    DemoAddressFormComponent,
    DemoInformationFormComponent,
    DemoPhoneFormComponent,
    ModalSectionedFormDemoComponent,
    SectionedFormDemoComponent,
  ],
  entryComponents: [
    ModalSectionedFormDemoComponent
  ],
  exports: [
    SectionedFormDemoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkyIdModule,
    SkyInputBoxModule,
    SkyModalModule,
    SkySectionedFormModule
  ],
})

export class SectionedFormDemoModule { }
