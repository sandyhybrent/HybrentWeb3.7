var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('All Cases module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Patient_fname = browser.params.Patients.Patient_fname;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Procedure_name = browser.params.Procedure.Procedure_name;
  var OR_Name = browser.params.OperatingRoom.OR_Name;
  var Physician_first_name = browser.params.Physician.firstname;

  it('Navigate to All cases module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"All Cases")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"All Cases")]')).click();
    });
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('All cases');
  });

  it('Verify that all search and drop down filter appear on the All case page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-dropdown[selected-id='searchParams.procedure_id'] > [ng-click='selectItem();']")).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-dropdown[selected-id='searchParams.physician_id'] > [ng-click='selectItem();']")).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-dropdown[selected-id='searchParams.operating_room_id'] > [ng-click='selectItem();']")).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.status')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.date_range')).isPresent()).toBeTruthy();

  });

  it('Search and open newly created case', function () {
    element(by.model('searchParams.search')).clear().sendKeys(Patient_fname + " " + randNumber);
    browser.sleep(2000);
    // element(by.css("hyb-dropdown[selected-id='searchParams.procedure_id'] > [ng-click='selectItem();']")).click();
    // browser.sleep(2000);
    // element(by.model('search.searchKeyword')).clear().sendKeys(Procedure_name + randNumber);
    // browser.sleep(2000);
    // element(by.buttonText('Search')).click();
    // browser.sleep(2000);
    // var default_inv_selected = element(by.buttonText('Selected'));
    // default_inv_selected.isPresent().then(function (present) {
    //   if (present) {
    //     element(by.buttonText('Close')).click();
    //   } else {
    //     element(by.buttonText('Select')).click();
    //   }
    // })
    // element(by.css("hyb-dropdown[selected-id='searchParams.physician_id'] > [ng-click='selectItem();']")).click();
    // browser.sleep(2000);
    // element(by.model('search.searchKeyword')).clear().sendKeys(Physician_first_name + randNumber);
    // browser.sleep(2000);
    // element(by.buttonText('Search')).click();
    // browser.sleep(2000);
    // var default_inv_selected = element(by.buttonText('Selected'));
    // default_inv_selected.isPresent().then(function (present) {
    //   if (present) {
    //     element(by.buttonText('Close')).click();
    //   } else {
    //     element(by.buttonText('Select')).click();
    //   }
    // })
    // element(by.css("hyb-dropdown[selected-id='searchParams.operating_room_id'] > [ng-click='selectItem();']")).click();
    // browser.sleep(2000);
    // element(by.model('search.searchKeyword')).clear().sendKeys(OR_Name + randNumber);
    // browser.sleep(2000);
    // element(by.buttonText('Search')).click();
    // browser.sleep(2000);
    // var default_inv_selected = element(by.buttonText('Selected'));
    // default_inv_selected.isPresent().then(function (present) {
    //   if (present) {
    //     element(by.buttonText('Close')).click();
    //   } else {
    //     element(by.buttonText('Select')).click();
    //   }
    // })
    // element(by.model('searchParams.status')).click();
    // browser.sleep(1000);
    // element(by.xpath('//option[contains(text(),"Completed")]'));
    // browser.sleep(2000);
    // element(by.model('searchParams.date_range')).sendKeys('-- All Dates --');
    // browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);

    element(by.xpath('//tr[1]//td[10]//span[1]')).getText().then(function (text) {
      expect(text).toEqual('Completed');
    });

  });

});