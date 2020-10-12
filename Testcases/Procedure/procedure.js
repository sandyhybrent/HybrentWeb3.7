var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Procedure module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Physician_first_name = browser.params.Physician.firstname;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Procedure_name = browser.params.Procedure.Procedure_name;

  it('verify that user get redirect to Procedure module on clicking procedure', function () {
    browser.actions().mouseMove(element(by.xpath('//span[contains(text(),"Procedures")]'))).perform();
    browser.sleep(1000);
    element(by.xpath('//span[contains(text(),"Procedures")]')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Procedures');

  });

  it('verify that search filter appear on on procedure detail page', function () {
    browser.sleep(1000);
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
  });

  it('verify that on clicking add procedure button a new window to add procedure get opened', function () {
    element(by.linkText('Add Procedure')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Procedure');

  });

  it('Create New Procedure after opening add procedure window', function () {
    element(by.model('procedure.name')).clear().sendKeys(Procedure_name + randNumber);
    browser.sleep(2000);
    console.log(Physician_first_name + randNumber);
    element(by.model('suggestPhysicians')).sendKeys(Physician_first_name + " " + randNumber);
    browser.sleep(1000);
    element.all(by.model('physician.isSelected')).click();
    browser.sleep(2000);
    element(by.model('procedure.cpt_code')).clear().sendKeys(randNumber);
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual("Procedure successfully created.");
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Procedures');
  });

  it('verify that search functionality working fine on procedure module', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear().sendKeys(Procedure_name + randNumber);
    browser.sleep(2000);
    element(by.css("tr[ng-repeat-start='procedure in procedures'] > td:nth-of-type(1)")).getText().then(function (test) {
      expect(test).toContain(Procedure_name + randNumber);
    })
  });

  it('verify that user is able to update procedure module', function () {
    browser.sleep(2000);
    element(by.css(".fa-edit")).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Procedure');
    browser.sleep(2000);
    element(by.xpath('//span[@class="bootstrap-switch-handle-off bootstrap-switch-default"]')).click();
    browser.sleep(2000);
    element(by.model('procedure.procedure_cost')).sendKeys("800");
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual("Procedure successfully updated.");
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Procedures');
  });
});