import React, { useState, useEffect, Fragment } from "react"
import { PageHeader, Typography, Divider, Table } from "antd"
import { useParams, useHistory, Link } from "react-router-dom"
import Spinner from "components/ui/Spinner"
import styles from "./Elections.module.css"
import { districtName } from "library/Functions"
import { resultColumns } from "./Lib"
import PoliticianCard from "components/cards/PoliticianCard"
import { party_mappings } from "library/Mappings"
import ElectionTimeline from "components/ui/Timeline"
import { getAPI } from "library/APIClient"
import ReactPlayer from "react-player"

const { Title } = Typography

/**
 * Returns relevant title with link to associated district
 * @param {Election} election
 */
const electionTitle = (election) => {
	const { dates, office, district, type, party } = election
	const { number, id } = district
	const { election_day } = dates
	const electionYear = new Date(election_day).getFullYear()
	if (type.class === "general") {
		return (
			<div>
				{`${electionYear} General Election for `}{" "}
				<Link to={`/districts/view/${id}`}>
					{districtName(office, number)}
				</Link>
			</div>
		)
	} else if (type.class === "runoff") {
		return (
			<div>
				{`${electionYear} ${party_mappings[party]} Runoff for `}
				<Link to={`/districts/view/${id}`}>
					{districtName(office, number)}
				</Link>
			</div>
		)
	} else {
		return (
			<div>
				{`${electionYear} ${party_mappings[party]} Primary for `}
				<Link to={`/districts/view/${id}`}>
					{districtName(office, number)}
				</Link>
			</div>
		)
	}
}

/**
 * Functional component for election details
 */
const Details = () => {
	const { id } = useParams()
	const [election, setElection] = useState({})
	const [loaded, setLoaded] = useState(false)
	const history = useHistory()

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoaded(false)
				const data = await getAPI({
					model: "election",
					path: id,
				})
				data.candidates = data.candidates.map((c) => ({
					...c,
					key: c.id,
				}))
				setElection(data)
				setLoaded(true)
			} catch (err) {
				history.push("/error")
			}
		}
		fetchData()
	}, [id, history])

	const { candidates, results, dates, video_url } = election
	let content = null
	if (loaded) {
		content = (
			<Fragment>
				<PageHeader
					title={electionTitle(election)}
					onBack={() => window.history.back()}
				/>
				<Divider />

				<div className={styles.electionDescription}>
					<ReactPlayer url={video_url} width="95%" height="500px" />
					<Divider />
				</div>

				<article className={styles.electionDetails}>
					<Title style={{ textAlign: "center" }} level={3}>
						Election Dates
					</Title>
					{/* Depending on current date, render different timeline */}
					<ElectionTimeline dates={dates} />
				</article>
				{/* Election candidates */}
				<article className={styles.electionDetails}>
					<Title style={{ textAlign: "center" }} level={3}>
						Candidates
					</Title>
					<div className={styles.grid}>
						{candidates.map((data) => (
							<PoliticianCard
								key={data.id}
								data={{
									...data,
									running_for: data.district.type,
									current: data.district.type,
								}}
							/>
						))}
					</div>
				</article>
				{/* Election results if past election */}
				{results && (
					<article className={styles.electionDetails}>
						<Title style={{ textAlign: "center" }} level={3}>
							Results
						</Title>
						<Table
							dataSource={results.vote_counts.map((r) => ({
								...r,
								key: r.id,
							}))}
							columns={resultColumns}
						/>
					</article>
				)}
			</Fragment>
		)
	}

	return (
		<div className={styles.electionPage}>
			{loaded ? content : <Spinner />}
		</div>
	)
}

export default Details
