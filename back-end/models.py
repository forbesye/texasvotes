from app import db

class Politician(db.Model):
    __tablename__ = 'politician'
    id = db.Column(db.Integer, primary_key=True)
    district_id = db.Column(db.Integer, db.ForeignKey('district.id'), nullable=False)
    fundraising_instances = db.relationship('Fundraising', backref='politician', lazy=True)
    name = db.Column(db.String, nullable=False)
    party = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    website = db.Column(db.String, nullable=True)
    facebook = db.Column(db.String, nullable=True)
    twitter = db.Column(db.String, nullable=True)
    youtube = db.Column(db.String, nullable=True)
    phone_number = db.Column(db.String, nullable=True)
    fund_raise = db.Column(db.Integer, nullable=True)
    fund_spent = db.Column(db.Integer, nullable=True)
    fund_remain = db.Column(db.Integer, nullable=True)
    fund_debt = db.Column(db.Integer, nullable=True)

class District(db.Model):
    __tablename__ = 'district'
    id = db.Column(db.Integer, primary_key=True)
    politicians = db.relationship('Politician', backref='district', lazy=True)
    elections = db.relationship('Elections', backref='district', lazy=True)
    ocd_id = db.Column(db.String, nullable=False)
    type_name = db.Column(db.String, nullable=True) # Look into
    party = db.Column(db.String, nullable=False)
    number = db.Column(db.Integer, nullable=True)
    map_url = db.Column(db.String, nullable=False)
    total_population = db.Column(db.Integer, nullable=False)
    age_out_of = db.Column(db.Integer, nullable=False)
    age_stats = db.Column(db.ARRAY(db.JSON), nullable=False)
    race_out_of = db.Column(db.Integer, nullable=False)
    race_stats = db.Column(db.ARRAY(db.JSON), nullable=False)
    enrollment_out_of = db.Column(db.Integer, nullable=False)
    enrollment_stats = db.Column(db.ARRAY(db.JSON), nullable=False)
    attainment_out_of = db.Column(db.Integer, nullable=False)
    attainment_stats = db.Column(db.ARRAY(db.JSON), nullable=False)
    income_out_of = db.Column(db.Integer, nullable=False)
    income_stats = db.Column(db.ARRAY(db.JSON), nullable=False)

class Election(db.Model):
    __tablename__ = 'election'
    id = db.Column(db.Integer, primary_key=True)
    district_id = db.Column(db.Integer, db.ForeignKey('district.id'), nullable=False)
    class_name = db.Column(db.String, nullable=False) # Nullable?
    office = db.Column(db.String, nullable=False)
    election_day = db.Column(db.Date, nullable=False)
    early_start = db.Column(db.Date, nullable=False)
    early_end = db.Column(db.Date, nullable=False)

class Fundraising(db.Model):
    __tablename__ = 'fundraising'
    id = db.Column(db.Integer, primary_key=True)
    politician_id = db.Column(db.Integer, db.ForeignKey('politician.id'), nullable=False)
    type_name = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    individual = db.Column(db.Integer, nullable=False)
    pacs = db.Column(db.Integer, nullable=False)
    total = db.Column(db.Integer, nullable=False)

class Counties(db.Model):
    __tablename__ = 'counties'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

link_politician_elections = db.Table('link_politician_elections',
    db.Column('politician_id', db.Integer, db.ForeignKey('politican.id'), primary_key=True),
    db.Column('election_id', db.Integer, db.ForeignKey('election.id'), primary_key=True)
)

link_districts_counties = db.Table('link_politician_elections',
    db.Column('district_id', db.Integer, db.ForeignKey('district.id'), primary_key=True),
    db.Column('county_id', db.Integer, db.ForeignKey('counties.id'), primary_key=True)
)