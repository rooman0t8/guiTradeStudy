#! /usr/bin/python

# At first I tried to use the page object design model
# recommended in the Selenium docs, but it is incomplete.
# I'm not familiar enough with just basic Selenium testing
# to properly understand the correct abstraction boundaries and
# decided to stick with basic self contained tests.  These will
# be sufficient to proof of concept the driver and framework.

import selenium.webdriver
from selenium import webdriver.common.by

class page(object):
   
   def init(self, browser):
      address = "localhost:8000"
      if browser.title != 'Test HTML':
         raise RuntimeError('The test webpage has not loaded correctly.')