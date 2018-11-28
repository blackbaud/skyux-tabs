import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  element,
  by,
  browser
} from 'protractor';

describe('Tabs', () => {
  it('should match previous tabset screenshot', (done) => {
    SkyHostBrowser.get('visual/tabs');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: 'tabset'
    });
  });

  it('should match previous tabset screenshot when selected tab is hovered', (done) => {
    SkyHostBrowser.get('visual/tabs');
    SkyHostBrowser.setWindowBreakpoint('lg');
    const tabElem = element(by.css('#screenshot-tabset sky-tab-button .sky-btn-tab-selected'));
    browser.actions().mouseMove(tabElem).perform();
    expect('#screenshot-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: 'tabset-hover'
    });
    SkyHostBrowser.moveCursorOffScreen();
  });

  it('should match previous tabset screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/tabs');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: 'tabset-xs'
    });
  });

  it('should match previous tabset screenshot when tab is hovered (screen: xs)',
    (done) => {
      SkyHostBrowser.get('visual/tabs');
      SkyHostBrowser.setWindowBreakpoint('xs');
      const tabElem = element(by.css('#screenshot-tabset button.sky-dropdown-button-type-tab'));
      browser.actions().mouseMove(tabElem).perform();
      expect('#screenshot-tabset').toMatchBaselineScreenshot(done, {
        screenshotName: 'tabset-xs-hover'
      });
      SkyHostBrowser.moveCursorOffScreen();
    });

  it('should match the tabset screenshot with wizard styling', (done) => {
    SkyHostBrowser.get('visual/tabs');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.sky-test-show-wizard')).click();
    expect('#screenshot-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: 'tabset-wizard'
    });
  });

  it('should match previous dropdown tabset screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/tabs');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('#screenshot-tabset button.sky-dropdown-button-type-tab')).click();
    expect('#screenshot-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: 'tabset-xs-dropdown'
    });
  });

  it('should match previous dropdown tabset screenshot with long tab (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/tabs');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-tabset-long').toMatchBaselineScreenshot(done, {
      screenshotName: 'tabset-xs-dropdown-long'
    });
  });
});
