import React, { Fragment, useState, useEffect } from "react"
import { Typography, Input, Divider, Pagination } from "antd"
import { useHistory } from "react-router-dom"
import {
	StringParam,
	NumberParam,
	useQueryParams,
	ArrayParam,
	withDefault,
} from "use-query-params"
import { Filter, Sort } from "components/filters/Filters"
import styles from "./Elections.module.css"
import ElectionResult from "views/Elections/ElectionResult"
import { getAPI } from "../../library/APIClient"
import Spinner from "../../components/ui/Spinner"
const { Title, Paragraph } = Typography
const { Search } = Input

/**
 * Functional component for election search
 */
export default function SearchView() {
	const [tempSearch, setTempSearch] = useState("")
	const [total, setTotal] = useState(0)
	const [params, setParams] = useQueryParams({
		page: withDefault(NumberParam, 1),
		q: withDefault(StringParam, ""),
		perPage: withDefault(NumberParam, 20),
		sort: StringParam,
		counties: ArrayParam,
		type: ArrayParam,
		office: ArrayParam,
		dist: ArrayParam,
	})
	const [results, setResults] = useState([])
	const [loading, setLoading] = useState(false)
	const history = useHistory()

	const handleTextChange = (event) => {
		setTempSearch(event.target.value)
	}

	const handlePageChange = (page, perPage) => {
		setParams({
			...params,
			page,
			perPage,
		})
	}

	/**
	 * Calls search logic
	 */
	useEffect(() => {
		/**
		 * Creates proper URLSearchParams given current param
		 * state
		 * @param {Params} params
		 */
		const constructURLParams = (params) => {
			let URLParams = new URLSearchParams()
			URLParams.append("page", params.page)
			URLParams.append("perPage", params.perPage)
			URLParams.append("q", params.q)
			if (params.sort) {
				URLParams.append("sort", params.sort)
			}
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

		const fetchData = async () => {
			try {
				setLoading(true)
				const { page, count } = await getAPI({
					model: "election",
					params: constructURLParams(params),
				})
				setResults(page)
				setLoading(false)
				setTotal(count)
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
				<section className={styles.description}>
					<Title level={2}>Search</Title>
					<Paragraph style={{ fontSize: 18 }}>
						Search our database for elections.{" "}
					</Paragraph>
					<Divider />
					{/* Filter and sort */}
					<section className={styles.filterSection}>
						{["counties", "office", "dist", "type"].map((name) => (
							<Filter
								key={name}
								name={name}
								value={params[name]}
								hook={[params, setParams]}
							/>
						))}
						<Sort
							model="Election"
							value={params.sort}
							hook={[params, setParams]}
						/>
					</section>
					<div style={{ marginLeft: "10%", marginRight: "10%" }}>
						<Search
							size="large"
							loading={loading}
							enterButton="Search"
							onSearch={(val) =>
								setParams((params) => ({ ...params, q: val }))
							}
							value={tempSearch}
							onChange={handleTextChange}
						/>
					</div>
				</section>
				{/* Election cards for search */}
				{loading ? (
					<Spinner />
				) : (
					<section className={styles.searchResults}>
						{results.map((result) => (
							<ElectionResult
								{...result}
								searchQuery={params.q}
								key={result.id}
							/>
						))}
					</section>
				)}
				<Pagination
					current={params.page}
					pageSize={params.perPage}
					pageSizeOptions={[10, 20, 40]}
					onChange={handlePageChange}
					total={total}
					showTotal={(total) => `Total ${total} items`}
					style={{
						margin: "16px 0",
						display: "flex",
						justifyContent: "flex-end",
					}}
				/>
			</section>
			<Divider />
		</Fragment>
	)
}
