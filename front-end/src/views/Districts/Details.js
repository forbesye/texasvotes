import React, {useState, useEffect, Fragment} from 'react'
import { PageHeader, Typography, Spin, Divider, Row, Col, Collapse, List } from "antd"
import { useParams, useHistory } from 'react-router-dom'
import districts from './DefaultDistricts'
import styles from './Districts.module.css'
import { percentageString } from "library/Functions"
import  { age_mappings, income_mappings, race_mappings, ethnicity_mappings, educational_mappings, elected_office_mappings, party_mappings } from "library/Mappings"
const { Title, Paragraph, Text, Link } = Typography
const { Panel } = Collapse

const description = (district) => {
    return `${elected_office_mappings[district.type]} ${party_mappings[district.party]}`
}

// VERY temporary
const getMap = (district) => {
    if(district === 14) {
        return (
            <iframe style={{width: "90%", height: "400px"}}
            src="https://www.govtrack.us/congress/members/embed/mapframe?state=tx&district=14&bounds=-95.253,30.283,-93.974,28.176"></iframe>
        )
    }
    else if(district === 25) {
        return (
            <iframe style={{width: "90%", height: "400px"}}
            src="https://www.govtrack.us/congress/members/embed/mapframe?state=tx&district=25&bounds=-99.175,31.378,-97.694,28.961"></iframe>
        )
    }
    else {
        return (
            <iframe style={{width: "90%", height: "400px"}} src="https://www.govtrack.us/congress/members/embed/mapframe?state=TX&footer=0"> </iframe>
        )
    }
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

    const {
        name,
        type,
        number,
        party,
        counties,
        elections,
        elected_officials,
        demographics,
        map,
        current_incumbent
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
                    <Title style={{ textAlign: "center" }} level={3}>Current Incumbent</Title>
                    <img src={current_incumbent.src} alt={current_incumbent.name} className={styles.districtImage} />
                    <Title style={{ textAlign: "center" }} level={4}>{current_incumbent.name}</Title>
                    <Divider />
                    <Title style={{ textAlign: "center" }} level={3}>District Map</Title>
                    {getMap(number)}
                    <article className={styles.districtDetails}>
                        <Row justify="space-around">
                            <Col>
                                {
                                    elections.past.length > 0 ?  (
                                        <Fragment>
                                            <Text strong>Past Election IDs: </Text>
                                            <Text>{elections.past.map((e, i) => (i > 0 ? ", " : "") + e.id)}</Text>
                                        </Fragment>
                                    ) : null
                                }
                            </Col>
                            <Col>
                                {
                                    elections.current ? (
                                        <Fragment>
                                            <Text strong>Current Election ID: </Text>
                                            <Text>{elections.current.id}</Text>
                                        </Fragment>
                                    ) : null
                                }
                            </Col>
                        </Row>
                        <Row justify="space-around">
                            <Col>
                                <Text strong>Past Official: </Text><Text>{elected_officials[0].name}</Text>
                            </Col>
                            <Col>
                                <Text strong>Current Official: </Text><Text>{elected_officials[0].name}</Text>
                            </Col>
                        </Row>
                    </article>
                    <article className={styles.districtDetails}>
                        <Collapse ghost>
                            <Panel header="Counties">
                                <List 
                                    dataSource = {counties}
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
                                        dataSource = {Object.keys(demographics.age)}
                                        renderItem = {key => (
                                            <List.Item>
                                                <Text strong>{age_mappings[key]}: </Text><Text>{demographics.age[key]} {percentageString(key, demographics.age)}</Text>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Text strong>Race</Text>
                                    <br />
                                    <List 
                                        dataSource = {Object.keys(demographics.race)}
                                        renderItem = {key => (
                                            <List.Item>
                                                <Text strong>{race_mappings[key]}: </Text><Text>{demographics.race[key]} {percentageString(key, demographics.race)}</Text>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Text strong>Ethnicity</Text>
                                    <br />
                                    <List 
                                        dataSource = {Object.keys(demographics.ethnicity)}
                                        renderItem = {key => (
                                            <List.Item>
                                                <Text strong>{ethnicity_mappings[key]}: </Text><Text>{demographics.ethnicity[key]} {percentageString(key, demographics.ethnicity)}</Text>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Text strong>Educational Attainment</Text>
                                    <br />
                                    <Text strong>Enrolled</Text>
                                    <List 
                                        dataSource = {Object.keys(demographics.educational_attainment.enrollment)}
                                        renderItem = {key => (
                                            <List.Item>
                                                <Text strong>{educational_mappings[key]}: </Text><Text>{demographics.educational_attainment.enrollment[key]} {percentageString(key, demographics.educational_attainment.enrollment)}</Text>
                                            </List.Item>
                                        )}
                                    />
                                    <br />
                                    <Text strong>Attainment</Text>
                                    <List 
                                        dataSource = {Object.keys(demographics.educational_attainment.attainment)}
                                        renderItem = {key => (
                                            <List.Item>
                                                <Text strong>{educational_mappings[key]}: </Text><Text>{demographics.educational_attainment.attainment[key]} {percentageString(key, demographics.educational_attainment.attainment)}</Text>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Text strong>Income</Text>
                                    <br />
                                    <List 
                                        dataSource = {Object.keys(demographics.income)}
                                        renderItem = {key => (
                                            <List.Item>
                                                <Text strong>{income_mappings[key]}: </Text><Text>{demographics.income[key]} {percentageString(key, demographics.income)}</Text>
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