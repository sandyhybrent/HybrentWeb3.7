describe('Vendors Account Setup module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var vendor_name = browser.params.shop.vendor;


  it('Open Vendors Account Setup module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.linkText('Vendors Account Setup')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Vendors Account Setup');
  });

  it('select vendor by select vendor list and verify the account number of user default facility', function () {
    browser.sleep(2000);
    element(by.xpath("//a[contains(.,'All Vendors')]")).click();
    browser.sleep(1000);
    element(by.model('search.searchKeyword')).clear().sendKeys(vendor_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.xpath("//button[@class='btn btn-primary']")).click();
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear().sendKeys(browser.params.user.fac_name);
    browser.sleep(1000);
    element(by.xpath("//button[.='Search']")).click();
    browser.sleep(2000);
    element(by.model('facility.facilityVendor.account_number')).getText().then(function (accountnmber) {
      console.log('facility account number mapped with vendor is' + accountnmber);
    })

  });

  it('verify that on clicking save button user get redirect to back page with updation toast message', function () {
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Vendors accounts updated successfully.');
  });

  it('Verify that on clicking close button user get redirect to Dashboard page', function () {
    element(by.buttonText('Close')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Dashboard');

  });

});