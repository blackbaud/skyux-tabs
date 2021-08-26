import {
  NgModule
} from '@angular/core';

import {
  SkyMediaQueryService
} from '@skyux/core';

/**
 * @internal
 * @deprecated This module can be removed after we upgrade SKY UX development dependencies to version 5.
 */
 @NgModule({
  providers: [
    SkyMediaQueryService
  ]
})
export class SkyTabsForRootCompatModule {}
