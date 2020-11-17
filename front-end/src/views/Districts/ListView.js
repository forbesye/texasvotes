import React, { useState, useEffect, useRef } from "react"
import {
	ArrayParam,
	NumberParam,
	StringParam,
	useQueryParams,
	withDefault,
} from "use-query-params"
import { Table, Divider, Typography } from "antd"
import { useHistory } from "react-router-dom"
import styles from "./Districts.module.css"
import columns, { districtName } from "./Lib"
import { party_mappings, elected_office_mappings } from "library/Mappings"
import { getAPI } from "library/APIClient"
import { Filter, Sort } from "components/filters/Filters"
const { Title, Paragraph } = Typography

/**
 * Functional component for list of Districts
 */
const ListView = () => {
	const history = useHistory()
	const [loading, setLoading] = useState(true)
	const [listData, setListData] = useState([])
	const [total, setTotal] = useState(20)
	// Initial query params based off URL of page
	const [params, setParams] = useQueryParams({
		sort: withDefault(StringParam, "number"),
		page: withDefault(NumberParam, 1),
		popRange: StringParam,
		counties: ArrayParam,
		party: ArrayParam,
		number: ArrayParam,
		office: ArrayParam,
	})
	const listRef = useRef(null)

	/**
	 * Is called any time there is a change to filter, sort, or page values
	 */
	useEffect(() => {
		const fetchData = async () => {
			/**
			 * Creates proper URLSearchParams given current param
			 * state
			 * @param {Params} params
			 */
			const constructURLParams = (params) => {
				let URLParams = new URLSearchParams()
				URLParams.append("page", params.page)
				URLParams.append("sort", params.sort)
				if (params.popRange) {
					URLParams.append("popRange", params.popRange)
				}
				if (params.counties) {
					params.counties.forEach((county) =>
						URLParams.append("counties", county)
					)
				}
				if (params.party) {
					params.party.forEach((type) =>
						URLParams.append("party", type)
					)
				}
				if (params.office) {
					params.office.forEach((office) =>
						URLParams.append("office", office)
					)
				}
				if (params.number) {
					params.number.forEach((dist) =>
						URLParams.append("number", dist)
					)
				}
				return URLParams
			}

			try {
				setLoading(true)
				const { page, count } = await getAPI({
					model: "district",
					params: constructURLParams(params),
				})
				// Modifies API data for front-end use
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
				console.error(err)
				history.push("/error")
			}
		}
		fetchData()
	}, [history, params])

	const handleTableChange = ({ current }) => {
		setParams({
			...params,
			page: current,
		})
		// Go to top of list view on page change
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
			{/* Filter and sort*/}
			<section className={styles.filterSection}>
				<Title level={3}>Filter</Title>
				{["counties", "party", "office", "number", "popRange"].map(
					(name) => (
						<Filter
							name={name}
							value={params[name]}
							hook={[params, setParams]}
						/>
					)
				)}
				<Sort
					model="District"
					value={params.sort}
					hook={[params, setParams]}
				/>
			</section>

			{/* Table of district data */}
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
