import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

PATH = "./chromedriver.exe"

class Test(unittest.TestCase):

    # Get drivers and run website before all tests
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome(PATH)
        cls.driver.get("http://localhost:3000/")
        # self.driver.get("https://www.texasvotes.me/")

    # Close browser and quit after all tests
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def testPoliticianLink(self):
        self.driver.find_element_by_link_text("Politicians").click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Politicians'

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == "http://localhost:3000/"

    def testDistrictLink(self):
        self.driver.find_element_by_link_text("Districts").click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Districts'

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == "http://localhost:3000/"

    def testElectionLink(self):
        self.driver.find_element_by_link_text("Elections").click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Elections'

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == "http://localhost:3000/"


if __name__ == "__main__":
    unittest.main()
