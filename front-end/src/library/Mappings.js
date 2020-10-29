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
    "primary": "Primary",
    "runoff": "Runoff"
}

const election_date_mappings = {
    "early_start": "Early Start",
    "early_end": "Early End",
    "election_day": "General Election Day"
}

const counties_list = 
[
    "Anderson",
    "Andrews",
    "Angelina",
    "Aransas",
    "Archer",
    "Armstrong",
    "Atascosa",
    "Austin",
    "Bailey",
    "Bandera",
    "Bastrop",
    "Baylor",
    "Bee",
    "Bell",
    "Bexar",
    "Blanco",
    "Borden",
    "Bosque",
    "Bowie",
    "Brazoria",
    "Brazos",
    "Brewster",
    "Briscoe",
    "Brooks",
    "Brown",
    "Burleson",
    "Burnet",
    "Caldwell",
    "Calhoun",
    "Callahan",
    "Cameron",
    "Camp",
    "Carson",
    "Cass",
    "Castro",
    "Chambers",
    "Cherokee",
    "Childress",
    "Clay",
    "Cochran",
    "Coke",
    "Coleman",
    "Collin",
    "Collingsworth",
    "Colorado",
    "Comal",
    "Comanche",
    "Concho",
    "Cooke",
    "Coryell",
    "Cottle",
    "Crane",
    "Crockett",
    "Crosby",
    "Culberson",
    "Dallam",
    "Dallas",
    "Dawson",
    "DeWitt",
    "Deaf Smith",
    "Delta",
    "Denton",
    "Dickens",
    "Dimmit",
    "Donley",
    "Duval",
    "Eastland",
    "Ector",
    "Edwards",
    "El Paso",
    "Ellis",
    "Erath",
    "Falls",
    "Fannin",
    "Fayette",
    "Fisher",
    "Floyd",
    "Foard",
    "Fort Bend",
    "Franklin",
    "Freestone",
    "Frio",
    "Gaines",
    "Galveston",
    "Garza",
    "Gillespie",
    "Glasscock",
    "Goliad",
    "Gonzales",
    "Gray",
    "Grayson",
    "Gregg",
    "Grimes",
    "Guadalupe",
    "Hale",
    "Hall",
    "Hamilton",
    "Hansford",
    "Hardeman",
    "Hardin",
    "Harris",
    "Harrison",
    "Hartley",
    "Haskell",
    "Hays",
    "Hemphill",
    "Henderson",
    "Hidalgo",
    "Hill",
    "Hockley",
    "Hood",
    "Hopkins",
    "Houston",
    "Howard",
    "Hudspeth",
    "Hunt",
    "Hutchinson",
    "Irion",
    "Jack",
    "Jackson",
    "Jasper",
    "Jeff Davis",
    "Jefferson",
    "Jim Hogg",
    "Jim Wells",
    "Johnson",
    "Jones",
    "Karnes",
    "Kaufman",
    "Kendall",
    "Kenedy",
    "Kent",
    "Kerr",
    "Kimble",
    "King",
    "Kinney",
    "Kleberg",
    "Knox",
    "La Salle",
    "Lamar",
    "Lamb",
    "Lampasas",
    "Lavaca",
    "Lee",
    "Leon",
    "Liberty",
    "Limestone",
    "Lipscomb",
    "Live Oak",
    "Llano",
    "Loving",
    "Lubbock",
    "Lynn",
    "Madison",
    "Marion",
    "Martin",
    "Mason",
    "Matagorda",
    "Maverick",
    "McCulloch",
    "McLennan",
    "McMullen",
    "Medina",
    "Menard",
    "Midland",
    "Milam",
    "Mills",
    "Mitchell",
    "Montague",
    "Montgomery",
    "Moore",
    "Morris",
    "Motley",
    "Nacogdoches",
    "Navarro",
    "Newton",
    "Nolan",
    "Nueces",
    "Ochiltree",
    "Oldham",
    "Orange",
    "Palo Pinto",
    "Panola",
    "Parker",
    "Parmer",
    "Pecos",
    "Polk",
    "Potter",
    "Presidio",
    "Rains",
    "Randall",
    "Reagan",
    "Real",
    "Red River",
    "Reeves",
    "Refugio",
    "Roberts",
    "Robertson",
    "Rockwall",
    "Runnels",
    "Rusk",
    "Sabine",
    "San Augustine",
    "San Jacinto",
    "San Patricio",
    "San Saba",
    "Schleicher",
    "Scurry",
    "Shackelford",
    "Shelby",
    "Sherman",
    "Smith",
    "Somervell",
    "Starr",
    "Stephens",
    "Sterling",
    "Stonewall",
    "Sutton",
    "Swisher",
    "Tarrant",
    "Taylor",
    "Terrell",
    "Terry",
    "Throckmorton",
    "Titus",
    "Tom Green",
    "Travis",
    "Trinity",
    "Tyler",
    "Upshur",
    "Upton",
    "Uvalde",
    "Val Verde",
    "Van Zandt",
    "Victoria",
    "Walker",
    "Waller",
    "Ward",
    "Washington",
    "Webb",
    "Wharton",
    "Wheeler",
    "Wichita",
    "Wilbarger",
    "Willacy",
    "Williamson",
    "Wilson",
    "Winkler",
    "Wise",
    "Wood",
    "Yoakum",
    "Young",
    "Zapata",
    "Zavala"
]

// https://www.schemecolor.com/rainbow-break.php
const colorHexMap = {
    "I": "#5DD95D",
    "R": "#EF3A38",
    "D": "#3893D2",
    "L": "#F1EA49"
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
    election_date_mappings,
    counties_list,
    colorHexMap
}