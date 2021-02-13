var _ = require('lodash');
describe('Manage pattern', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open manage pattern module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.linkText('Patterns')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Manage Patterns');
  });

  it('Add new pattern', function () {
    browser.sleep(2000);
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.model('patternData.name')).sendKeys(randNumber);
    browser.sleep(2000);
    element(by.model('patternData.sel_template')).$('[label="' + 'series' + '"]').click();
    browser.sleep(2000);
    element(by.model('tpl_initial_value')).sendKeys(randNumber);
    element(by.xpath('//i[contains(@class,"glyphicon glyphicon-plus")]')).click();
    browser.sleep(2000);
    element(by.model('patternData.sel_template')).$('[label="' + 'Facility Code' + '"]').click();
    browser.sleep(2000);
    element(by.xpath('//i[contains(@class,"glyphicon glyphicon-plus")]')).click();
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Pattern created successfully.');

  });

  it('Delete newly added pattern', function () {
    browser.sleep(2000);
    element.all(by.repeater('PatternData in PatternDatas')).getText().then(function (txt) {
      // console.log('my pattern name', txt);
      var pattern =
        _.findIndex(txt, function (t) {
          return t.indexOf(randNumber) > -1;
        })
      element(by.xpath('//*[@id="reqListing"]/tbody/tr[' + (pattern + 1) + ']/td[4]/div/a[3]/i')).click();
      browser.sleep(2000);
      element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
      browser.sleep(2000);
      expect($('.toast-message').getText()).toEqual('Pattern deleted successfully.');
    })

  });


});