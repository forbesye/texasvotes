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
import { changeFilter } from "library/Functions"

const { Title, Paragraph } = Typography
const { Option } = Select

const ListView = () => {
	const history = useHistory()
	const [loading, setLoading] = useState(true)
	const [listData, setListData] = useState([])
	const [currPage, setCurrPage] = useState(1)
	const [countiesFilter, setCountiesFilter] = useState([])
	const [electionTypeFilter, setElectionTypeFilter] = useState([])
	const [districtFilter, setDistrictFilter] = useState([])
	const [officeFilter, setOfficeFilter] = useState([])
	const [total, setTotal] = useState(20)
	const [sortVal, setSortVal] = useState("-electionDate")
	const listRef = useRef(null)

	useEffect(() => {
		const fetchData = async () => {
            try {
                setLoading(true)
                var params = new URLSearchParams()
                params.append("page", currPage)
                params.append("sort", sortVal)
                districtFilter.forEach((district) =>
                    params.append("dist", district)
                )
                countiesFilter.forEach((county) =>
                    params.append("counties", county)
                )
                officeFilter.forEach((office) => params.append("office", office))
                electionTypeFilter.forEach((electionType) =>
                    params.append("type", electionType)
                )
                const { page, count } = await getAPI({
                    model: "election",
                    params: params,
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
                setLoading(false)
            } catch (err) {
				history.push("/error")
            }
		}
		fetchData()
	}, [
		currPage,
		countiesFilter,
		electionTypeFilter,
		officeFilter,
		districtFilter,
		sortVal,
	])

	const handleTableChange = ({ current, total }) => {
		console.log(current)
		setCurrPage(current)
		setTotal(total)
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
				<CountiesFilter onChange={changeFilter(setCountiesFilter)} />
				<OfficeFilter onChange={changeFilter(setOfficeFilter)} />
				<DistrictNumberFilter
					onChange={changeFilter(setDistrictFilter)}
				/>
				<ElectionTypeFilter
					onChange={changeFilter(setElectionTypeFilter)}
				/>
				<Title level={3}>Sort</Title>
				<div style={{ marginBottom: 20, textAlign: "center" }}>
					<Title level={5}>Order</Title>
					<Select
						size="large"
						defaultValue="-electionDate"
						style={{ width: 150 }}
						onChange={setSortVal}
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
