describe('Hybrent Manage Inventory Module', function () {
  var EC = protractor.ExpectedConditions;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_alias = browser.params.itemCatalog.General_alias;
  var General_sku = browser.params.itemCatalog.General_sku;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var vendor = browser.params.itemCatalog.vendor;
  var Generalcategory = browser.params.itemCatalog.Generalcategory;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Manage Inventory page should open', function () {
    browser.actions().mouseMove(element(by.xpath('//span[contains(text(),"Manage Inventory")]'))).perform();
    browser.sleep(2000);
    element(by.linkText('Manage Inventory')).click();
    expect(browser.getTitle()).toEqual('Manage Inventory : List');
  });

  it('List page should display list of items and manage inventory filters', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.show_vendor_stock')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.vendor_id')).isPresent()).toBeTruthy();


  });

  xit('Search items by Name', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_item_Name + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.description')).getText().then(function (text) {
        expect(text).toEqual(General_item_Name + randNumber);
      });
    });
  });

  xit('Search items by alise', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_alias + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.description')).getText().then(function (text) {
        expect(text).toEqual(General_item_Name + randNumber);
      });
    });

  });

  xit('Search items by mfr number', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_mfrNumber + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.description')).getText().then(function (text) {
        browser.sleep(2000);
        expect(text).toEqual(General_item_Name + randNumber);
      });
    });
  });

  xit('Search items by sku', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('vendor in ::item.itemVendors')).each(function (element1, index) {
      element1.element(by.binding('vendor.sku')).getText().then(function (text) {
        browser.sleep(2000);
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  xit('Vendor filter should display items for selected vendor only.', function () {
    element(by.model('searchParams.search')).clear();
    element(by.model('searchParams.vendor_id')).$('[label="' + vendor + '"]').click();
    element(by.buttonText('Search')).click();
    element.all(by.repeater('vendor in ::item.itemVendors')).each(function (element1, index) {
      element1.element(by.css('vendor-info > span.text-with-tooltip')).getText().then(function (text) {
        expect(text).toEqual(vendor);
      });
    });
  });

  it('create a replenish support inventory', function () {
    $('div.btn-group').click();
    element(by.xpath('//div[@class="btn-group pull-right inventory-action-btn open"]//a[contains(text(),"Add Inventory")]')).click();
    browser.sleep(2000);
    element(by.model('inventoryFormData.name')).sendKeys('replenish' + randNumber);
    element(by.model('inventoryFormData.mnemonic')).sendKeys(randNumber);
    element(by.model('inventoryFormData.inventory_type_id')).click();
    element(by.xpath('//option[contains(text(),"BinA")]')).click();
    var Iscontainer = element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(0);
    Iscontainer.click();
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toContain('Inventory added successfully.');
  })

  it('Transfer Item without track stock transfer', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    let itemtray = element(by.repeater('item in items'));
    browser.wait(EC.elementToBeClickable(itemtray.element(by.css('.dropdown-toggle'))), 5000);
    itemtray.element(by.css('.dropdown-toggle')).click();
    element(by.linkText('Transfer')).click();
    browser.sleep(1000);
    element(by.css('.sa-button-container')).element(by.buttonText('No')).click();
    browser.sleep(2000);
    element(by.className('headtext')).getText().then(function (popup) {
      expect(popup).toBe('Transfer Inventory');
    })
    // browser.wait(EC.visibilityOf(element(by.xpath('//span[contains(text(),"Select Inventory")]'))), 5000);
    element(by.buttonText('Cancel')).click();
    browser.sleep(2000);
  });
  it('Transfer Item with track stock transfer', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    let itemtray1 = element(by.repeater('item in items'));
    browser.wait(EC.elementToBeClickable(itemtray1.element(by.css('.dropdown-toggle'))), 5000);
    itemtray1.element(by.css('.dropdown-toggle')).click();
    element(by.linkText('Transfer')).click();
    browser.sleep(1000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    element(by.className('headtext')).getText().then(function (popup1) {
      expect(popup1).toBe('Inventory Transfer Note');
    })
    element(by.buttonText('Create')).click();
    browser.sleep(1000);
    element(by.model('item.transferQuantity')).sendKeys('1');
    // element(by.xpath('//span[contains(text(),"Select Inventory")]')).click();
    // element(by.buttonText('Select')).click();
    // browser.sleep(2000);
    // element(by.model('transferInventory.transferQuantity')).sendKeys('1');
    // element(by.buttonText('Transfer')).click();
    // browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toContain('Stock transfer request created successfully.');


  });

});