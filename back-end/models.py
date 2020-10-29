from flask import Flask, request, make_response, jsonify
from db import init_db
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from marshmallow import fields, post_dump

app = Flask(__name__)
CORS(app)
db = init_db(app)
ma = Marshmallow(app)


# Association table between politicians and elections, many-to-many relationship
link_politician_elections = db.Table(
    "link_politician_elections",
    db.Column(
        "politician_id", db.Integer, db.ForeignKey("politician.id"), primary_key=True
    ),
    db.Column(
        "election_id", db.Integer, db.ForeignKey("election.id"), primary_key=True
    ),
)

# Association table between districts and counties, many-to-many relationship
link_districts_counties = db.Table(
    "link_districts_counties",
    db.Column(
        "district_id", db.Integer, db.ForeignKey("district.id"), primary_key=True
    ),
    db.Column("county_id", db.Integer, db.ForeignKey("counties.id"), primary_key=True),
)


class Politician(db.Model):
    __tablename__ = "politician"
    id = db.Column(db.Integer, primary_key=True)
    # Foreign key for associated district, one-to-many relationship
    district_id = db.Column(db.Integer, db.ForeignKey("district.id"), nullable=True)
    # All associated elections, many-to-many relationship
    elections = db.relationship(
        "Election",
        secondary=link_politician_elections,
        backref=db.backref("politicians", lazy="dynamic"),
    )
    # Variables
    name = db.Column(db.String, nullable=False)
    district_number = db.Column(db.Integer, nullable=True, default=-1)
    incumbent = db.Column(db.Boolean, nullable=False)
    current = db.Column(db.Boolean, nullable=False, default=False)
    office = db.Column(db.String, nullable=True)
    party = db.Column(db.String, nullable=False)
    img_url = db.Column(
        db.String,
        nullable=False,
        default="https://smhlancers.org/wp-content/uploads/2016/06/profile-placeholder.png",
    )
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
        return "<Politician %s>" % self.name


class District(db.Model):
    __tablename__ = "district"
    id = db.Column(db.Integer, primary_key=True)
    # All associated politicians, one-to-many relationship
    politicians = db.relationship("Politician", backref="current_district")
    # All associated elections, one-to-many relationship
    elections = db.relationship("Election", backref="current_district")
    # All associated counties, many-to-many relationship
    counties = db.relationship(
        "Counties",
        secondary=link_districts_counties,
        backref=db.backref("districts", lazy="joined"),
    )
    # Variables
    ocd_id = db.Column(db.String, nullable=False)
    type_name = db.Column(db.String, nullable=True)  # Look into
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
        return "<District %s %s>" % (self.type_name, self.number)


class Election(db.Model):
    __tablename__ = "election"
    id = db.Column(db.Integer, primary_key=True)
    # Foreign key for associated district, one-to-many relationship
    district_id = db.Column(db.Integer, db.ForeignKey("district.id"), nullable=True)
    # Variables
    class_name = db.Column(db.String, nullable=False)
    party = db.Column(db.String, nullable=True)
    office = db.Column(db.String, nullable=False)
    district_number = db.Column(db.Integer, nullable=False)
    election_day = db.Column(db.String, nullable=False)
    early_start = db.Column(db.String, nullable=False)
    early_end = db.Column(db.String, nullable=False)
    video_url = db.Column(
        db.String, nullable=True, default="https://www.youtube.com/watch?v=uC0uzrfUClc"
    )
    total_voters = db.Column(db.Integer, nullable=True)
    results = db.Column(db.JSON, nullable=True)

    def __repr__(self):
        return "<Election %s %s>" % (self.office, self.district_number)


class Counties(db.Model):
    __tablename__ = "counties"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)

    def __repr__(self):
        return "<County %s>" % self.name


class BaseSchema(ma.Schema):
    SKIP_VALUES = [None]

    @post_dump
    def remove_skip_values(self, data, **kargs):
        return {
            key: value for key, value in data.items() if value not in self.SKIP_VALUES
        }


class PoliticianSchema(BaseSchema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    district = fields.Nested(
        "DistrictSchema",
        only=("id", "type", "number", "counties", "ocd_id", "party"),
        required=True,
        attribute="current_district",
    )
    election = fields.Nested(
        "ElectionSchema",
        only=(
            "id",
            "office",
            "class_name",
            "district",
            "election_day",
            "early_start",
            "early_end",
        ),
        required=True,
        attribute="elections",
        many=True,
    )

    incumbent = fields.Bool(required=True)
    current = fields.Bool(required=True)
    office = fields.Str(required=True)

    party = fields.Str(required=True)
    image = fields.Str(required=False, attribute="img_url")

    website = fields.Str(required=True)
    facebook = fields.Str(required=True)
    twitter = fields.Str(required=True)
    youtube = fields.Str(required=True)
    phone = fields.Str(required=True, attribute="phone_number")

    fund_raise = fields.Int(required=False)
    fund_spent = fields.Int(required=False)
    fund_remain = fields.Int(required=False)
    fund_debt = fields.Int(required=False)
    fund_industries = fields.Str(required=False)
    fund_contributors = fields.Str(required=False)


class CountySchema(BaseSchema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)


class DistrictSchema(BaseSchema):
    id = fields.Int(required=True)
    type = fields.Str(required=True, attribute="type_name")
    number = fields.Int(required=True)
    elected_officials = fields.Nested(
        "PoliticianSchema",
        only=("id", "name", "party", "image", "incumbent", "current", "district"),
        required=True,
        attribute="politicians",
        many=True,
    )
    elections = fields.Nested(
        "ElectionSchema",
        only=("id", "office", "class_name", "election_day", "early_start", "early_end"),
        required=True,
        many=True,
    )
    counties = fields.Pluck(CountySchema, "name", many=True)
    ocd_id = fields.Str(required=True)
    type = fields.Str(required=True, attribute="type_name")
    party = fields.Str(required=False)
    number = fields.Int(required=False)
    total_population = fields.Int(required=True)
    age_out_of = fields.Int(required=True)
    age_stats = fields.Str(required=True)
    race_out_of = fields.Int(required=True)
    race_stats = fields.Str(required=True)
    ethnicity_out_of = fields.Int(required=False)
    ethnicity_stats = fields.Str(required=False)
    enrollment_out_of = fields.Int(required=True)
    enrollment_stats = fields.Str(required=True)
    attainment_out_of = fields.Int(required=True)
    attainment_stats = fields.Str(required=True)
    income_out_of = fields.Int(required=True)
    income_stats = fields.Str(required=True)


class ElectionSchema(BaseSchema):
    id = fields.Int(required=True)
    office = fields.Str(required=True)
    district = fields.Nested(
        "DistrictSchema",
        only=("id", "ocd_id", "type", "number", "party", "counties"),
        required=True,
        attribute="current_district",
    )
    candidates = fields.Nested(
        "PoliticianSchema",
        only=("id", "name", "party", "image", "district", "incumbent"),
        required=True,
        attribute="politicians",
        many=True,
    )
    class_name = fields.Str(required=True)
    party = fields.Str(required=False)
    office = fields.Str(required=True)
    election_day = fields.Str(required=True)
    early_start = fields.Str(required=True)
    early_end = fields.Str(required=True)
    video_url = fields.Str(required=True)


politician_schema = PoliticianSchema()
district_schema = DistrictSchema()
election_schema = ElectionSchema()
