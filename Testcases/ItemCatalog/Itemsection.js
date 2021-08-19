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


  it('Item Catalog page should open', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.css("a.hybrent-blue")).click();
    browser.sleep(2000);
    element(by.linkText('Items Catalog')).click();
    expect(browser.getTitle()).toEqual('Items Catalog : List');
  });

  it('List page should display list of items and IC filters', function () {
    browser.sleep(2000);
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

  it('verify that all the status option appear under the status dropdown', function () {
    element(by.model('searchParams.is_active')).
    all(by.tagName('option')).getText().then(function (status) {
      console.log(status);
      var myoption = status;
      expect(myoption).toEqual(['All', 'Active', 'InActive', 'Freehand']);
    });

  });

  it('verify that Both, Inventory Item, Non-inventoryitem option appear under the type dropdown', function () {
    element(by.model('searchParams.type')).
    all(by.tagName('option')).getText().then(function (status) {
      console.log(status);
      var myoption = status;
      expect(myoption).toEqual(['Both', 'Inventory Item', 'Non-Inventory Item']);
    });

  });

  xit('verify all category option appear under the category dropdown', function () {
    element(by.model('searchParams.category_id')).
    all(by.tagName('option')).getText().then(function (status) {
      console.log(status);
      var myoption = status;
      expect(myoption).toEqual(jasmine.arrayContaining(['All Categories', 'Amenity', 'Consignment', 'HYBRENT1', 'Kit']));
    });

  });

  it('verify all ordering_type option appear under the ordering_type dropdown', function () {
    element(by.model('searchParams.ordering_type')).
    all(by.tagName('option')).getText().then(function (status) {
      console.log(status);
      var myoption = status;
      expect(myoption).toEqual(['All', 'Amenity', 'Bill-Only', 'Consignment', 'DME', 'Free-Hand', 'General', 'KIT', 'Service']);
    });

  });

  it('verify all consumption_type option appear under the consumption_type dropdown', function () {
    element(by.model('searchParams.consumption_type')).
    all(by.tagName('option')).getText().then(function (status) {
      console.log(status);
      var myoption = status;
      expect(myoption).toEqual(['All', 'Piece', 'Length', 'Weight', 'Liquid', 'Drops', 'Sprays']);
    });

  });

  it('Add Dme Item', function () {
    browser.sleep(3000);
    element(by.className("btn btn-default dropdown-toggle margin-r-0")).click();
    browser.sleep(2000);
    element(by.xpath("//a[.='Add Item']")).click();
    browser.sleep(3000);
    element(by.model('item.description')).sendKeys(Dme_item_name + randNumber);
    element(by.model('item.mfr_number')).sendKeys(Dme_mfr + randNumber);
    element(by.css('button > i.fa-ellipsis-h')).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 10000);
    element(by.buttonText('Select')).click();
    // element(by.model('item.item_identifier')).sendKeys('item identy1' + randNumber);
    element(by.model('item.ordering_type')).element(by.xpath('//*[@id="ordering_type"]/option[4]')).click();
    element(by.model('item.consumption_type')).$('[label="' + consumptionType + '"]').click();
    browser.sleep(2000);
    element(by.model('item.item_type')).$('[label="' + Item_Type + '"]').click();
    element(by.linkText('Vendors')).click();
    element(by.css('.btn-success')).click();
    element(by.model('v.vselected')).click();
    element(by.cssContainingText('span.ui-select-choices-row-inner > span', vendor)).click();
    element(by.model('v.sku')).sendKeys(Dme_sku + randNumber);
    element(by.buttonText('Save')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Item added successfully.');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Yes'))), 5000);
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('No')).click();
    browser.sleep(2000);
  });

  it('Verify that "Map Facility for item Sku --- pop up appears for DME item on the screen.', function () {
    element(by.model('searchParams.search')).clear().sendKeys(Dme_mfr + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.css(".margin-r-30")).getText().then(function (text) {

        expect(text).toEqual(Dme_mfr + randNumber);
        console.log(text);

      })
      browser.sleep(4000);
      element(by.xpath('(//span[@id="btnAdd"])[2]')).click();
      // element(by.xpath("//button[contains(text(),'Map Facility')]")).click();
      browser.sleep(2000);
      expect(element(by.css('.headtext > div.row > div.col-sm-17', 'Map Facility for')).isPresent()).toBeTruthy();
      element(by.model('searchForm.search')).clear().sendKeys(browser.params.user.fac_name);
      element(by.buttonText('Search')).click();
      browser.sleep(2000);
      element(by.css(".border-top")).getText().then(function (text) {
        expect(text).toContain(browser.params.user.fac_name);
      })
      browser.sleep(2000);
      expect(element(by.buttonText('Add to facility')).isPresent()).toBeTruthy();
      element(by.buttonText('Add to facility')).click();
      browser.sleep(1000);
      element(by.name('purchase_price')).sendKeys('12.52');
      browser.sleep(1000);
      element(by.name('billable_price')).sendKeys('0.20');
      element(by.buttonText('Save')).click();
      browser.sleep(2000);
      expect($('.toast-message').getText()).toEqual('Item added successfully.');
      // expect(element(by.buttonText('Edit')).isPresent()).toBeTruthy();
      // element(by.model('itemVendorFacility.purchase_price')).getAttribute('value').then(function (text) {
      //   expect(text).toEqual('12.52');
      // });

      element(by.xpath("//i[@class='fa fa-2x fa-times']")).click();
    });
  });

  it('Add General Item', function () {
    browser.sleep(2000);
    element(by.className("btn btn-default dropdown-toggle margin-r-0")).click();
    browser.sleep(2000);
    element(by.xpath("//a[.='Add Item']")).click();
    browser.sleep(2000);
    element(by.model('item.description')).sendKeys(General_item_Name + randNumber);
    element(by.model('item.alias')).sendKeys(General_alias + randNumber);
    element(by.model('item.mfr_number')).sendKeys(General_mfrNumber + randNumber);
    // element(by.model('item.item_identifier')).sendKeys('item identy' + randNumber);
    browser.sleep(1000);
    element(by.css('button > i.fa-ellipsis-h')).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 5000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    var lot = element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(0);
    lot.click();
    browser.sleep(1000);
    var serial = element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(1);
    serial.click();
    browser.sleep(1000);
    var expiration_date = element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(2);
    expiration_date.click();
    browser.sleep(1000);
    element(by.model('item.consumption_type')).$('[label="' + consumptionType + '"]').click();
    browser.sleep(2000);
    element(by.model('item.item_type')).$('[label="' + Item_Type + '"]').click();
    element(by.linkText('Vendors')).click();
    element(by.css('.btn-success')).click();
    element(by.model('v.vselected')).click();
    element(by.cssContainingText('span.ui-select-choices-row-inner > span', vendor)).click();
    element(by.model('v.sku')).sendKeys(General_sku + randNumber);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Item added successfully.');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Yes'))), 5000);
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('No')).click();


  });

  it('Verify that "Map Facility for item Sku --- pop up appears for general item on the screen.', function () {
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.css(".margin-r-30")).getText().then(function (text) {

        expect(text).toEqual(General_mfrNumber + randNumber);
        console.log(text);

      })
      browser.sleep(4000);
      element(by.xpath("//button[contains(text(),'Map Facility')]")).click();
      browser.sleep(2000);
      expect(element(by.css('.headtext > div.row > div.col-sm-17', 'Map Facility for')).isPresent()).toBeTruthy();
      element(by.model('searchForm.search')).clear().sendKeys(browser.params.user.fac_name);
      element(by.buttonText('Search')).click();
      browser.sleep(2000);
      element(by.css(".border-top")).getText().then(function (text) {
        expect(text).toContain(browser.params.user.fac_name);
      })
      browser.sleep(2000);
      expect(element(by.buttonText('Add to facility')).isPresent()).toBeTruthy();
      element(by.buttonText('Add to facility')).click();
      browser.sleep(1000);
      element(by.name('purchase_price')).sendKeys('12.52');
      browser.sleep(1000);
      element(by.name('billable_price')).sendKeys('0.20');
      element(by.buttonText('Save')).click();
      browser.sleep(2000);
      expect($('.toast-message').getText()).toEqual('Item added successfully.');
      // expect(element(by.buttonText('Edit')).isPresent()).toBeTruthy();
      // element(by.model('itemVendorFacility.purchase_price')).getAttribute('value').then(function (text) {
      //   expect(text).toEqual('12.52');
      // });

      element(by.xpath("//i[@class='fa fa-2x fa-times']")).click();
    });
  });

  it('Add consignment Item', function () {
    element(by.className("btn btn-default dropdown-toggle margin-r-0")).click();
    element(by.xpath("//a[.='Add Item']")).click();
    browser.sleep(2000);
    element(by.model('item.description')).sendKeys(Consignment_itemname + randNumber);
    element(by.model('item.alias')).sendKeys(consignment_Item_Alias + randNumber);
    element(by.model('item.mfr_number')).sendKeys(consignment_Item_Mfr + randNumber);
    // element(by.model('item.item_identifier')).sendKeys('item identy2' + randNumber);
    browser.sleep(1000);
    element(by.css('button > i.fa-ellipsis-h')).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 5000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    var lot = element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(0);
    lot.click();
    browser.sleep(1000);
    var serial = element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(1);
    serial.click();
    browser.sleep(1000);
    var expiration_date = element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(2);
    expiration_date.click();
    browser.sleep(1000);
    element(by.model('item.ordering_type')).element(by.xpath('//*[@id="ordering_type"]/option[3]')).click();
    element(by.model('item.consumption_type')).$('[label="' + consumptionType + '"]').click();
    browser.sleep(2000);
    element(by.model('item.item_type')).$('[label="' + Item_Type + '"]').click();
    element(by.linkText('Vendors')).click();
    element(by.css('.btn-success')).click();
    element(by.model('v.vselected')).click();
    element(by.cssContainingText('span.ui-select-choices-row-inner > span', vendor)).click();
    element(by.model('v.sku')).sendKeys(consignment_Item_SKu + randNumber);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Item added successfully.');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Yes'))), 5000);
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('No')).click();


  });

  it('Verify that user should able to map consignment item with user default facility', function () {
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear().sendKeys(consignment_Item_SKu + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.css(".margin-r-30")).getText().then(function (text) {

        expect(text).toEqual(consignment_Item_Mfr + randNumber);
        console.log(text);

      })
      browser.sleep(4000);
      element(by.xpath("//button[contains(text(),'Map Facility')]")).click();
      browser.sleep(2000);
      expect(element(by.css('.headtext > div.row > div.col-sm-17', 'Map Facility for')).isPresent()).toBeTruthy();
      element(by.model('searchForm.search')).clear().sendKeys(browser.params.user.fac_name);
      element(by.buttonText('Search')).click();
      browser.sleep(2000);
      element(by.css(".border-top")).getText().then(function (text) {
        expect(text).toContain(browser.params.user.fac_name);
      })
      browser.sleep(2000);
      expect(element(by.buttonText('Add to facility')).isPresent()).toBeTruthy();
      element(by.buttonText('Add to facility')).click();
      browser.sleep(1000);
      element(by.name('purchase_price')).sendKeys('12.52');
      browser.sleep(1000);
      element(by.name('billable_price')).sendKeys('0.20');
      element(by.buttonText('Save')).click();
      browser.sleep(2000);
      expect($('.toast-message').getText()).toEqual('Item added successfully.');
      // expect(element(by.buttonText('Edit')).isPresent()).toBeTruthy();
      // element(by.model('itemVendorFacility.purchase_price')).getAttribute('value').then(function (text) {
      //   expect(text).toEqual('12.52');
      // });

      element(by.xpath("//i[@class='fa fa-2x fa-times']")).click();
    });
  });


  it('Add Bill Only Item', function () {
    element(by.className("btn btn-default dropdown-toggle margin-r-0")).click();
    element(by.xpath("//a[.='Add Item']")).click();
    browser.sleep(2000);
    element(by.model('item.description')).sendKeys(Billonly_item_name + randNumber);
    element(by.model('item.alias')).sendKeys(Billonly_alias + randNumber);
    element(by.model('item.mfr_number')).sendKeys(Billonly_mfr + randNumber);
    // element(by.model('item.item_identifier')).sendKeys('item identy3' + randNumber);
    browser.sleep(1000);
    element(by.css('button > i.fa-ellipsis-h')).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 5000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element(by.model('item.ordering_type')).element(by.xpath('//*[@id="ordering_type"]/option[2]')).click();
    element(by.model('item.consumption_type')).$('[label="' + consumptionType + '"]').click();
    browser.sleep(2000);
    element(by.model('item.item_type')).$('[label="' + 'Non Inventory' + '"]').click();
    element(by.linkText('Vendors')).click();
    element(by.css('.btn-success')).click();
    element(by.model('v.vselected')).click();
    element(by.cssContainingText('span.ui-select-choices-row-inner > span', vendor)).click();
    element(by.model('v.sku')).sendKeys(Billonly_sku + randNumber);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Item added successfully.');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Yes'))), 5000);
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('No')).click();


  });

  it('Verify that user should able to map Bill only item with user default facility', function () {
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear().sendKeys(Billonly_mfr + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.css(".margin-r-30")).getText().then(function (text) {

        expect(text).toEqual(Billonly_mfr + randNumber);
        console.log(text);

      })
      browser.sleep(4000);
      element(by.xpath("//button[contains(text(),'Map Facility')]")).click();
      browser.sleep(2000);
      expect(element(by.css('.headtext > div.row > div.col-sm-17', 'Map Facility for')).isPresent()).toBeTruthy();
      element(by.model('searchForm.search')).clear().sendKeys(browser.params.user.fac_name);
      element(by.buttonText('Search')).click();
      browser.sleep(2000);
      element(by.css(".border-top")).getText().then(function (text) {
        expect(text).toContain(browser.params.user.fac_name);
      })
      browser.sleep(2000);
      expect(element(by.buttonText('Add to facility')).isPresent()).toBeTruthy();
      element(by.buttonText('Add to facility')).click();
      browser.sleep(1000);
      element(by.name('purchase_price')).sendKeys('12.52');
      browser.sleep(1000);
      element(by.name('billable_price')).sendKeys('0.20');
      element(by.buttonText('Save')).click();
      browser.sleep(2000);
      expect($('.toast-message').getText()).toEqual('Item added successfully.');
      // expect(element(by.buttonText('Edit')).isPresent()).toBeTruthy();
      // element(by.model('itemVendorFacility.purchase_price')).getAttribute('value').then(function (text) {
      //   expect(text).toEqual('12.52');
      // });

      element(by.xpath("//i[@class='fa fa-2x fa-times']")).click();
    });
  });

  it('Add Amenity item', function () {
    element(by.xpath('//span[@class="fa fa-caret-down"]')).click();
    element(by.xpath("//a[.='Add Amenity']")).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.model('amenity.description')).sendKeys('testAM' + randNumber);
    element(by.model('amenity.alias')).sendKeys('amenityalias' + randNumber);
    element(by.model('amenity.service_duration')).$('[label="' + 'For One Time' + '"]').click();
    browser.sleep(1000);
    element(by.buttonText('Save')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Amenity saved successfully.');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Yes'))), 5000);
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('No')).click();
  });

  it('Verify that user should able to map Amenity item with user default facility', function () {
    browser.sleep(2000);
    element(by.model('searchParams.search')).clear().sendKeys('testAM' + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.css("mark")).getText().then(function (text) {

        expect(text).toEqual('testAM' + randNumber);
        console.log(text);

      })
      browser.sleep(4000);
      element(by.xpath("//button[contains(text(),'Map Facility')]")).click();
      browser.sleep(2000);
      expect(element(by.css('.headtext > div.row > div.col-sm-17', 'Map Facility for')).isPresent()).toBeTruthy();
      element(by.model('searchForm.search')).clear().sendKeys(browser.params.user.fac_name);
      element(by.buttonText('Search')).click();
      browser.sleep(2000);
      element(by.css(".border-top")).getText().then(function (text) {
        expect(text).toContain(browser.params.user.fac_name);
      })
      browser.sleep(2000);
      expect(element(by.buttonText('Add to facility')).isPresent()).toBeTruthy();
      element(by.buttonText('Add to facility')).click();
      browser.sleep(1000);
      element(by.model('$parent.$data')).sendKeys('0.20');
      element(by.buttonText('Save')).click();
      browser.sleep(2000);
      expect($('.toast-message').getText()).toEqual('Item added successfully.');
      browser.sleep(2000);
      element(by.xpath("//i[@class='fa fa-2x fa-times']")).click();
    });
  });





  /* it('Edit Item', function () {
       element(by.buttonText('Edit Item')).click();
       var randNumber = Math.floor((Math.random() * 10) + 2);
       element(by.model('item.description')).sendKeys(randNumber);
       var itemName = element(by.model('item.description')).getAttribute('value');
       element(by.buttonText('Save')).click();
       element(by.model('searchParams.search')).clear().sendKeys(itemName);
       element(by.buttonText('Search')).click();
       element.all(by.repeater('item in items')).each(function (element1, index) {
           element1.element(by.binding('item.description')).getText().then(function (text) {
               expect(text).toEqual(itemName);
           });
       });
   }); */
});