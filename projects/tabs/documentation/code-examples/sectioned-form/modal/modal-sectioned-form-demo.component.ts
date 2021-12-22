import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyModalInstance
} from '@skyux/modals';

import {
  SkySectionedFormComponent
} from '@skyux/tabs';

@Component({
  selector: 'app-modal-sectioned-form-demo',
  templateUrl: './modal-sectioned-form-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalSectionedFormDemoComponent {

  public activeIndexDisplay: number = undefined;

  public activeTab = true;

  @ViewChild(SkySectionedFormComponent)
  public sectionedFormComponent: SkySectionedFormComponent;

  constructor(
    public modalInstance: SkyModalInstance,
    private changeDetector: ChangeDetectorRef
  ) {}

  public onIndexChanged(newIndex: number): void {
    this.activeIndexDisplay = newIndex;
    this.changeDetector.markForCheck();
  }

  public tabsHidden(): boolean {
    return !this.sectionedFormComponent?.tabsVisible();
  }

  public showTabs(): void {
    this.sectionedFormComponent.showTabs();
  }
}
