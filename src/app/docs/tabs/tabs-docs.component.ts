import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  SkyDocsDemoControlPanelChange
} from '@skyux/docs-tools';

@Component({
  selector: 'app-tabs-docs',
  templateUrl: './tabs-docs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsDocsComponent {

  private tabCounter: number = 2;

  private _includeCounts: boolean = false;

  public demoSettings: any = {};

  public tabArray = [
    {
      tabHeading: 'Tab 1',
      tabContent: 'Content for Tab 1',
      tabHeaderCount: 5
    },
    {
      tabHeading: 'Tab 2',
      tabContent: 'Content for Tab 2',
      tabHeaderCount: 3
    }
  ];

  public foo(change: any): void {
    console.log(change);
  }

  public set includeCounts(value: boolean) {
    this._includeCounts = value;
  }

  public get includeCounts(): boolean {
    return this._includeCounts;
  }

  public onDemoSelectionChange(change: SkyDocsDemoControlPanelChange): void {
    if (change.includeCounts === true) {
      this.demoSettings.showCounts = true;
    } else if (change.includeCounts === false) {
      this.demoSettings.showCounts = false;
    }

    if (change.includeAddAndClose === true) {
      this.demoSettings.includeAddAndClose = true;
    } else if (change.includeAddAndClose === false) {
      this.demoSettings.includeAddAndClose = false;
    }
  }

  public onNewTabClick(): void {
    this.tabCounter++;

    this.tabArray.push({
      tabHeading: 'Tab ' + this.tabCounter,
      tabContent: 'Content for Tab' + this.tabCounter,
      tabHeaderCount: 99
    });
  }

  public onCloseClick(arrayIndex: number): void {
    this.tabArray.splice(arrayIndex, 1);
  }
}
