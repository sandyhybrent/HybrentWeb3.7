describe('Budget Transactions screen', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open Budget Transactions module', function () {
    browser.wait(EC.elementToBeClickable(element(by.cssContainingText('a.hybrent-blue', 'Admin'))), 20000);
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.linkText('Budget Transactions')).click();
    browser.wait(EC.titleIs('Budget Transactions'), 20000);
    expect(browser.getTitle()).toEqual('Budget Transactions');
  });

  it('Verify that searchBy, Facilities, Projects and From To date filter should appear on Budget Transactions screen', function(){
    browser.wait(EC.presenceOf(element(by.model('searchFilter'))), 20000);
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.css("hyb-facility-select")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[contains(.,'All projects')]")).isPresent()).toBeTruthy();
    expect(element(by.id("start_date")).isPresent()).toBeTruthy();
    expect(element(by.id("end_date")).isPresent()).toBeTruthy();

  });

  it('Verify that sorting should work properly for Transaction At field on Budget Transactions screen', function(){
    // Gets the ID of the first item in the row
    var id1 = element(by.repeater("transaction in Transactions.rows track by transaction.id").row(0));
    browser.wait(EC.presenceOf(id1),10000);
    id1Text = id1.getText();

    // Gets the clickable column heading (clicking will sort the table)
    browser.sleep(1000);
    var thead = element(by.xpath("//span[@class='fa fa-caret-down']"));
    browser.wait(EC.elementToBeClickable(thead),10000);
    thead.click();
    browser.sleep(2000);

    // Gets the ID of the first item in the newly sorted table
    var id2 = element(by.repeater("transaction in Transactions.rows track by transaction.id").row(0));

    // Expect the two IDs to be different
    expect(id1Text).not.toEqual(id2.getText());
  });

  
});