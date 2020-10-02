import {
  Component
} from '@angular/core';
import { SkyTabIndex } from '../../public/public_api';

@Component({
  selector: 'tabs-visual',
  templateUrl: './tabs-visual.component.html'
})
export class TabsVisualComponent {

  public activeIndex: SkyTabIndex;

  public tabs: {
    active: boolean;
    content: string;
    heading: string;
  }[] = [
    {
      active: false,
      heading: 'Tab 1',
      content: 'Content for Tab 1'
    },
    {
      active: false,
      heading: 'Tab 2',
      content: 'Content for Tab 2'
    },
    {
      active: true,
      heading: 'Tab 3',
      content: 'Content for Tab 3'
    }
  ];

  constructor() {
    setTimeout(() => {
      this.activeIndex = 1;

      setTimeout(() => {
        this.tabs.push({
          active: false,
          heading: 'Tab 4',
          content: 'Content for Tab 4'
        });

        setTimeout(() => {
          this.tabs = [{
            active: false,
            heading: 'Tab 1',
            content: 'Content for Tab 1'
          },
          {
            active: false,
            heading: 'Tab 2',
            content: 'Content for Tab 2'
          },
          {
            active: false,
            heading: 'Tab 3',
            content: 'Content for Tab 3'
          }];

          setTimeout(() => {
            this.tabs.push({
              active: true,
              heading: 'Tab 4',
              content: 'Content for Tab 4'
            });
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  }

  public onActiveChange(event: SkyTabIndex): void {
    console.log('Tab index change:', event);
  }

}
