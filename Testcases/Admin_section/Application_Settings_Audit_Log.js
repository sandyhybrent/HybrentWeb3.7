describe('Application Settings Audit Log', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open Application Settings Audit Log module', function () {
    browser.wait(EC.elementToBeClickable(element(by.cssContainingText('a.hybrent-blue', 'Admin'))), 20000);
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.linkText('Application Settings Audit Log')).click();
    browser.wait(EC.titleIs('App Settings Audit'), 20000);
    expect(browser.getTitle()).toEqual('App Settings Audit');
  });

  it('Verify that search filter should appear on Application Settings Audit Log screen', function(){
    browser.wait(EC.presenceOf(element(by.model('searchForm.search'))), 20000);
    expect(element(by.model('searchForm.search')).isPresent()).toBeTruthy();
  });

  it('Verify that sorting should work properly for Updated At field on Application Settings Audit Log', function(){
    // Gets the ID of the first item in the row
    var id1 = element(by.repeater("columns in auditData.auditRecords.rows").row(0));
    browser.wait(EC.presenceOf(id1),10000);
    id1Text = id1.getText();

    // Gets the clickable column heading (clicking will sort the table)
    var thead = element(by.xpath("//span[@class='fa fa-caret-down']"));
    browser.wait(EC.elementToBeClickable(thead),10000);
    thead.click();
    browser.sleep(5000);

    // Gets the ID of the first item in the newly sorted table
    var id2 = element(by.repeater("columns in auditData.auditRecords.rows").row(0));

    // Expect the two IDs to be different
    expect(id1Text).not.toEqual(id2.getText());
  });
});