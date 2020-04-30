const {Builder, By, until} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

describe("Unit tests for notCodi", function(){
   beforeEach(function(){
      options = new firefox.Options();
      options.headless();
      // Jasmine will wait for the promise to resolve when it is returned
      return this.browser = new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
   });

   afterEach(async function(){
      await this.browser.quit();
   });

   it("bodyText", async function(){
      await this.browser.get("http://localhost:8000")
      title = await this.browser.getTitle()
      expect(title).toEqual('Test HTML')

      expect(await this.browser.findElement(By.id('logo')).getText()).toEqual('HTML5 Layout')

      dropDown = await this.browser.findElement(By.className('div-toggle'))
      expect(await dropDown.getAttribute('value')).toEqual('orange')
      expect(await dropDown.getAttribute('value')).not.toEqual('apple')
   });


   it("dropDown", async function(){
      await this.browser.get("http://localhost:8000")
      expect(await this.browser.getTitle()).toEqual('Test HTML')

      // Nothing displays when the page is first loaded.
      expect(await this.browser.findElement(By.className('orange')).isDisplayed()).toBeFalse();
      expect(await this.browser.findElement(By.className('apple')).isDisplayed()).toBeFalse();

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
      expect(await this.browser.findElement(By.className('apple')).isDisplayed()).toBeTrue();
      expect(await this.browser.findElement(By.className('orange')).isDisplayed()).toBeFalse();

   });
});