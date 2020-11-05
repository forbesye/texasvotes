import React, { useState, useEffect, useRef } from "react"
import { Table, Divider, Typography, Select } from "antd"
import { useHistory } from "react-router-dom"
import styles from "./Districts.module.css"
import columns, { districtName } from "./Lib"
import { party_mappings, elected_office_mappings } from "library/Mappings"
import { getAPI } from "library/APIClient"
import {
	CountiesFilter,
	PartiesFilter,
	OfficeFilter,
	PopulationRange,
	DistrictNumberFilter,
} from "library/FilterValues"
import { updateFilter } from "library/Functions"
const { Title, Paragraph } = Typography
const { Option } = Select

const ListView = () => {
	const URLParams = new URLSearchParams(window.location.search)
	const history = useHistory()
	const [loading, setLoading] = useState(true)
	const [listData, setListData] = useState([])
	const [total, setTotal] = useState(20)
	const [params, setParams] = useState({ 
		page: URLParams.get("page") ? URLParams.get("page") : 1,
		sort: URLParams.get("sort") ? URLParams.get("sort") : "number",
		popRange: URLParams.get("popRange") ? URLParams.get("popRange") : "",
		counties: URLParams.getAll("counties"),
		party: URLParams.getAll("party"),
		number: URLParams.getAll("number"),
		office: URLParams.getAll("office"),
	})
	const listRef = useRef(null)

	useEffect(() => {
		const fetchData = async () => {
			const constructURLParams = (params) => {
				let URLParams = new URLSearchParams()
				URLParams.append("page", params.page)
				URLParams.append("sort", params.sort)
				if(params.popRange) {
					URLParams.append("popRange", params.popRange)
				}
				params.counties.forEach(county => URLParams.append("counties", county))
				params.party.forEach(type => URLParams.append("party", type))
				params.office.forEach(office => URLParams.append("office", office))
				params.number.forEach(dist => URLParams.append("number", dist))
				history.push({
					pathname: "/districts/view",
					search: "?" + URLParams.toString()
				})
				return URLParams
			}

			try {
				setLoading(true)
				const { page, count } = await getAPI({
					model: "district",
					params: constructURLParams(params),
				})
				const data = page.map((district) => {
					var elected_official = district.elected_officials
						? district.elected_officials[0].name
						: "N/A"
					return {
						...district,
						key: district.id,
						type: elected_office_mappings[district.type],
						party: district.party
							? party_mappings[district.party]
							: "N/A",
						official_name: elected_official,
						population: district.demographics.total_population,
						name: districtName(district),
					}
				})
				setTotal(count)
				setListData(data)
				setLoading(false)
			} catch (err) {
				history.push("/error")
			}
		}
		fetchData()
	}, [
		history,
		params
	])

	const handleTableChange = ({ current }) => {
		setParams({
			...params,
			page: current
		})
		window.scrollTo({
			top: listRef.current.offsetTop - 30,
			behavior: "smooth",
		})
	}

	return (
		<div>
			<section className={styles.content}>
				<Title level={2}>View All</Title>
				<Paragraph style={{ fontSize: 18 }}>
					Have you ever wondered what all Texas districts look like in
					a list view? Probably not, but we've got you covered here.
					The list can also be filtered and sorted by different
					properties to make your viewing experience more
					customizable.
				</Paragraph>
			</section>
			<Divider />

			<section className={styles.filterSection}>
				<Title level={3}>Filter</Title>
				<CountiesFilter onChange={updateFilter("counties", setParams, params)} />
				<PartiesFilter onChange={updateFilter("party", setParams, params)} />
				<OfficeFilter onChange={updateFilter("office", setParams, params)} />
				<DistrictNumberFilter
					onChange={updateFilter("number", setParams, params)}
				/>
				<PopulationRange onChange={updateFilter("popRange", setParams, params)} />
				<Title level={3}>Sort</Title>
				<div style={{ marginBottom: 20, textAlign: "center" }}>
					<Title level={5}>Order</Title>
					<Select
						size="large"
						defaultValue="number"
						style={{ width: 150 }}
						onChange={updateFilter("sort", setParams, params)}
					>
						<Option key={"number"} value={"number"}>
							District (Asc.)
						</Option>
						<Option key={"-number"}>District (Desc.)</Option>
						<Option key={"pop"}>Pop. (Asc.)</Option>
						<Option key={"-pop"}>Pop. (Desc.)</Option>
					</Select>
				</div>
			</section>

			<section ref={listRef}>
				<Table
					dataSource={listData}
					columns={columns}
					onRow={(record) => {
						return {
							onClick: (event) => {
								const { id } = record
								history.push(`/districts/view/${id}`)
							},
						}
					}}
					rowClassName={styles.cursor}
					loading={loading}
					pagination={{
						current: params.page,
						total: total,
						defaultPageSize: 20,
						defaultCurrent: 1,
						pageSizeOptions: [],
					}}
					onChange={handleTableChange}
					scroll={{ x: true }}
				/>
			</section>
		</div>
	)
}

export default ListView
