describe('News module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var news_title = "Test";


  it('Open News module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.linkText('News')).click();
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Manage News');
  });

  it('verify that search filter appear on the News detail page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('search.is_active')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
  });

  it('Verify that "Missing news description" error toast appear if user tries to add new news without description', function () {
    browser.sleep(2000);
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.model('newsData.title')).sendKeys(news_title + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Missing news description');
  });

  it('Verify that user should able to add new news with news title and description', function(){
    browser.sleep(2000);
    element(by.model('html')).sendKeys('test news description');
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('News created successfully.');
  });

  it('verify that user is able to search news by title', function () {
    element(by.model('searchFilter')).clear().sendKeys(news_title + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    expect(element(by.css(".grid-heading")).getText()).toEqual(news_title + randNumber);
  });

  it('verify that user is able to edit the newly created news', function () {
    element(by.model('searchFilter')).clear().sendKeys(news_title + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element(by.xpath("//button[contains(text(),'Edit')]")).click();
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('News updated successfully.');
  });

  it('verify that user can delete newly created news', function () {
    element(by.model('searchFilter')).clear().sendKeys(news_title + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element(by.xpath('//button[contains(text(),"Delete")]')).click();
    browser.sleep(2000);
    element(by.css(".sweet-alert")).element(by.buttonText('Yes')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('News deleted successfully.');

  });


});