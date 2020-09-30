const age_mappings = {
    "0": "0 - 5",
    "5": "5 - 18",
    "18": "18 - 65",
    "65": "65+",
}

const income_mappings = {
    "0": "$0 - $10,000",
    "10_000": "$10,000 - $25,000",
    "25_000": "$25,000 - $50,000",
    "50_000": "$50,000 - $100,000",
    "100_000": "$100,000 - $200,000",
    "200_000": "$200,000+"
}

const race_mappings = {
    "white": "White",
    "black": "Black",
    "asian": "Asian",
    "indigenous": "Indigenous",
    "pacific_islander": "Pacific Islander",
    "other": "Other"
}

const ethnicity_mappings = {
    "hispanic": "Hispanic",
    "non_hispanic": "Non-Hispanic"
}

const educational_mappings = {
    "preschool": "Preschool",
    "primary": "Primary",
    "university": "University",
    "high_school": "High School",
    "some_college": "Some College",
    "bachelors": "Bachelors"
}

const elected_office_mappings = {
    "us_house": "US House",
    "us_senate": "US Senate",
    "tx_house": "Texas House",
    "tx_senate": "Texas Senate"
}

const party_mappings = {
    "R": "Republican",
    "D": "Democratic",
    "L": "Libertarian",
    "I": "Independent"
}

const election_type_mappings = {
    "general": "General",
    "primary": "Primary"
}

const election_date_mappings = {
    "early_start": "Early Start",
    "early_end": "Early End",
    "election_day": "General Election Day"
}

export {
    age_mappings,
    income_mappings,
    race_mappings,
    ethnicity_mappings,
    educational_mappings,
    elected_office_mappings,
    party_mappings,
    election_type_mappings,
    election_date_mappings
}