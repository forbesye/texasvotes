from flask import Flask, request, make_response, jsonify
from db import init_db
import requests
import json
app = Flask(__name__)
application = app # This is for AWS Elastic Beanstalk, pls don't remove!!!
db = init_db(app)

class About(db.Model):
    __tablename__ = "about"
    id = db.Column('id', db.Integer, primary_key=True)
    first_name = db.Column('first_name', db.Unicode)
    last_name = db.Column('last_name', db.Unicode)

    def __repr__(self):
        return '<User %r>' % self.first_name


# going to start making routes

# TODO make classes from db. Can reference 90mininone
# TODO more of an idea but maybe we can run filter on objects multiple times
politician_test_json = {
    "id": 0,
    "name": "Roger Williams",
    "elected": True,
    "party": "R",
    "terms": {
      "current": 4,
      "total": 5
    },
    "offices": {
      "current": "us_house",
      "past": [
        "tx_secretary_of_state"
      ]
    },
    "image": "https://williams.house.gov/sites/williams.house.gov/files/wysiwyg_uploaded/CRW%20Official_0_0.jpg",
    "contact": {
      "website": "https://williams.house.gov/",
      "social_media": [
        {
          "type": "facebook",
          "id": "RepRogerWilliams"
        },
        {
          "type": "twitter",
          "id": "RepRWilliams"
        },
        {
          "type": "youtube",
          "id": "UCBtfmMMQarjtLB9U_pWMOhw"
        }
      ],
      "phone": "(202) 225-9896"
    },
    "district": {
      "id": 1,
      "ocd_id": "ocd-division/country:us/state:tx/cd:25",
      "type": "us_house",
      "number": 25,
      "party": "R",
      "counties": [
        "Tarrant",
        "Coryell",
        "Travis",
        "Bosque",
        "Johnson",
        "Hays",
        "Somervell",
        "Burnet",
        "Erath",
        "Hill",
        "Hamilton",
        "Lampasas",
        "Bell"
      ]
    },
    "elections": {
      "upcoming": {
        "id": 1,
        "type": {
          "class": "general"
        },
        "office": "us_house",
        "district": "TX25",
        "dates": {
          "election_day": "2020-11-03T06:00:00.000Z",
          "early_start": "2020-10-13T06:00:00.000Z",
          "early_end": "2020-10-30T06:00:00.000Z"
        }
      },
      "past": []
    },
    "fundraising": {
      "cid": "N00030602",
      "raised": 1501689.45,
      "spent": 1156825.04,
      "remaining_cash": 1268552.12,
      "debt": 0,
      "industries": [
        {
          "type": "Retired",
          "individual": 131092,
          "pacs": 0,
          "total": 131092
        },
        {
          "type": "Real Estate",
          "individual": 75735,
          "pacs": 34500,
          "total": 110235
        }
      ],
      "contributors": [
        {
          "name": "Lockheed Martin",
          "individual": 21600,
          "pacs": 8000,
          "total": 29600
        },
        {
          "name": "Maund Auto Group",
          "individual": 16800,
          "pacs": 0,
          "total": 16800
        }
      ]
    }
  }

district_test_json = {
 "id": 0,
 "name": "TX-25",
 "type": "us_house",
 "party": "R",
 "counties": [
  "Bosque",
  "Burnet",
  "Horyell",
  "Hamilton",
  "Hill",
  "Johnson",
  "Lampasas",
  "Somerville",
  "Bell",
  "Erath",
  "Hays",
  "Tarrant",
  "Travis"
 ],
 "number": 25,
 "map": "",
 "elections": {
  "current": {
   "id": 1
  },
  "past": [
   {
    "id": 0
   }
  ]
 },
 "elected_officials": [
  {
   "name": "Roger Williams",
   "id": 0
  }
 ],
 "demographics": {
  "total_population": 818807,
  "age": {
   "0": 46665,
   "5": 143625,
   "18": 513117,
   "65": 115340
  },
  "race": {
   "white": 674846,
   "black": 60306,
   "asian": 30741,
   "indigenous": 4034,
   "pacific_islander": 2261,
   "other": 46620
  },
  "ethnicity": {
   "hispanic": 152814,
   "non_hispanic": 665993
  },
  "educational_attainment": {
   "enrollment": {
    "preschool": 12457,
    "primary": 135921,
    "university": 58622
   },
   "attainment": {
    "high_school": 176522,
    "some_college": 151417,
    "bachelors": 224087
   }
  },
  "income": {
   "0": 13666,
   "10_000": 26346,
   "25_000": 49536,
   "50_000": 83419,
   "100_000": 81659,
   "200_000": 37207
  }
 }
}

district_test_json = {
    "id": 0,
    "ocd_id": "ocd-division/country:us/state:tx/cd:25",
    "type": "us_house",
    "party": "R",
    "number": 25,
    "counties": [
      "Tarrant",
      "Coryell",
      "Travis",
      "Bosque",
      "Johnson",
      "Hays",
      "Somervell",
      "Burnet",
      "Erath",
      "Hill",
      "Hamilton",
      "Lampasas",
      "Bell"
    ],
    "map": "",
    "elections": {
      "upcoming": {
        "id": 1,
        "type": {
          "class": "general"
        },
        "office": "us_house",
        "district": "TX25",
        "dates": {
          "election_day": "2020-11-03T06:00:00.000Z",
          "early_start": "2020-10-13T06:00:00.000Z",
          "early_end": "2020-10-30T06:00:00.000Z"
        }
      },
      "past": []
    },
    "elected_officials": [
      {
        "id": 1,
        "name": "Roger Williams",
        "incumbent": True,
        "party": "R",
        "image": "https://williams.house.gov/sites/williams.house.gov/files/wysiwyg_uploaded/CRW%20Official_0_0.jpg",
        "district": "TX25"
      }
    ],
    "demographics": {
      "total_population": 818807,
      "age": {
        "out_of": 818807,
        "items": [
          {
            "start": 0,
            "end": 5,
            "proportion": 5.7
          },
          {
            "start": 5,
            "end": 9,
            "proportion": 6
          },
          {
            "start": 10,
            "end": 14,
            "proportion": 7.5
          },
          {
            "start": 15,
            "end": 19,
            "proportion": 7.3
          },
          {
            "start": 20,
            "end": 24,
            "proportion": 6.1
          },
          {
            "start": 25,
            "end": 34,
            "proportion": 13.2
          },
          {
            "start": 35,
            "end": 44,
            "proportion": 14.1
          },
          {
            "start": 45,
            "end": 54,
            "proportion": 13.4
          },
          {
            "start": 55,
            "end": 59,
            "proportion": 6.6
          },
          {
            "start": 60,
            "end": 64,
            "proportion": 6
          },
          {
            "start": 65,
            "end": 74,
            "proportion": 8.7
          },
          {
            "start": 75,
            "end": 84,
            "proportion": 4.1
          },
          {
            "start": 85,
            "proportion": 1.3
          }
        ],
        "median": 37.8
      },
      "race": {
        "out_of": 818807,
        "items": [
          {
            "race": "White",
            "proportion": 0.3
          },
          {
            "race": "African American",
            "proportion": 2.1
          },
          {
            "race": "Indigenous",
            "proportion": 3.6
          },
          {
            "race": "Asian",
            "proportion": 100
          },
          {
            "race": "Native Hawaiian and other Pacific Islander",
            "proportion": 18.7
          },
          {
            "race": "Some other race",
            "proportion": 15.2
          },
          {
            "race": "Two or more races",
            "proportion": 1.2
          }
        ]
      },
      "ethnicity": {
        "out_of": 818807,
        "items": [
          {
            "ethnicity": "Hispanic or Latino",
            "proportion": 18.7
          },
          {
            "ethnicity": "Not Hispanic or Latino",
            "proportion": 81.3
          }
        ]
      },
      "education": {
        "enrollment": {
          "out_of": 207000,
          "items": [
            {
              "level": "Preschool",
              "proportion": 6
            },
            {
              "level": "Kindergarten",
              "proportion": 4.5
            },
            {
              "level": "Elementary and Middle School",
              "proportion": 40
            },
            {
              "level": "High School",
              "proportion": 21.2
            },
            {
              "level": "College or Graduate School",
              "proportion": 28.3
            }
          ]
        },
        "attainment": {
          "out_of": 552026,
          "items": [
            {
              "level": "Less than 9th grade",
              "proportion": 3.2
            },
            {
              "level": "9th to 12th grade",
              "proportion": 5.5
            },
            {
              "level": "High School Degree",
              "proportion": 23.3
            },
            {
              "level": "Some College, no degree",
              "proportion": 20.7
            },
            {
              "level": "Associate's Degree",
              "proportion": 6.7
            },
            {
              "level": "Bachelor's Degree",
              "proportion": 25.8
            },
            {
              "level": "Graduate or Professional Degree",
              "proportion": 14.8
            }
          ]
        }
      },
      "income": {
        "out_of": 291833,
        "items": [
          {
            "start": 0,
            "end": 9999,
            "proportion": 4.7
          },
          {
            "start": 10000,
            "end": 14999,
            "proportion": 2.5
          },
          {
            "start": 15000,
            "end": 24999,
            "proportion": 6.5
          },
          {
            "start": 25000,
            "end": 34999,
            "proportion": 7.4
          },
          {
            "start": 35000,
            "end": 49999,
            "proportion": 9.6
          },
          {
            "start": 50000,
            "end": 74999,
            "proportion": 16.8
          },
          {
            "start": 75000,
            "end": 99999,
            "proportion": 11.8
          },
          {
            "start": 100000,
            "end": 149999,
            "proportion": 17.9
          },
          {
            "start": 150000,
            "end": 199999,
            "proportion": 10.1
          },
          {
            "start": 200000,
            "proportion": 12.7
          }
        ],
        "median": 79975,
        "mean": 113438
      }
    }
  }

election_test_json = {
 "id": 0,
 "type": "general",
 "candidates": [
  {
   "name": "Roger Williams",
   "party": "R",
   "id": 0
  },
  {
   "name": "Julie Oliver",
   "party": "D",
   "id": 1
  },
  {
   "name": "Desarae Lindsey",
   "party": "L",
   "id": 10
  }
 ],
 "district": {
  "name": "TX-25",
  "id": 0
 },
 "dates": {
  "early_start": "2018-10-22T00:00:00+0000",
  "early_end": "2018-11-02T00:00:00+0000",
  "election_day": "2018-11-06T00:00:00+0000"
 },
 "office": "tx_house",
 "results": {
  "winner": {
   "name": "Roger Williams",
   "party": "R",
   "id": 0
  },
  "vote_counts": [
   {
    "name": "Roger Williams",
    "party": "R",
    "id": 0,
    "vote_total": 163023,
    "vote_percentage": 53.5
   },
   {
    "name": "Julie Oliver",
    "party": "D",
    "id": 1,
    "vote_total": 136385,
    "vote_percentage": 44.8
   },
   {
    "name": "Desarae Lindsey",
    "party": "L",
    "id": 10,
    "vote_total": 5145,
    "vote_percentage": 1.7
   }
  ],
  "total_voters": 304553
 }
}

election_test_json = {
    "id": 0,
    "type": {
      "class": "general"
    },
    "office": "us_house",
    "district": {
      "id": 1,
      "ocd_id": "ocd-division/country:us/state:tx/cd:25",
      "type": "us_house",
      "number": 25,
      "party": "R",
      "counties": [
        "Tarrant",
        "Coryell",
        "Travis",
        "Bosque",
        "Johnson",
        "Hays",
        "Somervell",
        "Burnet",
        "Erath",
        "Hill",
        "Hamilton",
        "Lampasas",
        "Bell"
      ]
    },
    "dates": {
      "election_day": "2020-11-03T06:00:00.000Z",
      "early_start": "2020-10-13T06:00:00.000Z",
      "early_end": "2020-10-30T06:00:00.000Z"
    },
    "candidates": [
      {
        "id": 1,
        "name": "Roger Williams",
        "incumbent": True,
        "party": "R",
        "image": "https://williams.house.gov/sites/williams.house.gov/files/wysiwyg_uploaded/CRW%20Official_0_0.jpg",
        "district": "TX25"
      }
    ]
  }
  

election_primary_test_json = {
    "id": 0,
    "type": {
        "class": "primary",
        "party": "D"
    },
    "district": 25,
    "office": "us_house",
    "dates": {
        "election_day": "2020-07-14"
    },
    "results": {
        "winner": {
            "name": "Roger Williams",
            "party": "R",
            "id": 0
        },
        "total_voters": 72111,
        "vote_counts": [
            {
                "name": "Roger Williams",
                "party": "R",
                "id": 0,
                "vote_total": 63146,
                "vote_percentage": 87.6
            },
            {
                "name": "Keith Neuendorff",
                "party": "R",
                "vote_total": 8965,
                "vote_percentage": 12.4
            }
        ]
    }
}
election_primary_test_json = {
    "id": 0,
    "type": {
      "class": "primary",
      "party": "D"
    },
    "dates": {
      "early_start": "2020-02-18T00:00:00-0600",
      "early_end": "2020-02-28T00:00:00-0600",
      "election_day": "2020-03-03T00:00:00-0500"
    },
    "district": {
      "id": 1,
      "ocd_id": "ocd-division/country:us/state:tx/cd:25",
      "type": "us_house",
      "number": 25,
      "party": "R",
      "counties": [
        "Tarrant",
        "Coryell",
        "Travis",
        "Bosque",
        "Johnson",
        "Hays",
        "Somervell",
        "Burnet",
        "Erath",
        "Hill",
        "Hamilton",
        "Lampasas",
        "Bell"
      ]
    },
    "office": "us_house",
    "results": {
      "winner": {
        "name": "Julie Oliver",
        "party": "D",
        "id": 2,
        "incumbent": False,
        "image": "https://cms-assets.berniesanders.com/media/images/julie-oliver.original.jpg",
        "district": "TX25"
      },
      "vote_counts": [
        {
          "name": "Julie Oliver",
          "party": "D",
          "id": 2,
          "vote_total": 56151,
          "vote_percentage": 69.6
        },
        {
          "name": "Heidi Sloan",
          "party": "D",
          "id": 3,
          "vote_total": 24512,
          "vote_percentage": 30.4
        }
      ],
      "total_voters": 304553
    }
  }

@app.route('/politician', methods=['GET'])
def politicians():
    name = request.args.get('name')
    party = request.args.get('party')
    district = request.args.get('district')
    current_office = request.args.get('current_office')
    incumbent = request.args.get('incumbent')
    
    l = [name, party, district, current_office, incumbent]
    # print(l)

    page = request.args.get('page')
    if page != None:
        return get_pages(int(page), "politician")

    return politician_test_json

@app.route('/politician/<int:id>', methods=['GET'])
def politician_id(id):
    if id == 0:
        return politician_test_json
    else:
        return make_response("Error: Politician not found", 404)

@app.route('/district', methods=['GET'])
def districts():
    dist_type = request.args.get('type')
    party = request.args.get('party')
    county = request.args.get('county')
    number = request.args.get('number')
    address = request.args.get('address')
    
    l = [dist_type, party, county, number, address]
    # print(l)

    page = request.args.get('page')
    if page != None:
        return get_pages(int(page), "district")

    return district_test_json

@app.route('/district/<int:id>', methods=['GET'])
def district_id(id):
    if id == 0:
        return district_test_json
    else:
        return make_response("Error: District not found", 404)

@app.route('/election', methods=['GET'])
def elections():
    election_type = request.args.get('type')
    candidates = request.args.get('candidates')
    district = request.args.get('district')
    winner = request.args.get('winner')
    office = request.args.get('office')

    # TODO might have to change later
    page = request.args.get('page')
    if page != None:
        return get_pages(int(page), "election")
    
    l = [election_type, candidates, district, winner, office]
    # print(l)

    return election_test_json


# currently hardcoded kinda
def get_pages(page, model):
    dic = {'total': 35}
    if page == 1:
        if model == "election":
            dic.update({'page': [election_test_json] * 20})
        elif model == "district":
            dic.update({'page': [district_test_json] * 20})
        elif model == "politician":
            dic.update({'page': [politician_test_json] * 20})
        return dic
    elif page == 2:
        if model == "election":
            dic.update({'page': [election_test_json] * 15})
        elif model == "district":
            dic.update({'page': [district_test_json] * 15})
        elif model == "politician":
            dic.update({'page': [politician_test_json] * 15})
        return dic
    else:
       return make_response("Error: page not found", 404) 
        

@app.route('/election/<int:id>', methods=['GET'])
def election_id(id):
    if id == 0:
        return election_test_json
    else:
        return make_response("Error: Election not found", 404)

@app.route('/')
def hello_world():
    return 'Hello World 2.0!'

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = 5000, debug = True)
