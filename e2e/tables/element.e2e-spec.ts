import { browser, by, element, ElementFinder, ElementHelper, ProtractorBy } from 'protractor';
import { By as webdriverBy, WebElement } from 'selenium-webdriver';

describe('element methods', () => {
  beforeEach(() => {
    browser.get('/add');
  });

  // Note: Protractor By is not the same as a Webdriver By
  it('test protractor by and webdriver by', () => {
    let elementFinder = element(by.id('contact-name'));
    expect(elementFinder instanceof ElementFinder).toBe(true);

    browser.sleep(2000);

    let webElementPromise = browser.driver.findElement(webdriverBy.id('contact-name'));
    webElementPromise.then(webElement => {
      expect(webElement instanceof WebElement).toBe(true);
    });
  });

  it('getWebElement', () => {
    let webElement = element(by.id('contact-name')).getWebElement();
    expect(webElement instanceof WebElement).toBe(true);

    // find an element inside an element
    let body = element(by.tagName('body'));
    let webElement2 = body.element(by.id('contact-name')).getWebElement();
    expect(webElement2 instanceof WebElement).toBe(true);
  });

  it('isPresent and isElementPresent', () => {
    // element.isPresent
    let byId = by.id('contact-name');
    let contactName = element(byId);
    expect(contactName.isPresent()).toBe(true);

    // body.isElementPresent
    let body = element(by.tagName('body'));
    expect(body.isElementPresent(byId)).toBe(true);

    // using browser.isElementPresent
    expect(browser.isElementPresent(byId)).toBe(true);
  });

  it('getTagName', () => {
    let appNewContact = element(by.tagName('app-new-contact'));
    expect(appNewContact.getTagName()).toBe('app-new-contact');
  });

  it('getCssValue', () => {
    let toolbar = element(by.tagName('md-toolbar'));
    expect(toolbar.getCssValue('background-color')).toBe('rgba(33, 150, 243, 1)');
  });

  it('getAttribute', () => {
    let mdCard = element(by.tagName('md-card'));
    expect(mdCard.getAttribute('class')).toBe('mat-card');
  });

  it('getText', () => {
    let titleBar = element(by.css('.titleBar'));
    expect(titleBar.getText()).toBe('Contacts');
  });

  it('sendKeys', () => {
    let contactName = element(by.id('contact-name'));
    contactName.sendKeys('foobar');
    expect(contactName.getAttribute('value')).toBe('foobar');
  });

  it('clear', () => {
    let contactName = element(by.id('contact-name'));
    contactName.sendKeys('foobar');
    contactName.clear();
    expect(contactName.getAttribute('value')).toBe('');
  });

  it('isDisplayed', () => {
    let contactName = element(by.id('contact-name'));
    expect(contactName.isDisplayed()).toBe(true);
  });
});