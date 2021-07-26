import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

import {
  element,
  by
} from 'protractor';

import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

describe('Sectioned Form', () => {

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

    it('should match previous sectioned form screenshot', (done) => {
      expect('#screenshot-sectioned-form').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('sectioned-form')
      });
    });

    it('should match previous sectioned form screenshot after clicking first tab', (done) => {

      let tabs = element.all(by.css('sky-vertical-tab'));

      // click first tab
      tabs.get(0).click();
      expect('#screenshot-sectioned-form').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('sectioned-form-first')
      });
    });

    it('should match previous sectioned form screenshot after clicking first tab when name is required', (done) => {

      let tabs = element.all(by.css('sky-vertical-tab'));

      // click first tab
      tabs.get(0).click();
      element(by.css('#name-checkbox-container .sky-switch-control')).click();
      expect('#screenshot-sectioned-form').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('sectioned-form-first-required')
      });
    });

    it('should match previous sectioned form screenshot after clicking second tab', (done) => {

      let tabs = element.all(by.css('sky-vertical-tab'));

      // click first tab
      tabs.get(1).click();
      expect('#screenshot-sectioned-form').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('sectioned-form-second')
      });
    });
  }
  //#endregion

  function runTestsXs(): void {

    it('should match previous sectioned form screenshot', (done) => {
      expect('#screenshot-sectioned-form').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('sectioned-form')
      });
    });
  }

  describe('(size: lg)', () => {
    beforeEach( async() => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/sectioned-form');
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
      await SkyHostBrowser.get('visual/sectioned-form');
      await setBrowserSize('xs');
    });

    runTestsXs();

    describe('when modern theme', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'light');
      });

      runTestsXs();
    });

    describe('when modern theme in dark mode', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'dark');
      });

      runTestsXs();
    });
  });

});
