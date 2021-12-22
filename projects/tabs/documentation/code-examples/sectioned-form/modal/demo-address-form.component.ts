import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'app-demo-address-form',
  templateUrl: './demo-address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoAddressFormComponent { }
