
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import sys

# PATH = "chromedriver.exe"
PATH = "./front-end/gui_tests/chromedriver.exe"
URL = "https://stage.texasvotes.me/"
# URL = "https://www.texasvotes.me/"

class Test(unittest.TestCase):

    # Get drivers and run website before all tests
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome(PATH)
        cls.driver.get(URL)

    # Close browser and quit after all tests
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def testImage(self):
        self.driver.find_element_by_class_name("Navbar_logo__2l4jJ").click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Votes'

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL
        
    def testHome(self):
        self.driver.find_element_by_link_text('Home').click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Votes'

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testAbout(self):
        self.driver.find_element_by_link_text('About').click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'About Us'

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testPoliticians(self):
        self.driver.find_element_by_link_text('Politicians').click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Politicians'

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testDistricts(self):
        self.driver.find_element_by_link_text('Districts').click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Districts'

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testElections(self):
        self.driver.find_element_by_link_text('Elections').click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Texas Elections'

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

    def testVotingFAQ(self):
        self.driver.find_element_by_link_text('Voting FAQ').click()
        element = self.driver.find_element_by_tag_name('h1')
        assert element.text == 'Voting FAQ'

        self.driver.back()
        currentURL = self.driver.current_url
        assert currentURL == URL

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])
