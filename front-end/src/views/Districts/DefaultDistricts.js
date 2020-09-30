
// TODO: need past officials
const districtData = [
    {
        "id": 0,
        "name": "TX-25",
        "type": "us_house",
        "party": "R",
        "counties": ["Bosque", "Burnet", "Horyell", "Hamilton", "Hill", "Johnson", "Lampasas", "Somerville", "Bell", "Erath", "Hays", "Tarrant", "Travis"],
        "number": 25,
        "map": "https://www.statesman.com/storyimage/TX/20200303/NEWS/200309589/AR/0/AR-200309589.jpg",
        "current_incumbent": {
            "name": "Roger Williams",
            "src": "https://williams.house.gov/sites/williams.house.gov/files/wysiwyg_uploaded/CRW%20Official_0_0.jpg"
        },
        "elections": {
            "current": {
                "id": 1
            },
            "past": [
                {
                    "id": 0
                }
            ]
        },
        "elected_officials": [
            {
                "name": "Roger Williams",
                "id": 0
            }
        ],
        "demographics": {
            "total_population": 818807,
            "age": {
                "0": 46665,
                "5": 143625,
                "18": 513117,
                "65": 115340
            },
            "race": {
                "white": 674846,
                "black": 60306,
                "asian": 30741,
                "indigenous": 4034,
                "pacific_islander": 2261,
                "other": 46620
            },
            "ethnicity": {
                "hispanic": 152814,
                "non_hispanic": 665993
            },
            "educational_attainment": {
                "enrollment": {
                    "preschool": 12457,
                    "primary": 135921,
                    "university": 58622
                },
                "attainment": {
                    "high_school": 176522,
                    "some_college": 151417,
                    "bachelors": 224087
                }
            },
            "income": {
                "0": 13666,
                "10_000": 26346,
                "25_000": 49536,
                "50_000": 83419,
                "100_000": 81659,
                "200_000": 37207
            }
        }
    },
    {
        "name": "TX-14",
        "type": "tx_senate",
        "id": 1,
        "party": "D",
        "number": 14,
        "map": "https://www.teachthevote.org/blog-content/uploads/2020/03/SD-14-map-624x479.jpg",
        "counties": ["Bastrop", "Travis"],
        "elections": {
            "current": null,
            "past": [
                {
                    "id": 3
                }
            ]
        },
        "current_incumbent": {
            "name": "Sarah Eckhardt",
            "src": "https://lbj.utexas.edu/sites/default/files/Eckhardt%2C%20Sarah%20headshot.jpg"
        },
        "elected_officials": [
            {
                "name": "Sarah Eckhardt",
                "id": 3
            }
        ],
        "demographics": {
            "total_population": 970_392,
            "age": {
              0: 63781,
              5: 150057,
              18: 663268,
              65: 93286
            },
            "race": {
              "white": 491907,
              "black": 98760,
              "asian": 79702,
              "indigenous": 0,
              "pacific_islander": 0,
              "other": 302768
            },
            "ethnicity": {
              "hispanic": 302768,
              "non_hispanic": 665993
            },
            "educational_attainment": {
              "enrollment": {
                "preschool": 17297,
                "primary": 149965,
                "university": 83991
              },
              "attainment": {
                "high_school": 71266,
                "some_college": 0,
                "bachelors": 320157
              }
            },
            "income": {
              "0": 20411,
              "10_000": 36928,
              "25_000": 70750,
              "50_000": 111267,
              "100_000": 90599,
              "200_000": 39878
            }
        }
    },
    {
        "id": 2,
        "name": "Texas",
        "type": "us_senate",
        "party": "R",
        "counties": [ "Anderson", "Andrews", "Angelina", "Aransas", "Archer", "Armstrong", "Atascosa", "Austin", "Bailey", "Bandera", "Bastrop", "Baylor", "Bee", "Bell", "Bexar", "Blanco", "Borden", "Bosque", "Bowie", "Brazoria", "Brazos", "Brewster", "Briscoe", "Brooks", "Brown", "Burleson", "Burnet", "Caldwell", "Calhoun", "Callahan", "Cameron", "Camp", "Carson", "Cass", "Castro", "Chambers", "Cherokee", "Childress", "Clay", "Cochran", "Coke", "Coleman", "Collin", "Collingsworth", "Colorado", "Comal", "Comanche", "Concho", "Cooke", "Coryell", "Cottle", "Crane", "Crockett", "Crosby", "Culberson", "Dallam", "Dallas", "Dawson", "Deaf Smith", "Delta", "Denton", "DeWitt", "Dickens", "Dimmit", "Donley", "Duval", "Eastland", "Ector", "Edwards", "Ellis", "El Paso", "Erath", "Falls", "Fannin", "Fayette", "Fisher", "Floyd", "Foard", "Fort Bend", "Franklin", "Freestone", "Frio", "Gaines", "Galveston", "Garza", "Gillespie", "Glasscock", "Goliad", "Gonzales", "Gray", "Grayson", "Gregg", "Grimes", "Guadalupe", "Hale", "Hall", "Hamilton", "Hansford", "Hardeman", "Hardin", "Harris", "Harrison", "Hartley", "Haskell", "Hays", "Hemphill", "Henderson", "Hidalgo", "Hill", "Hockley", "Hood", "Hopkins", "Houston", "Howard", "Hudspeth", "Hunt", "Hutchinson", "Irion", "Jack", "Jackson", "Jasper", "Jeff Davis", "Jefferson", "Jim Hogg", "Jim Wells", "Johnson", "Jones", "Karnes", "Kaufman", "Kendall", "Kenedy", "Kent", "Kerr", "Kimble", "King", "Kinney", "Kleberg", "Knox", "Lamar", "Lamb", "Lampasas", "La Salle", "Lavaca", "Lee", "Leon", "Liberty", "Limestone", "Lipscomb", "Live Oak", "Llano", "Loving", "Lubbock", "Lynn", "McCulloch", "McLennan", "McMullen", "Madison", "Marion", "Martin", "Mason", "Matagorda", "Maverick", "Medina", "Menard", "Midland", "Milam", "Mills", "Mitchell", "Montague", "Montgomery", "Moore", "Morris", "Motley", "Nacogdoches", "Navarro", "Newton", "Nolan", "Nueces", "Ochiltree", "Oldham", "Orange", "Palo Pinto", "Panola", "Parker", "Parmer", "Pecos", "Polk", "Potter", "Presidio", "Rains", "Randall", "Reagan", "Real", "Red River", "Reeves", "Refugio", "Roberts", "Robertson", "Rockwall", "Runnels", "Rusk", "Sabine", "San Augustine", "San Jacinto", "San Patricio", "San Saba", "Schleicher", "Scurry", "Shackelford", "Shelby", "Sherman", "Smith", "Somervell", "Starr", "Stephens", "Sterling", "Stonewall", "Sutton", "Swisher", "Tarrant", "Taylor", "Terrell", "Terry", "Throckmorton", "Titus", "Tom Green", "Travis", "Trinity", "Tyler", "Upshur", "Upton", "Uvalde", "Val Verde", "Van Zandt", "Victoria", "Walker", "Waller", "Ward", "Washington", "Webb", "Wharton", "Wheeler", "Wichita", "Wilbarger", "Willacy", "Williamson", "Wilson", "Winkler", "Wise", "Wood", "Yoakum", "Young", "Zapata", "Zavala" ],
        "number": 1,
        "map": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/TxSen2018Comp.svg/1000px-TxSen2018Comp.svg.png",
        "elections": {
            "current": {
                "id": 4
            },
            "past": [
                {
                    "id": 3
                }
            ]
        },
        "current_incumbent": {
            "name": "Ted Cruz",
            "src": "https://upload.wikimedia.org/wikipedia/commons/9/95/Ted_Cruz_official_116th_portrait.jpg"
        },
        "elected_officials": [
            {
                "name": "Ted Cruz",
            },
            {
                "name": "John Cornyn"
            },
            {
                "name": "Greg Abbott"
            },
            {
                "name": "Dan Patrick"
            },
            {
                "name": "Ken Paxton"
            }
        ],
        "demographics": {
            "total_population": 28995881,
            "age": {
                "0": 1981755,
                "5": 1995391,
                "18": 17860523,
                "65": 3738727
            },
            "race": {
                "white": 21273326,
                "black": 3908287,
                "asian": 3908287,
                "indigenous": 350100,
                "pacific_islander": 68085,
                "other": 1898004
            },
            "ethnicity": {
                "hispanic": 11524842,
                "non_hispanic": 17471039
            },
            "educational_attainment": {
                "enrollment": {
                    "preschool": 466305,
                    "primary": 5424783,
                    "university": 1522926+349160
                },
                "attainment": {
                    "high_school": 1436483+1445905+4734422,
                    "some_college": 3976607+1402600,
                    "bachelors": 3750797+2025736
                }
            },
            "income": {
                "0": 212436,
                "10_000": 392899+1430067,
                "25_000": 1634067+1931166,
                "50_000": 1605543+680264+1040144,
                "100_000": 2256638,
                "200_000": 788825
            }
        }
    }
]

export default districtData;