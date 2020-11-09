import React, { Fragment } from "react"
import { Card } from "antd"
import { Link } from "react-router-dom"
import Highlighter from "react-highlight-words"
import styles from "./Search.module.css"
import { description as districtDescription } from "../Politicians/Lib"
import { districtName } from "../Districts/Lib"
import {
	election_type_mappings,
	elected_office_mappings,
} from "../../library/Mappings"

const COUNTY_LIMIT = 5

const { Meta } = Card

// Card used to display a politician result on the general search page. Takes in a search query and the politician model body
export function PoliticianCard(props) {
	let {
		// eslint-disable-next-line
		district: { counties },
		image,
		id,
		name,
		party,
		searchQuery,
	} = props
	counties = counties.slice(0, 3)
	return (
		<Link to={`/politicians/view/${id}`} target="_blank">
			<Card
				className={styles.generalCard}
				hoverable
				cover={
					<img src={image} alt={name} className={styles.cardCover} />
				}
			>
				<Meta
					title={
						<Highlighter
							highlightClassName={styles.highlight}
							searchWords={[searchQuery]}
							textToHighlight={`${name} (${party})`}
						/>
					}
					description={
						<Highlighter
							highlightClassName={styles.highlight}
							searchWords={[searchQuery]}
							textToHighlight={districtDescription(props)}
						/>
					}
				/>
			</Card>
		</Link>
	)
}

// Card used to display a district result on the general search page. Takes in a search query and the district model body
export function DistrictCard(props) {
	const {
		elected_officials,
		id,
		counties,
		searchQuery,
	} = props
	let mapped = counties
		.slice(0, COUNTY_LIMIT)
		.reduce((prev, curr) => `${prev}, ${curr}`)
	mapped += counties.length > COUNTY_LIMIT ? "..." : ""
	const electedOfficials = elected_officials
	return (
		<Link to={`/districts/view/${id}`} target="_blank">
			<Card className={styles.generalCard}>
				<Meta
					title={
						<Highlighter
							highlightClassName={styles.highlight}
							searchWords={[searchQuery]}
							textToHighlight={`${districtName(props)}`}
						/>
					}
					description={
						<Fragment>
							<div>
								<Highlighter
									highlightClassName={styles.highlight}
									searchWords={[searchQuery]}
									textToHighlight={`Held By: ${electedOfficials.map(
										({ name, party }) =>
											`${name} (${party})`
									)}`}
								/>
							</div>
							<div>
								<Highlighter
									highlightClassName={styles.highlight}
									searchWords={[searchQuery]}
									textToHighlight={`Type: ${districtName(
										props
									)}`}
								/>
							</div>
							<div>
								<Highlighter
									highlightClassName={styles.highlight}
									searchWords={[searchQuery]}
									textToHighlight={`Counties: ${mapped}`}
								/>
							</div>
						</Fragment>
					}
				/>
			</Card>
		</Link>
	)
}

// Card used to display a election result on the general search page. Takes in a search query and the election model body
export function ElectionCard(props) {
	const {
		district: { number, counties },
		dates: { election_day },
		id,
		office,
		party,
		type,
		searchQuery,
	} = props
	let electionName = `${election_type_mappings[type.class]} Election`
	if (party) electionName = `(${party}) ${electionName}`
	let mapped = counties
		.slice(0, COUNTY_LIMIT)
		.reduce((prev, curr) => `${prev}, ${curr}`)
	mapped += counties.length > COUNTY_LIMIT ? "..." : ""
	return (
		<Link to={`/elections/view/${id}`} target="_blank">
			<Card className={styles.generalCard}>
				<Meta
					title={
						<Highlighter
							highlightClassName={styles.highlight}
							searchWords={[searchQuery]}
							textToHighlight={electionName}
						/>
					}
					description={
						<Fragment>
							<div>
								<Highlighter
									highlightClassName={styles.highlight}
									searchWords={[searchQuery]}
									textToHighlight={`Held on: ${new Date(
										election_day
									).toLocaleDateString("en", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}`}
								/>
							</div>
							<div>
								<Highlighter
									highlightClassName={styles.highlight}
									searchWords={[searchQuery]}
									textToHighlight={`${
										elected_office_mappings[office]
									} ${
										number !== -1
											? "District " + number
											: ""
									}`}
								/>
							</div>
							<div>
								<Highlighter
									highlightClassName={styles.highlight}
									searchWords={[searchQuery]}
									textToHighlight={`Counties: ${mapped}`}
								/>
							</div>
						</Fragment>
					}
				/>
			</Card>
		</Link>
	)
}

// Card that links the rest of the results on the general search page.
export function MoreResultsCard({ amount, model, searchQuery }) {
	return (
		<Link to={`/${model}s/search?q=${searchQuery}`} target="_blank">
			<Card className={styles.generalCard}>
				<Meta
					title={`View more ${model} results here.`}
					description={`There are ${amount} results remaining.`}
				/>
			</Card>
		</Link>
	)
}
