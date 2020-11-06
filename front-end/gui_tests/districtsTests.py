import unittest
import time
import sys
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
import sys

PATH = "chromedriver.exe"
# PATH = "./front-end/gui_tests/chromedriver.exe"
URL = "https://stage.texasvotes.me/districts/view/"
# URL = "https://www.texasvotes.me/districts/view/"

class TestDistricts(unittest.TestCase):

    # Get drivers and run website before all tests
    @classmethod
    def setUpClass(cls):
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        cls.driver = webdriver.Chrome(PATH, options=chrome_options)
        cls.driver.get(URL)
        cls.actions = ActionChains(cls.driver)

    # Close browser and quit after all tests
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def testDis(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'ant-table-row'))
            )
        except Exception as ex:
            print(ex)
            return

        self.driver.find_elements_by_class_name('ant-table-row')[0].click()
        time.sleep(2)
        element = self.driver.find_element_by_tag_name('h3')
        assert element.text == 'District Map'

        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Districts'

    def testSearch(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.ID, 'rc-tabs-0-tab-search'))
            )
        except Exception as ex:
            print(ex)
            return
        self.driver.find_element_by_id("rc-tabs-0-tab-search").click()
        currentURL = self.driver.current_url
        assert currentURL == "https://stage.texasvotes.me/districts/search"

        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Districts'

    def testSort1(self):
        self.driver.get(URL)
        time.sleep(2)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Districts_filterSection__EFmS3'))
            )
        except Exception as ex:
            print(ex)
            return

        selections = self.driver.find_element_by_class_name('Districts_filterSection__EFmS3')
        selections.find_elements_by_class_name('ant-select')[5].click()
        time.sleep(2)
        self.actions.send_keys(Keys.DOWN, Keys.RETURN).perform()
        time.sleep(2)
        
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'ant-table-row'))
            )
        except Exception as ex:
            print("did not find")
            return

        self.driver.find_elements_by_class_name('ant-table-row')[0].click()
        time.sleep(2)
        element = self.driver.find_element_by_class_name('ant-page-header-heading-title')
        assert element.text == 'Texas House District 150'

        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Districts'

    def testFilter1(self):
        self.driver.get(URL)
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Districts_filterSection__EFmS3'))
            )
        except Exception as ex:
            print(ex)
            return

        selections = self.driver.find_element_by_class_name('Districts_filterSection__EFmS3')
        selections.find_elements_by_class_name('ant-select')[0].click()
        time.sleep(2)
        self.actions.send_keys(Keys.RETURN, Keys.ESCAPE).perform()
        time.sleep(2)
        
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'ant-table-row'))
            )
        except Exception as ex:
            print("did not find")
            return

        self.driver.find_elements_by_class_name('ant-table-row')[1].click()
        time.sleep(2)
        element = self.driver.find_element_by_class_name('ant-page-header-heading-title')
        assert element.text == 'Texas Senate District 3'

        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Districts'

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])
