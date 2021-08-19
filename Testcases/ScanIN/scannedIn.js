describe('Hybrent Scanned IN Module', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.templateName;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var Dme_sku = browser.params.itemCatalog.Dme_sku;
  var Dme_item_name = browser.params.itemCatalog.Dme_item_name;
  var Dme_Alias = browser.params.itemCatalog.Dme_Alias;
  var Dme_mfr = browser.params.itemCatalog.Dme_mfr;
  var Consignment = browser.params.itemCatalog.Consignment;
  var Con_sku = browser.params.itemCatalog.Con_sku;
  var randomnmbr = browser.params.Vendor_price_tier.randompricetier;
  var fac_name = browser.params.user.fac_name;
  var Inventory_name = browser.params.user.Inv_name;

  beforeEach(function () {
    browser.waitForAngularEnabled(false);
  })

  it('Open scan in module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.css('a > span.menu-icon > i.fa-sign-in')).getWebElement()).then(function () {
      element((by.linkText('Scan In'))).click();
    });
    var scannedIn = element(by.xpath("//a[.='Scanned In']"));
    browser.actions().mouseMove(scannedIn).perform();
    browser.wait(EC.elementToBeClickable(scannedIn), 20000);
    scannedIn.click();
    browser.wait(EC.titleIs('Scanned In'), 20000);
    expect(browser.getTitle()).toEqual('Scanned In');

  });
  it('Verify that Search by and Scanned In by filter should appear on scanned in listing screen', function () {
    browser.wait(EC.presenceOf(element(by.id("search-search"))),20000);
    expect(element(by.id("search-search")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[contains(.,'Select')]")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to open scanned in Document screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//*[@id='ng-view']/div/div[3]/div/div/table/tbody/tr[1]/td[1]/a"))), 20000);
    element(by.xpath("//*[@id='ng-view']/div/div[3]/div/div/table/tbody/tr[1]/td[1]/a")).click();
    browser.wait(EC.titleIs('Scanned In Detail'), 20000);
    expect(browser.getTitle()).toEqual('Scanned In Detail');
  });

  it('Verify that Adjust ScanIn, Cancel scanIn and Close button should appear under the drop down on scannedIN detail screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.css(".no-margin"))), 20000);
    element(by.css(".no-margin")).click();
    browser.wait(EC.presenceOf(element(by.xpath("//a[.='Adjust Scan In']"))), 20000);
    expect(element(by.xpath("//a[.='Adjust Scan In']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[.='Cancel Scan In']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//a[.='Close']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should be redirected to scanned In listing screen on clicking close button from scanned In detail page', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//a[.='Close']"))), 20000);
    element(by.xpath("//a[.='Close']")).click();
    browser.wait(EC.titleIs('Scanned In'), 20000);
    expect(browser.getTitle()).toEqual('Scanned In');
  });
  
});