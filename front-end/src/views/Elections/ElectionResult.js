import React from "react"
import Highlighter from "react-highlight-words"
import { Typography } from "antd"
import { Link } from "react-router-dom"
import { electionTitle } from "library/Functions"
import styles from "views/Elections/Elections.module.css"

const { Title, Text, Paragraph } = Typography

/** Election card for search results
 * @param {Election} election
 */
export default function ElectionResult(props) {
	console.log(props)
	let {
		district: { counties },
		candidates,
		searchQuery,
	} = props

	let candidateNames = []
	candidates.forEach((candidate) => {
		candidateNames.push(candidate.name)
	})

	let displayedCounties =
		counties.length >= 10 ? counties.slice(0, 10) : counties
	displayedCounties = displayedCounties.reduce(
		(prev, next) => `${prev}, ${next}`
	)
	displayedCounties += counties.length >= 10 ? "..." : ""

	let displayedCandidates =
		candidateNames.length >= 10
			? candidateNames.slice(0, 10)
			: candidateNames
	displayedCandidates = displayedCandidates.reduce(
		(prev, next) => `${prev}, ${next}`
	)
	displayedCandidates += candidateNames.length >= 10 ? "..." : ""

	return (
		<Link to={`/elections/view/${props.id}`}>
			<div className={styles.electionSearchCard}>
				<div className={styles.electionSearchDesc}>
					<Title level={4}>
						{
							<Highlighter
								highlightClassName={styles.searchHighlight}
								searchWords={searchQuery.split(" ")}
								textToHighlight={electionTitle(props)}
							/>
						}
					</Title>
					<Paragraph>
						<Text strong>Candidates: </Text>
						<Highlighter
							highlightClassName={styles.searchHighlight}
							searchWords={searchQuery.split(" ")}
							textToHighlight={displayedCandidates}
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
