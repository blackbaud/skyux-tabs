import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

import {
  element,
  by,
  browser
} from 'protractor';

describe('Tabs', () => {
  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  function getScreenshotName(name: string): string {
    if (currentTheme) {
      name += '-' + currentTheme;
    }

    if (currentThemeMode) {
      name += '-' + currentThemeMode;
    }

    return name;
  }

  function validateBasic(done: DoneFn): void {
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('tabset')
    });
  }

  function validateSelectedTabHover(done: DoneFn): void {
    SkyHostBrowser.setWindowBreakpoint('lg');
    const tabElem = element(by.css('#screenshot-tabset sky-tab-button .sky-btn-tab-selected'));
    browser.actions().mouseMove(tabElem).perform();
    expect('#screenshot-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('tabset-hover')
    });
    SkyHostBrowser.moveCursorOffScreen();
  }

  function validateBasicXs(done: DoneFn): void {
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('tabset-xs')
    });
  }

  function validateSelectedTabHoverXs(done: DoneFn): void {
    SkyHostBrowser.setWindowBreakpoint('xs');
    const tabElem = element(by.css('#screenshot-tabset button.sky-dropdown-button-type-tab'));
    browser.actions().mouseMove(tabElem).perform();
    expect('#screenshot-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('tabset-xs-hover')
    });
    SkyHostBrowser.moveCursorOffScreen();
  }

  function validateDropdownTabset(done: DoneFn): void {
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('#screenshot-tabset button.sky-dropdown-button-type-tab')).click();
    expect('#screenshot-tabset').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('tabset-xs-dropdown')
    });
  }

  function validateDropdownLongTabXs(done: DoneFn): void {
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('#screenshot-tabset-long');
    expect('#screenshot-tabset-long').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('tabset-xs-dropdown-long')
    });
  }

  beforeEach(() => {
    currentTheme = undefined;
    currentThemeMode = undefined;

    SkyHostBrowser.get('visual/tabs');
  });

  it('should match previous tabset screenshot', (done) => {
    validateBasic(done);
  });

  it('should match previous tabset screenshot when selected tab is hovered', (done) => {
    validateSelectedTabHover(done);
  });

  it('should match previous tabset screenshot (screen: xs)', (done) => {
    validateBasicXs(done);
  });

  it('should match previous tabset screenshot when tab is hovered (screen: xs)', (done) => {
    validateSelectedTabHoverXs(done);
  });

  it('should match previous dropdown tabset screenshot (screen: xs)', (done) => {
    validateDropdownTabset(done);
  });

  it('should match previous dropdown tabset screenshot with long tab (screen: xs)', (done) => {
    validateDropdownLongTabXs(done);
  });

  describe('when modern theme', () => {

    beforeEach(async () => {
      await selectTheme('modern', 'light');
    });

    it('should match previous tabset screenshot', (done) => {
      validateBasic(done);
    });

    it('should match previous tabset screenshot when selected tab is hovered', (done) => {
      validateSelectedTabHover(done);
    });

    it('should match previous tabset screenshot (screen: xs)', (done) => {
      validateBasicXs(done);
    });

    it('should match previous tabset screenshot when tab is hovered (screen: xs)', (done) => {
      validateSelectedTabHoverXs(done);
    });

    it('should match previous dropdown tabset screenshot (screen: xs)', (done) => {
      validateDropdownTabset(done);
    });

    it('should match previous dropdown tabset screenshot with long tab (screen: xs)', (done) => {
      validateDropdownLongTabXs(done);
    });

  });
});
