import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-tabset-query-params-test',
  templateUrl: './tabset-query-params.component.fixture.html'
})
export class SkyTabsetQueryParamsFixtureComponent {

  public activeIndex: number;
  public secondTabDisabled = false;

  public onActiveChange(index: number): void {
    this.activeIndex = index;
  }

  public disableSecondTab(): void {
    this.secondTabDisabled = true;
  }

}
