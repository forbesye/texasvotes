import React, { useState, useEffect, Fragment, useRef } from "react"
import {
	ArrayParam,
	NumberParam,
	StringParam,
	useQueryParams,
	withDefault,
} from "use-query-params"
import { Typography, Divider, Pagination } from "antd"
import { useHistory } from "react-router-dom"
import styles from "./Politicians.module.css"
import { getAPI } from "library/APIClient"
import { Filter, Sort } from "components/filters/Filters"
import PoliticianCard from "components/cards/PoliticianCard"
import Spinner from "components/ui/Spinner"

const { Title, Paragraph } = Typography

/**
 * Functional component for politician grid view
 */
export default function GridView() {
	const [loading, setLoading] = useState(true)
	const [gridData, setGridData] = useState([])
	const [total, setTotal] = useState(20)
	// Pull params from URL and set state
	const [params, setParams] = useQueryParams({
		sort: withDefault(StringParam, "name"),
		page: withDefault(NumberParam, 1),
		perPage: withDefault(NumberParam, 20),
		counties: ArrayParam,
		office: ArrayParam,
		party: ArrayParam,
		district_num: ArrayParam,
	})
	const gridRef = useRef(null)
	const history = useHistory()

	// Adjust page
	const handlePaginationChange = (page, perPage) => {
		setParams({
			...params,
			page,
			perPage,
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
			URLParams.append("perPage", params.perPage)
			if (params.counties) {
				params.counties.forEach((county) =>
					URLParams.append("counties", county)
				)
			}
			if (params.party) {
				params.party.forEach((county) =>
					URLParams.append("party", county)
				)
			}
			if (params.office) {
				params.office.forEach((office) =>
					URLParams.append("office", office)
				)
			}
			if (params.district_num) {
				params.district_num.forEach((district_num) =>
					URLParams.append("district_num", district_num)
				)
			}
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
		fetchData()
	}, [params, history])

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
				{["counties", "party", "office", "district_num"].map((name) => (
					<Filter
						key={name}
						name={name}
						value={params[name]}
						hook={[params, setParams]}
					/>
				))}
				<Sort
					model="Politician"
					value={params.sort}
					hook={[params, setParams]}
				/>
			</section>
			<section className={styles.sortSection}></section>
			{!loading ? (
				<section className={styles.grid} ref={gridRef}>
					{/* Render all cards pulled from API */}
					{gridData?.map((data) => (
						<PoliticianCard data={data} key={data.id} />
					))}
				</section>
			) : (
				<Spinner style={{ margin: "auto" }} />
			)}
			<Pagination
				total={total}
				pageSize={params.perPage}
				onChange={handlePaginationChange}
				current={params.page}
				pageSizeOptions={[10, 20, 40]}
				style={{
					margin: "16px 0",
					display: "flex",
					justifyContent: "flex-end",
				}}
				showTotal={(total) => `Total ${total} items`}
			/>
		</Fragment>
	)
}
