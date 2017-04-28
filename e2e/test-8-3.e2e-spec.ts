import { browser, by, element, ElementFinder } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';

export class Contact {
  constructor(public name?: string, public email?: string, public tel?: string) {}
}

fdescribe('the contact list', () => {
  beforeAll(() => {
    browser.get('https://contacts-app-starter.firebaseapp.com/');
  });

  it('with filter: should find existing contact "Craig Service"', () => {
    let tbody = element(by.tagName('tbody'));
    let trs = tbody.all(by.tagName('tr'));
    let craigService = trs.filter(elem => {
      // The tds: 0 = mood, 1 = name, 2 = email, 3 = phone number
      return elem.all(by.tagName('td')).get(1).getText().then(text => {
        return text === 'Craig Service';
      });
    });
    // Nothing happens here until you use it. Although we called getText in the filter function,
    // it is not executed until we use it. When you use it, the promises enter the control flow
    // and are resolved. This is similar to calling element(), nothing happens until you do
    // something like getText().
    expect(craigService.count()).toBeGreaterThan(0);
    expect(craigService.all(by.tagName('td')).get(2).getText()).toBe('craig.services@example.com');
  });

  let contactList: wdpromise.Promise<any> = null;
  it('with map: should create a map object', () => {
    let tbody = element(by.tagName('tbody'));
    let trs = tbody.all(by.tagName('tr'));
    contactList = trs.map(elem => {
      let contact: Contact = new Contact();
      let tds = elem.all(by.tagName('td'));
      // We need to get the values of the contact name and email. Since these are in a couple of 
      // different promises, we'll  create a promise array.
      let promises: wdpromise.Promise<any>[] = [];

      // Getting the text returns a promise of a string then the next function sets the contact's
      // name. This function returns void so the final promise saved is of Promise<void>.
      // We set the promise array to be of type any since we do not care about the promise type.
      promises.push(tds.get(1).getText().then(text => {
        contact.name = text;
      }));
      promises.push(tds.get(2).getText().then(text => {
        contact.email = text;
      }));
      promises.push(tds.get(3).getText().then(text => {
        contact.tel = text;
      }));

      // Resolve all the promises and return the contact.
      return Promise.all(promises).then(() => {
        return contact;
      });
    })
    
    expect(contactList).toBeDefined();
    contactList.then(contacts => {
      expect(contacts.length).toBe(4);
      expect(contacts[0]).toBeDefined();
      expect(contacts[1].email).toBe('rusty.component@example.com');
      expect(contacts[2].tel).toBe('+1 (714) 555-0111');
      expect(contacts[3].name).toBe('Craig Service');
    });
  });

  it('with reduce: get a list of contact names', () => {
    let tbody = element(by.tagName('tbody'));
    let trs = tbody.all(by.tagName('tr'));
    let contacts: wdpromise.Promise<string> = trs.reduce((acc, curr) => {
      let name = curr.all(by.tagName('td')).get(1);
      return name.getText().then(text => {
        return acc === '' ? text : acc + ', ' + text;
      });
    }, '');
    
    expect(contacts).toBe('Adrian Directive, Rusty Component, Jeff Pipe, Craig Service');
  });
});

