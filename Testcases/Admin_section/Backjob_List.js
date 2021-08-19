describe('Backjob List screen', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open Backjob List module', function () {
    browser.wait(EC.elementToBeClickable(element(by.cssContainingText('a.hybrent-blue', 'Admin'))), 20000);
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.linkText('Backjob List')).click();
    browser.wait(EC.titleIs('Backjob List'), 20000);
    expect(browser.getTitle()).toEqual('Backjob List');
  });

  it('Verify that section, sub-section, Created By and Status filter should appear on Backjob List screen', function(){
    browser.wait(EC.presenceOf(element(by.css("[title='Select Section']"))), 20000);
    expect(element(by.css("[title='Select Section']")).isPresent()).toBeTruthy();
    expect(element(by.css("[title='Select Sub Section'] > [ng-click='selectItem();']")).isPresent()).toBeTruthy();
    expect(element(by.css("[title='Select User'] > [ng-click='selectItem();']")).isPresent()).toBeTruthy();
    expect(element(by.id("search-status")).isPresent()).toBeTruthy();

  });

});