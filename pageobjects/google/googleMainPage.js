var searchElement = require(require('path').resolve('./pageobjects/shared_elements/search_element.js'));

module.exports = {
    navigate: function () {
        drv.get(browser.baseUrl);
        return this;
    },

    search: function (forWhat) {
        return searchElement.search(forWhat);
    },
}
