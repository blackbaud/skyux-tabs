import {
  ElementRef,
  Injectable
} from '@angular/core';

import {
  BehaviorSubject,
  Observable
} from 'rxjs';

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

  public checkTabButtonsOverflow(): void {
    const nativeElement = this.tabset.nativeElement;

    const tabsetEl = nativeElement.querySelector('.sky-tabset');
    const allButtonsEl = nativeElement.querySelector('.sky-tabset-buttons');
    const tabButtonsEl = nativeElement.querySelector('.sky-tabset-tabs');
    const tabExtraButtonsEl = nativeElement.querySelector('.sky-tabset-extra-buttons');

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
