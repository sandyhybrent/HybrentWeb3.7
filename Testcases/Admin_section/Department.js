describe('Department', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var mnemonic = browser.params.department.mnemonic;
  var name = browser.params.department.Name;

  it('Open Department module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.linkText('Departments')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Department');
  });

  it('verify that search and facility fiter with search and add button appear on the page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.xpath('//a[contains(text(),"All Facilities")]')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
  });

  it('add new department', function () {
    browser.sleep(2000);
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.xpath('//a[contains(text(),"--Select facility--")]')).click();
    browser.sleep(2000);
    browser.wait(EC.elementToBeClickable(element(by.model('search.searchKeyword'))), 5000);
    element(by.model('search.searchKeyword')).sendKeys(browser.params.user.fac_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element(by.model('departmentData.mnemonic')).sendKeys(mnemonic + randNumber);
    browser.sleep(2000);
    element(by.model('departmentData.name')).sendKeys(name + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Department created successfully.');
  });

  it('search newly created department name by its name', function () {
    browser.sleep(2000);
    element(by.model('searchFilter')).clear().sendKeys(name + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('adminDepartmentData in adminDepartmentsDatas')).getText()).toContain(name + randNumber);
  });
  it('update the newly created department', function () {
    browser.sleep(2000);
    element(by.buttonText('Edit')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.model('departmentData.secondary_name')).clear().sendKeys('test');
    browser.sleep(2000);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))), 5000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Department updated successfully.');
  });

  it('delete newly created department', function () {
    element(by.model('searchFilter')).clear().sendKeys(name + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Delete')).click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Department deleted successfully.');
  });

});