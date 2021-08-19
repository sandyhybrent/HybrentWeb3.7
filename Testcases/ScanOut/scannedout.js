describe('Hybrent Scanout Module', function () {
  var EC = protractor.ExpectedConditions;
 
  it('Scan Out List page should open', function () {
    browser.sleep(2000);
    browser.executeScript("arguments[0].scrollIntoView();", element(by.css('a > span.menu-icon > i.fa-sign-out')).getWebElement()).then(function () {
      element(by.css('a > span.menu-icon > i.fa-sign-out')).click();
    });
    browser.wait(EC.elementToBeClickable(element(by.xpath("//a[.='Scanned Out']"))), 20000);
    element(by.xpath("//a[.='Scanned Out']")).click();
    browser.wait(EC.titleIs('Scanned Out'), 20000);
    expect(browser.getTitle()).toEqual('Scanned Out');

  });


  it('List page should display Scanned out document and scanned out by filters', function () {
    browser.wait(EC.presenceOf(element(by.id("search-search"))),20000);
    expect(element(by.id("search-search")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[contains(.,'Select')]")).isPresent()).toBeTruthy();
  });

  it('Verify that scanned out document detail page should get open on clicking the document number', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath('//*[@id="ng-view"]/div/div[3]/div/div/table/tbody/tr[1]/td[1]/a'))), 20000);
    element(by.xpath('//*[@id="ng-view"]/div/div[3]/div/div/table/tbody/tr[1]/td[1]/a')).click();
    browser.wait(EC.titleIs('Scanned Out Detail'));
    expect(browser.getTitle()).toEqual('Scanned Out Detail');
  });

  it('Verify that adjust scanout, cancel scanout and Close button should appear under the drop down on scanned out detail screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.css(".fa-caret-down"))), 20000);
    element(by.css(".fa-caret-down")).click();
    browser.wait(EC.visibilityOf(element(by.xpath("//a[.='Adjust Scan Out']"))), 20000);
    expect(element(by.xpath("//a[.='Adjust Scan Out']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[.='Cancel Scan Out']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[.='Close']")).isPresent()).toBeTruthy();
  });

  
  it('Verify that user should be redirected to scanned out listing screen on clicking close button', function() {
    browser.wait(EC.elementToBeClickable(element(by.xpath("//a[.='Close']"))), 20000);
    element(by.xpath("//a[.='Close']")).click();
    browser.wait(EC.titleIs('Scanned Out'), 20000);
    expect(browser.getTitle()).toEqual('Scanned Out');
  });

});