import React, { useState, useEffect, Fragment } from "react"
import { Typography, Divider, Card, Table } from "antd"
import { useHistory } from 'react-router-dom'
import styles from "./Districts.module.css"
import politicians from "./DefaultDistricts"
import columns from "./Lib"
import districtData from "./DefaultDistricts"

const ListView = () => {
    const data = districtData.map(district => {
        return {
            key: district.id,
            official_name: district.elected_officials[0].name, // TODO: API call will be diff
            population: district.demographics.total_population,
            ...district
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
            />
        </div>
    )
}

export default ListView;