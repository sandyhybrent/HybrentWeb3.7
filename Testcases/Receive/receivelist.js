describe('Hybrent Receive Module', function () {
  var EC = protractor.ExpectedConditions;
  var PO_Num = browser.params.itemCatalog.PO_Number;
  var randNumber = browser.params.itemCatalog.randNumber;
  var fac_name = browser.params.user.fac_name;
  var Inventory_name = browser.params.user.Inv_name;

  it('Navigate to Receive module', function () {
    element(by.xpath('//span[contains(text(),"Receive")]')).click();
    browser.wait(EC.titleIs('Receive PO'), 50000);
    expect(browser.getTitle()).toEqual('Receive PO');
  });

  it('verify that all search filter appear on listing page', function () {
    expect(element(by.model('searchForm.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.statusFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.typeFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.typeFilter')).isPresent()).toBeTruthy();
    expect(element(by.xpath("//div[@class='panel-body padding-10']//div[9]//a[contains(.,'All')]")).isPresent()).toBeTruthy();
    expect(element(by.css(".icon-disabled")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//div[@class='panel-body padding-10']//div[12]//a[contains(.,'All')]")).isPresent()).toBeTruthy();


  });
  it('verify that po search functionality is working fine', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.model('searchForm.search')).sendKeys(PO_Num + randNumber);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Search'))), 5000);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.linkText(PO_Num + randNumber)).isPresent()).toBeTruthy();
  });

  it('verify that all option appears in order drop down on listing page', function () {
    let order = element(by.repeater('order in ordersData.purchaseOrders'));
    browser.wait(EC.elementToBeClickable(order.element(by.css('.dropdown-toggle'))), 5000);
    order.element(by.css('.dropdown-toggle')).click();
    // browser.actions().mouseMove(order.element(by.css('li.po-print'))).perform();
    // browser.wait(EC.elementToBeClickable(order.element(by.css('li.po-print'))), 5000);
    expect(element(by.linkText('Print PO')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Download PO')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Print Items')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Invoices')).isPresent()).toBeTruthy();
    expect(element(by.linkText('PO Log')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Notes')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Documents')).isPresent()).toBeTruthy();
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
  })
});