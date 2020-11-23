describe('Practice Type', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var AR_desc = browser.params.AR_Code.Description;
  var ARC = browser.params.AR_Code.Code;
  var randomnumber = browser.params.Vendor_price_tier.randompricetier;


  it('Open Practice Type module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.xpath("//a[.='Practice Type']")).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect(browser.getTitle()).toEqual('Practice Type');
  });

  it('verify that search by care type filter and status drop appear on the page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchActive')).isPresent()).toBeTruthy();
  });

  it('add new Practice Type', function () {
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.model('practiceTypeData.name')).sendKeys('Practice' + randNumber);
    browser.sleep(2000);
    element(by.model('practiceTypeData.description')).sendKeys('Practicedesc' + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Practice type created successfully.');
  });

  it('search newly created Practice Type', function () {
    browser.sleep(2000);
    element(by.model('searchFilter')).clear().sendKeys('Practice' + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('Data in practiceTypeData')).getText()).toContain('Practice' + randNumber);

  });

  it('update newly created Practice Type', function () {
    element(by.buttonText('Edit')).click();
    browser.sleep(1000);
    element(by.className('bootstrap-switch-handle-on bootstrap-switch-primary')).click();
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Practice type updated successfully');
  });

  it('delete newly created Practice Type', function () {
    browser.sleep(1000);
    element(by.buttonText('Delete')).click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual("Practice type deleted successfully.");
  });

});