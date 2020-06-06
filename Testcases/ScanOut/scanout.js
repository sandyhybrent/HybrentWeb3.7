describe('Hybrent Scanout Module', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.templateName;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var Patient_fname = browser.params.Patients.Patient_fname;


  it('Scan Out List page should open', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.css('a > span.menu-icon > i.fa-sign-out')).getWebElement()).then(function () {
      element(by.css('a > span.menu-icon > i.fa-sign-out')).click();
    });
    element(by.xpath('//a[contains(text(),"Scan Out")]')).click();
    // var scanout = element.all(by.className('menu-li')).first();
    // browser.actions().mouseMove(scanout).perform();
    // browser.sleep(2000);
    // scanout.click();
    // browser.sleep(5000);
    expect(browser.getTitle()).toEqual('Scan out');

  });


  it('List page should display Scan out filters and refresh button', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('search.search')).isPresent()).toBeTruthy();


  });

  it('Scan Out - Search items by item Name, sku, mfr', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_item_Name + randNumber);
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      expect(element1.element(by.cssContainingText('hyb-highlight > span.highlight-context', General_item_Name + randNumber)).isPresent()).toBeTruthy();
    });
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        expect(text).toEqual(General_sku + randNumber);
      });
    });

    element(by.model('searchParams.search')).clear().sendKeys(General_mfrNumber + randNumber);
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  it('Scan Out - Add items for scan out by click on scan Out button', function () {
    browser.sleep(1000);
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    var itemRow = element(by.repeater('item in items').row(0));
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    element(by.xpath('//i[@class="fa fa-plus-circle font-22"]')).click();
    browser.sleep(1000);
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('2');
    element(by.xpath('//i[@class="fa fa-minus-circle font-22"]')).click();
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('1');
    element(by.xpath('//a[contains(text(),"Select Inventory")]')).click();
    element(by.buttonText('Select')).click();
    browser.sleep(1000);
    element(by.buttonText('Add')).click();

  });

  it('scan Out - delete a single item added in scanout', function () {
    element(by.model('item.isSelected')).click();
    browser.sleep(1000);
    element(by.className('btn btn-primary btn-xs pull-right no-margin margin-l-8')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Items removed successfully.');
  });

  it('Scan Out - Again Add items for scan out by click on scan Out button', function () {
    browser.sleep(1000);
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    var itemRow = element(by.repeater('item in items').row(0));
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    element(by.xpath('//i[@class="fa fa-plus-circle font-22"]')).click();
    browser.sleep(1000);
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('2');
    element(by.xpath('//i[@class="fa fa-minus-circle font-22"]')).click();
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('1');
    element(by.xpath('//a[contains(text(),"Select Inventory")]')).click();
    element(by.buttonText('Select')).click();
    browser.sleep(1000);
    element(by.buttonText('Add')).click();
    element(by.model('search.search')).clear().sendKeys(General_sku + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element.all(by.repeater('item in ScanInData.rows')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        expect(text).toEqual(General_sku + randNumber);
      });
    });

  });

  it("Scan Out - List of items added for scan out", function () {
    element(by.model('search.search')).clear().sendKeys(General_sku + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('item in ScanOutData.rows')).each(function (element1, index) {
      element1.element(by.binding('htmlVal')).getText().then(function (text) {
        expect(text).toEqual(General_item_Name + randNumber);
      });
    });
  });

  xit("Scan Out items - Attach stock info", function () {
    element(by.linkText('Attach Stock Info')).click();
    browser.sleep(2000);
    element(by.buttonText('Attach')).click();
    expect($('.toast-message').getText()).toEqual('Item attached successfully.');
  });

  it("Scan Out items - Remove attached stock info", function () {
    // element(by.className('padding-top-5')).click();
    browser.sleep(1000);
    element(by.buttonText('Remove')).click();
    browser.sleep(1000);
    element(by.css('.sa-confirm-button-container')).element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Item detached successfully.');
    browser.sleep(5000);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Close'))), 15000);
    element(by.xpath('//i[@class="fa fa-2x fa-times"]')).click();
  });

  it('add amenities item in scanout', function () {
    browser.sleep(1000);
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    var itemRow = element(by.repeater('item in items').row(0));
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('1');
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    element(by.model('search.search')).clear().sendKeys(General_sku + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in ScanInData.rows')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        expect(text).toEqual(General_sku + randNumber);
      });
    });
    element(by.xpath('//a[contains(text(),"Attach Cost Center")]')).click();
    browser.sleep(1000);
    element(by.xpath('//label[contains(text(),"add patient")]')).element(by.model('item.Patient')).click();
    element(by.buttonText('Save')).click();

  });

  it('scan Out - attach Charge Center for the added item', function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath('//a[contains(text(),"Attach Charge Center to All")]'))), 15000);
    element(by.xpath('//a[contains(text(),"Attach Charge Center to All")]')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.model('patientParams.search')).clear().sendKeys(Patient_fname + " " + randNumber);
    element(by.xpath('//form[@class="form-inline ng-valid ng-dirty ng-valid-parse"]//button[@class="btn btn-primary"][contains(text(),"Search")]')).click();
    browser.sleep(2000);
    element(by.model('item.Patient')).click();
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    element(by.css('.sa-confirm-button-container')).element(by.buttonText('Yes')).click();

  });

  it("Scan out items - Complete scan Out and item should display on inventory transaction page", function () {
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Complete'))), 5000);
    element(by.buttonText('Complete')).click();
    browser.sleep(1000);
    element(by.buttonText('Complete')).click();
    expect($('.toast-message').getText()).toEqual('Scan Out completed successfully.');

  });
});