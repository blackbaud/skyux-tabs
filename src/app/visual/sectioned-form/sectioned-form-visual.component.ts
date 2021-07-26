import { ChangeDetectionStrategy, Component} from '@angular/core';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

@Component({
  selector: 'sectioned-form-visual',
  templateUrl: './sectioned-form-visual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionedFormVisualComponent {
  public maintainSectionContent: boolean = false;

  constructor(
    private themeSvc: SkyThemeService
  ) {}

  public themeSettingsChange(themeSettings: SkyThemeSettings): void {
    this.themeSvc.setTheme(themeSettings);
  }

}
