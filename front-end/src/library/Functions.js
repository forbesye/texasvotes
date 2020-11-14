import { party_mappings } from "library/Mappings"

/*
 * Returns a string, only use for final output!
 */
const numberStringWithCommas = (num) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/**
 * Returns MM-DD-YYYY date string
 * @param {string} d date in ISO format
 */
const monthDayYearParse = (d) => {
	const date = new Date(d)
	return date.toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	})
}

/**
 * Returns a function to update the params with the appropriate filter
 * @param {f()} filter
 * @param {f()} setParams
 * @param {T} params
 */
const updateFilter = (filter, setParams, params) => {
	return (value) => {
		setParams({
			...params,
			[filter]: value,
			page: 1,
		})
	}
}

/**
 * Returns a percentage from val and total
 * @param {Number} val
 * @param {Number} total
 */
const convertToPercent = (val, total) => {
	return Math.round((val / 100) * total)
}

/**
 * Returns the appropriate district phrase
 * @param {String} office
 * @param {Number} number
 */
const districtName = (office, number) => {
	const OFFICE_NAMES = {
		us_house: "US Congressional District",
		us_senate: "US Senate Seat for Texas",
		tx_house: "Texas House of Representatives District",
		tx_senate: "Texas State Senate District",
		us_president: "US Presidential Vote in Texas",
	}

	if (number < 0) {
		return OFFICE_NAMES[office]
	} else {
		return `${OFFICE_NAMES[office]} ${number}`
	}
}

const electionTitle = (election) => {
	const { dates, office, district, type, party } = election
	const { number } = district
	const { election_day } = dates
	const electionYear = new Date(election_day).getFullYear()
	if (type.class === "general") {
		return `${electionYear} General Election for ${districtName(
			office,
			number
		)}`
	} else if (type.class === "runoff") {
		return `${electionYear} ${
			party_mappings[party]
		} Runoff for ${districtName(office, number)}`
	} else {
		return `${electionYear} ${
			party_mappings[party]
		} Primary for ${districtName(office, number)}`
	}
}

/**
 * Returns number as string with format $XX.XX
 * @param {Number} num
 */
const formatAsMoney = (num) => {
	return `$` + numberStringWithCommas(num.toFixed(2))
}

export {
	numberStringWithCommas,
	monthDayYearParse,
	convertToPercent,
	districtName,
	formatAsMoney,
	updateFilter,
	electionTitle,
}
