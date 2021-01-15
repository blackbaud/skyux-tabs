import {
  browser,
  by,
  element
} from 'protractor';

import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

describe('Vertical Tabs', () => {

  //#region helpers
  let browserSize: SkyHostBrowserBreakpoint;
  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  async function setBrowserSize(size: SkyHostBrowserBreakpoint): Promise<void> {
    browserSize = size;

    return SkyHostBrowser.setWindowBreakpoint(size);
  }

  function getScreenshotName(name: string): string {
    if (browserSize) {
      name += '-' + browserSize;
    }

    if (currentTheme) {
      name += '-' + currentTheme;
    }

    if (currentThemeMode) {
      name += '-' + currentThemeMode;
    }

    return name;
  }

  function runTests(): void {
    it('should match previous vertical tabset screenshot', (done) => {
      SkyHostBrowser.scrollTo('#screenshot-vertical-tabset');
      expect('#screenshot-vertical-tabset').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('vertical-tabset')
      });
    });

    it('should match previous vertical tabset screenshot after clicking tab', (done) => {
      SkyHostBrowser.scrollTo('#screenshot-vertical-tabset');

      if (browserSize === 'xs') {
        const showTabsButton =
          element(by.css('#screenshot-vertical-tabset .sky-vertical-tabset-show-tabs-btn'));
        browser.wait(function () { return browser.isElementPresent(showTabsButton); }, 8000);

        // show tabs
        showTabsButton.click();
      }

      const groupElement = element(by.css('.group2'));
      browser.wait(function () { return browser.isElementPresent(groupElement); }, 4000);

      // open group
      groupElement.click();

      // click tab
      element(by.id('group2Tab2')).click();
      expect('#screenshot-vertical-tabset').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('vertical-tabset-clicked-tab')
      });
    });

    if (browserSize === 'xs') {
      it('should match previous vertical tabset screenshot after clicking show tabs', (done) => {
        SkyHostBrowser.scrollTo('#screenshot-vertical-tabset');
        const showTabsButton =
          element(by.css('#screenshot-vertical-tabset .sky-vertical-tabset-show-tabs-btn'));
        browser.wait(function () { return browser.isElementPresent(showTabsButton); }, 8000);

        // show tabs
        showTabsButton.click();

        expect('#screenshot-vertical-tabset').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('vertical-tabset-mobile-show-tabs')
        });
      });
    }

    it('should match previous vertical tabset screenshot without groups', (done) => {
      SkyHostBrowser.scrollTo('#screenshot-vertical-tabs-no-groups');
      expect('#screenshot-vertical-tabs-no-groups').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('vertical-tabset-no-groups')
      });
    });

    it('should match previous modal screenshot', (done) => {
      SkyHostBrowser.scrollTo('#vertical-tabset-modal-launcher');
      element(by.css('#vertical-tabset-modal-launcher')).click();
      SkyHostBrowser.scrollTo('#screenshot-vertical-tabset-modal');
      expect('#screenshot-vertical-tabset-modal').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('vertical-tabset-modal')
      });
    });
  }
  //#endregion

  describe('(size: lg)', () => {
    beforeEach( async() => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/vertical-tabset');
      await setBrowserSize('lg');
    });

    runTests();

    describe('when modern theme', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'light');
      });

      runTests();
    });

    describe('when modern theme in dark mode', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'dark');
      });

      runTests();
    });
  });

  describe('(size: xs)', () => {
    beforeEach( async() => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/vertical-tabset');
      await setBrowserSize('xs');
    });

    runTests();

    describe('when modern theme', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'light');
      });

      runTests();
    });

    describe('when modern theme in dark mode', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'dark');
      });

      runTests();
    });
  });

});
