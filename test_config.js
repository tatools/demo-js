var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var SpecReporter = require('jasmine-spec-reporter');
var BrowserstackProcessor = require('./reporters/browserstack_processor.js');
var now = new Date();
var subFolder = now.toDateString().replace(/\s/g, "_") + '/' + now.getTime();
var htmlReporter = new HtmlScreenshotReporter({
  dest: './reports/' + subFolder,
  filename: 'index.html',
});

exports.config = {
  baseUrl: 'https://www.google.com', // no slash at the end, please
  specs: ['./specs/*[sS]pec.js'],
  seleniumAddress: 'http://hub.browserstack.com/wd/hub',
  getPageTimeout: 60 * 1000, // 1 minute
  directConnect: true,  // uncomment this if you want to run tests locally
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval:  7 * 60 * 1000, // 7 minutes in ms
    print: function () {}, // remove protractor default reporter
  },

  onPrepare: function () {
    /* init global stuff */
    global.drv = browser.driver; // global web-driver alias
    global.EC = protractor.ExpectedConditions; // global expected conditions alias
    global.SHORT_WAIT = 60 * 1000; // 1 minute
    global.MEDIUM_WAIT = 2 * 60 * 1000; // 2 minutes
    global.BROWSER_HEIGHT = 736;

    /* init browser stuff */
    browser.ignoreSynchronization = true; // Engage 'non-angular mode'

    /* init jasmine stuff */
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'summary',
      customProcessors: [BrowserstackProcessor],
    }));
    jasmine.getEnv().addReporter(htmlReporter);
  },

  beforeLaunch: function () {
    /* htmlReporter init */
    return new Promise(function (resolve) {
      htmlReporter.beforeLaunch(resolve);
    });
  },

  afterLaunch: function (exitCode) {
    /* htmlReporter release */
    return new Promise(function (resolve) {
      htmlReporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },

  capabilities: {
    browserName: 'chrome',
    // 'browserstack.user': process.env.BROWSERSTACK_USER,
    // 'browserstack.key': process.env.BROWSERSTACK_KEY,
    // 'browserstack.autoWait': 60,
    // os: 'Windows',
    // os_version: '7',
    // resolution: '1440x900',
    // project: 'Store Smoke Tests',
    // build: now.toDateString() + ', ' + now.toTimeString(),
  },

  /* You can go multi browser if you wish to */

  // maxSessions: 1,
  // multiCapabilities: [
  //   {
  //     browserName: 'firefox',
  //   },
  //   {
  //     browserName: 'chrome',
  //   },
  // ],
};
