import React, { useState, useEffect, Fragment } from "react"
import { Typography, Divider, Card, Table } from "antd"
import styles from "./Districts.module.css"
import politicians from "./DefaultDistricts"
import columns from "./Lib"
import districtData from "./DefaultDistricts"
//import { description } from "./Lib"

const ListView = () => {
    return (
        <div>
            <Table dataSource={districtData} columns={columns} />
        </div>
    )
}

export default ListView;