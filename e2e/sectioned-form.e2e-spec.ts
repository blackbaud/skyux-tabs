import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  element,
  by
} from 'protractor';

describe('Sectioned Form', () => {
  it('should match previous sectioned form screenshot', (done) => {
    SkyHostBrowser.get('visual/sectioned-form');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-sectioned-form').toMatchBaselineScreenshot(done, {
      screenshotName: 'sectioned-form'
    });
  });

  it('should match previous sectioned form screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/sectioned-form');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-sectioned-form').toMatchBaselineScreenshot(done, {
      screenshotName: 'sectioned-form-xs'
    });
  });

  it('should match previous sectioned form screenshot after clicking first tab', (done) => {
    SkyHostBrowser.get('visual/sectioned-form');
    SkyHostBrowser.setWindowBreakpoint('lg');

    let tabs = element.all(by.css('sky-vertical-tab'));

    // click first tab
    tabs.get(0).click();
    expect('#screenshot-sectioned-form').toMatchBaselineScreenshot(done, {
      screenshotName: 'sectioned-form-first'
    });
  });

  it('should match previous sectioned form screenshot after clicking first tab when name is required', (done) => {
    SkyHostBrowser.get('visual/sectioned-form');
    SkyHostBrowser.setWindowBreakpoint('lg');

    let tabs = element.all(by.css('sky-vertical-tab'));

    // click first tab
    tabs.get(0).click();
    element(by.css('#name-checkbox-container .sky-switch-control')).click();
    expect('#screenshot-sectioned-form').toMatchBaselineScreenshot(done, {
      screenshotName: 'sectioned-form-first-required'
    });
  });

  it('should match previous sectioned form screenshot after clicking second tab', (done) => {
    SkyHostBrowser.get('visual/sectioned-form');
    SkyHostBrowser.setWindowBreakpoint('lg');

    let tabs = element.all(by.css('sky-vertical-tab'));

    // click first tab
    tabs.get(1).click();
    expect('#screenshot-sectioned-form').toMatchBaselineScreenshot(done, {
      screenshotName: 'sectioned-form-second'
    });
  });
});
