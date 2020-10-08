import React, { useState, useEffect, Fragment } from "react"
import { PageHeader, Typography, Spin, Divider, Collapse, List, Table } from "antd"
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined, GlobalOutlined } from "@ant-design/icons"
import { useParams, useHistory } from "react-router-dom"
import styles from "./Politicians.module.css"
import politicians from "./DefaultPoliticians"
import { subtitle, officeName } from "./Lib"
import randomLoadingMessage from 'library/LoadingMessage.js'

const { Title, Paragraph, Text, Link } = Typography
const { Panel } = Collapse

const partyMap = {
    D: "Democratic",
    R: "Republican",
    L: "Libertarian",
    I: "Independent"
}

function formatAsMoney (num) {
    return `$${num.toFixed(2)}`
}

function formatKey (str) {
    const splitted = str.split("_")
    if (splitted.length === 1)
        return capitalize(splitted[0])
    return splitted.reduce((prev, curr) => capitalize(prev) + " " + capitalize(curr))
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
        console.log(upcoming)
        const party = participants[0].party
        return `${electionYear} ${partyMap[party]} ${capitalize(election.type)} Election`
    } else {
        return `${electionYear} ${capitalize(election.type)} Election`
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

    useEffect(() => {
        const data = politicians.find(p => p.id === parseInt(id))
        setPolitician(data)
        setLoaded(true)
    }, [politician, id])

    const handleBack = () => {
        history.push("/politicians/view")
    }

    const { 
        name, 
        biography, 
        district, 
        image, 
        party, 
        website, 
        socials,
        offices,
        terms,
        fundraising,
        elections,
        video
    } = politician
    let content = null
    if (loaded) {
        content = (
            <Fragment>
                <PageHeader 
                    title={name}
                    subTitle={subtitle(offices.current || offices.running_for, !offices.running_for)}
                    onBack={handleBack}
                />
                <Divider />
                <div className={styles.politicianDescription}>
                    <Title style={{ textAlign: "center" }} level={3}>General Information</Title>
                    <img src={image} alt={name} className={styles.politicianImage} />
                    <Divider />
                    <iframe title="defaultTitle" width="90%" height="400px" src={video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <Divider />
                    <article className={styles.politicianDetails}>
                        <div className={styles.politicianGeneralInfo}>
                            <div>
                                <Text strong>Party: </Text><Text>{parties[party]}</Text>
                            </div>
                            <div>
                                <Text strong>District: </Text><Text>{district.name}</Text>
                            </div>
                            {
                                offices.current ? (
                                    <Fragment>
                                        <div>
                                            <Text strong>Current Office: </Text><Text>{`${officeName(offices.current)} (${terms.current} terms)`}</Text>
                                        </div>
                                        <div>
                                            {
                                                offices.past && offices.past.length > 0 ? (
                                                    <Fragment>
                                                        <Text strong>Past Offices: </Text><Text>{offices.past.map((o, i) => (i !== 0 ? ", " : "") + officeName(o))}</Text>
                                                    </Fragment>
                                                ) : null
                                            }
                                            
                                        </div>
                                    </Fragment>
                                ) : null
                            }
                        </div>
                        <div className={styles.politicianSocials}>
                            <div>
                                <Link target="_blank" href={website}><GlobalOutlined /> Campaign Website</Link>
                            </div>
                            {
                                socials.facebook ? (
                                    <div>
                                        <Link target="_blank" href={socials.facebook}><FacebookOutlined /> Facebook</Link>
                                    </div>
                                ) : null
                            }
                            {
                                socials.twitter ? (
                                    <div>
                                        <Link target="_blank" href={socials.twitter}><TwitterOutlined /> Twitter</Link>
                                    </div>
                                ) : null
                            }
                            {
                                socials.instagram ? (
                                    <div>
                                        <Link target="_blank" href={socials.instagram}><InstagramOutlined /> Instagram</Link>
                                    </div>
                                ) : null
                            }
                            {
                                socials.youtube ? (
                                    <div>
                                        <Link target="_blank" href={socials.youtube}><YoutubeOutlined /> Youtube</Link>
                                    </div>
                                ) : null
                            }
                        </div>
                    </article>
                    { biography ? (
                        <article className={styles.politicianBio}>
                            <Collapse ghost>
                                <Panel header="Campaign Biography">
                                    {
                                        typeof biography === "string" ? (
                                            <Paragraph>{biography}</Paragraph>
                                        ) : biography.map(p => <Paragraph>{p}</Paragraph>)
                                    }
                                </Panel>
                            </Collapse>
                            {
                                politician.issues ? (
                                    <Collapse ghost>
                                        <Panel header="Issues">
                                            {
                                                politician.issues.map((issue, i) => (
                                                    <Paragraph key={i}><Text strong>{issue.type}: </Text>{issue.stance}</Paragraph>
                                                ))
                                            }
                                        </Panel>
                                    </Collapse>
                                ) : null
                            }
                        </article>
                    ) : null }
                    <Divider />
                    <article className={styles.districtDetails}>
                        <Title style={{ textAlign: "center" }} level={3}>District Information</Title>
                        <Paragraph>{name} is running in {district.name} which spans {district.counties.length} counties.</Paragraph>
                        <Paragraph>If {name} were to win, they would be representing {district.demographics.total_population} constituents in total. {district.name}'s demographics are below.</Paragraph>
                        <br/>
                        <Text strong>Racial Makeup</Text>
                        <Table 
                            columns={[
                                { title: "Race", dataIndex: "race", key: "race" }, 
                                { title: "Population", dataIndex: "population", key: "population" }
                            ]}
                            dataSource={Object.keys(district.demographics.race).map(k => {
                                return { race: formatKey(k), population: district.demographics.race[k] }
                            })}
                        />
                    </article>
                    <Divider />
                    <article className={styles.electionDetails}>
                        <Title style={{ textAlign: "center" }} level={3}>Election Information</Title>
                        {
                            fundraising ? (
                                <section className={styles.electionSection}>
                                    <Title level={5}>2019-2020 Fundraising Information</Title>
                                    <Paragraph>{name} has raised {formatAsMoney(fundraising.raised)} for their current campaign.</Paragraph>
                                    <Paragraph>{name} has spent {formatAsMoney(fundraising.spent)} on their current campaign.</Paragraph>
                                    <Paragraph>{name} currently has {formatAsMoney(fundraising.remaining_cash)} on hand.</Paragraph>
                                    <List 
                                        header={<Text strong>{name}'s Contribution Categories</Text>}
                                        bordered
                                        dataSource={fundraising.contributors}
                                        renderItem={item => {
                                            const titles = {
                                                small_individual: "Donataions Under $250",
                                                large_individual: "Donations Above $250",
                                                self_finance: "Self Financing",
                                                pac: "PAC Donations",
                                                other: "Other Sources"
                                            }
                                            return (
                                            <List.Item><Text>From {titles[item.type]}: {formatAsMoney(item.amount)}</Text></List.Item>
                                            )
                                        }}
                                    />
                                </section>
                            ) : (
                                <section>
                                    <Title level={5}>2019-2020 Fundraising Information</Title>
                                    <Paragraph>{name} doesn't have any fundraising information on file.</Paragraph>
                                </section>
                            )
                        }
                        <section className={styles.electionSection}>
                            <Title level={5}>Participating Elections</Title>
                            {
                                elections.upcoming ? (
                                    <Fragment>
                                        <Paragraph>{name} is running in an upcoming election.</Paragraph>
                                        <div className={styles.electionTable}>
                                            <Text strong>{tableTitle(elections.upcoming)}</Text>
                                            <Table 
                                                columns={[
                                                    { title: "Name", dataIndex: "name", key: "name", render: (text, record) => <div>{text} {record.incumbent ? <Text strong>(incumbent)</Text> : null}</div> }, 
                                                    { title: "Party", dataIndex: "party", key: "party "}
                                                ]}
                                                dataSource={elections.upcoming.candidates}
                                                pagination={false}
                                            />
                                        </div>
                                    </Fragment>
                                ) : <Paragraph>{name} is not up for re-election.</Paragraph>
                            }
                            
                            {
                                elections.past.length > 0 ? (
                                    <Fragment>
                                        <Paragraph>{name} has also ran in past elections.</Paragraph>
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
                                ) : null
                            }
                            
                        </section>
                    </article>
                </div>
            </Fragment>
        )
    }

    return (
        <div className={styles.politicianPage}>
            { loaded ? content : <Spin tip={randomLoadingMessage()} /> }
        </div>
    )
}