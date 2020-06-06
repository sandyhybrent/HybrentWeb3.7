var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Patient module with Record, Cases, Claim and Charges', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Patient_defaultfacility = browser.params.Patients.Patientfac_xpath;
  var Patient_fname = browser.params.Patients.Patient_fname;
  var Status = browser.params.Patients.Status;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var repeat = browser.params.Patients.repeat;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Navigate to patient module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"Patients")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Patients")]')).click();
    });

    browser.sleep(2000);

    expect(browser.getTitle()).toEqual('Patients');
    element(by.xpath(Patient_defaultfacility)).getText().then(function (default_facility) {
      console.log('facility selected on patient page appear as', default_facility);
      expect(default_facility).toBe(browser.params.user.fac_name);
    })
  });

  it('search newly created patient by name', function () {
    element(by.model('searchParams.search')).clear().sendKeys(Patient_fname + " " + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('patient in patients.rows')).getText().then(function (patient_name) {
      expect(patient_name).toContain(Patient_fname + " " + randNumber);
    });
  });

  it('Navigate to patient cases and open the case against the corresponding patient', function () {
    element(by.linkText('Cases')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Patients Cases');
    element(by.className('col-sm-12')).getText().then(function (text) {
      expect(text).toEqual(Procedure_name + randNumber);
    });
  });

  it('Verify that user get navigate to patient page by clicking back button from case listing page', function () {
    element(by.className('btn btn-default')).click();
    browser.sleep(1000);
    expect(browser.getTitle()).toEqual('Patients');
  });

  it('Navigate to patient claim and open the claim against the corresponding patient', function () {
    element(by.linkText('Claims')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Patients Claims');
    element(by.xpath('//td[contains(text(),' + randNumber + ')]')).getText().then(function (text) {
      expect(text).toEqual(Patient_fname + " " + randNumber);
    });
  });

  it('Verify that user get navigate to patient page by clicking back button from claim listing page', function () {
    element(by.className('btn btn-default')).click();
    browser.sleep(1000);
    expect(browser.getTitle()).toEqual('Patients');
  });


  it('Verify the user should navigate to charges screen on clicking charge link from patient listing page', function () {
    element(by.linkText('Charges')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Patients Charges');
  });

  it('Verify that newly added charges should appear under the Recurring charges screen', function () {
    element(by.xpath('//span[contains(text(),"Recurring Charges")]')).click();
    element(by.xpath('//td[contains(text(),' + randNumber + ')]')).getText().then(function (text) {
      expect(text).toEqual('GS' + randNumber);
    });
  });

  it('Verify that user should able to edit the added Recurring charges', function () {
    element(by.xpath('//i[contains(@class,"fa fa-edit")]')).click();
    browser.sleep(1000);
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual("Schedule updated successfully.");
    browser.sleep(2000);
    element(by.buttonText('Close')).click();
  });

});