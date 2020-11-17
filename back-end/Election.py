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

from sqlalchemy import and_, or_, func
from query_helpers import *

# Filters elections by one of the four supported attributes
# Supports filtering for multiple values for the attribute
def filter_election_by(elect_query, filtering, what):
    if filtering == "type":
        elect_query = elect_query.filter(Election.class_name.in_(what))

    elif filtering == "dist":
        elect_query = elect_query.filter(Election.district_number.in_(what))

    elif filtering == "office":
        elect_query = elect_query.filter(Election.office.in_(what))

    elif filtering == "counties":
        filters = []
        for county in what:
            filters.append(District.counties.any(name=county))
        elect_query = elect_query.join(District).filter(or_(*tuple(filters)))

    return elect_query


# Filters elections for all four supported attributes
def filter_elections(elect_query, queries):
    election_type = get_query("type", queries)
    office_type = get_query("office", queries)
    dist_number = get_query("dist", queries)
    counties = get_query("counties", queries)

    if election_type:
        elect_query = filter_election_by(elect_query, "type", election_type)

    if office_type != None:
        elect_query = filter_election_by(elect_query, "office", office_type)

    if dist_number:
        elect_query = filter_election_by(elect_query, "dist", dist_number)

    if counties:
        elect_query = filter_election_by(elect_query, "counties", counties)

    return elect_query


# Sorts elections by one of the four supported attributes
# in ascending or descending order
def sort_election_by(sorting, elect_query, desc):
    elect = None

    if sorting == "dist":
        elect = Election.district_number
    elif sorting == "electionDate":
        elect = Election.election_day
    else:
        return elect_query

    if desc:
        return elect_query.order_by(elect.desc())
    else:
        return elect_query.order_by(elect)


# Determines whether attribute will be sorted in ascending or descending order
# Passes attribute to be sorted to sort_election_by for sorting
# Only supports sorting on one attribute at a time
def sort_elections(sort, elect_query):
    if sort == None:
        return elect_query
    else:
        sort = sort[0]

    sort = sort.split("-")

    # In descending order
    if len(sort) > 1:
        return sort_election_by(sort[1], elect_query, True)
    else:
        return sort_election_by(sort[0], elect_query, False)


# Applies filter with an "or" on each attribute
# District number and counties have to be an exact match
def search_elections(q, elect_query):
    if not q:
        return elect_query
    else:
        q = q[0].strip()

    terms = q.split()

    searches = []
    for term in terms:
        try:
            searches.append(Election.district_number.in_([int(term)]))
        except ValueError:
            pass
        searches.append(Election.class_name.match(term))
        searches.append(Election.office.match(term))
        searches.append(
            District.counties.any(func.lower(Counties.name).contains(term.lower()))
        )
        searches.append(Election.politicians.any(Politician.name.ilike("%{}%".format(term))))
        searches.append(Election.election_day.match(term))
    elect_query = elect_query.filter(or_(*tuple(searches)))

    return elect_query
