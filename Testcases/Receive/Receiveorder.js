describe('Hybrent Receive order', function () {
  var EC = protractor.ExpectedConditions;
  var PO_Num = browser.params.itemCatalog.PO_Number;
  var randNumber = browser.params.itemCatalog.randNumber;
  var fac_name = browser.params.user.fac_name;
  var Inventory_name = browser.params.user.Inv_name;

  it('Open order detail page on receive module', function () {
    element(by.linkText(PO_Num + randNumber)).click();
    browser.wait(EC.titleIs('Purchase Order'), 20000);
    expect(browser.getTitle()).toEqual('Purchase Order');
  });

  it('verify that all option appear in order drop down', function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath('//button[@class="btn btn-default dropdown-toggle"]'))), 5000);
    element(by.xpath('//button[@class="btn btn-default dropdown-toggle"]')).click();
    expect(element(by.linkText('Print PO')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Download PO')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Print Items')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Invoices')).isPresent()).toBeTruthy();
    expect(element(by.linkText('PO Log')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Notes')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Documents')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Add Items to Cart')).isPresent()).toBeTruthy();

    browser.sleep(1000);
  });

  it('open order detail page to receive corresponding order', function () {
    browser.wait(EC.elementToBeClickable(element(by.linkText('Apply inventory location for all items'))), 20000);
    var selectInventory = element(by.linkText('Apply inventory location for all items'));
    selectInventory.click();
    browser.wait(EC.elementToBeClickable($('.close')), 50000);
    element(by.model('$ctrl.search.search')).clear().sendKeys(browser.params.user.Inv_name);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Search'))), 50000);
    element(by.buttonText('Search')).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 50000);
    element(by.buttonText('Select')).click();
    browser.wait(EC.elementToBeClickable(element(by.model('allCheck.itemSelectAll'))), 50000);
    element(by.model('allCheck.itemSelectAll')).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Complete'))), 50000);
    element(by.buttonText('Complete')).click();
    browser.sleep(2000);
    browser.wait(EC.elementToBeClickable(element(by.css('.sa-button-container')).element(by.xpath("//button[@class='confirm']"))), 20000);
    element(by.xpath("//button[@class='confirm']")).click();
    browser.sleep(2000);
    element(by.model('inventoryItem.min')).clear().sendKeys('2');
    element(by.model('inventoryItem.max')).clear().sendKeys('5');
    element(by.model('inventoryItem.par_level')).clear().sendKeys('3');
    element(by.buttonText('Add To Inventory')).click();
    browser.sleep(2000);
    element(by.xpath("//div[@class='modal-footer']/button[@class='btn btn-primary']")).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    element(by.xpath("//button[@class='btn btn-default pull-right']")).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Order completed successfully.');
    browser.sleep(2000);
   
  });

});