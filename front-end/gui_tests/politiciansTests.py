import unittest
import time
import sys
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

# PATH = "chromedriver.exe"
PATH = "./front-end/gui_tests/chromedriver.exe"
URL = "https://stage.texasvotes.me/politicians/view/"
# URL = "https://www.texasvotes.me/politicians/view/"


class TestPoliticians(unittest.TestCase):

    # Get drivers and run website before all tests
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome(PATH)
        cls.driver.get(URL)
        cls.actions = ActionChains(cls.driver)

    # Close browser and quit after all tests
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def testPol(self):
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'ant-card'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements_by_class_name('ant-card')[0].click()
        time.sleep(2)
        element = self.driver.find_element_by_tag_name('h2')
        assert element.text == 'General Information'

        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Politicians'

    def testPolToElec(self):
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'ant-card'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements_by_class_name('ant-card')[0].click()
        time.sleep(2)
        heading = self.driver.find_element_by_class_name('ant-page-header-heading-title')
        element = heading.find_element_by_class_name('ant-typography')
        assert element.text == 'Aaron Hermes'

        self.driver.find_element_by_partial_link_text(' Primary').click()
        time.sleep(2)
        element = self.driver.find_element_by_tag_name('h3')
        assert element.text == 'Election Dates'

        self.driver.back()
        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Politicians'
    
    def testSearch(self):
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.ID, 'rc-tabs-1-tab-search'))
            )
        except Exception as ex:
            return
        self.driver.find_element_by_id("rc-tabs-1-tab-search").click()
        currentURL = self.driver.current_url
        assert currentURL == "https://stage.texasvotes.me/politicians/search"
        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Politicians'

    def testSort1(self):
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Politicians_filterSection__2YVkz'))
            )
        except Exception as ex:
            print(ex)
            return

        selections = self.driver.find_element_by_class_name('Politicians_filterSection__2YVkz')
        selections.find_elements_by_class_name('ant-select')[0].click()
        time.sleep(2)
        self.actions.send_keys(Keys.DOWN, Keys.DOWN, Keys.RETURN).perform()
        time.sleep(2)
        
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'ant-card'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements_by_class_name('ant-card')[0].click()
        time.sleep(2)
        heading = self.driver.find_element_by_class_name('ant-page-header-heading-title')
        element = heading.find_element_by_class_name('ant-typography')
        assert element.text == 'Yvonne Davis'
        
        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Politicians'

    def testFilter1(self):
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Politicians_filterSection__2YVkz'))
            )
        except Exception as ex:
            print(ex)
            return

        selections = self.driver.find_element_by_class_name('Politicians_filterSection__2YVkz')
        selections.find_elements_by_class_name('ant-select')[1].click()
        time.sleep(1)
        self.actions.send_keys(Keys.RETURN, Keys.ESCAPE).perform()
        time.sleep(2)

        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'ant-card'))
            )
        except Exception as ex:
            print(ex)
            return
        
        self.driver.find_elements_by_class_name('ant-card')[0].click()
        time.sleep(2)
        heading = self.driver.find_element_by_class_name('ant-page-header-heading-title')
        element = heading.find_element_by_class_name('ant-typography')
        assert element.text == 'Adrian Ocegueda'
        
        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Politicians'

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])
