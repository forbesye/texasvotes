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
    print(request.query_string)
    name = request.args.get('name')
    party = request.args.get('party')
    district = request.args.get('district')
    current_office = request.args.get('current_office')
    incubment = request.args.get('incubment')
    # print(name)
    # print(party)
    # print(district)
    # print(current_office)
    # print(incubment)
    # l = {name, party, district, current_office, incubment}
    # print(l)
    # return name  

@app.route('/')
def hello_world():
    return 'Hello World 2.0!'

if __name__ == '__main__':
    #print(os.getenv("AWS_DEV_DB"))
    # app.run(port=8080, debug=True)
    app.run(host = "0.0.0.0", port = 5000, debug = True)
