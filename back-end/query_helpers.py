# Wrapper for retrieving keys from dictionary queries
# Returns none if desired key is not in queries
def get_query(name, queries):
    try:
        return queries[name]
    except KeyError:
        return None