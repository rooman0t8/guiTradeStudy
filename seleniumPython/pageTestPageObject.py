#! /usr/bin/python

import unittest
import selenium
from selenium import webdriver

import pageClass


# TODO: This does not work yet, I've been trying to implement a PageObject
# paradigm, but I don't think I understand the webdriver enough yet.
class pageTest(unittest.TestCase):
   def setUp(self):
      options = selenium.webdriver.firefox.options.Options()
      options.headless = True
      self.browser = webdriver.Firefox(options=options)
      self.addCleanup(self.browser.quit)

   def testPageTitle(self):
      self.browser.get('http://localhost:8000')
      self.assertIn('Test HTML', self.browser.title)

   def testBodyText(self):
      assert(pageClass.bodyText(), 'This is not CODI')

if __name__ == '__main__':
   unittest.main(verbosity=2)