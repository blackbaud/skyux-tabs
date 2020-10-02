import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';
import { Subject } from 'rxjs';
import { SkyTabComponent } from './tab.component';
import { SkyTabIndex } from './tab-index';
import { SkyTabsetService } from './tabset.service';
import { take, takeUntil } from 'rxjs/operators';

interface TabButtonViewModel {
  active: boolean;
  disabled: boolean;
  id: string;
  tabIndex: SkyTabIndex;
  text: string;
}

@Component({
  selector: 'sky-tabset',
  styleUrls: ['./tabset.component.scss'],
  templateUrl: './tabset.component.html',
  providers: [
    SkyTabsetService
],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTabsetComponent
  implements AfterContentInit, AfterViewInit, OnDestroy {

  /**
   * Specifies the index of the active tab.
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
   * @default "tabs"
   */
  @Input()
  public set tabStyle(value: string) {
    /*istanbul ignore else*/
    if (value && value.toLowerCase() === 'wizard') {
      console.warn(
        'The tabset wizard is deprecated. Please implement the new approach using ' +
        'progress indicator as documented here: https://developer.blackbaud.com/skyux/components/wizard.'
      );
    }

    this._tabStyle = value;
  }

  public get tabStyle(): string {
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

  public tabButtons: TabButtonViewModel[] = [];

  public tabDisplayMode = 'tabs';

  @ContentChildren(SkyTabComponent)
  private tabComponents: QueryList<SkyTabComponent>;

  private lastActiveIndex: SkyTabIndex;

  private ngUnsubscribe = new Subject<void>();

  private _tabStyle: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private tabsetService: SkyTabsetService
  ) { }

  public ngAfterContentInit(): void {
    this.watchTabComponentChanges();
  }

  public ngAfterViewInit(): void {
    this.tabsetService.activeTabIndex.subscribe(i => this.updateView(i));
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
        this.updateView(activeTabIndex);
      });
  }

  private getTabButtons(activeIndex: SkyTabIndex): TabButtonViewModel[] {
    return this.tabButtons = this.tabComponents.map(c => ({
      active: (c.tabIndex === activeIndex),
      disabled: c.disabled,
      id: c.tabButtonId,
      tabIndex: c.tabIndex,
      text: c.tabHeading
    }));
  }

  private updateView(activeIndex: SkyTabIndex): void {
    if (this.tabComponents) {
      // Wait for the tabs to render before activating.
      setTimeout(() => {
        this.tabComponents.forEach(c => (c.tabIndex === activeIndex)
          ? c.activate()
          : c.deactivate()
        );
        this.tabButtons = this.getTabButtons(activeIndex);
        this.changeDetector.markForCheck();

        if (this.lastActiveIndex !== activeIndex) {
          this.lastActiveIndex = activeIndex;
          this.activeChange.emit(activeIndex);
        }
      });
    }
  }

}
