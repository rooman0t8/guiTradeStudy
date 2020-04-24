const assert = require('assert')

describe('example test', () => {
   it('should have the right title', async () => {
      await browser.url('https://webdriver.io')
      const title = await browser.getTitle()
      assert.strictEqual(title, 'WebdriverIO · Next-gen browser automation test framework for Node.js')
   })
})