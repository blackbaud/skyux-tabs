import {
  AfterContentInit,
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
  SkyTabsetMode
} from './tabset-mode';

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
    SkyTabsetService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTabsetComponent
  implements AfterContentInit, AfterViewInit, OnDestroy {

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
   * @deprecated
   * Specifies the behavior for a series of tabs.
   * The property was designed to create wizards by setting tabStyle="wizard" on tabsets in modals,
   * but this wizard implementation was replaced by the
   * [progress indicator component](https://developer.blackbaud.com/skyux/components/progress-indicator).
   * @default 'tabs'
   */
  @Input()
  public set tabStyle(value: SkyTabsetMode) {
    /*istanbul ignore else*/
    if (value && value.toLowerCase() === 'wizard') {
      console.warn(
        'The tabset wizard is deprecated. Please implement the new approach using ' +
        'progress indicator as documented here: https://developer.blackbaud.com/skyux/components/wizard.'
      );
    }

    this._tabStyle = value;
  }

  public get tabStyle(): SkyTabsetMode {
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

  private _tabStyle: SkyTabsetMode;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    private adapterService: SkyTabsetAdapterService,
    private tabsetService: SkyTabsetService,
    @Optional() public themeSvc?: SkyThemeService
  ) { }

  public ngAfterContentInit(): void {
    this.watchTabComponentChanges();
  }

  public ngAfterViewInit(): void {
    this.tabsetService.activeTabIndex.subscribe(i => this.updateView(i));
    this.watchTabButtonsOverflow();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onWindowResize(): void {
    this.adapterService.checkTabButtonsOverflow();
  }

  public onTabButtonClick(tabButton: TabButtonViewModel): void {
    this.active = tabButton.tabIndex;
  }

  private watchTabComponentChanges(): void {
    this.tabComponents.changes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async () => {
        const activeTabIndex = await this.tabsetService.activeTabIndex
          .pipe(take(1))
          .toPromise();

        this.tabComponentsChanged = true;
        await this.updateView(activeTabIndex);
        this.tabComponentsChanged = false;
      });
  }

  private watchTabButtonsOverflow(): void {
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

  private updateView(activeIndex: SkyTabIndex): Promise<void> {
    return new Promise(resolve => {
      if (!this.tabComponents) {
        resolve();
        return;
      }

      // Wait for the tabs to render before activating.
      setTimeout(() => {
        this.tabComponents.forEach(c => (c.tabIndex === activeIndex)
          ? c.activate()
          : c.deactivate()
        );

        if (this.tabComponentsChanged || !this.tabButtons?.length) {
          this.tabButtons = this.createTabButtons(activeIndex);
        } else {
          this.updateTabButtons(activeIndex);
        }

        this.dropdownTriggerButtonText = this.tabButtons
          .find(b => b.tabIndex === activeIndex)
          .buttonText;

        this.changeDetector.markForCheck();

        if (this.lastActiveIndex !== activeIndex) {
          this.lastActiveIndex = activeIndex;
          this.activeChange.emit(activeIndex);
        }

        resolve();
      });
    });
  }

}
