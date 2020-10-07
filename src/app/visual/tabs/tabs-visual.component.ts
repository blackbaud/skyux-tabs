import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

@Component({
  selector: 'tabs-visual',
  templateUrl: './tabs-visual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsVisualComponent {

  public tabArray = [
    {
      tabHeading: 'Tab 1',
      tabContent: 'Content for Tab 1',
      tabIndex: 1
    },
    {
      tabHeading: 'Tab 2',
      tabContent: 'Content for Tab 2',
      tabIndex: 2
    },
    {
      tabHeading: 'Tab 3',
      tabContent: 'Content for Tab 3',
      tabIndex: 3,
      active: true
    }
  ];

  public activeTab: number;

  private tabCounter: number = 3;

  constructor(private themeSvc: SkyThemeService) { }

  public onNewTabClick(): void {
    this.tabCounter++;

    this.tabArray.push({
      tabHeading: 'Tab ' + this.tabCounter,
      tabContent: 'Content for Tab' + this.tabCounter,
      tabIndex: 4,
      active: true
    });
    console.log('New tab: ' + this.tabCounter);
  }

  public onTabOpened(event: any) {
    console.log(event);
  }

  public onTabChanged(activeTab: number) {
    console.log('Tab changed: ' + activeTab);
  }

  public onCloseClick(arrayIndex: number): void {
    this.tabArray.splice(arrayIndex, 1);

    if (!this.tabArray.length) {
      this.onNewTabClick();
    }
  }

  public themeSettingsChange(themeSettings: SkyThemeSettings) {
    this.themeSvc.setTheme(themeSettings);
  }
}
