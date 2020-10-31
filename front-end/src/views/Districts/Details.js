import React, {useState, useEffect, Fragment } from 'react'
import { PageHeader, Typography, Divider, Row, Col, List } from "antd"
import { useParams, useHistory, Link } from 'react-router-dom'
import styles from './Districts.module.css'
import { districtName, description } from "./Lib"
import Spinner from "components/ui/Spinner"
import { getAPI } from "library/APIClient"
import PieChart from "./../../components/charts/PieChart"
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl'
import { formatAsMoney } from "library/Functions"
import { party_mappings } from "library/Mappings"

const { Title, Text } = Typography

const electionName = (election, number) => {
    const { dates, office, type, party, id } = election
    const { election_day } = dates
    const electionYear = new Date(election_day).getFullYear()
    if(type.class === "general") {
        return <div><Link to={`/elections/view/${id}`}>{`${electionYear} General Election for `} {districtName(office, number)}</Link></div>
    } else if (type.class === "runoff") {
        return (<div>
            <Link to={`/elections/view/${id}`}>
            {`${electionYear} ${party_mappings[party]} Runoff for ${districtName(office, number)}`}
            </Link>
            </div>)
    } else {
        return (<div>
            <Link to={`/elections/view/${id}`}>
                {`${electionYear} ${party_mappings[party]} Primary for ${districtName(office, number)}`} 
            </Link>
            </div>)
    }
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
            try {
                const data = await getAPI({
                    model: "district",
                    path: id,
                    params: {}
                })
                setDistrict(data);
                setLoaded(true);
            } catch(err) {
                history.push("/error")
            }
            
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
        max_long,
        min_long,
        max_lat,
        min_lat
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
                        // eslint-disable-next-line
                        style="mapbox://styles/mapbox/streets-v11"
                        fitBounds={[[max_lat, max_long], [min_lat, min_long]]}
                        fitBoundsOptions={{ padding: 80 }}
                        movingMethod="easeTo"
                        containerStyle={{
                          height: '50vh',
                          width: '95%'
                        }}
                        maxZoom={[4.5]}
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
                                <Text strong style={{fontSize: 18}}>
                                    {elected_officials.length < 2 ? "Elected official" : "Elected officials" }
                                </Text>
                                {
                                    elected_officials.map(pol => (
                                        <div>
                                            <Link to={`/politicians/view/${pol.id}`}>
                                                {pol.name}
                                            </Link>
                                        </div>
                                    ))
                                }
                            </Col>
                        </Row>
                        <Row justify="space-around" style={{marginTop: 10}}>
                            <Col>
                                {
                                    elections.length ? (
                                        <Fragment>
                                            <Text strong style={{fontSize: 18}}>Elections</Text>
                                            { elections.map(e => {
                                                return electionName(e, number)
                                            })}
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <Text style={{fontSize: 18}}>There are no elections for this district.</Text>
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