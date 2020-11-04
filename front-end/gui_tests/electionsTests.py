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
URL = "https://stage.texasvotes.me/elections/view/"
# URL = "https://www.texasvotes.me/elections/view/"

class TestElections(unittest.TestCase):

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

    def testElec(self):
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
        assert element.text == 'Election Dates'

        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Elections'

    def testSearch(self):
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.ID, 'rc-tabs-2-tab-search'))
            )
        except Exception as ex:
            return
        self.driver.find_element_by_id("rc-tabs-2-tab-search").click()
        currentURL = self.driver.current_url
        assert currentURL == "https://stage.texasvotes.me/elections/search"

        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Elections'

    def testSort1(self):
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Elections_filterSection__1CnPM'))
            )
        except Exception as ex:
            print(ex)
            return

        selections = self.driver.find_element_by_class_name('Elections_filterSection__1CnPM')
        selections.find_elements_by_class_name('ant-select')[0].click()
        time.sleep(2)
        self.actions.send_keys(Keys.DOWN, Keys.DOWN, Keys.RETURN).perform()
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
        assert element.find_element_by_tag_name('div').text == '2020 Democratic Primary for Texas House of Representatives District 101'

        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Elections'

    def testFilter1(self):
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Elections_filterSection__1CnPM'))
            )
        except Exception as ex:
            print(ex)
            return

        selections = self.driver.find_element_by_class_name('Elections_filterSection__1CnPM')
        selections.find_elements_by_class_name('ant-select')[1].click()
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

        self.driver.find_elements_by_class_name('ant-table-row')[0].click()
        time.sleep(2)
        element = self.driver.find_element_by_class_name('ant-page-header-heading-title')
        assert element.find_element_by_tag_name('div').text == '2020 General Election for Texas House of Representatives District 8'

        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Elections'

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])
