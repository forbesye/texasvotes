import React, {useState, useEffect, Fragment} from 'react'
import { PageHeader, Typography, Divider, Collapse, List, Table, Timeline } from "antd"
import { ClockCircleOutlined } from '@ant-design/icons';
import { useParams, useHistory, Link } from 'react-router-dom'
import Spinner from "components/ui/Spinner"
import styles from './Elections.module.css'
import { monthDayYearParse, numberStringWithCommas } from "library/Functions"
import { election_date_mappings } from "library/Mappings"
import { getAPI } from "library/APIClient"
import ReactPlayer from "react-player"

const { Title, Text } = Typography
const { Panel } = Collapse

const OFFICE_NAMES = {
    us_house: "US Congressional District",
    us_senate: "US Senate",
    tx_house: "Texas House of Representatives District",
    tx_senate: "Texas State Senate District",
}

const candidateColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // TODO: Link to correct politicitian id
        render: (text, record) => {
            console.log(record)
            return <Link to={`/politicians/view/${record.id}`}>{text}</Link> 
        }
    },
    {
        title: 'Party',
        dataIndex: 'party',
        key: 'party',
    },
]

const resultColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Party',
        dataIndex: 'party',
        key: 'party',
    },
    {
        title: 'Vote Total',
        dataIndex: 'vote_total',
        key: 'vote_total',
        render: text => numberStringWithCommas(text)
    },
    {
        title: 'Vote Percentage',
        dataIndex: 'vote_percentage',
        key: 'vote_percentage',
        render: text => text + "%"
    },
]

function title (election) {
    if(election.type.class === "general") {
    // TODO: Dynamic district id
        let districtName
        if (election.office === "us_senate") {
            districtName = "US Senate Seat for Texas"
        } else {
            districtName = `${OFFICE_NAMES[election.office]} ${election.district.number}`
        }
        return <div>{`General Election for the `} <Link to={`/districts/view/${election.district.id}`}>{districtName}</Link></div>
    } else {
        return <div>{`${OFFICE_NAMES[election.office]}`} <Link to={`/districts/view/${election.district.id}`}>{`TX-${election.district.number}`}</Link></div>
    }
}

const Details = () => {
    const { id } = useParams()
    const [ election, setElection ] = useState({})
    const [ loaded, setLoaded ] = useState(false)
    const history = useHistory()

    const electionDate = ["early_start", "early_end", "election_day"]
    const todayDate = new Date()
    var beforeToday = true

    useEffect(() => {
        const fetchData = async () => {
            setLoaded(false);
            const data = await getAPI({
                model: "election",
                path: id,
                params: {}
            })
            setElection(data);
            setLoaded(true);
        }
        fetchData();
    }, [id])

    const handleBack = () => {
        history.push("/elections/view")
    }
    
    const {
        district,
        candidates,
        results,
        dates,
        video_url
    } = election
    let content = null
    if(loaded) {
        content = (
            <Fragment>
                <PageHeader
                    title={title(election)}
                    onBack={handleBack}
                />
                <Divider />

                <div className={styles.electionDescription}>
                    <ReactPlayer
                        url={video_url}
                        width="95%"
                        height="500px"
                    />
                    <Divider />
                </div>
                
                <article className={styles.electionDetails}>
                    <Title style={{ textAlign: "center" }} level={3}>Election Dates</Title>
                    <Timeline 
                        mode={"left"} 
                        style={{paddingTop: "20px", width: "95%", margin: "auto", fontSize: 18}}>
                        {
                            electionDate.map(key => {
                                var curDate = new Date(dates[key])
                                if (!beforeToday){
                                    return (
                                        <Timeline.Item 
                                            label={<Text strong>{election_date_mappings[key]}</Text>} 
                                            color="green"> 
                                            {monthDayYearParse(dates[key])}
                                        </Timeline.Item>
                                  )
                                } else if (curDate > todayDate) {
                                    beforeToday = false
                                    return (
                                        <div>
                                            <Timeline.Item 
                                                label={<Text strong>Today</Text>}> 
                                                <Text>{monthDayYearParse(todayDate)}</Text>
                                            </Timeline.Item>
                                            
                                            <Timeline.Item 
                                                dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
                                                label={<Text strong>{election_date_mappings[key]}</Text>} 
                                                color="red"> 
                                                <Text>{monthDayYearParse(dates[key])}</Text>
                                            </Timeline.Item>
                                        </div>
                                    )
                                } else if(beforeToday){
                                    return (
                                        <Timeline.Item 
                                            label={<Text strong>{election_date_mappings[key]}</Text>} 
                                            color="gray"> 
                                            <Text>{monthDayYearParse(dates[key])}</Text>
                                        </Timeline.Item>
                                    )
                                }
                            })
                        }
                        {
                            beforeToday ? 
                            <Timeline.Item> 
                                <Text strong>Today </Text>
                                <Text>{monthDayYearParse(todayDate)}</Text>
                            </Timeline.Item>
                            :
                            null
                        }
                    </Timeline>
                </article>
                

                <article className={styles.electionDetails}>
                    <Title style={{ textAlign: "center" }} level={3}>Candidates</Title>
                    <Table 
                        dataSource = {candidates}
                        columns={candidateColumns}
                    />
                </article>
                
                { results ? (<article className={styles.electionDetails}>
                    
                    <Title style={{ textAlign: "center" }} level={3}>Results</Title>
                    <Table 
                        dataSource = {results.vote_counts}
                        columns={resultColumns}
                    />
                </article>) : null }
                
            </Fragment>
        )
    }
    
    return (
        <div className={styles.electionPage}>
            { loaded ? content : <Spinner /> }
        </div>
    )
}

export default Details