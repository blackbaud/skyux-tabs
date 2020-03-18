import {
  Location
} from '@angular/common';

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  Observable
} from 'rxjs/Observable';

import {
  Subject
} from 'rxjs/Subject';

import 'rxjs/add/operator/distinctUntilChanged';

import 'rxjs/add/operator/takeUntil';

import {
  SkyTabComponent
} from './tab.component';

import {
  SkyTabsetAdapterService
} from './tabset-adapter.service';

import {
  SkyTabsetService
} from './tabset.service';

interface SkyTabsetPermalinkParams {
  [_: string]: string;
}

@Component({
  selector: 'sky-tabset',
  styleUrls: ['./tabset.component.scss'],
  templateUrl: './tabset.component.html',
  providers: [
    SkyTabsetAdapterService,
    SkyTabsetService
  ]
})
export class SkyTabsetComponent
  implements OnInit, AfterContentInit, AfterViewInit, OnDestroy, OnChanges {

  /**
   * Specifies the index of the active tab.
   * @required
   */
  @Input()
  public active: number | string;

  /**
   * Distinguishes a tabset's unique state in the URL by generating a query parameter
   * that is written as `?<queryParam>-active-tab=<sanitized-tab-heading`.
   * The query parameter's value is parsed automatically from the selected tab's heading text,
   * but you can supply a custom query parameter value for each tab with its `permalinkValue`.
   */
  @Input()
  public set permalinkId(value: string) {
    if (!value) {
      return;
    }

    // Remove all non-alphanumeric characters.
    const sanitized = value.toLowerCase().replace(/[\W]/g, '');
    this._permalinkId = `${sanitized}-active-tab`;
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
  public activeChange = new EventEmitter<any>();

  /**
   * Fires when users click the button to add a new tab.
   * The new tab button is added to the tab area when you specify a listener for this event.
   */
  @Output()
  public newTab = new EventEmitter<any>();

  /**
   * Fires when users click the button to open a tab.
   * The open tab button is added to the tab area when you specify a listener for this event.
   */
  @Output()
  public openTab = new EventEmitter<any>();

  public tabDisplayMode = 'tabs';

  @ContentChildren(SkyTabComponent)
  public tabs: QueryList<SkyTabComponent>;

  private ngUnsubscribe = new Subject<void>();

  private activeIndexOnLoad: number;

  private _permalinkId: string;

  private _tabStyle: string;

  constructor(
    private tabsetService: SkyTabsetService,
    private adapterService: SkyTabsetAdapterService,
    private elRef: ElementRef,
    private changeRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    @Optional() private router?: Router
  ) { }

  public getTabButtonId(tab: SkyTabComponent): string {
    if (this.tabDisplayMode === 'tabs') {
      return `${tab.tabId}-nav-btn`;
    }

    return `${tab.tabId}-hidden-nav-btn`;
  }

  public tabCloseClick(tab: SkyTabComponent): void {
    tab.close.emit(undefined);
  }

  public newTabClick(): void {
    this.newTab.emit(undefined);
  }

  public openTabClick(): void {
    this.openTab.emit(undefined);
  }

  public windowResize(): void {
    this.adapterService.detectOverflow();
  }

  public selectTab(tab: SkyTabComponent): void {
    if (this.permalinkId) {
      this.setQueryParamPermalinkValue(tab.permalinkValue);
    }

    this.tabsetService.activateTab(tab);
  }

  public ngOnInit(): void {
    this.activeIndexOnLoad = (this.active !== undefined) ? +this.active : 0;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const activeChange = changes['active'];
    if (
      activeChange &&
      activeChange.currentValue !== activeChange.previousValue
    ) {
      this.tabsetService.activateTabIndex(this.active);
    }
  }

  public ngAfterContentInit(): void {
    // Initialize each tab's index (in case tabs are instantiated out of order).
    this.tabs.forEach(tab => tab.initializeTabIndex());

    this.tabs.changes
      .takeUntil(this.ngUnsubscribe)
      .subscribe((change: QueryList<SkyTabComponent>) => {

        this.tabsetService.tabs
          .take(1)
          .subscribe(tabs => {
            change
              .filter(tab => tabs.indexOf(tab) === -1)
              .forEach(tab => tab.initializeTabIndex());

            this.adapterService.detectOverflow();
          });
      });

    if (this.active !== undefined) {
      this.tabsetService.activateTabIndex(this.active);
    }

    this.tabsetService.activeIndex
      .distinctUntilChanged()
      .takeUntil(this.ngUnsubscribe)
      .subscribe((newActiveIndex) => {
        // HACK: Not selecting the active tab in a timeout causes an error.
        // https://github.com/angular/angular/issues/6005
        setTimeout(() => {
          if (newActiveIndex !== this.active) {
            this.active = newActiveIndex;
            this.activeChange.emit(newActiveIndex);
          }
        });
      });

      // Listen for back/forward history button presses.
      Observable.fromEvent(window, 'popstate')
        .takeUntil(this.ngUnsubscribe)
        .subscribe(() => this.activateTabByPermalinkValue());
  }

  public ngAfterViewInit(): void {
    this.adapterService.init(this.elRef);

    this.adapterService.overflowChange
      .takeUntil(this.ngUnsubscribe)
      .subscribe((currentOverflow: boolean) => {
        this.updateDisplayMode(currentOverflow);
      });

    this.activateTabByPermalinkValue();

    setTimeout(() => {
      this.adapterService.detectOverflow();
      this.updateDisplayMode(this.adapterService.currentOverflow);
      this.changeRef.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    /*tslint:disable-next-line:no-null-keyword*/
    this.setQueryParamPermalinkValue(null);
  }

  private updateDisplayMode(currentOverflow: boolean): void {
    this.tabDisplayMode = (currentOverflow) ? 'dropdown' : 'tabs';
    this.changeRef.markForCheck();
  }

  private activateTabByPermalinkValue(): void {
    const params = this.getLocationParams();

    if (!(this.permalinkId in params)) {
      this.tabsetService.activateTabIndex(this.activeIndexOnLoad);
      return;
    }

    const value = params[this.permalinkId];

    let index: number;

    this.tabs.forEach((tabComponent, i) => {
      if (tabComponent.permalinkValue === value) {
        index = i;
      }
    });

    // Only set the active tab if an index was found.
    if (index !== undefined) {
      this.tabsetService.activateTabIndex(index);
    }
  }

  private setQueryParamPermalinkValue(value: string): void {
    if (this.permalinkId) {
      const params = this.getLocationParams();

      params[this.permalinkId] = value;

      const url = this.router.createUrlTree([params], {
        relativeTo: this.activatedRoute
      }).toString();

      this.location.go(url);
    }
  }

  private getLocationParams(): SkyTabsetPermalinkParams {
    const params: SkyTabsetPermalinkParams = {};

    const existingParamPairs = this.location.path().split(';');
    existingParamPairs.shift();
    existingParamPairs.forEach((pair) => {
      const fragments = pair.split('=');
      params[fragments[0]] = fragments[1];
    });

    return params;
  }
}
