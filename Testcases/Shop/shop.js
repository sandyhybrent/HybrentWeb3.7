describe('Hybrent Shop Module', function () {
  var EC = protractor.ExpectedConditions;
  var mfr = browser.params.itemCatalog.random_mfr;
  var VENDOR = browser.params.itemCatalog.VENDOR;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randNumber = browser.params.itemCatalog.randNumber;
  var userfacility = browser.params.userfacility.facility_xpath;
  var shop_facility = browser.params.shop.fac_xpath;
  var userdropdown = element(by.className('dropdown-toggle text-info header-menu-tab'));
  var user_profile = element(by.xpath('//a[@ng-href="#/user/update-profile"]'));
  var Billonly_mfr = browser.params.itemCatalog.Billonly_mfr;
  var General_sku = browser.params.itemCatalog.General_sku;
  var fac_name = browser.params.user.fac_name;


  it('Verify that user default facility appear selected in shop page', async function () {
    browser.wait(EC.elementToBeClickable(element(by.linkText('Shop'))), 20000);
    await element(by.linkText('Shop')).click();
    browser.wait(EC.titleIs('Shop'),5000);
    expect(browser.getTitle()).toEqual('Shop');
    await element(by.xpath(shop_facility)).getText().then(function (shopfacility) {
      console.log('facility selected on shop page appear is', shopfacility);
      expect(shopfacility).toBe(browser.params.user.fac_name);
    })
  });

  it('Add General Item to cart', async function(){
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    browser.sleep(2000);
    browser.wait(EC.elementToBeClickable(element(by.id("btnAdd"))), 50000);
    element(by.id("btnAdd")).click();
  });

  it('Verify that user should get redirect to cart on clicking checkout button', async function(){
    browser.wait(EC.elementToBeClickable(element(by.partialButtonText('Checkout'))), 20000);
    element(by.partialButtonText('Checkout')).click();
    browser.wait(EC.titleIs('My Cart'),50000);
    expect(browser.getTitle()).toEqual('My Cart');

  });

  it('verify that bill_only and inactive item should not appear on page', function () {
    browser.wait(EC.elementToBeClickable(element(by.linkText('Shop'))), 20000);
    element(by.linkText('Shop')).click();
    browser.wait(EC.titleIs('Shop'),20000);
    element(by.model('searchParams.search')).clear().sendKeys(Billonly_mfr + randNumber);
    element(by.xpath("//td[.='No Item Found']")).getText().then(function (text) {
      browser.wait(EC.presenceOf(element(by.xpath("//td[.='No Item Found']"))),50000)
      expect(text).toEqual('No Item Found');
    });
  });

  it('Shop: Shows recently ordered items appear on page on selecting Recently ordered radio button', function () {
    browser.wait(EC.elementToBeClickable(element(by.linkText('Shop'))), 20000);
    element(by.linkText('Shop')).click();
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear();
    expect(browser.getTitle()).toEqual('Shop');
    browser.wait(EC.elementToBeClickable($('[name="optionsRadios"][value="1"]')), 20000);
    $('[name="optionsRadios"][value="1"]').click();
    var items = element.all(by.repeater('item in items'));
    if (items.count() > 0) {
      expect(items.count()).toBeGreaterThan(0);
    }
    browser.sleep(2000);
  });

  it('Shop: Shows Most ordered items with Po count column sort descending if default layout is selected.', function () {
    browser.wait(EC.elementToBeClickable($('[name="optionsRadios"][value="2"]')), 20000);
    $('[name="optionsRadios"][value="2"]').click();
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear();
    browser.sleep(2000);
    var items = element.all(by.repeater('item in items'));
    if (items.count() > 0) {
      expect(items.count()).toBeGreaterThan(0);
    }
  });

  it('Shop: Shows all items that are marked as Favorite.', function () {
    browser.wait(EC.elementToBeClickable($('[name="optionsRadios"][value="5"]')), 20000);
    $('[name="optionsRadios"][value="5"]').click();
    expect(EC.presenceOf(element(by.className("fa fa-star"))), 20000);
    expect(element(by.className("fa fa-star")).isPresent()).toBe(true);
  });

  // xit('shop: backorder warning', function () {
  //   $('[name="optionsRadios"][value="0"]').click();
  //   var item_name = element.all(by.repeater('item in items track by item.facility_item_vendor_id'));
  //   browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
  //   var backorder = element(by.className('text-with-tooltip text-danger'));
  //   var next_button = element(by.linkText('Next'));
  //   var next_disable = element(by.className('pagination-next disabled'));
  //   var paginationsize = element.all(by.repeater('page in pages track by $index'));
  //   var item_description = element.all(by.repeater('item in items track by item.facility_item_vendor_id'));
  //   var threedit_button = element(by.linkText('...'));
  //   var nextthreedot_button = element(by.xpath('//div[@class="col-sm-10"]//li[9]//a[1]'));
  //   paginationsize.getText().then(function (size) {
  //     for (i = 0; i < size.length; i++) {
  //       console.log('pagination count are', size[i]);
  //       if (next_button.isPresent()) {
  //         next_button.click();
  //         item_description.element(by.className('text-with-tooltip text-danger')).isPresent().getText().then(function (test) {
  //           console.log('item are', test);
  //         })
  //       }

  //     }

  //   })

  // });
});