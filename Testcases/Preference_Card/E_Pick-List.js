var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Picklist module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Patient_fname = browser.params.Patients.Patient_fname;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Procedure_name = browser.params.Procedure.Procedure_name;
  var OR_Name = browser.params.OperatingRoom.OR_Name;
  var Physician_first_name = browser.params.Physician.firstname;

  it('Navigate to picklist module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"Pick list")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Pick list")]')).click();
    });
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Pick list');
  });

  it('Verify that all search and drop down filter appear on the pick list page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-dropdown[selected-id='searchParams.procedure_id'] > [ng-click='selectItem();']")).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-dropdown[selected-id='searchParams.physician_id'] > [ng-click='selectItem();']")).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-dropdown[selected-id='searchParams.operating_room_id'] > [ng-click='selectItem();']")).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.date_range')).isPresent()).toBeTruthy();
  });

  it('Search newly created case', function () {
    element(by.model('searchParams.search')).clear().sendKeys(Patient_fname + " " + randNumber);
    browser.sleep(2000);
    element(by.css("hyb-dropdown[selected-id='searchParams.procedure_id'] > [ng-click='selectItem();']")).click();
    browser.sleep(2000);
    element(by.model('search.searchKeyword')).clear().sendKeys(Procedure_name + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element(by.css("hyb-dropdown[selected-id='searchParams.physician_id'] > [ng-click='selectItem();']")).click();
    browser.sleep(2000);
    element(by.model('search.searchKeyword')).clear().sendKeys(Physician_first_name + " " + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element(by.css("hyb-dropdown[selected-id='searchParams.operating_room_id'] > [ng-click='selectItem();']")).click();
    browser.sleep(2000);
    element(by.model('search.searchKeyword')).clear().sendKeys(OR_Name + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element(by.model('searchParams.date_range')).sendKeys('-- All Dates --');
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.className('col-sm-12')).getText().then(function (text) {
      expect(text).toEqual(Procedure_name + randNumber);
    });

  });



  it('open and add normal notes in newly created case', function () {
    element(by.css("a[uib-tooltip='Open Patient Case']")).click();
    browser.sleep(2000);
    element(by.model('CaseDetail.gloves_size')).clear().sendKeys('glove' + randNumber);
    browser.sleep(1000);
    element(by.model('CaseDetail.surgeon_notes')).clear().sendKeys('surgeon' + randNumber);
    browser.sleep(1000);
    element(by.model('CaseDetail.interruptions')).clear().sendKeys('intrer' + randNumber);
    browser.sleep(1000);
    element(by.model('CaseDetail.preparation_notes')).clear().sendKeys('notes' + randNumber);
    browser.sleep(1000);
    element(by.model('CaseDetail.music')).clear().sendKeys('music' + randNumber);
    browser.sleep(1000);
    element(by.model('CaseDetail.position')).clear().sendKeys('position' + randNumber);
    browser.sleep(1000);
    element(by.model('CaseDetail.instructions')).clear().sendKeys('instruction' + randNumber);
    browser.sleep(1000);
  });

  it('increase item qty and attach stock info ', function () {
    element.all(by.className('item-qty-editable-label')).first().click();
    browser.sleep(2000);
    element(by.model('$parent.$data')).clear().sendKeys('1.000');
    browser.sleep(2000);
    element(by.xpath('//button[@class="btn btn-primary"]//span[@class="glyphicon glyphicon-ok"]')).click();
    browser.sleep(2000);
    browser.executeScript("arguments[0].scrollIntoView(0,0);", element(by.className('pagehead')).getWebElement()).then(function () {
      browser.sleep(2000);
      browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))),20000);
      element(by.buttonText('Save')).click();
      browser.sleep(2000);
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'Case updated successfully.'),20000);
      browser.sleep(1000); 
      expect($('.toast-message').getText()).toEqual('Case updated successfully.');
    })

  });

  it('move case to execute case', function () {
    browser.sleep(1000);
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"Auto Attach Stock")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Auto Attach Stock")]')).click();
    });
    browser.wait(EC.textToBePresentInElement($('.toast-message'), 'All Items stock attached successfully.'),20000);
    expect($('.toast-message').getText()).toEqual('All Items stock attached successfully.');
    browser.sleep(3000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    element(by.xpath('//button[contains(text(),"Move to Execute")]')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Case moved to execute successfully.'),20000);
    browser.sleep(1000);    
    expect($('.toast-message').getText()).toEqual('Case moved to execute successfully.');
    browser.wait(EC.titleIs('Pick list'), 20000);
    expect(browser.getTitle()).toEqual('Pick list');
  });

});