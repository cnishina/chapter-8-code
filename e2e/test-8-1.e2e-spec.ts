import {browser} from 'protractor';

describe('our first Protractor test', () => {
  it('should load a page and verify the url', () => {
    browser.get('/');
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:4200/');
  });
});
