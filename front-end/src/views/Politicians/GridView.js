import React, { useState, useEffect, Fragment, useRef } from "react"
import { Typography, Divider, Pagination, Select } from "antd"
import { useHistory } from "react-router-dom"
import styles from "./Politicians.module.css"
import { getAPI } from "library/APIClient"
import {
	CountiesFilter,
	PartiesFilter,
	OfficeFilter,
	DistrictNumberFilter,
} from "library/FilterValues"
import PoliticianCard from "components/cards/PoliticianCard"
import { updateFilter } from "library/Functions"
import Spinner from "components/ui/Spinner"

const { Title, Paragraph } = Typography
const { Option } = Select

/**
 * Functional component for politician grid view
 */
export default function GridView() {
	const URLParams = new URLSearchParams(window.location.search)
	const [loading, setLoading] = useState(true)
	const [gridData, setGridData] = useState([])
	const [total, setTotal] = useState(20)
	// Pull params from URL and set state
	const [params, setParams] = useState({
		page: URLParams.get("page") ? URLParams.get("page") : 1,
		sort: URLParams.get("sort") ? URLParams.get("sort") : "name",
		counties: URLParams.getAll("counties"),
		office: URLParams.getAll("office"),
		party: URLParams.getAll("party"),
		district_num: URLParams.getAll("district_num"),
	})
	const gridRef = useRef(null)
	const history = useHistory()

	// Adjust page
	const handlePaginationChange = (page) => {
		setParams({
			...params,
			page: page,
		})
		window.scrollTo({
			top: gridRef.current.offsetTop - 30,
			behavior: "smooth",
		})
	}

	/**
	 * Gets API with filters and sort params, and modifies URL
	 */
	useEffect(() => {
		const constructURLParams = (params) => {
			let URLParams = new URLSearchParams()
			URLParams.append("page", params.page)
			URLParams.append("sort", params.sort)
			params.counties.forEach((county) =>
				URLParams.append("counties", county)
			)
			params.party.forEach((county) => URLParams.append("party", county))
			params.office.forEach((office) =>
				URLParams.append("office", office)
			)
			params.district_num.forEach((district_num) =>
				URLParams.append("district_num", district_num)
			)
			history.push({
				pathname: "/politicians/view",
				search: "?" + URLParams.toString(),
			})
			return URLParams
		}

		const fetchData = async () => {
			try {
				setLoading(true)
				const { page, count } = await getAPI({
					model: "politician",
					params: constructURLParams(params),
				})
				setTotal(count)
				setGridData(page)
				setLoading(false)
			} catch (err) {
				console.error(err)
				history.push("/error")
			}
		}
		console.log(location.search)
		fetchData()
	}, [params, history, location])

	return (
		<Fragment>
			<section className={styles.content}>
				<Title level={2}>View All</Title>
				<Paragraph style={{ fontSize: 18 }}>
					Have you ever wondered what all Texas officials and
					candidates look like in a grid view? Probably not, but we've
					got you covered here. The grid can also be filtered and
					sorted by different properties to make your viewing
					experience more customizable.
				</Paragraph>
			</section>
			<Divider />
			{/* Fitlers and sort */}
			<section className={styles.filterSection}>
				<Title level={3}>Filter</Title>
				<CountiesFilter
					onChange={updateFilter("counties", setParams, params)}
				/>
				<PartiesFilter
					onChange={updateFilter("party", setParams, params)}
				/>
				<OfficeFilter
					onChange={updateFilter("office", setParams, params)}
				/>
				<DistrictNumberFilter
					onChange={updateFilter("district_num", setParams, params)}
				/>
				<Title level={3}>Sort</Title>
				<div style={{ marginBottom: 20, textAlign: "center" }}>
					<Title level={5}>Order</Title>
					<Select
						size="large"
						defaultValue="name"
						style={{ width: 150 }}
						onChange={updateFilter("sort", setParams, params)}
					>
						<Option key={"name"} value="name">
							Name: A - Z
						</Option>
						<Option key={"-name"}>Name: Z - A</Option>
						<Option key={"number"}>District (Asc.)</Option>
						<Option key={"-number"}>District (Desc.)</Option>
					</Select>
				</div>
			</section>
			<section className={styles.sortSection}></section>
			{!loading ? (
				<section className={styles.grid} ref={gridRef}>
					{/* Render all cards pulled from API */}
					{gridData.map((data) => (
						<PoliticianCard data={data} />
					))}
				</section>
			) : (
				<Spinner style={{ margin: "auto" }} />
			)}
			<Pagination
				total={total}
				defaultCurrent={1}
				defaultPageSize={20}
				onChange={handlePaginationChange}
				current={params.page}
				pageSizeOptions={[]}
				style={{
					margin: "16px 0",
					display: "flex",
					justifyContent: "flex-end",
				}}
			/>
		</Fragment>
	)
}
