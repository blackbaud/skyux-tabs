import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  element,
  by,
  browser
} from 'protractor';

describe('Vertical Tabs', () => {
  it('should match previous vertical tabset screenshot', (done) => {
    SkyHostBrowser.get('visual/vertical-tabset');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-vertical-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: 'vertical-tabset'
    });
  });

  it('should match previous vertical tabset screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/vertical-tabset');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-vertical-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: 'vertical-tabset-xs'
    });
  });

  it('should match previous vertical tabset screenshot after clicking tab', (done) => {
    SkyHostBrowser.get('visual/vertical-tabset');
    SkyHostBrowser.setWindowBreakpoint('lg');
    const groupElement = element(by.css('.group2'));
    browser.wait(function () { return browser.isElementPresent(groupElement); }, 8000);

    // open group
    groupElement.click();

    // click tab
    element(by.id('group2Tab2')).click();
    expect('#screenshot-vertical-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: 'vertical-tabset-clicked-tab'
    });
  });

  it('should match previous vertical tabset screenshot after clicking tab (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/vertical-tabset');
    SkyHostBrowser.setWindowBreakpoint('xs');
    const showTabsButton =
      element(by.css('#screenshot-vertical-tabset .sky-vertical-tabset-show-tabs-btn'));
    browser.wait(function () { return browser.isElementPresent(showTabsButton); }, 8000);

    // show tabs
    showTabsButton.click();

    // open group
    element(by.css('.group2')).click();

    // click tab
    element(by.id('group2Tab2')).click();
    expect('#screenshot-vertical-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: 'vertical-tabset-xs-clicked-tab'
    });
  });

  it('should match previous vertical tabset screenshot after clicking show tabs (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/vertical-tabset');
    SkyHostBrowser.setWindowBreakpoint('xs');
    const showTabsButton =
      element(by.css('#screenshot-vertical-tabset .sky-vertical-tabset-show-tabs-btn'));
    browser.wait(function () { return browser.isElementPresent(showTabsButton); }, 8000);

    // show tabs
    showTabsButton.click();

    expect('#screenshot-vertical-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: 'vertical-tabset-mobile-show-tabs'
    });
  });

  it('should match previous vertical tabset screenshot without groups', (done) => {
    SkyHostBrowser.get('visual/vertical-tabset');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-vertical-tabs-no-groups').toMatchBaselineScreenshot(done, {
      screenshotName: 'vertical-tabset-no-groups'
    });
  });
});
