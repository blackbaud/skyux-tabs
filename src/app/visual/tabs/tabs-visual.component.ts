import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'tabs-visual',
  templateUrl: './tabs-visual.component.html'
})
export class TabsVisualComponent implements OnInit {

  public activeTab: string;

  public ngOnInit(): void {
    this.activeTab = '1';

    // setTimeout(() => {
    //   this.activeTab = '0';
    // }, 1000);
  }

  public setActive(): void {
    this.activeTab = '0';
  }
}
