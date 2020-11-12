import React from "react"
import { Typography, Select } from "antd"
import {
	counties_list,
	party_mappings,
	elected_office_mappings,
} from "library/Mappings"
const { Option } = Select
const { Title } = Typography

/**
 * Filter components to use across our model pages
 * @param {f()} onChange function to pass to returned component
 */

const CountiesFilter = ({ onChange, value }) => {
	return (
		<div style={{ marginBottom: 20, textAlign: "center" }}>
			<Title level={5}>Counties</Title>
			<Select
				mode="multiple"
				maxTagCount={1}
				showArrow={true}
				size="large"
				style={{ width: 150 }}
				onChange={onChange}
				value={value}
			>
				{counties_list.map((county) => (
					<Option key={county}>{county}</Option>
				))}
			</Select>
		</div>
	)
}

const PartiesFilter = ({ onChange, value }) => {
	const parties = ["R", "D", "L", "I"]
	return (
		<div style={{ marginBottom: 20, textAlign: "center" }}>
			<Title level={5}>Party</Title>
			<Select
				mode="multiple"
				maxTagCount={1}
				showArrow={true}
				size="large"
				style={{ width: 150 }}
				onChange={onChange}
				value={value}
			>
				{parties.map((party) => (
					<Option key={party}>{party_mappings[party]}</Option>
				))}
			</Select>
		</div>
	)
}

const OfficeFilter = ({ onChange, value }) => {
	const offices = ["tx_house", "tx_senate", "us_house", "us_senate", "us_president"]
	return (
		<div style={{ marginBottom: 20, textAlign: "center" }}>
			<Title level={5}>Office</Title>
			<Select
				mode="multiple"
				maxTagCount={1}
				showArrow={true}
				size="large"
				style={{ width: 150 }}
				onChange={onChange}
				value={value}
			>
				{offices.map((office) => (
					<Option key={office}>
						{elected_office_mappings[office]}
					</Option>
				))}
			</Select>
		</div>
	)
}

const DistrictNumberFilter = ({ onChange, value }) => {
	const nums = [...Array(150).keys()].map((n) => n + 1)
	return (
		<div style={{ marginBottom: 20, textAlign: "center" }}>
			<Title level={5}>District #</Title>
			<Select
				mode="multiple"
				maxTagCount={1}
				showArrow={true}
				size="large"
				style={{ width: 150 }}
				onChange={onChange}
				value={value}
			>
				{nums.map((n) => (
					<Option key={n}>{n}</Option>
				))}
			</Select>
		</div>
	)
}

const PopulationRange = ({ onChange, value }) => {
	const populationValues = {
		"100000-150000": "100K - 150K",
		"150000-200000": "150K - 200K",
		"200000-250000": "200K - 250K",
		"800000-850000": "800K - 850K",
		"850000-900000": "850K - 900K",
		"900000-950000": "900K - 950K",
		"950000-1000000": "950K - 1M",
		1000000: "1M+",
	}

	return (
		<div style={{ marginBottom: 20, textAlign: "center" }}>
			<Title level={5}>Population range</Title>
			<Select
				size="large"
				defaultValue=""
				style={{ width: 150 }}
				onChange={onChange}
				value={value}
			>
				<Option key={""} value={""}>
					All
				</Option>
				{Object.keys(populationValues).map((key) => (
					<Option key={key}>{populationValues[key]}</Option>
				))}
			</Select>
		</div>
	)
}

const ElectionTypeFilter = ({ onChange, value }) => {
	const electionTypes = ["general", "primary", "runoff"]
	return (
		<div style={{ marginBottom: 20, textAlign: "center" }}>
			<Title level={5}>Election Type</Title>
			<Select
				mode="multiple"
				maxTagCount={1}
				showArrow={true}
				size="large"
				style={{ width: 150 }}
				onChange={onChange}
				value={value}
			>
				{electionTypes.map((n) => (
					<Option key={n}>
						{n.charAt(0).toUpperCase() + n.slice(1)}
					</Option>
				))}
			</Select>
		</div>
	)
}

export {
	CountiesFilter,
	PartiesFilter,
	OfficeFilter,
	DistrictNumberFilter,
	PopulationRange,
	ElectionTypeFilter,
}
