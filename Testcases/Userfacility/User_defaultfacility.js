describe('user default facility', function () {
  var EC = protractor.ExpectedConditions;
  var userdropdown = element(by.xpath('//*[@id="wrapper"]/div/div/div[2]/ul[1]/li/a'));
  var user_profile = element(by.xpath('//a[contains(text(),"Profile")]'));
  var userfacility = browser.params.userfacility.facility_xpath;
  var userInventory = browser.params.userfacility.Inventory;
  var randNumber = browser.params.itemCatalog.randNumber;
  var fac_name = "";
  it('user default facility is', function () {
    browser.wait(EC.elementToBeClickable(userdropdown), 20000);
    userdropdown.click();
    browser.wait(EC.elementToBeClickable(user_profile), 20000);
    user_profile.click();
    element(by.xpath(userfacility)).getText().then(function (facility_name) {
      console.log('user default facility is', facility_name);
      browser.params.user.fac_name = facility_name;
      browser.sleep(2000);
      console.log(browser.params.user.fac_name);
      expect(browser.getTitle()).toEqual('User Profile');
    })

    element(by.xpath(userInventory)).getText().then(function (InventoryName) {
      console.log('user default Inventory is', InventoryName);
      browser.params.user.Inv_name = InventoryName;
      browser.sleep(2000);
      console.log(browser.params.user.fac_name);
      expect(browser.getTitle()).toEqual('User Profile');
    })
  });

});