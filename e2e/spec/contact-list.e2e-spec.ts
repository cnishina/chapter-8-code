import {ContactListPageObject} from '../po/contact-list.po';


// This is our first Protractor test in the Jasmine test framework.
// In this example we are also introducing page objects. Page objects
// organize logical workflows from page to page.
describe('the contact list', () => {
  let cl: ContactListPageObject;

  // Before all tests, lets create a new page object.
  beforeAll(() => {
    cl = new ContactListPageObject();
  });

  // This is the first test:
  // 1. We navigate to the contact list page
  // 2. Find the element by css and get the element's text
  // 3. Verify that the text is not null and is equal to 'Contacts'
  it('should find the title', () => {
    cl.navigateTo();
    expect(cl.getTitle()).not.toBeNull();
    expect(cl.getTitle()).toEqual('Contacts');
  });
});
