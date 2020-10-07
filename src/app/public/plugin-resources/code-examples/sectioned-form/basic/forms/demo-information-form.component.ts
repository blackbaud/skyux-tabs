import {
  Component
} from '@angular/core';

import {
  SkySectionedFormService
} from '@skyux/tabs';

@Component({
  selector: 'app-demo-information-form',
  templateUrl: './demo-information-form.component.html'
})
export class DemoInformationFormComponent {

  public set nameRequired(value: boolean) {
    this._nameRequired = value;
    this.sectionedFormService.requiredFieldChanged(value);
  }

  public get nameRequired(): boolean {
    return this._nameRequired;
  }

  public set name(value: string) {
    this._name = value;

    if (this._nameRequired) {
      this.sectionedFormService.requiredFieldChanged(!this._name);
    }
  }

  public get name(): string {
    return this._name;
  }

  public set id(value: string) {
    this._id = value;

    const valid = this.idValid(this._id);
    this.sectionedFormService.invalidFieldChanged(!valid);
  }

  public get id(): string {
    return this._id;
  }

  private _id: string = '5324901';

  private _nameRequired: boolean;

  private _name: string = '';

  constructor(
    private sectionedFormService: SkySectionedFormService
  ) { }

  private idValid(value: string): boolean {
    if (value) {
      let regExp = new RegExp('^[0-9]+$');
      return regExp.test(value);
    } else {
      return true;
    }
  }
}
