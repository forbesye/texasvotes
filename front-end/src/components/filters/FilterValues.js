import {
	counties_list,
	party_mappings,
	elected_office_mappings,
	election_type_mappings,
	population_mappings,
} from "library/Mappings"
import { identityObjectFromArray } from "library/Functions"

const filterOptionsMap = {
	Counties: identityObjectFromArray(counties_list),
	Party: party_mappings,
	"Election Type": election_type_mappings,
	"District #": identityObjectFromArray(
		[...Array(150).keys()].map((n) => n + 1)
	),
	"Congressional District #": identityObjectFromArray(
		[...Array(36).keys()].map((n) => n + 1)
	),
	"Population Range": population_mappings,
	Office: elected_office_mappings,
	"Demographics": identityObjectFromArray(
		["age", "race", "education_enrollment", "education_attainment", "ethnicity", "income"]
	),
}

const filterTitlesMap = {
	counties: "Counties",
	party: "Party",
	type: "Election Type",
	dist: "District #",
	district_num: "District #",
	number: "District #",
	district: "Congressional District #",
	popRange: "Population Range",
	office: "Office",
	demographics: "Demographics",
}

const sortValuesMap = {
	Politician: {
		optionsMap: {
			name: "Name: A-Z",
			"-name": "Name: Z-A",
			number: "District (Asc.)",
			"-number": "District (Desc.)",
		},
		init: "name",
	},
	District: {
		optionsMap: {
			number: "District (Asc.)",
			"-number": "District (Desc.)",
			pop: "Pop. (Asc.)",
			"-pop": "Pop. (Desc.)",
		},
		init: "number",
	},
	Election: {
		optionsMap: {
			"-electionDate": "Date (Newest)",
			electionDate: "Date (Oldest)",
			dist: "District (Asc.)",
			"-dist": "District (Desc.)",
		},
		init: "-electionDate",
	},
}

export { filterOptionsMap, sortValuesMap, filterTitlesMap }
