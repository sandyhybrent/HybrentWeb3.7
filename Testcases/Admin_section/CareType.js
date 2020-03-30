describe('Care type', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var AR_desc = browser.params.AR_Code.Description;
  var ARC = browser.params.AR_Code.Code;
  var randomnumber = browser.params.Vendor_price_tier.randompricetier;


  it('Open Care type module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.linkText('Care Type')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect(browser.getTitle()).toEqual('Care Type');
  });

  it('verify that search by care type filter and status drop appear on the page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchActive')).isPresent()).toBeTruthy();
  });

  it('add new care type', function () {
    element(by.buttonText('Add')).click();
    element(by.model('careTypeData.type')).sendKeys('care' + randNumber);
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Care type created successfully.');
  });

  it('search newly created care type', function () {
    browser.sleep(2000);
    element(by.model('searchFilter')).clear().sendKeys('care' + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('Data in careTypeData')).getText()).toContain('Care' + randNumber);

  });

  it('update newly created care type', function () {
    element(by.buttonText('Edit')).click();
    browser.sleep(1000);
    element(by.className('bootstrap-switch-handle-on bootstrap-switch-primary')).click();
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Care type updated successfully');
  });

  it('delete newly created care type', function () {
    browser.sleep(1000);
    element(by.buttonText('Delete')).click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual("Care type deleted successfully.");
  });

});