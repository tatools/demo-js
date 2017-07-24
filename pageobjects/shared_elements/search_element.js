module.exports = {
  searchInputCSS: 'input[name="q"]',
  searchButtonCSS: 'button[name="btnG"]',

  search: function (forWhat) {
    var searchInput = element(by.css(this.searchInputCSS));
    var searchButton = element(by.css(this.searchButtonCSS));
    searchInput.clear();
    searchInput.sendKeys(forWhat);
    return searchButton.click();
  },
};
