import { Selector } from 'testcafe';

fixture `concurrent Test`
   .page `http://localhost:8000`;

// BeforeEach and AfterEach aren't needed because the page is loaded by 
// as part of the fixture and the headless option is handled at the
// runner level.

test('dropDown2', async t => {
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
