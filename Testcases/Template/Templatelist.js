describe('Hybrent Templates Module', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.templateName;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Templates List page should open', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.css('a > span.template')).getWebElement()).then(function () {
      element((by.linkText('Templates'))).click();
    });
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Templates');
  });
  it('List page should display templates search filter', function () {
    expect(element(by.model('searchForm.searchFilter')).isPresent()).toBeTruthy();

  });
  it('Add Template', function () {
    browser.sleep(2000);
    element(by.buttonText('Add Template')).click();
    browser.sleep(2000);
    element(by.model('tempData.template_name')).sendKeys(templateName + randNumber);
    element(by.buttonText('Create Template')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Template created successfully.');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))), 5000);
  });

  it('Add item to newly created template', function () {
    browser.sleep(1000);
    element(by.model('searchParams.search')).sendKeys(General_sku + randNumber);
    browser.sleep(2000);
    element(by.id("btnAdd")).click();
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in vendor.items')).each(function (element1, index) {
      element1.element(by.css("tr[ng-repeat='item in vendor.items'] > td:nth-of-type(3)")).getText().then(function (text) {
        browser.sleep(2000);
        expect(text).toEqual(General_sku + randNumber);
      });
    });
    element(by.buttonText('Close')).click();
  });

  it('Search template by name', function () {
    browser.sleep(2000);
    element(by.model('searchForm.searchFilter')).sendKeys(templateName + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('template in templates')).getText().then(function (text) {
      expect(text).toMatch(templateName + randNumber);
    });

  });


  it('delete newly created template', function () {
    element(by.model('searchForm.searchFilter')).clear().sendKeys(templateName + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    let template = element(by.repeater('template in templates'));
    template.element(by.xpath('//i[@class="fa fa-trash-o"]')).click();
    browser.sleep(2000);
    element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Template deleted successfully.');
    browser.sleep(2000);
    element(by.model('searchForm.searchFilter')).clear();

  });

});