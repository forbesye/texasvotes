import React from "react"
import { Table, Divider, Typography } from "antd"
import { useHistory } from 'react-router-dom'
import columns from "./Lib"
import electionData from "./DefaultElections"
import styles from "./Elections.module.css"
import { election_type_mappings, elected_office_mappings } from "library/Mappings"
import { monthDayYearParse } from "library/Functions"
const { Title, Paragraph } = Typography

const ListView = () => {
    const data = electionData.map(election => {
        // console.log(district.elected_official.name)
        return {
            ...election,
            key: election.id,
            district: election.district.name,
            type: election_type_mappings[election.type],
            office: elected_office_mappings[election.office],
            winner: election.results ? election.results.winner.name : "TBD",
            totalVoters: election.results ? election.results.total_voters : "TBD",
            election_date: monthDayYearParse(election.dates.election_day)
        }
    })

    const history = useHistory();

    return (
        <div>
            <section className={styles.content}>
                <Title level={3}>View All</Title>
                <Paragraph>Have you ever wondered what all Texas elections look like in a list view? Probably not, but we've got you covered here. The list can also be filtered and sorted by different properties to make your viewing experience more customizable (soon™).</Paragraph>
            </section>
            <Divider />
            <Table 
                dataSource={data} 
                columns={columns} 
                onRow={record => {
                    return {
                        onClick: event => {
                            const { id } = record;
                            history.push(`/elections/view/${id}`);
                        }
                    }
                }}
                rowClassName={styles.cursor}
            />
        </div>
    )
}

export default ListView;