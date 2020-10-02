import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject,
  Observable
} from 'rxjs';

import {
  SkyTabIndex
} from './tab-index';

@Injectable()
export class SkyTabsetService {

  public get activeTabIndex(): Observable<SkyTabIndex> {
    return this._activeTabIndex.asObservable();
  }

  private _activeTabIndex = new BehaviorSubject<SkyTabIndex>(0);

  private tabs: {
    tabIndex: SkyTabIndex;
  }[] = [];

  private tabCounter = 0;

  public setActiveTabIndex(value: SkyTabIndex): void {
    this._activeTabIndex.next(value);
  }

  public registerTab(): SkyTabIndex {
    const tabIndex = this.tabCounter;
    this.tabs.push({
      tabIndex
    });

    this.tabCounter++;

    return tabIndex;
  }

  public replaceTabIndex(originalTabIndex: SkyTabIndex, newTabIndex: SkyTabIndex): void {
    const tab = this.tabs.find(t => t.tabIndex === originalTabIndex);
    tab.tabIndex = newTabIndex;
  }

  public unregisterTab(tabIndex: SkyTabIndex): void {
    this.tabCounter--;
    const index = this.tabs.findIndex(t => t.tabIndex === tabIndex);
    this.tabs.splice(index, 1);
  }

}
