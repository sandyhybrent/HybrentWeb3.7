describe('Hybrent ReplenishBin Module', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.templateName;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randomnmbr = browser.params.Vendor_price_tier.randompricetier;
  var PO_Num = browser.params.itemCatalog.PO_Number;
  var fac_name = browser.params.user.fac_name;
  var Inventory_name = browser.params.user.Inv_name;

  beforeEach(function () {
    browser.waitForAngularEnabled(false);
  })

  it('Open ReplenishBin module', function () {
    browser.sleep(2000);
    browser.executeScript("arguments[0].scrollIntoView();", element(by.css('a > span.menu-icon > i.fa-retweet')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Replenish Bin")]')).click();
    });
    browser.wait(EC.titleIs('Replenish Bin'),20000);
    expect(browser.getTitle()).toEqual('Replenish Bin');
    browser.sleep(2000);
  });

  it('Verify that drop down and search filter appear on the page', function () {
    expect(element(by.model('replenishBinParams.department')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
  });

  it('Verfiy the user is able to select inventory from the inventory drop down to generate a Replenish Bin PO', function () {
    browser.wait(EC.elementToBeClickable(element(by.css("hyb-select.form-control > [ng-click='selectItem();']"))), 20000);
    element(by.css("hyb-select.form-control > [ng-click='selectItem();']")).click();
    browser.sleep(2000);
    element(by.model('search.searchKeyword')).clear().sendKeys(browser.params.user.Inv_name);
    browser.sleep(2000);
    var default_inv_selected = element(by.buttonText('Selected'));
    default_inv_selected.isPresent().then(function (present) {
      if (present) {
        element(by.buttonText('Close')).click();
      } else {
        element(by.buttonText('Select')).click();
      }
    })
    browser.sleep(2000);
    element(by.css("hyb-select.form-control > [ng-click='selectItem();']")).getText().then(function (defaultinventory) {
      expect(defaultinventory).toMatch(browser.params.user.Inv_name);
    })

  });

  it('Add item to ReplenishBin cart by search filter', function () {
    element(by.model('searchParams.search')).sendKeys(General_sku + randNumber);
    var itemRow = element.all(by.repeater('suggestion in $ctrl.suggestions'));
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Add'))), 20000);
    element(by.buttonText('Add')).click();
  });

  it('Generate Replenish Bin PO', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath('//button[@class="button button-sm"]'))), 20000);
    element(by.xpath('//button[@class="button button-sm"]')).click();
    browser.wait(EC.elementToBeClickable(element(by.model('replenishBinParams.vendorParams[key].is_receive_only'))), 20000);
    element(by.model('replenishBinParams.vendorParams[key].is_receive_only')).click();
    browser.sleep(2000);
    element(by.model('replenishBinParams.vendorParams[key].is_use_my_po_num')).click();
    browser.sleep(2000);
    element(by.model('replenishBinParams.vendorParams[key].manual_po_num')).sendKeys('RP' + randomnmbr);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Replenish'))), 20000);
    element(by.buttonText('Replenish')).click();
    browser.sleep(2000);
    element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    var budget = element(by.css('.sa-button-container'));
    budget.isPresent().then(function (present) {
      if (present) {
        console.log('Budget is present for corresponding facility');
        element(by.buttonText('Yes')).click();
      } else {
        console.log('Budget is not present for corresponding facility');
      }

    });
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'PO(' + 'RP' + randomnmbr + ') created successfully.'),5000);
    browser.sleep(1000);
    expect($('.toast-message').getText()).toContain('PO(' + 'RP' + randomnmbr + ') created successfully.');
  });

});