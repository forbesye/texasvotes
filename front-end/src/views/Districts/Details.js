import React, {useState, useEffect, Fragment} from 'react'
import { PageHeader, Typography, Divider, Row, Col, Collapse, List } from "antd"
import { useParams, useHistory, Link } from 'react-router-dom'
// import districts from './DefaultDistricts'
import styles from './Districts.module.css'
import  { age_mappings, income_mappings, race_mappings, ethnicity_mappings, educational_mappings, elected_office_mappings, party_mappings } from "library/Mappings"
import Spinner from "components/ui/Spinner"
import { getAPI } from "library/APIClient"
import PieChart from "./../../components/charts/PieChart"

const { Title, Text } = Typography
const { Panel } = Collapse

const description = (district) => {
    return `${elected_office_mappings[district.type]} ${party_mappings[district.party]}`
}

const Details = () => {
    const { id } = useParams()
    const [ district, setDistrict ] = useState({})
    const [ loaded, setLoaded ] = useState(false)
    const history = useHistory()
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAPI({
                model: "district",
                path: id,
                params: {}
            })
            setDistrict(data);
            setLoaded(true);
        }
        fetchData();
    }, [id])

    const handleBack = () => {
        history.push("/districts/view")
    }

    const {
        name,
        // number,
        counties,
        elections,
        elected_officials,
        demographics,
        // current_incumbent
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
                    {/* <Title style={{ textAlign: "center" }} level={3}>Current Incumbent</Title> */}
                    {/* <img src={current_incumbent.src} alt={current_incumbent.name} className={styles.districtImage} /> */}
                    {/* <Title style={{ textAlign: "center" }} level={4}>{current_incumbent.name}</Title> */}
                    <Divider />
                    <Title style={{ textAlign: "center" }} level={3}>District Map</Title>
                    <article className={styles.districtDetails}>
                        <Row justify="space-around">
                            <Col>
                                {
                                    elections.past.length > 0 ?  (
                                        <Fragment>
                                            <Text strong>Past Election IDs: </Text>
                                            {
                                                elections.past.map((e, i) => {
                                                    // TODO change /0 to actual past election id
                                                    return <Link to={`/elections/view/0`}>{(i > 0 ? ", " : "") + e.id}</Link>
                                                })
                                            }
                                        </Fragment>
                                    ) : null
                                }
                            </Col>
                            <Col>
                                {
                                    elections.current ? (
                                        <Fragment>
                                            <Text strong>Current Election ID: </Text>
                                            {/* TODO change /0 to actual current election id */}
                                            <Link to={`/elections/view/0`}>{elections.current.id}</Link>
                                        </Fragment>
                                    ) : null
                                }
                            </Col>
                        </Row>
                        <Row justify="space-around">
                            <Col>
                                <Text strong>Past Official: </Text>
                                {/* TODO modify /0 to be the elected official's id */}
                                <Link to={`/politicians/view/0`}>{elected_officials[0].name}</Link> 
                            </Col>
                            <Col>
                                <Text strong>Current Official: </Text>
                                {/* TODO modify /0 to be the elected official's id */}
                                <Link to={`/politicians/view/0`}>{elected_officials[0].name}</Link>
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
                                    <PieChart 
                                        data={Object.keys(demographics.age).map(key => demographics.age[key])}
                                        labels={Object.keys(demographics.age).map(key => age_mappings[key])}
                                    />
                                </div>
                                <div style={{marginTop: "40px"}}>
                                    <Text strong>Race</Text>
                                    <br />
                                    <PieChart 
                                        data={Object.keys(demographics.race).map(key => demographics.race[key])}
                                        labels={Object.keys(demographics.race).map(key => race_mappings[key])}
                                    />
                                </div>
                                <div style={{marginTop: "40px"}}>
                                    <Text strong>Ethnicity</Text>
                                    <br />
                                    <PieChart 
                                        data={Object.keys(demographics.ethnicity).map(key => demographics.ethnicity[key])}
                                        labels={Object.keys(demographics.ethnicity).map(key => ethnicity_mappings[key])}
                                    />
                                </div>
                                <div>
                                    <Text strong>Educational Attainment</Text>
                                    <br />
                                    <Text strong>Enrolled</Text>
                                    <br />
                                    <PieChart 
                                        data={Object.keys(demographics.educational_attainment.enrollment).map(key => demographics.educational_attainment.enrollment[key])}
                                        labels={Object.keys(demographics.educational_attainment.enrollment).map(key => educational_mappings[key])}
                                    />
                                    <br />
                                    <Text strong>Attainment</Text>
                                    <br />
                                    <PieChart 
                                        data={Object.keys(demographics.educational_attainment.attainment).map(key => demographics.educational_attainment.attainment[key])}
                                        labels={Object.keys(demographics.educational_attainment.attainment).map(key => educational_mappings[key])}
                                    />
                                </div>
                                <div style={{marginTop: "40px"}}>
                                    <Text strong>Income</Text>
                                    <br />
                                    <PieChart 
                                        data={Object.keys(demographics.income).map(key => demographics.income[key])}
                                        labels={Object.keys(demographics.income).map(key => income_mappings[key])}
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
            { loaded ? content : <Spinner /> }
        </div>
    )
}

export default Details;