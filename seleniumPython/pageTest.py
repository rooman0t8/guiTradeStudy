#! /usr/bin/python

import unittest
import selenium
from selenium import webdriver


# Using as simple in-line test model while I learn the webdriver paradigm
# and syntax.
class pageTest(unittest.TestCase):
   def setUp(self):
      options = selenium.webdriver.firefox.options.Options()
      options.headless = True
      self.browser = webdriver.Firefox(options=options)
      self.addCleanup(self.browser.quit)

   def testBodyText(self):
      self.browser.get('http://localhost:8000')
      self.assertIn('Test HTML', self.browser.title)
      self.assertEqual(self.browser.find_element_by_id('logo').text, 'HTML5 Layout')

      dropDown = webdriver.support.select.Select(self.browser.find_element_by_class_name('div-toggle'))
      self.assertEqual(dropDown.first_selected_option.text, 'Orange')
      self.assertNotEqual(dropDown.first_selected_option.text, 'Apple')
      #self.assertTrue(self.browser.find_element_by_class_name('orange').is_displayed())
      #self.assertFalse(self.browser.find_element_by_class_name('lemon').is_displayed())

   
   def testDropDown(self):
      self.browser.get('http://localhost:8000')
      self.assertIn('Test HTML', self.browser.title)

      self.assertFalse(self.browser.find_element_by_class_name('orange').is_displayed())
      self.assertFalse(self.browser.find_element_by_class_name('apple').is_displayed())
      webdriver.support.ui.WebDriverWait(self.browser, timeout=2).until(lambda b: b.find_element_by_class_name('orange').is_displayed())
      dropDown = webdriver.support.select.Select(self.browser.find_element_by_class_name('div-toggle'))
      dropDown.select_by_value('apple')
      webdriver.support.ui.WebDriverWait(self.browser, timeout=2).until(lambda b: b.find_element_by_class_name('apple').is_displayed())
      self.assertEqual(dropDown.first_selected_option.text, 'Apple')
      self.assertTrue(self.browser.find_element_by_class_name('apple').is_displayed())
      self.assertFalse(self.browser.find_element_by_class_name('orange').is_displayed())





if __name__ == '__main__':
   unittest.main(verbosity=2)