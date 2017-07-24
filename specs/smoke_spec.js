var helper = require('.././helpers/webdriver_helper.js');
var testFlow = require('./flows/search_flow.js');

describe('Google Banana Search', function () {

    describe('should work on devices with ".col-xs-$ - Extra Small" display size', function () {
        it('set browser size to ".col-xs-$"', function (done) {
            helper.setDriverSize('S');
            done();
        });

        testFlow(it);

        afterAll(function () {
            drv.manage().deleteAllCookies();
        });
    });

    describe('should work on devices with ".col-sm-$ - Small Devices" display size', function () {
        it('set browser size to ".col-sm-$"', function (done) {
            helper.setDriverSize('M');
            done();
        });

        testFlow(it);

        afterAll(function () {
            drv.manage().deleteAllCookies();
        });
    });

    describe('should work on devices with ".col-md-$ & .col-lg-$ - Desktops" display size', function () {
        it('set browser size to ".col-md-$ and .col-lg-$"', function (done) {
            helper.setDriverSize('L');
            done();
        });

        testFlow(it);

        afterAll(function () {
            drv.manage().deleteAllCookies();
        });
    });
});
