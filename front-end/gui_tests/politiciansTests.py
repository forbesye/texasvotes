import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

PATH = "./front-end/gui_tests/chromedriver.exe"

class TestPoliticians(unittest.TestCase):

    # Get drivers and run website before all tests
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome(PATH)
        cls.driver.get("http://localhost:3000/politicians/view")
        # self.driver.get("https://www.texasvotes.me/")

    # Close browser and quit after all tests
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def testPage(self):
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Politicians'

if __name__ == "__main__":
    unittest.main()
