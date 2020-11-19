import requests
import os
import re

ENDPOINT = "https://www.googleapis.com/civicinfo/v2/representatives"
VALID_ID_ENDS = { "state:tx", "sldl", "sldu", "cd" }

class RequestFailedException(Exception): pass

def id_is_valid (ocd_id: str):
    end = ocd_id.split("/").pop()
    for valid_end in VALID_ID_ENDS:
        if valid_end in end: return True
    return False

def get_ocd_ids (address: str):
    api_key = os.environ["CIVICS_KEY"]
    res = requests.get(ENDPOINT, params={
        "key": api_key,
        "address": address,
        "includeOffices": False
    })
    if res.ok:
        ids = []
        data = res.json()
        for ocd_id in data["divisions"]:
            if id_is_valid(ocd_id):
                ids.append(ocd_id)
        return ids
    raise RequestFailedException("Unable to get response")