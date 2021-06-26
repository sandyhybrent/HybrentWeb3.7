var object = require('./objects');

var HTMLReport = require('protractor-html-reporter-2');
var jasmineReporters = require('jasmine-reporters');
var istanbulPlugin = require('protractor-istanbul-plugin');
//var SpecReporter = require('jasmine-spec-reporter').SpecReporter;


exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'jasmine2',
  // multiCapabilities: [
  //   { browserName: 'firefox' },
  //   { browserName: 'chrome' }
  // ],

    multiCapabilities: [
      {'browserName': 'chrome'}
    ],

  specs: [
    'Testcases/login/*.js',
    'Testcases/Dashboard/*.js',
    'Testcases/Userfacility/*.js',
    'Testcases/ItemCatalog/itn.js',
    'Testcases/Shop/*.js',
    'Testcases/Cart/*js',
    'Testcases/Order/*js',
    'Testcases/Request_service/*js',
    'Testcases/Receive/*js',
    'Testcases/Invoice/*js',
    'Testcases/Template/*.js',
    'Testcases/Patient/*.js',
    'Testcases/ScanIN/*.js',
    'Testcases/ScanOut/*.js',
    'Testcases/Bill_and_Replace/*.js',
    'Testcases/Replenish_Bin/*js',
    'Testcases/ApproveItem/*.js',
    'Testcases/Manage Inventory/*.js',
    'Testcases/Inventory_Transfer/*js',
    'Testcases/Shipment/*js',
    'Testcases/Physician/*.js',
    'Testcases/Preference_Card/*.js',
    'Testcases/Out_Of_Stock/*js',
    'Testcases/Admin_section/*js',
    'Testcases/DME/*js',
    // // 'Testcases/All_Reports/*js',
    // 'Testcases/Patient1/*.js'
  ],
  
  
  onPrepare: function () {
    browser.manage().window().maximize();
    var jasmineReporters = require('jasmine-reporters');
    

    //protractor html reporter-2

    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './',
      filePrefix: 'xmlresults'
    }));

  },
  plugins: [{
    package: 'jasmine2-protractor-utils',
    disableHTMLReport: true,
    disableScreenshot: false,
    screenshotPath: './screenshots',
    screenshotOnExpectFailure: false,
    screenshotOnSpecFailure: true,
    clearFoldersBeforeTest: true,
  }],

  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');

      var HTMLReport = require('protractor-html-reporter-2');

      testConfig = {
        reportTitle: 'Hybrent Web 3.7.0-RC1',
        outputPath: './',
        outputFilename: 'Protractor Test Execution Report for web 3.7.0-RC1',
        screenshotPath: './screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from('xmlresults.xml', testConfig);
    });
    
  },
  // increased time out for debugging
  allScriptsTimeout: 999999,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 999999,
    showColors: true
  },

  params: object
};