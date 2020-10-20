import React, {useState, useEffect, Fragment, useRef} from 'react'
import { PageHeader, Typography, Divider, Row, Col, Collapse, List } from "antd"
import { useParams, useHistory, Link } from 'react-router-dom'
import styles from './Districts.module.css'
import { districtName, description } from "./Lib"
import  { age_mappings, income_mappings, race_mappings, ethnicity_mappings, educational_mappings, elected_office_mappings, party_mappings } from "library/Mappings"
import Spinner from "components/ui/Spinner"
import { getAPI } from "library/APIClient"
import PieChart from "./../../components/charts/PieChart"
import ReactMapboxGl, { Layer, Feature, Source } from 'react-mapbox-gl'
import { numberStringWithCommas } from "library/Functions"

const { Title, Text } = Typography

function formatAsMoney (num) {
    return `$` + numberStringWithCommas(num.toFixed(2))
}

const Details = () => {
    const { id } = useParams()
    const [ district, setDistrict ] = useState({})
    const [ loaded, setLoaded ] = useState(false)
    const history = useHistory()
    
    const Map = ReactMapboxGl({
        accessToken:
            process.env.REACT_APP_MAP_KEY
    });

    const HOUSE_SOURCE = {
        'type': 'vector',
        'url': 'mapbox://catalystic.4792yhty'
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
        number,
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
                    title={districtName(district)}
                    subTitle={description(district)}
                    onBack={handleBack} 
                />
                <Divider />
                <div className={styles.districtDescription}>
                    <Title style={{ textAlign: "center" }} level={3}>District Map</Title>
                    <Map
                        style='mapbox://styles/mapbox/streets-v11'
                        center={[-100, 30]}
                        containerStyle={{
                          height: '50vh',
                          width: '95%'
                        }}
                        zoom={[4.5]}
                    >
                        {
                            district.type === 'tx_house' ? 
                            <div>
                                <Source id="house_source" tileJsonSource={HOUSE_SOURCE} />
                                <Layer 
                                    id="house_layer" 
                                    type='line'
                                    sourceId='house_source'
                                    sourceLayer='texas_house_shapefile-57mz0c'
                                    filter={['in', 'District', number]}
                                />
                                <Layer 
                                    id="house_layer_fill" 
                                    type='fill'
                                    sourceId='house_source'
                                    sourceLayer='texas_house_shapefile-57mz0c'
                                    paint={{'fill-color': '#6e599f', 'fill-opacity': 0.5}}
                                    filter={['in', 'District', number]}
                                />
                            </div>
                            : 
                            district.type === 'tx_senate' ?
                            <div>
                                <Source id="senate_source" tileJsonSource={SENATE_SOURCE} />
                                <Layer 
                                    id="senate_layer" 
                                    type='line'
                                    sourceId='senate_source'
                                    sourceLayer='texas_senate_shapefile-5reubk'
                                    filter={['in', 'District', number]}
                                />
                                <Layer 
                                    id="senate_layer_fill" 
                                    type='fill'
                                    sourceId='senate_source'
                                    sourceLayer='texas_senate_shapefile-5reubk'
                                    paint={{'fill-color': '#6e599f', 'fill-opacity': 0.5}}
                                    filter={['in', 'District', number]}
                                />
                            </div>
                            :
                            district.type === 'us_house' ?
                            <div>
                                <Source id="congress_source" tileJsonSource={CONGRESS_SOURCE} />
                                <Layer 
                                    id="congress_layer" 
                                    type='line'
                                    sourceId='congress_source'
                                    sourceLayer='texas_congress_shapefile-27vyoe'
                                    filter={['in', 'District', number]}
                                />
                                <Layer 
                                    id="congress_layer_fill" 
                                    type='fill'
                                    sourceId='congress_source'
                                    sourceLayer='texas_congress_shapefile-27vyoe'
                                    paint={{'fill-color': '#6e599f', 'fill-opacity': 0.5}}
                                    filter={['in', 'District', number]}
                                />
                            </div>
                            : null
                        }
                    </Map>

                    <article className={styles.districtDetails}>
                        <Title style={{ textAlign: "center" }} level={3}>District Details</Title>
                        <Row justify="space-around">
                            <Col>
                                <Text strong style={{fontSize: 18}}>Current Official: </Text>
                                {
                                    elected_officials ?
                                    <Link to={`/politicians/view/${elected_officials[0].id}`}>{elected_officials[0].name}</Link>
                                    : <Text style={{fontSize: 18}}> None </Text>
                                }
                            </Col>
                            <Col>
                                {
                                    elections ? (
                                        <Fragment>
                                            <Text strong style={{fontSize: 18}}>Current Election: </Text>
                                            <Link to={`/elections/view/${elections[0].id}`}>{elections[0].id}</Link>
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
                                data={demographics.age.items.map(item => Math.round((item.proportion / 100) * demographics.age.out_of))}
                                labels={demographics.age.items.map(item => { 
                                    if(item.end) {
                                        return(`${item.start} - ${item.end}`)
                                    } else {
                                        return(`${item.start}+`)
                                    }
                                })}
                            />
                        </div>
                        <div style={{marginTop: "40px"}}>
                            <Text strong style={{fontSize: 18}}>Race</Text>
                            <br />
                            <PieChart 
                                data={demographics.race.items.map(item => Math.round((item.proportion / 100) * demographics.race.out_of))}
                                labels={demographics.race.items.map(item => item.race)}
                            />
                        </div>
                        { 
                            demographics.ethnicity ? 
                            <div style={{marginTop: "40px"}}>
                                <Text strong style={{fontSize: 18}}>Ethnicity</Text>
                                <br />
                                <PieChart 
                                    data={demographics.ethnicity.items.map(item => Math.round((item.proportion / 100) * demographics.ethnicity.out_of))}
                                    labels={demographics.ethnicity.items.map(item => item.ethnicity)}
                                />
                            </div>
                            : null
                        }
                        <div style={{marginTop: "40px"}}>
                            <Text strong style={{fontSize: 18}}>Education Enrollement</Text>
                            <br />
                            <PieChart 
                                data={demographics.education.enrollment.items.map(item => Math.round((item.proportion / 100) * demographics.education.enrollment.out_of))}
                                labels={demographics.education.enrollment.items.map(item => item.level)}
                            />
                            <br />
                            <Text strong style={{fontSize: 18}}>Education Attainment</Text>
                            <br />
                            <PieChart 
                                data={demographics.education.attainment.items.map(item => Math.round((item.proportion / 100) * demographics.education.attainment.out_of))}
                                labels={demographics.education.attainment.items.map(item => item.level)}
                            />
                        </div>
                        <div style={{marginTop: "40px"}}>
                            <Text strong style={{fontSize: 18}}>Income</Text>
                            <br />
                            <PieChart 
                                data={demographics.income.items.map(item => Math.round((item.proportion / 100) * demographics.income.out_of))}
                                labels={demographics.income.items.map(item => { 
                                    if(item.end) {
                                        return(`${formatAsMoney(item.start)} - ${formatAsMoney(item.end)}`)
                                    } else {
                                        return(`${formatAsMoney(item.start)}+`)
                                    }
                                })}
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