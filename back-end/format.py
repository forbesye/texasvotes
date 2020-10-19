import json

def format_district_in_schema(schema):
    if "district" in schema:
        schema["district"] = {"type":schema["district"]["type"], "number":schema["district"]["number"]}

medias = ["facebook", "twitter", "youtube"]

def format_politician_contact(p):
    global medias

    contact = {}

    if "website" in p:
        contact["website"] = p.pop("website")

    social = []

    for media in medias:
        if media in p:
            social.append({"type":media, "id":p.pop(media)})

    if social:
        contact["social_media"] = social

    if "phone" in p:
        contact["phone"] = p.pop("phone")

    p["contact"] = contact

def format_politician_office(p):
    if "current" in p:
        current = p.pop("current")
    else:
        current = False

    if "office" in p:
        office = p.pop("office")
    else:
        return

    if current:
        p["current"] = office
    else:
        p["running_for"] = office

before_funds = ["fund_raise", "fund_spent", "fund_remain", "fund_debt"]
after_funds = ["raised", "spent", "remaining_cash", "debt"]
json_funds = ["industries", "contributors"]

def format_politician_fundraising(p):
    global before_funds, after_funds, json_funds

    fundraising = {}

    for i in range(len(before_funds)):
        if before_funds[i] in p:
            fundraising[after_funds[i]] = p.pop(before_funds[i])

    for j in json_funds:
        if "fund_" + j in p:
            try:
                fundraising[j] = json.loads(p.pop("fund_" + j).replace("'", '"'))
            except json.decoder.JSONDecodeError:
                pass

    if fundraising:
        p["fundraising"] = fundraising

def format_districts_in_politicians(politicians):
    for p in politicians:
        format_district_in_schema(p)

def format_election_in_politician(politician):
    if "election" in politician and len(politician["election"]) > 0:
        politician["election"] = politician["election"][0]
        format_election_type(politician["election"])
        format_election_dates(politician["election"])
        format_district_in_schema(politician["election"])

def format_politician(politician):
    format_politician_office(politician)
    format_politician_contact(politician)
    format_politician_fundraising(politician)
    format_election_in_politician(politician)

def format_district_demo_type(type, district):
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

def format_district_elected_officials(d):
    elected_officials = d.pop("elected_officials")

    elected_officials = [e for e in elected_officials if ("current" in e and e["current"])]

    for e in elected_officials:
        e.pop("current")

    if elected_officials:
        d["elected_officials"] = elected_officials

demos = ["age", "race", "ethnicity", "income"]
edus = ["enrollment", "attainment"]

def format_district_education(district):
    educations = {}

    for edu in edus:
        results = format_district_demo_type(edu, district)
        if results:
            educations.update(results)

    return {"education":educations}

def format_district_demographics(district):
    global demos
    demographics = {}

    if "total_population" in district:
        demographics["total_population"] = district.pop("total_population")

    for demo in demos:
        results = format_district_demo_type(demo, district)
        if results:
            demographics.update(results)

    demographics.update(format_district_education(district))

    district["demographics"] = demographics

def format_elections_in_district(elections):
    for e in elections:
        format_election_dates(e)
        format_election_type(e)

def format_district(district):
    format_district_elected_officials(district)
    format_district_demographics(district)

    if "elections" in district:
        format_elections_in_district(district["elections"])
    
    if "elected_officials" in district:
        format_districts_in_politicians(district["elected_officials"])

date_types = ["election_day", "early_start", "early_end"]

def format_election_dates(election):
    global date_types
    dates = {}

    for date in date_types:
        if date in election:
            dates[date] = election.pop(date)

    election["dates"] = dates

def format_election_district(election):
    if "district" in election:
        district = election["district"]

        formatted = {}

        if "type" in district:
            formatted.update({"type":district["type"]})
        
        if "number" in district:
            formatted.update({"number":district["number"]})

        if formatted:
            election["district"] = formatted
        else:
            election.pop("district")

def format_election_type(election):
    type_election = {}

    if "class_name" in election:
        type_election["class"] = election.pop("class_name")

    if type_election:
        election.update({"type":type_election})

def format_election_districts(election):
    for politician in election["candidates"]:
        format_district_in_schema(politician)

def format_election(election):
    format_election_type(election)
    format_election_dates(election)
    format_election_districts(election)