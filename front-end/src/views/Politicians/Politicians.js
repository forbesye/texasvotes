import React, { Fragment, useState, useEffect } from "react"
import { Route, useLocation, useHistory } from "react-router-dom"
import { Typography, Divider, Tabs, Input } from "antd"
import SearchView from "./SearchView"
import GridView from "./GridView"
import styles from "./Politicians.module.css"

const { TabPane } = Tabs
const { Search } = Input

export default function Politicians () {
    const [currKey, setCurrKey] = useState("search")
    const history = useHistory()
    const location = useLocation()
    const handleChange = (key) => {
        history.push(`/politicians/${key}`)
        setCurrKey(key)
    }
    useEffect(() => {
        const path = location.pathname
        const initialKey = path.split("/").filter(el => el !== "").pop()
        setCurrKey(initialKey)
    }, [])

    return (
        <main className={styles.wrapper}>
            <header className={styles.header}>
                <Typography.Title level={1}>Texas Politicians</Typography.Title>
            </header>
            <div>
                <Tabs activeKey={currKey} onChange={handleChange}>
                    <TabPane tab="Search" key="search">
                        <Route path="/politicians/search">
                            <SearchView />
                        </Route>
                    </TabPane>
                    <TabPane tab="View All" key="view">
                        <Route path="/politicians/view">
                            <GridView />
                        </Route>
                    </TabPane>
                </Tabs>
            </div>
        </main>
    )
}