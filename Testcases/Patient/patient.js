var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Patient module', function () {
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
    browser.sleep(2000);
    element(by.xpath(Patient_defaultfacility)).getText().then(function (default_facility) {
      console.log('facility selected on patient page appear as', default_facility);
      expect(default_facility).toBe(browser.params.user.fac_name);
    })
  });

  it('Verify that search patient By filter appear on patient detail page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('$select.search')).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[contains(.,'Select Building')]")).isPresent()).toBeTruthy();
    expect(element(by.model('$select.search')).isPresent()).toBeTruthy();
  });

  it('verify that user is able to add patient by clicking on add patient button', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.xpath('//span[@class="patient-add-icon"]')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.model('patient.first_name')).sendKeys(Patient_fname);
    element(by.xpath('//a[contains(text(),"--Select facility--")]')).click();
    browser.sleep(1000);
    element(by.model('search.searchKeyword')).sendKeys(browser.params.user.fac_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element(by.buttonText('Select')).click();
    browser.sleep(1000);
    element(by.model('patient.last_name')).sendKeys(randNumber);
    browser.sleep(1000);
    element(by.model('patient.mrn_number')).sendKeys(randNumber);
    browser.sleep(1000);
    element(by.model('patient.account_number')).sendKeys(randNumber);
    browser.sleep(1000);
    element(by.model('patient.resident_id')).sendKeys(randNumber);
    browser.sleep(1000);
    element(by.model('patient.patient_barcode')).sendKeys(randNumber);
    browser.sleep(1000);
    element(by.id('dob')).clear().sendKeys("01/01/2018");
    browser.sleep(2000);
    // element(by.xpath('//select[@id="status"]//option[3]')).click();
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Patient created successfully.');



  });

  it('Patient: Update Patient.', function () {
    // element(by.css('div.pagehead > hyb-select > a')).click();
    // element(by.model('search.searchKeyword')).sendKeys(browser.params.user.fac_name);
    // element(by.buttonText('Select')).click();

    element(by.model('searchParams.search')).clear().sendKeys(Patient_fname + " " + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('patient in patients')).each(function (element1, index) {
      element1.element(by.binding('patient.full_name')).getText().then(function (text) {
        expect(text.trim()).toContain(Patient_fname + " " + randNumber);
      });
    });
    browser.sleep(2000);
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//a[contains(text(),"Edit Patient")]')).getWebElement()).then(function () {
      element(by.xpath('//a[contains(text(),"Edit Patient")]')).click();
    })
    browser.sleep(1000);
    expect(element(by.css(".text-capitalize")).getText()).toContain('Edit Patient');
    browser.sleep(2000);
    element(by.model('patient.address1')).sendKeys("test");
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual("Patient updated successfully.");
  });

  it('search newly created patient by name', function () {
    element(by.model('searchParams.search')).clear().sendKeys(Patient_fname + " " + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.xpath("//td[4]")).getText()).toContain(randNumber);    
  });

  it('add charges to patient', function () {
    browser.sleep(2000);
    element(by.linkText('Charges')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Patients Charges');
    element(by.xpath('//span[contains(text(),"Recurring Charges")]')).click();
    browser.sleep(2000);
    element(by.buttonText('Add Recurring Charge')).click();
    browser.sleep(1000);
    element(by.model('searchParams.search')).sendKeys(General_sku + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.xpath('//a[contains(text(),"Select Inventory")]')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element(by.xpath('//div[@class="modal-footer"]//span[@id="btnAdd"]')).click();
    browser.sleep(2000);
    element(by.model('$ctrl.scheduler.schedule_type')).click();
    browser.sleep(2000);
    element(by.xpath('//option[contains(text(),"One Time")]')).click();
    browser.sleep(2000);
    element(by.xpath("//div[@class='form-inline padding-lr-22']//i[@class='glyphicon glyphicon-calendar']")).click();
    browser.sleep(1000);
    element(by.css(".uib-datepicker-current")).click();
    browser.sleep(2000);
    element(by.model('hours')).clear().sendKeys('23');
    browser.sleep(2000);
    element(by.model('minutes')).clear().sendKeys('45');
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual("Schedule added successfully.");
  });


});