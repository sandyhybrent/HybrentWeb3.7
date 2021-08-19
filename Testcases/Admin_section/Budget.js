describe('Budget screen', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open Budget module', function () {
    browser.wait(EC.elementToBeClickable(element(by.cssContainingText('a.hybrent-blue', 'Admin'))), 20000);
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.linkText('Budget')).click();
    browser.wait(EC.titleIs('Budget'), 20000);
    expect(browser.getTitle()).toEqual('Budget');
  });

  it('Verify that search filter and schedule budget button should appear on budget screen', function(){
    browser.wait(EC.presenceOf(element(by.id("start_date"))), 20000);
    expect(element(by.id("start_date")).isPresent()).toBeTruthy();
    expect(element(by.id("end_date")).isPresent()).toBeTruthy();
    expect(element(by.css("[ng-click='ScheduleBudget()']")).isPresent()).toBeTruthy();
  });

  it('Verify that sorting should work properly for Updated At field on Application Settings Audit Log', function(){
    // Gets the ID of the first item in the row
    var id1 = element(by.repeater("Budget in Budgets.rows track by Budget.id").row(0));
    browser.wait(EC.presenceOf(id1), 10000);
    id1Text = id1.getText();

    // Gets the clickable column heading (clicking will sort the table)
    browser.sleep(1000);
    var thead = element(by.xpath("//span[@class='fa fa-caret-down']"));
    browser.wait(EC.elementToBeClickable(thead), 10000);
    thead.click();
    browser.sleep(2000);

    // Gets the ID of the first item in the newly sorted table
    var id2 = element(by.repeater("Budget in Budgets.rows track by Budget.id").row(0));

    // Expect the two IDs to be different
    expect(id1Text).not.toEqual(id2.getText());
  });

  it('Verify that MANAGE ORGANIZATION BUDGET screen should open on clicking manage schedule button', function(){
    browser.wait(EC.elementToBeClickable(element(by.css("[ng-click='ScheduleBudget()']"))), 20000);
    element(by.css("[ng-click='ScheduleBudget()']")).click();
    browser.wait(EC.titleIs('Budget Schedule'), 20000);
    expect(browser.getTitle()).toEqual('Budget Schedule');
  });

  it('Verify that Save, Save & Deploy and Close button should appear on Manage organization budget screen', function(){
    browser.wait(EC.presenceOf(element(by.xpath("//div[@class='pull-right']/button[1]"))), 20000);
    expect(element(by.xpath("//div[@class='pull-right']/button[1]")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//button[contains(.,'Save & Deploy')]")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//button[@class='btn btn-default']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should redirect to budget detail screen on clicking close button from Manage organization budget screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.css(".btn-default"))), 20000);
    element(by.css(".btn-default")).click();
    browser.wait(EC.titleIs('Budget'), 20000);
    expect(browser.getTitle()).toEqual('Budget');
  });

});