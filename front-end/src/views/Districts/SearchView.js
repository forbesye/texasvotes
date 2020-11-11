import React, { Fragment, useState, useEffect } from "react"
import { Typography, Input, Divider, Pagination } from "antd"
import { Link, useLocation, useHistory } from "react-router-dom"
import Highlighter from "react-highlight-words"
import styles from "./Districts.module.css"
import { getAPI } from "library/APIClient"
import Spinner from "components/ui/Spinner"
import { districtName } from "./Lib"

const { Search } = Input
const { Title, Text, Paragraph } = Typography

export default function SearchView(props) {
	const [searchVal, setSearchVal] = useState("")
	const [total, setTotal] = useState(0)
	const [page, setPage] = useState(1)
	const [results, setResults] = useState([])
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const history = useHistory()

	const handleTextChange = (event) => {
		setSearchVal(event.target.value)
	}

	/**
	 * Data handling part of search
	 * @param {string} query
	 * @param {Number} page
	 */
	const handleSearch = async (value, p = 1) => {
		history.push(
			`/districts/search?q=${encodeURIComponent(value)}&page=${p}`
		)
		setLoading(true)
		const data = await getAPI({
			model: "district",
			params: {
				q: value,
				page: p,
			},
		})
		const results = data.page
		setResults(results)
		setLoading(false)
		setTotal(data.count)
	}

	const handlePageChange = (p) => {
		setPage(p)
		handleSearch(searchVal, p)
	}

	/**
	 * Calls search logic
	 */
	useEffect(() => {
		const q = new URLSearchParams(location.search).get("q")
		if (q) {
			const decoded = decodeURIComponent(q)
			setSearchVal(decoded)
			handleSearch(decoded)
		}
	}, [])

	return (
		<Fragment>
			<section className={styles.content}>
				<section className={styles.description}>
					<Typography.Title level={3}>Search</Typography.Title>
					<Typography.Paragraph>
						Search our database for a Texas district.{" "}
					</Typography.Paragraph>
					<Search
						size="large"
						loading={loading}
						onSearch={(val) => handleSearch(val)}
						value={searchVal}
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
								searchQuery={searchVal}
							/>
						))}
					</section>
				)}
				<Pagination
					current={page}
					onChange={handlePageChange}
					pageSize={20}
					showSizeChanger={false}
					total={total}
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
	let { 
		counties, 
		elected_officials, 
		searchQuery,
	} = props

	let officials = []
	// That ONE district in Texas that doesn't have an elected official...
	if(elected_officials) {
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
