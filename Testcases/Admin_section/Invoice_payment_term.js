describe('Invoice Payment Terms', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open Invoice Payment Terms module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.linkText('Invoice Payment Terms')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Invoice Payment Terms');
  });

  it('verify that search and facility fiter with search and add button appear on the page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Add Payment Term')).isPresent()).toBeTruthy();
  });

  it('add new payment term', function () {
    element(by.xpath("//button[@class='btn btn-primary pull-right']")).click();
    browser.sleep(2000);
    browser.wait(EC.elementToBeClickable(element(by.model('Ctrl.form.description'))), 5000);
    browser.sleep(2000);
    element(by.model('Ctrl.form.description')).sendKeys(randNumber);
    browser.sleep(2000);
    element(by.model('Ctrl.form.days')).sendKeys(10);
    browser.sleep(2000);
    element(by.model('Ctrl.form.discount')).sendKeys(10);
    browser.sleep(2000);
    element(by.id("btnAdd")).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect($('.toast-message').getText()).toEqual('Payment term created successfully.');
  });

  it('search newly created payment term by name', function () {
    element(by.model('searchFilter')).sendKeys(randNumber);
    browser.sleep(2000);
    element(by.repeater('paymentTerm in paymentTerms| orderBy:predicate:reverse | offset: (search.currentPage - 1) * search.iPerPage | limitTo: search.iPerPage')).getText().then(function (test) {
      expect(test).toEqual(randNumber + " " + 'Discount' + " " + 10 + " " + 10);
    });
  });

  it('update the newly created payment term', function () {
    element(by.xpath('//i[@class="fa fa-edit"]')).click();
    browser.sleep(2000);
    element(by.buttonText('Update')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Payment term updated successfully.');
  });

  it('delete newly created payment term', function () {
    browser.sleep(2000);
    element(by.css(".fa-trash-o")).click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Payment Term deleted successfully.');
  });

});