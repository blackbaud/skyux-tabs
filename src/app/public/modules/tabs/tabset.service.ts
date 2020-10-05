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

  public get firstTabIndex(): SkyTabIndex {
    return this.tabs[0].tabIndex;
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
    const tab = this.tabs.find(t => this.tabIndexesEqual(t.tabIndex, originalTabIndex));
    tab.tabIndex = newTabIndex;
  }

  public unregisterTab(tabIndex: SkyTabIndex): void {
    this.tabCounter--;

    const index = this.tabs.findIndex(tab => this.tabIndexesEqual(tab.tabIndex, tabIndex));

    // If the currently active tab is getting unregistered, activate the next one.
    if (this.tabIndexesEqual(this.currentActiveTabIndex, this.tabs[index].tabIndex)) {
      this.activateNearestTab(index);
    }

    this.tabs.splice(index, 1);
  }

  public unregisterAll(): void {
    this.tabCounter = 0;
    this.tabs = [];
  }

  public tabIndexesEqual(tabIndex1: SkyTabIndex, tabIndex2: SkyTabIndex): boolean {
    return (
      tabIndex1 === tabIndex2 ||
      +tabIndex1 === +tabIndex2
    );
  }

  public isValidTabIndex(tabIndex: SkyTabIndex): boolean {
    const isValid = this.tabs.some(tab => this.tabIndexesEqual(tab.tabIndex, tabIndex));
    return isValid;
  }

  private activateNearestTab(arrayIndex: number): void {
    const newActiveTab = this.tabs[arrayIndex + 1] || this.tabs[arrayIndex - 1];
    if (newActiveTab) {
      // Wait for tabset UI changes to render before activating.
      setTimeout(() => {
        this._activeTabIndex.next(newActiveTab.tabIndex);
      });
    }
  }

}
