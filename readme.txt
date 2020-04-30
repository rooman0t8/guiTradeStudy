VM Setup
================================================================================
installed:
   scl git 2.9
   vscode


Testing Stack #1: Selenium webdriver, python, nosetest
================================================================================
API Docs
https://www.selenium.dev/selenium/docs/api/py/api.html

installed epel and pip per instructions
   used pip to install nose

Selenium installation
https://www.selenium.dev/documentation/en/selenium_installation/installing_selenium_libraries/
Note 3 is the baseline 4 is still "Alpha"

TODO: Installing the geckodriver would need to added to the machine template,
   and possibly put into an rpm for lab use

Per https://www.selenium.dev/documentation/en/webdriver/driver_requirements/
both Firefox and Chrome can be run headlessly which should probably be use for a
subset of our planned tests.


Testing Stack #2: Selenium webdriver, node.js, jasmine
================================================================================
Installed npm as a dependency for jasmine

Need to create package.json? Yes
   ^ should have called npm init

following instructions on 
https://jasmine.github.io/pages/getting_started.html

The selenium example does not work with node 6.  Installed rh-nodejs12 from scl.
   Checked the selenium-webdriver and jasmine versions are consistent across 
   node6 and node12.

I haven't tested callbacks yet, but I modified the beforeEach to return a promise
   and it still works.
Additionally has async matchers
https://jasmine.github.io/api/edge/async-matchers.html

Notes:
. The individual test in side a file are run in randomized order

TODO:
o Write variant test using implicit waits


Testing Stack #2: Selenium webdriver, node.js, jest
================================================================================
npm installed previously
copied package.json from seleniumJasmine as a template for selimumJest

following instructions on
https://jestjs.io/docs/en/getting-started.html

test functions cannot be arbitrarily named, 'test' and 'it' are allowed

Notes:
. Individual tests in a file are run sequentially in declared order
. Multiple files can be run concurrently, but can fall back to sequential

TODO:
o add more cores to VM and test concurrency


Testing Stack #3: WebdriverIO, multiple frameworks
================================================================================
per https://youtu.be/jOmvPpzLMf8?t=974
  . Because of the syntax compatibility you can run webdriverIO in Jest.
  They have not written a "framework adapter" and probably will not.
  . built in assertion library releases in version 6 (using 6.1.2)
  . driver autowaits (seems similar to selenium implicit waits), includes
  manual waits that can be mixed

Following instructions on https://webdriver.io/docs/gettingstarted.html

not using sync mode async uses standard Promise system from Selenium webdriver
   . Built on fibers with has a "NOTE OF OBSOLESCENCE"
   . npm threw error when I did try to install 'npm i @wdio\sync'

He overrides the it/test parameters to treat the timeout as a retry

Example test did not connect to firefox.
per https://webdriver.io/docs/driverbinaries.html
running the geckodriver manually succeded

Modified syntax of it('body test') but still getting a cryptic error message

Judgment is not worth the time to continue testing and troubleshooting


Testing Stack #3: TestCafe
================================================================================
following https://devexpress.github.io/testcafe/documentation/getting-started/

installed testcafe with system (node6) npm, checked version is the same as 
   scl (node12) npm.

Documention makes the distinction between server and client side actions.

Metadata can be set which is then used it multiple ways
   . the runner can then use to filter
   . included in custom reporters

Headless is either a command line option, or config in the runner class.
I am not currently testing the runner class.

TestCafe was the only one to fail logo because of the &nbsp; I couldn't 
   figure out how to match the control character, so I changed it to regular
   space in the html.

Selectors are not as explict, they rely more on built in javascript CSS
   syntax (.class, #id).  There is also no xpath support.
   Pro: consise once you understand
   Con: requires increased js/css knowledge

Does support concurrent tests with -c option or runner API.
Because of the display waits my tests are too imbalenced to tell the exact
concurrency implementation.


Trade Study Info
================================================================================
I need to way to quantify and rank Selenium/Python, Selenium/Jest, and TestCafe

Scale 1-5
Weighted                                      

functionality
framework reuse
future proof
ease of use

