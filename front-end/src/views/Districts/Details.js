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
        // 'url': 'mapbox://mapbox.82pkq93d'
    };

    const SENATE_SOURCE = {
        'type': 'vector',
        'url': 'mapbox://catalystic.32xmvx8x'
    };

    const CONGRESS_SOURCE = {
        'type': 'vector',
        'url': 'mapbox://catalystic.1h2pkbbe'
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
        ocd_id,
        type,
        party,
        number,
        counties,
        map,
        elections,
        elected_officials,
        demographics,
    } = district
    let content = null
    if(loaded) {
        content = (
            <Fragment>
                <PageHeader
                    title={`TX-${number}`}
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
                        // style='mapbox://styles/catalystic/ckggmur05017k1arklcio8vlc'
                        style='mapbox://styles/mapbox/streets-v11'
                        center={[-100, 30]}
                        containerStyle={{
                          height: '50vh',
                          width: '30vw'
                        }}
                        zoom={[4.5]}
                    >
                        <Source id="house_source" tileJsonSource={HOUSE_SOURCE} />
                        <Source id="senate_source" tileJsonSource={SENATE_SOURCE} />
                        <Source id="congress_source" tileJsonSource={CONGRESS_SOURCE} />
                        <Layer 
                            id="house_layer" 
                            type='line'
                            sourceId='house_source'
                            sourceLayer='texas_house_shapefile-57mz0c'
                            // TODO: dynamic distrcit number
                            filter={['in', 'District', 74]}
                        />
                        {/* <Layer 
                            id="senate_layer" 
                            type= 'line'
                            sourceId= 'senate_source'
                            sourceLayer= 'texas_senate_shapefile-5reubk'
                        />

                        <Layer 
                            id="congress_layer" 
                            type= 'line'
                            sourceId= 'congress_source'
                            sourceLayer= 'texas_congress_shapefile-27vyoe'
                        /> */}
                    </Map>

                    <article className={styles.districtDetails}>
                        <Title style={{ textAlign: "center" }} level={3}>District Details</Title>
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
                        <Row justify="space-around">
                            <Col>
                                {
                                    elections.past.length > 0 ?  (
                                        <Fragment>
                                            <Text strong style={{fontSize: 18}}>Past Elections: </Text>
                                            {
                                                elections.past.map((e, i) => {
                                                    // TODO change /0 to actual past election id
                                                    return <Link to={`/elections/view/0`}>{(i > 0 ? ", " : "") + e.id}</Link>
                                                })
                                            }
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <Text strong style={{fontSize: 18}}>Past Elections: </Text>
                                            <Text>None</Text>
                                        </Fragment>
                                    )
                                }
                            </Col>
                            <Col>
                                {
                                    elections.upcoming ? (
                                        <Fragment>
                                            <Text strong style={{fontSize: 18}}>Current Election: </Text>
                                            {/* TODO change /0 to actual current election id */}
                                            <Link to={`/elections/view/0`}>{elections.upcoming.id}</Link>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <Text strong style={{fontSize: 18}}>Current Election: </Text>
                                            <Text style={{fontSize: 18}}>None</Text>
                                        </Fragment>
                                    )
                                }
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
                                data={demographics.age.items.map(item => (item.proportion / 100) * demographics.age.out_of)}
                                labels={demographics.age.items.map(item => `${item.start} - ${item.end}`)}
                            />
                        </div>
                        <div style={{marginTop: "40px"}}>
                            <Text strong style={{fontSize: 18}}>Race</Text>
                            <br />
                            <PieChart 
                                data={demographics.race.items.map(item => (item.proportion / 100) * demographics.race.out_of)}
                                labels={demographics.race.items.map(item => item.race)}
                            />
                        </div>
                        <div style={{marginTop: "40px"}}>
                            <Text strong style={{fontSize: 18}}>Ethnicity</Text>
                            <br />
                            <PieChart 
                                data={demographics.ethnicity.items.map(item => (item.proportion / 100) * demographics.ethnicity.out_of)}
                                labels={demographics.ethnicity.items.map(item => item.ethnicity)}
                            />
                        </div>
                        <div style={{marginTop: "40px"}}>
                            <Text strong style={{fontSize: 18}}>Education Enrollement</Text>
                            <br />
                            <PieChart 
                                data={demographics.education.enrollment.items.map(item => (item.proportion / 100) * demographics.education.enrollment.out_of)}
                                labels={demographics.education.enrollment.items.map(item => item.level)}
                            />
                            <br />
                            <Text strong style={{fontSize: 18}}>Education Attainment</Text>
                            <br />
                            <PieChart 
                                data={demographics.education.attainment.items.map(item => (item.proportion / 100) * demographics.education.attainment.out_of)}
                                labels={demographics.education.attainment.items.map(item => item.level)}
                            />
                        </div>
                        <div style={{marginTop: "40px"}}>
                            <Text strong style={{fontSize: 18}}>Income</Text>
                            <br />
                            <PieChart 
                                data={demographics.income.items.map(item => (item.proportion / 100) * demographics.income.out_of)}
                                labels={demographics.income.items.map(item => `${item.start} - ${item.end}`)}
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