import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
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
   * Indicates whether the tab is active when the tabset loads. After initialization, the `active`
   * property on the tabset component should be used to set the active tab.
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
   * Displays a counter beside the tab header.
   */
  @Input()
  public tabHeaderCount: string;

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

  /**
   * Fires when users click the button to close the tab.
   * The close button is added to the tab when you specify a listener for this event.
   */
  @Output()
  public close = new EventEmitter<void>();

  public get closeable(): boolean {
    return this.close.observers.length > 0;
  }

  public showContent: boolean = false;

  public tabButtonId: string;

  public tabPanelId: string;

  private _tabIndex: SkyTabIndex;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private tabsetService: SkyTabsetService
  ) {
    const id = nextId++;
    this.tabPanelId = `sky-tab-${id}`;
    this.tabButtonId = `${this.tabPanelId}-nav-btn`;
    this.tabIndex = this.tabsetService.registerTab();
  }

  public ngOnDestroy(): void {
    this.tabsetService.unregisterTab(this.tabIndex);
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
