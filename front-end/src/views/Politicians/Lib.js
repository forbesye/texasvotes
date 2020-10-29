const ELECTED_OFFICE_NAMES = {
    tx_house: "State Representative",
    tx_senate: "State Senator",
    us_house: "US Representative",
    us_senate: "US Senator",
    tx_secretary_of_state: "Texas Secretary of State"
}

const CHALLENGER_OFFICE_NAMES = {
    tx_house: "Candidate for State House Seat",
    tx_senate: "Candidate for State Senate Seat",
    us_house: "Candidate for US House Seat",
    us_senate: "Candidate for US Senate Seat"
}

export function subtitle (name, elected=true) {
    if (elected) {
        return ELECTED_OFFICE_NAMES[name]
    }
    return CHALLENGER_OFFICE_NAMES[name]
}

export function officeName (name) {
    return ELECTED_OFFICE_NAMES[name]
}

export function description (politician) {
    const districtName = politician.district.number === -1 ? "Texas" : `TX-${politician.district.number}`
    if (politician.incumbent) {
        return `${ELECTED_OFFICE_NAMES[politician.current]} | ${districtName}`
    } else {
        return `${CHALLENGER_OFFICE_NAMES[politician.running_for]} ${ politician.running_for !== "us_senate" ? politician.district.number : ""}`
    }
}