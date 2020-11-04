import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

import sys

# PATH = "chromedriver.exe"
PATH = "./front-end/gui_tests/chromedriver.exe"
URL = "https://stage.texasvotes.me/"
# URL = "https://www.texasvotes.me/"

class TestSplash(unittest.TestCase):

    # Get drivers and run website before all tests
    @classmethod
    def setUpClass(cls):
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        cls.driver = webdriver.Chrome(PATH, options=chrome_options)
        cls.driver.get(URL)

    # Close browser and quit after all tests
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def testPoliticianCard(self):
        self.driver.find_element_by_id("politicianCard").click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Politicians'

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testDistrictCard(self):
        self.driver.find_element_by_id("districtCard").click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Districts'

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testElectionCard(self):
        self.driver.find_element_by_id("electionCard").click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Elections'
        
        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testVotingFAQ(self):
        self.driver.find_element_by_link_text('here').click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Voting FAQ'
        
        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])
