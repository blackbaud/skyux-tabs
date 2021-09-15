import {
  Component
} from '@angular/core';

import {
  SkySectionedFormService
} from '../../../public/public_api';

@Component({
  selector: 'app-demo-information-form',
  templateUrl: './demo-information-form.component.html'
})
export class DemoInformationFormComponent {
  public name: string = '';
  public id: string = '5324901';

  public constructor(
    private sectionService: SkySectionedFormService
  ) {
    this.sectionService.requiredFieldChanged(true);
  }

  public checkValidity(): void {
    if (!this.name) {
      this.sectionService.invalidFieldChanged(true);
    } else {
      this.sectionService.invalidFieldChanged(false);
    }
  }

  public nameChange(newName: string): void {
    this.name = newName;

    this.checkValidity();
  }
}
