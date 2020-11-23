import React, { useState, useEffect, useRef } from "react"
import { Card, Typography, Button } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { Link, useHistory } from "react-router-dom"

// Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
import texas from "views/Splash/images/texas.svg"

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
import politician from "views/Splash/images/politician.svg"
import vote from "views/Splash/images/vote.svg"

import styles from "./Splash.module.css"
import GeneralSearchBar, { AddressSearchBar } from "../Search/GeneralSearchBar"
import News from "./News"
import { getAPI } from "library/APIClient"

const { Title, Paragraph } = Typography

const Splash = () => {
	const history = useHistory()
	const ref = useRef(null)
	const [ generalSearch, setGeneralSearch ] = useState(true)
	const [ searchVal, setSearchVal ] = useState("")
	const [ address, setAddress ] = useState("")
	const [ news, setNews ] = useState({
		articles: [],
		loading: false,
		lastUpdated: null,
	})

	useEffect(() => {
		const getNews = async () => {
			setNews((news) => ({ ...news, loading: true }))
			const { articles, last_updated } = await getAPI({ model: "news" })
			setNews({
				articles: articles,
				loading: false,
				lastUpdated: new Date(last_updated),
			})
		}
		getNews()
	}, [])

	return (
		<div className={styles.splashPage}>
			<div className={styles.splash}>
				<div className={styles.splashContent}>
					<div className={styles.headerText}>
						<Title level={1} className={styles.title}>
							Texas Votes
						</Title>
						<Paragraph className={styles.about}>
							Become informed about Texas politics today. Search
							for information about a politician, a district, or
							an election below.
						</Paragraph>
					</div>
					<div className={styles.searchSelectButtons}>
						<Button 
							ghost
							className={styles.searchSelectButton}
							onClick={() => setGeneralSearch(true)}
						>Search By Query</Button>
						<Button 
							ghost
							className={styles.searchSelectButton}
							onClick={() => setGeneralSearch(false)}
						>Search By Address</Button>
					</div>
					{ generalSearch ?
						<GeneralSearchBar
							clear
							onSearch={(value) => history.push(`/search?q=${value}`)}
							onChange={(text) => setSearchVal(text)}
							value={searchVal}
						/> :
						<AddressSearchBar 
							clear
							placeholder="Enter address here."
							onSearch={(value) => history.push(`/search/address?q=${value}`)}
							onChange={(text) => setAddress(text)}
							onOptionSelect={(val) => setAddress(val)}
							value={address}
						/>
					}
				</div>
				<div className={styles.downButton}>
					<DownOutlined
						className={styles.downButtonIcon}
						onClick={() => {
							window.scrollTo({
								top: ref.current.offsetTop,
								behavior: "smooth",
							})
						}}
					/>
				</div>
			</div>
			<div className={styles.modelCards} ref={ref}>
				<Title level={1} style={{ textAlign: "center" }}>
					Model Pages
				</Title>
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
							<Title level={2} style={{ textAlign: "center" }}>
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
							<Title level={2} style={{ textAlign: "center" }}>
								Districts
							</Title>
							<Paragraph>
								Which district are you in? Learn about the
								different districts across Texas!
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
							<Title level={2} style={{ textAlign: "center" }}>
								Elections
							</Title>
							<Paragraph>
								What are some of the upcoming elections? Keep
								track of the elections and mark your calendars
								to vote!
							</Paragraph>
						</Card>
					</Link>
				</div>
			</div>
			<div className={styles.newsContainer}>
				<Title level={1}>Texas News Articles</Title>
				<Paragraph
					style={{
						textAlign: "center",
					}}
				>
					Last Updated:{" "}
					{news.lastUpdated
						? news.lastUpdated.toLocaleString("en-US")
						: "Never"}
				</Paragraph>
				<News {...news} />
			</div>
		</div>
	)
}

export default Splash
