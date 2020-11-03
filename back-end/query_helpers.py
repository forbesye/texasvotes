# Wrapper for retrieving keys from dictionary queries
# Returns none if desired key is not in queries
from sqlalchemy import and_, or_, func

def get_query(name, queries):
    try:
        return queries[name]
    except KeyError:
        return None