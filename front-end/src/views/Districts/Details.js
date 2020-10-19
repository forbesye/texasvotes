import React, {useState, useEffect, Fragment, useRef} from 'react'
import { PageHeader, Typography, Divider, Row, Col, Collapse, List } from "antd"
import { useParams, useHistory, Link } from 'react-router-dom'
// import districts from './DefaultDistricts'
import styles from './Districts.module.css'
import  { age_mappings, income_mappings, race_mappings, ethnicity_mappings, educational_mappings, elected_office_mappings, party_mappings } from "library/Mappings"
import Spinner from "components/ui/Spinner"
import { getAPI } from "library/APIClient"
import PieChart from "./../../components/charts/PieChart"
import ReactMapboxGl, { Layer, Feature, Source } from 'react-mapbox-gl'

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
    const mapContainer = useRef(null)
    
    const Map = ReactMapboxGl({
        accessToken:
            process.env.REACT_APP_MAP_KEY
    });

    const HOUSE_SOURCE = {
        'type': 'vector',
        'url': 'mapbox://catalystic.4792yhty'
    };
    
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
                    {/* <Divider /> */}
                    <Title style={{ textAlign: "center" }} level={3}>District Map</Title>
                    <Map
                        style='mapbox://styles/catalystic/ckggmur05017k1arklcio8vlc'
                        center={[-100, 30]}
                        containerStyle={{
                          height: '50vh',
                          width: '30vw'
                        }}
                        zoom={[4.5]}
                    >
                        <Source id="house_source" tileJsonSource={HOUSE_SOURCE} />
                        <Layer 
                            id="house_source_layer" 
                            type= 'line'
                            sourceId= 'house_source'
                            sourceLayer= 'original'
                        >
                        </Layer>
                    </Map>

                    <article className={styles.districtDetails}>
                        <Title style={{ textAlign: "center" }} level={3}>Elections</Title>
                        <Row justify="space-around">
                            <Col>
                                {
                                    elections.past.length > 0 ?  (
                                        <Fragment>
                                            <Text strong style={{fontSize: 18}}>Past Election IDs: </Text>
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
                                            <Text strong style={{fontSize: 18}}>Current Election ID: </Text>
                                            {/* TODO change /0 to actual current election id */}
                                            <Link to={`/elections/view/0`}>{elections.current.id}</Link>
                                        </Fragment>
                                    ) : null
                                }
                            </Col>
                        </Row>
                        <Row justify="space-around">
                            <Col>
                                <Text strong style={{fontSize: 18}}>Past Official: </Text>
                                {/* TODO modify /0 to be the elected official's id */}
                                <Link to={`/politicians/view/0`}>{elected_officials[0].name}</Link> 
                            </Col>
                            <Col>
                                <Text strong style={{fontSize: 18}}>Current Official: </Text>
                                {/* TODO modify /0 to be the elected official's id */}
                                <Link to={`/politicians/view/0`}>{elected_officials[0].name}</Link>
                            </Col>
                        </Row>
                    </article>
                    <article className={styles.districtDetails}>
                        
                        <Title style={{ textAlign: "center" }} level={3}>Counties</Title>
                        <List 
                            dataSource = {counties}
                            renderItem = {item => (
                                <List.Item>
                                    <Text>{item}</Text>
                                </List.Item>
                            )}
                            grid = {{gutter: 16, column: 3}}
                        />
                    </article>
                    <article className={styles.districtDetails}>
                        <Title style={{ textAlign: "center" }} level={3}>Demographics</Title>
                        <div>
                            <Text strong style={{fontSize: 18}}>Age</Text>
                            <br />
                            <PieChart 
                                data={Object.keys(demographics.age).map(key => demographics.age[key])}
                                labels={Object.keys(demographics.age).map(key => age_mappings[key])}
                            />
                        </div>
                        <div style={{marginTop: "40px"}}>
                            <Text strong style={{fontSize: 18}}>Race</Text>
                            <br />
                            <PieChart 
                                data={Object.keys(demographics.race).map(key => demographics.race[key])}
                                labels={Object.keys(demographics.race).map(key => race_mappings[key])}
                            />
                        </div>
                        <div style={{marginTop: "40px"}}>
                            <Text strong style={{fontSize: 18}}>Ethnicity</Text>
                            <br />
                            <PieChart 
                                data={Object.keys(demographics.ethnicity).map(key => demographics.ethnicity[key])}
                                labels={Object.keys(demographics.ethnicity).map(key => ethnicity_mappings[key])}
                            />
                        </div>
                        <div style={{marginTop: "40px"}}>
                            <Text strong style={{fontSize: 18}}>Education Enrollement</Text>
                            <br />
                            <PieChart 
                                data={Object.keys(demographics.educational_attainment.enrollment).map(key => demographics.educational_attainment.enrollment[key])}
                                labels={Object.keys(demographics.educational_attainment.enrollment).map(key => educational_mappings[key])}
                            />
                            <br />
                            <Text strong style={{fontSize: 18}}>Education Attainment</Text>
                            <br />
                            <PieChart 
                                data={Object.keys(demographics.educational_attainment.attainment).map(key => demographics.educational_attainment.attainment[key])}
                                labels={Object.keys(demographics.educational_attainment.attainment).map(key => educational_mappings[key])}
                            />
                        </div>
                        <div style={{marginTop: "40px"}}>
                            <Text strong style={{fontSize: 18}}>Income</Text>
                            <br />
                            <PieChart 
                                data={Object.keys(demographics.income).map(key => demographics.income[key])}
                                labels={Object.keys(demographics.income).map(key => income_mappings[key])}
                            />
                        </div>
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