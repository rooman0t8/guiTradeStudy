const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://localhost:8000');
    await driver.wait(until.titleIs('Test HTML'), 1000);
  } finally {
    await driver.quit();
  }
})();