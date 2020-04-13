#! /usr/bin/python

import selenium.webdriver
from selenium import webdriver.common.by

class page(object):
   
   def init(self, browser):
      address = "localhost:8000"
      if browser.title != 'Test HTML':
         raise RuntimeError('The test webpage has not loaded correctly.')