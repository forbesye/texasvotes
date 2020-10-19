from models import Politician, District, Election, Counties, db, app, politician_schema, district_schema, election_schema
from flask import Flask, request, make_response, jsonify
import requests
import json
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
 "district": {
  "name": "TX-25",
  "id": 1
 },
 "biography": "Roger Williams represents the 25th congressional district of Texas which stretches from Tarrant County in the north to Hays County in the south and includes much of the Texas Hill Country and Austin.",
 "image": "https://williams.house.gov/sites/williams.house.gov/files/wysiwyg_uploaded/CRW%20Official_0_0.jpg",
 "socials": {
  "facebook": "http://www.facebook.com/RepRogerWilliams",
  "twitter": "http://twitter.com/RepRWilliams",
  "youtube": "http://www.youtube.com/channel/UCBtfmMMQarjtLB9U_pWMOhw"
 },
 "website": "https://williams.house.gov/",
 "elections": {
  "upcoming": {
   "id": 1
  },
  "past": [
   {
    "id": 2
   },
   {
    "id": 3
   },
   {
    "id": 4
   },
   {
    "id": 5
   }
  ]
 },
 "fundraising": {
  "raised": 1501689,
  "spent": 1156825,
  "remaining_cash": 1268552,
  "contributors": [
   {
    "type": "small_individual",
    "amount": 10407
   },
   {
    "type": "large_individual",
    "amount": 331010
   },
   {
    "type": "pac",
    "amount": 535343
   },
   {
    "type": "other",
    "amount": 625289
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

def format_contact(p):
    contact = {}

    if "website" in p:
        contact["website"] = p.pop("website")

    social = []

    if "facebook" in p:
        social.append({"type":"facebook", "id":p.pop("facebook")})
    if "twitter" in p:
        social.append({"type":"twitter", "id":p.pop("twitter")})
    if "youtube" in p:
        social.append({"type":"youtube", "id":p.pop("youtube")})

    if social:
        contact["social_media"] = social

    if "phone" in p:
        contact["phone"] = p.pop("phone")

    p["contact"] = contact

def format_office(p):
    current = p.pop("current")
    office = p.pop("office")

    if current:
        p["current"] = office
    else:
        p["running_for"] = office

def format_fundraising(p):
    fundraising = {}

    if "fund_raise" in p:
        fundraising["raised"] = p.pop("fund_raise")
    if "fund_spent" in p:
        fundraising["spent"] = p.pop("fund_spent")
    if "fund_remain" in p:
        fundraising["remaining_cash"] = p.pop("fund_remain")
    if "fund_debt" in p:
        fundraising["debt"] = p.pop("fund_debt")
    if "fund_industries" in p:
        fundraising["industries"] = json.loads(p.pop("fund_industries").replace("'", '"'))
    if "fund_contributors" in p:
        fundraising["contributors"] = json.loads(p.pop("fund_contributors").replace("'", '"'))

    p["fundraising"] = fundraising

def format_dates(election):
    global date_types
    dates = {}

    for date in date_types:
        if date in election:
            dates[date] = election.pop(date)

    election["dates"] = dates

def format_election_district(election):
    if "district" in election:
        election["district"] = {"type":election["district"]["type"], "number":election["district"]["number"]}

def format_election_in_politician(politician):
    if "election" in politician and len(politician["election"]) > 0:
        politician["election"] = politician["election"][0]
        format_dates(politician["election"])
        format_election_district(politician["election"])

@app.route('/politician', methods=['GET'])
def politicians():
    '''
    name = request.args.get('name')
    party = request.args.get('party')
    district = request.args.get('district')
    current_office = request.args.get('current_office')
    incumbent = request.args.get('incumbent')
    
    l = [name, party, district, current_office, incumbent]
    # print(l)
    '''

    page = request.args.get('page')
    if page == None:
        page = 1
    else:
        page = int(page)

    politicians = db.session.query(Politician).paginate(page=page)
    count = politicians.total

    result = politician_schema.dump(politicians.items, many=True)

    for r in result:
        format_office(r)
        format_contact(r)
        format_fundraising(r)
        format_election_in_politician(r)

    return {"page":result, "count":count}

@app.route('/politician/<int:id>', methods=['GET'])
def politician_id(id):
    politician = db.session.query(Politician).filter_by(id=id)

    politician = politician_schema.dump(politician, many=True)[0]

    format_office(politician)
    format_contact(politician)
    format_fundraising(politician)
    format_election_in_politician(politician)

    return politician

def format_elected_officials(d):
    elected_officials = d.pop("elected_officials")

    elected_officials = [e for e in elected_officials if e["current"]]

    for e in elected_officials:
        e.pop("current")

    if elected_officials:
        d["elected_officials"] = elected_officials

def format_demo_type(type, district):
    demo_type = {}

    if (type + "_out_of") in district:
        demo_type["out_of"] = district.pop(type + "_out_of")
    if (type + "_stats") in district:
        # TODO: Find some way to be able to parse the json's correctly
        # Must either remove any ' that don't enclose a whole string or replace all ' enclosing
        # a whole string with "
        try:
            demo_type["items"] = json.loads(district.pop(type + "_stats").replace("'", '"'))
        except json.decoder.JSONDecodeError:
            pass

    if demo_type:
        return {type:demo_type}

    return None

demos = ["age", "race", "ethnicity", "income"]
edus = ["enrollment", "attainment"]

def format_education(district):
    educations = {}

    for edu in edus:
        results = format_demo_type(edu, district)
        if results:
            educations.update(results)

    return {"education":educations}

def format_demographics(district):
    global demos
    demographics = {}

    if "total_population" in district:
        demographics["total_population"] = district.pop("total_population")

    for demo in demos:
        results = format_demo_type(demo, district)
        if results:
            demographics.update(results)

    demographics.update(format_education(district))

    district["demographics"] = demographics


@app.route('/district', methods=['GET'])
def districts():
    '''
    dist_type = request.args.get('type')
    party = request.args.get('party')
    county = request.args.get('county')
    number = request.args.get('number')
    address = request.args.get('address')
    
    l = [dist_type, party, county, number, address]
    # print(l)
    '''

    page = request.args.get('page')
    if page == None:
        page = 1
    else:
        page = int(page)

    districts = db.session.query(District).paginate(page=page)
    count = districts.total

    result = district_schema.dump(districts.items, many=True)

    for r in result:
        format_elected_officials(r)
        format_demographics(r)

    return {"page":result, "count":count}

@app.route('/district/<int:id>', methods=['GET'])
def district_id(id):
    if id == 0:
        return district_test_json
    else:
        return make_response("Error: District not found", 404)

def format_type(election):
    type_election = {}

    if "class_name" in election:
        type_election["class"] = election.pop("class_name")

    if type_election:
        election.update({"type":type_election})

date_types = ["election_day", "early_start", "early_end"]

def format_districts(election):
    for politician in election["candidates"]:
        if "district" in politician:
            politician["district"] = {"type":politician["district"]["type"], "number":politician["district"]["number"]}

@app.route('/election', methods=['GET'])
def elections():
    '''
    election_type = request.args.get('type')
    candidates = request.args.get('candidates')
    district = request.args.get('district')
    winner = request.args.get('winner')
    office = request.args.get('office')
    
    l = [election_type, candidates, district, winner, office]
    # print(l)
    '''

    page = request.args.get('page')
    if page == None:
        page = 1
    else:
        page = int(page)

    elections = db.session.query(Election).paginate(page=page)
    count = elections.total

    result = election_schema.dump(elections.items, many=True)

    for r in result:
        format_type(r)
        format_dates(r)
        format_districts(r)

    return {"page":result, "count":count}


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
