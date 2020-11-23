var _ = require('lodash');
describe('Hybrent Manage Inventory Module', function () {
  var EC = protractor.ExpectedConditions;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_alias = browser.params.itemCatalog.General_alias;
  var General_sku = browser.params.itemCatalog.General_sku;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var vendor = browser.params.itemCatalog.vendor;
  var Generalcategory = browser.params.itemCatalog.Generalcategory;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Con_sku = browser.params.itemCatalog.Con_sku;
  var Consignment = browser.params.itemCatalog.Consignment;


  it('Manage Inventory page should open', function () {
    browser.actions().mouseMove(element(by.xpath('//span[contains(text(),"Manage Inventory")]'))).perform();
    browser.sleep(2000);
    element(by.linkText('Manage Inventory')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Manage Inventory : List');
  });

  it('List page should display list of items and manage inventory filters', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.show_vendor_stock')).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[contains(.,'All Vendors')]")).isPresent()).toBeTruthy();
  });

  xit('Search items by Name', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_item_Name + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('vendor.sku')).getText().then(function (text) {
        browser.sleep(2000);
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  xit('Search items by alise', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_alias + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('vendor.sku')).getText().then(function (text) {
        browser.sleep(2000);
        expect(text).toEqual(General_sku + randNumber);
      });
    });

  });

  xit('Search items by mfr number', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_mfrNumber + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('vendor.sku')).getText().then(function (text) {
        browser.sleep(2000);
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  it('Search items by sku', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('vendor in ::item.itemVendors')).each(function (element1, index) {
      element1.element(by.binding('vendor.sku')).getText().then(function (text) {
        browser.sleep(2000);
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  it('Vendor filter should display items for selected vendor only.', function () {
    element(by.model('searchParams.search')).clear();
    browser.sleep(2000);
    element(by.xpath("//a[contains(.,'All Vendors')]")).click();
    browser.sleep(2000);
    element(by.model('search.searchKeyword')).sendKeys(vendor);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element.all(by.repeater('vendor in ::item.itemVendors')).each(function (element1, index) {
      element1.element(by.css('vendor-info > span.text-with-tooltip')).getText().then(function (text) {
        expect(text).toEqual(vendor);
      });
    });
  });

  xit('create a replenish support inventory', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    browser.sleep(2000);
    browser.actions().mouseMove(element(by.css('li[ng-repeat="facility in facilities"] > .tree-node'))).perform();
    var create_inventoy = element(by.css('li[ng-repeat="facility in facilities"] > .tree-node > .btn-group'));
    create_inventoy.click();
    browser.sleep(2000);
    element(by.xpath("//div[@class='btn-group pull-right inventory-action-btn open']//a[.='Add Inventory']")).click();
    browser.sleep(2000);
    element(by.model('inventoryFormData.name')).clear().sendKeys('replenish' + randNumber);
    browser.sleep(2000);
    element(by.model('inventoryFormData.mnemonic')).clear().sendKeys('mne' + randNumber);
    browser.sleep(2000);
    element(by.model('inventoryFormData.inventory_type_id')).click();
    browser.sleep(2000);
    element(by.css("option[value='1']")).click();
    browser.sleep(2000);
    element(by.css("div.bootstrap-switch-off .bootstrap-switch-handle-off")).click();
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toContain('Inventory added successfully.');
  });

  it('create a test inventory', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    browser.sleep(2000);
    browser.actions().mouseMove(element(by.css('li[ng-repeat="facility in facilities"] > .tree-node'))).perform();
    var create_inventoy = element(by.css('li[ng-repeat="facility in facilities"] > .tree-node > .btn-group'));
    create_inventoy.click();
    browser.sleep(2000);
    element(by.xpath("//div[@class='btn-group pull-right inventory-action-btn open']//a[.='Add Inventory']")).click();
    browser.sleep(2000);
    element(by.model('inventoryFormData.name')).clear().sendKeys('testInventory' + randNumber);
    browser.sleep(2000);
    element(by.model('inventoryFormData.mnemonic')).clear().sendKeys('testmne' + randNumber);
    browser.sleep(2000);
    element(by.model('inventoryFormData.inventory_type_id')).click();
    browser.sleep(2000);
    element(by.css("option[value='1']")).click();
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toContain('Inventory added successfully.');
  });


  it('Transfer Item without track stock transfer', function () {
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.css("table.table tr:nth-of-type(1) .pull-right .fa")).click();
    browser.sleep(2000);
    element(by.linkText('Transfer')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('No')).click();
    browser.sleep(2000);
    element(by.xpath("//hyb-tree-select[1]//span[1]/span[contains(.,'Select Inventory')]")).click();
    browser.sleep(2000);
    element(by.model('$ctrl.search.search')).clear().sendKeys('testInventory' + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element(by.model('transferInventory.transferQuantity')).clear().sendKeys(1);
    browser.sleep(2000);
    element(by.buttonText('Transfer')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect($('.toast-message').getText()).toContain('Inventory transferred successfully.');
    browser.sleep(2000);
  });

  it('Transfer Item with track stock transfer', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.css("table.table tr:nth-of-type(1) .pull-right .fa")).click();
    browser.sleep(2000);
    element(by.linkText('Transfer')).click();
    browser.sleep(1000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    element(by.className("headtext")).getText().then(function (popup1) {
      expect(popup1).toBe('Inventory Transfer Note');
    })
    browser.sleep(1000);
    element(by.model('item.transferQuantity')).sendKeys('1');
    browser.sleep(2000);
    element(by.buttonText('Create')).click();
    // element(by.xpath('//span[contains(text(),"Select Inventory")]')).click();
    // element(by.buttonText('Select')).click();
    // browser.sleep(2000);
    // element(by.model('transferInventory.transferQuantity')).sendKeys('1');
    // element(by.buttonText('Transfer')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect($('.toast-message').getText()).toContain('Stock transfer request created');
    browser.sleep(4000);
    

  });

  it('Verify that consignment items appear under the vendor stock', function () {
    //click on vendor stock checkbox
    browser.sleep(3000);
    element(by.model('searchParams.show_vendor_stock')).click();
    browser.sleep(2000);
    element(by.id("btnAdd")).click();
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear().sendKeys(Con_sku + randNumber);
    browser.sleep(2000);
    element(by.id("btnAdd")).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect(element.all(by.repeater('item in items'))).toContain(Consignment + randNumber);

  });

});