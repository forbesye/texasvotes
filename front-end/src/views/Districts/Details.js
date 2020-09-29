import React, {useState, useEffect, Fragment} from 'react'
import { PageHeader, Typography, Spin, Divider, Row, Col, Collapse, List } from "antd"
import { useParams, useHistory } from 'react-router-dom'
import districts from './DefaultDistricts'
import styles from './Districts.module.css'

const { Title, Paragraph, Text, Link } = Typography
const { Panel } = Collapse

// TODO: refactor this
const ELECTED_OFFICE_NAMES = {
    us_house: "House of Representatives",
    us_senate: "US Senate",
    tx_house: "Texas House of Representatives",
    tx_senate: "Texas Senate",
}

function description (district) {
    return `${ELECTED_OFFICE_NAMES[district.type]} ${district.party}`
}

const percentageString = (key, obj) => {
    let sum = 0.0;
    let keyVal = obj[key];
    for (const val in obj) {
        sum += parseInt(obj[val]);
    }
    keyVal = (keyVal / sum) * 100;
    
    return `(${keyVal.toFixed(2)}%)`;
}

const Details = () => {
    const { id } = useParams()
    const [ district, setDistrict ] = useState({})
    const [ loaded, setLoaded ] = useState(false)

    const history = useHistory()
    
    useEffect(() => {
        const data = districts.find(p => p.id === parseInt(id))
        setDistrict(data)
        setLoaded(true)
    }, [district])

    const handleBack = () => {
        history.push("/districts/view")
    }

    const age_mappings = {
        "0": "0 - 5",
        "5": "5 - 18",
        "18": "18 - 65",
        "65": "65+",
    }

    const income_mappings = {
        "0": "$0 - $10,000",
        "10_000": "$10,000 - $25,000",
        "25_000": "$25,000 - $50,000",
        "50_000": "$50,000 - $100,000",
        "100_000": "$100,000 - $200,000",
        "200_000": "$200,000+"
    }

    const race_mappings = {
        "white": "White",
        "black": "Black",
        "asian": "Asian",
        "indigenous": "Indigenous",
        "pacific_islander": "Pacific Islander",
        "other": "Other"
    }

    const ethnicity_mappings = {
        "hispanic": "Hispanic",
        "non_hispanic": "Non-Hispanic"
    }

    const educational_mappings = {
        "preschool": "Preschool",
        "primary": "Primary",
        "university": "University",
        "high_school": "High School",
        "some_college": "Some College",
        "bachelors": "Bachelors"
    }

    const {
        name,
        type,
        party,
        counties,
        elections,
        elected_officials,
        demographics,
    } = district
    let content = null
    if(loaded) {
        content = (
            <Fragment>
                <PageHeader
                    title={name}
                    subTitle={description(district)}
                    onBack={handleBack} 
                />
                <Divider />
                <div className={styles.districtDescription}>
                    <Title style={{ textAlign: "center" }} level={3}>General Information</Title>
                    <img src={"https://www.txdot.gov/content/dam/txdot/asset_collection/local_information/texas.jpg"} alt={name} className={styles.districtImage} />
                    <article className={styles.districtDetails}>
                        <Row justify="space-around">
                            <Col>
                                <Text strong>Past Elections: </Text><Text>{district.elections.past[0].id}</Text>
                            </Col>
                            <Col>
                                <Text strong>Current Elections: </Text><Text>{district.elections.current.id}</Text>
                            </Col>
                        </Row>
                        <Row justify="space-around">
                            <Col>
                                <Text strong>Past Official: </Text><Text>{district.elected_officials[0].name}</Text>
                            </Col>
                            <Col>
                                <Text strong>Current Official: </Text><Text>{district.elected_officials[0].name}</Text>
                            </Col>
                        </Row>
                    </article>
                    <article className={styles.districtDetails}>
                        <Collapse ghost>
                            <Panel header="Counties">
                                <List 
                                    dataSource = {district.counties}
                                    renderItem = {item => (
                                        <List.Item>
                                            <Text>{item}</Text>
                                        </List.Item>
                                    )}
                                />
                            </Panel>
                        </Collapse>
                    </article>
                    <article className={styles.districtDetails}>
                        <Collapse ghost>
                            <Panel header="Demographics">
                                <div>
                                    <Text strong>Age</Text>
                                    <br />
                                    <List 
                                        dataSource = {Object.keys(district.demographics.age)}
                                        renderItem = {key => (
                                            <List.Item>
                                                <Text strong>{age_mappings[key]}: </Text><Text>{district.demographics.age[key]} {percentageString(key, district.demographics.age)}</Text>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Text strong>Race</Text>
                                    <br />
                                    <List 
                                        dataSource = {Object.keys(district.demographics.race)}
                                        renderItem = {key => (
                                            <List.Item>
                                                <Text strong>{race_mappings[key]}: </Text><Text>{district.demographics.race[key]} {percentageString(key, district.demographics.race)}</Text>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Text strong>Ethnicity</Text>
                                    <br />
                                    <List 
                                        dataSource = {Object.keys(district.demographics.ethnicity)}
                                        renderItem = {key => (
                                            <List.Item>
                                                <Text strong>{ethnicity_mappings[key]}: </Text><Text>{district.demographics.ethnicity[key]} {percentageString(key, district.demographics.ethnicity)}</Text>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Text strong>Educational Attainment</Text>
                                    <br />
                                    <Text strong>Enrolled</Text>
                                    <List 
                                        dataSource = {Object.keys(district.demographics.educational_attainment.enrollment)}
                                        renderItem = {key => (
                                            <List.Item>
                                                <Text strong>{educational_mappings[key]}: </Text><Text>{district.demographics.educational_attainment.enrollment[key]} {percentageString(key, district.demographics.educational_attainment.enrollment)}</Text>
                                            </List.Item>
                                        )}
                                    />
                                    <br />
                                    <Text strong>Attainment</Text>
                                    <List 
                                        dataSource = {Object.keys(district.demographics.educational_attainment.attainment)}
                                        renderItem = {key => (
                                            <List.Item>
                                                <Text strong>{educational_mappings[key]}: </Text><Text>{district.demographics.educational_attainment.attainment[key]} {percentageString(key, district.demographics.educational_attainment.attainment)}</Text>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Text strong>Income</Text>
                                    <br />
                                    <List 
                                        dataSource = {Object.keys(district.demographics.income)}
                                        renderItem = {key => (
                                            <List.Item>
                                                <Text strong>{income_mappings[key]}: </Text><Text>{district.demographics.income[key]} {percentageString(key, district.demographics.income)}</Text>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                

                            </Panel>
                        </Collapse>
                    </article>
                </div>
            </Fragment>
        )
    }

    return (
        <div className={styles.districtPage}>
            { loaded ? content : <Spin tip="Looking for the fabled Blue wave..." /> }
        </div>
    )
}

export default Details;