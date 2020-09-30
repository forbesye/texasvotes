import React from "react"
import { Table } from "antd"
import { useHistory } from 'react-router-dom'
import styles from "./Districts.module.css"
import columns from "./Lib"
import districtData from "./DefaultDistricts"
import { party_mappings, elected_office_mappings } from "library/Mappings"
// import { numberStringWithCommas } from "lib/Functions"

const ListView = () => {
    const data = districtData.map(district => {
        return {
            ...district,
            key: district.id,
            type: elected_office_mappings[district.type],
            party: party_mappings[district.party],
            official_name: district.elected_officials[0].name, // TODO: API call will be diff
            population: district.demographics.total_population
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
                            history.push(`/districts/view/${id}`);
                        }
                    }
                }}
                rowClassName={styles.cursor}
            />
        </div>
    )
}

export default ListView;