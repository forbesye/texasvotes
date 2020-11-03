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

from sqlalchemy import and_, or_
from query_helpers import *

# Filters districts by one of the four supported attributes
# Supports filtering for multiple values for the attribute
def filter_district_by(dist_query, filtering, what):
    if filtering == "office":
        dist_query = dist_query.filter(District.type_name.in_(what))

    elif filtering == "party":
        dist_query = dist_query.filter(District.party.in_(what))

    elif filtering == "popul":
        dist_query = dist_query.filter(and_(District.total_population >= what[0], District.total_population <= what[1]))

    elif filtering == "counties":
        filters = []
        for c in what:
            filters.append(District.counties.any(name=c))
        dist_query = dist_query.filter(or_(*tuple(filters)))

    elif filtering == "number":
        dist_query = dist_query.filter(District.number.in_(what))

    return dist_query

# Filters districts for all four supported attributes
def filter_districts(dist_query, queries):
    office_type = get_query('office', queries)
    party = get_query('party', queries)
    popRange = get_query("popRange", queries)
    counties = get_query("counties", queries)
    number = get_query("number", queries)

    if office_type != None:
        dist_query = filter_district_by(dist_query, 'office', office_type)

    if party != None:
        dist_query = filter_district_by(dist_query, 'party', party)

    if popRange:
        popRange = popRange[0]
        min_pop = 0
        max_pop = 694200000
        # Only upper bound is given
        if len(popRange.split('-')) < 2:
            min_pop = int(popRange)
        # Both lower and upper bound given
        else:
            min_pop, max_pop = (popRange.split('-'))
        dist_query = filter_district_by(dist_query, 'popul', [min_pop, max_pop])

    if counties:
        dist_query = filter_district_by(dist_query, 'counties', counties)

    if number:
        dist_query = filter_district_by(dist_query, 'number', number)
    
    return dist_query

# Sorts districts by one of the four supported attributes
# in ascending or descending order
def sort_district_by(sorting, dist_query, desc):
    dist = None

    if sorting == 'number':
        dist = District.number
    elif sorting == 'pop':
        dist = District.total_population
    else:
        return dist_query

    if desc:
        return dist_query.order_by(dist.desc())
    else:
        return dist_query.order_by(dist)

# Determines whether attribute will be sorted in ascending or descending order
# Passes attribute to be sorted to sort_district_by for sorting
# Only supports sorting on one attribute at a time
def sort_districts(sort, dist_query):
    if sort == None:
        return dist_query
    else:
        sort = sort[0]

    sort = sort.split('-')

    # In descending order
    if len(sort) > 1:
        return sort_district_by(sort[1], dist_query, True)
    else:
        return sort_district_by(sort[0], dist_query, False)

# Applies filter with an "or" on each attribute
# Number and counties have to be an exact match
def search_districts(q, dist_query):
    if not q:
        return dist_query
    else:
        q = q[0].strip()

    terms = q.split()

    searches = []
    for term in terms:
        try:
            searches.append(District.number.in_([int(term)]))
        except ValueError:
            pass
        searches.append(District.type_name.match(term))
        searches.append(District.party.match(term))
        searches.append(District.counties.any(name=term))
    dist_query = dist_query.filter(or_(*tuple(searches)))

    return dist_query