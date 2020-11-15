import React, { Fragment, useState, useEffect } from "react"
import { Typography, Input, Divider, Pagination } from "antd"
import { useLocation, useHistory } from "react-router-dom"
import styles from "./Elections.module.css"
import ElectionResult from "views/Elections/ElectionResult"
import { getAPI, checkCache } from "../../library/APIClient"
import Spinner from "../../components/ui/Spinner"

const { Search } = Input

/**
 * Functional component for election search
 */
export default function SearchView() {
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
	 * Modifies URL and calls API based on query
	 * @param {String} query
	 * @param {Number} page
	 */
	const handleSearch = async (value, p = 1) => {
		history.push(
			`/elections/search?q=${encodeURIComponent(value)}&page=${p}`
		)
		setLoading(true)
		const request = {
			model: "election",
			params: {
				q: value,
				page: p,
			},
		}
		let data = checkCache(request)
		if(!data) {
			data = await getAPI(request)
		}
		const { page, count } = data
		setResults(page)
		setTotal(count)
		setLoading(false)
	}

	const handlePageChange = (p) => {
		setPage(p)
		handleSearch(searchVal, p)
	}

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
						Search our database for elections.{" "}
					</Typography.Paragraph>
					<Search
						size="large"
						loading={loading}
						onSearch={(val) => handleSearch(val)}
						value={searchVal}
						onChange={handleTextChange}
					/>
				</section>
				{/* Election cards for search */}
				<Divider />
				{loading ? (
					<Spinner />
				) : (
					<section className={styles.searchResults}>
						{results.map((result) => (
							<ElectionResult
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
