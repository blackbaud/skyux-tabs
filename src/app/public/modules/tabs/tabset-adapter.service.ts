import {
  ElementRef,
  Injectable
} from '@angular/core';

import {
  BehaviorSubject,
  Observable
} from 'rxjs';

/**
 * @internal
 */
@Injectable()
export class SkyTabsetAdapterService {

  public get overflowChange(): Observable<boolean> {
    return this._overflowChange.asObservable();
  }

  private currentOverflow: boolean;

  private tabset: ElementRef;

  private _overflowChange = new BehaviorSubject<boolean>(false);

  public registerTabset(tabset: ElementRef): void {
    this.tabset = tabset;
  }

  public detectOverflow(): void {
    const nativeElement = this.tabset.nativeElement;

    const tabsetEl = nativeElement.querySelector('.sky-tabset');
    const allButtonsEl = nativeElement.querySelector('.sky-tabset-buttons-wrapper');
    const tabButtonsEl = nativeElement.querySelector('.sky-tabset-tabs');
    const tabExtraButtonsEl = nativeElement.querySelector('.sky-tabset-btns');

    const tabsetRect = tabsetEl.getBoundingClientRect();
    const allButtonsRect = allButtonsEl.getBoundingClientRect();

    const offsetLeft = allButtonsRect.left - tabsetRect.left;
    const tabButtonsWidth = tabButtonsEl.offsetWidth + tabExtraButtonsEl.offsetWidth + offsetLeft;

    const newOverflow = (tabButtonsWidth > tabsetRect.width);
    if (this.currentOverflow !== newOverflow) {
      this.currentOverflow = newOverflow;
      this._overflowChange.next(this.currentOverflow);
    }
  }
}
