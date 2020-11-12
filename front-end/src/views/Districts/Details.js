import React, { useState, useEffect, Fragment } from "react"
import { PageHeader, Typography, Divider, Row, Col, List, Checkbox } from "antd"
import { useParams, useHistory, Link } from "react-router-dom"
import styles from "./Districts.module.css"
import { districtName, description } from "./Lib"
import Spinner from "components/ui/Spinner"
import { getAPI } from "library/APIClient"
import DistrictMap from "components/ui/DistrictMap"
import PieChart from "components/charts/PieChart"
import PoliticianCard from "components/cards/PoliticianCard"
import { formatAsMoney, convertToPercent } from "library/Functions"
import { party_mappings } from "library/Mappings"

const { Title, Text } = Typography

/**
 * Returns a link to an associated election with proper text
 * @param {Election object} election
 * @param {Number} number
 * Todo: Refactor
 */
const electionName = (election, number) => {
	const { dates, office, type, party, id } = election
	const { election_day } = dates
	const electionYear = new Date(election_day).getFullYear()
	if (type.class === "general") {
		return (
			<div>
				<Link to={`/elections/view/${id}`}>
					{`${electionYear} General Election for `}{" "}
					{districtName(office, number)}
				</Link>
			</div>
		)
	} else if (type.class === "runoff") {
		return (
			<div>
				<Link to={`/elections/view/${id}`}>
					{`${electionYear} ${
						party_mappings[party]
					} Runoff for ${districtName(office, number)}`}
				</Link>
			</div>
		)
	} else {
		return (
			<div>
				<Link to={`/elections/view/${id}`}>
					{`${electionYear} ${
						party_mappings[party]
					} Primary for ${districtName(office, number)}`}
				</Link>
			</div>
		)
	}
}

/**
 * Functional component for District detail
 */
const Details = () => {
	const { id } = useParams()
	const [district, setDistrict] = useState({})
	const [texasData, setTexasData] = useState({})
	const [loaded, setLoaded] = useState(false)
	const [compare, setCompare] = useState(false)
	const history = useHistory()

	/**
	 * useEffect component that updates on id change to URL
	 */
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAPI({
					model: "district",
					path: id,
					params: {},
				})
				setDistrict(data)
				if (data.type === "us_house") {
					const txData = await getAPI({
						model: "district",
						path: 218,
						params: {},
					})
					setTexasData(txData)
				}
				setLoaded(true)
			} catch (err) {
				history.push("/error")
			}
		}
		fetchData()
	}, [id, compare, history])

	const handleBack = () => {
		history.push("/districts/view")
	}

	const checkboxCompare = () => {
		setCompare(!compare)
	}

	const { demographics: texasDemographics } = texasData

	const {
		number,
		counties,
		elections,
		elected_officials,
		demographics,
		type,
		max_long,
		min_long,
		max_lat,
		min_lat,
	} = district

	let content = null
	if (loaded) {
		content = (
			<Fragment>
				<PageHeader
					title={districtName(district)}
					subTitle={description(district)}
					onBack={handleBack}
				/>
				<Divider />
				<div className={styles.districtDescription}>
					<Title style={{ textAlign: "center" }} level={3}>
						District Map
					</Title>
					<DistrictMap 
						containerStyle = {{
							height: "50vh",
							width: "95%",
						}}
						max_lat={max_lat}
						min_lat={min_lat}
						max_long={max_long}
						min_long={min_long}
						number={number}
						type={type}
					/>
					<article className={styles.districtDetails}>
						<Title style={{ textAlign: "center" }} level={3}>
							District Details
						</Title>
						{/* Elected officials in district */}
						{elected_officials && <Row justify="space-around">
							<Col>
								<Text strong style={{ fontSize: 18 }}>
									{elected_officials.length < 2
										? "Elected official"
										: "Elected officials"}
								</Text>
								<div className={styles.grid} >
									{elected_officials.map((data) => (
										<PoliticianCard 
											key={data.id}
											data={{
												...data,
												running_for: type,
												current: type
											}}
										/>
									))}
								</div>
							</Col>
						</Row>}
						{/* Related elections */}
						<Row justify="space-around" style={{ marginTop: 10 }}>
							<Col>
								{elections.length ? (
									<Fragment>
										<Text strong style={{ fontSize: 18 }}>
											Elections
										</Text>
										{elections.map((e) => (
												electionName(e, number)
											))}
									</Fragment>
								) : (
									<Fragment>
										<Text style={{ fontSize: 18 }}>
											There are no elections for this
											district.
										</Text>
									</Fragment>
								)}
							</Col>
						</Row>
					</article>
					{/* Counties in district */}
					<article className={styles.districtDetails}>
						<Title style={{ textAlign: "center" }} level={3}>
							Counties
						</Title>
						<List
							dataSource={counties}
							renderItem={(item) => (
								<List.Item>
									<Text>{item}</Text>
								</List.Item>
							)}
							grid={{ gutter: 16, column: 3 }}
						/>
					</article>
					{/* District demographics */}
					<article className={styles.districtDetails}>
						{Object.keys(texasData).length > 0 ? (
							<Row justify="end">
								<Col>
									<Title
										style={{
											textAlign: "center",
											marginRight: 60,
										}}
										level={3}
									>
										Demographics
									</Title>
								</Col>
								<Col>
									<Checkbox onChange={checkboxCompare}>
										Compare with Texas
									</Checkbox>
								</Col>
							</Row>
						) : (
							<Title style={{ textAlign: "center" }} level={3}>
								Demographics
							</Title>
						)}

						<div>
							<Text strong style={{ fontSize: 18 }}>
								Age
							</Text>
							<br />
							{Object.keys(texasData).length > 0 && compare ? (
								<>
									<Text
										strong
										style={{ fontSize: 12, marginTop: 20 }}
									>
										Current District
									</Text>
									<PieChart
										data={demographics.age.items.map(
											(item) =>
												convertToPercent(
													item.proportion,
													demographics.age.out_of
												)
										)}
										labels={demographics.age.items.map(
											(item) => {
												if (item.end) {
													return `${item.start} - ${item.end}`
												} else {
													return `${item.start}+`
												}
											}
										)}
									/>
									<Text
										strong
										style={{ fontSize: 12, marginTop: 20 }}
									>
										Texas
									</Text>
									<PieChart
										data={texasDemographics.age.items.map(
											(item) =>
												convertToPercent(
													item.proportion,
													texasDemographics.age.out_of
												)
										)}
										labels={texasDemographics.age.items.map(
											(item) => {
												if (item.end) {
													return `${item.start} - ${item.end}`
												} else {
													return `${item.start}+`
												}
											}
										)}
									/>
								</>
							) : (
								<PieChart
									data={demographics.age.items.map((item) =>
										convertToPercent(
											item.proportion,
											demographics.age.out_of
										)
									)}
									labels={demographics.age.items.map(
										(item) => {
											if (item.end) {
												return `${item.start} - ${item.end}`
											} else {
												return `${item.start}+`
											}
										}
									)}
								/>
							)}
						</div>
						<div style={{ marginTop: "40px" }}>
							<Text strong style={{ fontSize: 18 }}>
								Race
							</Text>
							<br />
							{Object.keys(texasData).length > 0 && compare ? (
								<>
									<Text
										strong
										style={{ fontSize: 12, marginTop: 20 }}
									>
										Current District
									</Text>
									<PieChart
										data={demographics.race.items.map(
											(item) =>
												convertToPercent(
													item.proportion,
													demographics.race.out_of
												)
										)}
										labels={demographics.race.items.map(
											(item) => item.race
										)}
									/>
									<Text
										strong
										style={{ fontSize: 12, marginTop: 20 }}
									>
										Texas
									</Text>
									<PieChart
										data={texasDemographics.race.items.map(
											(item) =>
												convertToPercent(
													item.proportion,
													texasDemographics.race
														.out_of
												)
										)}
										labels={texasDemographics.race.items.map(
											(item) => item.race
										)}
									/>
								</>
							) : (
								<PieChart
									data={demographics.race.items.map((item) =>
										convertToPercent(
											item.proportion,
											demographics.race.out_of
										)
									)}
									labels={demographics.race.items.map(
										(item) => item.race
									)}
								/>
							)}
						</div>
						{demographics.ethnicity ? (
							<div style={{ marginTop: "40px" }}>
								<Text strong style={{ fontSize: 18 }}>
									Ethnicity
								</Text>
								<br />
								{Object.keys(texasData).length > 0 &&
								compare ? (
									<>
										<Text
											strong
											style={{
												fontSize: 12,
												marginTop: 20,
											}}
										>
											Current District
										</Text>
										<PieChart
											data={demographics.ethnicity.items.map(
												(item) =>
													convertToPercent(
														item.proportion,
														demographics.ethnicity
															.out_of
													)
											)}
											labels={demographics.ethnicity.items.map(
												(item) => item.ethnicity
											)}
										/>
										<Text
											strong
											style={{
												fontSize: 12,
												marginTop: 20,
											}}
										>
											Texas
										</Text>
										<PieChart
											data={texasDemographics.ethnicity.items.map(
												(item) =>
													convertToPercent(
														item.proportion,
														texasDemographics
															.ethnicity.out_of
													)
											)}
											labels={texasDemographics.ethnicity.items.map(
												(item) => item.ethnicity
											)}
										/>
									</>
								) : (
									<PieChart
										data={demographics.ethnicity.items.map(
											(item) =>
												convertToPercent(
													item.proportion,
													demographics.ethnicity
														.out_of
												)
										)}
										labels={demographics.ethnicity.items.map(
											(item) => item.ethnicity
										)}
									/>
								)}
							</div>
						) : null}
						<div style={{ marginTop: "40px" }}>
							<Text strong style={{ fontSize: 18 }}>
								Education Enrollement
							</Text>
							<br />
							{Object.keys(texasData).length > 0 && compare ? (
								<>
									<Text
										strong
										style={{ fontSize: 12, marginTop: 20 }}
									>
										Current District
									</Text>
									<PieChart
										data={demographics.education.enrollment.items.map(
											(item) =>
												convertToPercent(
													item.proportion,
													demographics.education
														.enrollment.out_of
												)
										)}
										labels={demographics.education.enrollment.items.map(
											(item) => item.level
										)}
									/>
									<Text
										strong
										style={{ fontSize: 12, marginTop: 20 }}
									>
										Texas
									</Text>
									<PieChart
										data={texasDemographics.education.enrollment.items.map(
											(item) =>
												convertToPercent(
													item.proportion,
													texasDemographics.education
														.enrollment.out_of
												)
										)}
										labels={texasDemographics.education.enrollment.items.map(
											(item) => item.level
										)}
									/>
								</>
							) : (
								<PieChart
									data={demographics.education.enrollment.items.map(
										(item) =>
											convertToPercent(
												item.proportion,
												demographics.education
													.enrollment.out_of
											)
									)}
									labels={demographics.education.enrollment.items.map(
										(item) => item.level
									)}
								/>
							)}
							<br />
							<Text strong style={{ fontSize: 18 }}>
								Education Attainment
							</Text>
							<br />
							{Object.keys(texasData).length > 0 && compare ? (
								<>
									<Text
										strong
										style={{ fontSize: 12, marginTop: 20 }}
									>
										Current District
									</Text>
									<PieChart
										data={demographics.education.attainment.items.map(
											(item) =>
												convertToPercent(
													item.proportion,
													demographics.education
														.attainment.out_of
												)
										)}
										labels={demographics.education.attainment.items.map(
											(item) => item.level
										)}
									/>
									<Text
										strong
										style={{ fontSize: 12, marginTop: 20 }}
									>
										Texas
									</Text>
									<PieChart
										data={texasDemographics.education.attainment.items.map(
											(item) =>
												convertToPercent(
													item.proportion,
													texasDemographics.education
														.attainment.out_of
												)
										)}
										labels={texasDemographics.education.attainment.items.map(
											(item) => item.level
										)}
									/>
								</>
							) : (
								<PieChart
									data={demographics.education.attainment.items.map(
										(item) =>
											convertToPercent(
												item.proportion,
												demographics.education
													.attainment.out_of
											)
									)}
									labels={demographics.education.attainment.items.map(
										(item) => item.level
									)}
								/>
							)}
						</div>
						<div style={{ marginTop: "40px" }}>
							<Text strong style={{ fontSize: 18 }}>
								Income
							</Text>
							<br />
							{Object.keys(texasData).length > 0 && compare ? (
								<>
									<Text
										strong
										style={{ fontSize: 12, marginTop: 20 }}
									>
										Current District
									</Text>
									<PieChart
										data={demographics.income.items.map(
											(item) =>
												convertToPercent(
													item.proportion,
													demographics.income.out_of
												)
										)}
										labels={demographics.income.items.map(
											(item) => {
												if (item.end) {
													return `${formatAsMoney(
														item.start
													)} - ${formatAsMoney(
														item.end
													)}`
												} else {
													return `${formatAsMoney(
														item.start
													)}+`
												}
											}
										)}
									/>
									<Text
										strong
										style={{ fontSize: 12, marginTop: 20 }}
									>
										Texas
									</Text>
									<PieChart
										data={texasDemographics.income.items.map(
											(item) =>
												convertToPercent(
													item.proportion,
													texasDemographics.income
														.out_of
												)
										)}
										labels={texasDemographics.income.items.map(
											(item) => {
												if (item.end) {
													return `${formatAsMoney(
														item.start
													)} - ${formatAsMoney(
														item.end
													)}`
												} else {
													return `${formatAsMoney(
														item.start
													)}+`
												}
											}
										)}
									/>
								</>
							) : (
								<PieChart
									data={demographics.income.items.map(
										(item) =>
											convertToPercent(
												item.proportion,
												demographics.income.out_of
											)
									)}
									labels={demographics.income.items.map(
										(item) => {
											if (item.end) {
												return `${formatAsMoney(
													item.start
												)} - ${formatAsMoney(item.end)}`
											} else {
												return `${formatAsMoney(
													item.start
												)}+`
											}
										}
									)}
								/>
							)}
						</div>
					</article>
				</div>
			</Fragment>
		)
	}

	return (
		<div className={styles.districtPage}>
			{loaded ? content : <Spinner />}
		</div>
	)
}

export default Details
