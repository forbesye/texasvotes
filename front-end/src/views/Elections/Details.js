import React, { useState, useEffect, Fragment } from "react"
import { PageHeader, Typography, Divider, Table, Timeline } from "antd"
import { ClockCircleOutlined } from "@ant-design/icons"
import { useParams, useHistory, Link } from "react-router-dom"
import Spinner from "components/ui/Spinner"
import styles from "./Elections.module.css"
import {
	monthDayYearParse,
    numberStringWithCommas,
    districtName
} from "library/Functions"
import { election_date_mappings, party_mappings } from "library/Mappings"
import { getAPI } from "library/APIClient"
import ReactPlayer from "react-player"

const { Title, Text } = Typography

const candidateColumns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		render: (text, record) => {
			return <Link to={`/politicians/view/${record.id}`}>{text}</Link>
		},
	},
	{
		title: "Party",
		dataIndex: "party",
		key: "party",
	},
]

const resultColumns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Party",
		dataIndex: "party",
		key: "party",
	},
	{
		title: "Vote Total",
		dataIndex: "vote_total",
		key: "vote_total",
		render: (text) => numberStringWithCommas(text),
	},
	{
		title: "Vote Percentage",
		dataIndex: "vote_percentage",
		key: "vote_percentage",
		render: (text) => text + "%",
	},
]

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

const Details = () => {
	const { id } = useParams()
	const [election, setElection] = useState({})
	const [loaded, setLoaded] = useState(false)
	const history = useHistory()

	const electionDate = ["early_start", "early_end", "election_day"]
	const todayDate = new Date()
	var beforeToday = true

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoaded(false)
				const data = await getAPI({
					model: "election",
					path: id,
					params: {},
				})
				data.candidates = data.candidates.map((c) => {
					return {
						...c,
						key: c.id,
					}
				})
				setElection(data)
				setLoaded(true)
			} catch (err) {
				history.push("/error")
			}
		}
		fetchData()
	}, [id, history])

	const handleBack = () => {
		history.push("/elections/view")
	}

	const { candidates, results, dates, video_url } = election
	let content = null
	if (loaded) {
		content = (
			<Fragment>
				<PageHeader title={electionTitle(election)} onBack={handleBack} />
				<Divider />

				<div className={styles.electionDescription}>
					<ReactPlayer url={video_url} width="95%" height="500px" />
					<Divider />
				</div>

				<article className={styles.electionDetails}>
					<Title style={{ textAlign: "center" }} level={3}>
						Election Dates
					</Title>
					<Timeline
						mode={"left"}
						style={{
							paddingTop: "20px",
							width: "95%",
							margin: "auto",
							fontSize: 18,
						}}
					>
						{electionDate.map((key) => {
							var curDate = new Date(dates[key])
							if (!beforeToday) {
								return (
									<Timeline.Item
										key={key}
										label={
											<Text strong>
												{election_date_mappings[key]}
											</Text>
										}
										color="green"
									>
										{monthDayYearParse(dates[key])}
									</Timeline.Item>
								)
							} else if (curDate > todayDate) {
								beforeToday = false
								return (
									<div>
										<Timeline.Item
											key={todayDate}
											label={<Text strong>Today</Text>}
										>
											<Text>
												{monthDayYearParse(todayDate)}
											</Text>
										</Timeline.Item>

										<Timeline.Item
											key={key}
											dot={
												<ClockCircleOutlined
													style={{ fontSize: "16px" }}
												/>
											}
											label={
												<Text strong>
													{
														election_date_mappings[
															key
														]
													}
												</Text>
											}
											color="red"
										>
											<Text>
												{monthDayYearParse(dates[key])}
											</Text>
										</Timeline.Item>
									</div>
								)
							} else {
								return (
									<Timeline.Item
										key={key}
										label={
											<Text strong>
												{election_date_mappings[key]}
											</Text>
										}
										color="gray"
									>
										<Text>
											{monthDayYearParse(dates[key])}
										</Text>
									</Timeline.Item>
								)
							}
						})}
						{beforeToday ? (
							<Timeline.Item>
								<Text strong>Today </Text>
								<Text>{monthDayYearParse(todayDate)}</Text>
							</Timeline.Item>
						) : null}
					</Timeline>
				</article>

				<article className={styles.electionDetails}>
					<Title style={{ textAlign: "center" }} level={3}>
						Candidates
					</Title>
					<Table dataSource={candidates} columns={candidateColumns} />
				</article>

				{results ? (
					<article className={styles.electionDetails}>
						<Title style={{ textAlign: "center" }} level={3}>
							Results
						</Title>
						<Table
							dataSource={results.vote_counts}
							columns={resultColumns}
						/>
					</article>
				) : null}
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
