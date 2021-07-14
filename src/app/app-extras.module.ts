import {
  NgModule
} from '@angular/core';

import {
  SkyCodeModule
} from '@blackbaud/skyux-lib-code-block';

import {
  SkyDocsToolsModule,
  SkyDocsToolsOptions
} from '@skyux/docs-tools';

import {
  SkyCheckboxModule
} from '@skyux/forms';

import {
  SkyAuthHttpClientModule
} from '@skyux/http';

import {
  SkyPageModule
} from '@skyux/layout';

import {
  SkyModalModule
} from '@skyux/modals';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyTabsForRootCompatModule
} from './public/modules/shared/tabs-for-root-compat.module';

import {
  SkyTabsModule,
  SkySectionedFormModule,
  SkyVerticalTabsetModule
} from './public/public_api';

import {
  VerticalTabsetModalVisualComponent
} from './visual/vertical-tabset/vertical-tabs-modal-visual.component';

@NgModule({
  imports: [
    SkyTabsForRootCompatModule
  ],
  exports: [
    SkyAppLinkModule,
    SkyAuthHttpClientModule,
    SkyCheckboxModule,
    SkyCodeModule,
    SkyDocsToolsModule,
    SkyModalModule,
    SkyPageModule,
    SkySectionedFormModule,
    SkyTabsModule,
    SkyVerticalTabsetModule
  ],
  providers: [
    {
      provide: SkyDocsToolsOptions,
      useValue: {
        gitRepoUrl: 'https://github.com/blackbaud/skyux-tabs',
        packageName: '@skyux/tabs'
      }
    }
  ],
  entryComponents: [
    VerticalTabsetModalVisualComponent
  ]
})
export class AppExtrasModule { }
