describe('Hybrent Scan IN Module', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.templateName;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var Dme_sku = browser.params.itemCatalog.Dme_sku;
  var Dme_item_name = browser.params.itemCatalog.Dme_item_name;
  var Dme_Alias = browser.params.itemCatalog.Dme_Alias;
  var Dme_mfr = browser.params.itemCatalog.Dme_mfr;
  var Consignment = browser.params.itemCatalog.Consignment;
  var Con_sku = browser.params.itemCatalog.Con_sku;
  var randomnmbr = browser.params.Vendor_price_tier.randompricetier;
  var fac_name = browser.params.user.fac_name;
  var Inventory_name = browser.params.user.Inv_name;

  beforeEach(function () {
    browser.waitForAngularEnabled(false);
  })

  it('Open scan in module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.css('a > span.menu-icon > i.fa-sign-in')).getWebElement()).then(function () {
      element((by.linkText('Scan In'))).click();
    });
    var scanIn = element.all(by.className('menu-li')).first();
    browser.actions().mouseMove(scanIn).perform();
    browser.sleep(2000);
    scanIn.click();
    browser.sleep(5000);
    expect(browser.getTitle()).toEqual('Scan In');

  });
  it('List page should display Scan In filters and refresh button', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('search.search')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();

  });

  it('Scan In - Search items by item Name, sku, mfr', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_item_Name + randNumber);
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      expect(element1.element(by.cssContainingText('hyb-highlight > span.highlight-context', General_item_Name + randNumber)).isPresent()).toBeTruthy();
    });
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        expect(text).toEqual(General_sku + randNumber);
      });
    });

    element(by.model('searchParams.search')).clear().sendKeys(General_mfrNumber + randNumber);
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  it('Scan In - Add general items for scan In by click on scan In button', function () {
    browser.sleep(1000);
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(2000);
    var itemRow = element(by.repeater('item in items').row(0));
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.xpath('//i[@class="fa fa-plus-circle font-22"]')).click();
    browser.sleep(1000);
    element(by.xpath('//i[@class="fa fa-plus-circle font-22"]')).click();
    browser.sleep(1000);
    element(by.xpath('//i[@class="fa fa-plus-circle font-22"]')).click();
    browser.sleep(1000);
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('4');
    browser.sleep(1000);
    element(by.xpath('//i[@class="fa fa-minus-circle font-22"]')).click();
    browser.sleep(2000);
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('3');
    browser.sleep(2000);
    element(by.xpath('//span[contains(text(),"Select Inventory")]')).click();
    browser.sleep(2000);
    element(by.model('$ctrl.search.search')).clear().sendKeys(browser.params.user.Inv_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    //element(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).click();
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.model('search.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in ScanInData.rows')).each(function (element1, index) {
      element1.element(by.css("hyb-highlight")).getText().then(function (text) {
        expect(text).toEqual(General_item_Name + randNumber);
      });
    });

  });

  it('Scan In - Add DME items for scan In by click on scan In button', function () {
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear().sendKeys(Dme_sku + randNumber);
    browser.sleep(2000);
    var itemRow = element(by.repeater('item in items').row(0));
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.xpath('//i[@class="fa fa-plus-circle font-22"]')).click();
    browser.sleep(2000);
    element(by.xpath('//i[@class="fa fa-plus-circle font-22"]')).click();
    browser.sleep(1000);
    element(by.xpath('//i[@class="fa fa-plus-circle font-22"]')).click();
    browser.sleep(1000);
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('4');
    browser.sleep(2000);
    element(by.xpath('//i[@class="fa fa-minus-circle font-22"]')).click();
    browser.sleep(2000);
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('3');
    browser.sleep(2000);
    element(by.xpath('//span[contains(text(),"Select Inventory")]')).click();
    browser.sleep(2000);
    element(by.model('$ctrl.search.search')).clear().sendKeys(browser.params.user.Inv_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(1000);
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.model('search.search')).clear().sendKeys(Dme_sku + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in ScanInData.rows')).each(function (element1, index) {
      element1.element(by.css("hyb-highlight")).getText().then(function (text) {
        expect(text).toEqual(Dme_item_name + randNumber);
      });
    });

  });

  it('add consignment item in scanin', function () {
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear().sendKeys(Con_sku + randNumber);
    browser.sleep(2000);
    var itemRow = element(by.repeater('item in items').row(0));
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.xpath('//i[@class="fa fa-plus-circle font-22"]')).click();
    browser.sleep(2000);
    element(by.xpath('//i[@class="fa fa-plus-circle font-22"]')).click();
    browser.sleep(1000);
    element(by.xpath('//i[@class="fa fa-plus-circle font-22"]')).click();
    browser.sleep(1000);
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('4');
    browser.sleep(2000);
    element(by.xpath('//i[@class="fa fa-minus-circle font-22"]')).click();
    browser.sleep(2000);
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('3');
    browser.sleep(2000);
    element(by.xpath('//span[contains(text(),"Select Inventory")]')).click();
    browser.sleep(2000);
    element(by.model('$ctrl.search.search')).clear().sendKeys(browser.params.user.Inv_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(1000);
    //element(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).click();
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.model('search.search')).clear().sendKeys(Con_sku + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element.all(by.repeater('item in ScanInData.rows')).each(function (element1, index) {
      element1.element(by.css("hyb-highlight")).getText().then(function (text) {
        expect(text).toEqual(Consignment + randNumber);
      });
    });
  })

  it('Scan In - Search general item added for scan in by item Name, sku, mfr', function () {
    element(by.model('search.search')).clear().sendKeys(General_item_Name + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      expect(element1.element(by.cssContainingText('hyb-highlight > span.highlight-context', General_item_Name + randNumber)).isPresent()).toBeTruthy();
    });
    element(by.model('search.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  it('Scan In - Search consignement item added for scan in by item Name, sku, mfr', function () {
    element(by.model('search.search')).clear().sendKeys(Consignment + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      expect(element1.element(by.cssContainingText('hyb-highlight > span.highlight-context', Consignment + randNumber)).isPresent()).toBeTruthy();
    });
    element(by.model('search.search')).clear().sendKeys(Con_sku + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        expect(text).toEqual(Con_sku + randNumber);
      });
    });
  });

  it('add stock status for vendor stock item', function () {
    element(by.model('search.search')).clear().sendKeys(Con_sku + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    var addstock = element(by.partialLinkText('Add'));
    addstock.click();
    browser.sleep(2000);
    element(by.xpath("//button[@class='btn btn-primary pull-left']")).click();
    browser.sleep(2000);
    element(by.model('stockDetail.lot_number')).sendKeys('stock' + randNumber);
    browser.sleep(1000);
    element(by.css("button[ng-click='applyToAll()']")).click();
    browser.sleep(2000);
    element(by.buttonText('Yes')).click();
    browser.sleep(2000);
        // element(by.model('stockDetail.lot_number')).sendKeys('lot' + randomnmbr);
    element(by.model('stockDetail.serial_number')).sendKeys('serial' + randomnmbr);
    browser.sleep(1000);
    var secondlot = element.all(by.model('stockDetail.serial_number')).get(1);
    secondlot.sendKeys('serial' + randomnmbr);
    browser.sleep(1000);
    var thirdlot = element.all(by.model('stockDetail.serial_number')).get(2);
    thirdlot.sendKeys('serial' + randomnmbr);
    browser.sleep(1000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Items stock info added successfully.');

  });

  it("Scan In items - Complete scan In and item should display on inventory transaction page", function () {
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Search'))), 5000);
    browser.sleep(2000);
    element(by.model('search.search')).clear();
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Complete')).click();
    browser.sleep(2000);
    element(by.buttonText('Complete')).click();
    browser.sleep(2000);
    element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    element(by.buttonText('Add To Inventory')).click();
    browser.sleep(2000);
    var inventory_maximum = element(by.css('.sa-button-container'));
    inventory_maximum.isPresent().then(function (present) {
      if (present) {
        console.log('Yes still wants to complete Scan In?');
        browser.sleep(1000);
        element(by.buttonText('Yes')).click();
      } else {
        console.log('Do you still wants to complete Scan In? not appear');
      }
    });
    browser.sleep(1000);
    // var toast_message = $('.toast-message').getText();
    // expect(EC.textToBePresentInElement(toast_message, "Item successfully mapped with inventory.")).toBe(true);
    expect($('.toast-message').getText()).toBe('Item successfully mapped with inventory.');
    browser.sleep(1000);
    var toastnew = element.all($('.toast-message')).get(1);
    expect(toastnew.getText()).toBe('Scan in completed successfully.');
    // expect($('.toast-message').getText()).toBe('Scan in completed successfully.');
    browser.sleep(2000);
  });

});