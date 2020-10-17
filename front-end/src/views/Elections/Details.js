import React, {useState, useEffect, Fragment} from 'react'
import { PageHeader, Typography, Divider, Collapse, List, Table, Timeline } from "antd"
import { ClockCircleOutlined } from '@ant-design/icons';
import { useParams, useHistory, Link } from 'react-router-dom'
import Spinner from "components/ui/Spinner"
import styles from './Elections.module.css'
import { monthDayYearParse, numberStringWithCommas } from "library/Functions"
import { election_date_mappings } from "library/Mappings"
import { getAPI } from "library/APIClient"
import YTSearch from 'youtube-api-search'
import ReactPlayer from "react-player"

const { Title, Text } = Typography
const { Panel } = Collapse

const OFFICE_NAMES = {
    us_house: "House of Representatives",
    us_senate: "US Senate",
    tx_house: "Texas House of Representatives",
    tx_senate: "Texas Senate",
}

const candidateColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // TODO: Link to correct politicitian id
        render: text => <Link to={`/politicians/view/0`}>{text}</Link> 
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
    if(election.type.class === "general")
    // TODO: Dynamic district id
        return <div>{`General Election for `} <Link to={`/districts/view/${election.district.id}`}>{`TX-${election.district.number}`}</Link></div>
    else
        return <div>{`${OFFICE_NAMES[election.office]}`} <Link to={`/districts/view/${election.district.id}`}>{`TX-${election.district.number}`}</Link></div>
}

const Details = () => {
    const { id } = useParams()
    const [ election, setElection ] = useState({})
    const [ loaded, setLoaded ] = useState(false)
    const [ ytLink, setYTLink ] = useState("")
    const history = useHistory()

    const electionDate = ["early_start", "early_end", "election_day"]
    const todayDate = new Date()
    var beforeToday = true

    const YT_API_KEY = process.env.REACT_APP_YT_KEY

    const videoSearch = (term) => {
        YTSearch({key: YT_API_KEY, term: term}, (videos) => {
            setLoaded(true);
            setYTLink(`https://www.youtube.com/watch?v=${videos[0].id.videoId}`)
        })
    }
    videoSearch("general election district texas 25")
    
    useEffect(() => {
        const fetchData = async () => {
            setLoaded(false);
            const data = await getAPI({
                model: "election",
                path: id,
                params: {}
            })
            setElection(data);
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
        dates
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
                        url={ytLink}
                        width="800px"
                        height="500px"
                    />
                    <Divider />
                </div>
                
                <article className={styles.electionDetails}>
                    <Title style={{ textAlign: "center" }} level={3}>Election Dates</Title>
                    <Timeline 
                        mode={"left"} 
                        style={{paddingTop: "20px", width: "400px", margin: "auto", fontSize: 18}}>
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