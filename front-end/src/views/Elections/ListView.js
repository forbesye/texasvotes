import React from "react"
import { Table } from "antd"
import { useHistory } from 'react-router-dom'
import columns from "./Lib"
import electionData from "./DefaultElections"
//import { description } from "./Lib"

const ListView = () => {
    const data = electionData.map(election => {
        // console.log(district.elected_official.name)
        return {
            ...election,
            key: election.id,
            district: election.district.name,
            winner: election.results.winner.name,
            totalVoters: election.results.total_voters,
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
            />
        </div>
    )
}

export default ListView;