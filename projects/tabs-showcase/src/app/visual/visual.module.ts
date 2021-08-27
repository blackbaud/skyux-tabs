import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SkyDocsToolsModule } from '@skyux/docs-tools';
import { SkyCheckboxModule } from '@skyux/forms';
import { SkyPageModule } from '@skyux/layout';
import { SkyModalModule } from '@skyux/modals';

import { SkySectionedFormModule, SkyTabsModule, SkyVerticalTabsetModule } from 'projects/tabs/src/public-api';

import { VisualComponent } from './visual.component';

import { SkyDemoAddressFormComponent } from './sectioned-form/demo-address-form.component';
import { SkyDemoInformationFormComponent } from './sectioned-form/demo-information-form.component';
import { SkyDemoPhoneFormComponent } from './sectioned-form/demo-phone-form.component';
import { SectionedFormVisualComponent } from './sectioned-form/sectioned-form-visual.component';
import { TabsVisualComponent } from './tabs/tabs-visual.component';
import { VerticalTabsetModalVisualComponent } from './vertical-tabset/vertical-tabs-modal-visual.component';
import { VerticalTabsVisualComponent } from './vertical-tabset/vertical-tabs-visual.component';

@NgModule({
  declarations: [
    SkyDemoAddressFormComponent,
    SkyDemoInformationFormComponent,
    SkyDemoPhoneFormComponent,
    SectionedFormVisualComponent,
    TabsVisualComponent,
    VerticalTabsetModalVisualComponent,
    VerticalTabsVisualComponent,
    VisualComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SkyCheckboxModule,
    SkyDocsToolsModule,
    SkyModalModule,
    SkyPageModule,
    SkySectionedFormModule,
    SkyTabsModule,
    SkyVerticalTabsetModule
  ]
})
export class VisualModule { }
