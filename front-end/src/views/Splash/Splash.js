import React, { useState, useEffect } from "react"
import { Card, Typography } from "antd"
import { Link, useHistory } from "react-router-dom"

// Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
import texas from "views/Splash/images/texas.svg"

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
import politician from "views/Splash/images/politician.svg"
import politicians from "views/Splash/images/politicians.svg"
import vote from "views/Splash/images/vote.svg"

import styles from "./Splash.module.css"
import GeneralSearchBar from "../Search/GeneralSearchBar"
import News from "./News"
import { getAPI } from "library/APIClient"

const { Title, Paragraph } = Typography

const Splash = () => {
	const history = useHistory()
	const [searchVal, setSearchVal] = useState("")
	const [ news, setNews ] = useState({
		articles: [],
		loading: false,
		lastUpdated: null
	})

	useEffect(() => {
		const getNews = async () => {
			setNews(news => ({ ...news, loading: true }))
			const { articles, last_updated } = await getAPI({ model: "news" })
			setNews({
				articles: articles,
				loading: false,
				lastUpdated: new Date(last_updated)
			})
		}
		getNews()
	}, [])

	return (
		<div>
			<div className={styles.splash}>
				<div className={styles.splashContent}>
					<div className={styles.headerText}>
						<Title level={1} className={styles.title}>
							Texas Votes
						</Title>
						<Paragraph className={styles.about}>
							Search for your representatives, your district, and
							your state and federal elections within the state of
							Texas! If you need help voting, we've made an FAQ
							for you <Link to="/voting">here</Link>.
						</Paragraph>
					</div>
					<img
						className={styles.headerImage}
						alt={"Politicians"}
						src={politicians}
					></img>
				</div>
			</div>
			<div className={styles.searchBarContainer}>
				<GeneralSearchBar
					onSearch={(value) => history.push(`/search?q=${value}`)}
					onChange={(event) => setSearchVal(event.target.value)}
					value={searchVal}
				/>
			</div>
			<div className={styles.cardFlexContainer}>
				<Link
					id="politicianCard"
					to="/politicians/view"
					className={styles.card}
				>
					<Card
						bordered={true}
						className={styles.card}
						cover={
							<img
								className={styles.cardImage}
								alt={"Politician"}
								src={politician}
							></img>
						}
						hoverable={true}
					>
						<Title style={{ textAlign: "center" }}>
							Politicians
						</Title>
						<Paragraph>
							Want to learn more about your politicians?
						</Paragraph>
					</Card>
				</Link>
				<Link
					id="districtCard"
					to="/districts/view"
					className={styles.card}
				>
					<Card
						bordered={true}
						className={styles.card}
						cover={
							<img
								className={styles.cardImage}
								alt={"Texas"}
								src={texas}
							></img>
						}
						hoverable={true}
					>
						<Title style={{ textAlign: "center" }}>Districts</Title>
						<Paragraph>
							Which district are you in? Learn about the different
							districts across Texas!
						</Paragraph>
					</Card>
				</Link>
				<Link
					id="electionCard"
					to="/elections/view"
					className={styles.card}
				>
					<Card
						bordered={true}
						className={styles.card}
						cover={
							<img
								className={styles.cardImage}
								alt={"Vote"}
								src={vote}
							></img>
						}
						hoverable={true}
					>
						<Title style={{ textAlign: "center" }}>Elections</Title>
						<Paragraph>
							What are some of the upcoming elections? Keep track
							of the elections and mark your calendars to vote!
						</Paragraph>
					</Card>
				</Link>
			</div>
			<div className={styles.newsContainer}>
				<Title level={1}>Texas News Articles</Title>
				<Paragraph style={{
					textAlign: "center"
				}}>Last Updated: { news.lastUpdated ? news.lastUpdated.toLocaleString("en-US") : "Never" }</Paragraph>
				<News {...news} />
			</div>
		</div>
	)
}

export default Splash
