path = require('path');
var displayProcessorPath = path.resolve('./node_modules/jasmine-spec-reporter/src/display-processor.js');
var DisplayProcessor = require(displayProcessorPath);

function BrowserstackProcessor(options) {
}

BrowserstackProcessor.prototype = new DisplayProcessor();

BrowserstackProcessor.prototype.displayJasmineStarted = function (suite, log) {
  return log +
    '\n\tBranch: ' + process.env.BRANCH_NAME +
    '\n\tRevision: ' + process.env.REVISION +
    '\n\tPull Request: ' + process.env.PULL_REQUEST_NUMBER +
    '\n\tBuild number: ' + process.env.SEMAPHORE_BUILD_NUMBER;
};

BrowserstackProcessor.prototype.displaySuite = function (suite, log) {
  return log;
};

BrowserstackProcessor.prototype.displaySuccessfulSpec = function (spec, log) {
  return log;
};

BrowserstackProcessor.prototype.displayFailedSpec = function (spec, log) {
  return log;
};

BrowserstackProcessor.prototype.displayPendingSpec = function (spec, log) {
  return log;
};

module.exports = BrowserstackProcessor;
