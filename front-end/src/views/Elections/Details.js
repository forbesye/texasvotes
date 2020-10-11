import React, {useState, useEffect, Fragment} from 'react'
import { PageHeader, Typography, Divider, Collapse, List, Table } from "antd"
import { useParams, useHistory } from 'react-router-dom'
import Spinner from "components/ui/Spinner"
import electionData from "./DefaultElections"
import styles from './Elections.module.css'
import { monthDayYearParse } from "library/Functions"
import { election_date_mappings } from "library/Mappings"

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
    },
    {
        title: 'Vote Percentage',
        dataIndex: 'vote_percentage',
        key: 'vote_percentage',
    },
]

function title (election) {
    if(election.type === "general")
        return `General Election for ${election.district.name}`
    else
        return `${OFFICE_NAMES[election.office]} ${election.district.name}`
}

const Details = () => {
    const { id } = useParams()
    const [ election, setElection ] = useState({})
    const [ loaded, setLoaded ] = useState(false)

    const history = useHistory()
    
    useEffect(() => {
        const data = electionData.find(p => p.id === parseInt(id))
        // Need to call API here? Think so...
        setElection(data)
        setLoaded(true)
    }, [election, id])

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
                    <Title style={{ textAlign: "center" }} level={3}>Voting location for this election</Title>
                    <iframe title="defaultTitle" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d792.5729841144131!2d-97.73940944568301!3d30.286461848006283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b59d243cb369%3A0x9036118404cdcc50!2sPeter%20T.%20Flawn%20Academic%20Center%20(FAC)!5e0!3m2!1sen!2sus!4v1601500457897!5m2!1sen!2sus" width="90%" height="400px" frameBorder="0" style={{border:0}} allowFullScreen="" tabIndex="0"></iframe>
                    <Divider />
                    <Title style={{ textAlign: "center" }} level={3}>Current Balance</Title>
                    <img src={"https://media.kvue.com/assets/KVUE/images/1fa58d6e-51ff-4b54-b48e-f62e3848109a/1fa58d6e-51ff-4b54-b48e-f62e3848109a_1140x641.jpg"} alt={district} className={styles.electionImage} />
                    <Divider />
                    <Title style={{ textAlign: "center" }} level={3}>General Information</Title>
                
                </div>
                <article className={styles.districtDetails}>
                    <Collapse ghost>
                        <Panel header="Election Dates">
                            <List 
                                dataSource = {Object.keys(dates)}
                                renderItem = {key => {
                                    return (
                                        <List.Item>
                                            <Text strong>{election_date_mappings[key]}: </Text><Text>{monthDayYearParse(dates[key])}</Text>
                                        </List.Item>
                                    )
                                }}
                            />
                        </Panel>
                    </Collapse>
                </article>

                <article className={styles.districtDetails}>
                    <Collapse ghost>
                        <Panel header="Candidates">
                            <Table 
                                dataSource = {candidates}
                                columns={candidateColumns}
                            />
                        </Panel>
                    </Collapse>
                </article>
                
                { results ? (<article className={styles.districtDetails}>
                    <Collapse ghost>
                        <Panel header="Results">
                            <Table 
                                dataSource = {results.vote_counts}
                                columns={resultColumns}
                            />
                        </Panel>
                    </Collapse>
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