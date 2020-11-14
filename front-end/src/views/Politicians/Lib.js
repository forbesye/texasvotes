// Todo: Refactor using Mappings.js and Functions.js in library
const ELECTED_OFFICE_NAMES = {
	tx_house: "State Representative",
	tx_senate: "State Senator",
	us_house: "US Representative",
	us_senate: "US Senator",
	tx_secretary_of_state: "Texas Secretary of State",
	us_president: "President of the US",
}

const CHALLENGER_OFFICE_NAMES = {
	tx_house: "Candidate for State House Seat",
	tx_senate: "Candidate for State Senate Seat",
	us_house: "Candidate for US House Seat",
	us_senate: "Candidate for US Senate Seat",
	us_president: "Candidate for US President",
}

export function subtitle(name, elected = true) {
	if (elected) {
		return ELECTED_OFFICE_NAMES[name]
	}
	return CHALLENGER_OFFICE_NAMES[name]
}

export function officeName(name) {
	return ELECTED_OFFICE_NAMES[name]
}

/**
 * Returns description of politician
 * @param {Number} distNum
 * @param {Boolean} current
 * @param {String} runningFor
 * @param {Boolean} incumbent
 */
export function description(distNum, current, runningFor, incumbent) {
	const districtName = distNum < 0 ? "Texas" : `TX-${distNum}`
	if (incumbent) {
		return `${ELECTED_OFFICE_NAMES[current]} | ${districtName}`
	} else {
		return `${CHALLENGER_OFFICE_NAMES[runningFor]} ${
			!["us_senate", "us_president"].includes(runningFor) ? distNum : ""
		}`
	}
}
