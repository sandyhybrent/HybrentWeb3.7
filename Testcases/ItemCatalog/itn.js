describe('Hybrent Item Catalog Module', function () {

  var EC = protractor.ExpectedConditions;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var Service_item_name = browser.params.itemCatalog.Service_item_name;
  var Billonly_item_name = browser.params.itemCatalog.Billonly_item_name;
  var Freehand_item_name = browser.params.itemCatalog.Freehand_item_name;
  var General_alias = browser.params.itemCatalog.General_alias;
  var Service_alias = browser.params.itemCatalog.Service_alias;
  var Billonly_alias = browser.params.itemCatalog.Billonly_alias;
  var Service_sku = browser.params.itemCatalog.Service_sku;
  var General_sku = browser.params.itemCatalog.General_sku;
  var Billonly_sku = browser.params.itemCatalog.Billonly_sku;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var Service_mfrNumber = browser.params.itemCatalog.Service_mfrNumber;
  var Billonly_mfr = browser.params.itemCatalog.Billonly_mfr;
  var vendor = browser.params.itemCatalog.vendor;
  var Generalcategory = browser.params.itemCatalog.Generalcategory;
  var facility = browser.params.itemCatalog.facility;
  var itemForVendorUpdate = browser.params.itemCatalog.General_sku;
  var stockStatus = browser.params.itemCatalog.General_sku;
  var consumptionType = browser.params.itemCatalog.consumptionType;
  var Item_Type = browser.params.itemCatalog.Item_Type;
  var randNumber = browser.params.itemCatalog.randNumber;
  var userdropdown = element(by.className('dropdown-toggle text-info header-menu-tab'));
  var user_profile = element(by.xpath('//a[@ng-href="#/user/update-profile"]'));
  var userfacility = browser.params.userfacility.facility_xpath;
  var fac_name = browser.params.user.fac_name;
  var Dme_sku = browser.params.itemCatalog.Dme_sku;
  var Dme_item_name = browser.params.itemCatalog.Dme_item_name;
  var Dme_Alias = browser.params.itemCatalog.Dme_Alias;
  var Dme_mfr = browser.params.itemCatalog.Dme_mfr;
  var ARC = browser.params.AR_Code.Code;
  var Consignment = browser.params.itemCatalog.Consignment;
  var Con_sku = browser.params.itemCatalog.Con_sku;
  var randomnumber = browser.params.Vendor_price_tier.randompricetier;
  var Inventory_name = browser.params.user.Inv_name;


  it('Item Catalog page should open', async function () {
    browser.wait(EC.elementToBeClickable(element(by.css("a.hybrent-blue"))),20000);
    await element(by.css("a.hybrent-blue")).click();
    browser.sleep(1000);
    await element(by.linkText('Items Catalog')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    expect(browser.getTitle()).toEqual('Items Catalog : List');
  });

  it('List page should display list of items and IC filters', function () {
    browser.sleep(2000);
    browser.wait(EC.presenceOf(element.all(by.repeater('item in items'))), 20000);
    expect(element.all(by.repeater('item in items')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.stock_info')).isPresent()).toBeTruthy();
    expect(element(by.xpath("//form[@class='form-inline ng-pristine ng-valid']/div[3]//a[contains(.,'Select')]")).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.is_active')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.type')).isPresent()).toBeTruthy();
    expect(element(by.xpath("//form[@class='form-inline ng-pristine ng-valid']/div[6]//a[contains(.,'Select')]")).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.ordering_type')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.consumption_type')).isPresent()).toBeTruthy();
  });

  it('verify that all the status option appear under the status dropdown', async function () {
    await element(by.model('searchParams.is_active')).
    all(by.tagName('option')).getText().then(function (status) {
      console.log(status);
      var myoption = status;
      expect(myoption).toEqual(['All', 'Active', 'InActive', 'Freehand']);
    });

  });

  it('verify that Both, Inventory Item, Non-inventoryitem option appear under the type dropdown', async function () {
    await element(by.model('searchParams.type')).
    all(by.tagName('option')).getText().then(function (status) {
      console.log(status);
      var myoption = status;
      expect(myoption).toEqual(['Both', 'Inventory Item', 'Non-Inventory Item']);
    });

  });

  it('verify all ordering_type option appear under the ordering_type dropdown', async function () {
    await element(by.model('searchParams.ordering_type')).
    all(by.tagName('option')).getText().then(function (status) {
      console.log(status);
      var myoption = status;
      expect(myoption).toEqual(['All', 'Amenity', 'Bill-Only', 'Consignment', 'DME', 'Free-Hand', 'General', 'KIT', 'Service']);
    });

  });

  it('verify all consumption_type option appear under the consumption_type dropdown', async function () {
    await element(by.model('searchParams.consumption_type')).
    all(by.tagName('option')).getText().then(function (status) {
      console.log(status);
      var myoption = status;
      expect(myoption).toEqual(['All', 'Piece', 'Length', 'Weight', 'Liquid', 'Drops', 'Sprays']);
    });

  });

  it('Add a general item', async function(){
    try {
    browser.wait(EC.elementToBeClickable(element(by.css(".btn-default"))),20000);
    await element(by.css(".btn-default")).click();
    browser.wait(EC.elementToBeClickable(element(by.xpath("//a[.='Add Item']"))),20000);
    await element(by.xpath("//a[.='Add Item']")).click();
    browser.wait(EC.presenceOf(element(by.model('item.description'))), 20000);
    await element(by.model('item.description')).sendKeys(General_item_Name + randNumber);
    await element(by.model('item.alias')).sendKeys(General_alias + randNumber);
    await element(by.model('item.mfr_number')).sendKeys(General_mfrNumber + randNumber);
    await element(by.xpath("//button[@class='btn btn-default']")).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 20000);
    await element.all(by.buttonText('Select')).get(1).click();
    browser.sleep(1000);
    var item_identifier = await element(by.css("input[ng-model='item.item_identifier']"));
    item_identifier.isPresent().then(async function(present){
      if(present){
        await item_identifier.sendKeys('GI' + randNumber);
      } else {
        console.log('click on lot toggle button');
      }
    })
    var lot = await element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(0);
    lot.click();
    var serial = await element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(1);
    serial.click();
    var expiration_date = await element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(2);
    expiration_date.click();
    browser.sleep(1000);
    await element(by.model('item.item_type')).$('[label="' + Item_Type + '"]').click();
    browser.sleep(1000);
    await element(by.model('item.consumption_type')).$('[label="' + consumptionType + '"]').click();
    await element(by.linkText('Vendors')).click();
    await element(by.css('.btn-success')).click();
    await element(by.model('v.vselected')).click();
    await element(by.cssContainingText('span.ui-select-choices-row-inner > span', vendor)).click();
    await element(by.model('v.sku')).sendKeys(General_sku + randNumber);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))),20000);
    await element(by.buttonText('Save')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Item added successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Item added successfully.');
    browser.wait(EC.elementToBeClickable(element(by.css('.sa-button-container')).element(by.buttonText('No'))), 5000);
    await element(by.css('.sa-button-container')).element(by.buttonText('No')).click();
    }
    catch {
      console.log('consumption type not found');
    }
  });

  it('Verify that user should able to map new created general Item with own facility', async function () {
    browser.wait(EC.visibilityOf(element(by.model('searchParams.search'))),20000);
    await element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    await element(by.buttonText('Search')).click();
    browser.wait(EC.visibilityOf(element(by.xpath("(//mark[@data-markjs='true'])[1]"))), 20000);
    element.all(by.repeater('item in items')).each(async function (element1) {
      await element1.element(by.xpath("(//mark[@data-markjs='true'])[1]")).getText().then(async function (itemmfr) {
        console.log(itemmfr);
        browser.wait(EC.textToBePresentInElement(element(by.xpath("(//mark[@data-markjs='true'])[1]")), General_sku + randNumber), 20000);
        expect(await itemmfr).toEqual(General_sku + randNumber);
      })
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[contains(text(),'Map Facility')]"))),20000);
      await element(by.xpath("//button[contains(text(),'Map Facility')]")).click();
      browser.wait(EC.visibilityOf(element(by.css('.headtext > div.row > div.col-sm-17', 'Map Facility for'))),20000);
      expect(element(by.css('.headtext > div.row > div.col-sm-17', 'Map Facility for')).isPresent()).toBeTruthy();
      browser.wait(EC.visibilityOf(element(by.model('searchForm.search'))),20000);
      await element(by.model('searchForm.search')).clear().sendKeys(browser.params.user.fac_name);
      await element(by.buttonText('Search')).click();
      browser.wait(EC.presenceOf(element(by.buttonText('Add to facility'))), 20000);
      await element(by.css(".border-top")).getText().then(function (text) {
        expect(text).toContain(browser.params.user.fac_name);
      })
      browser.sleep(2000);
      expect(element(by.buttonText('Add to facility')).isPresent()).toBeTruthy();
      await element(by.buttonText('Add to facility')).click();
      browser.sleep(1000);
      await element(by.name('purchase_price')).sendKeys('12.52');
      await element(by.name('billable_price')).sendKeys('0.20');
      browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))),20000);
      await element(by.buttonText('Save')).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'Item added successfully.'), 20000);
      expect($('.toast-message').getText()).toEqual('Item added successfully.');
      browser.wait(EC.elementToBeClickable(element(by.xpath("//i[@class='fa fa-2x fa-times']"))),20000);
      await element(by.xpath("//i[@class='fa fa-2x fa-times']")).click();
    });
  })

  it('Add a consignment item', async function(){
    try {
    browser.sleep(3000);
    browser.wait(EC.elementToBeClickable(element(by.css(".btn-default"))),20000);
    await element(by.css(".btn-default")).click();
    browser.sleep(1000);
    await element(by.xpath("//a[.='Add Item']")).click();
    browser.wait(EC.presenceOf(element(by.model('item.description'))), 20000);
    await element(by.model('item.description')).sendKeys(Consignment + randNumber);
    await element(by.model('item.alias')).sendKeys('Consignment' + randNumber);
    await element(by.model('item.mfr_number')).sendKeys("cmfr" + randNumber);
    await element(by.xpath("//button[@class='btn btn-default']")).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 20000);
    await element.all(by.buttonText('Select')).get(1).click();
    browser.sleep(1000);
    var item_identifier = await element(by.css("input[ng-model='item.item_identifier']"));
    item_identifier.isPresent().then(async function(present){
      if(present){
        await item_identifier.sendKeys('Con' + randNumber);
      } else {
        console.log('click on lot toggle button');
      }
    })
    var lot = await element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(0);
    lot.click();
    var serial = await element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(1);
    serial.click();
    var expiration_date = await element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(2);
    expiration_date.click();
    browser.sleep(1000);
    element(by.model('item.ordering_type')).element(by.xpath('//*[@id="ordering_type"]/option[3]')).click();
    browser.sleep(1000);
    await element(by.model('item.item_type')).$('[label="' + Item_Type + '"]').click();
    browser.sleep(1000);
    await element(by.model('item.consumption_type')).$('[label="' + consumptionType + '"]').click();
    await element(by.linkText('Vendors')).click();
    await element(by.css('.btn-success')).click();
    await element(by.model('v.vselected')).click();
    await element(by.cssContainingText('span.ui-select-choices-row-inner > span', vendor)).click();
    await element(by.model('v.sku')).sendKeys(Con_sku + randNumber);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))),20000);
    await element(by.buttonText('Save')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Item added successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Item added successfully.');
    browser.wait(EC.elementToBeClickable(element(by.css('.sa-button-container')).element(by.buttonText('No'))), 5000);
    await element(by.css('.sa-button-container')).element(by.buttonText('No')).click();
    }
    catch {
      console.log('consumption type not found');
    }
  });

  it('Verify that user should able to map new created consignment Item with his default facility', async function () {
    browser.sleep(1000);
    await element(by.model('searchParams.search')).clear().sendKeys(Con_sku + randNumber);
    browser.sleep(1000);
    await element(by.buttonText('Search')).click();
    browser.wait(EC.textToBePresentInElement(element(by.className("margin-r-30")), 'cmfr'+randNumber), 20000);
    element.all(by.repeater('item in items')).each(async function (element1) {
      await element1.element(by.className("margin-r-30")).getText().then(async function (itemmfr) {
        console.log(itemmfr);
        browser.wait(EC.textToBePresentInElement(element(by.className("margin-r-30")), 'cmfr' + randNumber), 20000);
        expect(await itemmfr).toEqual('cmfr' + randNumber);
    });
      browser.sleep(2000);
      await element(by.xpath("//button[contains(text(),'Map Facility')]")).click();
      browser.sleep(2000);
      expect(element(by.css('.headtext > div.row > div.col-sm-17', 'Map Facility for')).isPresent()).toBeTruthy();
      browser.sleep(1000);
      await element(by.model('searchForm.search')).clear().sendKeys(browser.params.user.fac_name);
      await element(by.buttonText('Search')).click();
      browser.wait(EC.presenceOf(element(by.buttonText('Add to facility'))), 20000);
      await element(by.css(".border-top")).getText().then(function (text) {
        expect(text).toContain(browser.params.user.fac_name);
      })
      browser.sleep(2000);
      expect(element(by.buttonText('Add to facility')).isPresent()).toBeTruthy();
      await element(by.buttonText('Add to facility')).click();
      browser.sleep(1000);
      await element(by.name('purchase_price')).sendKeys('12.52');
      await element(by.name('billable_price')).sendKeys('0.20');
      browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))),20000);
      await element(by.buttonText('Save')).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'Item added successfully.'), 20000);
      expect($('.toast-message').getText()).toEqual('Item added successfully.');
      browser.wait(EC.elementToBeClickable(element(by.xpath("//i[@class='fa fa-2x fa-times']"))),20000);
      await element(by.xpath("//i[@class='fa fa-2x fa-times']")).click();
    });
  });

  it('Add a DME item', async function(){
    try {
    browser.sleep(3000);
    browser.wait(EC.elementToBeClickable(element(by.css(".btn-default"))),20000);
    await element(by.css(".btn-default")).click();
    browser.sleep(1000);
    await element(by.xpath("//a[.='Add Item']")).click();
    browser.wait(EC.presenceOf(element(by.model('item.description'))), 20000);
    await element(by.model('item.description')).sendKeys(Dme_item_name + randNumber);
    await element(by.model('item.alias')).sendKeys('DmeAlias' + randNumber);
    await element(by.model('item.mfr_number')).sendKeys(Dme_mfr + randNumber);
    await element(by.xpath("//button[@class='btn btn-default']")).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 20000);
    await element.all(by.buttonText('Select')).get(1).click();
    browser.sleep(1000);
    var item_identifier = await element(by.css("input[ng-model='item.item_identifier']"));
    item_identifier.isPresent().then(async function(present){
      if(present){
        await item_identifier.sendKeys('Dme' + randNumber);
      } else {
        console.log('click on lot toggle button');
      }
    })
    browser.sleep(1000);
    element(by.model('item.ordering_type')).element(by.xpath('//*[@id="ordering_type"]/option[4]')).click();
    browser.sleep(1000);
    await element(by.model('item.consumption_type')).$('[label="' + consumptionType + '"]').click();
    browser.sleep(1000);
    element(by.model('item.item_type')).$('[label="' + Item_Type + '"]').click();
    browser.sleep(1000);
    await element(by.linkText('Vendors')).click();
    await element(by.css('.btn-success')).click();
    await element(by.model('v.vselected')).click();
    await element(by.cssContainingText('span.ui-select-choices-row-inner > span', vendor)).click();
    await element(by.model('v.sku')).sendKeys(Dme_sku + randNumber);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))),20000);
    await element(by.buttonText('Save')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Item added successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Item added successfully.');
    browser.wait(EC.elementToBeClickable(element(by.css('.sa-button-container')).element(by.buttonText('No'))), 5000);
    await element(by.css('.sa-button-container')).element(by.buttonText('No')).click();
    }
    catch {
      console.log('consumption type not found');
    }
  });

  it('Verify that user should able to map new created DME Item with his default facility', async function () {
    browser.sleep(1000);
    await element(by.model('searchParams.search')).clear().sendKeys(Dme_sku + randNumber);
    browser.sleep(1000);
    await element(by.buttonText('Search')).click();
    browser.wait(EC.textToBePresentInElement(element(by.className("margin-r-30")), Dme_mfr+randNumber), 20000);
    element.all(by.repeater('item in items')).each(async function (element1) {
      await element1.element(by.className("margin-r-30")).getText().then(async function (itemmfr) {
        console.log(itemmfr);
        browser.wait(EC.textToBePresentInElement(element(by.className("margin-r-30")), Dme_mfr + randNumber), 20000);
        expect(await itemmfr).toEqual(Dme_mfr + randNumber);
    });
      browser.sleep(2000);
      await element(by.xpath("//button[contains(text(),'Map Facility')]")).click();
      browser.sleep(2000);
      expect(element(by.css('.headtext > div.row > div.col-sm-17', 'Map Facility for')).isPresent()).toBeTruthy();
      browser.sleep(1000);
      await element(by.model('searchForm.search')).clear().sendKeys(browser.params.user.fac_name);
      await element(by.buttonText('Search')).click();
      browser.wait(EC.presenceOf(element(by.buttonText('Add to facility'))), 20000);
      await element(by.css(".border-top")).getText().then(function (text) {
        expect(text).toContain(browser.params.user.fac_name);
      })
      browser.sleep(2000);
      expect(element(by.buttonText('Add to facility')).isPresent()).toBeTruthy();
      await element(by.buttonText('Add to facility')).click();
      browser.sleep(1000);
      await element(by.name('purchase_price')).sendKeys('12.52');
      await element(by.name('billable_price')).sendKeys('0.20');
      browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))),20000);
      await element(by.buttonText('Save')).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'Item added successfully.'), 20000);
      expect($('.toast-message').getText()).toEqual('Item added successfully.');
      browser.wait(EC.elementToBeClickable(element(by.xpath("//i[@class='fa fa-2x fa-times']"))),20000);
      await element(by.xpath("//i[@class='fa fa-2x fa-times']")).click();
    });
  });

  it('Add a Bill Only item', async function(){
    try {
    browser.sleep(3000);
    browser.wait(EC.elementToBeClickable(element(by.css(".btn-default"))),20000);
    await element(by.css(".btn-default")).click();
    browser.sleep(1000);
    await element(by.xpath("//a[.='Add Item']")).click();
    browser.wait(EC.presenceOf(element(by.model('item.description'))), 20000);
    await element(by.model('item.description')).sendKeys(Billonly_item_name + randNumber);
    await element(by.model('item.alias')).sendKeys(Billonly_alias + randNumber);
    await element(by.model('item.mfr_number')).sendKeys(Billonly_mfr + randNumber);
    await element(by.xpath("//button[@class='btn btn-default']")).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 20000);
    await element.all(by.buttonText('Select')).get(1).click();
    browser.sleep(1000);
    var item_identifier = await element(by.css("input[ng-model='item.item_identifier']"));
    item_identifier.isPresent().then(async function(present){
      if(present){
        await item_identifier.sendKeys('Bill' + randNumber);
      } else {
        console.log('click on lot toggle button');
      }
    })
    browser.sleep(1000);
    element(by.model('item.item_type')).$('[label="' + 'Non Inventory' + '"]').click();
    browser.wait(EC.elementToBeClickable(element(by.css("select[name='ordering_type'] > [label='Bill-Only']"))), 20000);
    element(by.css("select[name='ordering_type'] > [label='Bill-Only']")).click();
    browser.wait(EC.elementToBeClickable(element(by.model('item.consumption_type')).$('[label="' + consumptionType + '"]')), 20000);
    await element(by.model('item.consumption_type')).$('[label="' + consumptionType + '"]').click();
    await element(by.linkText('Vendors')).click();
    await element(by.css('.btn-success')).click();
    await element(by.model('v.vselected')).click();
    await element(by.cssContainingText('span.ui-select-choices-row-inner > span', vendor)).click();
    await element(by.model('v.sku')).sendKeys(Billonly_sku + randNumber);
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))),20000);
    await element(by.buttonText('Save')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Item added successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Item added successfully.');
    browser.wait(EC.elementToBeClickable(element(by.css('.sa-button-container')).element(by.buttonText('No'))), 5000);
    await element(by.css('.sa-button-container')).element(by.buttonText('No')).click();
    }
    catch {
      console.log('consumption type not found');
    }
  });

  it('Verify that user should able to map new created Bill Only with his default facility', async function () {
    browser.sleep(1000);
    await element(by.model('searchParams.search')).clear().sendKeys(Billonly_sku + randNumber);
    browser.sleep(1000);
    await element(by.buttonText('Search')).click();
    browser.wait(EC.textToBePresentInElement(element(by.className("margin-r-30")), Billonly_mfr + randNumber), 20000);
    element.all(by.repeater('item in items')).each(async function (element1) {
      await element1.element(by.className("margin-r-30")).getText().then(async function (itemmfr) {
        console.log(itemmfr);
        browser.wait(EC.textToBePresentInElement(element(by.className("margin-r-30")), Billonly_mfr + randNumber), 20000);
        expect(await itemmfr).toEqual(Billonly_mfr + randNumber);
    });
      browser.sleep(2000);
      await element(by.xpath("//button[contains(text(),'Map Facility')]")).click();
      browser.sleep(2000);
      expect(element(by.css('.headtext > div.row > div.col-sm-17', 'Map Facility for')).isPresent()).toBeTruthy();
      browser.sleep(1000);
      await element(by.model('searchForm.search')).clear().sendKeys(browser.params.user.fac_name);
      await element(by.buttonText('Search')).click();
      browser.wait(EC.presenceOf(element(by.buttonText('Add to facility'))), 20000);
      await element(by.css(".border-top")).getText().then(function (text) {
        expect(text).toContain(browser.params.user.fac_name);
      })
      browser.sleep(2000);
      expect(element(by.buttonText('Add to facility')).isPresent()).toBeTruthy();
      await element(by.buttonText('Add to facility')).click();
      browser.sleep(1000);
      await element(by.name('purchase_price')).sendKeys('12.52');
      await element(by.name('billable_price')).sendKeys('0.20');
      browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))),20000);
      await element(by.buttonText('Save')).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'Item added successfully.'), 20000);
      expect($('.toast-message').getText()).toEqual('Item added successfully.');
      browser.wait(EC.elementToBeClickable(element(by.xpath("//i[@class='fa fa-2x fa-times']"))),20000);
      await element(by.xpath("//i[@class='fa fa-2x fa-times']")).click();
    });
  });

  it('Add Amenity item', async function () {
    browser.sleep(3000);
    browser.wait(EC.elementToBeClickable(element(by.css(".btn-default"))),20000);
    await element(by.css(".btn-default")).click();
    browser.sleep(1000);
    await element(by.xpath("//a[.='Add Amenity']")).click();
    browser.wait(EC.presenceOf(element(by.model('amenity.description'))), 20000);
    await element(by.model('amenity.description')).sendKeys('testAM' + randNumber);
    await element(by.model('amenity.alias')).sendKeys('amenityalias' + randNumber);
    await element(by.model('amenity.service_duration')).$('[label="' + 'For One Time' + '"]').click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))),20000);
    await element(by.buttonText('Save')).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'Amenity saved successfully.'), 20000);
    expect($('.toast-message').getText()).toEqual('Amenity saved successfully.');
    browser.wait(EC.elementToBeClickable(element(by.css('.sa-button-container')).element(by.css(".cancel"))), 5000);
    await element(by.css('.sa-button-container')).element(by.css(".cancel")).click();
  });

  it('Verify that user should able to map Amenity item with user default facility', async function () {
    browser.sleep(2000);
    await element(by.model('searchParams.search')).clear().sendKeys('testAM' + randNumber);
    browser.sleep(2000);
    await element(by.buttonText('Search')).click();
    browser.wait(EC.textToBePresentInElement(element(by.tagName("mark")), 'testAM'+ randNumber), 20000);
    element.all(by.repeater('item in items')).each(async function (element1) {
      await element1.element(by.tagName("mark")).getText().then(async function (itemmfr) {
        console.log(itemmfr);
        browser.wait(EC.textToBePresentInElement(element(by.tagName("mark")), 'testAM' + randNumber), 20000);
        expect(await itemmfr).toEqual('testAM' + randNumber);
    });
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[contains(.,'Map Facility/Update Price')]"))), 20000);
      await element(by.xpath("//button[contains(.,'Map Facility/Update Price')]")).click();
      browser.wait(EC.presenceOf(element(by.model('searchForm.search'))), 20000);
      await element(by.model('searchForm.search')).clear().sendKeys(browser.params.user.fac_name);
      browser.wait(EC.elementToBeClickable(element(by.buttonText('Search'))), 20000);
      await element(by.buttonText('Search')).click();
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[contains(.,'Add to facility')]"))), 20000);
      await element(by.xpath("//button[contains(.,'Add to facility')]")).click();
      browser.sleep(1000);
      await element(by.model('$parent.$data')).sendKeys('0.20');
      browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))), 20000);
      await element(by.buttonText('Save')).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'Item added successfully.'), 20000);
      expect($('.toast-message').getText()).toEqual('Item added successfully.');
      browser.wait(EC.elementToBeClickable(element(by.xpath("//i[@class='fa fa-2x fa-times']"))),20000);
      await element(by.xpath("//i[@class='fa fa-2x fa-times']")).click();
    });
  }); 

});