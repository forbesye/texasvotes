import React, { useState, useEffect, Fragment } from "react"
import { PageHeader, Typography, Divider, Row, Col, List, Checkbox } from "antd"
import { useParams, useHistory, Link } from "react-router-dom"
import styles from "./Districts.module.css"
import { districtName, description, electionName, chart } from "./Lib"
import Spinner from "components/ui/Spinner"
import { getAPI } from "library/APIClient"
import DistrictMap from "components/ui/DistrictMap"
import PoliticianCard from "components/cards/PoliticianCard"

const { Title, Text } = Typography


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
				})
				setDistrict(data)
				if (data.type === "us_house") {
					const txData = await getAPI({
						model: "district",
						path: 218,
					})
					setTexasData(txData)
				}
				setLoaded(true)
			} catch (err) {
				console.error(err)
				history.push("/error")
			}
		}
		fetchData()
	}, [id, compare, history])

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
					onBack={() => window.history.back()}
				/>
				<Divider />
				<div className={styles.districtDescription}>
					<Title style={{ textAlign: "center" }} level={3}>
						District Map
					</Title>
					<DistrictMap
						containerStyle={{
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
						{elected_officials && (
							<Row justify="space-around">
								<Col>
									<Text strong style={{ fontSize: 18 }}>
										{elected_officials.length < 2
											? "Elected official"
											: "Elected officials"}
									</Text>
									<div className={elected_officials.length < 2 ? styles.polCard : styles.grid}>
										{elected_officials.map((data) => (
											<PoliticianCard
												key={data.id}
												data={{
													...data,
													running_for: type,
													current: type,
												}}
											/>
										))}
									</div>
								</Col>
							</Row>
						)}
						{/* Related elections */}
						<Row justify="space-around" style={{ marginTop: 10 }}>
							<Col>
								{elections.length ? (
									<Fragment>
										<Text strong style={{ fontSize: 18 }}>
											Elections
										</Text>
										{elections.map((e) =>
				                            <Link to={`/elections/view/${e.id}`} key={e.id} >
											    {electionName(e, number)}
                                            </Link>
										)}
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
							dataSource={counties.sort()}
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
                                    {chart("Current District", "age", demographics.age.items, demographics.age.out_of)}
                                    {chart("Texas", "age", texasDemographics.age.items, texasDemographics.age.out_of)}
								</>
							) : (
								<>
                                    {chart("", "age", demographics.age.items, demographics.age.out_of)}
								</>
							)}
						</div>
						<div style={{ marginTop: "40px" }}>
							<Text strong style={{ fontSize: 18 }}>
								Race
							</Text>
							<br />
                            
							{Object.keys(texasData).length > 0 && compare ? (
								<>
                                    {chart("Current District", "race", demographics.race.items, demographics.race.out_of)}
                                    {chart("Texas", "race", texasDemographics.race.items, texasDemographics.race.out_of)}
								</>
							) : (
								<>
                                    {chart("", "race", demographics.race.items, demographics.race.out_of)}
								</>
							)}
						</div>
						{demographics.ethnicity ? (
							<div style={{ marginTop: "40px" }}>
								<Text strong style={{ fontSize: 18 }}>
									Ethnicity
								</Text>
								<br />
							    {Object.keys(texasData).length > 0 && compare ? (
							    	<>
                                        {chart("Current District", "ethnicity", demographics.ethnicity.items, demographics.ethnicity.out_of)}
                                        {chart("Texas", "ethnicity", texasDemographics.ethnicity.items, texasDemographics.ethnicity.out_of)}
							    	</>
							    ) : (
							    	<>
                                        {chart("", "ethnicity", demographics.ethnicity.items, demographics.ethnicity.out_of)}
							    	</>
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
                                    {chart("Current District", "education", demographics.education.enrollment.items, demographics.education.enrollment.out_of)}
                                    {chart("Texas", "education", texasDemographics.education.enrollment.items, texasDemographics.education.enrollment.out_of)}
								</>
							) : (
								<>
                                    {chart("", "education", demographics.education.enrollment.items, demographics.education.enrollment.out_of)}
								</>
							)}
							<br />
							<Text strong style={{ fontSize: 18 }}>
								Education Attainment
							</Text>
							<br />
							{Object.keys(texasData).length > 0 && compare ? (
								<>
                                    {chart("Current District", "education", demographics.education.attainment.items, demographics.education.attainment.out_of)}
                                    {chart("Texas", "education", texasDemographics.education.attainment.items, texasDemographics.education.attainment.out_of)}
								</>
							) : (
								<>
                                    {chart("", "education", demographics.education.attainment.items, demographics.education.attainment.out_of)}
								</>
							)}
						</div>
						<div style={{ marginTop: "40px" }}>
							<Text strong style={{ fontSize: 18 }}>
								Income
							</Text>
							<br />
							{Object.keys(texasData).length > 0 && compare ? (
								<>
                                    {chart("Current District", "income", demographics.income.items, demographics.income.out_of)}
                                    {chart("Texas", "income", texasDemographics.income.items, texasDemographics.income.out_of)}
								</>
							) : (
								<>
                                    {chart("", "income", demographics.income.items, demographics.income.out_of)}
								</>
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
