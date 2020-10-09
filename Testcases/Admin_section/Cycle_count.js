describe('Cycle count module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Inventory_name = browser.params.user.Inv_name;


  it('Open Cycle Count module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    browser.sleep(2000);
    element(by.linkText('Cycle Count')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Cycle Count');
  });
  it('Verify that default facility should appear selected on "cycle count for', function () {
    expect(element(by.tagName('hyb-facility-select')).getText()).toBe(browser.params.user.fac_name);
  });

  it('Verify that following filter should appear selected on cycle count page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBe(true);
    expect(element(by.xpath("//hyb-tree-select[@class='form-control']//span[1]/span[contains(.,'Select')]")).isPresent()).toBe(true);
    expect(element(by.xpath("//form[@class='form-inline ng-pristine ng-valid-mask ng-valid-date ng-valid ng-valid-required']/div[3]//a[contains(.,'Select')]")).isPresent()).toBe(true);
    expect(element(by.xpath("//form[@class='form-inline ng-pristine ng-valid-mask ng-valid-date ng-valid ng-valid-required']/div[4]//a[contains(.,'Select')]")).isPresent()).toBe(true);
  });

  it('Verify that Initite cycle count window should get opened on clicking initiate cycle count button', function () {
    browser.sleep(2000);
    element(by.buttonText('Initiate Cycle Count')).click();
    browser.sleep(2000);
    expect(element(by.className('modal-content')).isPresent()).toBe(true);
  });

  it('Verify that user should able to initiate cycle count with Blind count', function () {
    browser.sleep(2000);
    var select_inventory = element(by.xpath("//div[@class='modal-body']//span[1]/span[contains(.,'Select')]"));
    select_inventory.click();
    browser.sleep(2000);
    element(by.model('$ctrl.search.search')).sendKeys(browser.params.user.Inv_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element(by.model('cycleCountParams.is_blind_count')).click();
    browser.sleep(2000);
    element(by.buttonText('Initiate')).click();
    browser.sleep(4000);
    expect($('.toast-message').getText()).toEqual('Cycle count started successfully.');
  });

  it('Verify that user should able to cancel cycle count', function () {
    element(by.css(".fa-ban")).click();
    browser.sleep(2000);
    element(by.css(".confirm")).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Cycle count cancelled successfully.');
    browser.sleep(2000);
  });

});