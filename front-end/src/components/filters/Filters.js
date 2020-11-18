import React, { Fragment } from "react"
import { Typography, Select } from "antd"
import { updateFilter } from "library/Functions"
import {
	filterOptionsMap,
	filterTitlesMap,
	sortValuesMap,
} from "components/filters/FilterValues"
const { Option } = Select
const { Title } = Typography

const Filter = ({ value, name, hook }) => {
	const [params, setParams] = hook
	const title = filterTitlesMap[name]
	const optionsMap = filterOptionsMap[title]
	return (
		<div style={{ marginBottom: 20, textAlign: "center" }}>
			<Title level={5}>{title}</Title>
			<Select
				mode={name !== "popRange" && name !== "district" ? "multiple" : ""}
				maxTagCount={1}
				defaultValue={name === "popRange" ? "" : undefined}
				showArrow={true}
				style={{ width: 150 }}
				onChange={updateFilter(name, setParams, params)}
				value={value}
			>
				{name === "popRange" && (
					<Option key="" value="">
						All
					</Option>
				)}
				{Object.keys(optionsMap).map((key) => (
					<Option key={key}>{optionsMap[key]}</Option>
				))}
			</Select>
		</div>
	)
}

const VisFilter = ({ value, name, hook }) => {
	const [params, setParams] = hook
	const title = filterTitlesMap[name]
	const optionsMap = filterOptionsMap[title]
	return (
		<div style={{ marginBottom: 20, textAlign: "center" }}>
			<Title level={5}>{title}</Title>
			<Select
				mode=""
				maxTagCount={1}
				defaultValue={name === "popRange" ? "" : undefined}
				showArrow={true}
				style={{ width: 150 }}
				onChange={(value) => setParams(value)}
				value={value}
			>
				{Object.keys(optionsMap).map((key) => (
					<Option key={key}>{optionsMap[key]}</Option>
				))}
			</Select>
		</div>
	)
}

const Sort = ({ value, model, hook }) => {
	const [params, setParams] = hook
	const sortVals = sortValuesMap[model]
	const { optionsMap, init } = sortVals
	return (
		<Fragment>
			<Title level={3}>Sort</Title>
			<div style={{ marginBottom: 20, textAlign: "center" }}>
				<Title level={5}>Order</Title>
				<Select
					defaultValue={init}
					style={{ width: 150 }}
					onChange={updateFilter("sort", setParams, params)}
					value={value}
				>
					{Object.keys(optionsMap).map((key) => (
						<Option key={key}>{optionsMap[key]}</Option>
					))}
				</Select>
			</div>
		</Fragment>
	)
}

export { Filter, Sort, VisFilter }
