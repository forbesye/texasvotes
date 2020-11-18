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

from flask import Flask, request, make_response, jsonify, send_from_directory
from format import *
import os

from Politician import *
from District import *
from Election import *
from news import get_news
from address import get_ocd_ids, RequestFailedException

# ---------- Policitians ----------


@app.route("/politician", methods=["GET"])
def politicians():
    queries = request.args.to_dict(flat=False)

    pol_query = db.session.query(Politician)

    page = get_query("page", queries)
    if page == None:
        page = 1
    else:
        # Convert the given page number into an int
        page = int(page[0])

    # Searching
    q = get_query("q", queries)
    if q:
        pol_query = search_politicians(q, pol_query)

    # Filtering
    pol_query = filter_politicians(pol_query, queries)

    # Sorting
    sort = get_query("sort", queries)
    pol_query = sort_politicians(sort, pol_query)

    count = pol_query.count()

    if page != -1:
        per_page = int(get_query("perPage", queries).pop()) if get_query("perPage", queries) else 20
        politicians = pol_query.paginate(page=page, per_page=per_page)

        result = politician_schema.dump(politicians.items, many=True)
    else:
        result = politician_schema.dump(pol_query, many=True)

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

    page = get_query("page", queries)
    if page == None:
        page = 1
    else:
        # Convert the given page number into an int
        page = int(page[0])

    # Searching
    q = get_query("q", queries)
    if q:
        dist_query = search_districts(q, dist_query)

    # Filtering
    dist_query = filter_districts(dist_query, queries)

    # Sorting
    sort = get_query("sort", queries)
    dist_query = sort_districts(sort, dist_query)

    count = dist_query.count()

    if page != -1:
        per_page = int(get_query("perPage", queries).pop()) if get_query("perPage", queries) else 20
        districts = dist_query.paginate(page=page, per_page=per_page)

        result = district_schema.dump(districts.items, many=True)
    else:
        result = district_schema.dump(dist_query, many=True)

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

    page = get_query("page", queries)
    if page == None:
        page = 1
    else:
        # Convert the given page number into an int
        page = int(page[0])

    # Searching
    q = get_query("q", queries)
    if q:
        elect_query = search_elections(q, elect_query)

    # Filtering
    elect_query = filter_elections(elect_query, queries)

    # Sorting
    sort = get_query("sort", queries)
    elect_query = sort_elections(sort, elect_query)

    count = elect_query.count()

    if page != -1:
        per_page = int(get_query("perPage", queries).pop()) if get_query("perPage", queries) else 20
        elections = elect_query.paginate(page=page, per_page=per_page)

        result = election_schema.dump(elections.items, many=True)
    else:
        result = election_schema.dump(elect_query, many=True)

    for r in result:
        format_election(r)

    return {"page": result, "count": count}


@app.route("/election/<int:id>", methods=["GET"])
def election_id(id):
    election = db.session.query(Election).filter_by(id=id)

    election = election_schema.dump(election, many=True)[0]

    format_election(election)

    return election

# ---------- News ----------

@app.route("/news", methods=["GET"])
def news():
    ret = get_news()
    return jsonify(ret)

# ---------- Search By Address ----------
@app.route("/address", methods=["GET"])
def address():
    queries = request.args.to_dict(flat=False)
    error = None
    try: 
        address = queries["address"]
        ocd_ids = get_ocd_ids(address)
        # get districts by ocd_ids
        dist_query = db.session.query(District).filter(District.ocd_id.in_(ocd_ids))
        districts = district_schema.dump(dist_query, many=True)
        # Format and get corresponding politician and elections ids
        pol_ids = []
        el_ids = []
        for district in districts: 
            format_district(district)
            pol_ids += [ pol["id"] for pol in district["elected_officials"] ]
            el_ids += [ el["id"] for el in district["elections"] ]
        # Get politician by given ids
        pol_query = db.session.query(Politician)
        pol_query = pol_query.filter(Politician.id.in_(pol_ids))
        # Get elections that occured in 2020 and whose ids are in el_ids
        el_query = db.session.query(Election)
        el_query = el_query.filter(Election.id.in_(el_ids))
        el_query = el_query.filter(Election.election_day.contains("2020"))
        el_query = el_query.order_by(Election.election_day.desc())
        # Run queries
        politicians = politician_schema.dump(pol_query, many=True)
        elections = election_schema.dump(el_query, many=True)
        for politician in politicians:
            format_politician(politician)
        for election in elections:
            format_election(election)
        return jsonify({
            "politicians": politicians,
            "districts": districts,
            "elections": elections
        })
    except KeyError:
        error = "No address provided"
    except RequestFailedException:
        error = "Unable to make request to external API"
    return jsonify({ "error": error })

@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'


@app.route("/favicon.ico")
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, "static"),
        "icon.ico",
        mimetype="image/vnd.microsoft.icon",
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
