import {
  Component
} from '@angular/core';

import {
  SkyModalInstance
} from '@skyux/modals';

@Component({
  selector: 'sky-vertical-tabset-modal-visual',
  templateUrl: './vertical-tabs-modal-visual.component.html'
})
export class VerticalTabsetModalVisualComponent {
  public loadTabContentOnInit: boolean = true;

  constructor(public instance: SkyModalInstance) {}

}
