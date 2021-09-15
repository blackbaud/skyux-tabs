import {
  Component
} from '@angular/core';

import {
  SkyDocsDemoControlPanelChange
} from '@skyux/docs-tools';

@Component({
  selector: 'app-sectioned-form-docs',
  templateUrl: './sectioned-form-docs.component.html'
})
export class SectionedFormDocsComponent {

  public nameRequired: boolean = false;

  public onDemoSelectionChange(change: SkyDocsDemoControlPanelChange): void {
    if (change.nameRequired !== undefined) {
      this.nameRequired = change.nameRequired;
    }
  }

  public onDemoReset(): void {
    this.nameRequired = false;
  }

}
