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

# Wrapper for retrieving keys from dictionary queries
# Returns none if desired key is not in queries
def get_query(name, queries):
    try:
        return queries[name]
    except KeyError:
        return None

# Filters politicians by one of the four supported attributes
# Supports filtering for multiple values for the attribute
def filter_politician_by(pol_query, filtering, what):
    if filtering == "party":
        pol_query = pol_query.filter(Politician.party.in_(what))

    elif filtering == "district_num":
        pol_query = pol_query.filter(Politician.district_number.in_(what))

    elif filtering == "counties":
        filters = []
        #for c in counties:
        #    filters.append(Politician.current_district.filter(District.counties.like(c)))
        pol_query = pol_query.join(Politician.current_district, aliased=True).filter(Politician.counties.has("Llano"))

    elif filtering == "type":
        pol_query = pol_query.filter(Politician.office.in_(what))

    return pol_query

# Filters politicians for all four supported attributes
def filter_politicians(pol_query, queries):
    party = get_query('party', queries)
    district_num = get_query('district_num', queries)
    counties = get_query("counties", queries)
    election_type = get_query("type", queries)

    if party != None:
        party = party[0]
        pol_query = filter_politician_by(pol_query, 'party', party)

    if district_num != None:
        pol_query = filter_politician_by(pol_query, 'district_num', district_num)

    # Very much does not work yet
    # Don't try to query
    if counties != None:
        pol_query = filter_politician_by(pol_query, 'counties', counties)

    if election_type != None:
        pol_query = filter_politician_by(pol_query, 'type', election_type)
    
    return pol_query

# Sorts politicians by one of the four supported attributes
# in ascending or descending order
def sort_politician_by(sorting, pol_query, desc):
    pol = None

    if sorting == 'name':
        pol = Politician.name
    elif sorting == 'party':
        pol = Politician.party
    elif sorting == 'dist':
        pol = Politician.district_number
    elif sorting == 'type':
        pol = Politician.office
    else:
        return pol_query

    if desc:
        return pol_query.order_by(pol.desc())
    else:
        return pol_query.order_by(pol)

# Determines whether attribute will be sorted in ascending or descending order
# Passes attribute to be sorted to sort_politician_by for sorting
# Only supports sorting on one attribute at a time
def sort_politicians(sort, pol_query):
    if sort == None:
        return pol_query
    else:
        sort = sort[0]

    sort = sort.split('-')

    # In descending order
    if len(sort) > 1:
        return sort_politician_by(sort[1], pol_query, True)
    else:
        return sort_politician_by(sort[0], pol_query, False)

# TODO: implement searching within politicians
def search_politicians(q, pol_query):
    # Searching by office type
    if "texas" in q:
        if "house" in q:
            pol_query = filter_politician_by(pol_query, 'type', 'tx_house')
        elif 'senate' in q:
            pol_query = filter_politician_by(pol_query, 'type', 'tx_senate')

    elif "us" in q:
        if "house" in q:
            pol_query = filter_politician_by(pol_query, 'type', 'us_house')
        elif "senate" in q:
            pol_query = filter_politician_by(pol_query, 'type', 'us_senate')
    
    elif 'house' in q:
        pol_query = filter_politician_by(pol_query, 'type', 'us_house')
        pol_query = filter_politician_by(pol_query, 'type', 'tx_house')

    return pol_query

@app.route("/politician", methods=["GET"])
def politicians():
    """
    name = request.args.get('name')
    district = request.args.get('district')
    current_office = request.args.get('current_office')
    incumbent = request.args.get('incumbent')

    l = [name, party, district, current_office, incumbent]
    # print(l)
    """

    queries = request.args.to_dict(flat=False)

    pol_query = db.session.query(Politician)

    # Searching
    q = get_query('q', queries)
    #pol_query = search_politicians(pol_query, q) # TODO: Figure out why this was turning pol_query into a list

    # Filtering
    pol_query = filter_politicians(pol_query, queries)

    # Sorting
    sort = get_query('sort', queries)
    pol_query = sort_politicians(sort, pol_query)

    page = get_query('page', queries)
    if page == None:
        page = 1
    else:
        page = int(page)

    politicians = pol_query.paginate(page=page)

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
