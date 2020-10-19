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
    if (politician.incumbent) {
        return `${ELECTED_OFFICE_NAMES[politician.current]} (${politician.party}) | TX-${politician.district.number}`
    } else {
        return `${CHALLENGER_OFFICE_NAMES[politician.running_for]} (${politician.party})`
    }
}