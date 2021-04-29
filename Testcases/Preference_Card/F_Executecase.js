var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Execute Case module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Patient_fname = browser.params.Patients.Patient_fname;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Procedure_name = browser.params.Procedure.Procedure_name;
  var OR_Name = browser.params.OperatingRoom.OR_Name;
  var Physician_first_name = browser.params.Physician.firstname;

  it('Navigate to Execute case module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"Execute Cases")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Execute Cases")]')).click();
    });
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Execute cases');
  });

  it('Verify that all search and drop down filter appear on the execute case page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-dropdown[selected-id='searchParams.procedure_id'] > [ng-click='selectItem();']")).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-dropdown[selected-id='searchParams.physician_id'] > [ng-click='selectItem();']")).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-dropdown[selected-id='searchParams.operating_room_id'] > [ng-click='selectItem();']")).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.date_range')).isPresent()).toBeTruthy();
  });

  it('Search and open newly created case', function () {
    element(by.model('searchParams.search')).clear().sendKeys(Patient_fname + " " + randNumber);
    browser.sleep(2000);
    element(by.css("hyb-dropdown[selected-id='searchParams.procedure_id'] > [ng-click='selectItem();']")).click();
    browser.sleep(2000);
    element(by.model('search.searchKeyword')).clear().sendKeys(Procedure_name + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    var default_inv_selected = element(by.buttonText('Selected'));
    default_inv_selected.isPresent().then(function (present) {
      if (present) {
        element(by.buttonText('Close')).click();
      } else {
        element(by.buttonText('Select')).click();
      }
    })
    browser.sleep(2000);
    element(by.css("hyb-dropdown[selected-id='searchParams.physician_id'] > [ng-click='selectItem();']")).click();
    browser.sleep(2000);
    element(by.model('search.searchKeyword')).clear().sendKeys(Physician_first_name + " " + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    var default_inv_selected = element(by.buttonText('Selected'));
    default_inv_selected.isPresent().then(function (present) {
      if (present) {
        element(by.buttonText('Close')).click();
      } else {
        element(by.buttonText('Select')).click();
      }
    })
    browser.sleep(2000);
    element(by.css("hyb-dropdown[selected-id='searchParams.operating_room_id'] > [ng-click='selectItem();']")).click();
    browser.sleep(2000);
    element(by.model('search.searchKeyword')).clear().sendKeys(OR_Name + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    var default_inv_selected = element(by.buttonText('Selected'));
    default_inv_selected.isPresent().then(function (present) {
      if (present) {
        element(by.buttonText('Close')).click();
      } else {
        element(by.buttonText('Select')).click();
      }
    })
    browser.sleep(2000);
    element(by.model('searchParams.date_range')).sendKeys('-- All Dates --');
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);

    element(by.className('col-sm-12')).getText().then(function (text) {
      expect(text).toEqual(Procedure_name + randNumber);
    });

  });

  it('increase item hold qty and move case to complete case', function () {
    element(by.partialLinkText('00000001')).click();
    browser.sleep(2000);
    element.all(by.className('item-qty-editable-label')).click();
    element(by.model('$parent.$data')).clear().sendKeys('1.000');
    browser.sleep(2000);
    element(by.xpath('//button[@class="btn btn-primary"]//span[@class="glyphicon glyphicon-ok"]')).click();
    browser.executeScript("arguments[0].scrollIntoView(0,0);", element(by.className('pagehead')).getWebElement()).then(function () {
      browser.sleep(2000);
      element(by.buttonText('Save')).click();
      browser.sleep(2000);
      expect($('.toast-message').getText()).toEqual('Case updated successfully.');
    })
    browser.wait(function () {
      return $('.toast-message').isPresent().then(function (toastPresent) {
        return !toastPresent;
      });
    }, 10000);

    browser.sleep(3000);
    element(by.xpath('//button[contains(text(),"Complete Case")]')).click();
    browser.sleep(2000)
    expect($('.toast-message').getText()).toEqual('Case completed successfully.');
    expect(browser.getTitle()).toEqual('Execute cases');
  });

});