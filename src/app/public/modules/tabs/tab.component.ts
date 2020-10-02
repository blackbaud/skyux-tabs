import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy
} from '@angular/core';

import {
  SkyTabIndex
} from './tab-index';

import {
  SkyTabsetService
} from './tabset.service';

let nextId = 0;

@Component({
  selector: 'sky-tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTabComponent implements OnDestroy {

  /**
   * Indicates whether the tab is active when the tabset loads.
   * @default false
   */
  @Input()
  public set active(value: boolean) {
    if (value === true) {
      this.tabsetService.setActiveTabIndex(this.tabIndex);
    }
  }

  /**
   * Indicates whether to disable the tab.
   * @default false
   */
  @Input()
  public disabled: boolean;

  /**
   * Specifies the tab header.
   * When using tabs as the main navigation on a page,
   * use [the Angular `Title` service](https://angular.io/docs/ts/latest/cookbook/set-document-title.html)
   * and [the SKY UX `title` configuration property](https://developer.blackbaud.com/skyux/learn/reference/configuration#app)
   * to reflect the tab header in the page title.
   * @required
   */
  @Input()
  public tabHeading: string;

  /**
   * Specifies a unique identifier for the tab.
   * If not defined, the identifier is set to the position of the tab on load, starting with `0`.
   */
  @Input()
  public set tabIndex(value: SkyTabIndex) {
    if (value !== undefined) {
      if (this._tabIndex !== undefined) {
        this.tabsetService.replaceTabIndex(this._tabIndex, value);
      }
      this._tabIndex = value;
    }
  }

  public get tabIndex(): SkyTabIndex {
    return this._tabIndex;
  }

  public showContent: boolean = false;

  public tabButtonId: string;

  public tabId: string;

  private _tabIndex: SkyTabIndex;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private tabsetService: SkyTabsetService
  ) {
    const id = nextId++;
    this.tabId = `sky-tab-${id}`;
    this.tabButtonId = `${this.tabId}-nav-btn`;
    this.tabIndex = this.tabsetService.registerTab();
  }

  public ngOnDestroy(): void {
    this.tabsetService.removeTab(this.tabIndex);
  }

  public activate(): void {
    this.showContent = true;
    this.changeDetector.markForCheck();
  }

  public deactivate(): void {
    this.showContent = false;
    this.changeDetector.markForCheck();
  }

}
