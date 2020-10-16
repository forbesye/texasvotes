import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

PATH = "./front-end/gui_tests/chromedriver.exe"
# PATH = "./chromedriver.exe"

class TestElections(unittest.TestCase):

    # Get drivers and run website before all tests
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome(PATH)
        # cls.driver.get("http://localhost:3000/elections/view")
        cls.driver.get("https://www.texasvotes.me/elections/view")

    # Close browser and quit after all tests
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def testElec(self):
        a = self.driver.find_elements_by_class_name('ant-table-row')
        a[0].click()
        element = self.driver.find_element_by_tag_name('h3')
        assert element.text == 'Voting location for this election'

        self.driver.back()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Elections'

if __name__ == "__main__":
    unittest.main()
