describe('Hybrent Templates Module', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.templateName;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Templates List page should open', async function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    browser.executeScript("arguments[0].scrollIntoView();", element(by.css('a > span.template')).getWebElement()).then(async function () {
      browser.wait(EC.elementToBeClickable(element(by.linkText('Templates'))), 20000);
      await element((by.linkText('Templates'))).click();
    });
    browser.wait(EC.titleIs('Templates'),5000);
    expect(browser.getTitle()).toEqual('Templates');
  });
  it('List page should display templates search filter', function () {
    expect(element(by.model('searchForm.searchFilter')).isPresent()).toBeTruthy();

  });
  it('Add Template', async function () {
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Add Template'))), 20000);
    await element(by.buttonText('Add Template')).click();
    browser.wait(EC.presenceOf(element(by.model('tempData.template_name'))), 20000);
    await element(by.model('tempData.template_name')).sendKeys(templateName + randNumber);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Create Template'))), 20000);
    await element(by.buttonText('Create Template')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Template created successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Template created successfully.');
  });

  it('Add item to newly created template', async function () {
    browser.wait(EC.presenceOf(element(by.model('searchParams.search'))), 20000);
    await element(by.model('searchParams.search')).sendKeys(General_sku + randNumber);
    // await element(by.model('searchParams.search')).sendKeys('GS1624258741694');
    browser.wait(EC.elementToBeClickable(element(by.id("btnAdd"))), 20000);
    await element(by.id("btnAdd")).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))), 20000);
    await element(by.buttonText('Save')).click();
    browser.sleep(2000);
    await element.all(by.repeater('item in templateItems.items')).each(async function (element1, index) {
      element1.element(by.css("tr[ng-repeat='item in templateItems.items'] > td:nth-of-type(3)")).getText().then(function (text) {
        browser.sleep(2000);
        // expect(text).toEqual('GS1624258741694');
        expect(text).toEqual(General_sku + randNumber);
      });
    });
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Close'))), 20000);
    await element(by.buttonText('Close')).click();
  });

  it('Search template by name', async function () {
    browser.wait(EC.presenceOf(element(by.model('searchForm.searchFilter'))), 20000);
    await element(by.model('searchForm.searchFilter')).sendKeys(templateName + randNumber);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Search'))), 20000);
    await element(by.buttonText('Search')).click();
    browser.sleep(2000);
    await element.all(by.repeater('template in templates')).getText().then(function (text) {
      expect(text).toMatch(templateName + randNumber);
    });

  });


  it('delete newly created template', async function () {
    await element(by.model('searchForm.searchFilter')).clear().sendKeys(templateName + randNumber);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Search'))), 20000);
    await element(by.buttonText('Search')).click();
    browser.wait(EC.elementToBeClickable(element(by.xpath("//div[@class='tab-pane active']//i[@class='fa fa-trash-o']"))), 20000);
    let template = await element(by.repeater('template in templates'));
    template.element(by.xpath("//div[@class='tab-pane active']//i[@class='fa fa-trash-o']")).click();
    browser.wait(EC.elementToBeClickable(element(by.css('.sa-button-container')).element(by.xpath("//button[@class='confirm']"))), 20000);
    browser.sleep(2000);
    await element(by.css('.sa-button-container')).element(by.xpath("//button[@class='confirm']")).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Template deleted successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Template deleted successfully.');
    browser.sleep(2000);
    await element(by.model('searchForm.searchFilter')).clear();

  });

});