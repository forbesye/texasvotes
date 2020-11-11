import React, { useEffect, useState } from "react"
import DevBio from "components/cards/DevBio"
import RepoCard from "components/cards/RepoCard"
import ToolCard from "components/cards/ToolCard"
import Spinner from "components/ui/Spinner"
import styles from "views/About/About.module.css"
import { toolsInfo, teamInfo, apiInfo, repoAndAPI } from "./AboutInfo"

/**
 * Grabs information from GitLab and returns data
 */
const getGitlabInfo = async () => {
	let totalCommitCount = 0,
		totalIssueCount = 0,
		totalTestCount = 0

	// Need to wipe member issues before calling again and calculate total tests
	teamInfo.forEach((member) => {
		totalTestCount += member.tests
		member.issues = 0
		member.commits = 0
	})

	// Can't use a map cause Gitlab's API returns are weird :/
	let commitList = await fetch(
		"https://gitlab.com/api/v4/projects/21177395/repository/contributors"
	)
	commitList = await commitList.json()
	commitList.forEach((element) => {
		const { name, email, commits } = element
		teamInfo.forEach((member) => {
			if (
				member.name === name ||
				member.username === name ||
				member.email === email
			) {
				member.commits += commits
			}
		})
		totalCommitCount += commits
	})

	// More than 100 issues, need to do pagination to get all
	const issuePaginationLength = 100
	let page = 1
	let issuePage = []
	let issueList = []
	do {
		issuePage = await fetch(
			`https://gitlab.com/api/v4/projects/21177395/issues?per_page=${issuePaginationLength}&page=${page++}`
		)
		issuePage = await issuePage.json()
		issueList = [...issueList, ...issuePage]
	} while (issuePage.length === 100)

	issueList.forEach((element) => {
		const { assignees } = element
		assignees.forEach((a) => {
			const { name } = a
			teamInfo.forEach((member) => {
				if (member.name === name || member.username === name) {
					member.issues += 1
				}
			})
		})
		totalIssueCount += 1
	})

	return {
		totalCommits: totalCommitCount,
		totalIssues: totalIssueCount,
		totalTests: totalTestCount,
		teamInfo: teamInfo,
	}
}

/**
 * Functional component for About page
 */
const About = () => {
	const [teamList, setTeamList] = useState([])
	const [totalCommits, setTotalCommits] = useState(0)
	const [totalIssues, setTotalIssues] = useState(0)
	const [totalTests, setTotalTests] = useState(0)
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			if (teamList === undefined || teamList.length === 0) {
				const gitlabInfo = await getGitlabInfo()
				setTotalCommits(gitlabInfo.totalCommits)
				setTotalIssues(gitlabInfo.totalIssues)
				setTotalTests(gitlabInfo.totalTests)
				setTeamList(gitlabInfo.teamInfo)
				setLoaded(true)
			}
		}
		fetchData()
	}, [teamList])

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>About Us</h1>
			<p style={{ fontSize: 20 }}>
				Texas Votes is a website that allows users to quickly look up
				their representatives, the districts they live in, and
				state/federal elections they're slated to participate in within
				the state of Texas. We hope to increase governmental
				transparency and decrease the difficulty for the voting process
				in order to promote a more democratic society.
			</p>
			<h1 className={styles.title}>Our Team</h1>
			{/* Team member bio cards */}
			{loaded ? (
				<div className={`${styles.gridLayout} ${styles.team}`}>
					{teamList.map((member) => {
						const {
							name,
							bio,
							role,
							picture_path,
							commits,
							issues,
							tests,
							linkedin
						} = member
						return (
							<DevBio
								key={name}
								name={name}
								role={role}
								bio={bio}
								picture_path={picture_path}
								commits={commits}
								issues={issues}
								tests={tests}
								linkedin={linkedin}
							/>
						)
					})}
				</div>
			) : (
				<Spinner />
			)}
			{/* Repo statistics */}
			<h1 className={styles.title}>Repository Statistics</h1>
			<div className={`${styles.gridLayout} ${styles.repoStats}`}>
				<RepoCard type="commits" number={totalCommits} />
				<RepoCard type="issues" number={totalIssues} />
				<RepoCard type="tests" number={totalTests} />
			</div>
			{/* Tool cards */}
			<h1 className={styles.title}>Tools Utilized</h1>
			<div className={`${styles.gridLayout} ${styles.devTools}`}>
				{toolsInfo.map((tool) => {
					const { title, img, description, link } = tool

					return (
						<ToolCard
							key={title}
							title={title}
							img={img}
							description={description}
							link={link}
						/>
					)
				})}
			</div>
			{/* API cards */}
			<h1 className={styles.title}>APIs Utilized</h1>
			<div className={`${styles.gridLayout} ${styles.devTools}`}>
				{apiInfo.map((api) => {
					const { title, img, description, link } = api

					return (
						<ToolCard
							key={title}
							title={title}
							img={img}
							description={description}
							link={link}
						/>
					)
				})}
			</div>
			<h1 className={styles.title}>GitLab Repository and Postman API</h1>
			<div className={styles.flexbox}>
				{repoAndAPI.map((tool) => {
					const { img, link } = tool

					return (
						<a href={link} key={link}>
							<img className={styles.logo} alt={link} src={img} />
						</a>
					)
				})}
			</div>
		</div>
	)
}

export default About
