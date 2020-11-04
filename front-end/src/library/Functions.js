const percentageString = (key, obj) => {
	let sum = 0.0
	let keyVal = obj[key]
	for (const val in obj) {
		sum += parseInt(obj[val])
	}
	keyVal = (keyVal / sum) * 100

	return `(${keyVal.toFixed(2)}%)`
}

/*
 * Returns a string, only use for final output!
 */
const numberStringWithCommas = (num) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const monthDayYearParse = (d) => {
	const date = new Date(d)
	return date.toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	})
}

const changeFilter = (setFunc) => {
	const output = (value) => {
		setFunc(value)
	}
	return output
}

const districtName = (office, number) => {
	const OFFICE_NAMES = {
		us_house: "US Congressional District",
		us_senate: "US Senate",
		tx_house: "Texas House of Representatives District",
		tx_senate: "Texas State Senate District",
	}

	if (office === "us_senate") {
		return "US Senate Seat for Texas"
	} else {
		return `${OFFICE_NAMES[office]} ${number}`
	}
}

const formatAsMoney = (num) => {
	return `$` + numberStringWithCommas(num.toFixed(2))
}


export {
	percentageString,
	numberStringWithCommas,
	monthDayYearParse,
	changeFilter,
	districtName,
    formatAsMoney
}
