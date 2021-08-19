var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Hybrent DME Module - My Claims', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Dme_sku = browser.params.itemCatalog.Dme_sku;
  var Dme_item_name = browser.params.itemCatalog.Dme_item_name;
  var Dme_Alias = browser.params.itemCatalog.Dme_Alias;
  var Dme_mfr = browser.params.itemCatalog.Dme_mfr;
  var Patient_fname = browser.params.Patients.Patient_fname;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Inventory_name = browser.params.user.Inv_name;
  it('Verify that following search filter appear on my claim listing page', function () {
    browser.sleep(2000);
    element(by.css(".sa-confirm-button-container")).element(by.css(".confirm")).click();
    expect(element(by.model('searchForm.searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.css(".btn-default")).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.statusFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.mirthFilter')).isPresent()).toBeTruthy();
  });

  it('Search and open newly created cliam for the patient',function(){
    element(by.css(".btn-default")).click();
    browser.sleep(2000);
    // element(by.model('search.search')).sendKeys('john 1600843676805');
    element(by.model('search.search')).sendKeys(Patient_fname +" " + randNumber);
    browser.wait(EC.visibilityOf(element(by.xpath("//td[.='john 1629199471436']"))), 20000);
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.xpath('(//tr[@ng-repeat="claim in claimsData.claims"]//a)[1]')).click();
    browser.wait(EC.titleIs('Manage Claim: Create Claim'), 20000);
    expect(browser.getTitle()).toEqual('Manage Claim: Create Claim');
  });

  // it('Save newly created claim', function(){
  //   browser.wait(EC.elementToBeClickable(element(by.xpath("//button[contains(.,'Save Claim')]"))), 20000);
  //   element(by.xpath("//button[contains(.,'Save Claim')]")).click();
  //   browser.sleep(2000);
  //   element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
  //   browser.sleep(3000);
  //   element(by.css(".sweet-alert")).getText().then(function(Claimstatus){
  //   expect(Claimstatus).toContain('Success?');
  //   browser.sleep(2000);
  //   })
  //   element(by.css(".confirm")).click();
  // });

  it('Verify that user is able to complete the assigned DME claim', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath('//button[contains(text(),"Complete claim")]'))), 20000);
    element(by.xpath("//button[contains(text(),'Complete claim')]")).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Claim completed successfully.'),20000);
    expect($('.toast-message').getText()).toEqual('Claim completed successfully.');
  });

});