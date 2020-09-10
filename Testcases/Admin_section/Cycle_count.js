describe('Cycle count module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open Cycle Count module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    browser.sleep(2000);
    element(by.linkText('Cycle Count')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Cycle Count');
  });
  it('Verify that default facility should appear selected on "cycle count for', function () {
    expect(element(by.tagName('hyb-facility-select')).getText()).toBe(fac_name);
  });

  it('Verify that following filter should appear selected on cycle count page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBe(true);
    expect(element(by.model('$ctrl.selectedValue.name')).isPresent()).toBe(true);
    expect(element(by.model('searchParams.status')).isPresent()).toBe(true);
    expect(element(by.model('$ctrl.selectedDate')).isPresent()).toBe(true);
    // expect(element(by.buttonText('Search')).isPresent()).toBe(true);
    // expect(element(by.buttonText('Initiate Cycle Count ')).isPresent()).toBe(true);
  });

  it('Verify that Initite cycle count window should get opened on clicking initiate cycle count button', function () {
    element(by.buttonText('Initiate Cycle Count')).click();
    browser.sleep(2000);
    expect(element(by.className('modal-content')).isPresent()).toBe(true);
  });

  it('Verify that user should able to initiate cycle count with Blind count', function () {
    browser.sleep(2000);
    // var select_inventory = element.all(by.tagName('hyb-tree-select')).get(0);
    // select_inventory.click();
    element(by.id("btnAdd")).click();
    browser.sleep(3000);
    element(by.xpath("//div[@class='modal-body']//span[1]/span[contains(.,'Select')]")).click();
    browser.sleep(2000);
    element(by.model('cycleCountParams.is_blind_count')).click();
    element(by.buttonText('Initiate')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Cycle count started successfully.');
  });

  it('Verify that user should able to start cycle count', function () {
    element(by.css(".fa-play")).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toBe('Start Cycle Count');
  });

  it('Verify that user should able to select New item tab and complete the cycle count', function () {
    element(by.xpath("//a[.='New Item']")).click();

  })


});