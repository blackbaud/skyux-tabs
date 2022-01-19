import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tabs-visual',
  templateUrl: './tabs-visual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsVisualComponent {
  public requiredValue1: string;

  public requiredValue2: boolean;

  public showWizard = false;

  public newTabClick() {}

  public openTabClick() {}

  public closeTab() {}

  public get step2Disabled(): boolean {
    return !this.requiredValue1;
  }

  public get step3Disabled(): boolean {
    return this.step2Disabled || !this.requiredValue2;
  }

  public validateStep1() {
    return true;
  }
}
