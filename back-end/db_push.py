from app import db
import os
import json
from models import Politician, District, Election, Counties
curr_directory = os.path.dirname(__file__)

def populate_politicians():
    print("Starting populate_politicians...")
    dir_name = 'data/Politicians'
    for file_name in os.listdir(dir_name):
        full_path = "%s/%s" % (dir_name, file_name)
        with open(full_path, 'r') as fi:
            politician_json = json.load(fi)
            push_politician(politician_json)
    db.session.commit()
    print("Politicians added!")

def push_politician(data):
    entry = dict()
    entry["name"] = data["name"]
    entry["incumbent"] = data["incumbent"]
    entry["party"] = data["party"]
    entry["img_url"] = data["image"]
    if "district" in data:
        entry["district_number"] = data["district"]
    if "current" in data["offices"]:
        entry["current"] = True
        entry["office"] = data["offices"]["current"]
    if "running_for" in data["offices"]:
        entry["current"] = False
        entry["office"] = data["offices"]["running_for"]
    if "website" in data["contact"]:
        entry["website"] = data["contact"]["website"]
    if data["contact"]["social_media"]:
        for social in data["contact"]["social_media"]:
            if social["type"].lower() == "facebook" and social["id"] != "":
                entry["facebook"] = social["id"]
            if social["type"].lower() == "twitter" and social["id"] != "":
                entry["twitter"] = social["id"]
            if social["type"].lower() == "youtube" and social["id"] != "":
                entry["youtube"] = social["id"]
    if "phone" in data["contact"]:
        entry["phone_number"] = data["contact"]["phone"]
    if "fundraising" in data and data["fundraising"]:
        entry["fund_raise"] = int(data["fundraising"]["raised"])
        entry["fund_spent"] = int(data["fundraising"]["spent"])
        entry["fund_remain"] = int(data["fundraising"]["remaining_cash"])
        entry["fund_debt"] = int(data["fundraising"]["debt"])
        entry["fund_industries"] = data["fundraising"]["industries"]
        entry["fund_contributors"] = data["fundraising"]["contributors"]
    politician_db_instance = Politician(**entry)
    db.session.add(politician_db_instance)

def populate_districts():
    print("Starting populate_districts...")
    dir_name = 'data/Districts'
    for file_name in os.listdir(dir_name):
        full_path = "%s/%s" % (dir_name, file_name)
        with open(full_path, 'r') as fi:
            district_json = json.load(fi)
            push_district(district_json)
    db.session.commit()
    print("Districts added!")

def push_district(data):
    entry = dict()
    entry["ocd_id"] = data["ocd_id"]
    entry["type_name"] = data["type"]
    entry["party"] = data["party"]
    entry["number"] = data["number"]
    entry["total_population"] = data["demographics"]["total_population"]
    entry["age_out_of"] = data["demographics"]["age"]["out_of"]
    entry["age_stats"] = data["demographics"]["age"]["items"]
    entry["race_out_of"] = data["demographics"]["race"]["out_of"]
    entry["race_stats"] = data["demographics"]["race"]["items"]
    entry["enrollment_out_of"] = data["demographics"]["education"]["enrollment"]["out_of"]
    entry["enrollment_stats"] = data["demographics"]["education"]["enrollment"]["items"]
    entry["attainment_out_of"] = data["demographics"]["education"]["attainment"]["out_of"]
    entry["attainment_stats"] = data["demographics"]["education"]["attainment"]["items"]
    entry["income_out_of"] = data["demographics"]["income"]["out_of"]
    entry["income_stats"] = data["demographics"]["income"]["items"]
    if "ethnicity" in data["demographics"]:
        entry["ethnicity_out_of"] = data["demographics"]["ethnicity"]["out_of"]
        entry["ethnicity_stats"] = data["demographics"]["ethnicity"]["items"]

    district_db_instance = District(**entry)
    for county in data["counties"]:
        push_county(county, district_db_instance)
    db.session.add(district_db_instance)

def push_county(county_name, district):
    exists = db.session.query(Counties).filter_by(name=county_name).first()
    if not exists:
        entry = dict()
        entry["name"] = county_name
        county_db_instance = Counties(**entry)
        district.counties.append(county_db_instance)
        db.session.add(county_db_instance)
    else:
        district.counties.append(exists)

def populate_elections():
    print("Starting populate_elections...")
    dir_name = 'data/Elections'
    for file_name in os.listdir(dir_name):
        full_path = "%s/%s" % (dir_name, file_name)
        with open(full_path, 'r') as fi:
            election_json = json.load(fi)
            push_election(election_json)
    db.session.commit()
    print("Elections added!")

def push_election(data):
    entry = dict()
    entry["class_name"] = data["type"]["class"]
    if data["type"]["class"].lower() == "primary":
        entry["party"] = data["type"]["party"]
    entry["office"] = data["office"]
    entry["district_number"] = data["district"]
    entry["election_day"] = data["dates"]["election_day"]
    entry["early_start"] = data["dates"]["early_start"]
    entry["early_end"] = data["dates"]["early_end"]
    entry["video_url"] = data["video_url"]
    election_db_instance = Election(**entry)
    db.session.add(election_db_instance)

def link_politicians_districts():
    politicians = db.session.query(Politician).all()
    for pol in politicians:
        temp_district = db.session.query(District).filter_by(number=pol.district_number, type_name=pol.office).first()
        pol.current_district = temp_district
    db.session.commit()

def link_elections_districts():
    elections = db.session.query(Election).all()
    for election in elections:
        temp_district = db.session.query(District).filter_by(number=election.district_number, type_name=election.office).first()
        election.current_district = temp_district
    db.session.commit()

def link_politicians_elections():
    politicians = db.session.query(Politician).all()
    for pol in politicians:
        elections = db.session.query(Election).filter_by(office=pol.office, district_number=pol.district_number).all()
        for election in elections:
            election.politicians.append(pol)
    db.session.commit()

def reset_db():
    # Be VERYYY careful with this...
    db.session.remove()
    db.drop_all()
    db.create_all()
    print("Database reset")

if __name__ == '__main__':
    print("Initiating db push...")
    reset_db()
    populate_politicians()
    populate_districts()
    populate_elections()
    link_politicians_districts()
    link_elections_districts()
    link_politicians_elections()