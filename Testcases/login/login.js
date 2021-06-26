describe('Hybrent Login Module', function () {
  //var loginLink = element(by.linkText('Login with Hybrent'));
  var errorElem = element(by.css('.showSweetAlert>p'));
  var EC = protractor.ExpectedConditions;
  beforeEach(function () {
    browser.waitForAngularEnabled(false);
    browser.get(browser.params.url);
  });

  it('Login: Try login without any credentials.', function () {
    // Waits for loading popup to be no longer visible on the dom.
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    //loginLink.click();
    element(by.buttonText('Login')).click();
    browser.sleep(1000);
    expect(errorElem.getText()).toEqual('Invalid Credentials.');
  
  });

  it('Login: Try login with wrong credentials.', async function () {
    // Waits for loading popup to be no longer visible on the dom.
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 50000);
    //loginLink.click();
    await element(by.model('model.userName')).sendKeys('test');
    await element(by.model('model.password')).sendKeys('test');
    await element(by.buttonText('Login')).click();
    browser.sleep(1000);
    expect(errorElem.getText()).toEqual('Invalid user name or password.');
  });


  it('Login: Try login with correct credentials.', async function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    // loginLink.click();
    await element(by.model('model.userName')).sendKeys(browser.params.user.username);
    await element(by.model('model.password')).sendKeys(browser.params.user.password);
    await element(by.buttonText('Login')).click();
    browser.wait(EC.titleIs('Dashboard'));
    expect(browser.getTitle()).toEqual('Dashboard');
  });



});