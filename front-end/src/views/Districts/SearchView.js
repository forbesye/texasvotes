import React, { Fragment, useState, useEffect } from "react"
import { Typography, Input, Divider, Pagination } from "antd"
import { Link, useHistory } from "react-router-dom"
import {
	StringParam,
	NumberParam,
	useQueryParams,
	ArrayParam,
	withDefault
} from "use-query-params"
import { Filter, Sort } from "components/filters/Filters"
import Highlighter from "react-highlight-words"
import styles from "./Districts.module.css"
import { getAPI } from "library/APIClient"
import Spinner from "components/ui/Spinner"
import { districtName } from "./Lib"

const { Search } = Input
const { Title, Text, Paragraph } = Typography

export default function SearchView() {
	const [total, setTotal] = useState(0)
	const [params, setParams] = useQueryParams({
		page: withDefault(NumberParam, 1),
		q: withDefault(StringParam, ""),
		perPage: withDefault(NumberParam, 20),
		sort: StringParam,
		popRange: StringParam,
		counties: ArrayParam,
		party: ArrayParam,
		number: ArrayParam,
		office: ArrayParam,
	})
	const [tempSearch, setTempSearch] = useState("")
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
			perPage
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

		const fetchData = async () => {
			try {
				setLoading(true)
				const { page, count } = await getAPI({
					model: "district",
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
					<Typography.Title level={2}>Search</Typography.Title>
					<Typography.Paragraph style={{ fontSize: 18 }}>
						Search our database for a Texas district.{" "}
					</Typography.Paragraph>
					{/* Filter and sort*/}
					<section className={styles.filterSection}>
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
					<Search
						size="large"
						enterButton="Search"
						loading={loading}
						onSearch={(val) => setParams((params) => ({...params, q: val}))}
						value={tempSearch}
						onChange={handleTextChange}
					/>
				</section>
				<Divider />
				{loading ? (
					<Spinner />
				) : (
					<section className={styles.searchResults}>
						{results.map((result) => (
							<DistrictResult
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
					showTotal= {total => `Total ${total} items`}
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

/**
 * Card of district data in search view
 * @param {District} props
 */
function DistrictResult(props) {
	let { counties, elected_officials, searchQuery } = props

	let officials = []
	// That ONE district in Texas that doesn't have an elected official...
	if (elected_officials) {
		elected_officials.forEach((official) => {
			officials.push(official.name)
		})
	}

	// If more than 10, need to paginate results
	let displayedCounties =
		counties.length >= 10 ? counties.slice(0, 10) : counties
	displayedCounties = displayedCounties.reduce(
		(prev, next) => `${prev}, ${next}`
	)
	displayedCounties += counties.length >= 10 ? "..." : ""

	let officialNames = ""
	// That ONE district in Texas that doesn't have an elected official...
	if (officials.length > 0) {
		officialNames = officials.reduce((prev, next) => `${prev}, ${next}`)
	}

	return (
		<Link to={`/districts/view/${props.id}`}>
			<div className={styles.districtSearchCard}>
				<div className={styles.districtSearchDesc}>
					<Title level={4}>
						{
							<Highlighter
								highlightClassName={styles.searchHighlight}
								searchWords={searchQuery.split(" ")}
								textToHighlight={districtName(props)}
							/>
						}
					</Title>
					<Paragraph>
						<Text strong>Elected Officials: </Text>
						<Highlighter
							highlightClassName={styles.searchHighlight}
							searchWords={searchQuery.split(" ")}
							textToHighlight={officialNames}
						/>
					</Paragraph>
					<Paragraph>
						<Text strong>Counties: </Text>
						<Highlighter
							highlightClassName={styles.searchHighlight}
							searchWords={searchQuery.split(" ")}
							textToHighlight={displayedCounties}
						/>
					</Paragraph>
				</div>
			</div>
		</Link>
	)
}
