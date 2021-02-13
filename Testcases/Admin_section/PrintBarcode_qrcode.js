describe('Print Barcodes/QRCodes', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var General_alias = browser.params.itemCatalog.General_alias;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Inventory_name = browser.params.user.Inv_name;


  it('Open Print Barcodes/QRCodes module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.linkText('Print Barcodes/QRCodes')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect(browser.getTitle()).toEqual('Print Barcodes/QRCodes');
  });

  it('verify that search and status filter appear on the page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[contains(.,'All Vendors')]")).isPresent()).toBeTruthy();
    expect(element(by.css("span[ng-if='!$ctrl.multiSelect']")).isPresent()).toBeTruthy();
  });

  it('verify the user user default inventory should appear selected in inventory drop down', function () {
    element(by.css("span[ng-if='!$ctrl.multiSelect']")).click();
    browser.sleep(2000);
    element(by.model('$ctrl.search.search')).sendKeys(browser.params.user.Inv_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    var default_inv_selected = element(by.buttonText('Selected'));
    default_inv_selected.isPresent().then(function (present) {
      if (present) {
        element(by.buttonText('Close')).click();
      } else {
        element(by.buttonText('Select')).click();
      }
    })
    browser.sleep(2000);
    // expect(element(by.xpath("//table[@id='print-barcode-table']//tr[1]/td[.='+(browser.params.user.Inv_name)+']")).isPresent()).toBeTruthy();
  });

  it('search item by description', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_item_Name + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('vendor in ::item.itemVendors')).each(function (element1, index) {
      element1.element(by.binding('vendor.sku')).getText().then(function (text) {
        browser.sleep(2000);
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });
  it('search item by alias', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_alias + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('vendor in ::item.itemVendors')).each(function (element1, index) {
      element1.element(by.binding('vendor.sku')).getText().then(function (text) {
        browser.sleep(2000);
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  it('search item by sku', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('vendor in ::item.itemVendors')).each(function (element1, index) {
      element1.element(by.binding('vendor.sku')).getText().then(function (text) {
        browser.sleep(2000);
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  it('verify that all option to print item are availbale under print code button', function () {
    browser.sleep(2000);
    element(by.className('btn btn-default no-margin')).click();
    browser.sleep(2000);
    expect(element(by.model('printType.printType')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.barCodeType')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.vendor')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.uom')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.price')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.min')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.max')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.parlevel')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.mfr_number')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.quick_code')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.cross_walk_id')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.categories')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.inventory_path')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.averyTemplate')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printPages')).isPresent()).toBeTruthy();

  });


});