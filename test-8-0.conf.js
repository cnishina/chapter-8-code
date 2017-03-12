exports.config = {
  specs: ['./e2e/test-8-0.e2e-spec.ts'],
  beforeLaunch: () => {
    require('ts-node').register({project: 'e2e'});
  }
}
