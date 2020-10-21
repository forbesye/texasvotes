from models import (
    Politician,
    District,
    Election,
    Counties,
    db,
    app,
    politician_schema,
    district_schema,
    election_schema,
)
from flask import Flask, request, make_response, jsonify
from format import *
import requests
import json


@app.route("/politician", methods=["GET"])
def politicians():
    """
    name = request.args.get('name')
    party = request.args.get('party')
    district = request.args.get('district')
    current_office = request.args.get('current_office')
    incumbent = request.args.get('incumbent')

    l = [name, party, district, current_office, incumbent]
    # print(l)
    """

    page = request.args.get("page")
    if page == None:
        page = 1
    else:
        page = int(page)

    politicians = db.session.query(Politician).paginate(page=page)
    count = politicians.total

    result = politician_schema.dump(politicians.items, many=True)

    for r in result:
        format_politician(r)

    return {"page": result, "count": count}


@app.route("/politician/<int:id>", methods=["GET"])
def politician_id(id):
    politician = db.session.query(Politician).filter_by(id=id)

    politician = politician_schema.dump(politician, many=True)[0]

    format_politician(politician)

    return politician


@app.route("/district", methods=["GET"])
def districts():
    """
    dist_type = request.args.get('type')
    party = request.args.get('party')
    county = request.args.get('county')
    number = request.args.get('number')
    address = request.args.get('address')

    l = [dist_type, party, county, number, address]
    # print(l)
    """

    page = request.args.get("page")
    if page == None:
        page = 1
    else:
        page = int(page)

    districts = db.session.query(District).paginate(page=page)
    count = districts.total

    result = district_schema.dump(districts.items, many=True)

    for r in result:
        format_district(r)

    return {"page": result, "count": count}


@app.route("/district/<int:id>", methods=["GET"])
def district_id(id):
    district = db.session.query(District).filter_by(id=id)

    district = district_schema.dump(district, many=True)[0]

    format_district(district)

    return district


@app.route("/election", methods=["GET"])
def elections():
    """
    election_type = request.args.get('type')
    candidates = request.args.get('candidates')
    district = request.args.get('district')
    winner = request.args.get('winner')
    office = request.args.get('office')

    l = [election_type, candidates, district, winner, office]
    # print(l)
    """

    page = request.args.get("page")
    if page == None:
        page = 1
    else:
        page = int(page)

    elections = db.session.query(Election).paginate(page=page)
    count = elections.total

    result = election_schema.dump(elections.items, many=True)

    for r in result:
        format_election(r)

    return {"page": result, "count": count}


@app.route("/election/<int:id>", methods=["GET"])
def election_id(id):
    election = db.session.query(Election).filter_by(id=id)

    election = election_schema.dump(election, many=True)[0]

    format_election(election)

    return election


@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
