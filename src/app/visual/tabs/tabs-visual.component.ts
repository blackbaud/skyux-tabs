import {
  AfterViewInit,
  Component
} from '@angular/core';

import { SkyTabsetTabIndexesChange } from '../../public/public_api';

@Component({
  selector: 'tabs-visual',
  templateUrl: './tabs-visual.component.html'
})
export class TabsVisualComponent implements AfterViewInit {
  public activeTab = 0;

  public ngAfterViewInit(): void {
    console.log(this.activeTab);
  }

  public handleTabChange(index: number): void {
    this.activeTab = index;
    console.log('active change', index);
  }

  public onTabIndexesChange(change: SkyTabsetTabIndexesChange): void {
    console.log('New index:', change);
  }
}
