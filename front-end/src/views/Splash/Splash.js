import React from "react"
import { Card, Typography, Input } from "antd"
import { Link, useHistory } from "react-router-dom"

// Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
import texas from "views/Splash/images/texas.svg"

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
import politician from "views/Splash/images/politician.svg"
import politicians from "views/Splash/images/politicians.svg"
import vote from "views/Splash/images/vote.svg"

import styles from "./Splash.module.css"

const { Title, Paragraph } = Typography
const { Search } = Input

const Splash = () => {
	const history = useHistory()
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
				<Title level={1}>Sitewide Search</Title>
				<Paragraph>Search for a politician, an district, or an election here.</Paragraph>
				<Search 
					size="large" 
					enterButton="Search" 
					placeholder="Enter sitewide search here."
					onSearch={(value) => {
						console.log(value)
						history.push(`/search?q=${value}`)
					}}
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
						<Paragraph>Want to learn more about your politicians?</Paragraph>
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
						<Title style={{ textAlign: "center" }}>
							Districts
						</Title>
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
						<Title style={{ textAlign: "center" }}>
							Elections
						</Title>
						<Paragraph>
							What are some of the upcoming elections? Keep track
							of the elections and mark your calendars to vote!
						</Paragraph>
					</Card>
				</Link>
			</div>
		</div>
	)
}

export default Splash
