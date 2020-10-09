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
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Templates');
  });

  it('KIt List page should display templates search filter', function () {
    browser.sleep(2000);
    expect(element(by.model('searchForm.searchFilter')).isPresent()).toBeTruthy();

  });

  it('Add Kit Template', function () {
    element(by.buttonText('Add Template')).click();
    browser.sleep(2000);
    element(by.model('tempData.template_name')).sendKeys('Kit' + randNumber);
    element(by.buttonText('Create Template')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Template created successfully.');
  });

  it('Add item to newly created kit template', function () {
    browser.sleep(1000);
    element(by.model('searchParams.search')).sendKeys(General_sku + randNumber);
    browser.sleep(2000);
    element(by.id("btnAdd")).click();
    browser.sleep(2000);
    element(by.xpath('//a[contains(text(),"Select Inventory")]')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Item added/updated for kit template successfully.');
    browser.sleep(1000);
    element(by.buttonText('Close')).click();
  });

  it('Search Kit template by name', function () {
    browser.sleep(2000);
    let search = element(by.css("div.tab-content > div:nth-of-type(3) #PONUM"));
    search.clear().sendKeys('Kit' + randNumber);
    browser.sleep(2000);
    let search_button = element.all(by.buttonText('Search')).get(2);
    search_button.click();
    browser.sleep(2000);
    element.all(by.repeater('template in templates')).getText().then(function (text) {
      expect(text).toMatch('Kit' + randNumber);
    })
  });

  it('update newly created Kit template', function () {
    browser.sleep(2000);
    let edit_scanout = element.all(by.className("fa fa-edit")).get(2);
    edit_scanout.click();
    browser.sleep(2000);
    element(by.buttonText('+')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Template updated successfully.');
    browser.sleep(2000);
    element(by.buttonText('Create Kit Item')).click();
    browser.sleep(2000);
    element(by.css('.sa-confirm-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Kit item created/updated successfully.');
    browser.sleep(2000);
    element(by.buttonText('Close')).click();
  });

  it('make a kit template', function () {
    browser.sleep(2000);
    element(by.xpath("//a[contains(.,'Make')]")).click();
    browser.sleep(2000);
    element(by.xpath("//hyb-tree-select[1]//span[1]/span[contains(.,'Select inventory location')]")).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element(by.buttonText('Make Kit')).click();
    browser.sleep(2000);
    var inventory_popup = element(by.css('.sa-confirm-button-container'));
    inventory_popup.isPresent().then(function (present) {
      if (present) {
        console.log('add item to inventory');
        element(by.buttonText('Yes')).click();
        browser.sleep(2000);
        element(by.buttonText('Add To Inventory')).click();
      } else {
        console.log('item already added to inventory');
      }
    });
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Kit created successfully.');
  })

  it('delete newly created Kit template', function () {
    browser.sleep(2000);
    let delete_template = element.all(by.className("fa fa-trash-o")).get(2);
    delete_template.click();
    browser.sleep(2000);
    element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Template deleted successfully.');
  });
});