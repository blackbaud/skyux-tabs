import { ChangeDetectionStrategy, Component, Optional} from '@angular/core';
import { SkyThemeService, SkyThemeSettings } from '@skyux/theme';

@Component({
  selector: 'sectioned-form-visual',
  templateUrl: './sectioned-form-visual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionedFormVisualComponent {
  public maintainSectionContent: boolean = false;

  constructor(@Optional() private themeSvc: SkyThemeService) {}

  public themeSettingsChange(themeSettings: SkyThemeSettings): void {
    this.themeSvc.setTheme(themeSettings);
  }
}
