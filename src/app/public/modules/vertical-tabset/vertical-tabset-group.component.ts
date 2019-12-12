import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  QueryList
} from '@angular/core';

import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

import 'rxjs/add/operator/takeUntil';

import {
  Subject
} from 'rxjs/Subject';

import {
  SkyVerticalTabComponent
} from './vertical-tab.component';

import {
  SkyVerticalTabsetService
} from './vertical-tabset.service';

@Component({
  selector: 'sky-vertical-tabset-group',
  templateUrl: './vertical-tabset-group.component.html',
  styleUrls: ['./vertical-tabset-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger(
      'tabSlide', [
        transition(':enter', [
          style({
            height: '0',
            visibility: 'hidden'
          }),
          animate('150ms ease-in', style({
            height: '*',
            visibility: 'visible'
          }))
        ]),
        transition(':leave', [
          style({
            height: '*',
            visibility: 'visible'
          }),
          animate('150ms ease-in', style({
            height: '0',
            visibility: 'hidden'
          }))
        ])
      ])
    ]
})
export class SkyVerticalTabsetGroupComponent implements OnInit, OnDestroy {

  @Input()
  public disabled: boolean;

  @Input()
  public groupHeading: string;

  @Input()
  public set open(value: boolean) {
    this._open = value;
  }

  public get open(): boolean {
    return !this.disabled && this._open;
  }

  @ContentChildren(SkyVerticalTabComponent)
  private tabs: QueryList<SkyVerticalTabComponent>;

  private ngUnsubscribe = new Subject();

  private openBeforeTabsHidden: boolean = false;

  private _open: boolean = false;

  constructor(
    private tabService: SkyVerticalTabsetService,
    private changeRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.tabService.hidingTabs
      .takeUntil(this.ngUnsubscribe)
      .subscribe(this.tabsHidden);

    this.tabService.showingTabs
      .takeUntil(this.ngUnsubscribe)
      .subscribe(this.tabsShown);

    this.tabService.tabClicked
      .takeUntil(this.ngUnsubscribe)
      .subscribe(this.tabClicked);
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public toggleMenuOpen(): void {
    if (!this.disabled) {
      this.open = !this.open;
    }

    this.changeRef.markForCheck();
  }

  public subMenuOpen(): boolean {
    return this.tabs && (this.tabs.find(t => t.active) !== undefined);
  }

  public tabClicked = () => {
    this.changeRef.markForCheck();
  }

  public tabsHidden = () => {
    // this fixes an animation bug with ngIf when the parent component goes from visible to hidden
    this.openBeforeTabsHidden = this.open;
    this.open = false;
    this.changeRef.markForCheck();
  }

  public tabsShown = () => {
    this.open = this.openBeforeTabsHidden;
    this.changeRef.markForCheck();
  }
}
