var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Request service module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Service_item_name = browser.params.itemCatalog.Service_item_name;
  var Service_alias = browser.params.itemCatalog.Service_alias;
  var Service_mfrNumber = browser.params.itemCatalog.Service_mfrNumber;
  var Service_sku = browser.params.itemCatalog.Service_sku;
  var vendor = browser.params.itemCatalog.vendor;

  it('Navigate to Request service module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"Request Service")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Request Service")]')).click();
    });
    browser.wait(EC.titleIs('Create Service PO'), 50000);
    expect(browser.getTitle()).toEqual('Create Service PO');
  });

  it('verify that all search filter should appear on request service module', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('servicePOParams.department')).isPresent()).toBeTruthy();
    expect(element(by.model('$ctrl.selectedDate')).isPresent()).toBeTruthy();

  });

  it('Verify thet user should able to select specific vendor on service po cart', function(){
    browser.wait(EC.elementToBeClickable(element(by.css("hyb-select"))),20000);
    element(by.css("hyb-select")).click();
    browser.wait(EC.presenceOf(element(by.model('search.searchKeyword'))),20000);
    element(by.model('search.searchKeyword')).sendKeys(vendor);
    browser.sleep(2000);
    var default_vendor_selected = element(by.buttonText('Selected'));
    default_vendor_selected.isPresent().then(function (present) {
      if (present) {
        element(by.buttonText('Close')).click();
      } else {
        element(by.buttonText('Select')).click();
      }
    })
    browser.sleep(2000);
    element(by.css("[select-list='vendors'] > [ng-click='selectItem();']")).getText().then(function(vendorname){
      expect(vendorname).toBe(vendor);
    })

  });

  it('verify that item search with sku should work on service po cart', function(){
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    element(by.model('searchParams.search')).sendKeys(Service_sku + randNumber);
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      expect(element1.element(by.cssContainingText('hyb-highlight > span.highlight-context', Service_item_name + randNumber)).isPresent()).toBeTruthy();
    });
  });

  it('verify that item search with mfr should work on service po cart', function(){
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    element(by.model('searchParams.search')).clear().sendKeys(Service_mfrNumber + randNumber);
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      expect(element1.element(by.cssContainingText('hyb-highlight > span.highlight-context', Service_item_name + randNumber)).isPresent()).toBeTruthy();
    });
  });

  it('verify that item search with alias should work on service po cart', function(){
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    element(by.model('searchParams.search')).clear().sendKeys(Service_alias + randNumber);
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      expect(element1.element(by.cssContainingText('hyb-highlight > span.highlight-context', Service_item_name + randNumber)).isPresent()).toBeTruthy();
    });
  });
 
  it('verify that item search with name should work on service po cart', function(){
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    element(by.model('searchParams.search')).clear().sendKeys(Service_item_name + randNumber);
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      expect(element1.element(by.cssContainingText('hyb-highlight > span.highlight-context', Service_item_name + randNumber)).isPresent()).toBeTruthy();
    });
  });

  it('Add existing service item in service po cart', function(){
    browser.wait(EC.elementToBeClickable(element(by.id("btnAdd"))),20000);
    element(by.id("btnAdd")).click();
    browser.sleep(1000);
    element(by.xpath("//tr[@class='cart-item-box']")).getText().then(function(iteminfo){
      expect(iteminfo).toContain(Service_item_name+randNumber);
    })
  })

  it('Verify that all option should appear under the drop down on service po cart', function(){
    element(by.xpath("//button[@class='btn btn-default dropdown-toggle no-margin']")).click();
    expect(element(by.xpath("//a[.='Add New Service']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[.='Print Items']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[contains(.,'Clear Current Items')]")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[.='Clear All Items']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[.='Refresh']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to add new service item on service po cart', function(){
    element(by.xpath("//a[.='Add New Service']")).click();
    element(by.model('itemDetail.itemVendor.item.description')).sendKeys('newservice'+randNumber);
    element(by.model('itemDetail.itemVendor.sku')).sendKeys('servicesku'+randNumber);
    element(by.model('itemDetail.itemVendor.service_duration')).element(by.css("[label='For Day']")).click();
    element(by.model('itemDetail.facilityItemVendor.purchase_price')).sendKeys('19.12');
    browser.wait(EC.elementToBeClickable(element(by.css("[ng-click='AddItem()']"))),20000);
    element(by.css("[ng-click='AddItem()']")).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Service item added successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Service item added successfully.');
  });

  it('Generate service PO', async function(){
    browser.wait(EC.elementToBeClickable(element(by.css("[ng-model='servicePOParams.vendorParams[key].is_use_my_po_num']"))), 20000);
    element(by.css("[ng-model='servicePOParams.vendorParams[key].is_use_my_po_num']")).click();
    element(by.model('servicePOParams.vendorParams[key].manual_po_num')).sendKeys('service'+randNumber);
    browser.wait(EC.elementToBeClickable(element(by.id("btnAdd"))),20000);
    element(by.id("btnAdd")).click();
    browser.sleep(1000);
    browser.wait(EC.elementToBeClickable(element(by.css("[ng-click='generatePO()']"))), 20000);
    element(by.css("[ng-click='generatePO()']")).click();
    browser.sleep(1000);
    browser.wait(EC.elementToBeClickable(element(by.css('.sa-button-container')).element(by.buttonText('Yes'))), 5000);
    await element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    var budget = element(by.css('.sa-button-container'));
    budget.isPresent().then(function (present) {
      if (present) {
        console.log('Budget is present for corresponding facility');
        element(by.buttonText('Yes')).click();
      } else {
        console.log('Budget is not present for corresponding facility');
      }
    })
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'PO(' + 'service' + randNumber + ') created successfully.'), 20000);
    expect($('.toast-message').getText()).toContain('PO(' + 'service' + randNumber + ') created successfully.');
    browser.sleep(3000);
  });

});