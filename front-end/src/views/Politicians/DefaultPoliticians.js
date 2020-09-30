const smolElections = [
    {
        id: 0,
        type: "general",
        dates: {
            election_day: "2018-11-06T00:00:00-0500"
        },
        results: {
            winner: {
                name: "Roger Williams"
            },
            vote_counts: [
                {
                    name: "Roger Williams",
                    party: "R",
                    incumbent: true,
                    vote_total: 163023,
                    vote_percentage: 53.5
                },
                {
                    name: "Julie Oliver",
                    party: "D",
                    id: 1,
                    vote_total: 136385,
                    vote_percentage: 44.8
                },
                {
                    name: "Desarae Lindsey",
                    party: "L",
                    id: 10,
                    vote_total: 5145,
                    vote_percentage: 1.7
                }
            ],
            total_voters: 304553
        }
    },
    {
        id: 1,
        type: "primary",
        results: {
            winner: {
                name: "Julie Oliver"
            },
            vote_counts: [
                {
                    name: "Julie Oliver",
                    party: "D",
                    id: 1,
                    vote_total: 56151,
                    vote_percentage: 69.6
                },
                {
                    name: "Heidi Sloan",
                    party: "D",
                    id: 3,
                    vote_total: 24512,
                    vote_percentage: 30.4
                }
            ], 
            total_voters: 80663
        },
        dates: {
            election_day: "2020-03-03T00:00:00-0500"
        }
    },
    {
        id: 2,
        type: "general",
        candidates: [
            {
                name: "Roger Williams",
                party: "R",
                id: 0,
                incumbent: true
            },
            {
                name: "Julie Oliver",
                party: "D",
                id: 1
            },
            {
                name: "Bill Kelsey",
                party: "L",
                id: 10
            }
        ],
        dates: {
            early_start: "2020-10-13T00:00:00-0600",
            early_end: "2020-10-30T00:00:00-0600",
            election_day: "2020-11-03T00:00:00-0600"
        }
    },
    {
        id: 3,
        type: "special",
        dates: {
            election_day: "2020-07-14T00:00:00-0600"
        },
        results: {
            winner: {
                name: "Sarah Eckhardt",
                party: "D",
                id: 2
            },
            vote_counts: [
                {
                    name: "Sarah Eckhardt",
                    party: "D",
                    id: 2,
                    vote_total: 59267,
                    vote_percentage: 49.7
                },
                {
                    name: "Eddie Rodriguez",
                    party: "D",
                    vote_total: 40384,
                    vote_percentage: 33.8
                },
                {
                    name: "Donald Zimmerman",
                    party: "R",
                    vote_total: 15565,
                    vote_percentage: 13.0
                },
                {
                    name: "Waller Thomas Burns II",
                    party: "R",
                    vote_total: 1442,
                    vote_percentage: 1.2
                },
                {
                    name: "Jeff Ridgeway",
                    party: "I",
                    vote_total: 1386,
                    vote_percentage: 1.2
                },
                {
                    name: "Pat Dixon",
                    party: "L",
                    vote_total: 1306,
                    vote_percentage: 1.1
                }
            ],
            total_voters: 119350
        }
    }
]

const tx25 = {
    name: "TX-25",
    type: "us_house",
    id: 1,
    counties: [
        "Bosque",
        "Burnet",
        "Horyell",
        "Hamilton",
        "Hill",
        "Johnson",
        "Lampasas",
        "Somerville",
        "Bell",
        "Erath",
        "Hays",
        "Tarrant",
        "Travis"
    ],
    demographics: {
        total_population: 818807,
        age: {
          0: 46665,
          5: 143625,
          18: 513117,
          65: 115340
        },
        race: {
          white: 674846,
          black: 60306,
          asian: 30741,
          indigenous: 4034,
          pacific_islander: 2261,
          other: 46620
        },
        ethnicity: {
          hispanic: 152814,
          non_hispanic: 665993
        },
        educational_attainment: {
          enrollment: {
            preschool: 12457,
            primary: 135921,
            university: 58622
          },
          attainment: {
            high_school: 176522,
            some_college: 151417,
            bachelors: 224087
          }
        },
        income: {
          0: 13666,
          10_000: 26346,
          25_000: 49536,
          50_000: 83419,
          100_000: 81659,
          200_000: 37207
        }
    }
}

const tx14 = {
    name: "TX-14",
    type: "tx_senate",
    id: 2,
    counties: ["Bastrop", "Travis"],
    demographics: {
        total_population: 970_392,
        age: {
          0: 63781,
          5: 150057,
          18: 663268,
          65: 93286
        },
        race: {
          white: 491907,
          black: 98760,
          asian: 79702,
          indigenous: 0,
          pacific_islander: 0,
          other: 302768
        },
        ethnicity: {
          hispanic: 302768,
          non_hispanic: 665993
        },
        educational_attainment: {
          enrollment: {
            preschool: 17297,
            primary: 149965,
            university: 83991
          },
          attainment: {
            high_school: 71266,
            some_college: 0,
            bachelors: 320157
          }
        },
        income: {
          0: 20411,
          10_000: 36928,
          25_000: 70750,
          50_000: 111267,
          100_000: 90599,
          200_000: 39878
        }
    }
}

export default [
    {
        id: 0,
        name: "Roger Williams",
        elected: true,
        party: "R",
        terms: {
            current: 4,
            total: 5
        },
        offices: {
            current: "us_house",
            past: ["tx_secretary_of_state"]
        },
        district: tx25,
        issues: [
            { type: "Taxes", stance: "Roger Williams has championed himself as a small business owner and supports tax cuts for businesses. He voted yes for the Tax Cuts and Jobs Act (HR1) in 2017." },
            { type: "Healthcare", stance: "Roger Williams positions himself against the Affordable Care Act (ACA). He voted to repeal major provisions of the ACA in 2013 and 2015, and he voted for the American Health Care Act, the Republican skinny repeal of the ACA, in 2017. " }
        ],
        biography: [
            "Roger Williams is a Christian, conservative, pro-life and second amendment supporter fighting to take our Texas values to Washington, D.C.",
            "Roger is running for Congress not to be something, but to do something. He wants to continue to use his business experience to create economic growth and jobs. And he wants to provide real leadership for our country in these challenging times.",
            "As a small business owner, Roger understands how difficult an overbearing government can be to main street America. In his small business, Roger dealt with the impact of the Obama administration, which made businesses more dependent on the government, including high taxes, rising energy prices and soaring health care costs. Since 2016, Roger has worked alongside President Trump to reverse the devastating course our country had been on for the past eight years and to make America great again.",
            "Roger’s passion for principled, conservative leadership has led him to assist the political efforts of Republican candidates from the White House to the county courthouse. He served as Regional Finance Chairman for Governor Bush in 1994 and 1998 before he went on to serve as the North Texas Chairman for the Bush/Cheney 2000 campaign, as well as the North Texas Finance Chairman and National Grassroots Fundraising Chairman for Bush/Cheney ’04, Inc. Williams was appointed by President George W. Bush in 2001 as the Chairman of the Republican National Finance Committee’s Eagles Program. He has also served as State Finance Chair for John Cornyn for U.S. Senate, Inc., in 2002 and as the National Director of the “Patriots” program for Senator Cornyn.",
            "Roger Williams’ civic activities include serving on the Board of Trustees for the Bush School of Government and Public Service at Texas A&M University. Williams is also a member of the Texas Christian University Board of Trustees, his alma mater. He also serves on the National Football Foundation and College Football Hall of Fame Board of Directors.",
            "Roger has been a small business owner in Texas for over 45 years. He and his wife, Patty, have two adult daughters."
        ],
        image: "https://williams.house.gov/sites/williams.house.gov/files/wysiwyg_uploaded/CRW%20Official_0_0.jpg",
        socials: {
            facebook: "http://www.facebook.com/RepRogerWilliams",
            twitter: "http://twitter.com/RepRWilliams",
            youtube: "http://www.youtube.com/channel/UCBtfmMMQarjtLB9U_pWMOhw"
        },
        website: "https://www.rogerforcongress.com/",
        video: "https://www.youtube.com/embed/JInEd3KuqTM",
        elections: {
            upcoming: smolElections[2],
            past: [
                smolElections[0]
            ]
        },
        fundraising: {
            raised: 1501689.00,
            spent: 1156825.00,
            remaining_cash: 1268552,
            contributors: [
                {
                    type: "small_individual",
                    amount: 10407.00
                },
                {
                    type: "large_individual",
                    amount: 331010
                },
                {
                    type: "pac",
                    amount: 535343
                },
                {
                    type: "other",
                    amount: 625289
                }
            ]
        }
    },
    {
        id: 1,
        name: "Julie Oliver",
        elected: false,
        party: "D",
        offices: {
            running_for: "us_house"
        },
        district: tx25,
        video: "https://www.youtube.com/embed/3K3YJPPsxIU",
        image: "https://scontent-dfw5-2.xx.fbcdn.net/v/t1.0-9/104668585_707039289860202_5103079548330835955_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=tjiJ60NeU1QAX8310M8&_nc_ht=scontent-dfw5-2.xx&oh=aed9bf79758644386c129b1be1dc0db7&oe=5F92597A",
        socials: {
            facebook: "https://www.facebook.com/JulieForTexas/",
            twitter: "https://twitter.com/julieolivertx",
            instagram: "https://www.instagram.com/julieolivertx"
        },
        biography: ["Julie Oliver is running for Congress because Austin and Central Texas deserve a representative who will show up, listen to those she serves, and work for all of us. She's running a bold campaign for Medicare for All, a Green New Deal, a pathway to citizenship, and an economy that works for everyone, not just corporations and the wealthy few."],
        issues: [
            { type: "Taxes", stance: "Julie has stated that she wants to revert corporate Tax breaks from the Trump and Obama administration. She also wants to go further and add a 70-90% tax on corporate PACs to reverse the decision of Citizen's United. " },
            { type: "Healthcare", stance: "Julie has centered her campaign around the Bernie Sanders \"Medicare For All\" plan which would end private insurance in the US and create a single payer system. She pledges to vote for the Medicare For All Act of 2019 (HR 1384) and allow Medicare to negotiate the cost of prescriptions with HR275." }
        ],
        website: "https://www.julieoliver.org/",
        elections: {
            upcoming: smolElections[2], 
            past: [
                smolElections[1],
                smolElections[0]
            ]
        },
        fundraising: {
            raised: 676227.0,
            spent: 586228.0,
            remaining_cash: 89999,
            contributors: [
                {
                    type: "small_individual",
                    amount: 201_886.0
                },
                {
                    type: "large_individual",
                    amount: 475_965.0
                },
                {
                    type: "self_finance",
                    amount: 2_830.0
                },
                {
                    type: "other",
                    amount: -4_434.0
                }
            ]
        }
    },
    {
        id: 2,
        name: "Sarah Eckhardt",
        elected: true,
        party: "D",
        terms: {
            current: 1,
            total: 3
        },
        offices: {
            current: "tx_senate",
            past: []
        },
        district: tx14,
        video: "https://www.youtube.com/embed/w_ZLKhfjtlI",
        biography: [
            "Sarah Eckhardt was honored to have been re-elected to a second term as Travis County Judge in 2018. As County Judge, she proudly represented 1.3 million county residents and presided over the Commissioners Court.",
            "With deep roots in Austin and Travis County, Judge Eckhardt has dedicated her life to public service for 20 years. She looks forward to continuing this service and asks for your support to become our next State Senator.",
        ],
        issues: [
            { type: "Taxes", stance: "Senator Eckhardt supports new taxes to fund state social programs. She proposes an expanded sales tax on professional services like accounting and legal representation, increased gasoline and diesel tax based off of fuel consumption, cap the local homestead exemption to a flat rate to increase revenue from expensive properties, and remove tax breaks for large corporations." },
            { type: "Healthcare", stance: "Senator Eckhardt wants to lead the effort to make healthcare more accessible in Texas. She proposes this through making Medicaid, SNAP, and CHIP accessible by Venmo or Apple Pay, expanded telehealth options by universal broadband, and a centralized exchange of healthcare information." }
        ],
        image: "https://lbj.utexas.edu/sites/default/files/Eckhardt%2C%20Sarah%20headshot.jpg",
        socials: {
            facebook: "https://www.facebook.com/SarahEckhardtAustin",
            twitter: "https://saraheckhardt.com/?nosplash#twitterModal",
            instagram: "https://www.instagram.com/saraheckhardtaustin/"
        },
        website: "https://saraheckhardt.com/",
        elections: {
            upcoming: null,
            past: [
                smolElections[3]
            ]
        }
    }
]

