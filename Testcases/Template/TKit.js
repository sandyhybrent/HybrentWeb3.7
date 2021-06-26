const {
  get
} = require("lodash");

describe('Hybrent Templates Module for Kit', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.scanout_tempate_name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Templates Kit page should open',  function () {
    browser.sleep(2000);
    var Kit =  element.all(by.className('nav-link')).get(2);
    Kit.click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Templates');
  });

  it('KIt List page should display templates search filter', function () {
    browser.wait(EC.presenceOf(element(by.model('searchForm.searchFilter'))), 20000);
    expect(element(by.model('searchForm.searchFilter')).isPresent()).toBeTruthy();

  });

  it('Add Kit Template',  function () {
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Add Template'))), 20000);
    element(by.buttonText('Add Template')).click();
    browser.wait(EC.presenceOf(element(by.model('tempData.template_name'))), 20000);
    element(by.model('tempData.template_name')).sendKeys('Kit' + randNumber);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Create Template'))), 20000);
    element(by.buttonText('Create Template')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Template created successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Template created successfully.');
  });

  it('Add item to newly created kit template',  function () {
    browser.wait(EC.presenceOf(element(by.model('searchParams.search'))), 20000);
    element(by.model('searchParams.search')).sendKeys(General_sku + randNumber);
    browser.wait(EC.elementToBeClickable(element(by.id("btnAdd"))), 20000);
    element(by.id("btnAdd")).click();
    // browser.wait(EC.elementToBeClickable(element(by.xpath("//a[contains(.,'Select Inventory')]"))), 20000);
    //  element(by.xpath("//a[contains(.,'Select Inventory')]")).click();
    // browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 20000);
    //  element(by.buttonText('Select')).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Add'))), 20000);
    element(by.buttonText('Add')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Item added/updated for kit template successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Item added/updated for kit template successfully.');
    browser.sleep(2000);
    element(by.buttonText('Close')).click();
    browser.wait(EC.titleIs('Templates'));
    
  });

  it('Search Kit template by name',  function () {
    browser.sleep(3000);
    let search =  element(by.css("div.tab-content > div:nth-of-type(3) #PONUM"));
    search.clear().sendKeys('Kit' + randNumber);
    browser.sleep(2000);
    let search_button = element.all(by.buttonText('Search')).get(2);
    search_button.click();
    browser.sleep(2000);
     element.all(by.repeater('template in templates')).getText().then(function (text) {
      expect(text).toMatch('Kit' + randNumber);
    })
  });

  it('update newly created Kit template',  function () {
    browser.sleep(2000);
    let edit_scanout =  element.all(by.className("fa fa-edit")).get(2);
    edit_scanout.click();
    browser.sleep(2000);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('+'))), 20000);
    element(by.buttonText('+')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Template updated successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Template updated successfully.');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Create Kit Item'))), 20000);
    element(by.buttonText('Create Kit Item')).click();
    browser.sleep(2000);
    element(by.css('.sa-confirm-button-container')).element(by.buttonText('Yes')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Kit item created/updated successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Kit item created/updated successfully.');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Close'))), 20000);
    element(by.buttonText('Close')).click();
  });

  it('make a kit template',  function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath("//a[contains(.,'Make')]"))), 20000);
    element(by.xpath("//a[contains(.,'Make')]")).click();
    browser.wait(EC.elementToBeClickable(element(by.xpath("//hyb-tree-select[1]//span[1]/span[contains(.,'Select inventory location')]"))), 20000);
    element(by.xpath("//hyb-tree-select[1]//span[1]/span[contains(.,'Select inventory location')]")).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 20000);
    element(by.buttonText('Select')).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Make Kit'))), 20000);
    element(by.buttonText('Make Kit')).click();
    browser.sleep(2000);
    browser.wait(EC.presenceOf(element(by.css('.sa-confirm-button-container'))), 20000);
    var inventory_popup = element(by.css('.sa-confirm-button-container'));
    inventory_popup.isPresent().then(function (present) {
      if (present) {
        console.log('add item to inventory');
        browser.wait(EC.elementToBeClickable(element(by.buttonText('Yes'))), 20000);
        element(by.buttonText('Yes')).click();
        browser.wait(EC.elementToBeClickable(element(by.buttonText('Add To Inventory'))), 20000);
        element(by.buttonText('Add To Inventory')).click();
      } else {
        console.log('item already added to inventory');
      }
    });
    
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Kit created successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Kit created successfully.');
    browser.sleep(1000);
  })
;;
  it('delete newly created Kit template',  async function () {
    browser.sleep(2000);
    let delete_template =  element.all(by.className("fa fa-trash-o")).get(2);
    delete_template.click();
    browser.sleep(2000);
    browser.wait(EC.elementToBeClickable(element(by.css('.sa-button-container')).element(by.buttonText('Yes'))), 5000);
    await element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(1000);
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Template deleted successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Template deleted successfully.');
  });
});