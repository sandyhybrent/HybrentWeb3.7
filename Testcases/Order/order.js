describe('Hybrent Order Module', function () {
  var EC = protractor.ExpectedConditions;
  var PO_Num = browser.params.itemCatalog.PO_Number;
  var randNumber = browser.params.itemCatalog.randNumber;
  var fac_name = browser.params.user.fac_name;
  var Inventory_name = browser.params.user.Inv_name;
  it('Open order module', function () {
    browser.wait(EC.elementToBeClickable(element(by.linkText('Orders'))),20000);
    element(by.linkText('Orders')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    browser.wait(EC.titleIs('My Orders'),20000);
    expect(browser.getTitle()).toEqual('My Orders');

  });
  it('List page should display list of filters', function () {
    browser.wait(EC.presenceOf(element(by.model('searchForm.search'))),20000);
    expect(element(by.model('searchForm.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.statusFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.typeFilter')).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-vendor-select")).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-dropdown[title='Select Project']")).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-dropdown[title='Select Department']")).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-dropdown[title='Select user']")).isPresent()).toBe(true);
  });

  it('Order list page search with PO# Found', function () {
    browser.wait(EC.elementToBeClickable(element(by.model('searchForm.statusFilter'))), 20000);
    element(by.model('searchForm.statusFilter')).click();
    browser.sleep(2000);
    element(by.model('searchForm.search')).sendKeys(PO_Num + randNumber);
    browser.wait(EC.elementToBeClickable(element(by.repeater('status in $select.items'))), 20000);
    element(by.repeater('status in $select.items')).click();
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(5000);
    expect(element(by.linkText(PO_Num + randNumber)).isPresent()).toBeTruthy();

  });

  it('open order detail page', function () {
    browser.wait(EC.elementToBeClickable(element(by.linkText(PO_Num + randNumber))), 20000);
    element(by.linkText(PO_Num + randNumber)).click();
    browser.wait(EC.titleIs('Purchase Order'),5000);
    expect(browser.getTitle()).toEqual('Purchase Order');
  });

  it('update item price on order detail page', function () {
    browser.sleep(2000);
    browser.executeScript("arguments[0].scrollIntoView();", element(by.className('a-link')).getWebElement()).then(function () {
      element(by.className('a-link')).click();
    });
    browser.sleep(2000);
    element(by.model('itemForm.price')).clear().sendKeys('12');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Update Price'))), 20000);
    element(by.buttonText('Update Price')).click();
    browser.executeScript("arguments[0].scrollIntoView(0,0);", element(by.className('pagehead')).getWebElement()).then(function () {
      browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))), 20000);
      element(by.buttonText('Save')).click();
    })
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Order successfully updated.'), 20000);
    expect($('.toast-message').getText()).toEqual('Order successfully updated.');
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('My Orders');
  });

  it('verify that all option edit item, Price change history, Purchase History and Stock info should appear in item drop-down', function () {
    browser.wait(EC.elementToBeClickable(element(by.linkText(PO_Num + randNumber))), 20000);
    element(by.linkText(PO_Num + randNumber)).click();
    browser.sleep(2000);
    browser.wait(EC.presenceOf(element(by.id("optionMenu"))), 20000);
    browser.executeScript("arguments[0].scrollIntoView();", element(by.id("optionMenu")).getWebElement()).then(function () {
      element(by.id("optionMenu")).click();
    });
    browser.sleep(2000);
    browser.wait(EC.presenceOf(element(by.partialLinkText('Edit'))), 20000);
    expect(element(by.partialLinkText('Edit')).isPresent()).toBeTruthy();
    expect(element(by.partialLinkText('Price Change History')).isPresent()).toBeTruthy();
    expect(element(by.partialLinkText('Purchase History')).isPresent()).toBeTruthy();
    browser.wait(EC.presenceOf(element(by.partialLinkText('Stock Info'))), 20000);
    expect(element(by.partialLinkText('Stock Info')).isPresent()).toBeTruthy();
  });

  it('update item gpo contract price by clicking edit button', function () {
    browser.wait(EC.elementToBeClickable(element(by.partialLinkText('Edit'))), 40000);
    element(by.partialLinkText('Edit')).click();
    browser.wait(EC.elementToBeClickable(element(by.linkText('Vendors'))), 40000);
    element(by.linkText('Vendors')).click();
    browser.sleep(2000);
    element(by.model('v.facilityItemVendors.gpo_contract_price')).clear().sendKeys('0.11');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))), 40000);
    element(by.buttonText('Save')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Item successfully updated.'), 20000);
    expect($('.toast-message').getText()).toEqual('Item successfully updated.');

  });

  it('verify that all option appears in Order drop down', function () {
    browser.sleep(1000);
    var closetoast = element(by.css(".toast-close-button"));
    closetoast.isPresent().then(function (present) {
      if (present) {
        console.log('toast notification appear on page');
        closetoast.click();
      } else {
        console.log('toast notification does not appear on page');
      }
    });
    browser.sleep(2000);
    browser.executeScript("arguments[0].scrollIntoView(0,0);", element(by.className('pagehead')).getWebElement()).then(function () {
      browser.sleep(2000);
      browser.executeScript('window.scrollTo(0,0);').then(function () {
        console.log('++++++SCROLLED UP+++++');
        browser.sleep(2000);
      });
    });
    browser.wait(EC.elementToBeClickable($('div.btn-group > .dropdown-toggle')), 5000);
    $('div.btn-group > button.dropdown-toggle').click();
    browser.sleep(2000);
    expect(element(by.linkText('Add Items to Cart')).isPresent()).toBe(true);
    expect(element(by.partialLinkText('Print PO')).isPresent()).toBe(true);
    expect(element(by.linkText('Download PO')).isPresent()).toBe(true);
    expect(element(by.linkText('Print Items')).isPresent()).toBe(true);
    expect(element(by.linkText('Invoices')).isPresent()).toBe(true);
    expect(element(by.linkText('PO Log')).isPresent()).toBe(true);
    // expect(element(by.linkText('PO Approval Log')).isPresent()).toBe(true);
    expect(element(by.linkText('Notes')).isPresent()).toBe(true);
    expect(element(by.linkText('Documents')).isPresent()).toBe(true);
    expect(element(by.linkText('Mark as Non Receive Only')).isPresent()).toBe(true);
    expect(element(by.linkText('Delete PO')).isPresent()).toBe(true);
    expect(element(by.linkText('Refresh')).isPresent()).toBe(true);
  });


  it('add invoice for newly created order', function () {
    browser.sleep(2000);
    browser.actions().mouseMove(element(by.linkText('Invoices'))).perform();
    browser.wait(EC.elementToBeClickable(element(by.linkText('Add Invoice'))), 20000);
    element(by.linkText('Add Invoice')).click();
    browser.wait(EC.titleIs('Invoice Detail'), 20000);
    expect(browser.getTitle()).toEqual('Invoice Detail');
    element(by.model('vm.InvNo')).sendKeys(PO_Num + randNumber);
    browser.wait(EC.elementToBeClickable(element(by.model('vm.InvoicePaymentTerm'))), 20000);
    element(by.model('vm.InvoicePaymentTerm')).$('[label="' + 'Other' + '"]').click();
    browser.wait(EC.elementToBeClickable(element(by.model('vm.SelectedItem'))), 20000);
    element(by.model('vm.SelectedItem')).click();
    browser.wait(EC.elementToBeClickable(element(by.xpath("//option[.='All']"))), 20000);
    element(by.xpath("//option[.='All']")).click();
    browser.wait(EC.elementToBeClickable(element(by.xpath("//button[contains(.,'Add Item')]"))), 20000);
    element(by.xpath("//button[contains(.,'Add Item')]")).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))), 20000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Invoice saved successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Invoice saved successfully.');
    browser.wait(EC.titleIs('PO Invoice'), 20000);
    expect(browser.getTitle()).toEqual('PO Invoice');
  })
});