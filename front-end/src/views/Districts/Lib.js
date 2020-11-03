import React from "react"
import { Typography } from "antd"
import { elected_office_mappings, party_mappings } from "library/Mappings"

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

export function description(district) {
	return `${elected_office_mappings[district.type]} ${
		party_mappings[district.party]
	}`
}

export default columns
