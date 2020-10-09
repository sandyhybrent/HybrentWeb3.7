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
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Templates');
  });

  it('scan out List page should display templates search filter', function () {
    browser.sleep(2000);
    expect(element(by.model('searchForm.searchFilter')).isPresent()).toBeTruthy();

  });

  it('Add scanout Template', function () {
    element(by.buttonText('Add Template')).click();
    browser.sleep(2000);
    element(by.model('tempData.template_name')).sendKeys('sct' + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Create Template')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Template created successfully.');
  });

  it('Add item to newly created template', function () {
    browser.sleep(2000);
    element(by.model('searchParams.search')).sendKeys(General_sku + randNumber);
    browser.sleep(2000);
    element(by.id("btnAdd")).click();
    browser.sleep(2000);
    element(by.xpath('//a[contains(text(),"Select Inventory")]')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Item added for scan out template successfully.');
    browser.sleep(1000);
    element(by.buttonText('Close')).click();
  });

  it('Search template by name', function () {
    browser.sleep(3000);
    let search = element(by.css("div.tab-content > div:nth-of-type(2) #PONUM"));
    search.clear().sendKeys('sct' + randNumber);
    browser.sleep(2000);
    let search_button = element.all(by.buttonText('Search')).get(1);
    search_button.click();
    browser.sleep(2000);
    element.all(by.repeater('template in templates')).getText().then(function (text) {
      expect(text).toMatch('sct' + randNumber);
    })
  });

  it('update newly created scanout template', function () {
    browser.sleep(2000);
    let template = element.all(by.xpath('//i[@class="fa fa-edit"]')).get(1);
    template.click();
    browser.sleep(2000);
    element(by.buttonText('+')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Template updated successfully.');
    browser.sleep(1000);
    element(by.buttonText('Close')).click();
  });

  it('delete newly created scanout template', function () {
    browser.sleep(2000);
    let template = element.all(by.xpath('//i[@class="fa fa-trash-o"]')).get(1);
    template.click();
    browser.sleep(2000);
    element(by.buttonText('Yes')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Template deleted successfully.');
  });
});