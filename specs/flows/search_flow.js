var googleMainPage = require('../../pageobjects/google/googleMainPage.js');
var googleResultsPage = require('../../pageobjects/google/googleResultsPage.js');
var testData = require('../.././testdata/smoke_testdata.js');
var searchInfo = testData.searchInfo;

var searchFlow = function (it) {
    it('should navigate to google.com', function (done) {
        googleMainPage.navigate();
        done();
    });

    it('should search for query string', function (done) {
        var query = searchInfo.searchFor;
        googleMainPage.search(query);
        done();
    });

    it('should contain expected result on the first page', function (done) {
        var expected = searchInfo.expectedResult;
        console.log(googleResultsPage
            .getResultsTitles()).then(function(text){
            expect(text).toContain(expected);
        });
        //
        done();
    });
}

module.exports = searchFlow;