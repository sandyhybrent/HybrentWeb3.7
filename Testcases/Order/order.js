describe('Hybrent Order Module', function () {
  var EC = protractor.ExpectedConditions;
  var PO_Num = browser.params.itemCatalog.PO_Number;
  var randNumber = browser.params.itemCatalog.randNumber;
  it('Open order module', function () {
    element(by.linkText('Orders')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('My Orders');

  });
  it('List page should display list of filters', function () {
    browser.sleep(2000);
    expect(element(by.model('searchForm.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.statusFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.typeFilter')).isPresent()).toBeTruthy();
    expect(element(by.xpath("//div[@class='panel-body padding-10']//div[9]//a[contains(.,'All')]")).isPresent()).toBeTruthy();
    expect(element(by.css(".icon-disabled")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//div[@class='panel-body padding-10']//div[12]//a[contains(.,'All')]")).isPresent()).toBeTruthy();
  });

  it('Order list page search with PO# Found', function () {
    element(by.model('searchForm.statusFilter')).click();
    browser.sleep(2000);
    element(by.model('searchForm.search')).sendKeys(PO_Num + randNumber);
    browser.sleep(2000);
    element(by.repeater('status in $select.items')).click();
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(5000);
    expect(element(by.linkText(PO_Num + randNumber)).isPresent()).toBeTruthy();

  });

  it('open order detail page', function () {
    element(by.linkText(PO_Num + randNumber)).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Purchase Order');
  });

  it('update item price on order detail page', function () {
    browser.sleep(2000);
    browser.executeScript("arguments[0].scrollIntoView();", element(by.className('a-link')).getWebElement()).then(function () {
      element(by.className('a-link')).click();
    });
    browser.sleep(2000);
    element(by.model('itemForm.price')).clear().sendKeys('12');
    element(by.buttonText('Update Price')).click();
    browser.executeScript("arguments[0].scrollIntoView(0,0);", element(by.className('pagehead')).getWebElement()).then(function () {
      browser.sleep(2000);
      element(by.buttonText('Save')).click();
    })
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Order successfully updated.');
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('My Orders');
  });

  it('verify that all option edit item, Price change history, Purchase History and Stock info should appear in item drop-down', function () {
    browser.sleep(2000);
    element(by.linkText(PO_Num + randNumber)).click();
    browser.sleep(2000);
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath("//span[@class='fa fa-chevron-down']")).getWebElement()).then(function () {
      element(by.xpath("//span[@class='fa fa-chevron-down']")).click();
    });
    browser.sleep(2000);
    expect(element(by.partialLinkText('Edit')).isPresent()).toBeTruthy();
    expect(element(by.partialLinkText('Price Change History')).isPresent()).toBeTruthy();
    expect(element(by.partialLinkText('Purchase History')).isPresent()).toBeTruthy();
    expect(element(by.partialLinkText('Stock Info')).isPresent()).toBeTruthy();
  });

  it('update item gpo contract price by clicking edit button', function () {
    browser.sleep(2000);
    element(by.partialLinkText('Edit')).click();
    browser.sleep(2000);
    element(by.linkText('Vendors')).click();
    browser.sleep(2000);
    element(by.model('v.facilityItemVendors.gpo_contract_price')).clear().sendKeys('0.11');
    browser.sleep(1000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Item successfully updated.');

  });

  it('verify that all option appears in Order drop down', function () {
    browser.sleep(1000);
    element(by.css(".toast-close-button")).click();
    browser.sleep(2000);
    browser.executeScript("arguments[0].scrollIntoView(0,0);", element(by.className('pagehead')).getWebElement()).then(function () {
      browser.sleep(2000);
      browser.executeScript('window.scrollTo(0,0);').then(function () {
        console.log('++++++SCROLLED UP+++++');
        browser.sleep(2000);
      });
    });
    // let order = element(by.repeater('order in ordersData.purchaseOrders'));
    // browser.wait(EC.elementToBeClickable(order.element(by.css('.dropdown-toggle'))), 5000);
    // order.element(by.css('.dropdown-toggle')).click();
    // browser.actions().mouseMove(order.element(by.css('li.po-print'))).perform();
    // browser.wait(EC.elementToBeClickable(order.element(by.css('li.po-print'))), 5000);
    browser.wait(EC.elementToBeClickable($('div.btn-group > .dropdown-toggle')), 5000);
    $('div.btn-group > button.dropdown-toggle').click();
    browser.sleep(2000);
    expect(element(by.linkText('Add Items to Cart')).isPresent()).toBe(true);
    expect(element(by.partialLinkText('Print PO')).isPresent()).toBe(true);
    expect(element(by.linkText('Download PO')).isPresent()).toBe(true);
    expect(element(by.linkText('Print Items')).isPresent()).toBe(true);
    expect(element(by.linkText('Invoices')).isPresent()).toBe(true);
    expect(element(by.linkText('PO Log')).isPresent()).toBe(true);
    expect(element(by.linkText('PO Approval Log')).isPresent()).toBe(true);
    expect(element(by.linkText('Notes')).isPresent()).toBe(true);
    expect(element(by.linkText('Documents')).isPresent()).toBe(true);
    expect(element(by.linkText('Mark as Non Receive Only')).isPresent()).toBe(true);
    expect(element(by.linkText('Delete PO')).isPresent()).toBe(true);
    expect(element(by.linkText('Refresh')).isPresent()).toBe(true);
  });


  it('add invoice for newly created order', function () {
    // element(by.buttonText('Close')).click();
    // browser.sleep(2000);
    // let order = element(by.repeater('order in ordersData.purchaseOrders'));
    // browser.wait(EC.elementToBeClickable(order.element(by.css('.dropdown-toggle'))), 5000);
    // order.element(by.css('.dropdown-toggle')).click();
    browser.actions().mouseMove(element(by.linkText('Invoices'))).perform();
    browser.wait(EC.elementToBeClickable(element(by.linkText('Add Invoice'))), 5000);
    browser.sleep(1000);
    element(by.linkText('Add Invoice')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Invoice Detail');
    element(by.model('vm.InvNo')).sendKeys(PO_Num + randNumber);
    element(by.model('vm.InvoicePaymentTerm')).$('[label="' + 'Other' + '"]').click();
    browser.sleep(1000);
    element(by.model('vm.SelectedItem')).click();
    browser.sleep(1000);
    element(by.xpath("//option[.='All']")).click();
    browser.sleep(2000);
    element(by.xpath("//button[contains(.,'Add Item')]")).click();
    browser.sleep(1000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Invoice saved successfully.');
    browser.sleep(1000);
    expect(browser.getTitle()).toEqual('PO Invoice');
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.xpath('//span[contains(text(),"Receive")]')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Receive PO');
  })
});