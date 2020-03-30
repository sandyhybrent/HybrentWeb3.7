xdescribe('Hybrent Templates Module for Kit', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.scanout_tempate_name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Templates Kit page should open', function () {
    browser.sleep(2000);
    var Kit = element.all(by.className('uib-tab nav-item')).get(2);
    Kit.click();
    expect(browser.getTitle()).toEqual('Templates');
  });

  it('scan out List page should display templates search filter', function () {
    browser.sleep(2000);
    expect(element(by.model('searchForm.searchFilter')).isPresent()).toBeTruthy();
    element(by.model('searchForm.searchFilter')).clear();

  });

  it('Add Kit Template', function () {
    element(by.buttonText('Add Template')).click();
    element(by.model('tempData.template_name')).sendKeys('Kit' + randNumber);
    element(by.buttonText('Create Template')).click();
    expect($('.toast-message').getText()).toEqual('Template created successfully.');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))), 5000);
  });

  it('Add item to newly created kit template', function () {
    browser.sleep(1000);
    element(by.model('searchParams.search')).sendKeys('SP440278');
    browser.sleep(1000);
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    element(by.xpath('//a[contains(text(),"Select Inventory")]')).click();
    browser.sleep(1000);
    element(by.buttonText('Select')).click();
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Item added/updated for kit template successfully.');
    browser.sleep(1000);
    element(by.buttonText('Close')).click();
  });

  it('Search template by name', function () {
    element(by.model('searchForm.searchFilter')).clear().sendKeys('Kit' + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('template in templates')).getText()).toContain('Kit' + randNumber);
  });

  it('update newly created Kit template', function () {
    element(by.xpath('//div[@class="tab-pane active"]//i[@class="fa fa-edit"]')).click();
    browser.sleep(2000);
    element(by.buttonText('+')).click();
    expect($('.toast-message').getText()).toEqual('Template updated successfully.');
    browser.sleep(1000);
    element(by.buttonText('Close')).click();
  });

  it('Create newly created Kit template', function () {
    element(by.xpath('//div[@class="tab-pane active"]//i[@class="fa fa-edit"]')).click();
    browser.sleep(2000);
    element(by.buttonText('Create Kit Item')).click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Kit item created/updated successfully.');
    browser.sleep(1000);
    element(by.buttonText('Close')).click();
  });

  it('delete newly created Kit template', function () {
    browser.sleep(1000);
    element(by.xpath('//div[@class="tab-pane active"]//i[@class="fa fa-trash-o"]')).click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Template deleted successfully.');
  });
});