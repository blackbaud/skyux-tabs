import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'app-demo-phone-form',
  templateUrl: './demo-phone-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoPhoneFormComponent { }
