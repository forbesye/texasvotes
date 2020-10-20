import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import sys

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
        element = self.driver.find_element_by_tag_name('h2')
        assert element.text == 'General Information'

        self.driver.find_element_by_partial_link_text(' Election').click()
        time.sleep(2)
        element = self.driver.find_element_by_tag_name('h3')
        assert element.text == 'Election Dates'

        self.driver.back()
        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Politicians'

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])
