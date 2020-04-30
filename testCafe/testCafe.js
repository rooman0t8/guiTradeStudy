import { Selector } from 'testcafe';

fixture `not Codi`
   .page `http://localhost:8000`;

// BeforeEach and AfterEach aren't needed because the page is loaded by 
// as part of the fixture and the headless option is handled at the
// runner level.

test ('bodyText', async t => {
   await t.expect(Selector('title').textContent).eql('Test HTML');
   await t.expect(Selector('#logo').innerText).eql('HTML5 Layout');

   await t.expect(Selector('.div-toggle').value).eql('orange')
   await t.expect(Selector('.div-toggle').value).notEql('apple')
});

test('dropDown', async t => {
   // Nothing is displayed when the page first loads.
   await t.expect(Selector('.orange').visible).notOk();
   await t.expect(Selector('.orange').visible).notOk();

   // Using the built-in wait retry for Assertions
   await t.expect(Selector('.orange').visible).ok();

   const dropDown = Selector('.div-toggle');
   const dropDownOptions = dropDown.find('option');
   await t
      .click(dropDown)
      .click(dropDownOptions.withText('Apple'))
      .expect(dropDown.value).eql('apple');

   await t.expect(Selector('.apple').visible).ok();
   await t.expect(Selector('.orange').visible).notOk();
});