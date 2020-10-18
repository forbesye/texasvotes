from flask import Flask, request, make_response, jsonify
from db import init_db
from flask_marshmallow import Marshmallow
app = Flask(__name__)
db = init_db(app)
ma = Marshmallow(app)


# Association table between politicians and elections, many-to-many relationship
link_politician_elections = db.Table('link_politician_elections',
    db.Column('politician_id', db.Integer, db.ForeignKey('politician.id'), primary_key=True),
    db.Column('election_id', db.Integer, db.ForeignKey('election.id'), primary_key=True)
)

# Association table between districts and counties, many-to-many relationship
link_districts_counties = db.Table('link_districts_counties',
    db.Column('district_id', db.Integer, db.ForeignKey('district.id'), primary_key=True),
    db.Column('county_id', db.Integer, db.ForeignKey('counties.id'), primary_key=True)
)

class Politician(db.Model):
    __tablename__ = 'politician'
    id = db.Column(db.Integer, primary_key=True)
    # Foreign key for associated district, one-to-many relationship
    district_id = db.Column(db.Integer, db.ForeignKey('district.id'), nullable=True)
    # All associated elections, many-to-many relationship
    elections = db.relationship('Election', secondary=link_politician_elections, backref=db.backref('politicians', lazy='joined'))
    # Variables
    name = db.Column(db.String, nullable=False)
    district_number = db.Column(db.Integer, nullable=True, default=-1)
    incumbent = db.Column(db.Boolean, nullable=False)
    current = db.Column(db.Boolean, nullable=True, default=False)
    office = db.Column(db.String, nullable=True)
    party = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False, default="https://smhlancers.org/wp-content/uploads/2016/06/profile-placeholder.png")
    website = db.Column(db.String, nullable=True)
    facebook = db.Column(db.String, nullable=True)
    twitter = db.Column(db.String, nullable=True)
    youtube = db.Column(db.String, nullable=True)
    phone_number = db.Column(db.String, nullable=True)
    # Fundraisers are for federal politicians only
    fund_raise = db.Column(db.Integer, nullable=True)
    fund_spent = db.Column(db.Integer, nullable=True)
    fund_remain = db.Column(db.Integer, nullable=True)
    fund_debt = db.Column(db.Integer, nullable=True)
    fund_industries = db.Column(db.JSON, nullable=True)
    fund_contributors = db.Column(db.JSON, nullable=True)

    def __repr__(self):
        return '<Politician %s>' % self.name

class District(db.Model):
    __tablename__ = 'district'
    id = db.Column(db.Integer, primary_key=True)
    # All associated politicians, one-to-many relationship
    politicians = db.relationship('Politician', backref='current_district')
    # All associated elections, one-to-many relationship
    elections = db.relationship('Election', backref='current_district')
    # All associated counties, many-to-many relationship
    counties = db.relationship('Counties', secondary=link_districts_counties, backref=db.backref('districts', lazy='joined'))
    # Variables
    ocd_id = db.Column(db.String, nullable=False)
    type_name = db.Column(db.String, nullable=True) # Look into
    party = db.Column(db.String, nullable=True)
    number = db.Column(db.Integer, nullable=True)
    map_url = db.Column(db.String, nullable=False, default="")
    total_population = db.Column(db.Integer, nullable=False)
    age_out_of = db.Column(db.Integer, nullable=False)
    age_stats = db.Column(db.JSON, nullable=False)
    race_out_of = db.Column(db.Integer, nullable=False)
    race_stats = db.Column(db.JSON, nullable=False)
    ethnicity_out_of = db.Column(db.Integer, nullable=True)
    ethnicity_stats = db.Column(db.JSON, nullable=True)
    enrollment_out_of = db.Column(db.Integer, nullable=False)
    enrollment_stats = db.Column(db.JSON, nullable=False)
    attainment_out_of = db.Column(db.Integer, nullable=False)
    attainment_stats = db.Column(db.JSON, nullable=False)
    income_out_of = db.Column(db.Integer, nullable=False)
    income_stats = db.Column(db.JSON, nullable=False)

    def __repr__(self):
        return '<District %s %s>' % (self.type_name, self.number)

class Election(db.Model):
    __tablename__ = 'election'
    id = db.Column(db.Integer, primary_key=True)
    # Foreign key for associated district, one-to-many relationship
    district_id = db.Column(db.Integer, db.ForeignKey('district.id'), nullable=True)
    # Variables
    class_name = db.Column(db.String, nullable=False)
    party = db.Column(db.String, nullable=True)
    office = db.Column(db.String, nullable=False)
    district_number = db.Column(db.Integer, nullable=False)
    election_day = db.Column(db.String, nullable=False)
    early_start = db.Column(db.String, nullable=False)
    early_end = db.Column(db.String, nullable=False)

    def __repr__(self):
        return '<Election %s %s>' % (self.office, self.district_number)

class Counties(db.Model):
    __tablename__ = 'counties'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)

    def __repr__(self):
        return '<County %s>' % self.name


class Politician_Schema(ma.Schema):