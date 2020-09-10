describe('Hybrent Templates Module for scan out', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.scanout_tempate_name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Templates scanout List page should open', function () {
    browser.sleep(2000);
    var scanout = element.all(by.className('nav-link')).get(1);
    scanout.click();
    expect(browser.getTitle()).toEqual('Templates');
  });

  it('scan out List page should display templates search filter', function () {
    browser.sleep(2000);
    expect(element(by.model('searchForm.searchFilter')).isPresent()).toBeTruthy();

  });

  it('Add scanout Template', function () {
    element(by.buttonText('Add Template')).click();
    element(by.model('tempData.template_name')).sendKeys('sct' + randNumber);
    element(by.buttonText('Create Template')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Template created successfully.');
  });

  it('Add item to newly created template', function () {
    element(by.model('searchParams.search')).sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    element(by.xpath('//a[contains(text(),"Select Inventory")]')).click();
    browser.sleep(1000);
    element(by.buttonText('Select')).click();
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Item added for scan out template successfully.');
    browser.sleep(1000);
    element(by.buttonText('Close')).click();
  });

  it('Search template by name', function () {
    browser.sleep(3000);
    let search = element.all(by.model('searchForm.searchFilter')).get(1);
    search.clear().sendKeys('sct' + randNumber);
    let search_button = element.all(by.buttonText('Search')).get(1);
    search_button.click();
    browser.sleep(2000);
    expect(element(by.repeater('template in templates')).getText()).toContain('sct' + randNumber);
  });

  it('update newly created scanout template', function () {
    let edit_scanout = element(by.className("fa fa-edit")).get(1);
    edit_scanout.click();
    browser.sleep(2000);
    element(by.buttonText('+')).click();
    expect($('.toast-message').getText()).toEqual('Template updated successfully.');
    browser.sleep(1000);
    element(by.buttonText('Close')).click();
  });

  it('delete newly created scanout template', function () {
    browser.sleep(1000);
    let delete_template = element(by.className("fa fa-trash-o")).get(1);
    delete_template.click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Template deleted successfully.');
  });
});