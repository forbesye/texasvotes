import React, { Fragment, useState, useEffect } from "react"
import { Typography } from "antd"
import { useLocation, useHistory } from "react-router-dom"
import { getAPI } from "../../library/APIClient"
import Spinner from "../../components/ui/Spinner"
import styles from "./Search.module.css"
import {
	StringParam,
	useQueryParams,
	ArrayParam,
	withDefault
} from "use-query-params"
import {
	PoliticianCard,
	DistrictCard,
	ElectionCard,
	MoreResultsCard,
} from "./SearchCards"
import { Filter, Sort } from "components/filters/Filters"
import GeneralSearchBar from "./GeneralSearchBar"

const { Title, Paragraph } = Typography

const SEARCH_PATHS = ["politician", "district", "election"]
const SEARCH_LIMIT = 10

// General search page
export default function GeneralSearch() {
	const location = useLocation()
	const history = useHistory()
	// State variables
	const [loaded, setLoaded] = useState(false)
	const [tempSearch, setTempSearch] = useState("")
	const [params, setParams] = useQueryParams({
		q: withDefault(StringParam, ""),
		counties: ArrayParam,
		office: ArrayParam,
		party: ArrayParam,
	})
	const [results, setResults] = useState({
		politician: [],
		district: [],
		election: [],
	})

	// Get url params into a map-like object
	// const queries = new URLSearchParams(location.search)

	// Handler for textChange on GeneralSearchBar
	const handleSearchChange = (event) => {
		setTempSearch(event.target.value)
	}

	// Handler for search on GeneralSearchBar
	// const handleSearch = (value) => {
	// 	// history.push(`/search?q=${value}`)
	// 	setSearchQ(value)
	// 	search(value)
	// }

	// Asynchronous function that searches all three models
	
	// Called on componentMount
	useEffect(() => {
		/**
		 * Creates proper URLSearchParams given current param
		 * state
		 * @param {Params} params
		 */
		const constructURLParams = (params) => {
			let URLParams = new URLSearchParams()
			if(params.q) {
				URLParams.append("q", params.q)
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
			return URLParams
		}

		const fetchData = async () => {
			try {
				setLoaded(false)
				// creates an array of promises that will return the results for each model search
				const promises = SEARCH_PATHS.map((model) => {
					return getAPI({ model: model, params: constructURLParams(params)})
				})
				// resolves the promises
				const resolved = await Promise.all(promises)
				const all = {}
				// add the results to our state
				resolved.forEach((data, i) => {
					const { page, count } = data
					// limit to SEARCH_LIMIT
					all[SEARCH_PATHS[i]] = page.slice(0, SEARCH_LIMIT)
					if (count > SEARCH_LIMIT) {
						// add an eor object that will map to a link for more results
						all[SEARCH_PATHS[i]].push({
							eor: true,
							model: SEARCH_PATHS[i],
							amount: count - SEARCH_LIMIT,
						})
					}
				})
				setResults(all)
				setLoaded(true)
			} catch (err) {
				console.error(err)
				history.push("/error")
			}
		}
		fetchData()	
	}, [params, history])

	return (
		<section className={styles.content}>
			<div className={styles.contentHeader}>
				<Title level={1}>{params.q ? `Results for "${params.q}"`: "Search"}</Title>
				<GeneralSearchBar
					showTitle={false}
					onChange={handleSearchChange}
					onSearch={(val) => setParams((params) => ({...params, q: val}))}
					value={tempSearch}
				/>
				<section className={styles.filterSection} style={{ margin: 20 }}>
					{["counties", "party", "office"].map(
						(name) => (
							<Filter
								name={name}
								value={params[name]}
								hook={[params, setParams]}
							/>
						)
					)}
				</section>
			</div>
			{loaded ? (
				<Fragment>
					<div className={styles.searchResults}>
						<Title level={3}>Politicians</Title>
						<div className={styles.searchItemsPolitician}>
							{results.politician.map((p) => {
								if (p.eor === true)
									return (
										<MoreResultsCard
											{...p}
											searchQuery={params.q}
										/>
									)
								return (
									<PoliticianCard
										{...p}
										searchQuery={params.q}
									/>
								)
							})}
						</div>
						{results.politician.length === 0 ? (
							<Paragraph>No results found.</Paragraph>
						) : null}
					</div>
					<div className={styles.searchResults}>
						<Title level={3}>Districts</Title>
						<div className={styles.searchItemsDistrict}>
							{results.district.map((d) => {
								if (d.eor === true)
									return (
										<MoreResultsCard
											{...d}
											searchQuery={params.q}
										/>
									)
								return (
									<DistrictCard
										{...d}
										searchQuery={params.q}
									/>
								)
							})}
						</div>
						{results.district.length === 0 ? (
							<Paragraph>No results found.</Paragraph>
						) : null}
					</div>
					<div className={styles.searchResults}>
						<Title level={3}>Elections</Title>
						<div className={styles.searchItemsElection}>
							{results.election.map((e) => {
								if (e.eor === true)
									return (
										<MoreResultsCard
											{...e}
											searchQuery={params.q}
										/>
									)
								return (
									<ElectionCard
										{...e}
										searchQuery={params.q}
									/>
								)
							})}
						</div>
						{results.election.length === 0 ? (
							<Paragraph>No results found.</Paragraph>
						) : null}
					</div>
				</Fragment>
			) : (
				<Spinner />
			)}
		</section>
	)
}
