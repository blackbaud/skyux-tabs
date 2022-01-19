import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SkyCheckboxModule } from '@skyux/forms';
import { SkyPageModule } from '@skyux/layout';
import { SkyModalModule } from '@skyux/modals';

import {
  SkySectionedFormModule,
  SkyTabsModule,
  SkyVerticalTabsetModule,
} from 'projects/tabs/src/public-api';

import { VisualComponent } from './visual.component';

import { SkyAddressFormDemoComponent } from './sectioned-form/address-form-demo.component';
import { SkyInformationFormDemoComponent } from './sectioned-form/information-form-demo.component';
import { SkyPhoneFormDemoComponent } from './sectioned-form/phone-form-demo.component';
import { SectionedFormVisualComponent } from './sectioned-form/sectioned-form-visual.component';
import { TabsVisualComponent } from './tabs/tabs-visual.component';
import { VerticalTabsetModalVisualComponent } from './vertical-tabset/vertical-tabs-modal-visual.component';
import { VerticalTabsVisualComponent } from './vertical-tabset/vertical-tabs-visual.component';
import { SkyE2eThemeSelectorModule } from '@skyux/e2e-client';
@NgModule({
  declarations: [
    SkyAddressFormDemoComponent,
    SkyInformationFormDemoComponent,
    SkyPhoneFormDemoComponent,
    SectionedFormVisualComponent,
    TabsVisualComponent,
    VerticalTabsetModalVisualComponent,
    VerticalTabsVisualComponent,
    VisualComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SkyCheckboxModule,
    SkyE2eThemeSelectorModule,
    SkyModalModule,
    SkyPageModule,
    SkySectionedFormModule,
    SkyTabsModule,
    SkyVerticalTabsetModule,
  ],
})
export class VisualModule {}
