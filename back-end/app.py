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
from sqlalchemy import and_, or_
from format import *
import requests
import json
import re

from Politician import *
from District import *
from Election import *


# ---------- Policitians ----------

@app.route("/politician", methods=["GET"])
def politicians():
    queries = request.args.to_dict(flat=False)

    pol_query = db.session.query(Politician)

    # Searching
    q = get_query('q', queries)
    if q:
        pol_query = search_politicians(q, pol_query) # TODO: Figure out why this was turning pol_query into a list

    # Filtering
    else:
        pol_query = filter_politicians(pol_query, queries)

    # Sorting
    sort = get_query('sort', queries)
    pol_query = sort_politicians(sort, pol_query)

    page = get_query('page', queries)
    if page == None:
        page = 1
    else:
        page = int(page[0])

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


# ---------- Districts ----------

@app.route("/district", methods=["GET"])
def districts():
    queries = request.args.to_dict(flat=False)

    dist_query = db.session.query(District)

    # Searching
    q = get_query('q', queries)
    if q:
        dist_query = search_districts(q, dist_query)

    # Filtering
    else:
        dist_query = filter_districts(dist_query, queries)

    # Sorting
    sort = get_query('sort', queries)
    dist_query = sort_districts(sort, dist_query)

    page = get_query('page', queries)
    if page == None:
        page = 1
    else:
        page = int(page[0])

    districts = dist_query.paginate(page=page)
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


# ---------- Elections ----------

@app.route("/election", methods=["GET"])
def elections():
    queries = request.args.to_dict(flat=False)

    elect_query = db.session.query(Election)

    # Searching
    q = get_query('q', queries)
    if q:
        elect_query = search_elections(q, elect_query)

    # Filtering
    else:
        elect_query = filter_elections(elect_query, queries)

    # Sorting
    sort = get_query('sort', queries)
    elect_query = sort_elections(sort, elect_query)

    page = get_query('page', queries)
    if page == None:
        page = 1
    else:
        page = int(page[0])

    elections = elect_query.paginate(page=page)
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
