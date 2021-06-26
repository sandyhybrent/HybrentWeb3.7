describe('Hybrent Cart Module', function () {
  var EC = protractor.ExpectedConditions;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randNumber = browser.params.itemCatalog.randNumber;
  var PO_Num = browser.params.itemCatalog.PO_Number;
  var fac_name = browser.params.user.fac_name;
  var Inventory_name = browser.params.user.Inv_name;
  beforeEach(function () {
    browser.waitForAngularEnabled(false);
  })

  it('Open cart page', function () {
    browser.wait(EC.elementToBeClickable(element(by.css('.fa-shopping-cart'))), 20000);
    element(by.css('.fa-shopping-cart')).click();
    browser.wait(EC.titleIs('My Cart'), 20000);
    expect(browser.getTitle()).toEqual('My Cart');
  });

  it('add item to cart', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    element(by.model('searchParams.search')).sendKeys(General_mfrNumber + randNumber);
    browser.sleep(1000);
    // element(by.id("btnAdd")).click();
    // browser.sleep(1000);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('+'))), 20000);
    element(by.buttonText('+')).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('+'))), 20000);
    element(by.buttonText('+')).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('+'))), 20000);
    element(by.buttonText('+')).click();
    browser.wait(EC.textToBePresentInElement(element(by.css('.item-qty-editable-label')),'4'), 20000);
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('4');
  });

  it('Generate PO', function () {
    browser.wait(EC.elementToBeClickable(element(by.model('cartParams.vendorParams[key].is_receive_only'))), 20000);
    var receive_only = element(by.model('cartParams.vendorParams[key].is_receive_only'));
    receive_only.click();
    browser.wait(EC.elementToBeClickable(element(by.model('cartParams.vendorParams[key].is_use_my_po_num'))), 20000);
    element(by.model('cartParams.vendorParams[key].is_use_my_po_num')).click();
    browser.sleep(1000);
    element(by.model('cartParams.vendorParams[key].manual_po_num')).sendKeys(PO_Num + randNumber);
    browser.wait(EC.elementToBeClickable(element(by.xpath('//span[@id="btnAdd"]'))), 20000);
    element(by.xpath('//span[@id="btnAdd"]')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    var budget = element(by.css('.sa-button-container'));
    budget.isPresent().then(function (present) {
      if (present) {
        console.log('Budget is present for corresponding facility');
        browser.wait(EC.presenceOf(element(by.css('.sa-button-container')).element(by.buttonText('Yes'))), 20000);
        element(by.buttonText('Yes')).click();
        browser.wait(EC.textToBePresentInElement($('.toast-message'),'PO(' + PO_Num + randNumber + ') created successfully.'), 20000);
        expect($('.toast-message').getText()).toContain('PO(' + PO_Num + randNumber + ') created successfully.');
      } else {
        console.log('Budget is not present for corresponding facility');
        browser.wait(EC.textToBePresentInElement($('.toast-message'),'PO(' + PO_Num + randNumber + ') created successfully.'), 20000);
        expect($('.toast-message').getText()).toContain('PO(' + PO_Num + randNumber + ') created successfully.');
      }

    });
        
  });

});