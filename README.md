# CrossBrowser Testing Project
This is a skeleton framework for testing adaptive layout web sites. It is based on [Protractor](https://angular.github.io/protractor/#/) with [Jasmine](http://jasmine.github.io/) framework and it can use browsers at [BrowserStack](https://www.browserstack.com) or [Sauce Labs](http://saucelabs.com/) for testing.
## Installation
1. Clone repo and navigate to the cloned folder
2. Install [Node.js](https://nodejs.org/en/) v.4.4.2 or higher
3. Run `npm install` command
4. You may need to add `./node_modules/.bin` folder to your system path
5. If you are planning to run tests locally with something other than FireFox, you may need to install driver executable. You can do it with protractors [webdriver-manager](https://angular.github.io/protractor/#/server-setup) tool:
  - `webdriver-manager update --chrome` command for chrome 
  - `webdriver-manager update --ie` for internet explorer

## Running and Configuring

####Running

To run tests your tests you have to execute `npm test` command. When command returns you can find the HTML report at `./reports/` folder.

####Configuring

By default tests are being executed on BrowserStack. This requires system variables *BROWSERSTACK_USER* and *BROWSERSTACK_KEY* to contain your credentials for BrowserStack.

Configuration is done mostly in `test_config.js` file. You can:

 - Run tests locally by un-commenting `directConnect: true` line
 - Set base URL at `baseUrl` line. Should **not** contain ending slash
 - Configure your *reports* and *spec* folders
 - Set timeouts and browser height at `onPrepare:` function
 - Set browser capabilities

You can find full specification in protractor [reference config file](https://github.com/angular/protractor/blob/master/docs/referenceConf.js) 

## Adding New Tests

To add a new test you have to do 3 things:

 - Update existing page objects or create new ones if needed
 - Create new *flow* file 
 - Create new *spec* file

####Page Objects
[Page objects](http://www.seleniumhq.org/docs/06_test_design_considerations.jsp#page-object-design-pattern) are located in `./pageobjects/` folder. It tries to follow *the store* structure. It is just an object with fields and functions (see cart_page.js for example). 

Some global variables used in them:

 - `drv` is an alias to `browser.driver` which is an instance of [WebDriver](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs)
 - `EC` is and alias to [`protractor.ExpectedConditions`](https://angular.github.io/protractor/#/api?view=ExpectedConditions) 
 - `SHORT_WAIT` and `MEDIUM_WAIT` for  setting the timeouts for waits

Some rules:

 - **All calls to `drv` should be done in Page Object only**
 - **Timeouts should not be hard-coded, use `SHORT_WAIT` or `MEDIUM_WAIT` variables or add one to your liking**

####Page Object Elements

If pages are sharing some common element (like search), it should be moved to a file in `pageobjects/shared_elements/` folder. 

Please see use of shared search element in `search` function from `spanish_programs_page.js` page object.

####Flow files
Flow files encapsulate some specific user flow, like guest checkout (see `specs/flows/guest_checkout_flow.js`). 

They are basically a sequences of Jasmines `it('should', function (done) {...` calls to be reused in spec files. 

Here is the example:
```javascript
/* your pageobjects require('') calls here */
var guestCheckoutFlow = function (it) {
  it('navigate to Coffee Products page', function (done) {
    coffeeProductsPage.navigate();
    done();
  });
  it('should always pass', function (done) {
  //skip a few calls
};

module.exports = guestCheckoutFlow;
```
 **Note: Always use 'done();' callback!**
###Spec files
Spec files are the actual Jasmine files with your tests. Any file from `./specs/` folder which name ends with `_spec.js` will be executed as a test. 

Lets take a look at some code:
```javascript
describe('My Store', function () {

  describe('should go through guest checkout in ".col-xs-$ - Extra Small" size', function () {
    it('set browser size to ".col-xs-$"', function (done) {
      helper.setDriverSize('S');
      done();
    });

    guestCheckoutFlow(it);

    afterAll(function () {
      drv.manage().deleteAllCookies();
    });
  });
describe('should go through guest checkout in ".col-sm-$ - Small Devices" size', function () {
...
```

As you can see, first it requered sets browser size, than goes thru the flow and afterwards does the cleanup, so you can add another `describe()` with different browser size or settings and go thru the same flow again.

-----
_let all your tests be green!_
