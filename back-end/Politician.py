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

# Filters politicians by one of the four supported attributes
# Supports filtering for multiple values for the attribute
def filter_politician_by(pol_query, filtering, what):
    if filtering == "party":
        pol_query = pol_query.filter(Politician.party.in_(what))

    elif filtering == "district_num":
        pol_query = pol_query.filter(Politician.district_number.in_(what))

    elif filtering == "counties":
        filters = []
        for county in what:
            filters.append(District.counties.any(name=county))
        pol_query = pol_query.join(District).filter(or_(*tuple(filters)))

    elif filtering == "office":
        pol_query = pol_query.filter(Politician.office.in_(what))

    return pol_query


# Filters politicians for all four supported attributes
def filter_politicians(pol_query, queries):
    party = get_query("party", queries)
    district_num = get_query("district_num", queries)
    counties = get_query("counties", queries)
    office = get_query("office", queries)

    if party != None:
        pol_query = filter_politician_by(pol_query, "party", party)

    if district_num != None:
        pol_query = filter_politician_by(pol_query, "district_num", district_num)

    if counties != None:
        pol_query = filter_politician_by(pol_query, "counties", counties)

    if office != None:
        pol_query = filter_politician_by(pol_query, "office", office)

    return pol_query


# Sorts politicians by one of the four supported attributes
# in ascending or descending order
def sort_politician_by(sorting, pol_query, desc):
    pol = None

    if sorting == "name":
        pol = Politician.name
    elif sorting == "dist":
        pol = Politician.district_number
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

    sort = sort.split("-")

    # In descending order
    if len(sort) > 1:
        return sort_politician_by(sort[1], pol_query, True)
    else:
        return sort_politician_by(sort[0], pol_query, False)


# Applies filter with an "or" on each attribute
# District number and counties have to be an exact match
def search_politicians(q, pol_query):
    if not q:
        return pol_query
    else:
        q = q[0].strip()

    terms = q.split()
    terms = [w.lower() for w in terms]

    if "zodiac" in terms:
        return pol_query.filter(and_(Politician.name.match("Cruz"), Politician.name.match("Ted")))
    searches = []
    for term in terms:
        searches.append(Politician.name.ilike("%{}%".format(term)))
        searches.append(Politician.office.match(term))
        try:
            searches.append(Politician.district_number.in_([int(term)]))
        except ValueError:
            pass
        searches.append(
            District.counties.any(func.lower(Counties.name).contains(term.lower()))
        )
        searches.append(Politician.elections.any(Election.election_day.contains(term)))

    pol_query = pol_query.filter(or_(*tuple(searches)))

    return pol_query
