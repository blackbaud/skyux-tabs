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

  public currentActiveTabIndex: SkyTabIndex;

  private _activeTabIndex = new BehaviorSubject<SkyTabIndex>(0);

  private tabs: {
    tabIndex: SkyTabIndex;
  }[] = [];

  private tabCounter = 0;

  public setActiveTabIndex(value: SkyTabIndex): void {
    this.currentActiveTabIndex = value;
    this._activeTabIndex.next(value);
  }

  public registerTab(tabIndex?: SkyTabIndex): SkyTabIndex {
    const nextIndex = this.tabCounter;

    const newTabIndex = (tabIndex !== undefined) ? tabIndex : nextIndex;

    this.tabs.push({
      tabIndex: newTabIndex
    });

    this.tabCounter++;

    return newTabIndex;
  }

  public replaceTabIndex(originalTabIndex: SkyTabIndex, newTabIndex: SkyTabIndex): void {
    const tab = this.tabs.find(t => t.tabIndex === originalTabIndex);
    tab.tabIndex = newTabIndex;
  }

  public unregisterTab(tabIndex: SkyTabIndex): void {
    this.tabCounter--;

    const index = this.tabs.findIndex(t => t.tabIndex === tabIndex);

    // If the currently active tab is getting unregistered, activate the next one.
    const isActiveTab = (this.currentActiveTabIndex === this.tabs[index].tabIndex);

    if (isActiveTab) {
      const newActiveTab = this.tabs[index + 1] || this.tabs[index - 1];
      if (newActiveTab) {
        this._activeTabIndex.next(newActiveTab.tabIndex);
      }
    }

    this.tabs.splice(index, 1);
  }

}
