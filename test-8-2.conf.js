// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://127.0.0.1:4200/',
  
  framework: 'jasmine',
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  }
};
