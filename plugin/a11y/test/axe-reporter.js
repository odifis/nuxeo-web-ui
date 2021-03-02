const { source } = require('axe-core');

module.exports = function runAxeCore() {
  // inject the axe-core lib
  browser.execute(source);

  // https://github.com/dequelabs/axe-core/blob/develop/doc/API.md
  const options = {
    runOnly: {
      type: 'tag',
      values: ['ACT', 'best-practice', 'wcag2a', 'wcag2aa'],
    },
  };
  // run inside browser and get results
  const results = browser.executeAsync((opts, done) => {
    // eslint-disable-next-line no-undef
    axe
      .run({ exclude: [['nuxeo-path-suggestion']] }, opts)
      .then((res) => done(res))
      .catch((err) => {
        throw err;
      });
  }, options);

  return {
    results,
    incomplete: results.incomplete.map((a) => {
      return { name: a.help, issues: a.nodes.length };
    }),
    violations: results.violations.map((a) => {
      return { name: a.help, issues: a.nodes.length };
    }),
  };
};
