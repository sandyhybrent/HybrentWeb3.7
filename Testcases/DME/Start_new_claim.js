var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Hybrent DME Module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Dme_sku = browser.params.itemCatalog.Dme_sku;
  var Dme_item_name = browser.params.itemCatalog.Dme_item_name;
  var Dme_Alias = browser.params.itemCatalog.Dme_Alias;
  var Dme_mfr = browser.params.itemCatalog.Dme_mfr;
  var Patient_fname = browser.params.Patients.Patient_fname;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Inventory_name = browser.params.user.Inv_name;

  it('navigate to start new claim page', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"Start New Claim")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Start New Claim")]')).click();
    });
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    expect(browser.getTitle()).toEqual('Manage Claim: Create Claim');
  });

  it('Click on select button to select patient to generate a claim', function () {
    element(by.xpath('//a[@class="text-primary fa fa-wheelchair"]')).click();
    browser.sleep(2000);
    // element(by.model('searchParams.search')).sendKeys('john 1612946816419');
    element(by.model('searchParams.search')).sendKeys(Patient_fname +" "+ randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(3000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    var toast_message = $('.toast-message').getText();
    expect(EC.textToBePresentInElement(toast_message, "Claim code created successfully")).toBeTruthy();
  });

  it('Verify that user is able add Dme item into the newly created claim', function(){
    browser.sleep(2000);
    element(by.buttonText('Add DME')).click();
    browser.sleep(2000);
    // element(by.model('itemSearchParam.search')).sendKeys('DS1609998429910');
    element(by.model('itemSearchParam.search')).sendKeys(Dme_sku+randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toMatch('Claim updated successfully');
    browser.sleep(1000);
    element(by.buttonText('Proceed')).click();
  });

  it('Verify that user get redirect to claim lising page on clicing close button',function(){
    browser.sleep(2000);
    browser.executeScript("arguments[0].scrollIntoView(0,0);", element(by.className('pagehead')).getWebElement()).then(function () {
      browser.sleep(2000);
      element(by.xpath("//button[contains(text(),'Close')]")).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('All Claims');
    });
  });

});