import React, { useState, useEffect, useRef } from "react"
import { Table, Divider, Typography, Select } from "antd"
import { useHistory } from "react-router-dom"
import {
	ArrayParam,
	NumberParam,
	StringParam,
	useQueryParams,
	withDefault,
} from "use-query-params"
import { electionColumns } from "./Lib"
import { districtName } from "./../Districts/Lib"
import { getAPI, checkCache } from "library/APIClient"
import styles from "./Elections.module.css"
import {
	election_type_mappings,
	elected_office_mappings,
} from "library/Mappings"
import { monthDayYearParse } from "library/Functions"
import {
	OfficeFilter,
	DistrictNumberFilter,
	ElectionTypeFilter,
	CountiesFilter,
} from "library/FilterValues"
import { updateFilter } from "library/Functions"

const { Title, Paragraph } = Typography
const { Option } = Select

/**
 * Functional component for election list view
 */
const ListView = () => {
	const history = useHistory()
	const [loading, setLoading] = useState(true)
	const [listData, setListData] = useState([])
	// Parse params from URL
	const [params, setParams] = useQueryParams({
		sort: withDefault(StringParam, "-electionDate"),
		page: withDefault(NumberParam, 1),
		counties: ArrayParam,
		type: ArrayParam,
		office: ArrayParam,
		dist: ArrayParam,
	})
	const [total, setTotal] = useState(20)
	const listRef = useRef(null)
	const { sort, counties, type, office, dist } = params

	useEffect(() => {
		/**
		 * Constructs URLSearchParams object from given params state and
		 * changes URL
		 * @param {Params} params
		 */
		const constructURLParams = (params) => {
			let URLParams = new URLSearchParams()
			URLParams.append("page", params.page)
			URLParams.append("sort", params.sort)
			if (params.counties) {
				params.counties.forEach((county) =>
					URLParams.append("counties", county)
				)
			}
			if (params.type) {
				params.type.forEach((type) => URLParams.append("type", type))
			}
			if (params.office) {
				params.office.forEach((office) =>
					URLParams.append("office", office)
				)
			}
			if (params.dist) {
				params.dist.forEach((dist) => URLParams.append("dist", dist))
			}
			return URLParams
		}

		/**
		 * Gets data from API and sets state
		 */
		const fetchData = async () => {
			try {
				setLoading(true)
				const request = {
					model: "election",
					params: constructURLParams(params),
				}
				let data = checkCache(request)
				if(!data) {
					data = await getAPI(request)
				}
				const { page, count } = data
				const electionData = page.map((election) => {
					return {
						...election,
						key: election.id,
						district: districtName(election.district),
						type: election_type_mappings[`${election.type.class}`],
						office: elected_office_mappings[election.office],
						winner: election.results
							? election.results.winner.name
							: "TBD",
						totalVoters: election.results
							? election.results.total_voters
							: "",
						election_date: monthDayYearParse(
							election.dates.election_day
						),
						early_date: monthDayYearParse(
							election.dates.early_start
						),
					}
				})
				setTotal(count)
				setListData(electionData)
				setLoading(false)
			} catch (err) {
				console.error(err)
				history.push("/error")
			}
		}
		fetchData()
	}, [params, history])

	const handleTableChange = ({ current }) => {
		setParams({
			...params,
			page: current,
		})
		// Scrolls to top of table on page change
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
					Have you ever wondered what all Texas elections look like in
					a list view? Probably not, but we've got you covered here.
					The list can also be filtered and sorted by different
					properties to make your viewing experience more
					customizable.
				</Paragraph>
			</section>
			<Divider />
			{/* Filters */}
			<section className={styles.filterSection}>
				<Title level={3}>Filter</Title>
				<CountiesFilter
					onChange={updateFilter("counties", setParams, params)}
					value={counties}
				/>
				<OfficeFilter
					onChange={updateFilter("office", setParams, params)}
					value={office}
				/>
				<DistrictNumberFilter
					onChange={updateFilter("dist", setParams, params)}
					value={dist}
				/>
				<ElectionTypeFilter
					onChange={updateFilter("type", setParams, params)}
					value={type}
				/>
				<Title level={3}>Sort</Title>
				<div style={{ marginBottom: 20, textAlign: "center" }}>
					<Title level={5}>Order</Title>
					<Select
						size="large"
						defaultValue="-electionDate"
						style={{ width: 150 }}
						onChange={updateFilter("sort", setParams, params)}
						value={sort}
					>
						<Option key={"-electionDate"} value={"-electionDate"}>
							Date (Newest)
						</Option>
						<Option key={"electionDate"}>Date (Oldest)</Option>
						<Option key={"dist"}>District (Asc.)</Option>
						<Option key={"-dist"}>District (Desc.)</Option>
					</Select>
				</div>
			</section>
			{/* Election Table */}
			<section ref={listRef}>
				<Table
					dataSource={listData}
					columns={electionColumns}
					onRow={(record) => {
						return {
							onClick: (event) => {
								const { id } = record
								history.push(`/elections/view/${id}`)
							},
						}
					}}
					loading={loading}
					rowClassName={styles.cursor}
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
