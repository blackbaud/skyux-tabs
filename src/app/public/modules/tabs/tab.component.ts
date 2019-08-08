import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { SkyTabsetService } from './tabset.service';

let nextId = 0;

@Component({
  selector: 'sky-tab',
  templateUrl: './tab.component.html'
})
export class SkyTabComponent implements OnDestroy, OnChanges {
  public tabId: string = `sky-tab-${++nextId}`;

  @Input()
  public tabHeading: string;

  @Input()
  public tabHeaderCount: string;

  @Input()
  public disabled: boolean;

  @Input()
  public tabIndex: string | number;

  @Input()
  public active: boolean;

  @Input()
  public set queryParamValue(value: string) {
    this._queryParamValue = this.sanitizeKey(value);
  }

  public get queryParamValue(): string {
    return this._queryParamValue || this.sanitizeKey(this.tabHeading);
  }

  public get allowClose(): boolean {
    return this.close.observers.length > 0;
  }

  @Output()
  public close = new EventEmitter<any>();

  private _queryParamValue: string;

  constructor(private tabsetService: SkyTabsetService, private ref: ChangeDetectorRef) {}

  public initializeTabIndex() {
    setTimeout(() => {
      this.tabsetService.addTab(this);

      this.tabsetService.activeIndex.subscribe((activeIndex: any) => {
        this.active = this.tabIndex === activeIndex;
        this.ref.markForCheck();
      });

      if (this.active) {
        this.tabsetService.activateTab(this);
      }
    });

  }

  public ngOnChanges(changes: SimpleChanges) {
    if (this.isTabActivated(changes)) {
      this.tabsetService.activateTab(this);
    }
  }

  public ngOnDestroy() {

    this.tabsetService.destroyTab(this);

  }

  private isTabActivated(changes: SimpleChanges): boolean {
    /* istanbul ignore else */
    /* sanity check */
    if (changes) {
      let activeChange = changes['active'];
      return activeChange
        && this.tabIndex !== undefined
        && activeChange.previousValue !== activeChange.currentValue
        && this.active;
    }
  }

  private sanitizeKey(value: string): string {
    if (!value) {
      return;
    }

    const sanitized = value.toLowerCase()

      // Remove special characters.
      .replace(/[\_\~\`\@\!\#\$\%\^\&\*\(\)\[\]\{\}\;\:\'\/\\\<\>\,\.\?\=\+\|"]/g, '')

      // Replace space characters with a dash.
      .replace(/\s/g, '-')

      // Remove any double-dashes.
      .replace(/--/g, '-');

    return sanitized;
  }

}
