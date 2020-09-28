import React, { useState, useEffect } from "react"
import { Typography, Divider, Tabs, Input } from "antd"
import { Route, useLocation, useHistory } from "react-router-dom"
import styles from "./Districts.module.css"
import ListView from "./ListView"
import SearchView from "./SearchView" // Do we need seperate ones?

const { TabPane } = Tabs
// const { Search } = Input

const Districts = () => {
    const [currKey, setCurrKey] = useState("search")
    const history = useHistory()
    const location = useLocation()
    const handleChange = (key) => {
        history.push(`/districts/${key}`)
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
                <Typography.Title level={1}>Texas Districts</Typography.Title>
            </header>
            <div>
                <Tabs activeKey={currKey} onChange={handleChange}>
                    <TabPane tab="Search" key="search">
                        <Route path="/districts/search">
                            <SearchView />
                        </Route>
                    </TabPane>
                    <TabPane tab="View All" key="view">
                        <Route path="/districts/view">
                            <ListView />
                        </Route>
                    </TabPane>
                </Tabs>
            </div>
        </main>
    )
}

export default Districts;