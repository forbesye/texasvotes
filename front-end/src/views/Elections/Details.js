import React, {useState, useEffect, Fragment} from 'react'
import { PageHeader, Typography, Spin, Divider, Row, Col, Collapse, List, Table } from "antd"
import { useParams, useHistory } from 'react-router-dom'
import electionData from "./DefaultElections"
import styles from './Elections.module.css'

const { Title, Paragraph, Text, Link } = Typography
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
    if(election.type == "general")
        return `2020 General Election for ${election.district.name}`
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
        setElection(data)
        setLoaded(true)
    }, [election])

    const handleBack = () => {
        history.push("/elections/view")
    }
    
    const {
        district,
        candidates,
        results
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
                    <Title style={{ textAlign: "center" }} level={3}>General Information</Title>
                    <img src={"https://www.txdot.gov/content/dam/txdot/asset_collection/local_information/texas.jpg"} alt={district} className={styles.districtImage} />
                
                </div>

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
                <article className={styles.districtDetails}>
                    <Collapse ghost>
                        <Panel header="Results">
                            <Table 
                                dataSource = {results.vote_counts}
                                columns={resultColumns}
                            />
                        </Panel>
                    </Collapse>
                </article>
            </Fragment>
        )
    }
    
    return (
        <div className={styles.electionPage}>
            { loaded ? content : <Spin tip="Looking for the fabled Blue wave..." /> }
        </div>
    )
}

export default Details