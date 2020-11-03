import React from "react"
import { Typography } from "antd"

const columns = [
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

export default columns
