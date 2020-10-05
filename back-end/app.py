from flask import Flask
#from dotenv import load_dotenv
from flask import request, make_response
import os
import requests
import json
#from sqlalchemy import create_engine
# import mysql.connector
# from flask_sqlalchemy import SQLAlchemy
#load_dotenv()
app = Flask(__name__)
application = app # This is for AWS Elastic Beanstalk, pls don't remove!!!
# app.config['SQLALCHEMY_DATABASE_URI'] = 'some env var'
# db = SQLAlchemy(app)

# class About(db.Model):
#     __tablename__ = "about"
#     id = db.Column('id', db.Integer, primary_key=True)
#     first_name = db.Column('first_name', db.Unicode)
#     last_name = db.Column('last_name', db.Unicode)

#     def __repr__(self):
#         return '<User %r>' % self.first_name


# going to start making routes

politician_test_json = {"id": 0,"name": "Roger Williams","elected": True,"party": "R","terms": {"current": 4,"total": 5},
        "offices": {"current": "us_house","past": ["tx_secretary_of_state"]},
        "district": {"name": "TX-25","id": 1},
        "biography": "Roger Williams represents the 25th congressional district of Texas which stretches from Tarrant County in the north to Hays County in the south and includes much of the Texas Hill Country and Austin.",
        "image": "https://williams.house.gov/sites/williams.house.gov/files/wysiwyg_uploaded/CRW%20Official_0_0.jpg",
        "socials": {"facebook": "http://www.facebook.com/RepRogerWilliams","twitter": "http://twitter.com/RepRWilliams",
        "youtube": "http://www.youtube.com/channel/UCBtfmMMQarjtLB9U_pWMOhw"},
        "website": "https://williams.house.gov/","elections": {"upcoming": {"id": 1},"past": [{"id": 2},{"id": 3},{"id": 4},{"id": 5}]},
        "fundraising": {"raised": 1501689,"spent": 1156825,"remaining_cash": 1268552,"contributors": [{"type": "small_individual",
        "amount": 10407},{"type": "large_individual","amount": 331010},{"type": "pac","amount": 535343},{"type": "other","amount": 625289}]}}

@app.route('/politician', methods=['GET'])
def politicians():
    name = request.args.get('name')
    party = request.args.get('party')
    district = request.args.get('district')
    current_office = request.args.get('current_office')
    incumbent = request.args.get('incumbent')
    
    l = [name, party, district, current_office, incumbent]
    print(l)
    # return name
    return json.dumps(l)

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
    print(l)
    # return name
    return json.dumps(l)

@app.route('/district/<int:id>', methods=['GET'])
def district_id(id):
    return str(id)

@app.route('/election', methods=['GET'])
def elections():
    election_type = request.args.get('type')
    candidates = request.args.get('candidates')
    district = request.args.get('district')
    winner = request.args.get('winner')
    office = request.args.get('office')
    
    l = [election_type, candidates, district, winner, office]
    print(l)
    # return name
    return json.dumps(l)

@app.route('/election/<int:id>', methods=['GET'])
def election_id(id):
    return str(id)

@app.route('/')
def hello_world():
    return 'Hello World 2.0!'

if __name__ == '__main__':
    #print(os.getenv("AWS_DEV_DB"))
    # app.run(port=8080, debug=True)
    app.run(host = "0.0.0.0", port = 5000, debug = True)
