import {browser} from 'protractor';

describe('our first Protractor test', () => {
  it('should load a page and verify the url', () => {
    browser.get('https://angularjs.org/');
    expect(browser.getCurrentUrl()).toEqual('https://angularjs.org/');
  });
});
