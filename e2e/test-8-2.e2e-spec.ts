
import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('interact with elements', () => {

  describe('for a new valid user', () => {
    beforeAll(() => {
      browser.get('/');
    });

    it('should add a contact', () => {
      element(by.id('add-contact')).click();
      expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:4200/add');
    });

    it('should add a user name', () => {
      element(by.id('name')).sendKeys('Ada');
      expect(element(by.id('name')).getAttribute('value')).toEqual('Ada');
    });

    it('should send an email address', () => {
      let email = element(by.css('input[type="email"]'));
      email.sendKeys('ada@lovelace.com');
      expect(email.getAttribute('value')).toEqual('ada@lovelace.com');
    });

    it('should send a phone number', () => {
      let tel = element(by.css('input[type="tel"]'));
      tel.sendKeys('1234567890');
      expect(tel.getAttribute('value')).toEqual('1234567890');
    });

    it('should click the create button', () => {
      element(by.buttonText('Create')).click();
      expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:4200/');
    });
  });

  describe('for an invalid email', () => {
    beforeEach(() => {
      browser.get('/add');
      element(by.id('name')).sendKeys('Bad Email');
    });

    it('should send an invalid email', () => {
      let email = element(by.css('input[type="email"]'));
      email.sendKeys('baduser.com');
      element(by.buttonText('Create')).click();
      browser.wait(EC.alertIsPresent(), 5000);
      browser.sleep(1000);
      browser.switchTo().alert().accept();
      expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:4200/add');
    });

    it('should also send an invalid email', () => {
      let email = element(by.css('input[type="email"]'));
      email.sendKeys('@baduser.com');
      browser.wait(EC.alertIsPresent(), 5000)
        .then(() => {
          browser.sleep(1000);
          browser.switchTo().alert().accept();
          expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:4200/add');
        })
        .catch(err => {
          fail('@baduser.com is an invalid email address. file a bug!')
        });
    });
  });
  
 describe('for an invalid phone number', () => {
    beforeEach(() => {
      browser.get('/add');
      element(by.id('name')).sendKeys('Bad Tel');
    });

    it('should send an invalid tel', () => {
      let tel = element(by.css('input[type="tel"]'));
      tel.sendKeys('123-456-7890');
      element(by.buttonText('Create')).click();
      browser.wait(EC.alertIsPresent(), 5000)
        .then(() => {
          browser.sleep(1000);
          browser.switchTo().alert().accept();
          expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:4200/add');
        })
        .catch(err => {
          fail('123-456-7890 is a valid phone number. file a bug!')
        });
    });

    it('should also send an invalid tel', () => {
      let tel = element(by.css('input[type="tel"]'));
      tel.sendKeys('12345678901');
      element(by.buttonText('Create')).click();
      browser.wait(EC.alertIsPresent(), 5000);  
      browser.sleep(1000);
      browser.switchTo().alert().accept();
      expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:4200/add');
    });
  });
});