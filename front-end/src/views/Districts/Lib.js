import React from "react"
import { Typography } from "antd"
import { elected_office_mappings, party_mappings } from "library/Mappings"
import PieChart from "components/charts/PieChart"
import { formatAsMoney, convertToPercent } from "library/Functions"
const {Text} = Typography

/**
 * Columns for district ListView
 */
const columns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		render: (text) => (
			<Typography.Text style={{ fontSize: 18 }}>{text}</Typography.Text>
		),
	},
	{
		title: "Type",
		dataIndex: "type",
		key: "type",
		render: (text) => (
			<Typography.Text style={{ fontSize: 18 }}>{text}</Typography.Text>
		),
	},
	{
		title: "Party",
		dataIndex: "party",
		key: "party",
		render: (text) => (
			<Typography.Text style={{ fontSize: 18 }}>{text}</Typography.Text>
		),
	},
	{
		title: "Population",
		dataIndex: "population",
		key: "population",
		render: (text) => (
			<Typography.Text style={{ fontSize: 18 }}>
				{text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
			</Typography.Text>
		),
	},
	{
		title: "Elected Official",
		dataIndex: "official_name",
		key: "official_name",
		render: (text) => (
			<Typography.Text style={{ fontSize: 18 }}>{text}</Typography.Text>
		),
	},
]

/**
 * Returns full name for district based off type and number
 * @param {District} district
 */
export function districtName(district) {
	if (district.type === "tx_house") {
		return `Texas House District ${district.number}`
	} else if (district.type === "tx_senate") {
		return `Texas Senate District ${district.number}`
	} else if (district.type === "us_house") {
		return `Congressional District ${district.number}`
	} else {
		return `Texas`
	}
}

/**
 * Returns full description for district
 * @param {District} district
 */
export function description(district) {
	return `${elected_office_mappings[district.type]} ${
		party_mappings[district.party]
	}`
}

/**
 * Returns a link to an associated election with proper text
 * @param {Election object} election
 * @param {Number} number
 */
export function electionName(election, number) {
	const { dates, office, type, party } = election
	const { election_day } = dates
	const electionYear = new Date(election_day).getFullYear()
	if (type.class === "general") {
		return (
			<div>
				{`${electionYear} General Election for `}{" "}
				{districtName(office, number)}
			</div>
		)
	} else if (type.class === "runoff") {
		return (
			<div>
				{`${electionYear} ${
					party_mappings[party]
				} Runoff for ${districtName(office, number)}`}
			</div>
		)
	} else {
		return (
			<div>
				{`${electionYear} ${
					party_mappings[party]
				} Primary for ${districtName(office, number)}`}
			</div>
		)
	}
}

/**
 * Returns labels for the chart
 * @param {string} type
 * @param {array} items
 */
const chartLabels = (type, items) => {
    if (type === "age") {
        return (
            items.map(
                (item) => {
                    if (item.end) {
                        return `${item.start} - ${item.end}`
                    } else {
                        return `${item.start}+`
                    }
                }
            )
        )
    } else if (type === "race") {
        return (items.map((item) => item.race))
    } else if (type === "ethnicity") {
        return (items.map((item) => item.ethnicity))
    } else if (type === "education") {
        return (items.map((item) => item.level))
    } else if (type === "income") {
        return (
            items.map(
                (item) => {
                    if (item.end) {
                        return `${formatAsMoney(
                            item.start
                        )} - ${formatAsMoney(
                            item.end
                        )}`
                    } else {
                        return `${formatAsMoney(
                            item.start
                        )}+`
                    }
                }
            )
        )
    }
}


/**
 * Returns a pie chart for the given parameters
 * @param {string} title
 * @param {string} type
 * @param {array} items
 * @param {int} out_of
 */
export function chart(title, type, items, out_of) {
    return (
        <>
            {title !== "" ? 
                <Text
                strong
                style={{ fontSize: 12, marginTop: 20 }}
                >
                    {title}
                </Text>
                : null
            }                
            <PieChart
                data={items.map(
                    (item) =>
                        convertToPercent(
                            item.proportion,
                            out_of
                        )
                )}
                labels={chartLabels(type, items)}
            />
        </>
    )
}
export default columns
