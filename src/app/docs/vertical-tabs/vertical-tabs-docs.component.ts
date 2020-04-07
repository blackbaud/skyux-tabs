import {
  Component
} from '@angular/core';

import {
  SkyDocsDemoControlPanelChange
} from '@skyux/docs-tools';

@Component({
  selector: 'app-vertical-tabs-docs',
  templateUrl: './vertical-tabs-docs.component.html'
})
export class VerticalTabsDocsComponent {
  public groups: any[];
  public tabs: any[];
  public demoSettings: any = {};
  public count = 17;
  public otherCount = 4;

  public onDemoSelectionChangeTabs(change: SkyDocsDemoControlPanelChange): void {
    this.demoSettings.contentTab1 = 'Tab 1 Content';
    this.demoSettings.contentTab2 = 'Tab 2 Content';

    if (change.counts) {
      this.demoSettings.count = this.count;
      this.demoSettings.otherCount = this.otherCount;
      this.demoSettings.contentTab1 = 'Tab 1 has ' + this.count + ' items';
      this.demoSettings.contentTab2 = 'Tab 2 does not have a count';
    } else {
      this.demoSettings.count = undefined;
      this.demoSettings.otherCount = undefined;
    }

    this.tabs = [
      { tabHeading: 'Tab 1', content: this.demoSettings.contentTab1, tabHeaderCount: this.demoSettings.count },
      { tabHeading: 'Tab 2', content: this.demoSettings.contentTab2},
      { tabHeading: 'Tab 3 is disabled', content: 'Tab 3 Content', disabled: true}
    ];
  }
  public onDemoSelectionChangeGroups(change: SkyDocsDemoControlPanelChange): void {
    this.demoSettings.contentTab1 = 'Group 1 — Tab 1 Content';
    this.demoSettings.contentTab2 = 'Group 2 — Tab 1 Content';
    if (change.counts) {
      this.demoSettings.contentTab1 = 'Group 1 — Tab 1 has ' + this.count + ' items';
      this.demoSettings.contentTab2 = 'Group 2 — Tab 1 has ' + this.otherCount + ' items';
      this.demoSettings.count = this.count;
      this.demoSettings.otherCount = this.otherCount;
    } else {
      this.demoSettings.count = undefined;
      this.demoSettings.otherCount = undefined;
    }

    this.groups = [
      {
        heading: 'Tab group 1',
        isOpen: true,
        isDisabled: false,
        subTabs: [
          { tabHeading: 'Group 1 — Tab 1', content:  this.demoSettings.contentTab1, tabHeaderCount: this.demoSettings.count},
          { tabHeading: 'Group 1 — Tab 2', content: 'Group 1 — Tab 2 Content' }]
      },
      {
        heading: 'Tab group 2',
        isOpen: false,
        isDisabled: false,
        subTabs: [
          { tabHeading: 'Group 2 — Tab 1', content: this.demoSettings.contentTab2,
            tabHeaderCount: this.demoSettings.otherCount
          },
          { tabHeading: 'Group 2 — Tab 2',
            content:  'Group 2 — Tab 2 Content'
          },
          { tabHeading: 'Group 2 — Tab 3 — Disabled',
          content: 'Group 2 — Tab 3 content',
          disabled: true
        }]
      },
      {
        heading: 'Group 3 is disabled',
        isOpen: false,
        isDisabled: true,
        subTabs: []
      }
    ];
  }
}
