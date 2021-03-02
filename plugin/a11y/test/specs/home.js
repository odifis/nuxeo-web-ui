const runAxeCore = require('../axe-reporter');
const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');

let _report;

// doing this with a lazy function because mocha does not allow before hooks siblings to describe/context
const getReport = () => {
  if (_report) {
    return _report;
  }

  browser.setTimeout({ script: 120000 });
  LoginPage.open();
  LoginPage.login('Administrator', 'Administrator');
  HomePage.open();
  HomePage.recentlyEdited().waitForDisplayed();
  browser.pause(3000);

  _report = runAxeCore();

  return _report;
};

describe('Home Page', () => {
  context('Violations', () => {
    const expectedViolations = {
      'ARIA commands must have an accessible name': 15,
      'ARIA input fields must have an accessible name': 1,
      'Certain ARIA roles must contain particular children': 1,
      'ARIA tooltip nodes must have an accessible name': 1,
      'id attribute value must be unique': 28,
      'Document must have one main landmark': 1,
      'Zooming and scaling must not be disabled': 1,
      'Page must contain a level-one heading': 1,

      // the borwser extension is able to find 101 of these, sometimes more, in dev mode (port 5000)
      // in dev mode (on port 5000), we find 78
      // but after building, on port 8080, we onlfy find 19
      // the differences between dev and prod mode might be related, in part, to content loaded from local storage
      'All page content must be contained by landmarks': 19,

      // does not happen in dev mode
      'Ensure that scrollable region has keyboard access': 1,
    };

    const nViolations = Object.keys(expectedViolations).length;
    const nIssues = Object.values(expectedViolations).reduce((a, b) => a + b, 0);

    let report;

    before(() => {
      report = getReport();
    });

    it(`should have ${nViolations} violation(s)`, () => {
      expect(report.violations.length).toBe(nViolations);
    });

    Object.entries(expectedViolations).forEach(([violation, issues]) => {
      it(`${violation}: ${issues} issue(s)`, () => {
        expect(report.violations).toEqual(
          expect.arrayContaining([
            {
              name: violation,
              issues,
            },
          ]),
        );
      });
    });

    it(`should have ${nIssues} total issue(s)`, () => {
      const vissues = report.violations.map(({ issues }) => issues).reduce((a, b) => a + b, 0);
      expect(vissues).toBe(nIssues);
    });
  });

  context('Incomplete violations', () => {
    const expectedIncompleteViolations = {
      'ARIA role must be appropriate for the element': 5,

      // the browser extension is able to finish and find 32 of these
      'Elements must have sufficient color contrast': 0,
    };

    const nIncompleteViolations = Object.keys(expectedIncompleteViolations).length;
    const nIncompleteIssues = Object.values(expectedIncompleteViolations).reduce((a, b) => a + b, 0);

    let report;

    before(() => {
      report = getReport();
    });

    it(`should have ${nIncompleteViolations} incomplete violation(s)`, () => {
      expect(report.incomplete.length).toBe(nIncompleteViolations);
    });

    Object.entries(expectedIncompleteViolations).forEach(([violation, issues]) => {
      it(`${violation}: ${issues} issue(s)`, () => {
        expect(report.incomplete).toEqual(
          expect.arrayContaining([
            {
              name: violation,
              issues,
            },
          ]),
        );
      });
    });

    it(`should have ${nIncompleteIssues} incomplete total issue(s)`, () => {
      const vissues = report.incomplete.map(({ issues }) => issues).reduce((a, b) => a + b, 0);
      expect(vissues).toBe(nIncompleteIssues);
    });
  });
});
