import React from "react"
import { Typography } from "antd"
import { numberStringWithCommas } from "library/Functions"

/**
 * Column info for election list view
 */
const electionColumns = [
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
			<Typography.Text style={{ fontSize: 18 }}>
				{text ? text : "All"}
			</Typography.Text>
		),
	},
	{
		title: "District",
		dataIndex: "district",
		key: "district",
		render: (text) => (
			<Typography.Text style={{ fontSize: 18 }}>{text}</Typography.Text>
		),
	},
	{
		title: "Office",
		dataIndex: "office",
		key: "office",
		render: (text) => (
			<Typography.Text style={{ fontSize: 18 }}>{text}</Typography.Text>
		),
	},
	{
		title: "Total Voters",
		dataIndex: "totalVoters",
		key: "totalVoters",
		render: (text) => (
			<Typography.Text style={{ fontSize: 18 }}>
				{text
					? text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
					: "TBD"}
			</Typography.Text>
		),
	},
	{
		title: "Election Date",
		dataIndex: "election_date",
		key: "election_date",
		render: (text) => (
			<Typography.Text style={{ fontSize: 18 }}>{text}</Typography.Text>
		),
	},
]

/**
 * Result columns for Ant Design Table 
 */
const resultColumns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		sorter: (a, b) => {
			return a.name.localeCompare(b.name)
		}
	},
	{
		title: "Party",
		dataIndex: "party",
		key: "party",
	},
	{
		title: "Vote Total",
		dataIndex: "vote_total",
		key: "vote_total",
		render: (text) => numberStringWithCommas(text),
		sorter: (a, b) => {
			return a.vote_total - b.vote_total
		}
	},
	{
		title: "Vote Percentage",
		dataIndex: "vote_percentage",
		key: "vote_percentage",
		render: (text) => text + "%",
		sorter: (a, b) => {
			return a.vote_percentage - b.vote_percentage
		}
	},
]

export {
	electionColumns,
	resultColumns
}
