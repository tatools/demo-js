var until = require('selenium-webdriver').until;
module.exports = {
    resultTitlesCSS: 'h3 > a:not([style="display:none"])',

    //#1 Use webdriver-sync? https://www.npmjs.com/package/webdriver-sync
    //#2 Use TypeScipt?
    getResultsTitles: function () {
        drv.wait(until.elementIsVisible(by.css(this.resultTitlesCSS)), SHORT_WAIT).then(function() {
                drv.findElement(by.css(this.resultTitlesCSS)).getText().then(function(text) {
                    console.log(text)
                });
            }
        );
        // drv.findElement(by.css(this.resultTitlesCSS))
        //     .then(function(elements_arr){
        //         return elements_arr;
        //     });
    }
}