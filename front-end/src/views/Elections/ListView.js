import React from "react"
import { Table } from "antd"
import { useHistory } from 'react-router-dom'
import columns from "./Lib"
import electionData from "./DefaultElections"
import styles from "./Elections.module.css"
import { election_type_mappings, elected_office_mappings } from "lib/Mappings"
import { monthDayYearParse } from "lib/Functions"
//import { description } from "./Lib"

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