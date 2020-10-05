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
    return str(id)

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
