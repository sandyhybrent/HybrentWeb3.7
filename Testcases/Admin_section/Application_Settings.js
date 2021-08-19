describe('Application Settings', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open Application Settings module', function () {
    browser.wait(EC.elementToBeClickable(element(by.cssContainingText('a.hybrent-blue', 'Admin'))), 20000);
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.linkText('Application Settings')).click();
    browser.wait(EC.titleIs('App Settings'), 20000);
    expect(browser.getTitle()).toEqual('App Settings');
  });

  it('Verify that all the application settings should appear on the screen', function(){
    browser.sleep(2000);
    expect(element(by.css(".app-settings-menu > li:nth-of-type(1)")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Order Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Cart Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Facility Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Department Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Contract Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Claim Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='User Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='News Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Dashboard Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Auth Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Billing Reports Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Patient Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Case Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Item Catalog Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Invoice Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Shop Settings']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//li[.='Inventory Settings']")).isPresent()).toBeTruthy();
  });

  it('Verify that general settings should appear on the general setting screen', function(){
    expect(element(by.xpath("//label[.='Default Page Size']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Max Budget Limit']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Bin Location Description']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Default Date Format']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Default Time Format']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the general setting by clicking update button', function(){
    try{
    browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
    element(by.xpath("//button[@class='btn btn-primary']")).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
    expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
    browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    }
    catch (ex) {
      console.log('Data validation error');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    }
  });

  it('Verify that all settings should appear on Order Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Order Settings']"))), 20000);
    element(by.xpath("//li[.='Order Settings']")).click();
    browser.sleep(2000);
    expect(element(by.xpath("//label[.='Max PONUM Length']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Default Order Email']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Default Fax Number']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Max PO Document Limit']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Max PO Item Cost']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='PO Document File Size Limit']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Create Req XML for all POs']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Create Req XML for bill only POs']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Show Bin Location on PO PDF']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='PO PDF Custom Note']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the Order Settings by clicking update button', function(){
    try{
    browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
    element(by.xpath("//button[@class='btn btn-primary']")).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
    expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
    browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    } catch (ex) {
      console.log('Data validation error');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    }
  });

  it('Verify that all settings should appear on Cart Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Cart Settings']"))), 20000);
    element(by.xpath("//li[.='Cart Settings']")).click();
    browser.sleep(2000);
    expect(element(by.xpath("//label[.='Max Items in Cart']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Max Item Quantity in Cart']")).isPresent()).toBeTruthy();
 });

  it('Verify that user should able to update the Cart Settings by clicking update button', function(){
    try{
    browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
    element(by.xpath("//button[@class='btn btn-primary']")).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
    expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
    browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    } catch (ex) {
      console.log('Data validation error');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    }
  });

  it('Verify that all settings should appear on Facility Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Facility Settings']"))), 20000);
    element(by.xpath("//li[.='Facility Settings']")).click();
    browser.sleep(2000);
    expect(element(by.xpath("//label[.='Max number of floors in a building']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Max number of rooms on a floor']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Facility document file size limit']")).isPresent()).toBeTruthy();
    
  });

  it('Verify that user should able to update the Facility Settings by clicking update button', function(){
    try{
    browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
    element(by.xpath("//button[@class='btn btn-primary']")).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
    expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
    browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    } catch (ex) {
      console.log('Data validation error');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    }
  });

  it('Verify that all settings should appear on Department Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Department Settings']"))), 20000);
    element(by.xpath("//li[.='Department Settings']")).click();
    browser.sleep(2000);
    expect(element(by.css(".col-md-4")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the Department Settings by clicking update button', function(){
    try {
    browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
    element(by.xpath("//button[@class='btn btn-primary']")).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
    expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
    browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    } catch (ex) {
      console.log('Data validation error');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    }
  });

  it('Verify that all settings should appear on Contract Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Contract Settings']"))), 20000);
    element(by.xpath("//li[.='Contract Settings']")).click();
    browser.sleep(2000);
    expect(element(by.xpath("//label[.='Max Contract Document Limit']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Max Contract Expiry Mail Users']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Contract document file size limit']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Default Contract Name for Punchout Process']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Default Notification Days for Contract Expiration Notice']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the Contract Settings by clicking update button', function(){
    try {
    browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
    element(by.xpath("//button[@class='btn btn-primary']")).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
    expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
    browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    } catch (ex) {
      console.log('Data validation error');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    }
  });

  it('Verify that all settings should appear on Claim Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Claim Settings']"))), 20000);
    element(by.xpath("//li[.='Claim Settings']")).click();
    browser.sleep(2000);
    expect(element(by.xpath("//label[.='Claim code length']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Claim Document File Size Limit']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the Claim Settings by clicking update button', function(){
    try {
    browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
    element(by.xpath("//button[@class='btn btn-primary']")).click();
    browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
    expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
    browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    } catch (ex) {
      console.log('Data validation error');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
    }
  });

  it('Verify that all settings should appear on User Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='User Settings']"))), 20000);
    element(by.xpath("//li[.='User Settings']")).click();
    browser.sleep(2000);
    expect(element(by.css(".col-md-4")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the User Settings by clicking update button', function(){
    try {
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
      element(by.xpath("//button[@class='btn btn-primary']")).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
      expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      } catch (ex) {
        console.log('Data validation error');
        browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      }
  });

  it('Verify that all settings should appear on News Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='News Settings']"))), 20000);
    element(by.xpath("//li[.='News Settings']")).click();
    browser.sleep(2000);
    expect(element(by.css(".col-md-4")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the News Settings by clicking update button', function(){
    try {
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
      element(by.xpath("//button[@class='btn btn-primary']")).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
      expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      } catch (ex) {
        console.log('Data validation error');
        browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      }
  });

  it('Verify that all settings should appear on Dashboard Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Dashboard Settings']"))), 20000);
    element(by.xpath("//li[.='Dashboard Settings']")).click();
    browser.sleep(2000);
    expect(element(by.xpath("//label[.='Number of Recent News Items Displayed']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Number of Recent POs Displayed']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Number of Stats Displayed']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the Dashboard Settings by clicking update button', function(){
    try {
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
      element(by.xpath("//button[@class='btn btn-primary']")).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
      expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      } catch (ex) {
        console.log('Data validation error');
        browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      }
  });

  it('Verify that all settings should appear on Auth Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Auth Settings']"))), 20000);
    element(by.xpath("//li[.='Auth Settings']")).click();
    browser.sleep(2000);
    expect(element(by.xpath("//label[.='JWT Expiration Time Limit']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='ADFS JWT Client ID']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the Auth Settings by clicking update button', function(){
    try {
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
      element(by.xpath("//button[@class='btn btn-primary']")).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
      expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      } catch (ex) {
        console.log('Data validation error');
        browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      }
  });

  it('Verify that all settings should appear on Billing Reports Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Billing Reports Settings']"))), 20000);
    element(by.xpath("//li[.='Billing Reports Settings']")).click();
    browser.sleep(2000);
    expect(element(by.xpath("//label[.='Item Identifier']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Resident Identifier']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Override cost']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Show description']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='My unity customization']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the Billing Reports Settings by clicking update button', function(){
    try {
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
      element(by.xpath("//button[@class='btn btn-primary']")).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
      expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      } catch (ex) {
        console.log('Data validation error');
        browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      }
  });

  it('Verify that all settings should appear on Patient Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Patient Settings']"))), 20000);
    element(by.xpath("//li[.='Patient Settings']")).click();
    browser.sleep(2000);
    expect(element(by.css(".col-md-4")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the Patient Settings by clicking update button', function(){
    try {
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
      element(by.xpath("//button[@class='btn btn-primary']")).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
      expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      } catch (ex) {
        console.log('Data validation error');
        browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      }
  });

  it('Verify that all settings should appear on Case Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Case Settings']"))), 20000);
    element(by.xpath("//li[.='Case Settings']")).click();
    browser.sleep(2000);
    expect(element(by.xpath("//label[.='Max Item Quantity in Case']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Max Items in Case']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the Case Settings by clicking update button', function(){
    try {
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
      element(by.xpath("//button[@class='btn btn-primary']")).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
      expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      } catch (ex) {
        console.log('Data validation error');
        browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      }
  });

  it('Verify that all settings should appear on Item Catalog Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Item Catalog Settings']"))), 20000);
    element(by.xpath("//li[.='Item Catalog Settings']")).click();
    browser.sleep(2000);
    expect(element(by.xpath("//label[.='Max Quantity for Custom UOU']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Resident price batch update percentage limit']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Max Item Cost']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the Item Catalog Settings by clicking update button', function(){
    try {
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
      element(by.xpath("//button[@class='btn btn-primary']")).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
      expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      } catch (ex) {
        console.log('Data validation error');
        browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      }
  });

  it('Verify that all settings should appear on Invoice Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Invoice Settings']"))), 20000);
    element(by.xpath("//li[.='Invoice Settings']")).click();
    browser.sleep(2000);
    expect(element(by.xpath("//label[.='Max payment term days']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Max Number of Uploaded Hard Copies']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the Invoice Settings by clicking update button', function(){
    try {
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
      element(by.xpath("//button[@class='btn btn-primary']")).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
      expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      } catch (ex) {
        console.log('Data validation error');
        browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      }
  });

  it('Verify that all settings should appear on Shop Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Shop Settings']"))), 20000);
    element(by.xpath("//li[.='Shop Settings']")).click();
    browser.sleep(2000);
    expect(element(by.xpath("//label[.='Search Type']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Search Fields']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the Shop Settings by clicking update button', function(){
    try {
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
      element(by.xpath("//button[@class='btn btn-primary']")).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
      expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      } catch (ex) {
        console.log('Data validation error');
        browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      }
  });

  it('Verify that all settings should appear on Inventory Settings screen', function(){
    browser.wait(EC.elementToBeClickable(element(by.xpath("//li[.='Inventory Settings']"))), 20000);
    element(by.xpath("//li[.='Inventory Settings']")).click();
    browser.sleep(2000);
    expect(element(by.xpath("//label[.='Default integration inventory name']")).isPresent()).toBeTruthy();
    expect(element(by.xpath("//label[.='Default integration inventory mnemonic']")).isPresent()).toBeTruthy();
  });

  it('Verify that user should able to update the Inventory Settings by clicking update button', function(){
    try {
      browser.wait(EC.elementToBeClickable(element(by.xpath("//button[@class='btn btn-primary']"))), 20000);
      element(by.xpath("//button[@class='btn btn-primary']")).click();
      browser.wait(EC.textToBePresentInElement($('.toast-message'),'App setting has been update successfully.'),20000);
      expect($('.toast-message').getText()).toEqual('App setting has been update successfully.');
      browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      } catch (ex) {
        console.log('Data validation error');
        browser.wait(EC.invisibilityOf($('.toast-message')), 10000);
      }
  });

});