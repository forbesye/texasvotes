import React, { useState, useEffect, Fragment } from "react"
import { Typography, Input, Divider, Pagination } from "antd"
import { Link, useHistory } from "react-router-dom"
import Highlighter from "react-highlight-words"
import styles from "./Politicians.module.css"
import {
	StringParam,
	NumberParam,
	useQueryParams,
	ArrayParam,
	withDefault
} from "use-query-params"
import { Filter, Sort } from "components/filters/Filters"
import { getAPI } from "../../library/APIClient"
import Spinner from "../../components/ui/Spinner"
import { description } from "./Lib"
import { mostAlike } from "../../library/searchFunctions"

const { Search } = Input
const { Title, Text, Paragraph } = Typography

/**
 * Functional component for politician search view
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
		office: ArrayParam,
		party: ArrayParam,
		district_num: ArrayParam,
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
			if(params.q) {
				URLParams.append("q", params.q)
			}
			if(params.sort) {
				URLParams.append("sort", params.sort)
			}
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
				const userquery = params.q.toLowerCase()
				page.sort((a, b) => {
					// Sort by best match
					const aname = a.name.toLowerCase()
					const bname = b.name.toLowerCase()
					return mostAlike(bname, userquery) - mostAlike(aname, userquery)
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
						Search our database for a Texas elected official or
						political challenger.{" "}
					</Typography.Paragraph>
					{/* Fitlers and sort */}
					<section className={styles.filterSection}>
						{["counties", "party", "office", "district_num"].map((name) => (
							<Filter
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
					<div style={{marginLeft: "10%", marginRight: "10%"}}>
						<Search
							size="large"
							enterButton="Search"
							loading={loading}
							onSearch={(val) => setParams((params) => ({...params, q: val}))}
							value={tempSearch}
							onChange={handleTextChange}
						/>
					</div>
				</section>
				<Divider />
				{loading ? (
					<Spinner />
				) : (
					<section className={styles.searchResults}>
						{results.map((result) => (
							<PoliticianResult {...result} searchQuery={params.q} key={result.id}/>
						))}
					</section>
				)}
				<Pagination
					current={params.page}
					pageSize={params.perPage}
					onChange={handlePageChange}
					pageSizeOptions={[10, 20, 40]}
					total={total}
					style={{
						margin: "16px 0",
						display: "flex",
						justifyContent: "flex-end",
					}}
				/>
			</section>
		</Fragment>
		
	)
}

/**
 * Politician search result card component
 * @param {Politician} props
 */
export function PoliticianResult(props) {
	const {
		district: { counties, number },
		searchQuery,
		id,
		name,
		image,
		party,
		current,
		incumbent,
		running_for,
	} = props

	let displayedCounties =
		counties.length >= 10 ? counties.slice(0, 10) : counties
	displayedCounties = displayedCounties.reduce(
		(prev, next) => `${prev}, ${next}`
	)
	displayedCounties += counties.length >= 10 ? "..." : ""

	return (
		<Link to={`/politicians/view/${id}`}>
			<div className={styles.politicianSearchCard}>
				<img
					className={styles.politicianSearchImage}
					src={image}
					alt={name}
				/>
				<div className={styles.politicianSearchDesc}>
					{/* Name and party */}
					<Title level={3}>
						{
							<Highlighter
								highlightClassName={styles.searchHighlight}
								searchWords={searchQuery.split(" ")}
								textToHighlight={name}
							/>
						}{" "}
						({party})
					</Title>
					{/* Description */}
					<Paragraph>
						<Highlighter
							highlightClassName={styles.searchHighlight}
							searchWords={searchQuery.split(" ")}
							textToHighlight={description(
								number,
								current,
								running_for,
								incumbent
							)}
						/>
					</Paragraph>
					<Paragraph>
						{/* Counties, with bias towards matched */}
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
