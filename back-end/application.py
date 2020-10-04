from flask import Flask
from dotenv import load_dotenv
import os
#from sqlalchemy import create_engine
# import mysql.connector
# from flask_sqlalchemy import SQLAlchemy
load_dotenv()
application = Flask(__name__)
# application.config['SQLALCHEMY_DATABASE_URI'] = 'some env var'
# db = SQLAlchemy(application)

# class About(db.Model):
#     __tablename__ = "about"
#     id = db.Column('id', db.Integer, primary_key=True)
#     first_name = db.Column('first_name', db.Unicode)
#     last_name = db.Column('last_name', db.Unicode)

#     def __repr__(self):
#         return '<User %r>' % self.first_name

@application.route('/')
def hello_world():
    return 'Hello, World 2.0!'

if __name__ == '__main__':
    print(os.getenv("AWS_DEV_DB"))
    application.run(debug=True, port=8080)
