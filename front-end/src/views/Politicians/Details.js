import React, { useState, useEffect, Fragment } from "react"
import { Link } from 'react-router-dom'
import { PageHeader, Typography, Divider, List } from "antd"
import { FacebookOutlined, TwitterOutlined, YoutubeOutlined, GlobalOutlined, PhoneOutlined } from "@ant-design/icons"
import { useParams, useHistory } from "react-router-dom"
import Spinner from "components/ui/Spinner"
import styles from "./Politicians.module.css"
import { subtitle, officeName } from "./Lib"
import { getAPI } from "library/APIClient"
import { numberStringWithCommas } from "library/Functions"
import { Timeline } from 'react-twitter-widgets'
import { FacebookProvider, Page } from 'react-facebook';


const { Title, Paragraph, Text } = Typography

const partyMap = {
    D: "Democratic",
    R: "Republican",
    L: "Libertarian",
    I: "Independent"
}

function formatAsMoney (num) {
    // return `$${num.toFixed(2)}`
    return `$` + numberStringWithCommas(num.toFixed(2))
}

function capitalize (str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1)
}

function tableTitle (election) {
    const electionDay = new Date(election.dates.election_day)
    const electionYear = electionDay.getFullYear()
    const upcoming = electionDay - new Date() > 0
    if (election.type === "primary" || election.type === "runoff") {
        const participants = upcoming ? election.candidates : election.results.vote_counts
        const party = participants[0].party
        return `${electionYear} ${partyMap[party]} ${capitalize(election.type.class)} Election`
    } else {
        return `${electionYear} ${capitalize(election.type.class)} Election`
    }
}

// TODO: refactor
const parties = {
    D: "Democrat",
    R: "Republican",
    I: "Independent",
    L: "Libertarian"
}

export default function Details () {
    const { id } = useParams()
    const [ politician, setPolitician ] = useState({})
    const [ loaded, setLoaded ] = useState(false)
    const history = useHistory()
    const FB_API_KEY = process.env.REACT_APP_FB_KEY
    
    useEffect(() => {
        const fetchData = async () => {
            setLoaded(false);
            const data = await getAPI({
                model: "politician",
                path: id,
                params: {}
            })
            setPolitician(data);
            setLoaded(true);
        }
        fetchData();
    }, [id])

    const handleBack = () => {
        history.push("/politicians/view")
    }

    const { 
        name, 
        party, 
        image, 
        contact,
        district,
        election, 
        fundraising,
        current,
        running_for
    } = politician
    let content = null
    let socials = {}
    if (loaded) {
        if (contact.social_media){
            contact.social_media.map(social => socials[social.type] = social.id)
        }
        
        content = (
            <Fragment>

                <PageHeader 
                    title={<Text style={{fontSize: 24}}>{name}</Text>}
                    subTitle={<Text style={{fontSize: 18}}>{subtitle(current || running_for, !running_for)}</Text>}
                    onBack={handleBack}
                />
                <Divider />
                <div className={styles.politicianDescription}>
                    <Title style={{ textAlign: "center" }} level={2}>General Information</Title>
                    <img src={image} alt={name} className={styles.politicianImage} />
                    <Divider />
                    
                    <article className={styles.politicianDetails}>
                        <div className={styles.politicianGeneralInfo}>
                            <div>
                                <Text strong>Party: </Text><Text>{parties[party]}</Text>
                            </div>
                            {
                                district ?
                                    <div><Text strong>District: </Text><Link to={`/districts/view/${district.id}`}>TX-{district.number}</Link></div>
                                : null
                            }
                            {
                                current ? (
                                    <Fragment>
                                        <div>
                                            <Text strong>Current Office: </Text><Text>{`${officeName(current)}`}</Text>
                                        </div>
                                        {/* <div>
                                            {
                                                offices.past && offices.past.length > 0 ? (
                                                    <Fragment>
                                                        <Text strong>Past Offices: </Text><Text>{offices.past.map((o, i) => (i !== 0 ? ", " : "") + officeName(o))}</Text>
                                                    </Fragment>
                                                ) : null
                                            }
                                            
                                        </div> */}
                                    </Fragment>
                                ) : null
                            }
                        </div>
                        <div className={styles.politicianSocials}>
                            <div>
                                <a target="_blank" rel="noopener noreferrer" href={contact.website}><GlobalOutlined /> Campaign Website</a>
                            </div>
                            <div>
                                <a target="_blank" rel="noopener noreferrer" href={`tel:${contact.phone}`}><PhoneOutlined /> Phone Number</a>
                            </div>
                            {
                                Object.keys(socials).map(type => {
                                    if (type === "facebook") {
                                        return (
                                            <div>
                                                <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/${socials[type]}`}><FacebookOutlined /> Facebook</a>
                                            </div>
                                        )
                                    } else if (type === "twitter") {
                                        return (
                                            <div>
                                                <a target="_blank" rel="noopener noreferrer" href={`http://twitter.com/${socials[type]}`}><TwitterOutlined /> Twitter</a>
                                            </div>
                                        )
                                    } else if (type === "youtube") {
                                        return (
                                            <div>
                                                <a target="_blank" rel="noopener noreferrer" href={`http://www.youtube.com/channel/${socials[type]}`}><YoutubeOutlined /> Youtube</a>
                                            </div>
                                        )
                                    }
                                    return null
                                })
                            }
                        </div>
                    </article>
                    <Divider />
                    {
                        Object.keys(socials).includes("twitter") ? 
                            <Timeline
                              dataSource={{ sourceType: "profile", screenName: socials['twitter'] }}
                              options={{ width: "400", height: "600" }}
                            />
                        :
                            Object.keys(socials).includes("facebook") ?
                                <FacebookProvider appId={FB_API_KEY}>
                                    <Page href={`https://www.facebook.com/${socials['facebook']}`} tabs="timeline" />
                                </FacebookProvider>    
                            : <Paragraph>{name} does not have Twitter or Facebook.</Paragraph>
                    }

                    <Divider />
                    <article className={styles.districtDetails}>
                        <Title style={{ textAlign: "center" }} level={3}>District Information</Title>
                        {
                            district ?
                            <div>
                                <Paragraph>{name} is running in 
                                    <Link to={`/districts/view/${district.id}`}> TX-{district.number} </Link> 
                                    which spans {district.counties.length} count{district.counties.length === 1 ? 'y' : 'ies'}. Here are the counties {name} would represent: </Paragraph>
                                <br/>
                                <List 
                                    dataSource = {district.counties}
                                    renderItem = {item => (
                                        <List.Item>
                                            <Text>{item}</Text>
                                        </List.Item>
                                    )}
                                    grid = {{gutter: 16, column: 3}}
                                />
                            </div>
                            : <Paragraph>There is no district information for {name}</Paragraph>
                        }
                        
                    </article>
                    <Divider />
                    <article className={styles.electionDetails}>
                        <Title style={{ textAlign: "center" }} level={3}>Election Information</Title>
                        {
                            fundraising ? (
                                <section className={styles.electionSection}>
                                    <Title level={4}>2019-2020 Fundraising Information</Title>
                                    <Paragraph>{name} has raised {formatAsMoney(fundraising.raised)} for their current campaign.</Paragraph>
                                    <Paragraph>{name} has spent {formatAsMoney(fundraising.spent)} on their current campaign.</Paragraph>
                                    <Paragraph>{name} currently has {formatAsMoney(fundraising.remaining_cash)} on hand.</Paragraph>
                                    <List
                                        header={<Text strong style={{fontSize: "18px"}}>{name}'s Contribution by Industry</Text>}
                                        bordered
                                        dataSource={fundraising.industries}
                                        renderItem={item => {
                                            console.log(item)
                                            return (
                                                <List.Item>
                                                    <Text strong style={{fontSize: "18px"}}>{item.type}</Text> <br/>
                                                    <Text style={{fontSize: "16px"}}>Individual Donations: {formatAsMoney(item.individual)}</Text> <br/>
                                                    <Text style={{fontSize: "16px"}}>PAC Donations: {formatAsMoney(item.pacs)}</Text> <br/>
                                                    <Text style={{fontSize: "16px"}}>Total: {formatAsMoney(item.total)}</Text>
                                                </List.Item>
                                            )
                                        }}
                                    />
                                    <br/>
                                    <List
                                    header={<Text strong style={{fontSize: "18px"}}>{name}'s Contributors</Text>}
                                    bordered
                                    dataSource={fundraising.contributors}
                                    renderItem={item => {
                                        console.log(item)
                                        return (
                                            <List.Item>
                                                <Text strong style={{fontSize: "18px"}}>{item.name}</Text> <br/>
                                                <Text style={{fontSize: "16px"}}>Individual Donations: {formatAsMoney(item.individual)}</Text> <br/>
                                                <Text style={{fontSize: "16px"}}>PAC Donations: {formatAsMoney(item.pacs)}</Text> <br/>
                                                <Text style={{fontSize: "16px"}}>Total: {formatAsMoney(item.total)}</Text>
                                            </List.Item>
                                        )
                                    }}
                                />
                                </section>
                            ) : (
                                <section>
                                    <Title level={4}>2019-2020 Fundraising Information</Title>
                                    <Paragraph>{name} doesn't have any fundraising information on file.</Paragraph>
                                </section>
                            )
                        }
                        <section className={styles.electionSection}>
                            <Title level={4}>Participating Elections</Title>
                            {
                                election ? (
                                    <Fragment>
                                        <Paragraph>{name} is running in an upcoming election.</Paragraph>
                                        <div className={styles.electionTable}> 
			                                <Link to={`/elections/view/${election.id}`}>{tableTitle(election)}</Link>
                                        </div>
                                    </Fragment>
                                ) : <Paragraph>{name} is not up for re-election.</Paragraph>
                            }

                            {/* TODO: format for past elections */}
                            {/* {
                                elections.past.length > 0 ? (
                                    <Fragment>
                                        <Paragraph>{name} has ran in past elections.</Paragraph>
                                        { elections.past.map(e => (
                                            <div className={styles.electionTable}>
                                                <Text strong>{tableTitle(e)}</Text>
                                                <Table 
                                                    columns={[
                                                        { title: "Name", dataIndex: "name", key: "name", render: (text, record) => <div>{text} {e.results.winner.name === record.name ? <Text strong>(winner)</Text> : null}</div> },
                                                        { title: "Party", dataIndex: "party", key: "party" },
                                                        { title: "Vote Percentage", dataIndex: "vote_percentage", key: "vote_percentage", render: (text) => <div>{text}%</div> }
                                                    ]}
                                                    dataSource={e.results.vote_counts}
                                                    pagination={false}
                                                />
                                            </div>
                                        )) }
                                        
                                    </Fragment>
                                ) : <Paragraph>{name} is has not run for any past elections</Paragraph>
                            } */}
                            
                        </section>
                    </article>
                </div>
            </Fragment>
        )
    }

    return (
        <div className={styles.politicianPage}>
            { loaded ? content : <Spinner /> }
        </div>
    )
}