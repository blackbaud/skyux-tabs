import {
  TestBed,
  async
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import { SkyTabsetNavButtonComponent } from './tabset-nav-button.component';
import { SkyTabsFixturesModule } from './fixtures/tabs-fixtures.module';

describe('Tabset navigation button', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyTabsFixturesModule
      ]
    });
  });

  it('should set default text based on the button type', () => {
    let fixture = TestBed.createComponent(SkyTabsetNavButtonComponent);

    fixture.componentInstance.buttonType = 'next';

    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveText('Next');

    fixture.componentInstance.buttonType = 'previous';

    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveText('Previous');
  });

  it('should allow the button text to be overridden', () => {
    let fixture = TestBed.createComponent(SkyTabsetNavButtonComponent);

    fixture.componentInstance.buttonText = 'Foo';

    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveText('Foo');
  });

  it('should be accessible', async(() => {
    let fixture = TestBed.createComponent(SkyTabsetNavButtonComponent);
    fixture.componentInstance.buttonText = 'Foo';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement).toBeAccessible();
    });
  }));
});
