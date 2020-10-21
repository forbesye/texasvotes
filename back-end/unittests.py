from unittest import main, TestCase
from format import *

class UnitTests(TestCase):
    def setUp(self):
        pass
    
    # Make sure that all test methods start with test_
    def test_always_right(self):
        self.assertEqual(1, 1)

    def test_1(self):
        test_schema = {
            "name": "Test",
            "district": {
                "name": "Testers",
                "type": "tx_house",
                "abbacus": "I can't spell",
                "number": 25
            }
        }
        expected = {
            "name": "Test",
            "district": {
                "type": "tx_house",
                "number": 25
            }
        }
        format_district_in_schema(test_schema)
        self.assertEqual(expected, test_schema)

    def test_2(self):
        test_schema = {
            "name": "Test",
            "alleyway": "cats"
        }
        expected = {
            "name": "Test",
            "alleyway": "cats"
        }
        format_district_in_schema(test_schema)
        self.assertEqual(expected, test_schema)
        
    def test_3(self):
        test_schema = {
            "name": "Abbey",
            "phone": "555-630-6303",
            "website": "https://nerdsgalore.com",
            "facebook": "AbbeyRox"
        }
        expected = {
            "name": "Abbey",
            "contact": {
                "phone": "555-630-6303",
                "website": "https://nerdsgalore.com",
                "social_media": [
                    {
                        "type": "facebook",
                        "id": "AbbeyRox"
                    }
                ]
            }
        }
        format_politician_contact(test_schema)
        self.assertEqual(expected, test_schema)

    def test_4(self):
        test_schema = {
            "name": "Alison",
            "current": True,
            "office": "tx_house"
        }
        expected = {
            "name": "Alison",
            "current": "tx_house"
        }
        format_politician_office(test_schema)
        self.assertEqual(expected, test_schema)

    def test_5(self):
        test_schema = {
            "name": "Alison",
            "current": False,
            "office": "tx_house"
        }
        expected = {
            "name": "Alison",
            "running_for": "tx_house"
        }
        format_politician_office(test_schema)
        self.assertEqual(expected, test_schema)

    def test_6(self):
        test_schema = {
            "name": "Able",
            "fund_raise": 100,
            "fund_spent": 200,
            "fund_remain": 0,
            "fund_debt": 100,
            "fund_industries": "{\'test\': \'should work\', \'hope\': \'this doesnt break\'}",
            "fund_contributors": "{\'test2\': \'should still work\', \'hope\': \'this doesnt break\'}"
        }
        expected = {
            "name": "Able",
            "fundraising": {
                "raised": 100,
                "spent": 200,
                "remaining_cash": 0,
                "debt": 100,
                "industries": {
                    "test": "should work",
                    "hope": "this doesnt break"
                },
                "contributors": {
                    "test2": "should still work",
                    "hope": "this doesnt break"
                }
            }
        }
        format_politician_fundraising(test_schema)
        self.assertEqual(expected, test_schema)

    def test_7(self):
        test_schemas = [
            {
                "name": "Test",
                "district": {
                    "name": "Testers",
                    "type": "tx_house",
                    "abbacus": "I can't spell",
                    "number": 25
                }
            },
            {
                "name": "Test1",
                "district": {
                    "name": "Testers1",
                    "type": "us_house",
                    "abbacus": "I can't spell",
                    "number": 26
                }
            }
        ]
        expected = [
            {
                "name": "Test",
                "district": {
                    "type": "tx_house",
                    "number": 25
                }
            },
            {
                "name": "Test1",
                "district": {
                    "type": "us_house",
                    "number": 26
                }
            }
        ]
        format_districts_in_politicians(test_schemas)
        self.assertEqual(expected, test_schemas)

    def test_8(self):
        test_schema = {
            "office": "tx_house",
            "elected_officials": [
                {
                    "name": "Raelynn",
                    "current": True
                },
                {
                    "name": "Dylan",
                    "current": False
                }
            ]
        }
        expected = {
            "office": "tx_house",
            "elected_officials": [
                {
                    "name": "Raelynn"
                }
            ]
        }
        format_district_elected_officials(test_schema)
        self.assertEqual(expected, test_schema)

    def test_9(self):
        test_schema = {
            "office": "tx_house",
            "election_day": "today",
            "early_start": "two days ago",
            "early_end": "yesterday"
        }
        expected = {
            "office": "tx_house",
            "dates": {
                "election_day": "today",
                "early_start": "two days ago",
                "early_end": "yesterday"
            }
        }
        format_election_dates(test_schema)
        self.assertEqual(expected, test_schema)

    def test_10(self):
        test_schema = {
            "office": "us_house",
            "district": {
                "type": "us_house",
                "peaceful": False,
                "number": 32,
                "happening": True
            }
        }
        expected = {
            "office": "us_house",
            "district": {
                "type": "us_house",
                "number": 32
            }
        }
        format_election_district(test_schema)
        self.assertEqual(expected, test_schema)

    def test_11(self):
        test_schema = {
            "office": "president",
            "class_name": "tx_house"
        }
        expected = {
            "office": "president",
            "type": {
                "class": "tx_house"
            }
        }
        format_election_type(test_schema)
        self.assertEqual(expected, test_schema)

    def test_12(self):
        test_schema = {
            "offce": "secretary",
            "candidates": [
                {
                    "name": "Patty Baker",
                    "district": {
                        "type": "us_house",
                        "apple": "delicious",
                        "number": 43
                    }
                },
                {
                    "name": "Adam Sandler",
                    "district": {
                        "type": "tx_house",
                        "pear": "too green",
                        "number": 89
                    }
                }
            ]
        }
        expected = {
            "offce": "secretary",
            "candidates": [
                {
                    "name": "Patty Baker",
                    "district": {
                        "type": "us_house",
                        "number": 43
                    }
                },
                {
                    "name": "Adam Sandler",
                    "district": {
                        "type": "tx_house",
                        "number": 89
                    }
                }
            ]
        }
        format_election_districts(test_schema)
        self.assertEqual(expected, test_schema)


if __name__ == '__main__':
    main()
