var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Approve unapproved items', function () {
  var EC = protractor.ExpectedConditions;
  var Billonly_sku = browser.params.itemCatalog.Billonly_sku;
  var Billonly_item_name = browser.params.itemCatalog.Billonly_item_name;
  var Billonly_alias = browser.params.itemCatalog.Billonly_alias;
  var vendor = browser.params.itemCatalog.vendor;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('approve items', function () {

    browser.actions().mouseMove(element(by.xpath('//span[contains(text(),"Approve Items")]'))).perform();
    browser.sleep(2000);
    element(by.xpath('//span[contains(text(),"Approve Items")]')).click();
    browser.sleep(3000);
    expect(browser.getTitle()).toEqual('Approve Items');

  });

  it('select user default facility', function () {
    element(by.xpath('//*[@id="ng-view"]/div/div[1]/hyb-facility-select/a')).click();
    browser.sleep(2000);
    element(by.model('search.searchKeyword')).sendKeys(browser.params.user.fac_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    var default_fac_selected = element(by.buttonText('Selected'));
    default_fac_selected.isPresent().then(function (present) {
      if (present) {
        element(by.buttonText('Close')).click();
      } else {
        element(by.buttonText('Select')).click();
      }
    })
    browser.sleep(2000);
  });

  it('verify that search with status and vendor drop down field appear on page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[contains(.,'All Vendors')]")).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.is_approved')).isPresent()).toBeTruthy();

  });

  it('verify that user is able to search item with item name', function () {
    element(by.model('searchParams.search')).clear().sendKeys(Billonly_item_name + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      expect(element1.element(by.cssContainingText('hyb-highlight > span.highlight-context', Billonly_item_name + randNumber)).isPresent()).toBeTruthy();
    });
  });

  it('verify that user is able to search item with sku', function () {
    element(by.model('searchParams.search')).clear().sendKeys(Billonly_sku + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.css("tr[ng-if='items.length'] > td:nth-of-type(3)")).getText().then(function (text) {
        expect(text).toEqual(Billonly_sku + randNumber);
      });
    });
  });

  it('verify that user is able to search item with alias', function () {
    element(by.model('searchParams.search')).clear().sendKeys(Billonly_alias + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        expect(text).toEqual(Billonly_sku + randNumber);
      });
    });
  });

  it('verify that user is able to search item with vendor', function () {
    element(by.xpath("//a[contains(.,'All Vendors')]")).click();
    browser.sleep(2000);
    element(by.model('search.searchKeyword')).clear().sendKeys(vendor);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.className('text-with-tooltip')).getText().then(function (text) {
        expect(text).toEqual(vendor);
      });
    });
  });

  it('Approve item after search', function () {
    element(by.model('searchParams.search')).clear().sendKeys(Billonly_item_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Approve')).click();
    browser.sleep(2000);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Approve Item'))), 5000);
    element(by.buttonText('Approve Item')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Item updated successfully.');
  });
});