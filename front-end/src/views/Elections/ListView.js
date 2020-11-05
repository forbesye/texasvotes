import React, { useState, useEffect, useRef } from "react"
import { Table, Divider, Typography, Select } from "antd"
import { useHistory } from "react-router-dom"
import columns from "./Lib"
import { districtName } from "./../Districts/Lib"
import { getAPI } from "library/APIClient"
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
import { changeFilter, updateFilter } from "library/Functions"
import { IeOutlined } from "@ant-design/icons"

const { Title, Paragraph } = Typography
const { Option } = Select

const ListView = () => {
	const URLParams = new URLSearchParams(window.location.search)
	const history = useHistory()
	const [loading, setLoading] = useState(true)
	const [listData, setListData] = useState([])
	const [params, setParams] = useState({ 
		page: URLParams.get("page") ? URLParams.get("page") : 1,
		sort: URLParams.get("sort") ? URLParams.get("sort") : "-electionDate",
		counties: URLParams.getAll("counties"),
		type: URLParams.getAll("type"),
		office: URLParams.getAll("office"),
		dist: URLParams.getAll("dist")
	})
	const [total, setTotal] = useState(20)
	const listRef = useRef(null)

	useEffect(() => {
		const constructURLParams = (params) => {
			let URLParams = new URLSearchParams()
			URLParams.append("page", params.page)
			URLParams.append("sort", params.sort)
			params.counties.forEach(county => URLParams.append("counties", county))
			params.type.forEach(type => URLParams.append("type", type))
			params.office.forEach(office => URLParams.append("office", office))
			params.dist.forEach(dist => URLParams.append("dist", dist))
			history.push({
				pathname: "/election/view",
				search: "?" + URLParams.toString()
			})
			return URLParams
		}

		const fetchData = async () => {
            try {
				setLoading(true)
                const { page, count } = await getAPI({
                        model: "election",
                        params: constructURLParams(params)
				})
                const data = page.map((election) => {
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
                        early_date: monthDayYearParse(election.dates.early_start),
                    }
				})
				setTotal(count)
				setListData(data)
            } catch (err) {
				console.error(err)
				history.push("/error")
            }
		}
		fetchData()
		return (() => { setLoading(false) })
	}, [
		params,
		history
	])

	const handleTableChange = ({ current, total }) => {
		setParams({
			...params,
			page: current,
			total: total
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
					Have you ever wondered what all Texas elections look like in
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
				<OfficeFilter onChange={updateFilter("office", setParams, params)} />
				<DistrictNumberFilter
					onChange={updateFilter("dist", setParams, params)}
				/>
				<ElectionTypeFilter
					onChange={updateFilter("type", setParams, params)}
				/>
				<Title level={3}>Sort</Title>
				<div style={{ marginBottom: 20, textAlign: "center" }}>
					<Title level={5}>Order</Title>
					<Select
						size="large"
						defaultValue="-electionDate"
						style={{ width: 150 }}
						onChange={updateFilter("sort", setParams, params)}
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

			<section ref={listRef}>
				<Table
					dataSource={listData}
					columns={columns}
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
