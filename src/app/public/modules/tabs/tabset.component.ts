import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList
} from '@angular/core';

import {
  SkyThemeService
} from '@skyux/theme';

import {
  Subject
} from 'rxjs';

import {
  take,
  takeUntil
} from 'rxjs/operators';

import {
  SkyTabIndex
} from './tab-index';

import {
  SkyTabsetStyle
} from './tabset-style';

import {
  SkyTabComponent
} from './tab.component';

import {
  SkyTabsetAdapterService
} from './tabset-adapter.service';

import {
  SkyTabsetButtonsDisplayMode
} from './tabset-buttons-display-mode';

import {
  SkyTabsetPermalinkService
} from './tabset-permalink.service';

import {
  SkyTabsetService
} from './tabset.service';

interface TabButtonViewModel {
  active: boolean;
  ariaControls: string;
  buttonHref: string;
  buttonId: string;
  buttonText: string;
  buttonTextCount: string;
  closeable: boolean;
  disabled: boolean;
  tabIndex: SkyTabIndex;
}

@Component({
  selector: 'sky-tabset',
  styleUrls: ['./tabset.component.scss'],
  templateUrl: './tabset.component.html',
  providers: [
    SkyTabsetAdapterService,
    SkyTabsetPermalinkService,
    SkyTabsetService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTabsetComponent implements AfterViewInit, OnDestroy {

  /**
   * Activates a tab by its `tabIndex` property.
   * @required
   */
  @Input()
  public set active(value: SkyTabIndex) {
    if (value !== undefined) {
      this.tabsetService.setActiveTabIndex(value);
    }
  }

  /**
   * Defines a string value to label the tabset for accessibility.
   * If a label is visible on the screen, use the `ariaLabelledBy` property instead.
   */
  @Input()
  public ariaLabel: string;

  /**
   * Identifies the element that defines a label for the tabset.
   * If a label is not visible on the screen, use the `ariaLabel` property instead.
   */
  @Input()
  public ariaLabelledBy: string;

  /**
   * Distinguishes a tabset's unique state in the URL by generating a query parameter
   * that is written as `?<queryParam>-active-tab=<sanitized-tab-heading>`.
   * The query parameter's value is parsed automatically from the selected tab's heading text,
   * but you can supply a custom query parameter value for each tab with its `permalinkValue`.
   */
  @Input()
  public set permalinkId(value: string) {
    if (value) {
      const sanitized = this.permalinkService.urlify(value);
      this._permalinkId = `${sanitized}-active-tab`;
    }
  }

  public get permalinkId(): string {
    return this._permalinkId || '';
  }

  /**
   * @deprecated
   * Specifies the behavior for a series of tabs.
   * The property was designed to create wizards by setting tabStyle="wizard" on tabsets in modals,
   * but this wizard implementation was replaced by the
   * [progress indicator component](https://developer.blackbaud.com/skyux/components/progress-indicator).
   * @default 'tabs'
   */
  @Input()
  public set tabStyle(value: SkyTabsetStyle) {
    /*istanbul ignore else*/
    if (value && value.toLowerCase() === 'wizard') {
      console.warn(
        'The tabset wizard is deprecated. Please implement the new approach using ' +
        'progress indicator as documented here: https://developer.blackbaud.com/skyux/components/wizard.'
      );
    }

    this._tabStyle = value;
  }

  public get tabStyle(): SkyTabsetStyle {
    return this._tabStyle || 'tabs';
  }

  /**
   * Fires when the active tab changes. This event emits the index of the active tab.
   */
  @Output()
  public activeChange = new EventEmitter<SkyTabIndex>();

  /**
   * Fires when users click the button to add a new tab.
   * The new tab button is added to the tab area when you specify a listener for this event.
   */
  @Output()
  public newTab = new EventEmitter<void>();

  /**
   * Fires when users click the button to open a tab.
   * The open tab button is added to the tab area when you specify a listener for this event.
   */
  @Output()
  public openTab = new EventEmitter<void>();

  public dropdownTriggerButtonText: string;

  public tabButtons: TabButtonViewModel[] = [];

  public tabButtonsDisplayMode: SkyTabsetButtonsDisplayMode = 'tabs';

  @ContentChildren(SkyTabComponent)
  private tabComponents: QueryList<SkyTabComponent>;

  private tabComponentsChanged: boolean = false;

  private lastActiveIndex: SkyTabIndex;

  private ngUnsubscribe = new Subject<void>();

  private _permalinkId: string;

  private _tabStyle: SkyTabsetStyle;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    private adapterService: SkyTabsetAdapterService,
    private permalinkService: SkyTabsetPermalinkService,
    private tabsetService: SkyTabsetService,
    @Optional() public themeSvc?: SkyThemeService
  ) { }

  public ngAfterViewInit(): void {
    this.listenActiveIndexChange();
    this.listenTabComponentsChange();
    this.listenTabButtonsOverflowChange();

    // Set the active index based on the permalinkId.
    if (this.permalinkId) {
      const paramValue = this.permalinkService.getParam(this.permalinkId);
      if (paramValue) {
        this.active = this.tabComponents.find(c => c.permalinkValue === paramValue).tabIndex;
      }
    }
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.permalinkService.clearParam(this.permalinkId);
  }

  public onWindowResize(): void {
    this.adapterService.checkTabButtonsOverflow();
  }

  public onTabButtonClick(tabButton: TabButtonViewModel): void {
    this.active = tabButton.tabIndex;
  }

  private listenActiveIndexChange(): void {
    this.tabsetService.activeTabIndex
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(activeIndex => this.updateComponent(activeIndex));
  }

  private listenTabComponentsChange(): void {
    this.tabComponents.changes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async () => {
        const activeTabIndex = await this.tabsetService.activeTabIndex
          .pipe(take(1))
          .toPromise();

        this.tabComponentsChanged = true;
        await this.updateComponent(activeTabIndex);
        this.tabComponentsChanged = false;
      });
  }

  private listenTabButtonsOverflowChange(): void {
    this.adapterService.registerTabset(this.elementRef);
    this.adapterService.overflowChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(isOverflowing => {
        this.tabButtonsDisplayMode = (isOverflowing) ? 'dropdown' : 'tabs';
        this.changeDetector.markForCheck();
      });
  }

  private createTabButtons(activeIndex: SkyTabIndex): TabButtonViewModel[] {
    return this.tabComponents.map(c => ({
      active: (c.tabIndex === activeIndex),
      closeable: c.closeable,
      ariaControls: c.tabPanelId,
      disabled: c.disabled,
      buttonHref: '#',
      buttonId: c.tabButtonId,
      buttonTextCount: c.tabHeaderCount,
      buttonText: c.tabHeading,
      tabIndex: c.tabIndex
    }));
  }

  private updateTabButtons(activeIndex: SkyTabIndex): void {
    this.tabButtons.forEach(b => b.active = (b.tabIndex === activeIndex));
  }

  private updateComponent(activeIndex: SkyTabIndex): Promise<void> {
    return new Promise(resolve => {
      if (!this.tabComponents) {
        resolve();
        return;
      }

      // Wait for the tabs to render before activating.
      setTimeout(() => {

        // Activate/deactivate tab components.
        this.tabComponents.forEach(c => (c.tabIndex === activeIndex)
          ? c.activate()
          : c.deactivate()
        );

        // Update the tab button models.
        if (this.tabComponentsChanged || !this.tabButtons?.length) {
          this.tabButtons = this.createTabButtons(activeIndex);
        } else {
          this.updateTabButtons(activeIndex);
        }

        // Update the dropdown trigger button text.
        this.dropdownTriggerButtonText = this.tabButtons
          .find(b => b.tabIndex === activeIndex)
          .buttonText;

        // Set the query params based on active tab.
        if (this.permalinkId) {
          const activeTabComponent = this.tabComponents.find(c => c.tabIndex === activeIndex);
          this.permalinkService.setParam(this.permalinkId, activeTabComponent.permalinkValue);
        }

        this.changeDetector.markForCheck();

        // Emit the new active index value to consumers.
        if (this.lastActiveIndex !== activeIndex) {
          this.lastActiveIndex = activeIndex;
          this.activeChange.emit(activeIndex);
        }

        resolve();
      });
    });
  }

}
