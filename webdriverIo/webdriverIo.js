beforeEach(async () => {
   // Not currently attempting firefox options
   //options = new firefox.Options();
   //options.headless();

   await this.browser.url('https://webdriver.io')
});

afterEach(() => {
   // Note return syntax
   return this.browser.quit()
})

it('body text', async () => {
   expect(await this.browser.getTitle()).isEqual('Test HTML')

   // ID locators not supported
   //expect(this.browser.findElement(By.id('logo')).getText()).resolves.isEqual('HTML5 Layout')

   dropDown = await $('.div-toggle')
   expect(await dropDown.getAttribute('value')).isEqual('orange')
   expect(await dropDown.getAttribute('value')).not.isEqual('apple')
})

xit('dropdown', async () => {
   expect(await this.browser.findElement(By.className('orange')).isDisplayed()).toBe(false);
   expect(await this.browser.findElement(By.className('apple')).isDisplayed()).toBe(false);

   // wait until serbet displays
   sherbetText = await this.browser.findElement(By.className('orange'))
   await this.browser.wait(until.elementIsVisible(sherbetText))

   this.browser.findElement(By.className('div-toggle')).findElement(By.xpath('./option[@value="apple"]')).click();
   //wait after click
   crispText = await this.browser.findElement(By.className('apple'))
   await this.browser.wait(until.elementIsVisible(crispText))

   expect(await this.browser.findElement(By.className('div-toggle')).getAttribute('value')).isEqual('apple')
   expect(await this.browser.findElement(By.className('div-toggle')).getAttribute('value')).not.isEqual('orange')

   // test crisp not sherbet
   expect(await this.browser.findElement(By.className('apple')).isDisplayed()).toBe(true);
   expect(await this.browser.findElement(By.className('orange')).isDisplayed()).toBe(false);

})