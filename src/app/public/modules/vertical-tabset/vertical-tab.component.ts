import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  Subject
} from 'rxjs/Subject';

import {
  SkyVerticalTabsetService
} from './vertical-tabset.service';

@Component({
  selector: 'sky-vertical-tab',
  templateUrl: './vertical-tab.component.html',
  styleUrls: ['./vertical-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyVerticalTabComponent implements OnInit, OnDestroy {
  /**
   * Indicates whether the tab is active when the tabset loads.
   */
  @Input()
  public active: boolean = false;

  /**
   * Specifies an ID to identify the element that contains the content that the vertical
   * tab exposes. This ID corresponds to the tabId. This property supports accessibility
   * rules for disclosures.
   */
  @Input()
  public get ariaControls(): string {
    return this.isMobile ? undefined : this._ariaControls;
  }
  public set ariaControls(value: string) {
    this._ariaControls = value;
  }

  @Input()
  public ariaInvalid: boolean;

  @Input()
  public ariaRequired: boolean;

  /**
   * Specifies an ARIA role for the tab to support accessibility by indicating how the
   * tab functions and what it controls. For information about ARIA roles, see the
   * WAI-ARIA roles model.
   */
  @Input()
  public get ariaRole(): string {
    if (this.isMobile) {
      return undefined;
    }
    return this._ariaRole || 'tab';
  }
  public set ariaRole(value: string) {
    this._ariaRole = value;
  }

  /**
   * Indicates whether to disable the tab.
   */
  @Input()
  public disabled: boolean = false;

  /**
   * Displays a counter alongside the tab header.
   */
  @Input()
  public tabHeaderCount: number;

  /**
   * Specifies the tab header.
   */
  @Input()
  public tabHeading: string;

  @Input()
  public get showTabRightArrow() {
    return this._showTabRightArrow && this.tabsetService.isMobile();
  }

  public set showTabRightArrow(value: boolean) {
    this._showTabRightArrow = value;
  }

  /**
   * Specifies an ID for the tab.
   */
  @Input()
  public tabId: string;

  public index: number;

  @ViewChild('tabContentWrapper')
  public tabContent: ElementRef;

  private isMobile = false;

  private _ariaControls: string;

  private _ariaRole: string;

  private _mobileSubscription = new Subject();

  private _showTabRightArrow: boolean = false;

  constructor(
    private tabsetService: SkyVerticalTabsetService,
    private changeRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.isMobile = this.tabsetService.isMobile();
    this.changeRef.markForCheck();

    this.tabsetService.switchingMobile
      .subscribe((mobile: boolean) => {
        this.isMobile = mobile;
        this.changeRef.markForCheck();
      });

    this.tabsetService.addTab(this);
  }

  public ngOnDestroy(): void {
    this._mobileSubscription.unsubscribe();
    this.tabsetService.destroyTab(this);
  }

  public tabIndex(): number {
    if (!this.disabled) {
      return 0;
    } else {
      return -1;
    }
  }

  public activateTab(): void {
    if (!this.disabled) {
      this.active = true;
      this.tabsetService.activateTab(this);

      this.changeRef.markForCheck();
    }
  }

  public tabDeactivated(): void {
    this.changeRef.markForCheck();
  }
}
