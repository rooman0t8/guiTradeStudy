const {Builder, By, until} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

'use strict';

beforeEach(async () => {
   options = new firefox.Options();
   options.headless();
   this.browser = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
   //expect(this.browser).toBeInstanceOf(ThenableWebDriver());

   expect(await this.browser.get("http://localhost:8000")).toBeNull();
});

afterEach(() => {
   // Note return syntax
   return this.browser.quit()
})

test('dropdown_concurrent', async () => {
   expect(await this.browser.findElement(By.className('orange')).isDisplayed()).toBe(false);
   expect(await this.browser.findElement(By.className('apple')).isDisplayed()).toBe(false);

   // wait until serbet displays
   sherbetText = await this.browser.findElement(By.className('orange'))
   await this.browser.wait(until.elementIsVisible(sherbetText))

   this.browser.findElement(By.className('div-toggle')).findElement(By.xpath('./option[@value="apple"]')).click();
   //wait after click
   crispText = await this.browser.findElement(By.className('apple'))
   await this.browser.wait(until.elementIsVisible(crispText))

   expect(await this.browser.findElement(By.className('div-toggle')).getAttribute('value')).toEqual('apple')
   expect(await this.browser.findElement(By.className('div-toggle')).getAttribute('value')).not.toEqual('orange')

   // test crisp not sherbet
   expect(await this.browser.findElement(By.className('apple')).isDisplayed()).toBe(true);
   expect(await this.browser.findElement(By.className('orange')).isDisplayed()).toBe(false);

})