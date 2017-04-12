import {browser} from 'protractor';

describe('our first Protractor test', () => {
  it('should load a page and verify the url', () => {
    browser.get('/');
    expect(browser.getCurrentUrl()).toEqual('https://contacts-app-starter.firebaseapp.com/');
  });
});
