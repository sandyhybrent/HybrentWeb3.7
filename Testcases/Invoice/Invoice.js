describe('Hybrent Invoice Module', function () {
  var EC = protractor.ExpectedConditions;
  var PO_Num = browser.params.itemCatalog.PO_Number;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Navigate to Invoice module', function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath('//span[contains(text(),"Invoices")]'))), 20000);
    element(by.xpath('//span[contains(text(),"Invoices")]')).click();
    browser.wait(EC.titleIs('Manage Invoice'));
    expect(browser.getTitle()).toEqual('Manage Invoice');
    
  });

  it('verify that all search filter and drop down should appear on invoice listing page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBe(true);
    expect(element(by.css("hyb-vendor-select")).isPresent()).toBe(true);
    expect(element(by.model('searchParams.status')).isPresent()).toBe(true);
    expect(element(by.model('$select.search')).isPresent()).toBe(true);
    expect(element(by.model('searchParams.date_range')).isPresent()).toBe(true);
    expect(element(by.xpath("//hyb-dropdown[contains(.,'Select')]")).isPresent()).toBe(true);
    expect(element(by.xpath("//a[contains(.,'All Users')]")).isPresent()).toBe(true);
    expect(element(by.xpath("//a[contains(.,'All projects')]")).isPresent()).toBe(true);

  });

  it('Verify that user is able to search invoice by invoice number', function () {
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
    element(by.model('searchParams.search')).clear().sendKeys('TEST' + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('item in items track by item.id')).getText().then(function (test) {
      expect(test).toContain('TEST' + randNumber);
    });

  });

  it('Open invoice detail page', function () {
    browser.wait(EC.elementToBeClickable(element(by.linkText('TEST' + randNumber))), 20000);
    element(by.linkText('TEST' + randNumber)).click();
    browser.wait(EC.titleIs('Invoice Detail'), 20000);
    expect(browser.getTitle()).toEqual('Invoice Detail');
  });

  it('update invoice', async function () {
    browser.wait(EC.presenceOf(element(by.model('vm.InvTaxAmount'))), 20000);
    await element(by.model('vm.InvTaxAmount')).clear().sendKeys('10.00');
    await element(by.model('vm.InvFreightCharges')).clear().sendKeys('10.00');
    await element(by.model('vm.InvMiscCharges')).clear().sendKeys('10.00');
    await element(by.model('vm.InvDiscountAmount')).clear().sendKeys('10.00');
    browser.sleep(2000);
    element(by.xpath('//span[contains(@class,"pull-right")]')).getText().then(function (test) {
      expect(test).toEqual('$68.00');
    })
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))), 20000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    var YesPopUo = element(by.css('.sa-button-container')).element(by.buttonText('Yes'));
    YesPopUo.isPresent().then(function (present) {
      if (present) {
        console.log('popup appear');
        YesPopUo.click();
      } else {
        console.log('popup does not appear');
      }
    });
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Invoice saved successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Invoice saved successfully.');
  });

  it('delete newly created invoice', function () {
    browser.sleep(2000);
    element(by.xpath("//table[@class='table']//tr[1]//i[@class='glyphicon glyphicon-trash text-danger action-button']")).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Invoice deleted successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Invoice deleted successfully.');
  })

});