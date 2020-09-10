const {
  get
} = require("lodash");

describe('Hybrent Templates Module for Kit', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.scanout_tempate_name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Templates Kit page should open', function () {
    browser.sleep(2000);
    var Kit = element.all(by.className('nav-link')).get(2);
    Kit.click();
    expect(browser.getTitle()).toEqual('Templates');
  });

  it('KIt List page should display templates search filter', function () {
    browser.sleep(2000);
    expect(element(by.model('searchForm.searchFilter')).isPresent()).toBeTruthy();
    element(by.model('searchForm.searchFilter')).get(2).clear();

  });

  it('Add Kit Template', function () {
    element(by.buttonText('Add Template')).click();
    element(by.model('tempData.template_name')).sendKeys('Kit' + randNumber);
    element(by.buttonText('Create Template')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Template created successfully.');
  });

  it('Add item to newly created kit template', function () {
    browser.sleep(1000);
    element(by.model('searchParams.search')).sendKeys(General_sku + randNumber);
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

  it('Search Kit template by name', function () {
    let search = element.all(by.model('searchForm.searchFilter')).get(2);
    search.clear().sendKeys('Kit' + randNumber);
    let search_button = element.all(by.buttonText('Search')).get(2);
    search_button.click();
    browser.sleep(2000);
    var scanouttemplate = element(by.repeater('template in templates'));
    expect(scanouttemplate.getText()).toContain('Kit' + randNumber);
  });

  it('update newly created Kit template', function () {
    let edit_scanout = element(by.className("fa fa-edit")).get(2);
    edit_scanout.click();
    browser.sleep(2000);
    element(by.buttonText('+')).click();
    expect($('.toast-message').getText()).toEqual('Template updated successfully.');
    browser.sleep(1000);
    element(by.buttonText('Create Kit Item')).click();
    element(by.css('.sa-confirm-button-container')).element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Kit item created/updated successfully.');
    element(by.buttonText('Close')).click();
  });

  it('make a kit template', function () {
    browser.sleep(1000);
    element(by.partialLinkText('Make')).click();
    browser.sleep(2000);
    element(by.xpath('//span[contains(text(),"Select inventory location")]')).click();
    browser.sleep(1000);
    element(by.buttonText('Select')).click();
    browser.wait(EC.invisibilityOf(element(by.buttonText('Make Kit'))), 5000);
    element(by.buttonText('Make Kit')).click();
    var inventory_popup = element(by.css('.sa-confirm-button-container'));
    inventory_popup.isPresent().then(function (present) {
      if (present) {
        console.log('add item to inventory');
        element(by.buttonText('Yes')).click();
        browser.sleep(1000);
        element(by.buttonText('Add To Inventory')).click();
      } else {
        console.log('item already added to inventory');
      }
    });
    expect($('.toast-message').getText()).toEqual('Kit Created successfully.');
  })

  it('delete newly created Kit template', function () {
    browser.sleep(1000);
    let delete_template = element(by.className("fa fa-trash-o")).get(2);
    delete_template.click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Template deleted successfully.');
  });
});