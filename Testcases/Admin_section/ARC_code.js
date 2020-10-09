describe('Account Receivable Code', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var AR_desc = browser.params.AR_Code.Description;
  var ARC = browser.params.AR_Code.Code;
  var randomnumber = browser.params.Vendor_price_tier.randompricetier;


  it('Open Account Receivable Code module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.linkText('Account Receivable Code')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect(browser.getTitle()).toEqual('Ar Code');
  });

  it('verify that search filter with facility list and search button appear on the Account Receivable Code page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchActive')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
  });

  it('add new Account Receivable Code', function () {
    browser.sleep(2000);
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.model('ARCodeData.description')).sendKeys(AR_desc);
    browser.sleep(2000);
    element(by.model('ARCodeData.code')).sendKeys(ARC + randomnumber);
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Code created successfully.');

  });

  it('search newly created Account Receivable Code by given name and code', function () {
    element(by.model('searchFilter')).clear().sendKeys(AR_desc);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('ARCodeData in arCodesData')).getText()).toContain(AR_desc);
    browser.sleep(2000);
    //search AR code by code number
    element(by.model('searchFilter')).clear().sendKeys(ARC + randomnumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('ARCodeData in arCodesData')).getText()).toContain(AR_desc);
  });

  it('delete newly created Account Receivable Code', function () {
    element(by.buttonText('Delete')).click();
    browser.sleep(2000);
    element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual("Code deleted successfully.");

  });




});